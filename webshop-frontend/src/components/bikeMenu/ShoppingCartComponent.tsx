import {Component} from "react";
import {RouteComponentProps} from "react-router-dom";
import * as React from "react";
import BikeData from "../../type/BikeData";
import {Card, Col, Container, Row} from "react-bootstrap";
import {
    CardActions,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid
} from "@material-ui/core";
import AuthService from "../../services/AuthService";
import ShoppingCartService from "../../services/ShoppingCartService";
import ShoppingCartData from "../../type/ShoppingCartData";
import axios from "axios";
import {Label} from "reactstrap";


const URI = 'http://localhost:8000/api/cart'


interface RouterProps {

}

type Props = RouteComponentProps<RouterProps>;

type State = BikeData & {
    userData: [],
    cart: ShoppingCartData[],
    bikeData: BikeData[],
    isOpenModal: boolean,
    deleteBike: number | null,
    quantity: any | null,
    isOpenModalDeleteAll: boolean
};

export default class ShoppingCartComponent extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.onChangeQuantity = this.onChangeQuantity.bind(this);


        this.state = {
            quantity: null,
            userData: [],
            cart: [],
            bikeData: [],
            isOpenModal: false,
            deleteBike: null,
            id: null,
            bikeName: "",
            price: 0,
            brandName: "",
            descriptionBrand: "",
            typeName: "",
            descriptionType: "",
            isOpenModalDeleteAll: false,
            bikeStatus: "",
            image: ""
        }
    };

    componentDidMount() {
        this.getAllFromCart();

        this.setState({
            id: this.state.id,
            bikeName: this.state.bikeName,
            price: this.state.price,
            typeName: this.state.typeName,
            descriptionType: this.state.descriptionType,
            brandName: this.state.brandName,
            descriptionBrand: this.state.descriptionBrand
        })
        this.setState({
            id: this.state.id
        })

        console.log(this.state.cart.length)
    }

    getAllFromCart() {
        const user = AuthService.getCurrentUser();
        ShoppingCartService.getAllFromCartLoggedUser(user.id)
            .then((response: any) => {
                this.setState({
                    cart: response.data,
                    bikeData: response.data
                })
                console.log(response.data)
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    deleteBike = async (bikeId: any) => {
        try {
            await axios.delete(`${URI}/${bikeId}/bikes`)
            window.location.reload();
        } catch (error) {
            alert(error)
        }
    }

    deleteAllBikes = async () => {
        try {
            await axios.delete(`${URI}/bikes`)
            window.location.reload();
        } catch (error) {
            alert(error)
        }
    }

    openModalDelete = (id: any) => this.setState({
        isOpenModal: true,
        deleteBike: id
    });

    closeModalDelete = () => this.setState({
        isOpenModal: false
    });

    openModalDeleteAll = () => this.setState({
        isOpenModalDeleteAll: true,
    });

    closeModalDeleteAll = () => this.setState({
        isOpenModalDeleteAll: false
    });


    onChangeQuantity(event: any) {
        this.setState({
                quantity: event.target.value,
            }, () => {
                console.log(this.state.quantity);
            }
        )
    }

    render() {
        const {bikeData, cart, deleteBike} = this.state;
        var count = 0;
        cart.map((cartBike, index) => (
            count = count + cart[index].bike.price
        ))
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="my-5">
                                <h1 style={{textAlign: "center"}}>Shopping Cart</h1>

                                {this.state.cart.length === 0 ?
                                    <h3 style={{textAlign: "center", backgroundColor: "grey"}}
                                        className="text-white p-5 m-5">Your
                                        shopping cart is empty!</h3> : null
                                }
                                <div style={{alignContent: "center"}}>
                                    <Row>
                                        {cart.map((cartBike, index) => (
                                            <Col lg="4" key={cart[index].bike.id}>
                                                <Card style={{height: "820px", width: "370px"}}>
                                                    <CardContent>
                                                        <h4>{cart[index].bike.bikeName}</h4>
                                                        <br/>
                                                        <img
                                                            src={require(`../images/${(cart[index].bike.image)?.split(" ")}`)}
                                                            style={{width: '250px', height: '200px'}}/>

                                                        <br/>
                                                        <b>Brand
                                                            Name:</b> {cart[index].bike.brandName}
                                                        <br/>
                                                        {/*<br/>*/}
                                                        <b>Description
                                                            Brand:</b> {cart[index].bike.descriptionBrand}
                                                        {/*<br/>*/}
                                                        <br/>
                                                        <b>Type
                                                            Name:</b> {cart[index].bike.typeName}
                                                        <br/>
                                                        {/*<br/>*/}
                                                        <b>Description
                                                            Type:</b> {cart[index].bike.descriptionType}
                                                        {/*<br/>*/}
                                                        <br/>
                                                        <b>Price:</b> {cart[index].bike.price}


                                                    </CardContent>

                                                    <CardActions className={"mt-auto"}>
                                                        <Row>
                                                            <Label id="quantityNumber">Quantity</Label>
                                                            <input defaultValue={cart[index].bike.quantity}
                                                                   name="quantityNumber"
                                                                   type="number"
                                                                   className="form-control"
                                                                   placeholder="Quantity"
                                                                   onChange={this.onChangeQuantity.bind(this)}/>
                                                            <br/><br/><br/>
                                                            <button onClick={(e) => this.openModalDelete(cartBike.id)}
                                                                    className="btn btn-danger"
                                                            >Delete
                                                            </button>
                                                        </Row>
                                                    </CardActions>

                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                </div>
                                <Row>

                                    {/*<b>Total amount:</b> {count}*/}

                                    {this.state.cart.length === 0 ? null :
                                        <div className="container p-4 ml-4" style={{backgroundColor: "grey"}}>
                                            <button onClick={(e) => this.openModalDeleteAll()}
                                                    className="btn btn-danger"
                                            >Empty shopping cart
                                            </button>

                                            <button className="btn btn-primary" style={{marginLeft: "10px"}}
                                            >Checkout
                                            </button>
                                        </div>
                                    }

                                </Row>
                            </div>
                        </div>
                    </div>
                </div>

                {/*DELETE ALL MODAL DIALOG*/}

                {cart.map((bike, index) => (
                    <Dialog
                        fullWidth={true}
                        maxWidth={'sm'}
                        style={{height: '700px'}}
                        onClose={this.closeModalDeleteAll}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        open={this.state.isOpenModalDeleteAll}
                        key={cart[index].bike.id}>

                        <DialogTitle id="alert-dialog-title">Delete Products</DialogTitle>

                        <DialogContent>
                            <div>
                                <p> Are you sure you want to delete <b> all the bikes </b> from the shopping cart?
                                </p>
                            </div>
                        </DialogContent>

                        <DialogActions>
                            <button onClick={this.closeModalDeleteAll} type="button" className="btn btn-danger">
                                Cancel
                            </button>

                            <button onClick={() => this.deleteAllBikes()} type="submit"
                                    className="btn btn-success">
                                Submit
                            </button>

                        </DialogActions>
                    </Dialog>
                ))}


                {/*DELETE MODAL DIALOG*/}

                {bikeData.map((bike) => (
                    deleteBike === bike.id ?
                        <Dialog
                            fullWidth={true}
                            maxWidth={'sm'}
                            style={{height: '700px'}}
                            onClose={this.closeModalDelete}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            open={this.state.isOpenModal}
                            key={bike.id}>

                            <DialogTitle id="alert-dialog-title">Delete Product</DialogTitle>

                            <DialogContent>
                                <div>
                                    <p> Are you sure you want to delete this bike from the shopping cart?</p>
                                </div>
                            </DialogContent>

                            <DialogActions>
                                <button onClick={this.closeModalDelete} type="button" className="btn btn-primary">
                                    Cancel
                                </button>

                                <button onClick={() => this.deleteBike(bike.id)} type="submit"
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
