import { createFileRoute } from '@tanstack/react-router'
import Categories from '@/components/Admin.tsx/Categories'

export const Route = createFileRoute('/Dashboard/categories')({
  component: Categories,
})


