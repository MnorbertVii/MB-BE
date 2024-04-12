import request from "supertest";
import app from "../src/app";
import Article from "../src/models/article.model";
import Message from "../src/models/message.model";
import fs from "fs";
import path from "path";
import {v2 as cloudinary} from 'cloudinary';
jest.mock('cloudinary');


const TOKEN: string =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGNiMTViN2IxNmNiODJjZTMyYjVmNCIsImVtYWlsIjoibmltdWhub3JiZXJ0QGdtYWlsLmNvbSIsImlhdCI6MTcxMjc1MDQyOCwiZXhwIjoxNzE1MzQyNDI4fQ.6j43aF1Ihv2nVZOzk4v8TJBGOz5Ai4779_CYhzcq6Oc";
const num: number = Math.floor(Math.random() * 10000);


test("Resource NOT FOUND", async () => {
    const response = await request(app).get("/art").send();
    expect(response.statusCode).toBe(404);
});


describe('Articles API', () => {
  beforeAll(() => {
    (cloudinary.uploader.upload as jest.Mock).mockResolvedValue({
      secure_url: 'http://mocked_url.com/test-image.jpg',
    });
	
  });
  
  // it('should create an article with image', async () => {
    
  //   const imagePath = '../images/avatar_1 - Copy.jpg';
  //   const filePath = path.join(__dirname, imagePath);
  //   const file = fs.readFileSync(filePath);

  //   const response = await request(app)
  //     .post('/articles')
	//   .set("Authorization", TOKEN)
  //     .attach('image', file, imagePath)
  //     .field('title', 'Test Article')
  //     .field('content', 'This is a test article.');

  //   expect(response.status).toBe(201);
  //   expect(response.body.message).toBe('Article created successfully');
  // });

  it('should get articles', async () => {
    const response = await request(app).get("/articles").send();
    expect(response.statusCode).toBe(200);
  });

  it('should get single article', async () => {
    const article = await Article.findOne();
    if(!article){
      throw new Error('No article found');
    }
    const id = article._id;
    const response =  await request(app).get("/articles/"+id);
    expect(response.statusCode).toBe(200);
  });
  
//   it("should delete an article ", async () => {
//     const article = await Article.findOne({ title:"updated Test Article"})
// 	if(!article){
// 	  throw new Error('No article found');
// 	}
//     const id = article._id
//     const response = await request(app).delete("/articles/"+id).set("Authorization",TOKEN)
//     expect(response.statusCode).toBe(200);
// })
   

  afterAll(() => {
    jest.restoreAllMocks();
  });
});


// describe('updating an article with an image', () => {
// 	beforeAll(() => {
// 		(cloudinary.uploader.upload as jest.Mock).mockResolvedValue({
// 			secure_url: 'http://mocked_url.com/updated-image.jpg',
// 		});
//   });
//     it('should update an article with image', async () => {
//       const article = await Article.findOne({title: "Test Article"});
//       if(!article){
//         throw new Error('No article found');
//       }
//       const id = article._id;
//       const imagePath = '../images/avatar_2 - Copy.jpg';
//       const filePath = path.join(__dirname, imagePath);
//       const file = fs.readFileSync(filePath);
  
//       const response = await request(app)
//         .put(`/articles/${id}`)
//         .set("Authorization", TOKEN)
//         .attach('image', file, imagePath)
//         .field('title', 'updated Test Article')
//         .field('content', 'This is a updated test article.');
  
//       expect(response.status).toBe(200);
//     });
//     afterAll(() => {
//       jest.restoreAllMocks();
// });
// });


describe('Users API', () => {
  it('should get users', async () => {
    const response = await request(app).get("/users").send().set("Authorization",TOKEN);
    expect(response.statusCode).toBe(200);
  });

  it('should sign up a user', async () => {
    const response = await request(app).post("/users/signup").send({
      fullName: "user",
      email: "user" + num + "@gmail.com",
      password: "user123"
    });
    expect(response.statusCode).toBe(200);
  });

  it('should log in a user', async () => {
    const response = await request(app).post("/users/login").send(
      { email:"user6711@gmail.com",
        password:"user123"
      }
    );
    expect(response.statusCode).toBe(200);
  });
});

describe('Messages API', () => {
  it('should get messages', async () => {
    const response = await request(app).get("/messages").send().set("Authorization",TOKEN);
    expect(response.statusCode).toBe(200);
  });

  it('should create a message', async () => {
    const response = await request(app)
      .post("/messages")
      .send({ 
        name: "test name",
        email: "testemail@gmail.com",
        message: "test message content",
      });
    expect(response.statusCode).toBe(200);
  });

  it('should delete a message', async () => {
    const messages = await Message.findOne();
    
    if (!messages) {
      throw new Error('No message found');
    }
  
    const id = messages._id;
    const response = await request(app).delete("/messages/"+id).set("Authorization",TOKEN);
    expect(response.statusCode).toBe(200);
  });
});


describe('Article(comments & likes) API', () => {
  it('should like an article', async () => {
    const article = await Article.findOne();
    if (!article) {
      throw new Error('No article found');
    }
    const id = article._id;
    const response = await request(app).post("/article/"+id+"/like").set("Authorization",TOKEN).send();
    expect(response.statusCode).toBe(200);
  });

  it('should comment on an article', async () => {
    const article = await Article.findOne();
    if (!article) {
      throw new Error('No article found');
    }
    const id = article._id;
    const response = await request(app).post("/article/"+id+"/comment").set("Authorization",TOKEN).send({
      comment: "what a nice post"
    });
    expect(response.statusCode).toBe(200);
  });

  it('should get comments on an article', async () => {
    const article = await Article.findOne();
    if(!article){
      throw new Error('No article found');
    }
    const id = article._id;
    const response = await request(app).get("/article/"+id+"/comments");
    expect(response.statusCode).toBe(200);
  });

  it('should delete a comment on an article', async () => {
    const article = await Article.findOne({title:"theme : let's talk about agriculture"});
    if(!article){
      throw new Error('No article found');
    }
    const aId = article._id;
    const cId = article.comments[0]._id;
    const response = await request(app).delete("/article/"+aId+"/comment/"+cId).set("Authorization",TOKEN);
    expect(response.statusCode).toBe(200);
  });
});
