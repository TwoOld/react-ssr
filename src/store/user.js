import axios from 'axios'
const GET_USER_INFO = 'INDEX/USER_INFO'
const changeUserInfo = data => ({
    type: GET_USER_INFO,
    data
})

export const getUserInfo = server => {
    return (dispatch, getState, axiosInstance) => {
        return axios.get('http://localhost:9093/api/user/info')
            .then(res => {
                const { data } = res.data
                // console.log('user info', data)
                dispatch(changeUserInfo(data))
            })
    }
}

const defaultState = {
    userInfo: {}
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case GET_USER_INFO:
            const newState = {
                ...state,
                userInfo: action.data
            }
            return newState
        default:
            return state
    }
}