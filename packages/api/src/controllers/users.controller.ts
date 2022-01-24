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
      const user = req.user as {_id: string; email: string};
      const userProfile = await usersService.getOne(user._id);

      if (!userProfile) {
        CustomResponse.notFound(res, "User Not Found");
      } else {
        const {_id, email, profile, created_at, updated_at} = userProfile;
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
        const {_id, email, profile, created_at} = user;
        CustomResponse.ok(res, "Success", [{_id, email, profile, created_at}]);
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
    const user = req.user as {_id: string; email: string};
    const {email, password, full_name, address} = req.body;

    try {
      const updatedUser = await usersService.update(user._id, {
        email,
        password,
        full_name,
        address,
      });

      if (!updatedUser) {
        CustomResponse.notFound(res, "User Not Found");
      } else {
        CustomResponse.ok(res, "User Updated", [updatedUser]);
      }
    } catch (err) {
      CustomResponse.badRequest(res, false, err.message);
    }
  }

  async remove(req: Request, res: Response) {
    const user = req.user as {_id: string; email: string};

    try {
      const removedUser = await usersService.remove(user._id);

      if (!removedUser) {
        CustomResponse.notFound(res, "User Not Found");
      } else {
        CustomResponse.ok(res, `${removedUser.email} has been removed`);
      }
    } catch (err) {
      CustomResponse.badRequest(res, false, err.message);
    }
  }
}

export const usersController = new UsersController();
