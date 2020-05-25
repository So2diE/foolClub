import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Oneshop from 'oneshop.web';
import './login.css';
import { connect } from 'react-redux';
import { MoonLoader } from 'react-spinners';

// ------------------------ REDUX ------------------------
const mapStateToProps = state => ({
    shop : state.shop.session,
    i18n : state.i18n
});
// ------------------------ /REDUX ------------------------


function Login(props){

    // email state
    let [email, setEmail] = useState("");
    // password state
    let [password, setPassword] = useState("");
    // loading status
    let [isLoading, setIsLoading] = useState(false);
    // redirect path
    let [redirect, setRedirect] = useState(null);
    // get oneshop instance
    const OS = new Oneshop();
    // get shop
    const { shop } = props;
    // get i18n method
    const { __ } = props.i18n;

    // ------------------ LIFECYCLE ------------------
    useEffect(() => {
        // retreive profile eveyr time
        OS.consumer.profile.get()
        // got 
        .then((rows) => {
            // get user
            let user = rows[0];
            // logged in already?
            if(user != null){
                // back to users page
                setRedirect('/users');
            }
        })
        .catch((error) => {
            // ignore error    
        });
    }, []);
    // ------------------ /LIFECYCLE ------------------

    // -------------------- HELPER --------------------
    function login(){
        // start loading
        setIsLoading(true);
        // login
        OS.consumer.login({
            email  : email,
            passwd : password
        })
        // login success
        .then(() => {
            // finish loading
            setIsLoading(false);
            // redirect to checking again
            window.location.href = "/users";
        })
        // error
        .catch(error => {
            // finish loading
            setIsLoading(false);
            // show message
            alert("Username or password invalid.");
        });
    }
    // -------------------- /HELPER --------------------


    return redirect != null ? <Redirect to={redirect} /> : (
        <div className="user-login">
            <div className="user-login-wrapper">
                <div className="form">
                    <div className="greeting">
                        {shop.logo ? <img src={shop.logo}/> : null}
                        <h1>{__("Welcome Back")}</h1>
                    </div>
                    <div className="form-wrapper">
                        <div className="form-group">
                            <label>{__("Email")}</label>
                            <input 
                                type="text" 
                                value={email} 
                                onChange={(event) => { setEmail(event.target.value); }}
                                placeholder="peter.chan@abc.com"
                            />
                        </div>
                        <div className="form-group">
                            <label>{__("Password")}</label>
                            <input 
                                type="password" 
                                value={password}  
                                onChange={(event) => { setPassword(event.target.value); }}
                                placeholder="・・・・・・・・"
                            />
                        </div>
                        <button onClick={login} disabled={isLoading}>
                            {
                                isLoading ? 
                                <MoonLoader 
                                    size={20}
                                    color={"white"}
                                    loading={true}
                                /> :
                                __("Login")
                            }
                        </button>
                        <div className="register">
                            <Link to="/users/new">{__("Not a member? Register now!")}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default connect(mapStateToProps)(Login);