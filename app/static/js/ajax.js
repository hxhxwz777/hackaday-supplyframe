


/**
* @description
* Vanilla Javascript AJAX implementation
* 
* @class
* AJAX
*/

AJAX = function() {

    /**
    * @description
    * Use vanillar JS implemented AJAX GET method, wraps XMLHttpRequest
    * 
    * @param {url}          url for HTTP GET API
    * @param {callback}     callback handler for HTTP response processing
    */
    function get(url, callback) {
        var r = new XMLHttpRequest();
        r.responseType = 'json';
        r.open('GET', url, true);
        r.onreadystatechange = function() {
            if(r.readyState != 4 || r.status != 200) return;
            callback(r.response);
        }
        r.send();
    }
}
