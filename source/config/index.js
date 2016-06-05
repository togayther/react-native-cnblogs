
//通用配置
export default {
	domain:'http://123.56.135.166/cnblog',
	defaultAvatar: 'http://123.56.135.166/cnblog/public/img/avatar.png',
	appInfo:{
		name:'博客园',
		logo:'http://123.56.135.166/cnblog/public/img/avatar.png',
		descr:'开发者的网上家园',
		site:'www.cnblogs.com',
		version: 'v1.0.0'
	},
	authorInfo: {
		name:'togayther',
		email:'sleepsleepsleep@foxmail.com',
		homepage: 'https://github.com/togayther'
	}
};

//资源类型
export const postCategory = {
	home: "home", 
	rank: "rank",
	news: "news"
};

//数据接口地址
export const dataApi = {
	home: "/post/index?pageindex=<%= pageIndex %>&pagesize=<%= pageSize %>",
	rank: "/post/rank?pageindex=<%= pageIndex %>&pagesize=<%= pageSize %>",
	news: "/news/index?pageindex=<%= pageIndex %>&pagesize=<%= pageSize %>",

	author_rank:"/author?pageindex=<%= pageIndex %>&pagesize=<%= pageSize %>",
	author_search:"/author/search?key=<%= key%>",
	author_detail:"/author/detail?name=<%= name %>&pageindex=<%= pageIndex %>&pagesize=<%= pageSize %>",

	home_comments:'/comment/posts?pid=<%= pid %>&pageindex=<%= pageIndex %>&pagesize=<%= pageSize %>',
	rank_comments:'/comment/posts?pid=<%= pid %>&pageindex=<%= pageIndex %>&pagesize=<%= pageSize %>',
	news_comments:'/comment/news?pid=<%= pid %>&pageindex=<%= pageIndex %>&pagesize=<%= pageSize %>',

	home_detail:"/post/detail?id=<%= id %>",
	rank_detail:"/post/detail?id=<%= id %>",
	news_detail:"/news/detail?id=<%= id %>"
};

//默认分页大小
export const pageSize = 10;

//回到顶部按钮y轴偏移量
export const scrollEnabledOffset = 500;