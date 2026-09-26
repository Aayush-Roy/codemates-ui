import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./Body"
import Profile from "./Profile"
import Login from "./components/auth/Login"
import { Provider } from "react-redux"
import store from "./utils/appStore"

const App = () => {
  return (
  <>
  <Provider store={store}>
  <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Body/>} >
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
  </Provider>

  </>
  )
}

export default App
