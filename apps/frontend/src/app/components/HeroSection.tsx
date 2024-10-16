import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import RenderModel from './RenderModel';

export default function HeroSection() {
  return (
    <div className="flex w-full h-[80vh] p-8">
      <div className="w-1/2 order-2 flex justify-center items-center overflow-hidden">
        <Canvas camera={{ position: [10, 5, 20], fov: 35 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[15, 5, 5]} intensity={1} />
          <OrbitControls enablePan={false} enableZoom={false} />
          <pointLight position={[5, 5, 5]} intensity={1} />
          <RenderModel modelPath={'/dino-model/scene.gltf'} />
        </Canvas>
      </div>

      <div className="w-auto flex flex-col justify-center text-white">
        <h1 className="text-5xl font-bold text-black">NFT MARKETPLACE</h1>
        <p className="mt-4 text-lg text-gray-500">Explore the world of NFTs</p>
      </div>
    </div>
  );
}
