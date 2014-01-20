(function (global) {

    onload = function () {

        _checkUnsupported();

        global.spec = {};
        var spec = global.spec;

        spec.run = function run(name) {
            var script = document.createElement('script');
            spec.now = Date.now();
            script.src = '../deps/beez/vendor/require.js?v=' + spec.now;
            script.setAttribute('data-main', './require-config.js?v=' + spec.now);
            document.head.appendChild(script);
            spec.TestCaseName = name;

            var intervalId = setInterval(function () {
                if (spec.rerun) {
                    document.getElementById('mocha').innerHTML = '';
                    spec.rerun();
                    clearInterval(intervalId);
                }
            }, 100);
        };

    };


    // 非対応端末をチェック
    function _checkUnsupported() {

        var message = 'この端末は非対応です';
        var ua = navigator.userAgent;

        switch (true) {
            case (ua.indexOf('SC-02C') !== -1) :
                global.alert(message);
                throw message;
            default :
        }
    }

})(this);