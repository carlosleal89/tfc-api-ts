import { NextFunction, Request, Response } from 'express';

class Validations {
  static validateLogin = (req: Request, res: Response, next: NextFunction): Response | void => {
    const { email, password } = req.body;
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailRegex.test(email);

    if (!email || typeof email !== 'string' || !isValidEmail) {
      return res.status(400).json({
        message: 'All fields must be filled',
      });
    }

    if (!password || typeof password !== 'string') {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (password.length < 6) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    next();
  };
}

export default Validations;
