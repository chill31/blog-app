"use client";

import Link from "next/link";
import Button from "../elements/Button";
import { useUser } from "@clerk/nextjs";
import {useRouter} from 'next/navigation'

export default function AdminClientSide({ userId, URL }: { userId: string, URL: string }) {
  
  const router = useRouter();
  
  function logOutOfAdmin() {
    fetch(URL + "/api/metadata/", {
      method: "POST",
      body: JSON.stringify({ admin: false, userId: userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        router.refresh();
      });
  }

  return (
    <>
      <Button onClick={() => logOutOfAdmin()}>Log out as admin</Button>
      <Link href="/dashboard/new-blog">
        <Button>Create Blog</Button>
      </Link>
    </>
  );
}
