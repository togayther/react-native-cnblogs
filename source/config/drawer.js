
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
	icon: "ios-color-filter-outline",
	action: "toBlink",
	flag: postCategory.blink
},{
	text: "博问",
	icon: "ios-help-circle-outline",
	action: "toQuestion",
	flag: postCategory.ques
},{
	text: "离线",
	icon: "ios-download-outline",
	action: "toOffline",
	flag:"offline"
}];
