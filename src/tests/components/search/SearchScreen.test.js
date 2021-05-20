import { act } from "@testing-library/react"
import { mount } from "enzyme"
import { MemoryRouter, Route } from "react-router"
import { SearchScreen } from "../../../components/search/SearchScreen"



describe('Pruebas en SearchScreen', () => {

    test('should show correctly with default values', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}> {/*asigna la ruta inicial*/}
                <Route path='/search' component={SearchScreen} />
            </MemoryRouter>
        )

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-danger').exists()).toBeFalsy();
        expect(wrapper.find('.btn-outline-secondary').exists()).toBeTruthy();
    })

    test('should display a Batman´s HeroCard', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}> {/*asigna la ruta inicial*/}
                <Route path='/search' component={SearchScreen} />
            </MemoryRouter>
        )

        expect(wrapper.find('HeroCard').exists()).toBeTruthy()
    })

    test('should display an error box', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman123']}> {/*asigna la ruta inicial*/}
                <Route path='/search' component={SearchScreen} />
            </MemoryRouter>
        )

        expect(wrapper.find('.alert-danger').exists()).toBeTruthy();
        expect(wrapper.find('.alert').text().trim()).toBe('Hero not found!');
    })

    test('should call PUSH from history', () => {

        const historyMock = {
            push: jest.fn()
        }
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman123']}> {/*asigna la ruta inicial*/}
                <Route path='/search' component={() => <SearchScreen history={historyMock} />} />
            </MemoryRouter>
        )
        wrapper.find('input').simulate('change', {
            target: {
                name: 'inputSearch',
                value: 'batman'
            }
        })

        act(() => {
            wrapper.find('form').prop('onSubmit')({
                preventDefault() { }
            })
        })

        expect(historyMock.push).toHaveBeenCalledWith('?q=batman')
    })

})
