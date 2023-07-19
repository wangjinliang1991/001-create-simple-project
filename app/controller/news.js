'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  

  async list() {
    const { ctx, app } = this;
    const pageSize = app.config.news.pageSize;
    const page = parseInt(ctx.query.page) || 1;

    const newsList = await ctx.service.cNodeNews.getTopStories(page);

    await ctx.render('news/list.tpl', { list: newsList, page, pageSize });
  }
}

module.exports = NewsController;
