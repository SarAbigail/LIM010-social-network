export default () => {
  const viewProfile = document.createElement('div');
  const template = `
  <header>
    <nav class="flex-r center-items bg-color-blue h-f-height">
      <p>Nombre de Usuario</p>
      <p>Logo</p>
      <p>Cerrar Sesión</p>
    </nav>
  </header>
  <div class="flex-r">
    <div class="two-col center-items">
      aqui va el perfil del usuario
    </div>
    <div class="two-col center-items">
      <label class="post-l bg-color-pink">
        <input type="text" id="post" class="post" placeholder="¿Qué quieres compartir?">
        <button type="button" class="w-max bg-color-blue btn-share c-darkblue">Compartir</button>
      </label>
      <button type="button" id="savePost">Postear</button>
    </div>
  </div>
  <footer  class="bg-color-pink h-f-height">
    <p class="flex-r center-items">aqui va el footer</p>
  </footer>`;
  viewProfile.innerHTML = template;
  viewProfile.setAttribute('class', 'size');
  console.log(document.getElementById('post'));
  return viewProfile;
};
