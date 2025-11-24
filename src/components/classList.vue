<script setup>
import { ref, onMounted, watch } from "vue";
import { createClass, getClasses } from "../firebase/services/classService.js";
import acessClassModal from "./modals/acessClassModal.vue";
import createClassModal from "./modals/createClassModal.vue";

const modalVisible = ref(false);
const selectedOption = ref(null);

const emit = defineEmits(["login", "close", "create"]);

const classes = ref([]);

async function load() {
    classes.value = await getClasses();
}

async function add() {
    await createClass({ name: username.value });
    username.value = "";
    load();
}

onMounted(load);

function handleAccess(data) {
    emit("access", data);
}

function selectRoom(room) {
    selectedOption.value = room;
}

function addsClass() {
    modalVisible.value = true;
}

function handleCreateClass(data) {
    emit("create", data);
    load();
}

watch(modalVisible, (newVal) => {
    if (!newVal) {
        emit("close");
    }
});
</script>

<template>
    <transition name="fade">
        <div class="modal-overlay">
            <button class="secundary" @click="addsClass()">+ Criar sala</button>
            <div v-for="room in classes" class="scenario-window">
                <button class="primary primary-hover" @click="selectRoom(room)">{{ room.name }}</button>
            </div>
            <acessClassModal :show="selectedOption" @close="selectedOption = null" :select="selectedOption" @access="handleAccess" />
            <createClassModal :show="modalVisible" @close="modalVisible = false" @create="handleCreateClass" />
        </div>
    </transition>
</template>

<style scoped>
.scenario-title {
    font-size: 20px;
    margin: 10px 0;
    text-shadow: 0 0 6px rgba(255, 255, 255, 0.6);
}

h2 {
    text-align: center;
    background: none;
    background-clip: text;
    background-size: 200% 200%;
    font-family: "Press Start 2P", system-ui;
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
    font-size: 20px;
}

.primary-hover:hover {
    scale: 1.05;
    transition: all 0.5s ease;
}

.secundary {
    width: 60%;
    max-width: 90%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(to bottom right,
            #2ad38a,
            #1fa566,
            #0f5c38);
    padding: 10px;
    clip-path: polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%,
            90% 100%, 10% 100%, 0% 90%, 0% 10%);
    position: relative;

    border: 4px solid white;
    outline: 6px solid #c6ffe0;
    box-shadow:
        0 0 15px rgba(0, 255, 150, 0.6),
        0 0 40px rgba(0, 255, 120, 0.25) inset;

    font-family: "Press Start 2P", system-ui;
    color: white;
    text-align: center;
}

.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(4px);
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    z-index: 9999;
    padding: 5% 0;
    gap: 2%;
}

.scenario-window {
    width: 60%;
    max-width: 90%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
</style>