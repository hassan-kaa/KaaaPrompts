"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Form from "@components/Form";
const UpdatePrompt = () => {
  const { id } = useParams();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tags: "",
  });
  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`/api/prompt/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tags: post.tags,
        }),
      });
      router.back();
    } catch (error) {
      router.back();
    }
  };
  useEffect(() => {
    const getPost = async () => {
      const data = await fetch(`/api/prompt/${id}`);
      const dataa = await data.json();
      setPost(dataa);
    };
    getPost();
  }, []);
  return (
    <Form
      type="Update"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
