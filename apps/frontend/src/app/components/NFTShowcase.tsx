import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Gltf, Text, Preload } from '@react-three/drei';
import { Link } from 'wouter';
import { Button } from '@my-org/ui-components';
import Frame from './Frame';
import Rig from './Rig';
import { Euler, Vector3 } from 'three';

export const NFTShowcase = () => {
  const [showBackButton, setShowBackButton] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);



  const handleModelClick = () => {
    setShowBackButton(true);
  };

  const handleBackButtonClick = () => {
    setShowBackButton(false);
  };

  useEffect(() => {
    const handleScroll = (event: WheelEvent | TouchEvent) => {
      event.preventDefault();
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('wheel', handleScroll, { passive: false });
      canvas.addEventListener('touchmove', handleScroll, { passive: false });
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('wheel', handleScroll);
        canvas.removeEventListener('touchmove', handleScroll);
      }
    };
  }, []);

  return (
    <div className="w-full min-h-screen relative overflow-hidden ">
      <Canvas
        ref={canvasRef}
        flat
        camera={{ fov: 10, position: [5, 5, 35] }}
        eventPrefix="client"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          borderRadius: '8px',
        }}
      >
        <color attach="background" args={['#fff']} />

        <Text
          fontSize={0.8}
          position={[0, 2, 1]}
          anchorX="center"
          anchorY="middle"
          material-toneMapped={false}
          color={'#6366f1'}
          fontWeight={'600'}
        >
          NFT GALLERY
        </Text>

        <Frame
          id="01"
          name={`pick\nles`}
          author="Aniket"
          bg="#e4cdac"
          position={new Vector3(-1.15, 0, 0)}
          rotation={new Euler(0, 0.5, 0)}
          onModelClick={handleModelClick}
        >
          <Gltf
            src="pickles_3d_version_of_hyuna_lees_illustration-transformed.glb"
            scale={8}
            position={[0, -0.7, -2]}
          />
        </Frame>
        <Frame
          id="02"
          name="tea"
          author="Rajneesh"
          onModelClick={handleModelClick}
        >
          <Gltf src="fiesta_tea-transformed.glb" position={[0, -2, -3]} />
        </Frame>
        <Frame
          id="03"
          name="still"
          author="Aman"
          bg="#d1d1ca"
          position={new Vector3(1.15, 0, 0)}
          rotation={new Euler(0, -0.5, 0)}
          onModelClick={handleModelClick}
        >
          <Gltf
            src="still_life_based_on_heathers_artwork-transformed.glb"
            scale={2}
            position={[0, -0.8, -4]}
          />
        </Frame>
        <Rig />
        <Preload all />
      </Canvas>
      {showBackButton && (
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translate3d(-50%, -50%, 0)',
          }}
        >
          <Link href="/" onClick={handleBackButtonClick}>
            <Button className="bg-white text-black px-8 rounded-lg center">
              Back
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
