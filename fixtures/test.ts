import {
    test as base,
    expect
} from "@playwright/test";

import { PlayerApi } from "../api/PlayerApi";
import { CharacterApi } from "../api/CharacterApi";
import { DatabaseClient } from "../database/DatabaseClient";

type Fixtures = {
    playerApi: PlayerApi;
    characterApi: CharacterApi;
    database: DatabaseClient;

    testData: {
        playerId: number;
        classId: number;
    };
};

export const test = base.extend<Fixtures>({

    playerApi: async ({ request }, use) => {

        const playerApi = new PlayerApi(request);

        await use(playerApi);
    },

    characterApi: async ({ request }, use) => {

        const characterApi = new CharacterApi(request);

        await use(characterApi);
    },

    database: async ({}, use) => {

        const database = new DatabaseClient();

        await database.connect();

        await use(database);

        await database.disconnect();
    },

    testData: async ({ database }, use) => {

        const playerResult = await database.query(
            `
            SELECT id_player
            FROM player
            LIMIT 1
            `
        );

        const classResult = await database.query(
            `
            SELECT id_class
            FROM class
            LIMIT 1
            `
        );

        if (playerResult.rowCount === 0) {
            throw new Error("No player found in database");
        }

        if (classResult.rowCount === 0) {
            throw new Error("No class found in database");
        }

        await use({
            playerId: playerResult.rows[0].id_player,
            classId: classResult.rows[0].id_class
        });
    }
});

export { expect };