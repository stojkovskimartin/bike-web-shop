import * as React from "react";
import {Component} from "react";
import MessageService from "../../services/MessageService";
import MessageData from "../../type/MessageData";
import AuthService from "../../services/AuthService";
import BikeData from "../../type/BikeData";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import axios from "axios";
import {Row} from "react-bootstrap";

type Props = {}

type State = {
    messageData: MessageData[],
    userId: number,
    bikeData: BikeData[],
    deleteMessages: number | null,
    deleteMessageById: number | null,
    isOpenModal: boolean,
    isOpenModalDeleteAll: boolean
};

const URI = 'http://localhost:8000/api/message'

export default class MessageComponent extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.getAllMessages = this.getAllMessages.bind(this);

        this.state = {
            messageData: [],
            userId: 0,
            bikeData: [],
            deleteMessages: null,
            deleteMessageById: null,
            isOpenModal: false,
            isOpenModalDeleteAll: false
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({userId: user.id})
        }

        this.getAllMessages();

    }

    getAllMessages() {
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

    deleteMessage = async (id: any) => {
        try {
            await axios.delete(`${URI}/${id}/deleteById`)
            window.location.reload();
        } catch (error) {
            alert(error)
        }
    }

    deleteAllMessages = async () => {
        try {
            await axios.delete(`${URI}/deleteAll`)
            window.location.reload();
        } catch (error) {
            alert(error)
        }
    }

    openModalDelete = (id: any) => this.setState({
        isOpenModal: true,
        deleteMessageById: id
    });

    closeModalDelete = () => this.setState({
        isOpenModal: false
    });

    openModalDeleteAll = () => this.setState({
        isOpenModalDeleteAll: true
    });

    closeModalDeleteAll = () => this.setState({
        isOpenModalDeleteAll: false
    });


    render() {
        const {messageData, deleteMessages, deleteMessageById, isOpenModalDeleteAll, isOpenModal} = this.state;
        return (
            <>
                <br/><br/>
                <h1 style={{textAlign: "center"}}>Notification Page</h1>

                {this.state.messageData.length === 0 ?
                    <h3 style={{textAlign: "center", backgroundColor: "grey"}} className="text-white p-5 m-5">
                        Your notification page is empty!</h3> : null
                }
                <div>
                    {messageData.map((message, index) => (
                        this.state.userId === messageData[index].user.id ?
                            <div className="card w-100">
                                <div className="card-body">
                                    <h5 className="card-title">Message notification</h5>
                                    <p>The bike with name: {messageData[index].bike.bikeName} is in your wishlist,
                                        and {messageData[index].message} </p>  <p></p>
                                    <p className="card-text"></p>
                                    <button className={"btn btn-danger"}
                                            onClick={(e) => this.openModalDelete(message.id)}>Delete
                                    </button>

                                </div>
                            </div> : null
                    ))}
                </div>
                <Row>

                    {this.state.messageData.length === 0 ? null :
                        <div className="container-fluid p-4" style={{backgroundColor: "grey"}}>
                            <button onClick={(e) => this.openModalDeleteAll()}
                                    className="btn btn-danger"
                            >Empty notification page
                            </button>

                        </div>
                    }

                </Row>


                {/*DELETE MODAL DIALOG*/}

                {messageData.map((message) => (
                    deleteMessageById === message.id ?
                        <Dialog
                            fullWidth={true}
                            maxWidth={'sm'}
                            style={{height: '700px'}}
                            onClose={this.closeModalDelete}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            open={isOpenModal}
                            key={message.id}>

                            <DialogTitle id="alert-dialog-title">Delete Message</DialogTitle>

                            <DialogContent>
                                <div>
                                    <p> Are you sure you want to delete this message from notification?</p>
                                </div>
                            </DialogContent>

                            <DialogActions>
                                <button onClick={this.closeModalDelete} type="button" className="btn btn-primary">
                                    Cancel
                                </button>

                                <button onClick={() => this.deleteMessage(message.id)} type="submit"
                                        className="btn btn-success">
                                    Submit
                                </button>

                            </DialogActions>
                        </Dialog> : <div/>
                ))}

                {/*DELETE ALL MODAL DIALOG*/}

                {messageData.map((message) => (
                    <Dialog
                        fullWidth={true}
                        maxWidth={'sm'}
                        style={{height: '700px'}}
                        onClose={this.closeModalDeleteAll}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        open={isOpenModalDeleteAll}
                        key={message.id}>

                        <DialogTitle id="alert-dialog-title">Delete Messages</DialogTitle>

                        <DialogContent>
                            <div>
                                <p> Are you sure you want to delete <b> all the messages </b> from the notification?
                                </p>
                            </div>
                        </DialogContent>

                        <DialogActions>
                            <button onClick={this.closeModalDeleteAll} type="button" className="btn btn-primary">
                                Cancel
                            </button>

                            <button onClick={() => this.deleteAllMessages()} type="submit"
                                    className="btn btn-success">
                                Submit
                            </button>

                        </DialogActions>
                    </Dialog>
                ))}


            </>
        );
    }
}
