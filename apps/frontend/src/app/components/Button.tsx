// import { Button } from '@shadcn/ui';

export default function MyButton({ children, onClick }) {
  return (
    <Button
      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
