import { Request, Response } from "express";
import prisma from "../server/utils/prisma";

export const createVote = async (req: Request, res: Response) => {
  const { choice, voterName, questionId } = req.body;
  try {
    const vote = await prisma.vote.create({
      data: {
        choice,
        voter: {
          connect: {
            name: voterName,
          },
        },
        question: {
          connect: {
            id: questionId,
          },
        },
      },
    });
    res.json({
      vote,
    });
  } catch (error) {
    res.send({
      err: error?.message,
    });
  }
};

export const getAllVotes = async (req: Request, res: Response) => {
  try {
    const votes = await prisma.vote.findMany({});
    res.json({ votes });
  } catch (error) {
    res.send({
      err: error?.message,
    });
  }
};

export const updateVote = async (req: Request, res: Response) => {
  const { choice } = req.body;
  const { id } = req.params;
  try {
    const votes = await prisma.vote.update({
      where: {
        id,
      },
      data: {
        choice,
      },
    });
    res.json({ votes });
  } catch (error) {
    res.send({
      err: error?.message,
    });
  }
};

export const deleteVote = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const vote = await prisma.vote.delete({
      where: {
        id,
      },
    });
    res.json({ vote });
  } catch (error) {
    res.send({
      err: error?.message,
    });
  }
};
