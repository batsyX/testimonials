import dbConnect from "@/lib/dbConnect";
import SpaceTestimonials from "@/models/SpaceTestimonials";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    await dbConnect(); // Connect to the database

    // Parse the request body
    const { currTesti } = await req.json();

    if (!currTesti || !currTesti.spaceName || !currTesti.value) {
      return NextResponse.json(
        { message: "Invalid request data" },
        { status: 400 }
      );
    }

    // Find the testimonial by its unique identifier (e.g., `spaceName` and `value`)
    const updatedTestimonial = await SpaceTestimonials.findOneAndUpdate(
      { spaceName: currTesti.spaceName, value: currTesti.value },
      { $set: { isLiked: !currTesti.isLiked } }, // Toggle the `isLiked` value
      { new: true } // Return the updated document
    );
    console.log("updatedTestimonial", updatedTestimonial);

    if (!updatedTestimonial) {
      return NextResponse.json(
        { message: "Testimonial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Testimonial updated successfully",
      data: updatedTestimonial,
    });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req){
  try {
    await dbConnect(); 
    const spaceName =await req.headers.get('spacename');
    console.log("spaceName", spaceName);
    const testimonials = await SpaceTestimonials.find({spaceName,isLiked:true});

    return NextResponse.json({ testimonials });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}