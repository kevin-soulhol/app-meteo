
import './navBtn.scss';
import { ReactComponent as IconLoupe } from '../../assets/icon-loupe.svg';
import { ReactComponent as IconDetails } from '../../assets/icon-details.svg';
import { ReactComponent as IconWeek } from '../../assets/icon-semaine.svg';
import { ReactComponent as IconTomorrow } from '../../assets/icon-today.svg';

const labels = {
    loupe: 'Search',
    details: 'Details',
    week: 'Week',
    tomorrow: 'Tomorrow'
}

function NavBtn ( { variant, onClick, active } : { variant: 'loupe' | 'details' | 'week' | 'tomorrow', onClick? : Function, active?: boolean } ) {

    function getLabel() {
        return labels[variant] || 'No Name';
    }

    function getDate() {
        const today = new Date()
        return new Date( today.setDate(today.getDate() + 1 ) ).getDate()
    }

    function getIcon() {
        return {
            loupe: <IconLoupe />,
            details: <IconDetails />,
            week: <IconWeek />,
            tomorrow: (
                <>
                    <IconTomorrow />
                    <span className="date">
                        { getDate()}
                    </span>
                </>
            )
        }[variant];
    }

    function _onClick() {
        if(onClick){
            onClick()
        }
    }



    return (
        <div className="nav-button" onClick={_onClick} data-active={active}>
            <div className="container-icon">
                { getIcon() }
            </div>
            <div className="container-text">{ getLabel() }</div>
        </div>
    )

}

export default NavBtn;