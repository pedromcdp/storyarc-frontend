import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { nanoid } from 'nanoid';

export const UploadService = {
  uploadFile: (file, setProgress) =>
    new Promise((resolve, reject) => {
      const storageRef = firebase.storage().ref(`images/${nanoid()}`);
      const uploadTask = storageRef.put(file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            resolve(downloadURL);
          });
        },
      );
    }),
};
