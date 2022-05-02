export interface BaseTaskDTO {
  id?: number
  title: string
  content: string
  done: boolean
  userId: number
}

export interface TaskDTO extends BaseTaskDTO {
  id: number
  userId: number
}

export interface CreateTaskDTO extends BaseTaskDTO{

}

export interface UpdateTaskDTO extends Partial<BaseTaskDTO>{

}