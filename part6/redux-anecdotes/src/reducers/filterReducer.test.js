import filterReducer from "./filterReducer";
import deepFreeze from "deep-freeze";

describe('filterReducer', () => {
    test('filters a note with actions filter/filterChange', () => {
        const state = {
          filter: ''
        }

        const action = {
            type: 'filter/filterChange',
            payload: 'programming'
        }

        deepFreeze(state)

        const newState = filterReducer(state, action)
        
        expect(newState).toEqual('programming')
    })
})