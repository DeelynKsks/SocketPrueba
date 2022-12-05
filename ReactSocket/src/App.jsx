import { useState } from 'react'
import SocketPrueba from './Components/SocketPrueba'


function App() {
  const [count, setCount] = useState(0)

  return (
    <SocketPrueba/>
  )
}

export default App
