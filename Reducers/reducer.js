//Acá pongo los estados iniciales de los state?

const initState = {
    data: [],
    loading: false,
    token: '',
    userId: '',
    expirationDate: ''
}

export const reducer = (state, action) => {

    if(action == "Save_token"){
        return {
            ...state,
            token: action.payload
        }
    }

    if(action == "authenticate"){
        return {
            ...state,
            token: action.payload.token,
            userId: action.payload.userId,
            expirationDate: action.payload.expirationDate
        }
    }

    return state;
}