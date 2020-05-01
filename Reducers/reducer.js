//Acá pongo los estados iniciales de los state?

const initState = {
    data: [],
    loading: false,
    token: '',
    userId: '',
    expirationDate: '',
    uri:''
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
         
            token: action.payload.token,
            userId: action.payload.userId,
            expirationDate: action.payload.expirationDate
        }
    }
    if(action == "photo"){
        return{
            uri: action.payload.uri
        }
    }

    //https://oauth2.googleapis.com/tokeninfo?id_token= Url token to validate expirationDate 

    return state;
}