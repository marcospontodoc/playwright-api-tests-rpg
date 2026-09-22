import { faker } from "@faker-js/faker";
import { Player } from "../models/Player";

export class PlayerBuilder {

    private player: Player = {
        name: faker.person.fullName(),
        email: faker.internet.email()
    };

    withName(name: string): PlayerBuilder {
        this.player.name = name;
        return this;
    }

    withEmail(email: string): PlayerBuilder {
        this.player.email = email;
        return this;
    }

    build(): Player {
        return this.player;
    }
}