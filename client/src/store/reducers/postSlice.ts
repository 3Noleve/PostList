import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Post {
  id: number;
  title: string;
  description: string;
}

interface PostState {
  posts: Post[];
}

const initialState: PostState = {
  posts: [],
};

interface AddPostPayload {
  title: string;
  description: string;
}

interface SetPostsPayload {
  posts: Post[];
}

interface UpdatePostPayload {
  id: number;
  title: string;
  description: string;
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<SetPostsPayload>) => {
      state.posts = action.payload.posts;
    },

    addPost: (state, action: PayloadAction<AddPostPayload>) => {
      const newPost: Post = {
        id: state.posts.length + 1,
        title: action.payload.title,
        description: action.payload.description,
      };
      state.posts.push(newPost);
    },

    updatePost: (state, action: PayloadAction<UpdatePostPayload>) => {
      const { id, title, description } = action.payload;
      const existingPost = state.posts.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.description = description;
      }
    },

    deletePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
});

export const { addPost, updatePost, deletePost, setPosts } = postSlice.actions;

export default postSlice.reducer;
