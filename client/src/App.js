import LandingPage from "./Components/LandingPage";
import Registration from "./Components/Register";
import Login from "./Components/Login";
import ConsumerDash from "./Components/Consumer/ConsumerDash";
import ConsumerMarket from "./Components/Consumer/ConsumerMarket";
import SourceProfile from "./Components/Consumer/SourceProfile";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import AICHAT from "./Components/Consumer/AICHAT";
import CheckoutPage from "./Components/Consumer/CheckoutPage";
import Home from "./Components/Consumer/Map";
import ProducerDash from "./Components/Producer/ProducerDash";
import ProducerMarket from "./Components/Producer/ProducerMarket";
import ProducerApprovals from "./Components/Producer/ProducerApprovals";
import ProducerProposal from "./Components/Producer/ProducerProposals";
import ProducerSourceProfile from "./Components/Producer/ProducerSourceProfile";
import ProducerCheckoutPage from "./Components/Producer/ProducerCheckoutPage";
import ProducerLocationAnalyser from "./Components/Producer/ProducerLocationAnalyser";
import GovtPrivateRoute from "./Components/GovtPrivateRoute";


function App() {
  return (
      <Routes>

      <Route path="/" element={<LandingPage/>}/>
      <Route path="/register" element={<Registration/>}/>
      <Route path="/login" element={<Login/>}/>

      <Route element={<PrivateRoute/>}>

      <Route path="/producerDashBoard" element={<ProducerDash/>}/>
      <Route path="/producerMarket" element={<ProducerMarket/>}/>
      <Route path="/producerApprovals" element={<ProducerApprovals/>}/>
      <Route path="/producerProposal" element={<ProducerProposal/>}/>
      <Route path="/producerSourceProfile/:id" element={<ProducerSourceProfile/>}/>
      <Route path="/producerCheckoutPage/:id" element={<ProducerCheckoutPage/>}/>
      <Route path="/producerLocationAnalyser/:id" element={<ProducerLocationAnalyser/>} />

      <Route path="/consumerDashBoard" element={<ConsumerDash/>}/>
      <Route path="/groot" element={<AICHAT/>}/>
      <Route path="/consumerMarket" element={<ConsumerMarket/>}/>
      <Route path="/locationAnalyser/:id" element={<Home/>}/>
      <Route path="/sourceProfile/:id" element={<SourceProfile/>}/>
      <Route path="/checkoutPage/:id" element={<CheckoutPage/>}/>

      </Route>

      <Route element={<GovtPrivateRoute/>}>
      
      </Route>

      </Routes> 
  );
}

export default App;
