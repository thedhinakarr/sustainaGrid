import LandingPage from "./Components/LandingPage";
import Registration from "./Components/Register";
import Login from "./Components/Login";
import ConsumerDash from "./Components/Consumer/ConsumerDash";
import ConsumerMarket from "./Components/Consumer/ConsumerMarket";
import SourceProfile from "./Components/Consumer/SourceProfile";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import AICHAT from "./Components/Consumer/AICHAT";

function App() {
  return (
      <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/register" element={<Registration/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route element={<PrivateRoute/>}>

      <Route path="/consumerDashBoard" element={<ConsumerDash/>}/>
      <Route path="/groot" element={<AICHAT/>}/>
      <Route path="/consumerMarket" element={<ConsumerMarket/>}/>
      <Route path="/sourceProfile/:id" element={<SourceProfile/>}/>
      {/* <Route path="/locationAnalyser" element={<LocationAnalyzer/>}/> */}

      </Route>
      </Routes> 

  
  );
}

export default App;
