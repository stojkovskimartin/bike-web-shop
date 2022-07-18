import {Component} from "react";
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/AuthService";

import IUser from "./type/UserType";
import Register from "./components/bikeMenu/RegisterComponent";
import Login from "./components/bikeMenu/LoginComponent";


import BikesComponent from "./components/bikeMenu/BikesComponent";
import ProfileComponent from "./components/bikeMenu/ProfileComponent";
import ShoppingCartComponent from "./components/bikeMenu/ShoppingCartComponent";
import ShoppingCartData from "./type/ShoppingCartData";
import * as React from "react";
import {Nav} from "react-bootstrap";
import MessageComponent from "./components/bikeMenu/MessageComponent";
import WishlistComponent from "./components/bikeMenu/WishlistComponent";

type Props = {};

type State = {
    showUserBoard: boolean,
    showAdminBoard: boolean,
    currentUser: IUser | undefined,
    cart: ShoppingCartData[]

}

class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showUserBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
            cart: [],
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showUserBoard: user.roles.includes("ROLE_USER"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }

    }


    logOut() {
        AuthService.logout();
        this.setState({
            showUserBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        });
    }

    render() {
        const {currentUser} = this.state;

        return (
            <div>
                {currentUser ? (
                        <Nav className="navbar navbar-expand navbar-dark bg-dark">

                            <div className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to={"/api/bikes"} className="nav-link">
                                        <button className="btn btn-primary">Home</button>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/api/cart"} className="nav-link">
                                        <button className="btn btn-secondary">Shopping Cart</button>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/api/message"} className="nav-link">
                                        <button className="btn btn-secondary">Messages</button>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/api/wish"} className="nav-link">
                                        <button className="btn btn-secondary">Wishlist</button>
                                    </Link>
                                </li>
                            </div>


                            {currentUser ? (
                                <div className="navbar-nav">
                                    <li className="nav-item">
                                        <Link to={"/profile"} className="nav-link mt-2">
                                            Logged user: <b> {currentUser.username}</b>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/login" className="nav-link" onClick={this.logOut}>
                                            <button className="btn btn-danger">Log out</button>
                                        </a>
                                    </li>
                                </div>
                            ) : (
                                <div className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link to={"/login"} className="nav-link">
                                            Login
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to={"/register"} className="nav-link">
                                            Sign Up
                                        </Link>
                                    </li>
                                </div>
                            )}

                        </Nav>
                    ) :
                    <div/>
                }


                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/api/bikes"]} component={BikesComponent}/>
                        <Route exact path='/api/bikes/:id' component={BikesComponent}/>
                        <Route exact path='/profile' component={ProfileComponent}/>
                        <Route exact path='/api/cart' component={ShoppingCartComponent}/>
                        <Route exact path='/api/message' component={MessageComponent}/>
                        <Route exact path='/api/wish' component={WishlistComponent}/>

                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                    </Switch>
                </div>


                <footer className="footer fixed-bottom">
                    <div className="footer-copyright text-center py-3 bg-dark"
                         style={{padding: '70px', color: "white"}}>© 2022 Copyright:
                        <a href="https://www.finki.ukim.mk/mk"> Faculty of Computer Science and Engineering</a>
                    </div>

                </footer>
            </div>

        );
    }
}

export default App;