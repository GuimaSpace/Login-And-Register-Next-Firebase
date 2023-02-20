// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'


export default function handler(req: NextApiRequest,res: NextApiResponse) {
    res.status(202).json(
      {"News":[
      {"id": 0,
      "titulo": 'teste0',
      "descricao": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {"id": 1,
      "titulo": 'teste1',
      "descricao": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {"id": 2,
      "titulo": 'teste2',
      "descricao": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {"id": 3,
      "titulo": 'teste3',
      "descricao": 'Lorem Imps'
      },
      {"id": 4,
      "titulo": 'teste4',
      "descricao": 'Lorem Imps'
      },
    ]
  })
}
