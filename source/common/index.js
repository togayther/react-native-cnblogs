
import React, {
    NetInfo
} from 'react-native';

import _ from 'lodash';
import Config from '../config';
import entities from 'entities';

export function getBloggerName(authorUri) {
    authorUri = _.trimEnd(authorUri, '\/');
    return authorUri.slice(authorUri.lastIndexOf("\/") + 1);
}

const seedColors = ['#ec898a', '#69bb97', '#55b9ce', '#cc936e', '#65be8d', '#6bb6cb', '#ae9cc3'];
export function getRandomColor(){
    return seedColors[_.random(0, seedColors.length -1)];
}

export function getBloggerAvatar(avatarUri){
    if (avatarUri && !_.endsWith(avatarUri, ".gif")) {
        avatarUri = avatarUri.replace(/face/, 'avatar');
        avatarUri = avatarUri.replace(/avatar\/u/, 'avatar\/a');
        return avatarUri;
    }
    return Config.appInfo.avatar;
}

/**
 * 从2016年这个炎热的8月开始，
 * 博客园新闻列表 & 详情接口，返回的图片格式出现错误：
 * 列表：http://images0.cnblogs.com/news_topic///images2015.cnblogs.com/news_topic/20160627211458609-1031834166.png
 * 详情：//images2015.cnblogs.com/news/66372/201608/66372-20160817121401015-627031105.jpg 
 * wtf
 * 所以打个补丁兼容一下。
 *============================================================================================================= */
export function formatNewsImgUri(uri){
    if(uri){
        uri = uri.replace("images0.cnblogs.com/news_topic///", "");
        if(!_.startsWith(uri, "http:")){
            uri = "http:" + uri;
        }
    }

    return uri;
}

export function filterCodeSnippet(codeText) {
    if (codeText && codeText.length) {
        codeText = _.trim(codeText);
        codeText = _.trim(codeText, '&#xD;');
        if (codeText.startsWith(' ') || codeText.endsWith(' ') || codeText.startsWith('&#xD;') || codeText.endsWith('&#xD;')) {
            codeText = filterCodeSnippet(codeText);
        }
    }
    return codeText;
}

export function filterCommentData(commentText) {
    if (commentText && commentText.length) {
        commentText = commentText.replace(/<(script)[\S\s]*?\1>|<\/?(a|img)[^>]*>/gi, "");
        commentText = "<comment>" + commentText + "</comment>";
    }
    return commentText;
}

export function decodeHTML(htmlStr) {
    if (htmlStr && htmlStr.length) {
        htmlStr = entities.decodeHTML(htmlStr);
    }
    return htmlStr;
}

const imageSourcePath = Config.domain + "/public/img/metarial/";
export function getImageSource(key){
    let imageLen = 20;
    if (!key) {
        key = _.random(1, imageLen - 1);
    }
    return imageSourcePath + key + ".jpg?v=1.1";
}
