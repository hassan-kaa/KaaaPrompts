"use client";
import Profile from "@components/Profile";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
function Page() {
  const [posts, setPosts] = useState([]);
  const handleEdit = () => {};
  const handleDelete = async () => {};
  const { data: session } = useSession();
  useEffect(() => {
    const fetchPosts = async () => {
      const data = await fetch(
        `/api/prompt/getAllByUser/${session?.user.id}`
      ).then((response) => response.json());
      setPosts(data);
    };
    fetchPosts();
  }, []);
  return (
    <>
      <Profile
        name={`${session.user.name}'s Profile`}
        desc="Welcome to your personalized profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default Page;
