import Container from "@/components/body/Container";
import Title from "@/components/elements/Title";

import BlogContainer from "@/components/blog/BlogContainer";
import BlogCard from "@/components/blog/BlogCard";
import AuthButtons from "@/components/body/authButtons";

export default function Home() {
  return (
    <Container>
      <Title>Blog</Title>
      <AuthButtons />

      <BlogContainer>
        
      </BlogContainer>
    </Container>
  );
}
