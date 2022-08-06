import { useEffect, useState } from 'react'
import useTabelaOrForm from './useTabelaOrForm'

import ClienteRepositorio from '../core/ClienteRepositorio'
import CollectionCliente from '../firebase/db/CollectionCliente'
import Cliente from '../core/Cliente'

export default function useClientes(){

  const repo: ClienteRepositorio = new CollectionCliente()

  const {
    exibirTabela,
    exibirFormulario,
    formularioVisivel,
    tabelaVisivel,
  } = useTabelaOrForm()

  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())
  const [clientes, setClientes] = useState<Cliente[]>([])

  useEffect(obterTodos,[])

  function obterTodos(){
    repo.obterTodos().then(clientes => {
      setClientes(clientes)
      exibirTabela()
    })
  }

  function clienteSelecionado(cliente:Cliente){
    setCliente(cliente)
    exibirFormulario()
  }

  async function clienteExcluido(cliente:Cliente){
    console.log(`Excluir ${cliente.nome}`)
    await repo.excluir(cliente)
    obterTodos()
  }

  async function clienteSalvo(cliente:Cliente){
    await repo.salvar(cliente)
    exibirTabela()
    console.log(cliente)
  }

  function clienteNovo(){
    setCliente(Cliente.vazio())
    exibirFormulario()
  }

  return { 
    cliente,
    clientes,
    obterTodos,
    clienteSelecionado,
    clienteExcluido,
    clienteSalvo,
    clienteNovo,
    exibirTabela,
    exibirFormulario,
    formularioVisivel,
    tabelaVisivel,
  }
}