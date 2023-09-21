import React, { useState } from "react";
import Link from "next/link";
const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient"> {type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world , and let your
        imagination run wild with any AI-powered pltform.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label htmlFor="">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI prompt
          </span>
        </label>
        <textarea
          onChange={(e) => {
            setPost({ ...post, prompt: e.target.value });
          }}
          value={post.prompt}
          placeholder="Write your prompt here..."
          required
          className="form_textarea"
        ></textarea>
        <label htmlFor="">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag
            <span className="mx-2 font-normal">
              (#product,#webDevelopment,#AI ..)
            </span>
          </span>
        </label>
        <input
          onChange={(e) => {
            setPost({ ...post, tag: e.target.value });
          }}
          value={post.tag}
          placeholder="#tag..."
          required
          className="form_input"
        />
        <div className="flex-end mb-5 mx-3 gap-4 ">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            disabled={submitting}
            type="submit"
            className="px-2 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}...` : `${type}`}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
