import React, { useState, useEffect } from 'react';
import "./styles.css"

import { Card, CardProps } from  "../../components/Card"

type ProfileResponse = {
  name: string;
  avatar_url: string;
}

type User = {
  name: string;
  avatar: string;
}

export function Home() {
  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState<CardProps[]>([]);
  const [user, setUser] = useState<User>({} as User)
  
  function handleAddStudent(event: React.FormEvent) {
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
    async function fetchData() {
      const response = await fetch("https://api.github.com/users/gabrielb-ss");
      const data = await response.json() as ProfileResponse;

      setUser({
        name: data.name,
        avatar: data.avatar_url
      });
    }

    fetchData();
  }, []);

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
        pattern="^[^,0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$"
        minLength={2}
        maxLength={53}
        placeholder="Digite seu nome e sobrenome" 
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
