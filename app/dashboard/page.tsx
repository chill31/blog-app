import Container from "@/components/body/Container";
import Button from "@/components/elements/Button";
import Title from "@/components/elements/Title";
import { getBlogsForEmail } from "@/helpers/getBlogs";
import { SignInButton, currentUser } from "@clerk/nextjs";

export default async function Dashboard() {

  const user = await currentUser();

  if (!user) return (
    <SignInButton redirectUrl="/dashboard" />
  );


  const blogs = await getBlogsForEmail({
    email: user?.emailAddresses[0].emailAddress,
    end: "frontend"
  });

  console.log(blogs);

  return (
    <Container>
        <Title>Dashboard</Title>
        <Button>Create Blog</Button>
    </Container>
  );
}
