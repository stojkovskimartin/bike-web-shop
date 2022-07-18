import UserType from "./UserType";
import BikeData from "./BikeData";

export default interface WishListData {
    id?: any | null,
    user: UserType,
    bike: BikeData
}