"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [clickedTag, setClickedTag] = useState(false);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
    setFilteredPosts(
      posts.filter(
        (post) =>
          post.prompt.includes(searchText) ||
          post.creator.username.toLowerCase().includes(searchText) ||
          post.tags.filter((tag) => tag.includes(searchText)).length > 0
      )
    );
  };
  const handleTagClick = (currentTag: string) => {
    setFilteredPosts(posts.filter((post) => post.tags.includes(currentTag)));
    setClickedTag(true);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt/getAll", {
        next: { revalidate: 5 },
      });
      const data = await response.json();
      setPosts(data.prompts);
      setFilteredPosts(posts);
    };
    fetchPosts();
  }, []);
  return (
    <section className="feed">
      <form
        className="relative w-full flex-center"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
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
        {searchText.length > 0 || clickedTag ? (
          filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PromptCard
                post={post}
                key={post._id}
                handleTagClick={handleTagClick}
              />
            ))
          ) : (
            <h1>No posts matching !</h1>
          )
        ) : (
          posts.map((post) => (
            <PromptCard
              post={post}
              key={post._id}
              handleTagClick={handleTagClick}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Feed;
