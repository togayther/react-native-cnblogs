
export default {
	appInfo:{
		name:'博客园',
		descr:'开发者的网上家园',
		site:'www.cnblogs.com',
		version: '3.3.0',
		copyright: '©2016 powered by react-native',
		registerUri: 'https://passport.cnblogs.com/register.aspx?ReturnUrl=http://www.cnblogs.com/',
		declare: '博客园创立于2004年1月，是一个面向开发者的知识分享社区。自创建以来，博客园一直致力并专注于为开发者打造一个纯净的技术交流社区，推动并帮助开发者通过互联网分享知识，从而让更多开发者从中受益。博客园的使命是帮助开发者用代码改变世界。'
	},
	authorInfo: {
		name:'togayther',
		email:'sleepsleepsleep@foxmail.com',
		homepage: 'https://github.com/togayther',
		declare: '本软件为个人学习交流作品，内容来源于博客园官方开放接口，版权归博客园及原作者所有。'
	},
	commentTail: 'from [url=http://fir.im/togayther]rn-cnblogs[/url]',
	apiDomain:'https://api.cnblogs.com/'
};

export const postCategory = {
	home: "home", 
	rank: "rank",
	news: "news",
	blink: "blink",
	question: "question",
	favorite: "favorite",
	answer: "answer"
};

export const authData = {
	pubKey : "", //向博客园申请后填入
 	clientId: "",//向博客园申请后填入
 	clientSecret: ""//向博客园申请后填入
};

export const pageSize = 10;

export const storageKey = {
	OFFLINE_POSTS: "OFFLINE_POSTS",
	USER_TOKEN: "USER_TOKEN",
	TAIL_CONTENT: "TAIL_CONTENT",
	TAIL_ENABLED: "TAIL_ENABLED",
	
};