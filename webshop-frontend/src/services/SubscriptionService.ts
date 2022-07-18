import http from "../http/HttpCommonSubscription";


class ShoppingCartService {

    getAllFromCartLoggedUser(userId: any) {
        return http.get<Array<any>>(`/findById/${userId}`);
    }

    addBikeToSubscription(userId:any, bikeId: any) {
        return http.post<Array<any>>(`/${userId}/${bikeId}/bikes`);
    }

    removeBikeFromSubscription(bikeId: any) {
        return http.delete<Array<any>>(`/${bikeId}/bikes`);
    }

}

export default new ShoppingCartService();