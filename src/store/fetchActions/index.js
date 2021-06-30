import { getLunch } from '../ducks/lunch'
export const addLunch=()=>{
    return dispatch=>{
        // const resp = await api.get('/menu')
        const array = ['1', '2']
        dispatch(getLunch(array))
    }
}