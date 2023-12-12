import axios from "axios";
import { useRef, useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";

export default function Login() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      userName: user,
      password: pwd,
    };
    axios
      .post("auth/signin", data)
      .then((res) => {
        localStorage.setItem("token", res.data.accessToken);
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setErrMsg("Invlaid userName or Password");
      });
  };
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);
  return (
    <>
      {success ? (
        <Navigate replace to="/dashboard" />
      ) : (
        <section className="login_page">
          <div className="auth_section_title">
            <h1>Login</h1>
          </div>
          <div className="auth_display">
            <form className="auth_form" onSubmit={handleSubmit}>
              <div>
                <p
                  ref={errRef}
                  className={errMsg ? "errmsg" : "offscreen"}
                  aria-live="assertive"
                >
                  {errMsg}
                </p>
                <div className="auth_item">
                  <label className="auth_label" htmlFor="userName">
                    UserName
                  </label>
                  <input
                    type="text"
                    id="userName"
                    ref={userRef}
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    className="auth_input"
                    required
                  />
                </div>
                <div className="auth_item">
                  <label className="auth_label" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    className="auth_input"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                  />
                </div>
              </div>
              <div className="btn_display ">
                <button className="btn_Sec btn_footer">Login</button>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
}
