import http from "../http/HttpCommonCart";


class ShoppingCartService {

    getAllFromCartLoggedUser(userId: any) {
        return http.get<Array<any>>(`/findById/${userId}`);
    }

    addBikeToShoppingCart(userId:any, bikeId: any) {
        return http.post<Array<any>>(`/${userId}/${bikeId}/bikes`);
    }

    removeBikeFromShoppingCart(bikeId: any) {
        return http.delete<Array<any>>(`/${bikeId}/bikes`);
    }

    removeAllBikesFromShoppingCart() {
        return http.delete<Array<any>>(`/bikes`);
    }
}

export default new ShoppingCartService();