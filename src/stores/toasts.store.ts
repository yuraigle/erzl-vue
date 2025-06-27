import { ref } from 'vue';
import { defineStore } from 'pinia';

interface ToastMessage {
  id: number
  message: string
  type: 'success' | 'danger' | 'info'
}

export const useToastsStore = defineStore('toasts', () => {
  const messages = ref<ToastMessage[]>([]);
  const nextId = ref(0);

  const showError = (msg: string) => {
    showMessage(msg, 'danger');
  }

  const showMessage = (msg: string, t: 'success' | 'danger' | 'info') => {
    const a = { id: nextId.value++, message: msg, type: t } as ToastMessage;
    messages.value.push(a);

    setTimeout(() => {
      messages.value.forEach((m) => {
        if (m.id === a.id) {
          messages.value.splice(messages.value.indexOf(m), 1);
        }
      });
    }, 3000);
  }

  return {
    messages,
    showError,
    showMessage,
  };
});
