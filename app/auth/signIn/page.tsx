import Button from "@/components/elements/Button";
import Link from "next/link";
import { SignIn, currentUser, redirectToSignIn } from "@clerk/nextjs";
import SubTitle from "@/components/elements/subTitle";
import Container from "@/components/body/Container";
import { Suspense } from "react";

export default async function SignInPage() {
  const user = await currentUser();

  redirectToSignIn({ returnBackUrl: "/" });
  if (user)
    return (
      <Container>
        <SubTitle>Signed in</SubTitle>
        <Link href="/" className="text-center">
          <Button>Back Home</Button>
        </Link>
      </Container>
    );
  return (
    <Container>
      <SubTitle>Sign In</SubTitle>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <SignIn />
        </Suspense>
      </div>
    </Container>
  );
}
