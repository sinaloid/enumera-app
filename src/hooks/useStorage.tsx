

const useStorage  = () => {
    const KEY_USER = `"[i-Y<'zY9I<}d*gG_,/5OH;+C7}t)N<v)4+PS$}*VZMj"tOvs2ZU%=wc"}&aasbkbsa"`
    const KEY_PROD = `"[+C7}t)N<v)4+PS$}*VZMj"tOvs2ZU%=wc"}&ai-Y<'zY9I<}d*gG_,/5OH;"`
    
    /*****User */
    
    const setUser = (user: any) =>{
        localStorage.setItem(KEY_USER,JSON.stringify(user));
    }
    
    const getUser = () => {
        const user : any = localStorage.getItem(KEY_USER)
        return JSON.parse(user)
    }
    
    const deleteUser = () => {
        localStorage.removeItem(KEY_USER)
    }

    return {
        setUser,
        getUser,
        deleteUser
    }
}

export default useStorage