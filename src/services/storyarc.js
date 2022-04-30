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
      query: () => `posts?_expand=user`,
    }),
    getPostWithUserAndCommentsData: builder.query({
      query: (postId) => `posts/${postId}?_expand=user&_embed=comments`,
    }),
    getPostComments: builder.query({
      query: ({ postId }) => `posts/${postId}/comments`,
    }),
    getUserPosts: builder.query({
      query: () => `posts?_expand=user&userId=vlBJfbmG6iNl86pQJhkNldJG0A52`,
    }),
    getUserSavedPosts: builder.query({
      query: () => `/users/vlBJfbmG6iNl86pQJhkNldJG0A52/savedPosts/`,
    }),
    getSearchResults: builder.query({
      query: ({ rua }) => `posts?streetName=${rua}&_expand=user`,
    }),
    getCommentOwner: builder.query({
      query: ({ uid }) => `users?id=${uid}`,
    }),
    getLocations: builder.query({
      query: () => `locations`,
    }),
    addComment: builder.mutation({
      query: (comment) => ({
        url: `comments`,
        method: 'POST',
        body: comment,
      }),
    }),
    addUser: builder.mutation({
      query: (user) => ({
        url: `users`,
        method: 'POST',
        body: user,
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
  useGetSearchResultsQuery,
  useGetCommentOwnerQuery,
  useGetLocationsQuery,
  useAddCommentMutation,
  useAddUserMutation,
  util: { getRunningOperationPromises },
} = StoryArcAPI;

export const { getAllPost, getPostWithUserAndCommentsData } =
  StoryArcAPI.endpoints;
