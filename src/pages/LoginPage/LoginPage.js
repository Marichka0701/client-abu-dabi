import React, { useState } from "react";
import axios from "axios";

import logo from '../../constants/images/miniSidebar/abu-dabi.png';
import styles from './LoginPage.module.scss'

const LoginPage = () => {
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
                    </div>
                    <button
                        type={"submit"}
                        className={styles.loginPage_wrapper_login_form_button}
                    >Sign in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;