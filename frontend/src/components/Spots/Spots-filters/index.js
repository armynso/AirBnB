import { NavLink } from 'react-router-dom';
import './spot-filters.css'


export default function SpotsFilters() {
    return (
        <div className="main-filter">
            <div></div>
            <div className="filter-list">
                <div>

                    <NavLink className="filter-nav" to='/404' style={{ textDecoration: 'none', color: '#7a7a7a' }}>
                        <li>
                            <i class="fa-solid fa-wand-magic-sparkles main-icon fa-xl"></i>
                            <div>
                                New
                            </div>
                            <hr></hr>
                        </li>
                    </NavLink>
                </div>
                <div>

                    <NavLink className="filter-nav" to='/404' style={{ textDecoration: 'none', color: '#7a7a7a' }}>
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

                    <NavLink className="filter-nav" to='/404' style={{ textDecoration: 'none', color: '#7a7a7a' }}>
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

                    <NavLink className="filter-nav" to='/404' style={{ textDecoration: 'none', color: '#7a7a7a' }}>
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

                    <NavLink className="filter-nav" to='/404' style={{ textDecoration: 'none', color: '#7a7a7a' }}>
                        <li>
                            <i class="fa-solid fa-umbrella-beach fa-xl main-icon" ></i>
                            <div>
                                Beachfront
                            </div>
                            <hr></hr>
                        </li>
                    </NavLink>

                </div>
                <div>

                    <NavLink className="filter-nav" to='/404' style={{ textDecoration: 'none', color: '#7a7a7a' }}>
                        <li>
                            <i class="fa-solid fa-gamepad fa-xl main-icon" ></i>
                            <div>
                                Play
                            </div>
                            <hr></hr>
                        </li>
                    </NavLink>

                </div>
                <div>

                    <NavLink className="filter-nav" to='/404' style={{ textDecoration: 'none', color: '#7a7a7a' }}>
                        <li>
                            <i class="fa-solid fa-vihara fa-xl main-icon" ></i>
                            <div>
                                Vihara
                            </div>
                            <hr></hr>
                        </li>
                    </NavLink>

                </div>
                <div>

                    <NavLink className="filter-nav" to='/404' style={{ textDecoration: 'none', color: '#7a7a7a' }}>
                        <li>
                            <i class="fa-solid fa-gopuram fa-xl main-icon" ></i>
                            <div>
                                Temples
                            </div>
                            <hr></hr>
                        </li>
                    </NavLink>

                </div>
                <div>

                    <NavLink className="filter-nav" to='/404' style={{ textDecoration: 'none', color: '#7a7a7a' }}>
                        <li>
                            <i class="fa-solid fa-tree fa-xl main-icon" ></i>
                            <div>
                                Treehouses
                            </div>
                            <hr></hr>
                        </li>
                    </NavLink>

                </div>
                <div>

                    <NavLink className="filter-nav" to='/404' style={{ textDecoration: 'none', color: '#7a7a7a' }}>
                        <li>
                            <i class="fa-solid fa-handshake fa-xl main-icon" ></i>
                            <div>
                                Covid-free
                            </div>
                            <hr></hr>
                        </li>
                    </NavLink>

                </div>
                <div>

                    <NavLink className="filter-nav" to='/404' style={{ textDecoration: 'none', color: '#7a7a7a' }}>
                        <li>
                            <i class="fa-solid fa-campground fa-xl main-icon" ></i>
                            <div>
                                Camphouses
                            </div>
                            <hr></hr>
                        </li>
                    </NavLink>

                </div>
                <div>

                    <NavLink className="filter-nav" to='/404' style={{ textDecoration: 'none', color: '#7a7a7a' }}>
                        <li>
                            <i class="fa-solid fa-mountain fa-xl main-icon" ></i>
                            <div>
                                Countryside
                            </div>
                            <hr></hr>
                        </li>
                    </NavLink>

                </div>
                <div>

                    <NavLink className="filter-nav" to='/404' style={{ textDecoration: 'none', color: '#7a7a7a' }}>
                        <li>
                            <i class="fa-solid fa-volcano fa-xl main-icon" ></i>
                            <div>
                                Natural Selection
                            </div>
                            <hr></hr>
                        </li>
                    </NavLink>

                </div>
                <div>

                    <NavLink className="filter-nav" to='/404' style={{ textDecoration: 'none', color: '#7a7a7a' }}>
                        <li>
                            <i class="fa-brands fa-reddit-alien fa-xl main-icon" ></i>
                            <div>
                                OMG!
                            </div>
                            <hr></hr>
                        </li>
                    </NavLink>

                </div>
                <div>

                    <NavLink className="filter-nav" to='/404' style={{ textDecoration: 'none', color: '#7a7a7a' }}>
                        <li>
                            <i class="fa-solid fa-school fa-xl main-icon" ></i>
                            <div>
                                7AM SHARP BOI
                            </div>
                            <hr></hr>
                        </li>
                    </NavLink>

                </div>
                <div>

                    <NavLink className="filter-nav" to='/404' style={{ textDecoration: 'none', color: '#7a7a7a' }}>
                        <li>
                            <i class="fa-solid fa-igloo fa-xl main-icon" ></i>
                            <div>
                                Igloos
                            </div>
                            <hr></hr>
                        </li>
                    </NavLink>

                </div>
            </div>
            {/* <button><i class="fa-solid fa-angle-right right-slide"></i></button> */}
        </div>
    )
}
