import { Request, Response } from "express";
import * as yup from "yup";
import { CreateUserUseCase } from "../useCases/CreateUserUseCase";
import { container } from "tsyringe";

const ValidationSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required()
})

export class CreateUserController {
  
  async handle(req: Request, res: Response): Promise<Response> {
    const body =  await ValidationSchema.validate(req.body, { abortEarly: false });

    const { name, email } = body

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({ name, email });

    return res.status(201).json({
      result: "SUCCESS",
      message: "USER_CREATED",
      data: user
    })

  }
}