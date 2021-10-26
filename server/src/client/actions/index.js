// import axios from "axios";
// use original axios library for other requests (twitter, facebook, etc.)
// api is only for our own requests

export const FETCH_USERS = "fetch_users";
export const fetchUsers = () => async (dispatch, getState, api) => {
    const res = await api.get("/users");

    dispatch({
        type: FETCH_USERS,
        payload: res
    });
}
