import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyApp from "./components/MyApp";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <MyApp />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
