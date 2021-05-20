import React, { useMemo } from 'react';
import queryString from 'query-string';

import { useLocation } from 'react-router';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {


    const location = useLocation();
    const { q: query = '' } = queryString.parse(location.search);

    const [formValues, handleInputChange, reset] = useForm({ inputSearch: query });
    const { inputSearch } = formValues;

    const heroesFiltered = useMemo(() => getHeroesByName(query), [query]);

    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${inputSearch}`);
        reset();
    }

    return (
        <div>
            <form onSubmit={handleSearch}>
                <div className="input-group mb-3" style={{ maxWidth: 520 }}>
                    <input
                        type="text"
                        className="form-control"
                        autoComplete="off"
                        name="inputSearch"
                        value={inputSearch}
                        onChange={handleInputChange}
                        placeholder="Find your Hero!!"
                    />
                    <button className="btn btn-outline-secondary" type="submit">Search...</button>
                </div>
            </form>
            <hr />

            {
                ((query !== '') && heroesFiltered.length === 0) &&
                <div className="alert alert-danger">Hero not found!</div>
            }

            <div className="row">
                {
                    heroesFiltered.map(hero => (
                        <div className="col-6 col-md-4 animate__animated animate__fadeIn" key={hero.id}>
                            <HeroCard {...hero} />
                        </div>
                    ))
                }
            </div>

        </div>
    )
}
