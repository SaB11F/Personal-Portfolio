import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      maxlength: 254,
    },
    company: {
      type: String,
      default: "",
      trim: true,
      maxlength: 150,
    },
    subject: {
      type: String,
      default: "",
      trim: true,
      maxlength: 200,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
  },
  { timestamps: true },
);

const ContactMessage = mongoose.model("ContactMessage", contactMessageSchema);

export default ContactMessage;
