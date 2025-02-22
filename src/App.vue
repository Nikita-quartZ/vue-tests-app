<script setup>
import { ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import CreateModal from './components/CreateModal.vue'
import ErrorTestModal from './components/ErrorTestModal.vue'
import ErrorSelectUser from './components/ErrorSelectUser.vue'

const route = useRoute();
const router = useRouter();

const users = ref([])

const selectedUser = ref(null)

const isOpen = ref(false)
const isOpenErrorTest = ref(false)
const isOpenErrorSelect = ref(false)

const openTestPage = () => {
  if (selectedUser.value) {
    router.push({ name: 'tests' })
  } else {
    isOpenErrorTest.value = true
  }
}

watch(selectedUser, () => {
  if (!selectedUser.value && route.name === 'tests') {
    router.push({ name: 'users' })
    isOpenErrorSelect.value = true
  }
})
</script>

<template>
  <div class="wrapper">
    <header>
      <nav>
        <button @click="isOpen = true" class="link" :class="{ 'link-active': isOpen }">
          Зарегистрировать пользователя
        </button>
        <CreateModal v-model="isOpen" v-model:users="users" v-model:selectedUser="selectedUser"></CreateModal>

        <RouterLink class="link" to="/" :class="{ 'link-active': route.name === 'users' && !isOpen }">
          Вывод пользователя
        </RouterLink>

        <button @click="openTestPage" class="link" :class="{ 'link-active': route.name === 'tests' && !isOpen }">
          Пройти тест
        </button>
        <ErrorTestModal v-model="isOpenErrorTest"></ErrorTestModal>
        <ErrorSelectUser v-model="isOpenErrorSelect" @update="() => isOpen = true"></ErrorSelectUser>
      </nav>

      <select v-model="selectedUser" name="users" class="users">
        <option v-for="user in users" :value="user" :key="user.id">
          {{ user.name }}
        </option>
        <option v-if="users.length" :value="null">Пользователь не выбран</option>
        <option v-if="!users.length" :value="null">Нет Пользователя</option>
      </select>
    </header>

    <RouterView v-model:users="users" v-model:selectedUser="selectedUser" />
  </div>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.link {
  margin-right: 30px;
  text-decoration: none;
  color: black;
  transition: color .15s linear;
  background: none;
  border: none;
  cursor: pointer;
}

.link:hover {
  color: rgb(2, 2, 130);
}

.users {
  margin-left: auto;
  min-width: 150px;
}

.wrapper {
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 20px;
}

.link-active {
  border: 1px solid black;
}
</style>
