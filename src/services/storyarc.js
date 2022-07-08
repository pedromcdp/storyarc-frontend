import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { apiUrl } from '../utils/appUrls';

export const StoryArcAPI = createApi({
  reducerPath: 'storyarc',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (user) => ({
        url: `users`,
        method: 'PUT',
        body: user,
      }),
    }),
    uploadPost: builder.mutation({
      query: (post) => ({
        url: `posts/addPost`,
        method: 'POST',
        body: post,
      }),
    }),
    removePost: builder.mutation({
      query: ({ postId, token }) => ({
        url: `posts/${postId}`,
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    likePost: builder.mutation({
      query: ({ id, postId, token }) => ({
        url: `users/${id}/like`,
        method: 'POST',
        body: { postId },
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    dislikePost: builder.mutation({
      query: ({ id, postId, token }) => ({
        url: `users/${id}/dislike`,
        method: 'POST',
        body: { postId },
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    savePost: builder.mutation({
      query: ({ id, postId, token }) => ({
        url: `users/${id}/addSavedPost`,
        method: 'POST',
        body: { postId },
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    unsavePost: builder.mutation({
      query: ({ id, postId, token }) => ({
        url: `users/${id}/removeSavedPost`,
        method: 'POST',
        body: { postId },
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    reportPost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}/report`,
        method: 'PUT',
      }),
    }),
  }),
});

export const {
  useAddUserMutation,
  useUploadPostMutation,
  useRemovePostMutation,
  useLikePostMutation,
  useDislikePostMutation,
  useSavePostMutation,
  useUnsavePostMutation,
  useReportPostMutation,
} = StoryArcAPI;
