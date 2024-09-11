import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useCreateUsersMutation, useGetRoomsQuery } from '../redux/services/HotelApi'
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'universal-cookie'
import '../style/login.scss'


const Login = () => {


    const { data: users, error, isLoading } = useGetRoomsQuery('users');

    useEffect(() => {

    }, [users])
    const [createUser, { isLoadingCreateUser }] = useCreateUsersMutation();
    const history = useNavigate();
    const Login_formik_container = useRef()
    const Signin_formik_container = useRef()
    const user_pass_wrong = useRef()

    const cookies = new Cookies();

    const [errorSignup, setErrorSignup] = useState(false)

    const hiddenLogin = () => {
        Login_formik_container.current.className = "Login_formik_container_hidden"
        Signin_formik_container.current.className = "Signin_formik_container_show"
    }
    const ShowLogin = () => {
        if (errorSignup) {
            Login_formik_container.current.className = "Login_formik_container_show"
            Signin_formik_container.current.className = "Signin_formik_container_hidden"
        }
    }
    const IhaveAnAccount = () => {

        Login_formik_container.current.className = "Login_formik_container_show"
        Signin_formik_container.current.className = "Signin_formik_container_hidden"

    }
    const SendLoginValues = (values) => {
        users.map((user) => {
            if (user.username === values.username && user.password === values.password) {
                const usercookie = {
                    username: values.username,
                    password: values.password,
                    name: user.name
                }
                history('/')
                cookies.set('user', usercookie);
            } else {
                user_pass_wrong.current.style.display = "flex"
            }
        })
    }
    const SendSignupValues = (values, { resetForm }) => {
        const user = { ...values, role: "user" }
        createUser({ url: 'users', user: user })
        notify();
        resetForm();
    }
    const notify = () => toast.success('success', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
    });
    return (
        <div className='Login_main'>
            <div className='blur'>
                <div className='LoginBox_container'>
                    <div className='Login_form_container'>
                        <Formik
                            initialValues={{ username: "", password: "" }}

                            onSubmit={
                                (values) => {
                                    SendLoginValues(values);
                                }
                            }
                            validate={(values) => {

                                const errors = {};
                                if (!values.username) {
                                    errors.username = "* Enter Your Username"
                                }

                                if (!values.password) {
                                    errors.password = "* Enter Your password"
                                }

                                return errors;
                            }}
                        >
                            <div ref={Login_formik_container} className='Login_formik_container'>
                                <div>
                                    <h3>
                                        Log in
                                    </h3>
                                </div>
                                <Form className='Login_formik_form'>
                                    <div>

                                        <div className='Login_formik_form_username'>
                                            <Field
                                                type="text" className='inpute_Login'
                                                id='Login_username'
                                                placeholder=''
                                                name="username"
                                            />
                                            <label htmlFor="name" className='label_Login'>Username</label>
                                            <ErrorMessage name="username" component="span" />
                                        </div>

                                        <div className='Login_formik_form_password'>
                                            <Field
                                                type="password" className='inpute_Login'
                                                id='Login_password'
                                                placeholder=' '
                                                name="password"
                                            />
                                            <label htmlFor="name" className='label_Login'>Password</label>
                                            <ErrorMessage name="password" component="span" />
                                        </div>
                                        <div className='Login_remember'>
                                            <p>Remember</p>
                                            <div>
                                                <Field
                                                    type="checkbox"
                                                    id="vehicle1"
                                                    name="Policy"
                                                />
                                            </div>
                                            <ErrorMessage name="Policy" component="span" />
                                        </div>
                                    </div>
                                    <div className='Login_btn_container'>
                                        <button type="submit">Log in</button>
                                    </div>
                                    <div className='SignIn_btn_container'>
                                        <button type="button" className='Forget_btn'>
                                            <span>Forgot Password</span>
                                        </button>
                                        <button type="button" className='SignIn_btn' onClick={hiddenLogin}>
                                            <span>Sign Up</span>
                                        </button>
                                    </div>
                                </Form>
                                <div className="user_pass_wrong" ref={user_pass_wrong}>
                                    <i className="fa-solid fa-exclamation"></i>
                                    <p>Username or Password is wrong</p>
                                </div>
                            </div>
                        </Formik>
                    </div>
                    <div>
                        <div className='Signin_form_container'>
                            <Formik
                                initialValues={{ firstname: "", username: "", email: "", password: "", passwordConfirm: "" }}

                                onSubmit={SendSignupValues}
                                validate={(values) => {
                                    const errors = {};

                                    const regUsername = new RegExp(/^[0-9A-Za-z\S]{7,29}$/, 'g')

                                    const regEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'g')

                                    const regPassword = new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,29}$/, 'g')

                                    if (!regUsername.test(values.username.trim())) {
                                        errors.username = "* Your Username not Valid "
                                    }

                                    if (!regEmail.test(values.email.trim())) {
                                        errors.email = "* Your Username is not valid"
                                    }

                                    if (!regPassword.test(values.password.trim())) {
                                        errors.password = "* Your password is not valid"
                                    }

                                    if (!values.passwordConfirm === values.password) {
                                        errors.passwordConfirm = "* Your password is not valid"
                                    }

                                    if (!values.firstname) {
                                        errors.firstname = "* Enter Your name"
                                    }

                                    if (!values.username) {
                                        errors.username = "* Enter Your Username"
                                    }

                                    if (!values.email) {
                                        errors.email = "* Enter Your Email Address"
                                    }

                                    if (!values.password) {
                                        errors.password = "* Enter Your password"
                                    }

                                    if (!values.passwordConfirm) {
                                        errors.passwordConfirm = "* Enter Your password"
                                    }

                                    if (!errors.firstname && !errors.password && !errors.email && !errors.username && !errors.passwordConfirm) {
                                        setErrorSignup(true)
                                    }
                                    return errors;
                                }}
                            >
                                <div ref={Signin_formik_container} className='Signin_formik_container'>
                                    <div>
                                        <h3>
                                            Sign Up
                                        </h3>
                                    </div>
                                    <Form className='Login_formik_form'>
                                        <div>
                                            <div className='Login_formik_form_username'>
                                                <Field
                                                    type="text" className='inpute_Login'
                                                    id='firstname'
                                                    placeholder=' '
                                                    name="firstname"
                                                />
                                                <div className="cut cut_short">                        </div>
                                                <label htmlFor="firstname" className='label_Login'>Name</label>
                                                <ErrorMessage name="firstname" component="span" />
                                            </div>
                                            <div className='Login_formik_form_username'>
                                                <Field
                                                    type="text" className='inpute_Login'
                                                    id='username'
                                                    placeholder=' '
                                                    name="username"
                                                />
                                                <div className="cut cut_short">                        </div>
                                                <label htmlFor="name" className='label_Login'>Username</label>
                                                <div className='Note'>
                                                    <i className="fa-solid fa-comment-dots"></i>
                                                    Your Username must contains [A-Z][a-z][0-9][special characters]and from 7 to 29 characters</div>
                                                <ErrorMessage name="username" component="span" />
                                            </div>
                                            <div className='Login_formik_form_username'>
                                                <Field
                                                    type="text" className='inpute_Login'
                                                    id='email'
                                                    placeholder=' '
                                                    name="email"
                                                />
                                                <div className="cut cut_short">                        </div>
                                                <label htmlFor="name" className='label_Login'>Email</label>
                                                <ErrorMessage name="email" component="span" />
                                            </div>

                                            <div className='Login_formik_form_password'>
                                                <Field
                                                    type="password" className='inpute_Login'
                                                    id='password'
                                                    placeholder=' '
                                                    name="password"
                                                />
                                                <div className="cut cut_Expiration">                        </div>
                                                <label htmlFor="name" className='label_Login'>Password</label>
                                                <div className='Note'>
                                                    <i className="fa-solid fa-comment-dots"></i>
                                                    Your Username must contains [A-Z][a-z][0-9][special characters]and from 7 to 29 characters</div>
                                                <ErrorMessage name="password" component="span" />
                                            </div>
                                            <div className='Login_formik_form_password'>
                                                <Field
                                                    type="password" className='inpute_Login'
                                                    id='passwordConfirm'
                                                    placeholder=' '
                                                    name="passwordConfirm"
                                                />
                                                <div className="cut cut_Expiration">                        </div>
                                                <label htmlFor="name" className='label_Login'>Password</label>
                                                <ErrorMessage name="passwordConfirm" component="span" />
                                            </div>
                                        </div>
                                        <div className='Login_btn_container'>
                                            <button type="submit" onClick={ShowLogin}>Sign in</button>
                                        </div>
                                        <div className='SignIn_btn_container'>
                                            <button type="button" className='SignIn_btn' onClick={IhaveAnAccount}>
                                                <span>I have an account </span>
                                            </button>
                                        </div>
                                    </Form>
                                </div>
                            </Formik>
                        </div>
                        <div className='Login_image'>
                            <div></div>
                        </div>
                    </div>
                    <ToastContainer
                        position="bottom-left"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                    />
                </div>
            </div>
        </div>
    )
}

export default Login