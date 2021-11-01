import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import { updateQty } from "./reducer/updateQtyReducer";
import { setCount, get_cart, delete_cart } from "./reducer/cartReducer";
import { getCookie, setCookie } from './cookie';

const useStyles = makeStyles((theme) => ({
    grid: {
        width: '100%',
        margin: '0px'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        background: theme.palette.success.light,
    }
}
));

const Cart = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { updateFlag } = useSelector((store) => store.update_Reducer);
    const { cart_item } = useSelector((store) => store.cart_Reducer);

    const del_item = (i, q) => {
        dispatch(delete_cart(i));
        dispatch(setCount(-1 * q));
    }

    const changeQty = (id, e) => {

        const values = {
            quantity: e.target.value,
            _id: id
        }

        dispatch(updateQty(values));
    }

    useEffect(() => {
        if (updateFlag) {
            dispatch(get_cart());
        }
    }, [updateFlag])
    return (
        <Grid container spacing={2} className={classes.Grid}>
            {cart_item && cart_item.map((item, i) => {
                return (
                    <>
                        <Grid key={i} item xs={6} md={3}>
                            <Paper className={classes.paper}>
                                <span>{item.name}</span>
                            </Paper>
                        </Grid>
                        <Grid key={i + 1} item xs={6} md={3}>
                            <Paper className={classes.paper}>
                                <input type="number" min="1" onChange={(e) => { changeQty(item._id, e) }} value={item.quantity} />
                            </Paper>
                        </Grid>
                        <Grid key={i + 2} item xs={6} md={3}>
                            <Paper className={classes.paper}>
                                <label>{item.price}</label>
                                <span>$</span>

                            </Paper>
                        </Grid>
                        <Grid key={i + 3} item xs={6} md={3}>
                            <Paper className={classes.paper}>
                                <input type="button" value="Remove" onClick={(e) => { del_item(item._id, item.quantity) }} />
                            </Paper>
                        </Grid>

                    </>
                )
            })}


        </Grid>
    )
}

export default Cart;
