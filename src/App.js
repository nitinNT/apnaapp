import './App.css';
import { BrowserRouter ,Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import AuthProvider from './contexts/AuthContext';
import ViewPost from './components/ViewPost';


function App() {
  return (
    <AuthProvider>
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
      <Route path="/posts" component={ViewPost}/>
    </BrowserRouter>
    </AuthProvider>
    

  );
}

export default App;
