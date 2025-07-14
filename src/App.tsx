import { useState } from 'react'
import './App.css'

function App() {
  const[text, setText] = useState("")
  const [output, setOutput] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault()
    setOutput("Loading...")
    try {
    const response = await fetch("https://ai-research-assistant-cncg.onrender.com/question", { 
      method: "POST", 
      headers: {"Content-Type": "application/json"
      }, 
      body: JSON.stringify({query: text}), 
    })
    console.log("Response status:", response.status);
    console.log("Response body:", response.body);
    if (!response.body) return 
    console.log("Body exists")
    const decoder = new TextDecoder()
    const reader = response.body.getReader() 
    let result = ""

    while (true) { 
      const {done, value} = await reader.read()

      if (done) break 

      const chunk = decoder.decode(value, {stream: true})
      result += chunk
      setOutput(result) 
    } 
  } 
  catch (error) { 
    console.error(error)
    setOutput("Please wait a moment")
  }
  }

  return (
    <div className='flex flex-col h-screen'>
      <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} className='border-1 px-2 py-2 border-black rounded-3xl w-1/2' /> 

        <button className='text-white rounded-2xl ml-3 bg-black w-20 hover:cursor-pointer'> 
          Submit
        </button>
      </form> 
      </div>
      <div className='mt-4 h-3/4 overflow-auto whitespace-pre-wrap'>
       {output}
      </div>
    </div> 
  )
}

export default App
