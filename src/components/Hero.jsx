import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { heroVideo,smallHeroVideo } from '../utils'

function Hero() {
    const [videosrc,setVideoSrc]=useState(window.innerWidth<760?smallHeroVideo:heroVideo)
    const handleVideoSrc=()=>{
        if(window.innerWidth<760)
            setVideoSrc(smallHeroVideo)
        else
        setVideoSrc(heroVideo)
    }
    useEffect(()=>{
       window.addEventListener('resize',handleVideoSrc); 
       return ()=>{
        window.removeEventListener('resize',handleVideoSrc)
       }
    },[])
    useGSAP(()=>{
        gsap.to('#hero',{opacity:1,delay:2,duration:1.5})
        gsap.to('#cta',{opacity:1,delay:2,y:-50,duration:1.5,ease:"bounce.out"})
        
    },[])
  return (
    <section className='w-full nav-height my-10 '>
        <div className='h-5/6 w-full  flex flex-center flex-col '>
            <p id="hero" className='hero-title'>iPhone 15 Pro</p>
        <div>
            <video className='pointer-events-none' autoPlay muted playsInline={true} key={videosrc}>
                <source src={videosrc} type='video/mp4'></source>
            </video>
        </div>
        <div id="cta" className='space-y-10 flex flex-col mt-5 md:mt-0 items-center opacity-0 translate-y-20'>

        <a href='' className='bg-blue p-3 w-[30%] text-center rounded-3xl'>Buy</a>
        <p className='text-2xl'> From $199/month or $999</p>
        </div>
        </div>
    </section>
  )
}

export default Hero
