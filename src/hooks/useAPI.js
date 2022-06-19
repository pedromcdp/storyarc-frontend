import { useQuery, useInfiniteQuery } from 'react-query';
import {
  fetchLatest,
  fetchTrending,
  fetchPost,
  fetchPostComments,
  fetchSearch,
  fetchUserPosts,
  fetchUserSavedPosts,
  fetchUserLikedPosts,
} from '../utils/apiCalls';

export function useGetLatest() {
  return useInfiniteQuery(
    'latest',
    ({ pageParam = 0 }) => fetchLatest(pageParam),
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage) => {
        if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
        return undefined;
      },
    },
  );
}

export function useGetTrending() {
  return useInfiniteQuery(
    'trending',
    ({ pageParam = 0 }) => fetchTrending(pageParam),
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage) => {
        if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
        return undefined;
      },
    },
  );
}

export function useGetSearch(query) {
  return useInfiniteQuery(
    ['search', query],
    ({ pageParam = 0 }) => fetchSearch(pageParam, query),
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage) => {
        if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
        return undefined;
      },
    },
  );
}

export function useGetPost(postId) {
  return useQuery(['posts', postId], () => fetchPost(postId));
}

export function useGetPostComments(postId) {
  return useQuery(['comments', postId], () => fetchPostComments(postId));
}

export function useGetUserPosts(uid, token) {
  return useQuery('userPosts', () => fetchUserPosts(uid, token));
}

export function useGetUserSavedPosts(uid, token) {
  return useQuery('userSavedPosts', () => fetchUserSavedPosts(uid, token));
}

export function useGetUserLikedPosts(uid, token) {
  return useQuery('userLikedPosts', () => fetchUserLikedPosts(uid, token));
}
