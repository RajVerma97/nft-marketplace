// AnimatedSection.tsx
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  scrollRange: [number, number];
  yRange: [number, number];
  opacityRange: [number, number];
  scaleRange: [number, number]; // Add scaleRange prop
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  scrollRange,
  yRange,
  opacityRange,
  scaleRange,
}) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, scrollRange, yRange);
  const opacity = useTransform(scrollY, scrollRange, opacityRange);
  const scale = useTransform(scrollY, scrollRange, scaleRange); // Transform for scale

  return (
    <motion.div style={{ y, opacity, scale }} transition={{ duration: 0.6 }}>
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
