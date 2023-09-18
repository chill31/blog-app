import Container from "@/components/body/Container";
import Title from "@/components/elements/Title";

import {checkForBlog} from '@/helpers/getBlogs'

export default function Page({ params }: { params: { blog: string } }) {

  const check = checkForBlog({blogName: params.blog, end: 'frontend'});
  if(!check) return (
    <Container>
      <Title>Blog not found</Title>
    </Container>
  )

  return (
    <Container>
      <Title>{params.blog}</Title>
    </Container>
  )
}