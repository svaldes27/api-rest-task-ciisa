export interface BaseUserDTO {
  firstName: string
  lastName: string
  email: string
}

export interface UserDTO extends BaseUserDTO {
  id: number
}

export interface CreateUserDTO extends BaseUserDTO{
  password: string
}

export interface LoginUserDTO extends UserDTO {
  password: string
}

export interface UpdateUserDTO extends Partial<CreateUserDTO>{
  
}

export interface UserTokenPayLoad {
  sub: number
  firstName: string
  lastName: string
  email: string
  exp: number
  iat: number
}
