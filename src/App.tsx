//Dependências
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//Pages
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { AuthContextProvider } from './contexts/AuthContext'
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';
import { NotFound } from './pages/NotFound';
import { ThemeContextProvider } from './contexts/ThemeContext'


function App() {
  return (
    <BrowserRouter>
    <ThemeContextProvider>
        <AuthContextProvider>
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/rooms/new" exact component={NewRoom}></Route>
            <Route path="/rooms/:id" component={Room}></Route>
            <Route path="/admin/rooms/:id" component={AdminRoom}></Route>

            <Route path="/notfound" component={NotFound}></Route>
          </Switch>
        </AuthContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  );
}

export default App;
