# 影子blog前端项目设计

***遇到你时，我想成为你的影子***

***写在前面***：

```text
怎们说呢？网站的后端应该是用单体架构，就我这个德行还指望我用微服务那一套？哈哈哈，先做出来再说吧！
最近学个C++和对应的数据结构与算法都学不下来，就想着做个项目，毕竟以前做个项目都做不完，每次都是做一半
就把文件都删除了...
可能你会注意到我为什么会起这么一个项目名字，这跟我最近的遭遇还是有点关系的(埋个伏笔)
```

网站基于Vue3和Vuetify开发，使用的ide为Fleet
---

## 1.需求分析

两个问题：

1. 首先网站应该是响应式的，这个边写边改。
2. 后续的功能删减是个问题，这个涉及到具体的代码编写。

网站应该包含如下功能(可以根据这个来排版)：

- shadow blog 网站
    - 个人选项卡
        - 文章数量
        - 标签数量
        - 分类数量
        - github链接
        - QQ链接
        - Wechat链接
    - 轮播图
    - 首页视频
    - 时间线
    - 学习
        - 分类
            - 编程语言
            - 框架
        - 标签：具体到某一个语言或者是哪种框架
    - 生活
        - 照片
        - 视频
    - 文章展示
    - 统一搜索框
        - 热点数据
        - 排序
        - 过滤
    - 主题切换
        - dark(default)
        - light
    - 网站BGM
    - 文件分享
    - 链接推荐
- shadow 后台
    - 登录
    - 个人选项卡
        - 链接更改
    - 轮播图
        - 图片更改
    - 首页视频
        - 视频更改
    - 学习
        - 分类 CRUD
        - 标签 CRUD
    - 生活
        - 照片 CRUD
        - 视频 CRUD
    - 热点数据 CRUD
    - 网站BGM CRUD
    - 文件网盘 CRUD
    - 链接推荐 CRUD

---

## 2.目录设计

- 1.使用如下命令初始化

```bash
npm create vuetify@latest
```

- 2.引入vue-router

```bash
npm install vue-router@4.4.0
```

- 3.引入pinia
```bash
npm install pinia
```

- 4.引入网络请求工具axios
```bash
npm install axios
```

```test
-src
	-assets - 静态资源
	-components - vue组件
		-common - 公共组件
		-public - 公开组件
	-plugins - vue插件
		- vuetify - 框架
		- router - 路由
```

## 3.系统设计

### API设计

## 网站部署

```text
做了两天太难了
```


# bug
hover 无法应用主题颜色
```css
.app-bar-nav-item:hover::after {
  width: 100%;
  background-color: $footer-border-from-color;
}

.article-arrow-expand:hover {
    cursor: pointer;
    color: var(--v-theme-primary);
}
```

```text
将css类分开 
尝试使用v-hover

(我是sb rbg都没有...)
```
