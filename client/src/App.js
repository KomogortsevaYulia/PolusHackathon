import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { fetchUserById } from "./store/userSlice/userSlice";
import AppRoter from "./components/AppRouter/AppRouter";

function App() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchUserById(1));
  }, []);

  React.useEffect(() => {
    console.log(user);
  }, [user]);

  return <AppRoter />;
}

export default App;
