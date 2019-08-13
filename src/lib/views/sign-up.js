/* eslint-disable no-tabs */
import { signUpWithEmail, verification } from '../controller/ingresar.js';

export const viewSignUp = () => {
  const formSignUp = document.createElement('section');
  const template = `
  <form class="flex-c center-items size">
		<img src="" alt="">
		<p>Crea tu cuenta y disfruta del contenido</p>
		<input type="email" name="email" placeholder="Email" id="email-signup" class="input-form" required>
    <input type="password" name="password" placeholder="Password" id="password-signup" class="input-form" required>
    <button  class="btn-signup bg-color-blue c-darkblue" id="btn-sign-up">Registrar</button>
    <a href ="#/signin">Volver</a>
    <p class="error" id="msg-warning" ></p>
	</form>`;
  formSignUp.innerHTML = template;
  formSignUp.setAttribute('class', 'bg-color-pink');
  const btnSignUp = formSignUp.querySelector('#btn-sign-up');
  btnSignUp.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email-signup').value;
    const password = document.querySelector('#password-signup').value;
    const error = document.querySelector('#msg-warning');
    if (password.length >= 6) {
      signUpWithEmail(email, password)
        .then(() => {
          verification(email);
        });
    } else {
      error.innerHTML = 'La contraseña debe ser mayor a 6 caracteres';
    }
  });
  return formSignUp;
};
