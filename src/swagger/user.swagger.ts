/**
 * @swagger
 * components:
 *   schemas:
 *      User: 
 *         type: object
 *         properties: 
 *           fullName: 
 *             type: string
 *             example: villa Muhizi
 *           email:
 *             type: string
 *             format: email
 *             example: nimuhnorbert@gmail.com
 *           password: 
 *              type: string 
 *              example: $m3llycat
 * @swagger
 *   /users/login:
 *   post:
 *     tags:
 *       - Users endpoints
 *     summary: Logging in a user
 *     description: use this endpoint to login
 *     operationId: userlogin
 *     requestBody:
 *         description: Body for the login request (need email and password to login)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *               required:
 *                 - email
 *                 - password
 *     responses:
 *       "200":
 *           description: successful login
 *       '500':
 *        description: Internal server error
 */
  
/** 
 * @swagger
 * /users/signup:
 *   post:
 *     tags:
 *       - Users endpoints
 *     summary: Signing up a user
 *     description: use this endpoint to register
 *     operationId: userSignup
 *     requestBody:
 *         description: Body to signup a user (need fullName,email,password)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *               required:
 *                 - fullName
 *                 - email
 *                 - password
 *     responses:
 *       "200":
 *           description: successful signup
 *       "409":
 *           description: Conflict
 *       '500':
 *         description: Internal server error
 * 
 */


/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users endpoints
 *     summary: Getting a list of all registered users
 *     description: Getting a list of all registered users
 *     operationId: viewUsers
 *     responses:
 *       '200':
 *         description: Success
 *       '500':
 *         description: Internal server error
 *     security:
 *       - {}
 *       - bearerAuth: [] 
 */
