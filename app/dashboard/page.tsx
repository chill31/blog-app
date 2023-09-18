import { getBlogsForEmail } from "@/helpers/getBlogs";
import { IBlog } from "@/interfaces/blog";
import { SignInButton, currentUser } from "@clerk/nextjs";

export default async function Dashboard() {
  const user = await currentUser();
  if (!user) return <SignInButton redirectUrl="/dashboard" />;
  const blogs = await getBlogsForEmail({
    email: user?.emailAddresses[0].emailAddress,
    end: "FrontEnd"
  });
  console.log(blogs);

  return (
    <div>
        <h1>Dashboard</h1>
    </div>
  );
}
