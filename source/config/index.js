
//http://123.56.135.166/cnblog/topic/index
//http://192.168.0.104:8082/cnblog/index.php/home/topic/index

//通用配置
export default {
	//domain: 'http://123.56.135.166/cnblog',
	domain:"http://192.168.0.104:8082/cnblog/index.php/home",
	bodyimg: 'http://123.56.135.166/cnblog/public/img/bg.jpg',
	defaultAvatar: 'http://123.56.135.166/cnblog/public/img/avatar.png',
	version: '1.0.1',
	authorInfo: {
		name:'togayther',
		homepage: 'https://github.com/togayther'
	}
}

//资源文件类型
export const postCategory = {
	home: "home", 
	rank: "rank",
	news: "news"
};

//数据接口地址
export const dataApi = {
	home: "/topic/index?pageindex={0}&pagesize={1}",
	rank: "/topic/rank?pageindex={0}&pagesize={1}",
	home_detail:"/topic/detail?id={0}",
	rank_detail:"/topic/detail?id={0}",
	news: "/news/index?pageindex={0}&pagesize={1}",
	news_detail:"/news/detail?id={0}"
}

//默认分页大小
export const pageSize = 10;