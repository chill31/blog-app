import { SignUp, currentUser, redirectToSignUp } from "@clerk/nextjs";

import Button from "@/components/elements/Button";
import SubTitle from "@/components/elements/subTitle";
import Link from "next/link";
import Container from "@/components/body/Container";
import { Suspense } from "react";

export default async function SignUpPage() {
  const user = await currentUser();

  redirectToSignUp({ returnBackUrl: "/" });

  if (user)
    return (
      <Container>
        <SubTitle>Signed in</SubTitle>
        <Link href="/">
          <Button>Back Home</Button>
        </Link>
      </Container>
    );
  return (
    <Container>
      <SubTitle>Sign Up</SubTitle>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <SignUp />
        </Suspense>
      </div>
    </Container>
  );
}
