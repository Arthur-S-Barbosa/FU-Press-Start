<script setup>
import { ref, onMounted } from "vue";
import { getClasses } from "../../firebase/services/classService.js";

const props = defineProps({
    show: { type: Boolean, default: false },
    select: { type: Object, default: null }
});

const emit = defineEmits(["login", "close", "access"]);

const classes = ref([]);
const password = ref("");

function handleAcessClass() {
    const classItem = classes.value.find(c => c.name === props.select.name);
    if (classItem.password == password.value) {
        alert(`Acesso concedido à sala: ${classItem.name}`);
        emit("access", classItem);
        emit("close");
    } else {
        alert("Senha incorreta. Tente novamente.");
    }
}

async function load() {
    classes.value = await getClasses();
}

onMounted(load);
</script>

<template>
    <transition name="fade">
        <div class="modal-overlay" v-if="show" @click="$emit('close')">
            <div class="scenario-window" @click.stop>
                <h1 class="scenario-title">{{ select.name }}</h1>
                <div class="divider"></div>
                <input type="password" placeholder="Senha" v-model="password">
                <div class="divider"></div>
                <button class="primary primary-hover" @click="handleAcessClass">
                    Acessar
                </button>
            </div>
        </div>
    </transition>
</template>

<style scoped>
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

.fade-enter-active,
.fade-leave-active {
    transition: opacity .3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.scenario-window {
    width: 600px;
    max-width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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

.option-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}

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

.scenario-title {
    font-size: 26px;
    margin: 10px 0;
    text-shadow: 0 0 6px rgba(255, 255, 255, 0.6);
}

.divider {
    width: 80% !important;
    height: 3px;
    background: linear-gradient(to right,
            transparent,
            rgba(255, 255, 255, 0.7),
            transparent);
    margin: 10px auto 10px;
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

.primary {
    background: none !important;
    margin: 0px;
    border: none;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100% !important;
    height: fit-content !important;
    transition: all 0.5s ease;
    font-family: "Press Start 2P", system-ui;
    font-size: 10px;
}

.primary-hover:hover {
    scale: 1.05;
    transition: all 0.5s ease;
}

input {
    width: 80%;
    padding: 12px;
    margin-bottom: 12px;
    background: rgba(255, 255, 255, 0.15);
    border: none;
    border-radius: 6px;
    outline: none;
    color: white;
    font-size: 16px;
    transition: 0.2s;
    text-align: center;
    font-family: "Press Start 2P", system-ui;
    font-size: 10px;
}

input::placeholder {
    color: rgba(255, 255, 255, 0.7);
}

input:focus {
    background: rgba(255, 255, 255, 0.25);
}
</style>
