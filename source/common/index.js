
import React, {
    NetInfo
} from 'react-native';

import _ from 'lodash';
import entities from 'entities';

export function getBloggerName(authorUri) {
    authorUri = _.trimEnd(authorUri, '\/');
    return authorUri.slice(authorUri.lastIndexOf("\/") + 1);
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
    }
    return commentText;
}

export function decodeHTML(htmlStr) {
    if (htmlStr && htmlStr.length) {
        htmlStr = entities.decodeHTML(htmlStr);
        htmlStr = htmlStr.replace(/&amp;/g, "&");
        htmlStr = htmlStr.replace(/&lt;/g, "<");
        htmlStr = htmlStr.replace(/&gt;/g, ">");
        htmlStr = htmlStr.replace(/&nbsp;/g, " ");
        htmlStr = htmlStr.replace(/&#39;/g, "\'");
        htmlStr = htmlStr.replace(/&quot;/g, "\"");
        htmlStr = htmlStr.replace(/&ldquo;/g, "\"");
        htmlStr = htmlStr.replace(/&rdquo;/g, "\"");
        htmlStr = htmlStr.replace(/&mdash;/g, "—");
    }
    return htmlStr;
}