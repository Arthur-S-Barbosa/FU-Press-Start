<script setup>
import startButton from "./startButton.vue";

const emit = defineEmits(["start"]); 
</script>

<template>
    <div class="content">
        <img src="../assets/FU-logo.png" alt="Fábula Última"/>
        <p>Aqui começa a sua história.</p>
        <startButton @start="emit('start')" />
    </div>
</template>

<style scoped>
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    text-align: center;
    color: var(--light-cream);
    font-family: "Press Start 2P", system-ui;
    padding: 20px;
}
</style>