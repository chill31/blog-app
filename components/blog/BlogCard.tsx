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
  return (
    <Card className="max-w-[90vw] w-[25rem] !border-[1.5px] !border-black">
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
      <CardFooter>{date}</CardFooter>
    </Card>
  );
}
