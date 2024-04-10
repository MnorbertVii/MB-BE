import request from "supertest";
import app from "../src/app";
import FormData from "form-data";
import fs from "fs";
import path from "path";

const TOKEN: string = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGNiMTViN2IxNmNiODJjZTMyYjVmNCIsImVtYWlsIjoibmltdWhub3JiZXJ0QGdtYWlsLmNvbSIsImlhdCI6MTcxMjc1MDQyOCwiZXhwIjoxNzE1MzQyNDI4fQ.6j43aF1Ihv2nVZOzk4v8TJBGOz5Ai4779_CYhzcq6Oc";
const num: number = Math.floor(Math.random() * 10000);

test("get articles", async () => {
	const response = await request(app).get("/articles").send();
	expect(response.statusCode).toBe(200);
});

test("get messages", async () => {
    const response = await request(app).get("/messages").send().set("Authorization",TOKEN);
    expect(response.statusCode).toBe(200);
});

test("get users", async () => {
    const response = await request(app).get("/users").send().set("Authorization",TOKEN);
    expect(response.statusCode).toBe(200);
});

test("Resource NOT FOUND", async () => {
    const response = await request(app).get("/art").send();
    expect(response.statusCode).toBe(404);
})

test("post signup ", async () => {
    const response = await request(app).post("/users/signup").send({
        fullName: "user",
        email: "user" + num + "@gmail.com",
        password: "user123"
    }
    );
    expect(response.statusCode).toBe(200);
})

test("post login", async () => {
    const response = await request(app).post("/users/login").send(
        { email:"user6711@gmail.com",
        password:"user123"
        }
    );
    expect(response.statusCode).toBe(200);
})




// test ("create article", async () => {
// 	const req =  request(app).post("/articles").set("Authorization", TOKEN)
// 	.field("title", "test article title")
//     .field("content", "test article content")
//     .attach("image", fs.createReadStream(path.join(__dirname, "images/avatar_1 - Copy.jpg")));
// 	req.on('error', err => console.log(err));

// 	const response = await req;

// 	console.log(response);
// 	expect(response.statusCode).toBe(201);
// });
