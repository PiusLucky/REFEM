import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateEmail } from "../../utils/validator";

const ForgotPassword = () => {
    const notify = (msg) => toast(msg);

    const [userData, setUserData] = useState({
        email: "",
    });

    const validEmail = validateEmail(userData.email);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validEmail) {
            setLoading(true);
            const BASE_URL = process.env.REACT_APP_API;
            try {
                const { data } = await axios.post(
                    `${BASE_URL}/api/v1/auth/forgot-password`,
                    userData,
                    {
                        credentials: "include",
                    }
                );
                if (data?.status === 200) {
                    setUserData.email = "";
                    notify(data.msg);
                    setTimeout(() => {
                        setLoading(false);
                    }, 3000);
                }
            } catch (error) {
                setLoading(false);
                if (error?.response?.data) {
                    notify(`${error.response.data.msg}`);
                }
            }
        } else {
            setLoading(false);
            notify(`Enter a valid Email`);
        }
    };

    return (
        <>
            <ToastContainer autoClose={3000} />
            <div className="bg-primary signup-header text-center">
                <div className="container">
                    <a href="#">
                        <img
                            src="../assets/svg/refem-logo-150.svg"
                            alt="Refem"
                        />
                    </a>
                </div>
            </div>
            <div className="container">
                <div className="simple-login-form rounded-12 shadow-dark-80 bg-white mb-0">
                    <h2 className="mb-3">Reset password</h2>
                    <form className="pt-0 pt-md-2" onSubmit={handleSubmit}>
                        <div className="mb-4 pb-md-2">
                            <label
                                className="form-label form-label-lg"
                                htmlFor="EmailAddress"
                            >
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control form-control-xl"
                                id="EmailAddress"
                                placeholder="Your email address"
                                value={userData.email}
                                onChange={(e) =>
                                    setUserData({
                                        email: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <div className="d-grid">
                            <button
                                disabled={loading ? true : false}
                                type="submit"
                                className="btn btn-xl btn-primary"
                            >
                                {loading ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        style={{
                                            margin: "auto",
                                            background: "none",
                                        }}
                                        width="50"
                                        height="40"
                                        display="block"
                                        preserveAspectRatio="xMidYMid"
                                        viewBox="0 0 100 100"
                                    >
                                        <circle
                                            cx="30"
                                            cy="50"
                                            r="20"
                                            fill="purple"
                                        >
                                            <animate
                                                attributeName="cx"
                                                begin="-0.5s"
                                                dur="1s"
                                                keyTimes="0;0.5;1"
                                                repeatCount="indefinite"
                                                values="30;70;30"
                                            ></animate>
                                        </circle>
                                        <circle
                                            cx="70"
                                            cy="50"
                                            r="20"
                                            fill="#fff"
                                        >
                                            <animate
                                                attributeName="cx"
                                                begin="0s"
                                                dur="1s"
                                                keyTimes="0;0.5;1"
                                                repeatCount="indefinite"
                                                values="30;70;30"
                                            ></animate>
                                        </circle>
                                        <circle
                                            cx="30"
                                            cy="50"
                                            r="20"
                                            fill="purple"
                                        >
                                            <animate
                                                attributeName="cx"
                                                begin="-0.5s"
                                                dur="1s"
                                                keyTimes="0;0.5;1"
                                                repeatCount="indefinite"
                                                values="30;70;30"
                                            ></animate>
                                            <animate
                                                attributeName="fill-opacity"
                                                calcMode="discrete"
                                                dur="1s"
                                                keyTimes="0;0.499;0.5;1"
                                                repeatCount="indefinite"
                                                values="0;0;1;1"
                                            ></animate>
                                        </circle>
                                    </svg>
                                ) : (
                                    "Send reset link"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="text-center py-4">
                    <span className="text-gray-600 small">
                        If you&apos;re having any trouble resetting your
                        password, contact {""}
                        <span className="text-gray-600">
                            <u>luckypius50@gmail.com</u>
                        </span>
                    </span>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
