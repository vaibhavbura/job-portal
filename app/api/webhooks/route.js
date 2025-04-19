import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import connectDB from "@/server/config/db";
import User from "@/server/models/User";

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req) {
    try {
        console.log('=== Incoming Webhook Request ===');
        console.log('Method:', req.method);
        console.log('Headers:', Object.fromEntries(req.headers.entries()));
        
        const payload = await req.json();
        console.log('Payload:', JSON.stringify(payload, null, 2));

        if (!process.env.CLERK_WEBHOOK_SECRET) {
            throw new Error('CLERK_WEBHOOK_SECRET is not configured');
        }

        const headerPayload = headers();
        const svix_id = headerPayload.get("svix-id");
        const svix_timestamp = headerPayload.get("svix-timestamp");
        const svix_signature = headerPayload.get("svix-signature");

        if (!svix_id || !svix_timestamp || !svix_signature) {
            return new NextResponse("Error occured -- no svix headers", {
                status: 400,
            });
        }

        const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        let evt;

        try {
            evt = wh.verify(JSON.stringify(payload), {
                "svix-id": svix_id,
                "svix-timestamp": svix_timestamp,
                "svix-signature": svix_signature,
            });
        } catch (err) {
            console.error("Error verifying webhook:", err);
            return new NextResponse("Error occured", {
                status: 400,
            });
        }

        const eventType = evt?.type;

        if (!eventType) {
            return new NextResponse("Error occured -- no event type", {
                status: 400,
            });
        }

        // Connect to database
        await connectDB();

        switch (eventType) {
            case "user.created": {
                const { id, email_addresses, ...attributes } = evt.data;
                
                if (!email_addresses?.[0]?.email_address) {
                    throw new Error('No email address found in user data');
                }

                try {
                    const user = await User.create({
                        clerkId: id,
                        email: email_addresses[0].email_address,
                        ...attributes,
                    });
                    console.log('User created successfully:', user);
                    return NextResponse.json({ success: true, user });
                } catch (error) {
                    console.error('Error creating user:', error);
                    return NextResponse.json(
                        { error: "Error creating user" },
                        { status: 500 }
                    );
                }
            }

            case "user.updated": {
                const { id, email_addresses, ...attributes } = evt.data;
                
                if (!email_addresses?.[0]?.email_address) {
                    throw new Error('No email address found in user data');
                }

                try {
                    const user = await User.findOneAndUpdate(
                        { clerkId: id },
                        {
                            email: email_addresses[0].email_address,
                            ...attributes,
                        },
                        { new: true }
                    );
                    console.log('User updated successfully:', user);
                    return NextResponse.json({ success: true, user });
                } catch (error) {
                    console.error('Error updating user:', error);
                    return NextResponse.json(
                        { error: "Error updating user" },
                        { status: 500 }
                    );
                }
            }

            case "user.deleted": {
                const { id } = evt.data;
                try {
                    await User.findOneAndDelete({ clerkId: id });
                    console.log('User deleted successfully');
                    return NextResponse.json({ success: true });
                } catch (error) {
                    console.error('Error deleting user:', error);
                    return NextResponse.json(
                        { error: "Error deleting user" },
                        { status: 500 }
                    );
                }
            }

            default:
                console.log(`Unhandled event type: ${eventType}`);
                return NextResponse.json(
                    { error: "Unhandled event type" },
                    { status: 400 }
                );
        }
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
} 