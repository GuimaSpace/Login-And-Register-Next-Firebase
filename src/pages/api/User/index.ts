/*  Import do Firebase */
import { db, addDoc, collection } from '../../../services/firebaseClient';
import type { NextApiRequest, NextApiResponse } from 'next';
import { SearchEmail, validateCadForm } from '../../../DBVerifications/Index';
import { UserInterface } from '@/interfaces/Index';

export default async function createUser(req: NextApiRequest, res: NextApiResponse) {
if (req.method !== 'POST') {
    res.status(405).send({ Error: 'Only POST requests allowed' });
    return;
}

try {
    const userData = req.body; //Guarda os dados originais fornecido pelo formulario de cadastro
    
    const trustedUserData = await validateCadForm(userData, true) as UserInterface; //Envia a filtragem de dados, as interface informa os valores pré definido de retorno.

    //Verifica se o email existe
    if (await SearchEmail(trustedUserData)) {
    res.status(405).json({ Error: "Email já existe" });
    return;
    }

    await addDoc(collection(db, "users"), trustedUserData);
    res.status(200).json({ "Mensagem": "Cadastrado com sucesso" });
    } 

    catch (error) {
        res.status(405).json({ Error: "" + error});
    }
}
