import UserType from "./UserType";
import BikeData from "./BikeData";

export default interface SubscriptionData {
    id?: any | null,
    user: UserType,
    bike: BikeData
}