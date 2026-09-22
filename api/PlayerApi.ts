import { APIRequestContext } from "@playwright/test";
import { Player } from "../models/Player";

export class PlayerApi {

    constructor(private request: APIRequestContext) {}

    async create(player: Player) {
        return await this.request.post("/players", {
            data: player
        });
    }

    async findById(id: number) {
        return await this.request.get(`/players/${id}`);
    }

    async findAll() {
        return await this.request.get("/players");
    }

    async update(id: number, player: Player) {
        return await this.request.put(`/players/${id}`, {
            data: player
        });
    }

    async delete(id: number) {
        return await this.request.delete(`/players/${id}`);
    }
}