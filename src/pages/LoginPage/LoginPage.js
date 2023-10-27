import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import axios from "axios"

import styles from './LoginPage.module.scss';
import {loginValidator} from "../../validators/login.validator";

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        reset,
        setValue
    } = useForm({
        resolver: joiResolver(loginValidator),
        mode: 'all',
    });

    const handleLogin = async (data) => {
        console.log(data)
        // actions to login...
        reset();

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
    }

    return (
        <div className={styles.loginPage_wrapper}>
            <div className={styles.loginPage_wrapper_login}>
                <div className={styles.loginPage_wrapper_login_title}>
                    {/*<img src={logo} alt="quality cleaning logo"/>*/}

                    <div>
                        <h1 className={styles.title}>Login to your account</h1>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit(handleLogin)}
                    action="#"
                    className={styles.loginPage_wrapper_login_form}>
                    <div className={styles.loginPage_wrapper_login_form_block}>
                        <label>
                            Username:
                            <input
                                {...register('username')}
                                className={styles.input}
                                type="text"
                                placeholder={'Enter your username'}
                            />
                            {errors.username && <span className={styles.error}> {errors.username.message} </span>}
                        </label>
                    </div>

                    <div className={styles.loginPage_wrapper_login_form_block}>
                        <label>
                            Password
                            <input
                                {...register('password')}
                                className={styles.input}
                                type="password"
                            />
                        </label>
                        {errors.password && <span className={styles.error}> {errors.password.message} </span>}
                    </div>
                    <button
                        type={"submit"}
                        onClick={handleLogin}
                        disabled={!isValid}
                        className={styles.loginPage_wrapper_login_form_button}
                    >Sign in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;