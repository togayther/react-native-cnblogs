
import React, {
    NetInfo,
    Linking
} from 'react-native';

import _ from 'lodash';
import moment from 'moment';
import Config from '../config';
import entities from 'entities';

const bloggerAvatarPath = "https://pic.cnblogs.com/face/";

const newsUrlDomain = "https://news.cnblogs.com/n/";

const defaultAvatar = require('../image/avatar.jpg');

const headerImgSource = [
    require('../image/header/1.jpg'),
    require('../image/header/2.jpg'),
    require('../image/header/3.jpg'),
    require('../image/header/4.jpg'),
    require('../image/header/5.jpg'),
    require('../image/header/6.jpg'),
    require('../image/header/7.jpg'),
    require('../image/header/8.jpg'),
    require('../image/header/9.jpg'),
    require('../image/header/10.jpg'),
    require('../image/header/11.jpg')
];

export const logoImage = require('../image/logo.png');

export function getBloggerAvatar(avatarUri){
    let avatarSource;
    if(!avatarUri || (avatarUri === bloggerAvatarPath) || avatarUri.indexOf("sample_face.gif") >= 0){
        avatarSource = defaultAvatar;
    }
    else if (!_.startsWith(avatarUri, 'http')){
        avatarSource = { uri: bloggerAvatarPath + avatarUri };
    }
    else {
        avatarSource = { uri: avatarUri };
    }
    return avatarSource;
}

export function getBloggerHdpiAvatar(avatarUri){
    if (avatarUri && !_.endsWith(avatarUri, ".gif")) {
        avatarUri = avatarUri.replace(/face/, 'avatar');
        avatarUri = avatarUri.replace(/avatar\/u/, 'avatar\/a');
        return { uri: avatarUri };
    }
    return defaultAvatar;
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

export function getImageSource(key = -1){
    let imageLen = headerImgSource.length;
    if (key < 0 || (key > imageLen)) {
        key = _.random(1, imageLen - 1);
    }
    return headerImgSource[key];
}

export function getFormatDate(date){
    return moment(date).startOf('minute').fromNow();
}

export function getNewsUrlFromID(newsID){
    let newsUrl = "";
    if(newsID){
        newsUrl =  newsUrlDomain + newsID + "/";
    }
    return newsUrl;
}

export function splitStrToArray(str, char = ',', count = 3){
    return _.split(str, char, count);
}

export function numberValidator(str){
    let patten = /^[1-9]*[1-9][0-9]*$/;
    return patten.test(str);
}

export function openLink(uri){
    Linking.canOpenURL(uri).then(supported=> {
        if (supported) {
            return Linking.openURL(uri)
        }
    })
    .catch(err=> {
        console.warn('cannot open uri: '+ uri);
    })
}

export function convertJSONToFormData(jsonData){
    let form_data = [];
    for ( var key in jsonData ) {
        form_data.push(key + "=" + jsonData[key]);
    }
    return form_data.join("&");
}