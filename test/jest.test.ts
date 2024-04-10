import request from "supertest";
import app from "../src/app";

const TOKEN: string = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGNiMTViN2IxNmNiODJjZTMyYjVmNCIsImVtYWlsIjoibmltdWhub3JiZXJ0QGdtYWlsLmNvbSIsImlhdCI6MTcxMjc1MDQyOCwiZXhwIjoxNzE1MzQyNDI4fQ.6j43aF1Ihv2nVZOzk4v8TJBGOz5Ai4779_CYhzcq6Oc";
const num: number = Math.floor(Math.random() * 10000);

test("get articles", async () => {
	const response = await request(app).get("/articles").send();
	expect(response.statusCode).toBe(200);
});