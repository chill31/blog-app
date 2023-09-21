import Container from "@/components/body/Container";
import AdminClientSide from "@/components/dashboard/adminClient";
import ClientSide from "@/components/dashboard/client";
import Button from "@/components/elements/Button";
import Title from "@/components/elements/Title";
import { SignInButton, currentUser } from "@clerk/nextjs";
import { getTotalBlogs } from "@/helpers/getBlogs";

import BlogContainer from "@/components/blog/BlogContainer";
import SubTitle from "@/components/elements/subTitle";
import AdminBlogCard from "@/components/blog/adminBlogCard";
import NoBlogs from "@/components/dashboard/noBlogs";
import { ThemeSwitcher } from "@/components/body/ThemeSwitcher";

export default async function Dashboard() {
  const user = await currentUser();
  if (!user)
    return (
      <Container>
        <Title mainTitle={false}>Error</Title>
        <p className="text-center mx-4">
          You are not signed in to access the dashboard. Click on the button
          below.
        </p>
        <Button>
          <SignInButton redirectUrl="/" />
        </Button>
      </Container>
    );

  async function setAdmin() {
    const res = await fetch(process.env.URL + "/api/metadata/", {
      method: "POST",
      body: JSON.stringify({ admin: true, userId: user?.id }),
    });
    const data = await res.json();
  }

  async function removeAdmin() {
    const res = await fetch(process.env.URL + "/api/metadata/", {
      method: "POST",
      body: JSON.stringify({ admin: false, userId: user?.id }),
    });
    const data = await res.json();
  }

  if (user.publicMetadata.admin === undefined) {
    removeAdmin();
  }

  if (!user.publicMetadata.admin) {
    return (
      <Container>
        <Title>Dashboard</Title>

        <ClientSide URL={process.env.URL ?? ""} />
        <p className="mx-4 text-center">
          To manage blogs, you need to be an administrator. If you have a admin
          pass, then click on the <b>Log in as admin</b> button
        </p>

        <div className="w-[100vw] flex flex-col gap-0 items-start justify-center mt-4 px-4">
          <SubTitle>Theme</SubTitle>
          <ThemeSwitcher />
        </div>
      </Container>
    );
  }

  const totalBlogs = await getTotalBlogs({ end: "frontend" });
  const blogs = JSON.parse(totalBlogs ?? "[]")?.blogs;

  const filterByAdmin = blogs.filter(
    (blog: any) => blog.email === user.emailAddresses[0].emailAddress
  );

  return (
    <Container>
      <Title>Admin</Title>
      <AdminClientSide userId={user.id} URL={process.env.URL ?? ""} />

      <div className="w-[100vw] flex flex-col gap-0 items-start justify-center mt-4 px-4">
        <SubTitle>Theme</SubTitle>
        <ThemeSwitcher />

        <SubTitle className="mt-12">My Blogs</SubTitle>
        <BlogContainer className="[justify-content:flex-start_!important]">
          {filterByAdmin.length === 0 && <NoBlogs />}
          {filterByAdmin.length > 0 &&
            filterByAdmin.map((blog: any, k: number) => (
              <AdminBlogCard
                key={k}
                author={blog.email}
                date={blog.date}
                blogId={blog.id}
                isPublic={blog.isPublic}
                shortContent={blog.shortContent}
                title={blog.title}
                URL={process.env.URL ?? ""}
                views={blog.totalViews}
              />
            ))}
        </BlogContainer>
      </div>
    </Container>
  );
}
