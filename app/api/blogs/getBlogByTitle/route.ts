import { log } from "@logtail/next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import crypto from 'crypto';

export async function POST(req: Request) {
    const { title } = await req.json();

    const randomCode = crypto.randomBytes(4).toString('hex');
    try {
        log.info("Getting blog by title: " + title);
        const blog = await prisma.blog.findUniqueOrThrow({
            where: {
                title: title
            }
        });
        return new Response(JSON.stringify(blog), {
            status: 200,
        })
    }
    catch(err: any) {
        log.error(err.message, {
            err: err,
            errorCode: randomCode
        })

        if(err.code == 'P2025' || err.name == 'P2025') {
            return new Response(JSON.stringify('Not Found'), {status: 404})
        }
        else {
            return new Response(JSON.stringify({message: err.message, errorCode: randomCode}), {status: 500})
        }
    }
    
}