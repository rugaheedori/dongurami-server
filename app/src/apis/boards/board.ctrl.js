'use strict';

const Board = require('../../models/services/Board/Board');
const Comment = require('../../models/services/Board/Comment/Comment');
const Image = require('../../models/services/Image/Image');
const logger = require('../../config/logger');

const process = {
  createBoardNum: async (req, res) => {
    const board = new Board(req);
    const image = new Image(req);
    const response = await board.createBoardNum();

    if (response.success) {
      response.imgNums = await image.saveBoardImg(response.boardNum);
      if (response.imgNums.isError) {
        logger.error(`POST /clubNum 500: \n${response.errMsg}`);
        return res.status(500).json(response.imgNums.clientMsg);
      }
      logger.info(`POST /clubNum 201: ${response.msg}`);
      return res.status(201).json(response);
    }
    if (response.isError) {
      logger.error(`POST /clubNum 500: \n${response.errMsg}`);
      return res.status(500).json(response.clientMsg);
    }
    logger.error(`POST /clubNum 400: ${response.msg}`);
    return res.status(400).json(response);
  },

  findAllByCategoryNum: async (req, res) => {
    const board = new Board(req);
    const response = await board.findAllByCategoryNum();

    if (response.success) {
      logger.info(`GET /clubNum 200: ${response.msg}`);
      return res.status(200).json(response);
    }
    if (response.isError) return res.status(500).json(response.clientMsg);
    if (response.msg === '해당 동아리에 가입하지 않았습니다.') {
      logger.error(`GET /clubNum 403: ${response.msg}`);
      return res.status(403).json(response);
    }
    logger.error(`GET /clubNum 404: ${response.msg}`);
    return res.status(404).json(response);
  },

  findAllByPromotionCategory: async (req, res) => {
    const board = new Board(req);
    const response = await board.findAllByPromotionCategory();

    if (response.success) {
      logger.info(`GET /clubNum 200: ${response.msg}`);
      return res.status(200).json(response);
    }
    logger.error(`GET /clubNum 500: \n${response.errMsg}`);
    return res.status(500).json(response.clientMsg);
  },

  findOneByBoardNum: async (req, res) => {
    const board = new Board(req);
    const comment = new Comment(req);
    const image = new Image(req);
    const response = await board.findOneByBoardNum();

    if (response.success) {
      const updateBoardHit = await board.updateOnlyHitByNum();
      response.images = await image.findAllByBoardImg();
      // 동아리 활동일지 & 마이페이지는 댓글이 달리지 않기 때문에 조건문을 사용해 주어야됨.
      if (response.category < 6) {
        response.comments = await comment.findAllByBoardNum();

        if (response.comments.isError) {
          logger.error(`GET /clubNum 500: \n${response.errMsg}`);
          return res.status(500).json(response.comments.clientMsg);
        }
      }
      if (response.images.isError) {
        logger.error(`GET /clubNum 500: \n${response.errMsg}`);
        return res.status(500).json(response.images.clientMsg);
      }
      if (updateBoardHit.isError) {
        logger.error(`GET /clubNum 500: \n${response.errMsg}`);
        return res.status(500).json(updateBoardHit.clientMsg);
      }
      if (response.success) {
        delete response.category;

        response.board.hit += 1;
        logger.info(`GET /clubNum 200: ${response.msg}`);
        return res.status(200).json(response);
      }
    }
    if (response.isError) {
      logger.error(`GET /clubNum 500: \n${response.errMsg}`);
      return res.status(500).json(response.clientMsg);
    }
    if (response.msg === '해당 동아리에 가입하지 않았습니다.') {
      logger.error(`GET /clubNum 403: ${response.msg}`);
      return res.status(403).json(response);
    }
    logger.error(`GET /clubNum 404: ${response.msg}`);
    return res.status(404).json(response);
  },

  updateOneByBoardNum: async (req, res) => {
    const board = new Board(req);
    const response = await board.updateOneByBoardNum();

    if (response.success) {
      logger.info(`PUT /clubNum 200: ${response.msg}`);
      return res.status(200).json(response);
    }
    if (response.isError) {
      logger.error(`PUT /clubNum 500: \n${response.errMsg}`);
      return res.status(500).json(response.clientMsg);
    }
    logger.error(`PUT /clubNum 400: ${response.msg}`);
    return res.status(400).json(response);
  },

  deleteOneByBoardNum: async (req, res) => {
    const board = new Board(req);
    const response = await board.deleteOneByBoardNum();

    if (response.success) {
      logger.info(`DELETE /clubNum 200: ${response.msg}`);
      return res.status(200).json(response);
    }
    if (response.isError) {
      logger.error(`PUT /clubNum 500: \n${response.errMsg}`);
      return res.status(500).json(response.clientMsg);
    }
    logger.error(`GET /clubNum 400: ${response.msg}`);
    return res.status(400).json(response);
  },
};

module.exports = {
  process,
};
