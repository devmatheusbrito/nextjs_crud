import {useState} from 'react'

import Entrada from "./Entrada";
import Cliente from '../core/Cliente'
import Botao from './Botao';

interface FormularioProps{
  cliente:Cliente,
  changeCliente?: (cliente: Cliente) => void
  cancelado?: () => void,


}
export default function Formulario(props:FormularioProps){
  const id = props.cliente?.id
  const [nome, setNome] = useState(props.cliente?.nome ?? '')
  const [idade, setIdade] = useState(props.cliente?.idade ?? 0)

  return(
    <div>
      {id ? 
      (
        <Entrada 
        texto="Código" 
        valor={id}
        />
      )
      :
        false
      }

      <Entrada 
      texto="Nome" 
      valor={nome}
      changeValue={setNome}
      className="mb-4"
      />

      <Entrada 
      texto="Idade" 
      tipo='number' 
      valor={idade}
      changeValue={setIdade}
      className="mb-4"
      />
      <div className="flex justify-end mt-7">
        <Botao 
        className="mr-2" 
        cor='blue'
        onClick={() => props.changeCliente?.(new Cliente(id, nome, +idade))}
        >
          {id ? 'Alterar' : 'Salvar'}
        </Botao>
        <Botao onClick={props.cancelado}>
          Cancelar
        </Botao>
      </div>
    </div>
  )
}