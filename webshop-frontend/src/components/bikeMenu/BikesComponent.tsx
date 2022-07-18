import * as React from "react";
import {ChangeEvent, Component} from "react";
import BikeService from "../../services/BikeService";
import BikeData from "../../type/BikeData";

import {
    CardActions,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid
} from "@material-ui/core";
import {Card, Col, Container, Row} from "react-bootstrap";
import {Label} from "reactstrap";
import axios from "axios";
import AuthService from "../../services/AuthService";
import ShoppingCartService from "../../services/ShoppingCartService";
import ShoppingCartData from "../../type/ShoppingCartData";
import SubscriptionService from "../../services/SubscriptionService";
import SubscriptionData from "../../type/SubscriptionData";
import WishListData from "../../type/WishListData";
import WishListService from "../../services/WishListService";
import MessageService from "../../services/MessageService";
import MessageData from "../../type/MessageData";


type Props = {}

type State = BikeData & {
    bikes: BikeData,
    bikeData: BikeData[],
    cart: ShoppingCartData[],
    subscription: SubscriptionData[],
    wishList: WishListData[],
    bikeEditData: BikeData,
    messageData: MessageData[],
    isOpen: boolean,
    isOpenModal: boolean,
    openDialogEdit: boolean,
    editBike: number | null,
    deleteBike: number | null,
    error: string,
    userId: number,
    bikeId: number,
    isSubscribed: boolean,
    isWishListed: boolean,
    hideButton: boolean,
    stringRoles: string,
    hideAsc: boolean,
    hideDesc: boolean,
    defaultOrder: boolean,
    search: string,
    hideSearch: boolean,
};

const URI = 'http://localhost:8000/api/bikes'

export default class BikesComponent extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.getBikes = this.getBikes.bind(this);
        this.deleteBike = this.deleteBike.bind(this);
        this.onChangeBikeName = this.onChangeBikeName.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);

        this.onChangeBrandName = this.onChangeBrandName.bind(this);
        this.onChangeBikeStatus = this.onChangeBikeStatus.bind(this);
        this.onChangeBrandDescription = this.onChangeBrandDescription.bind(this);
        this.onChangeTypeName = this.onChangeTypeName.bind(this);
        this.onChangeTypeDescription = this.onChangeTypeDescription.bind(this);

        this.getBikeById = this.getBikeById.bind(this);
        this.saveBikes = this.saveBikes.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleCloseFormEdit = this.handleCloseFormEdit.bind(this);
        this.handleOpenFormEdit = this.handleOpenFormEdit.bind(this);

        this.state = {
            bikes: {
                id: null,
                bikeName: "",
                price: null,

                brandName: "",
                descriptionBrand: "",

                typeName: "",
                descriptionType: "",
                quantity: null,
                bikeStatus: "",
                image: ""
            },
            editBike: null,
            bikeData: [],
            cart: [],
            subscription: [],
            wishList: [],
            messageData: [],
            deleteBike: null,
            bikeId: 0,
            userId: 0,
            isSubscribed: false,
            isWishListed: false,
            hideButton: false,
            stringRoles: "",
            hideAsc: false,
            hideDesc: false,
            defaultOrder: false,
            search: "",
            hideSearch: false,

            id: null,
            bikeName: "",
            price: 0,
            brandName: "",
            descriptionBrand: "",
            typeName: "",
            descriptionType: "",
            quantity: 0,
            bikeStatus: "",
            image: "",
            isOpen: false,
            isOpenModal: false,
            openDialogEdit: false,
            bikeEditData: {
                id: null,
                bikeName: "",
                price: null,
                brandName: "",
                descriptionBrand: "",
                typeName: "",
                descriptionType: "",
                quantity: null,
                bikeStatus: "",
                image: ""
            },
            error: '',
        };
    }

    componentDidMount() {


        this.checkRoles();
        const user = AuthService.getCurrentUser();

        this.getBikes();
        this.setState({
            id: this.state.id,
            bikeName: this.state.bikeName,
            price: this.state.price,
            typeName: this.state.typeName,
            descriptionType: this.state.descriptionType,
            brandName: this.state.brandName,
            descriptionBrand: this.state.descriptionBrand,
            quantity: this.state.quantity,
            bikeStatus: this.state.bikeStatus,
            image: this.state.image
        })

        if (user) {
            this.setState({userId: user.id})
        }
        this.getAllFromCart();
        this.getMessages();
    }

    handleOpenFormEdit = (id: any) => {
        this.setState({
            openDialogEdit: true,
            editBike: id
        });
    }

    checkRoles() {
        const user = AuthService.getCurrentUser();
        if (user.roles.includes("ROLE_USER")) {
            this.setState({
                hideButton: true
            })
        } else if (user.roles.includes("ROLE_ADMIN")) {
            this.setState({hideButton: false})
        }
    }

    handleCloseFormEdit = () => {
        this.setState({openDialogEdit: false});
    }

    getAllFromCart() {
        const user = AuthService.getCurrentUser();
        ShoppingCartService.getAllFromCartLoggedUser(user.id)
            .then((response: any) => {
                this.setState({
                    cart: response.data
                })
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    getMessages() {
        MessageService.getAll()
            .then((response: any) => {
                this.setState({
                    // bikes: response.data,
                    messageData: response.data,
                });
                console.log(response.data)
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }


    getBikes() {
        BikeService.getAll()
            .then((response: any) => {
                this.setState({
                    // bikes: response.data,
                    bikeData: response.data,
                    bikeId: response.data.id
                });
                console.log(response.data)
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    getBikeById(id: number) {
        BikeService.get(id)
            .then((response: any) => {
                this.setState({
                    // bikes: response.data,
                    bikeData: response.data,
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    onChangeBikeName(event: any) {
        this.setState({
            bikeName: event.target.value,
        }, () => {
            console.log(this.state.bikeName);
        });
    }

    onChangeImage(event: any) {
        this.setState({
            image: event.target.value,
        }, () => {
            console.log(this.state.image);
        });
    }


    onChangePrice(event: any) {
        this.setState({
            price: event.target.value
        }, () => {
            console.log(this.state.price);
        });
    }

    onChangeQuantity(event: any) {
        this.setState({
            quantity: event.target.value
        }, () => {
            console.log(this.state.quantity);
        });
    }


    onChangeTypeName(event: ChangeEvent<HTMLSelectElement>) {
        var safeSearchTypeValue: string = event.currentTarget.value;
        console.log(safeSearchTypeValue);
        this.setState({
            typeName: safeSearchTypeValue
        });
    };

    onChangeTypeDescription(event: ChangeEvent<HTMLSelectElement>) {
        var safeSearchTypeValue: string = event.currentTarget.value;
        console.log(safeSearchTypeValue);
        this.setState({
            descriptionType: safeSearchTypeValue
        });
    };

    onChangeBrandName(event: ChangeEvent<HTMLSelectElement>) {
        var safeSearchTypeValue: string = event.currentTarget.value;
        console.log(safeSearchTypeValue);
        this.setState({
            brandName: safeSearchTypeValue
        });
    };

    onChangeBikeStatus(event: ChangeEvent<HTMLSelectElement>) {
        var safeSearchTypeValue: string = event.currentTarget.value;
        console.log(safeSearchTypeValue);
        this.setState({
            bikeStatus: safeSearchTypeValue
        });
    };


    onChangeBrandDescription(event: ChangeEvent<HTMLSelectElement>) {
        var safeSearchTypeValue: string = event.currentTarget.value;
        console.log(safeSearchTypeValue);
        this.setState({
            descriptionBrand: safeSearchTypeValue
        });
    };

    deleteBike = async (id: any) => {
        try {
            await axios.delete(`${URI}/${id}`)
            window.location.reload();
        } catch (error) {
            alert(error)
        }
    }

    updateBike(id: any) {
        var testId: any;
        const user = AuthService.getCurrentUser();
        this.state.bikeData.map((index: any) => {
            if (index.id === id) {
                testId = index;
            }
        })
        var bikeData = {
            id: this.state.id,
            bikeName: this.state.bikeName === "" ? testId.bikeName : this.state.bikeName,
            price: this.state.price === 0 ? testId.price : this.state.price,
            brandName: this.state.brandName === "" ? testId.brandName : this.state.brandName,
            descriptionBrand: this.state.descriptionBrand === "" ? testId.descriptionBrand : this.state.descriptionBrand,
            typeName: this.state.typeName === "" ? testId.typeName : this.state.typeName,
            descriptionType: this.state.descriptionType === "" ? testId.descriptionType : this.state.descriptionType,
            quantity: this.state.quantity === 0 ? testId.quantity : this.state.quantity,
            bikeStatus: this.state.bikeStatus === "" ? testId.bikeStatus : this.state.bikeStatus,
            image: this.state.image === "" ? testId.image : this.state.image
        }
        BikeService.update(bikeData, id, user.id).then(res => {
            window.location.reload();
            alert("Successfully edited bike")
        }).catch((e: Error) => {
            alert("There is and error editing this bike")
            console.log(e);
        });
    }


    saveBikes(e: any) {
        const data: BikeData = {
            id: this.state.id,
            bikeName: this.state.bikeName,
            price: this.state.price,
            brandName: this.state.brandName,
            descriptionBrand: this.state.descriptionBrand,
            typeName: this.state.typeName,
            descriptionType: this.state.descriptionType,
            quantity: this.state.quantity,
            bikeStatus: this.state.bikeStatus,
            image: this.state.image
        }

        BikeService.create(data)
            .then((response: any) => {
                this.setState({
                    id: response.data.id,
                    bikeName: response.data.bikeName,
                    price: response.data.price,
                    brandName: response.data.brandName,
                    descriptionBrand: response.data.descriptionBrand,
                    typeName: response.data.typeName,
                    descriptionType: response.data.descriptionType,
                    quantity: response.data.quantity,
                    bikeStatus: response.data.bikeStatus,
                    image: response.data.image
                });
                window.location.reload();
                alert("Successfully created bike")
                console.log(response.data);
            })
            .catch((e: Error) => {
                alert("There is an error creating a new bike")
                console.log(e);
            });
    }

    openModal = () => this.setState({isOpen: true});
    closeModal = () => this.setState({isOpen: false});

    openModalDelete = (id: any) => this.setState({
        isOpenModal: true,
        deleteBike: id
    });

    closeModalDelete = () => this.setState({isOpenModal: false});

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

    subscribedBike = (bike: any) => {
        const user = AuthService.getCurrentUser();
        SubscriptionService.addBikeToSubscription(user.id, bike.id)
            .then((response: any) => {
                this.setState({
                    subscription: response.data,
                    isSubscribed: true
                });
                alert("Successfully subscribed to this bike")
                console.log(this.state.isSubscribed)
            }).catch((e: Error) => {
            alert("There is an error subscribing to this bike")
            console.log(e);
        });
    }

    wishListedBike = (bike: any) => {
        const user = AuthService.getCurrentUser();
        WishListService.addBikeToWishList(user.id, bike.id)
            .then((response: any) => {
                this.setState({
                    wishList: response.data,
                    isWishListed: true
                });
                alert("Successfully added to wish list")
                console.log(this.state.isWishListed)
            }).catch((e: Error) => {
            alert("There is an error adding to wish list")
            console.log(e);
        });
    }

    sortByPriceAsc = () => {
        {
            this.state.bikeData
                .sort((first, second) => {
                    return first.price > second.price ? 1 : -1;
                })
                .map((bike, i) => {
                    return (
                        <div>
                            <h2>{bike.bikeName}</h2>
                            <br/>
                            <img src={require(`../images/${(bike.image)?.split(" ")}`)}
                                 style={{width: '250px', height: '200px'}} alt={""}/>
                            <br/>
                            <b>Brand Name:</b> {bike.brandName}
                            <br/>
                            {/*<br/>*/}
                            <b>Description Brand:</b> {bike.descriptionBrand}
                            {/*<br/>*/}
                            <br/>
                            <b>Type Name:</b> {bike.typeName}
                            <br/>
                            {/*<br/>*/}
                            <b>Description Type:</b> {bike.descriptionType}
                            {/*<br/>*/}
                            <br/>
                            <b>Price:</b> {bike.price}
                            <br/>
                            <b>Quantity:</b> {bike.quantity}

                            <div>
                            </div>
                            {this.state.hideButton === false ?
                                <>
                                    <button
                                        className="btn btn-warning"
                                        onClick={(e) => this.handleOpenFormEdit(bike.id)}

                                    >Edit
                                    </button>
                                    <button onClick={(e) => this.openModalDelete(bike.id)}
                                            className="btn btn-danger"
                                    >Delete
                                    </button>
                                </> : null
                            }

                            <button onClick={(e) => this.addToCart(bike)}
                                    className="btn btn-primary"
                            >Add to cart
                            </button>

                            <button onClick={(e) => this.subscribedBike(bike)}
                                    className="btn btn-success"
                            >Subscribe
                            </button>
                        </div>
                    );
                })
            this.setState({
                defaultOrder: true,
                hideAsc: false
            })
        }
    }

    sortByPriceDesc = () => {
        {
            this.state.bikeData
                .sort((first, second) => {
                    return first.price < second.price ? 1 : -1;
                })
                .map((bike, i) => {
                    return (
                        <div>

                            <h2>{bike.bikeName}</h2>
                            <br/>
                            <img src={require(`../images/${(bike.image)?.split(" ")}`)}
                                 style={{width: '250px', height: '200px'}} alt={""}/>
                            <br/>
                            <b>Brand Name:</b> {bike.brandName}
                            <br/>
                            {/*<br/>*/}
                            <b>Description Brand:</b> {bike.descriptionBrand}
                            {/*<br/>*/}
                            <br/>
                            <b>Type Name:</b> {bike.typeName}
                            <br/>
                            {/*<br/>*/}
                            <b>Description Type:</b> {bike.descriptionType}
                            {/*<br/>*/}
                            <br/>
                            <b>Price:</b> {bike.price}
                            <br/>
                            <b>Quantity:</b> {bike.quantity}


                            <div>

                            </div>


                            {this.state.hideButton === false ?
                                <>
                                    <button
                                        className="btn btn-warning"
                                        onClick={(e) => this.handleOpenFormEdit(bike.id)}

                                    >Edit
                                    </button>
                                    <button onClick={(e) => this.openModalDelete(bike.id)}
                                            className="btn btn-danger"
                                    >Delete
                                    </button>
                                </> : null
                            }

                            <button onClick={(e) => this.addToCart(bike)}
                                    className="btn btn-primary"
                            >Add to cart
                            </button>

                            {/*<button onClick={(e) => this.subscribedBike(bike)}*/}
                            {/*        className="btn btn-success"*/}
                            {/*>Subscribe*/}
                            {/*</button>*/}
                        </div>
                    );
                })
            this.setState({
                defaultOrder: true,
                hideDesc: false
            })
        }
    }

    hideDefaultPage = () => {
        {
            {
                this.getBikes();
            }
        }
    }

    handleChange = (e: any) => {
        this.setState({search: e.target.value})
    };


    render() {
        const {bikeData, editBike, deleteBike} = this.state;
        return (
            <>
                <br/>
                <h2 style={{textAlign: "center"}}>BIKE WEB SHOP</h2>
                <br/>
                <Row>
                    <div className="container text-center justify-content-center ml-4"
                         style={{backgroundColor: "grey", padding: "35px"}}>
                        {!this.state.hideButton ?
                            <button className="btn btn-success" onClick={this.openModal}>Add Bike</button> : null
                        }
                        <button className="btn btn-secondary ml-1" onClick={this.hideDefaultPage}>
                            Default Page
                        </button>
                        <button className="btn btn-secondary ml-1" onClick={this.sortByPriceAsc}>
                            Ascending Price
                        </button>
                        <button className="btn btn-secondary ml-1" onClick={this.sortByPriceDesc}>
                            Descending Price
                        </button>
                        <br/><br/>

                        <Col className="col-sm-6" style={{marginLeft: "260px"}}>
                            <input type="text" onChange={this.handleChange} className="ml-1 form-control"
                                   placeholder="Search for a bike!"/>
                        </Col>
                    </div>
                </Row>

                <Row>
                    {
                        this.state.bikeData.filter((val) => {
                            if (this.state.search === "") {
                                return val;
                            } else if (val.bikeName.toLowerCase().includes(this.state.search.toLowerCase())) {
                                return val;
                            }
                        }).map((bike, index) => (
                            <Col lg="4" key={bike.id}>

                                <Card style={{height: "750px", width: "380px"}}>
                                    <CardContent>
                                        <h4 style={{textAlign: "center"}}>{bike.bikeName}</h4>
                                        <br/>
                                        <img src={require(`../images/${(bike.image)?.split(" ")}`)}
                                             style={{width: '320px', height: '170px'}} alt={""}/>
                                        <br/>
                                        <b>Brand Name:</b> {bike.brandName}
                                        <br/>
                                        {/*<br/>*/}
                                        <b>Description Brand:</b> {bike.descriptionBrand}
                                        {/*<br/>*/}
                                        <br/>
                                        <b>Type Name:</b> {bike.typeName}
                                        <br/>
                                        {/*<br/>*/}
                                        <b>Description Type:</b> {bike.descriptionType}
                                        <br/>
                                        <b>Price:</b> {bike.price}
                                        <br/>
                                        <b>Quantity:</b> {bike.quantity}
                                        <br/>
                                        <b>BIKE STATUS:</b> {bike.bikeStatus}


                                    </CardContent>

                                    <CardActions className={"mt-auto"}>

                                        {this.state.hideButton === false ?
                                            <>
                                                <button
                                                    className="btn btn-warning"
                                                    onClick={(e) => this.handleOpenFormEdit(bike.id)}

                                                >Edit
                                                </button>

                                                <button
                                                    onClick={(e) => this.openModalDelete(bike.id)}
                                                    className="btn btn-danger"
                                                >Delete
                                                </button>
                                            </> : null
                                        }

                                        <button onClick={(e) => this.addToCart(bike)}
                                                className="btn btn-primary">Add to cart
                                        </button>

                                        {/*<button onClick={(e) => this.subscribedBike(bike)}*/}
                                        {/*        className="btn btn-success"*/}
                                        {/*>Subscribe*/}
                                        {/*</button>*/}

                                        <button onClick={(e) => this.wishListedBike(bike)}
                                                className="btn btn-success"
                                        >Add to wishlist
                                        </button>
                                    </CardActions>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>


                <div className="text-center text-md-left mb-5"
                     style={{padding: '20px', color: "white", backgroundColor: "grey"}}>
                    <div className="row">
                        <div className="col-xl-12 ">
                            <h4 className="text-uppercase pb-2" style={{textAlign: "center"}}>Description for our
                                bike web shop</h4>
                            <p className="ml-auto" style={{fontSize: "20px"}}>Beyond bicycles, a local bicycle shop
                                may offer clothing and other accessories,
                                spare and replacement parts,tools, and a variety of services. Services may include
                                expert fitting and custom bike building or ordering, maintenance
                                and repairs from experienced bicycle mechanics, and organized group rides. </p>
                        </div>
                        <hr className="clearfix w-100 d-md-none pb-3"/>
                    </div>
                </div>
                <br/>
                {/*ADD FORM DIALOG*/
                }

                <Dialog
                    fullWidth={true}
                    maxWidth={'sm'}
                    style={{height: '1000px'}}
                    onClose={this.closeModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    open={this.state.isOpen}>

                    <DialogTitle id="alert-dialog-title" style={{textAlign: "center"}}>Add Bike</DialogTitle>
                    <DialogContent>
                        <div>
                            <Label id="bikeName">Bike Name</Label>
                            <input onChange={this.onChangeBikeName}
                                   defaultValue={this.state.bikeName}
                                   name="bikeName"
                                   type="text" className="form-control"
                                   placeholder="Name"/>

                            <Label id="price">Price</Label>
                            <input onChange={this.onChangePrice}
                                   defaultValue={this.state.price}
                                   name="price"
                                   type="number"
                                   className="form-control"
                                   placeholder="Price"/>
                            <Label id="quantity">Quantity</Label>
                            <input defaultValue={this.state.quantity}
                                   name="quantity"
                                   type="number"
                                   className="form-control"
                                   placeholder="Quantity"
                                   onChange={this.onChangeQuantity.bind(this)}/>
                        </div>

                        <br/>

                        <div>
                            <FormControl fullWidth>
                                <Label id="brandName">Bike Brand</Label>
                                <select
                                    className="form-control"
                                    name="brandName"
                                    id="brandName"
                                    onChange={e => this.onChangeBrandName(e)}
                                    value={this.state.brandName}>

                                    <option value=" ">Choose a brand</option>
                                    <option value="Focus">Focus</option>
                                    <option value="Trek">Trek</option>
                                    <option value="Ghost">Ghost</option>
                                    <option value="Scott">Scott</option>
                                    <option value="Specialized">Specialized</option>
                                    <option value="Cube">Cube</option>

                                </select>
                            </FormControl>

                            <br/>
                            <FormControl fullWidth>
                                <Label id="descriptionBrand">Bike Brand Description</Label>
                                <select
                                    className="form-control"
                                    name="descriptionBrand"
                                    id="descriptionBrand"
                                    onChange={e => this.onChangeBrandDescription(e)}
                                    value={this.state.descriptionBrand}>

                                    <option value=" ">Choose a description</option>
                                    <option value="Focus Bikes is a bicycle manufacturer that has its
                                        administration in Stuttgart, Germany. German brand Focus is known for its wide range of
                                         quality bikes that covers almost all cycling disciplines.">
                                        Focus Description
                                    </option>
                                    <option value="Trek Bicycle Corporation is a bicycle and cycling product
                                        manufacturer and distributor under brand names Trek,
                                        Electra Bicycle Company, Bontrager, and Diamant Bikes.">
                                        Trek Description
                                    </option>
                                    <option
                                        value="GHOST-Bikes is a German bicycle manufacturer based in Waldsassen. We have been building GHOST bikes for over 20 years.">
                                        Ghost Description
                                    </option>
                                    <option value="Scott Sports SA (formerly Scott USA) is a Swiss producer of
                                        bicycles, winter equipment, motorsports gear and sportswear. ">
                                        Scott Description
                                    </option>
                                    <option value="Forty years on, and Specialized continues to be a
                                        dominant player in the highly contested retail and professional cycling spaces. ">
                                        Specialized Description
                                    </option>
                                    <option value="Cube bikes are high quality and go through rigorous quality control.
                                                     The components used in their manufacture are also some of the best available ">
                                        Cube Description
                                    </option>
                                </select>
                            </FormControl>

                            <br/>

                            <FormControl fullWidth>
                                <Label id="typeName">Types of Bikes</Label>
                                <select
                                    className="form-control"
                                    name="typeName"
                                    id="typeName"
                                    onChange={e => this.onChangeTypeName(e)}
                                    value={this.state.typeName}
                                >

                                    <option value=" ">Choose a type</option>
                                    <option value="Road Bike">Road Bike</option>
                                    <option value="Mountain Bike">Mountain Bike</option>
                                    <option value="Cruiser Bike">Cruiser Bike</option>
                                    <option value="Utility Bike">Utility Bike</option>
                                    <option value="Touring Bike">Touring Bike</option>

                                </select>
                            </FormControl>


                            <FormControl fullWidth>
                                <Label id="descriptionType">Types of Bikes Description</Label>
                                <select
                                    className="form-control"
                                    name="descriptionType"
                                    id="descriptionType"
                                    onChange={e => this.onChangeTypeDescription(e)}
                                    value={this.state.descriptionType}
                                >

                                    <option value=" ">Choose a type description</option>
                                    <option value="Road bikes are bicycles designed to take you as far and as fast as your
                                                     legs can manage on paved surfaces.">
                                        Road Bike
                                    </option>
                                    <option
                                        value="A mountain bike (MTB) or mountain bicycle is a bicycle designed for off-road cycling.">
                                        Mountain Bike
                                    </option>
                                    <option value="Cruiser Bicycles are similar to hybrid bikes, in that they are designed for casual riding,
                                                     and have a very comfortable, upright riding position, and a large, comfortable seat.">
                                        Cruiser Bike
                                    </option>
                                    <option value="A utility bicycle, city bicycle, urban bicycle, European city bike (ECB), classic bike or simply city-bike,
                                                     is a bicycle designed for frequent short, moderately paced rides through relatively flat urban areas.">
                                        Utility Bike
                                    </option>
                                    <option
                                        value="A touring bike is designed for multi-day rides where you're carrying everything you need with you.">
                                        Touring Bike
                                    </option>

                                </select>
                            </FormControl>
                            <FormControl fullWidth>
                                <Label id="bikeStatus">Bike Status</Label>
                                <select
                                    className="form-control"
                                    name="bikeStatus"
                                    id="bikeStatus"
                                    onChange={e => this.onChangeBikeStatus(e)}
                                    value={this.state.bikeStatus}>

                                    <option value=" ">Choose a status</option>
                                    <option value="AVAILABLE">AVAILABLE</option>
                                    <option value="SOLD">SOLD</option>

                                </select>
                            </FormControl>
                        </div>
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlFile1">Bike Image</label>
                                <input type="file" onChange={this.onChangeImage} value={this.state.image}
                                       className="form-control-file" id="exampleFormControlFile1"/>
                            </div>
                        </form>
                    </DialogContent>

                    <DialogActions>
                        <button onClick={this.closeModal} type="button" className="btn btn-danger">
                            Cancel
                        </button>

                        <button onClick={this.saveBikes} type="submit" className="btn btn-success">
                            Submit
                        </button>

                    </DialogActions>
                </Dialog>


                {/*EDIT FORM DIALOG*/
                }

                {
                    bikeData.map((bike) => (
                        editBike === bike.id ?
                            <Dialog
                                fullWidth={true}
                                maxWidth={'sm'}
                                style={{height: '1000px'}}
                                onClose={this.handleCloseFormEdit}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                open={this.state.openDialogEdit}
                                key={bike.id}
                            >

                                <><DialogTitle id="alert-dialog-title" style={{textAlign: "center"}}>Edit
                                    Bike</DialogTitle>
                                    <DialogContent>
                                        <>
                                            <div>
                                                <Label id="bikeName">Bike Name</Label>
                                                <input defaultValue={bike.bikeName}
                                                       name="bikeName"
                                                       type="text" className="form-control"
                                                       placeholder="Bike name"
                                                       onChange={this.onChangeBikeName.bind(this)}/>

                                                <Label id="Price">Price</Label>
                                                <input defaultValue={bike.price}
                                                       name="price"
                                                       type="number"
                                                       className="form-control"
                                                       placeholder="Price"
                                                       onChange={this.onChangePrice.bind(this)}/>

                                                <Label id="Quantity">Quantity</Label>
                                                <input defaultValue={bike.quantity}
                                                       name="quantity"
                                                       type="number"
                                                       className="form-control"
                                                       placeholder="Quantity"
                                                       onChange={this.onChangeQuantity.bind(this)}/>
                                                <br/>
                                                <FormControl fullWidth>
                                                    <Label id="brandName">Bike Brand</Label>
                                                    <select
                                                        className="form-control"
                                                        name="brandName"
                                                        id="brandName"
                                                        defaultValue={bike.brandName}
                                                        onChange={this.onChangeBrandName.bind(this)}>

                                                        <option value=" ">Choose a brand</option>
                                                        <option value="Focus">Focus</option>
                                                        <option value="Trek">Trek</option>
                                                        <option value="Ghost">Ghost</option>
                                                        <option value="Scott">Scott</option>
                                                        <option value="Specialized">Specialized</option>
                                                        <option value="Cube">Cube</option>
                                                    </select>
                                                </FormControl>

                                                <br/>

                                                <FormControl fullWidth>
                                                    <Label id="descriptionBrand">Bike Brand Description</Label>
                                                    <select
                                                        className="form-control"
                                                        name="descriptionBrand"
                                                        id="descriptionBrand"
                                                        defaultValue={bike.descriptionBrand}
                                                        onChange={this.onChangeBrandDescription.bind(this)}>

                                                        <option value=" ">Choose a description</option>
                                                        <option value="Focus Bikes is a bicycle manufacturer that has its administration in Stuttgart, Germany.
                                                        German brand Focus is known for its wide range of quality bikes that covers almost all cycling disciplines.">
                                                            Focus Description
                                                        </option>
                                                        <option value="Trek Bicycle Corporation is a bicycle and cycling product
                                        manufacturer and distributor under brand names Trek,
                                        Electra Bicycle Company, Bontrager, and Diamant Bikes.">
                                                            Trek Description
                                                        </option>
                                                        <option
                                                            value="GHOST-Bikes is a German bicycle manufacturer based in Waldsassen.We have been building GHOST bikes for over 20 years. ">
                                                            Ghost Description
                                                        </option>
                                                        <option value="Scott Sports SA (formerly Scott USA) is a Swiss producer of
                                        bicycles, winter equipment, motorsports gear and sportswear. ">
                                                            Scott Description
                                                        </option>
                                                        <option value="Forty years on, and Specialized continues to be a
                                        dominant player in the highly contested retail and professional cycling spaces. ">
                                                            Specialized Description
                                                        </option>
                                                        <option value="Cube bikes are high quality and go through rigorous quality control.
                                                     The components used in their manufacture are also some of the best available ">
                                                            Cube Description
                                                        </option>
                                                    </select>

                                                </FormControl>

                                                <br/>

                                                <FormControl fullWidth>
                                                    <Label id="typeName">Types of Bikes</Label>
                                                    <select
                                                        className="form-control"
                                                        name="typeName"
                                                        id="typeName"
                                                        defaultValue={bike.typeName}
                                                        onChange={this.onChangeTypeName.bind(this)}
                                                    >
                                                        <option value=" ">Choose a type</option>
                                                        <option value="Road Bike">Road Bike</option>
                                                        <option value="Mountain Bike">Mountain Bike</option>
                                                        <option value="Cruiser Bike">Cruiser Bike</option>
                                                        <option value="Utility Bike">Utility Bike</option>
                                                        <option value="Touring Bike">Touring Bike</option>

                                                    </select>
                                                </FormControl>

                                                <FormControl fullWidth>
                                                    <Label id="descriptionType">Types of Bikes Description</Label>
                                                    <select
                                                        className="form-control"
                                                        name="descriptionType"
                                                        id="descriptionType"
                                                        defaultValue={bike.descriptionType}
                                                        onChange={this.onChangeTypeDescription.bind(this)}
                                                    >
                                                        <option value=" ">Choose a type description</option>
                                                        <option value="Road bikes are bicycles designed to take you as far and as fast as your
                                                     legs can manage on paved surfaces.">Road Bike
                                                        </option>
                                                        <option
                                                            value="A mountain bike (MTB) or mountain bicycle is a bicycle designed for off-road cycling.">
                                                            Mountain Bike
                                                        </option>
                                                        <option value="Cruiser Bicycles are similar to hybrid bikes, in that they are designed for casual riding,
                                                     and have a very comfortable, upright riding position, and a large, comfortable seat.">
                                                            Cruiser Bike
                                                        </option>
                                                        <option value="A utility bicycle, city bicycle, urban bicycle, European city bike (ECB), classic bike or simply city-bike,
                                                     is a bicycle designed for frequent short, moderately paced rides through relatively flat urban areas.">
                                                            Utility Bike
                                                        </option>
                                                        <option
                                                            value="A touring bike is designed for multi-day rides where you're carrying everything you need with you.">
                                                            Touring Bike
                                                        </option>

                                                    </select>
                                                </FormControl>
                                                <FormControl fullWidth>
                                                    <Label id="bikeStatus">Bike status</Label>
                                                    <select
                                                        className="form-control"
                                                        name="bikeStatus"
                                                        id="bikeStatus"
                                                        defaultValue={bike.bikeStatus}
                                                        onChange={this.onChangeBikeStatus.bind(this)}
                                                    >
                                                        <option value=" ">Choose a status</option>
                                                        <option value="AVAILABLE">AVAILABLE</option>
                                                        <option value="SOLD">SOLD</option>


                                                    </select>
                                                </FormControl>
                                            </div>
                                            <form>
                                                <div className="form-group">
                                                    <label htmlFor="exampleFormControlFile1">Bike Image</label>
                                                    <input type="file" onChange={this.onChangeImage.bind(this)}
                                                           className="form-control-file"/>
                                                </div>
                                            </form>
                                        </>
                                    </DialogContent>


                                    <DialogActions>
                                        <button onClick={this.handleCloseFormEdit} type="button"
                                                className="btn btn-danger">
                                            Cancel
                                        </button>

                                        <button onClick={() => this.updateBike(bike.id)} type="submit"
                                                className="btn btn-success">
                                            Submit
                                        </button>

                                    </DialogActions>
                                </>
                            </Dialog> : <div/>
                    ))
                }

                {/*DELETE MODAL DIALOG*/
                }

                {
                    bikeData.map((bike) => (
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
                                        <p> Are you sure you want to delete bike with name <b>{bike.bikeName}?</b></p>
                                    </div>
                                </DialogContent>

                                <DialogActions>
                                    <button onClick={this.closeModalDelete} type="button" className="btn btn-danger">
                                        Cancel
                                    </button>

                                    <button onClick={() => this.deleteBike(bike.id)} type="submit"
                                            className="btn btn-success">
                                        Submit
                                    </button>

                                </DialogActions>
                            </Dialog> : <div/>
                    ))
                }
            </>
        )
            ;
    }
}
