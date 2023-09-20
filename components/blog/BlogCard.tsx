"use client";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Chip } from "@nextui-org/chip";
import SubTitle from "../elements/subTitle";

import { BsBoxArrowUpRight } from "react-icons/bs";
import Link from "next/link";

export default function BlogCard({
  title,
  author,
  date,
  shortContent,
  isPublic,
  id,
}: {
  title: string;
  author: string;
  date: string;
  shortContent: string;
  isPublic: boolean;
  id: number;
}) {

  function formatDate(date: Date) {
    const months = ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const dateFormat = date.getDate();
    const day = date.getDay();
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${hour}:${minute}, ${month} ${day}, ${year}`;
  }

  return (
    <Card className="max-w-[90vw] w-[25rem] !border-[1.5px] !border-black h-[30rem]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <SubTitle className="flex items-center justify-start gap-4">
            {title}
            <Link href={`/blogs/${title.replace(" ", "-")}`}><BsBoxArrowUpRight className="!text-lg" /></Link>
          </SubTitle>
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
