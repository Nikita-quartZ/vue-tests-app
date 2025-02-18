<script setup>
import ModalWindow from './ModalWindow.vue'

const isOpen = defineModel()

</script>

<template>
  <ModalWindow v-model="isOpen">
    <div>

      <p>
        Авторизируйтесь
      </p>

      <button @click="isOpen = false">
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
