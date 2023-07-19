# 001-create-simple-project



## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org



## 获取topics

```js

// router.js
router.get('/news', controller.news.list);

// config.default.js
const userConfig = {
    news: {
        pageSize: 5,
        serverUrl: 'https://cnodejs.org/api/v1',
    }
};

// controller 创建 news.js
'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  

  async list() {
    const { ctx, app } = this;
    const pageSize = app.config.news.pageSize;
    const page = parseInt(ctx.query.page) || 1;

    const newsList = await ctx.service.cNodeNews.getTopStories(page);

    ctx.body = newsList;
    // await ctx.render('news/list.tpl', { list: newsList, page, pageSize });
  }
}

module.exports = NewsController;


// service层创建CNodeNews.js
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

// 启动
yarn dev
// 浏览器 http://127.0.0.1:7001/news 验证

```

