/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1575789546421_8491';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: 'root',
      // database
      database: 'react_blog',    
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };
  config.security = {
    csrf: { //csrf是egg提供的一种安全机制
      enable: false
    },
    domainWhiteList: [ '*' ]
  };
  config.cors = {
    origin: 'http://localhost:3000', //设置那些域名可以访问，这里设置所有都可以访问
    credentials: true,  //允许Cookies可以跨域
    allowMethods: 'GET, HEAD, PUT, POST, DELETE, PATCH, OPTIONS, UPDATE'
  }

  return {
    ...config,
    ...userConfig,
  };
};
