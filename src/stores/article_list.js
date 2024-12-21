import {defineStore} from 'pinia'

export const useArticleListStore = defineStore('article_list', {
  state: () => ({
    // 总页数
    totalPages: 100,
    // 当页总条数
    pageSize: 5,
    // 当前页数
    page: 1,
    articleList: [
      {
        id: 1,
        topMounted: true,
        bannerImgSrc: '',
        title: '了解并使用消息队列',
        fragment: '在使用一门新技术之前我们肯定要搞明白这是个什么东西。消息队列这个词想必大家都很熟悉，不管你用没用过，你应该听过吧？即便你没有听过消息队列，那队列你应该听说过，所以在学习什么是消息队列之前我们先来说一下什么是队列（queue）',
        category: {
          id: 1,
          name: '学习笔记',
          description: '学习笔记',
        },
        tags: [
          {
            id: 1,
            name: '数据结构与算法',
            color: 'red',
            description: '数据结构与算法'
          }, {
            id: 2,
            name: 'C++',
            color: 'blue',
            description: 'C++'
          }, {
            id: 3,
            name: '网站部署',
            color: 'orange',
            description: '网站部署'
          }, {
            id: 4,
            name: '网站部署',
            color: 'orange',
            description: '网站部署'
          }, {
            id: 5,
            name: '网站部署',
            color: 'orange',
            description: '网站部署'
          },
        ],
        updateTime: '2024-01-01 11:00:11',
        createTime: '2024-01-01 12:00:12',
        // content: '',
        // totalReads: 25,
        // totalComments: 4,总评论数暂不使用
      },
      {
        id: 1,
        topMounted: true,
        bannerImgSrc: '',
        title: '了解并使用消息队列',
        fragment: '在使用一门新技术之前我们肯定要搞明白这是个什么东西。消息队列这个词想必大家都很熟悉，不管你用没用过，你应该听过吧？即便你没有听过消息队列，那队列你应该听说过，所以在学习什么是消息队列之前我们先来说一下什么是队列（queue）',
        category: {
          id: 1,
          name: '学习笔记',
          description: '学习笔记',
        },
        tags: [
          {
            id: 1,
            name: '数据结构与算法',
            color: 'red',
            description: '数据结构与算法'
          }, {
            id: 2,
            name: 'C++',
            color: 'blue',
            description: 'C++'
          }, {
            id: 3,
            name: '网站部署',
            color: 'orange',
            description: '网站部署'
          },
        ],
        updateTime: '2024-01-01 11:00:11',
        createTime: '2024-01-01 12:00:12',
        // content: '',
        // totalReads: 25,
        // totalComments: 4,总评论数暂不使用
      },
      {
        id: 1,
        topMounted: false,
        bannerImgSrc: '',
        title: '了解并使用消息队列',
        fragment: '在使用一门新技术之前我们肯定要搞明白这是个什么东西。消息队列这个词想必大家都很熟悉，不管你用没用过，你应该听过吧？即便你没有听过消息队列，那队列你应该听说过，所以在学习什么是消息队列之前我们先来说一下什么是队列（queue）',
        category: {
          id: 1,
          name: '学习笔记',
          description: '学习笔记',
        },
        tags: [
          {
            id: 1,
            name: '数据结构与算法',
            color: 'red',
            description: '数据结构与算法'
          }, {
            id: 2,
            name: 'C++',
            color: 'blue',
            description: 'C++'
          }, {
            id: 3,
            name: '网站部署',
            color: 'orange',
            description: '网站部署'
          },
        ],
        updateTime: '2024-01-01 11:00:11',
        createTime: '2024-01-01 12:00:12',
        // content: '',
        // totalReads: 25,
        // totalComments: 4,总评论数暂不使用
      },
      {
        id: 1,
        topMounted: false,
        bannerImgSrc: '',
        title: '了解并使用消息队列',
        fragment: '在使用一门新技术之前我们肯定要搞明白这是个什么东西。消息队列这个词想必大家都很熟悉，不管你用没用过，你应该听过吧？即便你没有听过消息队列，那队列你应该听说过，所以在学习什么是消息队列之前我们先来说一下什么是队列（queue）',
        category: {
          id: 1,
          name: '学习笔记',
          description: '学习笔记',
        },
        tags: [
          {
            id: 1,
            name: '数据结构与算法',
            color: 'red',
            description: '数据结构与算法'
          }, {
            id: 2,
            name: 'C++',
            color: 'blue',
            description: 'C++'
          }, {
            id: 3,
            name: '网站部署',
            color: 'orange',
            description: '网站部署'
          },
        ],
        updateTime: '2024-01-01 11:00:11',
        createTime: '2024-01-01 12:00:12',
        // content: '',
        // totalReads: 25,
        // totalComments: 4,总评论数暂不使用
      },
      {
        id: 1,
        topMounted: false,
        bannerImgSrc: '',
        title: '了解并使用消息队列',
        fragment: '在使用一门新技术之前我们肯定要搞明白这是个什么东西。消息队列这个词想必大家都很熟悉，不管你用没用过，你应该听过吧？即便你没有听过消息队列，那队列你应该听说过，所以在学习什么是消息队列之前我们先来说一下什么是队列（queue）',
        category: {
          id: 1,
          name: '学习笔记',
          description: '学习笔记',
        },
        tags: [
          {
            id: 1,
            name: '数据结构与算法',
            color: 'red',
            description: '数据结构与算法'
          }, {
            id: 2,
            name: 'C++',
            color: 'blue',
            description: 'C++'
          }, {
            id: 3,
            name: '网站部署',
            color: 'orange',
            description: '网站部署'
          },
        ],
        updateTime: '2024-01-01 11:00:11',
        createTime: '2024-01-01 12:00:12',
        // content: '',
        // totalReads: 25,
        // totalComments: 4,总评论数暂不使用
      },
    ],
  }),
  getters: {
    getTotalPages:(state) => state.totalPages,
    getPageSize:(state) => state.pageSize,
    getPage:(state) => state.page,
    getArticleList: (state) => state.articleList,
  },
  actions:{
    // 获取当前目标页的list
    getArticleListByPage(page){
      // this.articleList = [];
    }
  }
})
