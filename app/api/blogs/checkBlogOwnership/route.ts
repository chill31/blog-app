import { log } from "@logtail/next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import crypto from "crypto";

export async function POST(req: Request) {

  const randomCode = crypto.randomBytes(4).toString("hex");

  const {
    userId,
    blogId,
    userEmail,
  }: { userId: string; blogId: number; userEmail: string } = await req.json();

  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id: Number(blogId),
      },
    });
    if (blog?.email === userEmail) {
      return new Response(JSON.stringify("the user can edit the blog"), {
        status: 200,
      });
    }
  } catch (e: any) {
    log.error(e.message, { errorCode: randomCode });
    return new Response(JSON.stringify({msg: e.message, errorCode: randomCode}), { status: 500 });
  } finally {

    log.flush();
    prisma.$disconnect();

  }

  return new Response(JSON.stringify({msg: "the user cannot edit this blog", errorCode: randomCode}), {
    status: 403,
  });
}
