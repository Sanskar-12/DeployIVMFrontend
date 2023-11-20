import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Reducers/userReducers";
import { getAllInventory } from "./Reducers/inventoryReducers";
import { getAllOrders } from "./Reducers/orderReducers";
import { createOrder } from "./Reducers/requisitionReducers";
import { inwardReducer } from "./Reducers/InwardReducer";
import { createWorkOrder } from "./Reducers/workOrderReducers";
import { createVendor } from "./Reducers/vendorReducer";
import { createPuchaseOrder } from "./Reducers/purchaseOrderReducer";
// export const server="http://localhost:8080/api/v1"

export const server="https://deploy-ivm-backend.onrender.com/api/v1"

const store = configureStore({
  reducer: {
    user: userReducer,
    inventory: getAllInventory,
    orders: getAllOrders,
    requistion: createOrder,
    inward: inwardReducer,
    workOrders: createWorkOrder,
    purchaseOrders: createPuchaseOrder,
    vendors: createVendor,
  },
});

export default store;
