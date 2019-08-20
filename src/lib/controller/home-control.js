// import { savePost } from './post.js';

// export const addPost = (e) => {
//   e.preventDefault();
//   const post = document.getElementById('text-post').value;
//   return savePost(post)
//     .then(() => {
//       // eslint-disable-next-line no-console
//       console.log('se añadio correctamente');
//     });
// };

export const addPost = () => {
  const post = document.getElementById('text-post').value;
  console.log(post);
  firebase.firestore().collection('post').add({
    Post: post,
    timePost: (new Date()).toLocaleDateString(),
  })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
      // document.getElementById('correo').value = '';
      // document.getElementById('new-post').value = '';
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};
