import { useState } from 'react'
import "./styles.css"

import { Card } from  "../../components/Card"

export function Home() {
  const [count, setCount] = useState(0)

  return (
   <div className="container">
    <h1>Lista de Presença</h1>
    <input type="text" placeholder="Digite seu nome" />
    <button type="button">Adicionar</button>

    <Card name="Gabriel" time="10:55:25"/>
    <Card name="Sarah" time="08:55:25"/>

   </div>
  )
}
