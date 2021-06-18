import React from 'react'
import { useLoader } from 'react-three-fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'


const Model = (props) => {
    console.log(props.source)
    const model = useLoader(FBXLoader, props.source)
    return <primitive object={model} />

}
export default Model