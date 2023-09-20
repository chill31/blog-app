"use client";

import { Input } from "@nextui-org/input";
import { Textarea } from "@nextui-org/input";
import { Tooltip } from "@nextui-org/tooltip";
import { Checkbox } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Button from "../elements/Button";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { useDisclosure } from "@nextui-org/modal";

import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";

export default function EditBlogForm({
  URL,
  blogId,
}: {
  URL: string;
  blogId: number;
}) {
  const { user } = useUser();
  const router = useRouter();

  const [titleContent, setTitleContent] = useState("");
  const [descriptiveContent, setDescriptiveContent] = useState("");
  const [shortContent, setShortContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    fetch(URL + "/api/blogs/edit/getBlogData", {
      method: "POST",
      body: JSON.stringify({
        blogId: blogId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTitleContent(data.title);
        setShortContent(data.shortContent);
        setDescriptiveContent(data.content);
        setIsPublic(data.isPublic);
      });
  }, [URL, blogId]);

  async function editBlog() {
    const response = await fetch(URL + "/api/blogs/edit/", {
      method: "POST",
      body: JSON.stringify({
        content: descriptiveContent,
        title: titleContent,
        authorEmail: user?.emailAddresses[0].emailAddress,
        shortContent: shortContent,
        isPublic: isPublic,
        userId: user?.id,
        blogId: blogId,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      toast.success("Blog edited successfully");
      router.push("/");
    } else {
      toast.error(
        `Error editing blog. Try again later. Error: ${data.errorCode}`
      );
    }
  }

  return (
    <div className="flex flex-col items-start justify-start w-full px-5 max-w-[90vw] gap-16">
      <Input
        variant={"underlined"}
        size={"lg"}
        placeholder="Enter Title for your new blog"
        onChange={(e) => setTitleContent(e.target.value)}
        value={titleContent}
      />
      <Textarea
        variant={"underlined"}
        className="overflow-scroll"
        size={"lg"}
        minRows={1}
        maxRows={30}
        placeholder="Enter descriptive content which explains everything about your blog. Add markdown for better interactivity"
        onChange={(e) => setDescriptiveContent(e.target.value)}
        value={descriptiveContent}
      ></Textarea>

      <Textarea
        variant={"underlined"}
        className="overflow-scroll"
        size={"lg"}
        minRows={1}
        maxRows={20}
        placeholder="Enter short content which will be visible to all users, whether logged in or not."
        onChange={(e) => setShortContent(e.target.value)}
        value={shortContent}
      ></Textarea>

      <span className="flex items-center justify-start gap-2">
        <Tooltip
          showArrow={true}
          content={"If the blog is available to all users or not"}
          closeDelay={0}
        >
          <label className="text-slate-600">Public?</label>
        </Tooltip>
        <Checkbox
          isSelected={isPublic}
          aria-label="Public?"
          onChange={(e) => setIsPublic(e.target.checked)}
        ></Checkbox>
      </span>

      <span className="[align-self:flex-end] flex gap-4 align-self">
        <Button onPress={onOpen}>Preview Blog</Button>
        <Button onPress={editBlog}>Create Blog</Button>
      </span>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="p-5">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="prose prose-md [display:unset]">
                <ReactMarkdown>{descriptiveContent}</ReactMarkdown>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
