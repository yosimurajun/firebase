export const initialState = {
    user: null,
    playlists: [],
    playing: false,
    item: null,
    token: 'BQDotgLOjFfleh063igZww4vEEREz-ct6wdP47ujgS_shb7gscrQCs6PLFIHvN3bCTriDtOJ6XrqQfUHCexr5UfNkPNpqfX96ndye9B3zZBTg_iyVOBMAngFyAA02J0LTLccGqoWn5Zn5SnJq7M1UbWcoztWvFcDCNwGUUnB3vSVZHFHlcM',
};

const reducer = (state, action) => {
    console.log(action);

    switch(action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            }
        case 'SET_PLAYLIST':
            return {
                ...state, 
                playlists: action.playlists,
            }
        case 'SET_DISCOVER_WEEKLY':
            return {
                ...state,
                discover_weekly: action.discover_weekly,
            }
            
        default: 
            return state;

    }

}

export default reducer;