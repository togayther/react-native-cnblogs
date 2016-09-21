
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
		comment_comments: "api/questions/answers/<%=aid%>/comments",
		comment_comment_add: "api/questions/<%=id%>/answers/<%=aid%>/comments"
	},
	blink: {
		//list:"api/statuses/@<%=type%>?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>",
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
	}
}