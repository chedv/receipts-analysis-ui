import {ReceiptFileUploadPage} from "./pages/ReceiptFileUploadPage";
import {BrowserRouter, Routes, Route} from "react-router-dom";


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