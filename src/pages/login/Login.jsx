import { Checkbox } from "@mui/material";
import React, { useState } from "react";
import "./login.css";
import HeresaysLogo from '../../images/logo.png'

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ApiUrl } from "../../config/config";
const Login = () => {
  const [isShowPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onLogin = (data) => {
    axios.post(`${ApiUrl}signin`, data)
      .then((response) => {
        localStorage.setItem('here_token', response.data.token)
        localStorage.setItem('tiny_token', response.data.tinyToken)
        localStorage.setItem('here_user', JSON.stringify(response.data))
        navigate("/app/landing", { replace: true });
        alert("Sign In Successfull")
      }).catch(error => {
        if (error.response.status == 404) {
          alert("Page not found")
        }
        if (error.response.status == 401) {
          alert("Unauthorised Access")
        }
        if (error.response.status == 408) {
          alert("Request Timeout")
        }
        if (error.response.status == 500) {
          alert("500 Internal server error")
        }
        if (error.response.status == 502) {
          alert(" Bad Gateway")
        }
        if (error.response.status == 503) {
          alert("Service Unavailable")
        }
        if (error.response.status == 504) {
          alert("Gateway Timeout")
        }
        console.log(error)

      })
  }



  return (

    <div>


      <div className="sc-gsnTZi czBNBb">
        <main
          aria-labelledby="main-content-title"
          id="main-content"
          tabIndex="-1"
          className="sc-cNQtGM fAHAmX"
        >
          <div className="sc-gsnTZi UnauthenticatedLayout__Wrapper-sc-zvz5n5-0 dmUxkV jAbXnK">
            <form onSubmit={handleSubmit(onLogin)}>
              <div className="sc-dwLEzm sc-TRNrF UnauthenticatedLayout__Column-sc-zvz5n5-1 jQZsnv caAKhm hFkOrO">
                <img
                  src={HeresaysLogo}
                  aria-hidden="true"
                  alt=""
                  className="UnauthenticatedLogo__Img-sc-1tijhab-0 haamAF"
                />
                <div className="sc-gsnTZi kGZAuV">
                  <h1 className="sc-bwANAz ixEFqS">Welcome!</h1>
                </div>
                <div className="sc-gsnTZi drnWpM">
                  <span className="sc-bwANAz ywoBv">
                    Log in to your HereSays account
                  </span>
                </div>
              </div>
              <div spacing="6" className="sc-bTMaZy sc-dSuTWQ zjKNH lkuhja">
                <div>
                  <div>
                    <div
                      spacing="1"
                      className="sc-bGWzfD sc-ddcaxn fsHKsw bGUWHE"
                    >
                      <label
                        htmlFor="textinput-15"
                        required=""
                        className="sc-gDeeJ hfBEZS"
                      >
                        <div className="sc-bGWzfD sc-fytwQQ fsHKsw gHDVxC">
                          Email
                          <span className="sc-gDeeJ sc-cjbZfG kDtPBl iUnJvh">
                            *
                          </span>
                        </div>
                      </label>
                      <div className="sc-bGWzfD sc-fytwQQ sc-gGnURB fsHKsw gUjOjh MFukA">
                        <input
                          type="email"
                          name="email"
                          {...register("email", { required: true })}
                          className="sc-IIEeM cOCiVD"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <div
                      spacing="1"
                      className="sc-bGWzfD sc-ddcaxn fsHKsw bGUWHE"
                    >
                      <label
                        htmlFor="textinput-16"
                        required=""
                        className="sc-gDeeJ hfBEZS"
                      >
                        <div className="sc-bGWzfD sc-fytwQQ fsHKsw gHDVxC">
                          Password
                          <span className="sc-gDeeJ sc-cjbZfG kDtPBl iUnJvh">
                            *
                          </span>
                        </div>
                      </label>
                      <div className="sc-bGWzfD sc-fytwQQ sc-gGnURB fsHKsw gUjOjh MFukA">
                        <input
                          name="password"
                          type={isShowPassword ? "text" : "password"}
                          {...register("password", { required: true })}
                          className="sc-IIEeM bkQVkE BaseLogin__PasswordInput-sc-1yt6gzv-0 jEcUqL"

                        />
                        <div className="sc-bGWzfD dqKrYM">
                          <button
                            aria-label="Hide password"
                            type="button"
                            className="sc-fXynhf ldUFTc FieldActionWrapper-sc-1h13jzf-0 fOzlHG"
                            onClick={() => { setShowPassword(!isShowPassword) }}
                          >
                            {isShowPassword ? <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.2 12a3.2 3.2 0 11-6.399 0 3.2 3.2 0 016.4 0z" fill="#212134"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M18.78 6.103c1.923 1.243 3.64 2.981 4.963 5.027a1.61 1.61 0 01.005 1.738c-1.318 2.063-3.031 3.807-4.954 5.046-2.12 1.364-4.475 2.086-6.81 2.086-2.388 0-4.683-.7-6.816-2.082-1.894-1.225-3.593-2.966-4.914-5.032a1.596 1.596 0 01.032-1.777C1.89 8.811 3.734 7.027 5.77 5.805 7.767 4.608 9.858 4 11.984 4c2.317 0 4.667.728 6.795 2.103zm-9.446 9.888a4.8 4.8 0 105.334-7.982 4.8 4.8 0 00-5.334 7.982z" fill="#212134"></path></svg> :
                              <svg
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4.048 6.875L2.103 4.93a1 1 0 111.414-1.415l16.966 16.966a1 1 0 11-1.414 1.415l-2.686-2.686a12.247 12.247 0 01-4.383.788c-3.573 0-6.559-1.425-8.962-3.783a15.842 15.842 0 01-2.116-2.568 11.096 11.096 0 01-.711-1.211 1.145 1.145 0 010-.875c.124-.258.36-.68.711-1.211.58-.876 1.283-1.75 2.116-2.569.326-.32.663-.622 1.01-.906zm10.539 10.539l-1.551-1.551a4.005 4.005 0 01-4.9-4.9L6.584 9.411a6 6 0 008.002 8.002zM7.617 4.787A12.248 12.248 0 0112 3.998c3.572 0 6.559 1.426 8.961 3.783a15.845 15.845 0 012.117 2.569c.351.532.587.954.711 1.211.116.242.115.636 0 .875-.124.257-.36.68-.711 1.211-.58.876-1.283 1.75-2.117 2.568-.325.32-.662.623-1.01.907l-2.536-2.537a6 6 0 00-8.002-8.002L7.617 4.787zm3.347 3.347A4.005 4.005 0 0116 11.998c0 .359-.047.706-.136 1.037l-4.9-4.901z"
                                  fill="#212134"
                                ></path>
                              </svg>}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div spacing="1" className="sc-papXJ sc-kDDrLX hxAKrZ cJiTTx">
                    <label className="sc-crXcEl sc-fEOsli jWjiuB bBOokZ">
                      <input
                        type="checkbox"
                        className="sc-ftvSup kEapTo"
                      />
                      <div className="sc-papXJ jNhfGH">Remember me</div>
                    </label>
                  </div>
                </div>
                <button
                  aria-disabled="false"
                  onClick={onLogin}
                  type="submit"
                  className="sc-eCYdqJ bhsCzj sc-iBkjds rYXkN"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="sc-dwLEzm sc-TRNrF jQZsnv HhFCZ">
            <div className="sc-gsnTZi jKfFOa">
              <a className="sc-ibEqUB dzLhYF" href="/admin/auth/forgot-password">
                <span className="sc-lGdcD fkEejp">Forgot your password?</span>
              </a>
            </div>
          </div>
        </main>
      </div>

    </div>
  );
};

export default Login;
