'use strict';

const Service = require('egg').Service;

class CNodeNews extends Service {
  constructor(ctx){
    super(ctx);
    this.config = this.ctx.app.config.news;
    this.serverUrl = this.config.serverUrl;
    this.pageSize = this.config.pageSize;
  }


  async request(api, opts){
    const options = Object.assign({
      method: 'get',
      dataType: 'json',
      timeout: ['30s', '30s'],
    }, opts);

    const result = await this.ctx.curl(`${this.serverUrl}/${api}`,options);
    return result.data;
  }

  async getTopStories(page, pageSize) {
    page = page || 1;
    pageSize = pageSize || this.pageSize;

    const res = await this.request('topics', {
      data: {
        page,
        limit: pageSize,
      }
    });

    if (res.success) {
      return res.data;
    }
    return {}
  }
}

module.exports = CNodeNews;
