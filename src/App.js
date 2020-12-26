import './App.css';
import { BrowserRouter ,Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import AuthProvider from './contexts/AuthContext';
import ViewPost from './components/ViewPost';
import { ToastProvider} from 'react-toast-notifications'
import ViewTeam from './components/ViewTeam';
import Snowfall from 'react-snowfall'
import MyProfile from './components/MyProfile';




function App() {
  const variants= ["#dee4fd","#2196f3","#4caf50","#8bc34a","#ffc107","#ff9800","#9c27b0"]
  const snowflakeC= [30,40,50,60,70,80,90,100,105];
  return (
    <ToastProvider>
      <AuthProvider>
      <BrowserRouter>
      <Snowfall
  color={variants[Math.floor(Math.random()*variants.length)]}
  snowflakeCount={snowflakeC[Math.floor(Math.random()*snowflakeC.length)]}
/>
      <Route exact path="/">
        <SignIn/>
      </Route>
      <Route path="/register">
        <SignUp/>
      </Route>
      <Route path="/home">
        <Home/>
      </Route>
      <Route path="/profile">
        <MyProfile/>
      </Route>
      <Route path="/post" component={ViewPost}/>
      <Route path="/team" component={ViewTeam}/>
    </BrowserRouter>
  
    </AuthProvider>
    
    </ToastProvider>
    

  );
}

export default App;
