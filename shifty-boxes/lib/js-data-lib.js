var DATA_MODULE = function ($self) {
    if (!$self) {
        $self = {};
    }

    $self.data_save = function (key, value) {
        // Cookie Writing
        // document.cookie='KEY=VALUE; expires=DATE; path=/'
        var expire = (new Date("2099/12/31")).toUTCString();
        document.cookie = key + '=' + value + '; expires=' + expire + '; path=/';
        //console.info( key+'='+value+'; expires='+expire+'; path=/' ); // DEBUG

        // Local storage
        try {
            localStorage.setItem(key, value);
        } catch (e) {}
    };

    // validation functions
    $self.data_any = function (value) {
        return value;
    };
    $self.data_int10 = function (value) {
        return parseInt(value, 10);
    };
    $self.data_float = function (value) {
        return parseFloat(value);
    };

    $self.data_load = function (key, valueDefault) {
        return $self.data_load_valid(key, valueDefault, $self.data_any);
    };

    $self.data_load_valid = function (key, valueDefault, validate) {
        // Cookie Reading
        // 'key1=value1; key2=value2' === document.cookie
        var allCookies = decodeURIComponent(document.cookie),
            searchKey = key + '=',
            keyIndex = allCookies.indexOf(searchKey),
            semicolonPosition = allCookies.indexOf(';', keyIndex),
            valueCookie = '',
            valueLocalStorage = '';
        if (keyIndex > -1) {
            if (semicolonPosition > 0) {
                valueCookie = allCookies.slice(keyIndex + searchKey.length, semicolonPosition);
            } else {
                valueCookie = allCookies.slice(keyIndex + searchKey.length);
            }
        }

        // Local Storage
        try {
            valueLocalStorage = localStorage.getItem(key);
        } catch (e) {}

        // Prefer local storage then cookie then default
        //console.info('Loading Key: '+ key ); // DEBUG
        if (valueLocalStorage !== null && valueLocalStorage !== '') {
            //console.info('Local Raw: '+ valueLocalStorage ); // DEBUG
            //console.info('Local Valid: '+ validate(valueLocalStorage) ); // DEBUG
            return validate(valueLocalStorage);
        }
        if (valueCookie !== '') {
            //console.info('Cookie Raw: '+ valueCookie ); // DEBUG
            //console.info('Cookie Valid: '+ validate(valueCookie) ); // DEBUG
            return validate(valueCookie);
        }
        //console.info('Default Raw: '+ validate(valueDefault) ); // DEBUG
        //console.info('Default Valid: '+ validate(valueDefault) ); // DEBUG
        return validate(valueDefault);
    };

    $self.data_clear_all = function () {
        document.cookie = "";
        try {
            localStorage.clear();
        } catch (e) {}
    };

    $self.data_dump_all = function () {
        var output = '';
        output += 'Cookie:\n';
        output += document.cookie.split('; ').join(';\n') + '\n';
        try {
            var i = localStorage.length;
            output += 'Local Storage:\n';
            while (i--) {
                output += localStorage.key(i);
                output += ':';
                output += localStorage.getItem(localStorage.key(i));
                output += ';\n';
            }
        } catch (e) {}

        return output;
    };

    $self.data_download = function () {
        var savedData = 'Saved Data\n';
        savedData += 'From: ' + window.location.href + '\n';
        savedData += 'Date: ' + (new Date()).toUTCString() + '\n';
        savedData += $self.data_dump_all();
        var uri = 'data:application/octet-stream,' + encodeURIComponent(savedData);
        //window.location.href = uri;
        window.open(uri);
    };

    return $self;
};

/*
// Testing
var x = data.data_load_valid('x',10,data.int10),
    y = data.data_load_valid('y',20,data.int10),
    z = data.data_load_valid('z',30,data.int10);
////console.info('x:'+x);
////console.info('y:'+y);
////console.info('z:'+z);
data.data_save('x',x+1);
data.data_save('y',y);
data.data_save('z',z);
//document.cookie = 'mycookie1=testcookie; expires=Mon, 17 Aug 2022 20:22:22 UTC; path=/'
////console.info( document.cookie );
//alert(data.data_dump_all());
//data.data_download();
*/