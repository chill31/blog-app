import EditBlogForm from "@/components/blog/editBlogForm";
import Container from "@/components/body/Container";
import Title from "@/components/elements/Title";
import { currentUser } from "@clerk/nextjs";

export default async function EditBlog({ params }: { params: { id: number } }) {
  const user = await currentUser();
  const blogId = params.id;

  const response = await fetch(
    process.env.URL + "/api/blogs/checkBlogOwnership",
    {
      method: "POST",
      body: JSON.stringify({
        userId: user?.id,
        blogId: blogId,
        userEmail: user?.emailAddresses[0].emailAddress,
      }),
    }
  );
  const data = await response.json();
  if (response.ok) {
    return (
      <Container>
        <Title>Edit Blog</Title>
        <EditBlogForm URL={process.env.URL ?? ""} blogId={blogId} />
      </Container>
    );
  }

  return (
    <Container>
      <Title>Unauthorized</Title>
      <p className="mx-4 text-center">you cannot edit this blog as this was created by someone else.<br></br>Error: {data.errorCode}</p>
    </Container>
  );
}
