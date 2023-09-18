export default function Title({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <h1 className={`text-h1 font-bold ${className ? className : ''}`}>
      {children}
    </h1>
  );
}