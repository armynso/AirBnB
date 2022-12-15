import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { currentSpots } from "../../store/userSpots";
import { deleteSpot } from "../../store/userSpots";
import { NavLink } from "react-router-dom";
import './userSpots.css'

function UserSpots() {
    const dispatch = useDispatch();

    // const [isLoaded, setIsLoaded] = useState(false);

    let mySpots = useSelector(state => (state.userSpotState.current.Spots))
    // if (mySpots.length > 0) {
    //     mySpots = Object.values(mySpots.Spots)
    // }
    // console.log(mySpots, 'check')



    const [button, setButton] = useState(false);

    useEffect(() => {
        dispatch(currentSpots());
    }, [dispatch, button])

    function tempImage(spot) {
        return (spot.previewImage == "This spot does not have a preview image") ? false : true;
    }

    function deleteButton(spotId) {
        dispatch(deleteSpot(spotId)).then(() => setButton(!button))
    }

    if (!mySpots) {
        return null
    }

    return (
        <div className="userspots">
            <h1>My Hostings</h1>
            <div className="userspots-flex">
                {(Array.isArray(mySpots)) ? <div className="userspots-box">
                    {(mySpots?.length > 0) ? (<div>
                        {mySpots.map((spot, ele) => (
                            <tr key={ele}>
                                <td>
                                    <img class="Image-house" src={
                                        tempImage(spot) ? spot.previewImage : 'https://images.pexels.com/photos/731812/pexels-photo-731812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                                    }
                                        alt="No Image" width={125} height={125} />
                                </td>
                                <td className="userspots-address">
                                    {spot.address} <br></br>{spot.city}, {spot.state}
                                </td>
                                <td>
                                    <div>
                                        <NavLink to={`/mySpots/${spot.id}`}>
                                            <button >Edit</button>
                                            {/* onClick={() => dispatch()} */}
                                        </NavLink>
                                    </div>
                                    <div>
                                        <button onClick={() => deleteButton(spot.id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </div>) : (
                        <div>
                            Your hostings will be displayed here.
                        </div>)
                    }
                </div> : <div>Loading...</div>}
            </div>

        </div>
    )
}

export default UserSpots;
