import { useEffect, useState } from 'react'

import Botao from '../components/Botao'
import Layout from '../components/Layout'
import Tabela from '../components/Tabela'
import Cliente from '../core/Cliente'
import Formulario from '../components/Formulario'
import ClienteRepositorio from '../core/ClienteRepositorio'
import CollectionCliente from '../firebase/db/CollectionCliente'

export default function Home() {

  const repo: ClienteRepositorio = new CollectionCliente()

  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())
  const [clientes, setClientes] = useState<Cliente[]>([])
  const  [show, setShow] = useState<'tabela'|'formulario'>('tabela')

  useEffect(obterTodos,[])
  
  function obterTodos(){
    repo.obterTodos().then(clientes => {
      setClientes(clientes)
      setShow('tabela')
    })
  }

  function clienteSelecionado(cliente:Cliente){
    setCliente(cliente)
    setShow('formulario')
  }

  async function clienteExcluido(cliente:Cliente){
    console.log(`Excluir ${cliente.nome}`)
    await repo.excluir(cliente)
    obterTodos()
  }

  async function clienteSalvo(cliente:Cliente){
    await repo.salvar(cliente)
    setShow('tabela')
    console.log(cliente)
  }
  
  function clienteNovo(){
    setCliente(Cliente.vazio())
    setShow('formulario')
  }

  return (
    <div className={`
    flex justify-center items-center h-screen
    bg-gradient-to-r from-blue-500 to-purple-500
    text-white
    `}>
      <Layout titulo='Cadastro Simples'>
        {show === 'tabela' 
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
          cancelado={() => setShow('tabela')}
          />
        )
        }
      </Layout>
    </div>
  )
}
