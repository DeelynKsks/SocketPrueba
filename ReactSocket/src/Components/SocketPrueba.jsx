import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
function SocketPrueba() {
    const socket = io('http://localhost:7000')

    const [ msg, setMsg] = useState('')
    const [ mensajes, setMensajes] = useState([{
      body: "Prueba de Socket",
      de: "Usuario de Prueba N°1"
    }])
    useEffect(() => {
      const recibirMensaje = (msg) => setMensajes([msg, ...mensajes]);
      socket.on('mensaje', recibirMensaje)

      return () => socket.off('mensaje', recibirMensaje)
    }, [mensajes])
    

    const HandleSubmit = (e) => {
      e.preventDefault();
      socket.emit('mensaje', msg)
      const newMensaje = {
        body: msg,
        de: 'Yo'
      }
      setMensajes([newMensaje, ...mensajes])
      setMsg('')
    }
  return (
    <div className='btn btn-light' id='centrar'>
        <form onSubmit={HandleSubmit}>
          <br />
          <input className='form-control' type="text" onChange={(e)=>{setMsg(e.target.value)}} value={msg}/>
          <button className='btn btn-dark' type='submit'>Enviar</button>
          {mensajes.map((msg, index) => (
            <div key={index}>
              <p>{msg.de}: {msg.body}</p>
            </div>
          ))}
        </form>
    </div>
  )
}

export default SocketPrueba