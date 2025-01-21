import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h2>Welcome to BaniyaMan</h2>
      <Button>wassup</Button>
    </>
  )
}

export default App
