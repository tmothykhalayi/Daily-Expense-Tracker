import { createFileRoute } from '@tanstack/react-router'
import Reports from '@/components/Admin.tsx/Reports'

export const Route = createFileRoute('/Dashboard/reports')({
  component: Reports,
})
