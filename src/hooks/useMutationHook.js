import { useMutation } from "@tanstack/react-query"

export const useMutationHooks = (fnCallback) => {
        // gọi qua bên api
const mutation = useMutation({
    mutationFn: fnCallback
  })
  return mutation
}