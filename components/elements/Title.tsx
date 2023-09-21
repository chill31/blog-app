import { Playfair_Display } from "next/font/google";
import AuthButtons from "../body/authButtons";

const playfair = Playfair_Display({ subsets: ["latin"] });

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
        className={`${playfair.className} text-h1 font-bold max-sm:text-[3rem] max-sm:mt-16 ${
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
