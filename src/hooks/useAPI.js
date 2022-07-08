import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from 'react-query';
import {
  fetchLatest,
  fetchTrending,
  fetchPost,
  fetchPostComments,
  fetchSearch,
  fetchUserPosts,
  fetchUserSavedPosts,
  fetchUserLikedPosts,
  postComment,
  deleteComment,
} from '../utils/apiCalls';

export function useGetLatest() {
  const queryClient = useQueryClient();
  return useInfiniteQuery(
    'latest',
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

export function useCreateComment() {
  const queryClient = useQueryClient();
  return useMutation(({ id, comment }) => postComment(id, comment), {
    onSuccess: ({ data }) => {
      const { comment } = data;
      queryClient.setQueryData(['comments', comment.postId], (oldQueryData) => [
        ...oldQueryData,
        comment,
      ]);
    },
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();
  return useMutation(({ id, postId }) => deleteComment(id, postId), {
    onMutate: ({ id, postId }) => {
      queryClient.setQueryData(['comments', postId], (oldQueryData) =>
        oldQueryData.filter((comment) => comment._id !== id),
      );
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['comments', variables.postId]);
    },
  });
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
