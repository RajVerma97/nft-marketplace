import { useAnimations, useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';

interface RenderWalletIntegrationModelProps {
  position: number[];
  rotation: number[];
  scale: number;
}

const RenderWalletIntegrationModel = (
  props: RenderWalletIntegrationModelProps
) => {
  const { nodes, materials, animations } = useGLTF('/jump-transformed.glb');
  const { ref, actions } = useAnimations(animations);
  const isInView = useRef(false);
  const scrollY = useRef(0);

  useEffect(() => {
    if (actions.jump) {
      actions.jump.reset().play();
      actions.jump.paused = true;
    }
  }, [actions]);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
      const scrollPercentage =
        scrollY.current / (document.body.scrollHeight - window.innerHeight); // Calculate scroll percentage
      if (actions.jump) {
        if (scrollPercentage > 0.2 && !isInView.current) {
          actions.jump.paused = false;
          isInView.current = true;
        } else if (scrollPercentage <= 0.2 && isInView.current) {
          actions.jump.paused = true;
          isInView.current = false;
        }

        if (isInView.current) {
          actions.jump.time =
            actions.jump.getClip().duration * scrollPercentage; // Update time based on scroll percentage
        }
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [actions]);
  return (
    <group {...props} ref={ref}>
      <primitive object={nodes.mixamorigHips} />
      <skinnedMesh
        castShadow
        receiveShadow
        geometry={nodes.Ch03.geometry}
        material={materials.Ch03_Body}
        skeleton={nodes.Ch03.skeleton}
      />
    </group>
  );
};

export default RenderWalletIntegrationModel;
