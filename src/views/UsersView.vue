<script setup lang="ts">
import type { User, UserRequestDto } from '@/types'

import { ref, onMounted } from 'vue'
import { useUsersStore, useToastsStore } from '@/stores'

import { Modal } from 'bootstrap'
import NewUserFormModal from '@/components/users/NewUserFormModal.vue'
import EditUserFormModal from '@/components/users/EditUserFormModal.vue'
import DeleteUserModal from '@/components/users/DeleteUserModal.vue'

import PlusIcon from '@/components/icons/PlusIcon.vue'
import EditIcon from '@/components/icons/EditIcon.vue'
import RemoveIcon from '@/components/icons/RemoveIcon.vue'

const usersStore = useUsersStore()
const selectedId = ref(0)
const selectedUser = ref<UserRequestDto>()
const usersList = ref<User[]>([])

const rolesDict = new Map<number, string>()
rolesDict.set(3, 'Читатель')
rolesDict.set(4, 'Редактор')
rolesDict.set(9, 'Администратор')

const roleName = (n: number): string => {
  return rolesDict.get(n) || ''
}

onMounted(() => {
  usersStore.getList()
    .then((items: User[]) => usersList.value = items)
    .catch((err: string) => useToastsStore().showError(err))
})

const addUserModal = () => {
  Modal.getOrCreateInstance(document.getElementById('modalUserCreate')).show()
}

const updateUserModal = (id: number, u: UserRequestDto) => {
  selectedId.value = id
  selectedUser.value = u
  Modal.getOrCreateInstance(document.getElementById('modalUserEdit')).show()
}

const deleteUserModal = (id: number) => {
  selectedId.value = id
  Modal.getOrCreateInstance(document.getElementById('modalUserDelete')).show()
}
</script>

<template>
  <div class="container-fluid">
    <h5 class="my-4">Список пользователей</h5>
    <div>
      <button class="btn btn-outline-primary" @click="addUserModal">
        <PlusIcon :size="20" />
        Добавить
      </button>
    </div>

    <!-- <div v-if="usersStore.isLoading">Загрузка...</div> -->
    <table class="table my-4 table-sm table-hover" style="max-width: 900px">
      <thead>
        <tr>
          <th>ID</th>
          <th>Логин</th>
          <th>Роль</th>
          <th>Имя</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in usersList" :key="u.id">
          <td>{{ u.id }}</td>
          <td>{{ u.username }}</td>
          <td>{{ u.role }}. {{ roleName(u.role) }}</td>
          <td>{{ u.name }}</td>
          <td class="text-end">
            <button
              class="btn btn-sm py-0 px-1 btn-link text-info"
              title="Редактировать"
              @click="() => updateUserModal(u.id, u)"
            >
              <EditIcon />
            </button>
            <button
              class="btn btn-sm py-0 px-1 btn-link text-danger"
              title="Удалить"
              :disabled="u.username === 'admin'"
              @click="() => deleteUserModal(u.id)"
            >
              <RemoveIcon />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <NewUserFormModal />
  <EditUserFormModal :id="selectedId" :user="selectedUser" />
  <DeleteUserModal :id="selectedId" />
</template>
