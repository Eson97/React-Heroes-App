import { mount } from "enzyme";
import { MemoryRouter } from "react-router";
import { AuthContext } from "../../auth/AuthContext";
import { DashboardRoutes } from "../../routers/DashboardRoutes"

describe('Pruebas en DashboardRoutes', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name:'User'
        }
    }

    test('should show correctly', () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue} >
                <MemoryRouter> {/*Simula el Router*/}
                    <DashboardRoutes />
                </MemoryRouter >
            </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('User');
    });


})
