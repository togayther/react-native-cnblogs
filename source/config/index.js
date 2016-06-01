
//通用配置
export default {
	domain:'http://123.56.135.166/cnblog',
	defaultAvatar: 'http://123.56.135.166/cnblog/public/img/avatar.png',
	appInfo:{
		name:'博客园',
		logo:'http://123.56.135.166/cnblog/public/img/avatar.png',
		descr:'开发者的网上家园',
		site:'www.cnblogs.com',
		version: '1.0.0'
	},
	authorInfo: {
		name:'togayther',
		email:'sleepsleepsleep@foxmail.com',
		homepage: 'https://github.com/togayther'
	}
}

//资源类型
export const postCategory = {
	home: "home", 
	rank: "rank",
	news: "news"
};

//数据接口地址
export const dataApi = {
	home: "/topic/index?pageindex=<%= pageIndex %>&pagesize=<%= pageSize %>",
	rank: "/topic/rank?pageindex=<%= pageIndex %>&pagesize=<%= pageSize %>",
	news: "/news/index?pageindex=<%= pageIndex %>&pagesize=<%= pageSize %>",

	author_rank:"/author?pageindex=<%= pageIndex %>&pagesize=<%= pageSize %>",
	author_search:"/author/search?key=<%= key%>",
	author_detail:"",

	post_comments:'/comment/topic?pid=<%= pid %>&pageIndex=<%= pageIndex %>&pageSize=<%= pageSize %>',
	news_comments:'/comment/news?pid=<%= pid %>&pageIndex=<%= pageIndex %>&pageSize=<%= pageSize %>',

	home_detail:"/topic/detail?id=<%= id %>",
	rank_detail:"/topic/detail?id=<%= id %>",
	news_detail:"/news/detail?id=<%= id %>"
}

//默认分页大小
export const pageSize = 10;