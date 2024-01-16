import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

// Follow user
export const followUser = async (req, res) => {
  const currentUser = await prisma.user.findUnique({
    where: { username: req.user.username },
  });

  const targetUser = await prisma.user.findUnique({
    where: { username: req.params.username },
  });

  if (currentUser.id === targetUser.id) {
    return res.status(400).json({ error: "Cannot follow yourself" });
  }

  const updatedUser = await prisma.user.update({
    where: { id: currentUser.id },
    data: {
      following: {
        connect: { id: targetUser.id },
      },
    },
  });

  res.json({ data: updatedUser });
};

// Unfollow user
export const unfollowUser = async (req, res) => {
  const currentUser = await prisma.user.findUnique({
    where: { username: req.user.username },
  });

  const targetUser = await prisma.user.findUnique({
    where: { username: req.params.username },
  });

  const updatedUser = await prisma.user.update({
    where: { id: currentUser.id },
    data: {
      following: {
        disconnect: { id: targetUser.id },
      },
    },
  });

  res.json({ data: updatedUser });
};

// Get following
export const getFollowing = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { username: req.params.username },
    include: { following: true },
  });

  res.json({ data: user.following });
};

// Get followers
export const getFollowers = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { username: req.params.username },
    include: { followers: true },
  });

  res.json({ data: user.followers });
};

// Create new user
export const createNewUser = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      email: req.body.email,
      password: await hashPassword(req.body.password),
    },
  });

  const token = createJWT(user);
  res.json({ token: token });
};

// Signin
export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res.status(401);
    res.json({ message: "nope" });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
