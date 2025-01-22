/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           # format: int64
 *           example: Villa 
 *         email:
 *           type: string
 *           format: email
 *           example: nimuhnorbert@gmail.com
 *         message:
 *           type: string
 *           example: hey i am a MERN stack dev let's connect
 *
 *
 * @swagger
 * /messages:
 *   post:
 *     tags:
 *       -  Message endpoints
 *     summary: posting messages from contact page
 *     description: posting messages from contact page
 *     requestBody:
 *       description: Post a message for contacting me about anything
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Message'
 *             required:
 *               - name
 *               - email
 *               - message
 *       required: true
 *     responses:
 *       '200':
 *         description: successful operation
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /messages:
 *    get:
 *       tags:
 *         -  Message endpoints
 *       summary: Get all messages sent 
 *       description: Get all messages sent from contact page
 *       operationId: getMessages
 *       responses:
 *         '200':
 *           description: success
 *         '401':
 *           description: Not Authorized
 *         '404':
 *           description: No messages found
 *         '403':
 *           description: Forbidden
 *         '500':
 *           description: Internal server error
 *       security: 
 *       - {}
 *       - bearerAuth: [] 
 */




/**
 * @swagger
 * /messages/{Id}:
 *    delete:
 *       tags:
 *         -  Message endpoints
 *       summary: deleting a message
 *       description: deleting a message from db
 *       operationId: Delete a single Message
 *       parameters:
 *         - name: Id
 *           in: path
 *           description: ID of the message
 *           required: true
 *           schema:
 *             type: string
 *             format: objectId
 *             example: 63a567bc2a672df0a5192bb8
 *       responses:
 *         '200':
 *           description: success
 *         '500':
 *           description: Internal server error
 *       security: 
 *       - {}
 *       - bearerAuth: [] 
 */