<script setup>
defineProps({
    show: { type: Boolean, default: false },
    title: { type: String, default: "MAIN SCENARIO #??" },
    subtitle: { type: String, default: "[SCENARIO TITLE]" },
});
defineEmits(["close"]);
</script>

<template>
    <transition name="fade">
        <div v-if="show" class="modal-overlay" @click="$emit('close')">
            <div class="scenario-window" @click.stop>
                <div class="scenario-header">
                    <span class="window-title">■ □ ✖</span>
                </div>
                <h1 class="scenario-title">{{ title }}</h1>
                <div class="divider"></div>
                <h2 class="scenario-subtitle">{{ subtitle }}</h2>
                <div class="scenario-content">
                    <slot />
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>
/* === OVERLAY === */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

/* === ANIMAÇÃO === */
.fade-enter-active,
.fade-leave-active {
    transition: opacity .3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* === JANELA ESTILO ORV === */
.scenario-window {
    width: 600px;
    max-width: 90%;
    background: linear-gradient(to bottom right,
            #2ad38a,
            #1fa566,
            #0f5c38);
    padding: 30px;
    clip-path: polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%,
            90% 100%, 10% 100%, 0% 90%, 0% 10%);
    position: relative;

    border: 4px solid white;
    outline: 6px solid #c6ffe0;
    box-shadow:
        0 0 15px rgba(0, 255, 150, 0.6),
        0 0 40px rgba(0, 255, 120, 0.25) inset;

    font-family: "Trebuchet MS", sans-serif;
    color: white;
    text-align: center;
}

/* top-right fake window controls */
.scenario-header {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    font-size: 18px;
    margin-bottom: 10px;
}

.window-title {
    letter-spacing: 4px;
}

/* Titles */
.scenario-title {
    font-size: 26px;
    margin: 10px 0;
    text-shadow: 0 0 6px rgba(255, 255, 255, 0.6);
}

.divider {
    width: 80%;
    height: 3px;
    background: linear-gradient(to right,
            transparent,
            #ffffff,
            transparent);
    margin: 12px auto 20px;
}

.scenario-subtitle {
    font-size: 20px;
    margin-bottom: 15px;
    text-shadow: 0 0 4px rgba(255, 255, 255, 0.6);
}

.scenario-content {
    margin-top: 10px;
    text-align: left;
    width: 80%;
    margin-inline: auto;
    font-size: 16px;
    line-height: 1.6;
}
</style>
