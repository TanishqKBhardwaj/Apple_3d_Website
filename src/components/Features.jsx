import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { explore1Img, explore2Img, exploreVideo } from '../utils';
gsap.registerPlugin(ScrollTrigger);
function Features() {
  const videoRef=useRef()
    useGSAP(()=>{
        
      gsap.to("#features-heading", {
        scrollTrigger: {
          trigger: "#features",
          start: "top 80%",
          end: "top 30%", // Adjusted end position
          toggleActions: "play none none none",
        },
        duration: 1.5,
        opacity: 1,
        y: -20,
      });
      
      gsap.to("#tagline h2", {
        scrollTrigger: {
          trigger: "#features-heading",
          start: "top 80%",
          end: "top 40%", // Adjusted end position
          toggleActions: "play none none none",
        },
        opacity: 1,
        duration: 1.5,
        stagger: 0.25,
      });
      
      gsap.to('.g_grow',{scrollTrigger:{
        trigger:'.g_grow',
        start:window.innerWidth<760?'top-80%':'top-top',
        toggleActions:'play none none none'
      },scale:1,ease:'power2.inOut',duration:1.5,opacity:1
      })

      gsap.to('#exploreVideo',{scrollTrigger:{
        trigger:'#exploreVideo',
        start:window.innerWidth<760?'top-80%':'top-top',
        toggleActions:'play pause reverse restart'
      },ease:'power2.inOut',duration:1.5,
      onComplete: ()=>{
        videoRef.current.play();
      }
      
      })

    },[])
  return (
    <section className='w-full common-padding bg-zinc relative overflow-hidden ' id='features'>
        <div className='screen-max-width'>
             <div className='mb-12 w-full  '>
                <h1 id='features-heading' className='section-heading'>Explore the Story</h1>
             </div>
             <div className='flex flex-col items-center justify-center overflow-hidden ' id='tagline'>
                <h2 className='font-semibold text-5xl lg:text-7xl opacity-0'>iPhone</h2>
                <h2 className='font-semibold text-5xl lg:text-7xl text-center h-auto p-3 opacity-0'>Forged in titanium</h2>
             </div>

             <div className='flex flex-col place-content-center w-full mt-10 sm:px-10'>

               <video  ref={videoRef} playsInline id='exploreVideo' className='w-full object-cover object-center rounded-md' preload='none' muted autoPlay>
                <source src={exploreVideo} type='video/mp4'></source>
               </video>
                <div className='flex flex-col md:flex-row gap-5 place-content-center w-full mt-10 ' id='images'>
                  <img src={explore1Img} className='g_grow  feature-video rounded-md '></img>
                  <img src={explore2Img} className='g_grow feature-video rounded-md'></img>

                </div>
                
                <div className='flex flex-col md:flex-row gap-5 place-content-center w-full mt-10 '>
                 <p className='feature-text g_grow'>iPhone 15 pro is <span className='text-white'>the first iPhone to feature an aerospace-grade titanium design</span>using the same alloy that spacecrafts use for mission to mars</p>
                 <p className='feature-text g_grow'>Titanium has one of the best strength to weight ratios of any metal,making these our <span className='text-white'>lightest Pro models ever</span>you'll notice the difference the moment you pickkk one up</p>

                </div>
                
             </div>
        </div>

    </section>
  )
}

export default Features
