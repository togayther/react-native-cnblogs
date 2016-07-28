
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
    return "http://www.sucaijishi.com/uploadfile/2016/0203/20160203022631602.png";
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
