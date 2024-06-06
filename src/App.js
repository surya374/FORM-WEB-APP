import Form from "./components/form";
import View from "./components/view";
import Edit from "./components/edit";
import List from "./components/list";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/View/:id" element={<View />} />
          <Route path="/form" element={<Form />} />
          <Route path="/" element={<List />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
