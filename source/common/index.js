
import _ from 'lodash';

export function getBloggerName(authorUri){
	authorUri = _.trimEnd(authorUri, '\/');
	return authorUri.slice(authorUri.lastIndexOf("\/") + 1);
}