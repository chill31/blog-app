import Container from "@/components/body/Container";
import Title from "@/components/elements/Title";

import BlogContainer from "@/components/blog/BlogContainer";
import BlogCard from "@/components/blog/BlogCard";

import {getTotalBlogs} from '@/helpers/getBlogs'

export default async function Home() {

  const totalBlogs = await getTotalBlogs({end: 'frontend'});
  const blogs = JSON.parse(totalBlogs ?? '[]')?.blogs;

  return (
    <Container>
      <Title>Blog</Title>

      <BlogContainer>
        {blogs.map((blog: any, k: number) => (

          <BlogCard key={k} author={blog.email} date={blog.date} blogId={blog.id} isPublic={blog.isPublic} shortContent={blog.shortContent} title={blog.title} />

        ))}
      </BlogContainer>
    </Container>
  );
}
