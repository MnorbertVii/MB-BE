/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: Test article
 *         content:
 *           type: string
 *           example: This is a test article
 *         image:
 *           type: string
 *           example: https://res.cloudinary.com/dzxrlxews/image/upload/v1712765478/obz6h1lp…
 *         comments:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 example: nimuhnorbert@gmail.com
 *               comment:
 *                 type: string
 *                 example: commenting!
 *         likes:
 *           type: object
 *           properties:
 *             likesNumber:
 *               type: integer
 *               example: 1
 *             user:
 *               type: array
 *               items:
 *                 type: string
 *                 format: email
 *                 example: nimuhnorbert@gmail.com
 */

/**
 * @swagger
 * /articles:
 *   get:
 *     tags:
 *       - Article endpoints
 *     summary: Getting a list of all articles
 *     description: Getting a list of all articles
 *     operationId: viewArticles
 *     responses:
 *       '200':
 *         description: Success
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /articles/{Id}:
 *   get:
 *     tags:
 *       - Article endpoints
 *     summary: Find single article by ID
 *     description: Returns a single article
 *     operationId: getArticleById
 *     parameters:
 *       - name: Id
 *         in: path
 *         description: ID of article to be returned
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *           example: 63c0674c452515f26fab04f7
 *     responses:
 *       '200':
 *         description: success
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /article/{Id}/comments:
 *  get:
 *     tags:
 *       - Article endpoints
 *     summary: Get all comments on an article
 *     description: Get all comments on an article
 *     operationId: getComments
 *     parameters:
 *       - name: Id
 *         in: path
 *         description: ID of article to be returned
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *           example: 63c0674c452515f26fab04f7
 *     responses:
 *       '200':
 *         description: success
 *       '500':
 *         description: Internal server error
 */


/**
 * @swagger
 * /articles:
 *   post:
 *     tags:
 *       - Article endpoints
 *     summary: Create a new article
 *     description: Create a new article with an image
 *     operationId: createArticle
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the article
 *               content:
 *                 type: string
 *                 description: The content of the article
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file to be uploaded
 *     responses:
 *       '201':
 *         description: Article created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 *     security: 
 *       - {}
 *       - bearerAuth: [] 
 */

/**
 * @swagger
 * /articles/{Id}:
 *   put:
 *     tags:
 *       - Article endpoints
 *     summary: Update an article
 *     description: Update an article with an image
 *     operationId: updateArticle
 *     parameters:
 *       - name: Id
 *         in: path
 *         description: ID of article to be updated
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *           example: 63c0674c452515f26fab04f7
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the article
 *               content:
 *                 type: string
 *                 description: The content of the article
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file to be uploaded
 *     responses:
 *       '200':
 *         description: Article updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Not Authorized
 *       '403':
 *         description: Forbidden
 *       '409':
 *         description: Conflict
 *       '500':
 *         description: Internal server error
 *     security: 
 *       - {}
 *       - bearerAuth: [] 
 */


/**
 * @swagger
 * /articles/{Id}:
 *   delete:
 *     tags:
 *       - Article endpoints
 *     summary: Deletes an article
 *     description: delete an article by ID
 *     operationId: deleteArticle
 *     parameters:
 *       - name: Id
 *         in: path
 *         description: Id of article to be deleted
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *           example: 63c0674c452515f26fab04f7
 *     responses:
 *       '200':
 *         description: Success
 *       '404':
 *         description: Article not found
 *       '403':
 *         description: Forbidden
 *       '401':
 *         description: Not Authorized
 *     security: 
 *       - {}
 *       - bearerAuth: [] 
 */

/**
 * @swagger
 * /article/{Id}/comment:
 *   post:
 *     tags:
 *       - Article endpoints
 *     summary: Comment on an article
 *     description: Commenting on specified article's id 
 *     operationId: postComment
 *     requestBody:
 *       description: Post a comment on an article
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 example: amazing post
 *       required: true
 *     parameters:
 *       - name: Id
 *         in: path
 *         description: ID of article to be returned
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *           example: 63c0674c452515f26fab04f7
 *     responses:
 *       '200':
 *         description: success
 *       '401':
 *         description: Not Authorized
 *       '500':
 *         description: Internal server error
 *     security: 
 *       - {}
 *       - bearerAuth: [] 
 */

/**
 * @swagger
 * /article/{Id}/like:
 *   post:
 *     tags:
 *       - Article endpoints
 *     summary: Adding or removing a like on an article
 *     description: Adding or removing a like on specified article's id
 *     operationId: postLike
 *     parameters:
 *       - name: Id
 *         in: path
 *         description: ID of article to like
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *           example: 63c0674c452515f26fab04f7
 *     responses:
 *       '200':
 *         description: success
 *       '401':
 *         description: Not Authorized
 *       '500':
 *         description: Internal server error
 *     security: 
 *       - {}
 *       - bearerAuth: [] 
 */