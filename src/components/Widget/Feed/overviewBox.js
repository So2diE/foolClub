import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import moment from 'moment'
import {withStyles} from "@material-ui/core/styles/index";
import Button from '../Button'

const styles = theme => ({

    root: {
        maxHeight: '540px',
        minHeight: '540px',
        border: '1px solid ' + theme.palette.secondary.light,
        overflow: 'auto',
    },

    img: {
        width: '100%',
        height: '255px !important',
    },
    content: {
    },

})


class ResponsiveDialog extends React.Component {

    styles = theme => ({
        content: {
            "padding": this.props.padding,
            "min-height": "100vh",
            "background-color": this.props.backgroundColor
        }
    })
    handleClickOpen = () => {
        this.setState({open: true});
    };
    handleClose = () => {

        this.setState({open: false});
    };

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            open: false,
        }
    }

    render() {
        const {
            classes,
            src,
            subTitle,
            title,
            id, author,
            postDate,
            comments,
        } = this.props;
        console.log(this.props)
        return (
            <Grid container className={classes.root} alignItems={'center'} direction={'column'}>
                <Grid item xs={12}>
                    <img src={src} className={classes.img}/></Grid>
                <Grid item direction={'column'} container xs={12} md={11} className={classes.content}>
                    <Grid item>
                        <Typography variant={'headline'} color={'primary'}>{title}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={'caption'}>
                            {'By ' + author + ' / ' + moment(postDate).format('ll') + ' / ' + comments + ' comments'}</Typography>
                    </Grid>
                    <Grid item>

                        <Typography variant={'body1'}
                                    color={'secondary'}>{subTitle}{subTitle}{subTitle}{subTitle}</Typography>
                    </Grid>
                    <Grid item>

                        <Button
                            link={'/feed/' + id}
                            value={'Continue Reading'}

                        />

                    </Grid>

                </Grid>

            </Grid>
        );
    }

}


export default withStyles(styles)(ResponsiveDialog)