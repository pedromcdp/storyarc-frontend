import { useQueryClient, useMutation } from 'react-query';
import {
  postComment,
  deleteComment,
  createPost,
  deletePost,
  likePost,
  dislikePost,
  savePost,
  unsavePost,
  reportPost,
  CreateOrUpdateUser,
  createNotification,
  deleteNotification,
  deleteNotificationOnDislikes,
  markNotificationsAsRead,
} from '../utils/apiCalls';

export const useAddUser = () => useMutation((user) => CreateOrUpdateUser(user));

export const useCreateComment = () => {
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
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation(({ id, postId }) => deleteComment(id, postId), {
    onMutate: ({ id, postId }) => {
      queryClient.setQueryData(['comments', postId], (oldQueryData) =>
        oldQueryData.filter((comment) => comment._id !== id),
      );
    },
    onSuccess: (variables) => {
      queryClient.invalidateQueries(['comments', variables.postId]);
    },
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation((post) => createPost(post), {
    onSuccess: () => {
      queryClient.invalidateQueries('userPosts');
      queryClient.invalidateQueries('recent');
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation(({ postId, token }) => deletePost(postId, token), {
    onMutate: ({ postId }) => {
      queryClient.setQueryData('userPosts', (oldQueryData) =>
        oldQueryData.filter((post) => post._id !== postId),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries('userPosts');
      queryClient.invalidateQueries('trending');
      queryClient.invalidateQueries('recent');
    },
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation(({ id, postId, token }) => likePost(id, postId, token), {
    onMutate: ({ postId }) => {
      queryClient.setQueryData('userLikedPosts', (oldQueryData) => ({
        likedPosts: [...oldQueryData.likedPosts, { _id: postId }],
      }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries('userLikedPosts');
    },
  });
};

export const useDislikePost = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, postId, token }) => dislikePost(id, postId, token),
    {
      onMutate: ({ postId }) => {
        queryClient.setQueryData('userLikedPosts', (oldQueryData) => ({
          likedPosts: oldQueryData.likedPosts.filter((post) => post !== postId),
        }));
      },
      onSuccess: () => {
        queryClient.invalidateQueries('userLikedPosts');
      },
    },
  );
};

export const useSavePost = () => {
  const queryClient = useQueryClient();
  return useMutation(({ id, postId, token }) => savePost(id, postId, token), {
    onMutate: ({ postId }) => {
      queryClient.setQueryData('userSavedPosts', (oldQueryData) => ({
        savedPosts: [...oldQueryData.savedPosts, { _id: postId }],
      }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries('userSavedPosts');
    },
  });
};

export const useUnsavePost = () => {
  const queryClient = useQueryClient();
  return useMutation(({ id, postId, token }) => unsavePost(id, postId, token), {
    onMutate: ({ postId }) => {
      queryClient.setQueryData('userSavedPosts', (oldQueryData) => ({
        savedPosts: oldQueryData.savedPosts.filter((post) => post !== postId),
      }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries('userSavedPosts');
    },
  });
};

export const useReportPost = () => useMutation((id) => reportPost(id));

export const useCreateNotification = () =>
  useMutation(
    ({ id, token, notification }) =>
      createNotification(id, token, notification),
    {
      onSuccess: (data) => {
        console.log(data);
      },
    },
  );

export const useClearNotifications = () => {
  const queryClient = useQueryClient();
  return useMutation((token) => deleteNotification(token), {
    onMutate: () => {
      queryClient.setQueryData('userNotifications', () => ({
        unreadCount: 0,
        notifications: [],
      }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries('userNotifications');
    },
  });
};

export const useRemoveNotification = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, token }) => deleteNotificationOnDislikes(id, token),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('userNotifications');
      },
    },
  );
};

export const useMarkNotificationsAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation((token) => markNotificationsAsRead(token), {
    onMutate: () => {
      queryClient.setQueryData('userNotifications', (oldQueryData) => ({
        unreadCount: 0,
        notifications: oldQueryData.notifications.map((notification) => ({
          ...notification,
          read: true,
        })),
      }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries('userNotifications');
    },
  });
};
