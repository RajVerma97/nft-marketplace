import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Text } from '@react-three/drei'; // Ensure Text is imported correctly
import * as THREE from 'three'; // Change from 'THREE' to '* as THREE' for compatibility

// Review and ReviewCard Interfaces
export interface Review {
  id: number;
  rating: number;
  text: string;
  author: string;
}

interface ReviewCardProps {
  review: Review;
  position: [number, number, number];
  isActive: boolean;
  opacity: number; // New prop for opacity
  onClick: () => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  position,
  isActive,
  opacity,
  onClick,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current && textRef.current) {
      meshRef.current.position.lerp(new THREE.Vector3(...position), 0.05);
      textRef.current.position.lerp(
        new THREE.Vector3(position[0], position[1] + 1.5, position[2]),
        0.05
      );
    }
  });

  const getColor = (rating: number) => {
    switch (true) {
      case rating >= 4:
        return { color: '#4CAF50', emissive: '#2e7d32' }; // Green neon
      case rating >= 3:
        return { color: '#FFC107', emissive: '#ff9800' }; // Yellow neon
      case rating < 3:
        return { color: '#F44336', emissive: '#c62828' }; // Red neon
      default:
        return { color: '#FFFFFF', emissive: '#FFFFFF' }; // Default white
    }
  };

  const { color, emissive } = getColor(review.rating);

  // Truncate text if too long
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  const maxTextLength = 30; // Maximum length for the review text

  return (
    <>
      <mesh ref={meshRef} scale={isActive ? 1 : 0.8} onClick={onClick}>
        <boxGeometry args={[3, 2, 0.1]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.5}
          transparent
          opacity={opacity} // Apply opacity
        />
      </mesh>
      <Text
        ref={textRef}
        position={[position[0], position[1] + 1.2, position[2]]} // Adjusted position
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {review.author}
      </Text>
      <Text
        position={[position[0], position[1] - 0.2, position[2] + 0.1]} // Adjusted position for review text
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {truncateText(review.text, maxTextLength)}{' '}
        {/* Display the truncated review text */}
      </Text>
      <Text
        position={[position[0], position[1] - 0.8, position[2] + 0.1]} // Adjusted position for star rating
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {'★'.repeat(review.rating)}
      </Text>
    </>
  );
};

export default ReviewCard;
