import {Component} from "react";
import {RouteComponentProps} from "react-router-dom";
import AuthService from "../../services/AuthService";
import * as React from "react";
import UserType from "../../type/UserType";
import BikeData from "../../type/BikeData";
import SubscriptionData from "../../type/SubscriptionData";
import axios from "axios";
import {CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Grid} from "@material-ui/core";
import {Card, Col, Container, Row} from "react-bootstrap";
import WishListData from "../../type/WishListData";
import WishListService from "../../services/WishListService";
import ShoppingCartService from "../../services/ShoppingCartService";
import ShoppingCartData from "../../type/ShoppingCartData";


const URI_WISH = 'http://localhost:8000/api/wish'


interface RouterProps {
    history: string;
}

type Props = RouteComponentProps<RouterProps>;

type State = BikeData & {
    showUserBoard: boolean,
    showAdminBoard: boolean,
    currentUser: UserType[],
    currentUserType: UserType,
    bikeData: BikeData[],
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

export default class WishlistComponent extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            bikeName: "",
            image: "",
            subscriptionNames: "",
            wishListNames: "",
            price: undefined,
            quantity: undefined,
            bikeStatus: "",
            showUserBoard: false,
            showAdminBoard: false,
            wishListData: [],
            bikeData: [],
            cart: [],
            id: null,
            email: "",
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

        })
        if (user) {
            this.setState({
                currentUser: user,
                showUserBoard: user.roles.includes("ROLE_USER"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
                id: user.id,
                email: user.email,

            });
            this.setState({id: this.state.id})
            {
                this.state.wishListData.map((test, index) => (
                    this.setState({wishListNames: this.state.wishListData[index].bike.bikeName})
                ))
            }
        }
    }

    // getAllFromCart() {
    //     const user = AuthService.getCurrentUser();
    //     SubscriptionService.getAllFromCartLoggedUser(user.id)
    //         .then((response: any) => {
    //             this.setState({
    //                 subscriptionData: response.data,
    //                 bikeData: response.data
    //             })
    //             console.log(response.data)
    //         })
    //         .catch((e: Error) => {
    //             console.log(e);
    //         });
    // }

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


    openModalWishListDelete = (id: any) => this.setState({
        isOpenModalWishList: true,
        deleteWishList: id
    });

    deleteWishList = async (bikeId: any) => {
        try {
            await axios.delete(`${URI_WISH}/${bikeId}/bikes`)
            window.location.reload();
            alert("You have successfully deleted from wish list from this product")
        } catch (error) {
            alert(error)
        }
    }

    addToCart = (bike: any) => {
        const user = AuthService.getCurrentUser();
        ShoppingCartService.addBikeToShoppingCart(user.id, bike.id)
            .then((response: any) => {
                this.setState({
                    cart: response.data
                });
                alert("Successfully added to cart")
            }).catch((e: Error) => {
            alert("There is an error adding to cart this bike")
            console.log(e);
        });
    }


    closeModalDeleteWishList = () => this.setState({
        isOpenModalWishList: false
    });


    render() {
        const {bikeData, wishListData} = this.state;
        return (
            <>

                <div className="container">
                            <div className="my-5">
                                <h2 style={{textAlign: "center"}}>Wish List</h2>
                                <hr className="ml-4"/>
                                {this.state.wishListData.length === 0 ?
                                    <h3 style={{textAlign: "center", backgroundColor: "grey"}}
                                        className="text-white p-5 m-5">Your wish list is empty!</h3> : null
                                }
                                <div style={{alignContent: "center"}}>
                                    <Row>
                                        {wishListData.map((data, index) => (
                                            <Col lg="4" key={wishListData[index].bike.id}>
                                                <Card style={{height: "760px", width: "370px"}}>
                                                    <CardContent>
                                                        <h4>{wishListData[index].bike.bikeName}</h4>
                                                        <br/>

                                                        <img
                                                            src={require(`../images/${(wishListData[index].bike.image)?.split(" ")}`)}
                                                            style={{width: '250px', height: '200px'}}/>

                                                        <b>Brand
                                                            Name:</b> {wishListData[index].bike.brandName}
                                                        <br/>
                                                        {/*<br/>*/}
                                                        <b>Description
                                                            Brand:</b> {wishListData[index].bike.descriptionBrand}
                                                        {/*<br/>*/}
                                                        <br/>
                                                        <b>Type
                                                            Name:</b> {wishListData[index].bike.typeName}
                                                        <br/>
                                                        {/*<br/>*/}
                                                        <b>Description
                                                            Type:</b> {wishListData[index].bike.descriptionType}
                                                        {/*<br/>*/}
                                                        <br/>
                                                        <b>Price:</b> {wishListData[index].bike.price}
                                                        <br/>
                                                        <b>Quantity:</b> {wishListData[index].bike.quantity}
                                                        <br/>
                                                        <b>BIKE STATUS:</b> {wishListData[index].bike.bikeStatus}
                                                        <div>

                                                        </div>

                                                    </CardContent>

                                                    <CardActions className={"mt-auto"}>

                                                        <button
                                                            onClick={(e) => this.addToCart(data.bike)}
                                                            className="btn btn-primary"
                                                        >Add to cart
                                                        </button>

                                                        <button
                                                            onClick={(e) => this.openModalWishListDelete(data.id)}
                                                            className="btn btn-danger"
                                                        >Delete
                                                        </button>
                                                    </CardActions>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                </div>
                            </div>
                        </div>

                {bikeData.map((bike) => (
                    this.state.deleteWishList === bike.id ?
                        <Dialog
                            fullWidth={true}
                            maxWidth={'sm'}
                            style={{height: '700px'}}
                            onClose={this.closeModalDeleteWishList}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            open={this.state.isOpenModalWishList}
                            key={bike.id}>

                            <DialogTitle id="alert-dialog-title">Delete Product</DialogTitle>

                            <DialogContent>
                                <div>
                                    <p> Are you sure you want to delete from wish list this product?</p>
                                </div>
                            </DialogContent>

                            <DialogActions>
                                <button onClick={this.closeModalDeleteWishList} type="button"
                                        className="btn btn-primary">
                                    Cancel
                                </button>

                                <button onClick={() => this.deleteWishList(bike.id)} type="submit"
                                        className="btn btn-success">
                                    Submit
                                </button>

                            </DialogActions>
                        </Dialog> : <div/>
                ))}
            </>

        );
    }
}
