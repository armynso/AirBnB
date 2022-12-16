import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
// import { currentSpots } from "../../store/spots";
import { getUserReviews } from "../../store/userReviews"
import { NavLink } from "react-router-dom";
import { deleteReview } from "../../store/userReviews";
import './userReviews.css'

function UserReviews() {
    const dispatch = useDispatch();

    const [button, setButton] = useState(false);

    const myReviews = useSelector(state => Object.values(state.userReviewState.current)[0])
    // console.log(myReviews[0], "this is myReviews")

    // function deleteButton(reviewId) {
    //     dispatch(deleteReview(reviewId)).then(() => setButton(!button))
    // }

    // && Object.keys(myReviews[0]).length > 0

    useEffect(() => {
        dispatch(getUserReviews());
    }, [dispatch, button])

    function deleteButton(reviewId) {
        dispatch(deleteReview(reviewId)).then(() => setButton(!button))
    }

    // console.log("what")
    return (
        <div className="userspots">
            <h1>My Reviews</h1>
            {
                (myReviews?.length > 0) ? (<div className="userreviews-box userspots-box">
                    {myReviews.map((review, ele) => (

                        <><tr key={ele}>
                            <td className="userreviews-text">
                                {/* {review.User?.firstName} */}
                                <b>Rating:</b> {review.stars}<i class="fa-solid fa-star fa-xs"></i> <br></br>
                                <b>Description:</b> {review.review}
                            </td>
                            <td>
                                <div>
                                    <button onClick={() => deleteButton(review.id)}>Delete</button>
                                </div>
                            </td>
                        </tr></>

                    ))


                    }
                </div>) : (
                    <div>
                        Your reviews will be displayed here.
                    </div>)
            }
        </div>
    )
}

export default UserReviews;




// function UserSpots() {

    // const [isLoaded, setIsLoaded] = useState(false);

//     const mySpots = useSelector(state => Object.values(state.spotState.current)[0])
//     // console.log(mySpots, 'check')



//     const [button, setButton] = useState(false);



//     function tempImage(spot) {
//         return (spot.previewImage == "This spot does not have a preview image") ?  false : true;
//       }



//       if (!mySpots) {
//         return null
//       }

//     return (
//         <div>
//             <h1>My Hostings</h1>
//             {(Array.isArray(mySpots)) ? <div>
//                 {mySpots.map((spot, ele) => (
//             <tr key={ele}>
//                 <td>
//                 <img class="Image-user" src={
//                 tempImage(spot) ? spot.previewImage : 'https://images.pexels.com/photos/731812/pexels-photo-731812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
//             }
//             alt="No Image" width={125} height={125} />
//                 </td>
//                 <td>
//                 {spot.address}{spot.city}{spot.state}
//                 </td>
//                 <td>
//                     <div>
//                         <button onClick={() => deleteButton(spot.id)}>Delete</button>
//                     </div>
//                     <div>
//                     <NavLink to={`/mySpots/${spot.id}`}>
//                      <button onClick={() => dispatch()}>Edit</button>
//                     </NavLink>
//                     </div>
//                 </td>
//                 </tr>
//             ))}
//             </div> : <div></div>}

//         </div>
//     )
// }

// export default UserSpots;
