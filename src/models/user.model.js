// Import required libraries
import mongoose, { Schema } from "mongoose"; // For database schema
import bcrypt from "bcryptjs"; // For hashing passwords
import jwt from "jsonwebtoken"; // For creating tokens
import crypto from "crypto"; // For creating secure random tokens

// Define the user schema (structure of data)
const userSchema = new Schema({
  // Avatar (profile picture)
  avatar: {
    type: {
      url: String,
      localpath: String,
    },
    default: {
      url: `https://placehold.co/400`, // default image URL
      localpath: "",
    },
  },

  // Username field
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  // Email field
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  // Full name
  fullname: {
    type: String,
    required: true,
  },

  // Password
  password: {
    type: String,
    required: [true, "password is required"],
  },

  // Email verification flag
  isEmailVerified: {
    type: Boolean,
    default: false,
  },

  // For password reset
  forgotPasswordToken: {
    type: String,
  },
  forgotPasswordExpiry: {
    type: Date,
  },

  // For login session refresh
  refreshToken: {
    type: String,
  },

  // Email verification token and expiry
  emailVerificationToken: {
    type: String,
  },
  emailVerificationExpiry: {
    type: Date,
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

// Hash password before saving to DB
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // If password is not changed, skip
  this.password = await bcrypt.hash(this.password, 10); // Hash password
  next();
});

// Compare entered password with hashed password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate access token (short-lived)
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

// Generate refresh token (long-lived)
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

// Create a temporary token for password reset or email verification
userSchema.methods.generateTemporaryToken = function () {
  const unHashedToken = crypto.randomBytes(20).toString("hex"); // Generate random string
  const hashedToken = crypto.createHash("sha256").update(unHashedToken).digest("hex"); // Hash it
  const tokenExpiry = Date.now() + 20 * 60 * 1000; // Set expiry to 20 minutes from now

  return { hashedToken, unHashedToken, tokenExpiry };
};

// Create the User model using the schema
export const User = mongoose.model("User", userSchema);
