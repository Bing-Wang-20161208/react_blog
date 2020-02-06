'use strict';
/* RESTful 目前最流程的网页设计风格和开发方式：简单，一定的约束性（请求方式：put post get delete） */
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'api hi';
  }
//建立首页接口
  async getArticleList () {
    let sql = 'SELECT article.id as id , ' +
              'article.title as title , ' +
              'article.introduce as introduce , ' +
              "FROM_UNIXTIME(article.addTime, '%Y-%m-%d %H:%i:%s') as addTime , " +
              'article.view_account as view_account , ' +
              'type.typeName as typeName ' +
              'FROM article LEFT JOIN type ON article.type_id = type.Id'
    const result = await this.app.mysql.query(sql)
    this.ctx.body = { data:result }
  }
  //通过文章id获取文章详细内容
  async getArticleById(){
    //先配置路由的动态传值，然后再接收值
    let id = this.ctx.params.id
    let sql = 'SELECT article.id as id,'+
    'article.title as title,'+
    'article.introduce as introduce,'+
    'article.article_content as article_content,'+
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
    'article.view_account as view_account ,'+
    'type.typeName as typeName ,'+
    'type.id as typeId '+
    'FROM article LEFT JOIN type ON article.type_id = type.Id '+
    'WHERE article.id='+id
    const result = await this.app.mysql.query(sql)
    this.ctx.body={data:result}
  }

  //得到类别名称和编号
  async getTypeInfo() {
    const result = await this.app.mysql.select('type')
    this.ctx.body = {data:result}
  }

  //根据类别ID获得文章列表
  async getListById() {
    let id = this.ctx.params.id
    let sql = 'SELECT article.id as id , ' +
              'article.title as title , ' +
              'article.introduce as introduce , ' +
              "FROM_UNIXTIME(article.addTime, '%Y-%m-%d %H:%i:%s') as addTime , " +
              'article.view_account as view_account , ' +
              'type.typeName as typeName ' +
              'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
              'WHERE type_id='+id
    const result = await this.app.mysql.query(sql)
    this.ctx.body = { data:result }
  }
}

module.exports = HomeController;
