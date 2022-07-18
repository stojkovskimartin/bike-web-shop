import http from "../http/HttpCommonWishList";


class WishListService {

    getAllFromCartLoggedUser(userId: any) {
        return http.get<Array<any>>(`/findById/${userId}`);
    }

    addBikeToWishList(userId:any, bikeId: any) {
        return http.post<Array<any>>(`/${userId}/${bikeId}/bikes`);
    }

    removeBikeFromWishList(bikeId: any) {
        return http.delete<Array<any>>(`/${bikeId}/bikes`);
    }

}

export default new WishListService();