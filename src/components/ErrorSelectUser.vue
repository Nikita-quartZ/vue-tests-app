<script setup>
import ModalWindow from './ModalWindow.vue'

const isOpen = defineModel()

const emit = defineEmits(['update'])

const update = () => {
  isOpen.value = false
  emit('update')
}
</script>

<template>
  <ModalWindow v-model="isOpen">
    <div>

      <p>
        Вы не можете проходить тест без выбранного пользователя
      </p>

      <button @click="update">
        Понял
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
