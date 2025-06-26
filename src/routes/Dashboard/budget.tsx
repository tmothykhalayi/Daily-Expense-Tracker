import { createFileRoute } from '@tanstack/react-router'
import Budget from '@/components/Admin.tsx/Budget'

export const Route = createFileRoute('/Dashboard/budget')({
  component: Budget,
})
