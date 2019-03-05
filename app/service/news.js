'use strict';
const Service = require('egg').Service;


class NewsService extends Service {
  async list(page = 1) {
    const { serverUrl, pageSize } = this.config.news;

    // use build-in http client to GET hacker-news api
    const { data: idList } = await this.ctx.curl(`${serverUrl}/topstories.json`, {
      data: {
        orderBy: '"$key"',
        startAt: `"${pageSize * (page - 1)}"`,
        endAt: `"${pageSize * page - 1}"`,
      },
      dataType: 'json',
    });
    // parallel Get detail
    const newList = await Promise.all(
      Object.keys(idList).map(key => {
        const url = `${serverUrl}/item/${idList[key]}.json`;
        return this.ctx.url(url, { dataType: 'json' });
      })
    );
    return newList.map(res => res.data);
  }
}

module.exports = NewsService;
