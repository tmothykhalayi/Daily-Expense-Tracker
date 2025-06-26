import { createFileRoute } from '@tanstack/react-router'
import Contacts from '@/components/Contacts'

export const Route = createFileRoute('/contacts')({
  component: Contacts,
})


