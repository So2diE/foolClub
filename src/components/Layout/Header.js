import React, {useContext, useState} from 'react';
import {withRouter} from "react-router-dom";
import {createUseStyles} from 'react-jss';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import 'animate.css/animate.min.css';

import {I18nText} from "../Widget/I18nText";
import {redirectUrl} from "../../api/ApiUtils";

import classNames from "classnames";
import {CART_OPERATE_SHOPPING_CART, COMMON_EDIT_SEARCH_BAR} from "../../constants/actionType";
import {useI18nText} from "../../hooks/useI18nText";
import {keyOfI18n} from "../../constants/locale/interface";
import DropDown from "../Widget/DropDown";
import actionType from "../../context/actionType";
import {reducer} from "../../context";


const styles = createUseStyles({
    topbar: {
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid #eee',
        minHeight: 65,
        padding: '0 15px'
    },
    nav: {
        display: 'flex',
        position: 'relative',
        '& > $openMenu': {
            display: 'none'
        },
    },
    logo: {
        display: 'flex',
        marginLeft : 15,
        '& > button': {
            borderWidth: 0,
            backgroundColor: 'transparent',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            '&:focus': {
                outline: 'none'
            }
        }
    },
    shopLogo : {
        marginRight : 10
    },
    shopName : {
        fontWeight : 600
    },

    mobileMenu: {
        display: 'none',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '& > button': {
            display: 'block',
            borderWidth: 0,
            color: '#fff',
            backgroundColor: 'transparent',
            margin: '15px 0',
            cursor: 'pointer'
        }
    },
    openMenu: {
        position: 'absolute',
        left: 0,
        '& button': {
            cursor: 'pointer',
            borderWidth: 0,
            backgroundColor: 'transparent',
            //textTransform: 'uppercase',
            '&:focus': {
                outline: 'none'
            }
        }
    },

    desktopMenu: {
        display: 'flex',
        marginLeft: 50,
        '& > div': {
            display: 'flex'
        },
        '& button': {
            cursor: 'pointer',
            fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif',
            fontWeight: 300,
            fontSize: 16,
            margin : "0px 5px",
            borderWidth: 0,
            backgroundColor: 'transparent',
            //textTransform: 'uppercase',
            cursor: 'pointer',
            '&:focus': {
                outline: 'none'
            }
        }
    },

    toolbar: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& > div:last-child > button': {
            borderWidth: 0,
            backgroundColor: 'transparent',
            fontSize: 17,
            fontWeight: 300,
            marginRight : 25,
            fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif',
            cursor: 'pointer',
            '&:focus': {
                outline: 0
            }
        }
    },
    languages: {
        position: 'relative',
        minWidth: 100,
        '& > div > button': {
            display: 'block',
            width: '100%',
            cursor: 'pointer',
            borderWidth: 0,
            backgroundColor: 'transparent',
            fontSize: 14,
            '&:focus': {
                outline: 0
            }
        }
    },
    languageOptions: {
        width: '100%',
        position: 'absolute',
        zIndex: 999,
        display: 'none',
        marginTop: 15,
        padding: 0,
        boxShadow: '0 3px 8px 3px rgba(92, 92, 92, 0.2)',
        '&:before': {
            content: '""',
            position: 'absolute',
            borderColor: 'transparent transparent #f3f3f3',
            borderStyle: 'solid',
            borderWidth: '10px 15px',
            top: -20,
            left: 'calc(50% - 15px)'
        },
        '& > li': {
            listStyle: 'none'
        },
        '& > li > button': {
            display: 'block',
            width: '100%',
            borderWidth: 0,
            backgroundColor: '#f3f3f3',
            cursor: 'pointer',
            padding: '5px 0',
            fontSize: 15,
            '&:focus': {
                outline: 0
            }
        }
    },
    searchBar: {
        height : 20,
        fontSize : 14,
        padding : 5,
        border : "1px #DDD solid",
        borderRadius : 3,
        transition : "border 0.3s",
        "&:focus" : {
            border : "1px black solid",
        }
    },
    shoppingCart: {
        display: 'none',
        '& > button': {
            borderWidth: 0,
            backgroundColor: 'transparent',
            cursor: 'pointer'
        }
    },







    // for mobile
    '@media (max-width: 600px)': {
        nav: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            '& > $mobileMenu': {
                display: 'none',
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(50,50,50,.9)',
                zIndex: 99999
            },
            '& > $openMenu': {
                display: 'block'
            }
        },
        desktopMenu: {
            display: 'none'
        },
        toolbar: {
            display: 'none'
        },
        shoppingCart: {
            display: 'block',
            right: 0,
            position: 'absolute'
        }
    }
});


const mapStateToProps = state => ({
    shoppingCart: state.cart.items,
    keyword: state.common.searchBar,
    products: state.product.products,
    feeds: state.feed.feeds,
    shopInfo: state.common.shopInfo,
});


const mapDispatchToProps = dispatch => ({
    closeMobileMenu: e => {
        var parent = e.target;
        while (!/^mobileMenu-/i.test(parent.className)) parent = parent.parentNode;
        if (/^mobileMenu-/i.test(parent.className)) parent.style.display = 'none';
    },
    openMobileMenu: e => {
        var parent = e.target;
        while (!/^nav-/i.test(parent.className)) parent = parent.parentNode;
        if (/^nav-/i.test(parent.className)) {
            var menu = Object.values(parent.childNodes).filter(c => /^mobileMenu-/i.test(c.className))[0];
            if (menu) menu.style.display = 'flex';
        }
    },
    closeLanguageOptions: e => {
        var parent = e.target;
        while (parent && !/^languages-/i.test(parent.className)) parent = parent.parentNode;
        if (parent) {
            var target = Object.values(parent.childNodes).filter(c => /^languageOptions-/i.test(c.className))[0];
            if (target) target.style.display = !/^block$/i.test(target.style.display) ? 'block' : 'none';
        }
    },
    editShoppingCart: (index) => dispatch({
        type: CART_OPERATE_SHOPPING_CART,
        payload: {
            key: 'remove',
            value: index,

        }
    }),
    editSearchBar: (keyword = null) => dispatch({
        type: COMMON_EDIT_SEARCH_BAR,
        payload: keyword
    })
});

const Header = props => {
    const classes = styles();
    const {feeds, products, history, shopInfo} = props;
    const {commonReducer} = useContext(reducer);

    const logo = (shopInfo || {}).logo || '';
    const name = (shopInfo || {}).name || '';

    const config = {
        showArticles: (feeds || []).length > 0,
        showShop: (products || []).length > 0,
    };

    return <div className={classes.topbar}>


        {/* --------------------------- Left topbar --------------------------- */}
        <div className={classes.nav}>
            <div className={classes.openMenu}>
                <button type="button" onClick={props.openMobileMenu}>
                    <i className="icon-menu"/>
                </button>
            </div>

            {(logo.length > 0 || name.length > 0) && <div className={classes.logo}>
                <button type="button" onClick={e => redirectUrl('/', history)}>
                    {logo.length > 0 && <img className={classes.shopLogo} src={shopInfo.logo.replace('.cloud/','.cloud/AUTOx50/')} height={30}/>}
                    {name.length > 0 && <span className={classes.shopName}>{shopInfo.name}</span>}
                </button>
            </div>}

            {/* --------------- Mobile menu  --------------- */}
            <div className={classNames(classes.mobileMenu, 'animated', 'fadeIn', 'faster')}>
                {config.showArticles && <button type="button" onClick={e => {
                    redirectUrl('/articles', history);
                    props.closeMobileMenu(e);
                }}>
                    <I18nText keyOfI18n={keyOfI18n.FEEDS}/>
                </button>}
                {config.showShop && <button type="button" onClick={e => {
                    redirectUrl('/products', history);
                    props.closeMobileMenu(e);
                }}>
                    <I18nText keyOfI18n={keyOfI18n.PRODUCTS}/>
                </button>}
                {config.showShop && <button type="button" onClick={e => {
                    redirectUrl('/checkout', history);
                    props.closeMobileMenu(e);
                }}>
                    <I18nText keyOfI18n={keyOfI18n.CHECKOUT}/>
                </button>}
                <button type="button" onClick={props.closeMobileMenu}>X</button>
            </div>


            {/* --------------- Desktop menu  --------------- */}
            <div className={classes.desktopMenu}>
                {config.showArticles && <div>
                    <button type="button" onClick={e => redirectUrl('/articles', history)}>
                        <I18nText keyOfI18n={keyOfI18n.FEEDS}/>
                    </button>
                </div>}
                {config.showShop && <div>
                    <button type="button" onClick={e => redirectUrl('/products', history)}>
                        <I18nText keyOfI18n={keyOfI18n.PRODUCTS}/>
                    </button>
                    <button type="button" onClick={e => redirectUrl('/checkout', history)}>
                        <I18nText keyOfI18n={keyOfI18n.CHECKOUT}/>
                    </button>
                </div>}
            </div>
            {
                (products || []).length > 0 && 
                <div className={classes.shoppingCart} >
                    <button type="button" onClick={() => redirectUrl('/shopping-cart', history)}>
                        <i className="icon-cart"/>
                    </button>
                </div>
            }
        </div>


        {/* --------------------------- Right topbar --------------------------- */}
        <div className={classes.toolbar}>
            {/* ---- search bar ---- */}
            <div>
                <input
                    type="text"
                    className={classes.searchBar}
                    placeholder={`${useI18nText(keyOfI18n.SEARCH)}…`}
                />
            </div>
            {/* ---- Language selector ---- */}
            <div className={classes.languages}>
                <div>
                    <button type="button" onClick={props.closeLanguageOptions}>
                        <I18nText keyOfI18n={keyOfI18n.LANGUAGE}/>
                    </button>
                </div>
                <ul className={classes.languageOptions}>
                    <li>
                        <button type="button" onClick={e => {
                            commonReducer.dispatch({
                                type: actionType.common.COMMON_INIT_I18N,
                                payload: {
                                    locale: 'en'
                                }
                            });
                            props.closeLanguageOptions(e);
                        }}>English</button>
                    </li>
                    <li>
                        <button type="button" onClick={e => {
                            commonReducer.dispatch({
                                type: actionType.common.COMMON_INIT_I18N,
                                payload: {
                                    locale: 'zh'
                                }
                            });
                            props.closeLanguageOptions(e);
                        }}>繁體中文</button>
                    </li>
                </ul>
            </div>
            {/* ---- Shoppin cart ---- */}
            {(products || []).length > 0 && <div>
                <button type="button" onClick={() => redirectUrl('/shopping-cart', history)}>
                    {/* <I18nText keyOfI18n={keyOfI18n.SHOPPING_CART}/> */}
                    <i className="icon-cart"/>
                </button>
            </div>}
        </div>
    </div>;
};

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))