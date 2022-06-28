import { Link, Outlet } from "react-router-dom"
import { Fragment, useContext } from "react"
import './navigation.styles.scss'
import { UserContext } from "../../contexts/user.context"
import { signOutUser } from "../../utils/firebase/firebase.utils"
import {ReactComponent as ShoppingLogo} from "../../assets/shopping-logo.svg"
import CartDropdown from "../../component/cart-dropdown/cart-dropdown.component"
import { CartContext } from "../../contexts/cart.context"
import CartIcon from '../../component/cart-icon/cart-icon.component'

const Navigation = () => {
  const { currentUser } = useContext(UserContext)
  const {isCartOpen}= useContext(CartContext)

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to='/'>
          <ShoppingLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to='/shop' >SHOP</Link>
          {
            currentUser ?
              (<span className="nav-link" onClick={signOutUser} >Sign Out</span>)
              : (<Link className="nav-link" to='/authentication' >SIGN IN</Link>)
          }
          <CartIcon/>
        </div>
         {isCartOpen && <CartDropdown/>} {/*if {isCartOpen && <CartDropdown/>} both return true then we will return the component <CartDropdown */}
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation