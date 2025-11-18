import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config";
const initialState = {
  posts: [],
  comments: [],
  likes: [],
  status: null,
  error: null,
};

// Async thunks
export const likePost = createAsyncThunk("posts/likePost", async (postData) => {
  try {
    const response = await axios.put(
      `${ENV.SERVER_URL}/likePost/${postData.postId}`,
      { userId: postData.userId }
    );
    return response.data.post;
  } catch (error) {
    console.log(error);
  }
});

export const savePost = createAsyncThunk("posts/savePost", async (postData) => {
  try {
    const response = await axios.post(`${ENV.SERVER_URL}/savePost`, {
      postMsg: postData.postMsg,
      email: postData.email,
    });
    return response.data.post;
  } catch (error) {
    console.log(error);
  }
});

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  try {
    const response = await axios.get(`${ENV.SERVER_URL}/getPosts`);
    return response.data.posts;
  } catch (error) {
    console.log(error);
  }
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // likePost
      .addCase(likePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedPostIndex = state.posts.findIndex(
          (post) => post._id === action.payload.postId
        );
        if (updatedPostIndex !== -1) {
          state.posts[updatedPostIndex].likes = action.payload.likes;
        }
      })
      .addCase(likePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // savePost
      .addCase(savePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(savePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts.unshift(action.payload);
      })
      .addCase(savePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
