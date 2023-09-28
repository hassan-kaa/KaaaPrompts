"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
const PromptCard = ({ post, handleTagClick }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [copied, setCopied] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      console.log("now");
      setCopied("");
    }, 2000);
  };
  const handleDelete = async () => {
    const sure = confirm("Are you sure to delete this prompt ?");
    if (sure) {
      const response = await fetch(`/api/prompt/${post._id}`, {
        method: "DELETE",
      });
      router.back();
    }
  };
  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
  };
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 curson-pointer flex justify-start items-center gap-3">
          <Image
            src={post.creator.image}
            alt="user-image"
            height={40}
            width={40}
            className="object-contain rounded-full "
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="flex gap-2 flex-col">
          <div className="copy_btn" onClick={handleCopy}>
            <Image
              alt="copy button"
              width={12}
              height={12}
              src={
                copied == post.prompt
                  ? "/assets/icons/tick.svg"
                  : "/assets/icons/copy.svg"
              }
            />
            <span
              className="bg-black w-40 text-white rounded-lg text-sm absolute py-2 px-4"
              hidden={copied.length == 0}
            >
              Copied to clipboard
            </span>
          </div>
        </div>
        {
          //@ts-ignore
          session?.user.id == post.creator._id && (
            <div className="copy_btn" onClick={toggleDropdown}>
              <Image
                src={"/assets/icons/link.svg"}
                alt="options"
                width={12}
                height={12}
              />
              {dropdown && (
                <span className="dropdown">
                  <Link href={`/update-prompt/${post._id}`}>
                    <button className="dropdown_link">Edit</button>
                  </Link>

                  <button className="dropdown_link" onClick={handleDelete}>
                    Delete
                  </button>
                </span>
              )}
            </div>
          )
        }
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <div className="tags flex gap-2 ">
        {post.tags.map((tag, index) => (
          <p
            className="font-inter text-sm blue_gradient cursor-pointer"
            onClick={() => handleTagClick && handleTagClick(tag)}
            key={index}
          >
            {`${tag}  `}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PromptCard;
