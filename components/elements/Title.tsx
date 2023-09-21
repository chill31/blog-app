import AuthButtons from "../body/authButtons";

export default function Title({
  children,
  className,
  mainTitle = true,
}: {
  children: React.ReactNode;
  className?: string;
  mainTitle?: boolean;
}) {
  return (
    <>
      <h1
        className={`text-h1 font-bold max-sm:text-[3rem] max-sm:mt-16 ${
          className ? className : ""
        }`}
      >
        {children}
      </h1>
      {mainTitle ? (
        <AuthButtons />
      ) : (
        ''
      )}
    </>
  );
}
