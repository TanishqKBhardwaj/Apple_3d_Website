import React from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import {watchImg,rightImg} from '../utils'
import VideoCarousel from './VideoCarousel'


function Highlights() {
    useGSAP(()=>{
        gsap.to('#title',{opacity:1,duration:1.5,delay:2,y:0})
        gsap.to('.link',{opacity:1,duration:1.5,delay:2,y:0,stagger:0.25})
    })
  return (
    <section className='w-screen overflow-hidden h-full common-padding bg-zinc'>
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
