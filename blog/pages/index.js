import React, { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { Row, Col, List, Icon } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'

import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'


import '../public/style/pages/index.css'

const Home = ( list ) => {
  const [myList, setMyList] = useState( list.data )
  const renderer = new marked.Renderer()
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

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="common-main" type="flex" justify="center">
        <Col className="common-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={myList}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <Link href={{pathname: "/detailed", query: {id: item.id}}} >
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span><Icon type="calendar" /> {item.addTime}</span>
                  <span><Icon type="folder" /> {item.typeName}</span>
                  <span><Icon type="fire" /> {item.view_account}人</span>
                </div>
                <div
                  className="list-context"
                  dangerouslySetInnerHTML={{__html: marked(item.introduce)}}
                ></div>
              </List.Item>
            )}
          />
        </Col>
        <Col className="common-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />
    </>
  )
}

//数据库获取资源
Home.getInitialProps = async () => {
  const promise = new Promise(resolve => {
    axios(servicePath.getArticleList)
      .then(resp => {
        resolve(resp.data)
      })
  })
  return await promise
}

export default Home
