$(document).ready(function () {
    idCategory = ''
    strHtml = '';
    for (category in categories) {
//        console.log(category);
        strHtml += '<li class="mnuOption" id="' + category + '">' + category + '</li>\n';
    }
    $('#listCategories').html(strHtml);
    $('.mnuOption').click(function(){
        idCategory = this.id;
        $('#category').append(idCategory);
        $('#dialog').css('display', 'block');
        $('#optionsCategories').css('display', 'block');
    });
    $('.btnClose').click(function(){
        $('#dialog').css('display', 'none');
        $('#optionsCategories').css('display', 'none');
    });
    $('#rename').click(function(){
        $('#txtCategory').val(idCategory);
        $('#txtCategory').focus().select();
        $('#optionsCategories').css('display', 'none');
        $('#renameCategory').css('display', 'block');
    });
    $('#remove').click(function(){
        $('#optionsCategories').css('display', 'none');
        $('#removeCategory').css('display', 'block');
        fillListCategories(idCategory);
        $("#selectCategories").append('<option value="remove">Remove Subscriptions</option>\n');
    });
    $('#btnRename').click(function(){
        if ($('#txtCategory').val() == '') {
            alert('The field must not be blank');
            return;
        } else if (categories[$('#txtCategory').val()] != undefined) {
            console.log(categories[$('#txtCategory').val()]);
            alert('Category already exists');
            return;
        } else {
            moveItems(idCategory, $('#txtCategory').val());
            delete categories[idCategory];
            saveAll();
            location.reload();
        }
    });
    $('#btnRemove').click(function(){
        console.log($('#selectCategories').val());
        if ($('#selectCategories').val() == 'remove') {
            delete categories[idCategory];
            for (item in items) {
                if (items[item]['category'] == idCategory)
                    delete items[item];
            }
            for (subscription in subscriptions) {
                if (subscriptions[subscription]['category'] == idCategory)
                    delete subscriptions[subscription];
            }
        } else {
            moveItems(idCategory, $('#selectCategories').val());
            delete categories[idCategory];
        }
        saveAll();
        location.reload();
    });
    $('.btnCancel').click(function(){
        $('#dialog div').css('display', 'none');
        $('#dialog').css('display', 'none');
    });
});

function moveItems(idCategoryFrom, idCategoryTo) {
    categories[idCategoryTo] = categories[idCategoryFrom];
    for (item in items) {
        if (items[item]['category'] == idCategoryFrom)
            items[item]['category'] = idCategoryTo;
    }
    for (subscription in subscriptions) {
        if (subscriptions[subscription]['category'] == idCategoryFrom)
            subscriptions[subscription]['category'] = idCategoryTo;
    }
}
