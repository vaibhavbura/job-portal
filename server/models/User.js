import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId: { 
        type: String, 
        required: true,
        unique: true
    },
    name: { 
        type: String, 
        required: true,
        trim: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true,
        lowercase: true
    },
    resume: { 
        type: String,
        default: ""
    }, 
    image: { 
        type: String, 
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

// Add index for faster queries
userSchema.index({ email: 1 });
userSchema.index({ clerkId: 1 });

// Log when a user is created
userSchema.post('save', function(doc) {
    console.log('User saved to database:', doc);
});

const User = mongoose.model('User', userSchema);

// Verify model is properly compiled
console.log('User model compiled:', User.modelName);

export default User;
