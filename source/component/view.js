import * as View from '../view';

export default ViewPage = {
    home: ()=>{
        return {
            component: View.Home,
			name: 'home'
        }
    },
    startup: ()=>{
        return {
            component: View.Startup,
			name: 'startup'
        }
    },
    login: ()=>{
        return {
            component: View.Login,
			name: 'login'
        }
    },
    post: ()=>{
        return {
            component: View.Post,
			name: 'post'
        }
    },
    author: ()=>{
        return {
            component: View.Author,
			name: 'author'
        }
    },
    postComment: ()=>{
        return {
            component: View.PostComment,
			name: 'postComment'
        }
    },
    search: ()=>{
        return {
            component: View.Search,
			name: 'search'
        }
    },
    setting: ()=>{
        return {
            component: View.Setting,
			name: 'setting'
        }
    },
    about: ()=>{
        return {
            component: View.About,
			name: 'about'
        }
    },
    offline: ()=>{
        return {
            component: View.Offline,
			name: 'offline'
        }
    },
    offlinePost: ()=>{
        return {
            component: View.OfflinePost,
			name: 'offlinePost'
        }
    },
    blink: ()=>{
        return {
            component: View.Blink,
			name: 'blink'
        }
    },
    question: ()=>{
        return {
            component: View.Question,
			name: 'question'
        }
    },
    commentAdd: ()=>{
        return {
            component: View.CommentAdd,
			name: 'commentAdd'
        }
    },
    blinkAdd: ()=>{
        return {
            component: View.BlinkAdd,
			name: 'blinkAdd'
        }
    },
    questionAdd: ()=>{
        return {
            component: View.QuestionAdd,
			name: 'questionAdd'
        }
    },
    user: ()=>{
        return {
            component: View.User,
			name: 'user'
        }
    },
    favorite: ()=>{
        return {
            component: View.Favorite,
			name: 'favorite'
        }
    },
    userAsset: ()=>{
        return {
            component: View.UserAsset,
			name: 'userAsset'
        }
    },
    searchDetail: ()=>{
        return {
            component: View.SearchDetail,
			name: 'searchDetail'
        }
    },
    feedback: ()=>{
        return {
            component: View.Feedback,
			name: 'feedback'
        }
    },
    update: ()=>{
        return {
            component: View.Update,
			name: 'update'
        }
    },
    tailSetting: ()=>{
        return {
            component: View.TailSetting,
			name: 'tailSetting'
        }
    },
    web: ()=>{
        return {
            component: View.Web,
			name: 'web'
        }
    },
    questionAnswerComment: ()=>{
        return {
            component: View.QuestionAnswerComment,
			name: 'questionAnswerComment'
        }
    }
}