
import { Suspense } from "react";
import styles from "./postForm.module.css";
import { auth } from "@/lib/auth";
import UserPostForm from "@/components/addpost/usePostForm";

const addPost = async () => {

  const session = await auth();

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div>Loading...</div>}>
            <UserPostForm userId={session.user.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default addPost;