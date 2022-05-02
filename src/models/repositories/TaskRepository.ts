import { PrismaClient } from "@prisma/client";
import { TaskDTO } from "../dto/TaskDTO";

const prisma = new PrismaClient ()

export default class TaskRepository {
  private userId: number

  constructor(userId: number){
    this.userId = userId
  }


  public readonly findAll = async (): Promise<TaskDTO[]> => {
    const tasks = await prisma.task.findMany()
    return tasks
  }

}