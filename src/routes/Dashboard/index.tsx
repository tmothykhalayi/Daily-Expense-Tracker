import { createFileRoute } from '@tanstack/react-router'
import AdminLandingPage from '@/components/Admin.tsx/AdminLandingPage'


export const Route = createFileRoute('/Dashboard/')({
  component: AdminLandingPage,
})


