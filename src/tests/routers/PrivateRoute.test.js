import { mount } from "enzyme"
import { MemoryRouter } from "react-router"
import { PrivateRoute } from "../../routers/PrivateRoute"

describe('pruebas en PrivateRoute', () => {

    const props = {
        location: { pathname: '/marvel' }
    }

    Storage.prototype.setItem = jest.fn();

    test('should display comp if isAuth and save localStorage', () => {

        const wrapper = mount(
            <MemoryRouter> {/*Simula el Router*/}
                <PrivateRoute
                    isAuth={true}
                    component={() => <span>test</span>} //solo debe mostrar este componente si esta autenticado
                    {...props}
                />
            </MemoryRouter>
        );

        expect(wrapper.find('span').exists()).toBe(true);
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath','/marvel');
    })

    test('shouldn´t display comp if isAuth : false and save localStorage', () => {
        const wrapper = mount(
            <MemoryRouter> {/*Simula el Router*/}
                <PrivateRoute
                    isAuth={false}
                    component={() => <span>test</span>} //solo debe mostrar este componente si esta autenticado
                    {...props}
                />
            </MemoryRouter>
        );

        expect(wrapper.find('span').exists()).toBe(false);
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath','/marvel');
    })
    

})
