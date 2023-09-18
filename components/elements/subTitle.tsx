export default function SubTitle({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <h2 className={`text-h2 font-bold ${className ? className : ''}`}>
      {children}
    </h2>
  );
}