'use strict';

const mariadb = require('../../../config/mariadb');
const Error = require('../../utils/Error');

class ClubListStorage {
  static async readClubList() {
    let conn;

    try {
      conn = await mariadb.getConnection();

      const query = `
        SELECT no, name, category, logo_url AS logoUrl 
        FROM clubs 
        WHERE no > 1;`;

      const clubList = await conn.query(query);

      return {
        status: 200,
        success: true,
        msg: '동아리 목록 조회 성공',
        clubList,
      };
    } catch (err) {
      return Error.ctrl('', err);
    } finally {
      conn?.release();
    }
  }

  static async clubListSearch(name) {
    const conn = await mariadb.getConnection();

    const keyword = `%${name.replace(/(\s*)/g, '')}%`;

    try {
      const query = `SELECT no, name, category, logo_url AS logoUrl FROM clubs WHERE REPLACE(name, ' ', '') like ? AND name != 'undefinedClub';`;
      const result = await conn.query(query, [keyword]);

      return result;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }
}

module.exports = ClubListStorage;
