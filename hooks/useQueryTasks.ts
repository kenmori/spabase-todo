import { useQuery } from "react-query";
import { supabase } from "../utils/supabase";
import { Task } from '../types/types'

export const useQueryTasks = () => {
  const getTasks =async () => {
    const { data, error } = await supabase.from("todos").select("*").order("created_at", { ascending: true })
    if(error){
      throw new Error(error.message)
    }
    return data
  }
  return useQuery<Task[], Error>({
    queryKey: ["todos"],
    queryFn: getTasks,
    staleTime: Infinity // supabaseから取ってきたdataをどのくらいの期間最新のものとみなすか。Infinityは常に新しいとみなし、新しいfetchを行わないようにする。ページに訪れた時にfetchするだけでいいならInfinity。immにするとfetchした後再度ページに戻ってきた時にfetchされる。swrではできない設定
  })
}