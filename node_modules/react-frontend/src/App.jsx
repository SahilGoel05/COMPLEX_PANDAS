import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyApp from "./MyApp";
import SignIn from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MyApp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </Router>
    );
}

export default App;