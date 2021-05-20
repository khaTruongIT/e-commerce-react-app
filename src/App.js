import React from "react";
import {Switch ,Route, Redirect} from 'react-router-dom';
import './App.css';
import HomePage from "./pages/homepage/hompage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from './components/header/header.component';
import SignInAndSignUpPage from "./pages/sign-in and sign-up/signInUp.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import {connect} from "react-redux";
import {setCurrentUser} from "./redux/user/user.actions";
import {selectCurrentUser} from "./redux/user/user.selectors";
import {createStructuredSelector} from "reselect";


class App extends React.Component {


    // ngăn ko cho leak information
    unsuscribeFromAuth = null;


    componentDidMount() {
        const { setCurrentUser } = this.props;

        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapShot => {
                    setCurrentUser({
                        id: snapShot.id,
                        ...snapShot.data()
                    });
                });
            }

            setCurrentUser(userAuth);
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }


    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route path='/shop' component={ShopPage} />
                    <Route path='/checkout' component={CheckoutPage} />
                    <Route
                        exact
                        path='/signin'
                        render={() =>
                            this.props.currentUser ? (
                                <Redirect to='/' />
                            ) : (
                                <SignInAndSignUpPage />
                            )
                        }
                    />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps =createStructuredSelector({
    currentUser: selectCurrentUser
})

const mapDispatchtoProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser())
})

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(App);
