


/**
* @description
* Vanilla Javascript Datagrid Implementation
* 
* @class
* @param {array} [options.data = []]        - Specifies data for datagrid table view, default is [].
* @param {number} [options.pageSize = 5]    - Specifies datagrid rows to show per page, default is 5.
* @param {number} [options.page = 1]        - Specifies initial page number when datagrid first create, default is 1.
* @param {string} [options.url]             - Specifies url to load server-side data.
* @param {object} [options.widthMap]        - Specifies datagrid table header column width.
*/

Datagrid = function(options) {

    var data = options.data || [],
        pageSize = options.pageSize || 5,
        page = options.page || 1,
        url = options.url,
        widthMap = options.widthMap || {};


    AJAX.get(url, function(resData) {
        data = resData;
        renderDatagrid(); 
    });


    function changePage(isNext) {
        var cachePage = page;
        page = isNext ? page + 1 : page - 1;

        if(page < 1 || page > data.length / pageSize) {
            page = cachePage;
            return;
        }

        renderDatagrid(); 
    }

    function pagination() {
        if(!data) return [];

        var pageData = [],
            start = (page - 1) * pageSize,
            end = data.length < page * pageSize ? data.length : page * pageSize;

        for(var i = start; i < end; i++) {
            pageData.push(data[i]);
        }

        return pageData;
    }

    function renderChangePageButtons() {

        var div = document.createElement('div');
            delimiter = document.createElement('span');
            prev = document.createElement('a');
            next = document.createElement('a');

        prev.href = 'javascript:void(0);'
        next.href = 'javascript:void(0);'
        prev.onclick = function() {changePage(false);}
        next.onclick = function() {changePage(true);}
        prev.innerHTML = 'Prev';
        next.innerHTML = 'Next';
        delimiter.innerHTML = '/';
        div.appendChild(prev);
        div.appendChild(delimiter);
        div.appendChild(next);

        return div;
    }

    function renderPageNumField() {

        var div = document.createElement('div');
            pageNumField = document.createElement('span');

        pageNumField.innerHTML = 'Page: ' + page;
        div.appendChild(pageNumField);

        return div;
    }

    function renderTable() {

        var pageData = pagination();
        var div = document.createElement('div');
        if(!pageData) return div;

        var table = document.createElement('table');

        //render table header
        var keys = Object.keys(pageData[0]);
            header = document.createElement('thead');
            headerRow = document.createElement('tr');

        for(var i = 0; i < keys.length; i++) {
            var key = keys[i]
            var cell = document.createElement('th');
            cell.innerHTML = key;
            if(key in widthMap) {
                cell.style.minWidth = widthMap[key];
            }
            headerRow.appendChild(cell);
        }
        header.appendChild(headerRow);

        //render table body
        var body = document.createElement('tbody');

        for(var i = 0; i < pageData.length; i++) {
            var bodyRow = document.createElement('tr');
            for(var j = 0; j < keys.length; j++) {
                var key = keys[j];
                var cell = document.createElement('td');
                if(key == 'owner_id') {
                    var att = document.createAttribute('data-tooltip');
                    att.value = pageData[i][key];
                    cell.setAttributeNode(att);
                }
                cell.innerHTML = pageData[i][key];
                bodyRow.appendChild(cell);
            }
            body.appendChild(bodyRow);
        }

        table.appendChild(header);
        table.appendChild(body);

        return table;
    }

    function renderDatagrid() {

        var rootElements = document.getElementsByClassName('supplyframe-grid');
        if(!rootElements) return;

        var rootElement = rootElements[0],
            buttons = renderChangePageButtons(),
            pageNumField = renderPageNumField();
            table = renderTable();

        //clear datagrid
        rootElement.innerHTML = '';
        // refresh datagrid
        rootElement.appendChild(buttons);
        rootElement.appendChild(pageNumField);
        rootElement.appendChild(table);
    }
}
