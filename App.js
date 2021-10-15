import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import "./styles.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

export default function App() {
  const {user} = useContext(AuthContext);
  const PF = "https://zocially-mern-stack.herokuapp.com/images/";
  return (
    <div className="App">
     <Router> 
      <Switch>
        <Route exact path ="/">
          {user ? <Home /> : <Register /> }
         </Route>
         <Route path ="/login">
           {user ? <Redirect to ="/"/> : <Login />}
         </Route>
         <Route path ="/register">
         {user ? <Redirect to ="/"/> : <Register />}
         </Route>
         <Route path ="/profile/:username">
           <Profile />
         </Route>
       </Switch>
     </Router> 
    </div>
  );
}
