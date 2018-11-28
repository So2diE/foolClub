import PropTypes from "prop-types";
import React from 'react'
import {CircularProgress, Grid} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        width: '100%',
        padding: '40px',
        marginTop: '30px',
    }
});


class NotFound extends React.Component {
    render() {
        const {classes, msg} = this.props;
        return (
            <Grid container justify={'center'} alignItems={'center'} className={classes.root}>
                <CircularProgress size={100}/>

            </Grid>);
    }
}

NotFound.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotFound)