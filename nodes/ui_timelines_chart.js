"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const path_1 = __importDefault(require("path"));
const util_1 = __importDefault(require("./util"));
const define_1 = require("./define");
const nodeInit = (RED) => {
    const DEFALUT_MAKE_GRAPH_BASE = {
        result: false,
        data: [],
        configs: {
            xTickFormat: define_1.myConst.items.xTickFormat.default,
            maxLineHeight: define_1.myConst.items.maxLineHeight.default,
            topMargin: define_1.myConst.items.topMargin.default,
            startDateTime: define_1.myConst.items.startDateTime.default,
            endDateTime: define_1.myConst.items.endDateTime.default,
            zColorScale: define_1.myConst.items.zColorScale.default,
            enableAnimations: define_1.myConst.items.enableAnimations.default,
            enableDateMarker: define_1.myConst.items.enableDateMarker.default,
            xAxisLabelsFontSize: define_1.myConst.items.xAxisLabelsFontSize.default,
            xAxisLabelslColor: define_1.myConst.items.xAxisLabelslColor.default,
            yAxisLabelsFontSize: define_1.myConst.items.yAxisLabelsFontSize.default,
            yAxisLabelslColor: define_1.myConst.items.yAxisLabelslColor.default,
            resetZoomLabelFontSize: define_1.myConst.items.resetZoomLabelFontSize.default,
            resetZoomLabelColor: define_1.myConst.items.resetZoomLabelColor.default
        }
    };
    // Holds a reference to node-red-dashboard module.
    // Initialized at #1.
    let ui = undefined;
    /**
     *
     *
     * @param {Node} _node
     * @param {statusChart.nodeConf} _config
     * @returns
     */
    function checkConfig(_node, _config) {
        var _a, _b, _c, _d, _e, _f;
        const _util = util_1.default.getInstance();
        // group
        if (!_config || !_config.hasOwnProperty("group")) {
            _node.error(RED._("ui_timelines_chart.error.no-group"));
            return false;
        }
        // [xAxis]tick format, string
        {
            const _propertyName = "xTickFormat";
            if (!_config.hasOwnProperty(_propertyName) || !_util.isRegExp(_config.xTickFormat, _util.REG_EXPRESSTION_TO_MATCH_ONLY.DATETIME_FORMAT_AND_NOT_EMPTY) || (define_1.myConst.items.xTickFormat.maxLen < ((_a = _config.xTickFormat) === null || _a === void 0 ? void 0 : _a.length))) {
                _node.warn(`Incorrect ${_propertyName} value :"${_config.xTickFormat}". This ${_propertyName} was corrected with the default value: "${define_1.myConst.items.xTickFormat.default}".`);
                _config.xTickFormat = define_1.myConst.items.xTickFormat.default;
            }
        }
        // [xAxis]start date time, string
        {
            const _propertyName = "startDateTime";
            if ((!_config.hasOwnProperty(_propertyName) || !_util.isDateTime(_config.startDateTime) || (define_1.myConst.items.startDateTime.maxLen < ((_b = _config.startDateTime) === null || _b === void 0 ? void 0 : _b.length))) && ("" !== _config.startDateTime)) {
                _node.error(`Incorrect ${_propertyName} value :"${_config.startDateTime}".`);
                return false;
            }
        }
        // [xAxis]end date time, string
        {
            const _propertyName = "endDateTime";
            if ((!_config.hasOwnProperty(_propertyName) || !_util.isDateTime(_config.endDateTime) || (define_1.myConst.items.endDateTime.maxLen < ((_c = _config.endDateTime) === null || _c === void 0 ? void 0 : _c.length))) && ("" !== _config.endDateTime)) {
                _node.error(`Incorrect ${_propertyName} value :"${_config.endDateTime}".`);
                return false;
            }
        }
        // [xAxis]labels font size, number
        {
            const _propertyName = "xAxisLabelsFontSize";
            if (!_config.hasOwnProperty(_propertyName) || !_util.isRegExp(_config.xAxisLabelsFontSize, _util.REG_EXPRESSTION_TO_MATCH_ONLY.HALF_NUMBER_AND_NOT_EMPTY) || (define_1.myConst.items.xAxisLabelsFontSize.minNum > _config.xAxisLabelsFontSize || define_1.myConst.items.xAxisLabelsFontSize.maxNum < _config.xAxisLabelsFontSize)) {
                _node.warn(`Incorrect ${_propertyName} value :"${_config.xAxisLabelsFontSize}". This ${_propertyName} was corrected with the default value: "${define_1.myConst.items.xAxisLabelsFontSize.default}".`);
                _config.xAxisLabelsFontSize = define_1.myConst.items.xAxisLabelsFontSize.default;
            }
        }
        // [xAxis]labels color, string
        {
            const _propertyName = "xAxisLabelslColor";
            if (!_config.hasOwnProperty(_propertyName) || (define_1.myConst.items.xAxisLabelslColor.maxLen < ((_d = _config.xAxisLabelslColor) === null || _d === void 0 ? void 0 : _d.length)) || ("" === _config.xAxisLabelslColor) || (_config.xAxisLabelslColor == null)) {
                _node.warn(`Incorrect ${_propertyName} value :"${_config.xAxisLabelslColor}". This ${_propertyName} was corrected with the default value: "${define_1.myConst.items.xAxisLabelslColor.default}".`);
                _config.xAxisLabelslColor = define_1.myConst.items.xAxisLabelslColor.default;
            }
        }
        // [yAxis]labels font size, number
        {
            const _propertyName = "yAxisLabelsFontSize";
            if (!_config.hasOwnProperty(_propertyName) || !_util.isRegExp(_config.yAxisLabelsFontSize, _util.REG_EXPRESSTION_TO_MATCH_ONLY.HALF_NUMBER_AND_NOT_EMPTY) || (define_1.myConst.items.yAxisLabelsFontSize.minNum > _config.yAxisLabelsFontSize || define_1.myConst.items.yAxisLabelsFontSize.maxNum < _config.yAxisLabelsFontSize)) {
                _node.warn(`Incorrect ${_propertyName} value :"${_config.yAxisLabelsFontSize}". This ${_propertyName} was corrected with the default value: "${define_1.myConst.items.yAxisLabelsFontSize.default}".`);
                _config.yAxisLabelsFontSize = define_1.myConst.items.yAxisLabelsFontSize.default;
            }
        }
        // [yAxis]labels color, string
        {
            const _propertyName = "yAxisLabelslColor";
            if (!_config.hasOwnProperty(_propertyName) || (define_1.myConst.items.yAxisLabelslColor.maxLen < ((_e = _config.yAxisLabelslColor) === null || _e === void 0 ? void 0 : _e.length)) || ("" === _config.yAxisLabelslColor) || (_config.yAxisLabelslColor == null)) {
                _node.warn(`Incorrect ${_propertyName} value :"${_config.yAxisLabelslColor}". This ${_propertyName} was corrected with the default value: "${define_1.myConst.items.yAxisLabelslColor.default}".`);
                _config.yAxisLabelslColor = define_1.myConst.items.yAxisLabelslColor.default;
            }
        }
        // [reset zoom]label font size, number
        {
            const _propertyName = "resetZoomLabelFontSize";
            if (!_config.hasOwnProperty(_propertyName) || !_util.isRegExp(_config.resetZoomLabelFontSize, _util.REG_EXPRESSTION_TO_MATCH_ONLY.HALF_NUMBER_AND_NOT_EMPTY) || (define_1.myConst.items.resetZoomLabelFontSize.minNum > _config.resetZoomLabelFontSize || define_1.myConst.items.resetZoomLabelFontSize.maxNum < _config.resetZoomLabelFontSize)) {
                _node.warn(`Incorrect ${_propertyName} value :"${_config.resetZoomLabelFontSize}". This ${_propertyName} was corrected with the default value: "${define_1.myConst.items.resetZoomLabelFontSize.default}".`);
                _config.resetZoomLabelFontSize = define_1.myConst.items.resetZoomLabelFontSize.default;
            }
        }
        // [reset zoom]label color, string
        {
            const _propertyName = "resetZoomLabelColor";
            if (!_config.hasOwnProperty(_propertyName) || (define_1.myConst.items.resetZoomLabelColor.maxLen < ((_f = _config.resetZoomLabelColor) === null || _f === void 0 ? void 0 : _f.length)) || ("" === _config.resetZoomLabelColor) || (_config.resetZoomLabelColor == null)) {
                _node.warn(`Incorrect ${_propertyName} value :"${_config.resetZoomLabelColor}". This ${_propertyName} was corrected with the default value: "${define_1.myConst.items.resetZoomLabelColor.default}".`);
                _config.resetZoomLabelColor = define_1.myConst.items.resetZoomLabelColor.default;
            }
        }
        // [options]enable animations,boolean
        {
            const _propertyName = "enableAnimations";
            if (!_config.hasOwnProperty(_propertyName) || !_util.isRegExp(_config.enableAnimations, _util.REG_EXPRESSTION_TO_MATCH_ONLY.HALF_BOOLEAN_AND_NOT_EMPTY)) {
                _node.warn(`Incorrect ${_propertyName} value :"${_config.enableAnimations}". This ${_propertyName} was corrected with the default value: "${define_1.myConst.items.enableAnimations.default}".`);
                _config.enableAnimations = define_1.myConst.items.enableAnimations.default;
            }
        }
        // [options]enable date marker
        {
            const _propertyName = "enableDateMarker";
            if (!_config.hasOwnProperty(_propertyName) || !_util.isRegExp(_config.enableDateMarker, _util.REG_EXPRESSTION_TO_MATCH_ONLY.HALF_BOOLEAN_AND_NOT_EMPTY)) {
                _node.warn(`Incorrect ${_propertyName} value :"${_config.enableDateMarker}". This ${_propertyName} was corrected with the default value: "${define_1.myConst.items.enableDateMarker.default}".`);
                _config.enableDateMarker = define_1.myConst.items.enableDateMarker.default;
            }
        }
        // [options]forward input messages
        {
            const _propertyName = "forwardInputMessages";
            if (!_config.hasOwnProperty(_propertyName) || !_util.isRegExp(_config.forwardInputMessages, _util.REG_EXPRESSTION_TO_MATCH_ONLY.HALF_BOOLEAN_AND_NOT_EMPTY)) {
                _node.warn(`Incorrect ${_propertyName} value :"${_config.forwardInputMessages}". This ${_propertyName} was corrected with the default value: "${define_1.myConst.items.forwardInputMessages.default}".`);
                _config.forwardInputMessages = define_1.myConst.items.forwardInputMessages.default;
            }
        }
        // line height, number
        {
            const _propertyName = "maxLineHeight";
            if (!_config.hasOwnProperty(_propertyName) || !_util.isRegExp(_config.maxLineHeight, _util.REG_EXPRESSTION_TO_MATCH_ONLY.HALF_NUMBER_AND_NOT_EMPTY) || (define_1.myConst.items.maxLineHeight.minNum > _config.maxLineHeight || define_1.myConst.items.maxLineHeight.maxNum < _config.maxLineHeight)) {
                _node.warn(`Incorrect ${_propertyName} value :"${_config.maxLineHeight}". This ${_propertyName} was corrected with the default value: "${define_1.myConst.items.maxLineHeight.default}".`);
                _config.maxLineHeight = define_1.myConst.items.maxLineHeight.default;
            }
        }
        return true;
    }
    /**
     *
     *
     * @param {number} [digits=1000]
     * @returns {string}
     */
    function getUniqueId(digits = 1000) {
        var strong = typeof digits !== 'undefined' ? digits : 1000;
        return Date.now().toString(16) + Math.floor(strong * Math.random()).toString(16);
    }
    ;
    /**
     * make html
     *
     * @param {statusChart.nodeConf} _config
     * @returns {string}
     */
    function makeHTML(_config) {
        // debug
        // console.log(`makeHTML id:${_config.graphItems.uniqueId}`);
        // debug
        const _configAsJson = JSON.stringify(_config);
        // const _loadScripts = String.raw`
        // <script src='ui-timelines-chart/js/timelines-chart.min.js'></script>
        // <script src='ui-timelines-chart/js/moment.min.js'></script>
        // <script src='ui-timelines-chart/js/utility.js'></script>
        // `;
        const _html = String.raw `
        <div class='container-${_config.uniqueId}' align='center'>
            <!-- タイトル表示 -->
            <div class='graph-title-${_config.uniqueId}'>${_config.label}</div>
            <!-- グラフ表示 -->
            <div ng-init='init(${_configAsJson})' id='${_config.uniqueId}'></div>
        </div>
        `;
        const _css = String.raw `
        <!-- <style title="${_config.uniqueId}"> -->
        <style>
        .container-${_config.uniqueId} {
            width:100%;
            padding: 0;
            margin: 0;
            font-size: 24px;
        }
        .container-${_config.uniqueId} .graph-title-${_config.uniqueId} {
            padding: 10px 0 10px 0;
            font-size:32px;
        }
        .container-${_config.uniqueId} .timelines-chart .reset-zoom-btn {
            font-size: ${_config.resetZoomLabelFontSize}px !important;
            fill: ${_config.resetZoomLabelColor} !important;
        }
        .container-${_config.uniqueId} .timelines-chart .axises .x-axis text,
        .container-${_config.uniqueId} .brusher .tick text {
            font-size: ${_config.xAxisLabelsFontSize}px !important;
            fill: ${_config.xAxisLabelslColor} !important;
        }
        .container-${_config.uniqueId} .timelines-chart .axises .y-axis text,
        .container-${_config.uniqueId} .timelines-chart .axises .grp-axis text {
            font-size: ${_config.yAxisLabelsFontSize}px !important;
            fill: ${_config.yAxisLabelslColor} !important;
        }
        <\style>
        `;
        return String.raw `
            ${_html}
            ${_css}
        `;
    }
    /**
     * Node initialization function
     *
     * @param {Node} this
     * @param {statusChart.nodeConf} _config
     */
    function initWidget(_config) {
        var _a;
        const _node = this;
        let _done = null;
        let _graphObjects = DEFALUT_MAKE_GRAPH_BASE;
        try {
            if (ui === undefined) {
                // #1: Load node-red-dashboard module.
                // Should use RED.require API to cope with loading different
                // module.  And it should also be executed at node
                // initialization time to be loaded after initialization of
                // node-red-dashboard module.
                // 
                ui = RED.require("node-red-dashboard")(RED);
            }
            // Initialize node
            RED.nodes.createNode(this, _config);
            if (checkConfig(_node, _config)) {
                let _group = RED.nodes.getNode(_config === null || _config === void 0 ? void 0 : _config.group);
                // console.log(`config.width: ${config.width}, config.height: ${config.height}`);
                // widget width
                let _width = define_1.myConst.items.widgetWidth.default; //default
                if (0 < Number(_config === null || _config === void 0 ? void 0 : _config.width)) {
                    _width = Number(_config.width);
                }
                else if (0 < Number((_a = _group === null || _group === void 0 ? void 0 : _group.config) === null || _a === void 0 ? void 0 : _a.width)) {
                    _width = Number(_group.config.width);
                }
                // widget height
                let _height = define_1.myConst.items.widgetWidth.default; //default
                if (0 < Number(_config === null || _config === void 0 ? void 0 : _config.height)) {
                    _height = Number(_config.height);
                }
                // Generate uniqueId
                _config.uniqueId = getUniqueId();
                // Generate HTML/Angular code
                let _html = makeHTML(_config);
                //console.log("config:", _config);
                // Initialize Node-RED Dashboard widget
                // see details: https://github.com/node-red/node-red-ui-nodes/blob/master/docs/api.md
                //  #  name[*-optioal] ----------- description --------------------------------------
                //  1. node*                       制御ノード。スコープが「グローバル」の場合はオプション。
                //  2. format                      ウィジェットのHTMLコード。テンプレートダッシュボードウィジェットノードと同じHTMLを受け入れます。
                //  3. group*                      ィジェットが属するグループノードオブジェクト
                //  4. width*                      ウィジェットの幅
                //  5. height*                     ウィジェットの高さ
                //  6. templateScope               ウィジェットのスコープ（「グローバル」または「ローカル」）
                //  7. EmmitOnlyNewValues*         変更された場合はメッセージを送信する
                //  8. forwardInputMessages*       入力メッセージを出力に転送する
                //  9. storeFrontEndInputAsState*  受信したメッセージを保存する
                // 10. convert*                    値をフロントエンドに変換するためのコールバック
                // 11. beforeEmit*                 メッセージを準備するためのコールバック
                // 12. convertBack*                送信されたメッセージを変換するためのコールバック
                // 13. beforeSend*                 メッセージを準備するためのコールバック
                // 14. order                       グループで注文する
                // 15. initController*             コントローラで初期化するコールバック                
                _done = ui.addWidget({
                    node: _node,
                    format: _html,
                    group: _config.group,
                    width: _width,
                    height: _height,
                    templateScope: "local",
                    order: _config.order,
                    emitOnlyNewValues: define_1.myConst.items.emitOnlyNewValues.default,
                    forwardInputMessages: _config.forwardInputMessages,
                    storeFrontEndInputAsState: define_1.myConst.items.storeFrontEndInputAsState.default,
                    convertBack: function (_value) {
                        return _value;
                    },
                    beforeEmit: function (_msg, _value) {
                        _graphObjects = makeGraph(_node, _config, _msg);
                        return { msg: _graphObjects };
                    },
                    beforeSend: function (_msg, _original) {
                        if (_msg) {
                            _msg.payload = _graphObjects;
                            return _msg;
                        }
                        // if (_original) { return _original.msg; }
                    },
                    initController: function ($scope, events) {
                        // Remark: all client-side functions should be added here!  
                        // If added above, it will be server-side functions which are not available at the client-side ...
                        // console.log('initController');
                        const loadScripts = [
                            {
                                name: 'timelines-chart',
                                path: 'ui-timelines-chart/js/timelines-chart.min.js'
                            },
                            {
                                name: 'moment',
                                path: 'ui-timelines-chart/js/moment.min.js'
                            },
                            {
                                name: 'utility',
                                path: 'ui-timelines-chart/js/utility.js'
                            }
                        ];
                        $scope.loadedScripts = false;
                        $scope.staticScriptId = "";
                        $scope.dynamicScriptId = "";
                        $scope.elementDynamicScriptId = null;
                        $scope.elementStaticScriptId = null;
                        $scope.valueId = Date.now().toString(16) + Math.floor(1000 * Math.random()).toString(16);
                        /**
                         * update: chart
                         *
                         * @param {statusChart.makeGraphBase} msg
                         * @returns {boolean}
                         */
                        function update(msg) {
                            // console.log('update');
                            try {
                                // timelines chart: static script
                                loadStaticScript();
                                // timelines chart: dynamic script
                                loadDynamicScript(msg);
                                return true;
                            }
                            catch (error) {
                                console.log(error);
                                return false;
                            }
                        }
                        /**
                         * loadStaticScript()
                         *
                         * @returns {void}
                         */
                        function loadStaticScript() {
                            // console.log('timelines chart: static script $scope.uniqueId:' + String($scope.uniqueId));
                            const _staticScript = document.getElementById($scope.staticScriptId);
                            if (null === _staticScript) {
                                // console.log(`create static timelines-chart $scope.staticScriptId:${$scope.staticScriptId}`);
                                const _createStatcScript = document.createElement('script');
                                _createStatcScript.type = 'text/javascript';
                                _createStatcScript.id = $scope.staticScriptId;
                                _createStatcScript.innerHTML = String.raw `
                                // const styleSheet${$scope.valueId} = utility.getStyleSheet('${$scope.uniqueId}');
                                const timelinesChart${$scope.valueId} = {
                                    instance: TimelinesChart()(document.getElementById('${$scope.uniqueId}')),
                                    currentZoomX: [],
                                    currentZoomY: [],
                                    ruleStylexAxisLabels: utility.getStyleRule('.container-${$scope.uniqueId} .timelines-chart .axises .x-axis text, .container-${$scope.uniqueId} .brusher .tick text'),
                                    ruleStyleyAxisLabels: utility.getStyleRule('.container-${$scope.uniqueId} .timelines-chart .axises .y-axis text, .container-${$scope.uniqueId} .timelines-chart .axises .grp-axis text'),
                                    ruleStyleResetZoomLabel: utility.getStyleRule('.container-${$scope.uniqueId} .timelines-chart .reset-zoom-btn')
                                }
                                // console.log("styleSheet${$scope.uniqueId}:", styleSheet${$scope.uniqueId});
                                // console.log("timelinesChart${$scope.uniqueId}.ruleStylexAxisLabels :", timelinesChart${$scope.uniqueId}.ruleStylexAxisLabels);
                                // console.log("timelinesChart${$scope.uniqueId}.ruleStyleyAxisLabels :", timelinesChart${$scope.uniqueId}.ruleStyleyAxisLabels);
                                // console.log("timelinesChart${$scope.uniqueId}.ruleStyleResetZoomLabel :", timelinesChart${$scope.uniqueId}.ruleStyleResetZoomLabel);
                                `;
                                $scope.parent.appendChild(_createStatcScript);
                                $scope.elementStaticScriptId = _createStatcScript;
                            }
                        }
                        /**
                         * loadDynamicScript()
                         *
                         * @param {statusChart.makeGraphBase} msg
                         */
                        function loadDynamicScript(msg) {
                            // console.log('timelines chart: dynamic script $scope.uniqueId:' + String($scope.uniqueId));
                            const _dynamicScript = document.getElementById($scope.dynamicScriptId);
                            if (null !== _dynamicScript) {
                                // console.log(`update dynamic timelines-chart $scope.dynamicScriptId:${$scope.dynamicScriptId}`);
                                _dynamicScript.remove();
                            }
                            const _createDynamicScript = document.createElement('script');
                            _createDynamicScript.type = 'text/javascript';
                            _createDynamicScript.id = $scope.dynamicScriptId;
                            _createDynamicScript.innerHTML = String.raw `
                            {
                                const _chartobj = timelinesChart${$scope.valueId};
                                if(_chartobj){
                                    /* css */
                                    _chartobj.ruleStylexAxisLabels.style.cssText    = 'font-size: ${msg.configs.xAxisLabelsFontSize}px !important; fill: ${msg.configs.xAxisLabelslColor} !important';
                                    _chartobj.ruleStyleyAxisLabels.style.cssText    = 'font-size: ${msg.configs.yAxisLabelsFontSize}px !important; fill: ${msg.configs.yAxisLabelslColor} !important';
                                    _chartobj.ruleStyleResetZoomLabel.style.cssText = 'font-size: ${msg.configs.resetZoomLabelFontSize}px !important; fill: ${msg.configs.resetZoomLabelColor} !important';

                                    /* chart */
                                    _chartobj.instance
                                        .data(${JSON.stringify(msg.data)})
                                        .width(${$scope.parent.clientWidth})
                                        // .maxHeight(${$scope.parent.clientHeight})
                                        .maxLineHeight(${msg.configs.maxLineHeight.toString()})
                                        .topMargin(${msg.configs.topMargin.toString()})
                                        .rightMargin(90)
                                        .leftMargin(90)
                                        .bottomMargin(40)
                                        .xTickFormat(n => moment(n).format('${msg.configs.xTickFormat}'))
                                        .timeFormat('%Y-%m-%d %H:%M:%S')
                                        .zQualitative(true)
                                        .enableOverview(true)
                                        .enableAnimations(${msg.configs.enableAnimations})
                                        .dateMarker(${msg.configs.enableDateMarker ? 'new Date()' : 'null'})
                                        .zoomX((_chartobj.currentZoomX?.length) ? _chartobj.currentZoomX : [moment('${msg.configs.startDateTime}'), moment('${msg.configs.endDateTime}')])
                                        .zoomY((_chartobj.currentZoomY?.length) ? _chartobj.currentZoomY : [])
                                        .onZoom((x,y)=>{ _chartobj.currentZoomX=x; _chartobj.currentZoomY=y; })
                                        .overviewDomain([moment('${msg.configs.startDateTime}'), moment('${msg.configs.endDateTime}')])
                                        .zColorScale().range(${JSON.stringify(msg.configs.zColorScale.range)}).domain(${JSON.stringify(msg.configs.zColorScale.domain)})
                                }
                            }
                            `;
                            $scope.parent.appendChild(_createDynamicScript);
                            $scope.elementDynamicScriptId = _createDynamicScript;
                        }
                        /**
                         * loadScript
                         *
                         * @param {string} _id
                         * @param {string} _path
                         */
                        function loadScript(_id, _path) {
                            // console.log('loadscript', _path);
                            const _head = document.getElementsByTagName('head')[0];
                            const _script = document.createElement('script');
                            _script.type = 'text/javascript';
                            _script.id = _id;
                            _script.src = _path;
                            _script.async = false;
                            _head.appendChild(_script);
                            _script.onload = function () {
                                try {
                                    // console.log(`script loaded. id:${_id}`);
                                    _script.setAttribute('data-inited', "true");
                                }
                                catch (error) {
                                    console.log(error);
                                }
                            };
                        }
                        /**
                         * isLoadedScript
                         *
                         * @returns {boolean}
                         */
                        function isLoadedScript() {
                            var _a;
                            let _result = true;
                            for (let _idx = 0; _idx < loadScripts.length; _idx++) {
                                let _attribute = ((_a = document.getElementById(loadScripts[_idx].name)) === null || _a === void 0 ? void 0 : _a.getAttribute('data-inited')) || "false";
                                if ("true" !== _attribute) {
                                    // console.log(`script not loaded. name:${loadScripts[_idx].name}`);
                                    _result = false;
                                    break;
                                }
                            }
                            return _result;
                        }
                        /**
                         * $scope.init
                         *
                         * @param {statusChart.nodeConf} config
                         * @returns void
                         */
                        $scope.init = function (config) {
                            // console.log('$scope.init');
                            $scope.config = config;
                            $scope.uniqueId = config.uniqueId;
                            loadScripts.forEach(function (_elem, _index) {
                                if (!document.getElementById(_elem.name)) {
                                    // console.log(`loadScript index:${_index} name:${_elem.name} id:${$scope.uniqueId}`);
                                    loadScript(_elem.name, _elem.path);
                                }
                            });
                            $scope.parent = document.getElementById($scope.uniqueId);
                            $scope.staticScriptId = "script_static_" + $scope.uniqueId;
                            $scope.dynamicScriptId = "script_dynamic_" + $scope.uniqueId;
                            // console.log(`$scope.uniqueId: ${$scope.uniqueId}`);
                            // console.log(`$scope.parent: ${$scope.parent}`);
                            // console.log(`$scope.staticScriptId: ${$scope.staticScriptId}`);
                            // console.log(`$scope.dynamicScriptId: ${$scope.dynamicScriptId}`);
                        };
                        /**
                         * $scope.$watch
                         *
                         * @param {statusChart.makeGraphBase} msg
                         * @returns void
                         */
                        $scope.$watch('msg', function (msg) {
                            // console.log('$scope.$watch');
                            if (!msg) {
                                return;
                            }
                            if (false === $scope.loadedScripts) {
                                if (true !== isLoadedScript()) {
                                    return;
                                }
                                $scope.loadedScripts = true;
                            }
                            if (msg.result === true) {
                                setTimeout(function () { update(msg); }, 100);
                                // update(msg)
                            }
                        });
                        $scope.$on('$destroy', function () {
                            // console.log('$scope.$on $destroy');
                            if (null !== $scope.elementDynamicScriptId) {
                                // console.log(`destroy: element dynamicScript id:${$scope.uniqueId}`);
                                $scope.elementDynamicScriptId.remove();
                            }
                            if (null !== $scope.elementStaticScriptId) {
                                // console.log(`destroy: element staticScript id:${$scope.uniqueId}`);
                                $scope.elementStaticScriptId.remove();
                            }
                        });
                    }
                });
            }
            else {
                throw new Error(`The "config" is incorrect.`);
            }
        }
        catch (_error) {
            _node.status({ fill: "red", shape: "ring", text: "resources.message.error" });
            _node.error(_error);
        }
        _node.on("close", function () {
            if (_done) {
                // finalize widget on close
                _done();
            }
        });
    }
    /**
     * makeGraph
     *
     * @param {Node} _node
     * @param {statusChart.nodeConf} _config
     * @param {statusChart.inputNodeMsg} _msg
     * @returns {statusChart.makeGraphBase}
     */
    function makeGraph(_node, _config, _msg) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47;
        try {
            // 処理開始
            _node.status({ fill: "blue", shape: "dot", text: "resources.message.connect" });
            // グラフ描画用データ
            if (typeof _msg.payload.dataItems !== 'object' || 0 >= ((_b = (_a = _msg.payload) === null || _a === void 0 ? void 0 : _a.dataItems) === null || _b === void 0 ? void 0 : _b.length)) {
                throw new Error("data not found.");
            }
            const _graphData = _msg.payload.dataItems;
            // configs(priority: input > node property)
            const _createConf = {
                /*  values                  node-in: msg.payload.settings                          node-property                       default                          */
                xTickFormat: (_g = (_f = (_e = (_d = (_c = _msg.payload) === null || _c === void 0 ? void 0 : _c.settings) === null || _d === void 0 ? void 0 : _d.xAxis) === null || _e === void 0 ? void 0 : _e.xTickFormat) !== null && _f !== void 0 ? _f : _config.xTickFormat) !== null && _g !== void 0 ? _g : define_1.myConst.items.xTickFormat.default,
                xAxisLabelsFontSize: (_m = (_l = (_k = (_j = (_h = _msg.payload) === null || _h === void 0 ? void 0 : _h.settings) === null || _j === void 0 ? void 0 : _j.xAxis) === null || _k === void 0 ? void 0 : _k.labelsFontSize) !== null && _l !== void 0 ? _l : _config.xAxisLabelsFontSize) !== null && _m !== void 0 ? _m : define_1.myConst.items.xAxisLabelsFontSize.default,
                xAxisLabelslColor: (_s = (_r = (_q = (_p = (_o = _msg.payload) === null || _o === void 0 ? void 0 : _o.settings) === null || _p === void 0 ? void 0 : _p.xAxis) === null || _q === void 0 ? void 0 : _q.labelsColor) !== null && _r !== void 0 ? _r : _config.xAxisLabelslColor) !== null && _s !== void 0 ? _s : define_1.myConst.items.xAxisLabelslColor.default,
                startDateTime: (_x = (_w = (_v = (_u = (_t = _msg.payload) === null || _t === void 0 ? void 0 : _t.settings) === null || _u === void 0 ? void 0 : _u.xAxis) === null || _v === void 0 ? void 0 : _v.startDateTime) !== null && _w !== void 0 ? _w : _config.startDateTime) !== null && _x !== void 0 ? _x : define_1.myConst.items.startDateTime.default,
                endDateTime: (_2 = (_1 = (_0 = (_z = (_y = _msg.payload) === null || _y === void 0 ? void 0 : _y.settings) === null || _z === void 0 ? void 0 : _z.xAxis) === null || _0 === void 0 ? void 0 : _0.endDateTime) !== null && _1 !== void 0 ? _1 : _config.endDateTime) !== null && _2 !== void 0 ? _2 : define_1.myConst.items.endDateTime.default,
                yAxisLabelsFontSize: (_7 = (_6 = (_5 = (_4 = (_3 = _msg.payload) === null || _3 === void 0 ? void 0 : _3.settings) === null || _4 === void 0 ? void 0 : _4.yAxis) === null || _5 === void 0 ? void 0 : _5.labelsFontSize) !== null && _6 !== void 0 ? _6 : _config.yAxisLabelsFontSize) !== null && _7 !== void 0 ? _7 : define_1.myConst.items.yAxisLabelsFontSize.default,
                yAxisLabelslColor: (_12 = (_11 = (_10 = (_9 = (_8 = _msg.payload) === null || _8 === void 0 ? void 0 : _8.settings) === null || _9 === void 0 ? void 0 : _9.yAxis) === null || _10 === void 0 ? void 0 : _10.labelsColor) !== null && _11 !== void 0 ? _11 : _config.yAxisLabelslColor) !== null && _12 !== void 0 ? _12 : define_1.myConst.items.yAxisLabelslColor.default,
                resetZoomLabelFontSize: (_17 = (_16 = (_15 = (_14 = (_13 = _msg.payload) === null || _13 === void 0 ? void 0 : _13.settings) === null || _14 === void 0 ? void 0 : _14.resetZoom) === null || _15 === void 0 ? void 0 : _15.labelFontSize) !== null && _16 !== void 0 ? _16 : _config.resetZoomLabelFontSize) !== null && _17 !== void 0 ? _17 : define_1.myConst.items.resetZoomLabelFontSize.default,
                resetZoomLabelColor: (_22 = (_21 = (_20 = (_19 = (_18 = _msg.payload) === null || _18 === void 0 ? void 0 : _18.settings) === null || _19 === void 0 ? void 0 : _19.resetZoom) === null || _20 === void 0 ? void 0 : _20.labelColor) !== null && _21 !== void 0 ? _21 : _config.resetZoomLabelColor) !== null && _22 !== void 0 ? _22 : define_1.myConst.items.resetZoomLabelColor.default,
                maxLineHeight: (_27 = (_26 = (_25 = (_24 = (_23 = _msg.payload) === null || _23 === void 0 ? void 0 : _23.settings) === null || _24 === void 0 ? void 0 : _24.chart) === null || _25 === void 0 ? void 0 : _25.height) !== null && _26 !== void 0 ? _26 : _config.maxLineHeight) !== null && _27 !== void 0 ? _27 : define_1.myConst.items.maxLineHeight.default,
                topMargin: (_32 = (_31 = (_30 = (_29 = (_28 = _msg.payload) === null || _28 === void 0 ? void 0 : _28.settings) === null || _29 === void 0 ? void 0 : _29.chart) === null || _30 === void 0 ? void 0 : _30.topMargin) !== null && _31 !== void 0 ? _31 : _config.topMargin) !== null && _32 !== void 0 ? _32 : define_1.myConst.items.topMargin.default,
                lineColors: (_37 = (_36 = (_35 = (_34 = (_33 = _msg.payload) === null || _33 === void 0 ? void 0 : _33.settings) === null || _34 === void 0 ? void 0 : _34.chart) === null || _35 === void 0 ? void 0 : _35.lineColors) !== null && _36 !== void 0 ? _36 : _config.lineColors) !== null && _37 !== void 0 ? _37 : define_1.myConst.items.lineColors.default,
                enableAnimations: (_42 = (_41 = (_40 = (_39 = (_38 = _msg.payload) === null || _38 === void 0 ? void 0 : _38.settings) === null || _39 === void 0 ? void 0 : _39.options) === null || _40 === void 0 ? void 0 : _40.enableAnimations) !== null && _41 !== void 0 ? _41 : _config.enableAnimations) !== null && _42 !== void 0 ? _42 : define_1.myConst.items.enableAnimations.default,
                enableDateMarker: (_47 = (_46 = (_45 = (_44 = (_43 = _msg.payload) === null || _43 === void 0 ? void 0 : _43.settings) === null || _44 === void 0 ? void 0 : _44.options) === null || _45 === void 0 ? void 0 : _45.enableDateMarker) !== null && _46 !== void 0 ? _46 : _config.enableDateMarker) !== null && _47 !== void 0 ? _47 : define_1.myConst.items.enableDateMarker.default,
            };
            /* debug */
            // for (const [key, value] of Object.entries(_createConf)) {
            //     console.log(`[config] ${key}: ${value}`);
            // }
            /* debug */
            // 設定：開始日時(X軸)
            let _startDateTime = _createConf.startDateTime;
            if (define_1.myConst.items.startDateTime.default === _startDateTime) {
                let _min = "";
                _graphData.forEach((_ele, _idx) => {
                    _ele.data.forEach((_ele, _idx) => {
                        let _temp = _ele.data.reduce(function (a, b) { return a.timeRange[0] < b.timeRange[0] ? a : b; }).timeRange[0];
                        _min = (("" === _min || _min > _temp) ? _temp : _min);
                    });
                });
                _startDateTime = _min;
            }
            // console.log(`_startDateTime: in:${_createConf.startDateTime} out:${_startDateTime}`);
            // 設定： 終了日時(X軸)
            let _endDateTime = _createConf.endDateTime;
            if (define_1.myConst.items.endDateTime.default === _endDateTime) {
                let _max = "";
                _graphData.forEach((_ele, _idx) => {
                    _ele.data.forEach((_ele, _idx) => {
                        let _temp = _ele.data.reduce(function (a, b) { return a.timeRange[1] > b.timeRange[1] ? a : b; }).timeRange[1];
                        _max = (("" === _max || _max < _temp) ? _temp : _max);
                    });
                });
                _endDateTime = _max;
            }
            // console.log(`_endDateTime: in:${_createConf.endDateTime} out:${_endDateTime}`);
            // 設定：グラフ凡例
            let _zColorScale = { range: [], domain: [] };
            if (0 < _createConf.lineColors.length) {
                _createConf.lineColors.forEach((_ele, _idx) => {
                    _zColorScale.range.push(_ele.statusColor);
                    _zColorScale.domain.push(_ele.statusValue);
                });
            }
            // 処理完了
            _node.status({ fill: "green", shape: "dot", text: "resources.message.complete" });
            return {
                result: true,
                data: _graphData,
                configs: {
                    xTickFormat: _createConf.xTickFormat,
                    xAxisLabelsFontSize: _createConf.xAxisLabelsFontSize,
                    xAxisLabelslColor: _createConf.xAxisLabelslColor,
                    startDateTime: _startDateTime,
                    endDateTime: _endDateTime,
                    yAxisLabelsFontSize: _createConf.yAxisLabelsFontSize,
                    yAxisLabelslColor: _createConf.yAxisLabelslColor,
                    resetZoomLabelFontSize: _createConf.resetZoomLabelFontSize,
                    resetZoomLabelColor: _createConf.resetZoomLabelColor,
                    maxLineHeight: _createConf.maxLineHeight,
                    topMargin: _createConf.topMargin,
                    zColorScale: _zColorScale,
                    enableAnimations: _createConf.enableAnimations,
                    enableDateMarker: _createConf.enableDateMarker,
                }
            };
        }
        catch (_error) {
            _node.status({ fill: "red", shape: "ring", text: "resources.message.error" });
            _node.error(_error);
            return DEFALUT_MAKE_GRAPH_BASE;
        }
    }
    RED.nodes.registerType('ui_timelines_chart', initWidget);
    let _uipath = 'ui';
    if (RED.settings.ui) {
        _uipath = RED.settings.ui.path;
    }
    let _fullPath = path_1.default.join('/', _uipath, '/ui-timelines-chart/*').replace(/\\/g, '/');
    RED.httpNode.get(_fullPath, function (req, res) {
        var options = {
            root: __dirname + '/lib/',
            dotfiles: 'deny'
        };
        res.sendFile(req.params[0], options);
    });
};
module.exports = nodeInit;
//# sourceMappingURL=ui_timelines_chart.js.map