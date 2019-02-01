import React from 'react';
import {Grid} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux'
import Header from '../Layout/Body/Header'
import CommentDescription from './Comment&Description/Overview'
import Detail from './Detail'
import {getVariantOptions} from "../../api/ApiUtils"
import LoadingPage from '../Layout/LoadingPage'
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles( theme => {
    console.log(theme);

    return (
        {
            productCategory: {
                backgroundColor: theme.palette.background.paper
            },
            toolBar: {
                backgroundColor: ''
            },
        })

})

const mapStateToProps = state => ({
    products: state.product.products,
    feeds: state.feed.feeds,
    category: state.category.category,
});


const mapDispatchToProps = dispatch => ({}
);

const SingleProduct = props => {
    let hasValidProduct = () => !!props.products.find(n => n.id.toString() === props.match.params.id);
const classes =useStyles()
    if (!props.products) return <LoadingPage/>;
    const product = props.products.find(n => n.id.toString() === props.match.params.id);
    const variantOptions = getVariantOptions(product.variants);


    return <Grid container alignItems={'center'} justify={'center'}>
        <Grid item xs={12}>
            <Header
                title={product.name}
                route={'HOME/SHOP/SINGLE PRODUCT'}
            />
        </Grid>
        <Grid item xs={10}>

            {
                <Detail
                    variantOptions={Object.values(variantOptions)}
                    variantKeys={Object.keys(variantOptions)}
                    description={product.description}
                    product={product}

                />
            }


        </Grid>
        {
            false && <Grid item xs={10} container>

                <CommentDescription
                    content={product.description}
                />
            </Grid>
        }

    </Grid>

};


export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)