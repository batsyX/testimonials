import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Space from "@/models/Space";


const handler =async (req,res)=>{

  

    if (req.method === 'POST') {
      await dbConnect();
      try {
        const body=await req.json();
        const { userEmail,spaceName, header, subMessage, logo } = body;
        console.log(body);
        if (!userEmail|| !spaceName || !header || !subMessage || !logo) {
          return NextResponse.json({ message: "All fields (spaceName, header, subMessage, logo) are required" },{status:400});
        }
        const existingSpace = await Space.findOne({ spaceName });
        if (existingSpace) {
          return NextResponse.json({ error: "Space name already exists" },{message:"space already exists"},{status:400});
        }
        const newSpace = await Space.create({userEmail, spaceName, header, subMessage, logo });
        return NextResponse.json(
          { message: "Space created successfully", space: newSpace },
          { status: 201 }
        );
      } catch (error) {
        console.log(error);
        return NextResponse.json(
          { error: "Something went wrong" },
          { status: 500 }
        );
      }
    }
    if(req.method==='GET'){
      await dbConnect();
      try {
        const userEmail =await req.headers.get('useremail');

        if (userEmail) {
          const spaces = await Space.find({ userEmail:userEmail });
          return NextResponse.json({ spaces });
        }else{
          console.log('no user email');
          const spaces = await Space.find({  });
          return NextResponse.json({ spaces });
        }
      } catch (error) {
        console.log(error);
        return NextResponse.json(
          { error: "Something went wrong" },
          { status: 500 }
        );
      }
    }
    if(req.method==='DELETE'){
      await dbConnect();
      const body=await req.json();
      console.log(body);
      
      if(body.spaceName){
        try {
          const spaces= await Space.findOneAndDelete({spaceName:body.spaceName});
          return NextResponse.json({ message: "Space deleted successfully", spaces });
        } catch (error) {
          console.log(error);
          return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
          );
        }
      }
      
    }
}

export {handler as POST,handler as GET,handler as DELETE};