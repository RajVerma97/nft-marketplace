import React from 'react';
import Lottie from 'lottie-react';

interface LottieAnimationProps {
  animationData: any;
}

const LottieAnimation = ({ animationData }: LottieAnimationProps) => {
  return <Lottie animationData={animationData} loop={true} autoplay={true} />;
};

export default LottieAnimation;
