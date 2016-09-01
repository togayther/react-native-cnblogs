
export default {
	domain:'http://123.56.135.166/cnblog',
	appInfo:{
		name:'博客园',
		avatar:'http://123.56.135.166/cnblog/public/img/common/avatar.jpg?v=1.0',
		descr:'开发者的网上家园',
		site:'www.cnblogs.com',
		version: 'v.1.0.1',
		copyright: '©2016 Powered By React-Native',
		declare: '博客园创立于2004年1月，是一个面向开发者的知识分享社区。自创建以来，博客园一直致力并专注于为开发者打造一个纯净的技术交流社区，推动并帮助开发者通过互联网分享知识，从而让更多开发者从中受益。博客园的使命是帮助开发者用代码改变世界。'
	},
	authorInfo: {
		name:'togayther',
		email:'sleepsleepsleep@foxmail.com',
		avatar: 'http://123.56.135.166/cnblog/public/img/common/author.jpg',
		homepage: 'https://github.com/togayther',
		declare: '本软件为个人学习交流作品，博文内容来源于博客园官方开放接口，版权为博客园及原作者所有。'
	}
};

export const postCategory = {
	home: "home", 
	rank: "rank",
	news: "news"
};

export const authData = {
	clientId: "cdfb6ec8-e78d-4c70-82df-7b1651a98808",
	clientSecret: "TFgkwiEVDBGZwPncPL9b5a9_z7E2pipUPFHo9OWIeOXkGTImxr_-LQBMw9_gQLX94Faqkbs9VbL_CKk-"
};

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

export const pageSize = 10;

export const drawerItems = [{
	text: "首页",
	icon: "ios-home-outline",
	action: "refresh",
	flag: postCategory.home
},{
	text: "排行",
	icon: "ios-navigate-outline",
	action: "refresh",
	flag: postCategory.rank
},{
	text: "新闻",
	icon: "ios-analytics-outline",
	action: "refresh",
	flag: postCategory.news
},{
	text: "离线",
	icon: "ios-download-outline",
	action: "toOffline",
	flag:"offline"
},{
	text: "设置",
	icon: "ios-cog",
	action: "toSetting",
	flag:"setting"
},{
	text: "关于",
	icon: "ios-redo-outline",
	action: "toAbout",
	flag:"about"
}];

export const storageKey = {
	OFFLINE_POSTS: "OFFLINE_POSTS",
	IMAGE_LOAD_FLAG: "IMAGE_LOAD_FLAG"
}