<script setup lang="ts">
import { useUsersStore, useToastsStore } from '@/stores'

const props = defineProps({
  id: Number,
})

const usersStore = useUsersStore()

const onSubmit = async () => {
  usersStore
    .deleteUser(props.id || 0)
    .then(() => window.location.reload())
    .catch((err: string) => useToastsStore().showError(err))
}
</script>

<template>
  <div class="modal fade" id="modalUserDelete">
    <div class="modal-dialog modal-dialog-scrollable">
      <form class="modal-content" @submit.prevent="onSubmit">
        <div class="modal-header">
          <h5 class="modal-title">Удаление пользователя</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          Вы уверены?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
          <button type="submit" class="btn btn-danger" :disabled="usersStore.isLoading">Удалить</button>
        </div>
      </form>
    </div>
  </div>
</template>
