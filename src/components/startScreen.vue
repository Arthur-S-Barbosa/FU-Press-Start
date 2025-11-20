<script setup>
import startButton from "./startButton.vue";

const emit = defineEmits(["start"]); 
</script>

<template>
    <div>
        <img src="../assets/FU-logo.png" alt="Fábula Última" class="w-[600px] mb-10 drop-shadow-xl" />
        <p class="text-lg mb-4 text-glow">Esta é a sua história.</p>
        <startButton @start="emit('start')" />
    </div>
</template>

<style scoped>
h1 {
    margin-bottom: 20px;
    text-align: center;
    background: linear-gradient(to right, var(--vibrant-orange), var(--burnt-orange), var(--dark-orange), var(--deep-orange));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.line {
    background: linear-gradient(to right, var(--light-cream), var(--vibrant-orange), var(--burnt-orange), var(--dark-orange), var(--deep-orange));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: blinkCursor 200ms steps(50) infinite normal
}

@keyframes blinkCursor {
    from {
        background: linear-gradient(to right, var(--light-cream), var(--vibrant-orange), var(--burnt-orange), var(--dark-orange), var(--deep-orange));
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    to {
        background: transparent;
    }
}

.primary {
    background-color: var(--antique-white);
    padding: 20px;
    margin: 0px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100vh;
    height: fit-content;
    transition: all 0.5s ease;
}

.primary:hover {
    background-color: var(--bisque);
    transition: all 0.5s ease;
}

.blur {
    position: absolute;
    width: 50%;
    height: auto;
    transition: all 0.5s ease;
    opacity: 1;
    z-index: -1;
    background: radial-gradient(var(--light-cream), var(--vibrant-orange), var(--burnt-orange));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.primary:hover .blur {
    opacity: 1;
    z-index: 1;
    background: radial-gradient(var(--light-cream), var(--vibrant-orange), var(--burnt-orange));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    border-radius: 9999px;
    filter: blur(15px);
}

@keyframes blink {

    0%,
    40% {
        opacity: 1;
    }

    50% {
        opacity: 0.1;
    }

    100% {
        opacity: 1;
    }
}

.animate-blink {
    animation: blink 1.3s infinite;
}
</style>