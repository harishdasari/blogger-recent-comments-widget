/**
 * Recent Comments Widget with Avatar for Blogger
 * Version	: 1.3
 * Author 	: Harish
 * Author Url 	: http://www.way2blogging.org/
 * (c) 2012 allrightsreserved.
 *
 *	--==Options==--
 * 		var 	numComments 	= 5,
 * 			showAvatar 	= true,
 * 			avatarSize 	= 60,
 * 			roundAvatar	= true,
 * 			showMorelink	= false,
 * 			moreLinktext	= "More &raquo;"
 * 			characters 	= 40,
 * 			defaultAvatar 	= "http://www.gravatar.com/avatar/?d=mm",
 * 			hideCredits	= false;
 * 
 */

var numComments = numComments || 5,
    avatarSize = avatarSize || 60,
    characters = characters || 40,
    defaultAvatar = defaultAvatar || "http://www.gravatar.com/avatar/?d=mm",
    moreLinktext = moreLinktext || " More &raquo;",
    showAvatar = (typeof showAvatar === 'undefined') ? true : showAvatar,
    showMorelink = (typeof showMorelink === 'undefined') ? false : showMorelink,
    roundAvatar = (typeof roundAvatar === 'undefined') ? true : roundAvatar,
    hideCredits = (typeof hideCredits === 'undefined') ? false : roundAvatar;

function w2b_recent_comments(w2b) {
    var commentsHtml;
    commentsHtml = '<ul class="w2b_recent_comments">';
    for (var i = 0; i < numComments; i++) {
        var commentlink, authorName, authorAvatar, avatarClass;
        if (i == w2b.feed.entry.length) break;
        commentsHtml += "<li>";
        var entry = w2b.feed.entry[i];
        for (var l = 0; l < entry.link.length; l++) {
            if (entry.link[l].rel == 'alternate') {
                commentlink = entry.link[l].href;
		break;
            }
        }
	authorName = entry.author[0].name.$t;
	authorAvatar = entry.author[0].gd$image.src;
        if (authorAvatar.indexOf("/s1600/") != -1) {
            authorAvatar = authorAvatar.replace("/s1600/", "/s" + avatarSize + "-c/")
        } else if (authorAvatar.indexOf("/s220/") != -1) {
            authorAvatar = authorAvatar.replace("/s220/", "/s" + avatarSize + "-c/")
        } else if (authorAvatar.indexOf("/s512-c/") != -1 && authorAvatar.indexOf("http:") != 0) {
            authorAvatar = "http:" + authorAvatar.replace("/s512-c/", "/s" + avatarSize + "-c/")
        } else if (authorAvatar.indexOf("blogblog.com/img/b16-rounded.gif") != -1) {
            authorAvatar = "http://3.bp.blogspot.com/-AaI8-1X32ZM/TxMKLVzQ5BI/AAAAAAAABYY/QYau8ov2blE/s" + avatarSize + "/w2b_blogger_logo.png"
        } else if (authorAvatar.indexOf("blogblog.com/img/openid16-rounded.gif") != -1) {
            authorAvatar = "http://3.bp.blogspot.com/-9lSeVyNRKx0/TxMKMIqMNuI/AAAAAAAABYc/8iasY0xpLzc/s" + avatarSize + "/w2b_openid_logo.png"
        } else if (authorAvatar.indexOf("blogblog.com/img/blank.gif") != -1) {
            if (defaultAvatar.indexOf("gravatar.com") != -1) {
                authorAvatar = defaultAvatar + "&s=" + avatarSize
            } else {
                authorAvatar = defaultAvatar
            }
        } else {
            authorAvatar = authorAvatar
        }
        if (showAvatar == true) {
            if (roundAvatar == true) {
                avatarClass = "avatarRound"
            } else {
                avatarClass = ""
            }
            commentsHtml += "<div class=\"avatarImage " + avatarClass + "\"><img class=\"" + avatarClass + "\" src=\"" + authorAvatar + "\" alt=\"" + authorName + "\" width=\"" + avatarSize + "\" height=\"" + avatarSize + "\"/></div>"
        }
        commentsHtml += "<a href=\"" + commentlink + "\">" + authorName + "</a>";
        var commHTML = entry.content.$t;
        var commBody = commHTML.replace(/(<([^>]+)>)/ig, "");
        if (commBody != "" && commBody.length > characters) {
            commBody = commBody.substring(0, characters);
            commBody += "&hellip;";
            if (showMorelink == true) {
                commBody += "<a href=\"" + commentlink + "\">" + moreLinktext + "</a>"
            }
        } else {
            commBody = commBody
        }
        commentsHtml += "<span>" + commBody + "</span>";
        commentsHtml += "</li>"
    }
    commentsHtml += '</ul>';
    var hideCSS = "";
    if (hideCredits == true) {
        hideCSS = "display:none;"
    }
    commentsHtml += "<span style=\"font-size:10px;display:block;text-align:right;" + hideCSS + "\">Widget by<a href=\"http://www.way2blogging.org/\">Way2Blogging</a></span>";
    document.write(commentsHtml)
}
