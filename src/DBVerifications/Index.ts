/** 
v0.1  16/3/22
DB Verification promises coded by Github.com/GuimaSpace
**/
/*  Import do Firebase */
import { db, addDoc, getDocs, getDoc, updateDoc, doc, collection, query, orderBy, where, deleteDoc } from '../services/firebaseClient';
import { UserInterface } from "../interfaces/Index";
import bcrypt from "bcrypt";


export const FirebaseUserValidate = (userData: { Email: any; Password: any; }) => new Promise(async (resolve, reject) => {
    // Verifica campos vazios
    if (!userData.Email || !userData.Password) {
        reject("Nenhum campo deve estar vazio!");
        return;
    }

    // Verifica a autenticidade do email fornecido pelo usuário
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(userData.Email)) {
        reject("Email inválido");
        return;
    }

    try {
        const q = query(collection(db, 'users'), where('Email', '==', userData.Email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const userDataFromDb = querySnapshot.docs[0].data() as UserInterface;
            const passwordMatch = await bcrypt.compare(userData.Password, userDataFromDb.Password);
            if (passwordMatch) {
                // Retorna o objeto com o ID do documento
                resolve({ ...userDataFromDb, id: querySnapshot.docs[0].id });
                return;
            }
        }
        reject("Email ou senha inválidos");
        return;
    } catch (error) {
        reject('Erro ao procurar usuário: ' + error);
        return;
    }
});



export const validateCadForm = (UserData:UserInterface, PassEncrypt:Boolean) => new Promise((resolve, reject) => {
    // Verifica campos vazios
    if (!UserData.Name || !UserData.Email || !UserData.Password) {
        reject("Nenhum campo deve estar vazio!");
        return;
    }
    // Verifica caracteres especiais
    const specialCharRegex = /[^\w\s]/;
    if (specialCharRegex.test(UserData.Name)) {
        reject("Caracteres especiais em nome não permitidos! " + specialCharRegex);
        return;
    }
    //Verifica o tamanho da senha
    if (UserData.Password.length < 6) {
        reject("A senha precisa conter no mínimo 6 caracteres")
        return;
    }
    //Verifica o nome
    if (UserData.Name.length < 3) {
        reject("O nome precisa conter mais que 3 letras")
        return;
    }

    //Verifica a autenticidade do email fornecido pelo usuario
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(UserData.Email)) {
        reject("Email invalido")
        return;
    }

    // Se passou por todas as verificações, por fim verifique se o servidor vai querer encryptar a senha e retornar o Json final
    if (PassEncrypt == true) {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(UserData.Password, salt, (err, hash) => {
                    UserData.Password = hash
                    resolve(UserData)
                });
    });
    }else if (PassEncrypt == false) {
        resolve(UserData)
    }
});

export const SearchEmail = async (TrustedUserData: UserInterface) => {
    const q = query(collection(db, 'users'), where('Email', '==', TrustedUserData.Email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
    return true;
    }
    return false;
};

