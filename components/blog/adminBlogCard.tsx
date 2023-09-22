"use client";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Chip } from "@nextui-org/chip";
import SubTitle from "../elements/subTitle";

import { BsBoxArrowUpRight, BsPencilSquare, BsTrash } from "react-icons/bs";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"

export default function AdminBlogCard({
  title,
  author,
  date,
  shortContent,
  isPublic,
  blogId,
  URL,
  views
}: {
  title: string;
  author: string;
  date: string;
  shortContent: string;
  isPublic: boolean;
  blogId: number;
  URL: string;
  views: number;
}) {

  const router = useRouter();

  function formatDate(date: Date) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const day = date.getDay();
    const hour = date.getHours();
    const minute = date.getMinutes();
    console.log(month, date.getMonth());
    return `${hour}:${minute}, ${month} ${day}, ${year}`;
  }

  function deleteBlog(id: number) {
    fetch("/api/blogs/delete", {
      method: "POST",
      body: JSON.stringify({ id }),
    }).then(res => res.json()).then(data => {
      if(data.success) {
        toast.success("Blog deleted successfully");
        router.refresh();
      }
      else {
        toast.error("Error deleting blog. Error code: " + data.errorCode);
      }
    });
  }

  return (
    <Card className="max-w-[90vw] w-[25rem] !border-[1.5px] h-[30rem] blogcard">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <SubTitle className="flex items-center justify-start gap-4">
            {title}
            <Link href={`/blogs/${title.replaceAll(" ", "-")}`}><BsBoxArrowUpRight className="!text-lg" /></Link>
          </SubTitle>
          <span className="my-2 text-xl flex items-center justify-start gap-2">
            <Link href={`/dashboard/edit/${blogId}`}>
              <BsPencilSquare />
            </Link>
            <button className='!p-0 bg-transparent' onClick={() => deleteBlog(blogId)}>
              <BsTrash className='text-red-500' />
            </button>
          </span>
          <span className="text-small text-default-500 flex items-center justify-start6 gap-4">
            {author}
            {isPublic ? (
              <Chip color="secondary">Public</Chip>
            ) : (
              <Chip color="danger" className="bg-accent">
                Private
              </Chip>
            )}
          </span>
          Views: { views }
        </div>
      </CardHeader>
      <Divider className="!h-[1.5px] bg-slate-300" />
      <CardBody>
        <p>{shortContent}</p>
      </CardBody>
      <Divider className="!h-[1.5px] bg-slate-300" />
      <CardFooter>{formatDate(new Date(date))}</CardFooter>
    </Card>
  );
}
