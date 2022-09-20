const request = require("supertest");
const server = require("../app");

const db = require("../db/connection");
const seed = require("../db/seed");

beforeEach(() => seed())

afterAll(() => db.end())

describe("GET - /", () => {
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

describe("POST - /user/register", () => {
    test("returns 200 when validation is passed and sends a JWT token as a header", () => {
        const user = {
            firstName: "Daniel",
            lastName: "Williams",
            email: "daniel@gmail.com",
            password: "DanielWilliams25@"
        }
        
        return request(server)
            .post("/user/register")
            .send(user)
            .expect(200)
            .then((res) => {
                const {data} = res.body;
                expect(res.headers.authorization.split(" ")[1]).not.toBeUndefined();
                expect(data).toBe("User has been created");
            })
    })
    test("returns 400 when a field is missing", () => {
        const user = {
            firstName: "Daniel",
            lastName: "Williams",
            email: "daniel@gmail.com",
        }
        return request(server)
            .post("/user/register")
            .send(user)
            .expect(400)
            .then((res) => {
                const {data} = res.body;
                expect(data).toBe("Bad request");
            })
    })
    test("returns 400 when email is invalid", () => {
        const user = {
            firstName: "Daniel",
            lastName: "Williams",
            email: "daniel]@@@gmail.com",
            password: "DanielWilliams25@"
        }
        return request(server)
            .post("/user/register")
            .send(user)
            .expect(400)
            .then((res) => {
                const {data} = res.body;
                expect(data).toBe("Bad request");
            })

    })
    test("returns 400 when password is not strong enough", () => {
        const user = {
            firstName: "Daniel",
            lastName: "Williams",
            email: "daniel@gmail.com",
            password: "12345"
        }
        return request(server)
            .post("/user/register")
            .send(user)
            .expect(400)
            .then((res) => {
                const {data} = res.body;
                expect(data).toBe("Bad request");
            })
    })
    test("returns 409 when an email is already taken", () => {
        const user = {
            firstName: "Daniel",
            lastName: "Williams",
            email: "lili@gmail.com",
            password: "DanielWilliams25@"
        }
        return request(server)
            .post("/user/register")
            .send(user)
            .expect(409)
            .then((res) => {
                const {data} = res.body;
                expect(data).toBe("Email is already in use");
            })
    })
})

describe("POST - /user/login", () => {
    test("returns 200 when credentials are correct and sends a JWT token as a header", () => {
        const credentials = {
            email: "paul@gmail.com",
            password: "PaulStatham55!"
        }
        return request(server)
            .post("/user/login")
            .send(credentials)
            .expect(200)
            .then((res) => {
                const {data} = res.body;
                expect(res.headers.authorization.split(" ")[1]).not.toBeUndefined();
                expect(data).toBe("Login successful")
            })
    })
    test("returns 400 when fields are missing", () => {
        const credentials = {email: "paul@gmail.com"}
            return request(server)
            .post("/user/login")
            .send(credentials)
            .expect(400)
            .then((res) => {
                const {data} = res.body;
                expect(data).toBe("Bad request")
            })
    })
    test("returns 401 when credentials do not match", () => {
        const credentials = {
            email: "paul@gmail.com",
            password: "PaulStatham55##"
        }
        return request(server)
            .post("/user/login")
            .send(credentials)
            .expect(401)
            .then((res) => {
                const {data} = res.body;
                expect(data).toBe("Invalid email or password")
            })
    })
})

describe("GET - /user", () => {
    test("returns 200 when a token passes validation and sends the user details", async () => {
        const credentials = {
            email: "paul@gmail.com",
            password: "PaulStatham55!"
        }
        return request(server)
                .post("/user/login")
                .send(credentials)
                .expect(200)
                .then((res) => {
                    const token = res.headers.authorization.split(" ")[1]
                    return request(server)
                        .get("/user")
                        .auth(token, {type: "bearer"})
                        .then((res) => {
                            const {data} = res.body;
                            expect(data).toMatchObject({
                                email: "paul@gmail.com",
                                firstName: "Paul",
                                lastName: "Statham",
                                iat: expect.any(Number),
                                exp: expect.any(Number)
                            })
                        })
                })
    })
    test("returns 401 when a request has been sent without a token", async () => {
        return request(server)
                        .get("/user")
                        .expect(401)
                        .then((res) => {
                            const {data} = res.body;
                            expect(data).toBe("Unauthorized request")
                        })
    })
    test("returns 401 when a token is invalid", async () => {
        return request(server)
                        .get("/user")
                        .auth("Some invalid token", {type: "bearer"})
                        .expect(401)
                        .then((res) => {
                            const {data} = res.body;
                            expect(data).toBe("Invalid or expired token")
                        })
    })
})