import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles';
import withWidth from "@material-ui/core/withWidth/index";
import Input from '../../Widget/Input/original'
import Button from '../../Widget/Button/BlackButton'
import {redirectUrl} from "../../../api/ApiUtils";
import agent from '../../../agent'
import swal from '@sweetalert/with-react'
import {withSnackbar} from 'notistack';
import * as styleGuide from "../../../constants/styleGuide";

const styles = theme => ({
    root: {},
    title: {
        paddingTop: '30px',

        textAlign: 'center',
    },
    innerRoot: {
        padding: '0px 120px 60px 120px ',
        margin: '100px 0px',
        backgroundColor: 'white',
    },
    blueUnderline: {
        cursor: 'pointer',
        textAlign: 'center',
        textDecoration: 'underline',
        color: '#3f51b5',
        transition: 'color 150ms,background-color 150ms',
        fontSize: '15px',


        '&:hover': {
            color: '#6a6561',
        }
    }

})

const mapStateToProps = state => ({
    products: state.product.products,
    viewMode: state.product.viewMode,
    sort: state.product.sort,
});


const mapDispatchToProps = dispatch => ({}
)

class Login extends React.Component {
    login = async () =>
        await  agent.Auth.login({
            email: this.state.email
            , passwd: this.state.pwd
        }).then(
            res => {

                const auth = res.data.data.tokens[0]

                localStorage.setItem('token', auth.token)
                delete auth.token
                localStorage.setItem('user', JSON.stringify(auth))

                swal(
                    {

                        content: (<Grid container alignItems={'center'} direction={'column'}>
                            <Grid item>
                    <span className={'icon-like'}

                          style={{
                              fontSize: '80px',
                              color: 'hsla(100,55%,69%,.5)',
                              padding: '20px',

                              display: 'block',
                              width: '80px',
                              height: '80px',
                              border: '4px solid hsla(98,55%,69%,.2)',
                              borderRadius: '50%',
                              boxSizing: 'content-box',
                          }}
                    />
                            </Grid>
                            <Grid item>
                                <Typography variant={'display1'}>
                                    Welcome back!
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant={'subHeading'}>
                                    {auth.name.nick} </Typography>
                            </Grid>

                        </Grid>)
                    })
                setTimeout(
                    () => redirectUrl('/', this.props.history), 1000
                )
            }
        ).catch(err => {
                err.response.data.messages.map(n =>
                    this.props.enqueueSnackbar(n, styleGuide.errorSnackbar)
                )
                this.setState(
                    {
                        pwd: ''
                    }
                )
            }
        )

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            pwd: ''
        }
    }

    render() {

        const {classes} = this.props
        return (

            <Grid container className={classes.root} direction={'column'} alignItems={'center'}>
                <Grid item container spacing={16} md={8} xs={12} lg={6} direction={'column'}
                      className={classes.innerRoot}>
                    <Grid item>
                        <Typography className={classes.title} variant={'display1'}>
                            Login

                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Input
                            placeholder={'email'}
                            value={this.state.email}
                            onChange={e => this.setState({email: e})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Input
                            type={'password'}
                            placeholder={'password'}
                            value={this.state.pwd}
                            onChange={e => this.setState({pwd: e})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            className={classes.blueUnderline}
                            variant={'title'}>
                            Forgot your password?
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            onClick={this.login}
                            value={'Sign In'}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography
                            onClick={() => redirectUrl('/', this.props.history)}
                            className={classes.blueUnderline} variant={'title'}>
                            Return to Store
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withSnackbar(withWidth()(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login))))