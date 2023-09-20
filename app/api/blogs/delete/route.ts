import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { id } = await req.json();

  try {
    const blog = await prisma.blog.delete({
      where: {
        id: id,
      },
    });
    return new Response(
      JSON.stringify({ message: "success in deleting blog.", success: true }),
      { status: 200 }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ message: "error", success: false, err: e }),
      {
        status: 403,
      }
    );
  }
}
