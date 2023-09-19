import Container from "@/components/body/Container";
import { currentUser } from "@clerk/nextjs";

export default async function NewArticle() {
    const user = await currentUser()
    const response = await fetch('http://localhost:3000/api/blogs/create', {
        method: "POST",
        body: JSON.stringify({
            content: "ada",
            // title: "ada",
            authorEmail: user?.emailAddresses[0].emailAddress,
            shortContent: "ada",
            isPublic: true,
            userId: user?.id
        })
    })
    console.log(await response.json())
  return (
    <Container>
      <h1>New Article</h1>
    </Container>
  );
}
