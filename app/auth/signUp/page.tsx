import { SignUp, currentUser, redirectToSignUp, useSignIn } from "@clerk/nextjs";

export default async function SignUpPage() {

  const user = await currentUser();

  redirectToSignUp({ returnBackUrl: 'http://localhost:3000/' });
  
  if(user) return "You are already signed in";
  return "Loading...";

}