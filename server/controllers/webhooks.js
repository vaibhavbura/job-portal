import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller Function to manage clerk user with database
const clerkWebhooks = async (req, res) => {
  try {
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
        await User.create(userData);
        return res.json({ success: true });
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData, { new: true });
        return res.json({ success: true });
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        return res.json({ success: true });
      }

      default:
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
