import './Login.css';
import { Link, useNavigate } from "react-router-dom";
import { RiArrowDropRightLine } from "react-icons/ri";
import { Button, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { loginApi } from '../api/authService';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();



    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await loginApi({email, password});
            if(res.status){
                dispatch(login(res.accessToken))
                navigate("/");
            }  
        } catch (error) {
            alert(error.response.data.error.message);
        }
    }

    return (
        <div className="login_wrapper">
            <form onSubmit={handleLogin} className="login">
                <div className="login_form_title">
                    <h2>Login</h2>
                </div>
                <div className='login_inputs'>
                    <TextInput
                        value={email}
                        placeholder={"Enter your email"}
                        label={"Email address"}
                        type="email"
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />
                    <TextInput
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        placeholder={"Enter your Password"}
                        label={"Password"}
                    />
                </div>

                <Button type="submit" className="solid-btn w-full ">
                    Login
                </Button>
                <div className="register_wrapper">
                    <Link className="sign_up_link" to={"/signup"}>
                        Create New Account
                    </Link>
                    <RiArrowDropRightLine className="icon" />
                </div>
            </form>
        </div>
    );
};

export default Login;
