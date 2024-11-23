import dbConnect from "@/lib/dbConnect";
import SpaceTestimonials from "@/models/SpaceTestimonials";
import { NextResponse } from "next/server";

const handler =async(req,res)=>{

    if(req.method==='GET'){
        try {
            await dbConnect();
            const spaceName =await req.headers.get('spacename');
            const testimonials = await SpaceTestimonials.find({spaceName});
            return NextResponse.json({ testimonials },{status:200});
        } catch (error) {
            console.log(error)
        }
    }

    if(req.method==='POST'){
        try {
            await dbConnect();
            const body =await req.json();
            console.log(body)
            const testimonial = new SpaceTestimonials(body);
            await testimonial.save();
            
            return NextResponse.json({ message:"success" },{status:201});
        } catch (error) {
            return NextResponse.json({ message: 'Failed to send testimonial' },{status:400});
        }
    }
    if(req.method==='DELETE'){
        try {
            await dbConnect();
            const body =await req.json();
            const {testimonialId} = body;
            await SpaceTestimonials.findByIdAndDelete(testimonialId);
            return NextResponse.json({ message: 'Testimonial deleted successfully' },{status:200});
        } catch (error) {
            return NextResponse.json({ message: 'Failed to delete testimonial' },{status:400});
        }
    }

}


export {handler as GET,handler as POST,handler as DELETE}