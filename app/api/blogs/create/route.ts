import { currentUser, clerkClient } from "@clerk/nextjs";
import { log } from "@logtail/next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import crypto from "crypto";

export async function POST(req: Request) {
  const {
    content,
    title,
    authorEmail,
    shortContent,
    isPublic,
    userId
  }: {
    content: string;
    title: string;
    authorEmail: string;
    shortContent: string;
    isPublic: boolean;
    userId: string;
  } = await req.json();

  const randomCode = crypto.randomBytes(4).toString("hex");

  console.log("ran")

  if (!content || !title || !authorEmail || !shortContent) {
    log.info("Missing fields", {errorCode: randomCode});
    return new Response(JSON.stringify({message: "missing required fields", errorCode: randomCode}), {
      status: 400,
    });
  }

  const user = await clerkClient.users.getUser(userId)
  if (user.emailAddresses[0].emailAddress !== authorEmail) {
    log.warn("Unauthenticated user tried to create blog")
    return new Response(
      JSON.stringify({
        message: "You are not authorized to create a blog",
        errorCode: randomCode,
      }),
      {
        status: 403,
      }
    );
  }

  try {
    const blog = await prisma.blog.create({
      data: {
        content,
        title: title,
        shortContent,
        isPublic,
        email: authorEmail,
      },
    });
    return new Response(JSON.stringify(blog), {
      status: 200,
    });
  } catch (err: any) {
    log.error("Error creating blog", { err, errorCode: randomCode });
    return new Response(
      JSON.stringify({ message: err.message, errorCode: randomCode }),
      {
        status: 500,
      }
    );
  } finally {
    log.flush()
    await prisma.$disconnect();
  }
}
