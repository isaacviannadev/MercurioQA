import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';

function App() {
  return (
    <>
      <div>
        <Toaster position='top-center' reverseOrder={false} />
      </div>
      <BrowserRouter>
        <AuthContextProvider>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/rooms/new' component={NewRoom} />
            <Route path='/rooms/:id' component={Room} />
          </Switch>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
