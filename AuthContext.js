//import { Children } from "react";
import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";


const INITIAL_STATE = {
    user:{
        _id:"614df68f1b55f4133a36f000",
       username:"vijay",
       email:"vijay@gmail.com",
       password:"$2b$10$1hio8mB7O1Uh2I9ufnheauyhpnsZRfZY4IPElLdRquCyyUegDxVhm",
      profilePicture:"https://hindibate.com/wp/WhatsApp-DP-HD-Images-For-Girls-1705.png",
      coverPicture: "https://www.pixelstalk.net/wp-content/uploads/2016/07/Wallpapers-HD-1080P-3D-Download.jpg",
      followers:[],
      followings:[],
      isAdmin:false,     
    },
    isFetching:false,
    error:false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) =>{
    const [state,dispatch] = useReducer(AuthReducer,INITIAL_STATE);

    return(
        <AuthContext.Provider value = {{
            user:state.user,
            isFetching:state.isFetching,
            error:state.error,
            dispatch
        }}  >
         {children}
        </AuthContext.Provider>
    )
}