import React from "react";
import {Link} from "react-router-dom";
import { ReactComponent as Logo } from '../../assest/crown.svg'
import {auth} from "../../firebase/firebase.utils";
import './header.styles.scss';
import {connect} from "react-redux";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropDown from "../cart-dropdown/cart-dropdown.component";

const Header = ({currentUser}) => (
    <div className='header'>
        <Link to="/" className = 'logo-container' >
            <Logo className= 'logo' />
        </Link>

        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/shop'>
                CONTACT
            </Link>
            {
                currentUser ?
                    <div className='option' onClick={() => auth.signOut()}> SIGN OUT </div>
                    :
                    <Link className = 'option' to='/signin'> SIGN IN </Link>
            }
            <CartIcon/>
        </div>
        <CartDropDown />
    </div>
);

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Header);