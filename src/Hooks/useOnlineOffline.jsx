import { useEffect, useState } from "react"

// Custom Hooks 
const useOnlineOffline = () => {
    const [state, setState] = useState(navigator.onLine);

    useEffect(() => {
        addEventListener("Online", () => {
            setState(true) 
        })

        addEventListener("Offline", () => {
            setState(false) 
        })
    }, []) 

    return state
} 

export default useOnlineOffline 