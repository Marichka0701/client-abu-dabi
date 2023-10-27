import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import logo from '../../constants/images/miniSidebar/abu-dabi.png';
import styles from './Login.module.scss'

const Login = () => {
    const [data, setData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = "http://localhost:5000/api/auth";
            const { data: res } = await axios.post(url, data);
            console.log(res)
            localStorage.setItem("token", res.data);
            window.location = "/";
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        // <div className={styles.login_container}>
        //     <div className={styles.login_form_container}>
        //         <div className={styles.left}>
        //             <form className={styles.form_container} onSubmit={handleSubmit}>
        //                 <h1>Login to Your Account</h1>
        //                 <input
        //                     type="text"
        //                     placeholder="username"
        //                     name="username"
        //                     onChange={handleChange}
        //                     value={data.username}
        //                     required
        //                     className={styles.input}
        //                 />
        //                 <input
        //                     type="password"
        //                     placeholder="Password"
        //                     name="password"
        //                     onChange={handleChange}
        //                     value={data.password}
        //                     required
        //                     className={styles.input}
        //                 />
        //                 {error && <div className={styles.error_msg}>{error}</div>}
        //                 <button type="submit" className={styles.green_btn}>
        //                     Sing In
        //                 </button>
        //             </form>
        //         </div>
        //         <div className={styles.right}>
        //             <h1>New Here ?</h1>
        //             <Link to="/signup">
        //                 <button type="button" className={styles.white_btn}>
        //                     Sing Up
        //                 </button>
        //             </Link>
        //         </div>
        //     </div>
        // </div>
        <div className={styles.loginPage_wrapper}>
            <div className={styles.loginPage_wrapper_login}>
                <div className={styles.loginPage_wrapper_login_title}>
                    <img src={logo} alt="abu dabi logo"/>

                    <div>
                        <h1 className={styles.title}>Login to your account</h1>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    // onSubmit={handleSubmit(handleSubmit)}
                    action="#"
                    className={styles.loginPage_wrapper_login_form}>
                    <div className={styles.loginPage_wrapper_login_form_block}>
                        <label>
                            Username
                            <input
                                type="text"
                                placeholder="Username"
                                name="username"
                                onChange={handleChange}
                                value={data.username}
                                required
                                className={styles.input}
                            />
                            {/*{errors.username && <span className={styles.error}> {errors.username.message} </span>}*/}
                        </label>
                    </div>

                    <div className={styles.loginPage_wrapper_login_form_block}>
                        <label>
                            Password
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                value={data.password}
                                required
                                className={styles.input}
                            />
                        </label>
                        {error && <div className={styles.error}>{error}</div>}
                        {/*{errors.password && <span className={styles.error}> {errors.password.message} </span>}*/}
                    </div>
                    <button
                        type={"submit"}
                        // disabled={!isValid}
                        className={styles.loginPage_wrapper_login_form_button}
                    >Sign in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;