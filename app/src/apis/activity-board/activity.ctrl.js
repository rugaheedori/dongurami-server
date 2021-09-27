'use strict';

const Activity = require('../../models/services/Board/Board');
// const Image = require('../../models/services/Image/Image');

const process = {
  findAllByClubNum: async (req, res) => {
    const activity = new Activity(req);
    const response = await activity.findAllByClubNum();

    if (response.success) {
      return res.status(200).json(response);
    }
    if (response.isError) {
      return res.status(500).json(response.clientMsg);
    }
    return res.status(404).json(response);
  },

  createActivity: async (req, res) => {
    const activity = new Activity(req);
    const response = await activity.createActivity();

    if (response.success) {
      return res.status(200).json(response);
    }
    if (response.isError) {
      return res.status(500).json(response.clientMsg);
    }
    return res.status(400).json(response);
  },
};
module.exports = {
  process,
};
