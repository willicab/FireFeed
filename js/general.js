// Crea el Array general
try{var general = JSON.parse(localStorage['general']);} // la lista de artículos
catch(e){
    var general = {
        count: 0,
        hideReaded: false,
        currentCategory: '',
        currentSubscription: '',
        currentItem: '',
    };
    localStorage['general']=JSON.stringify(general);
}

// Crea el Array categories
try{var categories = JSON.parse(localStorage['categories']);} // la lista de artículos
catch(e){
    console.log('No hay categorias, se creará una');
    var categories = {};
    categories['General'] = 0;
    localStorage['categories']=JSON.stringify(categories);
}

// Crea el Array subscriptions
try{var subscriptions = JSON.parse(localStorage['subscriptions']);} // la lista de artículos
catch(e){
    console.log('No hay subscripciones, se creará una');
    var subscriptions = {};
    refreshSubscription('http://willicab.gnu.org.ve/feed/', 'General');
    localStorage['subscriptions']=JSON.stringify(subscriptions);
}

// Crea el Array items
try{var items = JSON.parse(localStorage['items']);} // la lista de artículos
catch(e){
    console.log('No hay items');
    var items = {};
    localStorage['items']=JSON.stringify(items);
}

function saveAll() {
    localStorage['general']=JSON.stringify(general);
    localStorage['categories']=JSON.stringify(categories);
    localStorage['subscriptions']=JSON.stringify(subscriptions);
    localStorage['items']=JSON.stringify(items);
}

function deleteAll() {
    localStorage['general']='';
    localStorage['categories']='';
    localStorage['subscriptions']='';
    localStorage['items']='';
}

function setInit() {
    //$('#content').css("height", $(document).height() - 32);
    $('#btnMenu').click(function(){
        if($('#menuLateral').css("display") == "none") {
            $('#menuLateral').css("display", "block");
        } else {
            $('#menuLateral').css("display", "none");
        }
    });
    $('#optNewCategory').click(function(){
        $('#menuLateral').css("display", "none");
        $('#txtCategory').val('');
        $('#dialog').css('display', 'block');
        $('#newCategory').css('display', 'block');
    });
    $('#optNewSubscription').click(function(){
        $('#menuLateral').css("display", "none");
        $('#txtSubscription').val('');
        $('#dialog').css('display', 'block');
        $('#newSubscription').css('display', 'block');
        fillListCategories();
    });
    $('.btnCancel').click(function(){
        $('#dialog div').css('display', 'none');
        $('#dialog').css('display', 'none');
    });
    $('#btnCategory').click(function(){
        addCategory();
    });
    $('#btnSubscription').click(function(){
        $('#dialog').css('background', 'rgba(20, 20, 20, 0.3) url("img/loader.gif") no-repeat center');
        $('#newSubscription').css('display', 'none');
        addSubscription();
    });
}

function fillContent(thisId) {
    idB = thisId;
    id = thisId.replace('b_', '');
    idC = thisId.replace('b_', 'c_');
    idP = thisId.replace('b_', 'p_');
    $('#menu').css("display", "none");
    if ($('#' + idC).css("display") == "block") {   // Se cierra el artículo que se está leyendo
        $('#' + idC).css("display","none");
        $('#btnUp').css("display","none");
        $('#btnDown').css("display","none");
        $('#btnFav').css("display","none");
        $('#' + idP).html('');
        actual = 0;
    } else {                                        // Se abre el artículo
        if(items[id]['fav'] == false) {
            $('#btnFav').css('background-image', 'url("img/nofav.png")');
        } else {
            $('#btnFav').css('background-image', 'url("img/fav.png")');
        }
        $('.articulo').css("display","none");
        $('#btnUp').css("display","block");
        $('#btnDown').css("display","block");
        $('#btnFav').css("display","block");
        $('#' + idC).css("display","block");
        $('#' + idB).css("background-color","#dedede");
        $('#' + idP).append(items[id]['content']);
        $('img').load(function(){
            if (this.width > ($(document).width() - 10)) {
                tWidth = $(document).width() - 10;
                this.height = (this.height * tWidth) / this.width;
                this.width = tWidth;
            }
        });
        general['currentItem'] = id;
        if (items[id]['readed'] == false) {
            items[id]['readed'] = true;
            general['count'] -= 1;
            categories[items[id]['category']] -= 1;
            subscriptions[items[id]['subscription']]['count'] -= 1;
        }
        $("a").each(function(index) {
//            $(this).attr('rel', 'external');  
//            $(this).attr('target', '_blank');  
        });
        saveAll();
    }
}

function addCategory() {
    category = $('#txtCategory').val();
    if (category.trim() == '') {
        alert('The field must not be blank');
        return;
    }
    console.log('Guardando categoría ' + category);
    categories[category] = 0;
    saveAll();
    location.reload();
}

function fillListCategories(cat = ''){
    strHtml = '';
    for (category in categories) {
        if (cat != category){
            strHtml += '<option value="' + category + '">';
            strHtml += category;
            strHtml += '</option>\n';
        }
    }
    $("#selectCategories").empty().append(strHtml);
}

function addSubscription() {
    url = $('#txtSubscription').val();
    category = $('#selectCategories').val();    
    if (url.trim() == '') {
        alert('The field must not be blank');
        return;
    }
    result = refreshSubscription(url, category);
}

function refreshSubscription(subscriptionUrl, categoryName) {
    var reload = false;
    r = $.ajax({ 
        timeout:10000,
        url: "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&output=json&q=" + subscriptionUrl + "&hl=en&callback=?", 
        dataType: "json", 
        async: false,
        error: function(x, t, m) {
            return false;
        },
        success: function(data){
            if (data.responseData == null) {
                $('#dialog').css('background', 'rgba(20, 20, 20, 0.3)');
                $('#dialog').css('display', 'none');
                alert('This is not a valid subscription');
                return false;
            }
            entradas = data.responseData.feed.entries
            for (entrada in entradas){
                t = entradas[entrada];
                a = new Date(t.publishedDate); 
                year = a.getFullYear();
                month = format("00", a.getMonth());
                day = format("00", a.getDate());
                hour = format("00", a.getHours());
                minute = format("00", a.getMinutes());
                second = format("00", a.getSeconds());
                idDate = year + "" + month + "" + day + "" + hour + "" + minute + "" + second;                

                subscriptionName = data.responseData.feed.title;
                url = data.responseData.feed.link;
                if (items.hasOwnProperty(idDate) == false){
                    console.log('agregando item');
                    items[idDate] = {
                        title: t.title,
                        author: t.author,
                        date: a.toLocaleDateString() + " " + a.toLocaleTimeString(),
                        link: t.link,
                        content: t.content,
                        favicon: data.responseData.feed.link + '/favicon.ico',
                        fav: false,
                        readed: false,
                        category: categoryName,
                        subscription: subscriptionName
                    }
                    try {
                        subscriptions[subscriptionName]['count'] += 1;
                    } catch (err){
                        // no pasa nada
                    }
                    
                    categories[categoryName] += 1;
                    general['count'] += 1;
                }
                // Si no existe la subscripción la crea
                if (subscriptions.hasOwnProperty(subscriptionName) == false){
                    console.log('agregando subscripcion');
                    subscriptions[subscriptionName] = {
                        url: subscriptionUrl,
                        category: categoryName,
                        count: 0
                    }
                    subscriptions[subscriptionName]['count'] += 1;
                    reload = true;
                }
                saveAll();
                if (reload == true) location.reload();
            }
        }
    });
}
