export default function BlogContainer({
  children,
  className,
}: {
  children: any;
  className?: string;
}) {
  return (
    <div
      className={`w-[96vw] flex flex-wrap items-start justify-center gap-4 mt-12 ${className}`}
    >
      {children}
    </div>
  );
}
