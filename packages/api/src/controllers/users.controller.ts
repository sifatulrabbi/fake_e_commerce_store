import {Request, Response} from "express";
import {usersService} from "../services/users.service";
import {CustomResponse} from "../libs/custom-responses";

class UsersController {
  async getAll(req: Request, res: Response) {
    try {
      const users = await usersService.getAll();

      CustomResponse.ok(res, "Success", users);
    } catch (err) {
      CustomResponse.badRequest(res, false, err.message);
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      const session = req.user as {_id: string; email: string};
      const user = await usersService.getOne(session._id);

      if (!user) {
        CustomResponse.notFound(res, "User Not Found");
      } else {
        const {_id, email, profile, created_at, updated_at} = user;
        CustomResponse.ok(res, "Success", [
          {_id, email, profile, created_at, updated_at},
        ]);
      }
    } catch (err) {
      CustomResponse.badRequest(res, false, err.message);
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const user = await usersService.getOne(req.params.id);

      if (!user) {
        CustomResponse.notFound(res, "User Not Found");
      } else {
        const {_id, email, profile, created_at, updated_at} = user;
        CustomResponse.ok(res, "Success", [
          {_id, email, profile, created_at, updated_at},
        ]);
      }
    } catch (err) {
      CustomResponse.badRequest(res, false, err.message);
    }
  }

  async create(req: Request, res: Response) {
    const {email, password, full_name, address, confirm_password} = req.body;

    try {
      const user = await usersService.create({
        email,
        password,
        confirm_password,
        full_name,
        address,
      });

      CustomResponse.created(res, "User Created", [user]);
    } catch (err) {
      CustomResponse.badRequest(res, false, err.message);
    }
  }

  async update(req: Request, res: Response) {
    const {email, password, full_name, address} = req.body;

    try {
      const user = await usersService.update(
        req.params.id,
        email,
        password,
        full_name,
        address,
      );

      if (!user) {
        CustomResponse.notFound(res, "User Not Found");
      } else {
        CustomResponse.ok(res, "User Updated", [user]);
      }
    } catch (err) {
      CustomResponse.badRequest(res, false, err.message);
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const user = await usersService.remove(req.params.id);

      if (!user) {
        CustomResponse.notFound(res, "User Not Found");
      } else {
        CustomResponse.ok(res, `${user.email} has been removed`);
      }
    } catch (err) {
      CustomResponse.badRequest(res, false, err.message);
    }
  }
}

export const usersController = new UsersController();
