import './App.css';
import { BrowserRouter ,Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import AuthProvider from './contexts/AuthContext';
import ViewPost from './components/ViewPost';
import { ToastProvider} from 'react-toast-notifications'
import ViewTeam from './components/ViewTeam';


function App() {
  return (
    <ToastProvider>
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
      <Route path="/post" component={ViewPost}/>
      <Route path="/team" component={ViewTeam}/>
    </BrowserRouter>
    </AuthProvider>
    
    </ToastProvider>
    

  );
}

export default App;
