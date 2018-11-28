import React from 'react';
import {connect} from 'react-redux'
import {EDIT_PRODUCT_VIEW_MODE, PRODUCT_EDIT_FILTER, PRODUCT_EDIT_SORT} from "../../constants/actionType";
import {withStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core'
import Header from '../Layout/Body/Header'
import ShoppingCart from './CartTable'
import LoadingPage from '../Layout/LoadingPage'
const styles = theme => ({
    productCategory: {
        backgroundColor: '#F7F7F7',

    },
    toolBar: {
        padding: '10px',
        backgroundColor: theme.palette.background.paper,
    },
    icon: {
        padding: '10px',
        cursor: 'pointer',
        alignItems: 'center',
        border: '1px solid black',

    }, listMode: {
        padding: '20px',
    }
})

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
    }
)

class CartOverview extends React.Component {

    render() {
        if (!(this.props.shoppingCart)) return <LoadingPage/>

        const {classes} = this.props
        return <Grid container justify={'center'}>
            <Grid item sm={12}>
                <Header
                    title={'Shopping Cart'}
                />
            </Grid>
            <Grid item>
                <ShoppingCart/>

            </Grid>
        </Grid>

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CartOverview))