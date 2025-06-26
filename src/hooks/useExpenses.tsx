import {
  getExpenseById,
  getAllExpenses,
  createExpense,
  patchExpense,
  deleteExpense,
} from '@/apis/expenses'
import type { TExpense } from '@/Types/allTypes'
import type { UseMutationResult } from '@tanstack/react-query'
import {
  useQuery,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query'

// Get all expenses
export const useExpenseState = () => {
  return useQuery({
    queryKey: ['expenses'],
    queryFn: getAllExpenses,
  })
}

// Get expense by ID
export const useExpenseByIdState = (id: number) => {
  return useQuery({
    queryKey: ['expense', id],
    queryFn: () => getExpenseById(id),
    enabled: !!id,
  })
}

// Create expense
export const useCreateExpenseState = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['addExpense'],
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'], exact: true })
    },
  })
}

// Patch expense
type PatchExpensePayload = { id: number; expense: TExpense }
export const usePatchExpenseState = (): UseMutationResult<TExpense, Error, PatchExpensePayload> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['patchExpense'],
    mutationFn: ({ id, expense }: PatchExpensePayload) => patchExpense(id, expense),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'], exact: true })
    },
  })
}

// Delete expense(s)
export const useDeleteExpenseState = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['deleteExpense'],
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'], exact: true }) // invalidate list
    },
  })
}
