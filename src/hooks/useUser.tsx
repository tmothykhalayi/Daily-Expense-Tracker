import { getAllUsers, getUserById, createUser, patchUser, deleteUser } from "@/apis/users";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import type { TUser } from "@/Types/allTypes";

//get all user hooks
export const useUserState = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: getAllUsers
    })
}

//get user id hook
export const UseGetUserByIdState = (id: number) =>{
    return useQuery({
        queryKey: ['user', id],
        queryFn:() => getUserById(id),
        enabled: !!id
    })
}

// create user hook
export const useCreateUserState = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['addUser'],
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'], exact: true })
    },
  })
}

//patch user hook
export const usePatchUserState = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['patchUser'],
    mutationFn: ({ id, user }: { id: number; user: TUser }) => patchUser(id, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'], exact: true })
    },
  })
}

//delete user hook
export const useDeleteUserState = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['deleteUser'],
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'], exact: true })
    },
  })
}
