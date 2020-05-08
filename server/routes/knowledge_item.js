var router = require("express").Router(),
  _ = require("lodash"),
  writeResponse = require("../helpers/response").writeResponse,
  writeError = require("../helpers/response").writeError,
  logger = require("../logger");
module.exports = function(neode) {
  /**
   * @swagger
   * definition:
   *   KnowledgeItem:
   *     type: object
   *     properties:
   *       ID:
   *         type: integer
   *       Label:
   *         type: string
   *       Topic:
   *         type: string
   *       Statement:
   *         type: string
   *       ExamBoard:
   *         type: object
   */

  /**
   * @swagger
   * /api/v1/knowledgeitems:
   *   get:
   *     tags:
   *     - knowledgeitem
   *     description: Find all knowledge items
   *     summary: Find all knowledge items
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: A list of knowledge items
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/KnowledgeItem'
   */
  router.get("/knowledgeitems", (req, res) => {
    const order_by = req.query.order || "Label";
    const sort = req.query.sort || "ASC";
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const skip = (page - 1) * limit;

    const params = {};
    const order = { [order_by]: sort };
    neode
      .all("KnowledgeItem", params, order, limit, skip)
      .then(result => {
        return result.toJson();
      })
      .catch(e => {
        console.log(e);
        writeError(res, e);
      });
  });

  /**
   * @swagger
   * /api/v1/knowledgeitem/{id}:
   *   get:
   *     tags:
   *     - knowledgeitem
   *     description: Find knowledge item by ID
   *     summary: Find knowledge item by ID
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: knowledge item id
   *         in: path
   *         required: true
   *         type: integer
   *       - name: Authorization
   *         in: header
   *         type: string
   *         description: Token (token goes here)
   *     responses:
   *       200:
   *         description: A knowledge item
   *         schema:
   *           $ref: '#/definitions/KnowledgeItem'
   *       404:
   *         description: knowledge item not found
   */
  router.get("/knowledgeitem/:id", (req, res) => {
    if (!req.params.id) {
      throw { message: "Invalid knowledge item id", status: 400 };
    }
    neode
      .findById("KnowledgeItem", _.toInteger(req.params.id))
      .then(response => {
        logger.info("Found node.");
        console.log(response);
        return response.toJson();
      })
      .then(node => {
        writeResponse(res, node);
      })
      .catch(e => {
        console.log(e);
        writeError(res, e, 500);
      });
  });

  /**
   * @swagger
   * /api/v1/knowledgeitem:
   *   post:
   *     tags:
   *     - knowledgeitem
   *     description: Create a knowledge item
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         in: body
   *         type: object
   *         schema:
   *           properties:
   *             label:
   *               type: string
   *             topic:
   *               type: string
   *             statement:
   *               type: string
   *             examboard:
   *               type: string
   *     responses:
   *       201:
   *         description: A new knowledgeitem node
   *         schema:
   *           $ref: '#/definitions/KnowledgeItem'
   *       400:
   *         description: Error message(s)
   */
  router.post("/knowledgeitem", (req, res) => {
    var label = _.get(req.body, "label");
    var topic = _.get(req.body, "topic");
    var statement = _.get(req.body, "statement");
    var examboard = _.get(req.body, "examboard");

    if (!label) {
      throw { label: "This field is required.", status: 400 };
    }
    if (!topic) {
      throw { topic: "This field is required.", status: 400 };
    }
    neode
      .create("KnowledgeItem", {
        Label: label,
        Topic: topic,
        Statement: statement,
        Examboard: examboard
      })
      .then(response => {
        writeResponse(res, response.toJson(), 201);
      })
      .catch(e => writeError(res, e, 500));
  });

  /**
   * @swagger
   * /api/v1/knowledgeitem/{id}:
   *   put:
   *     tags:
   *     - knowledgeitem
   *     description: Delete a knowledge item
   *     summary: Delete a knowledge item
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: id of the writer who wrote the knowledge items
   *         in: path
   *         required: true
   *         type: integer
   *			 - name: body
   *         in: body
   *         type: object
   *         schema:
   *           properties:
   *             label:
   *               type: string
   *             topic:
   *               type: string
   *             statement:
   *               type: string
   *             examboard:
   *               type: string
   *     responses:
   *       201:
   *         description: Successfully updated node!
   *       400:
   *         description: Error message(s)
   *       404:
   *         description: Node not found!
   *       500:
   *         description: Couldn't update node
   *       401:
   *         description: invalid / missing authentication
   */
  router.put("/knowledgeitem/:id", (req, res) => {
    if (!req.params.id) {
      writeResponse(res, { message: "Invalid knowledge item id" }, 400);
    }

    if (_.isEmpty(req.body)) {
      writeResponse(res, { message: "Invalid update body" }, 400);
    }

    let updateObj = _.fromPairs(_.entries(req.body));
    // var updateObj = {
    //   label: _.get(req.body, "label", ""),
    //   topic: _.get(req.body, "topic", ""),
    //   statement: _.get(req.body, "statement", ""),
    //   examboard: _.get(req.body, "examboard", "")
    // };
    neode
      .findById("KnowledgeItem", _.toInteger(req.params.id))
      .then(data => {
        console.log(data);
        let node = data;
        console.log("Request body", req.body);
        console.log(updateObj);
        try {
          node.update(updateObj);
          writeResponse(
            res,
            {
              message: "Successfully updated node!"
            },
            201
          );
        } catch (error) {
          console.log(error);
          writeError(res, error, 500);
        }
      })
      .catch(e => writeError(res, e, 404));
  });

  /**
   * @swagger
   * /api/v1/knowledgeitem/{id}:
   *   delete:
   *     tags:
   *     - knowledgeitem
   *     description: Delete a knowledge item
   *     summary: Delete a knowledge item
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: id of the writer who wrote the knowledge items
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       204:
   *         description: Successfully deleted node!
   *       400:
   *         description: Error message(s)
   *       500:
   *         description: Couldn't delete node
   *       401:
   *         description: invalid / missing authentication
   */
  router.delete("/knowledgeitem/:id", (req, res, next) => {
    if (!req.params.id) {
      throw { message: "Invalid knowledge item id", status: 400 };
    }

    neode
      .findById("KnowledgeItem", req.params.id)
      .then(data => {
        let node = data;
        console.log(node);
        try {
          node.delete();
        } catch (error) {
          writeResponse(res, { message: "Couldn't delete node" }, 500);
        }
        writeResponse(
          res,
          {
            message: "Successfully deleted node!"
          },
          204
        );
      })
      .catch(next);
  });

  return router;
};
