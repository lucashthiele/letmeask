//Dependências
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//Pages
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { AuthContextProvider } from './contexts/AuthContext'
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';
import { NotFound } from './pages/NotFound';


function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/rooms/new" exact component={NewRoom}></Route>
          <Route path="/rooms/:id" component={Room}></Route>
          <Route path="/admin/rooms/:id" component={AdminRoom}></Route>

          <Route path="/notfound" component={NotFound}></Route>
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
