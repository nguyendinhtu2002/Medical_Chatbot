import {useMutation} from "react-query";

export const userMutationHook = (fnCallBack) => {
    const mutation = useMutation({
        mutationFn: fnCallBack
    })
    return mutation
}