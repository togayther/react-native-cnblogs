
export default {
	appInfo:{
		name:'博客园',
		avatar:'http://123.56.135.166/cnblog/public/img/common/avatar.jpg?v=1.0',
		descr:'开发者的网上家园',
		site:'www.cnblogs.com',
		version: 'v.1.0.1',
		copyright: '©2016 powered by react-native',
		declare: '博客园创立于2004年1月，是一个面向开发者的知识分享社区。自创建以来，博客园一直致力并专注于为开发者打造一个纯净的技术交流社区，推动并帮助开发者通过互联网分享知识，从而让更多开发者从中受益。博客园的使命是帮助开发者用代码改变世界。'
	},
	authorInfo: {
		name:'togayther',
		email:'sleepsleepsleep@foxmail.com',
		avatar: 'http://123.56.135.166/cnblog/public/img/common/author.jpg',
		homepage: 'https://github.com/togayther',
		declare: '本软件为个人学习交流作品，内容来源于博客园官方开放接口，版权归博客园及原作者所有。'
	},
	apiDomain:'https://api.cnblogs.com/',
	assetDomain: 'http://123.56.135.166/cnblog',
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
	pubKey : "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCp0wHYbg/NOPO3nzMD3dndwS0MccuMeXCHgVlGOoYyFwLdS24Im2e7YyhB0wrUsyYf0/nhzCzBK8ZC9eCWqd0aHbdgOQT6CuFQBMjbyGYvlVYU2ZP7kG9Ft6YV6oc9ambuO7nPZh+bvXH0zDKfi02prknrScAKC0XhadTHT3Al0QIDAQAB\n-----END PUBLIC KEY-----",
	clientId: "cdfb6ec8-e78d-4c70-82df-7b1651a98808",
	clientSecret: "TFgkwiEVDBGZwPncPL9b5a9_z7E2pipUPFHo9OWIeOXkGTImxr_-LQBMw9_gQLX94Faqkbs9VbL_CKk-"
};

export const pageSize = 10;

export const storageKey = {
	OFFLINE_POSTS: "OFFLINE_POSTS",
	IMAGE_LOAD_FLAG: "IMAGE_LOAD_FLAG",
	USER_TOKEN: "USER_TOKEN"
};