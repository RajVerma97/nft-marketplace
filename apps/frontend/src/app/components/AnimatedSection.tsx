import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AnimatedSectionProps {
  scrollRange?: [number, number];
  yRange?: [number, number];
  opacityRange?: [number, number];
  scaleRange?: [number, number];
  children?: React.ReactNode;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  scrollRange,
  yRange,
  opacityRange,
  scaleRange,
}) => {
  const { scrollY } = useScroll();
  // const y = useTransform(scrollY, scrollRange, yRange);
  // const opacity = useTransform(scrollY, scrollRange, opacityRange);
  // const scale = useTransform(scrollY, scrollRange, scaleRange);

  return (
    <motion.div style={{}} transition={{ duration: 0.6 }}>
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
