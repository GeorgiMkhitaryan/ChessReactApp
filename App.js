import React, { Component, useEffect, useRef } from "react";
import * as THREE from "three";
import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { Asset } from 'expo-asset';
import { TextureLoader } from 'three';

const App = () =>  {
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
    camera.position.set(0, 40, 30)
    camera.quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0).normalize(), -0.8);
    // 3. Renderer
    const assetFbx = Asset.fromModule(require('./assets/test.FBX'));
    await assetFbx.downloadAsync();

    const assetMap = Asset.fromModule(require('./assets/images/black/Color.jpg'));
    await assetMap.downloadAsync();

    const assetRog = Asset.fromModule(require('./assets/images/black/Roughness.jpg'));
    await assetRog.downloadAsync();
    
    const assetMetal = Asset.fromModule(require('./assets/images/black/Normal.jpg'));
    await assetMetal.downloadAsync();

    const assetMapWhite = Asset.fromModule(require('./assets/images/white/Color.jpg'));
    await assetMap.downloadAsync();

    const assetRogWhite = Asset.fromModule(require('./assets/images/white/Roughness.jpg'));
    await assetRog.downloadAsync();
    
    const assetMetalWhite = Asset.fromModule(require('./assets/images/white/Normal.jpg'));
    await assetMetal.downloadAsync();

    //////////////////////////////////////////////////////

    const cubeMap1 = Asset.fromModule(require('./assets/images/cubeMap/px.png'));
    await cubeMap1.downloadAsync();

    const cubeMap2 = Asset.fromModule(require('./assets/images/cubeMap/py.png'));
    await cubeMap2.downloadAsync();
    
    const cubeMap3 = Asset.fromModule(require('./assets/images/cubeMap/pz.png'));
    await cubeMap3.downloadAsync();

    const cubeMap4 = Asset.fromModule(require('./assets/images/cubeMap/nx.png'));
    await cubeMap4.downloadAsync();

    const cubeMap5 = Asset.fromModule(require('./assets/images/cubeMap/nx.png'));
    await cubeMap5.downloadAsync();
    
    const cubeMap6 = Asset.fromModule(require('./assets/images/cubeMap/nx.png'));
    await cubeMap6.downloadAsync();


    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    let light = new THREE.AmbientLight()
    scene.add(light)

    let fbxLoader = new FBXLoader()

    fbxLoader.load(assetFbx.uri, (fbx) => {
      console.log(fbx)
      fbx.children.forEach( item => {
        const textureLoader = new TextureLoader();
        const loader = new THREE.CubeTextureLoader();
        const textureCube = loader.load( [
          cubeMap1, cubeMap2,
          cubeMap3, cubeMap4,
          cubeMap5, cubeMap6
        ] );

        if(item.type === "Group" && item.name === 'black' || item.name === "texts"){
          item.traverse( blackItem => {
            const map = textureLoader.load(
              assetMap.uri,
            );
            const roughnessMap = textureLoader.load(
              assetRog.uri,
            );
            const metalnessMap = textureLoader.load(
              assetMetal.uri,
            );
            let material = new THREE.MeshPhysicalMaterial({map, roughness: 0.3, metalness: 0.3, roughnessMap, metalnessMap, envMap: textureCube})
            material.needsUpdate = true
            blackItem.material = material
          } )
        } else if(item.type === "Group" && item.name === 'white'){
          item.traverse( blackItem => {
            const map = textureLoader.load(
              assetMapWhite.uri,
              (texture)=> {
                texture.repeat.x = 1;
                texture.repeat.y = 1;
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
              }
            );
            const roughnessMap = textureLoader.load(
              assetRogWhite.uri,
            );
            const metalnessMap = textureLoader.load(
              assetMetalWhite.uri,
            );
            
            let material = new THREE.MeshPhysicalMaterial({map, roughness: 0.3, metalness: 0.3, roughnessMap, metalnessMap, envMap: textureCube})
            material.needsUpdate = true
            blackItem.material = material
          } )
        }
      } )
      scene.add(fbx);
      const light = new THREE.PointLight(0xffffff, 0.8);
      light.position.set(10, 10, 10);
      scene.add(light);
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
