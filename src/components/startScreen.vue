<script setup>
import startButton from "./startButton.vue";

const emit = defineEmits(["start"]); 
</script>

<template>
    <div class="content">
        <img src="../assets/FU-logo.png" alt="Fábula Última" />
        <p class="glow-line">Aqui começa a sua história.</p>
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

.glow-line {
    position: relative;
}

.glow-line::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 4px;
    transform: translateY(-50%);
    background: linear-gradient(to right,
            transparent,
            rgba(80, 200, 255, 0.8),
            rgba(238, 234, 243, 1),
            rgba(80, 200, 255, 0.8),
            transparent);
    filter: blur(4px);
    z-index: 0;
    border-radius: 50px;
}
</style>