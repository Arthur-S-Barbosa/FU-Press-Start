<template>
  <div class="container-hover">
    <div class="objeto-principal">Passe o mouse aqui</div>
    <div class="objeto-revelado">Eu apareci!</div>
  </div>
</template>

<style scoped>
.objeto-revelado {
  display: none; /* Oculta o elemento por padrão */
}

.objeto-principal:hover + .objeto-revelado {
  display: block; /* Mostra o elemento quando o mouse passa sobre o principal */
}
</style>
