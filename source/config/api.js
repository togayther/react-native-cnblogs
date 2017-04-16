
export default  {
	home: {
		list:"api/blogposts/@sitehome?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>",
		detail: "api/blogposts/<%=id%>/body",
		comments: "api/blogs/<%=blogger%>/posts/<%=id%>/comments?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>",
		comment_add: "api/blogs/<%=blogger%>/posts/<%=id%>/comments",
	},
	rank: {
		//list:"api/blogposts/@picked?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>",
		//note: 上面这个官方接口，数据基本无更新，故替换为以下接口，数据格式是一致的。
		//接口说明：http://wcf.open.cnblogs.com/blog/help
		//因该接口返回数据格式为xml，故搭建了一个中间服务器，做了json化的处理。
		//2016-11-01 togayther
		list: "http://123.56.135.166/cnblog/post/rank?pageindex=<%=pageIndex%>&pagesize=<%=pageSize%>",
		detail: "api/blogposts/<%=id%>/body",
		comments: "api/blogs/<%=blogger%>/posts/<%=id%>/comments?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>",
		comment_add: "api/blogs/<%=blogger%>/posts/<%=id%>/comments",
	},
	news: {
		list:"api/NewsItems?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>",
		detail: "api/newsitems/<%=id%>/body",
		comments: "api/news/<%=id%>/comments?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>",
		comment_add: "api/news/<%=id%>/comments",
	},
	question: {
		list:"api/questions/@sitehome?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>",
		detail: "api/questions/<%=id%>",
		add:"api/questions",
		remove: "api/questions/<%=id%>",
		status: 'api/questions/<%=id%>?userId=<%=uid%>',
		comments: "api/questions/<%=id%>/answers",
		comment_add:"api/questions/<%=id%>/answers",
	},
	answer: {
		comments:  "api/questions/answers/<%=id%>/comments",
		comment_add: "api/questions/<%=id%>/answers/<%=id%>/comments"
	},
	blink: {
		//这个列表接口，现在已经没有数据返回了。博客园应该做了什么调整 !-_-。
		list:"api/statuses/@all?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>",
		detail: "api/statuses/<%=id%>",
		add:"api/statuses",
		remove: "api/statuses/<%=id%>",
		comments: "api/statuses/<%=id%>/comments",
		comment_add: "api/statuses/<%=id%>/comments",
	},
	favorite:{
		list:"api/Bookmarks?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>",
		add: "api/Bookmarks",
		status:"api/Bookmarks?url=<%=url%>",
		remove:"api/bookmarks?url=<%=url%>"
	},
	user: {
		info: "api/Users",
		auth: "token",
		home: "api/blogs/<%=blogger%>/posts?pageIndex=<%=pageIndex%>",
		blink: "api/statuses/@my?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>",
		question: "api/questions/@myquestion?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>",
		favorite: "api/Bookmarks?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>"
	},
	author: {
		detail: "api/blogs/<%=blogger%>",
		posts: "api/blogs/<%=blogger%>/posts?pageIndex=<%=pageIndex%>"
	},
	search: {
		blog: "api/ZzkDocuments/1?keyWords=<%=key%>&pageIndex=<%=pageIndex%>&pageSize=10",
		news: "api/ZzkDocuments/2?keyWords=<%=key%>&pageIndex=<%=pageIndex%>",
		kb: "api/ZzkDocuments/4?keyWords=<%=key%>&pageIndex=<%=pageIndex%>",
	},
	update: {
		info: "http://123.56.135.166/cnblog/update?version=<%=version%>"
	}
}