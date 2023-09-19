import Container from "@/components/body/Container";
import Button from "@/components/elements/Button";
import Title from "@/components/elements/Title";
// import { getBlogsForEmail,checkForBlog, getTotalBlogs } from "@/helpers/getBlogs";
import { SignInButton, currentUser, auth } from "@clerk/nextjs";

export default async function Dashboard() {

  const user = await currentUser();

  if (!user) return <SignInButton redirectUrl="/dashboard" />;

  return (
    <Container>
      <Title>Dashboard</Title>
      <Button>Log in as admin</Button>
      <p>
        This page is only for administrators. If you have a admin pass, then
        click on the <b>Log in as admin</b> button
      </p>
    </Container>
  );
}
