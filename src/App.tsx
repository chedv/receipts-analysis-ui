import {ReceiptFileUploadPage} from "./components/pages/ReceiptFileUploadPage";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./App.module.css";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ReceiptFileUploadPage />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;