import HomeButton from "./homeButton";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
      <main className="min-h-[100vh] w-[100vw] flex flex-col gap-12 pt-4 justify-start items-center overflow-x-hidden overflow-y-auto pb-12">
        <HomeButton />
        {children}
      </main>
  );
}
