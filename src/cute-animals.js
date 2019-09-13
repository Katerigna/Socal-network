import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCuteAnimals } from './actions';

export default function CuteAnimals() {
    const dispatch = useDispatch();
    const cuteAnimals = useSelector(state => state.cuteAnimals);
    useEffect(() => {
        dispatch(getCuteAnimals());
    }, []);

    return (
        <div>
            <h1>cute animals :)</h1>
            { cuteAnimals && cuteAnimals.map((animal, index) => {
                return (
                    <div key={index}>
                        <p>{ animal.name }</p>
                        <p>{ animal.cutenessScore }</p>
                    </div>
                );
            }) }
        </div>
    );
}
