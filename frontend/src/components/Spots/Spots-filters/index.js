import { NavLink } from 'react-router-dom';
import './spot-filters.css'


export default function SpotsFilters() {
    return (
        <div className="main-filter">
            <div className="filter-list">
                <div>

                    <NavLink className="filter-nav" to='/404' style={{ textDecoration: 'none', color: '#5a5a5a' }}>
                        <li>
                            <i class="fa-regular fa-face-surprise main-icon fa-xl"></i>
                            <div>
                                New
                            </div>
                            <hr></hr>
                        </li>
                    </NavLink>
                </div>
                <div>

                    <NavLink className="filter-nav" to='/404' style={{ textDecoration: 'none', color: '#5a5a5a' }}>
                        <li>
                            <i class="fa-solid fa-earth-americas main-icon fa-xl"></i>
                            <div>
                                Top of the world
                            </div>
                            <hr></hr>
                        </li>
                    </NavLink>
                </div>
                <div>

                    <NavLink className="filter-nav" to='/404' style={{ textDecoration: 'none', color: '#5a5a5a' }}>
                        <li>
                            <i class="fa-solid fa-arrow-trend-up main-icon fa-xl"></i>
                            <div>
                                Trending
                            </div>
                            <hr></hr>
                        </li>
                    </NavLink>
                </div>
                <div>

                    <NavLink className="filter-nav" to='/404' style={{ textDecoration: 'none', color: '#5a5a5a' }}>
                        <li>
                            <i class="fa-solid fa-wheelchair-move main-icon fa-xl"></i>
                            <div>
                                Adapted
                            </div>
                            <hr></hr>
                        </li>
                    </NavLink>
                </div>
                <div>

                    <NavLink className="filter-nav" to='/404' style={{ textDecoration: 'none', color: '#5a5a5a' }}>
                        <li>
                            <i class="fa-solid fa-umbrella-beach fa-xl main-icon" ></i>
                            <div>
                                Beach
                            </div>
                            <hr></hr>
                        </li>
                    </NavLink>

                </div>
                <div>

                    <NavLink className="filter-nav" to='/404' style={{ textDecoration: 'none', color: '#5a5a5a' }}>
                        <li>
                            <i class="fa-solid fa-gamepad fa-xl main-icon" ></i>
                            <div>
                                Game
                            </div>
                            <hr></hr>
                        </li>
                    </NavLink>

                </div>
                <div>

                    <NavLink className="filter-nav" to='/404' style={{ textDecoration: 'none', color: '#5a5a5a' }}>
                        <li>
                            <i class="fa-solid fa-umbrella-beach fa-xl main-icon" ></i>
                            <div>
                                Beach
                            </div>
                            <hr></hr>
                        </li>
                    </NavLink>

                </div>
                <div>

                    <NavLink className="filter-nav" to='/404' style={{ textDecoration: 'none', color: '#5a5a5a' }}>
                        <li>
                            <i class="fa-solid fa-umbrella-beach fa-xl main-icon" ></i>
                            <div>
                                Beach
                            </div>
                            <hr></hr>
                        </li>
                    </NavLink>

                </div>
                <div>

                    <NavLink className="filter-nav" to='/404' style={{ textDecoration: 'none', color: '#5a5a5a' }}>
                        <li>
                            <i class="fa-solid fa-umbrella-beach fa-xl main-icon" ></i>
                            <div>
                                Beach
                            </div>
                            <hr></hr>
                        </li>
                    </NavLink>

                </div>
                <div>

                    <NavLink className="filter-nav" to='/404' style={{ textDecoration: 'none', color: '#5a5a5a' }}>
                        <li>
                            <i class="fa-solid fa-umbrella-beach fa-xl main-icon" ></i>
                            <div>
                                Beach
                            </div>
                            <hr></hr>
                        </li>
                    </NavLink>

                </div>
            </div>
        </div>
    )
}
