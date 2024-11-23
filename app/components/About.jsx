
const images=[
    {src:'https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/assets%2Fintegrations%2Fwebflow.png?alt=media&token=c9e4e238-3200-49a4-9147-c97dd8db1108'},
    {src:'https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/assets%2Fintegrations%2Fshopify-logo.png?alt=media&token=fee7c8d9-a41e-433e-b37b-8704417d1827'},
   { src:'https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/assets%2Fintegrations%2Fcarrd-logo.png?alt=media&token=8bbafb5e-e33e-4dab-9fea-6e5f5eb37cf9'},
    {src:'https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/assets%2Fintegrations%2Fwordpress-logo.png?alt=media&token=badfe040-7a96-40af-948b-a16c2586a8ec'},
    {src:'https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/assets%2Fintegrations%2Fbubble-logo.svg?alt=media&token=2985b54a-d6cf-4d24-a219-95c48996fa34'},
    {src:'https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/assets%2Fintegrations%2Fframer-logo.png?alt=media&token=30f72e56-ca63-40a3-8ce3-7c9ecd09fd15'},
    {src:'https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/assets%2Fintegrations%2Fkajabi-logo.svg?alt=media&token=1bf05142-b84d-4513-9653-03c61b79fd24'},
    {src:'https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/assets%2Fintegrations%2Fsquarespace-logo-horizontal-black.jpeg?alt=media&token=e4227cfe-c88b-4aa1-bbc5-444a10410789'}
]

const About = () => {
  return (
    <div className="w-full flex flex-col items-center mt-44">
        <h2 className="text-white font-bold text-6xl px-10 text-center">Integrate with any platform</h2>
        <h2 className="text-gray-600 font-bold text-2xl px-20 text-center my-5">We built the ultimate tool for showcasing your satisfied customers. With 3-lines of HTML code, you can embed all your testimonials to any platform!</h2>
        <div className="w-3/4 grid grid-cols-2 gap-4 mt-12 sm:gap-6 lg:mt-16 max-sm:grid-cols-1 lg:grid-cols-4 pb-10">
            {
                images.map((item,idx)=>{
                    return <div key={idx} >
                        <img className="bg-white w-[300px] rounded-xl flex items-center justify-center px-8 py-4 h-[100px]"  src={item.src} />
                    </div>
                })
            }
        </div>
    </div>
  )
}

export default About