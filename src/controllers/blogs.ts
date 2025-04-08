// import { getSinglePost } from './blogs';
import { Map } from "immutable";
import {
  insert,
  update,
  getOnePost,
  getPosts,
  deletedAtPost,
} from "../models/blogs";
import { Context } from "hono";
import { SPosts } from "../utils/TypesPosts";
import { catchErrRes } from "../utils/helpers";

const responseStruct = Map({
  success: null,
  message: "",
  action: null,
  id: null,
  data: null,
  metadata: null,
  status: null,
});

export const create = async (data: SPosts.TPost, c: Context) => {
  const { title, content, published } = data;
  const user = await c.get("user");

  if (!title || !content || !user.userId) {
    return responseStruct
      .merge({
        status: 400,
        success: false,
        message: "Params missing",
      })
      .toJS();
  }

  try {
    const data = {
      title,
      content,
      published: published ?? false,
      authorId: user.userId,
    };

    const post = await insert(data, c);

    return responseStruct
      .merge({
        status: 201,
        success: true,
        message: "Post added successfully.",
        data: post,
      })
      .toJS();
  } catch (err) {
    return catchErrRes(err);
  }
};

export const updatePost = async (
  id: string,
  data: SPosts.TUpdatePost,
  c: Context
) => {
  if (!id) {
    return {
      status: 400,
      message: "params missing",
      success: false,
    } as SPosts.TResponse<null, null>;
  }

  try {
    const updatedPost = await update(id, data, c);
    return {
      status: 201,
      success: true,
      message: "Post updated successfully.",
      data: updatedPost,
    } as SPosts.TResponse<object, null>;
  } catch (err) {
    return catchErrRes(err);
  }
};

export const getSinglePost = async (id: string, c: Context) => {
  if (!id) {
    return {
      status: 400,
      message: "params missing",
      success: false,
    } as SPosts.TResponse<null, null>;
  }

  try {
    const singlePost = await getOnePost(id, c);
    return {
      status: 201,
      success: true,
      message: "Success",
      data: singlePost,
    };
  } catch (err) {
    return catchErrRes(err);
  }
};

export const getAllPosts = async (c: Context) => {
  try {
    const singlePost = await getPosts(c);
    return {
      status: 201,
      success: true,
      message: "Success",
      data: singlePost,
    };
  } catch (err) {
    return catchErrRes(err);
  }
};

export const deletePost = async (id: string, c: Context) => {
  if (!id) {
    return {
      status: 404,
      success: false,
      message: "Params missing",
    } as SPosts.TResponse<null, null>;
  }

  try {
    const deleteAtPost = await deletedAtPost(id, c);
    return {
      status: 201,
      success: true,
      message: "Success",
      data: deleteAtPost,
    };
  } catch (err) {
    return catchErrRes(err);
  }
};
