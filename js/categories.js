function fillCategories() {
    var strHtml = '<li><a id="allItems" href="#">All Items <span class="spanCount" id="countGeneral"></span></a></li>\n';
    strHtml += '<li><a id="favorites" href="#">Favorites</a></li>\n';
    strHtml += '<li id="divisor">Categories</li>\n';
    
    var allItems = 0;
    for(var category in categories) {
        count = categories[category] == 0 ? '' : categories[category];
        strHtml += '\t<li><a class="categories" id="' + category + '" href="#">' + category + ' <span class="spanCount">' + count + '</a></span></li>\n';
        allItems += categories[category];
    }
    $('#menuMain').empty().append(strHtml);
    count = allItems == 0 ? '' : allItems;
    $('#countGeneral').text(count);
    $('.categories').click(function(){
        general['currentCategory'] = this.id;
        saveAll();
        window.location.href="categories.html";
    });
    $('#allItems').click(function(){
        general['currentCategory'] = 'all';
        general['currentSubscription'] = 'all';
        saveAll();
        window.location.href="items.html";
    });
    $('#favorites').click(function(){
        general['currentCategory'] = 'fav';
        general['currentSubscription'] = 'fav';
        saveAll();
        window.location.href="items.html";
    });
    
}
