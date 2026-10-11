import { getLists } from '../api/lists'
import { useFetch } from './useFetch'

export const useLists = () => useFetch(getLists)
