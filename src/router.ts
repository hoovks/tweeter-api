import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import {
  createPost,
  deletePost,
  getPosts,
  getUserPosts,
  updatePost,
  getFollowedUsersPosts,
} from "./handlers/post";
import {
  getFollowing,
  getFollowers,
  followUser,
  unfollowUser,
} from "./handlers/user";
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "./handlers/comment";
import {
  addLike,
  deleteLike,
  getLikes,
  updateComment,
} from "./handlers/comment";

const router = Router();

// Users
router.get("/users/:username/following", getFollowing);
router.get("/users/:username/followers", getFollowers);
router.put("/users/following/:username", followUser);
router.delete("/users/following/:username", unfollowUser);

// Posts

router.get("/posts", getPosts);
router.get("/users", getPosts);
router.get("/users/:id/posts", getUserPosts);
router.get("/posts/", getFollowedUsersPosts);
router.put(
  "/posts/:id",
  body("content").isString(),
  handleInputErrors,
  updatePost
);
router.post(
  "/posts",
  body("content").isString(),
  handleInputErrors,
  createPost
);
router.delete("/posts/:id", deletePost);

// Comment Point

router.get("/comments/:postId", getComments);
router.put(
  "/comments/:id",
  body("content").isString(),
  handleInputErrors,
  updateComment
);
router.post(
  "/comments/:postId",
  body("content").isString(),
  handleInputErrors,
  createComment
);
router.delete("/comments/:id", deleteComment);

// Like

router.get("/:postId/likes", getLikes);
router.put(
  "/comments/:id",
  body("content").isString(),
  handleInputErrors,
  updateLike
);
router.post(
  "/comments/:postId",
  body("content").isString(),
  handleInputErrors,
  createComment
);
router.delete("/comments/:id", deleteComment);

export default router;
