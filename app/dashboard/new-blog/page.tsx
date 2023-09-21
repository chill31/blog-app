import Container from "@/components/body/Container";
import Title from "@/components/elements/Title";
import { currentUser } from "@clerk/nextjs";
import NewBlogForm from "@/components/blog/newBlogFom";

export default async function NewArticle() {
  const user = await currentUser();

  async function createBlog() {
    const response = await fetch("http://localhost:3000/api/blogs/create", {
      method: "POST",
      body: JSON.stringify({
        content: "ada",
        title: "ada",
        authorEmail: user?.emailAddresses[0].emailAddress,
        shortContent: "ada",
        isPublic: true,
        userId: user?.id,
      }),
    });
    const data = await response.json();
  }

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
