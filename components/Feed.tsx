"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt/getAll");
      const data = await response.json();
      setPosts(data.prompts);
    };
    fetchPosts();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <div className="mt-16 prompt_layout">
        {posts.map((post) => (
          <PromptCard post={post} key={post._id} handleTagClick={() => {}} />
        ))}
      </div>
    </section>
  );
};

export default Feed;
