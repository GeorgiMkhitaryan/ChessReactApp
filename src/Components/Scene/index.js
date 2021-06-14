import React from 'react'
import { extend, useThree } from 'react-three-fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend({ OrbitControls })

const Scene = (props) => {
  const {
    camera,
    gl: { domElement }
  } = useThree()
  return (
    <>
        {props.children}
        <orbitControls args={[camera, domElement]} />
    </>
  )
}

export default Scene