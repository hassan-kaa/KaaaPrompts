import React from "react";
import PromptCard from "./PromptCard";

const Profile = ({ name, handleDelete, handleEdit, desc, data }) => {
  return (
    <div>
      <h1 className="head_text blue_gradient">{name}</h1>
      <div className="prompt_layout">
        {data &&
          data.map((post, index) => (
            <PromptCard post={post} key={index} handleTagClick={() => {}} />
          ))}
      </div>
    </div>
  );
};

export default Profile;
