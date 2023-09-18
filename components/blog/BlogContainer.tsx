export default function BlogContainer({ children }: { children: any}) {

  return (
    <div className="w-[96vw] flex flex-wrap items-start justify-center gap-4 mt-12">
      {children}
    </div>
  )

}