import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../lib/jwt";

export default function tokenValidator(){
  return function (req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if(!authHeader){
      res.status(401).json({ message: 'You dont have authentication header'})
      return
    }

    const [bearer, token] = authHeader.split(' ')

    if(bearer !== 'Bearer') {
      res.status(401).json({ message: 'You dont have authentication header' })
      return
    }

    try {
      const tokenPayLoad = verifyToken(token)
      req.user = tokenPayLoad
    } catch {
      res.status(401).json({ message: 'You dont have authentication header' })
      return
    }
    
    return next()
  }
}