const initialState = {
    userId: null,
    userName: null,
    email: null,
    phone: null,
    address: null,
    isAuthorisate: false,
}

const auth = (state = initialState, action) => {
    const actionPauload = action.payload;
    switch (action.type) {
        case 'LOGIN':
            return {
                userId: actionPauload.userId,
                userName: actionPauload.userName,
                email: actionPauload.email,
                phone: actionPauload.phone,
                address: actionPauload.address,
                isAuthorisate: true
            }
        case 'LOGOUT':
            return {
                userId: null,
                // jwtToken: null,
                userName: null,
                phone: null,
                address: null,
                isAuthorisate: false,
            }
        case 'INTEL_ON_SITE':
            return {
                userId: actionPauload.userId,
                userName: actionPauload.userName,
                phone: actionPauload.phone,
                address: actionPauload.address,
                isAuthorisate: true
            }
        default:
            return state;
    }
}

export default auth;