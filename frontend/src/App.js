import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Nav from "./components/Nav";
import Authorized from "./pages/Authorized";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/authorized" element={<Authorized />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
