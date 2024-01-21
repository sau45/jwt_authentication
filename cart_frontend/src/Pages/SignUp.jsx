import './SignUp.css';
import { Link, useNavigate } from "react-router-dom";
import { RiArrowDropRightLine } from "react-icons/ri";
import axios from "axios";
import { Button, TextInput } from "@mantine/core";
import { useState } from "react";
import { registerApi } from '../api/authService';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassowrd] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleSignUp = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            alert("Password and Confirm Password should be same");
            return;
        }
        
        try {
            const res = await registerApi({name,email, password});
            if(res.status){
                dispatch(login(res.accessToken))
                navigate("/");
            }  
        } catch (error) {
            alert(error.response.data.error.message);
        }
    }

    return (
        <div className="signup_wrapper">
            <form onSubmit={handleSignUp} className="signup">
                <div className="signup_form_title">
                    <h2>Sign Up</h2>
                </div>
                <div className='signup_inputs'>
                    <TextInput
                        value={name}
                        placeholder={"Enter your name"}
                        label={"Name"}
                        type="text"
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />
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
                    <TextInput
                        type="password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassowrd(e.target.value)
                        }
                        placeholder={"Confirm your Password"}
                        label={"Confirm Password"}
                    />
                </div>

                <Button type="submit">
                    Sign Up
                </Button>
                <div className="login_link_wrapper">
                    <Link className="login_link" to={"/login"}>
                        Already have an account?
                    </Link>
                    <RiArrowDropRightLine className="icon" />
                </div>
            </form>
        </div>
    );
};

export default SignUp;
