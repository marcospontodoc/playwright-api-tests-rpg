import { faker } from "@faker-js/faker";
import { Character } from "../models/Character";

export class CharacterBuilder {

    private character: Character = {
        idPlayer: 1,
        idClass: 1,
        name: faker.person.firstName(),
        level: 1
    };

    withPlayer(idPlayer: number): CharacterBuilder {
        this.character.idPlayer = idPlayer;
        return this;
    }

    withClass(idClass: number): CharacterBuilder {
        this.character.idClass = idClass;
        return this;
    }

    withName(name: string): CharacterBuilder {
        this.character.name = name;
        return this;
    }

    withLevel(level: number): CharacterBuilder {
        this.character.level = level;
        return this;
    }

    build(): Character {
        return this.character;
    }
}