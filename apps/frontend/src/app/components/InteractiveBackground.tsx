import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import RenderDinoModel from './RenderDragonModel';

interface InteractiveBackgroundProps {
  scrollY: number;
}

export default function InteractiveBackground({
  scrollY,
}: InteractiveBackgroundProps) {
  const backgroundHeight = Math.max(0, 100 - scrollY * 0.3); // Shrink effect
  const dinoScale = Math.max(1, 1 + scrollY * 0.002); // Scale based on scroll

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: -1,
      }}
      initial={{ height: '100vh' }}
      animate={{
        height: `${backgroundHeight}vh`,
        translateY: `${scrollY * 0.2}px`,
      }} // Parallax effect
      transition={{ type: 'tween', duration: 0.5 }}
    >
      <Canvas
        camera={{ position: [50, 40, 50], fov: 15 }}
        className="flex justify-center items-center"
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <RenderDinoModel modelPath={'/dino-model/dino.glb'} scale={dinoScale} />
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
      <motion.div
        style={{
          position: 'absolute',
          top: '65%',
          left: '50%',
          transform: 'translate3d(-50%,-50%,0)',
        }}
      >
        <h1
          className=" text-white "
          style={{
            margin: 0,
            padding: 0,
            fontSize: '4em',
            fontWeight: 500,
            letterSpacing: '-0.05em',
            backgroundColor: 'black',
          }}
        >
          Scroll To Explore
        </h1>
      </motion.div>
    </motion.div>
  );
}
