import React, { useMemo, useEffect, useState } from 'react'
import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Asset } from 'expo-asset';

const Model = (props) => {
    const asset = Asset.fromModule(require("../../../assets/scene.gltf"));
    asset.downloadAsync();
    const jsonModel = useLoader(GLTFLoader, asset.localUri).scene;
    const [loaded, setLoaded] = useState(false)

    useEffect(()=> {
        setLoaded(true)
        props.isloaded()
    }, [])

    let test = loaded ? <primitive object={jsonModel} /> : "";
    return test
    

}
export default Model