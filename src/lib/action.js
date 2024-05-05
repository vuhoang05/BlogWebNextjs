"use server";

import { revalidatePath } from "next/cache";
import { Post, User } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";
import multer from 'multer'; // Import multer for file uploads

const upload = multer({ dest: 'uploads/' });

// ... rest of the imports

export const addPost = async (prevState, formData) => {
  try {
    connectToDb();

    const newPost = new Post({
      // Use formData.get() consistently:
      title: formData.get("title"),
      desc: formData.get("desc"),
      slug: formData.get("slug"),
      userId: formData.get("userId"),
      authorName: formData.get("authorName"),
      img: null, // Initialize img as null
    });

    const imageResponse = await fetch('http://localhost:3000/api/uploadimg', {
      method: 'POST',
      body: formData, // Send the entire formData, including the image
    });

    if (imageResponse.ok) {
      const { imageBuffer } = await imageResponse.json();
      newPost.img = imageBuffer;

    } else {
      // Detailed error logging for image upload failure
      console.error("Image upload failed:", imageResponse.statusText);
      console.error("Response body:", await imageResponse.text()); // Log response body for more details
      return { error: "Image upload failed" };
    }

    await newPost.save();
    console.log("saved to db");
    revalidatePath("/blog");
    revalidatePath("/admin");
    return { success: true };
  } catch (err) {

    console.error("Add post error:", err); // Log the full error for debugging
    return { error: "Something went wrong!" };
  }
};


// export const addPost = async (prevState, formData) => {
//   // const title = formData.get("title");
//   // const desc = formData.get("desc");
//   // const slug = formData.get("slug");

//   const { title, desc, img, slug, userId, authorName } = Object.fromEntries(formData);

//   try {
//     connectToDb();
//     const newPost = new Post({
//       title,
//       img,
//       desc,
//       slug,
//       userId,
//       authorName
//     });

//     await newPost.save();
//     console.log("saved to db");
//     revalidatePath("/blog");
//     revalidatePath("/admin");
//   } catch (err) {
//     console.log(err);
//     return { error: "Something went wrong!" };
//   }
// };


export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const addUser = async (prevState, formData) => {
  const { username, email, password, img } = Object.fromEntries(formData);

  try {
    connectToDb();
    const newUser = new User({
      username,
      email,
      password,
      img,
    });

    await newUser.save();
    console.log("saved to db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const handleGithubLogin = async () => {
  "use server";
  await signIn("github");
};

export const handleLogout = async () => {
  "use server";
  await signOut();
};

export const register = async (previousState, formData) => {
  const { username, email, password, img, passwordRepeat } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { error: "Passwords do not match" };
  }

  try {
    connectToDb();

    const user = await User.findOne({ username });

    if (user) {
      return { error: "Username already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
    });

    await newUser.save();
    console.log("saved to db");

    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const login = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    console.log(err);

    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }
    throw err;
  }
};
