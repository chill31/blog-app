import { log } from "@logtail/next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import crypto from 'crypto';

export async function POST(req: Request) {

  const randomCode = crypto.randomBytes(4).toString("hex");

  const { blogId }: { blogId: number } = await req.json();

  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id: Number(blogId),
      },
    });
    return new Response(JSON.stringify(blog), { status: 200  })
  } catch (e: any) {
    log.error(e.message, {errorCode: randomCode, error: e});
    return new Response(JSON.stringify(e.message), { status: 500  });
  } finally {

    log.flush();
    prisma.$disconnect();

  }

}