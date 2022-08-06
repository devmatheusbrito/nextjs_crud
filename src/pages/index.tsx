import { useEffect, useState } from 'react'
import useClientes from "../hooks/useClientes"

import Botao from '../components/Botao'
import Layout from '../components/Layout'
import Tabela from '../components/Tabela'
import Formulario from '../components/Formulario'

export default function Home() {
  
const {
  cliente,
  clientes,
  clienteSelecionado,
  clienteExcluido,
  clienteSalvo,
  clienteNovo,
  tabelaVisivel,
  exibirTabela,
  } = useClientes()

  return (
    <div className={`
    flex justify-center items-center h-screen
    bg-gradient-to-r from-blue-500 to-purple-500
    text-white
    `}>
      <Layout titulo='Cadastro Simples'>
        {tabelaVisivel 
        ? 
        (
          <>
            <div className="flex justify-end">
              <Botao cor='green' className="mb-4" 
              onClick={clienteNovo}>
                Novo Cliente
              </Botao>
            </div>
            <Tabela 
            clientes={clientes}
            clienteSelecionado={clienteSelecionado}
            clienteExcluido={clienteExcluido}
            />
          </>
        )
        :
        (
          <Formulario 
          cliente={cliente}
          changeCliente={clienteSalvo}
          cancelado={() => exibirTabela}
          />
        )
        }
      </Layout>
    </div>
  )
}
