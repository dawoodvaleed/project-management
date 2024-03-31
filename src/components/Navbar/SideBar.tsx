import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { Link } from 'react-router-dom';
import './Nav.css';

export const sidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Reports',
        path: '/',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
]
export const SideBar = (props: any) => {

    return (
        <div className={props.sidemenu ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-manu-items'>
                <li className='nav-toggle'>
                    <Link to='#' className='menu-bars'>
                        <AiIcons.AiOutlineClose onClick={props.showsidemenu} />
                    </Link>
                </li>
                {sidebarData.map(item => <li className={item.cName}>
                    <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                    </Link>
                </li>)}
            </ul>
        </div>

    )
}
