import './navBigBtn.scss';
import { ReactComponent as IconBigLoupe } from '../../assets/icon-big-loupe.svg';

function NavBigBtn( { selected, onClick } : { selected? : boolean, onClick : Function } ) {
    return (
        <div className="nav-big-btn" data-selected={selected} onClick={() => onClick()}>
            <div className="container-icon"><IconBigLoupe /></div>
        </div>
    );
}

export default NavBigBtn