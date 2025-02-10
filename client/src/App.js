import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./pages/Users";
import AddUsers from "./pages/AddUsers";
import UpdateUsers from "./pages/UpdateUsers";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users/>}/>
          <Route path="/add" element={<AddUsers/>}/>
          <Route path="/update" element={<UpdateUsers/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
