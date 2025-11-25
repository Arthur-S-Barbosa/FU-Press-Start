<script setup>
import { ref, onMounted } from "vue";
import { getCharacters } from "../firebase/services/characterService.js";
import portrait from "./portrait.vue";

const props = defineProps({
    show: { type: Boolean, default: false },
    roomId: { type: String, required: true }  
});

const emit = defineEmits(["close", "select"]);

const characters = ref([]);
const loading = ref(true);

async function loadCharacters() {
    loading.value = true;
    try {
        const all = await getCharacters();
        characters.value = all.filter(c => c.roomId === props.roomId);
    } catch (err) {
    }
    loading.value = false;
}

function selectCharacter(char) {
    emit("select", char);
}

onMounted(loadCharacters);
</script>

<template>
    <transition name="fade">
        <div class="modal-overlay" v-if="show" @click="$emit('close')">
            <div class="window">
                <h2 class="title">Personagens da Sala</h2>
                <div v-if="loading" class="loading">Carregando...</div>
                <div v-else class="char-list">
                    <div v-for="char in characters" :key="char.id" class="char-card" @click="selectCharacter(char)">
                        <portrait :charactersName="char.name" />
                        <h3>{{ char.name }}</h3>
                        <p class="small">Nível: {{ char.level }}</p>
                        <details class="details">
                            <summary>Habilidades</summary>
                            <div v-for="hab in char.habilities" :key="hab.id" class="hab-block">
                                <p><b>{{ hab.name }}</b></p>
                                <div v-for="(sceneItems, sceneName) in hab.scenes" :key="sceneName" class="scene">
                                    <p class="scene-title">{{ sceneName }}</p>
                                    <ul>
                                        <li v-for="item in sceneItems" :key="item.id">
                                            {{ item.name || "Item" }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </details>
                    </div>
                </div>
                <button class="close-btn" @click="emit('close')">Fechar</button>
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

.window {
    width: 70%;
    padding: 20px;
    background: linear-gradient(to bottom right,
            #2ad38a, #1fa566, #0f5c38);
    clip-path: polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%,
            90% 100%, 10% 100%, 0% 90%, 0% 10%);
    border: 4px solid #fff;
    outline: 6px solid #c6ffe0;
    box-shadow:
        0 0 15px rgba(0, 255, 150, 0.6),
        inset 0 0 40px rgba(0, 255, 120, 0.25);
    color: white;
    font-family: "Press Start 2P", system-ui;
}

.title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 18px;
}

.char-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.char-card {
    padding: 15px;
    background: rgba(0, 0, 0, 0.25);
    border: 2px solid white;
    cursor: pointer;
    transition: transform .3s;
}

.char-card:hover {
    transform: scale(1.03);
}

.small {
    font-size: 12px;
    opacity: 0.8;
}

.details {
    margin-top: 10px;
    font-size: 12px;
}

.hab-block {
    margin-top: 10px;
    padding-left: 10px;
}

.scene {
    margin-left: 15px;
    margin-top: 5px;
}

.scene-title {
    font-size: 11px;
    text-decoration: underline;
}

.close-btn {
    margin-top: 15px;
    width: 100%;
    padding: 10px;
    cursor: pointer;
    background: white;
    color: black;
    font-family: inherit;
    border: none;
}
</style>
