import { useQuery, useInfiniteQuery, useQueryClient } from 'react-query';
import {
  fetchLatest,
  fetchTrending,
  fetchPost,
  fetchPostComments,
  fetchSearch,
  fetchUserPosts,
  fetchUserSavedPosts,
  fetchUserLikedPosts,
  fetchUserNotification,
} from '../utils/apiCalls';

export function useGetRecent() {
  const queryClient = useQueryClient();
  return useInfiniteQuery(
    'recent',
    ({ pageParam = 0 }) => fetchLatest(pageParam),
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage) => {
        if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
        return undefined;
      },
      onSuccess: (data) => {
        data.pages.forEach((pages) => {
          pages.data.forEach((post) => {
            queryClient.setQueryData(['posts', post._id], post);
          });
        });
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
  const queryClient = useQueryClient();
  return useQuery(['posts', postId], () => fetchPost(postId), {
    initialData: () => queryClient.getQueryData(['posts', postId]),
  });
}

export function useGetPostComments(postId) {
  return useQuery(['comments', postId], () => fetchPostComments(postId), {
    refetchInterval: 3000,
  });
}

export function useGetUserPosts(uid, token) {
  return useQuery('userPosts', () => fetchUserPosts(uid, token), {
    enabled: token !== null,
  });
}

export function useGetUserSavedPosts(uid, token) {
  return useQuery('userSavedPosts', () => fetchUserSavedPosts(uid, token), {
    initialData: () => {
      const initialData = { savedPosts: [] };
      return initialData;
    },
  });
}

export function useGetUserLikedPosts(uid, token) {
  return useQuery('userLikedPosts', () => fetchUserLikedPosts(uid, token), {
    initialData: () => {
      const initialData = { likedPosts: [] };
      return initialData;
    },
  });
}

export function useGetUserNotifications(token) {
  return useQuery('userNotifications', () => fetchUserNotification(token), {
    keepPreviousData: true,
    refetchInterval: 1500,
    refetchOnMount: true,
  });
}
