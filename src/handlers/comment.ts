import prisma from "../db";
// import { validationResult } from "express-validator";

// Get all post's comments
export const getComments = async (req, res) => {
  const comments = await prisma.comment.findMany({
    where: { postId: req.params.postId },
  });

  res.json({ data: comments });
};

// Create a comment
export const createComment = async (req, res) => {
  const comment = await prisma.comment.create({
    data: {
      content: req.body.content,
      userId: req.user.id,
      postId: req.params.postId,
    },
  });

  res.json({ data: comment });
};

// Update a comment
export const updateComment = async (req, res) => {
  const updated = await prisma.comment.update({
    where: {
      id: req.params.id,
      userId: req.user.id,
    },
    data: {
      content: req.body.content,
    },
  });

  res.json({ data: updated });
};

// Delete a comment
export const deleteComment = async (req, res) => {
  const deleted = await prisma.comment.delete({
    where: {
      id: req.params.id,
      userId: req.user.id,
    },
  });

  res.json({ data: deleted });
};
