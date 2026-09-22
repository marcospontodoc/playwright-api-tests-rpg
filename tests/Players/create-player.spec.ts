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

test("should not create a player with invalid email", async ({
    playerApi,
    database
}) => {

    const player = new PlayerBuilder()
        .withEmail("email-invalido")
        .build();

    const response = await playerApi.create(player);

    expect(response.status()).toBe(400);

    const result = await database.query(
        `
        SELECT *
        FROM player
        WHERE email = $1
        `,
        [player.email]
    );

    expect(result.rowCount).toBe(0);
});

test("should not create a player with empty email", async ({
    playerApi,
    database
}) => {

    const player = new PlayerBuilder()
        .withEmail("")
        .build();

    const response = await playerApi.create(player);

    expect(response.status()).toBe(400);

    const result = await database.query(
        `
        SELECT *
        FROM player
        WHERE email = $1
        `,
        [player.email]
    );

    expect(result.rowCount).toBe(0);
});

test("should not create a player with empty name", async ({
    playerApi,
    database
}) => {

    const player = new PlayerBuilder()
        .withName("")
        .build();

    const response = await playerApi.create(player);

    expect(response.status()).toBe(400);

    const result = await database.query(
        `
        SELECT *
        FROM player
        WHERE email = $1
        `,
        [player.email]
    );

    expect(result.rowCount).toBe(0);
});

test("should not create a player with existing email", async ({
    playerApi,
    database
}) => {

    // Create the first player
    const existingPlayer = new PlayerBuilder().build();

    const firstResponse = await playerApi.create(existingPlayer);

    expect(firstResponse.status()).toBe(201);

    const firstResponseBody = await firstResponse.json();

    const existingPlayerId = firstResponseBody.idPlayer;

  
    const player = new PlayerBuilder()
        .withEmail(existingPlayer.email)
        .build();

    const response = await playerApi.create(player);

    expect(response.status()).toBe(400);


    const result = await database.query(
        `
        SELECT *
        FROM player
        WHERE email = $1
        `,
        [existingPlayer.email]
    );

    expect(result.rowCount).toBe(1);

    expect(result.rows[0].id_player).toBe(existingPlayerId);
    expect(result.rows[0].name).toBe(existingPlayer.name);
    expect(result.rows[0].email).toBe(existingPlayer.email);
});