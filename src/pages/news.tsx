import { useState, useEffect } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import Head from 'next/head'
import { db, addDoc, getDocs, updateDoc, doc, collection, query, orderBy, where, deleteDoc } from '../services/firebaseClient'
import { disconnect } from 'process'
import { documentId } from 'firebase/firestore'


type News = {
  id: string,
  title: string,
}


const NewsPage:NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({data}) => {
  const [Articles, setArticles] = useState<News[]>(JSON.parse(data))
  console.log(Articles)
  const [input, setInput] = useState('')

  const cadastrar = async () => {
    await addDoc(collection(db, 'noticias'), {
      title: input,
    }).then(
      (doc: any) => {
      }
    )
    .catch((err: any) => {
      console.error('Ocorreu um erro: ' + err)
    })
  }

  return(
    <div className='MainDiv'>
      <input type='text'
      placeholder='Insira qualquer texto'
      value={input}
      onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={cadastrar} >Cadastrar Info</button>

      <br/>
      <h1>Notícias cadastradas com NextJs</h1>
      <ul>
      {Articles.map((Article) => {
        return(
          <li key={Article.id}>{Article.title}</li>
        )
      })}
      </ul>


    </div>
  )
}

export default NewsPage

export const getServerSideProps = async () => {

  const tasks = await getDocs(collection(db, 'noticias'))
  const data = JSON.stringify(tasks.docs.map(u => {//docs são os doumentos que a query (na variável tasks) achar. JSON stringfy para transformar o retorno para string, pois é um formato que o firebase aceita.
    return {
        id: u.id,
        ...u.data()
    }
  }))

  return{
    props:{
    data
    }
  }
}