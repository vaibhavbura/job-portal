import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller Function to manage clerk user with database
const clerkWebhooks = async (req, res) => {
  try {
    console.log('Received webhook request:', req.body);
    
    // Set timeout for the entire operation
    res.setTimeout(8000, () => {
      res.status(504).json({ success: false, message: "Request timeout" });
    });

    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;
    console.log('Processing webhook type:', type, 'for user:', data.id);

    // Use bulk operations where possible
    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: "",
        };
        console.log('Creating user:', userData);
        const createdUser = await User.create(userData);
        console.log('User created successfully:', createdUser);
        return res.json({ success: true });
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
        };
        console.log('Updating user:', data.id, 'with data:', userData);
        const updatedUser = await User.findByIdAndUpdate(data.id, userData, { new: true });
        console.log('User updated successfully:', updatedUser);
        return res.json({ success: true });
      }

      case "user.deleted": {
        console.log('Deleting user:', data.id);
        const deletedUser = await User.findByIdAndDelete(data.id);
        console.log('User deleted successfully:', deletedUser);
        return res.json({ success: true });
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
