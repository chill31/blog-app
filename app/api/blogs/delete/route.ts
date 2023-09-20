import { log } from "@logtail/next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import crypto from "crypto";

export async function POST(req: Request) {
  const { id } = await req.json();

  const randomCode = crypto.randomBytes(4).toString("hex");

  try {
    log.info("Deleting blog with id: " + id);
    const blog = await prisma.blog.delete({
      where: {
        id: id,
      },
    });
    return new Response(
      JSON.stringify({ message: "success in deleting blog.", success: true }),
      { status: 200 }
    );
  } catch (e: any) {
    log.error(e.message, {
      err: e,
      errorCode: randomCode,
    });

    return new Response(
      JSON.stringify({ message: e.message, success: false, err: e, errorCode: randomCode }),
      {
        status: 403,
      }
    );
  }
}
