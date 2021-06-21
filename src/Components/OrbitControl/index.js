import React, { useRef, useEffect } from 'react'
import { extend, useFrame, useThree } from 'react-three-fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend({ OrbitControls })

export default function Controls(props) {
  const controls = useRef()
  useEffect(() => {
    controls.current.listenToKeyEvents(window)
    
  }, []);
  const { camera, gl } = useThree()
  useFrame(() => controls.current.update())
  return <orbitControls {...props} ref={controls} args={[camera, gl.domElement]} enableDamping dampingFactor={0.1}/>
}
