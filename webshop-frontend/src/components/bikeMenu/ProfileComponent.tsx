import {Component} from "react";
import {RouteComponentProps} from "react-router-dom";
import AuthService from "../../services/AuthService";
import * as React from "react";
import UserType from "../../type/UserType";
import BikeData from "../../type/BikeData";
import SubscriptionData from "../../type/SubscriptionData";
import WishListData from "../../type/WishListData";
import WishListService from "../../services/WishListService";
import ShoppingCartData from "../../type/ShoppingCartData";


interface RouterProps {
    history: string;
}

type Props = RouteComponentProps<RouterProps>;

type State = BikeData & {
    username: string,
    password: string,
    newPassword: string,
    loading: boolean,
    message: string,
    editUser: number | null,
    showUserBoard: boolean,
    showAdminBoard: boolean,
    currentUser: UserType[],
    currentUserType: UserType,
    bikeData: BikeData[],
    subscriptionData: SubscriptionData[],
    wishListData: WishListData[],
    cart: ShoppingCartData[],
    id: null,
    email: string,
    userIdEdit: number | null,
    subscriptionNames: string,
    wishListNames: string,
    isOpenModal: boolean,
    isOpenModalWishList: boolean,
    deleteSubscription: number | null,
    deleteWishList: number | null,
};

export default class ProfileComponent extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
        this.updateUser = this.updateUser.bind(this);

        this.state = {
            bikeName: "",
            image: "",
            subscriptionNames: "",
            wishListNames: "",
            price: undefined,
            quantity: undefined,
            bikeStatus: "",
            loading: false,
            message: "",
            showUserBoard: false,
            showAdminBoard: false,
            subscriptionData: [],
            wishListData: [],
            bikeData: [],
            cart: [],
            id: null,
            username: "",
            email: "",
            password: "",
            newPassword: "",
            editUser: null,
            currentUser: [],
            userIdEdit: null,
            isOpenModal: false,
            isOpenModalWishList: false,
            deleteSubscription: null,
            deleteWishList: null,
            currentUserType: {
                id: null,
                username: "",
                email: "",
                password: "",
                newPassword: ""
            }
        };
    }

    componentDidMount() {
        this.getAllFromCartWishList();
        const user = AuthService.getCurrentUser();
        // this.getUsers();
        this.setState({
            id: this.state.id,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            newPassword: this.state.newPassword,
            bikeName: this.state.bikeName
        })
        if (user) {
            this.setState({
                currentUser: user,
                showUserBoard: user.roles.includes("ROLE_USER"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
                id: user.id,
                username: user.username,
                email: user.email,
                password: user.password,
                newPassword: user.newPassword,
            });
            this.setState({id: this.state.id})
            {
                this.state.wishListData.map((test, index) => (
                    this.setState({wishListNames: this.state.wishListData[index].bike.bikeName})
                ))
            }
        }
    }


    getAllFromCartWishList() {
        const user = AuthService.getCurrentUser();
        WishListService.getAllFromCartLoggedUser(user.id)
            .then((response: any) => {
                this.setState({
                    wishListData: response.data,
                    bikeData: response.data
                })
                console.log(response.data)
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    updateUser(id: any) {
        const user = AuthService.getCurrentUser();

        var currentUser = {
            id: this.state.id,
            username: this.state.username === "" ? user.username : this.state.username,
            email: this.state.email === "" ? user.email : this.state.email,
            password: this.state.password === "" ? user.password : this.state.password,
            newPassword: this.state.newPassword === "" ? user.newPassword : this.state.newPassword,
        }

        AuthService.updateUser(currentUser, id).then(res => {
            window.location.reload();
            alert("Successfully edited user")
        }).catch((e: Error) => {
            alert("There is an error editing this user")
            console.log(e);
        });
    }

    onChangeUserName(event: any) {
        this.setState({
            username: event.target.value,
        }, () => {
            console.log(this.state.username);
        });
    }

    onChangeEmail(event: any) {
        this.setState({
            email: event.target.value,
        }, () => {
            console.log(this.state.email);
        });
    }

    onChangePassword(event: any) {
        this.setState({
            password: event.target.value,
        }, () => {
            console.log(this.state.password);
        });
    }

    onChangeNewPassword(event: any) {
        this.setState({
            newPassword: event.target.value,
        }, () => {
            console.log(this.state.newPassword);
        });
    }


    render() {
        const {} = this.state;
        return (
            <>
                <br/>
                <h1 style={{textAlign: "center"}}>My Profile</h1>
                <hr/>
                <br/>
                <div className="row">
                    <div className="col-xxl-8"
                         style={{backgroundColor: "grey", padding: "40px"}}>
                        <div className="bg-secondary-soft rounded">
                            <div className="row">
                                <h4 className="mb-4 mt-0">User details</h4>
                                <br/>
                                <div className="col-md-6"/>
                                <div className="col-md-6">
                                    <label id="username" className="form-label">Username*</label>
                                    <input onChange={this.onChangeUserName.bind(this)} type="text"
                                           className="form-control" name="username" placeholder=""
                                           aria-label="Username" defaultValue={this.state.username}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label id="email" className="form-label">Email *</label>
                                    <input onChange={this.onChangeEmail.bind(this)} type="email"
                                           className="form-control" name="email" placeholder=""
                                           aria-label="Email" defaultValue={this.state.email}
                                    />

                                </div>
                                <br/>

                                <div className="col-md-6">
                                    <br/>
                                    <a href="/api/bikes">
                                        <button type="submit"
                                                className="btn btn-dark">
                                            Back
                                        </button>
                                    </a>
                                    <button style={{marginLeft: 1000, marginTop: -70}} type="submit"
                                            onClick={() => this.updateUser(this.state.id)}
                                            className="btn btn-success">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <br/>
            </>

        );
    }
}
