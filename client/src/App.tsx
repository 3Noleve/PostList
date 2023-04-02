import React from 'react';
import {
  AppContainer,
  Button,
  Input,
  InputContainer,
  ListContainer,
  Title,
  PostActions,
  PostButton,
  PostCard,
  PostDescription,
  PostTitle,
  TextArea,
} from './styles';

import { FetchMakePost, FetchPosts, FetchRemovePost, FetchUpdatePost } from './api/post';

import { addPost, deletePost, updatePost, setPosts } from './store/reducers/postSlice';

import { useAppDispatch, useAppSelector } from './store/redux';

interface Post {
  id: number;
  title: string;
  description: string;
}

const App = () => {
  const [post, setPost] = React.useState<Post | null>(null);

  const [title, setTitle] = React.useState<string>('');
  const [editMode, setEditMode] = React.useState(false);
  const [description, setDescription] = React.useState('');

  const dispatch = useAppDispatch();

  const { posts } = useAppSelector((state) => state.PostReducer);

  const handleAddPost = async () => {
    if (!title || !description) {
      console.warn('Please enter a title and a description for your post.');

      return;
    }

    try {
      const newPost = await FetchMakePost(title, description);

      dispatch(addPost(newPost));

      setTitle('');

      setDescription('');
    } catch (e) {
      console.warn(e);
    }
  };

  const handleEditPost = (post: Post) => {
    setEditMode(true);
    setPost({ id: post.id, title: post.title, description: post.description });
    setTitle(post.title);
    setDescription(post.description);
  };

  const handleUpdatePost = async () => {
    try {
      if (post && post.id) {
        const updatedPost = await FetchUpdatePost(post.id, title, description);

        dispatch(updatePost(updatedPost));

        setEditMode(false);

        setPost(null);

        setTitle('');

        setDescription('');
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const handleDeletePost = async (id: number) => {
    try {
      await FetchRemovePost(id);

      dispatch(deletePost(id));
    } catch (e) {
      console.warn(e);
    }
  };

  const GetPosts = async () => {
    try {
      const posts = await FetchPosts();

      dispatch(setPosts({ posts }));
    } catch (e) {
      console.warn(e);
    }
  };

  React.useEffect(() => {
    GetPosts();
  }, [posts]);

  return (
    <AppContainer>
      <Title>Post List</Title>

      <InputContainer>
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextArea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </InputContainer>

      <h2>{editMode ? 'Edit Post' : 'Add Post'}</h2>

      <div style={{ marginBottom: '20px' }}>
        {editMode ? (
          <Button onClick={handleUpdatePost}>Update Post</Button>
        ) : (
          <Button onClick={handleAddPost}>Add Post</Button>
        )}
      </div>

      <ListContainer>
        {posts.map((post) => (
          <PostCard key={post.id}>
            <PostTitle>
              <h3>{post?.title}</h3>
            </PostTitle>

            <PostDescription>
              <div style={{ marginBottom: '10px' }}>
                <span>Description:</span>
              </div>

              {post?.description}
            </PostDescription>

            <PostActions>
              <PostButton onClick={() => handleEditPost(post)}>Edit</PostButton>

              <PostButton onClick={() => handleDeletePost(post.id)}>Delete</PostButton>
            </PostActions>
          </PostCard>
        ))}
      </ListContainer>
    </AppContainer>
  );
};

export default App;
