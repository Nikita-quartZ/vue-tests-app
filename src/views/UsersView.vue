<script setup>

const users = defineModel("users", {
  required: true,
})

defineProps({
  selectedUser: {
    required: true,
  }
})

const deleteUser = (id) => {
  users.value = users.value.filter((item) => item.id !== id)
}
</script>

<template>
  <main>
    <div :class="{ 'card-active': selectedUser?.id === user?.id }" class="card" v-for="user in users" :key="user.id">
      <div class="card__header">
        <div>
          <h4>{{ user.id }}: {{ user.name }}</h4>
        </div>
        <button @click="deleteUser(user.id)">
          Удалить
        </button>
      </div>
      <div class="card__info">
        <p>
          {{ user.gender }}
        </p>
        <p>
          {{ user.age }}
        </p>
      </div>
      <div class="card__status">
        {{ user.isTestPassed ? 'Тест пройден' : 'Тест не проходился' }}
        <p v-if="user.isTestPassed">
          {{ Math.round(user.answers.reduce((a, b) => a + b, 0) / user.answers.length * 100) / 100 }}
        </p>
      </div>
    </div>
  </main>
</template>

<style>
h4 {
  margin: 0;
  font-size: 20px;
}

main {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}

.card {
  position: relative;
  border-radius: 10px;
  padding: 15px;
  aspect-ratio: 1 / 1;
  border: 1px solid black;
}

.card-active {
  box-shadow: 0px 0px 10px rgb(43, 43, 43);
}

.card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
}

.card__info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card__status {
  position: absolute;
  bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 30px);
}
</style>
