import React, {Fragment, useContext, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/styles';
import {reducer} from "../../../context";
import {UserProfile} from "../../../interfaces/server/Auth";
import {Grid, Typography} from "@material-ui/core";
import InputBar from '../../Widget/InputBarWithTitle'
import Button from "@material-ui/core/Button";
import agent from "../../../agent";
import Header from "../../Layout/Body/Header";

const useStyles = makeStyles(theme => ({
    root: {
        width: '90%',
    },

}));

function ConfirmAddress() {
    const classes = useStyles();
    const {authReducer} = useContext(reducer);
    const user = authReducer.state.user as UserProfile;
    const profile = user.consumers[0];
    const [company, setCompany] = useState(profile.company);
    const [email, setEmail] = useState(profile.email);
    const [phone, setPhone] = useState(profile.phone);
    const [name, setName] = useState(profile.name);
    const [edit, setEdit] = useState(true);
    const [invoiceAddress, setInvoiceAddress] = useState(profile.invoiceAddress);
    const [deliveryAddress, setDeliveryAddress] = useState(profile.deliveryAddress);

    const data = [
        {
            value: name,
            title: '聯絡人',

            onClick: (e: string) => setName(e),
        },
        {
            title: '公司',
            value: company,
            onClick: (e: string) => setCompany(e),
        }, {
            value: phone,
            title: '電話',

            onClick: (e: string) => setPhone(e),
        }, {
            value: email,
            title: 'Email',

            onClick: (e: string) => setEmail(e),
        }, {
            value: invoiceAddress,
            title: '發票地址',

            onClick: (e: string) => setInvoiceAddress(e),
        }, {
            value: deliveryAddress,
            title: '郵寄地址',

            onClick: (e: string) => setDeliveryAddress(e),
        },
    ];
    useEffect(
        () => {
            agent.Auth.assignProperty(
                {
                    company: company,
                    email: email,
                    phone: phone,
                    name: name,
                    deliveryAddress: deliveryAddress,
                    invoiceAddress: invoiceAddress,
                }
            )
        }, [edit]
    );
    return (

        <Grid container>
            <Header title={'我的資料'}/>
            <Grid item xs={1}/>
            <Grid item xs={11} md={6}>
                {
                    data.map(
                        (n, i) => <Fragment key={i}>
                            {edit ? <Typography variant={"subtitle1"}>
                                    {`${n.title}: ${n.value} `}
                                </Typography> :
                                <InputBar title={n.title} value={n.value} onChange={n.onClick}/>}</Fragment>)
                }
                <Button
                    variant={"outlined"}
                    color={edit ? "secondary" : "primary"}
                    onClick={() => setEdit(!edit)}
                >
                    {edit ? '編輯' : '確認'}
                </Button>
            </Grid>
        </Grid>


    );
}

export default ConfirmAddress;