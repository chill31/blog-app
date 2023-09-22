"use client";

import Link from "next/link";
import Button from "../elements/Button";
import { useUser } from "@clerk/nextjs";
import {useRouter} from 'next/navigation'
import { useState } from "react";

export default function AdminClientSide({ userId, URL }: { userId: string, URL: string }) {
  
  const router = useRouter();
  
  function logOutOfAdmin() {
    setLogOutLoading(true);
    fetch(URL + "/api/metadata/", {
      method: "POST",
      body: JSON.stringify({ admin: false, userId: userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        router.refresh();
      });
  }

  const [logOutLoading, setLogOutLoading] = useState(false);

  return (
    <>
      <Button onClick={() => {
        logOutOfAdmin();
      }}>
        {logOutLoading ? 'Logging out...' : 'Log out of admin'}
      </Button>
      <Link href="/dashboard/new-blog">
        <Button>Create Blog</Button>
      </Link>
    </>
  );
}
