import { mount } from "enzyme"
import { AuthContext } from "../../../auth/AuthContext"
import { LoginScreen } from "../../../components/login/LoginScreen"
import { types } from "../../../types/types"

describe('Pruebas en LoginSreen', () => {

    const historyMock = {
        replace: jest.fn()
    }

    const contextValue = {
        dispatch: jest.fn(),
        user: { logged: false }
    }

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <LoginScreen history={historyMock} />
        </AuthContext.Provider>
    )

    test('should show correctly', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('should do dispatch', () => {
        wrapper.find('button').simulate('click');

        expect(contextValue.dispatch).toHaveBeenCalledWith({ type: types.login, payload: { name: 'User' } });
        expect(historyMock.replace).toHaveBeenCalled();
    })


})
