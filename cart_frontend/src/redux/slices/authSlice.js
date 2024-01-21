import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    token: JSON.parse(localStorage.getItem("token")) || null,
    isLogged: false,
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload;
            state.isLogged = true;
            localStorage.setItem("token", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.token = null;
            state.isLogged = false;
            localStorage.removeItem("token");
        },
        setLogged: (state, action) => {
            state.isLogged = action.payload;
            if(action.payload === false) localStorage.removeItem("token");
        }
    }
});


export const { login, logout,setLogged } = authSlice.actions;
export default authSlice.reducer;
