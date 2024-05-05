import Image from "next/image"
import styles from "./postCard.module.css"
import Link from "next/link"

const PostCard = ({ post }) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {/* {post.img && <div className={styles.imgContainer}>
          <Image src={post.img} alt="" fill className={styles.img} />
        </div>} */}
        {post.img && (
          <div className={styles.imgContainer}>
            <img src={`data:image/jpeg;base64,${post.img.toString('base64')}`} alt="" className={styles.img} />
          </div>
        )}
        <span className={styles.date}>{post.createdAt?.toString().slice(4, 16)}</span>
      </div>
      <div className={styles.bottom}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.desc}>{post.body}</p>
        <div className={styles.container_view}>
          <Link className={styles.link} href={`/blog/${post.slug}`}>READ MORE</Link><br />
          <Link className={styles.link} href={`/blog/${post.slug}`}>Add to favarite</Link>
        </div>
      </div>
    </div>
  )
}

export default PostCard