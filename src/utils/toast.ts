import { useToast } from 'primevue/usetoast'

const toast = useToast()

export function error(location: string, message: string) {
  toast.add({
    severity: 'error',
    summary: location,
    detail: message,
    life: 3000,
  })
}

export function success(location: string, message: string) {
  toast.add({
    severity: 'success',
    summary: location,
    detail: message,
    life: 3000,
  })
}

export function warn(location: string, message: string) {
  toast.add({
    severity: 'warn',
    summary: location,
    detail: message,
    life: 3000,
  })
}

export function info(location: string, message: string) {
  toast.add({
    severity: 'info',
    summary: location,
    detail: message,
    life: 3000,
  })
}
