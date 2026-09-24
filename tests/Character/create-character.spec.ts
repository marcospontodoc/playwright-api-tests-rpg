import { test, expect } from "../../fixtures/test";
import { CharacterBuilder } from "../../builders/CharacterBuilder";

test("should create a new character with valid data", async ({
    characterApi,
    database,
    testData
}) => {

    const character = new CharacterBuilder()
        .withPlayer(testData.playerId)
        .withClass(testData.classId)
        .build();

    const response = await characterApi.create(character);

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    expect(responseBody.name).toBe(character.name);
    expect(responseBody.level).toBe(character.level);
    expect(responseBody.idPlayer).toBe(testData.playerId);
    expect(responseBody.idClass).toBe(testData.classId);

    const characterId = responseBody.idCharacter;

    const result = await database.query(
        `
        SELECT *
        FROM character
        WHERE id_character = $1
        `,
        [characterId]
    );

    expect(result.rowCount).toBe(1);

    expect(result.rows[0].id_player).toBe(testData.playerId);
    expect(result.rows[0].id_class).toBe(testData.classId);
    expect(result.rows[0].name).toBe(character.name);
    expect(result.rows[0].level).toBe(character.level);
});

test("should not create a character with empty name", async ({
    characterApi,
    database,
    testData
}) => {

    const character = new CharacterBuilder()
        .withPlayer(testData.playerId)
        .withClass(testData.classId)
        .withName("")
        .build();

    const response = await characterApi.create(character);

    expect(response.status()).toBe(400);

    const result = await database.query(
        `
        SELECT *
        FROM character
        WHERE id_player = $1
        AND name = $2
        `,
        [testData.playerId, character.name]
    );

    expect(result.rowCount).toBe(0);
});


test("should not create a character with invalid level", async ({
    characterApi,
    database,
    testData
}) => {

    const character = new CharacterBuilder()
        .withPlayer(testData.playerId)
        .withClass(testData.classId)
        .withLevel(0)
        .build();

    const response = await characterApi.create(character);

    expect(response.status()).toBe(400);

    const result = await database.query(
        `
        SELECT *
        FROM character
        WHERE id_player = $1
        AND name = $2
        `,
        [testData.playerId, character.name]
    );

    expect(result.rowCount).toBe(0);
});

test("should not create a character with invalid id_class", async ({
    characterApi,
    database,
    testData
}) => {

    const character = new CharacterBuilder()
        .withPlayer(testData.playerId)
        .withClass("invalid" as any)
        .build();

    const response = await characterApi.create(character);

    expect(response.status()).toBe(400);

    const result = await database.query(
        `
        SELECT *
        FROM character
        WHERE id_player = $1
        AND name = $2
        `,
        [testData.playerId, character.name]
    );

    expect(result.rowCount).toBe(0);
});