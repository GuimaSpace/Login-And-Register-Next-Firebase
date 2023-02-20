import { NextPage } from "next";
import Link from "next/link";
import styles from "./styles.module.scss"
import Head from 'next/head'
import { FormEventHandler, useState } from "react";
import { UserInterface } from "@/interfaces/Index";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { signIn } from "next-auth/react"
import "react-toastify/dist/ReactToastify.css"


const Login:NextPage = (props) => {
    const [UserData, setUserData]  = useState  ({Name: "", Email:"", Password:"", ImgProfile:"Default.jpg"})

    const HandleSubmit:FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        const options = {
            method: 'POST',
            url: '/api/User',
            headers: {
                'content-type': 'application/json',
            },
            data: 
                {
                    "Name": UserData.Name,
                    "Email":  UserData.Email,
                    "Password": UserData.Password,
                    "ImgProfile": UserData.ImgProfile,
                },
        };

    

    const id = toast.loading("Verificando...")
        await axios
        .request(options)
        .then(res => { 
        toast.update(id, {render: "Você foi cadastrado com sucesso\nFaça login para continuar",
        type: "success",
        isLoading: false,
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
        }).catch(err => {
        toast.update(id, {render: err.response.data.Error, type: "error",
        isLoading: false,
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    });
    }

    
    return(

    <div className={styles.loginpage}>
        <>
            <Head>
                <title>Registro</title>
            <script src="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>
            <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css"/>
            <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/default.min.css"/>
            <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/semantic.min.css"/>
            <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/bootstrap.min.css"/>
            </Head>
        </>
        <>
        <ToastContainer/>
        </>
        <div className={styles.form}>
            <h1>Cadastro</h1>
            <form onSubmit={HandleSubmit} className="login-form">

            <input
            type="text"
            placeholder="Seu Nome"
            value={UserData.Name}

            onChange={({target}) => setUserData({... UserData, Name: target.value})}
            />

            <input
            type="text"
            placeholder="Email"
            value={UserData.Email}

            onChange={({target}) => setUserData({... UserData, Email: target.value})}

            />

            <input type="password"
            placeholder="Senha"
            value={UserData.Password}
            onChange={({target}) => setUserData({... UserData, Password: target.value})}
            />

            <button>Registrar</button>

            <p className="message">Já está cadastrado? <a onClick={() => {signIn()}}>Fazer Login</a></p>

            </form>


        </div>
    </div>
    )
}

export default Login