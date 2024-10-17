import { Canvas } from '@react-three/fiber';
import ReviewCarousel from './ReviewCarousel';

const reviews = [
  {
    id: 1,
    rating: 5,
    text: 'Absolutely love this product!',
    author: 'John D.',
  },
  { id: 2, rating: 4, text: 'Great value for money.', author: 'Sarah M.' },
  { id: 3, rating: 3, text: 'Decent, but could be better.', author: 'Mike R.' },
  {
    id: 4,
    rating: 5,
    text: "Best purchase I've made this year!",
    author: 'Emily S.',
  },
  {
    id: 5,
    rating: 2,
    text: 'Disappointed with the quality.',
    author: 'Chris L.',
  },
];

export default function TestimonialsAndReviews() {
  return (
    <div className="w-full h-[70vh] p-4 ">
      <h1 className="text-white text-2xl font-semibold">
        TESTIMONIALS & REVIEWS
      </h1>
      <Canvas camera={{ position: [0, 0, 10], fov: 15 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <ReviewCarousel reviews={reviews} />
      </Canvas>
    </div>
  );
}
