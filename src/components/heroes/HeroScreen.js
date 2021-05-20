import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router'
import { heroesImages } from '../../helpers/heroesImages';
import { getHeroesByid } from '../../selectors/getHeroById';

export const HeroScreen = ({ history }) => {

    const { heroeId } = useParams(); //obtiene los argumentos del url

    const hero = useMemo(() => getHeroesByid(heroeId), [heroeId]);

    if (!hero) return <Redirect to="/" />

    const { superhero, publisher, alter_ego, first_appearance, characters } = hero

    const handleReturn = () => {
        (hero.publisher === 'DC Comics')
            ? history.push('/dc')
            : history.push('/marvel')
    }

    return (
        <div className="row mt-5 justify-content-center animate__animated animate__fadeInRight">
            <div className="col-4 ">
                <img
                    className="img-thumbnail"
                    // src={`../assets/heroes/${heroeId}.jpg`} //Obtener imagenes desde la carpeta 'Public'
                    src={heroesImages(`./${heroeId}.jpg`).default} //Obtiene imagenes desde src (.default es necesario para mostrar imagen)
                    alt={superhero}
                />
            </div>

            <div className="w-100 d-sm-none"></div>

            <div className="col-8 mt-3">
                <h3>{superhero}</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Alter ego: </b>{alter_ego}</li>
                    <li className="list-group-item"><b>Publisher: </b>{publisher}</li>
                    <li className="list-group-item"><b>First Appearance: </b>{first_appearance}</li>
                </ul>
                <h5 className="mt-3">Characters</h5>
                <p>{characters}</p>

                <div className="d-grid gap-2 btn-lg d-md-block">
                    <button className="btn btn-outline-info" onClick={handleReturn}>
                        {
                            (hero.publisher === 'DC Comics')
                                ? "Go to DC Comics"
                                : "Go to Marvel Comics"
                        }
                    </button>
                </div>
            </div>


        </div>
    )
}
