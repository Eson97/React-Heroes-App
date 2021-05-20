import { mount } from "enzyme"
import { MemoryRouter, Router } from "react-router"
import { AuthContext } from "../../../auth/AuthContext"
import { Navbar } from "../../../components/ui/Navbar"
import { types } from "../../../types/types"

describe('Pruebas en Navbar', () => {

    const historyMock = {
        push: jest.fn(),
        replace: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn()
    }

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'User'
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter>
                <Router history={historyMock}>
                    <Navbar />
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    )

    afterEach(() => { jest.clearAllMocks(); });

    test('should show correctly', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('#logout').exists()).toBe(true);
        expect(wrapper.find('.text-info').text().trim()).toBe('User');
    });

    test('should call logout and use history', () => {
        wrapper.find('#logoutBtn').simulate('click');

        expect(contextValue.dispatch).toHaveBeenCalledWith({ type: types.logout });
        expect(historyMock.replace).toBeCalledWith('/login');
    })




})
