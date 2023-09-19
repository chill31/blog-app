import { getBlogsForEmail } from "@/helpers/getBlogs";

export async function POST(request: Request) {
  const { email } = await request.json();
  try {
    const blogs = await getBlogsForEmail({ email, end: "backend" });
    return new Response(JSON.stringify({ blogs }));
  } catch (err: any) {
    return new Response(JSON.stringify({ err: err.message }), {
      status: 500,
    });
  }
}