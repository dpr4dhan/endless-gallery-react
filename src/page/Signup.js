import React, {useState} from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import firebaseApp from "../config/firebase";
import {useNavigate} from "react-router-dom";

export default function Signup(){
    const [isLoading, setIsLoading] = useState(false);
    const auth = getAuth(firebaseApp);
    const navigate = useNavigate();
    return (
        <Formik initialValues={{
                email: '',
                password: ''
            }}
            onSubmit={(value, formikBag) => {
                setIsLoading(true);
                createUserWithEmailAndPassword(auth, value.email, value.password)
                    .then((userCredential) => {
                        // Signed in
                        // const user = userCredential.user;
                        // console.log(user);
                        // ...
                        setIsLoading(false);
                        navigate('/');
                    })
                    .catch((error) => {

                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorMessage);
                        switch(errorCode){
                            case 'auth/email-already-in-use':
                                formikBag.setFieldError('email', 'Email is already in use by another account.');
                                break;
                            case 'auth/weak-password':
                                formikBag.setFieldError('password', 'Password should be at least 6 characters.');
                                break;
                            default:
                                formikBag.setFieldError('email', 'Error occurred.');
                                break;
                        }
                        setIsLoading(false);
                        // ..
                    });
            }}
            validationSchema={Yup.object({
                email: Yup.string().email('Invalid email address').required('Required'),
                password: Yup.string()
                    .min(6, 'Must be at least 6 characters.').required('Required.')
            })}
        >

            <div className="flex h-screen bg-gray-200 ">
                <div className="m-auto w-1/3 text-white flex flex-wrap justify-center shadow-lg rounded-lg bg-gradient-to-br from-indigo-900 to-indigo-600">

                    <Form className="m-5 w-10/12">
                        <h1 className="w-full text-4xl tracking-widest text-center my-6">
                            Sign Up
                        </h1>
                        <div className="w-full my-6">
                            <Field type="email" name="email" className="p-2 rounded shadow w-full text-black" placeholder="Email or Username" />
                            <ErrorMessage component="span" name="email" className="text-red-500"/>
                        </div>
                        <div className="w-full my-6">
                            <Field type="password" name="password" className="p-2 rounded shadow w-full text-black" placeholder="Password" />
                            <ErrorMessage component="span" name="password" className="text-red-500"/>
                        </div>
                        <div className="w-full my-6">
                            <button type="submit" className="p-2 rounded shadow w-full bg-gradient-to-tr from-yellow-600 to-yellow-300 text-black">
                                {
                                    isLoading ? <i className="fas fa-circle-notch fa-spin"></i> : 'Sign Up'
                                }

                            </button>
                        </div>
                    </Form>
                </div>
            </div>

        </Formik>

    );
}