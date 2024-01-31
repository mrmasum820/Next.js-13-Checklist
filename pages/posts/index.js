import Link from "next/link";
import React from "react";

const PostList = ({ posts }) => {
  return (
    <div>
      <h2>List of Posts</h2>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <Link href={`posts/${post.id}`}>
              <h3>
                {post.id}
                {post.title}
              </h3>
            </Link>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default PostList;

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();

  return {
    props: {
      posts: data,
    },
  };
}
