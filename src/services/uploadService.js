import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

export const UploadService = {
  uploadFile: async (file, fileName) => {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${fileName}`).put(file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        // error function
        console.log(error);
      },
      () => {
        // complete function
        storageRef
          .child(`${fileName}`)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
          });
      },
    );
  },
};
