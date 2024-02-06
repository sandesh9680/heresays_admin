import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
import FeaturedVideoIcon from "@mui/icons-material/FeaturedVideo";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import LayersIcon from "@mui/icons-material/Layers";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ForumIcon from "@mui/icons-material/Forum";
import PersonIcon from "@mui/icons-material/Person";
import DiscFullIcon from "@mui/icons-material/DiscFull";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import ReportIcon from "@mui/icons-material/Report";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useEffect, useState } from "react";
import FeedbackIcon from "@mui/icons-material/Feedback";
import axios from "axios";
import { ApiUrl } from "../../config/config";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [userStatus, setUserStatus] = useState();
  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = () => {
    let user = localStorage.getItem("here_user");
    axios
      .get(`${ApiUrl}getUserById/${JSON.parse(user).user.id}`)
      .then((res) => {
        setUserStatus(res.data.list);
      });
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/app/landing" style={{ textDecoration: "none" }}>
          <span className="logo">HereSays</span>
        </Link>
      </div>
      <hr />

      <div className="center">
        <ul>
          {userStatus &&
            (userStatus.banner_access === 1 ||
              userStatus.bookpage_access === 1 ||
              userStatus.classified_access === 1 ||
              userStatus.advertisement_access === 1 ||
              userStatus.liststory_access === 1) && (
              <p className="title">Collections Types</p>
            )}
          {userStatus && userStatus.banner_access === 1 && (
            <Link to="/app/banner" style={{ textDecoration: "none" }}>
              <li>
                <AdUnitsIcon className="icon" />
                <span>Banner</span>
              </li>
            </Link>
          )}

          {userStatus && userStatus.bookpage_access == 1 && (
            <Link to="/app/bookpage" style={{ textDecoration: "none" }}>
              <li>
                <AutoStoriesIcon className="icon" />
                <span>Book Page</span>
              </li>
            </Link>
          )}

          {/* {userStatus && userStatus.classified_access == 1 && (
            <Link to="/app/classified" style={{ textDecoration: "none" }}>
              <li>
                <GroupAddIcon className="icon" />
                <span>Classified</span>
              </li>
            </Link>
          )}

          {userStatus && userStatus.advertisement_access == 1 && (
            <Link to="/app/advertiesment" style={{ textDecoration: "none" }}>
              <li>
                <FeaturedVideoIcon className="icon" />
                <span>Advertisement</span>
              </li>
            </Link>
          )} */}

          {userStatus && userStatus.liststory_access == 1 && (
            <Link to="/app/liststory" style={{ textDecoration: "none" }}>
              <li>
                <LayersIcon className="icon" />
                <span>List Story</span>
              </li>
            </Link>
          )}
          {userStatus &&
            (userStatus.attentionmodel_access === 1 ||
              userStatus.chatroom_access === 1 ||
              userStatus.disclaimer_access === 1 ||
              userStatus.social_access === 1 ||
              userStatus.termsandcondition_access === 1 ||
              userStatus.manual === 1) && <p className="title">Single</p>}

          {userStatus && userStatus.attentionmodel_access == 1 && (
            <Link to="/app/attention" style={{ textDecoration: "none" }}>
              <li>
                <ReportIcon className="icon" />
                <span>Jurisdiction model</span>
              </li>
            </Link>
          )}

          {userStatus && userStatus.chatroom_access == 1 && (
            <Link to="/app/chatroom" style={{ textDecoration: "none" }}>
              <li>
                <ForumIcon className="icon" />
                <span>Chat Room</span>
              </li>
            </Link>
          )}

          {userStatus && userStatus.disclaimer_access == 1 && (
            <Link to="/app/disclaimer" style={{ textDecoration: "none" }}>
              <li>
                <DiscFullIcon className="icon" />
                <span>Explanations model</span>
              </li>
            </Link>
          )}

          {/* {userStatus && userStatus.social_access == 1 && (
            <Link to="/app/social" style={{ textDecoration: "none" }}>
              <li>
                <ConnectWithoutContactIcon className="icon" />
                <span>Social</span>
              </li>
            </Link>
          )} */}

          {userStatus && userStatus.termsandcondition_access == 1 && (
            <Link to="/app/termscondition" style={{ textDecoration: "none" }}>
              <li>
                <LibraryBooksIcon className="icon" />
                <span>Terms & Condition</span>
              </li>
            </Link>
          )}

          {userStatus && userStatus.manual_access == 1 && (
            <Link to="/app/manual" style={{ textDecoration: "none" }}>
              <li>
                <LibraryBooksIcon className="icon" />
                <span>Manual</span>
              </li>
            </Link>
          )}

          {userStatus && userStatus.manual_access == 1 && (
            <Link to="/app/heresaysherlad" style={{ textDecoration: "none" }}>
              <li>
                <LibraryBooksIcon className="icon" />
                <span>Heresays Herlad</span>
              </li>
            </Link>
          )}

          {userStatus && userStatus.feedback_access == 1 && (
            <p className="title">Feedback</p>
          )}
          {userStatus && userStatus.feedback_access == 1 && (
            <Link to="/app/feedback" style={{ textDecoration: "none" }}>
              <li>
                <FeedbackIcon className="icon" />
                <span>Feedback</span>
              </li>
            </Link>
          )}
          {userStatus && userStatus.feedback_access == 1 && (
            <Link to="/app/DisableFeedback" style={{ textDecoration: "none" }}>
              <li>
                <FeedbackIcon className="icon" />
                <span>Disabled Stories</span>
              </li>
            </Link>
          )}
          {userStatus && userStatus.feedback_access == 1 && (
            <Link to="/app/editcontent" style={{ textDecoration: "none" }}>
              <li>
                <FeedbackIcon className="icon" />
                <span>Edit List</span>
              </li>
            </Link>
          )}
          {userStatus && userStatus.user_role == 1 && (
            <p className="title">Settings</p>
          )}
          {userStatus && userStatus.user_role == 1 && (
            <Link to="/app/listusers" style={{ textDecoration: "none" }}>
              <li>
                <PersonIcon className="icon" />
                <span>Users</span>
              </li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
