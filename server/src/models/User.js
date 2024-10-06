import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Define the schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId; // Password required only if Google OAuth is not used
    },
  },
  googleId: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); // Skip if password is not modified
  }

  try {
    const salt = await bcrypt.genSalt(10); // Generate salt with a cost factor of 10
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
  } catch (error) {
    next(error);
  }
});

// Compare input password with the hashed password
userSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

// Create and export the User model
export const User = mongoose.model("User", userSchema);
