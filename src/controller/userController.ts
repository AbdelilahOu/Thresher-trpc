import { Request, Response } from "express";
import prisma from "../server/utils/prisma";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({});
    res.json({
      users,
    });
  } catch (error) {
    console.log("sth is wrong : ", error);
    res.send({
      err: error?.message,
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const user = await prisma.user.create({
      data: {
        name,
      },
    });
    res.json({
      user,
    });
  } catch (error) {
    console.log("sth is wrong : ", error);
    res.send({
      err: error?.message,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
    res.json({
      user,
    });
  } catch (error) {
    console.log("sth is wrong : ", error);
    res.send({
      err: error?.message,
    });
  }
};

export const getWithQuestions = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        questions: true,
      },
    });
    res.json({
      user,
    });
  } catch (error) {
    console.log("sth is wrong : ", error);
    res.send({
      err: error?.message,
    });
  }
};

export const deleteAllUsers = async (req: Request, res: Response) => {
  try {
    const deletedUsers = await prisma.user.deleteMany({});
    res.json({
      deletedUsers,
    });
  } catch (error) {
    res.send({
      err: error?.message,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedUser = await prisma.user.delete({
    where: {
      id,
    },
  });
  res.json({
    deletedUser,
  });
  try {
  } catch (error) {
    res.send({
      err: error?.message,
    });
  }
};
