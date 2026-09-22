import {
    test as base,
    expect
} from "@playwright/test";

import { PlayerApi } from "../api/PlayerApi";
import { DatabaseClient } from "../database/DatabaseClient";

type Fixtures = {
    playerApi: PlayerApi;
    database: DatabaseClient;
};

export const test = base.extend<Fixtures>({

    playerApi: async ({ request }, use) => {

        const playerApi = new PlayerApi(request);

        await use(playerApi);
    },

    database: async ({}, use) => {

        const database = new DatabaseClient();

        await database.connect();

        await use(database);

        await database.disconnect();
    }
});

export { expect };