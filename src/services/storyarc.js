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
    getAllPost: builder.query({
      query: (query) => `posts/${query}`,
    }),
    getSearch: builder.query({
      query: (query) => `/posts/search?q=${query}`,
    }),
    getPostWithUserAndCommentsData: builder.query({
      query: (postId) => `posts/${postId}?_expand=user&_embed=comments`,
    }),
    getPostComments: builder.query({
      query: ({ postId }) => `posts/${postId}/comments`,
    }),
    getUserPosts: builder.query({
      query: ({ uid, token }) => ({
        url: `users/${uid}/posts`,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    getUserSavedPosts: builder.query({
      query: ({ uid, token }) => ({
        url: `users/${uid}/savedPosts`,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    getUserLikedPosts: builder.query({
      query: ({ uid, token }) => ({
        url: `users/${uid}/likedPosts`,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    getCommentOwner: builder.query({
      query: ({ uid }) => `users?id=${uid}`,
    }),
    getLocations: builder.query({
      query: () => `locations`,
    }),
    addComment: builder.mutation({
      query: ({ id, comment }) => ({
        url: `posts/${id}/addComment`,
        method: 'POST',
        body: comment,
      }),
    }),
    addUser: builder.mutation({
      query: (user) => ({
        url: `users`,
        method: 'PUT',
        body: user,
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
    deleteComment: builder.mutation({
      query: ({ id, postId }) => ({
        url: `comments/${id}`,
        method: 'POST',
        body: { postId },
      }),
    }),
  }),
});

export const {
  useGetAllPostQuery,
  useGetPostWithUserAndCommentsDataQuery,
  useGetPostCommentsQuery,
  useGetUserPostsQuery,
  useGetUserSavedPostsQuery,
  useGetUserLikedPostsQuery,
  useGetSearchQuery,
  useGetCommentOwnerQuery,
  useGetLocationsQuery,
  useAddCommentMutation,
  useAddUserMutation,
  useRemovePostMutation,
  useLikePostMutation,
  useDislikePostMutation,
  useSavePostMutation,
  useUnsavePostMutation,
  useDeleteCommentMutation,
  util: { getRunningOperationPromises },
} = StoryArcAPI;

export const {
  getAllPost,
  getPostWithUserAndCommentsData,
  getSearch,
  getUserPosts,
  getUserSavedPosts,
} = StoryArcAPI.endpoints;
