import Container from "@/components/body/Container";
import AdminClientSide from "@/components/dashboard/adminClient";
import ClientSide from "@/components/dashboard/client";
import Button from "@/components/elements/Button";
import Title from "@/components/elements/Title";
import { SignInButton, currentUser } from "@clerk/nextjs";
import Link from "next/link";

export default async function Dashboard() {

  const user = await currentUser();
  if (!user)
    return (
      <Container>
        <Title mainTitle={false}>Error</Title>
        <p className="text-center mx-4">You are not signed in to access the dashboard. Click on the button below.</p>
        <Button>
          <SignInButton redirectUrl="/" />
        </Button>
      </Container>
    );

  async function setAdmin() {
    const res = await fetch(process.env.URL + "/api/metadata/", {
      method: "POST",
      body: JSON.stringify({ admin: true, userId: user?.id }),
    });
    const data = await res.json();
  }

  async function removeAdmin() {
    const res = await fetch(process.env.URL + "/api/metadata/", {
      method: "POST",
      body: JSON.stringify({ admin: false, userId: user?.id }),
    });
    const data = await res.json();
  }

  if (user.publicMetadata.admin === undefined) {
    removeAdmin();
  }

  if (!user.publicMetadata.admin) {
    return (
      <Container>
        <Title>Dashboard</Title>
        <ClientSide URL={process.env.URL ?? ''} />
        <p>
          This page is only for administrators. If you have a admin pass, then
          click on the <b>Log in as admin</b> button
        </p>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Admin Login</Title>
      <AdminClientSide userId={user.id} URL={process.env.URL ?? ''} />
    </Container>
  );
}
