import BikeData from "./BikeData";
import UserType from "./UserType";

export default interface MessageData {
    id?: any,
    message: string,
    bike: BikeData,
    user: UserType

}