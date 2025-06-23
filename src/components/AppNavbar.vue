<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores'

import BrandIcon from '@/components/icons/BrandIcon.vue'
import UserIcon from '@/components/icons/UserIcon.vue'
import UserScanIcon from '@/components/icons/UserScanIcon.vue'
import LogoutIcon from '@/components/icons/LogoutIcon.vue'

const auth = useAuthStore()
</script>

<template>
  <header v-if="auth.isAuthenticated" class="border-bottom bg-body-tertiary">
    <nav class="navbar navbar-expand-lg py-1">
      <div class="container-fluid">
        <RouterLink class="navbar-brand" to="/">
          <BrandIcon />
          <span class="ms-2">Мониторинг ФЕРЗЛ</span>
        </RouterLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/" active-class="active">
                Поиск застрахованных
              </RouterLink>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Данные витрин
              </a>
              <ul class="dropdown-menu">
                <li>
                  <RouterLink class="dropdown-item" to="vdi">Застрахованные лица</RouterLink>
                </li>
                <li>
                  <RouterLink class="dropdown-item" to="vda">Прикрепление к МО</RouterLink>
                </li>
              </ul>
            </li>
          </ul>
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <UserScanIcon />
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <span class="dropdown-item" role="button">
                    <UserIcon />
                    <span class="ms-2" v-if="auth.user">{{ auth.user.name }}</span>
                  </span>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li>
                  <button class="dropdown-item" @click.prevent="auth.logout()">
                    <LogoutIcon />
                    <span class="ms-2">Выход</span>
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
