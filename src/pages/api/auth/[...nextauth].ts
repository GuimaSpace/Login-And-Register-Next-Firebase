import { FirebaseUserValidate } from "@/DBVerifications/Index";
import { UserInterface } from "@/interfaces/Index";
import NextAuth , {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { db, addDoc, collection } from '../../../services/firebaseClient';


const authOptions: NextAuthOptions = {
    session:{
        strategy: 'jwt'
    },
    providers:[
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            authorize: async (credentials, req) => {
                const {Email, Password} = credentials as {
                    Email: string;
                    Password: string;
                }
                //Logica do login
                //Fing user por db
                try {
                    const userDataFromDb = await FirebaseUserValidate({ Email, Password }) as UserInterface;
                    return {id: userDataFromDb.id, name: userDataFromDb.Name, email: userDataFromDb.Email};
                } catch (err) {
                    throw new Error(`${JSON.stringify(err)}`);

                }
            }
        })
    ],
    pages:{
        signIn: "/AuthPages/login"
    },
}

export default NextAuth(authOptions)