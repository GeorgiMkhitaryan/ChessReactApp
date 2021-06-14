import React, { useRef, useState, useMemo, Suspense } from 'react';
import { StyleSheet, View } from 'react-native';
import { Canvas, useFrame } from 'react-three-fiber';
import Model from './src/Components/ChessBord'
import Scene from './src/Components/Scene'


export default function App() {

  return (
    <View style={styles.container}>
      <Canvas>
        <Scene>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            <Model/>
          </Suspense>
        </Scene>
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
