import React, { useEffect, useRef, useState } from 'react'
import {hightlightsSlides} from '../constants'
import { pauseImg, playImg, replayImg } from '../utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function VideoCarousel() {

  const videoRef=useRef([]); //array which will ref to all videos
  const videoSpanRef=useRef([]);
  const videoDivRef=useRef([]);

  const [video,setVideo]=useState({
    isEnd:false,
    startPlay:false,
    videoId:0,
    isLastVideo:false,
    isPlaying:true
  })

  const {isEnd,
    startPlay,
    videoId,
    isLastVideo,
    isPlaying}=video;

    const [loadedData,setLoadedData]=useState([]);

    useGSAP(()=>{
     gsap.to('#video',{
      scrollTrigger:{
        trigger:'#video', //starts the animation when we scroll and video appears first time
        toggleActions:'restart none none none' //entering, leaving ,back entering  ,back leaving
      },
      onComplete:()=>{
        setVideo((prev)=>({...prev,startPlay:true}))

      }
     })
    },[isEnd,videoId])

    const handleLoadedMetaData=(i,e)=>{
      setLoadedData((pre)=>[...pre,e])
    }

    useEffect(()=>{
      if(loadedData.length>3){
        if(!isPlaying){
          videoRef.current[videoId].pause();
        }
        else{
          startPlay && videoRef.current[videoId].play();
        }
      }

    },[startPlay,videoId,isPlaying,loadedData])

    useEffect(()=>{
     let currentProgress=0
     let span=videoSpanRef.current;

     if(span[videoId]){
      //animating the progress of the video here
      let anim=gsap.to(span[videoId],{
        onUpdate:()=>{
          const progress=Math.ceil(anim.progress*100)//by gsap you can track the animation's progress
            if(progress!=currentProgress)
              currentProgress=progress;
            gsap.to(videoDivRef.current[videoId],{
              width:window.innerWidth<1200?'10vw':'4vw'
            })
            gsap.to(videoSpanRef.current[videoId],{
              width:`${currentProgress}%`,
              backgroundColor:'white'

            })
        },
        onComplete:()=>{
          gsap.to(videoDivRef.current[videoId],{
            width:'12px'
          })
          gsap.to(videoSpanRef.current[videoId],{
            
            backgroundColor:'#afafaf'

          })
        }
      })
      if(videoId==0)
        anim.restart() //To restart teh animation
     }
     const animUpdate=()=>{
      anim.progress(videoRef.current[videoId]/hightlightsSlides[videoId].videoDuration)
     }
     if(isPlaying){
      gsap.ticker.add(animUpdate)//ticker changes athe animation's progress bar
     }else{
      gsap.ticker.remove(animUpdate)
     }
    },[videoId,startPlay])

    const handleProcess=(type,i)=>{
      switch (type) {
        case 'video-end':
          setVideo((prev)=>({...prev,isEnd:true,videoId:i+1}))
          break;
        case 'video-last':
          setVideo((prev)=>({...prev,isLastVideo:true}))
          break;
        case 'video-reset':
          setVideo((prev)=>({...prev,isLastVideo:false,videoId:0}))
          break;
        case 'play':
          setVideo((prev)=>({...prev,isPlaying:!prev.isPlaying}))
          break;
      
        default:
          break;
      }
    }

  return (
   <>
   <div className='flex items-center'>{
    hightlightsSlides.map((item,index)=>(
      <div key={index} id="slider" className='pr-20 md:pr-10'>
        <div className='video-carousel_container'>
          <div className='w-full h-full flex items-center rounded-3xl bg-black overflow-hidden'>
          <video id="video" playsInline={true} muted preload='auto' 
          ref={(el)=>{videoRef.current[index]=el}} onPlay={()=>{
            setVideo((prevVideo)=>({
              ...prevVideo,isPlaying:true
            }))
          }} onLoadedMetadata={(e)=>handleLoadedMetaData(index,e)}>
            <source src={item.video} type='video/mp4'/>
          </video>
          <div className='absolute top-12 left-[5%]'>
            {item.textLists.map((text,index)=>(
              <p className="z-10" key={index}>{text}</p>
            ))}
          </div>
          </div>
        </div>
        </div>
    ))}

   </div>
   <div className='relative flex place-content-center  mt-10'>
    <div className=' flex items-center py-5 px-7 bg-gray-300 rounded-full'>
       {videoRef.current.map((_,index)=>(
        <span
        key={index} ref={(el)=>(videoDivRef.current[index]=el)} className='bg-gray-200 w-3 h-3 mx-2 cursor-pointer rounded-full relative'>
          <span key={index} className='h-full w-full absolute rounded-full ' ref={(el)=>(videoSpanRef.current[index]=el)}></span>
          
        </span>
        
       ))}



    </div>
    <button className='control-btn' onClick={isLastVideo?()=>handleProcess('video-reset'):!isPlaying?()=>handleProcess('play'):()=>handleProcess('pause')}>
      <img src={isLastVideo?replayImg:!isPlaying?playImg:pauseImg} alt={isLastVideo?'replay':!isPlaying?'play':'pause'}></img>
    </button>
   </div>
   </>
  )
}

export default VideoCarousel
