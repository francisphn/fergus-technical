import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Pages/Login";
import Authenticate from "./Pages/Authenticate";
import Jobs from "./Pages/Jobs";
import JobPage from "./Pages/JobPage";
import Edit from "./Pages/Edit";
import Create from "./Pages/Create";

function App() {


  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Login/>} />
              <Route path={"/authenticate"} element={<Authenticate/>} />
              <Route path={"/jobs"} element={<Jobs/>}/>
              <Route path={"/jobs/:id"} element={<JobPage/>}/>
              <Route path={"/jobs/:id/edit"} element={<Edit/>}/>
              <Route path={"/jobs/create"} element={<Create/>}/>
          </Routes>

          <div className={"mb-24"}>

          </div>
      </BrowserRouter>


  );
}

export default App;
