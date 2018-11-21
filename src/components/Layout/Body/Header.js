import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core'
import {withRouter} from "react-router-dom";
import {getRoutePath} from "../../../api/ApiUtils";

const styles = theme => ({

    root: {
        marginBottom: '50px',
        padding: '30px 200px',
        minHeight   : '100px',
        width: '100%',
        background: '#f7f7f7',
    },
    title: {
        textTransform: 'uppercase',
        fontWeight: '700',
    }
    ,
    route: {
        textTransform: 'uppercase',
        '&:hover': {
            color: theme.palette.primary.light,
            cursor: 'pointer',
        }
    }

});

class BodyHeader extends React.Component {


    componentDidMount() {
    }

    render() {
        console.log()
        const {classes, title} = this.props;
        const routePath = getRoutePath(this.props.match.url)
        return <Grid container
                     className={classes.root}
                     direction={'row'}
                     alignItems={'center'}
                     justify={'space-between'}
        >
            <Grid item md={8} xs={12}>
                <Typography variant={'display1'} className={classes.title} color={'primary'}>{title}</Typography>
            </Grid>
            <Grid item md={4} container justify={'flex-end'}>
                {routePath.map(
                    (n, i) =>
                        <Fragment key={i}>
                            <Grid item>
                                <Typography variant={'body2'}
                                            onClick={() => this.props.history.push(n.link)}
                                            className={classes.route} color={'secondary'}>{n.label}</Typography>
                            </Grid>
                            {i !== routePath.length - 1 &&
                            <Grid item>
                                <Typography variant={'body2'}
                                            onClick={() => this.props.history.push(n.link)}
                                            color={'secondary'}>/</Typography> </Grid>
                            }
                        </Fragment>
                )}
            </Grid>
        </Grid>
    }
}

BodyHeader.propTypes = {

    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(BodyHeader))