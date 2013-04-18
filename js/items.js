function fillItems() {
    var count = 0;
    var strHtml = '';
    for (item in sortOnKeys(items)) {
        if (general['currentSubscription'] == 'fav' && general['currentCategory'] == 'fav') {
            // Todos los favoritos
            if (items[item]['fav'] == false) continue;
        } else if (general['currentSubscription'] == 'all' && general['currentCategory'] != 'all') {
            // Todas las subscripciones de una categoría
            if (general['currentCategory'] != items[item]['category']) continue;
        } else if (general['currentSubscription'] != 'all' && general['currentCategory'] != 'all') {
            // Una subscripción de una categoría
            if (general['currentCategory'] != items[item]['category']) continue;
            if (general['currentSubscription'] != items[item]['subscription']) continue;
        } if (general['hideReaded'] == true && items[item]['readed'] == true) continue;

        i = items[item]
        //maxText = parseInt(((($(document).width() -18) * i['title'].length) / i['title'].width('14px')) - 3 );
        //titleBanner = (i['title']).substr(0, maxText);
        //if (i['title'].length > maxText) titleBanner += '...';
        preFav = (i['fav'] == false) ? 'no' : '';
        titleBanner = '<span style="color: #999">' + i['subscription'] + '</span> - ' + i['title'];
        clase = i['readed'] == true ? 'readed' : '';
        strHtml += '<div id="div_' + item + '">\n';
        strHtml += '\t<a name="a_' + item + '" href="#a_' + item + '" class="banner ' + clase + '" id="b_' + item + '"><img class="favicon" src="' + i['favicon'] + '" /> ' + titleBanner + '</a>\n';
        strHtml += '\t<div class="articulo" id="c_' + item + '">\n';
        strHtml += '\t\t<h2><a href="' + i['link'] + '">' + i['title'] + '</a></h2>\n';
        strHtml += '\t\t<p id="p_' + item + '"></p>\n';
        strHtml += '\t</div>\n';
        strHtml += '</div>\n';
        
    }
    $('#content').append(strHtml);

    $('.banner').click(function() {
        fillContent(this.id);
    });
}
