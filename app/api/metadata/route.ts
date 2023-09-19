import { NextResponse } from 'next/server';
import { clerkClient, auth } from "@clerk/nextjs";

export async function POST(request: Request) {
  const {admin, userId} =  await request.json();

  await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: {
      admin: admin
    }
  })

  return NextResponse.json({ success: true });
}