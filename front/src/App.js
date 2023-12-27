import './App.scss';
import './Shered.scss';
import { Messages, Login } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Login />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
