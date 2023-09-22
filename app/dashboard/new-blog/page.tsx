import Container from "@/components/body/Container";
import Title from "@/components/elements/Title";
import { currentUser } from "@clerk/nextjs";
import NewBlogForm from "@/components/blog/newBlogFom";

export default async function NewArticle() {
  const user = await currentUser();

  if (!user?.publicMetadata.admin)
    return (
      <Container>
        <Title>Not An Admin</Title>
        <p>You cannot create blogs if you are not an admin</p>
      </Container>
    );

  return (
    <Container>
      <Title>New Blog</Title>
      <NewBlogForm URL={process.env.URL ?? ""} />
    </Container>
  );
}
