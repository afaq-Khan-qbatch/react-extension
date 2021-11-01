import React from 'react';
import { NavLink } from "react-router-dom";
import { Button, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
import { useDispatch, useSelector } from "react-redux";
import { get_cart, clearState } from "./reducer/cartReducer";
import { getCookie, setCookie } from './cookie';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    grid: {
        width: '100%',
        margin: '0px',
        position: 'fixed'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'right',
        color: theme.palette.text.primary,
        background: 'lightblue',
    }
}))

const NavBar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { count } = useSelector((store) => store.cart_Reducer);
    const history = useHistory();

    const token = getCookie('token');

    const get_cart_item = () => {
        dispatch(get_cart());
    }

    const logOut = () => {
        setCookie('token', '');
        dispatch(clearState());
    }

    return (
        <Grid container item xs={12} lg={12} md={12} className={classes.Grid} style={{ marginBottom: '8px' }}>
            <Grid item xs={12} sm={12} lg={12} md={12} >
                <Paper className={classes.paper}>
                    <NavLink style={{ textDecoration: 'none' }} to='/'>
                        <Button variant="contained" color="secondary">
                            Products
                        </Button>
                    </NavLink> &nbsp; &nbsp; &nbsp; &nbsp;
                    <NavLink style={{ textDecoration: 'none' }} to='/cart' onClick={(e) => { get_cart_item() }}>
                        <Badge color="secondary" badgeContent={count} max={999}>
                            <AddShoppingCartIcon />
                        </Badge> &nbsp; &nbsp; &nbsp; &nbsp;
                    </NavLink>

                    {token.length < 12 ? <>
                        <NavLink style={{ textDecoration: 'none' }} to='/signup'>
                            <Button variant="contained" color="secondary">
                                SignUp
                            </Button>
                        </NavLink> &nbsp; &nbsp; &nbsp; &nbsp;
                        <NavLink style={{ textDecoration: 'none' }} to='/signin' >
                            <Button variant="contained" color="primary" onClick={() => history.push('/signin')}>
                                SignIn
                            </Button>
                        </NavLink> </> : <NavLink style={{ textDecoration: 'none' }} to='/' onClick={(e) => { logOut() }}>
                        <Button variant="contained" color="secondary">
                            LogOut
                        </Button>
                    </NavLink>}
                </Paper>
            </Grid>
        </Grid>
    )
}

export default NavBar;