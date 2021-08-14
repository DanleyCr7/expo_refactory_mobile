import { getLunch } from '../ducks/lunch'
import { student } from '../ducks/student'
import { setReserve } from '../ducks/reserve'
export const addLunch=(menu)=>{
    return dispatch=>{
        // const resp = await api.get('/menu')
        dispatch(getLunch(menu))
    }
}

export const setStudent=(student)=>{
    return dispatch=>{
        // const resp = await api.get('/menu')
        dispatch(getLunch(student))
    }
}
export const setReserveID=(reserve)=>{
    return dispatch=>{
        // const resp = await api.get('/menu')
        dispatch(setReserve(reserve))
    }
}