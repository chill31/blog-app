"use client";

import { Input } from "@nextui-org/input";
import { Textarea } from "@nextui-org/input";
import { Tooltip } from "@nextui-org/tooltip";
import { Checkbox } from "@nextui-org/react";
import { useState } from "react";
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

import { UploadButton } from "@/helpers/generateUploadFileComponent";
import "@uploadthing/react/styles.css";

import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function NewBlogForm({ URL }: { URL: string }) {
  const { user } = useUser();
  const router = useRouter();

  const [titleContent, setTitleContent] = useState("");
  const [descriptiveContent, setDescriptiveContent] = useState("");
  const [shortContent, setShortContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();

  const [fileName, setFileName] = useState('');
  const [fileLink, setFileLink] = useState('');

  const [createButtonLoading, setCreateButtonLoading] = useState(false);

  async function createBlog() {
    setCreateButtonLoading(true);
    if (/^[a-zA-Z0-9\s]*$/.test(titleContent) === false) return toast.error("Title can only contain numbers, spaces and alphabets");
    const response = await fetch(URL + "/api/blogs/create", {
      method: "POST",
      body: JSON.stringify({
        content: descriptiveContent,
        title: titleContent,
        authorEmail: user?.emailAddresses[0].emailAddress,
        shortContent: shortContent,
        isPublic: isPublic,
        userId: user?.id,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      toast.success("Blog created successfully");
      setCreateButtonLoading(false);
      router.push("/");
    } else {
      toast.error(
        `Error creating blog. Try again later. Error: ${data.errorCode}`
      );
      setCreateButtonLoading(false);
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

      <div className="w-full flex flex-col items-start justify-start gap-2">
      <UploadButton
        endpoint="imageUploader"
        className="!m-0"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          toast.success('Upload Completed');
          onOpen2();
          setFileName(res !== undefined ? res[0].name : '');
          setFileLink(res !== undefined ? res[0].url : '');
        }}
        onUploadError={(error: Error) => {
          toast.error(`ERROR! ${error.message}\nTry again sometime later.`);
        }}
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
      </div>

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
          <label className="text-slate-600 publiclabel">Public?</label>
        </Tooltip>
        <Checkbox
          checked={isPublic}
          defaultSelected
          aria-label="Public?"
          onChange={(e) => setIsPublic(e.target.checked)}
        ></Checkbox>
      </span>

      <span className="[align-self:flex-end] flex gap-4 align-self">
        <Button onPress={onOpen}>Preview Blog</Button>
        <Button onPress={createBlog}>{createButtonLoading ? <AiOutlineLoading3Quarters className='animate-spin' /> : 'Create Blog'}</Button>
      </span>

      <Modal scrollBehavior="inside" isOpen={isOpen} onOpenChange={onOpenChange} className="p-5">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="prose prose-md [display:unset]">
                <ReactMarkdown>{descriptiveContent}</ReactMarkdown>
              </ModalBody>
              <ModalFooter>
                <Button color="success" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal scrollBehavior="inside" isOpen={isOpen2} onOpenChange={onOpenChange2} className="p-5">
        <ModalContent>
          {(onClose2) => (
            <>
              <ModalHeader className="!text-h2">Uploaded</ModalHeader>
              <ModalBody>
                <ReactMarkdown>{`\`\`\`![${fileName}](${fileLink})\`\`\``}</ReactMarkdown>
              </ModalBody>
              <ModalFooter>
                <Button onClick={() => navigator.clipboard.writeText(`![${fileName}](${fileLink})`)}>Copy</Button>
                <Button color="success" onPress={onClose2}>
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
