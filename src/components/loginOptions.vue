<script setup>
import { ref, onMounted, watch } from "vue";
import { getUsers } from "../firebase/services/userService.js";
import optionsModal from "./modals/optionsModal.vue";
import loginModal from "./modals/loginModal.vue";

const modalVisible = ref(true);
const selectedOption = ref("");
const emit = defineEmits(["login", "close", "register"]);
const users = ref([]);

async function load() {
    users.value = await getUsers();
}

onMounted(load);

function handleSelect(option) {
    selectedOption.value = option;
}

function handleLogin(data) {
    emit("login", data);
    emit("close");
}

function handleRegister(data) {
    emit("register", data);
    emit("close");
}

watch(modalVisible, (newVal) => {
    if (!newVal) {
        emit("close");
    }
});
</script>

<template>
    <optionsModal :show="modalVisible" :options="['Cadastrar', 'Entrar']" @close="modalVisible = false"
        @select="handleSelect" />
    <loginModal :show="selectedOption != ''" :select="selectedOption" @close="selectedOption = ''" @login="handleLogin"
        @register="handleRegister" />
</template>

<style scoped>
.popup {
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(141, 156, 151, 0.65);
    border-radius: 0px 0px 10px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: clamp(300px, 50vw, 500px);
    height: clamp(150px, 50vh, 250px);
}

.info {
    width: 30%;
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-bottom: 10%;
}

h2 {
    text-align: center;
    background: var(--spring-green);
    background-clip: text;
    background-size: 200% 200%;

    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

@-webkit-keyframes Animation {
    0% {
        background-position: 10% 0%;
    }

    50% {
        background-position: 91% 100%;
    }

    100% {
        background-position: 10% 0%;
    }
}

@-moz-keyframes Animation {
    0% {
        background-position: 10% 0%;
    }

    50% {
        background-position: 91% 100%;
    }

    100% {
        background-position: 10% 0%;
    }
}

@keyframes Animation {
    0% {
        background-position: 10% 0%;
    }

    50% {
        background-position: 91% 100%;
    }

    100% {
        background-position: 10% 0%;
    }
}
</style>