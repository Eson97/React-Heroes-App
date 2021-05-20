import { authReducer } from "../../auth/authReducer"
import { types } from "../../types/types";

describe('Pruebas en authReducer', () => {

    test('should return state by default', () => {
        const state = authReducer({ logged: false }, {});

        expect(state).toEqual({ logged: false });
    })

    test('should auth and put username', () => {
        const action = {
            type: types.login,
            payload: {
                name: 'User'
            }
        }

        const state = authReducer({ logged: false }, action);

        expect(state).toEqual({
            logged: true,
            name: 'User'
        })
    })

    test('should delete username and logged must be false', () => {

        const action = { type: types.logout }

        const state = authReducer({ logged: true, name: 'User' }, action);

        expect(state).toEqual({ logged: false });

    })


})
