/* eslint-disable import/no-cycle */
import { signInEmail, signInGoogle, signInFacebook } from '../controller/ingresar.js';
import { changeHash } from '../controller/router.js';

export const viewSignIn = () => {
  const formSignIn = document.createElement('div');
  const template = `
  <div class ="banner center-items two-col">
  </div>
  <div class="center-items two-col flex-c">
      <img src="https://raw.githubusercontent.com/gabhu-dev/LIM010-social-network/master/src/lib/img/logo3.png"/ class="logo" alt="logo hey! hallyu">
      <p class="w-max">Bienvenidxs a Hey! Hallyu.<br>
      La web más comentada</p>
      <p class="error" id=msg-wrong></p>
      <form name="login-form" class="flex-c center-items">
        <input type="email" name="email" placeholder=" &#128100; Correo Electrónico" id="email-signin" class="input-form flex-c " required autofocus>
        <input type="password" name="password" placeholder=" &#128274; Contraseña" id="password-signin" class="input-form flex-c" required>
        <input type="button"name="log-in" value="Iniciar Sesión" id="btn-login" class="btn-signin c-darkpink bg-color-pink" ><a href="#/home"></a>
      </form>
      <p>O bien ingresa con...</p>
      <div class="logos-face-google w-max">
        <i class='bx bxl-facebook icons-size' style='color:#485aa3' id="login-fb" ></i>
        <i class='bx bxl-google icons-size' style='color:#d2070a' id="login-gog" ></i>
      </div>
      <p class="w-max">¿No tienes una cuenta?&nbsp;<a id="btn-sign-up" href="#/signup" class="btn-registrate c-darkblue">Regístrate</a></p>
  </div>
  `;
  formSignIn.innerHTML = template;
  formSignIn.setAttribute('class', 'flex-r center-items size bg-color-blue');
  const btnSignIn = formSignIn.querySelector('#btn-login');
  const btnSignGog = formSignIn.querySelector('#login-gog');
  const btnSignFb = formSignIn.querySelector('#login-fb');
  btnSignIn.addEventListener('click', () => {
    const email = document.getElementById('email-signin').value;
    const password = document.getElementById('password-signin').value;
    const error = document.getElementById('msg-wrong');
    if (email.length === 0 && password.length === 0) {
      error.innerHTML = 'Debe rellenar los campos correctamente';
    } else {
      signInEmail(email, password)
        .then(() => changeHash('/home'))
        .catch(() => {
          error.innerHTML = '¡Escribe una cuenta válida!';
        });
    }
  });
  btnSignGog.addEventListener('click', () => {
    signInGoogle();
  });
  btnSignFb.addEventListener('click', () => {
    signInFacebook();
  });
  return formSignIn;
};
