import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./components/Home/Home"
import PageNotFound from "./components/404/PageNotFound"
import InventoryPage from "./components/Inventory/InventoryPage";
import AddInventory from "./components/Inventory/AddInventory";
import Inward from "./components/Inward/Inward"
import OrderPage from "./components/OrderPage/OrderPage"
import RequisitionForm from "./components/Requistion/RequistionForm"
import Protected from "./components/404/Protected";
import { useDispatch } from "react-redux";
import { getUserDetailAction } from "./Actions/userActions";
import { useEffect } from "react";
import UserPage from "./components/Users/UserPage";
import OrderDetailsPage from "./components/OrderPage/OrderDetailsPage";

import InwardArchivePage from "./components/Archive/InwardOrderPage";
import OrderArchivePage from "./components/Archive/OrderArchivePage";
import ApprovedOrdersPage from "./components/OrderPage/ApprovedOrdersPage";
import RejectedOrdersPage from "./components/OrderPage/RejectedOrdersPage";
import PurchaseOrder from "./components/OrderGeneration/PurchaseOrder";
import WorkOrder from "./components/OrderGeneration/WorkOrder";
import ContractOrder from "./components/ContractOrder/ContractOrder";
import VendorList from "./components/Vendor/VendorList";
import VendorMasterForm from "./components/Vendor/VendorMasterForm";
import UserDetailPage from "./components/Users/UserDetailPage";
import PurchaseOrderList from "./components/OrderGeneration/PurchaseOrderList";
import WorkOrderList from "./components/OrderGeneration/WorkOrderList";

function App() {
  const dispatch = useDispatch()

  const id = sessionStorage.userId
  
  if(id){
    useEffect(() => {
    dispatch(getUserDetailAction())
    
  }, [dispatch])
    
  }

 
  
  
  return (
    <Router>
      <Routes>  
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <Protected>
            <Sidebar>
              <Home />
            </Sidebar>
            </Protected>
          }
        />
       
        <Route
          path="/inventory-page"
          element={
            <Protected>
            <Sidebar>
              <InventoryPage />
            </Sidebar>
            </Protected>
          }
        />

        <Route
          path="/add-inventory-page"
          element={
            <Protected>
            <Sidebar>
              <AddInventory />
            </Sidebar>
            </Protected>
          }
        />

        <Route
          path="/inward-page"
          element={
            <Protected>
            <Sidebar>
              <Inward />
            </Sidebar>
            </Protected>
          }
        />
        <Route
          path="/orders-page"
          element={
            <Protected>
            <Sidebar>
              <OrderPage />
            </Sidebar>
            </Protected>
          }
        />
        <Route
          path="/approved-orders-page"
          element={
            <Protected>
            <Sidebar>
               <ApprovedOrdersPage />
            </Sidebar>
            </Protected>
          }
        />
        <Route
          path="/rejected-orders-page"
          element={
            <Protected>
            <Sidebar>
              < RejectedOrdersPage />
            </Sidebar>
            </Protected>
          }
        />
        <Route
          path="/requisiton-page"
          element={
            <Protected>
            <Sidebar>
              <RequisitionForm />
            </Sidebar>
            </Protected>
          }
        />
        <Route
          path="/user-management-page"
          element={
            <Protected>
            <Sidebar>
              < UserPage />
            </Sidebar>
            </Protected>
          }
        />

        <Route
          path="/inward-archive-page"
          element={
            <Protected>
            <Sidebar>
              < InwardArchivePage />
            </Sidebar>
            </Protected>
          }
        />
        <Route
          path="/order-archive-page"
          element={
            <Protected>
            <Sidebar>
               < OrderArchivePage />
            </Sidebar>
            </Protected>
          }
        />
        <Route
          path="/order-details-page/:orderId"
          element={
            <Protected>
            <Sidebar>
              <OrderDetailsPage />
            </Sidebar>
            </Protected>
          }
        />
        <Route
          path="/Contract-Order-page"
          element={
            <Protected>
            <Sidebar>
              < ContractOrder />
            </Sidebar>
            </Protected>
          }
        />
        <Route
          path="/Purchase-Order-page"
          element={
            <Protected>
            <Sidebar>
              < PurchaseOrder />
            </Sidebar>
            </Protected>
          }
        />
        <Route
          path="/Work-Order-page"
          element={
            <Protected>
            <Sidebar>
              < WorkOrder />
            </Sidebar>
            </Protected>
          }
        />
        <Route
          path="/Purchase-Order-List-page"
          element={
            <Protected>
            <Sidebar>
              < PurchaseOrderList />
            </Sidebar>
            </Protected>
          }
        />
        <Route
          path="/Work-Order-List-page"
          element={
            <Protected>
            <Sidebar>
              < WorkOrderList />
            </Sidebar>
            </Protected>
          }
        />
        <Route
          path="/Vendor-Master-Form"
          element={
            <Protected>
            <Sidebar>
              < VendorMasterForm />
            </Sidebar>
            </Protected>
          }
        />
        <Route
          path="/Vendor-List-page"
          element={
            <Protected>
            <Sidebar>
              < VendorList />
            </Sidebar>
            </Protected>
          }
        />
         <Route
          path="/user-detail-page/:id"
          element={
            <Protected>
            <Sidebar>
              <UserDetailPage />
            </Sidebar>
            </Protected>
          }
        />
         <Route
          path="*"
          element={
              <PageNotFound />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
