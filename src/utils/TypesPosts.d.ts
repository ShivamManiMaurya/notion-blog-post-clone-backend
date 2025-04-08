export declare namespace SPosts {
  type TUpdatePost = Partial<{
    title: string;
    content: string;
    published: boolean;
  }>;

  type TPost = Required<Pick<TUpdatePost, "title" | "content">> &
    Partial<Pick<TUpdatePost, "published">> & { authorId: string };

  type TResponse<T, M> = {
    success: boolean;
    message: string;
    id?: string | number;
    data?: T;
    metadata?: M;
    status: number;
  };
}
