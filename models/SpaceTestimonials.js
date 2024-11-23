import mongoose from "mongoose";

const SpaceTestimonialsSchema = new mongoose.Schema(
{
    spaceName: { type: String},
    type: { type: String, required: true },
    value: { type: String},
    user: { type: String},
    email: { type: String},
    isLiked: { type: Boolean,default:false},
},
{timestamps:true}
)
const SpaceTestimonials = mongoose.models.SpaceTestimonials || mongoose.model("SpaceTestimonials", SpaceTestimonialsSchema);

export default SpaceTestimonials;

// export default mongoose.model.SpaceTestimonials || mongoose.model("SpaceTestimonials",SpaceTestimonialsSchema)