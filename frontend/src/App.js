import { Container } from "react-bootstrap"
import Header from "./components/Header"
import Footer from "./components/Footer"

const App = () => {
  return (
    <>
      
      <Header />
      <main className="py-3">
        <Container>
        <h1>Welcome to Techno</h1>  
        </Container>
      </main>
      <Footer/>s
    </>
  )
}

export default App