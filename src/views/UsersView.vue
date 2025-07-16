<script setup lang="ts">
import type UserRequestDto from '@/types/UserRequestDto';

import { ref, onMounted } from 'vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'
import EditIcon from '@/components/icons/EditIcon.vue'
import RemoveIcon from '@/components/icons/RemoveIcon.vue'
import { useUsersStore } from '@/stores'
import NewUserFormModal from '@/components/users/NewUserFormModal.vue'

import { Modal } from 'bootstrap'
import DeleteUserModal from '@/components/users/DeleteUserModal.vue'
import EditUserFormModal from '@/components/users/EditUserFormModal.vue'

const usersStore = useUsersStore()

const selectedId = ref(0);
const selectedUser = ref<UserRequestDto>()

const rolesDict = new Map<number, string>()
rolesDict.set(3, 'Читатель')
rolesDict.set(4, 'Редактор')
rolesDict.set(9, 'Администратор')

const roleName = (n: number): string => {
  return rolesDict.get(n) || ''
}

onMounted(() => {
  usersStore.getList()
})

const addUserModal = () => {
  const modalElement = document.getElementById('modalUserCreate')
  const modal = Modal.getOrCreateInstance(modalElement)
  modal.show()
}

const updateUserModal = (id: number, u: UserRequestDto) => {
  selectedId.value = id;
  selectedUser.value = u;

  const modalElement = document.getElementById('modalUserEdit')
  const modal = Modal.getOrCreateInstance(modalElement)
  modal.show()
}

const deleteUserModal = (id: number) => {
  selectedId.value = id;

  const modalElement = document.getElementById('modalUserDelete')
  const modal = Modal.getOrCreateInstance(modalElement)
  modal.show()
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
        <tr v-for="u in usersStore.userList" :key="u.id">
          <td>{{ u.id }}</td>
          <td>{{ u.username }}</td>
          <td>{{ u.role }}. {{ roleName(u.role) }}</td>
          <td>{{ u.name }}</td>
          <td class="text-end">
            <button class="btn btn-sm py-0 px-1 btn-link text-info" title="Редактировать"
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
