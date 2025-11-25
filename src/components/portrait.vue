<script setup>
const props = defineProps({
  charactersName: { type: String, default: "" },
});

const charNamePath = props.charactersName.replaceAll(" ", "_");
const charName = props.charactersName;
</script>

<template>
  <div class="container-hover">
    <div class="objeto-principal">
      <img :src="`../assets/portraits/${charNamePath}_portrait.png`" :alt="charName" />
    </div>
    <div class="objeto-revelado">
      <img :src="`../assets/characters/${charNamePath}.png`" :alt="charName" />
    </div>
  </div>
</template>

<style scoped>
.container-hover {
  position: block;
  display: inline-block;
}

.objeto-revelado {
  display: none;
}

.objeto-principal:hover+.objeto-revelado {
  display: block;
  z-index: 10;
  top: 0;
}
</style>
