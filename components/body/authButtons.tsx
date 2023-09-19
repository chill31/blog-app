import Link from "next/link";

import { UserButton, currentUser } from "@clerk/nextjs";
import Button from "../elements/Button";

export default async function AuthButtons() {
  const user = await currentUser();

  return (
    <div className="absolute flex flex-row-reverse top-5 right-5 items-center justify-start gap-4 max-sm:[position:unset] max-sm:[flex-flow:unset]">
      {user ? (
        <>
          <UserButton afterSignOutUrl="/" />
          <Link href="/dashboard"><Button>Dashboard</Button></Link>
        </>
      ) : (
        <>
          <Link href="/auth/signUp">
            <Button>Sign up</Button>
          </Link>
          <Link href="/auth/signIn">
            <Button>Log in</Button>
          </Link>
        </>
      )}
    </div>
  );
}
