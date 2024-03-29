import { useDispatch, useSelector } from 'react-redux';
import NavBigBtn from '../NavBigBtn/NavBigBtn';
import NavBtn from '../NavBtn/NavBtn';
import './menuNavBar.scss';
import { toggleDetailsVisible, toggleSearchbarVisible, toggleTomorrow, toggleWeekVisible, weatherService } from '../../redux/WeatherReducer';



function MenuNavBar ( ) {
    const dispatch = useDispatch()
    const _tomorrow = useSelector(weatherService).tomorrow
    const _weekVisible = useSelector(weatherService).weekVisible
    const _detailsVisible = useSelector(weatherService).detailsVisible
    const _searchbarVisible = useSelector(weatherService).searchbarVisible


    return (
        <div className="menu-nav-bar">
            <div className="background-menu">
                <NavBigBtn selected={_searchbarVisible} onClick={() => dispatch(toggleSearchbarVisible())} />
                <NavBtn variant="week" active={_weekVisible} onClick={ () => dispatch(toggleWeekVisible()) } />
                <NavBtn variant="details" active={_detailsVisible} onClick={ () => dispatch(toggleDetailsVisible()) } />
                <NavBtn variant="tomorrow" active={_tomorrow} onClick={() => dispatch(toggleTomorrow())} />
            </div>
        </div>
    )

}

export default MenuNavBar;