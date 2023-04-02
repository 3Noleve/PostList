import { api } from './index';
import { AxiosRequestConfig } from 'axios';

interface Post {
  id: number;
  title: string;
  description: string;
}

interface APIResponse {
  posts: Post[];
}

enum RequestMethod {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  DELETE = 'delete',
}

export const FetchPosts = async (): Promise<Post[]> => {
  const config: AxiosRequestConfig = {
    method: RequestMethod.GET,
    url: '/posts',
  };

  const response = await api.request(config);

  return response.data;
};

export const FetchPost = async (id: number): Promise<Post> => {
  const config: AxiosRequestConfig = {
    method: RequestMethod.GET,
    url: `/posts/${id}`,
  };

  const response = await api.request<APIResponse>(config);

  return response.data.posts[0];
};

export const FetchMakePost = async (title: string, description: string): Promise<Post> => {
  const config: AxiosRequestConfig = {
    method: RequestMethod.POST,
    url: '/posts/user/6426f64455312ae21db33eed',
    data: { title, description },
  };

  const response = await api.request(config);

  return response.data[0];
};

export const FetchRemovePost = async (id: number): Promise<number> => {
  const config: AxiosRequestConfig = {
    method: RequestMethod.DELETE,
    url: `/posts/${id}`,
  };
  await api.request(config);
  return id;
};

export const FetchUpdatePost = async (
  id: number,
  title: string,
  description: string,
): Promise<Post> => {
  const config: AxiosRequestConfig = {
    method: RequestMethod.PATCH,
    url: `/posts/${id}`,
    data: { title, description },
  };

  const response = await api.request(config);

  return response.data[0];
};
