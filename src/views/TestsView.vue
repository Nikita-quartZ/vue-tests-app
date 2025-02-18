<script setup>
import { ref } from 'vue'
import ResultModal from '../components/ResultModal.vue'
import EmptyAnswersModal from '../components/EmptyAnswersModal.vue'

const props = defineProps({
  selectedUser: {
    required: true,
  }
})

const users = defineModel("users", {
  required: true,
})

const isOpenResult = ref(false)
const isOpenEmptyTest = ref(false)

const result = ref(0)

const tests = ref([
  {
    title: 'Вопрос 1',
    answer: '',
    value: '',
    type: 'text',
  },
  {
    title: 'Вопрос 2',
    answer: '',
    value: '',
    type: 'text',
  },
  {
    title: 'Вопрос 3',
    answer: '',
    value: '',
    type: 'text',
  },
  {
    title: 'Вопрос 4',
    answer: '',
    value: '',
    type: 'text',
  },
  {
    title: 'Вопрос 5',
    answer: '',
    value: '',
    type: 'text',
  },
  {
    title: 'Вопрос 6',
    answer: '',
    value: '',
    type: 'text',
  },
  {
    title: 'Вопрос 7',
    answer: '',
    value: '',
    type: 'text',
  },
  {
    title: 'Вопрос 8',
    answer: '',
    value: '',
    type: 'text',
  },
  {
    title: 'Вопрос 9',
    answer: '',
    value: '',
    type: 'text',
  },
  {
    title: 'Вопрос 10',
    answer: '',
    value: '',
    type: 'text',
  },
])

const checkTest = () => {
  if (tests.value.every((item) => !item.value)) isOpenEmptyTest.value = true
  else addResult()
}

const addResult = () => {
  isOpenEmptyTest.value = false

  result.value = tests.value.reduce((accumulator, currentValue) => {
    if (currentValue.value === currentValue.answer) return accumulator + 1
    return accumulator
  }, 0)

  users.value = users.value.map((item) => {
    if (item.id !== props.selectedUser.id) return item
    return {
      ...item,
      isTestPassed: true,
      answers: result.value
    }
  })
  isOpenResult.value = true

  tests.value = tests.value.map((item) => ({
    ...item,
    value: ''
  }))
}

</script>

<template>
  <main class="tests">
    <h2>
      Пройдите тест
    </h2>

    <div v-for="test in tests" :key="test.title">
      <p class="text__title">
        {{ test.title }}
      </p>
      <input class="text__input" :type="test.type" v-model="test.value">
    </div>

    <button @click="checkTest" class="text__btn">
      Проверить
    </button>

    <ResultModal v-model="isOpenResult" :result></ResultModal>
    <EmptyAnswersModal v-model="isOpenEmptyTest" @update="addResult"></EmptyAnswersModal>

  </main>
</template>

<style>
.tests {
  display: flex;
  flex-direction: column;
}

.text__title {
  margin: 0;
  margin-bottom: 5px;
}

.text__btn {
  width: 200px;
}

.text__input {
  width: 200px;
}
</style>
