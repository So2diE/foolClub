import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './navBar.css';
import { connect } from 'react-redux';


const mapStateToProps = state => ({
    shop: state.shop.session,
    cart: state.cart
});


function NarBar(props){

    // get window href
    let location = useLocation();
    // navBar style override state
    let [hasShadow, setHasShadow] = useState(false);
    // get shop
    const { shop, cart } = props;
    
    // ---------------- LIFECYCLE ----------------
    useEffect(() => {
        // scroll listener
        window.onscroll = function() {
            setHasShadow(window.pageYOffset > 69);
        };
        // remove listener
        return () => { window.onscroll = null; };
    }, []);
    // ---------------- /LIFECYCLE ----------------

    return (
        <div className="navBar" style={{ 
            boxShadow : hasShadow ? "0px 1px 8px #dddddd" : "none",
            border : "0.5px solid #dddddd"
        }}>
            <div className="navBar-wrapper">
                <div className="navBar-item title">
                    {shop.logo.length > 0 ? <img className="logo" src={shop.logo} /> : null}
                    <h2>{shop.name}</h2>
                </div>
                <div className="navBar-item">
                    <Link to='/' style={{fontWeight:location.pathname === "/" ? 500 : 300}}>Home</Link>
                </div>
                <div className="navBar-item">
                    <Link to='/blogs' style={{fontWeight:location.pathname.startsWith("/blogs") ? 500 : 300}}>Blog</Link>
                </div>
                <div className="navBar-item">
                    <Link to='/products' style={{fontWeight:location.pathname.startsWith("/products") ? 500 : 300}}>Shop</Link>
                </div>
                <div className="navBar-item">
                    <Link to='/cart'>
                        {
                            cart.items.length > 0 ?
                            <span className="count">
                                {cart.items.length}
                            </span> : null
                        }
                        <i className="fas fa-shopping-cart"></i>
                    </Link>
                </div>
                <div className="navBar-item">
                    <Link to='/users'>
                        <i className="fas fa-user"></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(NarBar);