"use client"
import { addPost } from "@/lib/action";
import styles from "./userPostForm.module.css";
import { useFormState } from "react-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const UserPostForm = async ({ userId }) => {


  const [state, formAction] = useFormState(addPost, undefined);

  const router = useRouter();


  return (
    <form action={formAction} className={styles.container}>
      <h1>Add New Post</h1>
      <input type="hidden" name="userId" value={userId} />
      <input type="text" name="title" placeholder="Title" />
      <input type="text" name="slug" placeholder="slug" />
      {/* <input type="text" name="img" placeholder="img" /> */}
      <input type="file" name="img" accept="image/*" />
      <textarea type="text" name="desc" placeholder="desc" rows={10} />
      <button>Add</button>
      {state?.error}


    </form>

  );
};

export default UserPostForm;
