import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { productInputs, userInputs } from "./formSource";
import ListBookPage from "./pages/bookPage/listbook";
import EditBookPage from "./pages/bookPage/editBookpage";
import ListClassified from "./pages/classified/listClassified";
import ListAdvertiesment from "./pages/advertiesment/listAdvertiesment";
import ListStory from "./pages/liststory/listStory";
import ListBanner from "./pages/banner/list/List";
import EditBanner from "./pages/banner/editBanner";
import AttentionModel from "./pages/AttentionModel/AttentionModel";
import ChatRoom from "./pages/ChatRoom/ChatRoom";
import Disclaimer from "./pages/Disclaimer/Disclaimer";
import TermsandCondition from "./pages/TermsandCondition/TermsandCondition";
import Manual from "./pages/Manual/Manual";
import Social from "./pages/Social/Social";
import EditClassified from "./pages/classified/editClassified";
import { Edit } from "@mui/icons-material";
import EditAdvertisement from "./pages/advertiesment/editAdvertisement";
import EditAttention from "./pages/attentions/editattentions";
import Layout from "./pages/layout/layout";
import Login from "./pages/login/Login";
import EditListPage from "./pages/liststory/editListStory";
import Users from "./pages/users/ListUsers";
import ListUsers from "./pages/users/ListUsers";
import EditUsers from "./pages/users/editUsers";
import Feedback from "./pages/feedback/feedback";
import { useEffect, useState } from "react";
import axios from "axios";
import { ApiUrl } from "./config/config";
import LandingPage from "./pages/layout/landingPage";
const RouterComponent = () => {
  const navigate = useNavigate()
  const [userStatus, setUserStatus] = useState();
  let userObj;
  if (localStorage.getItem("here_user")) {
    userObj = JSON.parse(localStorage.getItem("here_user")).user;
  }
  useEffect(() => {
    if (userObj) {
      getUserDetails();
    }
  }, []);

  const getUserDetails = () => {
    axios.get(`${ApiUrl}getUserById/${userObj.id}`).then((res) => {
      console.log("ressss", res.data.list);
      setUserStatus(res.data.list);
    });
  };
useEffect(()=>{
if(window.location.pathname==='/'){
  navigate('/app/landing')
}
},[])


  return (
    <Routes>

      <Route path="/login" element={<Login />} />
      
      <Route
        path="/"
        element={
          <RequireAuth redirectTo="/login">
            <Layout />
          </RequireAuth>
        }
      >
      
        <Route
          path="/app/landing"
          element={
            <RequireAuth redirectTo="/login">
              <LandingPage />
            </RequireAuth>
          }
        ></Route>

        <Route
          path="/app/banner"
          element={
            <RequireAuth redirectTo="/login">
              <ListBanner />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/app/:op"
          element={
            <RequireAuth redirectTo="/login">
              <EditBanner inputs={userInputs} title="Create a banner" />
            </RequireAuth>
          }
        />
        <Route
          path="/app/:op/:id"
          element={
            <RequireAuth redirectTo="/login">
              <EditBanner inputs={userInputs} title="Update An Entry" />
            </RequireAuth>
          }
        />

        <Route path="/app/bookpage">
          <Route
            index
            element={
              <RequireAuth redirectTo="/login">
                <ListBookPage routeName={"/app/bookpage"} />
              </RequireAuth>
            }
          />{" "}
        </Route>
        <Route
          path="/app/bookpage/:op"
          element={
            <RequireAuth redirectTo="/login">
              <EditBookPage inputs={userInputs} title="Create a Bookpage" />
            </RequireAuth>
          }
        />
        <Route
          path="/app/bookpage/:op/:id"
          element={
            <RequireAuth redirectTo="/login">
              <EditBookPage inputs={userInputs} title="Update An Entry" />
            </RequireAuth>
          }
        />

        <Route path="/app/classified">
          <Route
            index
            element={
              <RequireAuth redirectTo="/login">
                <ListClassified routeName={"/app/classified"} />
              </RequireAuth>
            }
          />{" "}
        </Route>
        <Route
          path="/app/classified/:op"
          element={
            <RequireAuth redirectTo="/login">
              <EditClassified inputs={userInputs} title="Create a Classified" />
            </RequireAuth>
          }
        />
        <Route
          path="/app/classified/:op/:id"
          element={
            <RequireAuth redirectTo="/login">
              <EditClassified inputs={userInputs} title="Update An Entry" />
            </RequireAuth>
          }
        />

        <Route path="/app/advertiesment">
          <Route
            index
            element={
              <RequireAuth redirectTo="/login">
                <ListAdvertiesment routeName={"/app/advertiesment"} />
              </RequireAuth>
            }
          />
        </Route>
        <Route
          path="/app/advertiesment/:op"
          element={
            <RequireAuth redirectTo="/login">
              <EditAdvertisement
                inputs={userInputs}
                title="Create An Advertiesment"
              />
            </RequireAuth>
          }
        />
        <Route
          path="/app/advertiesment/:op/:id"
          element={
            <RequireAuth redirectTo="/login">
              <EditAdvertisement inputs={userInputs} title="Update An Entry" />
            </RequireAuth>
          }
        />

        <Route path="/app/liststory">
          <Route
            index
            element={
              <RequireAuth redirectTo="/login">
                <ListStory routeName={"/app/liststory"} />
              </RequireAuth>
            }
          />{" "}
        </Route>
        <Route
          path="/app/liststory/:op"
          element={
            <RequireAuth redirectTo="/login">
              <EditListPage inputs={userInputs} title="Create Liststory" />
            </RequireAuth>
          }
        />
        <Route
          path="/app/liststory/:op/:id"
          element={
            <RequireAuth redirectTo="/login">
              <EditListPage inputs={userInputs} title="Update An Entry" />
            </RequireAuth>
          }
        />

        <Route
          path="/app/attention"
          element={
            <RequireAuth redirectTo="/login">
              <EditAttention />
            </RequireAuth>
          }
        />

        <Route path="/app/attentionmodel">
          <Route
            index
            element={
              <RequireAuth redirectTo="/login">
                <AttentionModel inputs={userInputs} title="update An Entry" />
              </RequireAuth>
            }
          />
        </Route>

        <Route path="/app/chatroom">
          <Route
            index
            element={
              <RequireAuth redirectTo="/login">
                <ChatRoom inputs={userInputs} title="update An Entry" />
              </RequireAuth>
            }
          />
        </Route>

        <Route path="/app/disclaimer">
          <Route
            index
            element={
              <RequireAuth redirectTo="/login">
                <Disclaimer inputs={userInputs} title="update An Entry" />
              </RequireAuth>
            }
          />
        </Route>

        <Route path="/app/social">
          <Route
            index
            element={
              <RequireAuth redirectTo="/login">
                <Social inputs={userInputs} title="update An Entry" />
              </RequireAuth>
            }
          />
        </Route>

        <Route path="/app/termscondition">
          <Route
            index
            element={
              <RequireAuth redirectTo="/login">
                <TermsandCondition
                  inputs={userInputs}
                  title="update An Entry"
                />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="/app/manual">
          <Route
            index
            element={
              <RequireAuth redirectTo="/login">
                <Manual inputs={userInputs} title="update An Entry" />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="/app/feedback">
          <Route
            index
            element={
              <RequireAuth redirectTo="/login">
                <Feedback inputs={userInputs} title="update An Entry" />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="/app/listusers">
          <Route
            index
            element={
              <RequireAuth redirectTo="/login">
                <ListUsers inputs={userInputs} title="update An Entry" />
              </RequireAuth>
            }
          />
        </Route>
        <Route
          path="/app/users/:op"
          element={
            <RequireAuth redirectTo="/login">
              <EditUsers inputs={userInputs} title="Create An User" />
            </RequireAuth>
          }
        />
        <Route
          path="/app/users/:op/:id"
          element={
            <RequireAuth redirectTo="/login">
              <EditUsers inputs={userInputs} title="Create An User" />
            </RequireAuth>
          }
        />
        <Route
          path="/app"
          element={
            <RequireAuth redirectTo="/login">
              <Navigate to="/app/banner" replace />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
};
function RequireAuth({ children, redirectTo }) {
  let isAuthenticated = localStorage.getItem("here_token");
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

// function PublicRoute({ children, redirectTo }) {
//   let isAuthenticated = localStorage.getItem("here_token");
//   return isAuthenticated ? <Navigate to={redirectTo} /> : children;
// }

export default RouterComponent;
