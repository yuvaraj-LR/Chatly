import { useAppContextHook } from "./context/AppContext.jsx"

function App() {

  const { data } = useAppContextHook();
  console.log(data, "dataaa....");

  return (
    <>
      <h1>Chatly</h1>
    </>
  )
}

export default App
