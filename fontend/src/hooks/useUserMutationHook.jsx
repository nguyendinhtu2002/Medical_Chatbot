import { useMutation } from "react-query";

export const useUserMutationHook = (fnCallBack) => {
    const mutation = useMutation({
        mutationFn: fnCallBack
    })
    return mutation
}
