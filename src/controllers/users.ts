import { Map } from "immutable";
import { insert, validateUser } from "../models/users";
import { Context } from "hono";
import { SPosts } from "../utils/TypesPosts";
import { SUsers } from "../utils/TypesUsers";

const responseStruct = Map({
  success: null,
  message: "",
  action: null,
  id: null,
  data: null,
  metadata: null,
  status: null,
});

export const create = async (data: SUsers.TSignup, c: Context) => {
  const { name, email, password } = data;

  if (!name || !email || !password) {
    return responseStruct
      .merge({
        status: 400,
        success: false,
        message: "Params missing",
      })
      .toJS();
  }

  try {
    const insert_data = {
      name,
      email,
      password,
    };

    const isUserPresent = await validateUser(email, c);
    if (isUserPresent) {
      return responseStruct.merge({
        status: 409,
        action: "finding_user",
        success: false,
        message: "User already exist.",
      });
    }

    const user = await insert(insert_data, c);
    return responseStruct
      .merge({
        status: 201,
        action: "create_user",
        success: true,
        message: "User created successfully",
        data: user,
      })
      .toJS();
  } catch (err) {
    console.log("controller err = ", err);
    return responseStruct
      .merge({
        action: "create_user",
        status: 500,
        success: false,
        message: "Something went wrong.",
        data: {
          error: err,
        },
      })
      .toJS();
  }
};

export const checkUser = async (
  data: { email: string; password: string },
  c: Context
) => {
  const { email, password } = data;

  if (!email || !password) {
    return responseStruct
      .merge({
        action: "validating_user",
        status: 401,
        success: false,
        message: "Params missing",
      })
      .toJS();
  }

  try {
    const token = await validateUser(email, c);
    if (!token) {
      return responseStruct
        .merge({
          action: "validating_user",
          status: 404,
          success: false,
          message: "User not found",
        })
        .toJS();
    }

    return responseStruct
      .merge({
        action: "validating_user",
        status: 201,
        success: true,
        message: "User found successfully.",
        data: { token },
      })
      .toJS();
  } catch (err) {
    console.log("err = ", err);
    return responseStruct
      .merge({
        action: "validating_user",
        status: 500,
        success: false,
        message: "Something went wrong.",
        data: {
          error: err,
        },
      })
      .toJS();
  }
};
