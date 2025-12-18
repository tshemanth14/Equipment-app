import { BrowserRouter, Route, Routes } from "react-router-dom";
import Equipments from "./Equipments";
import Edit from "./Edit";
import EquipmentForm from "./EquipmentForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/api/equipment" element={<Equipments/>}/>
        <Route path="/api/addequipment" element={<EquipmentForm/>}/>
        <Route path="/api/updateequipment/:id" element={<Edit/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
