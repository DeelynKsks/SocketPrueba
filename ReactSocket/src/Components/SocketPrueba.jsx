import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
function SocketPrueba() {
    const socket = io('http://localhost:7000')

    const [ msg, setMsg] = useState('')
    const [ mensajes, setMensajes] = useState([])
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
    <div className='btn btn-light h-75 overflow-auto' id='centrar'>
        <form onSubmit={HandleSubmit}>
          <br />
          <input className='form-control' type="text" onChange={(e)=>{setMsg(e.target.value)}} value={msg}/><br />
          <button className='btn btn-dark' type='submit'>Enviar</button>
        </form>
          <br />
          {mensajes.map((msg, index) => (
            <div key={index} className={(msg.de == 'Yo')?"bg-success text-white":"bg-dark text-white"} id={(msg.de == 'Yo')?"yo":"otro"}>
              <p>{(msg.de) == 'Yo'?msg.de:'Otro usuario'}: {msg.body}</p>
            </div>
          ))}
    </div>
  )
}

export default SocketPrueba