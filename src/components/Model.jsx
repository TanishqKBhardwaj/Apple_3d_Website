import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef, useState } from 'react'
import {yellowImg} from '../utils'
import {models, sizes} from '../constants'
import * as THREE from 'three'
import ModelView from './ModelView'
import { Canvas } from '@react-three/fiber'
import { View } from '@react-three/drei'

function Model() {
    useGSAP(()=>{
      gsap.to('#heading',{
        scrollTrigger: {
            trigger: "#model",
            start: "top 80%", // Animation starts when #model reaches 80% of the viewport height
            end: "top 50%", // Animation completes when it reaches 50% of the viewport
            toggleActions: "play none play none",
          },
        opacity:1,
        y:0,
        ease:"power1.inOut"
      })
    },[])

    const [size,setSize]=useState('small')
    const [model,setModel]=useState({
        title:'iPhone 15 Pro in natural Titanium',
        color:['#8f8A81','#FFE7B9','#6f6C64'],
        img:yellowImg
    })

    //Camera control for the model view
    const cameraControlSmall=useRef()
    const cameraControlLarge=useRef()

    const small=useRef(new THREE.Group());
    const large=useRef(new THREE.Group());

    const [smallRotaion,setSmallRotation]=useState(0)
    const [largeRotaion,setLargeRotation]=useState(0)
     
    const [button,setButton]=useState('small')
    
      const buttonAnimation = (value) => {
        const isActive = size === value; // Check before animation starts
    
        gsap.to(`#${button}`, {
            backgroundColor:  'black',
            color:'white',
            ease: "power1.inOut", // Correct easing function 
        });

        gsap.to(`#${value}`, {
          backgroundColor:  'white',
          color:'black',
          ease: "power1.inOut", // Correct easing function
      });
      setButton(value);

    };
    
    

  return (
    <section className='common-padding' id='model'>
        <div className='screen-max-width'>
            <h1 id='heading' className='section-heading'>
            Take a closer look.
            </h1>
            <div className='flex flex-col items-center mt-5'>
                <div className='w-full h-[75vh] md:h-[90vh] overflow-hidden relative'>
                  <ModelView index={1} groupRef={small} gsapType="view1" controlRef={cameraControlSmall} setRotationState={setSmallRotation} item={model} size={size}/>
                  <ModelView index={2} groupRef={large} gsapType="view2" controlRef={cameraControlLarge} setRotationState={setLargeRotation} item={model} size={size}/>
                  <Canvas
                  className='h-full w-full' style={{
                    position:'fixed',
                    top:0,
                    bottom:0,
                    left:0,
                    right:0,
                    overflow:'hidden'
                  }} eventSource={document.getElementById('root')}><View.Port></View.Port></Canvas>
                </div>

                <div className='mx-auto w-full mt-10'>
                  <p className='text-sm font-light text-center mb-5'>{model.title}</p>

                  <div className='flex place-content-center'>
                    <ul className='color-container'>
                      { models.map((item,index)=>(
                        <li key={index} className='w-6 h-6 rounded-full mx-2 cursor-pointer' style={{
                          backgroundColor:item.color[0]
                        }}
                        onClick={()=>setModel(item)}/>
                      ))
                        
                      }

                    </ul>

                    <button className='size-btn-container'>
                      {sizes.map(({label,value})=>(
                        <span key={label} id={value} className={`${value==='small'?"text-black bg-white":"text-white bg-black"} rounded-full h-10 w-10`} onClick={()=>{
                          setSize(value); buttonAnimation(value)}}
                          >{label}</span>
                      ))}
                    </button>
                  </div>
                    
                </div>

            </div>

        </div>
    </section>
  )
}

export default Model
