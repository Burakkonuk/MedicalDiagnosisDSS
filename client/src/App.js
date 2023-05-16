import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login"

function App(){
    return(
        <Router>
            <nav>
                <Link to="/login"> Login </Link>
            </nav>
            <Routes>
                <Route exact path ="/register" Component={Register}/>
                <Route exact path ="/login" Component={Login}/>
            </Routes>
        </Router>
    );
}

export default App;