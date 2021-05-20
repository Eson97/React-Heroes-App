import { heroes } from "../data/heroes";

export const getHeroesByid = (id) => (
    heroes.find(hero => hero.id === id)
)