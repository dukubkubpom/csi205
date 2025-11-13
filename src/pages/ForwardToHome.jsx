import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const ForwardToHome = () => {

    const navigiate = useNavigate()
    useEffect( () => 
        navigiate('/home') , [])

    return (
        <>
            <h3>Forward to Home</h3>
        </>
    )
}

export default ForwardToHome