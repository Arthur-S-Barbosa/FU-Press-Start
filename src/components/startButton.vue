<script setup lang="ts">
import { ref, onMounted } from 'vue';
const text = "Aperte Start";
const name = ref("");
const click = ref(0);

const time = ref(true);

onMounted(() => {
    let i = 0;
    const interval = setInterval(() => {
        name.value += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(interval);
            time.value = false;
        }
    }, 200);
});

function clicou() {
    click.value++;
}

</script>

<template>
    <button @click="$emit('start')" class="primary" :class="[{ 'primary-hover': !time }]" :disabled="time">
        <h1 v-if="!time" class="blur">{{ name }}</h1>
        <h1>{{ name }}</h1>
        <h1 v-if="time" class="line">_</h1>
    </button>
</template>

<style scoped>
h1 {
    text-align: center;
    background: linear-gradient(to top, var(--vibrant-orange), var(--burnt-orange), var(--dark-orange), var(--deep-orange));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: "Press Start 2P", system-ui;
    font-size: medium;
}

.line {
    background: linear-gradient(to right, var(--light-cream), var(--vibrant-orange), var(--burnt-orange), var(--dark-orange), var(--deep-orange));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: blinkCursor 350ms steps(50) infinite normal
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

*:focus {
    outline: none !important;
}

.primary {
    background: none !important;
    padding: 20px;
    margin: 0px;
    border: none;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content !important;
    height: fit-content !important;
    transition: all 0.5s ease;
}

.primary-hover:hover {
    scale: 1.05;
    transition: all 0.5s ease;
}

.blur {
    position: absolute;
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
</style>
