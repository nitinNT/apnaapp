import './App.css';
import { BrowserRouter ,Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/">
        <SignIn/>
      </Route>
      <Route path="/register">
        <SignUp/>
      </Route>
      <Route path="/home">
        <Home/>
      </Route>
    </BrowserRouter>

  );
}

export default App;
