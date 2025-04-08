import { SPosts } from "./TypesPosts";

export const catchErrRes = (err: any) => {
  return {
    status: 500,
    success: false,
    message: "Something went wrong",
    data: {
      error: err,
    },
  } as SPosts.TResponse<object, null>;
};
