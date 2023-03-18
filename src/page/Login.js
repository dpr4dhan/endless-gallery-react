import React, {useState} from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../config/firebase";
import {useNavigate} from "react-router-dom";

export default function Login(){
    const [form, setForm] = useState({email:'', password: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    function handleForm(e){
        e.preventDefault();
        if(isLoading) return;
        setIsLoading(true);
        const auth = getAuth(firebaseApp);
        signInWithEmailAndPassword(auth, form.email, form.password)
            .then((userCredential) => {
                // Signed in
                setIsLoading(false);
                setError('');
                navigate('/gallery', {replace:true});
                // const user = userCredential.user;
               })
            .catch((error) => {
                setIsLoading(false);
                const errorCode = error.code;
                let errorMessage = '';
                switch (errorCode){
                    case 'auth/wrong-password':
                        errorMessage = 'Invalid password';
                        break;
                    case 'auth/user-not-found':
                        errorMessage = 'User not found.';
                        break;
                    default:
                        errorMessage = 'Error occurred.';
                        break;
                }
                setError(errorMessage);
            });
    }

    function handleInput(e){
        setForm({...form, [e.target.name] : e.target.value})
    }

    return (
        <div className="flex h-screen bg-gray-200 ">
            <div className="m-auto w-1/3 text-white flex flex-wrap justify-center shadow-lg rounded-lg bg-gradient-to-br from-indigo-900 to-indigo-600">

                <form className="m-5 w-10/12" onSubmit={handleForm}>
                    {error !== '' && <p className="text-red-600 text-center font-bold">{error}</p> }
                    <h1 className="w-full text-4xl tracking-widest text-center my-6">
                        Login
                    </h1>
                    <div className="w-full my-6">
                        <input type="email" name="email" className="p-2 rounded shadow w-full text-black" placeholder="Email or Username" value={form.email} onChange={handleInput}/>
                    </div>
                    <div className="w-full my-6">
                        <input type="password" name="password" className="p-2 rounded shadow w-full text-black" placeholder="Password" value={form.password} onChange={handleInput}/>
                    </div>
                    <div className="w-full my-6">
                        <button type="submit" className="p-2 rounded shadow w-full bg-gradient-to-tr from-yellow-600 to-yellow-300 text-black">
                            {
                                isLoading ? <i className="fas fa-circle-notch fa-spin"></i> : 'Login'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}