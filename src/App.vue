<style scoped>
  /* 布局 */
  .layout{
    /*border: 1px solid #d7dde4;*/
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-con{
    position: relative;
    overflow: hidden;
    text-align: center;
  }
  .layout-single{
    font-size: 14px;
    color: white;
  }
  .layout-con:last-child{
    margin: 0;
  }
  .layout-header,
  .layout-footer{
    /*background: #7CBCE9;*/
    background-color: white; /* #fff */ /* rgb(255, 255, 255) */
    /*color: white;*/
  }
  .layout-content{
    /*background: #0F8DE9;*/
    background-color: white;
    min-height: 120px;
    line-height: 120px;
  }
  .layout-center{
    text-align: center;
  }

  /* logo */
  .img-logo{
    width: 60%;
    max-width: 255px;
  }
  /* search */
  .search {
    width: 80%;
    margin: 0.7em 10% 1.8em 10%;
  }

  /* 标签页 */
  .tabs {
    width: 80%;
    margin: auto 10%;
    border: 1px solid #ccc;
  }

  /* 媒体查询(media query) */
  @media screen and (min-width: 400px) and (max-width: 600px) {
    /* 400px <= 宽度 <= 600px */
    .layout{
      width: 90%;
      margin-left: 5%;
    }
  }
  @media screen and (min-width: 601px) and (max-width: 960px) {
    .layout{
      width: 80%;
      margin-left: 10%;
    }
  }
  @media screen and (min-width: 961px) {
    /* 宽度 >= 961px */
    .layout{
      width: 70%;
      margin-left: 15%;
    }
  }
</style>

<template>
  <!-- v-title 见 main.js 中 title 设置 -->
  <div v-title="'职搜-ZhiSou'" id="app" class="layout">
    <div class="layout-con">
      <div class="layout-single">
        <!-- https://www.iviewui.com/components/layout -->
        <Layout>
          <Header ref="header" class="layout-header layout-center" :style="headerStyle">
            <img class="img-logo" :src="logoUrl">
          </Header>
          <Content ref="content" class="layout-content layout-center">
            <!-- https://www.iviewui.com/components/input -->
            <Input size="large" class="search" search enter-button placeholder="搜索关键词..." />
            <!-- https://www.iviewui.com/components/tabs -->
            <Tabs class="tabs" :animated="true">
              <TabPane label="macOS" icon="logo-apple">标签一的内容</TabPane>
              <TabPane label="Windows" icon="logo-windows">标签二的内容</TabPane>
              <TabPane label="Linux" icon="logo-tux">标签三的内容</TabPane>
              <!--<TabPane v-for="tab in tabs" :key="tab" :label="'标签' + tab">标签{{ tab }}</TabPane>-->
              <Button @click="handleTabsAdd" size="small" slot="extra">
                <Icon type="md-settings" size="15" />
              </Button>
            </Tabs>
          </Content>
          <Footer ref="footer" class="layout-footer layout-center">Footer</Footer>
        </Layout>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  // 应用名
  name: 'app',
  // 页面中需要的数据
  data() {
    return {
      logoUrl: require('./assets/logo.png'), // 图片地址
      headerStyle: {
        height: 'auto'
      },
      tabs: 2
    }
  },
  // 页面元素挂载
  mounted() {
    // this.headerHeight = window.innerHeight - this.$refs.footer.$el.offsetHeight
    // 图片
    let img = this.$refs.header.$el.querySelector('img');
    // 图片加载完成事件
    img.onload = () => {
      this.resizeHeader(img, this.headerStyle)
    }
    // 页面尺寸变化
    window.onresize = () => {
      this.resizeHeader(img, this.headerStyle)
    }
  },
  // 应用的方法
  methods: {
    resizeHeader: (img,headerStyle) => {
      // 图片宽高比
      let hwRate = img.height / img.width;
      if(hwRate > 1) {
        hwRate = 1
      }
      // 图片显示宽度
      let imgW = img.offsetWidth;
      // 图片显示需要的高度
      let imgH = imgW * hwRate;
      // header的高度
      headerStyle.height = ((height) => `${height}px`)(imgH)
    },
    handleTabsAdd () {
      this.tabs ++
      this.getData()
    },
    getData() {
      let ajaxUrl = "https://httpbin.org/get"
      axios.get(ajaxUrl)
        .then((result) => {
          console.log(result)
        })
    }
  }
  // 注:
  // debugger: 设置一断点
  // this: 当前应用(页面)
  // this.$refs: 页面元素引用(需要给标签组件添加 ref 属性, 在DOM元素挂载完成后才可以调用)
  // this.$refs.header: 页面 Header 组件
  // this.$refs.header.$el: 页面 Header 组件渲染在浏览器中的元素
  // this.$refs.header.$el.querySelector('img').width: 图片宽度
  // window.innerHeight: 浏览器的可用高度
  // this.$refs.content.$el.offsetTop: 是内容距离浏览器可用高度顶部的距离
  // this.$refs.footer.$el.offsetHeight: 是 Footer 的高度
  // (height) => `${height}px`: 一个用于字符串格式化的匿名函数，接受参数 height
  // ((height) => `${height}px`)(100): 传递实参 100，调用字符串格式化函数，结果: "100px"
  //
  // resizeHeader 采用箭头函数 (img) => {} 的方式，会得到一个绑定当前执行上下文中的this，
  // 而且这个this，不可再切换更改了，所以不能通过 this 取到 应用组件对象， this.headerStyle 也就是 undefined，
  // 所以需要额外传递参数 headerStyle 。
  // 箭头函数中的 this 是当前函数体内的this,严格模式下为undefined。
  //
  // 如果 resizeHeader 采用匿名函数 function(img) {} 的方式，this 取到的就是 应用组件对象，就可以不额外传递 headerStyle，
  // 直接使用 this.headerStyle 访问 data 中的 headerStyle 。
}
</script>
