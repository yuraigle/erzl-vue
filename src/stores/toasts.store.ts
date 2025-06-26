import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useToastsStore = defineStore('toasts', () => {
  const message = ref<string | null>(null);
  const type = ref<'success' | 'danger' | 'info'>('info');

  const showError = (msg: string) => {
    showMessage(msg, 'danger');
  }

  const showMessage = (msg: string, t: 'success' | 'danger' | 'info') => {
    message.value = msg;
    type.value = t;

    setTimeout(() => {
      message.value = null;
    }, 3000);
  }

  return {
    message,
    type,
    showError,
    showMessage,
  };
});
