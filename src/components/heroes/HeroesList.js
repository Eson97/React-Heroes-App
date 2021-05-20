import React, { useMemo } from 'react'
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher'
import { HeroCard } from './HeroCard';

export const HeroesList = ({ publisher }) => {

    const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]); //solo se ejecuta si el publisher cambia

    return (
        <div className="row">
            {
                heroes.map(hero => (
                    <div className="col-6 col-md-4 animate__animated animate__fadeIn" key={hero.id}>
                        <HeroCard {...hero} />
                    </div>
                ))
            }
        </div>
    )
}
