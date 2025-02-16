import React from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import {watchImg,rightImg} from '../utils'
import VideoCarousel from './VideoCarousel'


function Highlights() {
    useGSAP(()=>{
        gsap.to('#title',{ scrollTrigger: {
            trigger: "#highlights",
            start: "top 80%", // Animation starts when #model reaches 80% of the viewport height
            end: "top 50%", // Animation completes when it reaches 50% of the viewport
            toggleActions: "play none none none",
          },opacity:1,duration:1.5,y:0})
        gsap.to('.link',{scrollTrigger: {
            trigger: "#highlights",
            start: "top 80%", // Animation starts when #model reaches 80% of the viewport height
            end: "top 50%", // Animation completes when it reaches 50% of the viewport
            toggleActions: "play none none none",
          },opacity:1,duration:1.5,y:0,stagger:0.25})
    })
  return (
    <section className='w-screen overflow-hidden h-full common-padding bg-zinc' id='highlights'>
        <div className='screen-max-width'>
            <div className='mb-12 w-full flex flex-col md:flex-row items-end jusitfy-start md:justify-between'>
                <h1 id='title' className='section-heading'>Get the highlights.</h1>
                <div className='flex gap-5'>
                    <p className='link'>Watch the film
                    <img src={watchImg} alt="watch" />
                    </p>

                    <p className='link'>Watch the Event
                    <img src={rightImg} alt="right"/>
                    </p>
                </div>
            </div>
            <VideoCarousel/>
        </div>

    </section>
  )
}

export default Highlights
