import Container from "@/components/body/Container";
import Title from "@/components/elements/Title";
import SubTitle from "@/components/elements/subTitle";

import BlogContainer from "@/components/blog/BlogContainer";
import BlogCard from "@/components/blog/BlogCard";
import AuthButtons from "@/components/body/authButtons";

export default function Home() {
  return (
    <Container>
      <Title>Blog</Title>
      <AuthButtons />

      <BlogContainer>
        <BlogCard
          title="LOL"
          author="Chill31"
          shortContent="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          date="18/09/2023"
          isPublic={false}
          id={1}
        ></BlogCard>
        <BlogCard
          title="LOL"
          author="Chill31"
          shortContent="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          date="18/09/2023"
          isPublic={true}
          id={2}
        ></BlogCard>
        <BlogCard
          title="LOL"
          author="Chill31"
          shortContent="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          date="18/09/2023"
          isPublic={true}
          id={3}
        ></BlogCard>
      </BlogContainer>
    </Container>
  );
}
