import {
  getCategoryById,
  getAllCategories,
  createCategory,
  patchCategory,
  deleteCategory,
} from '@/apis/categories'
import type { TCategory } from '@/Types/allTypes'
import type { UseMutationResult } from '@tanstack/react-query'
import {
  useQuery,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query'

// Get all categories
export const useCategoryState = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  })
}

// Get category by ID
export const useCategoryByIdState = (id: number) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => getCategoryById(id),
    enabled: !!id,
  })
}

// Create category
export const useCreateCategoryState = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['addCategory'],
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'], exact: true })
    },
  })
}

// Patch category
type PatchCategoryPayload = { id: number; category: Partial<TCategory> }
export const usePatchCategoryState = (): UseMutationResult<TCategory, Error, PatchCategoryPayload> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['patchCategory'],
    mutationFn: ({ id, category }: PatchCategoryPayload) => patchCategory(id, category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'], exact: true })
    },
  })
}

// Delete category
export const useDeleteCategoryState = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['deleteCategory'],
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'], exact: true })
    },
  })
}
