import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Algorithm from "./pages/Algorithm";
import LayoutTemplate from "./pages/LayoutTemplate";
import { FileOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';





function App(){

    return(
        <>
        <Router>

            <Routes>
                <Route exact path ="/register" Component={Register}/>
                <Route exact path ="/login" Component={Login}/>
                <Route exact path ="/" Component={LayoutTemplate}/>
                
                
            </Routes>
        </Router>
        <LayoutTemplate></LayoutTemplate>
        <Router>
            <Routes>
                <Route exact path ="/algorithm" Component={Algorithm}/>
                
            </Routes>
        </Router>
        </>
        
    );
}

export default App;