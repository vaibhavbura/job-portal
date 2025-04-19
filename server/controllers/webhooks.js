import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller Function to manage clerk user with database
const clerkWebhooks = async (req, res) => {
  try {
    console.log('=== Webhook Request Received ===');
    console.log('Headers:', req.headers);
    console.log('Body:', JSON.stringify(req.body, null, 2));

    // Set timeout for the entire operation
    res.setTimeout(8000, () => {
      res.status(504).json({ success: false, message: "Request timeout" });
    });

    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    console.log('Webhook secret configured:', process.env.CLERK_WEBHOOK_SECRET ? 'Yes' : 'No');

    try {
      await whook.verify(JSON.stringify(req.body), {
        "svix-id": req.headers["svix-id"],
        "svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature": req.headers["svix-signature"],
      });
      console.log('Webhook signature verified successfully');
    } catch (verifyError) {
      console.error('Webhook verification failed:', verifyError);
      return res.status(400).json({ 
        success: false, 
        message: "Webhook verification failed",
        error: verifyError.message 
      });
    }

    const { data, type } = req.body;
    console.log('Processing webhook type:', type, 'for user:', data.id);

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: "",
        };
        console.log('Attempting to create user with data:', userData);
        try {
          const createdUser = await User.create(userData);
          console.log('User created successfully in MongoDB:', createdUser);
          return res.json({ success: true, user: createdUser });
        } catch (dbError) {
          console.error('Database error during user creation:', dbError);
          return res.status(500).json({ 
            success: false, 
            message: "Database error during user creation",
            error: dbError.message 
          });
        }
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
        };
        console.log('Attempting to update user:', data.id, 'with data:', userData);
        try {
          const updatedUser = await User.findOneAndUpdate(
            { clerkId: data.id },
            userData,
            { new: true }
          );
          console.log('User updated successfully in MongoDB:', updatedUser);
          return res.json({ success: true, user: updatedUser });
        } catch (dbError) {
          console.error('Database error during user update:', dbError);
          return res.status(500).json({ 
            success: false, 
            message: "Database error during user update",
            error: dbError.message 
          });
        }
      }

      case "user.deleted": {
        console.log('Attempting to delete user:', data.id);
        try {
          const deletedUser = await User.findOneAndDelete({ clerkId: data.id });
          console.log('User deleted successfully from MongoDB:', deletedUser);
          return res.json({ success: true, user: deletedUser });
        } catch (dbError) {
          console.error('Database error during user deletion:', dbError);
          return res.status(500).json({ 
            success: false, 
            message: "Database error during user deletion",
            error: dbError.message 
          });
        }
      }

      default:
        console.log('Unhandled webhook type:', type);
        return res.json({ success: true });
    }
  } catch (error) {
    console.error("Webhook Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Webhook Error",
      error: error.message 
    });
  }
};

export { clerkWebhooks };
