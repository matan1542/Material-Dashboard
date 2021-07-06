import { userService } from '../../services/user.service.js'

export function login(credentials) { // Action Creator
    return async dispatch => {
        try {
            const user = await userService.login(credentials)
            const action = {
                type: 'SET_USER',
                user
            }
            dispatch(action)
        } catch (err) {
            console.log('userAction: err in login/signUp', err);
        }


    }
}
export function logout() { // Action Creator
    return async dispatch => {
        try {
            userService.logout();
            const action = {
                type: 'SET_USER',
                user: null
            }
            dispatch(action)
        } catch (err) {
            console.log('userAction: err in logout', err);
        }
    }

}
export function signup(userCreds) {
    console.log('userCreds',userCreds);
    return async dispatch => {
        try {
            const user = await userService.signup(userCreds)
            dispatch({ type: 'SET_USER', user })
        } catch (err) {
            console.log('UserActions: err in signup', err)
        }
    }
}