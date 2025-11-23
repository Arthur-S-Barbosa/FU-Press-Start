<script setup>
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
    <button @click="$emit('start')" class="primary" :disabled="time">
        <div :class="[{ 'fade-border orv-container': !time }]">
            <h1 v-if="!time" class="blur" :class="[{ 'primary-hover': !time }]">{{ name }}</h1>
            <h1 class="glow-line">{{ name }}</h1>
            <h1 v-if="time" class="line">_</h1>
        </div>
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
    width: 80% !important;
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
            rgba(255, 200, 80, 0.8),
            rgba(241, 227, 176, 0.8),
            rgba(255, 200, 80, 0.8),
            transparent);
    filter: blur(4px);
    z-index: 0;
    border-radius: 50px;
}

.fade-border {
    --fade-size: 90px;

    mask-image: radial-gradient(ellipse at center,
            black calc(100% - var(--fade-size)),
            transparent 100%);

    -webkit-mask-image: radial-gradient(ellipse at center,
            black calc(100% - var(--fade-size)),
            transparent 100%);
}

.orv-container {
    padding: 0px 32px;
    background: rgba(160, 104, 0, 0.3);
    border-top: 2px solid rgba(255, 233, 192, 0.8);
    border-bottom: 2px solid rgba(255, 233, 192, 0.8);
    color: orange;
    font-family: 'Press Start 2P', monospace;
    backdrop-filter: blur(4px);
    border-radius: 3px;
    margin: 20px 0px;
}
</style>
