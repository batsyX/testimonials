import mongoose from "mongoose";

const SpaceSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: [true, "User email is required"],
    },
    spaceName: {
      type: String,
      required: [true, "Space name is required"],
      unique: true, // Ensure uniqueness of the space name
      trim: true,
    },
    header: {
      type: String,
      required: [true, "Header is required"],
    },
    subMessage: {
      type: String,
      required: [true, "Sub-message is required"],
    },
    logo: {
      type: String, // URL of the uploaded logo
      required: true,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Export model
export default mongoose.models.Space || mongoose.model("Space", SpaceSchema);
