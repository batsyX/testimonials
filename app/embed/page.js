import React from 'react';
import TestimonialList from '../components/TestimonialList';


export default async function EmbedPage({ searchParams }) {
  const { spaceName } = await searchParams; 
  let testimonials = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/like`,{
        method: 'GET',
        headers: {'spacename': spaceName }
      });
    const body = await res.json();
    testimonials = body.testimonials
  } catch (error) {
    return (
      <div className='text-white'>
        <h3>Error fetching testimonials: {error.message}</h3>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return <h3 className='text-white'>No testimonials available for this space.</h3>;
  }

  return (
    <div className='h-[200px]'>
        <TestimonialList testimonials={testimonials} />
    </div>
  );
}
