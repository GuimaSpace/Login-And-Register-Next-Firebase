import { NextPage } from "next";
import { signIn } from "next-auth/react"
import Link from "next/link";
import styles from '../styles/index.module.scss'

const Home:NextPage = () => {
    return(
        <div>
            <div className="flex justify-center items-center h-screen ">

            <Link href="/AuthPages/register" passHref>
                <button className={styles.buttonlogin}>
                    Fazer Cadastro
                </button>
            </Link>
                <button className={styles.buttonlogin} onClick={() => {
                    signIn()
                }}>
                Fazer login com Email
                </button>
            </div>  
        </div>
    )
}

export default Home