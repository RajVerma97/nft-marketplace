import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import RenderModel from './RenderModel';
import { Button } from '@my-org/ui-components'; // Adjust the import based on your paths

export default function HeroSection() {
  return (
    <div className="flex w-full h-[78vh]  p-8 bg-gradient-to-r from-gray-900 to-black border-2 border-gray-800 rounded-lg shadow-lg mt-4">
      <div className="w-1/2 order-2 flex justify-center items-center overflow-hidden">
        <Canvas camera={{ position: [15, 5, 20], fov: 35 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[15, 5, 5]} intensity={1} />
          <OrbitControls enablePan={false} enableZoom={false} />
          <pointLight position={[5, 5, 5]} intensity={1} />
          <RenderModel modelPath={'/dino-model/dino.glb'} />
        </Canvas>
      </div>

      <div className="w-auto flex flex-col justify-center text-white px-8">
        <h1 className="text-5xl font-bold  bg-transparent whitespace-nowrap">
          NFT MARKETPLACE
        </h1>
        <p className="mt-4 text-lg md:text-xl">Explore the world of NFTs</p>
        <Button variant={'default'} className="bg-white text-black mt-4 text-lg p-2">
          Get Started
        </Button>
      </div>
    </div>
  );
}
