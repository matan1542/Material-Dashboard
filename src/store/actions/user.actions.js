import { userService } from '../../services/user.service.js'

export  function login(credentials) { // Action Creator
    return async dispatch => {
        try {
            const user = await userService.login(credentials)
            const action = {
                type: 'SET_USER',
                user
            }
            dispatch(action)
            return Promise.resolve(user)
        } catch (err) {
            console.log('userAction: err in login/signUp', err);
            throw new Error('Invalid email/password')
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
    return async dispatch => {
        try {
            const user = await userService.signup(userCreds)
            dispatch({ type: 'SET_USER', user })
        } catch (err) {
            console.log('UserActions: err in signup', err)
        }
    }
}

export function updateUser(user) {
    return async dispatch => {
        try {
            const updateUser = await userService.update(user)
            dispatch({ type: 'SET_USER', user:{...updateUser} })
        } catch (err) {
            console.log('UserActions: err in updateUser', err)
        }
    }
}