import UserType from "./UserType";
import BikeData from "./BikeData";

export default interface ShoppingCartData {
    id?: any | null,
    status: string,
    createDate: string,
    user: UserType,
    bike: BikeData
}