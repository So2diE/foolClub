import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {Theme, withStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core'
import {RouteComponentProps, withRouter} from "react-router-dom";
import {getRoutePath, redirectUrl} from "../../../api/ApiUtils";

import {makeStyles, useTheme} from "@material-ui/styles";
import withWidth, {isWidthUp} from "@material-ui/core/withWidth/index";
import {Breakpoint} from "@material-ui/core/styles/createBreakpoints";
import {unstable_useMediaQuery as useMediaQuery} from "@material-ui/core/useMediaQuery";
import {breakpoints} from "../../../constants/enum";

const useStyles =makeStyles( (theme:Theme) => ({

    root: {
        marginBottom: '50px',
        minHeight: '100px',
        width: '100%',
        background: '#f7f7f7',
    },
    title: {
        textTransform: 'uppercase',
        fontWeight: 700,
    }
    ,
    route: {
        textTransform: 'uppercase',
        '&:hover': {
            color: theme.palette.primary.light,
            cursor: 'pointer',
        }
    }

}))

interface Props extends RouteComponentProps{
    title?:string
}

const BodyHeader:React.FunctionComponent<Props> = (props) => {

const classes = useStyles()
    const { title, history, match} = props;
    const routePath = getRoutePath(match.url);
    const theme: Theme = useTheme()
    const isWidthUp = (breakpoint: Breakpoint): boolean => useMediaQuery(theme.breakpoints.up(breakpoint))

    return <Grid container
                 className={classes.root}
                 direction={'row'}
                 alignItems={'center'}
                 justify={'center'}
    >
        <Grid item md={2}/>
        <Grid item md={5} xs={12} container justify={isWidthUp(breakpoints.md) ? 'flex-start' : 'center'}>
            <Typography variant={'h4'} className={classes.title} color={'primary'}>{title}</Typography>
        </Grid>
        <Grid item md={3} xs={11} container justify={isWidthUp(breakpoints.md) ? 'flex-end' : 'center'}>
            {routePath.map((n, i) => <Fragment key={i}>
                <Grid item>
                    <Typography variant={'body1'}
                                onClick={() => redirectUrl(n.link, history)}
                                className={classes.route} color={'secondary'}>{n.label}</Typography>
                </Grid>
                {i !== routePath.length - 1 &&
                <Grid item>
                    <Typography variant={'body1'}
                                onClick={() => redirectUrl(n.link, history)}
                                color={'secondary'}>/</Typography> </Grid>
                }
            </Fragment>)}
        </Grid>
        <Grid item md={2}/>
    </Grid>
};


export default withWidth()(withRouter(BodyHeader))