<script setup>
import { ref } from "vue";
import { createUser, getUsers, updateUser, deleteUser } from "../firebase/userService.js";

const emit = defineEmits(["login", "close"]);

const users = ref([]);
const editingId = ref(null);
const username = ref("");
const password = ref("");

async function load() {
    users.value = await getUsers();
}

async function add() {
    await createUser({ name: username.value });
    username.value = "";
    load();
}

async function edit(user) {
    editingId.value = user.id;
    username.value = user.name;
}

async function saveEdit() {
    await updateUser(editingId.value, { name: username.value });
    editingId.value = null;
    name.value = "";
    load();
}

async function remove(id) {
    await deleteUser(id);
    load();
}

onMounted(load);
</script>

<template>
    <!-- <div>
        <input v-model="name" placeholder="Nome" />

        <button v-if="!editingId" @click="add">Adicionar</button>
        <button v-else @click="saveEdit">Salvar</button>

        <ul>
            <li v-for="u in users" :key="u.id">
                {{ u.name }}
                <button @click="edit(u)">Editar</button>
                <button @click="remove(u.id)">Deletar</button>
            </li>
        </ul>
    </div> -->
    <div>
        <div>
            <h2>Login</h2>

            <input v-model="username" placeholder="Usuário" />
            
            <input v-model="password" type="password" placeholder="Senha" />

            <button @click="emit('login', { username, password })">
                Entrar
            </button>

            <button @click="emit('close')">
                Cancelar
            </button>
        </div>
    </div>
</template>

<!-- <style scoped>
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
    /* background: linear-gradient(-320deg, var(--light-grayish-lime-green), var(--submarine), var(--spring-green)); */
    background: var(--spring-green);
    background-clip: text;
    background-size: 200% 200%;

    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    /* -webkit-animation: Animation 5s ease infinite;
    -moz-animation: Animation 5s ease infinite;
    animation: Animation 5s ease infinite; */
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
</style> -->