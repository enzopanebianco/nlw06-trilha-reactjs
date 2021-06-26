import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./pages/Home";
import NewRoom from "./pages/NewRoom";
import { AuthContextProvider } from './Contexts/AuthContext';
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';


function App() {



  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/rooms/new" component={NewRoom} />
            <Route path="/rooms/:id" component={Room} />
            <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
