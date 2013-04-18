function fillSubscriptions() {
    var strHtml = '<li><a id="allItems" href="#">All Subscriptions <span class="spanCount" id="countGeneral"></span></a></li>\n';
    strHtml += '<li id="divisor">Subscription</li>';
    
    var allItems = 0;
    //console.log(subscriptions);
    for(var subscription in subscriptions) {
        if (currentCategory != subscriptions[subscription]['category']) {
            continue;
        }
        count = subscriptions[subscription]['count'] == 0 ? '' : subscriptions[subscription]['count'];
        strHtml += '\t<li><a class="subscriptions" id="' + subscription + '" href="#">' + subscription + ' <span class="spanCount">' + count + '</a></span></li>\n';
        allItems += subscriptions[subscription]['count'];
    }
    $('#menuMain').empty().append(strHtml);
    count = allItems == 0 ? '' : allItems;
    $('#countGeneral').text(count);
    $('.subscriptions').click(function(){
        general['currentSubscription'] = this.id;
        saveAll();
        window.location.href="items.html";
    });
    $('#allItems').click(function(){
        general['currentCategory'] = currentCategory;
        general['currentSubscription'] = 'all';
        saveAll();
        window.location.href="items.html";
    });
}
