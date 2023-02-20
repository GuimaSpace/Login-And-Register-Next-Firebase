import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { Router } from "next/router";
import { useEffect } from "react";


const Protected:NextPage = () => {
    const {status,data} = useSession()

    useEffect(() => {
        if (status === "unauthenticated")  {
            console.log("Não autenticado")
        }
    }, [status])

    if (status === "authenticated") 
    return(
        <div>
            <h1>Logado: {JSON.stringify(data.user, null, 2)}</h1>
        </div>
    )

    return <div>loading or no unauthenticated</div>

}

export default Protected