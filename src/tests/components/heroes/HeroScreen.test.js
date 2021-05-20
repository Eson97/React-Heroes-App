import { mount, shallow } from "enzyme"
import { MemoryRouter, Route } from "react-router"
import { HeroScreen } from "../../../components/heroes/HeroScreen"

describe('Pruebas en HeroScreen', () => {

    const historyMock = {
        lenght: 10,
        push: jest.fn(),
        goBack: jest.fn()
    }


    test('should show comp redirect if there si no args in URL', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroScreen history={historyMock} />
            </MemoryRouter>
        )

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('Redirect').exists()).toBe(true);
    })

    test('should display a hero if param exist', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroeId" component={HeroScreen} />
            </MemoryRouter>
        )

        expect(wrapper.find('.row').exists()).toBeTruthy();
    })

    test('should return to previous screen using PUSH', () => {
        const historyMock = {
            lenght: 10,
            push: jest.fn(),
            goBack: jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroeId" component={() => <HeroScreen history={historyMock} />} />
            </MemoryRouter>
        )

        wrapper.find('button').prop('onClick')();

        expect(historyMock.push).toHaveBeenCalled();
        expect(historyMock.goBack).not.toHaveBeenCalled();
    })

    test('should call REDIRECT if hero doesn´t exist', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider654654564654']}>
                <Route path="/hero/:heroeId" component={() => <HeroScreen history={historyMock} />} />
            </MemoryRouter>
        )

        expect(wrapper.text()).toBe('');
    })




})
