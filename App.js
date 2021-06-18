import React, { Component } from "react";
import * as THREE from "three";
import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { Asset } from 'expo-asset';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class App extends Component {
  _onGLContextCreate = async (gl) => {
    // 1. Scene
    var scene = new THREE.Scene();
    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    this.camera = camera
    camera.position.set(0, 10, 0)
    // 3. Renderer
    const asset = Asset.fromModule(require('./assets/test.FBX'));
    await asset.downloadAsync();
    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    const controls = new OrbitControls(camera, renderer.domElement)
    let light = new THREE.AmbientLight()
    scene.add(light)

    let fbxLoader = new FBXLoader()

    fbxLoader.load(asset.uri, (fbx) => {
      scene.add(fbx);
    });

    camera.position.z = 20;

    controls.update()
    const animate = () => {
      if(scene.children[1]){
        // scene.children[1].rotation.x += 0.02;
        scene.children[1].rotation.y += 0.003;
      }
      
      controls.update()
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    animate();
  };
  shouldComponentUpdate() {
    console.log("ssssssssssssss")
  }
  render() {
    return (
      <GLView style={{ flex: 1 }} onContextCreate={this._onGLContextCreate}/>
    );
  }
}

