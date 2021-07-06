const initialState = {
    toys: null,
    selectedToy: null,
    filterBy: null
}
export function toyReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_TOYS':
            return { ...state, toys: action.toys }
        case 'ADD_TOY':
            return { ...state, toys: [action.toy, ...state.toys] }
        case 'REMOVE_TOY':
            return { ...state, toys: state.toys.filter(toy => toy._id !== action.toyId) }
        case 'SELECTED_TOY':
            return { ...state, selectedToys: action.selectedToy }
        case 'SET_SELECTED_TOY':
            return { ...state, selectedToy: { ...action.toy } }
        case 'UPDATE_TOY':
            return { ...state, toys: [...state.toys.slice(0, action.idx), { ...action.toy }, ...state.toys.slice(action.idx + 1)] }
        case 'SET_FILTER_BY':
            return { ...state, filterBy: { ...action.filterBy } }
        default:
            return state
    }
}
