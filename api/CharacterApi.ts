import { APIRequestContext } from "@playwright/test";
import { Character } from "../models/Character";

export class CharacterApi {

    constructor(private request: APIRequestContext) {}

    async create(character: Character) {
        return await this.request.post("/characters", {
            data: character
        });
    }

    async getById(idCharacter: number) {
        return await this.request.get(`/characters/${idCharacter}`);
    }

    async getAll() {
        return await this.request.get("/characters");
    }

    async update(idCharacter: number, character: Character) {
        return await this.request.put(`/characters/${idCharacter}`, {
            data: character
        });
    }

    async delete(idCharacter: number) {
        return await this.request.delete(`/characters/${idCharacter}`);
    }
}