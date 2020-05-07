import http from "../http-common";

class TutorialDataService{
    getAll() {
        return http.get("/users");
    }

    get(id){
        return http.get(`/users/${id}/editar`);
    }

    create(data){
        return http.post("/users/salvar", data);
    }

    update(id, data){
        return http.put(`users/${id}/atualizar`, data);
    }

    delete(id){
        return http.get(`users/${id}/excluir`);
    }

    findByTitle(title){
        return http.get(`/users?name=${title}`);
    }
}

export default new TutorialDataService();