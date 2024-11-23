
import FlyingHearts from '@/app/components/flyingHearts/FlyingHearts';
import SpaceComponent from '@/app/components/SpaceComponent';
import { notFound } from 'next/navigation';
import { Toaster } from 'sonner';

export default async function SpacePage({ params }) {
  const { spaceName } =await params;
  const getSpaces = async () => {
   try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/space`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',},
    });

    if (!res.ok) {
      throw new Error('Failed to fetch spaces');
    }

    return res.json();
   } catch (error) {
    console.log(error)
   }
  };

  // Fetch spaces
  const { spaces } = await getSpaces();

  // Find the space based on the route parameter
  const space = spaces.find((s) => s.spaceName === spaceName);
  if (!space) {
    notFound(); // Render a 404 page if the space doesn't exist
  }

  return (
    <div style={{background:'white'}} className=' w-full h-screen flex justify-center items-center'>
      <Toaster richColors/>
      <div className=' z-20  absolute  w-full ' >
        <SpaceComponent header={space.header} subMessage={space.subMessage} currLogo={space.logo} spaceName={space.spaceName}/>
      </div>
      <div className='z-10 ' >
        <FlyingHearts/>
      </div>
    </div>
  );
}
