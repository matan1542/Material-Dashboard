import { httpService } from './http.service'

export const userService = {
    login,
    logout,
    signup,
    getById,
    update,
    getLoggedinUser
}

function getById(token) {
    return httpService.get(`user/${token.token}`)
}

async function update(userToSave) {
    const user = {
        _id: userToSave._id,
        username: userToSave.username || '',
        email: userToSave.email || '',
        password: userToSave.password || '',
        firstName: userToSave.firstName || '',
        lastName: userToSave.lastName || '',
        city: userToSave.city || '',
        country: userToSave.country || '',
        postalCode: userToSave.postalCode || '',
        aboutMe: userToSave.aboutMe || ''
    }
    const token = JSON.parse(sessionStorage.getItem('loggedinUser') || 'null')
    const updatedUser = await httpService.put(`user/${user._id}`, { user, token })
    _saveLocalUser(updatedUser)
    return updatedUser
}


async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    if (user) return _saveLocalUser(user)
}
async function signup(userCred) {
    const user = await httpService.post('auth/signup', userCred)
    return _saveLocalUser(user)

}
async function logout() {
    sessionStorage.clear()
    return await httpService.post('auth/logout')
}

function _saveLocalUser(user) {
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
    return user
}

async function getLoggedinUser() {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedinUser') || 'null')
    const user = await getById(loggedInUser)
    return user
}


