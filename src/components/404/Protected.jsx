
import { Navigate } from "react-router-dom";

const Protected = ({children}) => {
    const id = sessionStorage.userId
    if (!id) {
        
        return <Navigate to="/" ></Navigate>;
    }else{
        
        return children;
    }
    
}

export default Protected
