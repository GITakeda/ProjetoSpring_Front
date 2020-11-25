import './App.css';
import Formulario from "./components"
import { Container } from "@material-ui/core";


function App() {
  return (
    <>
      <Container component="article" maxWidth="xl" >
        <Formulario />
      </Container>
    </>
  );
}

export default App;