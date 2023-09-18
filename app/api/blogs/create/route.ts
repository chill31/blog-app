import { currentUser } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const {
    content,
    title,
    authorEmail,
    shortContent,
    isPublic,
  }: {
    content: string;
    title: string;
    authorEmail: string;
    shortContent: string;
    isPublic: boolean;
  } = await req.json();

  if(!content || !title || !authorEmail || !shortContent || !isPublic) {
    return new Response("Missing required fields", {
        status: 400,
    });
    // TODO: add logging
    }

  const user = await currentUser();
  if (user?.emailAddresses[0].emailAddress !== authorEmail) {
    return new Response("You are not authorized to create a blog", {
      status: 403,
    });
    // TODO Add logging
  }

  try {

      const blog = await prisma.blog.create({
        data: {
          content,
          title,
          shortContent,
          isPublic,
          email: authorEmail
        },
      });
  }
  catch(err: any) {
    return new Response(JSON.stringify({err: err.message}), {
        status: 500,
    });
    // TODO: Add logging
  }
  finally {
    await prisma.$disconnect();
  }
}
