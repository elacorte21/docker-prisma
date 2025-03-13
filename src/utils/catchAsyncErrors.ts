import { Request, Response } from 'express'

const catchAsyncErrors =
    (fn: Function) => (req: Request, res: Response) => Promise.resolve(fn(req, res))

export default catchAsyncErrors