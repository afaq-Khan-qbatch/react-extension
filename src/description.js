import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDescription } from './reducer/data';

const Description = () => {
    const { Description } = useSelector((state) => state.items_reducer);
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        dispatch(getDescription(id));
    }, [])
    return (
        <>
            <img src={Description.image} alt={Description.name} width="100" height="100" className='center' />
            <h2>{Description.description}</h2>

        </>
    )
}

export default Description;