<script setup>
import ModalWindow from './ModalWindow.vue'

const isOpen = defineModel()

const emit = defineEmits(['update'])

</script>

<template>
  <ModalWindow v-model="isOpen">
    <div>

      <p>
        Вы не заполнили ответ ни на один вопрос. Хотите продолжить отправку?
      </p>

      <div class="buttons">
        <button @click="emit('update')">
          Да
        </button>
        <button @click="isOpen = false">
          Нет
        </button>
      </div>
    </div>
  </ModalWindow>
</template>

<style scoped>
.buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}
</style>
