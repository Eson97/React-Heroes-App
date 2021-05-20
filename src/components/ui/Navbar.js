import React, { useContext } from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../../auth/AuthContext'
import { types } from '../../types/types';

export const Navbar = () => {

    const { user: { name }, dispatch } = useContext(AuthContext);
    const history = useHistory();

    const handleLogout = () => {
        dispatch({ type: types.logout });

        history.replace('/login');
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="container-fluid">

                <Link
                    className="navbar-brand"
                    to="/"
                >
                    Heroes-App
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown, #logout" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <div className="navbar-nav">

                        <NavLink
                            activeClassName="active"
                            className="nav-item nav-link"
                            exact
                            to="/marvel"
                        >
                            Marvel
                        </NavLink>

                        <NavLink
                            activeClassName="active"
                            className="nav-item nav-link"
                            exact
                            to="/dc"
                        >
                            DC
                        </NavLink>

                        <NavLink
                            activeClassName="active"
                            className="nav-item nav-link"
                            exact
                            to="/search"
                        >
                            Search
                        </NavLink>
                    </div>
                </div>

                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2" id="logout">
                    <ul className="navbar-nav ms-auto">
                        <span className="nav-item nav-link text-info text-center">
                            {name}
                        </span>
                        <button className="nav-item nav-link btn" onClick={handleLogout} id="logoutBtn">
                            Logout
                       </button>
                    </ul>
                </div>
            </div>
        </nav>
    )
}