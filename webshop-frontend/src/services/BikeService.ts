import BikeData from "../type/BikeData";
import http from "../http/HttpCommon";


class BikeService {

    getAll() {
        return http.get<Array<BikeData>>("/bikes");
    }

    get(id: any) {
        return http.get<BikeData>(`/bikes/${id}`);
    }

    create(data: BikeData) {
        return http.post<BikeData>("/bikes", data);
    }

    update( data: BikeData, id?: any, userId? : any) {
        return http.put<any>(`/bikes/${id}/${userId}`, data);
    }

    delete(id: any) {
        return http.delete<any>(`/bikes/${id}`);
    }

}

export default new BikeService();