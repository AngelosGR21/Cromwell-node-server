const request = require("supertest");
const server = require("../app");

const db = require("../db/connection");
const seed = require("../db/seed");

beforeEach(() => seed())

afterAll(() => db.end())

describe("GET - '/'", () => {
    test("checking if api is working", () => {
        return request(server)
        .get("/")
        .expect(200)
        .then((res) => {
            const {data} = res.body;
            expect(data).toBe("Api is up and running")
        })
    })
})