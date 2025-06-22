<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores';

import BrandIcon from '@/components/icons/BrandIcon.vue'
import LogoutIcon from '@/components/icons/LogoutIcon.vue'

const auth = useAuthStore();
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg py-1 bg-primary" data-bs-theme="dark">
      <div class="container">
        <RouterLink class="navbar-brand" to="/">
          <BrandIcon />
          <span class="ms-2">Мониторинг ФЕРЗЛ</span>
        </RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="auth.isAuthenticated">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/" active-class="active">
                Поиск застрахованных
              </RouterLink>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
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
            <li class="nav-item" v-if="auth.isAuthenticated && auth.user">
              <span class="nav-link">{{ auth.user.name }}</span>
            </li>
            <li class="nav-item" v-if="auth.isAuthenticated">
              <a class="nav-link" aria-current="page" href="#" @click.prevent="auth.logout()">
                <span class="me-2">Выход</span>
                <LogoutIcon />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <RouterView />
</template>
