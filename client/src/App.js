import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import AppRouter from "./components/AppRouter/AppRouter";
import { fetchUserById } from "./store/userSlice/userSlice";

function App() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchUserById(1));
  }, []);

  React.useEffect(() => {
    console.log(user);
  }, [user]);

  return <AppRouter />;
}

export default App;
