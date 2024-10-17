import { useEffect, useRef, useState } from 'react';
import ReviewCard, { Review } from './ReviewCard';
import { useFrame } from '@react-three/fiber';

interface ReviewCarouselProps {
  reviews: Review[];
}

const ReviewCarousel: React.FC<ReviewCarouselProps> = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const groupRef = useRef<THREE.Group>(null);
  const [transitioning, setTransitioning] = useState(false); // New state for controlling transition

  useEffect(() => {
    const interval = setInterval(() => {
      if (!transitioning) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length); // Move to next index
      }
    }, 3000); // Change card every 3 seconds

    return () => clearInterval(interval);
  }, [reviews.length, transitioning]);

  const handleCardClick = () => {
    if (!transitioning) {
      setTransitioning(true); // Set transitioning to true to prevent immediate clicks
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length); // Move to next index

      setTimeout(() => {
        setTransitioning(false); // Reset transitioning after 2 seconds
      }, 2000); // Delay to allow card to stay visible
    }
  };

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        Math.sin(clock.getElapsedTime() * 0.1) * 0.2; // Optional bobbing motion
    }
  });

  return (
    <group ref={groupRef}>
      {reviews.map((review, index) => {
        const isActive = index === currentIndex;
        const isPrevious =
          index === (currentIndex - 1 + reviews.length) % reviews.length;
        const isNext = index === (currentIndex + 1) % reviews.length;

        return (
          <ReviewCard
            key={review.id}
            review={review}
            position={[
              isActive ? 0 : isNext ? 4 : isPrevious ? -4 : 3, // Updated positions
              isActive ? 0 : -3,
              0,
            ]}
            isActive={isActive}
            opacity={isActive ? 1 : 0.5} // Adjust opacity for better visibility
            onClick={handleCardClick}
          />
        );
      })}
    </group>
  );
};

export default ReviewCarousel;
