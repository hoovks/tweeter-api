import prisma from "../db";

// Get all
export const getPosts = async (req, res) => {
  const posts = await prisma.post.findMany();

  res.json({ data: posts });
};

// Get all user posts
export const getUserPosts = async (req, res) => {
  const posts = await prisma.post.findMany({
    where: {
      // posty zalogowanego użytkownika
      // authorId: req.user.id,

      // uzytkownik o id podanym w path
      authorId: req.params.id,
    },
  });

  const commentsCount = posts.map((post) =>
    prisma.comment.count({ where: { postId: post.id } })
  );

  res.json({ data: posts });
};

// Get followed users posts
export const getFollowedUsersPosts = async (req, res) => {
  const posts = await prisma.post.findMany({
    where: {
      // posty zalogowanego użytkownika
      // authorId: req.user.id,

      // uzytkownik o id podanym w path
      authorId: req.params.id,
    },
  });

  const commentsCount = posts.map((post) =>
    prisma.comment.count({ where: { postId: post.id } })
  );

  res.json({ data: posts });
};

// ??? Get one
export const getOnePost = async (req, res) => {
  const id = req.params.id;

  const post = await prisma.post.findFirst({
    where: {
      id,
      authorId: req.user.id,
    },
  });

  res.json({ data: post });
};

// Create TODO MEDIA USERNAME
export const createPost = async (req, res) => {
  const post = await prisma.post.create({
    data: {
      content: req.body.content,
      authorId: req.user.id,
    },
  });

  res.json({ data: post });
};

// Update
export const updatePost = async (req, res) => {
  const updated = await prisma.post.update({
    where: {
      id: req.params.id,
      authorId: req.user.id,
    },
    data: {
      content: req.body.content,
    },
  });

  res.json({ data: updated });
};

// Delete
export const deletePost = async (req, res) => {
  const deleted = await prisma.post.delete({
    where: {
      id: req.params.id,
      authorId: req.user.id,
    },
  });

  res.json({ data: deleted });
};
