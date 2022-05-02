import { Request, Response } from "express"
import { TaskDTO, CreateTaskDTO, UpdateTaskDTO } from "../models/dto/TaskDTO"
import { createTaskSchema, updateTaskSchema } from "../models/validators/taskSchemas"

export default class TaskController{
  public readonly getAll = async (_req: Request, res: Response) =>{
    const task: TaskDTO [] = [
      {
        id: 1,
        title: 'Ajuste de inventario',
        content: 'Realizar el ajuste por el ERP a las 15:00 hrs.',
        done: false,
        userId: 1
      }
    ]
    res.json(task)
  }

  public readonly getById = async (_req: Request, res: Response) => {

  }

  public readonly create = async (r_eq: Request, res: Response) => {

  }

  public readonly update = async (_req: Request, res: Response) => {
    
  }

  public readonly delete = async (_req: Request, res: Response) => {
    
  }

}