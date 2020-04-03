import React, {useEffect, useRef} from 'react';
import {createUseStyles} from 'react-jss';
import {connect} from 'react-redux';

import NumberFormat from 'react-number-format';
import _ from 'lodash';
import classNames from 'classnames';

import Header from '../Layout/Body/Header'

import {EDIT_PRODUCT_VIEW_MODE, PRODUCT_EDIT_FILTER, PRODUCT_EDIT_SORT} from "../../constants/actionType";
import LoadingPage from '../Layout/LoadingPage'

import {
    getTagsCountsArray,
    redirectUrl,
} from "../../api/ApiUtils";

import PopUp from '../Widget/PopUp'
import {keyOfI18n} from "../../constants/locale/interface";
import {I18nText} from "../Widget/I18nText";

const filterOptions = [<I18nText keyOfI18n={keyOfI18n.SHOP_SORT_NAME_ASC}/>,
    <I18nText keyOfI18n={keyOfI18n.SHOP_SORT_NAME_DES}/>, <I18nText keyOfI18n={keyOfI18n.SHOP_SORT_PRICE_ASC}/>,
    <I18nText keyOfI18n={keyOfI18n.SHOP_SORT_PRICE_DES}/>];


const styles = createUseStyles({
    wrapper: {
        display: 'flex',
        padding: '0 9%'
    },


    menu: {
        width: '25%'
    },
    menuHead: {
        display: 'flex'
    },
    menuTitle: {
        flex: 1,
        fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif',
        fontSize: 19,
        fontWeight: 400,
        padding: 0,
        marginTop: 0,
        backgroundColor: 'transparent'
    },
    menuItem: {
        width: '100%',
        color: '#000',
        listStyle: 'none',
        borderBottom: '1px solid rgb(169, 169, 169)',
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        textTransform: 'uppercase',
        backgroundColor: 'transparent',
        margin: 0,
        cursor: 'pointer',
        padding: 10,
        textAlign: 'left',
        fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif',
        fontSize: 14,
        '&:hover': {
            backgroundColor: '#f4f4f4'
        }
    },
    menuTool: {
        display: 'none',
        transform: 'rotate(90deg)',
        padding: 0,
        margin: '-18px 18px 0 0',
        borderWidth: 0,
        width: 25,
        height: 60,
        cursor: 'pointer',
        backgroundColor: 'transparent'
    },
    opened: {
        transform: 'rotate(90deg) !important'
    },
    categoryList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        '& > li:first-child > button': {
            borderTop: '1px solid rgb(169, 169, 169)'
        }
    },


    list: {
        width: 'calc(75% - 35px)',
        marginLeft: 35
    },
    topbar: {
        display: 'flex',
        borderTop: '1px solid rgb(169, 169, 169)',
        borderBottom: '1px solid rgb(169, 169, 169)',
        padding: '5px 0',
        alignItems: 'center',
        '& > div': {
            flex: 1
        },
        '& > div:nth-child(2)': {
            flex: 2.5
        }
    },
    modes: {
        '& > button': {
            marginLeft: 5,
            border: '1px solid #eee',
            backgroundColor: 'transparent',
            border : "none"
        },
        '& > button:first-child': {
            marginLeft: 0
        }
    },
    icon: {
        padding: 10,
        cursor: 'pointer',
        alignItems: 'center',
        border: '1px solid black',
    },
    status: {
        fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif',
        textAlign: 'center',
        //textTransform: 'uppercase'
    },
    sort: {
        fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif',
        textAlign: 'right',
        //textTransform: 'uppercase'
    },
    context: {
        display: 'flex',
        flexWrap: 'wrap'
    },


    // ------------------ Items
    item: {
        display : 'flex',
        flexDirection : "column",
        width: 'calc(33.3% - 50px)',
        backgroundColor: 'transparent',
        flexBasis: 'auto',
        margin: 25,
        padding: '10px 15px',
        cursor: 'pointer',
        border: 'none',
        transition : "opacity 0.3s",
        '&:hover': {
            opacity : 0.6
        }
    },
    media: {
        marginBottom: 15,
        height : 180,
        '& > img': {
            width: '100%',
            height : "100%",
            objectFit : "cover"
        }
    },
    name: {
        textAlign : "left",
        margin: '3px 0px 10px 0px',
        padding: 0,
        fontSize : 18,
        color : "#333"
    },
    price: {
        textAlign : "left",
        color : "#333"
    },
    tags: {
        padding : "10px 0px",
        textAlign : 'left',
        fontSize: 10,
        color: '#666',
        wordBreak: 'break-word',
        textTransform : 'uppercase',
    },


    rowItem: {
        display : 'flex',
        flexDirection : "row",
        width: 'calc(100% - 50px)',
        backgroundColor: 'transparent',
        flexBasis: 'auto',
        margin: 25,
        flexWrap : 'wrap',
        padding: '10px 15px',
        cursor: 'pointer',
        border: 'none',
        transition : "opacity 0.3s",
        '&:hover': {
            opacity : 0.6
        }
    },
    rowItemInfo : {
        display : 'flex',
        flexDirection : 'column',
        padding : 10,
        flexWrap : 'wrap',
        minWidth : 200,
        flex : 1,
        alignItems : "flex-start",
        justifyContent : "center"
    },
    rowItemMedia: {
        flex : 1,
        marginBottom: 15,
        height : 180,
        '& > img': {
            width: '100%',
            height : "100%",
            objectFit : "cover"
        }
    },
    rowItemName: {
        textAlign : "left",
        margin: '3px 0px 5px 0px',
        padding: 0,
        fontSize : 18,
        color : "#333"
    },
    rowItemDescription : {
        textAlign : "left",
        color : "#666",
        fontSize : 13
    },
    rowItemPrice: {
        textAlign : "left",
        margin: '3px 0px 5px 0px',
        color : "#333"
    },




    // for mobile
    '@media (max-width: 600px)': {
        wrapper: {
            display: 'block',
            padding: '0 5%'
        },
        menu: {
            width: '100%'
        },
        list: {
            width: '100%',
            marginLeft: 0
        },

        topbar: {
            display: 'none'
        },

        categoryList: {
            display: 'none',
            marginBottom: 20
        },

        menuTool: {
            display: 'block',
            transform: 'rotate(270deg)',
            paddingTop: 45
        },

        item: {
            width: 'calc(100% - 50px)'
        },
        name: {
            fontSize: 14
        },

        rowItem : {
            alignItems : 'center',
            justifyContent : 'center'
        },
        rowItemDescription : {
            display : 'none'
        }
    }
});


const mapStateToProps = state => ({
    products: state.product.products,
    viewMode: state.product.viewMode,
    sort: state.product.sort,
    filter: state.product.filter,
});


const mapDispatchToProps = dispatch => ({

    changeViewMode: (mode) =>
        dispatch({
                type: EDIT_PRODUCT_VIEW_MODE,
                payload: mode,
            }
        )
    ,
    editProductSort: (key, value) => dispatch({
        type: PRODUCT_EDIT_SORT,
        payload: {
            key: key,
            value: value,
        },
    }),
    editProductFilter: (key, value) => dispatch({
        type: PRODUCT_EDIT_FILTER,
        payload: {
            key: key,
            value: value,
        },
    }),
});


const ShopOverview = props => {
    console.log("=====> props.viewMode", props.viewMode);
    const classes = styles();
    const products = props.products;


    // ----------------------------------------------------------------  Menu ----------------------------------------------------------------
    const renderMenu = () => <div className={classes.menu}>
        <div>
            <div className={classes.menuHead}>
                <h3 className={classes.menuTitle}>
                    <I18nText keyOfI18n={keyOfI18n.FEED_CATEGORY}/>
                </h3>
                <button
                    type="button"
                    className={classNames(classes.menuTool, 'icon-play3')}
                    onClick={e => {
                        const btn = e.target;
                        const categoryList = btn.parentNode.nextSibling;
                        const value = window.getComputedStyle(categoryList).getPropertyValue('display') == 'none' ? 'block' : 'none';
                        categoryList.style.display = value;
                        btn.classList[{
                            none: 'remove',
                            block: 'add'
                        }[value]](classes.opened);
                        btn.style['padding' + {
                            none: 'Top',
                            block: 'Bottom'
                        }[value]] = '45px';
                        btn.style['padding' + {
                            none: 'Bottom',
                            block: 'Top'
                        }[value]] = 0;
                    }}
                ></button>
            </div>
            <ul className={classes.categoryList}>
                {getTagsCountsArray(products, tag => props.editProductFilter('tag', tag)).map((t, i) => <li key={i}>
                    <button
                        type="button"
                        className={classes.menuItem}
                    >{t.label}</button>
                </li>)}
            </ul>
        </div>
    </div>;
    // ----------------------------------------------------------------  /Menu ----------------------------------------------------------------


    // ----------------------------------------------------------------  Product List ----------------------------------------------------------------
    const renderProductList = () => <div className={classes.list}>
        {/* ------------------ Top bar ------------------ */}
        <div className={classes.topbar}>
            <div className={classes.modes}>
                <button
                    type="button"
                    onClick={() => props.changeViewMode('form')}
                    className={classNames(classes.icon, 'icon-table')}
                />
                <button
                    type="button"
                    onClick={() => props.changeViewMode('list')}
                    className={classNames('icon-list', classes.icon)}
                />
            </div>
            <div className={classes.status}>
                <I18nText keyOfI18n={keyOfI18n.ITEMS}/>&nbsp;
                <I18nText keyOfI18n={keyOfI18n.OF}/>
            </div>
            <div className={classes.sort}>
                <I18nText keyOfI18n={keyOfI18n.SORT_BY}/>
            </div>
        </div>
        {/* ------------------ /Top bar ------------------ */}


        {/* ------------------ product list ------------------ */}
        <div className={classes.context}>
            {/^form$/.test(props.viewMode) ? renderProductGrids() : renderProductRows()}
        </div>
        {/* ------------------ /product list ------------------ */}
    </div>;

    

    const renderProductRows = function(){
        // not finish loading yet
        if(products == undefined){
            return <LoadingPage/>;
        } else 
        // render product
        {
            return products.map((n, i) => {
                const media = (n.media || []).filter(m => /^(jpe?g|png|gif|bmp|mp4|qt|mov)$/i.test(m.ext));
                const variants = n.variants || [];
                const prices = [n.price].concat(n.variants.map(v => v.price)).filter((p, i, a) => a.indexOf(p) == i).sort((a, b) => a - b);
                
                return <button
                    key={i}
                    type="button"
                    className={classes.rowItem}
                    onClick={() => redirectUrl('/products/' + n.id, props.history)}
                >
                    <div className={classes.media}>
                        <img src={(function(){
                            // preset thumbnail url
                            var thumbnail = '/notFound/not-found-image.jpg';
                            // has media?
                            if(media.length && media[0].url){
                                thumbnail = media[0].url.replace('.cloud/','.cloud/380xAUTO/');
                            } else {
                                // get from variants
                                variants.forEach(v => {
                                    if(v.media.length > 0 && thumbnail == '/notFound/not-found-image.jpg'){
                                        thumbnail = v.media[0].url;
                                    }
                                });
                            }
                            return thumbnail;
                        })()} width="100%"/>
                    </div>
                    <div className={classes.rowItemInfo}>
                        <div className={classes.rowItemName}>
                            {n.name}
                        </div>
                        <div className={classes.rowItemPrice}>
                            {(function(){
                                if(prices.length > 1){
                                    return (
                                        <span>
                                            <NumberFormat
                                                value={prices[0]}
                                                thousandSeparator={true}
                                                prefix={'HK$'}
                                                displayType={'text'}
                                                renderText={v => v}
                                            /> -&nbsp;
                                            <NumberFormat
                                                value={prices[prices.length - 1]}
                                                thousandSeparator={true}
                                                prefix={'HK$'}
                                                displayType={'text'}
                                                renderText={v => v}
                                            />
                                        </span>
                                    );
                                } else {
                                    return <span>
                                        <NumberFormat
                                            value={prices[0]}
                                            thousandSeparator={true}
                                            prefix={'HK$'}
                                            displayType={'text'}
                                            renderText={v => v}
                                        />
                                    </span>
                                }
                            })()}
                        </div>
                        <div className={classes.rowItemDescription}>
                            {(function(){
                                return  (n.description || "").length > 80 ? n.description.substr(0,100) + "..." : n.description;
                            })()}
                        </div>
                        {n.tags.length ? <div className={classes.tags}>#{n.tags.join(' #')}</div> : null}
                    </div>
                </button>;
            });
        }
    };



    const renderProductGrids = function(){
        // not finish loading yet
        if(products == undefined){
            return <LoadingPage/>;
        } else 
        // render product
        {
            return products.map((n, i) => {
                const media = (n.media || []).filter(m => /^(jpe?g|png|gif|bmp|mp4|qt|mov)$/i.test(m.ext));
                const variants = n.variants || [];
                const prices = [n.price].concat(n.variants.map(v => v.price)).filter((p, i, a) => a.indexOf(p) == i).sort((a, b) => a - b);
                
                return <button
                    key={i}
                    type="button"
                    className={classes.item}
                    onClick={() => redirectUrl('/products/' + n.id, props.history)}
                >
                    <div className={classes.media}>
                        <img src={(function(){
                            // preset thumbnail url
                            var thumbnail = '/notFound/not-found-image.jpg';
                            // has media?
                            if(media.length && media[0].url){
                                thumbnail = media[0].url.replace('.cloud/','.cloud/380xAUTO/');
                            } else {
                                // get from variants
                                variants.forEach(v => {
                                    if(v.media.length > 0 && thumbnail == '/notFound/not-found-image.jpg'){
                                        thumbnail = v.media[0].url;
                                    }
                                });
                            }
                            return thumbnail;
                        })()} width="100%"/>
                    </div>
                    <div className={classes.name}>
                        {n.name}
                    </div>
                    <div className={classes.price}>
                        {(function(){
                            if(prices.length > 1){
                                return (
                                    <span>
                                        <NumberFormat
                                            value={prices[0]}
                                            thousandSeparator={true}
                                            prefix={'HK$'}
                                            displayType={'text'}
                                            renderText={v => v}
                                        /> -&nbsp;
                                        <NumberFormat
                                            value={prices[prices.length - 1]}
                                            thousandSeparator={true}
                                            prefix={'HK$'}
                                            displayType={'text'}
                                            renderText={v => v}
                                        />
                                    </span>
                                );
                            } else {
                                return <span>
                                    <NumberFormat
                                        value={prices[0]}
                                        thousandSeparator={true}
                                        prefix={'HK$'}
                                        displayType={'text'}
                                        renderText={v => v}
                                    />
                                </span>
                            }
                        })()}
                    </div>
                    {n.tags.length ? <div className={classes.tags}>#{n.tags.join(' #')}</div> : null}
                </button>;
            });
        }
    };



    // ----------------------------------------------------------------  Product List ----------------------------------------------------------------



    


    return <div>
        <Header
            title={<I18nText keyOfI18n={keyOfI18n.SHOP}/>}
            route={'home/shop'}
        />
        <div className={classes.wrapper}>
            {renderMenu()}
            {renderProductList()}
        </div>
    </div>;
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopOverview)