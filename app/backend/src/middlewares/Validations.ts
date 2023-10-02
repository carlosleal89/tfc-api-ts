import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import envArgs from '../utils/envArgs';

class Validations {
  static validateLogin = (req: Request, res: Response, next: NextFunction): Response | void => {
    const { email, password } = req.body;
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailRegex.test(email);

    if (!email || typeof email !== 'string') {
      return res.status(400).json({
        message: 'All fields must be filled',
      });
    }

    if (!password || typeof password !== 'string') {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!isValidEmail || password.length < 6) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    next();
  };

  static validateToken = (req: Request, res: Response, next: NextFunction): Response | void => {
    const tokenBearer = req.headers.authorization;

    if (!tokenBearer) {
      return res.status(401).json({
        message: 'Token not found',
      });
    }

    const token = tokenBearer.split(' ')[1];
    jwt.verify(token, envArgs.jwtSecret, (err, user) => {
      if (err) {
        return res.status(401).json({
          message: 'Token must be a valid token',
        });
      }
      if (user) {
        return res.status(200).json({ role: user.role });
      }
      next(user);
    });
  };
}

export default Validations;
