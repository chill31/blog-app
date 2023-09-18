import { currentUser, redirectToSignIn } from "@clerk/nextjs";

export default async function SignInPage() {

  const user = await currentUser();

  redirectToSignIn({ returnBackUrl: 'http://localhost:3000/' });
  
  if(user) return "You are already signed in";
  return "Loading...";

}