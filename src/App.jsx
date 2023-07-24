import React from "react";
import Form from "./components/Form/Form";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SecondPage from "./components/SecondPage/SecondPage";
import "./App.css";

const App = () => {
  return (
    <div className="App">
        <Routes>
          <Route path="/first-page" element={<Form />} />
          <Route path="/second-page" element={<SecondPage />} />
          {/* Redirect to the first page for any unknown URLs */}
          <Route path="/*" element={<Navigate to="/first-page" />} />
        </Routes>
    </div>
  );
};

export default App;
