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
import GovtLogin from "./Components/Govt/GovtLogin";
import GovtDash from "./Components/Govt/GovtDash";
import ApprovalProfile from "./Components/Govt/ApprovalProfile";
import GovtLocationAnalyzer from "./Components/Govt/GovtLocationAnalyzer";
import AddSourcePage from "./Components/Govt/AddSourcePage";
import DeleteSubPage from "./Components/Consumer/DeleteSub";
import CRejection from "./Components/Consumer/CRejection";
import PRejection from "./Components/Producer/PRejection";

function App() {
  return (

      <Routes>

      <Route path="/" element={<LandingPage/>}/>
      <Route path="/register" element={<Registration/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/govtLogin" element={<GovtLogin/>}/>
      

      <Route element={<PrivateRoute/>}>

      <Route path="/producerDashBoard" element={<ProducerDash/>}/>
      <Route path="/producerMarket" element={<ProducerMarket/>}/>
      <Route path="/producerApprovals" element={<ProducerApprovals/>}/>
      <Route path="/producerProposal" element={<ProducerProposal/>}/>
      <Route path="/producerSourceProfile/:id" element={<ProducerSourceProfile/>}/>
      <Route path="/producerCheckoutPage/:id" element={<ProducerCheckoutPage/>}/>
      <Route path="/producerLocationAnalyser/:id" element={<ProducerLocationAnalyser/>} />
      <Route path="/pRejection" element={<PRejection/>}/>
      {/* Add rejection pages */}

      <Route path="/consumerDashBoard" element={<ConsumerDash/>}/>
      <Route path="/groot" element={<AICHAT/>}/>
      <Route path="/consumerMarket" element={<ConsumerMarket/>}/>
      <Route path="/locationAnalyser/:id" element={<Home/>}/>
      <Route path="/sourceProfile/:id" element={<SourceProfile/>}/>
      <Route path="/checkoutPage/:id" element={<CheckoutPage/>}/>
      <Route path="/deleteSub/:id" element={<DeleteSubPage/>}/>
      <Route path="/cRejection" element={<CRejection/>}/>
      {/* Add rejection pages */}

      <Route path="/govtDashBoard" element={<GovtDash/>}/>
      <Route path="/approvalProfile/:id" element={<ApprovalProfile/>}/>
      <Route path="/govtLocationAnalyzer/:id" element={<GovtLocationAnalyzer/>}/>
      <Route path="/addSource/:id" element={<AddSourcePage/>}/>
      {/* Add rejection pages */}

      
      {/* <Route path="/monitorUsers" element={<GovtMap/>}/> */}
      {/* <Route path="/monitorSources" element={}/> */}

      </Route>
      </Routes> 
      
  );
}

export default App;
