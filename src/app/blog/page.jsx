'use client'
import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css";
import { getPosts } from "@/lib/data";

import React, { useState, useEffect } from "react";


const getData = async () => {
  const res = await fetch("http://localhost:3000/api/blog", { next: { revalidate: 3600 } });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

const BlogPage = () => {
  const [sortOrder, setSortOrder] = useState('newest');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setPosts(data);
    };

    fetchData();
  }, []);

  const handleSortClick = (order) => {
    setSortOrder(order);
  };

  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    if (sortOrder === 'newest') {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });


  return (
    <>
      <div className={styles.headtitle}>List blog</div>
      <div className={styles.sortButtons}>
        <div >Sort by date: </div>
        <button
          className={sortOrder === 'newest' ? styles.activeButton : ''}
          onClick={() => handleSortClick('newest')}
        >
          Newest
        </button>
        <button
          className={sortOrder === 'oldest' ? styles.activeButton : ''}
          onClick={() => handleSortClick('oldest')}
        >
          Oldest
        </button>
      </div>
      <div className={styles.container}>
        {sortedPosts.map((post) => (
          <div className={styles.post} key={post.id}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </>
  );
};

export default BlogPage;