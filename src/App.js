import {Navigate, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";

import Main from "./components/Main/Main";
import {store} from "./store/store";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import MainLayout from "./layouts/MainLayout/MainLayout";

function App() {
  const user = localStorage.getItem("token");

  return (
      <Provider store={store}>
          <Routes>
              {user && <Route path="/" exact element={<MainLayout />} />}
              {/*{user && <Route path="/" exact element={<Main />} />}*/}
              <Route path="/signup" exact element={<Signup />} />
              <Route path="/login" exact element={<Login />} />
              <Route path="/" element={<Navigate replace to="/login" />} />
          </Routes>
      </Provider>
  );
}

export default App;
