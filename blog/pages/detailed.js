import React from 'react'
import MarkNav from 'markdown-navbar'
// import Link from 'next/link'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import Head from 'next/head'
import { Row, Col, Icon, Breadcrumb, Affix } from 'antd'

import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

import Tocify from '../components/tocify.tsx'

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'

import '../public/style/pages/detailed.css'
import 'markdown-navbar/dist/navbar.css'

const Detailed = (props) => {

  const tocify = new Tocify()
  const renderer = new marked.Renderer()
  
  // 等级### 文本
  renderer.heading = function(text, level, raw) {
    const anchor = tocify.add(text, level)
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
  }

  marked.setOptions({
    renderer: renderer,
    gfm: true,  //样式渲染类似于github
    pedantic: false, //容错
    sanitize: false,  //显示HTML元素，true就会直接忽略
    tables: true, //是否允许根据github输出表格样式，和gfm连用
    breaks: false,  //是否支持github的换行符
    smartLists: true,  //默认设置列表样式
    highlight: function(code) { //如何让代码高亮
      return hljs.highlightAuto(code).value //自动检测代码类型
    }
  })
  let html = marked(props.article_content)
  return (
    <>
      <Head>
        <title>Detailed</title>
      </Head>
      <Header />
      <Row className="common-main" type="flex" justify="center">
        <Col className="common-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href="/">视频列表</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href="/">XXXX</a></Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className="detailed-title">
                React-技术胖Blog开发
              </div>
              <div className="list-icon center">
                <span><Icon type="calendar" />2019-12-08</span>
                <span><Icon type="folder" />视频教程</span>
                <span><Icon type="fire" />5489人</span>
              </div>
              <div className="detailed-content"
                dangerouslySetInnerHTML={{__html: html}}
              >
              </div>
            </div>
          </div>
        </Col>
        <Col className="common-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav common-box">
              <div className="nav-title">文章目录</div>
              {tocify && tocify.render()}
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </>
  )
}

Detailed.getInitialProps = async context => {
  let id = context.query.id
  const promise = new Promise(resolve => {
    axios(servicePath.getArticleById + id)
      .then(resp => {
        resolve(resp.data.data[0])
      })
  })
  return await promise
}

export default Detailed
