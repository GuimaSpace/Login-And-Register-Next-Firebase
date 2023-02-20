import { FirebaseUserValidate } from '@/DBVerifications/Index';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function createUser(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).send({ Error: 'Only POST requests allowed' });
        return;
    }

    const UserData = req.body; 
    const trustedUserData = await FirebaseUserValidate(UserData)
    .then((sucess) => {
        res.status(200).json({mensagem:sucess})
    })
    .catch((error) => {
        res.status(405).json({mensagem: error})
    })


}