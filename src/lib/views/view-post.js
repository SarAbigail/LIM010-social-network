/* eslint-disable object-curly-newline */
/* eslint-disable no-console */
/* eslint-disable max-len */

import { currentUser } from '../model/firebase-auth.js';
import { deletePost, editPost, addComment, readComments, editLikes } from '../model/firebase-db.js';
import { viewComment } from './view-comment.js';

export const listPosts = (data) => {
  const time = new Date(data.timePost.toDate());
  const divPostItem = document.createElement('div');
  let template = '';
  // if (data.privacity === 'Público' || data.user === currentUser().displayName) {
  template = `
    <label id="label-publicate" class="flex-c just-cont-sb">
      <p class="name-person">Publicado por ${data.email}</p> <div class="flex-r m-auto">
        <p class="m-info">${data.privacity}</p>
        <p class="m-info">${time.getDate()}${'/'}${time.getMonth() + 1}${'/'}${time.getFullYear()}</p>
        <p class="m-info">${time.getHours()}${':'}${time.getMinutes()}</p>
      </div>
      <textarea id="text-post" class="post-publicated c-darkblue" disabled>${data.post}</textarea>
      <select class="hide" id="select-mode">
        <option value="Público">Público</option>
        <option value="Privado">Privado</option>
      </select>
     
    </label>  

    <div class="options-like-deleted">
      <button id="like-${data.id}" class="btn-share"><i class='bx bx-heart cursor'>${data.like}</i></button>
      <button id="edit-${data.id}" class="btn-share"><i class='bx bx-edit cursor'>Editar</i></button>
      <button type="button" class="hide cursor  btn-share" id="edit-post">Guardar Edición</button>
      <button id="delete-${data.id}" class="btn-share cursor">Eliminar</button>
    </div>
    <div id="textarea-comment" class="">
      <textarea id="new-comment" class="post c-darkblue" type="text" placeholder="Escribe tu comentario" /></textarea>
      <button type="button" id="btn-comment" class="btn-share cursor bg-color-pink">Comentar</button>
    </div>
    <div id="comments-container" class=""></<div>`;

  divPostItem.innerHTML = template;
  divPostItem.setAttribute('class', 'flex-c  bg-color-blue post-label w-80');

  const btnDelete = divPostItem.querySelector(`#delete-${data.id}`);
  const btnEdit = divPostItem.querySelector(`#edit-${data.id}`);
  const btnComment = divPostItem.querySelector('#btn-comment');
  const btnLike = divPostItem.querySelector(`#like-${data.id}`);
  const comments = divPostItem.querySelector('#comments-container');
  const modeEdit = divPostItem.querySelector('#select-mode');
  const btnSaveEdit = divPostItem.querySelector('#edit-post');
  const textArea = divPostItem.querySelector('#text-post');
  
  if (data.idUser !== currentUser().uid) {
    btnDelete.classList.add('hide');
    btnEdit.classList.add('hide');
  } else {
    btnDelete.addEventListener('click', () => deletePost(`${data.id}`));

    btnEdit.addEventListener('click', () => {
      btnEdit.classList.add('hide');
      btnSaveEdit.classList.remove('hide');
      modeEdit.classList.remove('hide');
      textArea.disabled = false;
      textArea.select();
    });
    btnSaveEdit.addEventListener('click', () => {
      editPost(`${data.id}`, textArea.value, modeEdit.value);
    });
  }
  btnLike.addEventListener('click', () => {
    const valor = data.like + 1;
    editLikes(data.id, valor);
  });

  btnComment.addEventListener('click', () => {
    const comment = divPostItem.querySelector('#new-comment').value;
    addComment(comment, currentUser().email, `${data.id}`, currentUser().uid)
      .then((response) => {
        divPostItem.querySelector('#new-comment').value = '';
        console.log('Se agregó a tu collección', response);
      }).catch((error) => {
        console.log('No se agregó', error);
      });
  });

  readComments(`${data.id}`, (dato) => {
    comments.innerHTML = '';
    dato.forEach(obj => comments.appendChild(viewComment(obj)));
  });

  // btnEdit.addEventListener('click', () => edit(data.Id, data.id)); // de la funcion que no funciona correctamente
  // }
  return divPostItem;
};
