import request from "supertest";
import app from "../src/app";

const TOKEN: string = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGNiMTViN2IxNmNiODJjZTMyYjVmNCIsImVtYWlsIjoibmltdWhub3JiZXJ0QGdtYWlsLmNvbSIsImlhdCI6MTcxMjc1MDQyOCwiZXhwIjoxNzE1MzQyNDI4fQ.6j43aF1Ihv2nVZOzk4v8TJBGOz5Ai4779_CYhzcq6Oc";
const num: number = Math.floor(Math.random() * 10000);

test("get articles", async () => {
	const response = await request(app).get("/articles").send();
	expect(response.statusCode).toBe(200);
});


// test ("create article", async () => {
// 	const response = await request(app).post("/articles").set("Authorization", TOKEN).send({
// 		title: "test article title",
// 		content: "test article content",
// 		image: "https://th.bing.com/th/id/R.3d88a927f8529dcba03364b09d98adbe?rik=JYmQaMVSULpYQg&riu=http%3a%2f%2fthewowstyle.com%2fwp-content%2fuploads%2f2015%2f01%2fnature-images.jpg&ehk=BNPsuSOUR7ATZ3EpRwxx1xFl7LUbO3tYlu1wFLCBrCE%3d&risl=&pid=ImgRaw&r=0"
// 	});
// 	expect(response.statusCode).toBe(201);
// })

