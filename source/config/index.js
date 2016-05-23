
//通用配置
export default {
	domain:'http://123.56.135.166/cnblog',
	defaultAvatar: 'http://123.56.135.166/cnblog/public/img/avatar.png',
	version: '1.0.1',
	authorInfo: {
		name:'togayther',
		homepage: 'https://github.com/togayther'
	}
}

//文章类型
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
	home_detail:"/topic/detail?id=<%= id %>",
	rank_detail:"/topic/detail?id=<%= id %>",
	news_detail:"/news/detail?id=<%= id %>"
}

//默认分页大小
export const pageSize = 10;