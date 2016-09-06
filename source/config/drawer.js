
import { postCategory } from './index';

export default [{
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
	text: "闪存",
	icon: "ios-download-outline",
	action: "toOffline",
	flag:"offline"
},{
	text: "博问",
	icon: "ios-cog",
	action: "toSetting",
	flag:"setting"
},{
	text: "离线",
	icon: "ios-redo-outline",
	action: "toAbout",
	flag:"about"
}];
