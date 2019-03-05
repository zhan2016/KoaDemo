'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async list() {
    const ctx = this.ctx;
    const page = ctx.query.page || 1;
    const newList = await ctx.service.news.list(page);
    await this.ctx.render('news/list.tpl', { list: newList });
  }
}

module.exports = NewsController;
