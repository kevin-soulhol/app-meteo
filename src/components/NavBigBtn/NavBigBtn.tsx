import './navBigBtn.scss';
import { ReactComponent as IconBigLoupe } from '../../assets/icon-big-loupe.svg';

function NavBigBtn( { selected } : { selected? : boolean } ) {
    return (
        <div className="nav-big-btn" data-selected={selected}>
            <div className="container-icon"><IconBigLoupe /></div>
        </div>
    );
}

export default NavBigBtn