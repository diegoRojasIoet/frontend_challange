import { Logo } from '../../assets/Logo'
import { CartLogo } from '../../assets/CartLogo'
import { Search } from './Search'
import './Navbar.css'
function Navbar({setIsCartComponentCartComponent}) {

    const handleClick = () => {
        setIsCartComponentCartComponent(prevState => !prevState)
    }

    return (
        <div className='NavbarContainer'>
            <Logo />
            <Search />
            <div onClick={handleClick}>
                <CartLogo />
            </div>
        </div>
    )
}

export { Navbar }