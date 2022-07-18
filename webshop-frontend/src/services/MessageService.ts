import http from "../http/HttpCommonMessage";
import MessageData from "../type/MessageData";


class MessageService {

    getAll() {
        return http.get<Array<MessageData>>("/allMessages");
    }

    get(id: any) {
        return http.get<MessageData>(`/${id}/messageById`);
    }
}

export default new MessageService();