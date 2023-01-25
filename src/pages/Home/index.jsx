import React, { useState, useEffect } from 'react';
import "./styles.css"

import { Card } from  "../../components/Card"

export function Home() {
  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({ name:'', avatar:''})
  
  function handleAddStudent(event) {
    event.preventDefault();
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    }
    setStudents(prevState => [...prevState, newStudent]);
    setStudentName('')
  }

  useEffect(() => {
    fetch("https://api.github.com/users/gabrielb-ss")
    .then(response => response.json())
    .then(data => {
      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    })
  }, [])

  return (
    <form onSubmit={handleAddStudent} className="container">
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Profile Pic" />
        </div>
      </header>

      <input 
        id='input_name'
        type="text" 
        pattern="^[a-zA-Z, ]+$"
        minLength="3"
        placeholder="Digite seu nome" 
        value={studentName}
        onChange={e => setStudentName(e.target.value)}
        required
      />

      <button 
        type="submit"
      >
        Adicionar
      </button>

      {
        students.map( student =>  (
          <Card 
            key={student.time}
            name={student.name} 
            time={student.time}
          />
          )
        )
      }

    </form>
  )
}
