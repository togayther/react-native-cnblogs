
export default  {
	home: {
		list:"api/blogposts/@sitehome?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>",
		detail: "api/blogposts/<%=id%>/body",
		comments: "api/blogs/<%=blogger%>/posts/<%=id%>/comments?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>",
		comment_add: "api/blogs/<%=blogger%>/posts/<%id%>/comments",
	},
	rank: {
		list:"api/blogposts/@picked?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>",
		detail: "api/blogposts/<%=id%>/body",
		comments: "api/blogs/<%=blogger%>/posts/<%=id%>/comments?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>",
		comment_add: "api/blogs/<%=blogger%>/posts/<%id%>/comments",
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
		update: "api/questions/<%=id%>",
		comments: "api/questions/<%=id%>/answers",
		comment_add:"api/questions/<%=id%>/answers",
	},
	answer: {
		comments:  "api/questions/answers/<%=id%>/comments",
		comment_add: "api/questions/<%=id%>/answers/<%=id%>/comments"
	},
	blink: {
		list:"api/statuses/@all?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>",
		detail: "api/statuses/<%=id%>",
		add:"api/statuses",
		comments: "api/statuses/<%=id%>/comments",
		comment_add: "api/statuses/<%=id%>/comments",
	},
	favorite:{
		list:"api/Bookmarks?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>",
		add: "api/Bookmarks",
		check:"api/Bookmarks?url=<%=url%>",
		delete:"api/bookmarks/<%=%>"
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
		blog: "api/ZzkDocuments/Blog?keyWords=<%=key%>&pageIndex=20",
		news: "api/ZzkDocuments/News?keyWords=<%=key%>&pageIndex=20",
		kb: "api/ZzkDocuments/KB?keyWords=<%=key%>&pageIndex=20",
	}
}