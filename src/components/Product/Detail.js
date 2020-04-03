import React, {useState, useEffect, useRef} from 'react';
import {createUseStyles} from 'react-jss';
import {connect} from 'react-redux';

import Cookies from 'universal-cookie';

import classNames from 'classnames';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';

import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


import agent from '../../agent';
import {redirectUrl} from "../../api/ApiUtils";

import { I18nText } from "../Widget/I18nText";
import { keyOfI18n } from "../../constants/locale/interface";
import SocialIcon from '../Widget/SocialIcon';

import Header from '../Layout/Body/Header';
import LoadingPage from '../Layout/LoadingPage';

import ReactSelect from 'react-select';

import {
    INIT_CART
} from "../../constants/actionType";



const styles = createUseStyles({
    wrapper: {
        padding: '0 9%'
    },
    navigator: {
        marginBottom: 45
    },
    content: {
        display: 'flex',
        flexDirection: 'row-reverse'
    },
    viewer: {
        width: '35%'
    },
    detail: {
        width: '65%',
        marginRight: 100
    },

    backArrow: {
        cursor: 'pointer',
        backgroundColor: 'transparent',
        borderWidth: 0,
        display: 'flex',
        alignItems: 'center',
        padding: 0
    },
    backIcon: {
        fontSize: 20,
        marginRight: 5
    },
    backText: {
        fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif'
    },

    description: {
        fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif',
        color: '#555',
        fontSize: 15
    },
    addBtn: {
        marginTop: 10,
        '& > button': {
            backgroundColor : "transparent",
            border: "1px black solid",
            padding: '10px 20px',
            borderRadius : "3px",
            cursor : "pointer"
        }
    },
    addBtnDisabled : {
        marginTop: 10,
        '& > button': {
            backgroundColor : "transparent",
            border: "1px #DDD solid",
            borderRadius : "3px",
            padding: '10px 20px',
            opacity : "0.6"
        }
    },
    stock : {
        padding : "10px 0px",
        fontSize : "13px"
    },
    sku : {
        fontSize : "13px"
    },
    form : {
        marginTop : "35px",
        marginBottom : "15px"
    },  

    qtyGroup : {
        padding : "15px 0px"
    },
    qtyInput : {
        height : "30px",
        border : "0.5px #DDD solid",
        transform : "border 0.3s"
    },
    // for mobile
    '@media (max-width: 600px)': {
        wrapper: {
            padding: '0 5%'
        },
        viewer: {
            width: '100%'
        },
        detail: {
            width: '100%',
            marginRight: 0
        },
        content: {
            display: 'block'
        },
    }

    // productCategory: {
    //     backgroundColor: theme.palette.background.paper
    // },
    // toolBar: {
    //     backgroundColor: ''
    // },

});


const mapStateToProps = state => ({
    products: state.product.products,
    feeds: state.feed.feeds,
    category: state.category.category,
});


const mapDispatchToProps = dispatch => ({
    addToCart: async (selectedVariant, qty) => {
        // no selected variant
        if (!selectedVariant) {
            alert('Please select a variant first.');
        } else {
            // get shopping cart
            let cart = cookies.get('cart'), result = null;
            // no shopping cart
            if (!cart) {
                result = await agent.Checkout.getCart();
                cart = (((((result || {}).data || {}).data || {}).rows || []).shift() || {}).id;
                if (cart) cookies.set('cart', cart);
            }
            // add item
            result = await agent.Checkout.addItem(cart, {
                id: selectedVariant.id,
                qty
            });
            if (!((result || {}).data || {}).result) {
                alert((((result || {}).data || {}).messages || []).join("\n") || 'Failed.');
            } else {
                // reload items
                agent.Checkout.initCart(cart).then(res => dispatch(
                    {
                        type: INIT_CART,
                        payload: res.data.data.rows,
                    }
                )).catch(err => dispatch(
            
                    {
                        type: INIT_CART,
                        payload: [],
                    }
                ))
                // return result
                toast.success('Item added.', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }
    }
});


const cookies = new Cookies();


const ResponsiveDialog = props => {
    const classes = styles();
    const {products, match, history} = props;
    const product = products ? products.find(n => n.id.toString() === match.params.id) : null;

    console.log("=====> ", product)

    let options = {}, variants = {};
    ((product || {}).variants || []).forEach(v => (v.description||'').split(',').forEach(desc => {
        let optr = desc.indexOf(':');
        const key = desc.substr(0, optr);
        const value = desc.substring(optr + 1);
        options[key] = (options[key] || []).concat([value]).filter((val, i, a) => a.indexOf(val) == i);
        variants[v.id] = variants[v.id] || {
            id: v.id,
            media: v.media,
            price: v.price,
            stock: v.stock,
            sku: v.sku,
            description: []
        };
        variants[v.id].description.push(desc);
    }));

    
    const [form, setForm] = useState({
        qty: 1,
        variant: null
    });

    if (products == undefined) return <LoadingPage/>;
    if (!product) return null;


    const getSelectedVariant = function() {
        // get variant
        let variant = Object.keys(form.variant || {}).map(o => `${o}:${form.variant[o]}`);
        return variants[Object.keys(variants).filter(id => variants[id].description.length == variants[id].description.filter(v => variant.indexOf(v) >= 0).length)[0]];
    };


    form.variant = form.variant || ((((product || {}).variants || [])[0] || {}).description || '').split(/ *, */).filter(v => v).reduce((container, v) => {
        const optr = v.indexOf(':');
        return {
            ...container,
            [v.substr(0, optr)]: v.substring(optr + 1)
        };
    }, {});
    const variant = getSelectedVariant();


    return <div>
        <Header
            title={product.name}
            classes={{}}
        />
        <div className={classes.wrapper}>
            <div className={classes.navigator}>
                <button
                    type="button"
                    className={classes.backArrow}
                    onClick={() => redirectUrl('/products', history)}
                >
                    <i className={classNames('icon-circle-left', classes.backIcon)}/>&nbsp;
                    <b><I18nText keyOfI18n={keyOfI18n.FEED_DETAIL_BACK_TO_FEED_LIST}/></b>
                </button>
            </div>
            <div className={classes.content}>
                <div className={classes.viewer}>
                    <Carousel>
                        {(variant.media || product.media).map((m, i) => <div key={i}>
                            <img src={m.url}/>
                        </div>)}
                    </Carousel>
                </div>
                <div className={classes.detail}>
                    <p className={classes.description}>
                        <h3>Description:</h3>
                        {product.description}
                    </p>
                    <div className={classes.price}>
                        <NumberFormat
                            value={variant.price}
                            thousandSeparator={true}
                            prefix={'HK$'}
                            displayType={'text'}
                            renderText={v => <b>{v}</b>}
                        />
                    </div>
                    <div className={classes.stock}>
                        {
                            variant.stock > 0 ? 
                            <span style={{color:"#1fa141"}}>In stock</span>
                            :
                            <span style={{color:"#e0674f"}}>Out of stock</span>
                        }
                    </div>
                    <div className={classes.sku}>SKU: {variant.sku || "--"}</div>
                    <div className={classes.form}>
                        {
                            Object.keys(options).map((o, oi) => <div key={oi}>
                                <span>{o}</span> :
                                {options[o].map((v, vi) => <label key={vi} >
                                    <input
                                        type="radio"
                                        name={o}
                                        value={v}
                                        checked={(variant.description || []).indexOf(`${o}:${v}`) >= 0}
                                        onChange={e => setForm({
                                            ...form,
                                            variant: {
                                                ...form.variant,
                                                [e.target.name]: e.target.value
                                            }
                                        })}
                                    />
                                    {v}
                                </label>)}
                            </div>)
                        }
                        <div className={classes.qtyGroup}>
                            <input
                                className={classes.qtyInput}
                                type="number"
                                defaultValue={form.qty || 1}
                                onChange={e => setForm({
                                    ...form,
                                    qty: e.target.value
                                })}
                            />
                            {/* <button
                                type="button"
                            >
                                <span className={'icon-heart'} />
                            </button> */}
                        </div>
                        <div className={variant.stock > 0 ? classes.addBtn : classes.addBtnDisabled}>
                            <button
                                type="button"
                                onClick={e => props.addToCart(getSelectedVariant(), form.qty)}
                                disabled={!variant.stock}
                            >
                                <i className={'icon-cart'}/>&nbsp;&nbsp;
                                <I18nText keyOfI18n={keyOfI18n.ADD_TO_CART}/>
                            </button>
                        </div>
                    </div>
                    <div className={classes.shares}>
                        <h6>
                            <I18nText keyOfI18n={keyOfI18n.PRODUCT_DETAILS_SHARE_THIS_PRODUCT}/>
                        </h6>
                        <div className={classes.shareIcons}>
                            <SocialIcon
                                type={'whatsapp'}
                                onClick={() => window.open('https://web.whatsapp.com/send?text=' + window.location.href)}
                            />
                            <SocialIcon
                                type={'facebook'}
                                onClick={() => window.open('https://www.facebook.com/sharer/sharer.php?u=' + window.location.href)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveDialog)