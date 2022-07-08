import axios from 'axios';
import { apiUrl } from './appUrls';

// Get Requests
const fetchLatest = (page) =>
  axios.get(`${apiUrl}/posts/latest?p=${page}`).then((res) => res.data);

const fetchTrending = (page) =>
  axios.get(`${apiUrl}/posts/trending?p=${page}`).then((res) => res.data);

const fetchPost = (postId) =>
  axios.get(`${apiUrl}/posts/${postId}`).then((res) => res.data);

const fetchPostComments = (postId) =>
  axios.get(`${apiUrl}/posts/${postId}/comments`).then((res) => res.data);

const fetchSearch = (page, query) =>
  axios
    .get(`${apiUrl}/posts/search?q=${query}&p=${page}`)
    .then((res) => res.data);

const fetchUserPosts = (uid, token) =>
  axios
    .get(`${apiUrl}/users/${uid}/posts`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);

const fetchUserSavedPosts = (uid, token) =>
  axios
    .get(`${apiUrl}/users/${uid}/savedPosts`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);

const fetchUserLikedPosts = (uid, token) =>
  axios
    .get(`${apiUrl}/users/${uid}/likedPosts`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);

// Post Requests
const postComment = (id, comment) =>
  axios.post(`${apiUrl}/posts/${id}/addComment`, comment);

const deleteComment = (id, postId) =>
  axios.post(`${apiUrl}/comments/${id}`, { postId });

export {
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
};
