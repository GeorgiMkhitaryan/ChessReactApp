import React, { Component, useEffect, useRef } from "react";
import * as THREE from "three";
import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { Asset } from 'expo-asset';

const App = () =>  {
  const orbitterRef = useRef()

  const _onGLContextCreate = async (gl) => {
    // 1. Scene
    const scene = new THREE.Scene();
    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    camera.position.set(0, 20, 30)
    camera.quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0).normalize(), -0.5);
    // 3. Renderer
    const asset = Asset.fromModule(require('./assets/test.FBX'));
    await asset.downloadAsync();
    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    let light = new THREE.AmbientLight()
    scene.add(light)

    let fbxLoader = new FBXLoader()

    fbxLoader.load(asset.uri, (fbx) => {
      console.log(fbx)
      scene.add(fbx);
    });
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    animate();
  };
  
  return (
    <GLView style={{ flex: 1 }} onContextCreate={_onGLContextCreate}/>
  );
    
}

export default App
