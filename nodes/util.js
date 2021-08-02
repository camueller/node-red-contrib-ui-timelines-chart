"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 *
 * @export
 * @class util
 * @implements {utilClass}
 */
class util {
    /**
     *Creates an instance of runner.
    * @memberof runner
    */
    constructor() {
        /* 正規表現判定用 */
        this.REG_EXPRESSTION_TO_MATCH_ONLY = {
            /* ブランク判定 */
            BLANK: /^$/,
            /* 半角数値のみ（空文字OK）*/
            HALF_NUMBER_AND_EMPTY: /^[0-9]*$/,
            /* 半角数値のみ（空文字NG）*/
            HALF_NUMBER_AND_NOT_EMPTY: /^[0-9]+$/,
            /* 半角英字のみ（空文字OK) */
            HALF_ALPHABETIC_AND_EMPTY: /^[a-zA-Z]*$/,
            /* 半角英字のみ（空文字NG) */
            HALF_ALPHABETIC_AND_NOT_EMPTY: /^[a-zA-Z]+$/,
            /* 半角英数字のみ（空文字OK) */
            HALF_ALPHANUMERIC_AND_NUMBER_AND_EMPTY: /^[0-9a-zA-Z]*$/,
            /* 半角英数字のみ（空文字NG) */
            HALF_ALPHANUMERIC_AND_NUMBER_AND_NOT_EMPTY: /^[0-9a-zA-Z]+$/,
            /* 半角英数字のみ（空文字OK) */
            HALF_ALPHANUMERIC_AND_SYMBOLS_AND_NUMBER_AND_EMPTY: /^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/,
            /* 半角英数字のみ（空文字NG) */
            HALF_ALPHANUMERIC_AND__SYMBOLS_NUMBER_AND_NOT_EMPTY: /^[a-zA-Z0-9!-/:-@¥[-`{-~]+$/,
            /* ISO8601形式（空文字NG) */
            ISO8601_AND_NOT_EMPTY: /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/,
            /* 日付のみ[YYYY/MM/DD, Y/M/D, Y-M-D]（空文字NG) */
            DATE_FORMT_YYYY_MM_DD_AND_NOT_EMPTY: /^[0-9]{1,4}[\/-]+(0[1-9]|1[0-2]|[1-9])[\/-]+(0[1-9]|[12][0-9]|3[01]|[1-9])$/,
            /* 時間のみ[hh:mm:ss, h:m]（空文字NG) */
            TIME_FORMT_HH_MM_SS_AND_HH_MM_NOT_EMPTY: /^([0-1][0-9]|[2][0-3]|[0-9]):([0-5][0-9]|[0-9])$|^([0-1][0-9]|2[0-3]|[0-9]):([0-5][0-9]|[0-9]):([0-5][0-9]|[0-9])$/,
            /* 日時フォーマット（空文字NG）※大文字と小文字判別なしの為「toLowerCase()」必須 */
            DATETIME_FORMAT_AND_NOT_EMPTY: /^(((yyyy-mm-dd|yyyy-mm|mm-dd|yyyy|mm|dd)[ t]+(hh:mm:ss|hh:mm|mm:ss|hh|mm|ss))|(yyyy-mm-dd|yyyy-mm|mm-dd|yyyy|mm|dd)|(hh:mm:ss|hh:mm|mm:ss|hh|mm|ss))$/,
        };
    }
    /**
     *
     *
     * @static
     * @returns {firebaseWrapprer}
     * @memberof firebaseWrapprer
     */
    static getInstance() {
        if (!this._instance)
            this._instance = new util();
        return this._instance;
    }
    getInstance() {
        throw new Error("Method not implemented.");
    }
    /**
     * オブジェクト空判定
     *
     * @param {*} obj
     * @returns {boolean}
     * @memberof util
     */
    isEmpty(obj) {
        return JSON.stringify(obj) === "{}";
    }
    /**
     * オブジェクト定義判定
     *
     * @param {*} obj
     * @returns {boolean}
     * @memberof util
     */
    isUndefined(obj) {
        return typeof obj === 'undefined';
    }
    /*
    [examples]
    /^([a-zA-Z0-9]{8,})$/               8文字以上の半角英数字
    /^([a-zA-Z0-9]{6,8})$/              6文字以上8文字以内の半角英数字
    /^([0-9]{0,8})$/                    8文字以下の半角数値
    /^[0-9]{8}$/                        8文字の半角数値
    /^https?:\/\/                       URL
    /^\d{3}-\d{4}$/                     郵便番号（999-9999形式）
    /^\d{1,3}(\.\d{1,3}){3}$/           IP（999.999.999.999形式）
    /^([1-9][0-9]*|0)(\.[0-9]+)?$/      正の小数
    /^-?([1-9][0-9]*|0)(\.[0-9]+)?$/    正・負の小数
    /^[ぁ-んー]*$/                      全角ひらがな（空文字OK）
    /^[ァ-ンヴー]*$/                    全角カタカナ（空文字OK）
    /^[ｧ-ﾝﾞﾟ\-]*$/                      半角カタカナ（空文字OK）
    /^[^\x20-\x7e]*$/                   全角文字のみ（空文字OK）
    */
    /**
     *
     *
     * @param {string} str
     * @param {*} defaultValue
     * @returns {*}
     * @memberof util
     */
    getSafeObject(obj, defaultValue) {
        return (this.isUndefined(obj) ? defaultValue : obj);
    }
    /**
     *
     *
     * @param {*} obj
     * @param {RegExp} reg
     * @returns {boolean}
     * @memberof util
     */
    isRegExp(obj, reg) {
        let result = false;
        if (!this.isUndefined(obj)) {
            result = reg.test(String(obj));
        }
        return result;
    }
}
exports.default = util;
//# sourceMappingURL=util.js.map