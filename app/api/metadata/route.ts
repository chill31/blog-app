import { NextResponse } from 'next/server';
import { clerkClient, auth } from "@clerk/nextjs";
import { log } from '@logtail/next';
import crypto from 'crypto'

export async function POST(request: Request) {
  const {admin, userId} =  await request.json();
  const randomCode = crypto.randomBytes(4).toString("hex")
try {
  log.info("Getting metadata for " + userId)
  const user = await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: {
      admin: admin
    }
  })
  console.log(user.publicMetadata)
  log.info("Metadata for " + userId, {
    userId: userId,
    metadata: user.publicMetadata
  })
  return new Response(JSON.stringify({ success: true }));
  
}
catch(err: any) {
  log.error("Error while getting user metadata", {
    err,
    errorCode: randomCode
  })
  return new Response(JSON.stringify({ err: err.message }), {
    status: 500,
  });
}

}