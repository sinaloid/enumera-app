import { useHistory } from "react-router"


const useNavigate = () => {
    const history = useHistory()

    const navigate = (e:any, path: any, type="push") => {
        e?.preventDefault()
        if(type === "push"){
            history.push('/'+path)
        }

        if(type === "replace"){
            history.replace('/'+path)
        }
    }

    return {
        navigate
    }
}

export default useNavigate