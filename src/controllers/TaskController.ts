import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { TaskDTO, CreateTaskDTO, UpdateTaskDTO } from "../models/dto/TaskDTO"
//import { createTaskSchema, updateTaskSchema } from "../models/validators/taskSchemas"

const prisma = new PrismaClient()

export default class TaskController{
  public readonly getAll = async (_req: Request, res: Response) => {
    const tasks: TaskDTO[] = await prisma.task.findMany()
    res.json(tasks)
  }

  public readonly getById = async (req: Request, res: Response) => {
    const task = req.body as CreateTaskDTO
    res.json({
      id: 1,
      ...task
    })
  }

  public readonly create = async (req: Request, res: Response) => {
    const task = req.body as UpdateTaskDTO
    res.json({
      id: 1,
      ...task
    })
  }

  public readonly update = async (_req: Request, res: Response) => {
    res.json({})
  }

  public readonly delete = async (_req: Request, res: Response) => {
    res.json({})
  }

}