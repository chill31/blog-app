import Container from "@/components/body/Container";
import Title from "@/components/elements/Title";
import ReactMarkdown from "react-markdown";

import { SignIn, currentUser } from "@clerk/nextjs";
import { Suspense } from "react";

export default async function Blog({ params }: { params: { title: string } }) {
  const user = await currentUser();

  const formatedTitle = params.title.replaceAll("-", " ");
  const response = await fetch(process.env.URL + `/api/blogs/getBlogByTitle`, {
    method: "POST",
    body: JSON.stringify({ title: formatedTitle }),
  });
  const data = await response.json();


  if (response.ok) {
    if (data.isPublic) {
      return (
        <Container>
          <Title> </Title>
          <Suspense fallback={<div>Loading...</div>}>
            <div className="w-full prose prose-lg mt-5 !px-5">
              <ReactMarkdown>
                {`# ${data.title}

**by ${data.email}**

---

${data.content}`}
              </ReactMarkdown>
            </div>
          </Suspense>
        </Container>
      );
    } else if (!data.isPublic) {
      if (!user) {
        return (
          <Container>
            <Title>Unauthorized</Title>
            <SignIn
              redirectUrl={`/blogs/${params.title.replaceAll(" ", "-")}`}
            />
          </Container>
        );
      } else {
        return (
          <Container>
            <Title> </Title>
            <div className="w-full prose prose-lg mt-5 !px-5">
              <ReactMarkdown>
                {`# ${data.title}

**by ${data.email}**

---

${data.content}`}
              </ReactMarkdown>
            </div>
          </Container>
        );
      }
    }
  } else if (response.status == 404) {
    return (
      <Container>
        <Title>404</Title>
        <p>Blog not found</p>
      </Container>
    );
  } else {
    return (
      <Container>
        <Title>500</Title>
        <p className="mx-4 text-center">
          Internal server error <br /> Error code: {data.errorCode}
        </p>
      </Container>
    );
  }
}
