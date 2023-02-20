import { NextPage } from "next";
import Link from "next/link";
import styles from "./styles.module.scss"
import Head from 'next/head'
import { FormEventHandler, useState } from "react";
import { signIn } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { useSession } from "next-auth/react";



const Login:NextPage = () => {
    const {status,data} = useSession()

    const [UserData, setUserData]  = useState  ({Email:"", Password:""})
    const HandleSubmit:FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        try {
            const res = await signIn('credentials', {
                Email: UserData.Email,
                Password: UserData.Password,
                redirect: false
            })
            if (res?.error) {
                toast.error(res.error, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
            if (res?.ok == true) {
                toast.success('Logado com sucesso, bem-vindo '  + data?.user?.name, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
        }catch{

        }



    }

    return(
    <div className={styles.loginpage}>
        <>
            <Head>
                <title>Login</title>
            </Head>
        </>
        <>
        <ToastContainer/>
        </>
        <div className={styles.form}>
            <h1>Fazer Login</h1>
            <form onSubmit={HandleSubmit} className={styles.registerform}>
            <input type="email"
            placeholder="Email"
            onChange={({target}) => setUserData({... UserData, Email: target.value})}
            />
            <input type="password"
            placeholder="Senha"
            onChange={({target}) => setUserData({... UserData, Password: target.value})}
            />
            <button>Logar</button>
            </form>
            <button>Fazer login com conta Google</button>
            <p className="message">Não está cadastrado:? <Link href="register">Fazer Registro</Link></p>
        </div>
    </div>
    )
}

export default Login