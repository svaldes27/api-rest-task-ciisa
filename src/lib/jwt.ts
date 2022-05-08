import jwt from 'jsonwebtoken'
import { UserDTO, UserTokenPayLoad } from '../models/dto/UserDTO'

const secret = process.env.JWT_SECRET as string

if (!secret) {
  throw new Error("JWT Secret not found")
}

export function generateToken(user: UserDTO): string {
  return jwt.sign(
  { sub: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email},
    secret,
    { expiresIn: '6d'}
  )
}

export function verifyToken(token: string): UserTokenPayLoad {
  const verified = jwt.verify(token, secret)
  return verified as unknown as UserTokenPayLoad
}
