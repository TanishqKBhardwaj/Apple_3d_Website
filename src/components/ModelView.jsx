import { OrbitControls, PerspectiveCamera, View } from '@react-three/drei'
import React, { Suspense } from 'react'
import Lights from './Lights'
import IPhone from './IPhone'
import { Html } from "@react-three/drei";
import * as THREE from 'three'


function ModelView({index,groupRef,gsapType,controlRef,setRotationSize,size,item}) {
  return (
   <View
   index={index}
   id={gsapType}
   className={` w-full h-full ${index==2?'right-[-100%]':''}`}>
   {/*Ambient light*/}
   <ambientLight intensity={0.3}/>

   <PerspectiveCamera makeDefault position={[0,0,4]}/>
     <Lights/>
     <OrbitControls
     makeDefault
     ref={controlRef}
     enableZoom={false}
     enablePan={false}
     rotateSpeed={0.4}
     target={new THREE.Vector3(0,0,0)}
     onEnd={()=>{setRotationState(controlRef.current.getAzimuthalAngle())}}/>
     <group ref={groupRef} name={`${index===1?'small':'large'}`} position={[0,0,0]}>

     <Suspense fallback={<Html><div>Loading...</div></Html>}>
  <IPhone scale={index===1?[15,15,15]:[17,17,17]} item={item} />
</Suspense>
     </group>
   </View>
  )
}

export default ModelView
