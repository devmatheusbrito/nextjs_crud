import { useState } from 'react'

import Botao from '../components/Botao'
import Layout from '../components/Layout'
import Tabela from '../components/Tabela'
import Cliente from '../core/Cliente'
import Formulario from '../components/Formulario'

export default function Home() {

  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())
  const  [show, setShow] = useState<'tabela'|'formulario'>('tabela')

  const clientes = [
    new Cliente('1', 'Matheus', 24),
    new Cliente('2', 'Maria', 23),
    new Cliente('3', 'Fernanda', 21),
    new Cliente('4', 'Amanda', 27),
  ]

  function clienteSelecionado(cliente:Cliente){
    setCliente(cliente)
    setShow('formulario')
  }
  function clienteExcluido(cliente:Cliente){
    console.log(`Exclui ${cliente.nome}`)
  }

  function clienteSalvo(cliente:Cliente){
    console.log(cliente)
    setShow('tabela')
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
