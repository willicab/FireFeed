currentItem = general['currentItem'];

for (subscription in subscriptions) {
    refreshSubscription(subscriptions[subscription]['url'], subscriptions[subscription]['category']);
}

$(document).ready(function () {
    //deleteAll();
    //return;
    $('#btnDown').click(function() {
        next = sorted[(sorted.indexOf(general['currentItem']) + 1)];
        if (next == undefined) return;
        $('.articulo').css("display","none");
        fillContent('b_' + next);
        window.location.href="#a_" + next;
    });
    $('#btnUp').click(function() {
        next = sorted[(sorted.indexOf(general['currentItem']) - 1)];
        if (next == undefined) return;
        $('.articulo').css("display","none");
        fillContent('b_' + next);
        window.location.href="#a_" + next;
    });
    $('#back').click(function() {
        if (general['currentCategory'] == 'all' || general['currentCategory'] == 'fav') {
            window.location.href = "main.html";
        } else {
            window.location.href = "categories.html";
        }
    });
    $('#btnFav').click(function() {
        if(items[general['currentItem']]['fav'] == false) {
            items[general['currentItem']]['fav'] = true;
            $('#btnFav').css('background-image', 'url("img/fav.png")');
        } else {
            items[general['currentItem']]['fav'] = false;
            $('#btnFav').css('background-image', 'url("img/nofav.png")');
        }
        saveAll();
    });
    setInit();
    fillItems();
});
