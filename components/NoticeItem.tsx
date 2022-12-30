import { useEffect, useState, FC } from "react"
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid"
import useStore from "../store"
import { useMutateTask } from "../hooks/useMutateTask"
import { Notice } from "../types/types"
import { useMutateNotice } from "../hooks/useMutateNotice"
import { supabase } from "../utils/supabase"

export const NoticeItem: FC<Omit<Notice, "created_at">> = ({ id, content, user_id}) => {
  const [ userId, setUserId] = useState<string | undefined>("")
  const update = useStore((state) => state.updateEditedNotice)
  const { deleteNoticeMutation } = useMutateNotice()
  useEffect(() => {
    supabase.auth.getUser().then((res) => {
      setUserId(res.data.user?.id)
    })
    .catch((err) => {
      console.error(err)
    })
  }, [])

  console.log(userId, user_id)
  return <li className="my-3 text-lg font-extrabold">
    <span>{content}</span>
    {userId === user_id && (
        <div className="float-right ml-20 flex">
        <PencilAltIcon className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
        onClick={() => {
          update({id, content})
        }}/>
        <TrashIcon className="h-5 w-5 cursor-pointer text-blue-500"
        onClick={() => deleteNoticeMutation.mutate(id)} />
      </div>
    )}
  </li>
}
