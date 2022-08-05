import { useLocation } from "react-router-dom"

export const useUrlHash = () => {
    const location = useLocation()
    const params = new URLSearchParams(location.hash.replace("#", ""))
    return Object.fromEntries(params)
}