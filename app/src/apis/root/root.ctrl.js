'use strict';

const Student = require('../../models/services/Student/Student');
const Email = require('../../models/services/Email/Email');
const logger = require('../../config/logger');

const process = {
  login: async (req, res) => {
    const student = new Student(req);
    const response = await student.login();

    if (!response.success) {
      if (response.status) {
        logger.error(`POST /api/login 401: ${response.msg}`);
        return res.status(401).json(response);
      }
      logger.error(`POST /api/login 400: ${response.msg}`);
      return res.status(400).json(response);
    }
    if (response.isError) {
      logger.error(`POST /api/login 500: \n${response.errMsg.stack}`);
      return res.status(500).json(response.clientMsg);
    }
    logger.info(`POST /api/login 200: ${response.msg}`);
    return res.status(200).json(response);
  },

  signUp: async (req, res) => {
    const student = new Student(req);
    const response = await student.signUp();

    if (response.success) {
      logger.info(`POST /api/sign-up 201: ${response.msg}`);
      return res.status(201).json(response);
    }
    if (response.isError) {
      logger.error(`POST /api/sign-up 500: \n${response.errMsg.stack}`);
      return res.status(500).json(response.clientMsg);
    }
    logger.error(`POST /api/sign-up 409: ${response.msg}`);
    return res.status(409).json(response);
  },

  findId: async (req, res) => {
    const student = new Student(req);
    const response = await student.findId();

    if (response.success) {
      logger.info(`POST /api/find-id 200: 해당 아이디를 확인했습니다.`);
      return res.status(200).json(response);
    }
    if (response.isError) {
      logger.error(`POST /api/find-id 500: \n${response.errMsg.stack}`);
      return res.status(500).json(response.clientMsg);
    }
    logger.error(`POST /api/find-id 400: ${response.msg}`);
    return res.status(400).json(response);
  },

  // 비밀번호 변경
  resetPassword: async (req, res) => {
    const student = new Student(req);
    const response = await student.resetPassword();

    if (response.success) {
      logger.info(`PATCH /api/reset-password 200: ${response.msg}`);
      return res.status(200).json(response);
    }
    if (response.isError) {
      logger.error(`PATCH /api/reset-password 500: \n${response.errMsg.stack}`);
      return res.status(500).json(response.clientMsg);
    }
    logger.error(`PATCH /api/reset-password 400: ${response.msg}`);
    return res.status(400).json(response);
  },

  // 메일 전송
  sendEmailForPassword: async (req, res) => {
    const email = new Email(req);
    const response = await email.sendLinkForPassword();

    if (response.success) {
      logger.info(`POST /api/forgot-password 201: ${response.msg}`);
      return res.status(201).json(response);
    }
    if (response.isError) {
      logger.error(`POST /api/forgot-password 500: \n${response.errMsg.stack}`);
      return res.status(500).json(response.clientMsg);
    }
    logger.error(`POST /api/forgot-password 400: ${response.msg}`);
    return res.status(400).json(response);
  },

  // 비밀번호 찾기
  findPassword: async (req, res) => {
    const student = new Student(req);
    const response = await student.findPassword();

    if (response.useable === false) {
      logger.error(`PATCH /api/find-password/token 403: ${response.msg}`);
      return res.status(403).json(response);
    }
    if (!response.success) {
      logger.error(`PATCH /api/find-password/token 400: ${response.msg}`);
      return res.status(400).json(response);
    }
    if (response.isError) {
      logger.error(
        `PATCH /api/find-password/token 500: \n${response.errMsg.stack}`
      );
      return res.status(500).json(response.clientMsg);
    }
    logger.info(`PATCH /api/find-password/token 200: ${response.msg}`);
    return res.status(200).json(response);
  },

  getUserInfoByJWT: async (req, res) => {
    const student = new Student(req);
    const response = await student.getUserInfoByJWT();

    if (response.success) {
      logger.info(`GET /api/student 200: ${response.msg}`);
      return res.status(200).json(response);
    }
    if (response.isError) {
      logger.error(`GET /api/student 500: \n${response.errMsg.stack}`);
      return res.status(500).json(response);
    }
    logger.error(`GET /api/student 400: ${response.msg}`);
    return res.status(400).json(response);
  },
};

module.exports = {
  process,
};
