import { Request, Response } from "express"
import { generateToken } from "../lib/jwt"
import { CreateUserDTO } from "../models/dto/UserDTO"
import UserRepository from "../models/repositories/UserRepository"
import { loginSchema, registerSchema } from "../models/validators/userSchemas"
import bcrypt from 'bcryptjs'

export default class AuthController {
  public readonly login = async (req: Request, res: Response) => {
    const credentials = req.body

    try {
      await loginSchema.validateAsync(credentials)
    } catch (error) {
      res.status(400).json({ message: error.message})
      return
    }
    const repository = new UserRepository()

    try{
      const userFromDataBase = await repository.findByEmail(credentials.email)

      if (!userFromDataBase || !bcrypt.compareSync(credentials.password, userFromDataBase.password)){
        res.status(401).json({ message: 'Invalid credentials'})
        return
      }
      const token = generateToken(userFromDataBase)
      
      res.json({ token })
    }catch(error){
      console.log(error)
      console.log('Error: ', error.code)
      res.status(500).json({ message: 'Something happened'})
    }
  }

  public readonly register = async (req: Request, res: Response) => {
    const user = req.body as CreateUserDTO

    try{
      await registerSchema.validateAsync(user)
      
    }catch (error) {
      res.status(400).json({ message: error.message })
      return
    }

    const hashedPassword = bcrypt.hashSync(user.password, 12)

    const repository = new UserRepository()
    try{
      const newUser = await repository.create({ ...user, password: hashedPassword})
      res.status(201).json(newUser)
    }catch (error){
      if (error.code === 'P2002'){
        res.status(409).json({ message: 'This user already exists'})
        return
      }
      console.log('Error: ', error.code)
      res.status(500).json({ message: 'Something happened'})
    }
  }
}