// export const savePost = (textPost) => {
//   const addPost = firebase.firestore().collection('posts').add({
//     title: textPost,
//     state: false,
//   });
//   return addPost;
// };

export const createUser = () => {
  const nickname = document.getElementById('nickname').value;
  const email = document.getElementById('email-signup').value;
  const addUserCollection = firebase.firestore().collection('users').add({
    Usuario: nickname,
    Correo: email,
  });
  return addUserCollection;
};
