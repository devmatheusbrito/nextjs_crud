
import Layout from '../components/Layout'
import Tabela from '../components/Tabela'
import Cliente from '../core/Cliente'

export default function Home() {

  const clientes = [
    new Cliente('1', 'Matheus', 24),
    new Cliente('2', 'Maria', 23),
    new Cliente('3', 'Fernanda', 21),
    new Cliente('4', 'Amanda', 27),
  ]

  return (
    <div className={`
    flex justify-center items-center h-screen
    bg-gradient-to-r from-blue-500 to-purple-500
    text-white
    `}>
      <Layout titulo='Cadastro Simples'>
        <Tabela clientes={clientes}></Tabela>
      </Layout>
    </div>
  )
}
