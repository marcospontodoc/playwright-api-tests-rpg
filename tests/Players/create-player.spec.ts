import { test, expect } from "../../fixtures/test";
import { PlayerBuilder } from "../../builders/PlayerBuilder";

test("should create a new player with valid data", async ({
    playerApi,
    database
}) => {

    const player = new PlayerBuilder().build();

    const response = await playerApi.create(player);

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    expect(responseBody.name).toBe(player.name);
    expect(responseBody.email).toBe(player.email);

    const playerId = responseBody.idPlayer;

    const result = await database.query(
        `
        SELECT *
        FROM player
        WHERE id_player = $1
        `,
        [playerId]
    );

    expect(result.rowCount).toBe(1);

    expect(result.rows[0].name).toBe(player.name);
    expect(result.rows[0].email).toBe(player.email);
});
