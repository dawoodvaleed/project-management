import * as FaIcons from "react-icons/fa";
import { Link } from 'react-router-dom';
import './Nav.css';

export const Nav = (props: any) => {

    return (
        <div className='navbar'>
            <Link to="#" className='menu-bars'>
                <FaIcons.FaBars onClick={props.showsidemenu} />
            </Link>

        </div>
    )
}
