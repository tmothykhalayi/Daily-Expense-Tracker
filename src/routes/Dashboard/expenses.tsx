import { createFileRoute } from '@tanstack/react-router'
import Expenses from '@/components/Admin.tsx/Expenses'

export const Route = createFileRoute('/Dashboard/expenses')({
  component: Expenses,
})
