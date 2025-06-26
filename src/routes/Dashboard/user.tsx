import { createFileRoute } from '@tanstack/react-router'
import User from '@/components/Admin.tsx/User'


export const Route = createFileRoute('/Dashboard/user')({
  component: User,
})


