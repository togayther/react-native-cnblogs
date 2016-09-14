
export default  {
	home: {
		list:"api/blogposts/@sitehome?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>",
		detail: "api/blogposts/<%=id%>/body",
		comments: "api/blogs/<%=blogger%>/posts/<%=id%>/comments?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>",
		commentAdd: "api/blogs/<%=blogger%>/posts/<%id%>/comments",
	},
	rank: {
		list:"api/blogposts/@picked?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>",
		detail: "api/blogposts/<%=id%>/body",
		comments: "api/blogs/<%=blogger%>/posts/<%=id%>/comments?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>",
		commentAdd: "api/blogs/<%=blogger%>/posts/<%id%>/comments",
	},
	news: {
		list:"api/NewsItems?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>",
		detail: "api/newsitems/<%=id%>/body",
		comments: "api/news/<%=id%>/comments?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>",
		commentAdd: "api/news/<%=id%>/comments",
	},
	question: {
		list:"api/questions/@sitehome?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>",
		detail: "api/questions/<%=id%>",
		add:"api/questions",
		update: "api/questions/<%=id%>",
		answers: "api/questions/<%=id%>/answers",
		answerAdd:"api/questions/<%=id%>/answers",
		answerComments: "api/questions/answers/<%=aid%>/comments",
		answerCommentAdd: "api/questions/<%=id%>/answers/<%=aid%>/comments"
	},
	blink: {
		//list:"api/statuses/@<%=type%>?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>",
		list:"api/statuses/@all?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>",
		detail: "api/statuses/<%=id%>",
		add:"api/statuses",
		comments: "api/statuses/<%=id%>/comments",
		commentAdd: "api/statuses/<%=id%>/comments",
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
		blogs:"api/blogs/<%=blogger%>/posts?pageIndex=<%=pageIndex%>",
		blogInfo: "api/blogs/<%=blogger%>",
		blinks: "api/statuses/@<%=type%>?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>&tag=<%=tag%>",
		ques:"api/questions/@myquestion?pageIndex=<%=pageIndex%>&pageSize=<%=pageSize%>"
	}
}