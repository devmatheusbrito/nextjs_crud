import { useState } from 'react'

export default function useTabelaOrForm(){

  const [show, setShow] = useState<'tabela' | 'formulario'>('tabela')

  const exibirTabela = () => setShow('tabela')
  const exibirFormulario = () => setShow('formulario')

  return{ 
    formularioVisivel: show === 'formulario',
    tabelaVisivel: show === 'tabela',
    exibirTabela,
    exibirFormulario,
  }
}