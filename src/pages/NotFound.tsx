import { Button } from "../components/Button";
import notFoundImg from '../assets/images/404.svg';

import '../styles/not-found.scss';
import { useHistory } from "react-router-dom";


export function NotFound() {
  const history = useHistory();

  function handleReturnHome(){
    history.push('/');
  }

  return (
    <div className="container">
        <img src={notFoundImg} alt="404" />

        <h3>Ops... Parece que a pagina que você está procurando não existe</h3> 
        <h3>Retorne ao ínicio clicando no botão abaixo</h3>
        
        <Button onClick={handleReturnHome}>Retornar a Home</Button>
    </div>
  )
}