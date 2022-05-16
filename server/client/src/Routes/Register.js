import { useState, useEffect, useRef } from "react";
import { useNavigate} from 'react-router-dom'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';

 const USER_REGEX = /^[A-Z][a-z_]/;
 const EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
 const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// const REGISTER_URL = '/register';

const Register = () =>  {
    const history = useNavigate();
    const userRef = useRef();
    const emlRef = useRef();
    const pwdRef = useRef();
    const errRef = useRef();

    const [firstName, setFirstName]= useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName]= useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [email , setEmail]= useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
    
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        userRef.current.focus();
        emlRef.current.focus();
        pwdRef.current.focus();
        errRef.current.focus();
    }, [])

    useEffect(() => {
        setValidFirstName(USER_REGEX.test(firstName));
        setValidLastName(USER_REGEX.test(lastName));
        setValidEmail(EMAIL_REGEX.test(email));
        setValidPassword(PASSWORD_REGEX.test(password));
        setValidConfirmPassword(password===confirmPassword);
        

    }, [firstName, lastName, email, password, confirmPassword])

    
    useEffect(() => {
        setErrMsg('');
    }, [firstName, lastName, email, password, confirmPassword])
    
    
    
    // useEffect(() => {
    //     setValidLastName(USER_REGEX.test(lastName));
    // }, [lastName])

    // useEffect(() => {
        //     setErrMsg('');
        // }, [lastName])
        
        



     const registerUser = async (event) =>  {
        event.preventDefault();
        const v1 = USER_REGEX.test(firstName);
        if (!v1 ) {
            setErrMsg("Invalid Entry");
            return;
        }


        try {
            const response = await fetch('http://localhost:1337/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName, 
                    lastName,
                    email, 
                    password, 
                    confirmPassword,
                    
                }),
            })

            const data = await response.json();
            if(data.status === 'ok') {
             
                alert('Registered successful');
                window.location.href = '/dashboard';
                
            }

            console.log(response?.data);
            // console.log(response?.accessToken);
            // console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setFirstName('');
       
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }




        // const response = await fetch('http://localhost:1337/register', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         firstName, 
        //         lastName,
        //         email, 
        //         password, 
        //         confirmPassword,
        //     }),
        // })
        // const data = await response.json();
        // if(data.status === 'ok') {
        //     history.push('/login')
        // }
        
    }
    return(
    <>
        
            {
                success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="/login">Sign In</a>
                    </p>
                </section>
               ) : (
    
                <section className="container col-4 pt-5">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

                    <h2>{}</h2>
                    <form  onSubmit={registerUser}>
                        <h2 className='text-center text-light'> Sign up</h2>
                        <div className="form-group">
                            <label htmlFor="firstname">       
                                
                                <FontAwesomeIcon icon={faCheck} className={validFirstName ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validFirstName || !firstName ? "hide" : "invalid"} />                       
                                </label>
                            <input type="text" 
                                   className="form-control" 
                                   id="firstname" 
                                   ref={userRef}
                                   value={firstName}
                                   placeholder="First name" 
                                   onChange={ e => setFirstName(e.target.value) }
                                   aria-invalid={validFirstName ? "false" : "true"}
                                   aria-describedby="uidnote"
                                   onFocus={() => setFirstNameFocus(true)}
                                   onBlur={() => setFirstNameFocus(false)}
                            />
                            <p id="uidnote" className={firstNameFocus && firstName && !validFirstName ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Alphabetical characters.<br />
                                Must begin with a first letter uppercase.<br />
                               
                            </p>
                        </div>
                        <div className="form-group">
                        <label htmlFor="lastname">       
                                
                                <FontAwesomeIcon icon={faCheck} className={validLastName ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validLastName || !lastName ? "hide" : "invalid"} />                       
                                </label>
                            <input  type="text" 
                                    className="form-control" 
                                    id="lastname"
                                    ref={userRef} 
                                    placeholder="Last name" 
                                    onChange={ e => setLastName(e.target.value) }
                                    aria-invalid={validLastName ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={() => setLastNameFocus(true)}
                                    onBlur={() => setLastNameFocus(false)}
                            />
                            <p id="uidnote" className={lastNameFocus && lastName && !validLastName ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Alphabetical characters.<br />
                                Must begin with a first letter uppercase.<br />
                               
                            </p>
                        </div>
                        <div className="form-group">
                        <label htmlFor="email">       
                                
                                <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />                       
                                </label>
                            <input  type="email"
                                    ref={emlRef} 
                                    className="form-control" 
                                    id="email" placeholder="Email" 
                                    onChange={ e => setEmail(e.target.value) }
                                    aria-invalid={validEmail ? "false" : "true"}
                                    aria-describedby="pwdnote"
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                            />
                               <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                This is not a valid email address. you must include "@" symbol
                               
                            </p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">
                                  <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                                  <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} /> 
                                </label>
                                    <input type="password" 
                                        className="form-control"
                                        ref={pwdRef} 
                                        id="password" 
                                        placeholder="Password" 
                                        onChange={ e => setPassword(e.target.value) }                               
                                        aria-invalid={validPassword ? "false" : "true"}
                                        aria-describedby="pwdnote"
                                        onFocus={() => setPasswordFocus(true)}
                                        onBlur={() => setPasswordFocus(false)}
                                    />
                                    <p id="pwdnote" className={passwordFocus && password && !validPassword ? "instructions" : "offscreen"}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        Your Password must contain: <br /> Alphabetical characters<br /> Special Characters <br/> Symbols
                                        
                                    
                                    </p>
                        </div>
                        <div className="form-group">
                        <label htmlFor="confirmPassword">
                                  <FontAwesomeIcon icon={faCheck} className={validPassword && validConfirmPassword ? "valid" : "hide"} />
                                  <FontAwesomeIcon icon={faTimes} className={validConfirmPassword || !confirmPassword ? "hide" : "invalid"} /> 
                                </label>
                                <input  type="password"
                                        ref={pwdRef} 
                                        className="form-control" 
                                        id="confirmPassword" 
                                        placeholder="Re-enter Password" 
                                        onChange={ e => setConfirmPassword(e.target.value) }
                                        aria-invalid={validConfirmPassword ? "false" : "true"}
                                        aria-describedby="pwdnote"
                                        onFocus={() => setConfirmPasswordFocus(true)}
                                        onBlur={() => setConfirmPasswordFocus(false)}
                            />
                                  <p id="pwdnote" className={confirmPasswordFocus && confirmPassword && !validConfirmPassword ? "instructions" : "offscreen"}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        Your Password must contain: <br /> Alphabetical characters<br /> Special Characters <br/> Symbols
                                        
                                    
                                    </p>
                        </div>
                        <div className="form-group mt-4">
                            <button type="submit" className="btn btn-primary" id="submit" placeholder="submit">Signup</button>  
                        </div>
                        
                    </form>
                </section>
         
                 )
            }

    </> 
    )
}
    
//     const userRef = useRef();
//     const errRef = useRef();

//     const [user, setUser] = useState('');
//     const [validName, setValidName] = useState(false);
//     const [userFocus, setUserFocus] = useState(false);

//     const [pwd, setPwd] = useState('');
//     const [validPwd, setValidPwd] = useState(false);
//     const [pwdFocus, setPwdFocus] = useState(false);

//     const [matchPwd, setMatchPwd] = useState('');
//     const [validMatch, setValidMatch] = useState(false);
//     const [matchFocus, setMatchFocus] = useState(false);

    // const [errMsg, setErrMsg] = useState('');
    // const [success, setSuccess] = useState(false);

    // useEffect(() => {
    //     userRef.current.focus();
    // }, [])

    // useEffect(() => {
    //     setValidName(USER_REGEX.test(user));
    // }, [user])

//     useEffect(() => {
//         setValidPwd(PWD_REGEX.test(pwd));
//         setValidMatch(pwd === matchPwd);
//     }, [pwd, matchPwd])

    // useEffect(() => {
    //     setErrMsg('');
    // }, [user, pwd, matchPwd])

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // if button enabled with JS hack
        // const v1 = USER_REGEX.test(user);
//         const v2 = PWD_REGEX.test(pwd);
        // if (!v1 || !v2) {
        //     setErrMsg("Invalid Entry");
        //     return;
        // }
    //     try {
    //         const response = await axios.post(REGISTER_URL,
    //             JSON.stringify({ user, pwd }),
    //             {
    //                 headers: { 'Content-Type': 'application/json' },
    //                 withCredentials: true
    //             }
    //         );
    //         console.log(response?.data);
    //         console.log(response?.accessToken);
    //         console.log(JSON.stringify(response))
    //         setSuccess(true);
    //         //clear state and controlled inputs
    //         //need value attrib on inputs for this
    //         setUser('');
    //         setPwd('');
    //         setMatchPwd('');
    //     } catch (err) {
    //         if (!err?.response) {
    //             setErrMsg('No Server Response');
    //         } else if (err.response?.status === 409) {
    //             setErrMsg('Username Taken');
    //         } else {
    //             setErrMsg('Registration Failed')
    //         }
    //         errRef.current.focus();
    //     }
    // }

//     return (
//         <>
//             {success ? (
//                 <section>
//                     <h1>Success!</h1>
//                     <p>
//                         <a href="#">Sign In</a>
//                     </p>
//                 </section>
//             ) : (
//                 <section>
//                     <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
//                     <h1>Register</h1>
//                     <form onSubmit={handleSubmit}>
//                         <label htmlFor="username">
//                             Username:
//                             <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
//                             <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
//                         </label>
//                         <input
//                             type="text"
//                             id="username"
//                             ref={userRef}
//                             autoComplete="off"
//                             onChange={(e) => setUser(e.target.value)}
//                             value={user}
//                             required
//                             aria-invalid={validName ? "false" : "true"}
//                             aria-describedby="uidnote"
//                             onFocus={() => setUserFocus(true)}
//                             onBlur={() => setUserFocus(false)}
//                         />
                        // <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                        //     <FontAwesomeIcon icon={faInfoCircle} />
                        //     4 to 24 characters.<br />
                        //     Must begin with a letter.<br />
                        //     Letters, numbers, underscores, hyphens allowed.
                        // </p>


//                         <label htmlFor="password">
//                             Password:
//                             <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
//                             <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
//                         </label>
//                         <input
//                             type="password"
//                             id="password"
//                             onChange={(e) => setPwd(e.target.value)}
//                             value={pwd}
//                             required
//                             aria-invalid={validPwd ? "false" : "true"}
//                             aria-describedby="pwdnote"
//                             onFocus={() => setPwdFocus(true)}
//                             onBlur={() => setPwdFocus(false)}
//                         />
//                         <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
//                             <FontAwesomeIcon icon={faInfoCircle} />
//                             8 to 24 characters.<br />
//                             Must include uppercase and lowercase letters, a number and a special character.<br />
//                             Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
//                         </p>


//                         <label htmlFor="confirm_pwd">
//                             Confirm Password:
//                             <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
//                             <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
//                         </label>
//                         <input
//                             type="password"
//                             id="confirm_pwd"
//                             onChange={(e) => setMatchPwd(e.target.value)}
//                             value={matchPwd}
//                             required
//                             aria-invalid={validMatch ? "false" : "true"}
//                             aria-describedby="confirmnote"
//                             onFocus={() => setMatchFocus(true)}
//                             onBlur={() => setMatchFocus(false)}
//                         />
//                         <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
//                             <FontAwesomeIcon icon={faInfoCircle} />
//                             Must match the first password input field.
//                         </p>

//                         <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
//                     </form>
//                     <p>
//                         Already registered?<br />
//                         <span className="line">
//                             {/*put router link here*/}
//                             <a href="#">Sign In</a>
//                         </span>
//                     </p>
//                 </section>
//             )}
//         </>
//     )
// }

export default Register










