<script setup>
import { ref, computed } from 'vue'
import ModalWindow from './ModalWindow.vue'

const isOpen = defineModel()

const users = defineModel('users')
const selectedUser = defineModel('selectedUser')

const form = ref({
  name: '',
  gender: '',
  age: null,
  isTestPassed: false,
  answers: [],
})

const number = ref(1)

const valid = ref(false)

const validateUserForm = computed(() => {
  const cyrillicPattern = /^\p{Script=Cyrillic}+$/u;

  const name = cyrillicPattern.test(form.value.name) && form.value.name === form.value.name.charAt(0).toUpperCase() + form.value.name.slice(1)

  const age = Number(form.value.age) >= 18 && Number(form.value.age) <= 99
  return {
    name,
    gender: form.value.gender,
    age
  }
})

const createUser = () => {
  valid.value = true

  if (Object.values(validateUserForm.value).every((item) => !!item)) {
    const result = {
      ...form.value,
      id: number.value,
    }

    selectedUser.value = result
    users.value.push(result)

    form.value = {
      name: '',
      gender: '',
      age: null,
      isTestPassed: false
    }

    isOpen.value = false
    number.value += 1
    valid.value = false
  }

}


</script>

<template>
  <ModalWindow v-model="isOpen">
    <div class="modal">
      <h2>
        Создание Пользователя
      </h2>

      <input v-model="form.name" type="name" placeholder="Имя">
      <p v-if="!validateUserForm.name && valid" class="error-message">
        Введите имя одним словом с заглавной буквы
      </p>

      <p>
        Пол
      </p>

      <div class="modal__gender">
        <div>
          <input v-model="form.gender" type="radio" id="male" name="Мужской" value="Мужской" />
          <label for="male">Мужской</label>
        </div>
        <div>
          <input v-model="form.gender" type="radio" id="female" name="Женский" value="Женский" />
          <label for="female">Женский</label>
        </div>
        <div>
          <input v-model="form.gender" type="radio" id="middle" name="Средний" value="Средний" />
          <label for="middle">Средний</label>
        </div>
        <p v-if="!validateUserForm.gender && valid" class="error-message">
          Вы кто?
        </p>
      </div>

      <div class="modal__age">
        <input v-model.number="form.age" type="number" placeholder="Возраст">
        <p v-if="!validateUserForm.age && valid" class="error-message">
          Выберите адекватный возраст
        </p>
      </div>

      <button @click="createUser">
        Создать пользователя
      </button>
    </div>
  </ModalWindow>
</template>

<style scoped>
h2 {
  margin: 0;
  margin-bottom: 20px;
}

.error-message {
  font-size: 12px;
  margin: 0;
  color: red;
}

.modal__gender {
  margin-bottom: 20px;
}

.modal__age {
  margin-bottom: 20px;
}

.modal {
  display: flex;
  flex-direction: column;
}
</style>
