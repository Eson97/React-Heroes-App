import { mount } from "enzyme"
import { AuthContext } from "../../auth/AuthContext"
import { AppRouter } from "../../routers/AppRouter"

describe('Pruebas en AppRouter', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }

    test('should display login if is not auth', () => {

        const wrapper = mount(
            <AuthContext.Provider value={contextValue} >
                <AppRouter />
            </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('should display marvel comp if is auth', () => {
        
        const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged: true,
                name:'User'
            }
        }
        
        const wrapper = mount(
            <AuthContext.Provider value={contextValue} >
                <AppRouter />
            </AuthContext.Provider>
        );
        
        expect(wrapper.find('#logout').exists()).toBe(true);
    });


})
