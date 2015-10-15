var LABEL = "pcloud",
    DEBUG = !1,
    CDN = "//d1q46pwrruta9x.cloudfront.net",
    CDNVER = "//d1q46pwrruta9x.cloudfront.net/ZtQ";
DEBUG || (console.log = function() {});
var PAYMENT_DEBUG = !1,
    paypalHost = PAYMENT_DEBUG ? "sandbox.paypal.com" : "www.paypal.com",
    i18n = {
        config: {
            cookie_enabled: !0,
            untranslated_elmnts: {},
            send_to_translate: !1,
            current_lang: "English",
            language_codes: {
                Bulgarian: "bg",
                Turkish: "tr",
                English: "en",
                en: "English",
                Spanish: "es",
                Russian: "ru",
                Portuguese: "pt",
                French: "fr",
                Italian: "it",
                German: "de",
                "Tr. Chinese": "zh",
                Persian: "fa"
            },
            languages: [{
                val: "English",
                title: "English",
                flag: "gb"
            }, {
                val: "Bulgarian",
                title: "\u0411\u044a\u043b\u0433\u0430\u0440\u0441\u043a\u0438",
                flag: "bg"
            }, {
                val: "Spanish",
                title: "\u0415spa\u00f1ol",
                flag: "spain"
            }, {
                val: "Russian",
                title: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439",
                flag: "ru"
            }, {
                val: "Portuguese",
                title: "Portugu\u00eas",
                flag: "pt"
            }, {
                val: "French",
                title: "Fran\u00e7ais",
                flag: "fr"
            }, {
                val: "Italian",
                title: "Italiano",
                flag: "it"
            }, {
                val: "German",
                title: "Deutsch",
                flag: "de"
            }, {
                val: "Tr. Chinese",
                title: "\u6b63\u9ad4\u4e2d\u6587",
                flag: "cz"
            }, {
                val: "Turkish",
                title: "\u0422\u00fcrk\u00e7e",
                flag: "tr"
            }, {
                val: "Persian",
                title: "\u0641\u0627\u0631\u0633\u06cc",
                flag: "fa"
            }],
            inputDelayer: null
        },
        get_lang_by_value: function(a) {
            var b = null;
            this.config.languages.forEach(function(c) {
                c.val == a && (b = c)
            });
            return b
        },
        check_user_lang: function() {
            HFN.config.user.language != i18n.config.language_codes[i18n.getCookie()] && $.each(i18n.config.language_codes, function(a, b) {
                b == HFN.config.user.language && i18n.set_lang(a)
            })
        },
        set_lang: function(a) {
            "en" == a && (a = "English");
            var b = this.getCookie();
            i18n.config.current_lang = a;
            i18n.setCookie(a);
            i18n.config.inputDelayer = this.delayTimer(1500);
            void 0 != i18n.config.language_codes[a] &&
                void 0 != HFN && void 0 != HFN.config && HFN.config.auth ? (auth = HFN.config.auth, i18n.config.cookie_enabled || i18n.show_nocookie(), HFN.apiMethod("setlanguage", {
                    auth: auth,
                    language: i18n.config.language_codes[a]
                }, function(a) {
                    i18n.config.cookie_enabled && window.location.reload()
                }, {
                    forceFresh: !0
                })) : a != b && i18n.config.cookie_enabled && window.location.reload()
        },
        untranslated: function(a, b) {
            b && b != a && (i18n.config.untranslated_elmnts[a] = b || a, i18n.send_to_translate())
        },
        getCookie: function() {
            var a, b, c, d = document.cookie.split(";"),
                e;
            for (a = 0; a < d.length; a++)
                if (b = d[a].substr(0, d[a].indexOf("=")), c = d[a].substr(d[a].indexOf("=") + 1), b = b.replace(/^\s+|\s+$/g, ""), "_selected_lang" == b) {
                    e = unescape(c);
                    break
                }
            return e && this.config.language_codes[e] ? e : "English"
        },
        setCookie: function(a) {
            var b = new Date;
            b.setDate(b.getDate() + 99);
            a = escape(a) + ("; expires=" + b.toUTCString());
            document.cookie = "_selected_lang=" + a
        },
        get: function(a, b, c) {
            DEBUG && "object" == typeof b && null != b && alert("key " + a + " needs to be fixed, val: " + b);
            a = (a + "").trim();
            if (void 0 != lang && void 0 !=
                lang[i18n.config.current_lang] && void 0 != lang[i18n.config.current_lang][a]) return this._repl(lang[i18n.config.current_lang][a], c);
            this.untranslated(a, b);
            return this._repl(b || a, c)
        },
        _repl: function(a, b) {
            if (HFN && HFN.config && HFN.config.label && HFN.config.label.translationReplace)
                for (var c in HFN.config.label.translationReplace) a = a.replace(RegExp(c, "g"), HFN.config.label.translationReplace[c]);
            if (!obLength(b)) return a;
            for (var d in b) a = a.replace(RegExp("%" + d + "%", "g"), b[d]);
            return a
        },
        delayTimer: function(a) {
            var b;
            return function(c) {
                b = clearTimeout(b);
                c && (b = setTimeout(function() {
                    c()
                }, a));
                return b
            }
        },
        send_to_translate: function() {
            DEBUG ? (i18n.config.inputDelayer || (i18n.config.inputDelayer = this.delayTimer(1500)), i18n.config.inputDelayer(function() {
                var a = i18n.config.untranslated_elmnts;
                i18n.config.untranslated_elmnts = {};
                $.post("https://translate.pcloud.com/api/", {
                    user_lang: i18n.getCookie(),
                    data: JSON.stringify(a)
                }, function() {});
                console.log("Sending to translate", a)
            })) : i18n.config.untranslated_elmnts = {}
        },
        test_cookie: function() {
            rcookie("_selected_lang") ?
                i18n.config.cookie_enabled = !0 : (setcookie("testc", 1, 0), rcookie("testc") ? i18n.config.cookie_enabled = !0 : i18n.config.cookie_enabled = !1);
            return i18n.config.cookie_enabled
        },
        show_nocookie: function() {
            var a = HFN.renderTemplate(".rulesText", {
                content: "<h3>Cookie Warning</h3><p>Cookies help us deliver our service.<br/><br/>Your browser seems to have cookies disabled. Make sure cookies are enabled or try opening a new browser window.<br/><br/>Please, enable browser cookies for better experience with the service. Otherwise: </p><ul><li>Your authentcation will be lost on reload.</li><li>Features like multilanguage will not be working correctly.</li><li>Currently, the mobile version can not work without enabled cookies.</li></ul>"
            }, {
                escape: !1
            });
            a.find("p").css({
                "text-indent": "0"
            });
            a.find("ul").css({
                padding: "0"
            });
            a.find(".legaltext").css({
                width: "400px",
                "text-align": "center",
                height: "260px",
                margin: "0 auto"
            });
            a.attr("id", "cookie-warn");
            Popup.open(a, {
                title: "Cookie warning"
            })
        }
    };
i18n.test_cookie() && i18n.set_lang(i18n.getCookie());

function __(a, b, c, d) {
    return i18n.get(a, b, c, d)
}

function __e(a, b) {
    var c, d;
    if ("object" == typeof a) {
        if ("undefined" == typeof a.result) throw Error("object must have property result");
        if ("undefined" == typeof a.error) throw Error("object must have property error");
        c = a.result;
        d = a.error
    } else c = a, d = b;
    var e = i18n.get(c);
    return e != c ? e : d
}
var HFN = {
    config: {
        auth: "",
        user: {},
        defaultPage: "filemanager",
        documentCanRenderExt: ["pdf", "txt", "html", "htm"],
        excludeAudioExt: ["m3u", "pls"],
        isSite: function() {
            return "site" == this.type
        },
        isMobile: function() {
            return "mobile" == this.type
        },
        isWebview: function() {
            return "webview" == this.type
        },
        isPublinkSite: function() {
            return "publink-site" == this.type
        },
        isPublinkMobile: function() {
            return "publink-mobile" == this.type
        },
        isBusiness: function() {
            return !!this.user.account
        },
        isRtl: function() {
            return "fa" == this.user.language
        },
        hasCrypto: function() {
            return this.cryptoSettings()
        },
        cryptoCanSetup: function() {
            return !this.user.cryptosetup && new Date(this.user.cryptoexpires) > new Date
        },
        cryptoSettings: function() {
            return this.user.cryptosetup || new Date(this.user.cryptoexpires) > new Date
        },
        cryptoSubscribe: function() {
            return this.user.cryptosubscription
        },
        cryptoCanSet: function() {
            return HFN.config.user.cryptosubscription || new Date(HFN.config.user.cryptoexpires) > new Date
        },
        cryptoSubscribed: function() {
            return this.user.cryptosubscription && new Date(this.user.cryptoexpires) > new Date
        },
        languages: {
            en: "English"
        },
        label: null
    },
    data: {
        fflookup: {},
        timeOuts: {},
        itemExists: function(a) {
            return this.fflookup[a] || !1
        }
    },
    sharePermissions: {
        0: "View",
        7: "Edit",
        15: "Manage"
    },
    METHODS: {
        logout: {
            reqauth: !0,
            write: !0
        },
        listfolder: {
            reqauth: !0
        },
        createfolder: {
            reqauth: !0,
            write: !0
        },
        createfolderifnotexists: {
            reqauth: !0,
            write: !0
        },
        getthumblink: {
            reqauth: !0
        },
        getfilelink: {
            reqauth: !0
        },
        getvideolink: {
            reqauth: !0
        },
        getaudiolink: {
            reqauth: !0
        },
        deletefolder: {
            reqauth: !0,
            write: !0
        },
        deletefolderrecursive: {
            reqauth: !0,
            write: !0
        },
        deletefile: {
            reqauth: !0,
            write: !0
        },
        diff: {
            reqauth: !0,
            write: !0
        },
        subscribe: {
            reqauth: !0,
            write: !0
        },
        listnotifications: {
            reqauth: !0,
            write: !0
        },
        readnotifications: {
            reqauth: !0,
            write: !0
        },
        listshares: {
            reqauth: !0
        },
        acceptshare: {
            reqauth: !0,
            write: !0
        },
        declineshare: {
            reqauth: !0,
            write: !0
        },
        removeshare: {
            reqauth: !0,
            write: !0
        },
        cancelsharerequest: {
            reqauth: !0,
            write: !0
        },
        changeshare: {
            reqauth: !0,
            write: !0
        },
        sharefolder: {
            reqauth: !0,
            write: !0
        },
        copyfile: {
            reqauth: !0,
            write: !0
        },
        copyfolder: {
            reqauth: !0,
            write: !0
        },
        listpublinks: {
            reqauth: !0
        },
        getfilepublink: {
            reqauth: !0,
            write: !0
        },
        getfolderpublink: {
            reqauth: !0,
            write: !0
        },
        gettreepublink: {
            reqauth: !0,
            write: !0
        },
        deletepublink: {
            reqauth: !0,
            write: !0
        },
        changepublink: {
            reqauth: !0,
            write: !0
        },
        copypubfile: {
            reqauth: !0,
            write: !0
        },
        renamefile: {
            reqauth: !0,
            write: !0
        },
        renamefolder: {
            reqauth: !0,
            write: !0
        },
        showpublink: {
            reqauth: !1,
            write: !1
        },
        getzip: {
            reqauth: !0,
            write: !0
        },
        getziplink: {
            reqauth: !0,
            write: !0
        },
        createuploadlink: {
            reqauth: !0,
            write: !0
        },
        listuploadlinks: {
            reqauth: !0
        },
        deleteuploadlink: {
            reqauth: !0,
            write: !0
        },
        changeuploadlink: {
            reqauth: !0,
            write: !0
        },
        uploadlinkprogress: {
            reqauth: !0,
            write: !1
        },
        downloadfile: {
            reqauth: !0,
            write: !0
        },
        register: {
            reqauth: !1,
            write: !0
        },
        lostpassword: {
            reqauth: !1,
            write: !0
        },
        resetpassword: {
            reqauth: !1,
            write: !0
        },
        changepassword: {
            reqauth: !0,
            write: !0
        },
        verifyemail: {
            reqauth: !1,
            write: !0
        },
        sharerequestinfo: {
            reqauth: !1,
            write: !1
        },
        sendverificationemail: {
            reqauth: !0,
            write: !0
        },
        getthumbslinks: {
            reqauth: !0,
            write: !1
        },
        getthumbs: {
            reqauth: !0,
            write: !1
        },
        uploadprogress: {
            reqauth: !0,
            write: !0
        },
        invite: {
            reqauth: !0,
            write: !0
        },
        fb_assign: {
            reqauth: !0,
            write: !0
        },
        userbonuses: {
            reqauth: !0,
            write: !0
        },
        givebonus: {
            reqauth: !0,
            write: !0
        },
        userinvites: {
            reqauth: !0,
            write: !0
        },
        getvideolinks: {
            reqauth: !0,
            write: !1
        },
        backup_modify: {
            reqauth: !0,
            write: !0
        },
        backup_list: {
            reqauth: !0,
            write: !1
        },
        social_assign: {
            reqauth: !0,
            write: !0
        },
        extractarchive: {
            reqauth: !0,
            write: !0
        },
        extractarchiveprogress: {
            reqauth: !0,
            write: !0
        },
        listrevisions: {
            reqauth: !0,
            write: !1
        },
        revertrevision: {
            reqauth: !0,
            write: !0
        },
        supportedlanguages: {
            reqauth: !0,
            write: !1
        },
        newsletter_check: {
            reqauth: !0,
            write: !1
        },
        blockchain_address: {
            reqauth: !0,
            write: !1
        },
        trash_list: {
            reqauth: !0,
            write: !1
        },
        trash_clear: {
            reqauth: !0,
            write: !0
        },
        trash_restore: {
            reqauth: !0,
            write: !0
        },
        trash_getrestorepath: {
            reqauth: !0,
            write: !0
        },
        collection_list: {
            reqauth: !0,
            write: !1
        },
        collection_details: {
            reqauth: !0,
            write: !1
        },
        collection_create: {
            reqauth: !0,
            write: !0
        },
        collection_rename: {
            reqauth: !0,
            write: !0
        },
        collection_delete: {
            reqauth: !0,
            write: !0
        },
        collection_linkfiles: {
            reqauth: !0,
            write: !0
        },
        collection_unlinkfiles: {
            reqauth: !0,
            write: !0
        },
        collection_move: {
            reqauth: !0,
            write: !0
        },
        app_userlist: {
            reqauth: !0,
            write: !1
        },
        app_userdelete: {
            reqauth: !0,
            write: !0
        },
        gettextfile: {
            reqauth: !0,
            write: !0
        },
        getpubtextfile: {
            write: !0
        },
        account_teams: {
            reqauth: !0
        },
        account_teamcreate: {
            reqauth: !0
        },
        account_info: {
            reqauth: !0
        },
        account_modify: {
            reqauth: !0,
            write: !0
        },
        account_users: {
            reqauth: !0
        },
        account_invitemail: {
            reqauth: !0
        },
        account_usermodify: {
            reqauth: !0,
            write: !0
        },
        account_teammodify: {
            reqauth: !0,
            write: !0
        },
        account_teamlink: {
            reqauth: !0,
            write: !0
        },
        account_billinginfo: {
            reqauth: !0
        },
        account_invoice_modify: {
            reqauth: !0,
            write: !0
        },
        account_upload_avatar: {
            reqauth: !0,
            write: !0
        },
        account_teamunlink: {
            reqauth: !0,
            write: !0
        },
        account_teamlink_head: {
            reqauth: !0,
            write: !0
        },
        account_teamlink_accept: {
            reqauth: !0,
            write: !0
        },
        account_invitelist: {
            reqauth: !0
        },
        account_invalidate_password: {
            reqauth: !0,
            write: !0
        },
        account_invitecancel: {
            reqauth: !0,
            write: !0
        },
        commentlist: {
            reqauth: !0,
            write: !1
        },
        commentpost: {
            reqauth: !0,
            write: !0
        },
        commentdelete: {
            reqauth: !0,
            write: !0
        },
        eventsubscribe: {
            reqauth: !0,
            write: !0
        },
        account_teamshare: {
            reqauth: !0,
            write: !0
        },
        account_modifyshare: {
            reqauth: !0,
            write: !0
        },
        account_stopshare: {
            reqauth: !0,
            write: !0
        },
        account_listshares: {
            reqauth: !0,
            write: !1
        },
        account_log: {
            reqauth: !0,
            write: !1
        },
        listtokens: {
            write: !1,
            reqauth: !0
        },
        deletetoken: {
            write: !0,
            reqauth: !0
        },
        savezip: {
            write: !0,
            reqauth: !0
        },
        savezipprogress: {
            write: !0,
            reqauth: !0
        },
        contactload: {
            write: !0,
            reqauth: !0
        },
        sendpublink: {
            write: !0,
            reqauth: !0
        },
        contactlist: {
            write: !1,
            reqauth: !0
        },
        account_viewtoken: {
            write: !0,
            reqauth: !0
        },
        eventslast: {
            write: !0,
            reqauth: !0
        },
        search: {
            write: !1,
            reqauth: !0
        },
        issueproforma: {
            write: !0,
            reqauth: !0
        },
        listproforma: {
            write: !0,
            reqauth: !0
        },
        getbreadcrumb: {
            write: !1,
            reqauth: !0
        }
    },
    ERRORS: {
        LOGIN_REQUIRED: 4E3,
        LOGIN_FAILED: 2E3,
        DIRECTORY_NOT_EXIST: 2005
    },
    ERROR_MESSAGE: {
        3006: "Extracting of the archive failed. It may require a password.",
        2123: "There are active shares for this folder.",
        1064: "Enter valid e-mail address."
    },
    FILETYPE: {
        FOLDER: 1,
        FILE: 2
    },
    ICONS: {
        LIST: 1,
        GRID_SMALL: 2,
        GRID: 3,
        GRID_LARGE: 4,
        LIST_SMALL: 5,
        PUBLINK: 6,
        PUBLINK_MOB: 7,
        GRID_ALBUM: 8,
        AUDIOPLAYING: 9,
        ARTIST_ALBUM: 10,
        ALBUMGRID: 11,
        NOTIFICATIONS: 12,
        FOLDER_BROWSE: 13
    },
    ICO: {
        FOLDER: 20,
        AUDIO: 3,
        FOLDER_SHARED: 1E3,
        FOLDER_SHAREDWITHME: 1001
    },
    iconFormatPath: {
        id: "icons-id",
        string: "icons"
    },
    iconTypes: {
        1: {
            icon: {
                width: "24px",
                height: "24px",
                path: "24"
            },
            thumb: {
                width: "32px",
                height: "32px",
                size: "32x32"
            }
        },
        3: {
            icon: {
                width: "120px",
                height: "120px",
                path: "120"
            },
            thumb: {
                width: "170px",
                height: "200px",
                size: "170x200"
            }
        },
        5: {
            icon: {
                width: "24px",
                height: "24px",
                path: "24"
            },
            thumb: {
                width: "24px",
                height: "24px",
                size: "24x24"
            }
        },
        6: {
            icon: {
                width: "160px",
                height: "160px",
                path: "160"
            },
            thumb: {
                width: "160px",
                height: "160px",
                size: "160x160"
            }
        },
        7: {
            icon: {
                width: "80px",
                height: "80px",
                path: "80"
            },
            thumb: {
                width: "80px",
                height: "80px",
                size: "80x80"
            }
        },
        8: {
            icon: {
                width: "160px",
                height: "160px",
                path: "160"
            },
            thumb: {
                width: "220px",
                height: "250px",
                size: "220x250"
            }
        },
        9: {
            icon: {
                width: "100px",
                height: "100px",
                path: "100"
            },
            thumb: {
                width: "100px",
                height: "100px",
                size: "100x100"
            }
        },
        10: {
            icon: {
                width: "128px",
                height: "128px",
                path: "120"
            },
            thumb: {
                width: "128px",
                height: "128px",
                size: "128x128"
            }
        },
        11: {
            icon: {
                width: "128px",
                height: "128px",
                path: "120"
            },
            thumb: {
                width: "128px",
                height: "128px",
                size: "128x128"
            }
        },
        12: {
            icon: {
                width: "32px",
                height: "32px",
                path: "32"
            },
            thumb: {
                width: "32px",
                height: "32px",
                size: "32x32"
            }
        },
        13: {
            icon: {
                width: "20px",
                height: "20px",
                path: "20"
            },
            thumb: {
                width: "20px",
                height: "20px",
                size: "20x20"
            }
        }
    },
    ICONID_FILE: {
        0: "file",
        1: "image",
        2: "video",
        3: "audio",
        4: "document",
        5: "archive",
        6: "document",
        7: "presentation",
        8: "spreadsheet",
        9: "presentation",
        10: "document",
        11: "presentation",
        12: "spreadsheet",
        13: "document",
        14: "spreadsheet",
        15: "presentation",
        16: "executable",
        17: "presentation",
        18: "web",
        19: "file"
    },
    thumbManager: {
        percall: 40,
        wait: null,
        queue: [],
        running: 0,
        _clear: function() {
            this.wait && (clearTimeout(this.wait),
                this.wait = null);
            return this
        },
        _wait: function() {
            this.queue.length && (this.wait = setTimeout(this._go.bind(this), 60));
            return this
        },
        _reset: function() {
            this._clear();
            this.queue.length >= this.percall ? this._go() : this._wait();
            return this
        },
        flush: function() {
            console.log("flushed!");
            this.running || this._clear()._go()
        },
        _finished: function() {
            this.running--;
            this.running || this._reset()
        },
        _go: function() {
            for (var a = this.queue.splice(0, this.percall), b = {}, c = 0; c < a.length; ++c) {
                var d = a[c].ext + "-" + a[c].th.size + "-" + a[c].publicCode;
                d in b || (b[d] = {
                    code: a[c].publicCode,
                    ext: a[c].ext,
                    size: a[c].th.size,
                    thumbs: []
                });
                b[d].thumbs.push(a[c])
            }
            console.log("types", b);
            for (c in b) this._requestThumbs(b[c])
        },
        _requestThumbs: function(a) {
            console.log("running", a);
            this.running++;
            var b = "getthumbs",
                c = {
                    size: a.size,
                    crop: 1,
                    type: a.ext
                };
            a.code && (b = "getpubthumbs", c.code = a.code);
            for (var d = [], e = [], f = 0; f < a.thumbs.length; ++f) d.push(a.thumbs[f].data.fileid), e[a.thumbs[f].data.fileid] = a.thumbs[f];
            c.fileids = d.join(",");
            var g = 0,
                k, l = [],
                m = this;
            HFN.apiMethod(b, c, function(a) {
                for (;;) {
                    k =
                        a.indexOf("\n", g + 1);
                    if (-1 == k) break;
                    f = l.push(a.substr(g, k - g)) - 1;
                    g = k;
                    var b = l[f].split("|"),
                        c = parseInt(b[0]);
                    6001 == b[1] && (b[3] = l[b[2]].split("|")[3], b[1] = 0);
                    if (0 == b[1] || 6001 == b[1]) m.setThumbSrc(e[c], 6001 == b[1] ? l[b[2]].split("|")[3] : b[3]), m.finished()
                }
            }, {
                forceFresh: !0,
                cacheTime: 0,
                dataType: "text",
                type: "post",
                onProgress: function(a, b) {
                    for (;;) {
                        k = a.indexOf("\n", g + 1);
                        if (-1 == k) break;
                        f = l.push(a.substr(g, k - g)) - 1;
                        g = k;
                        var c = l[f].split("|"),
                            d = parseInt(c[0]);
                        6001 == c[1] && (c[3] = l[c[2]].split("|")[3], c[1] = 0);
                        0 != c[1] &&
                            6001 != c[1] || m.setThumbSrc(e[d], 6001 == c[1] ? l[c[2]].split("|")[3] : c[3])
                    }
                }
            })
        },
        setupThumb: function(a, b, c, d, e) {
            b.thumb && (c = HFN.iconTypes[c].thumb, e = HFN.cache.cacheid("thumb", c.size, b.hash, b.revisionid || 0), HFN.cache.has(e) ? a.prop("src", HFN.cache.get(e)).css({
                width: c.width,
                height: c.height
            }) : (this.queue.push({
                icon: a,
                data: b,
                cacheid: e,
                th: c,
                publicCode: d || "",
                ext: "auto"
            }), this._reset()))
        },
        setThumbSrc: function(a, b) {
            HFN.cache.set(HFN.cache.cacheid("thumb", a.th.size, a.data.hash, a.data.revisionid || 0), b);
            a.icon.attr("src",
                b).on("load", function(b) {
                $(this).css({
                    width: a.th.width,
                    height: a.th.height
                }).parent().parent().addClass("thumbready")
            })
        }
    },
    removeAuthTokenFromUrl: function() {
        $.bbq.getState("authtoken") && (rcookie("pcauth") == $.bbq.getState("authtoken") || $.bbq.getState("viewas") || setcookie("pcauth", $.bbq.getState("authtoken"), 0), HFN.removeUrlParam("authtoken"))
    },
    removeUrlParam: function(a) {
        window.location.replace(window.location.href.replace(RegExp(a + "=" + $.bbq.getState(a) + "&?"), "").replace(/&$/, ""))
    },
    init: function(a) {
        a =
            a || {};
        console.log(a);
        console.log({
            type: $.browser.mobile && !$.bbq.getState("nomob") ? "webview" : "site"
        });
        $.bbq.getState("forceview") ? a.type = $.bbq.getState("forceview") : a.type || (a.type = $.browser.mobile ? "mobile" : "site");
        a = $.extend({}, {}, a);
        this.config.type = a.type;
        2 != window.devicePixelRatio && "mobile" != $.bbq.getState("forceview") || $("html").addClass("retina");
        this.initLabels();
        if (HFN.config.isSite()) {
            $(".cnt-mn").removeClass("wv");
            $(".content").removeClass("wv");
            $(".topContain").empty().append(HFN.renderTemplate(".desktopHeader"));
            $(".midContain").empty().append(HFN.renderTemplate(".desktopContent", {
                siteName: HFN.config.label.siteName,
                siteLink: HFN.config.label.siteLink
            }));
            var b = $('<div class="select_lang">'),
                c = function(a) {
                    a.preventDefault();
                    i18n.set_lang(this.val)
                };
            i18n.config.languages.slice().reverse().forEach(function(a) {
                a = $('<a href="#">' + a.title + "</a>").on("click", c.bind(a)).append('<img src="//d1q46pwrruta9x.cloudfront.net/img/flags/' + a.flag + '.png" alt="' + a.title + '">');
                b.append(a)
            });
            $(".select_lang").replaceWith(b);
            var d =
                void 0 == i18n.getCookie() || i18n.getCookie();
            "en" == d && (d = "English");
            var e = i18n.config.languages.filter(function(a) {
                return a.val == d
            })[0];
            $(".change_lang span").first().html(e.title + ' <img src="//d1q46pwrruta9x.cloudfront.net/img/flags/' + e.flag + '.png" alt="' + e.title + '" />');
            $.browser.mobile && $("meta[name=viewport]").attr("content", "width=1000, initial-scale=1.0, maximum-scale=1.0, user-scalable=1");
            var f = [
                    [__("All Files"), "", !1, "/img/search-all-files-drop.png", {
                        filter: "all"
                    }],
                    [__("Images"), "", !1, "/img/search-images-drop.png", {
                        filter: HFN.CATEGORY.IMAGE
                    }],
                    [__("Audio"), "", !1, "/img/search-music-drop.png", {
                        filter: HFN.CATEGORY.AUDIO
                    }],
                    [__("Video"), "", !1, "/img/search-video-drop.png", {
                        filter: HFN.CATEGORY.VIDEO
                    }],
                    [__("Documents"), "", !1, "/img/search-documents-drop.png", {
                        filter: HFN.CATEGORY.DOCUMENT
                    }],
                    [__("Archives"), "", !1, "/img/search-arch-drop.png", {
                        filter: HFN.CATEGORY.ARCHIVE
                    }]
                ],
                g = function(a) {
                    $(".search-filter").empty().append('<img class="icon" src="' + a[3] + '" width="15" height="15">').append(a[0]).append('<img class="drop" src="/img/share-opt-black.png" width="7" height="4">').data("filter",
                        a[4].filter).css("margin-left", "").css("margin-left", "").css("margin-right", "");
                    $(".search-filter").css(HFN.config.isRtl() ? "margin-right" : "margin-left", -1 * ($(".search-button").outerWidth() + $(".search-filter").outerWidth()))
                };
            "pcloud" != LABEL && f.splice(1, 3);
            var k = 0;
            if ($.bbq.getState("filter"))
                for (e = 0; e < f.length; ++e)
                    if (f[e][4].filter == $.bbq.getState("filter")) {
                        k = e;
                        break
                    }
            HFN.config.isMobile() || g(f[k]);
            dropDown.bindList(f, $(".search-filter"), {
                direction: dropDown.DIR_RIGHT,
                eventTrigger: "click",
                eventClose: "click",
                holderClass: "fileopts",
                position: "fixed",
                showTip: !1,
                buildCell: function(a, b) {
                    var c = $("<a>").attr("href", "javascript:void(0);").append($("<li>").append('<img src="//d1q46pwrruta9x.cloudfront.net' + a[3] + '" width="15" height="15">').append(a[dropDown.N_TEXT] + "")).on("click", function(b) {
                        b.preventDefault();
                        b.stopPropagation();
                        g(a);
                        dropDown.resetTo(0)
                    }).appendTo(b);
                    $(".search-filter").data("filter") == a[4].filter && c.addClass("active");
                    return c
                },
                buildHolder: function(a) {
                    a.addClass("mn-filters").css("min-width",
                        $(".search-filter").outerWidth() - 1).css("z-index", 101)
                }
            })
        } else HFN.config.isMobile() ? ($(".cnt-mn").addClass("wv"), $(".content").addClass("wv"), $("html").addClass("mob"), HFN.config.isMobile() && ($(".topContain").empty().append(HFN.renderTemplate(".mobileHeader")), $("link.files").after('<link rel="stylesheet" href="//d1q46pwrruta9x.cloudfront.net/ZtQ/css/files_mob.css" class="files_mob">'), HFN.panel.init()), a = HFN.config.label, $(".midContain").empty().append(HFN.renderTemplate(".mobileContent", {
            siteName: a.siteName,
            siteLink: a.siteLink
        })), "pcloud" == LABEL ? ($.browser.iphone ? $(".mobbeforefooter").empty().addClass("mobhas").append(e = HFN.renderTemplate("#iOSAd", {
                audio: retinaSrc("//d1q46pwrruta9x.cloudfront.net/img/ios-music.png"),
                video: retinaSrc("//d1q46pwrruta9x.cloudfront.net/img/ios-video.png")
            })) : $.browser.android && $(".mobbeforefooter").empty().addClass("mobhas").append(e = HFN.renderTemplate("#androidAd", {
                audio: retinaSrc("//d1q46pwrruta9x.cloudfront.net/img/android-music.png"),
                video: retinaSrc("//d1q46pwrruta9x.cloudfront.net/img/android-video.png")
            })),
            e && (e.find("img").hide(), 5 < 10 * Math.random() ? e.find(".aud").show() : e.find(".vid").show())) : $("#footer-pp, #footer-ipp").remove(), $(".main").addClass("noleft"), $(".footer").hide()) : HFN.config.isWebview() && ($("html").addClass("mob"), $(".midContain").empty().append(HFN.renderTemplate("#webviewContent")), $(".cnt-mn").addClass("wv"), $(".content").addClass("wv"));
        parseInt($.bbq.getState("ont")) && (HFN.api.apiDefaults.apiServer = "api" + parseInt($.bbq.getState("ont")) + ".pcloud.com");
        $.bbq.getState("followprot") &&
            (HFN.api.apiDefaults.apiScheme = location.protocol.substring(0, location.protocol.length - 1));
        this.initUser($.bbq.getState("authtoken") || rcookie("pcauth") || !1, function() {
            HFN.initDirection();
            HFN.psettings.init();
            HFN.pages.init();
            HFN.spaceinfo.init();
            if (HFN.config.auth) {
                if (!$.bbq.getState("nodiff"))
                    if ("complete" == document.readyState) HFN.diff.init(), HFN.events.init();
                    else $(window).on("load", function() {
                        HFN.diff.init();
                        HFN.events.init()
                    });
                HFN.uploadControl.init(!0)
            }
            HFN.config.isMobile() || g(f[k]);
            $.bbq.getState("viewas") &&
                HFN.initViewAs()
        });
        rcookie("go_to") || setcookie("go_to", 1)
    },
    initLabels: function() {
        LABEL in labels || (LABEL = "pcloud");
        $.bbq.getState("label") && $.bbq.getState("label") in labels && (LABEL = $.bbq.getState("label"));
        this.config.label = labels[LABEL];
        $("html").addClass("label-" + LABEL);
        "pcloud" != LABEL && ($("head").append('<link rel="stylesheet" type="text/css" href="//d1q46pwrruta9x.cloudfront.net/ZtQ/css/' + LABEL + '.css">'), $("head").find('[rel="shortcut icon"]').attr("href", "/fav-coversafe.ico"))
    },
    initDirection: function() {
        if ("fa" ==
            HFN.config.user.language || "Persian" == i18n.getCookie()) $("html").addClass("fa"), $("head, body").attr("dir", "rtl"), dropDown.defaultOpts.reverseDirections = !0, $("head").append('<link rel="stylesheet" type="text/css" href="//d1q46pwrruta9x.cloudfront.net/ZtQ/css/farsi.css">')
    },
    initViewAs: function() {
        HFN.viewas = !0;
        this.renderTemplate("#viewasbar", {
            message: __("You are currently viewing the business account as %name% with read-only permissions.", !1, {
                name: "<b>" + PCB.buildUserinfo(HFN.config.user.account) + "</b>"
            })
        }, {
            escape: !1
        }).appendTo(".header");
        $("html").addClass("viewas");
        HFN.removeUrlParam("viewas")
    },
    initMobPSettings: function() {
        if ("complete" == document.readyState) HFN.notify.init();
        else $(window).on("load", HFN.notify.init.bind(HFN.notify))
    },
    initUser: function(a, b) {
        a ? HFN.apiMethod("userinfo", {
            auth: a
        }, function(c) {
            HFN.config.user = $.extend({}, c);
            HFN.config.auth = a;
            HFN.initGoogleAnalytics();
            c = [];
            HFN.config.user.account && c.push(HFN.initBusiness());
            HFN.config.cryptoSettings() && c.push(HFN.initCrypto());
            $.when(c).then(b)
        }, {
            errorCallback: function(a) {
                HFN.config.user = {};
                HFN.config.auth = !1;
                b()
            }
        }) : b()
    },
    initBusiness: function(a) {
        var b = $.Deferred();
        a = a || function() {};
        0 === $(".ctn-btpl.loaded").length ? ($("html").addClass("business-account"), $.when($.getScript("/js/business.js"), function(a, b, e) {
            return $.ajax({
                url: "/templates/business-tpl.html",
                cache: !0,
                dataType: "html"
            }).done(function(a) {
                $(".ctn-btpl").append(a).addClass("loaded")
            })
        }()).then(function() {
            a();
            b.resolve()
        }, function() {
            console.log("error loading business stuff");
            a();
            b.resolve()
        })) : (a(), b.resolve());
        return b
    },
    initCrypto: function(a) {
        var b = $.Deferred();
        a = a || function() {};
        if ($(".ctn-crypto-tpl.loaded").length) a(), b.resolve();
        else {
            var c = [];
            $("html").addClass("crypto-account");
            c.push($.ajax({
                url: "/templates/crypto-tpl.html",
                cache: !0,
                dataType: "html"
            }).done(function(a) {
                $(".ctn-crypto-tpl").append(a).addClass("loaded")
            }));
            $.when.apply($, c).then(function() {
                a();
                b.resolve()
            })
        }
        return b
    },
    initGoogleAnalytics: function() {
        console.log("init analytics", HFN.config.user.cryptosetup);
        HFN.config.user.cryptosetup ? ($("script.ga-script").remove(), ga = void 0) : $("script.ga-script").length || (function(a, b, c, d, e, f, g) {
            a.GoogleAnalyticsObject = e;
            a[e] = a[e] || function() {
                (a[e].q = a[e].q || []).push(arguments)
            };
            a[e].l = 1 * new Date;
            f = b.createElement(c);
            g = b.getElementsByTagName(c)[0];
            f.async = 1;
            f.className = "ga-script";
            f.src = d;
            g.parentNode.insertBefore(f, g)
        }(window, document, "script", "//www.google-analytics.com/analytics.js", "ga"), ga("create", "UA-44134956-2", "pcloud.com"), ga("create", "UA-44134956-4", "pcloud.com", {
            name: "combined"
        }), ga("combined.require", "displayfeatures"))
    },
    logout: function() {
        HFN.apiMethod("logout", {}, function() {});
        HFN.config.hasCrypto() && pCloudCrypto.lock();
        this.config.auth = "";
        this.config.user = {};
        this.cache.cleanAll();
        this.data.fflookup = {};
        setcookie("pcauth", "", -1);
        setcookie("tuts", "", -1);
        this.diff.logout();
        HFN.subscriptions.stop();
        this.psettings.init();
        this.spaceinfo.init();
        this.uploadControl.destroy();
        this.audioPlayer.destroy();
        this.initGoogleAnalytics()
    },
    checkNewShares: function() {
        if (HFN.config.auth) {
            var a =
                [
                    ["incoming", "li.shares"]
                ];
            HFN.apiMethod("listshares", {
                iconformat: "id"
            }, function(b) {
                for (var c = 0, d; c < a.length; ++c) d = $(a[c][1]), d.find(".badge").remove(), b.requests[a[c][0]].length && d.append($('<span class="badge" title="' + __("Pending Invitations") + '">+' + b.requests[a[c][0]].length + "</span>"))
            });
            "shares" == HFN.pages.current && (console.log("checking this"), HFN.listIncomingShares(function(a) {
                $(".requests-tab-ctrl").find("b").remove();
                fs.filter(a, {
                    type: "request"
                }).length && $(".requests-tab-ctrl").append("<b>+" +
                    fs.filter(a, {
                        type: "request"
                    }).length + "</b>")
            }, {
                forceFresh: !0
            }))
        }
    },
    player: {
        loaded: !1,
        vidplayer: null,
        load: function(a) {
            console.log("INCOMING opts", a);
            a = $.extend({}, {
                media: [],
                selector: "",
                type: "video",
                sources: [],
                autoPlay: !1,
                poster: "/img/icons/160/video.png",
                tech: "flash",
                techOrder: ["flash", "html5"],
                width: 640,
                height: 360,
                subUrl: !1
            }, a);
            "html5" == a.tech && (a.techOrder = ["html5", "flash"]);
            console.log("player opts", a);
            a.selector.empty().append('<div id="videlement">Loading video player...</div>');
            var b = {
                file: a.sources[0].url,
                image: a.poster,
                width: a.width,
                height: a.height,
                startparam: "start",
                primary: "flash",
                autostart: a.autoPlay,
                flashplayer: "//d1q46pwrruta9x.cloudfront.net/ZtQ/js/jwplayer/jwplayer.flash.swf",
                html5player: "//d1q46pwrruta9x.cloudfront.net/ZtQ/js/jwplayer/jwplayer.html5.min.js"
            };
            if (1 < a.sources.length) {
                delete b.file;
                b.sources = [];
                for (var c = 0; c < a.sources.length; ++c) b.sources.push({
                    "default": 0 == c ? !0 : !1,
                    file: a.sources[c].url,
                    label: a.sources[c].quality,
                    type: "video/mp4"
                })
            }
            a.subUrl && (b.tracks = [{
                file: a.subUrl,
                label: "Subtitles",
                kind: "captions"
            }]);
            "audio" == a.type && (delete b.image, delete b.startparam, b.height = 30);
            console.log("final opts", b);
            jwplayer("videlement").setup(b);
            jwplayer().onReady(function(b) {
                a.callback && a.callback()
            })
        },
        loadAudio: function(a) {
            console.log("INCOMING opts", a);
            a = $.extend({}, {
                selector: "",
                type: "auio",
                autoPlay: !0,
                tech: "flash",
                width: 640,
                height: 30
            }, a);
            "html5" == a.tech && (a.techOrder = ["html5", "flash"]);
            a.selector.empty().append('<div id="videlement">Loading player...</div>');
            var b = {
                file: a.url,
                width: a.width,
                height: a.height,
                primary: "flash",
                autostart: a.autoPlay,
                flashplayer: "/jwplayer/jwplayer.flash.swf",
                html5player: "/jwplayer/jwplayer.html5.js"
            };
            console.log("final opts", b);
            jwplayer("videlement").setup(b);
            jwplayer().onReady(function(b) {
                a.callback && a.callback()
            })
        }
    },
    psettings: {
        useAfterLogin: !0,
        init: function(a) {
            a = $.extend({
                usernamePosition: "outside"
            }, a);
            if (HFN.config.isMobile()) HFN.initMobPSettings();
            else if (HFN.config.isSite() || HFN.config.isPublinkSite()) {
                if ("complete" == document.readyState) HFN.notify.init();
                else $(window).on("load",
                    HFN.notify.init.bind(HFN.notify));
                var b = i18n.config.languages.map(function(a) {
                        return ['<img src="//d1q46pwrruta9x.cloudfront.net/img/flags/' + a.flag + '.png"> ' + a.title, "javascript:i18n.set_lang('" + a.val + "');"]
                    }),
                    b = [
                        [i18n.get("Login"), "#page=login"],
                        [i18n.get("Help"), "#page=faq"],
                        [__("footer_contact", "Contact Us"), "#page=contact"],
                        [__("Language") + ' <img src="//d1q46pwrruta9x.cloudfront.net/img/flags/' + i18n.get_lang_by_value(i18n.config.current_lang).flag + '.png" class="hckflag">', "javascript:;", b]
                    ],
                    c =
                    0;
                "pcloud" != LABEL && (b.splice(1, 1), b.splice(2, 1));
                if (HFN.config.auth) {
                    if (b.splice(1, 0, [i18n.get("Settings"), "#page=settings", []]), b[1][2].push([__("Account"), "#page=settings&settings=tab-account"]), HFN.config.label.hasLinkedAccounts && b[1][2].push([__("Linked Accounts"), "#page=settings&settings=tab-apps"]), HFN.config.user.cryptosetup && b[1][2].push([__("Crypto"), "#page=settings&settings=tab-crypto"]), b.splice(0, 1), "pcloud" == LABEL && b.push([i18n.get("Newsletter"), "javascript:(function(){ HFN.newsletter.show();})()"]),
                        b.push([i18n.get("Logout"), "#page=login"]), HFN.config.user.account) {
                        var d = HFN.config.user.account,
                            e = [__("Business"), "#page=b_account", [
                                [__("Account"), "#page=b_account"],
                                [__("Users"), "#page=b_users"],
                                [__("Teams"), "#page=b_teams", []]
                            ]];
                        if (d.teams.length)
                            for (e[2].push([__("My Teams"), "#page=b_user&id=" + HFN.config.user.userid, []]), c = 0; c < d.teams.length; ++c) e[2][3][2].push([d.teams[c].team.name, "#page=b_team&id=" + d.teams[c].team.id]);
                        HFN.config.user.account.permissions.log_view && e[2].push([__("Logs"), "#page=b_logs", []]);
                        b.splice(0, 0, e)
                    }
                } else 1 === $(".ctn-btpl.loaded").length && $(".ctn-btpl").empty().removeClass("loaded"), $(".profile .username").off("click.buser"), $("html").removeClass("business-account business");
                c = $("<span>", {
                    "class": "settings"
                });
                $(".centr>input").hide();
                $(".centr>.search-filter").hide();
                $(".centr>.gfrespace").hide();
                $(".centr>a.upgrade").hide();
                $(".profile").empty();
                if (HFN.config.user.email) {
                    if ("outside" == a.usernamePosition) {
                        if ($(".profile").append('<span class="username" title="' + HFN.config.user.email +
                            '">' + HFN.strFitMail(HFN.config.user.email, 40) + "</span>"), HFN.config.user.emailverified || ($(".profile .username").after('( <span class="emailstatus"></span> ) '), $(".profile .emailstatus").append($('<span class="notverified">' + i18n.get("Verify Now") + "</a>").on("click", function(a) {
                            HFN.showVerifyMail()
                        }))), HFN.config.user.account) $(".profile .username").on("click.buser", function() {
                            $.bbq.pushState({
                                page: "b_user",
                                id: HFN.config.user.userid
                            }, 2)
                        })
                    } else b.unshift([HFN.strFitMail(HFN.config.user.email, 35),
                        "javscript:return false", null, {
                            a: {
                                "class": "inner-username"
                            }
                        }
                    ]);
                    $(".centr>input").show();
                    $(".centr>.search-filter").css("display", "inline-block");
                    $(".centr>.gfrespace").hide();
                    $(".centr>a.upgrade").show()
                }
                HFN.config.user && (HFN.config.user.premium || HFN.config.isBusiness() || !HFN.config.label.hasUpgradeInHeader) && $("a.upgrade").hide();
                $(".profile .settings").remove();
                $(".profile").append(c);
                console.log("the list: ", b);
                dropDown.bindList(b, $("span.settings"), {
                    direction: dropDown.DIR_LEFT,
                    childDirection: dropDown.DIR_LEFT,
                    position: "fixed",
                    holderClass: "mnnew",
                    buildCell: function(a, b) {
                        return $("<a>", a[3] && a[3].a ? a[3].a : null).attr("href", a[dropDown.N_HREF]).append($("<li>").html(a[dropDown.N_TEXT] + "")).on("click", function(a) {
                            dropDown.resetTo(0)
                        }).appendTo(b)
                    },
                    buildHolder: function(a) {
                        console.log("!! got obj", a, a.hasClass("sub"));
                        a.hasClass("sub");
                        a.addClass("mn-blue").css("z-index", 101);
                        a.css("z-index", 102)
                    }
                });
                this.useAfterLogin = !0;
                HFN.config.isSite() && (a = Math.min(600, $(window).width() - $(".profile").outerWidth() - $(".notify-icon").outerWidth() -
                    30 - $("a.upgrade").outerWidth() - 50 - 230 - 58 - 30), 80 < a && $("input#q").css("width", a + "px"));
                HFN.checkNewShares()
            }
        }
    },
    spaceinfo: {
        init: function() {
            if (HFN.config.isMobile()) {
                if (HFN.panel.init(), HFN.config.auth) {
                    var a = HFN.config.user,
                        b = Math.min(100, Math.round(100 * (a.usedquota / a.quota))),
                        c = $("._mobile_space");
                    c.find("._perc").text(b + "%");
                    c.find("._fil").css("width", b + "%");
                    c.find("._freespace").text(HFN.formatSize(Math.max(0, a.quota - a.usedquota)))
                }
            } else $(".space, .spacen").remove(), HFN.config.auth && HFN.config.isSite() ?
                (a = HFN.config.user, b = Math.min(100, Math.round(100 * (a.usedquota / a.quota))), c = HFN.renderTemplate("#spaceinfonew", {
                    spaceinfo: HFN.renderTemplate("#spaceinfoinfo", {
                        used: HFN.formatSize(a.usedquota),
                        usedperc: b,
                        total: HFN.formatSize(a.quota)
                    }).outerHTML()
                }, {
                    escape: !1
                }), c.find(".spacetxt").data({
                    usedquota: a.quota,
                    quota: a.quota
                }), console.log(c), c.find(".usedbarfill").css("width", b + "%"), c.appendTo(document.body), HFN.apiMethod("listtokens", {}, function(a) {
                    var b = HFN.hasPhoneToken(a.tokens);
                    a = HFN.hasDesktopToken(a.tokens);
                    if (!(b && a && HFN.config.isBusiness()) && HFN.left.menu && "pcloud" == LABEL) {
                        var c = HFN.renderTemplate("#download-clients");
                        b && c.find(".mobile").remove();
                        a && c.find(".desktop").remove();
                        b && a && c.find(".also").remove();
                        (HFN.config.isBusiness() || HFN.config.user.premium || rcookie("promo")) && c.find(".survey-div").remove();
                        $(".download-clients").remove();
                        c.appendTo(document.body)
                    }
                }, {
                    forceFresh: !0
                })) : $(".download-clients").remove()
        },
        updateto: null,
        updateQuota: function() {
            this.updateto && (clearTimeout(this.updateto), this.updateto =
                null);
            this.updateto = setTimeout(this._update.bind(this), 500)
        },
        _update: function() {
            var a = HFN.config.user,
                b = Math.min(100, Math.round(100 * (a.usedquota / a.quota)));
            $(".spacen .spacetxt").empty().append(HFN.renderTemplate("#spaceinfoinfo", {
                used: HFN.formatSize(a.usedquota),
                usedperc: b,
                total: HFN.formatSize(a.quota)
            }));
            $(".spacen .usedbarfill").css("width", b + "%")
        },
        destroy: function() {
            $("body .space, body .spacen").remove()
        }
    },
    getIconSize: function(a) {
        if (this.ICONS[a] && this.iconTypes[this.ICONS[a]]) return this.iconTypes[this.ICONS[a]];
        console.log("could not find proper icon for type: " + a)
    },
    getIconSizeString: function(a) {
        a = this.getIconSize(a);
        return a.width.replace("px", "") + "x" + a.height.replace("px", "")
    },
    login: function(a, b, c, d, e) {
        if (a && b) {
            var f = {
                forceFresh: !0,
                cacheTime: !1,
                type: "post"
            };
            e && (f.errorCallback = e);
            a = {
                username: a,
                password: b,
                getauth: 1,
                _t: $.now,
                logout: 1
            };
            c || (a.authexpire = "86400", a.authinactiveexpire = "7200");
            HFN.apiMethod("userinfo", a, function(a) {
                if (a.auth) {
                    HFN.config.auth = a.auth;
                    HFN.cache.cleanAll();
                    HFN.config.user = $.extend({},
                        HFN.config.user, a);
                    var b = [];
                    a.account && b.push(HFN.initBusiness());
                    a.cryptosetup && b.push(HFN.initCrypto());
                    $.when(b).then(function() {
                        HFN.psettings.init();
                        HFN.diff.init();
                        HFN.events.init();
                        HFN.spaceinfo.init();
                        HFN.initGoogleAnalytics();
                        HFN.uploadControl.init(!0);
                        setcookie("pcauth", HFN.config.auth, c ? 365 : 0);
                        i18n.check_user_lang();
                        if (d) d();
                        else if (HFN.data.afterLogin) $.bbq.pushState(HFN.data.afterLogin, 2), delete HFN.data.afterLogin;
                        else if (HFN.data.afterLoginUrl) {
                            var a = HFN.data.afterLoginUrl;
                            delete HFN.data.afterLoginUrl;
                            location.href = a
                        } else $.bbq.getState("page"), $.bbq.pushState({
                            page: "filemanager"
                        }, 2)
                    })
                }
            }, f)
        } else HFN.message("Username and a Password are required.", "error")
    },
    subscriptions: {
        xhr: null,
        chkint: null,
        resetTo: null,
        resetTimeoutMilisec: 1E4,
        subscribers: [],
        add: function(a, b) {
            console.log("Adding new subscriber: ", a, b);
            this.remove(a);
            this.checkInstanceInterface(b);
            this.subscribers.push({
                name: a,
                state: "preparing",
                instance: b
            });
            return this
        },
        checkInstanceInterface: function(a) {
            ["getParams", "handleEvents"].forEach(function(b) {
                if ("function" !=
                    typeof a[b]) throw Error("Instance must provide method: ", b);
            })
        },
        remove: function(a) {
            this.subscribers = this.subscribers.filter(function(b) {
                return b.name != a
            });
            0 == this.subscribers.length && this.abort()
        },
        setState: function(a, b) {
            this._getSubscriber(a).state = b;
            this.listen();
            return this
        },
        _getSubscriber: function(a) {
            return this.subscribers.filter(function(b) {
                return b.name == a
            })[0]
        },
        _getReady: function() {
            return this.subscribers.filter(function(a) {
                return "ready" == a.state
            })
        },
        stop: function() {
            this.abort()
        },
        resume: function() {
            this.listen()
        },
        listen: function() {
            var a = this,
                b = {},
                c = [],
                d = this._getReady();
            this.isRunning() && this.abort();
            0 != d.length && d.length == this.subscribers.length && (d.forEach(function(a) {
                c.push(a.name);
                b = $.extend(b, a.instance.getParams())
            }), b.subscribefor = c.join(","), b._t = $.now, this.xhr = HFN.apiMethod("subscribe", b, function(b) {
                a.chkint && clearInterval(a.chkint);
                console.log("receiving update: ", b);
                a.setState(b.from, "processing");
                var c = a._getSubscriber(b.from);
                c && c.instance.handleEvents(b);
                a.restartTo && (clearTimeout(a.restartTo),
                    a.restartTo = null);
                c || (a.restartTo = setTimeout(a.listen.bind(a), 100))
            }, {
                onXhrError: function(b, c, d) {
                    console.log("subscribe rejected: ", arguments, b.status);
                    a.resetTo && clearTimeout(a.resetTo);
                    a.resetTo = setTimeout(a.listen.bind(a), a.resetTimeoutMilisec);
                    a.resetTimeoutMilisec += Math.round(0.1 * a.resetTimeoutMilisec)
                }
            }), this.setCheck())
        },
        setCheck: function() {
            this.chkint && (clearInterval(this.chkint), this.chkint = null);
            this.chkint = setInterval(function() {
                var a = HFN.subscriptions.xhr;
                a && 0 < a.readyState && 4 > a.readyState ?
                    console.log("checked subscriptions, all good") : a && (console.log("subscriptions: ", a.readyState), HFN.subscriptions.listen())
            }, 3E3)
        },
        isRunning: function() {
            var a = this.xhr;
            return a && 0 < a.readyState && 4 > a.readyState
        },
        abort: function() {
            if (this.xhr && "function" == typeof this.xhr.abort) {
                console.log("Aborting xhr...");
                try {
                    this.xhr.abort()
                } catch (a) {}
                this.xhr = null;
                console.log("Done aborting")
            }
            this.restartTo && (clearTimeout(this.restartTo), this.restartTo = null);
            this.resetTo && (clearTimeout(this.resetTo), this.resetTo = null);
            this.chkint && (clearInterval(this.chkint), this.chkint = null)
        }
    },
    bnotify: {
        ready: !1,
        init: function() {
            this._supported && "granted" != Notification.permission && Notification.requestPermission(callback)
        },
        _supported: function() {
            return !!window.Notification
        },
        emit: function(a, b, c, d) {
            if (this._supported) {
                var e = function() {
                    (new Notification("", {
                        icon: a,
                        body: c.replace(/<[^>]+>/g, ""),
                        tag: b
                    })).onclick = d
                };
                "granted" != Notification.permission ? Notification.requestPermission(e) : e()
            }
        }
    },
    notify: {
        lastNotificaionId: 0,
        readNotificationId: 0,
        notifications: [],
        resetTo: null,
        popOverInited: !1,
        showElement: ".notify-show",
        iconSize: null,
        init: function() {
            if ("undefined" === typeof publink)
                if (HFN.config.auth) {
                    this.iconSize = HFN.ICONS.LIST;
                    var a = HFN.subscriptions,
                        b;
                    a.add("notifications", HFN.notify);
                    setTimeout(function() {
                        a.setState("notifications", "ready")
                    }, 0);
                    b = this.getPopver();
                    b.find(".notifylist-items").html(__('<div class="notifylist-info">No notifications</div>'));
                    popOver.attach({
                        el: this.showElement,
                        pos: "bottom",
                        align: HFN.config.isRtl() ? "left" : "right",
                        valign: "top",
                        obj: b,
                        trigger: "click",
                        onOpen: this.onOpen.bind(this),
                        onClose: this.onClose.bind(this)
                    });
                    $(".notifylist").on("touchstart", function(a) {
                        a.stopPropagation()
                    });
                    $(this.showElement).show()
                } else this.destroy()
        },
        getPopver: function() {
            var a = Math.round(0.7 * $(window).height()),
                a = 300 < a ? a : 300,
                a = 373 < a ? 373 : a,
                b = HFN.renderTemplate(".notify-tpl").css("z-index", 2500);
            b.find(".notifylist-items").css("max-height", a + "px");
            return b
        },
        destroy: function() {
            $(this.showElement).is(":visible") && ($(this.showElement).hide().removeData(),
                $(".popover").length && popOver.closeAll())
        },
        handleUpdate: function(a) {
            var b = this.getPopver();
            notify = b.find(".notifylist");
            list = notify.find(".notifylist-items");
            that = this;
            el = $(this.showElement);
            newCount = 0;
            a.forEach(function(a) {
                var b = HFN.renderTemplate(".notifylist-item-tpl", {
                    text: a.notification,
                    datetime: HFN.formatDtTime(a.mtime),
                    icon: HFN.createIconSrc(a.iconid, HFN.ICONS.NOTIFICATIONS)
                }, {
                    escape: !1
                }).click(that.clickHandler.bind(that, a));
                a.thumb && that.showThumb(a.thumb, b.find(".notifylist-icon-img"));
                a.isnew && (b.addClass("notifylist-item-new"), newCount++);
                list.append(b)
            });
            0 < newCount ? $(this.showElement).find(".notify-badge").text(newCount).show() : $(this.showElement).find(".notify-badge").hide();
            a.length && popOver.update(el, b)
        },
        clickHandler: function(a) {
            popOver.close($(this.showElement));
            if (this.actionHandles[a.action]) this.actionHandles[a.action](a)
        },
        showThumb: function(a, b) {
            var c = new Image,
                d = HFN.iconTypes[this.iconSize].thumb,
                e = HFN.cache.cacheid("thumb", a.hash, d.size, 0);
            c.src = HFN.prepUrl(a);
            HFN.cache.set(e,
                c.src, 2E3);
            c.onload = function() {
                b.hide();
                b.prop("src", this.src);
                b.fadeIn(800);
                b.css({
                    width: d.width,
                    height: d.height
                })
            }
        },
        onOpen: function() {
            var a = this,
                b = $("." + $(a.showElement).data("opts").objClass);
            HFN.config.isRtl() ? (b.css("margin-right", "13px"), b.css("left", parseInt(b.css("left")) - 13)) : b.css("margin-left", "14px");
            b.css({
                "margin-top": "-12px"
            });
            HFN.config.isMobile() && b.css({
                position: "absolute"
            });
            $(".notifylist-close").click(function() {
                popOver.close($(a.showElement))
            });
            $("body").on("wheel.notify mousewheel.notify",
                function(a) {
                    var b = $(".notifylist-items"),
                        e = b[0].scrollHeight - b.height();
                    if (!$(a.target).hasClass(".notifylist") && !$(a.target).closest(".notifylist").length || b.scrollTop() == e && 0 > a.originalEvent.wheelDelta) return !1
                });
            a.lastNotificaionId <= a.readNotificationId || (a.readxhr && a.readxhr.abort(), a.readxhr = HFN.apiMethod("readnotifications", {
                notificationid: a.lastNotificaionId
            }, function() {
                a.readNotificationId = a.lastNotificaionId;
                a.notifications.forEach(function(a) {
                    a.isnew = !1
                });
                a.handleUpdate(a.notifications);
                console.log("notications read")
            }))
        },
        onClose: function() {
            $("body").off("wheel.notify mousewheel.notify")
        },
        getNewCout: function(a) {
            return a.filter(function(a) {
                return !0 == a.isnew
            }).length
        },
        getParams: function() {
            return {
                notificationid: this.lastNotificaionId,
                notificationthumbsize: HFN.iconTypes[this.iconSize].thumb.size
            }
        },
        handleEvents: function(a) {
            this.lastNotificaionId = a.notificationid;
            console.log("New notification: ", a.notifications);
            this.notifications = a.notifications;
            this.handleUpdate(a.notifications);
            HFN.subscriptions.setState("notifications",
                "ready")
        },
        stop: function() {
            HFN.subscriptions.remove("notifications")
        },
        actionHandles: {
            gotofolder: function(a) {
                console.log("goto folder:", a.folderid);
                HFN.openFolder(a.folderid)
            },
            openurl: function(a) {
                window.open(a.url)
            },
            opensharerequest: function(a) {
                HFN.getShareRequest(a.sharerequestid, "incoming", function(a) {
                    a ? "shares" == $.bbq.getState("page") || "sharedwithme" == $.bbq.getState("page") ? HFN.acceptShare(a) : HFN.config.isMobile() ? HFN.pages["goto"]("sharedwithme", function() {
                        HFN.acceptShare(a)
                    }) : HFN.pages["goto"]("shares",
                        function() {
                            HFN.acceptShare(a)
                        }, {
                            tab: "requests-tab"
                        }) : HFN.message(__("Non existing share request. It might be already accepted or cancelled by the sending user."), "error")
                })
            },
            openfoldercomments: function(a) {
                triggerOpenFolder(a.parentfolderid, !1, !1, function() {
                    HFN.openFolder(a.parentfolderid);
                    HFN.openComments("d" + a.folderid)
                })
            },
            openfilecomments: function(a) {
                triggerOpenFolder(a.parentfolderid, !1, !1, function() {
                    HFN.openFolder(a.parentfolderid);
                    HFN.openComments("f" + a.fileid)
                })
            }
        }
    },
    events: {
        params: {},
        _set: function(a) {
            $.extend(this.params,
                a)
        },
        init: function() {
            var a = this;
            HFN.apiMethod("eventslast", {}, function(b) {
                a._set(b.events);
                HFN.subscriptions.setState("publinks", "ready");
                HFN.subscriptions.setState("uploadlinks", "ready")
            }, {
                cacheTime: 0,
                forceFresh: !0
            });
            HFN.subscriptions.add("publinks", a);
            HFN.subscriptions.add("uploadlinks", a)
        },
        getParams: function() {
            return this.params
        },
        handleEvents: function(a) {
            console.log("Received ret: ", a);
            a.publinkid && (this.params.publinkid = a.publinkid);
            a.uploadlinkid && (this.params.uploadlinkid = a.uploadlinkid);
            HFN.subscriptions.setState("publinks",
                "ready");
            HFN.subscriptions.setState("uploadlinks", "ready");
            a.publinks && this.handlePublinks(a.publinks);
            a.uploadlinks && this.handlePuplinks(a.uploadlinks)
        },
        handlePublinks: function(a) {
            console.log("received publinks", a);
            HFN.cache.expire(HFN.cache.cacheid("publinks", "all"));
            HFN.cache.expireMatch("api-listpublinks");
            HFN.refreshSharesAll()
        },
        handlePuplinks: function(a) {
            console.log("received puplinks", a);
            HFN.cache.expireMatch(HFN.cache.cacheid("puplinks", "all"));
            HFN.cache.expireMatch("api-listuploadlinks");
            HFN.refreshSharesAll()
        }
    },
    diff: {
        lastDiffId: -1,
        xhr: null,
        chkint: null,
        abto: null,
        resetTo: null,
        restartTo: null,
        resetTimeoutMilisec: 1E4,
        initErrorTo: null,
        initErrorToMilisec: 5E3,
        jqEvent: {},
        running: !1,
        subscribers: {},
        init: function(a) {
            var b = HFN.diff;
            console.log("DIFF: ", b.lastDiffId);
            if (-1 == b.lastDiffId) {
                var c = HFN.subscriptions;
                c.add("diff", b);
                console.log("polling last diff", HFN.config.auth);
                HFN.apiMethod("diff", {
                    last: 0,
                    _t: $.now
                }, function(a) {
                    b.lastDiffId = a.diffid;
                    c.setState("diff", "ready");
                    b.running = !0;
                    console.log("diff is: ",
                        a)
                }, {
                    onXhrError: function() {
                        b.initErrorTo && clearTimeout(b.initErrorTo);
                        b.initErrorTo = setTimeout(HFN.diff.init.bind(HFN.diff), HFN.diff.initErrorToMilisec);
                        HFN.diff.initErrorToMilisec += Math.round(0.1 * HFN.diff.initErrorToMilisec)
                    }
                })
            }
        },
        getParams: function() {
            return {
                diffid: this.lastDiffId,
                iconformat: "id",
                difflimit: 500
            }
        },
        startFrom: function(a) {
            this.abort();
            this.lastDiffId = a;
            this.resume()
        },
        stop: function() {
            if (-1 != this.lastDiffId) {
                var a = this.lastDiffId;
                this.abort();
                this.lastDiffId = a
            }
        },
        resume: function() {
            var a =
                HFN.subscriptions;
            a.add("diff", HFN.diff);
            a.setState("diff", "ready")
        },
        listen: function() {
            throw Error("Don't use this method");
        },
        setCheck: function() {
            this.chkint && (clearInterval(this.chkint), this.chkint = null);
            this.chkint = setInterval(function() {
                var a = HFN.diff.xhr;
                a && 0 < a.readyState && 4 > a.readyState ? console.log("checked diff, all good") : a && (console.log("diff: ", a.readyState), HFN.diff.listen())
            }, 3E3)
        },
        logout: function() {
            this.lastDiffId = -1
        },
        reset: function() {
            console.log("resetting diff", this);
            this.lastDiffId = -1;
            this.abort();
            this.init()
        },
        isRunning: function() {
            return this.running
        },
        abort: function() {
            this.running = !1;
            HFN.subscriptions.remove("diff")
        },
        handleEvents: function(a) {
            this.lastDiffId = a.diffid;
            this.handleDiff(a.entries);
            setTimeout(HFN.subscriptions.setState.bind(HFN.subscriptions, "diff", "ready"), a.entries.length)
        },
        subscribe: function(a, b) {
            var c = uniqueNum.get("diff-sub");
            this.subscribers[c] = {
                events: a,
                callback: b
            };
            return c
        },
        unsubscribe: function(a) {
            a in this.subscribers && delete this.subscribers[a]
        },
        saveEntries: function(a) {
            this.queue =
                this.queue.concat(a)
        },
        queue: [],
        handling: !1,
        handleDiff: function(a) {
            for (var b = 0, c = [], d = 0, e = Math.ceil(a.length / 50), f = this, g = function(a, b) {
                for (var c = 0; c < a.length; ++c)
                    if (a[c].event == b) return !0;
                return !1
            }(a, "modifyuserinfo"); d < e; ++d) c.push(a.splice(0, 50));
            for (console.log(c); b < c.length; ++b)(function(a) {
                setTimeout(function() {
                    for (var b = 0; b < c[a].length; ++b) f.handleEvent(c[a][b])
                }, 100 * a)
            })(b);
            a = $.bbq.getState("page");
            "history" == a ? $.bbq.pushState({
                refr: uniqueNum.get()
            }) : "settings" == a && g && $.bbq.pushState({
                refr: uniqueNum.get()
            })
        },
        handleEvent: function(a) {
            console.log("Incoming event: ", a);
            if (a.event in this.handles) this.handles[a.event](a);
            else console.log("Unhandled event: ", a);
            $(this.jqEvent).trigger("diffEvent." + a.event, a);
            for (var b in this.subscribers) - 1 != this.subscribers[b].events.indexOf(a.event) && this.subscribers[b].callback(a.event)
        },
        handles: {
            reset: function(a) {
                HFN.cache.cleanAll();
                HFN.cache.set("listfolder-list-0-default", {
                    isfolder: !0,
                    ismine: !0,
                    id: "d0",
                    folderid: 0,
                    path: "/",
                    name: "/",
                    thumb: !1,
                    icon: "folder",
                    isshared: !1,
                    created: a.time,
                    modified: a.time,
                    contents: []
                }, 604800);
                $.bbq.pushState({
                    page: "filemanager"
                }, 2)
            },
            createfolder: function(a) {
                console.log("live grid", HFN.metaInLiveGrid(a.metadata));
                console.log("filter?", HFN._filterTree([a.metadata]).length);
                HFN._filterTree([a.metadata]).length && (HFN.metaInLiveGrid(a.metadata) ? HFN.gridAppend(a.metadata) : HFN.appendMetadata(a.metadata));
                HFN.cache.expire("folders-lookup")
            },
            deletefolder: function(a) {
                HFN.gridRemove(a.metadata).expireMetadata([a.metadata.id]);
                $.bbq.getState("folder") ==
                    a.metadata.folderid && $.bbq.pushState({
                        folder: a.metadata.parentfolderid
                    });
                HFN.metaInLiveGrid(a.metadata) && $.bbq.getState("comments") == a.metadata.id && ($(daGrid.parentSelector() + " tr.comments.meta" + a.metadata.id).remove(), $.bbq.removeState("comments"))
            },
            deletefile: function(a) {
                a.metadata.size && a.metadata.ismine && HFN.updateQuota(-1 * a.metadata.size);
                HFN.metaInLiveGrid(a.metadata) && ($.bbq.getState("comments") == a.metadata.id && ($(daGrid.parentSelector() + " tr.comments.meta" + a.metadata.id).remove(), $.bbq.removeState("comments")),
                    HFN.gridRemove(a.metadata));
                HFN.expireMetadata([a.metadata.id])
            },
            createfile: function(a) {
                HFN._filterTree([a.metadata]).length && (HFN.metaInLiveGrid(a.metadata) ? (console.log("grid append"), HFN.gridAppend(a.metadata)) : (console.log("append meta"), HFN.appendMetadata(a.metadata)))
            },
            modifyfile: function(a) {
                var b = HFN.findOriginalMetadata(a.metadata),
                    c = [];
                console.log("original meta", b);
                b && (b.size && b.ismine && HFN.updateQuota(-1 * b.size), HFN.metaInLiveGrid(b) ? HFN.gridRemove(b, !0) : c.push(b.id), daGrid && b.parentfolderid !=
                    a.metadata.parentfolderid && ($(daGrid.parentSelector() + " tr.comments.metaf" + a.metadata.deletedfileid).remove(), $.bbq.removeState("comments")));
                a.metadata.deletedfileid && (console.log("f" + a.metadata.deletedfileid, HFN.data.fflookup["f" + a.metadata.deletedfileid]), HFN.data.fflookup["f" + a.metadata.deletedfileid] && (HFN.metaInLiveGrid(HFN.data.fflookup["f" + a.metadata.deletedfileid]) ? HFN.gridRemove(HFN.data.fflookup["f" + a.metadata.deletedfileid]) : c.push("f" + a.metadata.deletedfileid)), daGrid && ($(daGrid.parentSelector() +
                    " tr.comments.metaf" + a.metadata.deletedfileid).remove(), $.bbq.removeState("comments")));
                console.log("expire metadata", c);
                HFN.expireMetadata(c);
                HFN._filterTree([a.metadata]).length && (HFN.metaInLiveGrid(a.metadata) ? HFN.gridAppend(a.metadata, !0) : HFN.appendMetadata(a.metadata));
                HFN.cache.expireMatch("api-listrevisions-fileid:" + a.metadata.fileid)
            },
            modifyfolder: function(a) {
                var b = HFN.findOriginalMetadata(a.metadata);
                console.log("orig", b);
                b && (HFN.metaInLiveGrid(b) ? HFN.gridRemove(b, !0) : HFN.expireMetadata([b.id]),
                    b.parentfolderid != a.metadata.parentfolderid && daGrid && ($(daGrid.parentSelector() + " tr.comments.meta" + b.id).remove(), $.bbq.removeState("comments")));
                HFN._filterTree([a.metadata]).length && (HFN.metaInLiveGrid(a.metadata) ? HFN.gridAppend(a.metadata, !0) : HFN.appendMetadata(a.metadata));
                HFN.cache.expireMatch("folders-lookup");
                b && (HFN.refreshGrid(b.parentfolderid), HFN.refreshGrid(b.folderid));
                daGrid && daGrid.opts.metadata && daGrid.opts.metadata.folderid && daGrid.opts.metadata.folderid == a.metadata.folderid && (daGrid.opts.metadata =
                    a.metadata, daGrid.customHeader());
                console.log(b, a.metadata);
                (b && b.isshared || a.metadata.isshared) && HFN.cache.expireMatch("listshares");
                (b && b.isbusiness_shared || a.metadata.isbusiness_shared) && HFN.cache.expireMatch("account_listshares");
                HFN.cache.expireMatch("listpublinks");
                HFN.cache.expireMatch("listuploadlinks")
            },
            requestsharein: function(a) {
                HFN.cache.expireMatch(HFN.cache.cacheid("api", "listshares"));
                HFN.refreshSharesAll();
                HFN.checkNewShares()
            },
            acceptedsharein: function(a) {
                HFN.cache.expireMatch(HFN.cache.cacheid("api",
                    "listshares"));
                HFN.refreshSharesAll();
                HFN.checkNewShares()
            },
            acceptedshareout: function(a) {
                HFN.cache.expireMatch(HFN.cache.cacheid("api", "listshares"));
                HFN.refreshSharesAll();
                HFN.checkNewShares();
                var b = HFN.findOriginalMetadata({
                    id: "d" + a.share.folderid
                });
                b && HFN.setShareFlags(b, {
                    canread: a.share.canread,
                    cancreate: a.share.cancreate,
                    canmodify: a.share.canmodify,
                    candelete: a.share.candelete
                })
            },
            declinedsharein: function(a) {
                HFN.cache.expireMatch(HFN.cache.cacheid("api", "listshares"));
                HFN.refreshSharesAll()
            },
            declinedshareout: function() {
                HFN.cache.expireMatch(HFN.cache.cacheid("api",
                    "listshares"));
                HFN.refreshSharesAll()
            },
            cancelledsharein: function(a) {
                HFN.cache.expireMatch(HFN.cache.cacheid("api", "listshares"));
                HFN.refreshSharesAll()
            },
            removedsharein: function(a) {
                HFN.cache.expireMatch(HFN.cache.cacheid("api", "listshares"));
                HFN.refreshSharesAll()
            },
            modifiedsharein: function(a) {
                HFN.cache.expireMatch(HFN.cache.cacheid("api", "listshares"));
                HFN.refreshSharesAll()
            },
            removedshareout: function(a) {
                HFN.cache.expireMatch(HFN.cache.cacheid("api", "listshares"));
                var b = HFN.findOriginalMetadata({
                    id: "d" +
                        a.share.folderid
                });
                a.share.islast && b && HFN.removeShareFlags(b);
                HFN.refreshSharesAll()
            },
            requestshareout: function(a) {
                HFN.cache.expireMatch(HFN.cache.cacheid("api", "listshares"));
                HFN.findOriginalMetadata({
                    id: "d" + a.share.folderid
                });
                HFN.refreshSharesAll()
            },
            cancelledshareout: function(a) {
                HFN.cache.expireMatch(HFN.cache.cacheid("api", "listshares"));
                HFN.refreshSharesAll()
            },
            modifyuserinfo: function(a) {
                var b = HFN.config.user;
                HFN.config.user = $.extend({}, HFN.config.user, a.userinfo);
                HFN.psettings.init();
                HFN.spaceinfo.init();
                i18n.check_user_lang();
                console.log("olduser", b);
                console.log(a.userinfo);
                "space" == HFN.pages.current && spacelist.refresh();
                "bonussteps" == HFN.pages.current && steps.load();
                b.cryptosetup != a.userinfo.cryptosetup && (HFN.initGoogleAnalytics(), a.userinfo.cryptosetup || (pCrypt.locked || pCloudCrypto.lock(), $.bbq.pushState({
                    page: "crypto"
                }, 2)))
            },
            establishbshareout: function(a) {
                HFN.refreshBusinessSharesAll();
                var b = HFN.findOriginalMetadata({
                    id: "d" + a.share.folderid
                });
                console.log("!found meta", b);
                b && HFN.setShareFlags(b,
                    a.share.permissions, !0)
            },
            modifybshareout: function(a) {
                HFN.refreshBusinessSharesAll()
            },
            removebshareout: function(a) {
                HFN.refreshBusinessSharesAll();
                var b = HFN.findOriginalMetadata({
                    id: "d" + a.share.folderid
                });
                console.log("!found meta", b);
                a.share.islast && b && HFN.removeShareFlags(b, !0)
            },
            establishbsharein: function(a) {
                HFN.refreshBusinessSharesAll()
            },
            modifybsharein: function(a) {
                HFN.refreshBusinessSharesAll()
            },
            removebsharein: function(a) {
                HFN.refreshBusinessSharesAll()
            }
        }
    },
    refreshBusinessShares: function() {
        HFN.cache.expireMatch("account_listshares");
        HFN.cache.expireMatch("account_users");
        HFN.cache.expireMatch("account_teams");
        "b_shares" == HFN.pages.current && HFN.pages.refresh()
    },
    setShareFlags: function(a, b, c) {
        console.log("setting share flags", a, b);
        var d = {
            isshared: !0
        };
        c && (d.isbusiness_shared = !0);
        $.extend(a, b, d);
        this.gridUpdate(a, !0)
    },
    removeShareFlags: function(a, b) {
        console.log("removing share flags", a);
        a.isshared = !1;
        delete a.canread;
        delete a.cancreate;
        delete a.canmodify;
        delete a.candelete;
        delete a.canmanage;
        b && a.isbusiness_shared && delete a.isbusiness_shared;
        this.gridUpdate(a, !0)
    },
    refreshGrid: function(a) {},
    gridAppend: function(a, b, c) {
        console.log("grid append");
        this.metaInLiveGrid(a) && (daGrid.opts.metadata && daGrid.opts.metadata.filter && this.matchFilter(a, daGrid.opts.metadata.q, daGrid.opts.metadata.filter), daGrid.appendData(a, !0, c));
        return this
    },
    gridRemove: function(a, b) {
        console.log("grid remove");
        this.metaInLiveGrid(a) && daGrid.removeData(a, b);
        return this
    },
    gridUpdate: function(a, b) {
        this.metaInLiveGrid(a) && daGrid.updateData(a, b);
        return this
    },
    liveGridOpts: function() {
        return daGrid &&
            daGrid.opts ? daGrid.opts : {}
    },
    metaInLiveGrid: function(a) {
        return daGrid && (daGrid.opts && daGrid.opts.metadata && daGrid.template.type && "publiclist" == daGrid.template.type && daGrid.opts.metadata.folderid == a.parentfolderid || daGrid.opts.metadata && daGrid.opts.metadata.filter && this.matchFilter(a, daGrid.opts.metadata.q, daGrid.opts.metadata.filter)) ? !0 : !1
    },
    matchFilter: function(a, b, c) {
        var d = !1,
            e = !1;
        if (-1 != b.indexOf(":")) {
            b.substr(0, b.indexOf(":"));
            var f = b.substr(b.indexOf(":") + 1).trim()
        }
        console.log("name", a.name,
            b);
        a.name && a.name.toLowerCase().match(f.toLowerCase()) && (d = !0);
        "all" == c ? e = !0 : a.isfolder || a.category != c || (e = !0);
        return d && e
    },
    expireCachedFolder: function(a) {
        HFN.cache.expire(HFN.cache.cacheid("listfolder", "list", a, "default"));
        return this
    },
    expireCachedMetadata: function(a, b) {
        b = b || !1;
        var c = HFN.cache,
            d = c.cacheid("listfolder", "list", a.parentfolderid, "default"),
            e = 0,
            f = 0,
            g = b.deletedfileid ? 2 : 1;
        if (c = c.get(d))
            for (console.log("the list", c.contents); e < c.contents.length; ++e)
                if (console.log(e, a.id, c.contents[e].id,
                    b.deletedfileid, c.contents[e].fileid), b.deletedfileid && b.deletedfileid == c.contents[e].fileid || b.id == c.contents[e].id) b && a.id == c.contents[e].id ? (console.log("replacing ", c.contents[e], b), c.contents[e] = b, f++) : (console.log("splicing ", c.contents[e]), console.log("spliced ", c.contents.splice(e, 1)), e--);
        console.log("EXPIRE", f, g);
        return this
    },
    updateQuota: function(a) {
        console.log("QUOTA UPDATE: ", a);
        parseInt(a) && (HFN.config.user.usedquota += parseInt(a), HFN.spaceinfo.updateQuota())
    },
    expireMetadata: function(a) {
        var b,
            c = 0;
        console.log(a);
        if (!a.length) return this;
        for (; c < a.length; ++c)
            if (a[c] && this.findOriginalMetadata({
                id: a[c]
            })) {
                b = this.findOriginalMetadata({
                    id: a[c]
                }).parentfolderid;
                console.log("folderid", b);
                var d = HFN.cache;
                b = d.cacheid("listfolder", "list", b, "default");
                if (d = d.get(b))
                    for (b = 0; b < d.contents.length; ++b) a[c] == d.contents[b].id && (HFN.data.fflookup[d.contents[b].id] && delete HFN.data.fflookup[d.contents[b].id], d.contents.splice(b, 1))
            } else console.log("cont", a[c], this.findOriginalMetadata({
                id: a[c]
            }));
        return this
    },
    updateMetadata: function(a) {
        var b = this.findOriginalMetadata(a),
            c = $.extend({}, b);
        console.log("FOUND ORIG: ", b);
        console.log("COPY ORIG: ", c);
        this.expireCachedMetadata(b, a);
        HFN.data.fflookup[a.id] = a;
        return c
    },
    findOriginalMetadata: function(a) {
        return a.id in HFN.data.fflookup ? HFN.data.fflookup[a.id] : !1
    },
    appendMetadata: function(a) {
        var b = HFN.cache,
            c = b.cacheid("listfolder", "list", a.parentfolderid, "default");
        console.log("append cid", c);
        HFN.data.fflookup[a.id] = a;
        if (b = b.get(c)) console.log("found parent", b), b.contents.push(a),
            b.sort && delete b.sort;
        a.ismine && a.size && !a.isfolder ? HFN.updateQuota(a.size) : console.log("NOT UPDATING QUOTA");
        return this
    },
    fileExists: function(a, b, c) {
        var d = HFN.cache;
        c = d.cacheid("listfolder", "list", a, c ? "public" : "default");
        a = 0;
        "object" == typeof b && (b = HFN.metaName(b));
        if (d = d.get(c))
            for (; a < d.contents.length; ++a)
                if (b == HFN.metaName(d.contents[a])) return d.contents[a];
        return !1
    },
    uniqFilename: function(a, b) {
        for (var c = 1, d = fileext(a), e = filebase(a); this.fileExists(b, a);) a = e + " (" + c + ")." + d, ++c;
        return a
    },
    fileFind: function(a,
        b, c) {
        var d = HFN.cache,
            e = d.cacheid("listfolder", "list", a, c ? "public" : "default");
        a = 0;
        c = [];
        "object" == typeof filename && (filename = filename.name);
        if (d = d.get(e))
            for (; a < d.contents.length; ++a) d.contents[a].name.match(b) && c.push(d.contents[a]);
        return c.length ? c : !1
    },
    findSubForVideo: function(a, b, c) {
        var d = fileext(b);
        return this.fileFind(a, b.replace(/\./g, "\\.").replace(RegExp(d + "$", "i"), "(srt|sub)"), c)
    },
    getCacheFolder: function(a) {
        var b = HFN.cache;
        a = b.cacheid("listfolder", "list", a, "default");
        var c;
        return (c = b.get(a)) ?
            c : !1
    },
    message: function(a, b, c, d) {
        b = b || "success";
        void 0 == c && (c = !0);
        void 0 == d && (d = !0);
        d && (a = i18n.get(a));
        var e = HFN.renderTemplate("." + b + "Box", {
            message: __(a, a)
        }, {
            escape: c
        });
        a = "error" == b ? 5E3 : 6E3;
        $(".messagecnt").length && $(".messagecnt").remove();
        e.addClass("messagecnt");
        var f = setTimeout(b = function(a) {
            a.fadeOut(100, function() {
                $(this).remove()
            })
        }.bind(null, e), a);
        e.on("mouseover", function() {
            f && (console.log("clear timeout"), clearTimeout(f))
        }).on("mouseleave", function() {
            console.log("resetting timeout");
            f = setTimeout(function() {
                e.fadeOut(1E3,
                    function() {
                        $(this).remove()
                    })
            }, 3E3)
        }).on("click", b);
        e.appendTo(document.body);
        e.css({
            position: "fixed",
            top: "37px",
            left: "50%",
            marginLeft: -1 * (e.outerWidth() / 2)
        })
    },
    initUploadButton: function(a) {
        $(".uplplc").empty().append($('<div class="button upload_button"><img src="//d1q46pwrruta9x.cloudfront.net/img/upload-button.png"> ' + i18n.get("Upload") + "</div>").click(function(a) {
            a.stopPropagation();
            HFN.uploadControl.init()
        })).append("<hr>")
    },
    initCreateAccountButton: function(a) {
        $(".uplplc").empty().append($('<div class="button upload_button">' +
            i18n.get("Create Account") + "</div>").on("click", function(b) {
            HFN.setAfterLogin();
            b = {
                page: "register"
            };
            a && (b.ref = a);
            $.bbq.pushState(b, 2)
        })).append("<hr>")
    },
    initCryptoLockButton: function() {
        $(".uplplc").empty().append($('<div class="button upload_button lock_crypto_btn"><img src="//d1q46pwrruta9x.cloudfront.net/img/crypto/lock_crypto.png"> ' + i18n.get("Lock Crypto") + "</div>").click(function(a) {
            a.stopPropagation();
            pCloudCrypto.lock();
            HFN.cache.expireMatch("listfolder");
            $.bbq.pushState({
                page: "crypto"
            }, 2)
        })).append("<hr>")
    },
    initBackToFilesButton: function() {
        $(".uplplc").empty().append(['<a class="button backtofilesbut" href="#page=filemanager" title="' + __("Back to Files") + '">', '<div class="cwrap">\n<img src="/img/back-files.png">', __("Back to Files"), "</div>\n</a>"].join("\n")).append("<hr>")
    },
    setAfterLogin: function(a) {
        HFN.data.afterLogin = $.extend({}, $.bbq.getState(), a || {})
    },
    destroyUploadButton: function() {
        $(".uplplc").empty()
    },
    forgotPassword: function(a) {
        var b = this.renderTemplate(".forgotpassword", {}),
            c = $.extend({
                    modalOptions: {}
                },
                a);
        b.find(".butt-area").prepend($('<div class="button centerbut linebut greenbut modernbut">' + i18n.get("Reset") + "</div>").on("click.reset", a = function(a) {
            var c = b.find("input[name=email]").val(),
                f = arguments.callee,
                g = this;
            validateEmail(c) ? ($(this).off("click.reset").addClass("graybut"), HFN.apiMethod("lostpassword", {
                mail: c
            }, function(a) {
                HFN.message("Check your e-mail for further instructions.");
                Popup.close()
            }, {
                errorCallback: function() {
                    HFN.message("There's been error with the call. Please, try again.");
                    g.on("click.reset", f).removeClass("graybut")
                }
            })) : HFN.message("Enter valid e-mail.", "error")
        }));
        onEnter(b.find("input[name=email]"), a);
        HFN.config.isMobile() ? MobilePopup.open(b, $.extend({
            title: "Reset Password",
            closeCallback: function() {
                clearOnEnter(b.find("input[name=email]"))
            }
        }, c.modalOptions)) : Popup.open(b, $.extend({
            title: "Reset Password",
            closeCallback: function() {
                clearOnEnter(b.find("input[name=email]"))
            }
        }, c.modalOptions))
    },
    showVerifyMail: function() {
        var a = this.renderTemplate(".verifymail", {
                modal_veryfymail_text: __("An email was sent to <b>%email%</b> containing a verification link.<br>If you don't receive an email within few minutes, check your Junk/Spam folder or click resend.", !1, {
                    email: HFN.config.user.email
                })
            }, {
                escape: !1
            }),
            b = $('<div class="button centerbut greenbut disabled modernbut">' + __("Resend Email") + "</div>");
        a.find(".butt-area").prepend(b);
        b.css("display", "inline-block").removeClass("disabled").on("click.verifym", function(a) {
            b.addClass("disabled").off("click.verifym");
            HFN.apiMethod("sendverificationemail", {}, function() {
                HFN.message("Mail sent. Check your mail.");
                Popup.close()
            })
        });
        HFN.config.isMobile() ? MobilePopup.open(a, {
            title: "Verify your account"
        }) : Popup.open(a, {
            title: "Verify your account"
        });
        HFN.apiMethod("sendverificationemail", {}, function() {})
    },
    folderLook: function(a) {
        var b = HFN.cache,
            c = b.cacheid("folders", "lookup");
        b.has(c) ? a(b.get(c)) : HFN.apiMethod("listfolder", {
            folderid: 0,
            recursive: 1,
            nofiles: 1,
            getkey: 1
        }, function(d) {
            d.key && pCloudCrypto.saveKey(d.metadata.id, d.key);
            var e = {};
            HFN.buildTreeLookup(d.metadata, e);
            b.set(c, e);
            a(e)
        }, {
            forceFresh: !0,
            cacheTime: 0
        })
    },
    getFolderCallback: function(a, b) {
        this.folderLook(function(c) {
            pCrypt.locked && c[a].encrypted && (a = 0);
            b(c[a])
        })
    },
    CATEGORY: {
        UNKNOWN: 0,
        IMAGE: 1,
        VIDEO: 2,
        AUDIO: 3,
        DOCUMENT: 4,
        ARCHIVE: 5
    },
    CATEGORY_TEXT: {
        1: "Image",
        2: "Video",
        3: "Audio",
        4: "Document",
        5: "Archive"
    },
    hasPhoneToken: function(a) {
        for (var b = 0; b < a.length; ++b)
            if ((-1 != a[b].device.toLowerCase().indexOf("iphone") || -1 != a[b].device.toLowerCase().indexOf("android")) && -1 == a[b].device.toLowerCase().indexOf("web")) return !0;
        return !1
    },
    hasDesktopToken: function(a) {
        for (var b = 0; b < a.length; ++b)
            if (-1 != a[b].device.toLowerCase().indexOf("desktop") || -1 != a[b].device.toLowerCase().indexOf("pcloud drive")) return !0;
        return !1
    },
    left: {
        menu: !1,
        srollPos: 0,
        minTop: 0,
        maxTop: -250,
        hasDesktop: !1,
        hasPhone: !1,
        selected: null,
        load: function(a) {
            this.loadData(a);
            $(".midContain > .content .left").remove();
            $(".midContain > .content").prepend('<div class="left lnav"><div class="uplplc"></div><div class="menu"></div></div>')
        },
        loadData: function(a) {
            a && (this.type = a);
            console.log("!!!!!!!!!!!!!!!!!!!! LOADING", HFN.config.label, this.type, HFN.config.label.getLeftMenuItems(this.type, this));
            this.menu = HFN.config.label.getLeftMenuItems(this.type,
                this);
            return !0
        },
        getFilterName: function(a, b) {
            console.log("!!!@!@ filter", a, b);
            this.loadData();
            var c = {
                    all: __("All Files")
                },
                d = c.all;
            c[HFN.CATEGORY.IMAGE] = __("Images");
            c[HFN.CATEGORY.AUDIO] = __("Audio");
            c[HFN.CATEGORY.VIDEO] = __("Video");
            c[HFN.CATEGORY.DOCUMENT] = __("Documents");
            c[HFN.CATEGORY.ARCHIVE] = __("Archives");
            a && (d = c[a]);
            return -1 != b.indexOf(":") && b.substring(b.indexOf(":") + 1).trim().length ? __('Search for "<b>%query%</b>" in "<b>%category%</b>"', !1, {
                query: htmlentities((-1 != b.indexOf("name:") ? "" : b.substr(0,
                    b.indexOf(":") + 1)) + b.substring(b.indexOf(":") + 1)),
                category: d
            }) : __('Browsing "<b>%category%</b>"', !1, {
                category: d
            })
        },
        init: function(a) {
            this.loading = 1;
            this.draw(a);
            HFN.spaceinfo.init()
        },
        draw: function(a) {
            a = a || "files";
            console.log("LEFT INIT");
            this.load(a);
            var b = this.menu,
                c = 0,
                d = 0,
                e = function(a, c, f) {
                    void 0 == f && (f = 0);
                    var g;
                    c = $("<li></li>").append(g = $("<a></a>", {
                        href: "javascript:;"
                    }).on("click", function(b) {
                        b.preventDefault();
                        $(this).parent().hasClass("open") || (a[2].page ? (b = $.extend({}, a[2]), $.bbq.getState("tpl") &&
                            (b.tpl = $.bbq.getState("tpl")), $.bbq.pushState(b, 2)) : a[2].callback && a[2].callback())
                    }).append(HFN.createImage(a[3]).addClass("ina")).append(HFN.createImage(a[4]).addClass("act")).append(a[1])).appendTo(c);
                    f && c.append('<div class="subul-left-border-horizontal"></div>');
                    if (a[5]) {
                        c = $("<ul></ul>").addClass("subul").append($('<div class="subul-left-border"></div>')).appendTo(c);
                        for (var r = 0; r < a[5].length; ++r) e(a[5][r], c, f + 1);
                        c.children("li:first").addClass("first");
                        c.children("li:last").addClass("last")
                    }
                    a[2].url &&
                        g.prop("href", b[r][d][2].url).prop("target", "_blank").off("click")
                };
            for ($(".menu").empty(); c < b.length; ++c) {
                for (var f = $("<ul>"), d = 0; d < b[c].length; ++d) e(b[c][d], f);
                f.appendTo(".menu");
                $("<hr>").appendTo(".menu");
                $("html").addClass("leftline")
            }
            "files" == a ? (HFN.config.auth ? (HFN.apiMethod("backup_list", {}, function(a) {
                    !a.backups.length && (new Date(HFN.config.user.registered)).getTime() + 2592E5 > (new Date).getTime() && $("li.snbackup").append('<span class="badge">new</span>')
                }), $.bbq.getState("page"), $.bbq.getState("folder"),
                $.bbq.getState("crypto"), HFN.initUploadButton(currentFolder || 0), this.activate()) : (this.disable(), HFN.initCreateAccountButton()), HFN.config.auth && (new Date(HFN.config.user.registered)).getTime() + 2592E5 > (new Date).getTime() && $("li.audio").append('<span class="badge">new</span>')) : "business" == a && HFN.initBackToFilesButton();
            HFN.checkNewShares();
            $('.menu li:contains("Crypto Folder"):last').find("a").append("<span></span>");
            var g = this;
            $(window).off("scroll.left").on("scroll.left", function(a) {
                a = $(window);
                var b = a.outerHeight() - $(".spacen").outerHeight() - $(".download-clients").outerHeight() - 15 - $(".left").outerHeight() - $(".header").outerHeight() + 2,
                    c, d;
                g.scrollPos != a.scrollTop() && (a.scrollTop(), c = g.scrollPos - a.scrollTop(), d = parseInt($(".left").css("marginTop")), g.scrollPos = a.scrollTop(), $(".left").css("marginTop", Math.min(Math.max(d + c, b), g.minTop)))
            })
        },
        disable: function() {
            $(".menu").addClass("menudis").append('<div class="menuoverlay" style="position: absolute; top: 0; left :0; width: 100%; height: 100%; opacity: 0;"></div>')
        },
        activate: function() {
            $(".menu").removeClass("menudis");
            $(".menuoverlay").remove()
        },
        _find: function(a, b) {
            console.log("finding", a, b);
            for (var c = !1, d = 0; d < b.length; ++d) {
                if (b[d][2].filter && b[d][2].filter == a || b[d][0].toLowerCase() == a) return console.log("retttttt"), b[d];
                if (b[d][5] && (c = this._find(a, b[d][5]))) break
            }
            return c
        },
        _menuAsList: function() {
            for (var a = [], b = 0; b < this.menu.length; ++b) a = a.concat(this.menu[b]);
            return a
        },
        setActive: function(a) {
            this.selected = a;
            a = this._find(a, this._menuAsList());
            console.log("!!@!@@!@",
                a[1]);
            $(".menu li").removeClass("active open");
            a = $('.menu li:contains("' + a[1] + '"):last').addClass("active");
            a.parent().hasClass("subul") && a.parents("li").addClass("open")
        },
        destroy: function() {
            console.log("destroying left");
            $(".left").empty().remove();
            $("html").removeClass("leftline");
            this.menu = !1
        }
    },
    panel: {
        loaded: !1,
        showed: !1,
        obj: null,
        init: function() {
            if (!HFN.config.auth) this.loaded && this.destroy();
            else if (!this.loaded) {
                this.obj = $('<div class="panel" id="mobPanel"></div>').append(HFN.renderTemplate("#mobilePanel"));
                this.generateMenuItems(this.obj, HFN.config.label.mobile.getPanelItems());
                this.obj.find("ul").append(HFN.renderTemplate("#mobileSpace"));
                this.obj.appendTo(document.body);
                console.log($(window).height(), $(this.obj).find("ul").height());
                var a = function() {
                    $(window).height() > $(".panel ul").height() + $(".panel ._mobile_space").height() ? $(".panel ._mobile_space").addClass("mob-bottom") : $(".panel ._mobile_space").removeClass("mob-bottom")
                };
                a();
                $(window).on("resize", a.bind(this));
                this.obj.on("click.panel", "a",
                    function(a) {
                        $(this).siblings("a").removeClass("active");
                        $(this).find("li").addClass("active");
                        HFN.panel.hide()
                    });
                $.event.special.swipe.horizontalDistanceThreshold = 50;
                $.event.special.swipe.verticalDistanceThreshold = 25;
                $(".backmenu").append($('<a href="javascript:;" class="panelact"></a>').on("click", function(a) {
                    a.stopPropagation();
                    HFN.panel.show()
                }));
                $('<div class="megaoverlay"></div>').hide().appendTo(".megawrap");
                $("input.mq").on("keyup", function(a) {
                    13 == a.keyCode && (a = this.value, 3 <= a.length ? (HFN.panel.hide(),
                        $.bbq.pushState({
                            page: "filemanager",
                            filter: (-1 != a.indexOf(":") ? "" : "name:") + a
                        }, 2)) : HFN.message("Type at least 3 letters to search."))
                });
                touchScroll("mobPanel");
                this.swipeOn();
                this.loaded = !0
            }
        },
        generateMenuItems: function(a, b) {
            var c = a.find("ul");
            b.forEach(function(a) {
                "separator" in a && a.separator ? $("<li>").addClass("border").appendTo(c) : $("<a>", {
                    href: "#"
                }).click(function(b) {
                    b.preventDefault();
                    a.link.page ? (b = $.extend({}, a.link), $.bbq.getState("tpl") && (b.tpl = $.bbq.getState("tpl")), $.bbq.pushState(b, 2)) :
                        a.link.callback && a.link.callback(b)
                }).append($("<li>").addClass(a["class"]).html(__(a.title))).appendTo(c)
            });
            console.log("MENUUEEUEUUEUE", c)
        },
        swipeOff: function() {
            $(window).off(".panel")
        },
        swipeOn: function() {
            $(window).on("swiperight.panel", function(a) {
                a.preventDefault();
                a.stopPropagation();
                HFN.panel.show()
            });
            $(window).on("swipeleft.panel", function(a) {
                a.preventDefault();
                a.stopPropagation();
                HFN.panel.hide()
            })
        },
        setActive: function(a) {
            if (this.loaded) {
                console.log("=== SETTING ACTIVE ===");
                console.log(a);
                var b = {
                    all: "allfiles",
                    4: "documents",
                    2: "videos",
                    3: "audio",
                    1: "images",
                    5: "archives"
                };
                a = a in b ? b[a] : a;
                console.log(a);
                this.obj.find("li").removeClass("active");
                this.obj.find("li." + a).addClass("active")
            }
        },
        show: function() {
            if (!this.obj.is(":animated"))
                if (this.showed) this.hide();
                else {
                    $(".megaoverlay").show();
                    this.init();
                    this.obj.css({
                        height: $(window).height()
                    }).animate({
                        marginLeft: 0
                    }, 300);
                    $(".megawrap").css({
                        position: "fixed",
                        width: $(".megawrap").width()
                    }).animate({
                        left: 240
                    }, 300);
                    var a = this;
                    $(document).on("vmousedown.panel",
                        ".megaoverlay", function(b) {
                            b.stopPropagation();
                            b.preventDefault();
                            $(b.target).closest(".panel").length || a.hide()
                        });
                    this.showed = !0
                }
        },
        hide: function() {
            this.obj.is(":animated") || (this.init(), this.obj.animate({
                marginLeft: -240
            }, 300), $(".megawrap").animate({
                left: 0
            }, 300, function() {
                $(".megawrap").css({
                    position: "static",
                    width: "100%",
                    left: null
                });
                $(".megaoverlay").hide()
            }), $(document).off("vmousedown.panel"), this.showed = !1)
        },
        destroy: function() {
            $(window).off(".panel");
            $(document).off(".panel");
            $(".panelact").remove();
            this.obj.remove();
            this.obj = null;
            this.loaded = !1
        }
    },
    controlsnew: {
        opts: {},
        loaded: !1,
        ID_CTRL: 0,
        ID_IMG: 1,
        ID_NAME: 2,
        ID_EXTRA_IGM: 3,
        controls: {},
        loadControlsValues: function() {
            this.controls = {
                "default": [
                    ["share", "/mn/share-dark.png", i18n.get("Share"), "/mn/share-dark.png"],
                    ["editshare", "/mn/small/edit-share-over.png", i18n.get("Edit Share"), "/mn/small/edit-share-over.png"],
                    ["share_folder", "/mn/share-dark.png", i18n.get("Share Folder"), "/mn/share-dark.png"],
                    ["share_publink", "create-downld-link-drop-menu-active.png",
                        i18n.get("Share Download Link"), "create-downld-link-drop-menu-active.png"
                    ],
                    ["share_puplink", "create-upload-link-drop-menu-active.png", i18n.get("Share Upload Link"), "create-upload-link-drop-menu-active.png"],
                    ["copy", "/mn/copy-dark.png", i18n.get("Copy"), "/mn/copy-dark.png"],
                    ["move", "/mn/move-dark.png", i18n.get("Move"), "/mn/move-dark.png"],
                    ["rename", "/mn/small/rename-dark.png", i18n.get("Rename"), "/mn/small/rename-dark.png"],
                    ["addcomment", "/mn/small/comments-dark.png", i18n.get("Comments"), "/mn/small/comments-dark.png"],
                    ["audio_play", "/mn/small/play-dark.png", __("Play Selected"), "/mn/small/play-dark.png"],
                    ["audio_addplaylist", "/mn/small/add-to-playlist-dark.png", __("Add to Playlist"), "/mn/small/add-to-playlist-dark.png"],
                    ["audio_addplayer", "/mn/small/add-to-player-dark.png", __("Add to Player"), "/mn/small/add-to-player-dark.png"],
                    ["info", "/mn/info-dark.png", __("Info"), "/mn/info-dark.png"],
                    ["archive", "/mn/download-archive-dark.png", __("Download Selected"), "/mn/download-archive-dark.png"],
                    ["download", "/mn/small/download-dark.png",
                        __("Download"), "/mn/small/download-dark.png"
                    ],
                    ["extract", "dropdown-extract-active.png", __("Extract Archive"), "dropdown-extract-active.png"],
                    ["savezip", "new-archive-active.png", __("Create Archive"), "new-archive-active.png"],
                    ["getdownlink", "/mn/get-down-link-dark.png", __("Download Link"), "/mn/get-down-link-dark.png"],
                    ["getuplink", "/mn/get-up-link-dark.png", __("Upload Link"), "/mn/get-up-link-dark.png"],
                    ["restorefile", "/mn/restore-file.png", __("Restore File"), "/mn/restore-file.png"],
                    ["revisions", "/mn/revisions.png",
                        __("Revisions"), "/mn/revisions.png"
                    ],
                    ["restorerev", "/mn/restore-revis-dark.png", __("Restore Revision"), "/mn/restore-revis-dark.png"],
                    ["delete", "/mn/delete-dark.png", __("Delete"), "/mn/delete-dark.png"]
                ],
                "audio-songs": [
                    ["download", "/mn/small/download-dark.png", __("Download"), "/mn/small/download-dark.png"],
                    ["audio_play", "/mn/small/play-dark.png", __("Play Selected"), "/mn/small/play-dark.png"],
                    ["audio_addplaylist", "/mn/small/add-to-playlist-dark.png", __("Add to Playlist"), "/mn/small/add-to-playlist-dark.png"],
                    ["audio_addplayer", "/mn/small/add-to-player-dark.png", __("Add to Player"), "/mn/small/add-to-player-dark.png"],
                    ["share", "/mn/share-dark.png", i18n.get("Share"), "/mn/share-dark.png"]
                ],
                publink: [
                    ["pub_copy", "/mn/copy-dark.png", __("Copy to my pCloud"), "/mn/copy-dark.png"],
                    ["pub_archive", "/mn/download-archive-dark.png", __("Download Selected"), "/mn/download-archive-dark.png"]
                ],
                trash: [
                    ["trash_restore", "/mn/copy-dark.png", __("Restore"), "/mn/copy-dark.png"],
                    ["trash_delete", "/mn/delete-dark.png", __("Delete Forever"),
                        "/mn/delete-dark.png"
                    ]
                ],
                audio: [
                    ["audio_play", "/mn/small/play-dark.png", __("Play Selected"), "/mn/small/play-dark.png"],
                    ["audio_addplaylist", "/mn/small/add-to-playlist-dark.png", __("Add to Playlist"), "/mn/small/add-to-playlist-dark.png"],
                    ["audio_addplayer", "/mn/small/add-to-player-dark.png", __("Add to Player"), "/mn/small/add-to-player-dark.png"]
                ],
                publinks: [
                    ["pub_export", "/mn/share-dark.png", __("Export"), "/mn/share-dark.png"],
                    ["pub_delete", "/mn/delete-dark.png", __("Delete"), "/mn/delete-dark.png"]
                ],
                encrypted: [
                    ["download_file",
                        "/mn/small/download-dark.png", __("Download"), "/mn/small/download-dark.png"
                    ]
                ]
            }
        },
        init: function(a) {
            this.opts = a = $.extend({}, {
                type: "default",
                place: "",
                sizes: {},
                extraSize: 0,
                getSelectionSummary: function() {
                    var a = [],
                        b = fs.getAsArrays(),
                        e = fs.getSelectionInfo();
                    1 == e.length ? a.push(htmlentities(HFN.strFit(HFN.metaName(e[0]), 50))) : (b.folderids && b.folderids.length && a.push(b.folderids.length + " " + __("Folders")), b.fileids && b.fileids.length && a.push(b.fileids.length + " " + __("Files")));
                    return a.join(", ")
                }
            }, a);
            $(".headerunder .controlsplc").width(Math.min($(".headerunder").width() -
                $(".gridmanage").outerWidth(), 600));
            this.preloadControls();
            var b = this;
            $(window).off("resize.ctrl").on("resize.ctrl", function() {
                new DelayedExecution(b.setupScroll.bind(b), 200, "w-resize")
            });
            this.setupScroll();
            this.loadControls();
            this.loaded = !0
        },
        buildInfoCell: function() {
            return $("<div>").addClass("ctrlcell infocell").html(this.opts.getSelectionSummary())
        },
        buildCell: function(a) {
            a = $("<span>").append('<img src="//d1q46pwrruta9x.cloudfront.net/img/' + a[this.ID_IMG] + '" width="16" height="15">').addClass("trg").append(a[this.ID_NAME]);
            return $("<div>").addClass("ctrlcell").append(a)
        },
        buildExtraCell: function() {
            var a = $("<span>").append(__("More")).addClass("trg").append('<img src="//d1q46pwrruta9x.cloudfront.net/img/right-more.png" width="7" height="4">');
            return $("<div>").addClass("ctrlcellmore").append(a)
        },
        calcFreeSpace: function() {
            for (var a = 0, b = 0, c = $(this.opts.place).children(".active"); b < c.length; ++b) a += $(c[b]).outerWidth();
            return $(this.opts.place).width() - a
        },
        getCtrlObjWidth: function(a, b) {
            var c = HFN.cache.getOrSet("ctrls-doms", {}, 86400);
            c[b] || (c[b] = getObjWidth(a));
            return c[b]
        },
        preloadControls: function() {
            this.loadControlsValues();
            var a = this.controls[this.opts.type],
                b = 0;
            $(this.opts.place).empty();
            for ($(this.opts.place).append(this.buildInfoCell().addClass("selinfo")); b < a.length; ++b) {
                var c = this.buildCell(a[b]).addClass(a[b][0]),
                    d = this.getCtrlObjWidth(c, a[b][0]);
                c.appendTo(this.opts.place);
                this.opts.sizes[a[b][0]] = d
            }
            a = this.buildExtraCell().addClass("more");
            this.opts.sizes.more = this.getCtrlObjWidth(a, "more");
            a.appendTo(this.opts.place)
        },
        loadControls: function(a) {
            $(".headerunder .controlsplc").width(Math.min($(".headerunder").width() - $(".gridmanage").outerWidth() - 50 - this.opts.extraSize, 6E3));
            if (!a || !a.length) $(this.opts.place + " .active").removeClass("active"), $(this.opts.place).parent().removeClass("active");
            else if (this.opts.type) {
                var b = this.filterControls(this.controls[this.opts.type]);
                a = 0;
                var c = $(this.opts.place + " .more"),
                    d = this.opts.sizes.more,
                    e = !1,
                    f = [],
                    g = this;
                if (b) {
                    $(this.opts.place + " .active").removeClass("active");
                    $(this.opts.place).parent().addClass("active");
                    for ($(this.opts.place + " .selinfo").addClass("active").html(this.opts.getSelectionSummary()); a < b.length; ++a)!e && this.calcFreeSpace() < d + this.opts.sizes[b[a][0]] && (e = !0), e ? f.push([b[a][this.ID_NAME], !1, [], b[a][this.ID_EXTRA_IGM], b[a][this.ID_CTRL], {
                        control: b[a][0]
                    }]) : ($(this.opts.place + " ." + b[a][0]).addClass("active"), function(a) {
                        $(g.opts.place + " ." + b[a][0] + " .trg").off(".ctrl").on("click.ctrl", function() {
                            g.handleControl(b[a][0])
                        })
                    }(a));
                    console.log("extras", f);
                    f.length && (c.addClass("active"), dropDown.bindList(f,
                        c.find(".trg"), {
                            eventTrigger: "click",
                            eventClose: "click",
                            direction: dropDown.DIR_LEFT,
                            holderClass: "mnnew",
                            overwriteTip: {
                                right: "11px"
                            },
                            buildCell: function(a, b) {
                                console.log(a);
                                return $("<a>").attr("href", "javascript:void(0);").attr("data-action", a[4].control).append($("<li>").append('<img src="//d1q46pwrruta9x.cloudfront.net/img/' + a[3] + '" width="16" height="15">').append(a[dropDown.N_TEXT])).on("click", function(b) {
                                    b.preventDefault();
                                    b.stopPropagation();
                                    g.handleControl(a[4]);
                                    $(this).hasClass("sub") || dropDown.resetTo(0)
                                }).appendTo(b)
                            },
                            buildHolder: function(a) {
                                a.hasClass("sub")
                            }
                        }))
                }
            }
        },
        handleControl: function(a) {
            console.log("Control", a);
            var b = FileSelection,
                c = b.getSelectionInfo();
            switch (a) {
                case "extract":
                    HFN.initExtract(c[0]);
                    break;
                case "savezip":
                    HFN.initSaveZip();
                    break;
                case "addcomment":
                    $.bbq.pushState({
                        comments: c[0].id
                    });
                    break;
                case "rename":
                    HFN.initRename(c[0]);
                    break;
                case "info":
                    HFN.itemInfo(c[0]);
                    break;
                case "share":
                    1 == c.length ? c[0].isfolder && Perm.canShare(c[0]) ? HFN.shareChoice(c[0]) : c[0].ismine && HFN.getPublink(c[0], function(a) {
                        a ?
                            HFN.sharePublink(a) : HFN.createPublink(c[0])
                    }) : HFN.initPublinkTree();
                    break;
                case "share_folder":
                    1 == c.length ? HFN.initShareFolder(c[0]) : HFN.initPublinkTree();
                    break;
                case "share_publink":
                    1 == c.length ? HFN.getPublink(c[0], function(a) {
                        a ? HFN.sharePublink(a) : HFN.createPublink(c[0])
                    }) : HFN.initPublinkTree();
                    break;
                case "share_puplink":
                    HFN.getPuplink(c[0], function(a) {
                        a ? HFN.viewPuplink(a) : HFN.createPuplink(c[0])
                    });
                    break;
                case "editshare":
                    HFN.initShareFolder(c[0]);
                    break;
                case "sharestop":
                    HFN.shareStop(c[0]);
                    break;
                case "copy":
                    HFN.initCopy();
                    break;
                case "move":
                    HFN.initMove();
                    break;
                case "delete":
                    HFN.deleteItem(!1, triggerOpenFolder.bind(null, null, !1, !0));
                    break;
                case "archive":
                    HFN.initDownloadArchive();
                    break;
                case "download":
                    1 == c.length && c[0].encrypted ? pCloudCrypto.initFileDownload(c[0]) : 1 == c.length && c[0].isfolder ? HFN.initDownloadArchive() : HFN.previewGeneric(c[0], $.bbq.getState("code"));
                    break;
                case "download_file":
                    1 == c.length && c[0].encrypted ? pCloudCrypto.initFileDownload(c[0]) : 1 == c.length && c[0].isfolder ? HFN.initDownloadArchive() : HFN.previewGeneric(c[0],
                        $.bbq.getState("code"));
                    break;
                case "pubtree":
                    1 == b.getSelectionInfo().length ? HFN.createPublink(b.getSelectionInfo()[0]) : HFN.initPublinkTree();
                    break;
                case "pub_copy":
                    if (!HFN.config.auth) {
                        HFN.initLoginRegModal("Log in to your pCloud", function() {
                            HFN.pages.refresh()
                        });
                        break
                    }
                    HFN.copyToCloud({
                        code: $.bbq.getState("code") || $.deparam.querystring().code,
                        onDone: function(a) {
                            HFN.message("File is copied.")
                        }
                    });
                    break;
                case "pub_archive":
                    1 != b.getSelectionInfo().length || b.getSelectionInfo()[0].isfolder ? HFN.initDownloadArchivePublic() :
                        HFN.initDownloadPublic();
                    break;
                case "pub_download":
                    HFN.initDownloadPublic();
                    break;
                case "trash_restore":
                    HFN.initTrashRestore();
                    break;
                case "trash_delete":
                    HFN.initTrashDelete();
                    break;
                case "audio_play":
                    b.getSelectionInfo()[0].albums ? HFN.audioPlayer.appendPlaylistItem(HFN.gatherFSArtistSongs(b.getSelectionInfo()), !0) : HFN.audioPlayer.appendPlaylistItem(b.filter(b.getSelectionInfo(), {
                        category: HFN.CATEGORY.AUDIO
                    }), !0);
                    HFN.audioPlayer.go(HFN.audioPlayer.getFirst());
                    break;
                case "audio_addplaylist":
                    b.getSelectionInfo()[0].albums ?
                        HFN.playlistAdd(HFN.gatherFSArtistSongs(b.getSelectionInfo())) : HFN.playlistAdd(b.filter(b.getSelectionInfo(), {
                            category: HFN.CATEGORY.AUDIO
                        }));
                    break;
                case "audio_addplayer":
                    b.getSelectionInfo()[0].albums ? HFN.audioPlayer.appendPlaylistItem(HFN.gatherFSArtistSongs(b.getSelectionInfo())) : HFN.audioPlayer.appendPlaylistItem(b.filter(b.getSelectionInfo(), {
                        category: HFN.CATEGORY.AUDIO
                    }));
                    break;
                case "pub_export":
                    HFN.initExportLinks();
                    break;
                case "pub_delete":
                    HFN.initDeleteLinks()
            }
        },
        filterControls: function(a) {
            for (var b =
                [], c = 0; c < a.length; ++c) this.checkActive(a[c][0]) && b.push(a[c]);
            return b
        },
        checkActive: function(a) {
            var b = !1,
                c = fs.getSelectionInfo(),
                d = 0;
            if (c.length) {
                switch (a) {
                    case "extract":
                        1 != c.length || HFN.CATEGORY.ARCHIVE != HFN.metaCategory(c[0]) || c[0].encrypted || (b = !0);
                        break;
                    case "savezip":
                        1 <= c.length && !c[0].encrypted && (b = !0);
                        break;
                    case "addcomment":
                        HFN.config.isBusiness() && 1 == c.length && !c[0].encrypted && (b = !0);
                        break;
                    case "rename":
                        1 == c.length && Perm.canRename(c[0]) && (b = !0);
                        break;
                    case "share_folder":
                        b = !1;
                        1 != c.length ||
                            !c[0].isfolder || c[0].encrypted || !c[0].ismine || c[0].isshared || c[0].isbusiness_shared || HFN.config.isBusiness() && !PCB.permissions.canShareOutsideCompany() && !PCB.permissions.canShareWithCompany() ? 1 < c.length && (b = !1) : b = !0;
                        break;
                    case "editshare":
                        1 == c.length && c[0].isfolder && !c[0].encrypted && (c[0].isshared || c[0].isbusiness_shared) && (b = !0);
                        break;
                    case "sharestop":
                        b = !1;
                        break;
                    case "share_puplink":
                        b = !1;
                        1 != c.length || !c[0].isfolder || c[0].encrypted || !c[0].ismine || HFN.config.isBusiness() && !PCB.permissions.canCreateUploadLinks() ||
                            (b = !0);
                        break;
                    case "share_publink":
                        for (b = !0; d < c.length; ++d)
                            if (!c[d].ismine || c[d].encrypted || HFN.config.isBusiness() && !PCB.permissions.canCreateDownloadLinks()) b = !1;
                        break;
                    case "copy":
                        b = !0;
                        c[0].encrypted && (b = !1);
                        break;
                    case "move":
                        for (b = !0; d < c.length; ++d)
                            if (!Perm.canMove(c[d])) {
                                b = !1;
                                break
                            }
                        break;
                    case "delete":
                        for (b = !0; d < c.length; ++d)
                            if (!Perm.canDelete(c[d])) {
                                b = !1;
                                break
                            }
                        break;
                    case "archive":
                        b = 1 == c.length ? !1 : !0;
                        c[0].encrypted && (b = !1);
                        break;
                    case "download":
                        b = 1 != c.length || c[d].encrypted && c[d].isfolder ? !1 :
                            !0;
                        break;
                    case "download_file":
                        b = 1 != c.length || c[d].isfolder ? !1 : !0;
                        break;
                    case "pubtree":
                        for (b = !0; d < c.length; ++d)
                            if (!c[d].ismine) {
                                b = !1;
                                break
                            }
                        break;
                    case "pub_copy":
                        b = !0;
                        break;
                    case "pub_archive":
                        if (1 <= c.length || 1 == c.length && c[0].isfolder) b = !0;
                        break;
                    case "pub_download":
                        1 != c.length || c[0].isfolder || (b = !0);
                        break;
                    case "trash_restore":
                        0 < c.length && (b = !0);
                        break;
                    case "trash_delete":
                        0 < c.length && (b = !0);
                        break;
                    case "audio_play":
                        for (b = !0; d < c.length; ++d) c[d].category == HFN.CATEGORY.AUDIO || c[d].albums || (b = !1);
                        break;
                    case "audio_addplaylist":
                        for (b = !0; d < c.length; ++d) c[d].category == HFN.CATEGORY.AUDIO || c[d].albums || (b = !1);
                        break;
                    case "audio_addplayer":
                        for (b = !0; d < c.length; ++d) c[d].category == HFN.CATEGORY.AUDIO || c[d].albums || (b = !1);
                        break;
                    case "pub_delete":
                        0 < c.length && (b = !0);
                        break;
                    case "pub_export":
                        0 < c.length && (b = !0)
                }
                return b
            }
        },
        setupScroll: function() {
            console.log("setup scroll!!!");
            $(".headerwrap").height($(".headerwrap").outerHeight());
            var a = $(this.opts.place).parent(),
                b = a.parent().width(),
                c = a.position().top - $("div.header").outerHeight(),
                d = $("div.header").outerHeight();
            console.log("parent", a);
            console.log("width", b);
            $(window).off("scroll.ctrl").on("scroll.ctrl", function(e) {
                console.log(f, c, d);
                var f = $(window).scrollTop();
                f > c ? a.css({
                    position: "fixed",
                    top: d,
                    width: b,
                    "border-bottom": "1px solid #E9E9E9"
                }) : a.removeAttr("style")
            })
        },
        destroy: function() {
            $(window).off(".ctrl");
            $(this.opts.place).parent().removeAttr("style");
            $(this.opts.place).empty();
            this.loaded = !1
        }
    },
    controls: {
        loaded: !1,
        init: function(a, b) {
            if (!this.loaded) {
                a ? "publink" == a ? this.ctrls = [
                    ["pub_copy", "copy-normal.png",
                        __("Copy to my pCloud")
                    ],
                    ["pub_archive", "leftmenu-archives.png", __("Download Selected")]
                ] : "trash" == a ? this.ctrls = [
                    ["trash_restore", "copy-normal.png", __("Restore")],
                    ["trash_delete", "leftmenu-archives.png", __("Delete")]
                ] : "audio" == a && (this.ctrls = [
                    ["audio_play", "copy-normal.png", "Play Selected"],
                    ["audio_addplaylist", "leftmenu-archives.png", "Add to Playlist"],
                    ["audio_addplayer", "leftmenu-archives.png", "Add to Player"]
                ]) : this.ctrls = [
                    ["share", "share.png", __("Share")],
                    ["copy", "copy-normal.png", __("Copy")],
                    ["move", "move-normal.png", __("Move")],
                    ["delete", "delete-normal.png", __("Delete")],
                    ["archive", "leftmenu-archives.png", __("Download Selected")]
                ];
                $(".footer").removeClass("footer_mini");
                $(".footer .controls").empty();
                for (var c = 0; c < this.ctrls.length; ++c) $('<a href="javascript:void(0);" data-control="' + this.ctrls[c][0] + '">').on("click", function(a) {
                    a.preventDefault();
                    if ($(this).parent().hasClass("active") || $(this).hasClass("active")) {
                        a = FileSelection;
                        var b = a.getSelectionInfo();
                        switch ($(this).data("control")) {
                            case "share":
                                1 ==
                                    b.length ? b[0].isfolder && Perm.canShare(b[0]) ? HFN.shareChoice(b[0]) : b[0].ismine && HFN.createPublink(a.getSelectionInfo()[0]) : HFN.initPublinkTree();
                                break;
                            case "copy":
                                HFN.initCopy();
                                break;
                            case "move":
                                HFN.initMove();
                                break;
                            case "delete":
                                HFN.deleteItem(!1, triggerOpenFolder.bind(null, null, !1, !0));
                                break;
                            case "archive":
                                HFN.initDownloadArchive();
                                break;
                            case "download":
                                HFN.initDownloadMultiple();
                                break;
                            case "pubtree":
                                1 == a.getSelectionInfo().length ? HFN.createPublink(a.getSelectionInfo()[0]) : HFN.initPublinkTree();
                                break;
                            case "pub_copy":
                                if (!HFN.config.auth) {
                                    HFN.initLoginRegModal("Log in to your pCloud", function() {
                                        HFN.pages.refresh()
                                    });
                                    return
                                }
                                HFN.copyToCloud({
                                    code: $.bbq.getState("code"),
                                    onDone: function(a) {
                                        HFN.message("File is copied.")
                                    }
                                });
                                break;
                            case "pub_archive":
                                1 == a.getSelectionInfo().length ? HFN.initDownloadPublic() : HFN.initDownloadArchivePublic();
                                break;
                            case "pub_download":
                                HFN.initDownloadPublic();
                                break;
                            case "trash_restore":
                                HFN.initTrashRestore();
                                break;
                            case "trash_delete":
                                HFN.initTrashDelete();
                                break;
                            case "audio_play":
                                a.getSelectionInfo()[0].albums ?
                                    HFN.audioPlayer.appendPlaylistItem(HFN.gatherFSArtistSongs(a.getSelectionInfo()), !0) : HFN.audioPlayer.appendPlaylistItem(a.filter(a.getSelectionInfo(), {
                                        category: HFN.CATEGORY.AUDIO
                                    }), !0);
                                HFN.audioPlayer.go(HFN.audioPlayer.getFirst());
                                break;
                            case "audio_addplaylist":
                                a.getSelectionInfo()[0].albums ? HFN.playlistAdd(HFN.gatherFSArtistSongs(a.getSelectionInfo())) : HFN.playlistAdd(a.filter(a.getSelectionInfo(), {
                                    category: HFN.CATEGORY.AUDIO
                                }));
                                break;
                            case "audio_addplayer":
                                a.getSelectionInfo()[0].albums ? HFN.audioPlayer.appendPlaylistItem(HFN.gatherFSArtistSongs(a.getSelectionInfo())) :
                                    HFN.audioPlayer.appendPlaylistItem(a.filter(a.getSelectionInfo(), {
                                        category: HFN.CATEGORY.AUDIO
                                    }))
                        }
                        console.log("Control: " + $(this).data("control"))
                    }
                }).append(HFN.createImage(this.ctrls[c][1])).append(" " + this.ctrls[c][2]).appendTo(".footer .controls");
                this.loaded = !0
            }
        },
        checkActive: function(a, b) {
            var c = !1,
                d = b.getSelectionInfo(),
                e = 0;
            if (d.length) {
                switch (a) {
                    case "share":
                        for (c = !0; e < d.length; ++e) d[e].ismine || (c = !1);
                        break;
                    case "copy":
                        c = !0;
                        break;
                    case "move":
                        for (c = !0; e < d.length; ++e)
                            if (!Perm.canMove(d[e])) {
                                c = !1;
                                break
                            }
                        break;
                    case "delete":
                        for (c = !0; e < d.length; ++e)
                            if (!Perm.canDelete(d[e])) {
                                c = !1;
                                break
                            }
                        break;
                    case "archive":
                        c = !0;
                        break;
                    case "download":
                        c = !0;
                        break;
                    case "pubtree":
                        for (c = !0; e < d.length; ++e)
                            if (!d[e].ismine) {
                                c = !1;
                                break
                            }
                        break;
                    case "pub_copy":
                        c = !0;
                        break;
                    case "pub_archive":
                        if (1 <= d.length || 1 == d.length && d[0].isfolder) c = !0;
                        break;
                    case "pub_download":
                        1 != d.length || d[0].isfolder || (c = !0);
                        break;
                    case "trash_restore":
                        0 < d.length && (c = !0);
                        break;
                    case "trash_delete":
                        0 < d.length && (c = !0);
                        break;
                    case "audio_play":
                        for (c = !1; e < d.length; ++e)
                            if (d[e].category =
                                HFN.CATEGORY.AUDIO) c = !0;
                        break;
                    case "audio_addplaylist":
                        for (c = !1; e < d.length; ++e)
                            if (d[e].category = HFN.CATEGORY.AUDIO) c = !0;
                        break;
                    case "audio_addplayer":
                        for (c = !1; e < d.length; ++e)
                            if (d[e].category = HFN.CATEGORY.AUDIO) c = !0
                }
                return c
            }
        },
        activate: function() {
            $(".footer .controls a").addClass("active")
        },
        activateSingle: function(a) {
            $(".footer .controls a[data-control=" + a + "]").addClass("active")
        },
        deactivateSingle: function(a) {
            $(".footer .controls a[data-control=" + a + "]").removeClass("active")
        },
        onSelectionChange: function() {
            if (this.loaded) {
                var a =
                    FileSelection,
                    b = 0;
                for (this.deactivate(); b < this.ctrls.length; ++b) this.checkActive(this.ctrls[b][0], a) && this.activateSingle(this.ctrls[b][0])
            }
        },
        deactivate: function() {
            $(".footer .controls a").removeClass("active")
        },
        destroy: function() {
            $(".footer .controls").empty();
            $(".footer").addClass("footer_mini");
            this.loaded = !1
        }
    },
    initCopy: function(a) {
        a && a.revisionid && (a.name = a.name.replace("." + fileext(a.name), "") + "-r" + a.revisionid + "." + fileext(a.name));
        var b = this.renderTemplate("#copyitems"),
            c = -1,
            d = HFN.waitList;
        d.create(function() {
            a &&
                a.revisionid ? (a.name = a.name.replace("-r" + a.revisionid, ""), HFN.message("Revision Restored.")) : HFN.message("Items are copied.");
            Popup.close()
        });
        var e = d.create(Popup.stopLoading.bind(Popup)),
            f = d.addWait(e),
            g = d.addWait(e),
            k = a ? [a] : FileSelection.getSelectionInfo();
        Popup.open(b, {
            title: a && a.revisionid ? "Restore file ..." : "Copying ...",
            clickClose: !1,
            onEscClose: !1
        });
        Popup.startLoading({
            now: !0
        });
        b.find(".modal-files").empty().append(HFN.buildFilePreview(k, {
            onLoad: function() {
                console.log("setting done #2: ", e,
                    f);
                d.setDone(e, f)
            }
        }));
        HFN.foldersCustom.buildFolderBrowse(0, b.find(".dest"), {
            onSelect: function(a) {
                c = a
            },
            onLoad: function() {
                console.log("setting done: ", e, g);
                d.setDone(e, g)
            },
            expandFirstLevel: !0,
            showCurrent: !0,
            canCreateFolders: !0,
            showNoWritePermissions: !0
        });
        for (var l = [], m = 0; m < k.length; ++m) {
            var q, r = {
                tofolderid: null,
                noover: 1
            };
            k[m].isfolder ? (r.folderid = k[m].folderid, q = "copyfolder") : (q = "copyfile", r.fileid = k[m].fileid, k[m].revisionid && (r.revisionid = k[m].revisionid), r.toname = k[m].name);
            l.push({
                method: q,
                params: r,
                meta: k[m]
            })
        }
        console.log("copylist", l);
        var p = function() {
            var a = l.shift();
            a ? HFN.apiMethod(a.method, a.params, function(a) {
                p()
            }, {
                errorCallback: function(b) {
                    2004 == b.result ? ($(".modal .copy-error").show(), $(".modal .copy-part").hide(), Popup.stopLoading(), b = "copyfolder" == a.method ? __("folder_exists", 'Files or folders under folder "<b>%name%</b>" already exist in destination folder.', {
                        name: a.meta.name
                    }) : __("file_exists", "File <b>%name%</b> already exists in destination folder.", {
                        name: a.meta.name
                    }), console.log("messsage",
                        $(".modal .copy-error .error-message"), b), $(".modal .copy-error .error-message").html(b + "<br>" + __("Please choose appropriate action?")), $(".modal .copy-error .skip").off("click").on("click", function(b) {
                        a.meta.isfolder && (a.params.skipexisting = 1, a.params.noover = 1, l.unshift(a));
                        p()
                    }), $(".modal .copy-error .overwrite").off("click").on("click", function(b) {
                        delete a.params.noover;
                        a.params.skipexisting && delete a.params.skipexisting;
                        l.unshift(a);
                        Popup.startLoading();
                        p()
                    })) : (HFN.message(b.error, "error"), Popup.close())
                }
            }) :
                (HFN.message("Items are copied."), Popup.close())
        };
        b.find(".copy-part .butt-area").append($('<div class="button linebut greenbut modernbut">').text(a && a.revisionid ? i18n.get("Restore") : i18n.get("Copy")).on("click.copy", function(a) {
            if (-1 != c) {
                for (a = 0; a < l.length; ++a) l[a].params.tofolderid = c;
                Popup.startLoading();
                p()
            }
        })).append($('<div class="button darkbut linebut modernbut">').text(i18n.get("Cancel")).click(function() {
            Popup.close()
        }));
        console.log("#4")
    },
    waitList: {
        WAIT: 0,
        DONE: 1,
        lists: {},
        calls: {},
        run: {},
        create: function(a) {
            var b = uniqueNum.get("waitlist-");
            console.log("creating waitlist with id: ", b);
            this.lists[b] = [];
            this.calls[b] = a;
            this.run[b] = [];
            return b
        },
        addWait: function(a, b) {
            console.log("ADDING WAIT ", a);
            this.lists[a].push(this.WAIT);
            return this.run[a].push(b || !1) - 1
        },
        setDone: function(a, b) {
            console.log("SET DONE ", a, b);
            this.lists[a][b] = this.DONE;
            if (this.isReady(a)) {
                if ("function" == typeof this.calls[a]) this.calls[a]();
                this.clean(a)
            }
        },
        isReady: function(a) {
            var b = !0,
                c;
            for (c in this.lists[a])
                if (this.lists[a][c] ==
                    this.WAIT) {
                    b = !1;
                    break
                }
            return b
        },
        clean: function(a) {
            delete this.lists[a];
            delete this.calls[a]
        },
        stop: function(a) {
            for (var b in this.run[a]) this.run[a][b] && "pending" == this.run[a][b].state() && this.run[a][b].abort();
            this.clean(a)
        }
    },
    makeCopy: function(a, b) {
        HFN.message(i18n.get("Initiating a copy for ") + a + i18n.get(" to folderid: ") + b);
        Popup.close()
    },
    initMove: function(a) {
        var b = this.renderTemplate(".moveFiles"),
            c = -1,
            d = a ? [a] : FileSelection.getSelectionInfo();
        a = HFN.waitList;
        var e = a.create(Popup.stopLoading.bind(Popup)),
            f = a.addWait(e),
            g = a.addWait(e);
        Popup.open(b, {
            title: "Moving ...",
            clickClose: !1
        });
        Popup.startLoading({
            now: !0
        });
        b.find(".modal-files").empty().append(HFN.buildFilePreview(d, {
            onLoad: a.setDone.bind(a, e, f)
        }));
        d[0].encrypted ? HFN.foldersCustom.buildCryptoFolderBrowse(b.find(".dest"), {
            onSelect: function(a) {
                c = a
            },
            expandFirstLevel: !0,
            showCurrent: !0,
            onLoad: a.setDone.bind(a, e, g),
            focusCurrent: !0,
            canCreateFolders: !0,
            showNoWritePermissions: !0
        }) : HFN.foldersCustom.buildFolderBrowse(0, b.find(".dest"), {
            onSelect: function(a) {
                c =
                    a
            },
            expandFirstLevel: !0,
            showCurrent: !0,
            onLoad: a.setDone.bind(a, e, g),
            focusCurrent: !0,
            canCreateFolders: !0,
            showNoWritePermissions: !0
        });
        b.find(".butt-area").append($('<div class="button smallbut linebut greenbut modernbut">').text(i18n.get("Move")).on("click.copy", function(a) {
            if (-1 != c) {
                var b;
                a = FileSelection.getSelectionInfo();
                for (b in a)
                    if (HFN.fileExists(c, a[b])) {
                        HFN.message(htmlentities(a[b].name) + i18n.get(" already exists in the receiving folder"), "error");
                        return
                    }
                $(this).off("click.move");
                var e = function(a,
                    b) {
                    a.encrypted ? pCloudCrypto.asyncDecryptMeta(a, function(a) {
                        console.log("got decrypted", a);
                        pCloudCrypto.asyncEncryptMeta({
                            name: a,
                            parentfolderid: c
                        }, function(a) {
                            console.log("got encrypted", a);
                            b(a)
                        })
                    }) : b(a.name)
                };
                a = function(a) {
                    var b = $.Deferred();
                    e(a, function(d) {
                        console.log("got prepname", d);
                        a.isfolder ? HFN.apiMethod("renamefolder", {
                            folderid: a.folderid,
                            tofolderid: c,
                            toname: d
                        }, function(a) {
                            b.resolve()
                        }, {
                            errorCallback: function(a) {
                                HFN.message(a.error, "error");
                                Popup.stopLoading();
                                Popup.close()
                            }
                        }) : HFN.apiMethod("renamefile", {
                            fileid: a.fileid,
                            tofolderid: c,
                            toname: d
                        }, function(a) {
                            b.resolve()
                        }, {
                            errorCallback: function(a) {
                                HFN.message(a.error, "error");
                                Popup.stopLoading();
                                Popup.close()
                            }
                        })
                    });
                    return b
                };
                var f = [];
                for (b = 0; b < d.length; ++b) f.push(a(d[b]));
                $.when.apply($, f).then(function() {
                    HFN.message("Items are moved.");
                    Popup.stopLoading();
                    Popup.close()
                });
                Popup.startLoading()
            }
        })).append($('<div class="button smallbut darkbut linebut modernbut">').text(i18n.get("Cancel")).click(function() {
            Popup.stopLoading().close()
        }))
    },
    makeMove: function(a,
        b) {
        HFN.message(i18n.get("Initiating a move for ") + a + i18n.get(" to folderid: ") + b);
        this.foldersBrowse.close()
    },
    initRename: function(a) {
        var b = this.renderTemplate(".renameItem", {}, {
                escape: !0
            }),
            c, d, e, f, g = !1,
            k = a.isfolder ? "renamefolder" : "renamefile",
            l;
        b.find("input[name=rename]").val(HFN.metaName(a));
        b.find(".butt-area").append(d = $('<div class="button smallbut linebut greenbut modernbut"><img src="//d1q46pwrruta9x.cloudfront.net/img/save-share.png"> ' + i18n.get("Rename") + "</div>").on("click.rename", e = function(b) {
            f =
                $(".modal input[name=rename]").val().trim();
            l = {
                toname: f
            };
            c = function(b) {
                console.log(l);
                console.log("params: ", l);
                f.length ? a.name == f ? Popup.close() : !g && HFN.fileExists(a.parentfolderid, f) ? (Popup.close(), Popup.open(b = HFN.renderTemplate(".overWriteFile", {
                    filename: f,
                    foldername: HFN.data.fflookup["d" + a.parentfolderid].name
                }), {
                    title: "Overwrite ..."
                }), b.find(".butt-area").append($('<div class="button smallbut linebut greenbut modernbut"><img src="//d1q46pwrruta9x.cloudfront.net/img/save-share.png"> ' + i18n.get("Overwrite") +
                    "</div>").on("click.overwrite", function(a) {
                    g = !0;
                    c()
                })).append($('<div class="button smallbut linebut darkbut modernbut"><img src="//d1q46pwrruta9x.cloudfront.net/img/stop-share.png"> ' + i18n.get("Back") + "</div>").on("click", function() {
                    Popup.close();
                    HFN.initRename(a)
                }))) : (a.isfolder ? (k = "renamefolder", l.folderid = a.folderid) : (k = "renamefile", l.fileid = a.fileid), $(this).off("click.rename"), Popup.startLoading(), b = function(a) {
                    a()
                }, a.encrypted && (b = function(b) {
                    pCloudCrypto.asyncEncryptMeta({
                            name: l.toname,
                            parentfolderid: a.parentfolderid
                        },
                        function(a) {
                            l.toname = a;
                            b()
                        })
                }), b(function() {
                    HFN.apiMethod(k, l, function(b) {
                        HFN.message((a.isfolder ? i18n.get("Folder") : i18n.get("File")) + " " + i18n.get("renamed."));
                        Popup.stopLoading();
                        Popup.close()
                    }, {
                        errorCallback: function(a) {
                            HFN.message(htmlentities(a.error), "error");
                            Popup.stopLoading();
                            d.on("click.rename", e)
                        }
                    })
                })) : HFN.message("New name is requied.", "error")
            };
            c()
        })).append($('<div class="button smallbut linebut darkbut modernbut"><img src="//d1q46pwrruta9x.cloudfront.net/img/stop-share.png"> ' + i18n.get("Cancel") +
            "</div>").click(function() {
            Popup.close();
            clearOnEnter(void 0)
        }));
        Popup.open(b, {
            title: "Rename"
        });
        Popup.startLoading({
            now: !0
        });
        Popup.stopLoading();
        Popup.onLoad(function() {
            var b = $(".modal input[name=rename]");
            a.isfolder ? createSelection(b[0], 0, HFN.metaName(a).length) : createSelection(b[0], 0, HFN.metaName(a).lastIndexOf("."));
            onEnter(b, e);
            b.focus()
        })
    },
    pages: {
        current: null,
        pagesobj: {},
        jqEvent: {},
        pages: {
            home: {
                name: "home",
                ajax: "/a/home.html",
                layout: "menu1"
            },
            account: {
                title: i18n.get("Account"),
                name: "account",
                mobile: "/a/account.html",
                layout: "menu1",
                reqauth: !0
            },
            uploader: {
                title: i18n.get("Upload"),
                name: "uploader",
                mobile: "/a/upload_mobile.html",
                layout: "menu1",
                reqauth: !0
            },
            filemanager: {
                title: i18n.get("File Manager"),
                name: "filemanager",
                ajax: "/a/files.html",
                layout: "menu1",
                reqauth: !0
            },
            help: {
                name: "help",
                ajax: "/a/help.html",
                layout: "menu1",
                title: i18n.get("Help")
            },
            login: {
                name: "login",
                ajax: "/a/login.html",
                mobile: "/a/login_mob.html",
                layout: "nomenu",
                title: i18n.get("Login")
            },
            register: {
                name: "register",
                ajax: "/a/register.html",
                mobile: "/a/register_mobile.html",
                layout: "nomenu",
                title: i18n.get("Register")
            },
            shares: {
                name: "shares",
                ajax: "/a/shares.html",
                mobile: "/a/myshares_mob.html",
                layout: "menu1",
                title: i18n.get("Shares"),
                reqauth: !0
            },
            myshares: {
                name: "myshares",
                ajax: "/a/myshares.html",
                mobile: "/a/myshares_mob.html",
                layout: "menu1",
                title: i18n.get("My Shares"),
                reqauth: !0
            },
            sharedwithme: {
                name: "sharedwithme",
                ajax: "/a/sharedwithme.html",
                mobile: "/a/sharedwithme_mob.html",
                layout: "menu1",
                title: i18n.get("Shared with Me")
            },
            mylinks: {
                name: "mylinks",
                ajax: "/a/mylinks.html",
                mobile: "/a/mylinks_mob.html",
                layout: "menu1",
                title: i18n.get("My Links")
            },
            mylinkspub: {
                name: "mylinkspub",
                ajax: "/a/mylinks_pub.html",
                layout: "menu1",
                title: i18n.get("Download Links")
            },
            mylinkspup: {
                name: "mylinkspup",
                ajax: "/a/mylinks_pup.html",
                layout: "menu1",
                title: i18n.get("Upload Links")
            },
            publink: {
                name: "publink",
                ajax: "/a/publink.html",
                mobile: "/a/publink_mob.html",
                layout: "nomenu",
                title: i18n.get("Download Link")
            },
            transferlink: {
                name: "publink",
                ajax: "/a/publink.html",
                mobile: "/a/publink_mob.html",
                layout: "nomenu",
                title: i18n.get("Download Link")
            },
            puplink: {
                name: "puplink",
                ajax: "/a/puplink.html",
                layout: "menu1",
                title: i18n.get("Upload Link")
            },
            changepassword: {
                name: "changepassword",
                ajax: "/a/changepassword.html",
                layout: "nomenu",
                title: i18n.get("Change Password")
            },
            resetpassword: {
                name: "resetpassword",
                ajax: "/a/resetpassword.html",
                layout: "nomenu",
                title: i18n.get("Reset Password"),
                quiet: !0
            },
            verifymail: {
                name: "verifymail",
                ajax: "/a/verifymail.html",
                layout: "nomenu",
                title: i18n.get("Verify Mail")
            },
            acceptshare: {
                name: "acceptshare",
                ajax: "/a/acceptshare.html",
                mobile: "/a/acceptshare_mob.html",
                layout: "menu1",
                title: i18n.get("Accept Share")
            },
            plans: {
                name: "plans",
                ajax: "/a/plans.html",
                site: "/a/plans_site.html",
                layout: "menu1",
                reqauth: !0,
                title: i18n.get("Payment plans")
            },
            policies: {
                name: "policies",
                ajax: "/a/policies.html",
                mobile: "/a/policies_mob.html",
                layout: "menu1",
                reqauth: !1,
                title: i18n.get("Policies")
            },
            contact: {
                name: "contact",
                ajax: "/a/contact.html",
                site: "/a/contact_site.html",
                layout: "menu1",
                title: i18n.get("Contact")
            },
            faq: {
                name: "faq",
                ajax: "/a/faq.html",
                site: "/a/faq_site.html",
                layout: "menu1",
                title: i18n.get("FAQ")
            },
            faqsync: {
                name: "faqsync",
                ajax: "/a/faqsync.html",
                layout: "menu1",
                title: i18n.get("FAQ Sync")
            },
            ppthanks: {
                name: "ppthanks",
                ajax: "/a/ppthanks.html",
                layout: "menu1",
                title: i18n.get("Paypal - Thank you for payment")
            },
            ppfail: {
                name: "ppfail",
                ajax: "/a/ppfail.html",
                layout: "menu1",
                title: i18n.get("Paypal - Fail")
            },
            debug: {
                name: "debug",
                ajax: "/a/debug.html",
                layout: "menu1",
                title: i18n.get("Debug")
            },
            uinvite: {
                name: "uinvite",
                ajax: "/a/uinvite.html",
                layout: "menu1",
                reqauth: !0,
                title: i18n.get("Invite Users")
            },
            fimport: {
                name: "fimport",
                ajax: "/a/fimport.html",
                mobile: "/a/fimport_mobile.html",
                layout: "menu1",
                reqauth: !1,
                title: i18n.get("File Import"),
                backAfterLogin: !0,
                pageLoginAt: "register",
                pageLoginAtParams: {
                    adtext: 1
                }
            },
            pcloudmobile: {
                name: "pcloudmobile",
                ajax: "/a/pcloudmobile.html",
                layout: "menu1",
                reqauth: !1,
                title: i18n.get("pCloud Mobile")
            },
            clientsplash: {
                name: "clientsplash",
                ajax: "/a/clientsplash.html",
                layout: "menu1",
                reqauth: !1,
                title: i18n.get("pCloud Clients")
            },
            snimport: {
                name: "snimport",
                ajax: "/a/snimport.html",
                layout: "menu1",
                reqauth: !0,
                title: i18n.get("Backups")
            },
            snimport2: {
                name: "snimport2",
                ajax: "/a/snimport2.html",
                layout: "menu1",
                reqauth: !0,
                title: i18n.get("Backups")
            },
            bonussteps: {
                name: "bonussteps",
                ajax: "/a/bonussteps.html",
                layout: "menu1",
                reqauth: !0,
                title: i18n.get("Get Started")
            },
            space: {
                name: "space",
                ajax: "/a/space.html",
                layout: "menu1",
                reqauth: !0,
                title: i18n.get("Get More Space")
            },
            snsettings: {
                name: "snsettings",
                ajax: "/a/snsettings.html",
                layout: "menu1",
                reqauth: !0,
                title: i18n.get("SN Settings")
            },
            revisions: {
                name: "revisions",
                ajax: "/a/revisions.html",
                layout: "menu1",
                reqauth: !0,
                title: i18n.get("Revisions")
            },
            history: {
                name: "history",
                ajax: "/a/history.html",
                layout: "menu1",
                reqauth: !0,
                title: i18n.get("History")
            },
            trash: {
                name: "trash",
                ajax: "/a/trash.html",
                layout: "menu1",
                reqauth: !0,
                title: i18n.get("Trash")
            },
            audio: {
                name: "audio",
                ajax: "/a/audio-songs.html",
                layout: "menu1",
                reqauth: !0,
                title: __("Audio")
            },
            settings: {
                name: "settings",
                ajax: "/a/settings.html",
                layout: "menu1",
                reqauth: !0,
                title: __("Settings")
            },
            b_invite: {
                name: "b_invite",
                ajax: "/a/binvite.html",
                layout: "nomenu_business",
                reqauth: !1,
                title: __("Business Invite"),
                quiet: !0
            },
            b_activateaccount: {
                name: "b_activateaccount",
                ajax: "/a/b_activateaccount.html",
                layout: "nomenu_business",
                reqauth: !1,
                title: __("Business Activate Account"),
                quiet: !0
            },
            b_account: {
                name: "b_account",
                ajax: "/a/b_account.html",
                layout: "menu_business",
                reqauth: !0,
                reqbusiness: !0,
                title: __("Business Account")
            },
            b_users: {
                name: "b_users",
                ajax: "/a/b_users.html",
                layout: "menu_business",
                reqauth: !0,
                reqbusiness: !0,
                title: __("Business Account: Users")
            },
            b_teams: {
                name: "b_teams",
                ajax: "/a/b_teams.html",
                layout: "menu_business",
                reqauth: !0,
                reqbusiness: !0,
                title: __("Business Account: Teams")
            },
            b_team: {
                name: "b_team",
                ajax: "/a/b_team.html",
                layout: "menu_business",
                reqauth: !0,
                reqbusiness: !0,
                title: __("Business Account: Team")
            },
            b_user: {
                name: "b_user",
                ajax: "/a/b_user.html",
                layout: "menu_business",
                reqauth: !0,
                reqbusiness: !0,
                title: __("Business Account: User")
            },
            b_shares: {
                name: "b_shares",
                ajax: "/a/b_shares.html",
                layout: "menu1",
                reqauth: !0,
                reqbusiness: !0,
                title: __("Business Account: Shares")
            },
            b_shares_mn: {
                name: "b_shares",
                ajax: "/a/b_shares.html",
                layout: "menu_business",
                reqauth: !0,
                reqbusiness: !0,
                title: __("Business Account: Shares")
            },
            b_logs: {
                name: "b_logs",
                ajax: "/a/b_logs.html",
                layout: "menu_business",
                reqauth: !0,
                reqbusiness: !0,
                title: __("Business Account: Logs")
            },
            reset_crypto: {
                name: "reset_crypto",
                ajax: "/a/reset_crypto.html",
                layout: "nomenu",
                reqauth: !0,
                title: __("Reset Crypto")
            },
            crypto: {
                name: "crypto",
                ajax: "/a/crypto.html",
                layout: "menu1",
                reqauth: !0,
                title: __("Crypto Folder")
            },
            cryptolocked: {
                name: "cryptolocked",
                ajax: "/a/crypto_locked.html",
                layout: "menu1",
                reqauth: !0,
                title: __("Crypto Folder")
            },
            cryptoset: {
                name: "cryptoset",
                ajax: "/a/crypto_setup.html",
                layout: "menu1",
                reqauth: !0,
                title: __("Crypto Folder")
            },
            cryptobuy: {
                name: "cryptobuy",
                ajax: "/a/crypto_buy.html",
                layout: "menu1",
                reqauth: !0,
                title: __("Crypto Folder")
            },
            cryptomob: {
                name: "cryptomob",
                ajax: "/a/crypto_mob.html",
                layout: "menu1",
                reqauth: !0,
                title: __("Crypto Folder")
            },
            cryptosupport: {
                name: "cryptosupport",
                ajax: "/a/crypto_support.html",
                layout: "menu1",
                reqauth: !0,
                title: __("Crypto Folder")
            },
            encrypted: {
                name: "encrypted",
                ajax: "/a/encrypted.html",
                layout: "menu1",
                reqauth: !0,
                title: __("Encrypted Files")
            }
        },
        menu: [{
            title: i18n.get("Home"),
            name: "home"
        }, {
            title: i18n.get("File Manager"),
            name: "filemanager"
        }, {
            title: i18n.get("Pro"),
            name: "pro"
        }, {
            title: i18n.get("Help"),
            name: "help"
        }],
        initPage: function() {
            HFN.config.auth ? location.replace("#page=" + HFN.config.defaultPage) : location.replace("#page=login")
        },
        init: function() {
            if ($.bbq.getState("ref")) {
                var a = $.browser.mobile ? 1 : 0;
                HFN.apiMethod("recordclick", {
                    affid: $.bbq.getState("ref"),
                    referer: document.referrer,
                    mobile: a
                }, function() {});
                setcookie("ref", $.bbq.getState("ref"), 5)
            }
            $(window).on("hashchange", HFN.pages.relocate);
            this.relocate()
        },
        toAnchor: function(a) {
            return a.toLowerCase().replace(" ", "")
        },
        relocate: function(a) {
            HFN.removeAuthTokenFromUrl();
            "show" == $.bbq.getState("tutorial") ? HFN.tutorial.pages ? HFN.tutorial.show_page(0) : HFN.tutorial.load(function() {
                HFN.tutorial.show_page(0)
            }) : HFN.tutorial.close();
            Popup.close();
            HFN.megaLoad.hide();
            HFN.uploadControl.loaded && !HFN.uploadControl.minimized() &&
                HFN.uploadControl.minimize();
            HFN.audioPlayer.loaded() && !HFN.audioPlayer.isMinimized() && HFN.audioPlayer.openMinimized();
            console.log("Relocation called ", $.bbq.getState("page"), a);
            console.log("sending pageview");
            var b = HFN.pages,
                c = HFN.pages.pages[$.bbq.getState("page") || HFN.config.defaultPage] || !1;
            c && c.quiet || "undefined" != typeof ga && ga(function() {
                for (var a = ga.getAll(), b = 0; b < a.length; ++b) a[b].send("pageview", location.pathname + location.search + location.hash)
            });
            if (c)
                if (c.reqauth && !HFN.config.auth) c.backAfterLogin &&
                    HFN.setAfterLogin(), a = {
                        page: c.pageLoginAt || "login"
                    }, c.pageLoginAtParams && (a = $.extend(a, c.pageLoginAtParams)), $.bbq.pushState(a, 2);
                else if (c.reqbusiness && !HFN.config.user.account) $.bbq.pushState({
                page: HFN.config.defaultPage
            }, 2);
            else if (b.current == c.name) {
                if ("onEach" in HFN.pages.pagesobj[c.name]) HFN.pages.pagesobj[c.name].onEach()
            } else {
                a && a.stopImmediatePropagation();
                b.current && "onClose" in HFN.pages.pagesobj[b.current] && (HFN.pages.pagesobj[b.current].onClose(), HFN.pages.pagesobj[b.current] = {});
                b.current =
                    c.name;
                var d = HFN.pages.pagesobj[c.name] = {
                    css: [],
                    js: [],
                    files: []
                };
                if (c.callback) c.callback();
                else if (c[HFN.config.type] || c.ajax) {
                    a = $.bbq.getState();
                    var e = c[HFN.config.type] || c.ajax;
                    a.t = $.now;
                    $.get("/ZtQ" + e, a, function(a) {
                        b.setupLayout(c.layout);
                        $(".cnt-mn").empty().append(a);
                        var e = function() {
                            if ("onComplete" in d) d.onComplete();
                            document.title = HFN.config.label.siteName + (c.title ? " :: " + c.title : "");
                            "fimport" == HFN.pages.current && setcookie("tutfim", "1", 0);
                            $.each($("._18n"), function() {
                                var a = $(this);
                                a.is('[type="submit"]') ?
                                    a.val(i18n.get(a.val())) : a.html(i18n.get(a.html()))
                            });
                            $(b.jqEvent).trigger(c.name + ".ready", c);
                            console.log("page ready: (" + c.name + ")", c)
                        };
                        console.log("pobj: ", d);
                        if (d.css.length || d.js.length) {
                            a = HFN.waitList;
                            for (var e = a.create(e), k, l = 0; l < d.css.length; ++l) k = a.addWait(e), $.ajax({
                                url: d.css[l]
                            }).done(function(a) {
                                d.files.push($("<style>" + a + "</style>").appendTo(".cnt-mn"))
                            }).done(a.setDone.bind(a, e, k));
                            for (l = 0; l < d.js.length; ++l) k = a.addWait(e), $.ajax({
                                url: d.js[l]
                            }).done(function(a) {
                                d.files.push($('<script type="text/javascript">' +
                                    a + "\x3c/script>").appendTo(".cnt-mn"))
                            }).done(a.setDone.bind(a, e, k))
                        } else e()
                    })
                }
            } else HFN.pages.initPage()
        },
        refresh: function() {
            if (this.pagesobj[this.current].onClose) this.pagesobj[this.current].onClose();
            this.pagesobj[this.current].onComplete()
        },
        "goto": function(a, b, c) {
            if (b) $(HFN.pages.jqEvent).on(a + ".ready.goto", function() {
                setTimeout(function() {
                    b()
                }, 0);
                $(HFN.pages.jqEvent).off(a + ".ready.goto")
            });
            c = c || {};
            $.bbq.pushState($.extend({
                page: a
            }, c), 2)
        },
        setupLayout: function(a) {
            console.log("LAYOUT SETUP ", a);
            if (HFN.config.isSite()) switch (console.log("init upload"), $("html").removeClass("iframe"), $(".space").show(), $(".footer").show(), HFN.config.auth && !$.browser.mobile ? ($(".centr input").show(), HFN.config.user.premium || HFN.config.isBusiness() || !HFN.config.label.hasUpgradeInHeader ? $(".centr>a.upgrade").hide() : $(".centr>a.upgrade").show(), HFN.uploadControl.init(!0)) : $.browser.mobile || ($(".centr input").hide(), $(".centr>.gfrespace").hide(), $(".centr>a.upgrade").hide()), a) {
                case "menu1":
                    $(".main").removeClass("noleft");
                    $("html").removeClass("business");
                    HFN.left.init();
                    break;
                case "menu_business":
                    $(".main").removeClass("noleft");
                    HFN.left.init();
                    $("html").addClass("business");
                    break;
                case "nomenu_business":
                    $(".main").removeClass("noleft");
                    $("html").addClass("business");
                    $(".main").addClass("noleft");
                    break;
                case "nomenu":
                    HFN.left.destroy();
                    $("html").removeClass("business");
                    $(".main").addClass("noleft");
                    break;
                case "header_mini":
                    HFN.left.destroy(), $(".main").addClass("noleft"), $(".footer").hide(), $(".centr input").hide(),
                    $(".centr>.gfrespace").hide(), $(".centr>a.upgrade").hide(), $(".space").hide(), $("html").addClass("iframe"), $("html").removeClass("business")
            }
        }
    },
    share: {},
    setNavSel: function(a) {
        $(".nav a.active").removeClass("active");
        $('.nav a:contains("' + a + '")').addClass("active")
    },
    param: function(a, b) {
        return $.bbq.getState(a, !0) || (b ? 0 : "")
    },
    cache: {
        defaultExpiry: 30,
        cacheObj: {},
        cacheid: function(a) {
            var b = a,
                c = 0;
            if (1 < arguments.length && "object" == typeof arguments[1])
                for (c in arguments[1]) b += "-" + c + ":" + arguments[1][c];
            else
                for (c =
                    1; c < arguments.length; ++c) b += "-" + arguments[c];
            return b
        },
        get: function(a) {
            if (this.has(a)) return this.cacheObj[a].data;
            this.clean();
            return !1
        },
        has: function(a) {
            return a in this.cacheObj && this.cacheObj[a].expiry > $.now()
        },
        getOrSet: function(a, b, c) {
            this.has(a) || this.set(a, b, c);
            return this.get(a)
        },
        set: function(a, b, c) {
            c = c || this.defaultExpiry;
            this.cacheObj[a] = {
                expiry: $.now() + 1E3 * c,
                data: b
            }
        },
        expire: function(a) {
            console.log("expiring: ", a);
            a in this.cacheObj && delete this.cacheObj[a]
        },
        expireMatch: function(a) {
            for (var b in this.cacheObj) b.match(a) &&
                this.expire(b)
        },
        clean: function() {
            for (var a in this.cacheObj) this.cacheObj[a].expiry < $.now() && delete this.cacheObj[a]
        },
        cleanAll: function() {
            this.cacheObj = {}
        }
    },
    megaLoad: {
        obj: null,
        show: function() {
            this.hide();
            this.obj = $('<div class="megaload"><img src="//d1q46pwrruta9x.cloudfront.net/img/loading.gif"></div>').appendTo(document.body);
            HFN.positionCenter(this.obj);
            $(".cnt-mn").css("visibility", "hidden");
            $(".footer").css("visibility", "hidden");
            $(".fbreadcrumb span div.gear .imggear").css("visibility", "hidden");
            Overlay.show(null, null, !1);
            $("html").addClass("modal-open");
            return this
        },
        hide: function() {
            this.obj && (this.obj.remove(), this.obj = null);
            $(".cnt-mn").css("visibility", "visible");
            $(".footer").css("visibility", "visible");
            $(".fbreadcrumb span div.gear .imggear").css("visibility", "visible");
            $("html").removeClass("modal-open");
            Overlay.hide();
            return this
        }
    },
    positionCenter: function(a) {
        var b = a.outerWidth(),
            c = a.outerHeight(),
            b = $(window).width() / 2 - b / 2,
            c = ($(window).height() - c) / 2 + $(window).scrollTop();
        a.css({
            left: b +
                "px",
            top: c + "px",
            position: "absolute"
        })
    },
    calcVideoSize: function(a, b) {
        var c = 640 / 360,
            d, e;
        a / b > c ? (e = b, d = b * c) : (d = a, e = a / c);
        return [Math.round(d), Math.round(e)]
    },
    thToProperSize: function(a) {
        if (a % 4 || a % 5) {
            do a--; while (a % 4 || a % 5)
        }
        return a
    },
    calcImageSize: function(a, b, c, d, e, f) {
        console.log("image size: ", arguments);
        var g = [e || 16, f || 16],
            k = [2048, 2048],
            l = [c || $(window).outerWidth() - 200, d || $(window).outerHeight() - 100],
            m = Math.min(1 * Math.max(g[0], a), k[0], 1 * l[0]),
            g = Math.min(1 * Math.max(g[1], b), k[1], 1 * l[1]),
            q, r, k = function(a) {
                if (a %
                    4 && a % 5) {
                    do a--; while (a % 4 && a % 5)
                }
                return a
            };
        console.log("#1", a, q, b, r);
        console.log("#2", a, b, m, g);
        m / g < a / b ? (q = m, r = Math.round(m / a * b)) : (r = g, q = Math.round(g / b * a));
        a < q && (q = a, r = b);
        console.log("#3", a, b, q, r);
        console.log(a, q, b, r);
        console.log("source ", a, b, "result ", k(q), k(r));
        return [k(q), k(r)]
    },
    gallery: {
        name: "gallery",
        list: null,
        items: [],
        data: [],
        obj: null,
        slideshow: null,
        slideshowTo: null,
        defaultOpts: {
            current: -1,
            code: !1,
            prevTitle: ""
        },
        opts: {},
        init: function(a, b) {
            this.opts.code && !b.code && delete this.opts.code;
            this.list =
                a;
            this.opts = $.extend({}, this.defaultOpts, this.opts, b, {
                current: this.opts && this.opts.current ? this.opts.current : -1
            });
            this.opts.prevTitle = document.title;
            if (this.isOpen()) return this.resetItems(), this.addNavigation(), this;
            this.items = [];
            this.obj = HFN.renderTemplate(HFN.config.isMobile() ? "#darkboxmobile" : "#darkbox").addClass(this.name).hide().appendTo(document.body);
            this.obj.find(".navigation").disableSelection();
            this.addNavigation();
            this.opts.code && (this.obj.find(".opts").remove(), this.obj.find(".share").remove());
            return this
        },
        addNavigation: function() {
            if (1 < this.list.length) {
                if (this.obj.addClass("hasnav"), this.obj.find(".prev").on("click", this.prev.bind(this)), this.obj.find(".next").on("click", this.next.bind(this)), "gallery" == this.name) {
                    var a = this;
                    this.obj.find(".slideshow-ctrl").show();
                    this.obj.find(".slideshow-ctrl input.but").off("click").on("click", function(b) {
                        b = parseInt(a.obj.find("select[name=slide-seconds]").val());
                        var c = a.obj.find("input[name=slide-repeat]").prop("checked") ? !0 : !1;
                        console.log(b); - 1 ==
                            [3, 5, 7, 12].indexOf(b) && (b = 3);
                        a.opts.sliderepeat = c;
                        a.opts.slideseconds = b;
                        a.opts.slideshowplay = !0;
                        a.slideshowOn()
                    })
                }
            } else this.obj.find(".slideshow-ctrl").hide()
        },
        resetItems: function() {
            for (var a = 0; a < this.items.length; ++a) this.data[a] = {
                loaded: 0
            }
        },
        appendList: function(a) {
            var b = 0;
            a: for (; b < a.length; ++b) {
                for (var c = 0; c < this.list.length; ++c)
                    if (this.list[c].id == a[b].id) continue a;
                this.list.push(a[b])
            }
        },
        extendItems: function(a) {
            if (!(a < this.items.length))
                for (var b = this.items.length; b < a; ++b) this.items.push(null)
        },
        open: function(a) {
            console.log("OPENING: ", a, this);
            for (var b = 0; b < this.list.length; ++b) this.list[b].id == a.id && this.go(b)
        },
        go: function(a, b) {
            console.log("go: ", a, this.opts.current);
            this.obj.stop(!0); - 1 != this.opts.current && $(this.items[this.opts.current]).trigger("itemClose");
            this.emptyPlace();
            this.opts.current = a;
            console.log("this ", this.opts.current, a);
            this.startLoading();
            this.show();
            console.log("ID IS", this.list[a].id);
            daGrid && daGrid.selectById && daGrid.selectById(this.list[a].id);
            var c = this;
            this.preloadItem(a,
                function() {
                    c.showItem(a, b);
                    c.preloadItem(c.nextAfter(a), function() {
                        c.preloadItem(c.nextAfter(c.nextAfter(a)))
                    });
                    c.preloadItem(c.prevBefore(a), function() {
                        c.preloadItem(c.prevBefore(c.prevBefore(a)))
                    })
                });
            this.showItemInfo(a)
        },
        prev: function(a) {
            1 != this.list.length && this.go(0 == this.opts.current ? this.list.length - 1 : this.opts.current - 1, a || {})
        },
        next: function(a) {
            1 != this.list.length && this.go(this.opts.current == this.list.length - 1 ? 0 : this.opts.current + 1, a || {})
        },
        nextAfter: function(a) {
            return a == this.list.length -
                1 ? 0 : a + 1
        },
        prevBefore: function(a) {
            return 0 == a ? this.list.length - 1 : a - 1
        },
        preloadItems: function(a) {
            for (var b = Math.max(0, a - 2); b <= Math.min(this.list.length - 1, a + 2); ++b) a != b && this.preloadItem(b)
        },
        isLoaded: function(a) {
            return this.data[a] && this.data[a].loaded
        },
        setLoaded: function(a) {
            this.data[a] = {
                loaded: 1
            }
        },
        preloadItem: function(a, b) {
            b = b || function() {};
            this.isLoaded(a) ? b(a) : (this.data[a] = {
                loaded: 0
            }, this.loadItemUrl(a, function(a) {
                b()
            }))
        },
        emptyPlace: function() {
            this.obj.find(".img").empty()
        },
        stopOthers: function() {
            var a,
                b = this;
            console.log("ITEMS ARE: ", this.items);
            for (a in this.items) this.isLoaded(a) || (console.log("REMOVING EVENT ", a), console.log("DATA LOADED ", a, this.isLoaded(a)), $(this.items[a]).off("load").on("load", function() {
                console.log("LOADED OTHER", a, this.src);
                b.setLoaded(a)
            }))
        },
        loadItemUrl: function(a, b) {
            var c = screen.availWidth - (HFN.config.isSite(), 0),
                d = screen.availHeight - 0;
            HFN.config.isMobile() && $.browser.mobile && $.browser.iphone && $.browser.safari && $(window).outerWidth() < $(window).outerHeight() ? d = screen.availHeight -
                100 - 20 : HFN.config.isSite();
            var e = this.list[a],
                f = e.width && e.height ? HFN.calcImageSize(e.width, e.height, c, d, 620, 360) : [620, 360],
                g = this;
            b = b || function() {};
            console.log("DA SIZE", f);
            if (e.category == HFN.CATEGORY.IMAGE) {
                var k = function(c) {
                        console.log("prep image ", c);
                        g.items[a] = new Image;
                        g.items[a].src = c;
                        $(g.items[a]).off("load").on("load", function(c) {
                            console.log("LOADED IMG: ", a, this.src);
                            g.setLoaded(a);
                            b(a);
                            $(this).off("load")
                        })
                    },
                    l = ["tif", "nex"];
                e.thumb && e.width && 16 <= e.width && e.height && 16 <= e.height && f[0] &&
                    f[1] || -1 != l.indexOf(fileext(e.name)) || e.thumb && 2097152 < e.size ? (f = {
                        fileid: e.fileid,
                        size: f[0] + "x" + f[1],
                        hashCache: e.hash
                    }, l = this.opts.code ? "getpubthumblink" : "getthumblink", this.opts.code && (f.code = this.opts.code), e.revisionid && (f.revisionid = e.revisionid), "png" == fileext(this.list[a].name) && (f.type = "png"), console.log("image params", f), HFN.apiMethod(l, f, function(a) {
                        k(HFN.prepUrl(a))
                    })) : HFN.getFileLinkBack(e, function(a) {
                        k(a)
                    }, {
                        code: this.opts.code || !1
                    })
            } else if (e.category == HFN.CATEGORY.VIDEO) {
                var f = new batchApiCall({
                        continueOnError: !0
                    }),
                    m = {
                        fileid: e.fileid,
                        contenttype: "video/mp4"
                    },
                    l = "getvideolinks",
                    c = HFN.config.isMobile() ? HFN.calcVideoSize(Math.min(630, c), Math.min(360, d)) : HFN.calcVideoSize(Math.max(630, c), Math.max(360, d)),
                    c = {
                        fileid: e.fileid,
                        size: HFN.thToProperSize(c[0]) + "x" + HFN.thToProperSize(c[1])
                    },
                    d = "getthumblink",
                    g = this;
                this.opts.code && (l = "getpubvideolinks", d = "getpubthumblink", m.code = this.opts.code, c.code = this.opts.code);
                e.revisionid && (m.revisionid = e.revisionid, c.revisionid = e.revisionid);
                f.addCall(l, m);
                f.addCall(d, c);
                f.execute(function(c) {
                    var d = {
                        videoUrls: [],
                        tech: "flash"
                    };
                    c[1].ret.status || (d.thumbUrl = c[1].ret.status ? !1 : HFN.prepUrl(c[1].ret));
                    var f = HFN.findSubForVideo(e.parentfolderid, e.name, g.opts.code || !1);
                    f.length && (d.subUrl = "/bin/" + (g.opts.code ? "getpubtextfile" : "gettextfile") + "?fileid=" + f[0].fileid + (g.opts.code ? "&code=" + g.opts.code : "&auth=" + HFN.config.auth));
                    g.items[a] = d;
                    1 < c[0].ret.variants.length ? (d.videoUrls.push({
                            quality: __("Low"),
                            url: vLinks.getLowestUrl(c[0].ret.variants),
                            type: "video/mp4"
                        }), !$.browser.mobile && 2 < c[0].ret.variants.length &&
                        d.videoUrls.push({
                            quality: __("High"),
                            url: vLinks.getBestUrl(c[0].ret.variants),
                            type: "video/mp4"
                        }), g.setLoaded(a), b()) : g.opts.code ? (d.videoUrls.push({
                        quality: "Original",
                        url: vLinks.getOriginalUrl(c[0].ret.variants),
                        type: "video/mp4"
                    }), g.setLoaded(a), b()) : HFN.apiMethod("getvideolink", m, function(c) {
                        d.videoUrls.push({
                            quality: "Live",
                            url: HFN.prepUrl(c),
                            type: "video/mp4"
                        });
                        g.setLoaded(a);
                        b()
                    })
                })
            } else e.category == HFN.CATEGORY.AUDIO && (f = {
                    fileid: e.fileid,
                    hashCache: e.hash
                }, l = this.opts.code ? "getpublinkdownload" :
                "getfilelink", g = this, "mp3" != fileext(e.name) && (l = this.opts.code ? "getpubaudiolink" : "getaudiolink"), this.opts.code && (f.code = this.opts.code), e.revisionid && (f.revisionid = e.revisionid), HFN.apiMethod(l, f, function(c) {
                    g.items[a] = {
                        url: HFN.prepUrl(c)
                    };
                    g.setLoaded(a);
                    b()
                }))
        },
        showItem: function(a, b) {
            if (this.items[a] && this.opts.current == a) {
                var c = [],
                    c = this.list[a].category == HFN.CATEGORY.IMAGE ? [this.items[a].width, this.items[a].height] : [640, 360],
                    d, e;
                HFN.config.isSite() ? this.slideshow ? (d = $(window).outerWidth(), e = $(window).outerHeight()) :
                    (d = $(window).outerWidth() - 100, e = $(window).outerHeight() - 130) : (d = $(window).outerWidth(), e = $(window).outerHeight() - 100);
                HFN.config.isMobile() && $.browser.mobile && $.browser.iphone && $.browser.safari && $(window).outerWidth() < $(window).outerHeight() && (e = screen.availHeight - 100 - 20);
                c[0] = Math.min(d, c[0]);
                c[1] = Math.min(e, c[1]);
                console.log("lightsize", c);
                this.slideshow || (e += 10);
                this.obj.find(".img").css({
                    height: e
                });
                $(this.items[a]).data("showed");
                this.appendItem(a, c[0], c[1], b)
            }
        },
        showItemInfo: function(a) {
            var b =
                retinaSrc("/img/full-photo-icon.png");
            this.list[a].category == HFN.CATEGORY.VIDEO ? b = retinaSrc("/img/full-videos-icon.png") : this.list[a].category == HFN.CATEGORY.AUDIO && (b = retinaSrc("/img/full-audios-icon.png"));
            this.obj.find(".dark-title").html('<img src="' + b + '" width="24" height="22"> ' + htmlentities(HFN.strFit(this.list[a].name, 75)));
            this.obj.find(".current").text(a + 1 + " " + i18n.get("of") + " " + this.list.length)
        },
        imgContain: function(a, b, c, d) {
            console.log("contain", a, b, c, d);
            if (a <= c && b <= d) return [a, b];
            a / b > c /
                d ? (d = c, c /= a / b) : (c = d, d *= a / b);
            return [d, c]
        },
        resizeItem: function() {
            if (-1 != this.opts.current && this.items[this.opts.current]) {
                var a = this.opts.current,
                    b = [this.items[a].width, this.items[a].height],
                    c, d;
                HFN.config.isSite() ? this.slideshow ? (c = $(window).outerWidth(), d = $(window).outerHeight()) : (c = $(window).outerWidth() - 100, d = $(window).outerHeight() - 130) : (c = $(window).outerWidth(), d = $(window).outerHeight() - 100);
                b[0] = Math.min(c, b[0]);
                b[1] = Math.min(d, b[1]);
                console.log("lightsize", b);
                d = this.slideshow ? "100%" : d + 10;
                this.obj.find(".img").css({
                    height: d
                });
                c = this.items[a].width;
                d = this.items[a].height;
                b = this.imgContain(c, d, b[0], b[1] - 10);
                c = b[0];
                d = b[1];
                this.obj.find(".img img").css({
                    width: c || this.items[a].width,
                    height: d || this.items[a].height,
                    marginTop: "-" + (d || this.items[a].height) / 2 + "px",
                    marginLeft: "-" + (c || this.items[a].width) / 2 + "px"
                });
                this.obj.find(".img .checkeredbackground").css({
                    width: c || this.items[a].width,
                    height: d || this.items[a].height,
                    marginTop: "-" + (d || this.items[a].height) / 2 + "px",
                    marginLeft: "-" + (c || this.items[a].width) / 2 + "px"
                });
                size = HFN.calcVideoSize(Math.max(630,
                    this.obj.find(".img").width() - 100), Math.max(360, this.obj.find(".img").height() - 100));
                this.obj.find(".img .vidholder").css({
                    width: size[0],
                    height: size[1],
                    "margin-top": (this.obj.find(".img").height() - size[1]) / 2
                })
            }
        },
        appendItem: function(a, b, c, d) {
            d = $.extend({}, {
                onDone: function() {}
            }, d);
            var e = this.list[a],
                f = this;
            if (e && this.items[a] && this.opts.current == a) {
                this.obj.find(".img").empty();
                this.obj.find(".gtitle").empty();
                if (e.category == HFN.CATEGORY.IMAGE) {
                    var g = this.items[a].width,
                        k = this.items[a].height;
                    b = this.imgContain(g,
                        k, b, c);
                    console.log("img contain", b);
                    g = b[0];
                    k = b[1];
                    this.obj.find(".img").append($('<div class="checkeredbackground"></div>').css({
                        width: g || this.items[a].width,
                        height: k || this.items[a].height
                    }).append('<img src="' + this.items[a].src + '" width="' + (g || this.items[a].width) + '" height="' + (k || this.items[a].height) + '">'));
                    this.obj.find(".img img, .img .checkeredbackground").css({
                        marginTop: "-" + (k || this.items[a].height) / 2 + "px",
                        marginLeft: "-" + (g || this.items[a].width) / 2 + "px"
                    });
                    this.obj.find(".img img, .img .checkeredbackground").on("dragstart.gal",
                        function(a) {
                            a.preventDefault()
                        })
                } else e.category == HFN.CATEGORY.VIDEO ? (b = HFN.config.isMobile() ? HFN.calcVideoSize(Math.min(630, this.obj.find(".img").width() - 100), Math.min(360, this.obj.find(".img").height() - 100)) : HFN.calcVideoSize(Math.max(630, this.obj.find(".img").width() - 100), Math.max(360, this.obj.find(".img").height() - 100)), c = (this.obj.find(".img").height() - b[1]) / 2, this.obj.find(".img").append('<div class="vidholder" style="margin: ' + c + "px auto 0 auto; width: " + b[0] + "px; height: " + b[1] + 'px"></div>'),
                    console.log("VID SIZE", b), console.log("VID STUFF", this.items[a]), b = this.items[a].thumbUrl, c = this.items[a].videoUrls, k = this.items[a].tech, g = "vid-" + uniqueNum.get(), f = this, g = {
                        selector: this.obj.find(".vidholder"),
                        type: "video",
                        autoPlay: !0,
                        media: c,
                        tech: k,
                        sources: c,
                        name: g,
                        width: "100%",
                        height: "100%",
                        callback: function(b) {
                            $(f.items[a]).data("loaded", 1).off("itemClose").on("itemClose", function(a) {
                                jwplayer().pause();
                                jwplayer().remove();
                                document.title = f.opts.prevTitle
                            });
                            jwplayer().onPlay(function(a) {
                                document.title =
                                    String.fromCharCode(9654) + " " + e.name + " - pCloud"
                            });
                            jwplayer().onPause(function(a) {
                                document.title = document.title.substring(2)
                            });
                            jwplayer().onComplete(function(a) {
                                document.title = document.title.substring(2);
                                setTimeout(function() {
                                    f.next()
                                }, 200)
                            })
                        }
                    }, this.items[a].subUrl && (g.subUrl = this.items[a].subUrl), b && (g.poster = b), HFN.player.load(g)) : e.category == HFN.CATEGORY.AUDIO && (b = [Math.min(480, this.obj.find(".img").width() - 100), 30], c = (this.obj.find(".img").height() - b[1]) / 2, this.obj.find(".img").append('<div class="vidholder" style="border: none; margin: ' +
                    c + "px auto 0 auto; width: " + b[0] + "px; height: " + b[1] + 'px"></div>'), b = this.items[a].url, f = this, g = {
                    selector: this.obj.find(".vidholder"),
                    type: "audio",
                    autoPlay: !0,
                    url: b,
                    name: g,
                    width: "100%",
                    height: "100%",
                    callback: function(b) {
                        $(f.items[a]).data("loaded", 1).off("itemClose").on("itemClose", function(a) {
                            jwplayer().pause();
                            jwplayer().remove();
                            document.title = f.opts.prevTitle
                        });
                        jwplayer().onPlay(function(a) {
                            document.title = String.fromCharCode(9654) + " " + e.name + " - pCloud"
                        });
                        jwplayer().onPause(function(a) {
                            document.title =
                                document.title.substring(2)
                        });
                        jwplayer().onComplete(function(a) {
                            document.title = document.title.substring(2);
                            setTimeout(function() {
                                f.next()
                            }, 200)
                        })
                    }
                }, HFN.player.loadAudio(g));
                d.onDone();
                f = this;
                if (HFN.config.isSite() || HFN.config.isPublinkSite()) this.obj.find(".download").off("click.dwld").on("click.dwld", function(b) {
                        b = "getfilelink";
                        var c = {
                            fileid: f.list[a].fileid,
                            forcedownload: !0
                        };
                        f.opts.code && (b = "getpublinkdownload", c.code = f.opts.code);
                        HFN.apiMethod(b, c, function(a) {
                            window.open(HFN.prepUrl(a))
                        }, {
                            async: !1
                        })
                    }),
                    f.opts.code || (HFN.renderTemplate("#darkboxshare"), d = HFN.renderTemplate("#darkboxopts"), d.addClass(f.name), this.list[a].revisionid || !this.list[a].ismine ? this.obj.find(".opts").hide() : (this.obj.find(".opts").show(), popOver.attach({
                        el: this.obj.find(".opts"),
                        pos: "top",
                        align: HFN.config.isRtl() ? "left" : "right",
                        valign: !1,
                        trigger: "click",
                        obj: d
                    }), this.obj.find(".opts").data("popover").off("click.gal").on("click.gal", "a", function(b) {
                        b.stopPropagation(); - 1 != "download downloadsizes getpublink copy move rename info revisions openloc delete".split(" ").indexOf($(this).data("action")) &&
                            (f.destroy(), Overlay.show());
                        popOver.closeAll();
                        handleContextMenuClick(this, f.list[a])
                    })), this.list[a].revisionid || !this.list[a].ismine ? this.obj.find(".share").hide() : (this.obj.find(".share").show(), this.obj.find(".share").off("click").on("click", function(b) {
                        console.log("get or create", f.list[a]);
                        HFN.getOrCreatePublink(f.list[a], function(a) {
                            f.destroy();
                            popOver.closeAll();
                            console.log("opening link", a);
                            HFN.sharePublink(a)
                        }, {
                            async: !1
                        })
                    })));
                $(this.items[a]).data("showed", 1);
                this.stopLoading()
            }
        },
        slideshowOn: function() {
            if ("gallery" ==
                this.name) {
                var a = this.obj;
                a.find(".img").height();
                var b = this;
                a.addClass("slideshow");
                a.find(".dark-topbar").fadeOut(300);
                a.find(".dark-toolbar").fadeOut(300);
                a.find(".img").data("height", a.find(".img").height()).css({
                    height: "100%",
                    top: 0
                });
                this.slideshow = 1;
                this.slideshowTo && (clearTimeout(this.slideshowTo), this.slideshowTo = null);
                console.log("SEC TIME", 1E3 * this.opts.slideseconds);
                this.slideshowTo = setTimeout(this.slideshowNext.bind(this), 1E3 * this.opts.slideseconds);
                reqFullscreen(this.obj.get(0)); - 1 !=
                    this.opts.current && this.showItem(this.opts.current, {
                        onDone: function() {
                            setTimeout(function() {
                                a.off(".slide").on("mousemove.slide", function(c) {
                                    c.stopPropagation();
                                    a.find(".dark-topbar").fadeIn(100);
                                    a.find(".dark-toolbar").fadeIn(100);
                                    b.slideshowMoveTo && (clearTimeout(b.slideshowMoveTo), b.slideshowMoveTo = null);
                                    b.slideshowMoveTo = setTimeout(function() {
                                        a.find(".dark-topbar").fadeOut(400);
                                        a.find(".dark-toolbar").fadeOut(400)
                                    }, 1500)
                                })
                            }, 200)
                        }
                    });
                $(window).on("keyup.slide", function(a) {
                    console.log("key up");
                    var d =
                        function(a) {
                            var c = b.obj.find(".slideshow-msg");
                            c.stop().show().text(a).css({
                                opacity: 1
                            }).animate({
                                opacity: 0
                            }, 2500, function() {
                                c.hide()
                            })
                        };
                    32 == a.keyCode && (b.opts.slideshowplay = !b.opts.slideshowplay, !b.opts.slideshowplay && b.slideshowTo ? (d("Paused"), clearTimeout(b.slideshowTo), b.slideshowTo = null) : (d("Play"), b.slideshowTo = setTimeout(b.slideshowNext.bind(b), 1E3 * b.opts.slideseconds)))
                })
            }
        },
        slideshowNext: function() {
            var a = this.obj,
                b = this,
                c = this.nextAfter(this.opts.current);
            this.slideshowTo && (clearTimeout(this.slideshowTo),
                this.slideshowTo = null);
            this.isLoaded(c) ? (0 != c || b.opts.sliderepeat ? (a.off(".slide"), this.next({
                onDone: function() {
                    setTimeout(function() {
                        if (b.slideshow) a.off(".slide").on("mousemove.slide", function(c) {
                            c.stopPropagation();
                            a.find(".dark-topbar").show();
                            a.find(".dark-toolbar").show();
                            b.slideshowMoveTo && (clearTimeout(b.slideshowMoveTo), b.slideshowMoveTo = null);
                            b.slideshowMoveTo = setTimeout(function() {
                                a.find(".dark-topbar").fadeOut(400);
                                a.find(".dark-toolbar").fadeOut(400)
                            }, 1500)
                        })
                    }, 200)
                }
            }), console.log("SET SEC #2",
                1E3 * this.opts.slideseconds)) : console.log("repeat off. end of the line;"), this.slideshowTo = setTimeout(this.slideshowNext.bind(this), 1E3 * this.opts.slideseconds)) : (this.slideshowTo = setTimeout(this.slideshowNext.bind(this), 100), void 0 == this.data[c] && this.preloadItem(c), console.log("not loaded, waiting for", this.list[c].name))
        },
        slideshowOff: function() {
            console.log("SLIDE OFF");
            var a = this.obj,
                b = a.find(".img");
            this.slideshowTo && (clearTimeout(this.slideshowTo), this.slideshowTo = null);
            this.slideshowMoveTo &&
                (clearTimeout(this.slideshowMoveTo), this.slideshowMoveTo = null);
            cancelFullscreen();
            $(window).off(".slide");
            a.removeClass("slideshow");
            a.off(".slide");
            a.find(".dark-topbar").show(300);
            a.find(".dark-toolbar").show(300);
            a.find(".slideshow-msg").hide();
            b.css({
                top: "60px",
                height: b.data("height")
            });
            this.slideshow = null; - 1 != this.opts.current && this.showItem(this.opts.current)
        },
        resetPosition: function() {
            this.obj.css({
                width: "",
                height: ""
            });
            var a = this.obj.outerWidth(),
                b = this.obj.outerHeight();
            this.obj.css({
                marginTop: -1 *
                    b / 2 + "px",
                marginLeft: -1 * a / 2 + "px"
            })
        },
        destroy: function() {
            "gallery" == this.name && this.slideshow && this.slideshowOff(); - 1 != this.opts.current && $(this.items[this.opts.current]).trigger("itemClose");
            for (var a in this.items) $(this.items[a]).removeData(), $(this.items[a]).remove();
            this.items = [];
            this.data = [];
            this.isOpen() && Overlay.hide();
            $(window).off(".lightbox");
            this.obj.hide();
            this.emptyPlace();
            this.resetPosition();
            this.obj.css({
                marginTop: "",
                marginLeft: ""
            });
            this.obj.find(".opts").data("popover") && this.obj.find(".opts").data("popover").off(".gal");
            this.obj.find(".share").data("popover") && this.obj.find(".share").data("popover").off(".gal");
            HFN.config.isMobile() && (HFN.panel.swipeOn(), $(window).off(".darkbox"));
            return this
        },
        reset: function() {
            this.list = [];
            this.obj && (this.destroy(), this.obj.removeData(), this.obj.remove(), this.obj = null)
        },
        show: function() {
            var a = this;
            this.obj.find(".dark-close").off("click").on("click", function(b) {
                a.slideshow ? a.slideshowOff() : a.destroy()
            });
            if ((HFN.config.isSite() || 1) && "videogallery" != a.name) $(window).off("keyup.lightbox").on("keyup.lightbox",
                function(b) {
                    b.preventDefault();
                    27 === b.keyCode ? a.slideshow ? a.slideshowOff() : a.destroy() : 37 == b.keyCode || 38 == b.keyCode ? a.prev() : 39 != b.keyCode && 40 != b.keyCode || a.next();
                    a.slideshow && -1 != [37, 38, 39, 40].indexOf(b.keyCode) && (a.slideshowTo && (clearTimeout(a.slideshowTo), a.slideshowTo = null), a.slideshowTo = setTimeout(a.slideshowNext.bind(a), 1E3 * a.opts.slideseconds))
                });
            HFN.config.isMobile() && (HFN.panel.swipeOff(), $(window).off(".darkbox"), $(window).on("swipeleft.darkbox", function(b) {
                    b.stopPropagation();
                    a.next()
                }),
                $(window).on("swiperight.darkbox", function(b) {
                    b.stopImmediatePropagation();
                    a.prev()
                }), $(window).on("orientationchange.darkbox", function(b) {
                    "videogallery" == a.name && "PLAYING" == jwplayer().getState() || a.go(a.opts.current)
                }));
            if (HFN.config.isSite()) {
                this.obj.find(".img").on("click", function(b) {
                    a.slideshow || (console.log("!CLOSE", b), $(b.target).hasClass("img") && "div" == b.target.tagName.toLowerCase() && a.destroy())
                });
                var b = null;
                $(window).off("resize.lightbox").on("resize.lightbox", function(c) {
                    b && (clearTimeout(b),
                        b = null);
                    console.log("resize");
                    b = setTimeout(function() {
                        -1 != a.opts.current && a.resizeItem()
                    }, 300)
                })
            }
            this.obj.show();
            Overlay.show(250, this.destroy.bind(this))
        },
        isOpen: function() {
            return this.obj && "block" == this.obj.css("display")
        },
        startLoading: function() {
            this.stopLoading();
            this.obj.addClass("loading").append('<div class="loading"></div>');
            return this
        },
        stopLoading: function() {
            this.obj.removeClass("loading");
            this.obj.find(".loading").remove();
            return this
        }
    },
    videoGallery: {},
    audio: {
        defaults: {
            originalFile: "",
            fileUrl: "",
            place: "",
            autostart: !1,
            shuffles: !1,
            onReady: function() {}
        },
        play: function(a) {
            a = $.extend({}, this.defaults, a);
            $(a.place).empty();
            $(a.place).append('<audio src="' + a.fileUrl + '"></audio>');
            var b = $(a.place + " audio")[0],
                c = "auto";
            canPlayAudio() || (c = "shim");
            console.log("playmode", c, $.browser.mozilla, fileext(a.fileUrl).toLowerCase());
            new MediaElement(b, {
                plugins: ["flash"],
                pluginPath: "/swf/",
                mode: c,
                success: function(b) {
                    b.play();
                    b.setVolume(0.01);
                    a.onReady(b)
                }
            })
        }
    },
    audioPlayer: {
        obj: null,
        metas: {},
        data: {},
        shufflelist: [],
        current: -1,
        playlistObj: null,
        defaults: {
            onReady: function() {},
            asMinimized: !1,
            playlist: !1,
            metas: {},
            shuffle: !1
        },
        opts: {},
        setup: function(a, b) {
            alert("setup called");
            this.metas = a;
            $.extend(this.opts, b || {})
        },
        init: function(a) {
            a = $.extend({}, this.defaults, a);
            if (this.obj) a.asMaximized && this.open();
            else if (console.log("da opts", a), HFN.config.isSite() || HFN.config.isPublinkSite()) {
                this.obj = HFN.renderTemplate("#audioplayer");
                this.obj.appendTo(document.body);
                this.obj.find(".maximize").on("click", this.maximize.bind(this));
                this.obj.find(".minimize").on("click", this.minimize.bind(this));
                this.obj.find(".close").on("click", this.destroy.bind(this));
                this.current = -1;
                this.setupControlsInit();
                console.log(a.playlist);
                if (a.playlist)
                    for (var b = 0; b < a.playlist.contents.length; ++b) this.metas[a.playlist.contents[b].id] = a.playlist.contents[b];
                obLength(this.metas);
                this.buildPlaylist(a.playlist || !1);
                a.asMinimized ? this.openMinimized() : this.open();
                this.setupPositionEvents();
                this.setupBottomBar();
                this.opts.prevTitle = document.title
            }
        },
        buildPlaylistMeta: function(a) {
            this.obj.find(".plistinfo").empty();
            a && a.name && this.obj.find(".plistinfo").text('"' + a.name + '"')
        },
        buildPlaylist: function(a) {
            this.obj.find(".playlist").empty();
            var b = this,
                c;
            for (c in this.metas) this.buildPlaylistItem(c);
            this.obj.find(".playlist").sortable({
                handle: ".draghandler",
                axis: "y",
                change: function(a, c) {
                    b._playlistUpdated()
                }
            }).disableSelection();
            this.buildPlaylistMeta(a);
            this.setupResize()
        },
        buildPlaylistItem: function(a) {
            var b = this,
                c = this.obj.find(".playlist"),
                c = $('<li><span class="draghandler"><img src="//d1q46pwrruta9x.cloudfront.net/img/move-songs.png"></span><div class="iconwrap"><img src="//d1q46pwrruta9x.cloudfront.net/img/icons/20/audio.png" class="listicon"></div><span class="name"></span><span class="remove"><img src="//d1q46pwrruta9x.cloudfront.net/img/delete-song.png"></span></li>').data("n",
                    a).appendTo(c).on("click", function(c) {
                    $(c.target).hasClass("draghandler") || $(c.target).parent().hasClass("draghandler") || b.go(a)
                });
            this.metas[a].thumb && setupThumb(c.find(".listicon"), this.metas[a], HFN.ICONS.LIST, this.metas[a].code || !1);
            c.find(".name").text(HFN.strFit(this.audioName(this.metas[a]), 60));
            c.find(".remove").on("click", function(c) {
                c.stopPropagation();
                b.remove(a)
            })
        },
        appendPlaylistItem: function(a, b) {
            this.init({
                asMaximized: !0
            });
            b && this.clearPlaylist();
            for (var c = 0; c < a.length; ++c) this._playlistItemExists(a[c]) ?
                console.log("meta exists") : (this.metas[a[c].id] = a[c], this.buildPlaylistItem(a[c].id), this._playlistUpdated())
        },
        _playlistUpdated: function() {
            this.playlistObj && this.obj.find(".plistopts").empty().append($('<a href="javascript:;" class="saveplaylist"><img src="//d1q46pwrruta9x.cloudfront.net/img/save-change.png"> ' + __("Save Changes") + "</a>").on("click", function(a) {
                self._savePlaylist()
            }))
        },
        _savePlaylist: function() {
            if (this.playlistObj) {
                console.log("saving playlist", this.playlistObj);
                var a = this,
                    b = this.playlistObj;
                HFN.apiMethod("collection_unlinkfiles", {
                    collectionid: b.id,
                    all: 1
                }, function(c) {
                    HFN.apiMethod("collection_linkfiles", {
                        collectionid: b.id,
                        fileids: a._gatherListFileids().join(","),
                        noitems: 1
                    }, function(b) {
                        a.obj.find(".plistopts").empty();
                        HFN.message("Playlist Saved.")
                    }, {
                        type: "POST"
                    })
                })
            }
        },
        _gatherListFileids: function() {
            for (var a = this.obj.find(".playlist li"), b = 0, c = []; b < a.length; ++b) c.push(parseInt($(a[b]).data("n").substring(1)));
            return c
        },
        _playlistItemExists: function(a) {
            return !!this.metas[a.id]
        },
        _savePosition: function() {
            console.log("saving position",
                arguments)
        },
        clearPlaylist: function() {
            this.stop();
            this.playlistObj = null;
            this.obj.removeClass("is-playlist");
            for (var a in this.metas) this.remove(a)
        },
        loadPlaylistObj: function(a) {
            this.playlistObj = a;
            this.obj.addClass("is-playlist");
            this.buildPlaylistMeta(a)
        },
        loadPlaylist: function(a) {
            this.init({
                asMaximized: !0
            });
            this.clearPlaylist();
            a && a.id && (this.playlistObj = a, this.obj.addClass("is-playlist"));
            for (var b = 0; b < a.contents.length; ++b) this.metas[a.contents[b].id] = a.contents[b];
            this.buildPlaylist(a)
        },
        setupResize: function() {
            self =
                this;
            res = this.obj.find(".resizer");
            on = !1;
            res.on("mousedown", function(a) {
                on = !0;
                $(document).on("mousemove.aprs", function(a) {
                    a = self.obj.find(".playlist").height() + (a.clientY - (res.offset().top - $(window).scrollTop()));
                    129 <= a && self.obj.find(".playlist").height(a)
                }).disableSelection();
                $(document).on("mouseup.aprs", function(a) {
                    on = !1;
                    $(document).off(".aprs").enableSelection()
                })
            })
        },
        remove: function(a) {
            var b = this.getPlaylistElSync(a);
            console.log("rem", a, this.current);
            this.current == a && (1 < obLength(this.metas) ?
                this.next() : this.stop());
            $(this.data[a]).trigger("itemclose");
            delete this.data[a];
            delete this.metas[a];
            console.log("rem", b);
            b.remove();
            this._playlistUpdated()
        },
        removePlaylistDom: function(a) {
            this.obj.find(".playlist li").each(function(a, c) {
                a == $(this).data("n") && $(this).remove()
            })
        },
        go: function(a) {
            var b = this;
            console.log("go", a);
            this.metas[a] && this.preloadItem(a, function() {
                b.play(a);
                b.preloadItem(b.prevBefore(a));
                b.preloadItem(b.nextAfter(a))
            })
        },
        goMeta: function(a) {
            this.init();
            a.id in this.metas && this.go(a.id)
        },
        play: function(a) {
            if (this.metas[a]) {
                console.log("play", a);
                var b = HFN.audio,
                    c = this; - 1 != this.current && $(this.data[this.current]).trigger("itemclose");
                this.current = a;
                this.getPlaylistAll().removeClass("current");
                this.getPlaylistEl(a, function(a) {
                    a.addClass("current");
                    var b = a.parent();
                    (a.position().top > b.outerHeight() || 0 > a.position().top) && b.scrollTop(b.scrollTop() + a.position().top - 2 * a.outerHeight())
                });
                $("div.me-plugin").remove();
                b.play({
                    place: ".audio-player",
                    fileUrl: this.getData(a).url,
                    originalFile: this.metas[a].name,
                    autostart: !0,
                    onReady: function(b) {
                        c.setData(a, {
                            player: b
                        });
                        c.setupControlsPlay(a)
                    }
                })
            }
        },
        setupControlsInit: function() {
            var a = this;
            this.obj.find(".pauseplay").on("click", function() {
                if (obLength(a.metas))
                    if (-1 == a.current) a.go(a.getFirst());
                    else {
                        var b = a.getData(a.current).player;
                        b.paused ? b.play() : b.pause()
                    }
            });
            this.obj.find(".stop").on("click", function(b) {
                -1 != a.current && a.getData(a.current).player.pause();
                a.stop()
            }).disableSelection();
            this.obj.find(".next").on("click", function(b) {
                obLength(a.metas) && a.next()
            }).disableSelection();
            this.obj.find(".prev").on("click", function(b) {
                obLength(a.metas) && a.prev()
            }).disableSelection();
            a.opts.shuffles && this.obj.find(".shuffles").addClass("on");
            a.opts.repeats && this.obj.find(".repeats").addClass("on");
            this.obj.find(".shuffles").on("click", function(b) {
                $(this).toggleClass("on");
                a.opts.shuffles = !a.opts.shuffles
            });
            this.obj.find(".repeats").on("click", function(b) {
                $(this).toggleClass("on");
                a.opts.repeats = !a.opts.repeats
            });
            $(window).on("keypress.ap", function(b) {
                32 == b.keyCode && a.isMaximized() &&
                    (b.preventDefault(), console.log("triggering click"), a.obj.find(".pauseplay:visible").trigger("click"))
            })
        },
        stop: function() {
            this.getPlaylistAll().removeClass("current"); - 1 != this.current && $(this.data[this.current]).trigger("itemclose");
            this.current = -1;
            this.clearControls()
        },
        clearControls: function() {
            this.obj.find(".currtime").text("--:--");
            this.obj.find(".maxtime").text("--:--");
            this.obj.find(".progress .fill").width(0);
            this.obj.find(".progress .buffer").width(0);
            this.obj.find(".volprogress .volfill").width(0);
            this.obj.find(".songname").text(" ");
            this.obj.find(".pause").css("display", "none");
            this.obj.find(".play").css("display", "inline-block");
            this.obj.find(".cover").html('<img src="//d1q46pwrruta9x.cloudfront.net/img/icons/120/audio.png" width="99" height="99">');
            this.obj.find(".progress").off(".ap");
            this.obj.find(".volprogress").off(".ap");
            this.obj.find(".volmin").off(".ap");
            this.obj.find(".volmax").off(".ap")
        },
        audioName: function(a) {
            return a.artist && a.title ? a.artist + " - " + a.title : a.name
        },
        setupControlsPlay: function(a) {
            var b =
                this,
                c, d = this.getData(a).player,
                e;
            e = function(a) {
                setcookie("pvol", a, 3);
                d.setVolume(a)
            };
            this.clearControls();
            console.log("got the el", d);
            this.metas[a].thumb ? setupThumb(this.obj.find(".cover img"), this.metas[a], HFN.ICONS.AUDIOPLAYING, this.metas[a].code || !1) : this.obj.find(".cover img").attr("src", CDN + "/img/icons/120/audio.png");
            $(d).off(".ap");
            this.obj.find(".songname").text(this.audioName(this.metas[a]));
            $(d).on("timeupdate.ap", function(a) {
                b.obj.find(".progress .fill").css({
                    width: Math.min(100, Math.round(100 *
                        (d.currentTime / d.duration))) + "%"
                });
                b.obj.find(".currtime").text(HFN.formatTime(parseInt(d.currentTime), !1, !0));
                a = !d.duration || isNaN(d.duration) || Infinity == d.duration ? "--:--" : HFN.formatTime(parseInt(d.duration));
                b.obj.find(".maxtime").text(a)
            });
            this.obj.find(".progress").off(".ap").on("click.ap", function(a) {
                var c = d.duration;
                if (c && -1 != c) {
                    var e = a.hasOwnProperty("offsetX") && a.offsetX ? a.offsetX : a.originalEvent.layerX;
                    e <= $(this).find(".buffer").width() && (d.setCurrentTime(parseFloat((e / 295 * c).toFixed(2))),
                        b.obj.find(".progress .fill").css({
                            width: a.offsetX
                        }))
                }
            });
            $(d).on("volumechange.ap", function(a) {
                b.obj.find(".volprogress .volfill").css({
                    width: Math.min(100, Math.round(100 * d.volume)) + "%"
                })
            });
            this.obj.find(".volprogress").off(".ap").on("click.ap", function(a) {
                a = a.hasOwnProperty("offsetX") && a.offsetX ? a.offsetX : a.originalEvent.layerX;
                e(Math.max(0, Math.min(100, ((90 < a ? 0 : a) / 90).toFixed(2))))
            });
            this.obj.find(".volmin").off(".ap").on("click.ap", function(a) {
                e(0)
            });
            this.obj.find(".volmax").off(".ap").on("click.ap",
                function(a) {
                    e(1)
                });
            $(d).on("play.ap", function() {
                b.obj.addClass("playing");
                b.obj.find(".pause").css("display", "inline-block");
                b.obj.find(".play").css("display", "none");
                "Buffering" == b.obj.find(".status").text() ? (c && (clearTimeout(c), c = null), c = setTimeout(function() {
                    b.obj.find(".status").text("Playing")
                }, 300)) : b.obj.find(".status").text("Playing");
                document.title = String.fromCharCode(9654) + " " + b.metas[a].name + " - pCloud"
            });
            $(d).on("pause.ap", function() {
                b.obj.removeClass("playing");
                b.obj.find(".pause").css("display",
                    "none");
                b.obj.find(".play").css("display", "inline-block");
                b.obj.find(".status").text("Paused");
                document.title = b.metas[a].name + " - pCloud"
            });
            $(d).on("progress.ap", function(a) {
                if (this.buffered.length) {
                    a = this.duration;
                    var c = this.buffered.end(0);
                    b.obj.find(".progress .buffer").css({
                        width: Math.min(100, Math.round(100 * (c / a))) + "%"
                    })
                }
            });
            $(d).on("ended.ap", function() {
                b.obj.find(".status").text("Ended");
                b.nextInLine();
                document.title = b.opts.prevTitle
            });
            $(this.data[a]).on("itemclose", function() {
                console.log("item close called");
                var c = b.getData(a).player,
                    d = "#" + c.id + "_container";
                $(c).off(".ap");
                "remove" in c ? c.remove() : $(c).remove();
                delete b.data[a].player;
                $(d).remove();
                $(this).off("itemclose");
                document.title = b.opts.prevTitle
            });
            var f = 0.3;
            rcookie("pvol") && 0 <= rcookie("pvol") && 1 >= rcookie("pvol") && (f = rcookie("pvol"));
            e(f)
        },
        isPlaying: function() {
            if (-1 != this.current) {
                var a = this.getData(this.current).player;
                if (!a.ended && !a.paused) return !0
            }
            return !1
        },
        getPlaylistAll: function() {
            return this.obj.find(".playlist li")
        },
        getPlaylistElSync: function(a) {
            for (var b =
                this.obj.find(".playlist li"), c = 0; c < b.length; ++c)
                if ($(b[c]).data("n") == a) return $(b[c])
        },
        getPlaylistEl: function(a, b) {
            this.obj.find(".playlist li").each(function(c, d) {
                $(d).data("n") == a && b($(d), c)
            })
        },
        prev: function() {
            var a = this.opts.shuffles ? this.getRandom(this.current) : this.prevBefore(this.current);
            this.go(a)
        },
        next: function() {
            var a = this.opts.shuffles ? this.getRandom(this.current) : this.nextAfter(this.current);
            this.go(a)
        },
        nextInLine: function() {
            var a = this.opts.shuffles,
                b = this.opts.repeats,
                c = this.getFirst();
            this.getLast();
            var d = this.nextAfter(this.current);
            if (a) d = this.getRandom();
            else if (d == c && !b && !a) {
                this.stop();
                return
            }
            this.go(d)
        },
        getFirst: function() {
            return $(this.obj.find(".playlist li")[0]).data("n")
        },
        getLast: function() {
            return $(this.obj.find(".playlist li:last-child")[0]).data("n")
        },
        nextAfter: function(a) {
            console.log("next after", a);
            for (var b = this.obj.find(".playlist li"), c = 0; c < b.length; ++c)
                if (a == $(b[c]).data("n")) return c == b.length - 1 ? $(b[0]).data("n") : $(b[c + 1]).data("n")
        },
        prevBefore: function(a) {
            for (var b =
                this.obj.find(".playlist li"), c = 0; c < b.length; ++c)
                if (a == $(b[c]).data("n")) return 0 == c ? $(b[b.length - 1]).data("n") : $(b[c - 1]).data("n")
        },
        getRandom: function(a) {
            a = a || 0;
            var b = this.obj.find(".playlist li"),
                c;
            if (1 == b.length) return this.getFirst();
            do c = $(b[Math.round(Math.random() * (b.length - 1))]).data("n"); while (a == c);
            return c
        },
        preloadItem: function(a, b) {
            console.log("preload", a);
            b = b || function() {};
            this.isLoaded(a) ? b(a) : this.loadItemUrl(a, function(a) {
                b()
            })
        },
        loadItemUrl: function(a, b) {
            var c = this,
                d = this.metas[a],
                e = "mp3" == fileext(d.name) ? "getfilelink" : "getaudiolink",
                f = {
                    fileid: d.fileid
                };
            d.code && (e = "mp3" == fileext(d.name) ? "getpublinkdownload" : "getpubaudiolink", f.code = d.code);
            HFN.apiMethod(e, f, function(d) {
                c.setData(a, {
                    url: HFN.prepUrl(d)
                });
                c.setLoaded(a);
                b()
            })
        },
        isLoaded: function(a) {
            return this.data[a] && 1 == this.data[a].loaded ? !0 : !1
        },
        setLoaded: function(a) {
            this.data[a] = $.extend({}, this.data[a], {
                loaded: 1
            })
        },
        setData: function(a, b) {
            this.data[a] = $.extend({}, this.data[a] || {}, b)
        },
        getData: function(a) {
            return this.data[a] ||
                !1
        },
        resume: function() {
            -1 != this.current && this.getData(this.current).player.play()
        },
        pause: function() {
            -1 != this.current && this.getData(this.current).player.pause()
        },
        open: function() {
            var a = {
                height: "",
                width: 520,
                top: 90
            };
            a[HFN.config.isRtl() ? "left" : "right"] = $(window).width() / 2 - 260;
            this.obj.css(a).addClass("audio-max audio-shadows").removeClass("audio-min");
            Overlay.show(250, this.minimize.bind(this), !0);
            this.status = 2
        },
        getMinimizedPosition: function() {
            var a = {
                top: $(window).height() - this.obj.find(".audio-minimized").outerHeight() +
                    "px",
                width: 220,
                height: this.obj.find(".audio-minimized").outerHeight() + "px"
            };
            a[HFN.config.isRtl() ? "left" : "right"] = HFN.uploadControl.loaded ? 230 : 5;
            return a
        },
        positionMinimized: function() {
            this.obj.css(this.getMinimizedPosition()).removeClass("audio-max").addClass("audio-min audio-shadows");
            this.status = 1
        },
        openMinimized: function() {
            this.obj.css(this.getMinimizedPosition()).removeClass("audio-max").addClass("audio-min audio-shadows");
            Overlay.hide();
            this.status = 1
        },
        maximize: function() {
            var a = this,
                b = {
                    width: 520,
                    top: 90
                };
            b[HFN.config.isRtl() ? "left" : "right"] = $(window).width() / 2 - 260 + "px";
            this.obj.css("height", "").removeClass("audio-min audio-shadows").animate(b, 300, function() {
                a.obj.addClass("audio-max audio-shadows");
                a.status = 2;
                Overlay.show(250, a.minimize.bind(a), !0)
            })
        },
        minimize: function(a) {
            Overlay.hide();
            this.obj.removeClass("audio-max audio-shadows");
            var b = this;
            this.obj.animate(this.getMinimizedPosition(), 300, function() {
                b.obj.css("position", "fixed");
                b.obj.addClass("audio-min audio-shadows");
                b.status = 1;
                a &&
                    "function" == typeof a && a()
            })
        },
        setupPositionEvents: function() {
            var a = this;
            $(window).on("resize.ap", function() {
                a.isMinimized() && a.openMinimized()
            })
        },
        setupBottomBar: function() {
            if (HFN.config.auth) {
                this.obj.find(".audio-opts-ctrl").show();
                var a = this.obj,
                    b = this;
                a.find(".audio-opts-ctrl div").off("click.ap").on("click.ap", function(c) {
                    $(this).toggleClass("active").siblings().removeClass("active");
                    a.find(".audio-opts-act div." + $(this).data("opt")).toggle().siblings().hide();
                    "share" == $(this).data("opt") && (a.find(".audio-opts-act div." +
                        $(this).data("opt")).hide(), $(this).removeClass("active"), b.playlistObj.isplaylist = !0, b.minimize(function() {
                        setTimeout(function() {
                            HFN.getPublink(b.playlistObj, function(a) {
                                a ? HFN.sharePublink(a) : HFN.createPublink(b.playlistObj)
                            })
                        }, 50)
                    }))
                }).tooltip();
                HFN.apiMethod("collection_list", {}, function(c) {
                    var d, e = 0;
                    for (a.find(".optsact.load").empty().append(d = $('<select class="loadplaylist"><option>' + i18n.get("Select playlist to play") + "</option></select>")); e < c.collections.length; ++e) c.collections[e].system ||
                        d.append('<option value="' + c.collections[e].id + '">' + c.collections[e].name + "</option>");
                    d.on("change", function(c) {
                        HFN.apiMethod("collection_details", {
                            collectionid: this.value
                        }, function(c) {
                            b.loadPlaylist(c.collection);
                            b.go(b.getFirst());
                            a.find(".audio-opts-ctrl .active").trigger("click")
                        })
                    })
                }, {
                    forceFresh: !0
                });
                a.find(".saveplaylist").on("keypress", function(b) {
                    13 == b.keyCode && a.find(".saveplaylistbut").trigger("click");
                    b.stopPropagation()
                });
                a.find(".saveplaylistbut").off("click.ap").on("click.ap", function() {
                    var c = {
                            type: 1,
                            name: a.find(".saveplaylist").val()
                        },
                        d = [],
                        e, f = [],
                        g = function(d) {
                            console.log("the file ids", d);
                            c.fileids = d.join(",");
                            HFN.apiMethod("collection_create", c, function(c) {
                                b.loadPlaylistObj(c.collection);
                                b.setupBottomBar();
                                HFN.message("Playlist " + htmlentities(c.name) + " Created.");
                                a.find(".saveplaylist").val("");
                                a.find(".audio-opts-ctrl .active").trigger("click")
                            }, {
                                errorCallback: function(a) {
                                    HFN.message(a.error, "error");
                                    b.setupBottomBar()
                                }
                            })
                        };
                    if (c.name.length) {
                        $(this).off("click.ap");
                        for (e in b.metas) b.metas[e].code ?
                            f.push({
                                code: b.metas[e].code,
                                fileid: b.metas[e].fileid
                            }) : d.push(b.metas[e].fileid);
                        console.log("fids before", d);
                        f.length ? (console.log("into pubfileids", f), HFN.getOrCreateFolder("Imported Files", 0, function(c) {
                            for (var e = new batchApiCall({
                                sequential: !0,
                                continueOnError: !1,
                                errorCallback: function(c) {
                                    console.log("ret", c);
                                    var d = __("Something went wrong. Please check if you have free space in your account.");
                                    2008 == c.result && (d = __("Your don't have free space in your account and can't import these files"));
                                    HFN.message(d,
                                        "error");
                                    a.find(".saveplaylist").val("");
                                    b.setupBottomBar()
                                }
                            }), m = 0; m < f.length; ++m) e.addCall("copypubfile", {
                                code: f[m].code,
                                fileid: f[m].fileid,
                                tofolderid: c
                            });
                            e.execute(function(a) {
                                for (var b = 0; b < a.length; ++b) d.push(a[b].ret.metadata.fileid), a[b].ret.result && (alert("1231312"), console.log(a[b].ret));
                                console.log("fids before create", d);
                                g(d)
                            })
                        })) : g(d)
                    }
                }).tooltip();
                a.find(".optsact.share div").off("click.ap").on("click.ap", function(a) {
                    if (obLength(b.metas)) {
                        a = [];
                        var d, e = $(this).data("action");
                        for (d in b.metas) a.push(b.metas[d]);
                        d = "pCloud Playlist";
                        b.playlistObj && b.playlistObj.name && (d = "Playlist: " + b.playlistObj.name);
                        HFN.getOrCreatePublinkList(a, d, function(a) {
                            switch (e) {
                                case "tw":
                                    window.open("https://twitter.com/intent/tweet?url=" + encodeURIComponent(a.link) + "&text=pCloud", "twitter-share", "width=550, height=450");
                                    break;
                                case "fb":
                                    var c = "Check Out My Playlist on pCloud";
                                    b.playlistObj && b.playlistObj.name && (c = "Check Out My Playlist on pCloud " + b.playlistObj.name);
                                    HFN.fb_share.init({
                                        name: c,
                                        caption: "",
                                        description: "With pCloud I can share all my photos and videos with all of my friends on Facebook. Join me and start sharing!",
                                        extra: "do=share",
                                        ref: "share_image",
                                        link: a.link
                                    });
                                    HFN.fb_share.show()
                            }
                        }, {
                            async: !1
                        })
                    } else HFN.message("Player playlist is empty.", "error")
                }).tooltip()
            } else this.obj.find(".audio-opts-ctrl").hide()
        },
        destroy: function() {
            this.loaded() && ($(window).off(".ap"), -1 != this.current && $(this.data[this.current]).trigger("itemclose"), document.title = this.opts.prevTitle, this.clearPlaylist(), this.opts = {}, this.data = [], this.metas = {}, this.playlistObj = null, Overlay.hide(), this.obj.remove(), this.obj = null)
        },
        reset: function() {},
        loaded: function() {
            return !!this.obj && !!this.obj.length
        },
        isMinimized: function() {
            return 1 == this.status
        },
        isMaximized: function() {
            return 2 == this.status
        }
    },
    initCreatePlaylist: function() {
        var a = this.renderTemplate("#createplaylist"),
            b;
        a.find(".butt-area").prepend($('<div class="button linebut greenbut modernbut">' + __("Create") + "</div>").on("click.crply", b = function(c) {
            if (c = a.find("input[name=playlistname]").val()) {
                $(this).off("click.crply");
                var d = this;
                HFN.apiMethod("collection_create", {
                    name: c
                }, function(a) {
                    HFN.refreshPlaylist(a.collection.id);
                    HFN.message("Playlist Created");
                    Popup.close()
                }, {
                    errorCallback: function(a) {
                        HFN.message(a.error, "error");
                        d.on("click.crply", b)
                    }
                })
            } else HFN.message(__("Please, enter proper playlist name."), "error")
        }));
        onEnter(a.find("input[name=playlistname]"), b);
        Popup.open(a, {
            title: "Create Playlist"
        });
        a.find("input").focus()
    },
    playlistAdd: function(a) {
        var b, c = HFN.renderTemplate("#collectionAd"),
            d = FileSelection.getSelectionInfo(),
            e = this.waitList,
            f = e.create(Popup.stopLoading.bind(Popup)),
            g = e.addWait(f),
            k = e.addWait(f);
        a && (d = a.length ? a : [a]);
        Popup.open(c, {
            title: "Add to Playlist",
            clickClose: !1
        });
        Popup.startLoading({
            now: !0
        });
        c.find(".modal-files").empty().append(HFN.buildFilePreview(d, {
            onLoad: e.setDone(f, g)
        }));
        c.find("select").on("focus", function() {
            c.find("input.sel").prop("checked", !0);
            c.find("input.textf").val("")
        });
        c.find(".textf").on("focus", function() {
            c.find("input.new").prop("checked", !0);
            c.find("select").val(0)
        });
        c.find("input[name=ptype]").on("change", function() {
            c.find(1 == this.value ? ".textf" : "select").trigger("focus")
        });
        HFN.apiMethod("collection_list", {}, function(a) {
            for (var b = 0, d = !1; b < a.collections.length; ++b) a.collections[b].system || (c.find("select").append('<option value="' + a.collections[b].id + '">' + a.collections[b].name + "</option>"), d = !0);
            e.setDone(f, k);
            d || (c.find("select").replaceWith("<span>" + __("No Playlists") + "</span>"), c.find("input[type=radio][value=0]").attr("disabled", "disabled"), c.find("input[type=radio][value=1]").prop("checked", !0))
        });
        c.find(".butt-area").prepend($('<div class="button linebut greenbut modernbut">' +
            __("Add to Playlist") + "</div>").on("click", b = function(a) {
            $(this).addClass("disabled").off("click");
            var e = function(a) {
                    var b = {
                            collectionid: a,
                            fileids: ""
                        },
                        c = [],
                        e;
                    for (e in d) c.push(d[e].fileid);
                    b.fileids = c.join(",");
                    HFN.apiMethod("collection_linkfiles", b, function(b) {
                        HFN.refreshPlaylist(a);
                        HFN.message("Files Added");
                        Popup.close()
                    }, {
                        type: "POST"
                    })
                },
                f = this;
            if (1 == c.find("input[name=ptype]:checked").val() && c.find(".textf").val().length) HFN.apiMethod("collection_create", {
                name: c.find(".textf").val()
            }, function(a) {
                e(a.collection.id)
            }, {
                errorCallback: function(a) {
                    HFN.message(a.error, "error");
                    $(f).removeClass("disabled").on("click", b)
                }
            });
            else if (c.find("select[name=playlist]").val()) e(c.find("select[name=playlist]").val());
            else $(f).removeClass("disabled").on("click", b)
        }))
    },
    refreshPlaylistList: function(a) {
        HFN.cache.expireMatch("api-collection_list");
        HFN.cache.expireMatch("api-collection_list-showfiles:1");
        HFN.cache.expireMatch("api-collection_details-collectionid:" + a)
    },
    refreshPlaylist: function(a) {
        HFN.cache.expireMatch("api-collection_list");
        HFN.cache.expireMatch("api-collection_list-showfiles:1");
        HFN.cache.expireMatch("api-collection_details-collectionid:" + a);
        daGrid && "playlist" == daGrid.template.name && daGrid.opts.playlistid == a ? daGrid.refresh() : daGrid && "playlists_list" == daGrid.template.name && daGrid.refresh()
    },
    initRenamePlaylist: function(a) {
        var b = this.renderTemplate("#collectionRename", {
                collectionname: a.name
            }),
            c;
        b.find(".butt-area").prepend($('<div class="button linebut greenbut modernbut">' + __("Rename") + "</div>").on("click", c = function(c) {
            c =
                b.find("input[name=renameplay]").val();
            HFN.apiMethod("collection_rename", {
                collectionid: a.id,
                name: c
            }, function(b) {
                HFN.message(__("Playlist Renamed."));
                Popup.close();
                HFN.refreshPlaylist(a.id)
            })
        }));
        Popup.open(b, {
            title: "Rename Playlist"
        });
        onEnter(b.find("input[name=renameplay]"), c);
        createSelection(b.find("input[type=text]").get(0), 0, a.name.length)
    },
    initDeletePlaylist: function(a) {
        var b = HFN.renderTemplate("#collectionDelete", {
            playlistname: a.name
        });
        b.find(".butt-area").prepend($('<div class="button linebut redbut modernbut">' +
            __("Delete") + "</div>").on("click", function(b) {
            HFN.apiMethod("collection_delete", {
                collectionid: a.id
            }, function(b) {
                HFN.message("Playlist Deleted.");
                Popup.close();
                daGrid && "playlist" == daGrid.template.name && daGrid.opts.playlistid == a.id && $.bbq.pushState({
                    page: "audio",
                    autab: "tab-playlists"
                }, 2);
                HFN.cache.expireMatch("api-collection_list");
                HFN.cache.expireMatch("api-collection_list-showfiles:1");
                HFN.cache.expireMatch("api-collection_details-collectionid:" + a.id);
                daGrid && "playlists_list" == daGrid.template.name &&
                    daGrid.refresh()
            })
        }));
        Popup.open(b, {
            title: __("Delete Playlist")
        })
    },
    gridSavePlaylist: function(a) {
        var b = a.opts.playlistid,
            c = [],
            d = [];
        $(daGrid.itemSelector()).each(function(b, f) {
            console.log(b, $(this).data("n"));
            c.push(a.data[$(this).data("n")].fileid);
            d.push(a.data[$(this).data("n")])
        });
        a.data = d;
        a.fixDatasData();
        a.filterRows();
        HFN.apiMethod("collection_unlinkfiles", {
            collectionid: b,
            all: 1
        }, function(a) {
            c.length && HFN.apiMethod("collection_linkfiles", {
                collectionid: b,
                fileids: c.join(",")
            }, function(a) {
                HFN.message("Playlist Saved")
            }, {
                type: "POST"
            })
        })
    },
    startRemoteUpload: function(a, b) {
        HFN.uploadControl.init(void 0, function() {
            console.log("upload ready");
            console.log($(".remoteupload-ctrl").length, $(".remotearea").length);
            $(".remoteupload-ctrl").trigger("click");
            $(".remotearea").val(a + (b ? '"name: ' + b.split(",").join(encodeURIComponent(",")) + '"' : ""));
            $(".remotearea").siblings("button").trigger("click")
        })
    },
    uploadControl: {
        obj: null,
        loaded: !1,
        dragprep: !1,
        status: 0,
        uploads: {},
        allUploads: [],
        init: function(a, b) {
            if (HFN.config.auth && HFN.config.isSite() &&
                (this.dragprep || this.prepDrag(), a = a || !1, !a || !rcookie("nouplm") || this.loaded))
                if (rcookie("nouplm") && setcookie("nouplm", 0, -1), this.prepRefreshAlert(), this.prepEscClose(), console.log("LOADED ", this.loaded), this.loaded) this.minimized() && !a && this.maximize(b);
                else {
                    this.loaded = !0;
                    HFN.audioPlayer.loaded() && HFN.audioPlayer.positionMinimized();
                    var c = this;
                    this.obj = $("<div>").hide().appendTo(document.body).addClass("upload-container").addClass("uploadshadows").append($("<div>").addClass("upload").append($('<div class="uploadtitle"><span>' +
                        i18n.get("Upload Manager") + '<span class="extr"></span></span></div>').append($("<span>").addClass("minimize").on("click", c.minimize.bind(c)))).append($("<div>").addClass("status")).append($('<div class="tabcontrols"></div>').append('<div class="controls fileupload"><div class="act clearfix"></div><div class="ina"></div></div><div class="controls remoteupload clearfix"></div><div class="xmethods"></div>'))).append($("<div>").addClass("upload_minimized").hide().append($('<div class="minimizedtitle">' +
                        i18n.get("Upload Manager") + "</div>").append($("<span>").addClass("maximize").on("click", c.maximize.bind(c))).append($("<span>").addClass("close").on("click", c.destroy.bind(c)))).append('<div class="uplinfo"><span class="activedownloads">' + i18n.get("No active uploads.") + '</span><span class="minperc"></span><div class="mprogress"><div class="mbar"></div></div></div>'));
                    var d = new tabs(".tabcontrols");
                    d.add(['<img src="//d1q46pwrruta9x.cloudfront.net/img/file-upload.png" width="11" height="10"> ' + i18n.get("File Upload"),
                        ".fileupload"
                    ]);
                    $.browser.chrome && versionCompare($.browser.version, "20.0") && (this.obj.find(".fileupload").after('<div class="controls folderupload"></div>'), d.add(['<img src="//d1q46pwrruta9x.cloudfront.net/img/file-upload.png" width="11" height="10"> ' + i18n.get("Folder Upload"), ".folderupload"]));
                    d.add(['<img src="//d1q46pwrruta9x.cloudfront.net/img/remote-upload.png" width="11" height="10"> ' + i18n.get("Remote Download"), ".remoteupload"]);
                    d.show();
                    this.obj.find(".xmethods").append($("<span></span>").text(i18n.get("Clear Finished")).on("click",
                        function(a) {
                            $(".upload .remove").each(function(a, b) {
                                setTimeout(function() {
                                    $(b).trigger("click")
                                }, 5 + 8 * a)
                            })
                        })).append(" | ").append($('<span class="abort"></span>').text(i18n.get("Abort All")).on("click", function(a) {
                        $(".upload .cancel").each(function(a, b) {
                            setTimeout(function() {
                                $(b).trigger("click")
                            }, 5 + 8 * a)
                        });
                        $(".upload .skip").each(function(a, b) {
                            setTimeout(function() {
                                $(b).trigger("click")
                            }, 5 + 8 * a)
                        })
                    }));
                    a ? (this.obj.find(".upload").hide(), this.obj.find(".upload_minimized").show(), this.positionMinmized(),
                        this.status = 1) : (this.position(), this.status = 2);
                    c = this;
                    $(window).off("resize.upl").on("resize.upl", function(a) {
                        c.minimized() ? c.positionMinmized() : c.position()
                    });
                    this.prepare(b);
                    this.obj.show();
                    this.loaded = !0
                }
        },
        prepRefreshAlert: function() {
            var a = this;
            $(window).off("beforeunload.upl").on("beforeunload.upl", function(b) {
                if (a.isUploading()) return i18n.get("If you proceed with reload, the list of files being uploaded will be cleared.")
            })
        },
        destroy: function() {
            this.loaded && ($(window).off(".upl"), $(document).off(".upl"),
                $(document.body).off(".upl"), Overlay.hide(), $(".upload .cancel").trigger("click"), this.obj.stop(), this.obj.remove(), this.obj = null, this.loaded = !1, this.status = 0, setcookie("nouplm", 1, 200), this.uploads = {}, this.allUploads = [], HFN.audioPlayer.loaded() && HFN.audioPlayer.openMinimized())
        },
        position: function() {
            var a = {
                top: $(window).height() / 2 - this.obj.outerHeight() / 2
            };
            a[HFN.config.isRtl() ? "left" : "right"] = $(window).width() / 2 - this.obj.outerWidth() / 2;
            this.obj.css(a);
            this.obj.addClass("upload-maximized");
            Popup.close();
            Overlay.show(250, this.minimize.bind(this), !0)
        },
        positionMinmized: function() {
            var a = {
                top: $(window).height() - 54 + "px",
                width: "210px",
                height: "54px",
                position: "fixed"
            };
            a[HFN.config.isRtl() ? "left" : "right"] = "5px";
            this.obj.css(a)
        },
        prepEscClose: function() {
            var a = this;
            $(document).off("keyup.upl").on("keyup.upl", function(b) {
                27 == b.keyCode && a.maximized() && a.minimize()
            })
        },
        prepare: function(a) {
            a = a || function() {};
            console.log(a);
            $(".upload .controls .act").empty();
            $(".upload .controls .ina").empty();
            $(".upload .folderupload").empty();
            $(".upload .remoteupload").empty();
            var b = HFN.data.fflookup["d" + currentFolder],
                c = b && b.encrypted;
            b || (currentFolder = 0, b = HFN.data.fflookup.d0);
            pCrypt.locked && b && b.encrypted && (b = HFN.data.fflookup.d0, c = !1, currentFolder = 0);
            HFN.apiMethod("currentserver", {}, function(d) {
                b && b.encrypted ? (new pUpload({
                    type: "crypto",
                    ctrlPlaceholder: ".upload .controls .act",
                    statusPlaceholder: ".upload .status",
                    server: d.hostname,
                    folderid: currentFolder || 0,
                    user: HFN.config.user.userid,
                    customParams: {
                        auth: HFN.config.auth
                    },
                    getFoldernameCallback: HFN.getFolderCallback.bind(HFN),
                    customProgress: HFN.uploadControl.progressAll.bind(HFN.uploadControl),
                    checkExistingFileCallback: HFN.fileExists,
                    reportTo: HFN.uploadControl.uploads,
                    commonUploadList: HFN.uploadControl.allUploads
                })).initUpload(currentFolder, d.hostname) : (new pUpload({
                    ctrlPlaceholder: ".upload .controls .act",
                    statusPlaceholder: ".upload .status",
                    server: d.hostname,
                    folderid: currentFolder || 0,
                    user: HFN.config.user.userid,
                    customParams: {
                        auth: HFN.config.auth
                    },
                    getFoldernameCallback: HFN.getFolderCallback.bind(HFN),
                    customProgress: HFN.uploadControl.progressAll.bind(HFN.uploadControl),
                    checkExistingFileCallback: HFN.fileExists,
                    reportTo: HFN.uploadControl.uploads,
                    commonUploadList: HFN.uploadControl.allUploads
                })).initUpload(currentFolder, d.hostname);
                window.FormData && ((new pUpload({
                    type: "drop",
                    crypto: c,
                    ctrlPlaceholder: ".upload .controls .ina",
                    statusPlaceholder: ".upload .status",
                    server: d.hostname,
                    folderid: currentFolder || 0,
                    user: HFN.config.user.userid,
                    customParams: {
                        auth: HFN.config.auth
                    },
                    getFoldernameCallback: HFN.getFolderCallback.bind(HFN),
                    customProgress: HFN.uploadControl.progressAll.bind(HFN.uploadControl),
                    checkExistingFileCallback: HFN.fileExists,
                    reportTo: HFN.uploadControl.uploads,
                    commonUploadList: HFN.uploadControl.allUploads
                })).initUpload(currentFolder, d.hostname), $.browser.chrome && versionCompare($.browser.version, "20.0") && (new pUpload({
                    type: "folder",
                    crypto: c,
                    ctrlPlaceholder: ".upload .folderupload",
                    statusPlaceholder: ".upload .status",
                    server: d.hostname,
                    folderid: currentFolder || 0,
                    user: HFN.config.user.userid,
                    customParams: {
                        auth: HFN.config.auth
                    },
                    getFoldernameCallback: HFN.getFolderCallback.bind(HFN),
                    customProgress: HFN.uploadControl.progressAll.bind(HFN.uploadControl),
                    checkExistingFileCallback: HFN.fileExists,
                    reportTo: HFN.uploadControl.uploads,
                    commonUploadList: HFN.uploadControl.allUploads
                })).initUpload(currentFolder, d.hostname));
                (new pUpload({
                    type: "remote",
                    crypto: c,
                    uploadMethod: "downloadfile",
                    ctrlPlaceholder: ".upload .remoteupload",
                    statusPlaceholder: ".upload .status",
                    intProgressMethod: "remoteProgress",
                    server: d.hostname,
                    folderid: 0,
                    user: HFN.config.user.userid,
                    customParams: {
                        auth: HFN.config.auth
                    },
                    getFoldernameCallback: HFN.getFolderCallback.bind(HFN),
                    customProgress: HFN.uploadControl.progressAll.bind(HFN.uploadControl),
                    reportTo: HFN.uploadControl.uploads,
                    commonUploadList: HFN.uploadControl.allUploads,
                    onUploadErrorCallback: function(a) {
                        4001 == a.result && (HFN.uploadControl.minimize(), HFN.initMonthlyUsage())
                    }
                })).initUpload(currentFolder, d.hostname);
                a()
            }, {
                cacheTime: 20
            })
        },
        prepDrag: function() {
            function a(a) {
                a = a.originalEvent.dataTransfer;
                var b = !1,
                    c = !1,
                    d = !1;
                console.log(a);
                if (a.types && a.types.length)
                    for (var l in a.types) a.types.hasOwnProperty(l) && ("files" == a.types[l].toLowerCase() ? b = !0 : -1 != ["text/plain", "text"].indexOf(a.types[l].toLowerCase()) ?
                        c = !0 : "application/x-moz-file" == a.types[l].toLowerCase() && (d = !0));
                return b && (!c || d)
            }
            this.dragprep = !0;
            if (window.FormData) {
                var b = this,
                    c;
                $(document).off("dragover.updrg").on("dragover.updrg", function(b) {
                    console.log("dragover.updrg", a(b));
                    b.preventDefault();
                    a(b) && ($(".upload .controls").addClass("dragging"), $(".fileupload-ctrl").trigger("click"), window.clearTimeout(c))
                });
                var d;
                $(document.body).off("dragenter.updrg").on("dragenter.updrg", d = function(c) {
                    console.log("drag enter", a(c));
                    c.preventDefault();
                    a(c) &&
                        ($(document.body).off("dragenter"), console.log("self loaded", b.loaded), b.loaded ? b.minimized() && b.maximize() : (console.log("initing"), b.init()))
                });
                $(".upload").off("dragover.uplmng").on("dragover.uplmng", function(b) {
                    b.preventDefault();
                    a(b) && ($(".upload .controls").addClass("dragging"), window.clearTimeout(c))
                });
                $(document).off("dragleave.updrg").on("dragleave.updrg", function(a) {
                    window.clearTimeout(c);
                    c = window.setTimeout(function() {
                        $(".upload .controls").removeClass("dragging");
                        $(document.body).on("dragenter",
                            d)
                    }, 85)
                });
                $(document).off("drop.updrg").on("drop.updrg", function(a) {
                    a.preventDefault();
                    window.clearTimeout(c);
                    $(".upload .controls").removeClass("dragging");
                    $(document.body).on("dragenter.updrg", d)
                })
            }
        },
        maximize: function(a) {
            a = "function" == typeof a ? a : void 0;
            var b = this;
            this.obj.find(".upload_minimized").hide();
            this.obj.css("border", "1px solid #000");
            b.obj.css("position", "fixed");
            this.obj.removeClass("uploadshadows");
            var c = {
                height: "500px",
                width: "800px",
                top: $(window).height() / 2 - 250 + "px"
            };
            c[HFN.config.isRtl() ?
                "left" : "right"] = $(window).width() / 2 - 400 + "px";
            this.obj.animate(c, 300, function() {
                b.obj.css("border", "none");
                b.prepare(a);
                b.obj.addClass("uploadshadows upload-maximized");
                b.obj.find(".upload").show();
                b.status = 2;
                Popup.close();
                Overlay.show(250, b.minimize.bind(b), !0)
            })
        },
        minimize: function() {
            var a = this;
            Overlay.hide();
            this.obj.find(".upload").hide();
            this.obj.css("border", "1px solid #000");
            this.obj.removeClass("uploadshadows");
            this.obj.removeClass("upload-maximized");
            var b = {
                top: $(window).height() - this.obj.find(".upload_minimized").outerHeight() +
                    "px",
                height: this.obj.find(".upload_minimized").outerHeight() + "px",
                width: "210px"
            };
            b[HFN.config.isRtl() ? "left" : "right"] = "5px";
            this.obj.animate(b, 300, function() {
                a.obj.css("border", "none");
                a.obj.find(".upload_minimized").show();
                a.obj.css("position", "fixed");
                a.obj.addClass("uploadshadows");
                a.status = 1
            })
        },
        minimized: function() {
            return 1 == this.status ? !0 : !1
        },
        maximized: function() {
            return 2 != this.status || this.obj.is(":animated") ? !1 : !0
        },
        progressAllMobile: function(a) {
            this.calculateTotal(this.uploads);
            a = this.calculateOveralStatus(this.allUploads);
            setTimeout(function() {
                0 != $(".upload .status .file").length ? ($("._finish").show(), $(".activedownloads").show()) : ($("._finish").hide(), $(".activedownloads").hide())
            }, 300);
            h = parseInt($(".upload .status div").first().height() + 15);
            $(".upload .status").height(parseInt($(".upload .status .file").length * h) + "px");
            $(".activedownloads").show().html("Upload Manager: " + a.filesready + " " + __("of") + " " + a.filestotal + " files uploaded")
        },
        progressAll: function(a) {
            a = this.calculateTotal(this.uploads);
            var b = this.calculateOveralStatus(this.allUploads);
            a.total ? (b.bytestotal ? (a.current = b.bytescurr, a.total = b.bytestotal) : b.filestotal && (a.current = b.filesready, a.total = b.filestotal), void 0 != b.filesready && void 0 != b.filestotal && $(".upload .uploadtitle .extr").text(__("- %filesready% of %filestotal% files uploaded", !1, {
                filesready: b.filesready,
                filestotal: b.filestotal
            })), this.obj.find(".mprogress").css("visibility", "visible"), this.obj.find(".mbar").css("width", (100 * (a.current / a.total)).toFixed(5) + "%"), this.obj.find(".minperc").text((100 * (a.current / a.total)).toFixed(1) +
                "%"), b.bytestotal ? this.obj.find(".activedownloads").text(HFN.formatSize(b.bytescurr) + " " + __("of") + " " + HFN.formatSize(b.bytestotal)) : b.filestotal ? this.obj.find(".activedownloads").text(b.filesready + " " + __("of") + " " + b.filestotal + " files uploaded") : this.obj.find(".activedownloads").text(a.uploads + " active upload" + (1 == a.uploads ? "" : "s"))) : (this.obj.find(".mprogress").css("visibility", "hidden"), this.obj.find(".activedownloads").text(__("No active uploads.")), this.obj.find(".mbar").css("width", "0px"), this.obj.find(".minperc").text(""),
                this.obj.find(".uploadtitle span.extr").text(""))
        },
        calculateTotal: function(a) {
            var b = 0,
                c = 0,
                d = 0,
                e;
            for (e in a) a[e].current != a[e].total && (d++, b += a[e].current, c += a[e].total);
            return {
                current: b,
                total: c,
                uploads: d
            }
        },
        calculateOveralStatus: function(a) {
            for (var b = {
                filesready: 0,
                filestotal: 0,
                bytescurr: 0,
                bytestotal: 0
            }, c = [0, 1, 2], d = 0; d < a.length; ++d) - 1 != c.indexOf(a[d].status) ? (b.filesready += 2 == a[d].status ? 1 : 0, b.filestotal += 1, null != a[d].size ? b.bytestotal += a[d].size : a[d].progress && a[d].progress.total && (b.bytestotal += a[d].progress.total),
                b.bytescurr += 2 == a[d].status ? a[d].size : a[d].progress.current) : console.log("ignored coz care status", a[d]);
            return b
        },
        isUploading: function() {
            for (var a = this.allUploads, b = 0; b < a.length; ++b)
                if (1 == a[b].status) return !0;
            return !1
        }
    },
    initMonthlyUsage: function() {
        var a = HFN.renderTemplate("#monthlyusage");
        Popup.open(a, {
            title: "Exceeded monthly usage"
        })
    },
    foldersBrowse: {
        loaded: !1,
        obj: null,
        chosedFolder: null,
        opts: {},
        defaultOpts: {
            folderid: 0,
            title: i18n.get("Copy Files"),
            title_explain: i18n.get("Folder list"),
            treeDefinition: i18n.get("Selection to copy:"),
            buttonsCallback: function(a) {
                var b = this;
                $('<input type="button" value="' + i18n.get("Select") + '" disabled="disabled">').click(function(a) {
                    b.selectCallback(b.chosedFolder)
                }).appendTo(a)
            },
            selectCallback: function(a) {
                HFN.message(i18n.get("click callback is not defined") + a, "error")
            }
        },
        init: function(a) {
            this.loaded || (this.obj = $("<div>").addClass("folderwrap").append(a.treeDefinition).append('<div class="modal-files modal-files-small"></div>').append(a.title_explain).append('<ul class="folderlist"></ul>'), a.buttonsCallback(this.obj,
                a), this.loaded = !0)
        },
        show: function(a) {
            this.opts = $.extend({}, this.defaultOpts, a);
            this.init(this.opts);
            this.obj.find(".modal-files").empty().append(HFN.buildFilePreview(FileSelection.getSelectionInfo()));
            this.loadFolders();
            Popup.open(this.obj, {
                closeCallBack: this.close.bind(this),
                title: a.title
            })
        },
        disableButtons: function() {
            this.obj.find("input[type=button]").attr("disabled", "disabled")
        },
        enableButtons: function() {
            this.obj.find("input[type=button]").removeAttr("disabled", "disabled")
        },
        loadFolders: function() {
            this.obj.find(".folderlist").text("Loading...");
            this.disableButtons();
            var a = this;
            HFN.apiMethod("listfolder", {
                folderid: this.opts.folderid,
                recursive: 1,
                nofiles: 1
            }, function(b) {
                $(".folderlist").empty();
                a.buildTree(b.metadata, a.obj.find(".folderlist"), a.opts)
            }, {
                forceFresh: !0
            })
        },
        buildTree: function(a, b, c) {
            0 == a.folderid && b.empty();
            var d = this,
                e = $("<li>").append('<span class="ftitle"><img src="//d1q46pwrruta9x.cloudfront.net/img/icons/folder.png" width=15>&nbsp;' + ("/" == a.name ? i18n.get("Root") : a.name) + (a.folderid == currentFolder ? " [<strong>" + i18n.get("current") +
                    "</strong>]" : "") + "</span>").on("click", a, function(a) {
                    a.data.folderid != currentFolder && ($(".folderlist .sel").removeClass("sel"), $(this).addClass("sel"), c.chosedFolder = a.data.folderid, d.enableButtons());
                    $(this).children(".ctrl").trigger("click", !0)
                });
            b.append(e);
            if ("contents" in a && a.contents.length)
                for (e.prepend("&nbsp;").prepend($('<span class="ctrl">+</span>').click(function(a, b) {
                    a.stopPropagation();
                    b = b || !1;
                    "+" != $(this).text() && b || ($(this).parent().siblings(".children").children("ul").toggle(), $(this).text("+" ==
                        $(this).text() ? "-" : "+"))
                })), b = $('<li class="children"></li>').appendTo(b), e = 0; e < a.contents.length; ++e) {
                    var f = $("<ul>").hide().appendTo(b);
                    this.buildTree(a.contents[e], f, c)
                }
        },
        close: function() {
            this.loaded = !1;
            this.obj = this.chosedFolder = this.opts = null
        }
    },
    findCryptoFolder: function(a) {
        HFN.apiMethod("crypto_getroot", {}, function(b) {
            a(b.metadata)
        }, {
            errorCallback: function() {
                pCloudCrypto.createCryptoFolder(function(b) {
                    a(b)
                })
            }
        })
    },
    listCryptoFolderRecursive: function(a, b) {
        var c = function(a, b) {
                a.isfolder && b.push(a.folderid);
                if (a.contents)
                    for (var d = 0; d < a.contents.length; ++d) a.contents[d].isfolder && c(a.contents[d], b)
            },
            d = [],
            e;
        HFN.apiMethod("listfolder", {
            folderid: a.folderid,
            recursive: 1,
            nofiles: 1,
            iconformat: "id"
        }, function(a) {
            e = a.metadata;
            console.log(e.contents.length);
            c(e, d);
            console.log(e.contents.length);
            var g = [];
            for (a = 0; a < d.length; ++a)(function(a) {
                g.push(HFN.apiMethod("crypto_getfolderkey", {
                    folderid: d[a]
                }, function(b) {
                    pCloudCrypto.saveKey("d" + d[a], b.key)
                }))
            })(a);
            $.when.apply($, g).then(function() {
                console.log(e.contents.length);
                b(e)
            })
        }, {
            cacheTime: !1,
            forceFresh: !0
        })
    },
    foldersCustom: {
        buildCryptoFolderBrowse: function(a, b) {
            var c = this;
            HFN.findCryptoFolder(function(d) {
                HFN.listCryptoFolderRecursive(d, function(d) {
                    b.expandFirstLevel = d.folderid;
                    c.buildFolderBrowse(d, a, b)
                })
            })
        },
        buildFolderBrowse: function(a, b, c) {
            c = $.extend({}, {
                folderid: "object" == typeof a ? a.folderid : a,
                onSelect: function() {},
                onLoad: function() {},
                canSelect: !0,
                showFiles: !1,
                showCurrent: !1,
                expandedOnLoad: !1,
                expandFirstLevel: !1,
                isPublic: !1,
                code: !1,
                currentFolder: currentFolder,
                canCreateFolders: !1,
                focusCurrent: !1,
                showNoWritePermissions: !1,
                preselectFolder: !1,
                canSelectCurrent: !1,
                inTrash: !1,
                recursive: !0
            }, c);
            c.focusCurrent = !1;
            console.log("folder browse opts", c);
            var d = {
                    folderid: c.folderid,
                    recursive: c.recursive ? 1 : 0,
                    nofiles: 1,
                    iconformat: "id"
                },
                e = "listfolder",
                f = this;
            c.showFiles && delete d.nofiles;
            c.isPublic && c.code ? (e = "showpublink", d = {
                code: c.code
            }, c.folderid = a.id, f.buildTree(a, b, c), c.onLoad()) : c.inTrash ? (e = "trash_list", f.buildTree(a, b, c), c.onLoad()) : a.encrypted ? (f.buildTree(a, b, c),
                c.onLoad()) : HFN.apiMethod(e, d, function(a) {
                "listfolder" == e && (a.metadata = f._filterMeta(a.metadata));
                f.buildTree(a.metadata, b, c);
                c.focusCurrent && c.currentFolderObj && setTimeout(function() {
                    c.currentFolderObj.parents(".folderlist").scrollTop(0).scrollTop(c.currentFolderObj.position().top);
                    delete c.currentFolderObj
                }, 700);
                c.onLoad();
                HFN.config.isMobile() && $(b).css("height", "100%")
            }, {
                forceFresh: !0
            })
        },
        _filterMeta: function(a) {
            for (var b, c = 0; c < a.contents.length; ++c) b = !1, parseInt(rcookie("showhidden")) || (a.contents[c].name.match(/.part$/) &&
                (b = !0), "." == a.contents[c].name.charAt(0) && (b = !0), "." == a.contents[c].name.charAt(0) && (b = !0), "thumbs.db" == a.contents[c].name.toLowerCase() && (b = !0), "__MACOSX" == a.contents[c].name && (b = !0)), a.contents[c].encrypted && (b = !0), b && a.contents.splice(c, 1);
            return a
        },
        buildTree: function(a, b, c) {
            a.folderid == c.folderid && (b.empty(), c.canSelect || b.addClass("noselect"));
            var d = HFN.metaIcon(a);
            !a.ismine && a.ismount && (d = HFN.ICO.FOLDER_SHAREDWITHME);
            var e = c.getFolderPrefixObj ? c.getFolderPrefixObj(a) : HFN.createIcon(d, HFN.ICONS.LIST_SMALL);
            a.isshared && HFN.getSharedStatus(a, function(a) {
                console.log("shares", a);
                a.share && (console.log("112122"), console.log(e.attr("src", HFN.createIconSrc(HFN.ICO.FOLDER_SHARED, HFN.ICONS.LIST_SMALL))))
            });
            var f = this,
                d = HFN.metaName(a),
                d = $("<li>").append($("<span>", {
                    "class": "ftitle"
                }).append(e).append("/" == d ? i18n.get("Root") : htmlentities(HFN.strFit(d, 55))).addClass(c.showCurrent && a.folderid == c.currentFolder ? "iscurrent" : "")).on("click", a, function(a) {
                    (!1 === c.currentFolder || a.data.folderid != c.currentFolder || c.canSelectCurrent) &&
                        c.canSelect && ($(this).parents(".folderlist").find(".sel").removeClass("sel"), $(this).addClass("sel"), c.onSelect(a.data.folderid));
                    $(this).children(".ctrl").trigger("click", !0)
                });
            c.currentFolder == a.folderid && (c.currentFolderObj = d);
            a.isfolder && d.find(".ftitle").addClass("foldr");
            b.append(d);
            "contents" in a && (a.encrypted || (a = this._filterMeta(a)), d.prepend($('<span class="ctrl">+</span>').click(function(d, e) {
                if (!$(this).data("loaded")) {
                    for (var l = $('<li class="children"></li>').hide().appendTo(b), m = 0; m <
                        a.contents.length; ++m) {
                        var q = $("<ul>").appendTo(l);
                        f.buildTree(a.contents[m], q, c)
                    }
                    c.canCreateFolders && Perm.canCreate(a) && (q = $("<ul>").appendTo(l), f.appendCreateNewFolder(a, q, c))
                }
                $(this).data("loaded", 1);
                d.stopPropagation();
                e = e || !1;
                "+" != $(this).text() && e || ($(this).parent().siblings(".children").toggle(), $(this).text("+" == $(this).text() ? String.fromCharCode(8211) : "+"));
                $(this).parent().parent().find(".crt").hide();
                $(this).parent().parent().find(".link").show();
                if ($(this).text() == String.fromCharCode(8211) &&
                    c.onExpand) c.onExpand(a.folderid, d)
            })));
            c.showNoWritePermissions && !Perm.canCreate(a) && d.addClass("grayed").off("click").find("span.ftitle").tooltip({
                title: i18n.get("Can't write in this folder."),
                placement: "right",
                animation: !0
            });
            !c.expandFirstLevel || 0 != a.folderid && a.folderid != c.expandFirstLevel || (console.log("case #3"), d.find(".ctrl").trigger("click"))
        },
        appendCreateNewFolder: function(a, b, c) {
            var d = $("<li>"),
                e = $('<div class="crt">').hide(),
                f = this,
                g = function(b, e) {
                    if (!(1 > b.length)) {
                        var g = {
                                name: b,
                                folderid: e
                            },
                            q = function(a) {
                                a(g)
                            };
                        a.encrypted && (q = function(c) {
                            pCloudCrypto.asyncEncryptMeta({
                                name: b,
                                parentfolderid: a.folderid
                            }, function(a) {
                                b = a;
                                g.name = a;
                                g.encrypted = 1;
                                g.key = pCrypt.generatefolderkey();
                                c(g)
                            })
                        });
                        q(function(a) {
                            HFN.apiMethod("createfolder", a, function(a) {
                                console.log("folder created");
                                f.appendNewFolder(a.metadata, d, c)
                            }, {
                                errorCallback: function(a) {
                                    HFN.message(a.error, "error")
                                }
                            })
                        })
                    }
                };
            $('<div class="link">').append($('<span class="ftitle"></span>').append(HFN.createIcon(HFN.ICO.FOLDER, HFN.ICONS.LIST_SMALL)).append(i18n.get("Create New Folder")).on("click",
                function(a) {
                    a.stopPropagation();
                    $(this).parent().siblings(".crt").show();
                    $(this).parent().hide();
                    $(this).parent().siblings(".crt").find("input")[0].focus()
                })).appendTo(d);
            $('<input type="text" name="newfolder" placeholder="' + __("Folder name") + '" data-parentfolder="' + a.folderid + '" size="13" style="height: 20px; vertical-align: middle; padding-left: 3px;">').appendTo(e).on("keyup", function(a) {
                if (13 == a.keyCode) {
                    a = $(this).val();
                    var b = $(this).data("parentfolder");
                    $(this).val("");
                    $(this).parent().siblings(".link").show();
                    $(this).parent().hide();
                    g(a, b)
                }
            }).after($('<div class="button greenbut modernbut linebut shortie">' + i18n.get("Create") + "</div>").on("click", function() {
                var a = $(this).siblings("input[name=newfolder]").val(),
                    b = $(this).siblings("input[name=newfolder]").data("parentfolder");
                $(this).siblings("input[name=newfolder]").val("");
                $(this).parent().siblings(".link").show();
                $(this).parent().hide();
                g(a, b)
            }));
            e.appendTo(d);
            d.appendTo(b)
        },
        appendNewFolder: function(a, b, c) {
            li = $("<li>").append($("<span>", {
                "class": "ftitle"
            }).append(HFN.createIcon(HFN.ICO.FOLDER,
                HFN.ICONS.LIST_SMALL)).append("/" == a.name ? "Root" : htmlentities(HFN.metaName(a))).addClass(c.showCurrent && a.folderid == c.currentFolder ? "iscurrent" : "")).on("click", a, function(a) {
                !1 !== c.currentFolder && a.data.folderid == c.currentFolder || !c.canSelect || ($(this).parents(".folderlist").find(".sel").removeClass("sel"), $(this).addClass("sel"), c.onSelect(a.data.folderid));
                $(this).children(".ctrl").trigger("click", !0)
            });
            a.isfolder && li.find(".ftitle").addClass("foldr");
            b.prepend(li)
        }
    },
    folderPreview: function(a, b) {
        var c =
            HFN.renderTemplate(".folderPreview", {
                foldername: b
            });
        HFN.foldersCustom.buildFolderBrowse(a, c.find(".folderlist"), {
            onSelect: function(a) {
                pickedFolder = a
            },
            canSelect: !1,
            showFiles: !0,
            expandedOnLoad: !0
        });
        c.find(".butt-area").append($('<div class="button smallbut graybut linebut">').text(i18n.get("Close")).click(function(a) {
            Popup.close()
        }));
        Popup.open(c, {
            title: "Preview"
        })
    },
    folderPreviewStatic: function(a, b, c, d) {
        c = $.extend({}, {
            folderid: 0,
            append: !1,
            onSelect: function() {},
            onLoad: function() {},
            canSelect: !0,
            showFiles: !1,
            showCurrent: !1,
            expandedOnLoad: !1,
            expandFirstLevel: !1,
            isPublic: !1,
            code: !1,
            currentFolder: null,
            canCreateFolders: !1,
            focusCurrent: !1,
            showNoWritePermissions: !1,
            preselectFolder: !1,
            canSelectCurrent: !1,
            inTrash: !1,
            disbleSubfolderSelection: !1
        }, c);
        c.append ? HFN.folderPreviewHelpers.addFolder(a, c, d) : (b.empty(), HFN.foldersCustom.buildTree(a, b, c))
    },
    folderPreviewHelpers: {
        addFolder: function(a, b, c) {
            0 == a.contents.length && $(c).css("visibility", "hidden");
            c = $(c);
            var d = $("<ul>"),
                e = c.parent().parent().find(".children");
            HFN.foldersCustom.buildTree(a,
                d, b);
            d.find(".children:first").show();
            e.after(d.find(".children:first"));
            e.remove();
            b.disbleSubfolderSelection && (a = HFN.folderPreviewHelpers.findMostFarCheckedParent("li" == c.get(0).nodeName.toLowerCase() ? c : c.parent())) && a.find("input:first").trigger("click").trigger("click")
        },
        findMostFarCheckedParent: function(a) {
            for (var b; a.length && !1 == a.hasClass("folderlist");) "li" == a.get(0).nodeName.toLowerCase() && a.find("input:first").prop("checked") && (b = a), a = a.parent(), a.hasClass("children") && (a = a.prev());
            return b
        }
    },
    prepMime: function(a) {
        if (a) return '<div class="cwrap">' + a.replace("/", " / ") + "</div>"
    },
    api: {
        apiDefaults: {
            forceFresh: !1,
            apiServer: "api.pcloud.com",
            apiScheme: "https",
            dataType: "json",
            cacheTime: 300,
            async: !0,
            type: "GET",
            errorCallback: function(a) {
                Popup.close();
                void 0 != HFN.ERROR_MESSAGE[a.result] ? HFN.message(HFN.ERROR_MESSAGE[a.result], "error") : 3 == a.result.toString().charAt(0) ? console.log("Ignored Error", a) : a.result == HFN.ERRORS.LOGIN_REQUIRED || a.result == HFN.ERRORS.LOGIN_FAILED ? (HFN.message("Session Expired. Please login.",
                    "error"), $.bbq.pushState({
                    page: "login"
                }, 2)) : (console.log("Uncatched Error: "), console.log(a), HFN.message(a.error, "error"))
            },
            onXhrError: function(a, b, c) {
                console.log("rejected ", arguments)
            },
            onProgress: function(a, b) {}
        },
        inProgress: {},
        waitCallbacks: {},
        stringify: function(a, b) {
            return JSON.stringify({
                method: a,
                params: b
            })
        }
    },
    apiMethodUrl: function(a, b, c) {
        a = a || this.api.apiDefaults.apiServer;
        var d = [],
            e;
        if (!c.auth && this.METHODS[b] && this.METHODS[b].reqauth)
            if (this.config.auth) c.auth = this.config.auth;
            else return $.bbq.pushState({
                page: "login"
            }), !1;
        for (e in c) d.push(encodeURIComponent(e) + "=" + encodeURIComponent(c[e]));
        return this.api.apiDefaults.apiScheme + "://" + a + "/" + b + "?" + d.join("&")
    },
    apiMethodParams: function(a) {
        var b = [];
        for (n in a) b.push(encodeURIComponent(n) + "=" + encodeURIComponent(a[n]));
        return b.join("&")
    },
    apiMethod: function(a, b, c, d) {
        d = d || {};
        d = $.extend({}, this.api.apiDefaults, d);
        var e = $.extend({}, b),
            f, g = this.METHODS[a] && "write" in this.METHODS[a] && this.METHODS[a].write ? !0 : !1;
        e.id && delete e.id;
        f = HFN.cache.cacheid("api-" + a, e);
        b = b || {};
        if (!b.auth &&
            this.METHODS[a] && this.METHODS[a].reqauth)
            if (this.config.auth.length) b.auth = this.config.auth;
            else {
                console.log("going to login", arguments);
                HFN.pages["goto"]("login");
                return
            }
        g && (d.forceFresh = !0, d.cacheTime = 0);
        if (!d.forceFresh && HFN.cache.has(f)) c(HFN.cache.get(f));
        else {
            if (!g) {
                var k = this.api.stringify(a, b);
                if (k in this.api.inProgress) {
                    void 0 == this.api.waitCallbacks[k] && (this.api.waitCallbacks[k] = []);
                    var l = $.Deferred();
                    this.api.waitCallbacks[k].push([
                        function(a) {
                            c(a);
                            l.resolve()
                        },
                        d
                    ]);
                    return l
                }
                this.api.inProgress[k] =
                    1
            }
            var m = this;
            console.log(a);
            return $.ajax({
                url: d.apiScheme + "://" + d.apiServer + "/" + a,
                dataType: d.dataType,
                async: d.async,
                data: b,
                type: d.type,
                xhrFields: {
                    onprogress: function(a) {
                        d.onProgress(a.currentTarget.responseText, a)
                    }
                },
                error: function(a, b, c) {
                    d.onXhrError(a, b, c)
                },
                success: function(e) {
                    if (0 == e.result && "json" == d.dataType) {
                        d.cacheTime && HFN.cache.set(f, e, d.cacheTime);
                        if (!g && (delete m.api.inProgress[k], k in m.api.waitCallbacks))
                            for (; m.api.waitCallbacks[k].length;) m.api.waitCallbacks[k].shift()[0](e);
                        c(e)
                    } else if ("json" ==
                        d.dataType) {
                        HFN.ERROR_MESSAGE[e.result] && (e.error = HFN.ERROR_MESSAGE[e.result]);
                        if (d.errorCallback) d.errorCallback(e, {
                            method: a,
                            params: b
                        });
                        else if (e.result == HFN.ERRORS.LOGIN_REQUIRED || e.result == HFN.ERRORS.LOGIN_FAILED) {
                            HFN.message("Session expired.", "error");
                            $.bbq.pushState({
                                page: "login"
                            }, 2);
                            return
                        }
                        var l;
                        if (!g && (delete m.api.inProgress[k], k in m.api.waitCallbacks))
                            for (; m.api.waitCallbacks[k].length;) l = m.api.waitCallbacks[k].shift(), l[1].errorCallback && l[1].errorCallback(e, {
                                method: a,
                                params: b
                            })
                    } else if ("text" ==
                        d.dataType) {
                        if (!g && (delete m.api.inProgress[k], k in m.api.waitCallbacks))
                            for (; m.api.waitCallbacks[k].length;) m.api.waitCallbacks[k].shift()[0](e);
                        c(e)
                    }
                }
            })
        }
    },
    apiMethodUtil: function(a, b, c) {
        return this.apiMethod(a, b, function(a) {
            console.log(a)
        }, c)
    },
    downloadFile: function(a) {
        var b = this.renderTemplate(".downloadFile");
        this.apiMethod("getfilelink", {
            fileid: a,
            forcedownload: 1
        }, function(a) {
            b.find(".dwldbut").empty().append($("<a>").addClass("button linebut").attr("href", HFN.prepUrl(a)).attr("target", "_blank").text(__("Download File")).on("click",
                function() {
                    Popup.close()
                }))
        });
        Popup.open(b, {
            title: "Download file"
        })
    },
    initDownloadImageSizes: function(a) {
        var b = a.width && a.height ? "<strong>" + a.width + "</strong>x<strong>" + a.height + "</strong>" : "",
            c = this.renderTemplate("#downloadImageSizes", {
                origsize: b
            }, {
                escape: !1
            });
        b || c.find("tr.origsize").remove();
        a.width && a.height && c.find("select").children().each(function(b) {
            $(this).children().each(function(b) {
                b = this.value.split("x");
                (b[0] > a.width || b[1] > a.height) && $(this).remove()
            });
            $(this).children().length || $(this).remove()
        });
        c.find(".butt-area").prepend($('<div class="button smallbut greenbut linebut modernbut">' + __("Download") + "</div>").on("click", function(b) {
            b = c.find("select").val().split("x");
            var e = function(a) {
                if (a % 4 || a % 5) {
                    do a--; while (a % 4 || a % 5)
                }
                return a
            };
            b = {
                fileid: a.fileid,
                size: e(b[0]) + "x" + e(b[1]),
                forcedownload: 1
            };
            c.find("input.crp").prop("checked") && (b.crop = 1);
            HFN.apiMethod("getthumblink", b, function(a) {
                window.open(HFN.prepUrl(a));
                Popup.close()
            }, {
                async: !1
            })
        }));
        Popup.open(c, {
            title: "Download Image Sizes"
        })
    },
    initDownloadConverts: function(a) {
        var b =
            this.renderTemplate("#downloadVideoConverts");
        Popup.open(b, {
            title: "Download Video"
        });
        Popup.startLoading({
            now: !0
        });
        HFN.apiMethod("getvideolinks", {
            fileid: a.fileid,
            forcedownload: 1
        }, function(a) {
            for (var d = 0; d < a.variants.length; ++d)
                if (a.variants[d].videocodec) {
                    var e = a.variants[d],
                        e = e.width + "x" + e.height + " (" + HFN.formatSize(e.size) + ") - " + e.videocodec + " (" + e.videobitrate + "kbps), " + e.audiocodec + " (" + e.audiobitrate + "kbps)" + (e.isoriginal ? ", Original" : "") + (e.rotate ? ", Rotated:" + e.rotate + String.fromCharCode(176) :
                            "");
                    b.find("select").append('<option value="' + HFN.prepUrl(a.variants[d]) + '">' + e + "</option>")
                }
            b.find("select").children().length || (b.find("select").replaceWith("<u>" + __("No converted files available for this video.") + "</ul>"), b.find("div.dl").remove());
            Popup.stopLoading()
        });
        b.find(".butt-area").prepend($('<div class="button smallbut greenbut linebut modernbut dl">' + __("Download") + "</div>").on("click", function(a) {
            window.open(b.find("select").val())
        }))
    },
    prepUrl: function(a) {
        var b = HFN.api.apiDefaults.apiScheme;
        if (a.hosts && a.hosts[0]) return b + "://" + a.hosts[0] + a.path
    },
    getFileLinkBack: function(a, b, c) {
        var d = {
                fileid: a.fileid,
                hashCache: a.hash
            },
            e = "getfilelink";
        c.code && (e = "getpublinkdownload", d.code = c.code);
        c.forcedownload && (d.forcedownload = c.forcedownload);
        a.revisionid && (d.revisionid = a.revisionid);
        console.log(c);
        this.apiMethod(e, d, function(a) {
            b(HFN.prepUrl(a))
        }, c)
    },
    getVideoLinkBack: function(a, b, c) {
        this.apiMethod("getvideolink", {
            fileid: a.fileid,
            hashCache: a.hash
        }, function(a) {
            b(HFN.prepUrl(a))
        }, 60)
    },
    createIcon: function(a,
        b, c) {
        return $("<img>", {
            src: this.createIconSrc(a, b, c),
            width: HFN.iconTypes[b].icon.width,
            height: HFN.iconTypes[b].icon.height
        })
    },
    createIconSrc: function(a, b, c) {
        var d = "string";
        "number" == typeof a && (d = "id");
        d = CDN + "/img/" + HFN.iconFormatPath[d] + "/";
        c && (d += c + "/");
        return d + HFN.iconTypes[b].icon.path + "/" + a + ".png"
    },
    createImage: function(a, b) {
        var c = {
                src: "//d1q46pwrruta9x.cloudfront.net/ZtQ/img/" + a
            },
            d = HFN.imageSize(b);
        d && (c.width = d.width, c.height = d.height);
        return $("<img>", c)
    },
    imageSize: function(a) {
        var b = {
            leftmenu: {
                width: "23px",
                height: "18px"
            }
        };
        return a in b ? b[a] : !1
    },
    limitText: function(a, b) {
        for (var c = [], d = a.split(" "), e = 0; e < d.length; ++e) c.push(d[e].length > b ? d[e].substring(0, b) + "&hellip;" : d[e]);
        return c.join(" ")
    },
    listTrashFolder: function(a, b) {
        var c = this.cache,
            d = c.cacheid("listfolder", "list", a || 0, "trash");
        c.has(d) ? (console.log("got trash folder from cache", d), b(c.get(d))) : HFN.apiMethod("trash_list", {
            folderid: a,
            recursive: 1,
            iconformat: "id"
        }, function(a) {
            a.metadata.contents = HFN._filterTree(a.metadata.contents, {
                encrypted: !1
            });
            HFN.cacheTree(a.metadata, "trash", {});
            console.log(d);
            b(c.get(d))
        }, {
            cacheTime: !1
        })
    },
    listPublicFolder: function(a, b, c) {
        var d = this.cache,
            e = d.cacheid("listfolder", "list", b || 0, "public");
        d.has(e) ? c(d.get(e)) : HFN.apiMethod("showpublink", {
            code: a
        }, function(a) {
            HFN.cacheTree(a.metadata, "public", {});
            c(d.get(e))
        })
    },
    _filterTree: function(a, b) {
        var c = 0,
            d = [],
            e;
        console.log("opts", b);
        console.log("tree", a);
        console.log("copy", d);
        b = b || {};
        b.encrypted = !!b.encrypted;
        pCrypt.locked ? b.encrypted = !1 : "undefined" == typeof b.encrypted &&
            HFN.liveGridOpts() && HFN.liveGridOpts().metadata && (b.encrypted = !!HFN.liveGridOpts().metadata.encrypted);
        for (var f = b.encrypted; c < a.length; ++c) {
            e = HFN.metaName(a[c]) || a[c].name;
            console.log(a[c].parentfolderid);
            HFN.data.fflookup["d" + a[c].parentfolderid] && (f = !!HFN.data.fflookup["d" + a[c].parentfolderid].encrypted);
            console.log("filter", a[c].encrypted, f);
            if (!parseInt(rcookie("showhidden"))) {
                if (e.match(/.part$/)) continue;
                if ("." == e.charAt(0)) continue;
                if ("." == e.charAt(0)) continue;
                if ("thumbs.db" == e.toLowerCase()) continue;
                if ("__MACOSX" == e) continue
            }
            f == !!a[c].encrypted && d.push(a[c])
        }
        return d
    },
    listFolder: function(a, b, c) {
        console.log("IN LIST FOLDER");
        c = $.extend({}, {
            nocache: !1,
            filter: !1,
            q: !1
        }, c);
        var d = this.cache,
            e = this,
            f = d.cacheid("listfolder", "list", a, "default"),
            g = function(a, b, d, f) {
                a.contents = e._filterTree(a.contents, c);
                f(a)
            };
        !c.nocache && d.has(f) ? (d = d.get(f), d.encrypted && (c.encrypted = !0), console.log("has cache id"), g(d, c.filter, c.q, b)) : (console.log("calling listfolder"), HFN.apiMethod("listfolder", {
            folderid: a,
            recursive: 0,
            iconformat: "id",
            getkey: 1
        }, function(d) {
            if (d.metadata.encrypted) {
                if (pCrypt.locked) {
                    pCloudCrypto.redirectfolder = a;
                    $.bbq.pushState({
                        page: "crypto",
                        folderid: a
                    }, 2);
                    HFN.cache.expireMatch("api-listfolder-folderid:[^0]{1}[0-9]*-");
                    return
                }
                pCloudCrypto.saveKey(d.metadata.id, d.key);
                c.encrypted = !0
            }
            e.cacheTree(d.metadata, !1, HFN.data.fflookup);
            g(d.metadata, c.filter, c.q, b)
        }, {
            cacheTime: !1,
            errorCallback: function(a) {
                5E3 == a.result && HFN.message(__('There is problem with loading your account. Please try again, and if the problem persists, <a href="#page=contact">contact us</a>.'),
                    "error", !1);
                a.result == HFN.ERRORS.DIRECTORY_NOT_EXIST && (HFN.message("Folder is not accessible!", "error"), $.bbq.pushState({
                    page: "filemanager",
                    folder: 0
                }, 2));
                HFN.megaLoad.hide()
            }
        }))
    },
    listEncryptedFolder: function(a, b, c) {
        console.log("IN LIST FOLDER");
        c = $.extend({}, {
            nocache: !1,
            filter: !1,
            q: !1
        }, c);
        var d = this.cache,
            e = this,
            f = d.cacheid("listfolder", "list", a, "encrypted"),
            g = function(a) {
                for (var b = 0; b < a.contents.length; ++b) a.contents[b].encrypted && (a.contents[b].encrypted = !1)
            };
        !c.nocache && d.has(f) ? (a = d.get(f), a.encrypted &&
            (c.encrypted = !0), console.log("has cache id"), g(a), b(a)) : (console.log("calling listfolder"), HFN.apiMethod("listfolder", {
            folderid: a,
            recursive: 0,
            iconformat: "id"
        }, function(a) {
            a.metadata.encrypted && (pCloudCrypto.saveKey(a.metadata.id, a.key), c.encrypted = !0);
            e.cacheTree(a.metadata, "encrypted", HFN.data.fflookup);
            g(a.metadata);
            b(a.metadata)
        }, {
            cacheTime: !1,
            errorCallback: function(a) {
                5E3 == a.result && HFN.message(__('There is problem with loading your account. Please try again, and if the problem persists, <a href="#page=contact">contact us</a>.'),
                    "error", !1);
                a.result == HFN.ERRORS.DIRECTORY_NOT_EXIST && (HFN.message("Folder is not accessible!", "error"), $.bbq.pushState({
                    page: "filemanager",
                    folder: 0
                }, 2));
                HFN.megaLoad.hide()
            }
        }))
    },
    listSearch: function(a, b, c) {
        var d = a; - 1 != a.indexOf(":") && (a = a.substring(a.indexOf(":") + 1));
        a = {
            query: a,
            offset: 0,
            limit: 600,
            iconformat: "id"
        };
        parseInt(b) && (a.category = b);
        HFN.apiMethod("search", a, function(a) {
            for (var f = 0; f < a.items.length; ++f) HFN.data.fflookup[a.items[f].id] = a.items[f];
            c({
                contents: a.items,
                q: d,
                filter: b
            })
        })
    },
    listAudio: function(a) {
        HFN.apiMethod("search", {
            category: HFN.CATEGORY.AUDIO,
            query: "",
            iconformat: "id",
            offset: 0,
            limit: 5E4
        }, function(b) {
            a(b.items)
        })
    },
    listArtistList: function(a) {
        HFN.listAudio(function(b) {
            for (var c = [], d = {}, e = [], f = {}, g = {}, k = 0, l = function(a) {
                var b = HFN.prepArtist(a.artist),
                    k = b.toLowerCase(),
                    p = HFN.prepArtist(a.album) || "Unknown",
                    s = p.toLowerCase();
                HFN.prepArtist(a.title);
                var t = k + "-" + s;
                !p && b && (a.album = p = "Unknown");
                b && p && (void 0 == f[k] && (f[k] = e.push({
                    name: b,
                    id: k,
                    icon: "audio",
                    albums: []
                }) - 1), void 0 == g[t] && (g[t] = e[f[k]].albums.push({
                        name: p,
                        songs: []
                    }) -
                    1), e[f[k]].albums[g[t]].songs.push(a), void 0 == d[s] && (d[s] = c.push({
                    name: p,
                    id: s,
                    icon: "audio",
                    songs: []
                }) - 1), c[d[s]].songs.push(a));
                if (a.contents && a.contents.length)
                    for (b = 0; b < a.contents.length; ++b) l(a.contents[b])
            }; k < b.length; ++k) l(b[k]);
            a(e, c)
        })
    },
    listPlaylistsSongs: function(a, b) {
        HFN.apiMethod("collection_list", {
            showfiles: 1,
            pagesize: 500
        }, function(b) {
            for (var d = 0, e, f, g = []; d < b.collections.length; ++d)
                for (e = 0, f = b.collections[d], colData = $.extend({}, f), delete colData.contents; e < f.contents.length; ++e) g.push($.extend(f.contents[e], {
                    playlist: colData.name,
                    playlistObj: colData,
                    isplaylist: !0
                }));
            a(g)
        }, b)
    },
    listPlaylistSongs: function(a, b, c) {
        HFN.apiMethod("collection_details", {
            collectionid: a,
            pagesize: 500
        }, function(a) {
            var c = 0,
                f = [],
                g = $.extend({}, a.collection);
            delete g.contents;
            console.log("col data", g);
            for (console.log("ret col", a.collection); c < a.collection.contents.length; ++c) f.push($.extend(a.collection.contents[c], {
                playlist: g.name,
                playlistObj: $.extend({}, g, {
                    isplaylist: !0
                })
            }));
            b(f)
        }, c)
    },
    getPlaylist: function(a, b) {
        HFN.apiMethod("collection_details", {
            collectionid: a,
            pagesize: 500
        }, function(a) {
            b(a.collection)
        }, {
            forceFresh: !0
        })
    },
    listFolderFlow: function(a, b, c) {
        HFN.apiMethod("listfolder", {
            folderid: a
        }, function(a) {
            var e = [],
                f = 0;
            HFN.filterTree(a.metadata, b, e);
            for (c.appendData(e); f < a.metadata.contents.length; ++f) a.metadata.contents[f].isfolder && setTimeout(function(a, b, c) {
                HFN.listFolderFlow(a.folderid, b, c)
            }.bind(null, a.metadata.contents[f], b, c), 200)
        })
    },
    filterHidden: function(a, b) {
        for (var c = 0; c < a.length; ++c) a[c].name.match(/.part$/) || "." != a[c].name.charAt(0) &&
            "." != a[c].name.charAt(0) && "thumbs.db" != a[c].name.toLowerCase() && "__MACOSX" != a[c].name && b.push(a[c])
    },
    filterTree: function(a, b, c) {
        console.log("FILTERING", arguments);
        var d = !1;
        0 == b.indexOf("search:") && (d = b.substring(7));
        "sharedwithme" == b && a.isshared && !a.ismine && c.push(a);
        "shared" == b && a.isshared && a.ismine && c.push(a);
        d && a.name.toLowerCase().match(d.toLowerCase()) ? c.push(a) : "all" != b || a.isfolder ? a.isfolder || a.category != b || c.push(a) : c.push(a);
        if (a.isfolder && a.contents && a.contents.length)
            for (d = 0; d < a.contents.length; ++d) this.filterTree(a.contents[d],
                b, c);
        else if (HFN.cache.has("listfolder-list-" + a.folderid + "-default"))
            for (var e = HFN.cache.get("listfolder-list-" + a.folderid + "-default"), d = 0; d < e.contents.length; ++d) this.filterTree(e.contents[d], b, c)
    },
    newFilterTree: function(a, b, c) {
        console.log("???? new filter: ", a);
        var d, e;
        e = ["name", "artist", "album", "title", "genre"];
        var f = !1,
            g = 0;
        if (b)
            for (; g <= e.length; ++g)
                if (0 == b.indexOf(e[g] + ":")) {
                    b = b.substring(e[g].length + 1).trim();
                    f = e[g];
                    break
                }
        console.log("q data: ");
        console.log(b, f);
        for (d in this.data.fflookup) e =
            this.data.fflookup[d], b && e[f] && e[f].toLowerCase().match(b.toLowerCase()) ? ("all" != a || e.isfolder || c.push(e), a != e.category || e.isfolder || c.push(e), e.isfolder && c.push(e)) : b || ("all" != a || e.isfolder ? e.isfolder || e.category != a || c.push(e) : c.push(e))
    },
    newFolder: function(a) {
        for (var b = HFN.data.fflookup["d" + a], c = __("New Folder"), d = 1; this.fileExists(a, c);) c = "New Folder (" + d + ")", ++d;
        cont = '<div style="padding: 25px 25px 30px 25px;"><label>' + i18n.get("Folder name") + ': &nbsp;</label><br><input type="text" name="folder" class="textf newf" value="' +
            c + '"><br><label class="simp" style="margin-top: 8px;"><input type="checkbox" class="chk" name="stepinto"> ' + i18n.get("Open after creation") + '</label></div><div class="butt-area"><div class="create button smallbut linebut greenbut modernbut"><img src="//d1q46pwrruta9x.cloudfront.net/img/save-share.png"> ' + i18n.get("Create") + '</div><div class="cancel button smallbut linebut darkbut modernbut"><img src="//d1q46pwrruta9x.cloudfront.net/img/stop-share.png"> ' + i18n.get("Cancel") + "</div></div>";
        c = __("Create Folder");
        HFN.data.fflookup["d" + a] && (c = __('Create folder in "%name%"', !1, {
            name: HFN.metaName(HFN.data.fflookup["d" + a])
        }));
        HFN.config.isMobile() ? (MobilePopup.open(cont, {
            title: c,
            dont_translate_title: !0
        }), $(".modal .textf").css("width", "100%")) : Popup.open(cont, {
            title: c,
            dont_translate_title: !0
        });
        $(".modal .chk")[0].checked = 1 == rcookie("oac") ? !0 : !1;
        $(".modal .chk").on("change.c", function() {
            setcookie("oac", this.checked ? 1 : 0, 10)
        });
        var c = $("input[name=folder]"),
            e, f = $(".modal div.create").on("click.new", e = function() {
                var c =
                    $(".modal input[name=folder]").val().trim(),
                    d = $(".modal input.chk")[0].checked;
                if (1 > c.length) HFN.message(__("Folder name is required."), "error");
                else {
                    $(this).off("click.new");
                    HFN.config.isMobile() || Popup.startLoading({
                        now: !0
                    });
                    var l = {
                        folderid: a,
                        name: c
                    };
                    (function(d) {
                        b.encrypted ? pCloudCrypto.asyncEncryptMetaAndKey({
                            parentfolderid: a,
                            name: c
                        }, function(a, b) {
                            l.name = a;
                            l.key = b;
                            l.encrypted = 1;
                            d()
                        }) : d()
                    })(function() {
                        HFN.apiMethod("createfolder", l, function(a) {
                            HFN.message(__("Folder Created."));
                            if (d) $(HFN.diff.jqEvent).on("diffEvent.createfolder.newfolder" +
                                a.metadata.folderid, function(b, c) {
                                    c.metadata.folderid == a.metadata.folderid && ($(HFN.diff.jqEvent).off("diffEvent.createfolder.newfolder" + a.metadata.folderid), HFN.openFolder(a.metadata.folderid))
                                });
                            HFN.config.isMobile() ? MobilePopup.close() : Popup.stopLoading().close();
                            HFN.cache.expire(HFN.cache.cacheid("folders", "lookup"))
                        }, {
                            errorCallback: function(a) {
                                HFN.message(a.error, "error");
                                f.on("click.new", e);
                                Popup.stopLoading()
                            }
                        })
                    })
                }
            });
        onEnter(c, e);
        Popup.startLoading({
            now: !0
        });
        Popup.stopLoading();
        Popup.onLoad(function() {
            var a =
                $(".modal input.newf");
            createSelection(a[0], 0, a.val().length);
            a.focus()
        });
        $(".modal div.cancel").on("click", function() {
            Popup.close()
        })
    },
    cacheTree: function(a, b, c, d, e) {
        console.log(":::: received for caching", a);
        var f = this.cache,
            g = [];
        if (a.contents && a.contents.length && !e)
            for (e = 0; e < a.contents.length; ++e) a.contents[e].folderid && g.push(a.contents[e].folderid);
        if (a.contents && a.contents.length)
            for (e = 0; e < a.contents.length; ++e) a.contents[e].isfolder ? this.cacheTree(a.contents[e], b, c) : c[a.contents[e].id] = a.contents[e];
        c[a.id] = a;
        "contents" in a && f.set(f.cacheid("listfolder", "list", a.folderid, b || "default"), this.metaforCache(a), d || 172800)
    },
    precacheFolders: function(a, b) {
        return new batchApiCall({
            sequential: !1,
            maxConcurentCalls: 5
        })
    },
    metaforCache: function(a) {
        return a
    },
    folderData: function(a) {
        var b = 0,
            c = 0,
            d;
        if (a.contents && a.contents.length)
            for (var e = 0; e < a.contents.length; ++e) d = this.folderData(a.contents[e]), b += d[0], c += d[1];
        else a.size && (b = a.size), a.isfolder || (c = 1);
        return [b, c]
    },
    metaSizeUpdate: function(a, b, c) {
        alert("meta size update called, but should not");
        console.log(arguments.callee.caller)
    },
    metaGetParentObj: function(a) {
        return a.parentfolderid ? this.findOriginalMetadata({
            id: "d" + a.parentfolderid
        }) : !1
    },
    buildFFLookup: function(a, b) {},
    buildTreeLookup: function(a, b) {
        b[a.folderid] = a;
        HFN.data.fflookup[a.id] = a;
        if (a.contents && a.contents.length)
            for (var c = 0; c < a.contents.length && a.contents[c].isfolder; ++c) this.buildTreeLookup(a.contents[c], b)
    },
    previewFile: function(a, b) {
        console.log("PREVIEW FILE #1", a.category);
        a.extention = HFN.textView.file_extention(a);
        console.log("PREVIEW FILE #2",
            a.category);
        if (a.encrypted) pCloudCrypto.initFileDownload(a);
        else switch (a.category) {
            case HFN.CATEGORY.IMAGE:
                HFN.gallery.open(a);
                break;
            case HFN.CATEGORY.VIDEO:
                ap.isPlaying() && ap.pause();
                HFN.videoGallery.open(a);
                break;
            case HFN.CATEGORY.AUDIO:
                -1 == HFN.config.excludeAudioExt.indexOf(fileext(a.name).toLowerCase()) ? HFN.previewAudio(a, b) : HFN.previewGeneric(a, b);
                break;
            case HFN.CATEGORY.DOCUMENT:
                HFN.textView.is_readable(a.extention) ? HFN.textView.view(a, b) : this.previewGeneric(a, b);
                break;
            case HFN.CATEGORY.ARCHIVE:
                b ?
                    this.previewGeneric(a, b) : HFN.previewArchive(a);
                break;
            default:
                HFN.textView.is_readable(a.extention) ? HFN.textView.view(a, b) : this.previewGeneric(a, b)
        }
    },
    previewMobileFile: function(a, b) {
        switch (a.category) {
            case HFN.CATEGORY.IMAGE:
                HFN.gallery.open(a);
                break;
            case HFN.CATEGORY.VIDEO:
                HFN.videoGallery.open(a);
                break;
            case HFN.CATEGORY.AUDIO:
                HFN.audioGallery.open(a);
                break;
            default:
                this.previewMobileGenericFile(a, b)
        }
    },
    previewMobileImageFile: function(a, b) {
        console.log("preview for ", a);
        var c = a.width && a.height ? HFN.calcImageSize(a.width,
                a.height, Math.round(1 * $(window).outerWidth()), $(window).outerHeight()) : [640, 480],
            d = "getthumblink",
            c = {
                size: c[0] + "x" + c[1],
                fileid: a.fileid
            };
        b && (d = "getpubthumblink", c.code = b);
        HFN.apiMethod(d, c, function(a) {
            console.log("url is", HFN.prepUrl(a));
            location.href = HFN.prepUrl(a)
        }, {
            async: !1
        })
    },
    previewMobileGenericFile: function(a, b) {
        var c = "getfilelink",
            d = {
                fileid: a.fileid
            };
        b && (c = "getpublinkdownload", d.code = b);
        HFN.apiMethod(c, d, function(a) {
            HFN.diff.reset();
            location.href = HFN.prepUrl(a)
        }, {
            async: !1
        })
    },
    previewDocument: function(a,
        b, c) {
        var d = [Math.round(0.9 * $(window).outerWidth()), Math.max(150, Math.round(1 * $(window).outerHeight() - 170))],
            e = HFN.renderTemplate(".genericPreview");
        e.find(".prevplc").css({
            width: d[0] + "px",
            height: d[1] + "px"
        });
        Popup.open(e, {
            title: i18n.get("Preview Document:") + ' "' + b.name + '"',
            dont_translate_title: !0,
            cssPosition: "fixed",
            overridePosition: {
                top: ($(window).outerHeight() - d[1] - 100) / 2
            }
        });
        if ("txt" == fileext(b.name)) Popup.startLoading({
                now: !0
            }), a = "gettextfile", d = {
                fileid: b.fileid
            }, c && (a = "getpubtextfile", d.code = htmlentities(c)),
            b.revisionid && (d.revisionid = b.revisionid), HFN.apiMethod(a, d, function(a) {
                e.find(".prevplc").css({
                    padding: 10,
                    "overflow-y": "auto"
                }).html(htmlentities(a).replace(/\n/g, "<br>"));
                Popup.stopLoading()
            }, {
                dataType: "text"
            });
        else if (e.find(".prevplc").append('<iframe style="width: 100%; height: 100%;" frameborder="0" src="' + a + '"></iframe>'), b = function() {
                var a = function() {
                        var a;
                        (a = this.name) || (a = navigator ? navigator.userAgent.toLowerCase() : "other", a = -1 < a.indexOf("msie") || -1 < a.indexOf("rv 11.0") ? "ie" : a);
                        return this.name =
                            a
                    },
                    b = function(a) {
                        try {
                            return new ActiveXObject(a)
                        } catch (b) {}
                    },
                    c = function() {
                        return this.plugin = this.plugin || b("AcroPDF.PDF") || b("PDF.PdfCtrl")
                    };
                return {
                    browser: a(),
                    acrobat: c() ? "installed" : !1,
                    acrobatVersion: function() {
                        try {
                            var b = c();
                            if ("ie" == a()) {
                                var d = b.GetVersions().split(",")[0].split("=");
                                return parseFloat(d[1])
                            }
                            return b.version ? parseInt(b.version) : b.name
                        } catch (e) {
                            return null
                        }
                    }()
                }
            }(), navigator.userAgent.match(/Opera|OPR\//), -1 < b.browser.indexOf("rv:11") && !1 == b.acrobat || -1 < b.browser.indexOf("ie") &&
            !1 == b.acrobat) Popup.close(), Popup.open(HFN.renderTemplate("#notInstalledPdf", {
            msg_no_pdf_reader_installed: __("You_dont_have_pdf_reader_installed", "You_dont_have_pdf_reader_installed", {
                url: '<a href="http://get.adobe.com/reader/otherversions/" target="_blank">adobe.com</a>'
            })
        }, {
            escape: !1
        }), {
            title: "No_pdf_reader_installed_title"
        })
    },
    previewGeneric: function(a, b) {
        var c = {
            forcedownload: 1
        };
        b && (c.code = b);
        $.browser.msie && -1 == versionCompare($.browser.version, "10.0") ? (Popup.open('<div style="width: 250px; padding: 20px;" class="load"></div>', {
            title: "Preview file:"
        }), Popup.startLoading({
            now: !0
        }), this.getFileLinkBack(a, function(a) {
            $(".modal .load").html('<a href="' + a + '" target="_blank" style="margin: 22px auto;" class="button centerbut">' + i18n.get("Open File") + "</a>");
            Popup.stopLoading();
            Popup.setPosition();
            $(".modal .load a").on("click", function(a) {
                Popup.close()
            })
        }, c)) : (c.async = !1, this.getFileLinkBack(a, function(a) {
            window.open(a)
        }, c))
    },
    previewArchive: function(a) {
        var b = this.renderTemplate("#previewArchive");
        b.find(".download").on("click",
            function(b) {
                Popup.close();
                HFN.getFileLinkBack(a, function(a) {
                    window.open(a)
                }, {
                    async: !1,
                    forcedownload: 1
                })
            });
        b.find(".extract").on("click", function(b) {
            Popup.close();
            HFN.initExtract(a)
        });
        Popup.open(b, {
            title: HFN.strFit(a.name, 40)
        })
    },
    previewImage: function(a, b) {
        Popup.open('<div style="width: 640px; height: 480px;" class="load"></div>', {
            title: "Preview image:"
        });
        Popup.startLoading();
        if (a.thumb) {
            var c = {
                fileid: a.fileid,
                size: "640x480"
            };
            b && (c.code = b);
            HFN.apiMethod(b ? "getpubthumblink" : "getthumblink", c, function(a) {
                var b =
                    parseInt(240 - a.size.substring(a.size.indexOf("x") + 1) / 2) + "px";
                $(".modal .load").html('<img src="' + HFN.prepUrl(a) + '" style="margin-top: ' + b + '" >');
                Popup.stopLoading()
            })
        } else this.getFileLinkBack(a, function(a) {
            $(".modal .load").css("margin-top", "80px").html('<a href="' + a + '" target="_blank">' + i18n.get("Download Picture") + "</a>");
            $(".modal .modal-content").css("height", "200px");
            Popup.stopLoading();
            Popup.setPosition()
        }, {
            code: opts.code || !1
        })
    },
    previewVideo: function(a, b) {
        function c(b) {
            Popup.stopLoading();
            var c = {
                selector: d.find(".vidpreview"),
                type: "video",
                autoPlay: !0,
                media: a,
                sources: [
                    ["video/mp4", a]
                ],
                name: e,
                callback: function(a) {
                    Popup.setOpt("closeCallback", function() {
                        a.dispose()
                    })
                }
            };
            b && (c.poster = b);
            HFN.player.load(c)
        }
        var d = $('<div style="padding: 0 8px 8px 8px;"><h4>' + b.name + '</h4><div class="vidpreview" style="width: 640px; height: 360px;"></div><div style="text-align: right; padding: 5px;"><a href="' + a + '" target="_blank">' + i18n.get("Download") + "</a></div></div>"),
            e = "previewvideo" + uniqueNum.get();
        Popup.open(d, {
            title: "Preview video: ",
            onEscClose: !1
        });
        Popup.startLoading();
        b.thumb ? HFN.apiMethod("getthumblink", {
            fileid: b.fileid,
            size: "640x480"
        }, function(a) {
            c(HFN.prepUrl(a))
        }, {
            errorCallback: c.bind(null, !1)
        }) : c(!1)
    },
    previewAudio: function(a, b) {
        console.log("preview audio");
        HFN.audioPlayer.loaded() && HFN.audioPlayer.destroy();
        if (daGrid.audioData.opts.code)
            for (var c in daGrid.audioData.metas) daGrid.audioData.metas[c].code = daGrid.audioData.opts.code;
        HFN.audioPlayer.init({
            asMaximized: !0
        });
        HFN.audioPlayer.clearPlaylist();
        HFN.audioPlayer.appendPlaylistItem(daGrid.audioData.metas);
        HFN.audioPlayer.goMeta(a)
    },
    showUpload: function(a) {
        Popup.open('<h3>Upload</h3><div class="upload"><div class="status"></div><div class="controls"></duv></div>', {
            closeCallBack: function() {
                uploadAbortAll()
            }
        });
        prepareUpload({
            folder: a,
            finishCall: triggerOpenFolder.bind(null, currentFolder, !1, !0)
        });
        HFN.apiMethod("currentserver", {}, function(a) {
            console.log(a);
            iframeUpload(".upload .controls", ".upload .status", a.hostname);
            $(".upload .controls").append('<div style="clear: both;"></div>')
        })
    },
    buildFilePreview: function(a, b) {
        b = $.extend({}, {
            insideFolders: !1,
            publicCode: "",
            isPublic: !1,
            code: "",
            onLoad: function() {},
            inTrash: !1,
            recursive: !1
        }, b);
        console.log("FILE PREVIEW ", b);
        var c = $("<div>"),
            d = 0,
            e = HFN.waitList,
            f = e.create(function() {
                b.onLoad()
            });
        for (console.log("LIST ID ", f); d < a.length; ++d) {
            var g = e.addWait(f),
                k = $("<div>").addClass("fprev");
            if (a[d].isfolder && 0 != a[d].folderid && "c" != a[d].id.charAt(0)) {
                var l = $('<ul class="folderlist"></ul>');
                HFN.foldersCustom.buildFolderBrowse(a[d], l, {
                    canSelect: !1,
                    showFiles: !0,
                    isPublic: b.isPublic,
                    code: b.code,
                    inTrash: b.inTrash,
                    recursive: b.recursive,
                    onLoad: function(a, b) {
                        setTimeout(e.setDone.bind(e, a, b), 20)
                    }.bind(null, f, g)
                });
                k.append(l).appendTo(c)
            } else {
                var l = a[d],
                    m;
                l.metadata && (l = l.metadata);
                l.encrypted && console.log("decrypting", l.name);
                m = HFN.metaIcon(l);
                l.isfolder && 0 == l.folderid && (m = "c" == l.id.charAt(0) ? "playlist" : "virtualfolder");
                m = HFN.createIcon(m, HFN.ICONS.LIST_SMALL).addClass("listicon").appendTo(k);
                l.thumb && !b.inTrash && setupThumb(m, l, HFN.ICONS.LIST_SMALL, b.publicCode);
                k.append(htmlentities(HFN.strFit(HFN.metaName(a[d]), 55))).appendTo(c);
                setTimeout(e.setDone.bind(e, f, g), 20)
            }
        }
        return c
    },
    acceptShareDirect: function(a, b) {
        var c = {
            sharerequestid: a.sharerequestid,
            name: a.sharename
        };
        if (a.sharerequestid) c.sharerequestid = a.sharerequestid;
        else if (a.code) c.code = a.code;
        else {
            HFN.message("System error, accept share.", "error");
            return
        }
        HFN.apiMethod("acceptshare", c, function(a) {
            HFN.message("Share is accepted.");
            b && b()
        })
    },
    getShareRequest: function(a, b, c) {
        HFN.apiMethod("listshares", {},
            function(d) {
                var e = !1;
                d.requests[b].forEach(function(b) {
                    if (b.sharerequestid == a) return e = b, !1
                });
                c(e)
            })
    },
    acceptShare: function(a, b) {
        var c = HFN.renderTemplate(".acceptShare", {
            foldername: ""
        }, {
            escape: !1
        });
        c.find("input[name=foldername]").val("sharename" in a ? a.sharename : a.foldername);
        HFN.config.isMobile() && c.find(".textf").css({
            width: "100%"
        });
        HFN.config.isMobile() ? MobilePopup.open(c, {
            title: "Accept Share",
            clickClose: !1,
            onEscClose: !1
        }) : (Popup.open(c, {
            title: "Accept Share",
            clickClose: !1,
            onEscClose: !1
        }), Popup.startLoading({
            now: !0
        }));
        var d = -1;
        HFN.foldersCustom.buildFolderBrowse(0, c.find(".folderlist"), {
            onSelect: function(a) {
                d = a
            },
            currentFolder: !1,
            expandFirstLevel: !0,
            canCreateFolders: !0,
            onLoad: function() {
                Popup.stopLoading()
            }
        });
        c.find(".butt-area").append($('<div class="button smallbut linebut greenbut modernbut">').text(__("Accept Share")).on("click", function(e) {
            e = {
                sharerequestid: a.sharerequestid,
                name: c.find("input[name=foldername]").val()
            };
            var f = !1;
            if (a.sharerequestid) e.sharerequestid = a.sharerequestid;
            else if (a.code) e.code = a.code;
            else {
                HFN.message("System error, accept share.", "error");
                return
            }
            c.find("input[name=alw]").prop("checked") && (e.always = 1);
            c.find("input[name=opnshare]").prop("checked") && (f = !0); - 1 != d && (e.folderid = d);
            HFN.apiMethod("acceptshare", e, function(a) {
                HFN.message("Share is accepted.");
                Popup.close();
                console.log(a);
                f && a.metadata && 0 <= a.metadata.parentfolderid ? $.bbq.pushState({
                    page: "filemanager",
                    folder: a.metadata.parentfolderid,
                    file: a.metadata.id
                }) : b && b()
            }, {
                errorCallback: function(c) {
                    HFN.message(c.error, "error");
                    Popup.close();
                    HFN.acceptShare(a, b)
                }
            })
        })).append($('<div class="button darkbut linebut modernbut">').text(i18n.get("Cancel")).click(function() {
            Popup.close()
        }))
    },
    rejectShareDirect: function(a, b) {
        var c = {};
        if (a.sharerequestid) c.sharerequestid = a.sharerequestid;
        else if (a.code) c.code = a.code;
        else {
            HFN.message("system error, reject share");
            return
        }
        HFN.apiMethod("declineshare", c, function(a) {
            HFN.message("Share is declined.");
            b && b()
        })
    },
    rejectShare: function(a, b) {
        var c = HFN.renderTemplate(".rejectShare", {
            foldername: a.sharename
        });
        c.find(".butt-area").append($('<div class="button smallbut linebut redbut modernbut">').text(__("Decline Share")).on("click", function(d) {
            d = {};
            if (a.sharerequestid) d.sharerequestid = a.sharerequestid;
            else if (a.code) d.code = a.code;
            else {
                HFN.message("system error, reject share");
                return
            }
            c.find("input[name=alw]").prop("checked") && (d.always = 1);
            HFN.apiMethod("declineshare", d, function(a) {
                HFN.message("Share is declined.");
                Popup.close();
                triggerIncomingRequests(".requests", !0);
                b && b()
            })
        })).append($('<div class="button smallbut darkbut linebut modernbut">').text(__("Cancel")).click(function() {
            Popup.close()
        }));
        HFN.config.isMobile() ? MobilePopup.open(c, {
            title: "Decline Share"
        }) : Popup.open(c, {
            title: "Decline Share"
        })
    },
    getSharePeople: function(a) {
        HFN.apiMethod("listshares", {}, function(b) {
            var c = [].concat(b.shares.outgoing, b.requests.outgoing);
            b = [].concat(b.shares.incoming, b.requests.incoming);
            for (var d = [], e = 0; e < c.length; ++e) - 1 == d.indexOf(c[e].tomail) && d.push({
                email: c[e].tomail
            });
            for (e = 0; e < b.length; ++e) - 1 == d.indexOf(b[e].frommail) && d.push({
                email: b[e].frommail
            });
            a(d)
        })
    },
    shareItem: function(a, b) {
        console.log("sharing");
        console.log(a);
        var c = this.renderTemplate(".shareItem", {
                sharename: a.name
            }),
            d, e, f = a ? [a] : FileSelection.getSelectionInfo(),
            g;
        c.find(".butt-area").append(e = $('<div class="button linebut greenbut modernbut">').text(i18n.get("Share")).on("click.share", d = function(b) {
            c.find("input[name=shareto]").val();
            b = c.find("input[name=sharename]").val();
            var f = c.find("textarea[name=message]").val(),
                m = 0,
                q = [];
            $.each(g.getVals(), function(a, b) {
                validateEmail(b.trim()) && -1 == q.indexOf(b.trim()) && q.push(b.trim())
            });
            console.log("EMAILS",
                q);
            if (q.length) {
                $(this).off("click.share");
                $("input[name=perm]").each(function(a, b) {
                    $(b).prop("checked") && (m += parseInt($(b).val()))
                });
                b = {
                    folderid: a.folderid,
                    name: b,
                    permissions: m
                };
                f && (b.message = f);
                Popup.startLoading({
                    now: !0
                });
                for (var f = new batchApiCall({
                    sequential: !0,
                    continueOnError: !1,
                    errorCallback: function(a) {
                        Popup.stopLoading();
                        HFN.message(a.error, "error");
                        e.on("click.share", d)
                    }
                }), r = 0; r < q.length; ++r) f.addCall("sharefolder", $.extend({}, b, {
                    mail: q[r]
                }));
                f.execute(function(a) {
                    HFN.message("Share request(s) sent.");
                    Popup.close()
                })
            } else HFN.message(__("Proper e-mails are required in order to share."), "error")
        })).append($('<div class="button darkbut linebut modernbut">').text(i18n.get("Cancel")).click(function() {
            Popup.stopLoading().close()
        }));
        onCtrlEnter(c.find("textarea[name=message]"), d);
        HFN.config.isMobile() ? MobilePopup.open(c, {
            title: "Share Folder",
            clickClose: !1,
            onEscClose: !1,
            closeCallback: function() {
                clearOnEnter(c.find("textarea[name=message]"))
            }
        }) : (c.find("div").first().width("500"), Popup.open(c, {
            title: "Share Folder",
            clickClose: !1,
            onEscClose: !1,
            closeCallback: function() {
                clearOnEnter(c.find("textarea[name=message]"))
            }
        }), Popup.startLoading({
            now: !0
        }));
        c.find(".modal-files").empty().append(HFN.buildFilePreview(f, {
            onLoad: function() {
                Popup.stopLoading()
            }
        }));
        HFN.getSharePeople(function(a) {
            console.log(a);
            c.find(".tt-query").focus(function() {
                $(".tt-hint").addClass("textfocus")
            }).blur(function() {
                $(".tt-hint").removeClass("textfocus")
            });
            var b = new Bloodhound({
                name: "email",
                datumTokenizer: function(a) {
                    return Bloodhound.tokenizers.whitespace(a.email)
                },
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: a
            });
            b.initialize();
            if (Popup.loading) Popup.onLoad(function() {
                g = new combo({
                    place: ".sharewith",
                    name: "emails[]",
                    suggestions: a,
                    width: 360,
                    sourceKey: "email",
                    source: b,
                    getShowVal: function(a) {
                        return a
                    },
                    templates: {
                        header: "<div></div>",
                        footer: "<div></div>",
                        suggestion: "<div>{{email}}</div>"
                    }
                })
            });
            else g = new combo({
                place: ".sharewith",
                name: "emails[]",
                suggestions: a,
                width: 360,
                sourceKey: "email",
                source: b,
                getShowVal: function(a) {
                    return a
                },
                templates: {
                    header: "<div></div>",
                    footer: "<div></div>",
                    suggestion: "<div>{{email}}</div>"
                }
            })
        });
        HFN.config.isSite() && c.find("input[name=sharename]").width(355);
        $("input[name=shareto]").focus()
    },
    loadShareContacts: function(a, b) {
        var c = [],
            d = [],
            e = 0,
            f = [];
        c.push(HFN.apiMethod("contactlist", {}, function(a) {
            d = d.concat(HFN.filterMailContacts(a.contacts))
        }, b));
        HFN.config.isBusiness() && (c.push(HFN.apiMethod("account_users", {
            withavatars: 1
        }, function(a) {
            for (var b = 0; b < a.users.length; ++b)
                if (a.users[b].active || a.users[b].frozen) d.push({
                    name: a.users[b].firstname +
                        " " + a.users[b].lastname,
                    value: a.users[b].id,
                    source: 1001,
                    userobj: a.users[b]
                }), f.push(a.users[b].email), e++
        }, b)), c.push(HFN.apiMethod("account_teams", {
            showlinks: 1,
            showeveryone: 1
        }, function(a) {
            console.log("got the teams", a);
            for (var b = 0; b < a.teams.length; ++b) d.push({
                name: a.teams[b].name,
                value: a.teams[b].id,
                source: 1002,
                teamobj: a.teams[b]
            })
        }, b)));
        $.when.apply($, c).then(function() {
            for (var b = 0; b < d.length; ++b)
                if (1002 == d[b].source && 0 == d[b].value) {
                    d[b].teamobj.membersCnt = e;
                    break
                }
            for (b = 0; b < f.length; ++b)
                for (var c =
                    0; c < d.length; ++c)
                    if (d[c].value == f[b]) {
                        console.log("splicing", d[c].value);
                        d.splice(c, 1);
                        break
                    }
            console.log("!!!!!!!!!!!", d);
            a(d)
        })
    },
    filterMailContacts: function(a) {
        for (var b = [], c = 0; c < a.length; ++c) - 1 != [1, 3].indexOf(a[c].source) && a[c].value != HFN.config.user.email && b.push(a[c]);
        return b
    },
    initShareFolder: function(a) {
        var b = HFN.renderTemplate("#sharefolder");
        console.log("meta is", a);
        Popup.open(b, {
            title: __("Invite Collaborators to '%foldername%'", !1, {
                foldername: a.name
            }),
            dont_translate_title: !0
        });
        Popup.startLoading({
            now: !0
        });
        var c = function(a) {
                var b = HFN.renderTemplate("#share-entity", {
                    name: p(a)
                }, {
                    escape: !1
                });
                b.find(".entity-permission").append(g(a).on("change", function() {
                    console.log("da val", $(this).data("val"));
                    f(a, $(this).data("val"))
                }));
                if (q(a) || r(a)) b.addClass("request"), b.find("select").attr("disabled", "disabled");
                a.fromuserid || b.find(".entity-permission select option:last-child").remove();
                console.log(b.find(".entity-permission select"), calcPermissions(a));
                b.find(".entity-name").prepend(s(a));
                if (r(a)) b.find(".entity-remove").remove();
                else b.find(".entity-remove").on("click", k.bind(null, a, !1));
                return b
            },
            d = function(d) {
                HFN.getFolderShares(a, function(f) {
                    u = f;
                    b.find(".share-collaborators-list-obj").empty();
                    for (var g = 0; g < f.length; ++g) c(f[g]).appendTo(b.find(".share-collaborators-list-obj"));
                    f.length ? (b.find(".share-collaborators-empty").hide(), a.ismine && b.find(".closeall").show()) : (b.find(".share-collaborators-empty").show(), b.find(".closeall").hide());
                    e();
                    d && d()
                }, {
                    fresh: !0
                })
            },
            e = function() {
                b.find(".share-collaborators-list").scrollTop(b.find(".share-collaborators-list")[0].scrollHeight)
            },
            f = function(a, b) {
                var c = function() {
                    HFN.message("Share Modified.")
                };
                if (a.fromuserid) {
                    var d = {};
                    a.team ? (d.teamshareids = a.shareid, d.teampermissions = b) : (d.usershareids = a.shareid, d.userpermissions = b);
                    HFN.apiMethod("account_modifyshare", d, c)
                } else q(a) || r(a) || HFN.apiMethod("changeshare", {
                    shareid: a.shareid,
                    permissions: b
                }, c)
            },
            g = function(a, b) {
                var c = $("<span></span>"),
                    d, e = {
                        0: __("can view"),
                        7: __("can edit"),
                        15: __("can reshare")
                    };
                d = void 0 != a ? calcPermissions(a) : 0;
                c.append($('<input type="hidden" name=perm[]>').val(d)).append($('<span class="cselect-value"></span>').text(e[d])).append('<img src="/img/permission-ddown.png">').data("val",
                    d);
                if (a && (q(a) || r(a))) return c.find("img").remove(), c;
                d = [
                    [__("can view"), 0],
                    [__("can edit"), 7]
                ];
                (b && HFN.config.isBusiness() || !b && a.fromuserid) && d.push([__("can reshare"), 15]);
                console.log("list data", a, !!a.fromuserid);
                dropDown.bindList(d, c, {
                    direction: dropDown.DIR_LEFT,
                    childDirection: dropDown.DIR_LEFT,
                    position: "fixed",
                    holderClass: "mnnew",
                    eventTrigger: "click",
                    overwriteTip: {
                        right: "4px"
                    },
                    buildCell: function(a, b) {
                        console.log(a);
                        return $("<a>").attr("href", "javascript:void(0);").append($("<li>").text(a[0])).on("click",
                            function(b) {
                                b.preventDefault();
                                b.stopPropagation();
                                a[1] != c.data("val") && (c.find("span").text(a[0]), c.find("input").val(a[1]), c.data("val", a[1]), c.trigger("change"));
                                dropDown.resetTo(0)
                            }).appendTo(b)
                    },
                    buildHolder: function(a) {
                        console.log("!! got obj", a, a.hasClass("sub"));
                        a.hasClass("sub");
                        a.addClass("mn-blue mn-perm");
                        a.css("z-index", 2E4)
                    }
                });
                return c
            },
            k = function(a) {
                b.find(".share-all").hide();
                b.find(".alert").show();
                b.find(".alert h3").text(__("Stop Access"));
                b.find(".alert .alert-text").html(__("This action will terminate the access of <b>%name%</b> to this folder.", !1, {
                    name: p(a, !0)
                }));
                b.find(".alert .continuebut").text(__("Stop Access")).off("click").on("click", function(c) {
                    $.when(l(a, !1)).then(function(a) {
                        b.find(".share-all").show();
                        b.find(".alert").hide()
                    })
                });
                b.find(".alert .cancelbut").text(__("Cancel")).off("click").on("click", function(a) {
                    b.find(".share-all").show();
                    b.find(".alert").hide()
                })
            },
            l = function(a, b) {
                console.log("removing", a);
                var c = function(a) {
                        console.log("the quiet", b);
                        console.log("the message", a);
                        b || HFN.message(a || "Share stopped.");
                        d.resolve()
                    },
                    d = $.Deferred();
                if (a.fromuserid) {
                    var e = {};
                    a.team ? e.teamshareids = a.shareid : e.usershareids = a.shareid;
                    HFN.apiMethod("account_stopshare", e, c.bind(null, "Share Removed."))
                } else q(a) ? HFN.apiMethod("cancelsharerequest", {
                    sharerequestid: a.sharerequestid
                }, c.bind(null, "Share Removed.")) : HFN.apiMethod("removeshare", {
                    shareid: a.shareid
                }, c.bind(null, "Share Removed."));
                return d
            },
            m = function() {
                console.log("stoping all", u);
                b.find(".share-all").hide();
                b.find(".alert").show();
                b.find(".alert h3").text(__("Stop Access"));
                b.find(".alert .alert-text").text(__("Invited collaborators will no longer have access to this folder."));
                b.find(".alert .continuebut").text(__("Stop Access")).off("click").on("click", function(b) {
                    b = [];
                    for (var c = 0; c < u.length; ++c) b.push(l(u[c], !0));
                    $.when($, b).then(function() {
                        HFN.message("Shared access cancelled.");
                        Popup.close();
                        HFN.cache.expire(HFN.cache.cacheid("publinks", "all"));
                        HFN.gridUpdate(a, !0)
                    })
                });
                b.find(".alert .cancelbut").text(__("Cancel")).off("click").on("click", function(a) {
                    b.find(".share-all").show();
                    b.find(".alert").hide()
                })
            },
            q = function(a) {
                return "sharerequestid" in a
            },
            r = function(a) {
                return a.fromuserid && a.fromuserid != HFN.config.user.userid && a.ownerid != HFN.config.user.userid || a.owneruserid && a.owneruserid != HFN.config.user.userid && a.folderowneruserid != HFN.config.user.userid
            },
            p = function(a, b) {
                if (a.fromuserid) {
                    if (a.team) return htmlentities(HFN.strFit(a.teamobj.name, 40));
                    var c = htmlentities(HFN.strFit(PCB.buildUsername(a.userobj), 40));
                    a.userobj.id == HFN.config.user.account.id && (c += " (<span>" + __("me") + "</span>)");
                    return c
                }
                return htmlentities(HFN.strFitMail(a.tomail, 40) + (q(a) && !b ? " (" + __("pending") + ")" : ""))
            },
            s = function(a) {
                console.log("!!! icon", a);
                return a.fromuserid ? a.team ? '<img width="32" height="32" src="/img/b/team.png">' : '<img width="32" height="32" src="' + HFN.prepUrl(a.userobj.avatar) + '">' : '<img width="32" height="32" src="/img/share-mail.png">'
            },
            t = [],
            v, x, u, z;
        b.find(".tomails").on("focus", "input", function() {
            b.find(".share-add .expand").show();
            b.find(".share-footer").hide();
            b.find(".share-add-perm").show();
            b.find(".share-add-perm-info").show()
        });
        b.find(".cancel-butt").on("click", function(a) {
            $(".combo-res").tooltip("hide");
            x.clearList();
            $(".tomails input:focus").blur();
            b.find(".share-add .expand").hide();
            b.find(".share-footer").show();
            b.find(".share-add-perm").hide();
            b.find(".share-add-perm-info").hide()
        });
        d();
        (function() {
            z = HFN.diff.subscribe("requestsharein requestshareout acceptedsharein acceptedshareout declinedsharein declinedshareout cancelledsharein cancelledshareout removedsharein removedshareout modifiedsharein modifiedshareout establishbshareout modifybshareout removebshareout establishbsharein modifybsharein removedbsharein".split(" "),
                function(a) {
                    d()
                })
        })();
        $(Popup).on("mclose.sub", function() {
            console.log("unsub", z);
            HFN.diff.unsubscribe(z)
        });
        var A;
        b.find(".import-gmail").on("click", A = function(a) {
            $(this).before('<img src="/img/importing.gif" class="import-loading">');
            $(this).addClass("importing");
            var b = this;
            ContactsGmail.getTokenCallback(function(a) {
                console.log("got token: ", a);
                a ? (HFN.message(__("Loading Gmail contacts..."), "info"), HFN.apiMethod("contactload", {
                        code: a,
                        source: 3,
                        redirect_uri: ContactsGmail.auth_config.params.redirect_uri
                    },
                    function(a) {
                        HFN.message(__("Gmail contacts loaded."), "info");
                        v.clear();
                        HFN.loadShareContacts(function(a) {
                            v.add(a)
                        }, {
                            forceFresh: !0
                        });
                        $(b).on("click", A).removeClass("importing");
                        $(b).parent().find(".import-loading").remove()
                    }, {
                        type: "post",
                        errorCallback: function() {
                            HFN.message("There's been an error loading your contacts. Please, try again.")
                        }
                    })) : ($(b).on("click", A).removeClass("importing"), $(b).parent().find(".import-loading").remove())
            });
            $(this).off("click")
        });
        b.find(".share-add-perm").append(g({
            canview: !0,
            cancreate: !0,
            canmodify: !0
        }, !0));
        b.find(".share-add-perm").hide();
        b.find(".share-add-perm-info").hide();
        var y = HFN.renderTemplate("#perm-explain");
        HFN.config.isBusiness() || y.find("div.manage").remove();
        popOver.attach({
            el: b.find(".share-add-perm-info"),
            pos: HFN.config.isRtl() ? "left" : "right",
            valign: "center",
            obj: y,
            trigger: "mouseover"
        });
        if (a.ismine) b.find(".closeall").show().on("click", m);
        HFN.loadShareContacts(function(c) {
            v = new Bloodhound({
                name: "name",
                datumTokenizer: function(a) {
                    var b = Bloodhound.tokenizers.whitespace(a.name.replace(/\(?\)?/g,
                        "")); - 1 == b.indexOf(a.name.replace(/\(?\)?/g, "")) && b.push(a.name.replace(/\(?\)?/g, ""));
                    validateEmail(a.value) && -1 == b.indexOf(a.value.replace(/\(?\)?/g, "")) && b.push(a.value.replace(/\(?\)?/g, ""));
                    a.userobj && b.push(a.userobj.email);
                    return b
                },
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: c
            });
            var f = v.get;
            v.get = function(a, b) {
                return f.apply(v, [a,
                    function(c) {
                        if (!c) return b(c);
                        c.forEach(function(b) {
                            var c = b.name.toLowerCase(),
                                d = Bloodhound.tokenizers.whitespace(c.replace(/\(?\)?/g, "")); - 1 == d.indexOf(c.replace(/\(?\)?/g,
                                "")) && d.push(c.replace(/\(?\)?/g, ""));
                            for (var e = c = 0; e < d.length; ++e) 0 == d[e].indexOf(a) && c++;
                            b.exact_match = c
                        });
                        console.log(c);
                        c.sort(function(a, b) {
                            return a.exact_match > b.exact_match ? -1 : a.exact_match < b.exact_match ? 1 : 0
                        });
                        b(c)
                    }
                ])
            };
            v.initialize();
            var g = {
                place: ".tomails",
                name: "emails",
                width: 588,
                innerWidth: 468,
                sourceKey: "name",
                focusOnInit: !1,
                source: v,
                placeholder: HFN.config.isBusiness() ? __("Team, Name or Email") : __("Name or Email"),
                maxNotFoundSymbols: 5,
                suggestOnFocus: !0,
                getShowVal: function(a) {
                    return validateEmail(a) ?
                        HFN.strFitMail(a, 40) : HFN.strFit(a, 40)
                },
                onRemoveResultBox: function(a, b) {
                    console.log("bb", a);
                    a.find(".combo-res").tooltip("destroy")
                },
                fancyResultBox: function(a, b) {
                    var c;
                    console.log(a.data());
                    b && b.data ? (c = b.data, 2 == c.source ? a.prepend('<img src="/img/fb-tag.png" width="16" height="16" class="inf">') : 3 == c.source ? (a.prepend('<img src="/img/gm-tag.png" width="16" height="16" class="inf">'), a.parent().tooltip("destroy").attr("title", c.value).tooltip({
                            container: ".tomails"
                        })) : 1 == c.source ? a.prepend('<img src="/img/or-mail-small.png" width="16" height="16" class="inf">') :
                        1001 == c.source ? (a.prepend('<img src="' + HFN.prepUrl(c.userobj.avatar) + '" width="16" height="16" class="inf">'), a.parent().tooltip("destroy").attr("title", c.userobj.email).tooltip({
                            container: ".tomails"
                        })) : 1002 == c.source && a.prepend('<img src="/img/b/team.png" width="16" height="16" class="inf">')) : a.data("val") && validateEmail(a.data("val")) && (a.prepend('<img src="/img/or-mail-small.png" width="16" height="16" class="inf">'), a.parent().tooltip("destroy").attr("title", a.data("val")).tooltip({
                        container: ".tomails"
                    }))
                },
                imgCloseFile: "/img/close-label.png",
                extraMulticompleteOpts: {
                    suggestAt: ".tomails",
                    boxRender: function(a) {
                        var b = $("<div>"),
                            c = $('<img width="32" height="32">');
                        b.addClass("clearfix").append($('<div class="iconw"></div>').append(c)).append($('<div class="textpart"></div>').append($('<span class="title"></span>').text(a.name)).append($('<span class="explain"></span>')));
                        "import" == a.source ? ("Facebook" == a.value ? c.attr("src", "/img/fab.png") : "Gmail" == a.value && c.attr("src", "/img/gmail.png"), b.find(".explain").text(__("Import contacts from %source%", !1, {
                            source: a.value
                        }))) : 3 == a.source ? (c.attr("src", "/img/gmail.png"), b.find(".explain").text(a.value)) : 2 == a.source ? (c.attr("src", "https://graph.facebook.com/" + a.value + "/picture?type=square"), b.find(".iconw").append('<img src="/img/fb-over.png" class="smicon">'), b.find(".explain").text(__("Facebook Message"))) : 1 == a.source ? (c.attr("src", "/img/or-mail.png"), b.find(".explain").text(__("Send Email"))) : 1001 == a.source ? (c.attr("src", HFN.prepUrl(a.userobj.avatar)), b.find(".explain").text(a.userobj.email)) : 1002 ==
                            a.source && (c.attr("src", "/img/b/team.png"), b.find(".explain").text(__("%num% member(s)", !1, {
                                num: PCB.teamUserCount(a.teamobj)
                            })));
                        return b
                    }
                }
            };
            Popup.stopLoading();
            Popup.onLoad(function() {
                x = new combo2(g);
                e()
            });
            var k;
            $(".send-share-but").on("click", k = function() {
                var c = x.getFullVals(!0),
                    e = b.find("textarea").val(),
                    f = [],
                    g = [],
                    l = [],
                    r = 0,
                    s = 0;
                if (c.length) {
                    console.log("go go go", e);
                    for (var m = 0; m < c.length; ++m) console.log(c[m]), c[m].data && -1 != [1, 3].indexOf(c[m].data.source) ? f.push({
                            email: c[m].data.value,
                            obj: c[m].obj
                        }) :
                        c[m].data && 1001 == c[m].data.source ? g.push({
                            buser: c[m].data,
                            obj: c[m].obj
                        }) : c[m].data && 1002 == c[m].data.source ? l.push({
                            bteam: c[m].data,
                            obj: c[m].obj
                        }) : validateEmail(c[m].val) ? (f.push({
                            email: c[m].val,
                            obj: c[m].obj
                        }), c[m].data || -1 != t.indexOf(c[m].val) || (v.add([{
                            name: c[m].val,
                            value: c[m].val,
                            source: 1
                        }]), t.push(c[m].val))) : c[m].obj.addClass("error").find(".combo-res").tooltip("destroy").attr("title", __("This is not a valid contact or an email.")).tooltip({
                            container: ".tomails"
                        });
                    $(".modal .combo-wrap.error .combo-res").tooltip("hide");
                    $($(".modal .combo-wrap.error .combo-res")[0]).tooltip("show");
                    if (f.length || g.length || l.length) {
                        s = b.find(".share-add-perm > span").data("val");
                        r = Math.min(7, s);
                        console.log("mails", f);
                        console.log("busers", g);
                        console.log("bteams", l);
                        for (var q = [], p = [], z = [], m = 0; m < f.length; ++m)(function(b) {
                            q.push(HFN.apiMethod("sharefolder", {
                                folderid: a.folderid,
                                mail: f[b].email,
                                permissions: r,
                                message: e
                            }, function(a) {
                                p.push(function() {
                                    f[b].obj.remove()
                                }); - 1 != t.indexOf(f[b].email) && z.push(f[b].email)
                            }, {
                                errorCallback: function(a) {
                                    p.push(function() {
                                        f[b].obj.addClass("error").find(".combo-res").tooltip("destroy").attr("title",
                                            __(a.error)).tooltip({
                                            container: ".tomails"
                                        })
                                    })
                                }
                            }))
                        })(m);
                        for (m = 0; m < g.length; ++m)(function(b) {
                            q.push(HFN.apiMethod("sharefolder", {
                                folderid: a.folderid,
                                mail: g[b].buser.userobj.email,
                                permissions: s,
                                message: e
                            }, function(a) {
                                p.push(function() {
                                    g[b].obj.remove()
                                })
                            }, {
                                errorCallback: function(a) {
                                    p.push(function() {
                                        g[b].obj.addClass("error").find(".combo-res").tooltip("destroy").attr("title", __(a.error)).tooltip({
                                            container: ".tomails"
                                        })
                                    })
                                }
                            }))
                        })(m);
                        for (m = 0; m < l.length; ++m)(function(b) {
                            q.push(HFN.apiMethod("account_teamshare", {
                                folderid: a.folderid,
                                teamid: l[b].bteam.teamobj.id,
                                permissions: s,
                                message: e
                            }, function(a) {
                                p.push(function() {
                                    l[b].obj.remove()
                                })
                            }, {
                                errorCallback: function(a) {
                                    p.push(function() {
                                        l[b].obj.addClass("error").find(".combo-res").tooltip("destroy").attr("title", __(a.error)).tooltip({
                                            container: ".tomails"
                                        })
                                    })
                                }
                            }))
                        })(m);
                        var u = this;
                        $.when.apply($, q).then(function() {
                            for (var a = 0; a < p.length; ++a) p[a]();
                            (l.length || g.length) && d();
                            $(".modal .combo-wrap.error .combo-res").tooltip("hide");
                            $($(".modal .combo-wrap.error .combo-res")[0]).tooltip("show");
                            $(u).on("click", k);
                            x.onRemove();
                            1 == b.find(".combo-contain-inner").children().length && b.find(".cancel-butt").trigger("click");
                            z.length && (HFN.apiMethod("contactload", {
                                source: 1,
                                mails: z.join(",")
                            }, function() {}), z = [])
                        });
                        $(this).off("click")
                    }
                }
            })
        })
    },
    initComboShare: function(a, b) {
        if (HFN.config.user.emailverified) {
            var c = HFN.renderTemplate("#businessShare"),
                d = [],
                e = [],
                f = [];
            HFN.config.isBusiness() && (f.push(HFN.apiMethod("account_users", {
                withavatars: 1
            }, function(a) {
                for (var b = 0; b < a.users.length; ++b)!1 == a.users[b].active &&
                    !1 == a.users[b].frozen || d.push($.extend(a.users[b], {
                        entype: "user",
                        entname: PCB.buildUserinfo(a.users[b]),
                        avatarurl: a.users[b].avatar ? HFN.prepUrl(a.users[b].avatar) : "/img/b/default-avatar.png",
                        statusclass: a.users[b].active ? "entactive" : "entinactive"
                    }))
            }, {
                forceFresh: !0
            })), f.push(HFN.apiMethod("account_teams", {
                showlinks: 1,
                showeveryone: 1
            }, function(a) {
                for (var b = 0; b < a.teams.length; ++b) d.push($.extend(a.teams[b], {
                    entype: "team",
                    entname: a.teams[b].name,
                    avatarurl: "/img/b/team.png",
                    statusclass: a.teams[b].active ?
                        "entactive" : "entinactive"
                }))
            }, {
                forceFresh: !0
            })), f.push(HFN.apiMethod("account_listshares", {}, function(b) {
                e = PCB.getSharesForFolder(b.shares.outgoing.concat(b.shares.manage), a)
            }, {
                forceFresh: !0
            })));
            var g = function(a, b) {
                    var c = HFN.renderTemplate("#businessShareEntity", {
                        name: "user" == a.entype ? a.firstname + " " + a.lastname : a.name,
                        members: "team" == a.entype ? __("%memnum% members").replace("%memnum%", a.members.filter(function(a) {
                            return !0 == a.user.active || !0 == a.user.frozen
                        }).length) : ""
                    }).addClass("ent" + a.entype + a.id);
                    console.log("!ENTITY", a);
                    if (!a.active || void 0 != a.frozen && a.frozen) c.addClass("inactiventity"), c.find("span.name").append('<span class="inact"> (' + htmlentities(__("deactivated")) + ")</span>");
                    var d = b ? PCB.permToBit(b) : 0;
                    c.find("span.name").before('<img src="' + a.avatarurl + '" style="width: 32px; height: 32px;">');
                    c.find(".maxi").on("click", function(a) {
                        c.removeClass("minim");
                        a.stopPropagation()
                    });
                    c.find(".mini").on("click", function(a) {
                        c.addClass("minim");
                        a.stopPropagation()
                    });
                    c.find(".remove").on("click",
                        function(a) {
                            "new" == c.data("tp") ? q(c) : (c.data("tp", "remove").addClass("removing"), k())
                        });
                    c.find(".undo").on("click", function(a) {
                        c.data("tp", "preload").removeClass("removing")
                    });
                    c.on("click", function(a) {
                        c.hasClass("minim") ? c.removeClass("minim") : !$(a.target).hasClass("ehead") || c.hasClass("minim") || c.hasClass("removing") || c.addClass("minim")
                    });
                    "team" == a.entype && (c.find(".extra").show(), c.find(".members").on("click", function(b) {
                        var d = c.find(".memberslist");
                        d.hasClass("expand") ? d.empty().removeClass("expand") :
                            HFN.apiMethod("account_users", {
                                withavatars: 1,
                                showteams: 1
                            }, function(b) {
                                var c = PCB.filterTeams(b.users, a.id);
                                b = 0;
                                d.empty().addClass("expand");
                                for (console.log("team users", c); b < c.length; ++b)(function(a) {
                                    $("<div></div>").append('<img src="' + HFN.prepUrl(c[a].avatar) + '" style="width: 32px; height: 32px;">').append($("<span>" + PCB.buildUserinfo(c[a], 45) + "</span>").on("click", function() {
                                        d.empty().removeClass("expand");
                                        l($.extend(c[a], {
                                            entype: "user",
                                            entname: PCB.buildUserinfo(c[a]),
                                            avatarurl: HFN.prepUrl(c[a].avatar)
                                        }))
                                    })).appendTo(d)
                                })(b)
                            })
                    }));
                    for (var e = [
                        [__("Read"), 0],
                        [__("Create"), 1],
                        [__("Modify"), 2],
                        [__("Delete"), 4],
                        [__("Manage"), 8]
                    ], f = 0, g; f < e.length; ++f) {
                        $("<label></label>").addClass("perm" + e[f][1]).append(g = $('<input type="checkbox" name="perm[]" value="' + a.entype + "_" + ("team" == a.entype ? a.id : a.email) + "_" + e[f][1] + '">')).append(e[f][0]).appendTo(c.find(".permissions"));
                        if (e[f][1])
                            if (8 == e[f][1]) g.on("change", function(a) {
                                this.checked && $(this).parent().siblings().find("input").prop("checked", !0)
                            });
                            else g.on("change", function(a) {
                                this.checked ||
                                    $(this).parent().siblings(".perm8").find("input").prop("checked", !1)
                            });
                        else g.prop("checked", !0).on("mousedown", function(a) {
                            a.preventDefault()
                        }).on("mouseup", function(a) {
                            a.preventDefault()
                        }).on("click", function(a) {
                            a.preventDefault()
                        });
                        g.on("change", function(a) {
                            a = $(this).parents(".entity");
                            console.log("change!", $(this).parents(".entity").data("tp"));
                            "preload" == a.data("tp") && a.data("tp", "modify");
                            k()
                        });
                        d && d & e[f][1] && g.prop("checked", !0)
                    }
                    return c
                },
                k = function() {
                    c.find(".butt-area .savebut").removeClass("graybut").addClass("greenbut")
                },
                l = function(a, b, d) {
                    c.find(".collaborators .ent" + a.entype + a.id).length || g(a, b).data({
                        tp: d ? "preload" : "new",
                        entity: a,
                        share: d || null
                    }).appendTo(c.find(".collaborators"));
                    c.find(".collaborators .ent" + a.entype + a.id).effect({
                        color: "#e8e8e8",
                        effect: "highlight",
                        duration: 700
                    });
                    c.find(".collaborators .nocollabs").hide();
                    m();
                    d || k()
                },
                m = function() {
                    $(c.find(".collaborators")).scrollTop(c.find(".collaborators")[0].scrollHeight)
                },
                q = function(a) {
                    var b = a.data("share");
                    a.remove();
                    1 == c.find(".collaborators").children().length &&
                        (c.find(".collaborators .nocollabs").show(), c.find(".butt-area .savebut").removeClass("greenbut").addClass("graybut"));
                    b && (a = {}, a[b.user ? "usershareids" : "teamshareids"] = b.shareid, HFN.apiMethod("account_stopshare", a, function(a) {}))
                },
                r = function(a) {
                    console.log("!DA SHARES", a);
                    for (var b = 0, c; b < a.length; ++b) {
                        a: {
                            c = a[b];
                            console.log(c);
                            for (var e = 0; e < d.length; ++e)
                                if ("team" == d[e].entype && c.team && c.toteamid == d[e].id) {
                                    c = d[e];
                                    break a
                                } else if ("user" == d[e].entype && c.user && c.touserid == d[e].id) {
                                c = d[e];
                                break a
                            }
                            c = !1
                        }
                        c &&
                            (l(c, a[b].permissions, a[b]), console.log("got ent", c.entname, c.avatarurl));
                        console.log("!FOUND", c)
                    }
                },
                p = function() {
                    var b = [];
                    c.find(".entity").each(function(a, c) {
                        var d = {
                            act: $(c).data("tp"),
                            share: $(c).data("share"),
                            ent: $(c).data("entity"),
                            perm: 0
                        };
                        $(c).find("input:checked").each(function(a, b) {
                            var c = b.value.split("_");
                            d.perm += parseInt(c[c.length - 1])
                        });
                        console.log(d);
                        console.log("entobj", d);
                        b.push(d)
                    });
                    console.log("save", b);
                    var d = new batchApiCall({
                            continueOnError: !1,
                            errorCallback: function(a) {
                                var b = a.error;
                                2076 == a.result && (b = "You do not have the permission to share.");
                                HFN.message(b, "error");
                                Popup.close()
                            }
                        }),
                        e = 0;
                    if (b.length) {
                        for (; e < b.length; ++e)
                            if ("new" == b[e].act) "user" == b[e].ent.entype ? d.addCall("sharefolder", {
                                mail: b[e].ent.email,
                                folderid: a.folderid,
                                permissions: b[e].perm
                            }, {
                                errorCallback: function(a) {
                                    HFN.message(a.error, "error")
                                }
                            }) : d.addCall("account_teamshare", {
                                teamid: b[e].ent.id,
                                folderid: a.folderid,
                                permissions: b[e].perm
                            });
                            else if ("modify" == b[e].act) "user" == b[e].ent.entype ? d.addCall("account_modifyshare", {
                            usershareids: b[e].share.shareid,
                            userpermissions: b[e].perm
                        }) : d.addCall("account_modifyshare", {
                            teamshareids: b[e].share.shareid,
                            teampermissions: b[e].perm
                        });
                        else if ("remove" == b[e].act) {
                            var f = {};
                            f[b[e].share.user ? "usershareids" : "teamshareids"] = b[e].share.shareid;
                            d.addCall("account_stopshare", f)
                        }
                        Popup.startLoading();
                        d.execute(function() {
                            HFN.message("Saved.");
                            Popup.close();
                            PCB.refreshAll()
                        })
                    } else Popup.close()
                };
            Popup.open(c, {
                title: "Share Folder",
                business: HFN.config.isBusiness(),
                clickClose: !1
            });
            c.find(".butt-area").prepend($('<div class="button linebut graybut modernbut savebut">' +
                __("Save") + "</div>").on("click", function() {
                $(this).hasClass("greenbut") && p()
            }));
            Popup.startLoading({
                now: 1
            });
            $.when.apply($, f).then(function() {
                console.log(d);
                var b = new Bloodhound({
                    name: "entname",
                    datumTokenizer: function(a) {
                        return Bloodhound.tokenizers.whitespace(a.entname.replace(/\(?\)?/g, ""))
                    },
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    local: d
                });
                b.initialize();
                var f = $("input[name=collab]");
                f.typeahead(null, {
                    name: "collaborators",
                    displayKey: function(a) {
                        return a.entname
                    },
                    source: b.ttAdapter(),
                    templates: {
                        header: Handlebars.compile("<div></div>"),
                        footer: Handlebars.compile("<div></div>"),
                        suggestion: Handlebars.compile('<div class="mentionuser {{statusclass}}"><img src="{{avatarurl}}" width="32" height="32">{{entname}}</div>')
                    }
                }).on("typeahead:selected", function(a) {
                    a = f.typeahead("val");
                    f.typeahead("val", "");
                    b: {
                        for (var b = 0; b < d.length; ++b)
                            if (d[b].entname == a) {
                                a = d[b];
                                break b
                            }
                        a = !1
                    }
                    a && (c.find(".collaborators .ent" + a.entype + a.id).length || g(a, void 0).data({
                        tp: "new",
                        entity: a,
                        share: null
                    }).appendTo(c.find(".collaborators")), c.find(".collaborators .ent" +
                        a.entype + a.id).effect({
                        color: "#e8e8e8",
                        effect: "highlight",
                        duration: 700
                    }), c.find(".collaborators .nocollabs").hide(), m(), k())
                });
                c.find(".modal-files").empty().append(HFN.buildFilePreview([a], {}));
                Popup.stopLoading();
                r(e)
            });
            c.find(".addentitybut").on("click", function(a) {
                c.find("input[name=collab]").trigger("typeahead:selected")
            });
            return c
        }
        HFN.message("Please verify your email address to perform this action.", "error")
    },
    businessShareChoice: function(a) {
        var b = this.renderTemplate("#businessShareChoice"),
            c = a ? [a] : FileSelection.getSelectionInfo();
        Popup.open(b, {
            title: "Choose how to share"
        });
        Popup.startLoading({
            now: !0
        });
        b.find(".modal-files").empty().append(HFN.buildFilePreview(c, {
            onLoad: function() {
                HFN.config.isMobile() || Popup.stopLoading()
            }
        }));
        if (PCB.permissions.canShareOutsideCompany()) b.find(".share_outside").on("click", function(a) {
            Popup.close();
            HFN.shareItem(c[0])
        });
        else b.find(".shareoutside").addClass("disabled"); if (PCB.permissions.canShareWithCompany()) b.find(".share_bus").on("click", function(a) {
            Popup.close();
            HFN.initComboShare(c[0])
        });
        else b.find(".sharebusiness").addClass("disabled"); if (PCB.permissions.canCreateDownloadLinks()) b.find(".share_dlink").on("click", function(b) {
            HFN.getPublink(a, function(b) {
                Popup.close();
                b ? HFN.sharePublink(b) : HFN.createPublink(a)
            })
        });
        else b.find(".sharepublink").addClass("disabled"); if (PCB.permissions.canCreateUploadLinks()) b.find(".share_uplink").on("click", function(b) {
            HFN.getPuplink(a, function(b) {
                Popup.close();
                b ? HFN.sharePublink(b) : HFN.createPuplink(a)
            })
        });
        else b.find(".sharepuplink").addClass("disabled");
        b.find(".choicewrap>div.disabled").length ? b.find(".whynot.global").show() : b.find(".whynot.global").hide();
        kiro = b
    },
    shareChoice: function(a) {
        if (HFN.config.isBusiness()) this.businessShareChoice(a);
        else {
            if (HFN.config.isMobile()) var b = HFN.renderTemplate("#shareChoiceMobile", {}),
                c = a ? [a] : FileSelection.getSelectionInfo();
            else b = HFN.renderTemplate("#shareChoice", {}), c = a ? [a] : FileSelection.getSelectionInfo();
            b.find(".share").on("click", function(a) {
                Popup.close();
                HFN.shareItem(c[0])
            });
            if (HFN.config.isBusiness()) b.find(".business_share").on("click",
                function(a) {
                    Popup.close();
                    HFN.initComboShare(c[0])
                });
            else b.find(".choices").width(630), b.find(".choices .collaborate_business").remove();
            b.find(".dlink").on("click", function(b) {
                HFN.getPublink(a, function(b) {
                    Popup.close();
                    b ? HFN.sharePublink(b) : HFN.createPublink(a)
                })
            });
            b.find(".ulink").on("click", function(b) {
                HFN.getPuplink(a, function(b) {
                    Popup.close();
                    b ? HFN.sharePublink(b) : HFN.createPuplink(a)
                })
            });
            HFN.config.isMobile() ? MobilePopup.open(b, {
                title: "Share Folder"
            }) : (Popup.open(b, {
                    title: "Share Folder"
                }),
                Popup.startLoading({
                    now: !0
                }));
            b.find(".modal-files").empty().append(HFN.buildFilePreview(c, {
                onLoad: function() {
                    HFN.config.isMobile() || Popup.stopLoading()
                }
            }))
        }
    },
    shareStop: function(a) {
        var b = function(a, d, e) {
            for (var f = 0; f < d.length; ++f)
                if (a.folderid && d[f].folderid == a.folderid) {
                    e(d[f]);
                    return
                }
            HFN.getFolderCallback(a.parentfolderid, function(a) {
                b(a, d, e)
            })
        };
        HFN.apiMethod("listshares", {}, function(c) {
            b(a, c.shares.incoming, function(a) {
                HFN.initRemoveShare(a)
            })
        })
    },
    deleteSelection: function(a, b) {
        var c = a ? [a] : FileSelection.getSelectionInfo(),
            d = new batchApiCall({
                sequential: !0,
                errorCallback: function(a, b) {
                    var c = a.error;
                    2028 == a.result && (c = "You have pending shares or share requests for this folder. You need to stop or revoke them before trying to delete this folder.");
                    HFN.message((b.params.name ? '"' + b.params.name + '": ' : "") + c, "error")
                }
            });
        if (c.length) {
            for (var e = function(a) {
                if (a.isfolder) {
                    a.contents || console.log("NO CONTENTS ", a);
                    for (var b = 0; b < a.contents.length; ++b) e(a.contents[b]);
                    d.addCall("deletefolder", {
                        folderid: a.folderid,
                        name: a.name
                    })
                } else d.addCall("deletefile", {
                    fileid: a.fileid,
                    name: a.name
                })
            }, f = 0; f < c.length; ++f) e(c[f]);
            d.execute(b)
        } else b()
    },
    deleteItem: function(a, b) {
        var c = $('<div><div class="modal-small" style="padding: 15px; padding-bottom: 20px;"><div class="question" style="margin-top: -15px">' + i18n.get("Do you want to delete:") + '</div><div class="modal-files"></div></div><div class="butt-area"></div></div>'),
            d = a ? [a] : FileSelection.getSelectionInfo();
        Popup.open(c, {
            title: "Delete ...",
            clickClose: !1
        });
        Popup.startLoading({
            now: !0
        });
        c.find(".modal-files").empty().append(HFN.buildFilePreview(d, {
            onLoad: Popup.stopLoading.bind(Popup)
        }));
        var e = new batchApiCall({
                errorCallback: function(a, b) {
                    console.log("in error callback: ", a, b);
                    HFN.message((b.params.name ? '"' + b.params.name + '": ' : "") + a.error, "error");
                    e.abort();
                    Popup.stopLoading();
                    Popup.close()
                }
            }),
            f = function() {
                e.abort();
                Popup.stopLoading();
                Popup.close()
            };
        c.find(".butt-area").append($('<div class="button smallbut redbut linebut modernbut">').text(i18n.get("Delete")).on("click.delete", function(a) {
            $(this).off("click.delete");
            Popup.startLoading({
                stopCallback: f,
                processExplain: "Deleting " + HFN.calcSelectionItems(d) + " items ...",
                processStopText: "Cancel"
            });
            a = function(a) {
                a.isfolder ? e.addCall("deletefolderrecursive", {
                    folderid: a.folderid,
                    name: a.name
                }) : e.addCall("deletefile", {
                    fileid: a.fileid,
                    name: a.name
                })
            };
            for (var b = 0; b < d.length; ++b) a(d[b]);
            e.execute(function() {
                HFN.message("Items are deleted.");
                Popup.stopLoading().close()
            })
        }));
        c.find(".butt-area").append($('<div class="button smallbut darkbut linebut modernbut">').text(i18n.get("Cancel")).click(function(a) {
            Popup.close()
        }))
    },
    itemInfo: function(a) {
        console.log("INFO ", a);
        var b = this.renderTemplate(".fileInfo"),
            c = a ? [a] : FileSelection.getSelectionInfo(),
            d = [
                [i18n.get("Content type"), HFN.prepMime(a.contenttype)],
                [i18n.get("Has thumb"), a.thumb ? i18n.get("Yes") : i18n.get("No")],
                [i18n.get("Is mine"), a.ismine ? i18n.get("Yes") : i18n.get("No")],
                [i18n.get("Is shared"), a.isshared ? i18n.get("Yes") : i18n.get("No")],
                [i18n.get("Created"), HFN.prepDt(a.created)],
                [i18n.get("Last Modify"), HFN.prepDt(a.modified)]
            ],
            e = 0,
            f = b.find("table");
        a.isfolder &&
            d.splice(0, 3);
        console.log(d);
        a.isfolder || d.unshift([i18n.get("Size"), HFN.formatSize(a.size) + (a.filescnt ? ", " + a.filescnt + " " + i18n.get("Files") : "")]);
        d.unshift([i18n.get("Parent Folder"), HFN.createIcon(HFN.ICO.FOLDER, HFN.ICONS.LIST_SMALL).addClass("icon").outerHTML() + HFN.metaName(HFN.data.fflookup["d" + a.parentfolderid])]);
        a.category == HFN.CATEGORY.IMAGE ? a.width && a.height && (d.push([i18n.get("Width"), a.width + "px"]), d.push([i18n.get("Height"), a.height + "px"])) : a.category == HFN.CATEGORY.VIDEO && a.width && a.height &&
            (d.push([i18n.get("Width"), a.width + "px"]), d.push([i18n.get("Height"), a.height + "px"]));
        for (; e < d.length; ++e) f.append("<tr><td><b>" + d[e][0] + "</b></td><td>" + d[e][1] + "</td></tr>");
        Popup.open(b, {
            title: "Item Details"
        });
        Popup.startLoading({
            now: !0
        });
        b.find(".modal-files").empty().append(HFN.buildFilePreview(c, {
            onLoad: function() {
                Popup.stopLoading()
            }
        }))
    },
    initRevisions: function(a) {
        var b = HFN.renderTemplate("#revisions", {});
        b.find(".modal-files").empty().append(HFN.buildFilePreview([a]));
        console.log(a);
        Popup.open(b, {
            title: 'Revisions "' + a.name + '"'
        });
        Popup.startLoading({
            now: !0
        });
        HFN.apiMethod("listrevisions", {
            fileid: a.fileid
        }, function(a) {
            console.log("revisions", a);
            for (var b = [], e = 0; e < a.revisions.length; ++e) b.push($.extend({}, a.metadata, a.revisions[e]));
            Popup.stopLoading();
            new Gridlist({
                options: {
                    place: ".revlist",
                    template: "revisions"
                },
                data: b
            })
        })
    },
    initRevertRev: function(a) {
        var b = HFN.renderTemplate("#revertRev", {
            revisionid: a.revisionid
        });
        b.find(".modal-files").empty().append(HFN.buildFilePreview([a]));
        b.find(".butt-area").append($('<div class="button linebut greenbut modernbut">' +
            i18n.get("Revert") + "</div>").on("click", function(b) {
            HFN.apiMethod("revertrevision", {
                fileid: a.fileid,
                revisionid: a.revisionid
            }, function(b) {
                HFN.cache.expire("api-listrevisions-fileid:" + a.fileid);
                "revisions" == $.bbq.getState("page") && $.bbq.pushState({
                    refresh: uniqueNum.get()
                });
                Popup.close();
                HFN.message(i18n.get("File") + a.name + " " + i18n.get("reverted to revision:") + " " + a.revisionid)
            })
        })).append($('<div class="button linebut darkbut modernbut">' + i18n.get("Close") + "</div>").on("click", Popup.close.bind(Popup)));
        Popup.open(b, {
            title: "Revert Revision"
        })
    },
    calcSelectionItems: function(a) {
        for (var b = 0, c = 0; b < a.length; ++b) c++, a[b].contents && (c += this.calcSelectionItems(a[b].contents));
        return c
    },
    initDownloadArchive: function(a) {
        if ("undefined" != typeof HFN.viewas && HFN.viewas) HFN.message(__("Access denied. You do not have permissions to perform this operation."), "error");
        else {
            var b = this.renderTemplate(".downloadArchiveNew");
            a && (FileSelection.reset(), FileSelection.add(a));
            b.find(".modal-files").empty().append(HFN.buildFilePreview(FileSelection.getSelectionInfo()));
            b.find("form").append('<input type="hidden" name="auth" value="' + HFN.config.auth + '">').append('<input type="hidden" name="filename" value="archive' + uniqueNum.get("dwl") + '.zip">');
            a = fs.getAsArrays();
            a.fileids && b.find("form").append('<input type="hidden" name="fileids" value="' + a.fileids.join(",") + '">');
            a.folderids && b.find("form").append('<input type="hidden" name="folderids" value="' + a.folderids.join(",") + '">');
            b.find(".butt-area").prepend($("<a>").addClass("button linebut greenbut modernbut").append('<img src="//d1q46pwrruta9x.cloudfront.net/img/save-share.png"> ' +
                i18n.get("Download") + " ").on("click", function(a) {
                a.preventDefault();
                b.find("form").submit();
                Popup.close()
            }));
            HFN.config.isMobile() ? MobilePopup.open(b, {
                title: "Download Archive"
            }) : Popup.open(b, {
                title: "Download Archive"
            })
        }
    },
    initExtract: function(a, b) {
        var c = [a],
            d = HFN.waitList,
            e = d.create(function() {
                Popup.stopLoading(!0).setPosition()
            });
        fileWait = d.addWait(e);
        folderWait = d.addWait(e);
        b = $.extend({}, {
            preselectFolder: a.parentfolderid
        }, b || {});
        cont = this.renderTemplate("#extractArchive", {
            foldertoxtract: a.name.replace("." +
                fileext(a.name), "/")
        });
        extractFolder = -1;
        cont.find(".modal-files").empty().append(HFN.buildFilePreview(c, {
            onLoad: function() {
                d.setDone(e, fileWait)
            }
        }));
        HFN.foldersCustom.buildFolderBrowse(0, cont.find(".folderlist"), {
            onSelect: function(a) {
                extractFolder = a
            },
            onLoad: function() {
                d.setDone(e, folderWait)
            },
            expandFirstLevel: !0,
            showCurrent: !0,
            focusCurrent: !0,
            canCreateFolders: !0,
            showNoWritePermissions: !0,
            preselectFolder: b.preselectFolder,
            canSelectCurrent: !0
        });
        var f = function(b) {
                var c = {
                    fileid: a.fileid,
                    tofolderid: b,
                    overwrite: "overwrite"
                };
                cont.find("input[name=xtractpass]").val().length && (c.password = cont.find("input[name=xtractpass]").val());
                Popup.startLoading({
                    now: !0
                });
                HFN.apiMethod("extractarchive", c, function(b) {
                    b.finished ? (HFN.message(__("Extract finished.")), Popup.close()) : (Popup.close(), HFN.initExtractProgress(a, b, c))
                }, {
                    errorCallback: function(b) {
                        Popup.close();
                        HFN.initExtract(a);
                        HFN.message(b.error, "error")
                    }
                })
            },
            c = function(b) {
                -1 == extractFolder ? HFN.message(__("You need to pick folder in order to extract archive."),
                    "error") : cont.find("#xnewf").prop("checked") ? HFN.getOrCreateFolder(a.name.replace("." + fileext(a.name), ""), extractFolder, function(a) {
                    f(a)
                }) : f(extractFolder)
            };
        cont.find(".extract").on("click", c);
        onEnter(cont.find("input[name=xtractpass]"), c);
        Popup.open(cont, {
            title: "Extract Archive",
            closeCallback: function() {
                cont.find("input[name=xtractpass]")
            }
        });
        Popup.startLoading({
            now: !0
        })
    },
    initExtractProgress: function(a, b, c) {
        var d = this.renderTemplate("#extractProgress", {
            filename: a.name,
            msg: __("Extracting '%name%' may take some time. You can close this window. The file extraction will continue in background.").replace("%name%",
                a.name)
        });
        a = d.find("textarea[name=xprogress]");
        for (var e = 0; e <= b.output.length; ++e) a.append(b.output[e] + "\n");
        var f = function(a, c, e, m) {
            HFN.apiMethod("extractarchiveprogress", {
                progresshash: b.progresshash,
                lines: e
            }, function(b) {
                if (b.output.length) {
                    for (var e = 0; e < b.output.length; ++e) m.append(b.output[e] + "\n");
                    m.scrollTop(m[0].scrollHeight)
                }
                b.finished ? (d.find("label.big").text(__("Extraction Completed.")), d.find(".greenbut").text(__("See extracted files")), Popup.setTitle(__("Extraction Completed"))) : setTimeout(f.bind(null,
                    a, c, b.lines, m), 150)
            }, {
                apiServer: b.hostname
            })
        };
        f(b.progresshash, b.hostname, b.lines, a);
        d.find(".butt-area").prepend($('<div class="button linebut greenbut modernbut">' + __("Open Folder") + "</div>").on("click", function(a) {
            Popup.close();
            HFN.openFolder(c.tofolderid)
        }));
        Popup.open(d, {
            title: "Extracting ..."
        });
        Popup.startLoading({
            now: !0
        });
        Popup.stopLoading()
    },
    initSaveZip: function(a) {
        var b = this.renderTemplate("#savezip");
        a = a ? [a] : FileSelection.getSelectionInfo();
        var c = HFN.waitList,
            d = c.create(function() {
                Popup.stopLoading(!0).setPosition()
            });
        fileWait = c.addWait(d);
        folderWait = c.addWait(d);
        opts = {
            preselectFolder: a[0].parentfolderid
        };
        saveZipFolder = -1;
        console.log(a);
        b.find(".modal-files").empty().append(HFN.buildFilePreview(a, {
            onLoad: function() {
                c.setDone(d, fileWait)
            }
        }));
        console.log("OPTS", opts);
        HFN.foldersCustom.buildFolderBrowse(0, b.find(".dest"), {
            onSelect: function(a) {
                saveZipFolder = a
            },
            onLoad: function() {
                c.setDone(d, folderWait)
            },
            expandFirstLevel: !0,
            showCurrent: !0,
            focusCurrent: !0,
            canCreateFolders: !0,
            showNoWritePermissions: !0,
            preselectFolder: opts.preselectFolder,
            canSelectCurrent: !0,
            expandedOnLoad: !0
        });
        Popup.open(b, {
            title: "Create Archive"
        });
        Popup.startLoading({
            now: !0
        });
        a = 1 < a.length && HFN.findOriginalMetadata({
            id: "d" + a[0].parentfolderid
        }) ? HFN.findOriginalMetadata({
            id: "d" + a[0].parentfolderid
        }).name : a[0].isfolder ? a[0].name : a[0].name.replace(/\.([^\.]+)$/i, "");
        "/" == a && (a = "Root");
        b.find("input[name=archivename]").val(a + ".zip");
        var e = uniqueNum.get("savezip"),
            f, g = function() {
                var a = $("input[name=archivename]").val();
                if (a.length)
                    if (-1 == saveZipFolder) HFN.message("Pick destination for archive.",
                        "error");
                    else {
                        a.match(/\.zip$/i) || (a += ".zip");
                        $(this).off("click");
                        var b = this,
                            c = fs.getAsParams();
                        c.tofolderid = saveZipFolder;
                        c.toname = a;
                        c.progresshash = e;
                        var d;
                        HFN.apiMethod("currentserver", {}, function(a) {
                            d = a.hostname;
                            console.log(d);
                            HFN.apiMethod("savezip", c, function(a) {
                                f = a.metadata
                            }, {
                                errorCallback: function(a) {
                                    HFN.message(a.error, "error");
                                    $(b).on("click", g)
                                },
                                apiServer: d
                            });
                            setTimeout(k.bind(this, d), 50)
                        })
                    } else HFN.message('"Archive Name" is required.', "error")
            },
            k = function(a) {
                var c, d = function() {
                    HFN.apiMethod("savezipprogress", {
                        progresshash: e
                    }, function(a) {
                        console.log(a);
                        b.find(".zipfill").css({
                            width: 100 * (a.bytes / a.totalbytes)
                        });
                        b.find(".zipperc").text(Math.round(100 * (a.bytes / a.totalbytes)) + "%, " + __("%nfiles% of %totalfiles% files archived", !1, {
                            nfiles: a.files,
                            totalfiles: a.totalfiles
                        }));
                        c && (clearTimeout(c), c = null);
                        a.bytes < a.totalbytes ? to = setTimeout(d, 200) : a.bytes >= a.totalbytes && (b.find(".zipperc").text(__("Zip is Ready.")), b.find(".butt-area.progress").prepend($('<div class="button smallbut greenbut linebut modernbut savezip">' +
                            __("Locate Archive") + "</div>").on("click", function(a) {
                            Popup.close();
                            $.bbq.pushState({
                                page: "filemanager",
                                folder: f.parentfolderid,
                                file: f.id
                            })
                        })))
                    }, {
                        apiServer: a,
                        errorCallback: function(a) {
                            1901 == a.result ? c = setTimeout(d, 100) : (HFN.message(a.error, "error"), Popup.close())
                        }
                    })
                };
                $(".initzip").hide();
                $(".progresszip").show();
                c = setTimeout(d, 250)
            };
        b.find(".savezip").on("click", g)
    },
    initDownloadArchivePublic: function() {
        var a = this.renderTemplate(".downloadPublicArchive"),
            b = $.bbq.getState("code") || $.deparam.querystring().code;
        if (void 0 != b) {
            a.find("form").append('<input type="hidden" name="code" value="' + b + '">').append('<input type="hidden" name="filename" value="public-archive' + uniqueNum.get("dwl") + '.zip">');
            var c = fs.getAsArrays();
            c.fileids && a.find("form").append('<input type="hidden" name="fileids" value="' + c.fileids.join(",") + '">');
            c.folderids && a.find("form").append('<input type="hidden" name="folderids" value="' + c.folderids.join(",") + '">');
            Popup.open(a, {
                title: "Download Public Archive"
            });
            Popup.startLoading({
                now: !0
            });
            a.find(".modal-files").empty().append(HFN.buildFilePreview(FileSelection.getSelectionInfo(), {
                isPublic: !0,
                code: b,
                publicCode: b,
                onLoad: function() {
                    Popup.stopLoading()
                }
            }));
            a.find(".butt-area").prepend($("<a>").append('<img src="//d1q46pwrruta9x.cloudfront.net/img/save-share.png"> ' + i18n.get("Download") + " ").addClass("button linebut greenbut modernbut").attr("href", "javascript:;").on("click", function(b) {
                b.preventDefault();
                a.find("form").submit();
                Popup.close()
            }))
        }
    },
    initRemoveShare: function(a) {
        console.log(a);
        var b = this.renderTemplate(".revokeShare", {
            tomail: "tomail" in a ? a.tomail : a.frommail,
            foldername: a.foldername,
            sharedtofrom: "tomail" in a ? i18n.get("Shared to") : i18n.get("Shared from")
        });
        HFN.config.isMobile() ? MobilePopup.open(b, {
            title: "Remove share"
        }) : (Popup.open(b, {
            title: "Remove share"
        }), Popup.startLoading({
            now: !0
        }));
        HFN.listFolder(a.folderid, function(a) {
            FileSelection.reset();
            FileSelection.add(a);
            HFN.config.isMobile() ? b.find(".modal-files").empty().append(HFN.buildFilePreview(FileSelection.getSelectionInfo(), {})) : b.find(".modal-files").empty().append(HFN.buildFilePreview(FileSelection.getSelectionInfo(), {
                onLoad: Popup.stopLoading.bind(Popup)
            }))
        });
        b.find(".butt-area").append($('<div class="button linebut redbut modernbut">').text(i18n.get("Remove")).on("click", function(b) {
            HFN.apiMethod("removeshare", {
                shareid: a.shareid
            }, function(a) {
                HFN.message("Share removed.");
                Popup.close();
                clearOnEnter(document)
            }, {
                forceFresh: !0
            })
        })).append($('<div class="button darkbut linebut modernbut">').text(__("Cancel")).click(function(a) {
            Popup.close();
            clearOnEnter(document)
        }))
    },
    initCancelShare: function(a) {
        console.log("remove share");
        console.log(a);
        var b = this.renderTemplate(".revokeShare", {
            tomail: "tomail" in a ? a.tomail : a.frommail,
            foldername: a.sharename,
            sharedtofrom: "tomail" in a ? i18n.get("Shared to") : i18n.get("Shared from")
        });
        b.find(".butt-area").append($('<div class="button smallbut linebut redbut modernbut">').text("Cancel Share").on("click", function(b) {
            HFN.apiMethod("cancelsharerequest", {
                sharerequestid: a.sharerequestid
            }, function(a) {
                triggerOutgoingRequests(".requests", !0);
                Popup.close()
            }, {
                forceFresh: !0
            })
        })).append($('<div class="button smallbut darkbut linebut modernbut">').text("Back").click(function(a) {
            Popup.close()
        }));
        HFN.config.isMobile() ? MobilePopup.open(b, {
            title: "Remove share"
        }) : Popup.open(b, {
            title: "Remove share"
        })
    },
    showPuplink: function(a) {
        a = $.extend({}, {
            code: "",
            callback: function() {},
            pageObj: {}
        }, a);
        HFN.apiMethod("showuploadlink", {
            code: a.code
        }, function(b) {
            console.log("upload link: ", b);
            HFN.renderTemplate(".showPupLink", {
                mail: b.mail,
                comment: b.comment
            }).appendTo(".puplink_show");
            HFN.apiMethod("currentserver", {}, function(b) {
                a.pageObj.upload = (new pUpload({
                    uploadMethod: "uploadtolink",
                    progressMethod: "uploadlinkprogress",
                    ctrlPlaceholder: ".pupload .pupcontrols",
                    statusPlaceholder: ".pupload .pupstatus",
                    getFoldernameCallback: !1,
                    server: "api.pcloud.com",
                    user: "anonymous" + uniqueNum.get(),
                    customParams: {
                        code: a.code
                    }
                })).initUpload(1580, b.hostname);
                a.callback()
            })
        }, {
            forceFresh: !0,
            errorCallback: function(a) {
                HFN.renderTemplate(".errorBox", {
                    message: htmlentities(a.error)
                }).appendTo(".puplink_show")
            }
        })
    },
    createPuplink: function(a) {
        var b = this.renderTemplate(".createpuplink"),
            c = a ? [a] : FileSelection.getSelectionInfo();
        b.find(".modal-files").empty().append(HFN.buildFilePreview(c));
        b.find(".butt-area").append($('<div class="button smallbut linebut greenbut modernbut">').text(i18n.get("Generate")).on("click.crpup", c = function(c) {
            var e = b.find("textarea[name=comment]").val(),
                f = parseFloat(b.find("input[name=maxspace]").val()) || !1,
                g = parseInt(b.find("input[name=maxfiles]").val()) || !1,
                k = {
                    comment: e,
                    folderid: a.folderid
                };
            if (e) {
                f && (k.maxspace = Math.round(1048576 * f));
                g && (k.maxfiles = g);
                $(this).off("click.crpup");
                var l = this,
                    m = arguments.callee;
                HFN.apiMethod("createuploadlink", k, function(b) {
                    HFN.message("Upload link is generated.");
                    HFN.cache.expireMatch(HFN.cache.cacheid("puplinks", "all"));
                    HFN.cache.expireMatch("api-listuploadlinks");
                    Popup.close(null, !0);
                    HFN.gridRemove(a, !0);
                    HFN.gridAppend(a, !0);
                    HFN.refreshSharesAll();
                    HFN.getPuplink(a, function(a) {
                        console.log("link after create->get ", a);
                        HFN.viewPuplink(a)
                    })
                }, {
                    errorCallback: function(a) {
                        HFN.message(a.error,
                            "error");
                        $(l).off("click.crup").on("click.crup", m)
                    }
                })
            } else HFN.message("Comment is required for creating a public upload link.", "error")
        })).append($('<div class="button smallbut darkbut modernbut linebut">').text(i18n.get("Close")).click(function(a) {
            Popup.close()
        }));
        b.find(".adva").on("click", function() {
            $(".crpup.adv").show();
            $(".crpup.simp").hide()
        });
        b.find(".simpa").on("click", function() {
            $(".crpup.adv").hide();
            $(".crpup.simp").show()
        });
        onCtrlEnter(b.find("textarea"), c);
        HFN.config.isMobile() ? MobilePopup.open(b, {
            title: "Generate Upload Link",
            closeCallback: function() {
                clearOnEnter(b.find("textarea"))
            }
        }) : Popup.open(b, {
            title: "Generate Upload Link",
            closeCallback: function() {
                clearOnEnter(b.find("textarea"))
            }
        })
    },
    viewPuplink: function(a) {
        console.log("the link: ", a);
        var b = this.renderTemplate(".viewpuplink", {
                code: a.code,
                comment: a.comment,
                created: HFN.prepDt(a.created),
                mail: a.mail,
                space: HFN.formatSize(a.space),
                spaceleft: a.maxspace ? HFN.formatSize(a.maxspace) : "Unlimited",
                files: a.files,
                maxfiles: a.maxfiles ? a.maxfiles : "Unlimited",
                linkurl: "https://" + window.location.hostname + "/#page=puplink&code=" + a.code,
                puplinkopen: "https://" + window.location.hostname + "/#page=puplink&code=" + a.code
            }),
            c = encodeURIComponent(HFN.config.user.email + " shared a file with you!"),
            d = encodeURIComponent("Hello,\r\n\r\nHere is link where you can upload files in my pCloud folder: \r\n" + a.link + "\r\n\r\nComment: \r\n" + a.comment + "\r\n\r\n");
        b.find(".modal-files").empty().append(HFN.buildFilePreview([a.metadata], {}));
        b.find(".facebook").on("click", function(b) {
            window.open("http://facebook.com/sharer.php?u=" +
                encodeURIComponent(a.link), "facebook-share-dialog", "width=626,height=436")
        });
        b.find(".twitter").on("click", function(b) {
            window.open("https://twitter.com/intent/tweet?url=" + encodeURIComponent(a.link) + "&text=pCloud", "twitter-share", "width=550,height=450")
        });
        b.find("a.email").on("click", function() {
            window.open("mailto:?subject=" + c + "&body=" + d)
        });
        b.find(".butt-area").append($('<div class="button linebut redbut modernbut">').text(__("Delete")).on("click", function(b) {
            HFN.apiMethod("deleteuploadlink", {
                    uploadlinkid: a.uploadlinkid
                },
                function(b) {
                    HFN.message("Upload Link is deleted");
                    HFN.cache.expireMatch(HFN.cache.cacheid("puplinks", "all"));
                    HFN.cache.expireMatch("api-listuploadlinks");
                    Popup.close(null, !0);
                    HFN.gridRemove(a.metadata, !0);
                    HFN.gridAppend(a.metadata, !0);
                    HFN.refreshSharesAll();
                    HFN.refreshGrid(a.metadata.folderid);
                    console.log(daGrid.opts.template);
                    triggerOpenPuplinks(".puplinks")
                })
        })).append($('<div class="button darkbut linebut modernbut">').text(i18n.get("Close")).click(function(a) {
            Popup.close()
        }));
        if (HFN.config.isMobile()) b.find("#copy-puplink").remove(),
            b.find("img:first").remove(), MobilePopup.open(b, {
                title: "Upload Link"
            });
        else {
            b.find("table").first().width("500");
            Popup.open(b, {
                title: "Upload Link"
            });
            ZeroClipboard.config({
                swfPath: CDN + "/swf/ZeroClipboard.swf"
            });
            var e = new ZeroClipboard($(".modal a#copy-puplink")[0]);
            e.on("ready", function(a) {
                e.on("copy", function(a) {
                    HFN.message(__("Link copied."));
                    a.clipboardData.setData("text/plain", $(".modal input[name=puplinkurl]").val())
                })
            })
        }
    },
    getPuplink: function(a, b) {
        var c = $.Deferred();
        this.getPuplinkList(function(d) {
            for (var e =
                0, f = !1; e < d.length; ++e)
                if (d[e].metadata.id == a.id) {
                    f = d[e];
                    break
                }
            b(f);
            c.resolve()
        });
        return c
    },
    getPuplinkList: function(a) {
        HFN.apiMethod("listuploadlinks", {
            iconformat: "id"
        }, function(b) {
            a(b.uploadlinks)
        })
    },
    initPublinkTree: function(a) {
        var b = FileSelection,
            c = this.renderTemplate(".createPublinkTree"),
            d;
        c.find(".modal-files").empty().append(HFN.buildFilePreview(b.getSelectionInfo(), {
            onLoad: function() {
                Popup.stopLoading()
            }
        }));
        c.find(".butt-area").append($('<div class="button smallbut linebut greenbut modernbut">').text(__("Generate")).on("click.crpubtree",
            d = function(a) {
                a = c.find("input[name=pubfoldername]").val();
                var f = b.getAsParams();
                if (a) {
                    f.name = a;
                    $(this).off("click.crpubtree");
                    Popup.startLoading();
                    var g = this;
                    HFN.apiMethod("gettreepublink", f, function(a) {
                        console.log(a);
                        HFN.message("Download link is generated.");
                        HFN.cache.expire(HFN.cache.cacheid("publinks", "all"));
                        HFN.cache.expireMatch("api-listpublinks");
                        HFN.getPublink(a, function(a) {
                            console.log("link after create->get ", a);
                            Popup.close(!1, !0);
                            HFN.sharePublink(a)
                        })
                    }, {
                        type: "post",
                        errorCallback: function(a) {
                            HFN.message(a.error,
                                "error");
                            Popup.stopLoading();
                            $(g).off("click.crpubtree").on("click.crpubtree", d)
                        }
                    })
                } else HFN.message("Link name is required for creating a download link.", "error")
            })).append($('<div class="button smallbut darkbut modernbut linebut">').text(__("Cancel")).click(function(a) {
            Popup.close()
        }));
        Popup.open(c, {
            title: "Generate Download Link",
            onEnter: d,
            clickClose: !1
        });
        Popup.startLoading({
            now: !0
        });
        Popup.onLoad(function() {
            $("input[name=pubfoldername]").focus()
        })
    },
    initStopAllShares: function(a) {
        console.log("stoping for",
            a.shares);
        HFN.shareSummaryObj(a);
        var b = this.renderTemplate("#stopAllShares", {
            shareslist: HFN.shareSummary(a)
        });
        Popup.open(b, {
            title: __('Stop sharing "%name%"', !1, {
                name: a.name
            }),
            dont_translate_title: !0
        });
        Popup.startLoading({
            now: !0
        });
        b.find(".modal-files").empty().append(HFN.buildFilePreview([a], {
            onLoad: Popup.stopLoading.bind(Popup)
        }));
        b.find(".butt-area").prepend($('<div class="button smallbut redbut linebut modernbut">').text(__("Stop")).on("click.delete", function(b) {
            Popup.startLoading();
            b = [];
            for (var d =
                0; d < a.shares.length; ++d)
                if ("request" == a.shares[d].type) b.push(HFN.apiMethod("cancelsharerequest", {
                    sharerequestid: a.shares[d].shareid
                }, function() {
                    HFN.cache.expireMatch("api-listshares")
                }));
                else if ("share" == a.shares[d].type) b.push(HFN.apiMethod("removeshare", {
                shareid: a.shares[d].shareid
            }, function() {
                HFN.cache.expireMatch("api-listshares")
            }));
            else if ("bshare" == a.shares[d].type) {
                var e = {};
                a.shares[d].user ? e.usershareids = a.shares[d].bshareid : e.teamshareids = a.shares[d].bshareid;
                b.push(HFN.apiMethod("account_stopshare",
                    e, function() {
                        HFN.cache.expireMatch("api-account_listshares")
                    }))
            } else "publink" == a.shares[d].type ? b.push(HFN.apiMethod("deletepublink", {
                linkid: a.shares[d].linkid
            }, function() {
                HFN.cache.expireMatch("api-listpublinks");
                HFN.cache.expireMatch("publinks-all")
            })) : "puplink" == a.shares[d].type && b.push(HFN.apiMethod("deleteuploadlink", {
                uploadlinkid: a.shares[d].uploadlinkid
            }, function() {
                HFN.cache.expireMatch("api-listuploadlinks");
                HFN.cache.expireMatch("puplinks-all")
            }));
            $.when.apply($, b).then(function() {
                HFN.message(__('Stopped shared access to "%name%"', !1, {
                    name: a.name
                }, !0, !1));
                HFN.refreshSharesAll();
                Popup.close()
            })
        }))
    },
    initRemoveLinks: function(a) {
        var b = this.renderTemplate("#deleteLinks");
        a || (a = fs.getSelectionInfo());
        Popup.open(b, {
            title: __('Delete links for "%name%"', !1, {
                name: a.name
            })
        });
        Popup.startLoading({
            now: !0
        });
        b.find(".modal-files").empty().append(HFN.buildFilePreview([a], {
            onLoad: Popup.stopLoading.bind(Popup)
        }));
        b.find(".butt-area").append($('<div class="button smallbut redbut linebut modernbut">').text(__("Delete")).on("click.delete", function(b) {
            console.log("list",
                list);
            b = new batchApiCall({
                errorCallback: function(a) {
                    HFN.message(a.error, "error");
                    Popup.close()
                }
            });
            for (var d = 0, e = "publink"; d < a.shares.length; ++d) list[d].uploadlinkid ? (b.addCall("deleteuploadlink", {
                uploadlinkid: list[d].uploadlinkid
            }), e = "puplink") : b.addCall("deletepublink", {
                linkid: list[d].linkid
            });
            b.execute(function() {
                "publink" == e ? (HFN.cache.expire(HFN.cache.cacheid("publinks", "all")), triggerOpenPublinks(".publinks")) : (HFN.cache.expire(HFN.cache.cacheid("puplinks", "all")), triggerOpenPuplinks(".puplinks"));
                HFN.message(__("Link(s) Deleted."));
                Popup.close()
            })
        }));
        b.find(".butt-area").append($('<div class="button smallbut darkbut linebut modernbut">').text(i18n.get("Cancel")).click(function(a) {
            Popup.close()
        }))
    },
    initDeleteLinks: function(a) {
        var b = this.renderTemplate("#deleteLinks"),
            c = a ? [a] : fs.getSelectionInfo();
        Popup.open(b, {
            title: "Delete Links"
        });
        Popup.startLoading({
            now: !0
        });
        b.find(".modal-files").empty().append(HFN.buildFilePreview(c, {
            onLoad: Popup.stopLoading.bind(Popup)
        }));
        b.find(".butt-area").append($('<div class="button smallbut redbut linebut modernbut">').text(i18n.get("Delete")).on("click.delete",
            function(a) {
                console.log("list", c);
                a = new batchApiCall({
                    errorCallback: function(a) {
                        HFN.message(a.error, "error");
                        Popup.close()
                    }
                });
                for (var b = 0, f = "publink"; b < c.length; ++b) c[b].uploadlinkid ? (a.addCall("deleteuploadlink", {
                    uploadlinkid: c[b].uploadlinkid
                }), f = "puplink") : a.addCall("deletepublink", {
                    linkid: c[b].linkid
                });
                a.execute(function() {
                    "publink" == f ? (HFN.cache.expire(HFN.cache.cacheid("publinks", "all")), triggerOpenPublinks(".publinks")) : (HFN.cache.expire(HFN.cache.cacheid("puplinks", "all")), triggerOpenPuplinks(".puplinks"));
                    HFN.message(__("Link(s) Deleted."));
                    Popup.close()
                })
            }));
        b.find(".butt-area").append($('<div class="button smallbut darkbut linebut modernbut">').text(i18n.get("Cancel")).click(function(a) {
            Popup.close()
        }))
    },
    initExportLinks: function(a) {
        var b = this.renderTemplate("#exportLinks");
        a = a ? [a] : fs.getSelectionInfo();
        for (var c = [], d = 0; d < a.length; ++d) c.push(htmlentities(a[d].link));
        b.find("textarea").html(c.join("\n"));
        b.find(".butt-area").prepend('<div class="button linebut copyclip greenbut modernbut">' + __("Copy to Clipboard") +
            "</div>");
        Popup.open(b, {
            title: "Export Links"
        });
        ZeroClipboard.config({
            swfPath: CDN + "/swf/ZeroClipboard.swf"
        });
        var e = new ZeroClipboard($(".copyclip")[0]);
        e.on("ready", function(a) {
            e.on("copy", function(a) {
                HFN.message(__("Link copied."));
                a.clipboardData.setData("text/plain", $(".modal textarea[name=exportlnks]").val().replace(/\n/g, "\r\n"))
            })
        })
    },
    goShare: function(a) {
        HFN.getPublink(a, function(b) {
            b ? HFN.sharePublink(b) : HFN.createPublink(a)
        })
    },
    sharePublink: function(a, b) {
        b = b || {};
        var c = this.renderTemplate("#sharepublink", {
                traffic: HFN.formatSize(a.traffic),
                downloads: a.downloads,
                dtcreate: HFN.formatDt(a.created),
                dtcreatelong: HFN.prepDt(a.created),
                linkurl: a.link,
                shortlinkurl: a.shortlink
            }),
            d, e, f = [];
        console.log("da link", a);
        c.find(".linkwrap input").val(a.link);
        c.find(".deletelinks a").on("click", function(b) {
            HFN.apiMethod("deletepublink", {
                linkid: a.linkid
            }, function(b) {
                HFN.message("Link is deleted");
                HFN.cache.expire(HFN.cache.cacheid("publinks", "all"));
                HFN.cache.expireMatch("api-listpublinks");
                HFN.refreshSharesAll();
                a.metadata.isfolder &&
                    a.metadata.folderid && !a.metadata.contents && (a.metadata.contents = []);
                console.log("=====");
                console.log(a.metadata);
                console.log(HFN.findOriginalMetadata(a.metadata));
                HFN.findOriginalMetadata(a.metadata) ? HFN.gridUpdate(HFN.findOriginalMetadata(a.metadata), !0) : HFN.gridUpdate(a.metadata, !0);
                triggerOpenPublinks(".publinks");
                Popup.close()
            })
        });
        Popup.open(c, {
            title: __('Link for "%name%"', !1, {
                name: HFN.strFit(a.metadata.name, 40)
            }),
            dont_translate_title: !0
        });
        Popup.startLoading({
            now: !0
        });
        ZeroClipboard.config({
            swfPath: CDN +
                "/swf/ZeroClipboard.swf"
        });
        var g = new ZeroClipboard($(".modal div.copylink")[0]);
        g.on("ready", function(b) {
            g.on("copy", function(b) {
                HFN.message(__("Link copied."));
                b.clipboardData.setData("text/plain", a.link)
            })
        });
        var k = function(a) {
                c.find(".shortlinkwrap input").val(a.shortlink);
                c.find(".shortlinkavail").show();
                c.find(".createshortlink").hide();
                c.find(".removeshortlinkbut").on("click", function(b) {
                    $(this).off("click");
                    HFN.apiMethod("changepublink", {
                        linkid: a.linkid,
                        deleteshortlink: 1
                    }, function(b) {
                        delete a.shortlink;
                        delete a.shortcode;
                        l()
                    })
                });
                if (a.shortlink) {
                    var b = new ZeroClipboard($(".modal div.copyshortlink")[0]);
                    b.on("ready", function(c) {
                        b.on("copy", function(b) {
                            HFN.message(__("Short Link copied."));
                            b.clipboardData.setData("text/plain", a.shortlink)
                        })
                    })
                }
                c.find(".shortlinkwrap .sharebutton a").attr("href", a.shortlink)
            },
            l = function() {
                c.find(".shortlinkavail").hide();
                c.find(".createshortlink").show();
                c.find(".generateshortlinkbut").on("click", function(b) {
                    $(this).off("click");
                    HFN.apiMethod("changepublink", {
                        linkid: a.linkid,
                        shortlink: 1
                    }, function(b) {
                        a = $.extend(a, b);
                        k(a)
                    })
                })
            };
        a.shortlink ? k(a) : l();
        HFN.apiMethod("contactlist", {}, function(a) {
            a.contacts = HFN.filterMailContacts(a.contacts);
            setTimeout(function() {
                e = new Bloodhound({
                    name: "name",
                    datumTokenizer: function(a) {
                        var b = Bloodhound.tokenizers.whitespace(a.name.replace(/\(?\)?/g, "")); - 1 == b.indexOf(a.name.replace(/\(?\)?/g, "")) && b.push(a.name.replace(/\(?\)?/g, ""));
                        return b
                    },
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    local: a.contacts
                });
                var b = e.get;
                e.get = function(a, c) {
                    return b.apply(e, [a,
                        function(b) {
                            if (!b) return c(b);
                            b.forEach(function(b) {
                                var c = b.name.toLowerCase(),
                                    d = Bloodhound.tokenizers.whitespace(c.replace(/\(?\)?/g, "")); - 1 == d.indexOf(c.replace(/\(?\)?/g, "")) && d.push(c.replace(/\(?\)?/g, ""));
                                for (var e = c = 0; e < d.length; ++e) 0 == d[e].indexOf(a) && c++;
                                b.exact_match = c
                            });
                            console.log(b);
                            b.sort(function(a, b) {
                                return a.exact_match > b.exact_match ? -1 : a.exact_match < b.exact_match ? 1 : 0
                            });
                            c(b)
                        }
                    ])
                };
                e.initialize();
                var c = {
                    place: ".tomails",
                    name: "emails",
                    width: 538,
                    sourceKey: "name",
                    source: e,
                    placeholder: __("Friend's name or an email"),
                    maxNotFoundSymbols: 5,
                    getShowVal: function(a) {
                        return a
                    },
                    fancyResultBox: function(a, b) {
                        var c;
                        console.log(a.data());
                        b && b.data ? (c = b.data, 2 == c.source ? a.prepend('<img src="/img/fb-tag.png" width="16" height="16" class="inf">') : 3 == c.source ? a.prepend('<img src="/img/gm-tag.png" width="16" height="16" class="inf">') : 1 == c.source && a.prepend('<img src="/img/or-mail-small.png" width="16" height="16" class="inf">')) : a.data("val") && validateEmail(a.data("val")) && a.prepend('<img src="/img/or-mail-small.png" width="16" height="16" class="inf">')
                    },
                    imgCloseFile: "/img/close-label.png",
                    extraMulticompleteOpts: {
                        suggestAt: ".tomails",
                        boxRender: function(a) {
                            var b = $("<div>"),
                                c = $('<img width="32" height="32">');
                            b.addClass("clearfix").append($('<div class="iconw"></div>').append(c)).append($('<div class="textpart"></div>').append($('<span class="title"></span>').text(a.name)).append($('<span class="explain"></span>')));
                            "import" == a.source ? ("Facebook" == a.value ? c.attr("src", "/img/fab.png") : "Gmail" == a.value && c.attr("src", "/img/gmail.png"), b.find(".explain").text(__("Import contacts from %source%", !1, {
                                source: a.value
                            }))) : 3 == a.source ? (c.attr("src", "/img/gmail.png"), b.find(".explain").text(a.value)) : 2 == a.source ? (c.attr("src", "https://graph.facebook.com/" + a.value + "/picture?type=square"), b.find(".iconw").append('<img src="/img/fb-over.png" class="smicon">'), b.find(".explain").text(__("Facebook Message"))) : 1 == a.source && (c.attr("src", "/img/or-mail.png"), b.find(".explain").text(__("Send Email")));
                            return b
                        }
                    }
                };
                Popup.stopLoading();
                Popup.onLoad(function() {
                    d = new combo2(c)
                })
            }, 20)
        }, {
            forceFresh: !0,
            cacheTime: 0
        });
        var m = function(a) {
            c.find("a.more").hide();
            c.find("a.sharelink").show();
            c.find(".dataandshortlink").show();
            c.find(".sharepublinknew").hide();
            c.find(".deletelinks").show();
            c.find(".share").hide();
            c.find(".shareresults").hide()
        };
        c.find("a.more").on("click", m);
        c.find("a.getshortlink").on("click", m);
        c.find("a.sharelink").on("click", function(a) {
            c.find("a.more").show();
            c.find("a.sharelink").hide();
            c.find(".dataandshortlink").hide();
            c.find(".sharepublinknew").show();
            c.find(".deletelinks").hide();
            c.find(".share").show();
            c.find(".shareresults").hide()
        });
        var q;
        c.find(".import-gmail").on("click", q = function(a) {
            $(this).before('<img src="/img/importing.gif" class="import-loading">');
            $(this).addClass("importing");
            var b = this;
            ContactsGmail.getTokenCallback(function(a) {
                console.log("got token: ", a);
                a ? (HFN.message(__("Loading Gmail contacts..."), "info"), HFN.apiMethod("contactload", {
                    code: a,
                    source: 3,
                    redirect_uri: ContactsGmail.auth_config.params.redirect_uri
                }, function(a) {
                    HFN.message(__("Gmail contacts loaded."), "info");
                    e.clear();
                    HFN.loadShareContacts(function(a) {
                        e.add(a)
                    }, {
                        forceFresh: !0
                    });
                    $(b).on("click", q).removeClass("importing");
                    $(b).parent().find(".import-loading").remove()
                }, {
                    type: "post",
                    errorCallback: function() {
                        HFN.message("There's been an error loading your contacts. Please, try again.")
                    }
                })) : ($(b).on("click", q).removeClass("importing"), $(b).parent().find(".import-loading").remove())
            });
            $(this).off("click")
        });
        console.log("show short", b);
        b.showshort && c.find("a.more").trigger("click");
        var r;
        c.find(".sendbut").on("click",
            r = function() {
                var b = d.getFullVals(!0),
                    g = [],
                    k = [],
                    l = [],
                    m = c.find("textarea").val();
                console.log("!! full vals", b);
                for (var p = 0; p < b.length; ++p) b[p].data && 2 == b[p].data.source ? (k.push({
                    id: b[p].data.value,
                    obj: b[p].obj
                }), l.push(b[p].data.name)) : b[p].data && 3 == b[p].data.source ? g.push({
                    email: b[p].data.value,
                    obj: b[p].obj
                }) : validateEmail(b[p].val) ? (g.push({
                    email: b[p].val,
                    obj: b[p].obj
                }), b[p].data || -1 != f.indexOf(b[p].val) || (e.add([{
                    name: b[p].val,
                    value: b[p].val,
                    source: 1
                }]), f.push(b[p].val))) : b[p].obj.addClass("error").find(".combo-res").tooltip("destroy").attr("title",
                    __("This is not a valid contact or an email.")).tooltip();
                if (g.length || k.length) {
                    console.log("emails", g);
                    console.log("fb", k);
                    console.log("fb names", l);
                    for (var q = [], y = [], B = !1, p = 0; p < g.length; ++p)(function(b) {
                        q.push(HFN.apiMethod("sendpublink", {
                            code: a.code,
                            source: 1,
                            mails: g[b].email,
                            message: m
                        }, function(a) {
                            y.push(function() {
                                g[b].obj.remove()
                            });
                            B = !0
                        }, {
                            errorCallback: function(a) {
                                y.push(function() {
                                    g[b].obj.addClass("error").find(".combo-res").tooltip("destroy").attr("title", __(a.error)).tooltip()
                                })
                            }
                        }))
                    })(p);
                    for (p = 0; p < k.length; ++p)(function(b) {
                        q.push(HFN.apiMethod("sendpublink", {
                            code: a.code,
                            source: 2,
                            friends: k[b].id,
                            message: m
                        }, function(a) {
                            y.push(function() {
                                k[b].obj.remove()
                            });
                            B = !0
                        }, {
                            errorCallback: function(a) {
                                y.push(function() {
                                    k[b].obj.addClass("error").find(".combo-res").tooltip("destroy").attr("title", __(a.error)).tooltip()
                                })
                            }
                        }))
                    })(p);
                    var C = this;
                    $.when.apply($, q).then(function() {
                        for (var a = 0; a < y.length; ++a) y[a]();
                        B && HFN.message("Link sent!");
                        $(C).on("click", r);
                        d.onRemove()
                    });
                    $(this).off("click")
                } else HFN.message("Please, enter a contact or a valid e-mail.",
                    "error")
            });
        console.log("here");
        onCtrlEnter(c.find("textarea"), r);
        var p = a.shortlink ? a.shortlink : a.link;
        c.find("a.fb").on("click", function(a) {
            window.open("http://facebook.com/sharer.php?u=" + encodeURIComponent(p), "facebook-share-dialog", "width=626,height=436")
        });
        c.find("a.tw").on("click", function(a) {
            window.open("https://twitter.com/intent/tweet?url=" + encodeURIComponent(p) + "&text=pCloud", "twitter-share", "width=550,height=450")
        });
        c.find("a.gp").on("click", function(a) {
            window.open("https://plus.google.com/share?url=" +
                encodeURIComponent(p), "", "menubar=no, toolbar=no, resizable=yes, scrollbars=yes, height=600, width=600");
            return !1
        })
    },
    viewPublicLink: function(a) {
        console.log("view pub link");
        console.log(a);
        var b = this.renderTemplate(".viewpublink", {
                code: a.code,
                downloads: a.downloads,
                created: HFN.prepDt(a.created),
                traffic: a.traffic ? HFN.formatSize(a.traffic) : "N/A",
                linkurl: a.link,
                publinkopen: a.link,
                shortstatus: a.shortcode ? "hasshort" : "noshort",
                shortcode: a.shortcode,
                shortlink: a.shortlink
            }),
            c = a.shortlink ? a.shortlink : a.link,
            d = encodeURIComponent(HFN.config.user.email + " shared a file with you!"),
            e = encodeURIComponent("Hello,\r\n\r\nHere is link to '" + a.metadata.name + "' on pCloud:\r\n" + c + "\r\n\r\n");
        b.find(".facebook").on("click", function(a) {
            window.open("http://facebook.com/sharer.php?u=" + encodeURIComponent(c), "facebook-share-dialog", "width=626,height=436")
        });
        b.find(".twitter").on("click", function(a) {
            window.open("https://twitter.com/intent/tweet?url=" + encodeURIComponent(c) + "&text=pCloud", "twitter-share", "width=550,height=450")
        });
        b.find("a.email").on("click", function() {
            window.open("mailto:?subject=" + d + "&body=" + e)
        });
        HFN.apiMethod("showpublink", {
            code: a.code
        }, function(c) {
            b.find(".modal-files").empty().append(HFN.buildFilePreview([c.metadata], {
                isPublic: !0,
                code: a.code
            }))
        }, {
            forceFresh: !0
        });
        b.find("a.dlink").on("click", function(b) {
            HFN.apiMethod("deletepublink", {
                linkid: a.linkid
            }, function(b) {
                HFN.message("Link is deleted");
                HFN.cache.expire(HFN.cache.cacheid("publinks", "all"));
                HFN.refreshSharesAll();
                a.metadata.isfolder && a.metadata.folderid &&
                    !a.metadata.contents && (a.metadata.contents = []);
                HFN.gridUpdate(a.metadata, !0);
                console.log("TEMPLATE IS: ", daGrid.opts.template);
                triggerOpenPublinks(".publinks");
                Popup.close()
            })
        });
        b.find("[data=createshort]").on("click", function() {
            console.log("creating short link: ", a);
            $(this).off("click");
            HFN.apiMethod("changepublink", {
                linkid: a.linkid,
                shortlink: 1
            }, function(b) {
                a = $.extend(a, b);
                HFN.viewPublicLink(a)
            })
        });
        b.find("[data=removeshort]").on("click", function() {
            console.log("removing short link: ", a);
            $(this).off("click");
            HFN.apiMethod("changepublink", {
                linkid: a.linkid,
                deleteshortlink: 1
            }, function(b) {
                delete a.shortlink;
                delete a.shortcode;
                HFN.viewPublicLink(a)
            })
        });
        HFN.config.isMobile() ? (MobilePopup.open(b, {
            title: "Download Link"
        }), setTimeout(function() {
            $(".modal .butt-area1 div").show()
        }, 100)) : Popup.open(b, {
            title: "Download Link"
        });
        ZeroClipboard.config({
            swfPath: CDN + "/swf/ZeroClipboard.swf"
        });
        var f = new ZeroClipboard($(".modal a#copy-publink")[0]);
        f.on("ready", function(a) {
            f.on("copy", function(a) {
                HFN.message(__("Link copied."));
                a.clipboardData.setData("text/plain", $(".modal input[name=publinkurl]").val())
            })
        });
        if (a.shortlink) {
            var g = new ZeroClipboard($(".modal a#copy-shortlink")[0]);
            g.on("ready", function(a) {
                g.on("copy", function(a) {
                    HFN.message(__("Short Link copied."));
                    a.clipboardData.setData("text/plain", $(".modal input[name=shortlinkurl]").val())
                })
            })
        }
    },
    previewVirtualFolder: function(a) {
        console.log(a);
        var b = this.renderTemplate("#preview-files", {
            title: __('Content of "%name%"', !1, {
                name: a.name
            })
        });
        b.find(".butt-area").prepend($('<div class="button linebut greenbut modernbut"></div>').text(__("Share")).on("click",
            function(b) {
                HFN.getPublinkById(a.shares[0].linkid, function(a) {
                    Popup.close(function() {
                        HFN.sharePublink(a)
                    })
                })
            }));
        Popup.open(b, {
            title: "Content"
        });
        Popup.startLoading({
            now: !0
        });
        HFN.apiMethod("showpublink", {
            code: a.shares[0].code
        }, function(a) {
            b.find(".modal-files").empty().append(HFN.buildFilePreview(a.metadata.contents, {
                onLoad: function() {}
            }));
            Popup.stopLoading()
        })
    },
    listIncomingShares: function(a, b) {
        b = $.extend({
            forceFresh: !1
        }, b);
        var c = [],
            d = [],
            e = $.Deferred();
        console.log("the opts", b);
        c.push(HFN.apiMethod("listshares", {
            iconformat: "id"
        }, function(a) {
            a = a.shares.incoming.concat(a.requests.incoming);
            for (var b = 0; b < a.length; ++b) a[b].type = "sharerequestid" in a[b] ? "request" : "share", a[b].atype = "user", a[b].name = a[b].foldername, d.push(a[b])
        }, b));
        if (HFN.config.isBusiness()) {
            var f = $.Deferred();
            c.push(f);
            var g = [],
                k, l = {};
            g.push(HFN.apiMethod("account_listshares", {
                iconformat: "id"
            }, function(a) {
                k = a.shares.incoming
            }, b));
            g.push(HFN.apiMethod("account_users", {
                withavatars: 1
            }, function(a) {
                for (var b = 0; b < a.users.length; ++b) l[a.users[b].id] =
                    a.users[b]
            }, b));
            $.when.apply($, g).then(function() {
                for (var a = 0; a < k.length; ++a) d.push($.extend({}, {
                    userobj: l[k[a].sharedfrom[0].fromuserid],
                    foldername: k[a].folder.name,
                    name: k[a].folder.name,
                    frommail: l[k[a].sharedfrom[0].fromuserid].email,
                    fromname: l[k[a].sharedfrom[0].fromuserid].firstname + " " + l[k[a].sharedfrom[0].fromuserid].lastname,
                    created: k[a].sharedfrom[0].shared,
                    type: "share",
                    atype: "business",
                    permissions: k[a].sharedfrom[0].permissions,
                    folderid: k[a].folder.folderid
                }));
                f.resolve()
            })
        }
        $.when.apply($,
            c).then(function() {
            d.sort(function(a, b) {
                var c = "sharerequestid" in a ? 0 : 1,
                    d = "sharerequestid" in b ? 0 : 1,
                    e = "sharename" in a ? a.sharename : a.foldername,
                    f = "sharename" in b ? b.sharename : b.foldername;
                return c == d ? e.localeCompare(f) : c - d
            });
            a(d);
            e.resolve()
        });
        return e
    },
    invitesSummaryTooltip: function(a) {
        for (var b = [], c = 0, d = 0; d < a.shares.length; ++d) - 1 != ["share", "request", "bshare"].indexOf(a.shares[d].type) && c++, 9 <= b.length || ("share" == a.shares[d].type ? b.push(HFN.strFitMail(a.shares[d].sharedwith, 40)) : "request" == a.shares[d].type ?
            b.push(HFN.strFitMail(a.shares[d].sharedwith, 40) + " - " + __("pending")) : "bshare" == a.shares[d].type && b.unshift(a.shares[d].team ? a.shares[d].teamobj.name : a.shares[d].userobj.firstname + " " + a.shares[d].userobj.lastname));
        0 < c - b.length && b.push(__("and %n% more ...", !1, {
            n: c - b.length
        }));
        return b.join("<br>")
    },
    shareSummary: function(a) {
        for (var b = {
            shares: 0,
            requests: 0,
            bshares: 0,
            publinks: 0,
            puplinks: 0
        }, c = 0; c < a.shares.length; ++c) b[a.shares[c].type + "s"]++;
        a = [];
        b.shares + b.bshares + b.requests && (1 == b.shares + b.bshares +
            b.requests ? a.push(__("1 folder invite")) : a.push(__("%sharen% folder invites", !1, {
                sharen: b.shares + b.bshares + b.requests
            })));
        b.publinks && a.push(__("download link"));
        b.puplinks && a.push(__("upload link"));
        return a.join(", ")
    },
    shareSummaryLink: function(a) {
        for (var b = {
            shares: 0,
            requests: 0,
            bshares: 0,
            publinks: 0,
            puplinks: 0
        }, c = 0; c < a.shares.length; ++c) b[a.shares[c].type + "s"]++;
        c = $('<div class="summary-links"></div>');
        if (b.shares + b.bshares + b.requests) {
            var d = 1 == b.shares + b.bshares + b.requests ? __("1 folder invite") :
                __("%sharen% folder invites", !1, {
                    sharen: b.shares + b.bshares + b.requests
                });
            c.append($("<span></span>").text(d).on("click", function(b) {
                HFN.initShareFolder(a)
            }))
        }
        b.publinks && (d = __("download link"), c.children().length && c.append(", "), c.append($("<span></span>").text(d).on("click", function(b) {
            HFN.getPublink(a, function(a) {
                HFN.sharePublink(a)
            })
        })));
        b.puplinks && (d = "Upload link", c.children().length && c.append(", "), c.append($("<span></span>").text(d).on("click", function(b) {
            HFN.getPuplink(a, function(a) {
                HFN.viewPuplink(a)
            })
        })));
        return c
    },
    shareSummaryObj: function(a) {
        for (var b = {
            shares: 0,
            bshares: 0,
            publinks: 0,
            puplinks: 0,
            requests: 0
        }, c = 0; c < a.shares.length; ++c) b[a.shares[c].type + "s"]++;
        b.shares = b.shares + b.bshares + b.requests;
        return b
    },
    refreshSharesAll: function() {
        daGrid && -1 != ["shares", "incomingshares"].indexOf(daGrid.opts.template) && daGrid.refresh();
        "mobilesharedshares" == daGrid.opts.template && HFN.pages.refresh();
        this.checkNewShares()
    },
    refreshBusinessSharesAll: function() {
        HFN.cache.expireMatch("account_listshares");
        HFN.cache.expireMatch("account_users");
        HFN.cache.expireMatch("account_teams");
        this.refreshSharesAll()
    },
    listShares: function(a) {
        var b = {
                fresh: !1
            },
            c = [],
            d = [],
            e = {},
            f = $.Deferred();
        c.push(HFN.apiMethod("listshares", {
            iconformat: "id"
        }, function(a) {
            a = a.requests.outgoing.concat(a.shares.outgoing);
            for (var b = 0; b < a.length; ++b) a[b].folderowneruserid && HFN.config.user.userid != a[b].folderowneruserid || ("d" + a[b].folderid in e || (e["d" + a[b].folderid] = d.push({
                name: a[b].foldername || a[b].sharename,
                icon: HFN.ICO.FOLDER,
                type: "folder",
                isfolder: !0,
                id: "d" + a[b].folderid,
                folderid: a[b].folderid,
                ismine: !0,
                thumb: !1,
                isbusiness_shared: !1,
                shares: []
            }) - 1), d[e["d" + a[b].folderid]].shares.push({
                type: "shareid" in a[b] ? "share" : "request",
                shareid: "shareid" in a[b] ? a[b].shareid : a[b].sharerequestid,
                sharedwith: a[b].tomail
            }))
        }, b));
        c.push(HFN.apiMethod("listpublinks", {
            iconformat: "id"
        }, function(a) {
            a = a.publinks;
            for (var b = 0; b < a.length; ++b) {
                var c = "f";
                a[b].metadata.isfolder && (c = "d");
                a[b].metadata.isfolder && 0 == a[b].metadata.folderid && (c = "v" + a[b].linkid);
                "c" == a[b].metadata.id.charAt(0) && (c = "c");
                var f;
                f = a[b].metadata.isfolder ? a[b].metadata.folderid : a[b].metadata.fileid;
                f = c + f;
                console.log("ppp", f);
                f in e || (e[f] = d.push({
                    name: a[b].metadata.name,
                    icon: a[b].metadata.icon,
                    isfolder: a[b].metadata.isfolder,
                    id: a[b].metadata.id,
                    folderid: a[b].metadata.folderid,
                    parentfolderid: a[b].metadata.parentfolderid,
                    ismine: !0,
                    thumb: a[b].metadata.thumb,
                    hash: a[b].metadata.hash,
                    isbusiness_shared: !1,
                    shares: []
                }) - 1, a[b].metadata.isfolder ? (d[e[f]].folderid = a[b].metadata.folderid, d[e[f]].type = 0 == a[b].metadata.folderid ? "virtual" :
                    "folder", "c" == a[b].metadata.id.charAt(0) && (d[e[f]].type = "collection")) : (d[e[f]].fileid = a[b].metadata.fileid, d[e[f]].type = "file"));
                d[e[f]].shares.push({
                    type: "publink",
                    linkid: a[b].linkid,
                    code: a[b].code
                })
            }
        }, b));
        c.push(HFN.apiMethod("listuploadlinks", {
            iconformat: "id"
        }, function(a) {
            a = a.uploadlinks;
            for (var b = 0; b < a.length; ++b) a[b].metadata.id in e || (e[a[b].metadata.id] = d.push({
                name: a[b].metadata.name,
                icon: a[b].metadata.icon,
                type: "folder",
                isfolder: a[b].metadata.isfolder,
                id: a[b].metadata.id,
                folderid: a[b].metadata.folderid,
                ismine: !0,
                thumb: !1,
                isbusiness_shared: !1,
                shares: []
            }) - 1), d[e[a[b].metadata.id]].shares.push({
                type: "puplink",
                uploadlinkid: a[b].uploadlinkid
            })
        }, b));
        if (HFN.config.isBusiness()) {
            var g = $.Deferred();
            c.push(g);
            var k, l, m, b = HFN.apiMethod("account_listshares", {
                    iconformat: "id"
                }, function(a) {
                    k = a.shares.outgoing
                }, b),
                q = HFN.apiMethod("account_users", {}, function(a) {
                    l = a.users
                }),
                r = HFN.apiMethod("account_teams", {
                    showeveryone: 1
                }, function(a) {
                    m = a.teams
                }),
                p = function(a) {
                    for (var b = 0; b < m.length; ++b)
                        if (m[b].id == a) return m[b];
                    return !1
                },
                s = function(a) {
                    for (var b = 0; b < l.length; ++b)
                        if (l[b].id == a) return l[b];
                    return !1
                };
            $.when(b, q, r).then(function() {
                for (var a = 0; a < k.length; ++a) {
                    k[a].folder.id in e || (e[k[a].folder.id] = d.push({
                        name: k[a].folder.name,
                        icon: k[a].folder.icon,
                        type: "folder",
                        isfolder: k[a].folder.isfolder,
                        id: k[a].folder.id,
                        folderid: k[a].folder.folderid,
                        ismine: !0,
                        thumb: !1,
                        isbusiness_shared: !1,
                        shares: []
                    }) - 1);
                    for (var b = 0; b < k[a].sharedwith.length; ++b) d[e[k[a].folder.id]].shares.push({
                        type: "bshare",
                        bshareid: k[a].sharedwith[b].shareid,
                        team: !!k[a].sharedwith[b].team,
                        user: !!k[a].sharedwith[b].user,
                        teamobj: k[a].sharedwith[b].team ? p(k[a].sharedwith[b].toteamid) : null,
                        userobj: k[a].sharedwith[b].user ? s(k[a].sharedwith[b].touserid) : null
                    })
                }
                g.resolve()
            })
        }
        var t = {
            folder: 1,
            virtual: 2,
            collection: 3,
            file: 4
        };
        $.when.apply($, c).then(function() {
            console.log("ffmap", e);
            d.sort(function(a, b) {
                var c = parseInt(t[a.type]),
                    d = parseInt(t[b.type]);
                return c == d ? a.name.localeCompare(b.name) : c - d
            });
            a(d);
            f.resolve()
        });
        return f
    },
    listSharedFolders: function(a) {},
    listSharedBusinessFolders: function(a) {},
    listSharedDownloadLinks: function(a) {},
    listSharedUploadLinks: function(a) {},
    getFolderShares: function(a, b, c) {
        c = $.extend({
            fresh: !1
        }, c);
        var d = [],
            e = [],
            f = $.Deferred();
        d.push(this.getFolderOutShares(a, function(a) {
            e = e.concat(a)
        }, c));
        HFN.config.isBusiness() && d.push(this.getFolderOutBusinessShares(a, function(a) {
            e = e.concat(a)
        }, c));
        $.when.apply($, d).then(function() {
            e.sort(function(a, b) {
                var c = b.shared || b.created;
                return (new Date(a.shared || a.created)).getTime() > (new Date(c)).getTime()
            });
            b(e);
            f.resolve()
        });
        return f
    },
    getFolderOutShares: function(a, b, c) {
        c = $.extend({
            fresh: !1,
            includeRequests: !0
        }, c);
        var d = $.Deferred();
        HFN.apiMethod("listshares", {}, function(e) {
            var f = e.shares.outgoing,
                g = [];
            c.includeRequests && (f = f.concat(e.requests.outgoing));
            for (e = 0; e < f.length; ++e) f[e].folderid == a.folderid && g.push(f[e]);
            b(g);
            d.resolve()
        }, {
            forceFresh: c.fresh
        });
        return d
    },
    getFolderOutBusinessShares: function(a, b, c) {
        c = $.extend({
            fresh: !1
        }, c);
        var d, e, f, g, k, l = $.Deferred();
        d = HFN.apiMethod("account_listshares", {}, function(a) {
            f = a.shares.outgoing.concat(a.shares.manage)
        }, {
            forceFresh: c.fresh
        });
        e = HFN.apiMethod("account_users", {
            withavatars: 1
        }, function(a) {
            g = a.users
        }, {
            forceFresh: c.fresh
        });
        c = HFN.apiMethod("account_teams", {
            showeveryone: 1
        }, function(a) {
            k = a.teams
        }, {
            forceFresh: c.fresh
        });
        var m = function(a) {
                if (!a.touserid) return null;
                for (var b = 0; b < g.length; ++b)
                    if (g[b].id == a.touserid) return g[b]
            },
            q = function(a) {
                if (void 0 == a.toteamid) return null;
                for (var b = 0; b < k.length; ++b)
                    if (k[b].id == a.toteamid) return k[b]
            };
        $.when(d, e, c).then(function() {
            for (var c = [], d = 0; d < f.length; ++d)
                if (f[d].folder.folderid ==
                    a.folderid)
                    for (var e = 0; e < f[d].sharedwith.length; ++e) c.push($.extend({}, f[d].sharedwith[e], {
                        isowner: !1,
                        folderid: f[d].folder.folderid,
                        ownerid: f[d].folder.userid || HFN.config.user.userid,
                        userobj: m(f[d].sharedwith[e]),
                        teamobj: q(f[d].sharedwith[e])
                    }));
            b(c);
            l.resolve()
        });
        return l
    },
    getSharedStatus: function(a, b) {
        var c = !1,
            d = !1,
            e = !1,
            f = this.getPublink(a, function(a) {
                c = a
            }),
            g = this.getPuplink(a, function(a) {
                d = a
            }),
            k = this.getFolderShares(a, function(a) {
                e = !!a.length
            });
        $.when(f, g, k).then(function() {
            b({
                isshared: !!c || !!d ||
                    !!e,
                publink: !!c,
                puplink: !!d,
                share: !!e
            })
        })
    },
    getFolderMount: function(a, b) {
        var c = $.Deferred();
        HFN.apiMethod("listshares", {}, function(d) {
            d = d.shares.outgoing;
            for (var e = !1, f = 0; f < d.length; ++f)
                if (d[f].folderid == a.folderid) {
                    e = d[f];
                    break
                }
            b(e);
            c.resolve()
        });
        return c
    },
    getFolderOwner: function(a, b) {
        if (a.isbusiness_shared)
            if (HFN.config.isBusiness() && a.isbusiness_shared) {
                var c, d;
                $.when(HFN.apiMethod("account_listshares", {}, function(a) {
                    c = a.shares
                }), HFN.apiMethod("account_users", {}, function(a) {
                    d = a.users
                })).then(function() {
                    for (var e =
                        0; e < c.incoming.length; ++e)
                        if (c.incoming[e].folder.folderid == a.folderid) {
                            a: {
                                e = c.incoming[e].sharedfrom[0].fromuserid;
                                console.log(e);
                                for (var f = 0; f < d.length; ++f)
                                    if (d[f].id == e) {
                                        e = d[f];
                                        break a
                                    }
                                e = !1
                            }
                            b(e.firstname + " " + e.lastname);
                            return
                        }
                    b(null)
                })
            } else b(null);
        else HFN.apiMethod("listshares", {}, function(c) {
            for (var d = 0; d < c.shares.incoming.length; ++d)
                if (c.shares.incoming[d].folderid == a.folderid) {
                    b(c.shares.incoming[d].frommail);
                    return
                }
            b(null)
        })
    },
    createPublink: function(a) {
        console.log("data", a);
        var b, c;
        a.isplaylist ?
            (b = "getcollectionpublink", c = {
            collectionid: a.id,
            auth: HFN.config.auth
        }) : a.isfolder ? (b = "getfolderpublink", c = {
            folderid: a.folderid
        }) : (b = "getfilepublink", c = {
            fileid: a.fileid
        });
        HFN.apiMethod(b, c, function(b) {
            HFN.message("Download link is generated.");
            HFN.cache.expire(HFN.cache.cacheid("publinks", "all"));
            HFN.cache.expireMatch("api-listpublinks");
            HFN.refreshSharesAll();
            console.log("data #2", a);
            HFN.getPublink(a, function(b) {
                console.log("got publink ", b);
                (b.metadata.folderid || b.metadata.fileid) && HFN.gridUpdate(a, !0);
                HFN.sharePublink(b)
            })
        }, {
            forceFresh: !0
        })
    },
    getPublinkById: function(a, b, c) {
        this.getPublinkList(function(c) {
            for (var e = 0; e < c.length; ++e)
                if (c[e].linkid == a) {
                    b(c[e]);
                    return
                }
            b(!1)
        }, c)
    },
    getPublink: function(a, b, c) {
        var d = $.Deferred();
        this.getPublinkList(function(c) {
            for (var f = 0, g = !1; f < c.length; ++f)
                if (a.code && a.code == c[f].code || a.isplaylist && "c" + a.id == c[f].metadata.id || "d0" != a.id && c[f].metadata.id == a.id || "d0" == a.id && a.shares[0].code == c[f].code) {
                    g = c[f];
                    break
                }
            b(g);
            d.resolve()
        }, c);
        return d
    },
    getPublinkList: function(a,
        b) {
        b = $.extend({}, {
            async: !0
        }, b);
        HFN.apiMethod("listpublinks", {
            iconformat: "id"
        }, function(b) {
            a(b.publinks)
        }, b)
    },
    getOrCreatePublink: function(a, b, c) {
        console.log("op", c);
        HFN.getPublink(a, function(d) {
            d ? b(d) : (console.log("op #2", c), HFN.apiMethod("getfilepublink", {
                fileid: a.fileid
            }, function(d) {
                HFN.cache.expire("publinks-all");
                HFN.cache.expireMatch("api-listpublinks");
                HFN.getPublink(a, function(a) {
                    b(a)
                }, c || {})
            }, c || {}))
        }, c || {})
    },
    getOrCreatePublinkList: function(a, b, c, d) {
        for (var e = 0, f = [], g = [], k = {}; e < a.length; ++e) a[e].isfolder ?
            g.push(a[e].folderid) : f.push(a[e].fileid);
        g.length && (k.folderids = g.join(","));
        f.length && (k.fileids = f.join(","));
        k.name = b;
        console.log(d);
        HFN.apiMethod("gettreepublink", k, function(a) {
            c(a)
        }, d || {})
    },
    showPublink: function(a) {
        a = $.extend({}, {
            apiMethod: "showpublink",
            placeholder: ".publinkContent",
            code: "",
            callback: function() {},
            onError: function() {}
        }, a);
        HFN.apiMethod(a.apiMethod, {
            code: a.code
        }, function(b) {
            var c = "transferlink" == $.bbq.getState("page") ? "#topadtransfer" : "#topad";
            HFN.cacheTree(b.metadata, "public", {});
            if (!b.metadata.isfolder) {
                var d, e, f = HFN.renderTemplate(".publicDefault", {
                    name: b.metadata.name,
                    contenttype: b.metadata.contenttype,
                    size: HFN.formatSize(b.metadata.size)
                });
                d = $('<div class="button hugebut linebut modernbut" style="width: 165px !important;"></div>').html('<img src="//d1q46pwrruta9x.cloudfront.net/img/copy-link.png"> ' + __("Save to pCloud"));
                if (HFN.config.auth) d.on("click", HFN.copyToCloud.bind(HFN, {
                    code: a.code,
                    onDone: function(a) {
                        HFN.message(__("File is copied."))
                    }
                }));
                else d.on("click", function() {
                    HFN.initLoginRegModal(__("Log in to Save"),
                        function() {
                            HFN.pages.refresh()
                        })
                });
                e = $('<a href="javascript: void(0);" target="_blank" class="button hugebut linebut modernbut" style="width: 165px !important;"></a>').html('<img src="//d1q46pwrruta9x.cloudfront.net/img/download-link.png"> ' + __("Download File")).on("click.prep", function(b) {
                    $(this).off("click.prep");
                    var c = $(this);
                    c.addClass("graybut");
                    HFN.apiMethod("getpublinkdownload", {
                        code: a.code,
                        forcedownload: 1
                    }, function(a) {
                        c.removeClass("graybut").attr("href", HFN.prepUrl(a)).attr("target", "_blank");
                        console.log("sending to: ", HFN.prepUrl(a));
                        window.open(HFN.prepUrl(a))
                    }, {
                        async: !1
                    });
                    return !1
                });
                f.find(".publicButtons").empty().append(d).append(e)
            }
            if (b.metadata.isfolder) HFN.config.auth || ($(".header .centr").append(HFN.renderTemplate(c)), $(".topad .button").on("click", function() {
                HFN.setAfterLogin();
                $.bbq.pushState({
                    page: "register",
                    ref: 3
                }, 2)
            })), HFN.left.init(), $(".footer").show(), HFN.config.auth || HFN.initCreateAccountButton(2), $(".main").removeClass("noleft"), $(".publinkContent").empty().append(HFN.renderTemplate(".publinkFolder"));
            else if (b.metadata.category == HFN.CATEGORY.AUDIO) {
                HFN.config.auth || ($(".header .centr").append(HFN.renderTemplate(c)), $(".topad .button").on("click", function() {
                    HFN.setAfterLogin();
                    $.bbq.pushState({
                        page: "register",
                        ref: 3
                    }, 2)
                }));
                d = "getpublinkdownload";
                var g = fileext(b.metadata.name),
                    k = b.metadata.name;
                "mp3" != g && (d = "getpubaudiolink", g = "mp3");
                HFN.apiMethod(d, {
                    code: a.code
                }, function(a) {
                    f.find(".loading").hide();
                    f.find(".publicContainer").animate({
                        width: "422px",
                        height: "110px"
                    }, 550, function() {
                        $('<div style="width: 400px; margin: 150px auto 0 auto;"></div>');
                        $(this).css("height", "auto");
                        HFN.renderTemplate(".publicAudio", {
                            title: k
                        }).appendTo(f.find(".pubspot"));
                        var b = HFN.prepUrl(a);
                        $("#jquery_jplayer_1").jPlayer({
                            ready: function() {
                                var a = {};
                                a[g] = b;
                                $(this).jPlayer("setMedia", a)
                            },
                            swfPath: "/swf",
                            solution: "flash, html",
                            supplied: g,
                            wmode: "window",
                            smoothPlayBar: !0,
                            keyEnabled: !0
                        })
                    })
                })
            } else if (b.metadata.category == HFN.CATEGORY.VIDEO) {
                HFN.config.auth || ($(".header .centr").append(HFN.renderTemplate(c)), $(".topad .button").on("click", function() {
                    HFN.setAfterLogin();
                    $.bbq.pushState({
                        page: "register",
                        ref: 3
                    }, 2)
                }));
                var l = HFN.waitList,
                    m, q = !1,
                    r = HFN.waitList.create(function() {
                        $(a.placeholder).append('<div class="publicvideo"></div>');
                        f.find(".loading").hide();
                        var b = $.browser.mobile ? vLinks.getLowestUrl(m) : vLinks.getBestUrl(m),
                            c = {
                                selector: f.find(".pubspot"),
                                type: "video",
                                autoPlay: !1,
                                media: b,
                                sources: [
                                    ["video/mp4", b]
                                ],
                                name: "public-" + a.code,
                                callback: function(b) {
                                    a.page.player = b
                                }
                            };
                        q && (c.poster = HFN.prepUrl(q));
                        f.find(".publicContainer").animate({
                            width: "640px",
                            height: "360px"
                        }, 550, function() {
                            HFN.player.load(c)
                        })
                    }),
                    p = l.addWait(r),
                    s = l.addWait(r);
                b.metadata.thumb ? HFN.apiMethod("getpubthumblink", {
                    code: a.code,
                    size: "640x380"
                }, function(a) {
                    q = a;
                    l.setDone(r, p)
                }) : (q = !1, l.setDone(r, p));
                HFN.apiMethod("getpubvideolinks", {
                    code: a.code
                }, function(a) {
                    m = a.variants;
                    l.setDone(r, s)
                })
            } else b.metadata.category == HFN.CATEGORY.IMAGE && b.metadata.thumb ? (HFN.config.auth || ($(".header .centr").append(HFN.renderTemplate(c)), $(".topad .button").on("click", function() {
                    HFN.setAfterLogin();
                    $.bbq.pushState({
                        page: "register",
                        ref: 3
                    }, 2)
                })), c = b.metadata.width &&
                b.metadata.height ? HFN.calcImageSize(b.metadata.width, b.metadata.height, $(window).outerWidth() - 200, $(window).outerHeight() - 300) : HFN.calcImageSize(640, $(window).outerHeight() - 300), d = {
                    code: a.code,
                    size: c[0] + "x" + c[1]
                }, "png" == fileext(b.metadata.name).toLowerCase() && (d.type = "png"), f.find(".loading").show(), HFN.apiMethod("getpubthumblink", d, function(a) {
                    var b = new Image;
                    b.src = HFN.prepUrl(a);
                    $(b).on("load", function(a) {
                        f.find(".loading").hide();
                        f.find(".publicContainer").animate({
                            width: this.width + "px",
                            height: this.height +
                                "px"
                        }, 550, function() {
                            f.find(".pubspot").append('<img src="' + b.src + '" width="' + b.width + '" height="' + b.height + '">')
                        })
                    })
                })) : b.metadata.category == HFN.CATEGORY.DOCUMENT && (!$.browser.msie || 0 > versionCompare($.browser.version, "11.0")) && -1 != HFN.config.documentCanRenderExt.indexOf(fileext(b.metadata.name)) ? (c = [$(window).outerWidth() - 300, $(window).outerHeight() - 350], c = HFN.renderTemplate(".publinkheaderinfo", {
                    name: b.metadata.name,
                    size: HFN.formatSize(b.metadata.size),
                    contenttype: b.metadata.contenttype
                }, {
                    escape: !1
                }),
                $(".header .centr .publinkinfo").remove(), $(".header input").hide(), c = $(".header .centr").append(c), c.find(".button").remove(), c.append(d).append(e), $("html").addClass("iframe"), $(".centr>.gfrespace").hide(), $(".centr>a.upgrade").hide(), f = !1, HFN.apiMethod("getpublinkdownload", {
                    code: a.code
                }, function(b) {
                    $(".header .centr input").hide();
                    $(a.placeholder).empty();
                    var c = $('<iframe style="width: 100%; position: fixed; bottom: 0; left: 0; height: ' + ($(window).outerHeight() - 54) + 'px;" src="' + HFN.prepUrl(b) +
                        '"></iframe>').appendTo(a.placeholder);
                    $(window).off("resuze.publink").on("resize.publink", function() {
                        c.css({
                            height: $(window).outerHeight() - 54
                        })
                    });
                    HFN.spaceinfo.destroy();
                    HFN.uploadControl.isUploading() && HFN.uploadControl.destroy()
                })) : (HFN.config.auth || ($(".header .centr").append(HFN.renderTemplate(c)), $(".topad .button").on("click", function() {
                HFN.setAfterLogin();
                $.bbq.pushState({
                    page: "register",
                    ref: 3
                }, 2)
            })), f.find(".publicContainer").animate({
                width: "340px",
                height: "180px"
            }, 550, function() {
                f.find(".loading").hide();
                f.find(".pubspot").append(HFN.createIcon(b.metadata.icon, HFN.ICONS.PUBLINK))
            }));
            console.log("APPENDING CNT to " + a.placeholder + ": ", f);
            f && $(a.placeholder).empty().append(f);
            b.metadata.isfolder || (FileSelection.reset(), FileSelection.add(b.metadata));
            a.callback(b.metadata)
        }, {
            errorCallback: a.onError
        })
    },
    initDownloadPublic: function() {
        var a = this.renderTemplate(".downloadPublic"),
            b, c;
        b = $.bbq.getState("code") || $.deparam.querystring().code;
        a.find(".modal-files").empty().append(HFN.buildFilePreview(FileSelection.getSelectionInfo(), {
            publicCode: b
        }));
        a.find(".butt-area").append(c = $("<a>").addClass("button linebut greenbut modernbut").attr("href", "javascript: void(0);").attr("target", "_blank").text(__("Download File")).on("click", function() {
            Popup.close()
        }));
        b = {
            code: b,
            forcedownload: 1
        };
        console.log(" init pub download ", b);
        "fileids" in FileSelection.getAsArray() && (b.fileid = FileSelection.getAsArray().fileids[0]);
        HFN.apiMethod("getpublinkdownload", b, function(a) {
            c.attr("href", HFN.prepUrl(a))
        });
        Popup.open(a, {
            title: "Download Public File"
        })
    },
    copyToCloudDirect: function(a) {
        a = $.extend({}, {
            code: "",
            fileid: FileSelection.getSelectionInfo(),
            onDone: function() {}
        }, a);
        console.log("init copy to cloud", a);
        for (var b = function(c, f) {
            var l = d.addWait(e);
            c.isfolder ? HFN.apiMethod("createfolder", {
                folderid: f,
                name: c.name
            }, function(a) {
                console.log("copied folder");
                for (var f = 0; f < c.contents.length; ++f) b(c.contents[f], a.metadata.folderid);
                d.setDone(e, l)
            }) : HFN.apiMethod("copypubfile", {
                fileid: c.fileid,
                tofolderid: f,
                code: a.code
            }, function(a) {
                console.log("copied file: ",
                    a);
                d.setDone(e, l)
            })
        }, c = FileSelection.getSelectionInfo(), d = HFN.waitList, e = HFN.waitList.create(function() {
            a.onDone()
        }), f = 0; f < c.length; ++f) b(c[f], 0)
    },
    copyToCloud: function(a) {
        a = $.extend({}, {
            code: "",
            fileid: FileSelection.getSelectionInfo(),
            onDone: function() {}
        }, a);
        var b = FileSelection.getSelectionInfo(),
            c = HFN.renderTemplate(".copytocloudtmpl"),
            d = -1,
            e = HFN.waitList,
            f = e.create(function() {
                Popup.stopLoading()
            }),
            g = e.addWait(f),
            k = e.addWait(f);
        Popup.open(c, {
            title: "Copy to my pCloud: "
        });
        Popup.startLoading({
            now: !0
        });
        c.find(".modal-files").empty().append(HFN.buildFilePreview(b, {
            isPublic: !0,
            code: a.code,
            publicCode: a.code,
            onLoad: e.setDone.bind(e, f, g)
        }));
        HFN.foldersCustom.buildFolderBrowse(0, c.find(".tocopy"), {
            onSelect: function(a) {
                d = a
            },
            onLoad: e.setDone.bind(e, f, k),
            canCreateFolders: !0,
            showNoWritePermissions: !0,
            preselectFolder: 0,
            showCurrent: !0,
            expandFirstLevel: !0
        });
        c.find(".butt-area").append($('<div class="button smallbut linebut greenbut modernbut">').text(__("Save")).on("click.copy", function(c) {
            if (-1 != d) {
                for (var e in b)
                    if (HFN.fileExists(d,
                        b[e])) {
                        HFN.message(htmlentities(b[e].name) + " " + __('" already exists in the receiving folder.'));
                        Popup.close();
                        return
                    }
                $(this).off("click.copy");
                Popup.startLoading();
                var f = function(b, c) {
                        var d = g.addWait(k);
                        b.isfolder ? HFN.apiMethod("createfolder", {
                            folderid: c,
                            name: b.name
                        }, function(a) {
                            console.log("copied folder");
                            for (var c = 0; c < b.contents.length; ++c) f(b.contents[c], a.metadata.folderid);
                            g.setDone(k, d)
                        }) : HFN.apiMethod("copypubfile", {
                            fileid: b.fileid,
                            tofolderid: c,
                            code: a.code
                        }, function(a) {
                            console.log("copied file: ",
                                a);
                            g.setDone(k, d)
                        })
                    },
                    g = HFN.waitList,
                    k = HFN.waitList.create(function() {
                        HFN.message("Items are copied.");
                        Popup.stopLoading().close();
                        a.onDone({
                            tofolderid: d
                        })
                    });
                $(this).off("click.copy");
                for (e = 0; e < b.length; ++e) f(b[e], d);
                console.log("Display Loading ...")
            }
        })).append($('<div class="button smallbut darkbut linebut modernbut">').text(i18n.get("Cancel")).click(function() {
            Popup.close()
        }))
    },
    refreshTrashFolder: function(a) {
        HFN.cache.expire("listfolder-list-" + a + "-trash");
        daGrid.opts.metadata.folderid == a && daGrid.refresh(1)
    },
    initTrashDelete: function() {
        var a = this.renderTemplate("#trashDelete"),
            b = FileSelection.getSelectionInfo();
        Popup.open(a, {
            title: "Delete Trash"
        });
        Popup.startLoading({
            now: !0
        });
        setTimeout(function() {
            a.find(".modal-files").empty().append(HFN.buildFilePreview(b, {
                inTrash: !0,
                onLoad: Popup.stopLoading.bind(Popup)
            }))
        }, 200);
        a.find(".butt-area").prepend($('<div class="button redbut modernbut linebut">' + i18n.get("Delete Forever") + "</div>").on("click", function(a) {
            Popup.startLoading();
            a = new batchApiCall({
                errorCallback: function(a) {
                    HFN.message(a.error,
                        "error");
                    Popup.close()
                }
            });
            for (var d = 0; d < b.length; ++d) b[d].isfolder ? a.addCall("trash_clear", {
                folderid: b[d].folderid
            }) : a.addCall("trash_clear", {
                fileid: b[d].fileid
            });
            a.execute(function() {
                HFN.message("Item(s) deleted.");
                HFN.refreshTrashFolder(b[0].parentfolderid);
                Popup.close()
            })
        }))
    },
    initEmptyTrashAll: function() {
        var a = this.renderTemplate("#trashDeleteAll");
        a.find(".butt-area").prepend($('<div class="button redbut modernbut linebut">' + i18n.get("Empty Trash") + "</div>").on("click", function(a) {
            Popup.startLoading({
                now: !0
            });
            HFN.apiMethod("trash_clear", {
                folderid: 0
            }, function(a) {
                HFN.message("Trash is emptied.");
                HFN.refreshTrashFolder(0);
                Popup.close()
            })
        }));
        Popup.open(a, {
            title: "Empty Trash"
        })
    },
    initRestoreAll: function() {
        var a = this.renderTemplate("#trashRestoreAll");
        a.find(".butt-area").prepend($('<div class="button greenbut modernbut linebut">' + i18n.get("Restore") + "</div>").on("click", function(a) {
            HFN.apiMethod("trash_restore", {
                folderid: 0,
                metadata: 1
            }, function(a) {
                a.restored.length && HFN.message("Item(s) restored.");
                HFN.refreshTrashFolder(0);
                Popup.close()
            }, {
                errorCallback: function(a) {
                    var b = a.error;
                    2008 == a.result && (b = i18n.get("Your account is full. You need to clear more space, before restoring files."));
                    HFN.message(b, "error");
                    HFN.refreshTrashFolder(list[0].parentfolderid);
                    Popup.close()
                }
            })
        }));
        Popup.open(a, {
            title: "Restore All"
        })
    },
    initTrashRestore: function() {
        var a = this.renderTemplate("#trashRestore"),
            b = FileSelection.getSelectionInfo();
        Popup.open(a, {
            title: "Restore Item(s)"
        });
        Popup.startLoading({
            now: !0
        });
        setTimeout(function() {
            a.find(".modal-files").empty().append(HFN.buildFilePreview(b, {
                inTrash: !0,
                onLoad: Popup.stopLoading.bind(Popup)
            }))
        }, 200);
        if (1 == b.length) {
            var c = {};
            b[0].isfolder ? c.folderid = b[0].folderid : c.fileid = b[0].fileid;
            HFN.apiMethod("trash_getrestorepath", c, function(b) {
                folderBreadcrumb(b.destination.folderid, function(c) {
                    a.find(".modal-path .path").text(b.destination.name)
                })
            })
        } else a.find(".restoreinfo").hide();
        a.find(".butt-area").prepend($('<div class="button greenbut modernbut linebut">' + i18n.get("Restore") + "</div>").on("click", function(a) {
            Popup.startLoading();
            a = new batchApiCall({
                errorCallback: function(a,
                    c) {
                    var d = a.error;
                    2008 == a.result && (d = i18n.get("Your account is full. You need to clear more space, before restoring files."));
                    HFN.refreshTrashFolder(b[0].parentfolderid);
                    HFN.message(d, "error");
                    Popup.close()
                }
            });
            for (var c = 0; c < b.length; ++c) b[c].isfolder ? a.addCall("trash_restore", {
                folderid: b[c].folderid
            }) : a.addCall("trash_restore", {
                fileid: b[c].fileid
            });
            a.execute(function() {
                HFN.message("Item(s) restored.");
                HFN.refreshTrashFolder(b[0].parentfolderid);
                Popup.close()
            })
        }))
    },
    previewAudioCustom: function(a, b) {
        return this.renderTemplate(".audiorpeviewTmpl", {
            name: b,
            url: a
        })
    },
    initLoginRegModal: function(a, b, c, d) {
        b = b || function() {};
        a = a || "";
        c = -1 != ["login", "register"].indexOf(c) ? c : "choice";
        defaultOpts = {
            showRegisterLink: !0,
            showForgotPasswordLink: !1,
            modalOptions: {}
        };
        d = $.extend(defaultOpts, d);
        var e = HFN.renderTemplate("#loginRegisterModal", {
                title: a
            }),
            f = function() {
                $(".actionLogin").show();
                $(".actionRegister").hide();
                $(".modalButtons").hide();
                Popup.setTitle("Login to your pCloud account")
            },
            g = function() {
                $(".actionLogin").hide();
                $(".actionRegister").show();
                $(".modalButtons").hide();
                Popup.setTitle("Register new Account")
            };
        a.length || e.find(".h2title").hide();
        e.find(".logact").on("click", f);
        e.find(".loglink").on("click", f);
        e.find(".regact").on("click", g);
        e.find(".reglink").on("click", g);
        e.find(".forglink").on("click", function() {
            window.location.href = "https://my.pcloud.com/#page=login&fpass=1&returl=" + window.location.href
        });
        !1 === d.showRegisterLink && e.find(".reglink").remove();
        !1 === d.showForgotPasswordLink && e.find(".forglink").remove();
        Popup.open(e, $.extend({
                title: "Enter in pCloud account"
            },
            d.modalOptions));
        var k;
        e.find("form.login").on("submit", k = function(a) {
            a = $("#email").val();
            var c = $("#password").val();
            if (!validateEmail(a)) HFN.message("This E-mail address is not valid!", "error");
            else if (a && c) {
                $(".logbut").addClass("disabled");
                $(this).off("submit");
                Popup.startLoading();
                var d = this;
                HFN.login(a, c, 1, function(a) {
                    Popup.close();
                    b()
                }, function(a) {
                    2E3 == a.result ? HFN.message("Invalid email and password combination.", "error") : 4E3 == a.result && HFN.message(a.error, "error");
                    Popup.stopLoading();
                    $(".password").val("");
                    $(".logbut").removeClass("disabled");
                    $(d).on("submit", k)
                })
            }
        });
        var l;
        e.find("form.register").on("submit", l = function(a) {
            var c = $("#regemail").val(),
                d = $("#regpassword").val();
            a = $("#regrepeatpassword").val();
            var e = $("input#terms").prop("checked") ? 1 : 0;
            if (!validateEmail(c)) HFN.message("The e-mail you've entered is not valid.", "error");
            else if (d != a) HFN.message("Both passwords must be exact match.", "error");
            else if (!e) HFN.message("Terms of Service are expected to be accepted.", "error");
            else if (c && d) {
                $(this).off("submit");
                var f = {
                        termsaccepted: "yes",
                        mail: c,
                        password: d,
                        os: 4,
                        device: navigator.userAgent
                    },
                    g = this;
                rcookie("invcd") && (f.invite = rcookie("invcd"));
                parseInt(rcookie("ref")) ? f.ref = parseInt(rcookie("ref")) : parseInt($.bbq.getState("ref")) && (f.ref = parseInt($.bbq.getState("ref")));
                HFN.apiMethod("register", f, function(a) {
                    200 <= f.ref && 300 >= f.ref && ((new Image).src = "https://www.facebook.com/offsite_event.php?id=6012310707486&value=0&currency=USD");
                    setcookie("ref", 0);
                    setcookie("invcd", 0);
                    HFN.login(c, d, 1, function(a) {
                        Popup.close();
                        b()
                    }, function(a) {})
                }, {
                    errorCallback: function(a) {
                        HFN.message(a.error, "error");
                        $(".regbut").removeClass("disabled");
                        $(g).on("submit", l)
                    }
                })
            }
        });
        "login" == c ? f() : "register" == c && g()
    },
    policy: function(a) {
        if (-1 == ["tos", "pp", "ipp"].indexOf(a)) HFN.message("No such policy", "error");
        else {
            var b = {
                tos: "terms_conditions",
                pp: "privacy_policy",
                ipp: "intellectual_privacy"
            };
            Popup.startLoading({
                now: !0
            });
            $.getJSON(HFN.config.label.hasTerms, function(c) {
                c = c[b[a]];
                Popup.close();
                Popup.open(HFN.renderTemplate(".rulesText", {
                    content: c.content
                }, {
                    escape: !1
                }), {
                    title: c.title
                });
                Popup.stopLoading()
            })
        }
    },
    showCryptoStatus: function() {
        var a = HFN.renderTemplate("#cryptostatus", {
            pcloud_crypto_only_on_drive_message: __("pcloud_crypto_only_on_drive_message", !1, {
                pcloud_drive: '<b><a href="https://www.pcloud.com/desktop.html" target="_blank">pCloud Drive</a></b>',
                ios_app: '<b><a href="https://itunes.apple.com/us/app/pcloud/id692002098" target="_blank">iOS</a></b>',
                android_app: '<b><a href="https://play.google.com/store/apps/details?id=com.pcloud.pcloud" target="_blank">Android</a></b>'
            })
        }, {
            escape: !1
        });
        Popup.open(a, {
            title: "pCloud Crypto Activated"
        })
    },
    getOrCreateFolder: function(a, b, c) {
        a = a.replace(/:/g, ";");
        a = a.replace(/\\/g, "|");
        a = a.replace(/\//g, "|");
        HFN.apiMethod("listfolder", {
            folderid: b,
            getkey: 1
        }, function(d) {
            d.key && (pCloudCrypto.saveKey(d.metadata.id, d.key), a = pCloudCrypto.encryptMetaName({
                name: a,
                parentfolderid: b
            }));
            for (var e = 0, f = !1; e < d.metadata.contents.length; ++e)
                if (HFN.metaName(d.metadata.contents[e]) == a) {
                    f = d.metadata.contents[e].folderid;
                    break
                }
            f ? c(f, !1) : (e = {
                    folderid: b,
                    name: a
                },
                d.metadata.encrypted && (e.key = pCrypt.generatefolderkey(), e.encrypted = 1), HFN.apiMethod("createfolder", e, function(a) {
                    c(a.metadata.folderid, !0)
                }))
        }, {
            forceFresh: !0
        })
    },
    renderTemplate: function(a, b, c) {
        console.log("RENDER TEMPLATE ", a, b);
        c = $.extend({}, {
            escape: !0
        }, c);
        a = $(a).html().trim().toString();
        if (null !== a.match(/({{{{{|}}}}})/)) throw Error("Invalid translation expression!!!\nIt is not allowed to have concacted transaltion start and variable start, and variable end and translation end markers. They must be separated");
        a = a.replace(/{{{(.+?)}}}/gmi, function(a, b) {
            var c = b,
                d = !1; - 1 != b.indexOf("|") && (c = b.substring(0, b.indexOf("|")), d = b.substring(b.indexOf("|") + 1));
            return __(c, d)
        });
        for (var d in b) {
            for (; - 1 != a.indexOf("{{foreach:");) {
                for (var e = a.match(/{{foreach::([^}]+)}}\s*([\s\S]+?)\s*{{\/foreach}}/i), f = e[1], g = e[2], k = "", l = 0, m = b[f].length; l < m; l++) {
                    var q = g,
                        r;
                    for (r in b[f][l]) b[f][l].hasOwnProperty(r) && (q = q.replace("{{item::" + r + "}}", c.escape ? htmlentities(b[f][l][r]) : b[f][l][r]));
                    k += q
                }
                a = a.replace(e[0], k)
            }
            for (e = 0; 20 > e; e++) a =
                a.replace("{{" + d + "}}", c.escape ? htmlentities(b[d]) : b[d])
        }
        return $(a)
    },
    buildUrl: function(a) {
        return location.protocol + "//" + location.hostname + ("/" != a.charAt(0) ? "/" : "") + a
    },
    strFit: function(a, b) {
        b = b || 50;
        if (a.length <= b) return a;
        b -= 3;
        var c = Math.floor(0.75 * b),
            d = b - c;
        return a.substring(0, c) + "..." + a.substring(a.length - d)
    },
    strFitMail: function(a, b) {
        var c = a.indexOf("@"),
            d = Math.max(10, b - (a.length - c));
        console.log(b, a.length, c, d);
        return this.strFit(a.substring(0, c), d) + a.substring(c)
    },
    pcldFileName: function(a) {
        a = a.trim();
        a = a.replace(/:/g, ";");
        a = a.replace(/\\/g, "|");
        return a = a.replace(/\//g, "|")
    },
    pathAsString: function(a) {
        for (var b = [], c = 0; c < a.length; ++c) b.push("/" == a[c].name ? "" : "/" + a[c].name);
        return b.join("")
    },
    toParseDt: function(a) {
        a = new Date(a);
        return a.getFullYear() + "-" + (9 > parseInt(a.getMonth()) ? "0" : "") + (a.getMonth() + 1) + "-" + (10 > a.getDate() ? "0" : "") + a.getDate()
    },
    formatDt: function(a) {
        return (new Date(a)).toLocaleDateString()
    },
    formatDtTime: function(a) {
        return (new Date(a)).toLocaleString()
    },
    prepDt: function(a) {
        return (new Date(a)).toLocaleString()
    },
    formatTime: function(a, b, c) {
        var d = [],
            e = 60;
        for (d.unshift(a); d[0] > e - 1;) d.unshift(Math.floor(d[0] / e)), d[1] %= e, 2 > d[1].toString().length && (d[1] = "0" + d[1]), e = 3 <= d.length ? 24 : 60;
        2 > d[0].toString().length && (d[0] = "0" + d[0]);
        c && 1 == d.length && d.unshift("00");
        if (b) {
            a = [__("sec"), __("min"), __("hour"), __("day")];
            b = [__("secs"), __("mins"), __("hours"), __("days")];
            c = d.length - 1;
            for (e = []; 0 <= c; --c)
                if (parseInt(d[c])) {
                    var f = 1 < parseInt(d[c]) ? b : a;
                    e.unshift(d[c] + "" + f[Math.abs(c - d.length + 1)])
                }
            return e.join(" ")
        }
        return d.join(":")
    },
    metaName: function(a) {
        return a.encrypted && a.parentfolderid ? pCloudCrypto.decryptMetaName(a) : a.name
    },
    metaIcon: function(a) {
        return a.encrypted && a.parentfolderid ? pCloudCrypto.getIcon(a) : a.icon
    },
    metaCategory: function(a) {
        return a.encrypted && a.parentfolderid ? pCloudCrypto.getCategory(a) : a.category
    },
    metaSize: function(a) {
        return a.encrypted ? pCrypt.cipherSizeToPlainSize(a.size) : a.size
    },
    formatSize: function(a, b) {
        void 0 == b && (b = 1);
        return 1099511627776 <= a ? (a / 1099511627776).toFixed(b) + " " + __("Tb") : 1073741824 <= a ? (a / 1073741824).toFixed(b) +
            " " + __("Gb") : 1048576 <= a ? (a / 1048576).toFixed(b) + " " + __("Mb") : 1024 <= a ? (a / 1024).toFixed(b) + " " + __("Kb") : a.toFixed(b) + " " + __("B")
    },
    prepArtist: function(a) {
        return a ? a.trim().replace(/^["]+/, "").replace(/["]+$/, "").trim() : ""
    },
    calcSongs: function(a) {
        for (var b = 0, c = 0; b < a.albums.length; ++b) c += a.albums[b].songs.length;
        return c
    },
    getArtistSongs: function(a) {
        for (var b = 0, c, d = []; b < a.albums.length; ++b)
            for (c = 0; c < a.albums[b].songs.length; ++c) d.push(a.albums[b].songs[c]);
        return d
    },
    gatherFSArtistSongs: function(a) {
        for (var b =
            0, c, d, e = []; b < a.length; ++b)
            for (c = 0, d = this.getArtistSongs(a[b]); c < d.length; ++c) e.push(d[c]);
        return e
    },
    openFolder: function(a, b) {
        var c = "undefined" == typeof publink ? {
            page: "filemanager"
        } : {};
        0 != a && (c.folder = a);
        b && (c.tpl = b);
        $.bbq.pushState(c, 2);
        $(window).scrollTop(0)
    },
    openComments: function(a) {
        $.bbq.pushState({
            comments: a
        })
    },
    openSurvey: function() {
        Popup.open(this.renderTemplate("#survey", {
            src: "https://www.surveymonkey.com/s/pCloud_Survey"
        }), {
            title: "Customer Survey"
        })
    }
};
HFN.videoGallery = $.extend({}, HFN.gallery, {
    name: "videogallery"
});
HFN.audioGallery = $.extend({}, HFN.gallery, {
    name: "audiogallery"
});
HFN.singleGallery = $.extend({}, HFN.gallery, {
    name: "singlegallery"
});
var Gridlist = function(a) {
    this.holder = null;
    this.opts = $.extend({}, this.defaults, a.options);
    if (this.opts.template && Gridlist.templates[this.opts.template])
        if (this.template = Gridlist.templates[this.opts.template], console.log("!!!!!!!!!!!!!!!!!!!!!!!! ", this.opts), this.dataSource = !1, a.dataSource && "function" == typeof a.dataSource) {
            HFN.megaLoad.hide();
            HFN.megaLoad.show();
            this.dataSource = a.dataSource;
            var b = this;
            this.dataSource(function(a) {
                HFN.megaLoad.hide();
                console.log("ret", a);
                b.data = a.contents;
                b.opts.metadata =
                    a;
                b.initialize();
                b.setPage(b.opts.page, !0)
            })
        } else this.data = a.data, this.initialize(), this.setPage(this.opts.page, !0)
};
Gridlist.prototype = {
    MODE_LIST: 1,
    MODE_GRID: 2,
    defaults: {
        mode: Gridlist.MODE_LIST,
        paging_url: !1,
        page: 1,
        trackPage: !0,
        letterhead: !1,
        showTableHeadings: !0,
        sorting: !0,
        emptytitle: __("No Data")
    },
    opts: {},
    holder: null,
    initialize: function() {
        !this.opts.displayitems && this.template.displayitems && (this.opts.displayitems = this.template.displayitems);
        this.holder = $("<div>").addClass("gridlist").append($("<div>").addClass("heading"));
        this.template.mode == this.MODE_LIST ? $("<table>").append($("<thead>")).append($("<tbody>")).appendTo(this.holder) :
            this.template.mode == this.MODE_GRID && $('<div class="contents"></div>').appendTo(this.holder);
        this.holder.append($("<div>").addClass("footing"));
        if (this.template.onInit) this.template.onInit(this);
        !this.opts.paging && this.template.paging && (this.opts.paging = this.template.paging);
        this.initSort();
        !this.opts.title && this.template.title && (this.opts.title = this.template.title);
        this.applyTitle();
        !this.opts.templateswitch && this.template.templateswitch && (this.opts.templateswitch = this.templateswitch);
        this.opts.customHeader ?
            this.customHeader = this.opts.customHeader : this.template.customHeader && (this.customHeader = this.template.customHeader);
        this.template.buildBreadcrumb && (this.buildBreadcrumb = this.template.buildBreadcrumb);
        $(this.opts.place).empty().append(this.holder);
        this.customHeader(this.holder);
        this.template.fixSizes && this.template.fixSizes(this);
        this.opts.sorting && this.dealWithSort();
        this.holder = null
    },
    getMeta: function() {
        return this.opts.metadata
    },
    getFolderMetaInCurrent: function(a) {
        var b = this.filteredRowsAll.filter(function(b) {
            return b.folderid ==
                a
        });
        return b ? b[0] : null
    },
    getFileMetaInCurrent: function(a) {
        var b = this.filteredRowsAll.filter(function(b) {
            return b.fileid == a
        });
        return b ? b[0] : null
    },
    beforeFill: function(a) {
        this.rowsReady = !1;
        this.template.beforeFill && this.template.beforeFill(this, a)
    },
    afterFill: function(a) {
        this.rowsReady = !0;
        this.onReadyRun();
        this.template.afterFill && this.template.afterFill(this, a)
    },
    resetFill: function() {
        this.template.resetFill && this.template.resetFill(this)
    },
    refresh: function() {
        if (this.dataSource) {
            var a = this;
            this.data = [];
            this.dataSource(function(b) {
                a.data = b.contents;
                a.opts.metadata = b;
                a.customHeader();
                a.applySort();
                a.reSetPage(a.pager.current, !0)
            })
        } else this.customHeader(), this.applySort(), this.reSetPage(this.pager.current, !0)
    },
    applyTitle: function() {},
    applyTemplateSwitch: function(a) {
        if (this.opts.templateswitch) {
            var b = this.opts.templateswitch;
            console.log("TPL SWITCH", this.opts.templateswitch);
            for (var c = $("<ul>").addClass("switcher"), d = 0; d < b.length; ++d) {
                var e = $("<li>");
                if (a != b[d].name) e.on("click.grid", $.bbq.pushState.bind($.bbq, {
                    tpl: b[d].template
                }));
                e.append(b[d].img);
                a == b[d].name && e.addClass("curr");
                c.append(e)
            }
            return c
        }
    },
    customHeader: function() {},
    buildHeading: function() {
        console.log("BUILDING THE HEADING");
        var a = $(this.holderSelector() + " thead"),
            b = 0,
            c, d, e, f;
        if (!a.children().length) {
            for (c = $("<tr>"); b < this.template.columns.length; ++b) {
                e = this.template.columns[b];
                console.log("col", e);
                d = $("<th>");
                "function" == typeof e.buildHead ? e.buildHead(d, this) : d.text(e.name);
                d.addClass(e.id);
                d.appendTo(c);
                e.sortable && (d.addClass("sortable").disableSelection(),
                    d.append('<span class="sort"></span>'));
                this.sort == e.id && d.addClass(this.sortDirection);
                var g = this;
                if (e.sortable) d.data("id", e.id).on("click.grid", e, function(a) {
                    $(this).siblings().removeClass("asc").removeClass("desc");
                    $(this).hasClass("asc") ? (f = "desc", $(this).addClass("desc").removeClass("asc")) : (f = "asc", $(this).addClass("asc").removeClass("desc"));
                    g.setSort($(this).data("id"), f)
                })
            }
            c.appendTo(a);
            console.log("done heading")
        }
    },
    initSort: function() {
        console.log("INIT SORT ", this);
        var a = [],
            b = this.opts.metadata &&
            this.opts.metadata.folderid ? this.opts.metadata.folderid : 0,
            c;
        if (rcookie("gsort")) {
            c = JSON.parse(rcookie("gsort"));
            var d = this.opts.template;
            this.template.commonSort && (d = this.template.commonSort);
            c && c[d] && "object" == typeof c[d][b] ? a = c[d][b] : c && c[d] && c[d][0] && (a = c[d][0]);
            a && (a[0] && (this.sort = a[0]), a[1] && (this.sortDirection = a[1]), void 0 != a[2] && (this.sortFolder = a[2]))
        }!a.length && this.template.defaultSort && (a = this.template.defaultSort, console.log("USING SORT: ", a), a.sort && (this.sort = a.sort), a.direction && (this.sortDirection =
            a.direction), a.sortFolder && (this.sortFolder = a.sortFolder));
        this.applySort()
    },
    initPaging: function(a) {
        this.pager = {
            first: 1,
            total: 0,
            current: 1
        };
        this.pager.total = this.filteredRowsAll.length / this.opts.paging;
        Math.floor(this.pager.total) < this.pager.total && (this.pager.total = Math.floor(this.pager.total) + 1);
        this.pager.current = 1 <= a && a <= this.pager.total ? a : 1;
        this.pager.prev = Math.max(0, this.pager.current - 1);
        this.pager.next = Math.min(this.pager.total, this.pager.current + 1);
        this.pager.next > this.pager.total && (this.pager.next =
            0)
    },
    buildPager: function() {
        console.log("BUILDING PAGER ", this.holderSelector() + " .footing", $(this.holderSelector() + " .footing"));
        var a = $(this.holderSelector() + " .footing"),
            b = this.pager;
        a.empty();
        console.log("PAGER ", this.pager);
        if (!(1 >= b.total)) {
            var c = $("<div>").addClass("nav"),
                d = this.opts.pagerMaxPagesLine || 5,
                e = Math.max(1, b.current - d),
                d = Math.min(b.total, b.current + d),
                f, g = this,
                k = $('<div class="prev"><img src="//d1q46pwrruta9x.cloudfront.net/img/prev-image-active.png" width="51" height="30" class="act"><img src="//d1q46pwrruta9x.cloudfront.net/img/prev-image-show.png" width="51" height="30" class="ina"></div>').on("click.prev",
                    function(a) {
                        b.prev && (g.opts.trackPage ? $.bbq.pushState({
                            p: b.prev
                        }) : g.setPage(b.prev))
                    }).appendTo(c),
                l = $('<div class="next"><img src="//d1q46pwrruta9x.cloudfront.net/img/next-image-active.png" width="51" height="30" class="act"><img src="//d1q46pwrruta9x.cloudfront.net/img/next-image-show.png" width="51" height="30" class="ina"></div>').on("click.next", function(a) {
                    b.next && (g.opts.trackPage ? $.bbq.pushState({
                        p: b.next
                    }) : g.setPage(b.next))
                }).appendTo(c);
            b.prev || k.css("opacity", 0);
            b.current == b.total && l.css("opacity",
                0);
            console.log("USING: ", e, d);
            for (b.current != b.first && c.append($("<span>").addClass("txt").text(i18n.get("First")).on("click", function() {
                g.opts.trackPage ? $.bbq.pushState({
                    p: b.first
                }) : g.setPage(b.first)
            })); e <= d; ++e)(function(a) {
                f = $("<span>").text(a).on("click", function() {
                    g.opts.trackPage ? $.bbq.pushState({
                        p: a
                    }) : g.setPage(a)
                });
                b.current == a && f.addClass("curr");
                c.append(f)
            })(e);
            b.current != b.total && c.append($("<span>").addClass("txt").text(i18n.get("Last")).on("click", function() {
                g.opts.trackPage ? $.bbq.pushState({
                    p: b.total
                }) :
                    g.setPage(b.total)
            }));
            a.empty();
            a.append(c)
        }
    },
    setPage: function(a, b) {
        function c(a) {
            return (new Date).getTime() - a
        }
        $(window).scrollTop(0);
        var d = (new Date).getTime();
        this.opts.showTableHeadings && this.buildHeading();
        console.log("heading done", c(d));
        this.initRows();
        this.initPaging(a);
        console.log("init paging", c(d));
        this.filterRows();
        console.log("filter rows", c(d));
        this.buildPager();
        console.log("build pager", c(d));
        this.fillRows(b);
        console.log("fill rows", c(d))
    },
    reSetPage: function(a, b) {
        this.setPage(a, b)
    },
    applyTemplateFilter: function() {},
    initRows: function() {
        var a = this.data;
        this.template.filterRows && (a = this.template.filterRows.call(this, a));
        this.filteredRowsAll = a
    },
    filterRows: function() {
        var a = this.data,
            b = (this.pager.current - 1) * this.opts.paging;
        this.template.filterRows && (a = this.template.filterRows.call(this, a));
        this.filteredRowsAll = a;
        this.filteredRows = a.slice(b, b + this.opts.paging)
    },
    setPrevPage: function() {
        1 < this.pager.total && this.setPage(this.pager.prev)
    },
    setNextPage: function() {
        1 < this.pager.total && this.setPage(this.pager.next)
    },
    dealWithSort: function() {
        $(".csortnew ul a").removeClass("active");
        var a = $(".csortnew ul a." + this.sort + "." + this.sortDirection);
        a.length && a.addClass("active")
    },
    setSort: function(a, b, c) {
        a && (this.sort = a);
        b && (this.sortDirection = b);
        void 0 != c && (this.sortFolder = c);
        setSortCookie(this.template.commonSort || this.opts.template, this.opts.metadata && this.opts.metadata.folderid ? this.opts.metadata.folderid : 0, this.sort, this.sortDirection, this.sortFolder);
        this.dealWithSort();
        this.applySort();
        this.opts.trackPage && 1 != parseInt($.bbq.getState("p")) ?
            $.bbq.pushState({
                p: 1
            }) : this.reSetPage(1, !0)
    },
    compareSort: function(a) {
        return a[0] == this.sort && a[1] == this.sortDirection && a[2] == this.sortFolder ? !0 : !1
    },
    getPrepSort: function(a) {
        if (this.getColumn(a) && this.getColumn(a).prepSort) return this.getColumn(a).prepSort;
        if (this.template.customSorts && this.template.customSorts[a]) return this.template.customSorts[a]
    },
    applySort: function() {
        var a = this,
            b = this.getPrepSort(this.sort),
            c, d, e, f;
        this.opts.metadata && this.opts.metadata.sort && this.compareSort(this.opts.metadata.sort) ||
            null == this.sort || (console.log("actually doing sort", this.data), this.data.sort(function(g, k) {
                c = g[a.sort];
                d = k[a.sort];
                b && (c = b(c, g, a), d = b(d, k, a));
                e = f = void 0;
                a.sortFolder && (e = g.isfolder ? 1 : 0, f = k.isfolder ? 1 : 0);
                if (void 0 != a.sortFolder && e != f) return f - e;
                var l = "asc" == a.sortDirection ? 1 : -1;
                if (void 0 == c && d) return -1 * l;
                if (c && void 0 == d) return 1 * l;
                if (void 0 == c && void 0 == d) return 0;
                if (!isNaN(parseFloat(c)) && isFinite(c) && !isNaN(parseFloat(d)) && isFinite(d)) return (c - d) * l;
                try {
                    return c.localeCompare(d) * l
                } catch (m) {
                    console.log(m),
                    console.log(c, d)
                }
            }), this.opts.metadata && (this.opts.metadata.sort = [this.sort, this.sortDirection, this.sortFolder]))
    },
    appendDataList: function(a) {
        for (var b = 0; b < a.length; ++b) this.appendData(a[b])
    },
    removeDataItem: function(a) {
        for (var b = 0; b < this.data.length; ++b) a.id == this.data[b].id && this.data.splice(b, 1)
    },
    appendData: function(a, b, c) {
        console.log("GRID APPEND", a, b, c);
        this.opts.metadata.sort && delete this.opts.metadata.sort;
        b && (this.data.push(a), HFN.data.fflookup[a.id] = a);
        this.initPaging(this.pager.current);
        this.applySort();
        this.filterRows();
        b = this.findDataPosition(a);
        console.log("pos", b);
        console.log("data before append", this.data);
        this.appendRow(a, b, c);
        this.fixDatasData(b, 1);
        this.filterRows();
        this.beforeFill(!1);
        this.afterFill(!1);
        2 == this.template.mode && fixGridMargins(this.parentSelector())
    },
    removeData: function(a, b) {
        console.log("GRID REMOVE", a, !!b);
        var c = this.findDataPosition(a);
        HFN.findOriginalMetadata({
            id: "d" + a.parentfolderid
        });
        var d = this,
            e;
        fs.remove(a);
        var f = this.removeDataItem(a);
        console.log("removed",
            f);
        HFN.data.fflookup[a.id] && console.log("GRID REMOVE parent orig", HFN.findOriginalMetadata({
            id: "d" + a.parentfolderid
        }));
        console.log("pos", c); - 1 != c && (e = $(this.itemSelector()).eq(c - (this.pager.current - 1) * this.opts.paging), console.log(c, a, e), e.removeClass("gridline"), e.removeClass("gridbox"), b ? (e.remove(), 2 == this.template.mode && fixGridMargins(this.parentSelector())) : e.find("td").empty().end().animate({
            height: 0,
            opacity: 0
        }, function() {
            e.remove();
            2 == d.template.mode && fixGridMargins(d.parentSelector())
        }));
        this.fixDatasData();
        this.filterRows();
        this.beforeFill(!1);
        this.afterFill(!1);
        console.log("================================================================")
    },
    updateData: function(a, b) {
        console.log("GRID UPDATE", a, b);
        var c = this.findDataPosition(a);
        HFN.findOriginalMetadata({
            id: "d" + a.parentfolderid
        });
        var d = this,
            e; - 1 != c && (this.filteredRowsAll[c] = a, HFN.data.fflookup[a.id] = a, e = $(this.itemSelector()).eq(c), console.log("found el", e), e.removeClass("gridline").removeClass("gridbox"), b ? (e.remove(), 2 == this.template.mode &&
            fixGridMargins(this.parentSelector())) : e.find("td").empty().end().animate({
            height: 0,
            opacity: 0
        }, function() {
            e.remove();
            2 == d.template.mode && fixGridMargins(d.parentSelector())
        }), this.appendRow(a, c, b), this.fixDatasData(c, 1), this.filterRows(), this.beforeFill(!1), this.afterFill(!1), b && this.getSelection().filter(function(b) {
            return b == a.id
        }).length && this.selectById(a.id), 2 == this.template.mode && fixGridMargins(this.parentSelector()))
    },
    findDataPosition: function(a) {
        for (var b = 0; b < this.filteredRows.length && a.id !=
            this.filteredRows[b].id; ++b);
        return b
    },
    findElementPosition: function(a) {
        for (var b = $(this.itemSelector()), c = 0; c < b.length; ++c)
            if (!$(b[c]).hasClass("ui-sortable-placeholder") && this.data[$(b[c]).data("n")].id == a.id) return c;
        return -1
    },
    fixDatasData: function() {
        $(this.itemSelector()).each(function(a, b) {
            $(b).data("n", a)
        })
    },
    appendRow: function(a, b, c) {
        console.log("appending row", arguments);
        if (!this.template.filterRows || 0 != this.template.filterRows([a]).length) {
            var d;
            if (this.template.mode == this.MODE_LIST) {
                d = $(this.holderSelector() +
                    " tbody");
                d.find(".nodata").remove();
                var e, f;
                e = $("<tr>");
                for (var g = 0; g < this.template.columns.length; ++g) f = $("<td>"), this.template.columns[g].build(a, f, e, void 0 != b ? b : this.data.length, this, !0), f.appendTo(e);
                console.log(d.find("tr.gridline").eq(b - 1));
                c || e.css("opacity", 0).animate({
                    opacity: 1
                }, 700);
                void 0 != b ? 0 == b ? d.prepend(e) : d.find("tr.gridline").eq(b - 1).after(e) : e.appendTo(d)
            } else if (this.template.mode == this.MODE_GRID) {
                d = $(this.holderSelector() + " .contents");
                d.find(".nodata").remove();
                for (g = 0; g < this.template.columns.length; ++g) e =
                    $("<div>"), this.template.columns[g].build(a, e, b ? b : this.data.length, this, !0);
                c || e.css("opacity", 0).animate({
                    opacity: 1
                }, 700);
                console.log("appending", a, b);
                console.log(d);
                void 0 != b ? 0 == b ? d.prepend(e) : d.find(this.itemSelectorOnly()).eq(b - 1).after(e) : e.appendTo(d)
            }
        }
    },
    onreadycalls: [],
    onReady: function(a) {
        this.rowsReady ? a() : this.onreadycalls.push(a)
    },
    onReadyRun: function() {
        console.log("on ready run", this.onreadycalls);
        for (var a = this.onreadycalls.length - 1; 0 <= a; --a) this.onreadycalls.splice(a)[0]()
    },
    fillRows: function(a) {
        var b =
            (new Date).getTime();
        this.beforeFill(a);
        var c = $.extend([], this.filteredRows ? this.filteredRows : this.data),
            d = this,
            e = $(this.parentSelector()).empty(),
            f = e,
            g = null,
            k = {};
        $.extend([], c);
        console.log("dlist", c);
        var l = function(a, b, c) {
            b = b || 0;
            var p = a.splice(0, 15),
                s = 0,
                t = 0;
            if (d.template.mode == d.MODE_LIST)
                if (p.length || d.opts.noempty)
                    for (var v, x; s < d.opts.displayitems && s in p; ++s) {
                        if (d.opts.letterhead && (d.sort == d.opts.letterhead.id || !d.opts.sorting)) {
                            var t = d.opts.letterhead.genUnique(p[s], s, d),
                                u;
                            g != t && ($("<tr>").addClass("letterhead").append(u =
                                $("<td>").attr("colspan", d.template.columns.length).addClass("letterhead")).appendTo(e), d.opts.letterhead.build(u, p[s], s, d), g = t)
                        }
                        v = $("<tr>");
                        for (t = 0; t < d.template.columns.length; ++t) u = d.template.columns[t], u.grouped && k[u.id] == p[s][u.id] || (u.grouped ? (x = $('<tr class="grp-tr"><td class="grp-td"></td><td class="grp-rest" valign="top"><table class="grp-cnt"></table></td></tr>').appendTo(e), u.build(p[s], x.find(".grp-td"), v, 15 * b + s, d), x.find(".grp-rest").attr("colspan", d.template.columns.length - 1), f = x.find(".grp-cnt"),
                            k[u.id] = p[s][u.id]) : (x = $("<td>"), u.build(p[s], x, v, 15 * b + s, d), x.appendTo(v)));
                        v.appendTo(f)
                    } else e.append('<tr class="nodata"><td colspan="' + d.template.columns.length + '" align="center"> ' + d.opts.emptytitle + " </td></tr>");
                else if (d.template.mode == d.MODE_GRID)
                if (p.length || d.opts.noempty)
                    for (; s < d.opts.displayitems && s in p; ++s) {
                        d.opts.letterhead && d.sort == d.opts.letterhead.id && (t = d.opts.letterhead.genUnique(p[s], s, d), g != t && (e.append($("<div>").css({
                                clear: "both"
                            })), u = $("<div></div>").addClass("letterhead").appendTo(e),
                            d.opts.letterhead.build(u, p[s], s, d), g = t));
                        for (t = 0; t < d.template.columns.length; ++t) v = $("<div>"), d.template.columns[t].build(p[s], v, 15 * b + s, d);
                        v.appendTo(e)
                    } else e.append(' <div class="emptyline nodata"> ' + d.opts.emptytitle + " </div> ");
            a.length ? setTimeout(function() {
                l(a, b + 1, c)
            }, 5) : c()
        };
        l(c, 0, function() {
            console.log("fillEx: ", (new Date).getTime() - b + "ms");
            d.template.mode == d.MODE_GRID && ($(d.parentSelector()).append($("<div>").css({
                clear: "both"
            })), fixGridMargins(d.parentSelector()));
            FileSelection.reset();
            d.prepSelections && d.template.hasSelection && d.prepSelections();
            d.afterFill(a)
        })
    },
    simplifyInterface: function() {
        $(this.parentSelector() + " .afinfo").remove();
        $(this.holderSelector() + " .nav").remove()
    },
    getDataByPos: function(a) {
        a = (this.pager.current - 1) * daGrid.opts.paging + a;
        return a in this.data ? this.data[a] : !1
    },
    holderSelector: function() {
        return this.opts.place + " .gridlist"
    },
    parentSelector: function() {
        return this.template.mode == this.MODE_LIST ? this.opts.place + " .gridlist > table > tbody" : this.opts.place + " .gridlist .contents"
    },
    itemSelector: function() {
        return this.template.mode == this.MODE_LIST ? this.opts.place + " .gridlist tbody tr.gridline" : "mobile" == this.template.templatetype ? this.opts.place + " .gridlist .contents .mobbox" : this.opts.place + " .gridlist .contents .gridbox"
    },
    itemSelectorOnly: function() {
        return this.template.mode == this.MODE_LIST ? "tr.gridline" : "mobile" == this.template.templatetype ? ".mobbox" : ".gridbox"
    },
    itemClass: function() {},
    cleanUp: function() {
        console.log("grid cleaning up");
        $(this.holderSelector() + " .heading").empty();
        $(this.itemSelector()).removeData();
        $(this.itemSelector()).off("*").remove();
        $(this.parentSelector()).remove();
        delete this.data;
        delete this.filteredRows;
        $(this.holderSelector()).empty();
        this.cleanSelection();
        this.resetFill()
    },
    cleanSelection: function() {
        this.clearSelection && this.clearSelection();
        $(this.parentSelector()).off();
        $(window).off(".grid");
        $(document).off(".grid");
        $(document.body).off(".grid");
        $("*").off(".grid")
    },
    prepSelections: function() {
        var a = FileSelection,
            b = this;
        $(this.itemSelector()).disableSelection();
        $(this.parentSelector()).off("mouseup");
        $(this.parentSelector()).on("mouseup", "input.editchk", function(e) {
            e.preventDefault();
            e = $(this).parents(b.itemSelectorOnly())[0];
            $(e).hasClass("sel") ? (d(e), $(e).parent().children().removeClass("lastsel"), a.opts.lastclicked = !1) : (c(e, !1), a.opts.lastclicked = e);
            return !1
        }).off("click", "input.editchk").on("click", "input.editchk", function(a) {
            a.preventDefault()
        });
        $(this.parentSelector()).on("mouseup", "td.editbox", function(a) {
            a.stopPropagation();
            $(this).find("input.editchk").trigger("mouseup")
        });
        var c = function(c, d) {
            if ($(c).data()) {
                if (d && (console.log("in me only"), b.clearSelection(), a.opts.lastclicked = c, b.opts.metadata && void 0 != !b.opts.metadata.folderid)) {
                    var e = $.parseJSON(rcookie("gras")) || {};
                    void 0 == e[b.opts.template] && (e[b.opts.template] = {});
                    console.log($(c).data("n"));
                    console.log(c);
                    e[b.opts.template][parseInt(b.opts.metadata.folderid)] = b.filteredRowsAll[$(c).data("n")].id;
                    setcookie("gras", JSON.stringify(e), 5)
                }
                $(c).siblings().removeClass("lastsel");
                $(c).addClass("lastsel");
                $(c).addClass("sel");
                $(c).find("input.editchk").prop("checked", !0);
                console.log("NO ME ONLY");
                e = b.data;
                b.filteredRows && (e = b.filteredRows);
                a.add(e[$(c).data("n")])
            }
        };
        this.selectOne = c;
        this.selectById = function(a, d) {
            void 0 == d && (d = !0);
            var e = this.findAndGoToPage("id", a);
            e && $(this.itemSelector()).each(function(f, g) {
                a == b.filteredRowsAll[$(g).data("n") + (e - 1) * b.opts.paging].id && (c(g, d), getProperScrollTo($(g)))
            })
        };
        this.getFirstSelectionPlace = function() {
            return $($(this.itemSelector() + ".sel")[0]).data("n")
        };
        this.selectByPlace = function(a,
            b) {
            void 0 == b && (b = !0);
            var d = $(this.itemSelector());
            c(d.length - 1 > a ? d[a] : d[d.length - 1], b)
        };
        this.selectAll = function() {
            $(this.itemSelector()).each(function(a, b) {
                c(b)
            })
        };
        this.clearSelection = function(b) {
            $(this.itemSelector()).removeClass("sel lastsel");
            console.log("CLEAR SELECTION: ", this.itemSelector() + " input.editchk");
            $(this.itemSelector() + " input.editchk").prop("checked", !1);
            $(this.holderSelector() + " th.editbox input").prop("checked", !1);
            a.reset(b)
        };
        this.getSelection = function() {
            for (var b = 0, c = []; b < a.getSelectionInfo().length; ++b) c.push(a.getSelectionInfo()[b].id);
            return c
        };
        this.restoreSelection = function(a) {
            for (var b = 0; b <= a.length; ++b) this.selectById(a[b], !1)
        };
        var d = function(c) {
            console.log("DESELECTING");
            $(c).removeClass("sel lastsel");
            $(c).find("input.editchk").prop("checked", !1);
            $(b.holderSelector() + " th.editbox input").prop("checked", !1);
            a.remove(b.filteredRows[$(c).data("n")])
        };
        this.deselectOne = d;
        var e = function(a, d, e) {
            var f = b.data[$(a).data("n")],
                k = b.data[$(d).data("n")],
                l = !1,
                m = null;
            b.clearSelection(!0);
            if (b.template.mode == b.MODE_LIST || e) $(b.itemSelectorOnly()).each(function(a,
                d) {
                m = b.data[$(d).data("n")];
                if (f.id == m.id || k.id == m.id) {
                    if (l) return c(d, !1), !1;
                    l = !0;
                    c(d, !1)
                } else l && c(d, !1)
            });
            else {
                a = g($(a).data("n"));
                d = g($(d).data("n"));
                var q = [Math.min(a[0], d[0]), Math.max(a[0], d[0])],
                    A = [Math.min(a[1], d[1]), Math.max(a[1], d[1])];
                $(b.itemSelectorOnly()).each(function(a, b) {
                    var d = g($(b).data("n"));
                    q[0] <= d[0] && d[0] <= q[1] && A[0] <= d[1] && d[1] <= A[1] && c(b, !1)
                })
            }
        };
        (function() {
            if (b.opts.metadata) {
                var a = $.parseJSON(rcookie("gras")) || !1;
                console.log(a);
                a && a[b.opts.template] && a[b.opts.template][b.opts.metadata.folderid] &&
                    (console.log(" IN IT "), b.selectById(a[b.opts.template][b.opts.metadata.folderid]), delete a[b.opts.template][b.opts.metadata.folderid], obLength(a[b.opts.template]) || delete a[b.opts.template]);
                0 != b.opts.metadata.folderid && obLength(a) ? setcookie("gras", JSON.stringify(a), 5) : setcookie("gras", "", -1)
            }
        })();
        var f = function(b) {
            0 == $(b.target).parents(".gridlist").length && (a.opts.lmouse = !1, a.opts.lastclicked = !1)
        };
        if (b.template.mode == b.MODE_GRID) {
            var g = function(a) {
                    var b = calcGridItemsPerRow(daGrid.parentSelector()),
                        c = Math.ceil((a + 1) / b);
                    a = (a + 1) % b;
                    return [0 == a ? b : a, c]
                },
                k, l, m, q;
            $(".gridlist").off("mousedown.grid").on("mousedown.grid", ".gridbox", function(a) {
                lmove = q = null;
                if ("input" != a.target.tagName.toLowerCase() || !$(a.target).hasClass("editchk")) {
                    a.preventDefault();
                    var b = [a.pageX, a.pageY],
                        d;
                    m = setTimeout(function() {
                        $(".gridlist").on("mousemove", function(a) {
                            console.log("mouse move");
                            if (!(d && 5 > Math.abs(d[0] - a.pageX) && 5 > Math.abs(d[1] - a.pageY))) {
                                d = [a.pageX, a.pageY];
                                l && (clearTimeout(l), l = null);
                                var f = null;
                                $(a.target).hasClass("gridbox") ?
                                    f = a.target : $(a.target).parent().hasClass("gridbox") ? f = $(a.target).parent()[0] : $(a.target).parent().parent().hasClass("gridbox") && (f = $(a.target).parent().parent()[0]);
                                f && lmove != f && (q ? e(q, f) : (q = f, c(q, !0)), lmove = f);
                                l = setTimeout(function() {
                                    var a = d,
                                        c;
                                    c = $(".gridlist .gridsel").length ? $(".gridlist .gridsel") : $("<div></div>").addClass("gridsel").appendTo(".gridlist");
                                    c.css({
                                        width: Math.abs(a[0] - b[0]),
                                        height: Math.abs(a[1] - b[1]),
                                        top: Math.min(a[1], b[1]),
                                        left: Math.min(a[0], b[0])
                                    });
                                    k = c;
                                    l = null
                                }, 4)
                            }
                        })
                    }, 20);
                    $(document.body).off(".grid").on("mouseup.grid click.grid mouseleave.grid",
                        function(a) {
                            m && (clearTimeout(m), m = null);
                            k && (k.remove(), k = null);
                            l && (clearTimeout(l), l = null);
                            q = null;
                            $(".gridlist").off("mousemove");
                            $(document.body).off(".grid")
                        })
                }
            })
        }
        $(this.parentSelector()).off("mouseup.grid").on("mouseup.grid", this.itemSelectorOnly(), function(b) {
            console.log("UP", b.target, b);
            "input" == b.target.tagName.toLowerCase() && $(b.target).hasClass("editchk") || "td" == b.target.tagName.toLowerCase() && $(b.target).hasClass("editbox") || ($(b.target).hasClass("filename"), console.log("up", a.opts.lastclicked,
                this), a.opts.lastclicked = this, a.opts.lmouse = !1)
        });
        $(this.parentSelector()).off("mousedown.grid").on("mousedown.grid", this.itemSelectorOnly(), function(b) {
            b.preventDefault();
            console.log("DOWN", b.target, b);
            b.preventDefault();
            "input" == b.target.tagName.toLowerCase() && $(b.target).hasClass("editchk") || "td" == b.target.tagName.toLowerCase() && $(b.target).hasClass("editbox") || $(b.target).hasClass("draghandler") || $(b.target).hasClass("dragimg") || $(b.target).parents(".comments").length || $(b.target).hasClass("comments") ||
                1 < b.which || (b.shiftKey && a.opts.lastclicked ? e(a.opts.lastclicked, this, !0) : b.ctrlKey || b.metaKey ? $(this).hasClass("sel") ? (d(this), $(this).parent().children().removeClass("lastsel"), a.opts.lastclicked = !1) : (c(this, !1), a.opts.lastclicked = this) : (console.log("is reset"), c(this, !0), a.opts.lmouse = !0, a.opts.lastclicked = this))
        });
        $(this.parentSelector()).off("mouseover.grid").on("mouseover.grid", this.itemSelectorOnly(), function(d) {
            a.opts.lmouse && a.opts.lastclicked && (a.opts.lastclicked != this ? e(a.opts.lastclicked,
                this) : (b.clearSelection(!0), c(this, !1)))
        });
        $(document).on("mousedown.grid", f);
        $(document).on("mouseup.grid", f);
        $(this.parentSelector()).off("mouseleave.grid").on("mouseleave.grid", f);
        $(this.parentSelector() + " tr.letterhead").off("mouseup.grid").on("mouseup.grid", function(b) {
            a.opts.lmouse = !1
        });
        $(this.parentSelector()).off("dragstart.grid").on("dragstart.grid", function(b) {
            a.opts.lmouse = !1
        });
        $(".megawrap").off("click.grid").on("click.grid", function(a) {
            $(a.target).closest(b.parentSelector()).length ||
                $(a.target).closest(b.holderSelector() + " thead").length || $(a.target).closest(".headerunder").length || null == b.getFirstSelectionPlace() || (console.log("CLEAR SELECTION OUTSIDE CLICK"), b.clearSelection())
        });
        b.template.mode == b.MODE_GRID && ($(b.parentSelector()).on("mouseup.grid", function(a) {
            console.log("mouseup", this, a.target);
            $(a.target).hasClass("contents") && b.clearSelection()
        }), $(b.parentSelector()).disableSelection());
        $(window).off("keydown.grid").on("keydown.grid", function(d) {
            if ("body" == d.target.tagName.toLowerCase() &&
                "block" != $(".overlay").css("display") && (!HFN.uploadControl.loaded || HFN.uploadControl.minimized())) {
                console.log("keydown grid");
                var f = !1,
                    g = [38],
                    k = [40],
                    l = !1;
                b.template.mode == b.MODE_GRID && (g.push(37), k.push(39), l = !0);
                if (-1 != [37, 38, 39, 40, 13].indexOf(d.keyCode)) {
                    console.log("codes", g, k);
                    a.opts.lastscribbed ? f = a.opts.lastscribbed : a.opts.lastclicked && (f = a.opts.lastclicked);
                    console.log("last is ", f);
                    if (-1 != g.indexOf(d.keyCode))
                        if (d.preventDefault(), f) {
                            var m;
                            if (l && 38 == d.keyCode) {
                                g = calcGridItemsPerRow(".gridlist .contents");
                                console.log(" per line is ", g);
                                do {
                                    if (f = $(f).prev()[0]) m = f;
                                    g -= 1
                                } while (g)
                            } else m = $(f).prev()[0]; if (!m) return;
                            d.shiftKey ? m != a.opts.lastclicked ? e(a.opts.lastclicked, m, !0) : c(m, !0) : c(m, !0);
                            a.opts.lastscribbed = m;
                            getProperScrollTo($(m))
                        } else c($(b.itemSelector())[0], !0), getProperScrollTo($($(b.itemSelector())[0]));
                    else if (-1 != k.indexOf(d.keyCode))
                        if (d.preventDefault(), f) {
                            if (l && 40 == d.keyCode) {
                                g = calcGridItemsPerRow(".gridlist .contents");
                                console.log(" per line is ", g);
                                do {
                                    if (f = $(f).next()[0]) m = f;
                                    g -= 1
                                } while (g)
                            } else m =
                                m = $(f).next(b.itemSelector())[0]; if (!m) return;
                            d.shiftKey ? m != a.opts.lastclicked ? e(a.opts.lastclicked, m, !0) : c(m, !0) : c(m, !0);
                            a.opts.lastscribbed = m;
                            getProperScrollTo($(m))
                        } else c($(b.itemSelector())[0], !0), getProperScrollTo($($(b.itemSelector())[0]));
                    13 == d.keyCode && 1 == a.getSelectionInfo().length && "input" != d.target.tagName.toLowerCase() && clickGridItem(a.getSelectionInfo()[0]);
                    b.template.mode == b.MODE_LIST && 1 < b.pager.total && a.getSelectionInfo().length && (f = b.getFirstSelectionPlace(), 37 == d.keyCode ? (b.setPrevPage(),
                        b.selectByPlace(f)) : 39 == d.keyCode && (b.setNextPage(), b.selectByPlace(f)))
                }
            }
        }.bind())
    },
    sort: null,
    getColumn: function(a) {
        for (var b = 0; b < this.template.columns.length; ++b)
            if (a == this.template.columns[b].id) return this.template.columns[b];
        return !1
    },
    getNextColumn: function(a) {
        for (var b = 0, c = this.template; b < c.columns.length; ++b)
            if (a == c.columns[b].id) return c.columns[b + 1] || c.columns[0];
        return !1
    },
    findAndGoToPage: function(a, b) {
        if (a && b)
            for (var c = this.pager.first; c <= this.pager.total; ++c)
                for (var d = (c - 1) * this.opts.paging; d <=
                    Math.min(c * this.opts.paging - 1, this.data.length - 1); ++d)
                    if (this.data[d][a] == b) return c != this.pager.current && this.setPage(c), c
    }
};
Gridlist.templates = {};
Gridlist.templates.folderlist = {
    name: "folderlist",
    displayitems: 3E3,
    mode: Gridlist.prototype.MODE_LIST,
    headings: !0,
    paging: 5,
    hasSelection: !0,
    defaultSort: {
        sort: "name",
        direction: "asc",
        sortFolder: !0
    },
    type: "publiclist",
    columns: [{
        id: "edit",
        name: "",
        sortable: !1,
        build: function(a, b, c, d, e) {
            a = $("<input>", {
                type: "checkbox"
            }).addClass("editchk").appendTo(b);
            b.addClass("editbox");
            b.css("text-align", "center");
            e.opts.metadata.encrypted && pCrypt.locked && a.attr("disabled", "disabled")
        },
        buildHead: function(a, b) {
            a.addClass("editbox");
            var c = $("<input>", {
                type: "checkbox"
            }).appendTo(a).on("change.grid", function(a) {
                this.checked ? b.selectAll() : b.clearSelection()
            });
            a.css("text-align", "center");
            b.opts.metadata.encrypted && pCrypt.locked && c.attr("disabled", "disabled")
        }
    }, {
        id: "name",
        name: i18n.get("Name"),
        sortable: !0,
        prepSort: function(a, b) {
            return HFN.metaName(b)
        },
        build: function(a, b, c, d, e, f) {
            f = HFN.metaName(a);
            var g = $('<span class="filename"></span>').text(e.opts.sizeMatters ? HFN.strFit(f, e.opts.sizeMatters) : f),
                k, l, m = HFN.metaIcon(a),
                q;
            a.isfolder &&
                g.addClass("folder");
            a.encrypted && pCrypt.locked && c.addClass("encrypted");
            f = $('<div class="file-wrap"></div>').append(g);
            !a.ismine && a.ismount && (m = HFN.ICO.FOLDER_SHAREDWITHME);
            b.addClass("file").append(k = $('<div class="iconwrap"></div>').append(l = HFN.createIcon(m, HFN.ICONS.LIST).addClass("listicon"))).append(f);
            a.ismine || a.ismount || k.append('<div class="sharedwithme"></div>');
            c.data("n", d);
            HFN.thumbManager.setupThumb(l, a, HFN.ICONS.LIST);
            a.thumb && (a.category == HFN.CATEGORY.VIDEO ? k.append('<div class="infoicon"><img src="//d1q46pwrruta9x.cloudfront.net/img/cam-icon.png" width="17"></div>') :
                a.category == HFN.CATEGORY.AUDIO && k.append('<div class="infoicon"><img src="//d1q46pwrruta9x.cloudfront.net/img/nota-standart.png" width="15"></div>'));
            q = a.isfolder ? function(b) {
                b.ctrlKey || b.shiftKey || b.metaKey || HFN.openFolder(a.folderid)
            } : function(b) {
                b.ctrlKey || b.shiftKey || b.metaKey || (b.stopPropagation(), console.log("preview file with", a), HFN.previewFile(a))
            };
            g.on("click", q);
            l.on("click", q);
            c.addClass("gridline");
            f.after(buildGearMenu(a, e));
            a.encrypted ? b.addClass("thumbready") : (a.isshared && a.ismine &&
                HFN.getSharedStatus(a, function(a) {
                    a.share ? l.replaceWith(HFN.createIcon(HFN.ICO.FOLDER_SHARED, HFN.ICONS.LIST).addClass("listicon").on("click", q)) : k.append('<div class="shared"></div>')
                }), HFN.config.isBusiness() && (c.addClass("meta" + a.id), f.after(c = $('<div class="comments"></div>').text(a.comments).on("click", function() {
                    $.bbq.getState("comments") == a.id ? $.bbq.removeState("comments") : HFN.openComments(a.id)
                })), a.comments && c.addClass("has")), a.encrypted || ((a.ismine || a.isbusiness_shared && a.canmanage && a.isfolder) &&
                    f.after(buildShareMenu(a, e)), !a.ismine && a.ismount && HFN.getFolderOwner(a, function(a) {
                        g.after($('<div class="folder-owner"></div>').append('<img src="/img/owner.png">').append(a).attr("title", "Owner: " + a));
                        b.addClass("shared")
                    })))
        }
    }, {
        id: "size",
        name: i18n.get("Size"),
        sortable: !0,
        build: function(a, b, c, d, e) {
            b.addClass("gridsize");
            a.isfolder ? b.append("-") : b.append(HFN.formatSize(HFN.metaSize(a)))
        },
        buildHead: function(a) {
            a.addClass("gridsize").text(i18n.get("Size"))
        }
    }, {
        id: "modified",
        name: i18n.get("Modified"),
        sortable: !0,
        build: function(a, b, c, d, e) {
            b.addClass("dtcreated").text(HFN.formatDt(a.modified)).attr("title", i18n.get("Modified") + ": " + HFN.prepDt(a.modified))
        },
        buildHead: function(a) {
            a.addClass("dtcreated").text(i18n.get("Modified"))
        },
        prepSort: function(a) {
            return (new Date(a)).getTime()
        }
    }],
    buildBreadcrumb: function() {
        var a = $("<div>").addClass("fbreadcrumb");
        if (this.opts.metadata && !this.opts.metadata.filter) {
            var b = this;
            folderBreadcrumb(this.opts.metadata.folderid, function(c) {
                a.append(buildBreadcrumb(c));
                "parentfolderid" in b.opts.metadata && ("Crypto Folder" != b.opts.metadata.name || !b.opts.metadata.encrypted) && pCloudCrypto.cryptoRoot != b.opts.metadata.folderid && a.find("span").last().append(buildGearMenu(b.opts.metadata));
                console.log("BUILT GEAR")
            })
        } else this.opts.metadata.filter ? a.append(buildBreadcrumb([{
            name: "/",
            folderid: 0
        }, {
            name: HFN.left.getFilterName(this.opts.metadata.filter, this.opts.metadata.q)
        }], void 0, !1)) : this.opts.title && a.append(this.opts.title);
        return a
    },
    customHeader: function(a) {
        var b = $('<div class="cheader"></div>'),
            c = $('<div class="headerwrap"></div>').append(b).append('<div class="clearfix"></div>');
        b.append(this.buildBreadcrumb());
        var d = $('<div class="controls"></div>'),
            e = this;
        "parentfolderid" in this.opts.metadata && this.opts.metadata.folderid != this.opts.metadata.parentfolderid && this.opts.metadata.folderid != pCloudCrypto.cryptoRoot && d.append($('<a class="cheader_up mnheader" href="javascript:void(0)">' + i18n.get("UP") + "</a>").click(function() {
            $.bbq.pushState({
                folder: e.opts.metadata.parentfolderid
            })
        }));
        if ("publiclist" ==
            this.template.type && "folderid" in this.opts.metadata && (console.log("metadata", this.opts.metadata), Perm.canCreate(this.opts.metadata))) {
            var f = $("<div>", {
                href: "javascript: void(0);",
                "class": "newfolder"
            }).click(function() {
                HFN.newFolder(e.opts.metadata.folderid)
            }).append("<span>").append(i18n.get("New Folder"));
            d.prepend(f)
        }
        "publiclist" == this.template.type && this.opts.metadata && "folderid" in this.opts.metadata && (Perm.canUpload(this.opts.metadata) || 0 == this.opts.metadata.folderid) && d.prepend($('<div class="button linebut" style="vertical-align: middle;"> <img src="//d1q46pwrruta9x.cloudfront.net/img/upload-button.png" width="15" height="15"> ' +
            i18n.get("Upload") + "</div>").on("click", function(a) {
            a.stopPropagation();
            HFN.uploadControl.init()
        }));
        b.append(d);
        f = HFN.renderTemplate(this.opts.cheadtpl || "#cheadtmpl");
        this.opts.metadata.filter && f.find(".controlstitle").text(__("Select file(s) to see options"));
        this.opts.templateswitch ? (f.find(".templateswitch li").on("click", function(a) {
            e.name != $(this).data("template") && $.bbq.pushState({
                tpl: $(this).data("template")
            })
        }), f.find(".templateswitch li." + this.template.name).addClass("active")) : f.find(".templateswitch").remove();
        var g = function(a, b) {
            $(".gridlist th." + a).addClass(b).removeClass("asc" == b ? "desc" : "asc").siblings().removeClass("asc").removeClass("desc")
        };
        f.find("ul a").on("click", function(a) {
            var b = $(this).data("sort"),
                c = $(this).data("ord");
            "folders" == b ? (b = $(this).find("input"), "input" != a.target.tagName.toLowerCase() && (console.log(b, this), console.log("CHE", b.prop("checked")), b.prop("checked", !b.prop("checked"))), e.setSort(!1, !1, b.prop("checked"))) : (e.setSort(b, c), g(b, c));
            $(".csortnew ul").hide();
            setTimeout(function() {
                    $(".csortnew ul").removeAttr("style")
                },
                10)
        });
        this.sortFolder && f.find("input[type=checkbox]").prop("checked", !0);
        c.append(f);
        console.log("HEADING", $(this.holderSelector() + " .heading"), b);
        a ? a.find(".heading").empty().append(c) : $(this.holderSelector() + " .heading").empty().append(c);
        this.opts.metadata.encrypted && pCrypt.locked && (c.addClass("encrypted").find(".headerunder").append('<div class="disabled"></div>'), d.append('<div class="disabled"></div>'));
        HFN.controlsnew.init({
            place: ".headerunder .controlsplc",
            type: this.opts.code ? "publink" : "default"
        })
    },
    fixSizes: function(a) {
        $(".gridlist .cheader .fbreadcrumb").width($(".gridlist .cheader").outerWidth() - $(".gridlist .cheader .controls").outerWidth() - 5)
    },
    beforeFill: function(a, b) {
        console.log("BEFORE FILL", arguments);
        if (b) {
            a.opts.sizeMatters = !1;
            if (a.template.mode == a.MODE_LIST) {
                var c = $(".gridlist thead tr");
                10 < (c.outerWidth() - 240 - 270) / 8.7 && (a.opts.sizeMatters = Math.ceil((c.outerWidth() - 240 - 270) / 8.7))
            }
            this.resetFill(a)
        }
        b = b || !1;
        for (var d = 0, e = [], f = [], g = [], k = {}; d < a.data.length; ++d) c = a.data[d], c.category ==
            HFN.CATEGORY.IMAGE && c.thumb ? e.push(c) : c.category == HFN.CATEGORY.VIDEO && f.push(c);
        for (d = 0; d < a.filteredRows.length; ++d) c = a.filteredRows[d], c.category == HFN.CATEGORY.AUDIO && -1 == HFN.config.excludeAudioExt.indexOf(fileext(c.name).toLowerCase()) && g.push(c);
        a.opts.code && (k.code = a.opts.code);
        console.log("init with gallery opts", k);
        HFN.gallery.init(e, k);
        HFN.videoGallery.init(f, k);
        HFN.audioGallery.init(g, k);
        a.audioData = {
            metas: g,
            opts: k
        }
    },
    resetFill: function(a) {
        console.log("RESET FILL ARGUMETNS", arguments);
        a.clearSelection &&
            a.clearSelection();
        a.thumbList = [];
        HFN.gallery.reset();
        HFN.videoGallery.reset();
        HFN.audioGallery.reset()
    },
    afterFill: function(a, b) {
        a.template.fixSizes && b && a.template.fixSizes(a);
        console.log("after fill on the call");
        $.bbq.getState("file") && a.selectById($.bbq.getState("file"));
        a.template.mode == a.MODE_LIST ? ($(a.parentSelector() + " tr.afinfo").remove(), $(a.parentSelector() + " tr.nodata").remove(), a.filteredRowsAll.length ? ($(a.parentSelector() + " tr.afinfo").remove(), $(a.parentSelector()).append('<tr class="afinfo"><td colspan="' +
            a.template.columns.length + '">' + a.filteredRowsAll.length + " " + i18n.get("items") + "</td></tr>")) : $(a.parentSelector()).append('<tr class="nodata"><td colspan="' + a.template.columns.length + '" align="center"> ' + a.opts.emptytitle + " </td></tr>")) : ($(a.parentSelector() + " div.nodata").remove(), $(a.parentSelector() + " div.afinfo").remove(), a.data.length ? ($(a.parentSelector() + " div.clearfix").remove(), $(a.parentSelector() + " div.afinfo").remove(), $(a.parentSelector()).append(' <div class="clearfix"></div><div class="afinfo" style="text-align: left;">' +
            a.data.length + " " + i18n.get("items") + "</div> ")) : $(a.parentSelector()).append(' <div class="emptyline nodata"> ' + i18n.get("No Data") + " </div> "));
        b && HFN.thumbManager.flush()
    }
};
Gridlist.templates.encryptedfolderlist = $.extend({}, Gridlist.templates.folderlist, {
    buildBreadcrumb: function() {
        var a = $("<div>").addClass("fbreadcrumb");
        this.opts.metadata && !this.opts.metadata.filter ? encryptedFolderBreadcrumb(this.opts.metadata.folderid, function(b) {
            console.log("received list", b);
            a.append(buildEncryptedBreadcrumb(b));
            console.log("BUILT GEAR")
        }) : this.opts.metadata.filter ? a.append(buildBreadcrumb([{
                name: "/",
                folderid: 0
            }, {
                name: HFN.left.getFilterName(this.opts.metadata.filter, this.opts.metadata.q)
            }],
            void 0, !1)) : this.opts.title && a.append(this.opts.title);
        return a
    },
    customHeader: function(a) {
        var b = $('<div class="cheader"></div>'),
            c = $('<div class="headerwrap"></div>').append(b).append('<div class="clearfix"></div>');
        b.append(this.buildBreadcrumb());
        var d = $('<div class="controls"></div>'),
            e = this;
        "parentfolderid" in this.opts.metadata && this.opts.metadata.folderid != this.opts.metadata.parentfolderid && this.opts.metadata.folderid != pCloudCrypto.cryptoRoot && d.append($('<a class="cheader_up mnheader" href="javascript:void(0)">' +
            i18n.get("UP") + "</a>").click(function() {
            $.bbq.pushState({
                folder: e.opts.metadata.parentfolderid
            })
        }));
        b.append(d);
        d = HFN.renderTemplate(this.opts.cheadtpl || "#cheadtmpl");
        this.opts.metadata.filter && d.find(".controlstitle").text(__("Select file(s) to see options"));
        d.find(".templateswitch").remove();
        var f = function(a, b) {
            $(".gridlist th." + a).addClass(b).removeClass("asc" == b ? "desc" : "asc").siblings().removeClass("asc").removeClass("desc")
        };
        d.find("ul a").on("click", function(a) {
            var b = $(this).data("sort"),
                c =
                $(this).data("ord");
            "folders" == b ? (b = $(this).find("input"), "input" != a.target.tagName.toLowerCase() && (console.log(b, this), console.log("CHE", b.prop("checked")), b.prop("checked", !b.prop("checked"))), e.setSort(!1, !1, b.prop("checked"))) : (e.setSort(b, c), f(b, c));
            $(".csortnew ul").hide();
            setTimeout(function() {
                $(".csortnew ul").removeAttr("style")
            }, 10)
        });
        this.sortFolder && d.find("input[type=checkbox]").prop("checked", !0);
        c.append(d);
        console.log("HEADING", $(this.holderSelector() + " .heading"), b);
        a ? a.find(".heading").empty().append(c) :
            $(this.holderSelector() + " .heading").empty().append(c);
        HFN.controlsnew.init({
            place: ".headerunder .controlsplc",
            type: "encrypted",
            getSelectionSummary: function() {
                var a = [],
                    b = fs.getAsArrays(),
                    c = fs.getSelectionInfo();
                1 == c.length ? a.push(htmlentities(HFN.strFit(c[0].name, 50))) : (b.folderids && b.folderids.length && a.push(b.folderids.length + " " + __("Folders")), b.fileids && b.fileids.length && a.push(b.fileids.length + " " + __("Files")));
                return a.join(", ")
            }
        })
    },
    columns: [{
        id: "nameenc",
        name: __("Name"),
        sortable: !0,
        build: function(a,
            b, c, d, e, f) {
            f = a.name;
            f = $('<span class="filename"></span>').text(e.opts.sizeMatters ? HFN.strFit(f, e.opts.sizeMatters) : f);
            var g, k;
            k = a.icon;
            var l;
            a.isfolder && f.addClass("folder");
            l = $('<div class="file-wrap"></div>').append(f);
            b.addClass("file").append(g = $('<div class="iconwrap"></div>').append(k = HFN.createIcon(k, HFN.ICONS.LIST).addClass("listicon"))).append(l);
            a.ismine || a.ismount || g.append('<div class="sharedwithme"></div>');
            c.data("n", d);
            a.thumb && (a.category == HFN.CATEGORY.VIDEO ? g.append('<div class="infoicon"><img src="//d1q46pwrruta9x.cloudfront.net/img/cam-icon.png" width="17"></div>') :
                a.category == HFN.CATEGORY.AUDIO && g.append('<div class="infoicon"><img src="//d1q46pwrruta9x.cloudfront.net/img/nota-standart.png" width="15"></div>'));
            d = a.isfolder ? function(b) {
                b.ctrlKey || b.shiftKey || b.metaKey || $.bbq.pushState({
                    page: "encrypted",
                    folder: a.folderid
                }, 2)
            } : function(b) {
                b.ctrlKey || b.shiftKey || b.metaKey || (b.stopPropagation(), console.log("preview file with", a), HFN.previewFile(a))
            };
            f.on("click", d);
            k.on("click", d);
            c.addClass("gridline");
            a.isfolder || l.after(buildEncryptedGearMenu(a, e));
            a.encrypted &&
                b.addClass("thumbready")
        }
    }, {
        id: "size",
        name: i18n.get("Size"),
        sortable: !0,
        build: function(a, b, c, d, e) {
            b.addClass("gridsize");
            a.isfolder ? b.append("-") : b.append(HFN.formatSize(a.size))
        },
        buildHead: function(a) {
            a.addClass("gridsize").text(i18n.get("Size"))
        }
    }, {
        id: "modified",
        name: i18n.get("Modified"),
        sortable: !0,
        build: function(a, b, c, d, e) {
            b.addClass("dtcreated").text(HFN.formatDt(a.modified)).attr("title", i18n.get("Modified") + ": " + HFN.prepDt(a.modified))
        },
        buildHead: function(a) {
            a.addClass("dtcreated").text(i18n.get("Modified"))
        },
        prepSort: function(a) {
            return (new Date(a)).getTime()
        }
    }]
});
Gridlist.templates.trash = $.extend({}, Gridlist.templates.folderlist, {
    name: "folderlist",
    type: "publiclist1",
    defaultSort: {
        sort: "name",
        direction: "asc",
        sortFolder: !1
    },
    filterRows: !1,
    fixSizes: function() {},
    buildBreadcrumb: function() {
        var a = $("<div>").addClass("fbreadcrumb");
        trashFolderBreadcrumb(this.opts.metadata.folderid, function(b) {
            a.append(buildTrashBreadcrumb(b));
            console.log("BUILT GEAR")
        });
        return a
    },
    customHeader: function(a) {
        var b = $('<div class="cheader"></div>'),
            c = $('<div class="headerwrap"></div>').append(b),
            d = $('<div class="controls"></div>');
        HFN.renderTemplate("#cheadtmpltrash").appendTo(c);
        b.append(this.buildBreadcrumb());
        b.append(d);
        a ? a.find(".heading").empty().append(c) : $(this.holderSelector() + " .heading").empty().append(c);
        $('<div class="button linebut smallbut modernbut gridtitlebut darkbut">' + i18n.get("Restore All") + "</div>").on("click", HFN.initRestoreAll.bind(HFN)).appendTo(d);
        $('<div class="button linebut smallbut modernbut gridtitlebut redbut">' + i18n.get("Empty Trash") + "</div>").on("click",
            HFN.initEmptyTrashAll.bind(HFN)).appendTo(d);
        HFN.controlsnew.init({
            type: "trash",
            place: ".headerunder .controlsplc",
            noseltitle: '<span class="artistttl">' + __("Trash") + "</span>"
        })
    },
    columns: [Gridlist.templates.folderlist.columns[0], {
            id: "name",
            name: i18n.get("Name"),
            sortable: !0,
            build: function(a, b, c, d, e, f) {
                f = $('<span class="filename"></span>').text(e.opts.sizeMatters ? HFN.strFit(a.name, e.opts.sizeMatters) : a.name);
                var g;
                a.isfolder && f.addClass("folder");
                b.addClass("file").append(g = $('<div class="iconwrap"></div>').append(b =
                    HFN.createIcon(a.icon, HFN.ICONS.LIST).addClass("listicon"))).append(f);
                c.data("n", d);
                a.thumb && (a.category == HFN.CATEGORY.VIDEO ? g.append('<div class="infoicon"><img src="//d1q46pwrruta9x.cloudfront.net/img/cam-icon.png" width="17"></div>') : a.category == HFN.CATEGORY.AUDIO && g.append('<div class="infoicon"><img src="//d1q46pwrruta9x.cloudfront.net/img/nota-standart.png" width="15"></div>'));
                d = a.isfolder ? function(b) {
                    b.ctrlKey || b.shiftKey || b.metaKey || ($.bbq.pushState({
                        folder: a.folderid,
                        page: "trash"
                    }, 2), $(window).scrollTop(0))
                } :
                    function(b) {
                        b.ctrlKey || b.shiftKey || b.metaKey || (b.stopPropagation(), e.selectById(a.id))
                };
                f.on("click", d);
                b.on("click", d);
                f.after(buildTrashGearMenu(a, e));
                c.addClass("gridline")
            }
        },
        Gridlist.templates.folderlist.columns[2], {
            id: "modified",
            name: i18n.get("Deleted"),
            sortable: !0,
            build: function(a, b, c, d, e) {
                b.addClass("dtcreated").text(HFN.formatDt(a.modified)).attr("title", "Deleted: " + HFN.prepDt(a.modified))
            },
            buildHead: function(a) {
                a.addClass("dtcreated").text(i18n.get("Deleted"))
            },
            prepSort: function(a) {
                return (new Date(a)).getTime()
            }
        }
    ]
});
Gridlist.templates.songs = $.extend({}, Gridlist.templates.folderlist, {
    name: "folderlist11",
    type: "publiclist",
    defaultSort: {
        sort: "name",
        direction: "asc",
        sortFolder: !1
    },
    buildBreadcrumb: function() {},
    filterRows: function(a) {
        var b = $(this.holderSelector()).find("input[name=gridq]").val();
        console.log("val we", b);
        if (b && b.length) {
            for (var c = [], d = 0; d < a.length; ++d) a[d].title && a[d].title.toLowerCase().match(b.toLowerCase()) ? c.push(a[d]) : a[d].name.toLowerCase().match(b.toLowerCase()) && c.push(a[d]);
            return c
        }
        return a
    },
    customHeader: function(a) {
        var b = HFN.renderTemplate("#cheadtmplsongs"),
            c = this;
        b.find("input[name=gridq]").on("keyup", function(a) {
            c.reSetPage(1)
        });
        a ? a.find(".heading").empty().append(b) : $(this.holderSelector() + " .heading").empty().append(b);
        setTimeout(function() {
            HFN.controlsnew.init({
                type: "audio-songs",
                place: ".headerunder .controlsplc",
                extraSize: $(".headerunder .search").outerWidth(),
                getSelectionSummary: function() {
                    var a = [],
                        b = fs.getSelectionInfo();
                    1 == b.length ? a.push(htmlentities(HFN.strFit(b[0].title ?
                        b[0].title : b[0].name, 50))) : a.push(b.length + " " + __("Files"));
                    return a.join(", ")
                }
            })
        }, 20)
    },
    columns: [Gridlist.templates.folderlist.columns[0], {
        id: "name",
        name: __("Name"),
        sortable: !0,
        build: function(a, b, c, d, e, f) {
            f = a.title ? a.title : a.name;
            f = $('<span class="filename"></span>').text(HFN.strFit(f, 60));
            var g;
            a.isfolder && f.addClass("folder");
            b.addClass("file").append(g = $('<div class="iconwrap"></div>').append(b = HFN.createIcon(a.icon, HFN.ICONS.LIST).addClass("listicon"))).append(f);
            c.data("n", d);
            a.thumb && (a.category ==
                HFN.CATEGORY.VIDEO ? g.append('<div class="infoicon"><img src="//d1q46pwrruta9x.cloudfront.net/img/cam-icon.png" width="17"></div>') : a.category == HFN.CATEGORY.AUDIO && g.append('<div class="infoicon"><img src="//d1q46pwrruta9x.cloudfront.net/img/nota-standart.png" width="15"></div>'));
            d = function(b) {
                b.ctrlKey || b.shiftKey || b.metaKey || (HFN.audioPlayer.appendPlaylistItem([a], !0), HFN.audioPlayer.go(HFN.audioPlayer.getFirst()))
            };
            f.on("click", d);
            b.on("click", d);
            f.after(buildPlaylistSongGearMenu(a, e));
            HFN.config.isBusiness() &&
                (c.addClass("meta" + a.id), a.comments && f.after($('<div class="comments"></div>').text(a.comments).on("click", function() {
                $.bbq.getState("comments") == a.id ? $.bbq.removeState("comments") : $.bbq.pushState({
                    comments: a.id
                })
            })));
            c.addClass("gridline")
        },
        prepSort: function(a, b) {
            return b.title ? b.title : b.name
        }
    }, {
        id: "artist",
        name: __("Artist"),
        sortable: !0,
        build: function(a, b, c, d, e, f) {
            b.addClass("artist");
            c = a.artist ? $("<b>" + a.artist + "</b>") : "-";
            if (a.artist) c.on("click", function(b) {
                $.bbq.pushState({
                    page: "audio",
                    autab: "tab-artist",
                    artist: a.artist.trim()
                }, 2)
            });
            b.append(c)
        },
        prepSort: function(a) {
            return a || null
        }
    }, {
        id: "album",
        name: __("Album"),
        sortable: !0,
        build: function(a, b, c, d, e, f) {
            c = a.album ? $("<b>" + HFN.strFit(a.album, 50) + "</b>") : "-";
            if (a.album) c.on("click", function(b) {
                $.bbq.pushState({
                    page: "audio",
                    autab: "tab-album",
                    album: a.album
                }, 2)
            });
            b.append(c).attr("title", a.album).addClass("albumbox album")
        },
        prepSort: function(a) {
            return a || null
        }
    }, {
        id: "genre",
        name: __("Genre"),
        sortable: !0,
        build: function(a, b, c, d, e, f) {
            b.append(a.genre ? HFN.strFit(a.genre,
                20) : "-").attr("title", a.genre)
        },
        prepSort: function(a) {
            return a || null
        }
    }]
});
Gridlist.templates.artists = $.extend({}, Gridlist.templates.folderlist, {
    name: "artists",
    type: "publiclist",
    buildBreadcrumb: function() {},
    customHeader: function(a) {
        var b = HFN.renderTemplate("#cheadtmpltitle"),
            c = this;
        b.find("input[name=gridq]").on("keyup", function(a) {
            c.reSetPage(1)
        });
        a ? a.find(".heading").empty().append(b) : $(this.holderSelector() + " .heading").empty().append(b);
        HFN.controlsnew.init({
            type: "audio",
            place: ".headerunder .controlsplc",
            extraSize: $(".headerunder .search").outerWidth(),
            getSelectionSummary: function() {
                var a =
                    fs.getSelectionInfo().length,
                    b = [];
                b.push(a + " " + __(1 == a ? "Artist" : "Artists"));
                return b.join(", ")
            }
        })
    },
    filterRows: function(a) {
        var b = $(this.holderSelector()).find("input[name=gridq]").val();
        console.log("val we", b);
        return b && b.length ? fs.filter(a, {
            name: b
        }, !0) : a
    },
    columns: [Gridlist.templates.folderlist.columns[0], {
        id: "name",
        name: __("Name"),
        sortable: !0,
        build: function(a, b, c, d, e, f) {
            f = a.name;
            f = $('<span class="filename"></span>').text(HFN.strFit(f, 60));
            var g;
            a.isfolder && f.addClass("folder");
            b.addClass("file artist").append(g =
                $('<div class="iconwrap"></div>').append(b = HFN.createIcon(a.icon, HFN.ICONS.LIST).addClass("listicon"))).append(f);
            c.data("n", d);
            a.thumb && (a.category == HFN.CATEGORY.VIDEO ? g.append('<div class="infoicon"><img src="//d1q46pwrruta9x.cloudfront.net/img/cam-icon.png" width="17"></div>') : a.category == HFN.CATEGORY.AUDIO && g.append('<div class="infoicon"><img src="//d1q46pwrruta9x.cloudfront.net/img/nota-standart.png" width="15"></div>'));
            d = function(b) {
                b.ctrlKey || b.shiftKey || b.metaKey || ($.bbq.pushState({
                    page: "audio",
                    autab: "tab-artist",
                    artist: a.name
                }, 2), b.stopPropagation(), e.selectById(a.id))
            };
            f.on("click", d);
            b.on("click", d);
            f.after(buildArtistGearMenu(a, e));
            c.addClass("gridline")
        }
    }, {
        id: "albums",
        name: __("Albums"),
        sortable: !0,
        build: function(a, b, c, d, e, f) {
            b.append(a.albums.length + " " + __("Albums"))
        },
        prepSort: function(a, b) {
            return b.albums.length
        }
    }, {
        id: "songs",
        name: __("Songs"),
        sortable: !0,
        build: function(a, b, c, d, e, f) {
            b.append(HFN.calcSongs(a) + " " + __("Songs"))
        },
        prepSort: function(a, b) {
            return HFN.calcSongs(b)
        }
    }]
});
Gridlist.templates.artist = $.extend({}, Gridlist.templates.folderlist, {
    name: "artist",
    type: "publiclist",
    buildBreadcrumb: function() {},
    customHeader: function(a) {
        if (this.opts.title) {
            var b = $('<div class="cheader"><div class="fbreadcrumb"><span class="albums"><b>Artists</b></span> <img src="//d1q46pwrruta9x.cloudfront.net/img/bread.png" width="25" height="9" alt=""> <span class="current">' + this.opts.title + "</span></div></div>");
            b.find(".albums").on("click", function(a) {
                $.bbq.pushState({
                        page: "audio",
                        autab: "tab-artists"
                    },
                    2)
            });
            a ? a.find(".heading").empty().append(b) : $(this.holderSelector() + " .heading").empty().append(b)
        }
    },
    defaultSort: {
        sort: "album",
        direction: "asc"
    },
    columns: [{
            id: "album",
            name: __("Album"),
            sortable: !0,
            grouped: !0,
            build: function(a, b, c, d, e, f) {
                c = HFN.createIcon(a.icon, HFN.ICONS.ARTIST_ALBUM);
                d = $('<div class="playbut"><img src="//d1q46pwrruta9x.cloudfront.net/img/play-all.png">' + __("Play the Album") + "</div>");
                f = $('<div class="albwrap"></div>');
                a.thumb && setupThumb(c, a, HFN.ICONS.ARTIST_ALBUM);
                d.on("click", function(b) {
                    b =
                        $(e.itemSelector());
                    for (var c = 0, d = []; c < b.length; ++c) {
                        var f = e.data[$(b[c]).data("n")];
                        a.album == f.album && d.push(f)
                    }
                    HFN.audioPlayer.appendPlaylistItem(d, !0);
                    HFN.audioPlayer.go(HFN.audioPlayer.getFirst())
                });
                b.addClass("grouped albumg").enableSelection().append(f.append(c).append(d)).on("mousedown", function(a) {
                    a.stopPropagation()
                }).on("mouseup", function(a) {
                    a.stopPropagation()
                })
            }
        },
        Gridlist.templates.folderlist.columns[0], {
            id: "name",
            name: __("Name"),
            sortable: !1,
            build: function(a, b, c, d, e, f) {
                f = a.title ? a.title :
                    a.name;
                f = $('<span class="filename"></span>').text(HFN.strFit(f, 60));
                b.addClass("file").append(f);
                c.data("n", d).addClass("gridline");
                f.on("click", function(b) {
                    b.ctrlKey || b.shiftKey || b.metaKey || (HFN.audioPlayer.appendPlaylistItem([a], !0), HFN.audioPlayer.go(HFN.audioPlayer.getFirst()), b.stopPropagation(), e.selectById(a.id))
                });
                f.after(buildGearMenu(a, e))
            }
        }
    ]
});
Gridlist.templates.albums = $.extend({}, Gridlist.templates.folderlist, {
    name: "albums",
    displayitems: 500,
    mode: Gridlist.prototype.MODE_GRID,
    headings: !1,
    paging: 5,
    type: "publiclist",
    afterFill: function(a) {},
    buildBreadcrumb: function() {},
    customHeader: function(a) {
        var b = $('<div class="cheader"><div class="headerunder"><span class="hdrundertitle">Albums</span></div></div>'),
            c = $('<div class="search"></div>').appendTo(b.find(".headerunder")),
            d = this;
        b.append('<div class="clearfix"></div>');
        c.append('<input type="text" placeholder="' +
            __("Search Albums") + '" name="gridq">');
        c.find("input[name=gridq]").on("keyup", function(a) {
            d.reSetPage(1)
        });
        a ? a.find(".heading").empty().append(b) : $(this.holderSelector() + " .heading").empty().append(b)
    },
    filterRows: function(a) {
        var b = $(this.holderSelector()).find("input[name=gridq]").val();
        return b && b.length ? fs.filter(a, {
            name: b
        }, !0) : a
    },
    defaultSort: {
        sort: "name",
        direction: "asc"
    },
    columns: [{
        id: "single",
        name: "block",
        sortable: !0,
        build: function(a, b, c, d, e) {
            var f, g, k = a.songs[0];
            b.addClass("albumbox gridb").append(g =
                $('<div class="iconwrap"></div>').append(f = HFN.createIcon(k.icon, HFN.ICONS.ALBUMGRID).addClass("gridicon_med").addClass("gridicon").addClass("clearfix")).append('<span class="albcount">' + a.songs.length + "</span>")).append($('<div class="albtitle"></div>').append($('<b class="cwrap" title="' + a.artist + '">' + HFN.strFit(a.artist, 300) + "</b>").on("click", function(b) {
                $.bbq.pushState({
                    autab: "tab-artist",
                    artist: a.artist
                })
            })).append('<span class="cwrap" title="' + a.name + '">' + HFN.strFit(a.name, 200) + "</span>"));
            g.on("click", function(b) {
                $.bbq.pushState({
                    autab: "tab-album",
                    album: a.name
                })
            });
            a.isfolder && (void 0).addClass("folder");
            e && setupThumb(f, k, HFN.ICONS.ALBUMGRID);
            k.thumb && d.thumbList.push([f, k]);
            b.data("n", c)
        }
    }]
});
Gridlist.templates.playlists = $.extend({}, Gridlist.templates.folderlist, {
    name: "playlists",
    type: "publiclist",
    buildBreadcrumb: function() {},
    customHeader: function() {},
    defaultSort: {
        sort: "playlist",
        direction: "asc"
    },
    columns: [{
        id: "playlist",
        name: "Playlist",
        sortable: !0,
        grouped: !0,
        build: function(a, b, c, d, e, f) {
            c = HFN.createIcon(a.icon, HFN.ICONS.ARTIST_ALBUM);
            d = $('<div class="playbut"><img src="//d1q46pwrruta9x.cloudfront.net/img/play-all.png">Play Playlist</div>');
            f = $('<div class="albwrap"></div>');
            e = fs.filter(e.data, {
                thumb: !0,
                playlist: a.playlist
            });
            e.length && setupThumb(c, e[0], HFN.ICONS.ARTIST_ALBUM);
            d.on("click", function(b) {
                HFN.getPlaylist(a.playlistObj.id, function(a) {
                    HFN.audioPlayer.loadPlaylist(a);
                    HFN.audioPlayer.go(HFN.audioPlayer.getFirst())
                })
            });
            b.addClass("grouped albumg").enableSelection().append(f.append(c).append(d)).on("mousedown", function(a) {
                a.stopPropagation()
            }).on("mouseup", function(a) {
                a.stopPropagation()
            });
            b.append('<div class="playlist-opts"><div><img src="//d1q46pwrruta9x.cloudfront.net/img/del-playlist.png"></div><div><img src="//d1q46pwrruta9x.cloudfront.net/img/share-playl.png"></div></div>');
            e = b.parent().find(".grp-rest");
            b.find(".edit-playlist").on("click", function(b) {
                $.bbq.pushState({
                    page: "audio",
                    playlist: a.playlistObj.id,
                    autab: "tab-playlist"
                }, 2)
            });
            b.find(".delete-playlist").on("click", function(b) {
                HFN.initDeletePlaylist(a.playlistObj)
            });
            e.append($('<div class="playlist-more"></div>').append(a.playlistObj.items + " songs, ").append($('<a href="javascript:;">View Playlist</a>').on("click", function(b) {
                $.bbq.pushState({
                    page: "audio",
                    playlist: a.playlistObj.id,
                    autab: "tab-playlist"
                }, 2)
            })))
        }
    }, {
        id: "name",
        name: __("Name"),
        sortable: !0,
        build: function(a, b, c, d, e, f) {
            f = a.title ? a.title : a.name;
            f = $('<span class="filename"></span>').text(HFN.strFit(f, 60));
            b.addClass("file").append(f);
            c.data("n", d).addClass("gridline");
            f.on("click", function(b) {
                b.ctrlKey || b.shiftKey || b.metaKey || ($.bbq.pushState({
                    artist: a.name
                }), b.stopPropagation(), e.selectById(a.id))
            });
            f.after(buildGearMenu(a, e))
        }
    }]
});
Gridlist.templates.playlists_list = $.extend({}, Gridlist.templates.folderlist, {
    name: "playlists_list",
    type: "publiclist",
    hasSelection: !1,
    buildBreadcrumb: function() {},
    customHeader: function(a) {
        var b = $('<div class="cheader"><b style="line-height: 32px;">' + __("Playlists") + "</b></div>");
        $('<div class="searchfilter"></div>').appendTo(b);
        var c = $('<div class="controls"></div>');
        b.append(c);
        $('<div class="button linebut smallbut modernbut gridtitlebut darkbut">' + __("Create Playlist") + "</div>").on("click", HFN.initCreatePlaylist.bind(HFN)).appendTo(c);
        a ? a.find(".heading").empty().append(b) : $(this.holderSelector() + " .heading").empty().append(b)
    },
    defaultSort: {
        sort: "playlist",
        direction: "asc"
    },
    columns: [{
        id: "name",
        name: __("Name"),
        sortable: !0,
        build: function(a, b, c, d, e, f) {
            f = $('<span class="filename"></span>').text(HFN.strFit(a.name, 60));
            b.addClass("file").append(f);
            b.addClass("file").append($('<div class="iconwrap"></div>').append(HFN.createIcon(3, HFN.ICONS.LIST))).append(f);
            c.data("n", d).addClass("gridline");
            f.on("click", function(b) {
                b.ctrlKey || b.shiftKey ||
                    b.metaKey || (b.stopPropagation(), $.bbq.pushState({
                        page: "audio",
                        autab: "tab-playlist",
                        playlist: a.id
                    }, 2))
            }).after(buildPlaylistGearMenu(a, e))
        }
    }, {
        id: "items",
        name: __("Songs"),
        sortable: !0,
        build: function(a, b, c, d, e, f) {
            b.text(a.items).addClass("songscnt")
        }
    }, {
        id: "modified",
        name: __("Modified"),
        sortable: !0,
        build: function(a, b, c, d, e, f) {
            b.text(HFN.formatDt(a.modified)).attr("title", HFN.prepDt(a.modified)).addClass("dtcreated")
        }
    }, {
        id: "created",
        name: __("Created"),
        sortable: !0,
        build: function(a, b, c, d, e, f) {
            b.text(HFN.formatDt(a.created)).attr("title",
                HFN.prepDt(a.created)).addClass("dtcreated")
        }
    }]
});
Gridlist.templates.playlist = $.extend({}, Gridlist.templates.folderlist, {
    name: "playlist",
    type: "publiclist",
    defaultSort: {
        sort: "position",
        direction: "asc"
    },
    buildBreadcrumb: function() {},
    customHeader: function(a) {
        var b = this;
        HFN.getPlaylist(this.opts.playlistid, function(c) {
            var d = $('<div class="cheader"><div class="fbreadcrumb"><span class="plists"><b>' + __("Playlists") + '</b></span> <img src="//d1q46pwrruta9x.cloudfront.net/img/bread.png" width="25" height="9" alt=""> <span class="current">' + c.name + "</span></div></div>"),
                e = $('<div class="controls"></div>');
            d.find(".plists").on("click", function(a) {
                $.bbq.pushState({
                    page: "audio",
                    autab: "tab-playlists"
                }, 2)
            });
            d.append(e);
            $('<div class="button linebut smallbut modernbut gridtitlebut darkbut">' + __("Rename Playlist") + "</div>").on("click", HFN.initRenamePlaylist.bind(HFN, c)).appendTo(e);
            $('<div class="button linebut smallbut modernbut gridtitlebut redbut">' + __("Delete Playlist") + "</div>").on("click", HFN.initDeletePlaylist.bind(HFN, c)).appendTo(e);
            a ? a.find(".heading").empty().append(d) :
                $(b.holderSelector() + " .heading").empty().append(d)
        })
    },
    afterFill: function() {
        Gridlist.templates.folderlist.afterFill.apply(this, arguments);
        var a = daGrid;
        $(".grp-cnt tbody").sortable({
            handle: ".draghandler",
            axis: "y",
            stop: function(b, c) {
                HFN.gridSavePlaylist(a)
            },
            helper: function(a, c) {
                c.children().each(function() {
                    $(this).width($(this).width())
                });
                return c
            }
        }).disableSelection()
    },
    columns: [{
        id: "playlist",
        name: __("Playlist"),
        grouped: !0,
        build: function(a, b, c, d, e, f) {
            c = HFN.createIcon(a.icon, HFN.ICONS.ARTIST_ALBUM);
            d = $('<div class="playbut"><img src="//d1q46pwrruta9x.cloudfront.net/img/play-all.png">' + __("Play Playlist") + "</div>");
            f = $('<div class="albwrap"></div>');
            e = fs.filter(e.data, {
                thumb: !0,
                playlist: a.playlist
            });
            e.length && setupThumb(c, e[0], HFN.ICONS.ARTIST_ALBUM);
            d.on("click", function(b) {
                HFN.getPlaylist(a.playlistObj.id, function(a) {
                    console.log("plist obj", a);
                    HFN.audioPlayer.loadPlaylist(a);
                    HFN.audioPlayer.go(HFN.audioPlayer.getFirst())
                })
            });
            b.addClass("grouped albumg").enableSelection().append(f.append(c).append(d)).on("mousedown",
                function(a) {
                    a.stopPropagation()
                }).on("mouseup", function(a) {
                a.stopPropagation()
            });
            b.append('<div class="playlist-opts"><div class="opt pl-del" title="' + __("Delete Playlist") + '" data-toggle="tooltip"><img src="//d1q46pwrruta9x.cloudfront.net/img/del-playlist.png"></div><div class="opt pl-share" title="' + __("Share Playlist") + '" data-toggle="tooltip"><img src="//d1q46pwrruta9x.cloudfront.net/img/share-playl.png"></div></div>');
            b.find(".pl-del").on("click", HFN.initDeletePlaylist.bind(HFN, a.playlistObj)).tooltip();
            b.find(".pl-share").tooltip();
            b.find(".pl-share").on("click", function(b) {
                HFN.getPublink(a.playlistObj, function(b) {
                    b ? HFN.sharePublink(b) : HFN.createPublink(a.playlistObj)
                })
            })
        }
    }, {
        id: "name",
        name: __("Name"),
        sortable: !1,
        build: function(a, b, c, d, e, f) {
            b.append('<span class="draghandler" style="margin-left: -10px; padding: 0 10px 0 7px;"><img src="//d1q46pwrruta9x.cloudfront.net/img/move-songs.png" class="dragimg"></span>').find(".draghandler").on("mousedown", function(a) {
                e.clearSelection()
            });
            f = a.title ? a.title :
                a.name;
            f = $('<span class="filename"></span>').text(HFN.strFit(f, 60));
            b.addClass("file").append(f);
            c.data("n", d).addClass("gridline");
            f.on("click", function(b) {
                b.ctrlKey || b.shiftKey || b.metaKey || (HFN.audioPlayer.init({
                    asMaximized: !0
                }), HFN.audioPlayer.clearPlaylist(), HFN.audioPlayer.appendPlaylistItem([a]), HFN.audioPlayer.go(HFN.audioPlayer.getFirst()), b.stopPropagation(), e.selectById(a.id))
            });
            f.after(buildPlaylistSongGearMenu(a, e))
        }
    }, {
        id: "edit",
        name: __("Edit"),
        sortable: !1,
        build: function(a, b, c, d, e, f) {
            b.addClass("playlistrem").append($('<div class="remsong"><img src="//d1q46pwrruta9x.cloudfront.net/img/pl-del-song.png"></div>').on("click",
                function(b) {
                    $(this).off("click");
                    HFN.apiMethod("collection_unlinkfiles", {
                        collectionid: e.opts.playlistid,
                        fileids: a.fileid
                    }, function(b) {
                        e.removeData(a);
                        HFN.gridSavePlaylist(e);
                        HFN.refreshPlaylistList(e.opts.playlistid)
                    })
                }))
        },
        buildHead: function(a) {
            a.text(__("Edit")).css("width", 40)
        }
    }]
});

function clickGridItem(a) {
    a.isfolder ? HFN.openFolder(a.folderid) : HFN.previewFile(a)
}

function loadThumb() {}

function calcPermissions(a) {
    var b = {
            canread: 0,
            cancreate: 1,
            canmodify: 2,
            candelete: 4,
            canmanage: 8
        },
        c, d = 0;
    a.permissions && (a = a.permissions);
    for (c in b) a[c] && (d += b[c]);
    d & 8 ? d = 15 : 0 < d && (d = 7);
    return d
}

function calcPermissionsSelect(a) {
    return a.find("input:checked").val()
}
Gridlist.templates.sharedshares = {
    name: "list",
    displayitems: 500,
    mode: Gridlist.prototype.MODE_LIST,
    headings: !0,
    paging: 5,
    hasSelection: !1,
    defaultSort: {
        sort: "mail",
        direction: "asc"
    },
    columns: [{
        id: "mail",
        name: i18n.get("From"),
        sortable: !0,
        build: function(a, b, c, d, e) {
            b.addClass("sharemail").append('<img src="//d1q46pwrruta9x.cloudfront.net/img/mail-user.png" width="20" height="20">' + ("frommail" in a ? a.frommail : a.tomail))
        },
        buildHead: function(a, b) {
            a.text("incoming" == b.opts.direction ? i18n.get("From") : i18n.get("To"))
        },
        prepSort: function(a, b) {
            return "frommail" in b ? b.frommail : b.tomail
        }
    }, {
        id: "sharename",
        name: i18n.get("Share"),
        sortable: !0,
        build: function(a, b, c, d, e) {
            c = HFN.createIcon("folder", HFN.ICONS.LIST).addClass("listicon");
            b.append(c);
            b.append('<span class="filename folder">' + htmlentities("foldername" in a ? a.foldername : a.sharename) + "</span>");
            ("tomail" in a || e.opts.canPreview) && b.find("span").click(function(b) {
                $.bbq.pushState({
                    page: "filemanager",
                    folder: a.folderid
                }, 2)
            }).addClass("sharepreview")
        },
        prepSort: function(a,
            b) {
            return "foldername" in b ? b.foldername : b.sharename
        }
    }, {
        id: "permissions",
        name: i18n.get("Permissions"),
        sortable: !1,
        build: function(a, b, c, d, e) {
            b.addClass("permissions").append('<label><input type="radio" value="0" name="perm[' + (a.shareid || a.sharerequestid) + ']">' + i18n.get("View") + '</label><label><input type="radio" value="7" name="perm[' + (a.shareid || a.sharerequestid) + ']">' + i18n.get("Edit") + "</label>");
            HFN.config.isBusiness();
            c = calcPermissions(a);
            b.find("input[value=" + c + "]").prop("checked", !0);
            b.data("perm_saved",
                c).data("perm_select", c);
            b.find("input[type=radio]").on("change", function(a) {
                a = calcPermissionsSelect(b);
                b.data("perm_select", a);
                a != b.data("perm_saved") ? b.siblings(".actions").children(".save").removeClass("disabled") : b.siblings(".actions").children(".save").addClass("disabled")
            });
            if ("frommail" in a || e.opts.isRequest) b.find("input[type=radio]").prop("disabled", "disabled").css("cursor", "default"), b.find("label").css("cursor", "default")
        }
    }, {
        id: "created",
        name: i18n.get("Created"),
        sortable: !0,
        build: function(a,
            b, c, d, e) {
            b.text(HFN.formatDt(a.created)).attr("title", HFN.prepDt(a.created)).addClass("sharecreated")
        },
        prepSort: function(a) {
            return (new Date(a)).getTime()
        }
    }, {
        id: "actions",
        name: i18n.get("Actions"),
        sortable: !0,
        buildHead: function(a, b) {
            a.text(i18n.get("Actions")).attr("nowrap", "nowrap")
        },
        build: function(a, b, c, d, e) {
            b.addClass("actions").css("width", "1%").attr("nowrap", "nowrap");
            "tomail" in a ? e.opts.isRequest ? b.append($("<input>", {
                type: "button",
                "class": "stop"
            }).val(i18n.get("Cancel Share")).on("click", function(b) {
                HFN.initCancelShare(a)
            })) :
                (b.append($("<input>", {
                    type: "button",
                    "class": "save"
                }).val(i18n.get("Save")).on("click", function(c) {
                    if (!$(this).hasClass("disabled")) {
                        var d = calcPermissionsSelect(b.siblings(".permissions"));
                        HFN.apiMethod("changeshare", {
                            shareid: a.shareid,
                            permissions: d
                        }, function(a) {
                            HFN.message("Share permissions are saved.");
                            b.siblings(".permissions").data("perm_saved", d);
                            b.siblings(".permissions").find("input:nth(1)").trigger("change");
                            HFN.cache.expire("api-listshares")
                        }, {
                            cacheTime: !1
                        })
                    }
                }).addClass("disabled").addClass("save")),
                b.append($("<input>", {
                    type: "button",
                    "class": "stop"
                }).val(i18n.get("Stop")).on("click", function(b) {
                    HFN.initRemoveShare(a)
                }))) : "sharerequestid" in a ? b.css("width", "1%").attr("nowrap", "nowrap").append($("<input>", {
                type: "button",
                "class": "save"
            }).val(i18n.get("Accept")).on("click", function(b) {
                HFN.acceptShare(a)
            })).append($("<input>", {
                type: "button",
                "class": "stop"
            }).val(i18n.get("Reject")).on("click", function(b) {
                HFN.rejectShare(a)
            })) : b.append($("<input>", {
                type: "button",
                "class": "stop"
            }).val(i18n.get("Stop")).on("click",
                function(b) {
                    HFN.initRemoveShare(a)
                })).css("width", "100px;").css("text-align", "center")
        }
    }]
};
Gridlist.templates.mobilesharedshares = {
    name: "mobilesharedshares",
    displayitems: 500,
    mode: Gridlist.prototype.MODE_LIST,
    headings: !0,
    paging: 5,
    hasSelection: !1,
    defaultSort: {
        sort: "from",
        direction: "asc"
    },
    columns: [{
        id: "sharename",
        name: i18n.get("Share"),
        sortable: !0,
        build: function(a, b, c, d, e) {
            icon = HFN.createIcon("folder", HFN.ICONS.LIST).addClass("listicon");
            b.append(icon);
            b.append('<span class="filename folder">' + ("foldername" in a ? HFN.strFit(a.foldername, 25) : HFN.strFit(a.sharename, 25)) + "</span>");
            b.append('<span class="shmail">' +
                ("frommail" in a ? a.frommail : a.tomail) + "</span>");
            b.addClass("mobshr");
            ("tomail" in a || e.opts.canPreview) && b.find("span").click(function(b) {
                $.bbq.pushState({
                    page: "filemanager",
                    folder: a.folderid
                }, 2)
            }).addClass("sharepreview")
        },
        prepSort: function(a, b) {
            return "foldername" in b ? b.foldername : b.sharename
        },
        buildHead: function(a, b) {
            b.opts.isRequest ? a.text(i18n.get("Pending Invitations")) : "incoming" == b.opts.direction ? a.text(i18n.get("Shared With Me")) : a.text(i18n.get("My Shares"))
        }
    }, {
        id: "actions",
        name: i18n.get("Actions"),
        sortable: !0,
        buildHead: function(a, b) {
            a.text(i18n.get("Actions")).attr("nowrap", "nowrap")
        },
        build: function(a, b, c, d, e) {
            b.addClass("actions").css("width", "1%").attr("nowrap", "nowrap");
            "tomail" in a ? e.opts.isRequest ? b.append($("<div>").text(__("Cancel Share")).addClass("action stop").prepend('<img src="' + CDNVER + '/img/stop-share.png" width="9" height="9">').on("click", function(b) {
                HFN.initCancelShare(a)
            })) : (HFN.config.isSite() && b.append($("<input>", {
                type: "button",
                "class": "save"
            }).val("Save").on("click", function(c) {
                if (!$(this).hasClass("disabled")) {
                    var d =
                        calcPermissionsSelect(b.siblings(".permissions"));
                    HFN.apiMethod("changeshare", {
                        shareid: a.shareid,
                        permissions: d
                    }, function(a) {
                        HFN.message("Share permissions are saved.");
                        b.siblings(".permissions").data("perm_saved", d);
                        b.siblings(".permissions").find("input:nth(1)").trigger("change")
                    }, {
                        cacheTime: !1
                    })
                }
            }).addClass("disabled").addClass("save")), b.append($("<div>").text(__("Stop")).addClass("action stop").prepend('<img src="' + CDNVER + '/img/stop-share.png" width="9" height="9">').on("click", function(b) {
                HFN.initRemoveShare(a)
            }))) :
                "sharerequestid" in a ? b.css("width", "1%").attr("nowrap", "nowrap").append($("<div>").text(__("Accept")).addClass("action accept").prepend('<img src="' + CDNVER + '/img/stop-share.png" width="9" height="9">').on("click", function(b) {
                    HFN.acceptShare(a)
                })).append($("<div>").text(__("Reject")).addClass("action stop").prepend('<img src="' + CDNVER + '/img/stop-share.png" width="9" height="9">').on("click", function(b) {
                    HFN.rejectShare(a)
                })) : b.append($("<div>").text(__("Stop")).addClass("action stop").prepend('<img src="' +
                    CDNVER + '/img/stop-share.png" width="9" height="9">').on("click", function(b) {
                    HFN.initRemoveShare(a)
                })).css("width", "100px;").css("text-align", "center")
        }
    }]
};
Gridlist.templates.publinks = {
    name: "publinks",
    displayitems: 500,
    mode: Gridlist.prototype.MODE_LIST,
    headings: !0,
    paging: 5,
    hasSelection: !0,
    defaultSort: {
        sort: "created",
        direction: "desc"
    },
    customHeader: function(a) {
        var b = HFN.renderTemplate("#cheadtmplpublinks");
        a ? a.find(".heading").empty().append(b) : $(this.holderSelector() + " .heading").empty().append(b);
        HFN.controlsnew.init({
            type: "publinks",
            place: ".headerunder .controlsplc",
            getSelectionSummary: function() {
                for (var a = fs.getSelectionInfo(), b = a.length, e = 0, f = 0, g =
                    0, k = []; e < a.length; ++e) f += a[e].downloads, g += a[e].traffic;
                k.push(b + " " + __(1 == b ? "Link" : "Links"));
                k.push(__("Downloads") + ": <b>" + f + "</b>");
                k.push(__("Traffic") + ": <b>" + HFN.formatSize(g) + "</b>");
                return k.join(", ")
            }
        })
    },
    columns: [{
        id: "edit",
        name: "",
        sortable: !1,
        build: function(a, b, c, d, e) {
            $("<input>", {
                type: "checkbox"
            }).addClass("editchk").appendTo(b);
            b.addClass("editbox");
            b.css("text-align", "center")
        },
        buildHead: function(a, b) {
            a.addClass("editbox");
            $("<input>", {
                type: "checkbox"
            }).appendTo(a).on("change.grid",
                function(a) {
                    this.checked ? b.selectAll() : b.clearSelection()
                });
            a.css("text-align", "center")
        }
    }, {
        id: "link",
        name: i18n.get("Name"),
        sortable: !0,
        build: function(a, b, c, d, e) {
            a.id = a.linkid;
            e = a.metadata;
            var f = $('<a href="' + a.link + '" target="_blank"><span class="filename">' + htmlentities(e.name) + "</span></a>"),
                g = $('<div class="iconwrap"></div>'),
                k = e.icon,
                l = __(e.icon.charAt(0).toUpperCase() + e.icon.substring(1));
            e.isfolder && 0 == e.folderid && ("c" == e.id.charAt(0) ? (k = "playlist", l = __("Playlist")) : (k = "virtualfolder", l = __("Virtual Folder")));
            a.name = e.name;
            f.prepend(g.append(g = HFN.createIcon(k, HFN.ICONS.LIST_SMALL).addClass("listicon").attr("title", l)));
            b.addClass("file").addClass("linkItem").append(f);
            setupThumb(g, e, HFN.ICONS.LIST);
            if (e.isfolder && (f.addClass("folder"), 0 == e.folderid)) {
                var m = $('<span class="vcont"></span>');
                b.append(m);
                HFN.apiMethod("showpublink", {
                    code: a.code
                }, function(a) {
                    var b = 0,
                        c;
                    for (m.append(", Contents ("); b < a.metadata.contents.length; ++b) c = a.metadata.contents[b], m.append($('<span class="filename">' + htmlentities(c.name) +
                        "</span>").prepend(HFN.createIcon(c.icon, HFN.ICONS.LIST_SMALL).addClass("listicon"))), b < a.metadata.contents.length - 1 && m.append(", ");
                    m.append(")")
                })
            }
            publink = $('<span title="' + i18n.get("View Download Link") + '">').addClass("publink").append('<img src="//d1q46pwrruta9x.cloudfront.net/img/down-link.png" class="act">').append('<img src="//d1q46pwrruta9x.cloudfront.net/img/down-link-active.png" class="ina">').addClass("pubhas").on("click", function(b) {
                HFN.sharePublink(a)
            });
            f.after(publink);
            c.data("n", d);
            c.addClass("gridline")
        }
    }, {
        id: "modified",
        name: i18n.get("Modified"),
        sortable: !0,
        build: function(a, b, c, d, e) {
            b.addClass("dtcreated").text(HFN.formatDt(a.modified)).attr("title", i18n.get("Modified:") + " " + HFN.prepDt(a.modified))
        },
        buildHead: function(a) {
            a.addClass("dtcreated").css("width", "105px").text(i18n.get("Last Modified"))
        },
        prepSort: function(a) {
            return (new Date(a)).getTime()
        }
    }, {
        id: "created",
        name: i18n.get("Created"),
        sortable: !0,
        build: function(a, b, c, d, e) {
            b.addClass("dtcreated").text(HFN.formatDt(a.created)).attr("title",
                i18n.get("Created:") + " " + HFN.prepDt(a.created))
        },
        buildHead: function(a) {
            a.addClass("dtcreated").text(i18n.get("Created"))
        },
        prepSort: function(a) {
            return (new Date(a)).getTime()
        }
    }]
};
Gridlist.templates.mobilepublinks = {
    name: "mobilepublinks",
    displayitems: 500,
    mode: Gridlist.prototype.MODE_LIST,
    headings: !0,
    paging: 5,
    hasSelection: !1,
    defaultSort: {
        sort: "created",
        direction: "desc"
    },
    columns: [{
        id: "link",
        name: i18n.get("Name"),
        sortable: !0,
        build: function(a, b, c, d, e) {
            console.log("list of data", a);
            c = a.metadata;
            d = $('<a href="/#page=publink&code=' + a.code + '" target="_blank"><span class="filename">' + HFN.strFit(c.name, 30) + "</span></a>");
            e = $('<div class="iconwrap"></div>');
            a.name = c.name;
            d.prepend(e.append(icon =
                HFN.createIcon(c.isfolder && 0 == c.folderid ? "virtualfolder" : c.icon, HFN.ICONS.LIST).addClass("listicon")));
            b.addClass("file").addClass("mlnk").append(d).append('<span class="mlnklink">' + HFN.strFit(a.link, 38) + "</span>");
            setupThumb(icon, c, HFN.ICONS.LIST);
            c.isfolder && d.addClass("folder");
            publink = $('<span title="View Download Link">').addClass("publink").append('<img src="//d1q46pwrruta9x.cloudfront.net/img/down-link.png" class="act">').append('<img src="//d1q46pwrruta9x.cloudfront.net/img/down-link-active.png" class="ina">').addClass("pubhas").on("click",
                function(a) {
                    HFN.sharePublink(link)
                });
            d.after(publink)
        }
    }]
};
Gridlist.templates.puplinks = {
    name: "puplinks",
    displayitems: 500,
    mode: Gridlist.prototype.MODE_LIST,
    headings: !0,
    paging: 5,
    hasSelection: !0,
    defaultSort: {
        sort: "created",
        direction: "desc"
    },
    customHeader: function(a) {
        var b = HFN.renderTemplate("#cheadtmplpublinks");
        a ? a.find(".heading").empty().append(b) : $(this.holderSelector() + " .heading").empty().append(b);
        HFN.controlsnew.init({
            type: "publinks",
            place: ".headerunder .controlsplc",
            getSelectionSummary: function() {
                for (var a = fs.getSelectionInfo(), b = a.length, e = 0, f = 0, g =
                    []; e < a.length; ++e) f += a[e].files;
                g.push(b + " " + __(1 == b ? "Link" : "Links"));
                g.push(__("Uploaded Files") + ": <b>" + f + "</b>");
                return g.join(", ")
            }
        })
    },
    columns: [{
        id: "edit",
        name: "",
        sortable: !1,
        build: function(a, b, c, d, e) {
            $("<input>", {
                type: "checkbox"
            }).addClass("editchk").appendTo(b);
            b.addClass("editbox");
            b.css("text-align", "center")
        },
        buildHead: function(a, b) {
            a.addClass("editbox");
            $("<input>", {
                type: "checkbox"
            }).appendTo(a).on("change.grid", function(a) {
                this.checked ? b.selectAll() : b.clearSelection()
            });
            a.css("text-align",
                "center")
        }
    }, {
        id: "folder",
        name: i18n.get("Folder"),
        sortable: !0,
        build: function(a, b, c, d, e) {
            b.addClass("pupname");
            e = a.metadata;
            var f = $('<a href="#page=filemanager&folder=' + a.metadata.folderid + '"><span class="filename folder">' + e.name + "</span></a>");
            a.name = e.name;
            f.prepend(icon = HFN.createIcon(e.icon, HFN.ICONS.LIST).addClass("listicon"));
            b.addClass("file").append(f);
            setupThumb(icon, e, HFN.ICONS.LIST);
            puplink = $('<span title="View Upload Link">').addClass("puplink alone").append('<img src="//d1q46pwrruta9x.cloudfront.net/img/upload-link.png" class="act">').append('<img src="//d1q46pwrruta9x.cloudfront.net/img/upload-link-active.png" class="ina">').addClass("puphas").on("click",
                function(b) {
                    HFN.viewPuplink(a)
                });
            f.after(puplink);
            a.id = a.uploadlinkid;
            c.data("n", d).addClass("gridline")
        }
    }, {
        id: "comment",
        name: i18n.get("Comment"),
        sortable: !0,
        build: function(a, b, c, d, e) {
            b.text(a.comment).addClass("pupcmnt")
        }
    }, {
        id: "modified",
        name: i18n.get("Modified"),
        sortable: !0,
        build: function(a, b, c, d, e) {
            b.addClass("dtcreated").text(HFN.formatDt(a.modified))
        },
        buildHead: function(a) {
            a.addClass("dtcreated").css("width", "105px").text(i18n.get("Last Modified"))
        },
        prepSort: function(a) {
            return (new Date(a)).getTime()
        }
    }, {
        id: "created",
        name: i18n.get("Created"),
        sortable: !0,
        build: function(a, b, c, d, e) {
            b.addClass("dtcreated").text(HFN.formatDt(a.created))
        },
        buildHead: function(a) {
            a.addClass("dtcreated").text(i18n.get("Created"))
        },
        prepSort: function(a) {
            return (new Date(a)).getTime()
        }
    }]
};
Gridlist.templates.mobilepuplinks = {
    name: "puplinks",
    displayitems: 500,
    mode: Gridlist.prototype.MODE_LIST,
    headings: !0,
    paging: 5,
    defaultSort: {
        sort: "created",
        direction: "desc"
    },
    columns: [{
        id: "folder",
        name: i18n.get("Folder"),
        sortable: !0,
        build: function(a, b, c, d, e) {
            b.addClass("pupname");
            c = a.metadata;
            d = $('<a href="#page=filemanager&folder=' + a.metadata.folderid + '"><span class="filename folder">' + HFN.strFit(c.name, 30) + "</span></a>");
            e = $('<div class="iconwrap"></div>');
            a.name = c.name;
            d.prepend(e.append(icon = HFN.createIcon(c.icon,
                HFN.ICONS.LIST).addClass("listicon")));
            b.addClass("file").addClass("mlnk").append(d).append('<span class="mlnklink">' + HFN.strFit(a.link, 20) + "</span>");
            setupThumb(icon, c, HFN.ICONS.LIST)
        }
    }, {
        id: "actions",
        name: i18n.get("Actions"),
        sortable: !0,
        build: function(a, b, c, d, e) {
            puplink = $('<span title="' + i18n.get("View Upload Link") + '">').addClass("puplink alone").append('<img src="//d1q46pwrruta9x.cloudfront.net/img/upload-link.png" class="act">').append('<img src="//d1q46pwrruta9x.cloudfront.net/img/upload-link-active.png" class="ina">').addClass("puphas").on("click",
                function(b) {
                    HFN.viewPuplink(a)
                });
            b.append(puplink)
        }
    }]
};
Gridlist.templates.foldergrid = $.extend({}, Gridlist.templates.folderlist, {
    name: "foldergrid",
    displayitems: 500,
    mode: Gridlist.prototype.MODE_GRID,
    headings: !1,
    paging: 5,
    type: "publiclist",
    afterFill: function(a, b) {
        Gridlist.templates.folderlist.afterFill.apply(this, arguments)
    },
    customSorts: {
        modified: function(a) {
            return (new Date(a)).getTime()
        },
        created: function(a) {
            return (new Date(a)).getTime()
        }
    },
    columns: [{
        id: "single",
        name: "block",
        sortable: !0,
        build: function(a, b, c, d, e) {
            var f, g;
            b.addClass("gridbox gridb").append(g =
                $('<div class="iconwrap"></div>').append(e = HFN.createIcon(HFN.metaIcon(a), HFN.ICONS.GRID).addClass("gridicon_med").addClass("gridicon").addClass("clearfix"))).append($('<div class="title"></div>').append(f = $("<span></span>").text(HFN.strFit(HFN.metaName(a), 25)))).append($('<input type="checkbox" class="editchk">')).append(b.append(buildGearMenu(a, d)));
            a.isfolder && f.addClass("folder");
            a.isshared ? g.append('<div class="shared"></div>') : a.ismine || g.append('<div class="sharedwithme"></div>');
            setupThumb(e,
                a, HFN.ICONS.GRID);
            a.thumb && (d.thumbList.push([e, a]), a.category == HFN.CATEGORY.VIDEO ? g.append('<div class="infoicon"><img src="//d1q46pwrruta9x.cloudfront.net/img/cam-big.png" width="19" height="11"></div>') : a.category == HFN.CATEGORY.AUDIO && g.append('<div class="infoicon"><img src="//d1q46pwrruta9x.cloudfront.net/img/nota-big.png" width="25" height="25"></div>'));
            b.data("n", c);
            clickA = a.isfolder ? function(b) {
                b.ctrlKey || b.shiftKey || b.metaKey || HFN.openFolder(a.folderid, "foldergrid")
            } : function(b) {
                b.ctrlKey ||
                    b.shiftKey || b.metaKey || (b.stopPropagation(), HFN.previewFile(a))
            };
            e.on("click", clickA);
            f.on("click", clickA)
        }
    }]
});
Gridlist.templates.albumgrid = $.extend({}, Gridlist.templates.foldergrid, {
    name: "albumgrid",
    columns: [{
        id: "single",
        name: "block",
        sortable: !0,
        build: function(a, b, c, d) {
            var e, f, g;
            b.addClass("gridbox").addClass("albgridbox").append(g = $('<div class="iconwrap"></div>').append(e = HFN.createIcon(a.icon, HFN.ICONS.GRID_ALBUM).addClass("gridicon_med").addClass("gridicon").addClass("clearfix"))).append($('<div class="title"></div>').append(f = $("<span></span>").text(HFN.strFit(a.name, 28))));
            a.isfolder && f.addClass("folder");
            a.thumb && (d.thumbList.push([e, a]), a.category == HFN.CATEGORY.VIDEO && g.append('<div class="infoicon"><img src="//d1q46pwrruta9x.cloudfront.net/img/cam-big.png" width="19" height="11"></div>'));
            b.data("n", c);
            clickA = a.isfolder ? function(b) {
                b.ctrlKey || b.shiftKey || b.metaKey || HFN.openFolder(a.folderid, "albumgrid")
            } : function(b) {
                b.ctrlKey || b.shiftKey || b.metaKey || (b.stopPropagation(), HFN.previewFile(a))
            };
            e.on("click", clickA);
            f.on("click", clickA)
        }
    }]
});
Gridlist.templates.publicfolderlist = $.extend({}, Gridlist.templates.folderlist, {
    name: "publicfolderlist",
    type: "publicfolders",
    hasSelection: !0,
    buildBreadcrumb: function() {
        var a = $("<div>").addClass("fbreadcrumb");
        console.log("BREADCRUMB", this.opts.metadata);
        if ("parentfolderid" in this.opts.metadata) {
            var b = this;
            publicFolderBreadcrumb(this.opts.code, this.opts.metadata.folderid, function(c) {
                c = buildBreadcrumb(c, b.opts.code);
                c.prepend(" &nbsp;").prepend(HFN.createIcon(HFN.ICO.FOLDER, HFN.ICONS.LIST));
                a.append(c)
            })
        } else "name" in
            this.opts.metadata ? a.append(HFN.createIcon(HFN.ICO.FOLDER, HFN.ICONS.LIST)).append("&nbsp; " + htmlentities(this.opts.metadata.name)) : this.opts.title && a.append(this.opts.title);
        a.find("span").last().append(buildPublicGearMenu(this.opts.metadata, this));
        return a
    },
    columns: [Gridlist.templates.folderlist.columns[0], {
            id: "name",
            name: __("Filename"),
            sortable: !0,
            build: function(a, b, c, d, e) {
                a.name = htmlentities(a.name);
                var f = $('<span class="filename">' + (e.opts.sizeMatters ? HFN.strFit(htmlentities(a.name), e.opts.sizeMatters) :
                        a.name) + "</span>"),
                    g;
                a.isfolder && f.addClass("folder");
                b.addClass("file").append(g = $('<div class="iconwrap"></div>').append(b = HFN.createIcon(a.icon, HFN.ICONS.LIST_SMALL).addClass("listicon"))).append(f);
                c.data("n", d).addClass("gridline");
                a.thumb && (a.category == HFN.CATEGORY.VIDEO ? g.append('<div class="infoicon"><img src="//d1q46pwrruta9x.cloudfront.net/img/cam-icon.png" width="17"></div>') : a.category == HFN.CATEGORY.AUDIO && g.append('<div class="infoicon"><img src="//d1q46pwrruta9x.cloudfront.net/img/nota-standart.png" width="15"></div>'),
                    setupThumb(b, a, HFN.ICONS.LIST, e.opts.code));
                c = a.isfolder ? function(b) {
                    b.ctrlKey || b.shiftKey || b.metaKey || HFN.openFolder(a.folderid)
                } : function(b) {
                    b.ctrlKey || b.shiftKey || b.metaKey || (b.stopPropagation(), HFN.previewFile(a, e.opts.code))
                };
                f.on("click", c);
                b.on("click", c);
                f.after(buildPublicGearMenu(a, e))
            }
        },
        Gridlist.templates.folderlist.columns[2], Gridlist.templates.folderlist.columns[3]
    ]
});
Gridlist.templates.publicfoldergrid = $.extend({}, Gridlist.templates.publicfolderlist, {
    name: "publicfoldergrid",
    type: "publicfolders",
    mode: Gridlist.prototype.MODE_GRID,
    headings: !1,
    hasSelection: !0,
    buildBreadcrumb: function() {
        var a = $("<div>").addClass("fbreadcrumb");
        console.log("BREADCRUMB", this.opts.metadata);
        if ("parentfolderid" in this.opts.metadata) {
            var b = this;
            publicFolderBreadcrumb(this.opts.code, this.opts.metadata.folderid, function(c) {
                c = buildBreadcrumb(c, b.opts.code);
                c.prepend(" &nbsp;").prepend(HFN.createIcon("folder",
                    HFN.ICONS.LIST));
                a.append(c)
            })
        } else "name" in this.opts.metadata ? a.append(HFN.createIcon("folder", HFN.ICONS.LIST)).append("&nbsp; " + this.opts.metadata.name) : this.opts.title && a.append(this.opts.title);
        spop = a;
        a.find("span").last().append(buildPublicGearMenu(this.opts.metadata, this));
        return a
    },
    columns: [{
        id: "single",
        name: "block",
        sortable: !0,
        build: function(a, b, c, d) {
            var e, f, g;
            b.addClass("gridbox gridb").append(g = $('<div class="iconwrap"></div>').append(e = HFN.createIcon(a.icon, HFN.ICONS.GRID).addClass("gridicon_med").addClass("gridicon").addClass("clearfix"))).append($('<div class="title"></div>').append(f =
                $("<span></span>").text(HFN.strFit(a.name, 30)))).append($('<input type="checkbox" class="editchk">')).append(b.append(buildPublicGearMenu(a, d)));
            a.isfolder && f.addClass("folder");
            a.thumb && (d.thumbList.push([e, a]), a.category == HFN.CATEGORY.VIDEO && g.append('<div class="infoicon"><img src="//d1q46pwrruta9x.cloudfront.net/img/cam-big.png" width="19" height="11"></div>'), setupThumb(e, a, HFN.ICONS.GRID, d.opts.code));
            b.data("n", c);
            clickA = a.isfolder ? function(b) {
                b.ctrlKey || b.shiftKey || b.metaKey || HFN.openFolder(a.folderid,
                    "publicfoldergrid")
            } : function(b) {
                b.ctrlKey || b.shiftKey || b.metaKey || (b.stopPropagation(), HFN.previewFile(a, d.opts.code))
            };
            e.on("click", clickA);
            f.on("click", clickA)
        }
    }]
});
Gridlist.templates.mobilefolderlist = {
    name: "mobilefolderlist",
    displayitems: 500,
    mode: Gridlist.prototype.MODE_GRID,
    templatetype: "mobile",
    headings: !1,
    paging: 5,
    hasSelection: !1,
    defaultSort: {
        sort: "name",
        direction: "asc",
        sortFolder: !0
    },
    type: "publiclist",
    beforeFill: Gridlist.templates.folderlist.beforeFill,
    afterFill: function() {
        Gridlist.templates.folderlist.afterFill.apply(this, arguments);
        (HFN.audioGallery && HFN.audioGallery.list ? HFN.audioGallery.list : 0) > (HFN.videoGallery && HFN.videoGallery.list ? HFN.videoGallery.list :
            0) ? ($(".mobbeforefooter .aud").show(), $(".mobbeforefooter .vid").hide()) : ($(".mobbeforefooter .vid").show(), $(".mobbeforefooter .aud").hide())
    },
    resetFill: Gridlist.templates.folderlist.resetFill,
    columns: [{
        id: "name",
        name: "Filename",
        sortable: !0,
        buildHead: function(a) {
            a.append('<div style="float: right;">' + i18n.get("Actions") + "</div>")
        },
        build: function(a, b, c, d, e) {
            b.addClass("mobbox");
            var f = $('<div class="mobinfo"></div>').appendTo(b);
            e = $('<span class="itemName"></span>').text(HFN.strFit(a.name, 25));
            var g,
                k;
            a.isfolder && e.addClass("folder");
            f.append(g = $('<div class="iconwrap"></div>').append(k = HFN.createIcon(a.icon, HFN.ICONS.LIST).addClass("listicon"))).append(e);
            a.isshared ? g.append('<div class="shared"></div>') : a.ismine || g.append('<div class="sharedwithme"></div>');
            f.data("n", c);
            setupThumb(k, a, HFN.ICONS.LIST, d.opts.code);
            b.on("click", a.isfolder ? function(b) {
                b.stopPropagation();
                b.preventDefault();
                HFN.openFolder(a.folderid)
            } : function(b) {
                b.stopPropagation();
                b.preventDefault();
                HFN.previewMobileFile(a, d.opts.code ||
                    !1)
            });
            b = $('<div class="boxact"></div>').appendTo(b);
            e.after($('<div class="mobactions"></div>').on("click", function(a) {
                a.stopPropagation();
                a.preventDefault();
                $(this).parent().siblings(".boxact").toggle().toggleClass("bopen");
                $(this).parent().parent().siblings().find(".bopen").hide().removeClass("bopen");
                $(this).parent().parent().siblings().find(".actioncall").hide().empty();
                getProperScrollTo($(this));
                $(this).parents(".mobbox").toggleClass("mobboxopen")
            }));
            b.on("click", function(a) {
                a.stopPropagation()
            }).hide();
            buildMobileOpts(a, b, d)
        }
    }],
    buildBreadcrumb: function() {},
    customHeader: function(a) {
        var b = $('<div class="cheader"></div>'),
            c = "";
        this.opts.metadata.isfolder && this.opts.metadata.ismine && "mobilefolderlist" == this.opts.template && (c = '<div style="float:right;margin-right:10px;"> <a href="#" class="newfolder">New folder</a>  </div> <div class="clearfix"></div> ');
        this.opts.metadata && this.opts.metadata.folderid ? b.append($('<div class="mobgridheader"></div>').append("filemanager" == $.bbq.getState("page") ? '<img class="return_parent" style="margin-top:-5px;" width="14" onclick="history.go(-1);" src="//d1q46pwrruta9x.cloudfront.net/img/back-mob-push.png">' :
            "").append(HFN.createIcon("folder", HFN.ICONS.LIST).addClass("ficon")).append("<b>" + htmlentities(this.opts.metadata.name) + "</b>").append(c)) : this.opts.metadata && this.opts.metadata.filter && b.append($('<div class="mobgridheader"></div>').append("<b>" + i18n.get("My pCloud") + "</b>").append('<img src="//d1q46pwrruta9x.cloudfront.net/img/bread.png">').append(HFN.left.getFilterName(this.opts.metadata.filter, this.opts.metadata.q)));
        b.append('<div class="mobgridheading"><div style="float: left;">Items:</div><div style="float: right; margin-right: 15px;">Action</div></div><div class="clearfix"></div>');
        b.find(".newfolder").click(function(a) {
            a.preventDefault();
            cfolder = $.bbq.getState();
            HFN.newFolder(cfolder.folder || 0)
        });
        a ? a.find(".heading").empty().append(b) : $(this.holderSelector() + " .heading").empty().append(b)
    },
    prepSelections: function() {
        this.selectAll = function() {
            for (var a = 0; a < this.data.length; ++a) FileSelection.add(this.data[a])
        }
    }
};

function buildMobileOpts(a, b, c) {
    var d = [],
        e;
    "publicfolders" == c.template.type ? (HFN.config.auth ? d.push('<span data-act="copytocloud"><img src="//d1q46pwrruta9x.cloudfront.net/img/drop-down-copy-over.png" class="ina1">' + i18n.get("Copy to my pCloud") + "</span>") : d.push('<span data-act="login"><img src="//d1q46pwrruta9x.cloudfront.net/img/drop-down-copy-over.png" class="ina1">' + i18n.get("Copy to my pCloud") + "</span>"), a.isfolder || $.browser.iphone || d.push('<span data-act="pubdownload"><img src="//d1q46pwrruta9x.cloudfront.net/img/drop-down-download-over.png" class="ina1" style="margin-top: -2px;">' +
        i18n.get("Download File") + "</span>")) : (d.push('<div style="padding: 5px; text-align: center;">'), d.push('<span class="mobile_btn_delete" data-act="delete"><img src="//d1q46pwrruta9x.cloudfront.net/img/delete-button.png" width="24" class="ina1">' + i18n.get("Delete") + "</span>"), a.ismine && d.push('<span class="mobile_btn_share" data-act="share"><img src="//d1q46pwrruta9x.cloudfront.net/img/share-button.png" width="24" class="ina1">' + i18n.get("Share") + "</span>"), a.isfolder || d.push('<span class="mobile_btn_share" data-act="download"> <img src="//d1q46pwrruta9x.cloudfront.net/img/download_button.png" alt="" />' +
        i18n.get("Download") + "</span>"), d.push('<div style="clear:both"></div>'), d.push("</div>"));
    b.append(d.join(" "));
    b.parent().append(e = $('<div class="actioncall">' + i18n.get("Test") + "</div>").on("click", function(a) {
        a.stopPropagation()
    }).on("mousedown", function(a) {}).hide());
    b.find("span").each(function(d, g) {
        $(g).on("click", function(d) {
            d.stopPropagation();
            d.preventDefault();
            switch ($(g).data("act")) {
                case "login":
                    HFN.setAfterLogin();
                    $.bbq.pushState({
                        page: "login"
                    }, 2);
                    break;
                case "downloadzip":
                    HFN.initDownloadArchive(a);
                case "download":
                    console.log("fa");
                    $.browser.msie && -1 == versionCompare($.browser.version, "10.0") ? HFN.downloadFile(a.fileid) : HFN.apiMethod("getfilelink", {
                        fileid: a.fileid,
                        forcedownload: 1
                    }, function(a) {
                        console.log("sending to: ", HFN.prepUrl(a));
                        window.open(HFN.prepUrl(a))
                    }, {
                        async: !1
                    });
                    break;
                case "pubdownload":
                    HFN.apiMethod("getpublinkdownload", {
                        fileid: a.fileid,
                        forcedownload: 1,
                        code: c.opts.code
                    }, function(a) {
                        window.open(HFN.prepUrl(a))
                    }, {
                        async: !1
                    });
                    break;
                case "share3":
                    HFN.getPublink(a, function(b) {
                        Popup.close();
                        b ? HFN.sharePublink(b) : HFN.createPublink(a)
                    });
                    break;
                case "copytocloud":
                    console.log("copytocloud", c.opts.code);
                    fs.reset();
                    fs.add(a);
                    HFN.copyToCloudDirect({
                        code: c.opts.code,
                        onDone: function() {
                            HFN.message("Items copied to your cloud.")
                        }
                    });
                    break;
                case "share2":
                    return HFN.shareChoice(a), !1;
                case "share":
                    return console.log("share"), HFN.megaLoad.show(), HFN.getPublink(a, function(b) {
                        if (b) HFN.megaLoad.hide(), window.open(b.link);
                        else {
                            var c;
                            a.isfolder ? (b = "getfolderpublink", c = {
                                folderid: a.folderid
                            }) : (b = "getfilepublink",
                                c = {
                                    fileid: a.fileid
                                });
                            HFN.apiMethod(b, c, function(a) {
                                HFN.megaLoad.hide();
                                window.open(a.link)
                            }, {
                                async: !1,
                                errorCallback: function(a) {
                                    HFN.message(a.error, "error");
                                    HFN.megaLoad.hide()
                                }
                            })
                        }
                    }, {
                        async: !1
                    }), !1;
                case "delete":
                    e.empty().append($('<div class="button modernbut linebut shortie redbut">' + i18n.get("Delete") + "</div>").on("click", function(b) {
                        b.preventDefault();
                        b.stopPropagation();
                        HFN.deleteSelection(a, function() {
                            HFN.message("Deleted.");
                            e.empty().hide()
                        })
                    })).append($('<div class="button modernbut linebut shortie darkbut">' +
                        i18n.get("Cancel") + "</div>").on("click", function(a) {
                        a.preventDefault();
                        a.stopPropagation();
                        e.empty().hide()
                    })).show(), b.hide(), console.log("deleteing")
            }
        })
    })
}
Gridlist.templates.publicmobilefolderlist = $.extend({}, Gridlist.templates.mobilefolderlist, {
    name: "publicmobilefolderlist",
    type: "publicfolders"
});
Gridlist.templates.snbackups = {
    name: "list",
    displayitems: 500,
    mode: Gridlist.prototype.MODE_LIST,
    headings: !0,
    paging: 500,
    hasSelection: !1,
    defaultSort: {
        sort: "sn",
        direction: "asc"
    },
    columns: [{
        id: "source",
        name: i18n.get("Network"),
        sortable: !0,
        build: function(a, b, c, d, e) {
            icon = HFN.createIcon(a.sourceid, HFN.ICONS.LIST).addClass("listicon");
            b.append(icon.css({
                width: 18,
                height: 18,
                marginTop: -2
            }));
            b.append('<span class="filename folder">' + a.source + "</span>")
        }
    }, {
        id: "backup_folder_name",
        name: i18n.get("Folder"),
        sortable: !1,
        build: function(a, b, c, d, e) {
            -1 != ["ig"].indexOf(a.sourceid) ? b.text("-") : a.backup_metadata ? (icon = HFN.createIcon("folder", HFN.ICONS.LIST).addClass("listicon"), b.append(icon), b.append('<span class="filename folder">' + a.backup_metadata.name + "</span>"), b.find("span").on("click", function(b) {
                $.bbq.pushState({
                    page: "filemanager",
                    folder: a.backup_metadata.folderid
                }, 2)
            }).addClass("sharepreview")) : b.append("-")
        }
    }, {
        id: "is_running",
        name: i18n.get("Status"),
        sortable: !1,
        build: function(a, b, c, d, e) {
            -1 != ["ig"].indexOf(a.sourceid) ?
                b.text("-") : (c = $("<span></span>"), a.is_stopped ? null == a.created ? c.append("-") : c.append(i18n.get("Stopped")) : a.is_aborted ? (c.append(i18n.get("Aborted")), -1 != [200, 202, 204].indexOf(a.exit_code) ? c.tooltip({
                        title: a.source + " " + i18n.get("association is missing. Please restart!")
                    }) : -1 != [201, 203, 205].indexOf(a.exit_code) ? c.tooltip({
                        title: a.source + " " + i18n.get("association has expired. Please restart!")
                    }) : -1 != [106].indexOf(a.exit_code) && c.tooltip({
                        title: __("There is not enough free space in your account.")
                    })) :
                    a.is_running ? c.append(i18n.get("Running")) : null != a.is_stopped && null != a.is_aborted ? a.finished ? c.append(i18n.get("Finished")) : c.append(i18n.get("Waiting")) : c.append("-"), b.append(c))
        }
    }, {
        id: "finished",
        name: i18n.get("Last"),
        sortable: !0,
        build: function(a, b, c, d, e) {
            -1 != ["ig"].indexOf(a.sourceid) ? b.text("-") : a.finished ? b.append(HFN.formatDt(a.finished)).attr("title", HFN.prepDt(a.finished)) : b.append("-")
        },
        prepSort: function(a) {
            return (new Date(a)).getTime()
        }
    }, {
        id: "next_execution",
        name: i18n.get("Next"),
        sortable: !0,
        build: function(a, b, c, d, e) {
            -1 != ["ig"].indexOf(a.sourceid) ? b.text("-") : a.next_execution ? b.append(HFN.formatDt(a.next_execution)).attr("title", HFN.prepDt(a.next_execution)) : b.append("-")
        },
        prepSort: function(a) {
            return (new Date(a)).getTime()
        }
    }, {
        id: "albums",
        name: i18n.get("Folders"),
        sortable: !1,
        build: function(a, b, c, d, e) {
            -1 != ["ig"].indexOf(a.sourceid) ? b.text("-") : a.mode && b.append(a.backuped_albums + " / " + a.total_albums)
        }
    }, {
        id: "acts",
        name: i18n.get("Actions"),
        sortable: !1,
        build: function(a, b, c, d, e) {
            b.addClass("backupacts");
            null == a.mode ? b.append("Soon") : -1 != ["ig"].indexOf(a.sourceid) ? b.css("text-align", "center").text(__("Temporary unavailable")) : (b.css({
                    width: "1%",
                    "white-space": "nowrap",
                    "padding-right": "10px"
                }), a.is_stopped ? b.append($("<input>", {
                    type: "button",
                    "class": "save"
                }).val(i18n.get("Start")).on("click", function() {
                    a.srcobj.getTokenCallback(function(b, c) {
                        snimp.initStartBackup(a.sourceid, a.source)
                    }, !0)
                })) : a.is_aborted ? b.append($("<input>", {
                    type: "button",
                    "class": "save"
                }).val(i18n.get("Restart")).on("click", function() {
                    a.srcobj.getTokenCallback(function(b,
                        c) {
                        snimp.initRestartBackup(a.sourceid, a.source)
                    })
                })) : a.is_stopped || a.is_aborted || b.append($("<input>", {
                    type: "button",
                    "class": "stop"
                }).val(i18n.get("Stop")).on("click", function() {
                    snimp.initStopBackup(a.sourceid, a.source)
                })), !a.is_stopped && !a.is_running && (new Date(a.finished)).getTime() < (new Date).getTime() - 18E5 ? b.append($('<input type="button" class="save">').val(i18n.get("Run Now")).on("click", function() {
                    a.srcobj.getTokenCallback(function(b, c) {
                        snimp.initRestartBackup(a.sourceid, a.source)
                    })
                })) : a.is_stopped ?
                b.append($('<input type="button" class="save disabled"></div>').val(__("Run Now"))) : a.is_aborted || a.is_running || b.append($('<input type="button" class="save disabled">').val(i18n.get("Run Now")).on("click", function() {
                    HFN.message("Can't run backup so soon after the previous one. Please, try again later.", "error")
                })))
        }
    }]
};
Gridlist.templates.history = {
    name: "history",
    displayitems: 500,
    mode: Gridlist.prototype.MODE_LIST,
    headings: !0,
    paging: 500,
    hasSelection: !1,
    defaultSort: {
        sort: "time",
        direction: "desc"
    },
    columns: [{
        id: "event",
        name: i18n.get("Event"),
        sortable: !0,
        build: function(a, b, c, d, e) {
            c = {
                modifyuserinfo: i18n.get("Account change"),
                createfile: i18n.get("File added"),
                deletefile: i18n.get("File deleted"),
                modifyfile: i18n.get("File modified"),
                createfolder: i18n.get("Folder created"),
                deletefolder: i18n.get("Folder deleted"),
                modifyfolder: i18n.get("Folder modified"),
                requestshareout: i18n.get("Share request sent"),
                cancelledshareout: i18n.get("Cancelled share request"),
                acceptedshareout: i18n.get("Your share request was accepted"),
                declinedshareout: i18n.get("Your share request was declined"),
                removedshareout: i18n.get("Your share request was removed"),
                modifiedsharein: i18n.get("Share permissions were modified"),
                requestsharein: i18n.get("Received share request"),
                cancelledsharein: i18n.get("Cancelled share request"),
                acceptedsharein: i18n.get("You accepted share request"),
                declinedsharein: i18n.get("You declined share request"),
                removedsharein: i18n.get("Share with you was removed"),
                modifiedshareout: i18n.get("Share permissions were modified"),
                establishbsharein: __("Received Business Share"),
                establishbshareout: __("Created Business Share"),
                modifybsharein: __("Business Share Changed"),
                modifybshareout: __("Business Share Changed"),
                removebshareout: __("Stopped Business Share"),
                removebsharein: __("Stopped Business Share")
            };
            b.append(c[a.event] || a.event).css({
                "vertical-align": "top",
                "line-height": "40px"
            })
        }
    }, {
        id: "data",
        name: i18n.get("Data"),
        sortable: !1,
        build: function(a, b, c, d, e) {
            b.addClass("histdata");
            if (a.metadata) b.addClass("file"), c = $('<span class="filename"></span>').text(HFN.strFit(a.metadata.name, 80)), a.metadata.isfolder && c.addClass("folder sharepreview"), b.addClass("file").append($('<div class="iconwrap"></div>').append(d = HFN.createIcon(a.metadata.icon, HFN.ICONS.LIST).addClass("listicon"))).append(c), HFN.data.itemExists(a.metadata.id) && setupThumb(d, a.metadata, HFN.ICONS.LIST), HFN.data.itemExists(a.metadata.id) && HFN.data.itemExists("d" +
                a.metadata.parentfolderid) ? e = function(b) {
                b.stopPropagation();
                $.bbq.pushState({
                    page: "filemanager",
                    folder: a.metadata.parentfolderid,
                    file: a.metadata.id
                })
            } : (e = function() {}, b.addClass("nolnk")), c.on("click", e), d.on("click", e);
            else if ("modifyuserinfo" == a.event) b.append(i18n.get("Quota: ") + HFN.formatSize(a.userinfo.quota) + "<br>").append(i18n.get("Premium: ") + (a.userinfo.premium ? "Yes" : "No") + "<br>").append(i18n.get("Language: ") + '<span class="langg">' + a.userinfo.language + "</span><br>").css({
                "line-height": "21px",
                padding: "6px 6px 6px 8px"
            }), HFN.apiMethod("supportedlanguages", {}, function(c) {
                b.find(".langg").empty().text(c.languages[a.userinfo.language])
            });
            else if (a.share) {
                b.addClass("file");
                var f = a.share;
                f.folderid && HFN.data.itemExists("d" + f.folderid) ? (f.sharename = HFN.data.fflookup["d" + f.folderid].name, d = HFN.createIcon(HFN.ICO.FOLDER, HFN.ICONS.LIST).addClass("listicon"), b.append($('<div class="iconwrap"></div>').append(d))) : f.sharename ? (d = HFN.createIcon(HFN.ICO.FOLDER, HFN.ICONS.LIST).addClass("listicon"), b.append($('<div class="iconwrap"></div>').append(d))) :
                    f.foldername || f.sharename || (f.sharename = "No Information", b.addClass("nodata"));
                b.append('<span class="filename folder">' + htmlentities("foldername" in f ? f.foldername : f.sharename) + "</span>");
                HFN.data.itemExists("d" + f.folderid) ? b.find("span").click(function(a) {
                    $.bbq.pushState({
                        page: "filemanager",
                        folder: f.folderid
                    }, 2)
                }).addClass("sharepreview") : b.addClass("nolnk")
            }
        }
    }, {
        id: "time",
        name: i18n.get("Time"),
        sortable: !0,
        build: function(a, b, c, d, e) {
            b.append((new Date(a.time)).toLocaleString()).attr("title", HFN.prepDt(a.time)).css({
                width: 100,
                "white-space": "nowrap",
                "padding-right": "6px"
            })
        },
        prepSort: function(a, b) {
            return b.diffid
        }
    }]
};
Gridlist.templates.revisions = $.extend({}, Gridlist.templates.folderlist, {
    name: "revisions",
    headings: !0,
    paging: 20,
    hasSelection: !0,
    buildBreadcrumb: function() {},
    customHeader: function() {},
    defaultSort: {
        sort: "revisionid",
        direction: "asc"
    },
    columns: [Gridlist.templates.folderlist.columns[0], {
        id: "name",
        name: i18n.get("File"),
        sortable: !0,
        build: function(a, b, c, d, e) {
            var f = $('<span class="filename"></span>').text(e.opts.sizeMatters ? HFN.strFit(a.name, e.opts.sizeMatters) : a.name),
                g, k;
            a.isfolder && f.addClass("folder");
            b.addClass("file").append(b =
                $('<div class="iconwrap"></div>').append(g = HFN.createIcon(a.icon, HFN.ICONS.LIST).addClass("listicon"))).append(f);
            k = function(b) {
                b.ctrlKey || b.shiftKey || b.metaKey || (b.stopPropagation(), Popup.close(), HFN.previewFile(a))
            };
            f.on("click", k);
            g.on("click", k);
            setupThumb(g, a, HFN.ICONS.LIST);
            a.thumb && a.category == HFN.CATEGORY.VIDEO && b.append('<div class="infoicon"><img src="//d1q46pwrruta9x.cloudfront.net/img/cam-icon.png" width="17"></div>');
            "Current" == a.revisionid ? f.after(buildGearMenu($.extend({}, a, {
                    revisionid: ""
                }),
                e)) : f.after(buildGearMenu(a, e));
            c.addClass("gridline");
            c.data("n", d)
        }
    }, {
        id: "revisionid",
        name: i18n.get("Revision"),
        sortable: !0,
        build: function(a, b, c, d, e) {
            b.append(a.revisionid).addClass("revid")
        },
        prepSort: function(a) {
            return a == i18n.get("Current") ? 999999999999 : a
        }
    }, {
        id: "size",
        name: i18n.get("Size"),
        sortable: !0,
        build: function(a, b, c, d, e) {
            b.append(HFN.formatSize(a.size)).addClass("gridsize")
        }
    }, {
        id: "created",
        name: i18n.get("Created"),
        sortable: !0,
        build: function(a, b, c, d, e) {
            b.append((new Date(a.created)).toLocaleString()).attr("title",
                HFN.prepDt(a.created)).css({
                width: 100,
                "white-space": "nowrap",
                "padding-right": "12px"
            })
        },
        prepSort: function(a) {
            return (new Date(a)).getTime()
        }
    }]
});
Gridlist.templates.mobsnbackups = {
    name: "list",
    displayitems: 500,
    mode: Gridlist.prototype.MODE_LIST,
    headings: !0,
    paging: 500,
    hasSelection: !1,
    defaultSort: {
        sort: "sn",
        direction: "asc"
    },
    columns: [{
        id: "source",
        name: i18n.get("Network"),
        sortable: !0,
        build: function(a, b, c, d, e) {
            icon = HFN.createIcon(a.sourceid, HFN.ICONS.LIST).addClass("listicon");
            b.append(icon.css({
                width: 18,
                height: 18,
                marginTop: -2
            }));
            b.append('<span class="filename folder">' + a.source + "</span>")
        }
    }, {
        id: "is_running",
        name: i18n.get("Status"),
        sortable: !1,
        build: function(a,
            b, c, d, e) {
            c = $("<span></span>");
            a.is_stopped ? null == a.created ? c.append("-") : c.append(i18n.get("Stopped")) : a.is_aborted ? (c.append(i18n.get("Aborted")), -1 != [200, 202, 204].indexOf(a.exit_code) ? c.tooltip({
                title: a.source + " " + i18n.get("association is missing. Please restart!")
            }) : -1 != [201, 203, 205].indexOf(a.exit_code) && c.tooltip({
                title: a.source + " " + i18n.get("association has expired. Please restart!")
            })) : a.is_running ? c.append(i18n.get("Running")) : null != a.is_stopped && null != a.is_aborted ? a.finished ? c.append(i18n.get("Finished")) :
                c.append(i18n.get("Waiting")) : c.append("-");
            b.append(c)
        }
    }, {
        id: "acts",
        name: i18n.get("Actions"),
        sortable: !1,
        build: function(a, b, c, d, e) {
            b.addClass("backupacts");
            null == a.mode ? b.append("Soon") : (b.css({
                width: "1%",
                "white-space": "nowrap",
                "padding-right": "10px"
            }), a.is_stopped ? b.append($("<input>", {
                type: "button",
                "class": "save"
            }).val("Start").on("click", function() {
                a.srcobj.getTokenCallback(function(b, c) {
                    snimp.initStartBackup(a.sourceid)
                })
            })) : a.is_aborted ? b.append($("<input>", {
                type: "button",
                "class": "save"
            }).val("Restart").on("click",
                function() {
                    a.srcobj.getTokenCallback(function(b, c) {
                        snimp.initRestartBackup(a.sourceid)
                    })
                })) : a.is_stopped || a.is_aborted || b.append($("<input>", {
                type: "button",
                "class": "stop"
            }).val(i18n.get("Stop")).on("click", function() {
                snimp.initStopBackup(a.sourceid)
            })), !a.is_stopped && !a.is_running && (new Date(a.finished)).getTime() < (new Date).getTime() - 18E5 && b.append($('<input type="button" class="save">').val("Run Now").on("click", function() {
                a.srcobj.getTokenCallback(function(b, c) {
                    snimp.initRestartBackup(a.sourceid)
                })
            })))
        }
    }]
};
Gridlist.templates.shares = {
    name: "shares",
    displayitems: 500,
    mode: Gridlist.prototype.MODE_LIST,
    headings: !0,
    paging: 5,
    hasSelection: !1,
    columns: [{
        id: "shareitem",
        name: i18n.get("Shared Item"),
        sortable: !1,
        build: function(a, b, c, d, e) {
            var f = $('<div class="iconwrap"></div>'),
                f = a.isfolder ? HFN.ICO.FOLDER_SHARED : a.icon;
            e = $('<span class="filename"></span>').text(e.opts.sizeMatters ? HFN.strFit(a.name, e.opts.sizeMatters) : a.name);
            a.isfolder ? (e.addClass("folder"), e.attr("title", __("Open Folder"))) : e.attr("title", __("Open File Location"));
            a.isfolder && 0 == a.folderid && ("c" == a.id.charAt(0) ? (f = "playlist", __("Playlist"), e.attr("title", __("Open Playlist")).tooltip()) : (f = "virtualfolder", __("Virtual Folder"), e.attr("title", __("Preview Content")).tooltip()));
            b.addClass("share").append(f = $('<div class="iconwrap"></div>').append(b = HFN.createIcon(f, HFN.ICONS.LIST).addClass("listicon"))).append(e);
            c.data("n", d);
            setupThumb(b, a, HFN.ICONS.LIST);
            a.thumb && (a.category == HFN.CATEGORY.VIDEO ? f.append('<div class="infoicon"><img src="//d1q46pwrruta9x.cloudfront.net/img/cam-icon.png" width="17"></div>') :
                a.category == HFN.CATEGORY.AUDIO && f.append('<div class="infoicon"><img src="//d1q46pwrruta9x.cloudfront.net/img/nota-standart.png" width="15"></div>'));
            c = a.isfolder && 0 != a.folderid ? function(b) {
                b.ctrlKey || b.shiftKey || b.metaKey || ($.bbq.pushState({
                    folder: a.folderid,
                    page: "filemanager"
                }, 2), $(window).scrollTop(0))
            } : "virtual" == a.type ? function(b) {
                HFN.previewVirtualFolder(a)
            } : "collection" == a.type ? function(b) {
                $.bbq.pushState({
                    page: "audio",
                    autab: "tab-playlist",
                    playlist: a.id.substring(1)
                })
            } : function(b) {
                b.ctrlKey ||
                    b.shiftKey || b.metaKey || (b.stopPropagation(), $.bbq.pushState({
                        folder: a.parentfolderid,
                        page: "filemanager",
                        file: a.id
                    }))
            };
            e.on("click", c);
            b.on("click", c)
        },
        prepSort: function(a, b) {
            return "foldername" in b ? b.foldername : b.sharename
        }
    }, {
        id: "summary",
        name: __("Shares"),
        build: function(a, b, c, d, e) {
            b.addClass("summary-invites");
            if (a.isfolder && 0 != a.folderid && "c" != a.id.charAt(0) && (0 == HFN.shareSummaryObj(a).shares ? c = __("No Collaborators") : (HFN.shareSummaryObj(a), c = HFN.invitesSummaryTooltip(a)), b.append(c = $("<div></div>").addClass("invites").text(HFN.shareSummaryObj(a).shares).addClass(0 <
                HFN.shareSummaryObj(a).shares ? "active" : "nnn").attr("title", '<div style="text-align: left; white-space: nowrap;">' + c + "</div>").tooltip({
                container: e.parentSelector(),
                template: '<div class="tooltip tooltip-wide" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
                html: !0
            }).append('<img src="//d1q46pwrruta9x.cloudfront.net/img/invite.png" class="act">').append('<img src="//d1q46pwrruta9x.cloudfront.net/img/invite-no.png" class="ina">')), HFN.shareSummaryObj(a).shares)) c.on("click",
                function(b) {
                    HFN.initShareFolder(a)
                });
            if (a.isfolder && 0 != a.folderid && "c" != a.id.charAt(0) && (b.append(c = $("<div></div>").addClass(0 < HFN.shareSummaryObj(a).puplinks ? "active" : "nnn").attr("title", HFN.shareSummaryObj(a).puplinks ? __("Upload Link") : __("No Upload Link")).tooltip({
                container: e.parentSelector()
            }).append('<img src="//d1q46pwrruta9x.cloudfront.net/img/uplink-yes.png" class="act">').append('<img src="//d1q46pwrruta9x.cloudfront.net/img/uplink-no.png" class="ina">')), HFN.shareSummaryObj(a).puplinks)) c.on("click",
                function(b) {
                    HFN.getPuplink(a, function(b) {
                        b ? HFN.viewPuplink(b) : HFN.createPuplink(a)
                    })
                });
            b.append(b = $("<div></div>").addClass(0 < HFN.shareSummaryObj(a).publinks ? "active" : "nnn").attr("title", HFN.shareSummaryObj(a).publinks ? __("Download Link") : __("No Download Link")).tooltip({
                container: e.parentSelector()
            }).append('<img src="//d1q46pwrruta9x.cloudfront.net/img/dlink-yes.png" class="act">').append('<img src="//d1q46pwrruta9x.cloudfront.net/img/dlink-no.png" class="ina">'));
            if (HFN.shareSummaryObj(a).publinks) b.on("click",
                function(b) {
                    HFN.getPublink(a, function(b) {
                        b ? HFN.sharePublink(b) : HFN.createPublink(a)
                    })
                })
        }
    }, {
        id: "share-actions",
        name: __("Actions"),
        sortable: !1,
        buildHead: function(a, b) {
            a.text(__("Actions")).css("width", "1%")
        },
        build: function(a, b, c, d, e) {
            b.addClass("actions");
            b.append(buildShareMenu(a));
            b.append($("<div></div>").text(__("Stop")).addClass("action stop").prepend('<img src="' + CDNVER + '/img/stop-share.png" width="9" height="9">').on("click", function(b) {
                HFN.initStopAllShares(a)
            })).css("width", "100px;").css("text-align",
                "center")
        }
    }]
};
Gridlist.templates.incomingshares = {
    name: "list",
    displayitems: 500,
    mode: Gridlist.prototype.MODE_LIST,
    headings: !0,
    paging: 5,
    hasSelection: !1,
    columns: [{
        id: "sharename",
        name: __("Shared folder"),
        sortable: !1,
        build: function(a, b, c, d, e) {
            c = HFN.createIcon(HFN.ICO.FOLDER_SHAREDWITHME, HFN.ICONS.LIST).addClass("listicon");
            b.addClass("foldershort");
            b.append(c);
            b.append('<span class="filename folder">' + htmlentities("foldername" in a ? a.foldername : a.sharename) + "</span>");
            c = function(b) {
                $.bbq.pushState({
                        page: "filemanager",
                        folder: a.folderid
                    },
                    2)
            };
            "share" == a.type && b.find("span").on("click", c).end().find("img").on("click", c).end().addClass("share")
        },
        prepSort: function(a, b) {
            return "foldername" in b ? b.foldername : b.sharename
        }
    }, {
        id: "owner_and_perm",
        name: __("Owner"),
        sortable: !1,
        build: function(a, b, c, d, e) {
            c = calcPermissions(a);
            d = '<img src="//d1q46pwrruta9x.cloudfront.net/img/mail-user.png" width="20" height="20" class="mailicon">';
            "business" == a.atype && (d = '<img src="' + HFN.prepUrl(a.userobj.avatar) + '" width="32" height="32">');
            e = a.frommail;
            "business" ==
                a.atype && (e = a.fromname);
            b.addClass("owner_and_perm").append(b = $('<span class="sharemail lf">\x3c!--Owner:  --\x3e' + d + e + "</span>")).append('<span class="shareperm rt">' + __({
                0: "can view",
                7: "can edit",
                15: "can manage"
            }[c]) + "</span>");
            if ("business" == a.atype) b.addClass("ownerlink").on("click", function(b) {
                $.bbq.pushState({
                    page: "b_user",
                    id: a.userobj.id
                })
            })
        },
        buildHead: function(a, b) {
            a.addClass("owner_and_perm").append('<span class="lf">' + __("Owner") + "</span>").append('<span class="rt">' + __("My Permissions") +
                "</span>")
        },
        prepSort: function(a, b) {
            return "frommail" in b ? b.frommail : b.tomail
        }
    }, {
        id: "created",
        name: __("Created"),
        sortable: !1,
        build: function(a, b, c, d, e) {
            b.text(HFN.formatDt(a.created)).attr("title", HFN.prepDt(a.created)).addClass("sharecreated")
        },
        prepSort: function(a) {
            return (new Date(a)).getTime()
        }
    }, {
        id: "actions",
        name: __("Actions"),
        sortable: !1,
        buildHead: function(a, b) {
            a.text(__("Actions")).attr("nowrap", "nowrap")
        },
        build: function(a, b, c, d, e) {
            b.addClass("actions").css("width", "1%");
            if ("frommail" in a && "user" ==
                a.atype) "sharerequestid" in a ? b.css("width", "1%").attr("nowrap", "nowrap").append($("<div></div>").addClass("action accept").text(__("Accept")).prepend('<img src="' + CDNVER + '/img/acc-share.png" width="11" height="8">').on("click", function(b) {
                HFN.acceptShare(a)
            })).append($("<div></div>").addClass("action stop").text(__("Decline")).prepend('<img src="' + CDNVER + '/img/decline-share.png" width="12" height="12">').on("click", function(b) {
                HFN.rejectShare(a)
            })) : b.append($("<div></div>").text(__("Stop")).prepend('<img src="' +
                CDNVER + '/img/stop-share.png" width="9" height="9">').addClass("action stop lone1").on("click", function(b) {
                HFN.initRemoveShare(a)
            }));
            else if ("business" == a.atype)
                if (b.append(b = $("<div></div>").text(__("Manage")).prepend('<img src="' + CDNVER + '/img/manage-share.png" width="11" height="11">').addClass("action manage")), a.permissions.canmanage) b.on("click", HFN.initShareFolder.bind(HFN, a));
                else b.addClass("disabled").attr("title", __("You do not have permission to manage this share.")).tooltip({
                    container: e.parentSelector()
                })
        }
    }]
};
Gridlist.templates.folderlist.commonSort = "filemanager";
Gridlist.templates.foldergrid.commonSort = "filemanager";

function buildPublicGearMenu(a, b) {
    var c = [];
    c.push([i18n.get("Copy"), "", !1, [CDN + "/img/mn/copy-dark.png", CDN + "/img/mn/copy-dark.png"], {
        action: "copy"
    }]);
    a.isfolder ? c.push([i18n.get("Download Folder"), "", !1, [CDN + "/img/drop-down-download.png", CDN + "/img/drop-down-download-over.png"], {
        action: "downloadfolder"
    }]) : c.push([i18n.get("Download"), "", !1, [CDN + "/img/drop-down-download.png", CDN + "/img/drop-down-download-over.png"], {
        action: "download"
    }]);
    var d = $('<div class="gear"><img class="imggear" src="//d1q46pwrruta9x.cloudfront.net/img/icons/gear.png" width="15" height="15"></div>');
    dropDown.bindList(c, d, {
        direction: dropDown.DIR_LEFT,
        eventTrigger: "click",
        buildCell: function(c, d) {
            return $("<a>").attr("href", "javascript:void(0);").attr("data-action", c[4].action).append($("<li>").append('<img src="' + c[3][0] + '" class="act">').append('<img src="' + c[3][1] + '" class="ina">').append(c[dropDown.N_TEXT] + "")).on("click", function(c) {
                c.stopImmediatePropagation();
                c.preventDefault();
                dropDown.resetTo(0);
                switch ($(this).data("action")) {
                    case "copy":
                        HFN.config.auth ? (b.clearSelection(), FileSelection.add(a),
                            HFN.copyToCloud({
                                code: $.bbq.getState("code") || $.deparam.querystring().code,
                                onDone: function(a) {
                                    HFN.message("File is copied.")
                                }
                            })) : HFN.initLoginRegModal("Log in to your pCloud", function() {
                            HFN.pages.refresh();
                            Popup.open(HFN.renderTemplate(".copytocloudexplain"), {
                                title: "Copy to my pCloud"
                            })
                        });
                        break;
                    case "downloadfolder":
                        b.clearSelection();
                        FileSelection.add(a);
                        HFN.initDownloadArchivePublic();
                        break;
                    case "downloadzip":
                        b.clearSelection();
                        b.selectAll();
                        HFN.initDownloadArchivePublic();
                        break;
                    case "download":
                        HFN.initDownloadPublic();
                        break;
                    case "copylogin":
                        HFN.initLoginRegModal("Log in to your pCloud", function() {
                            HFN.pages.refresh();
                            Popup.open(HFN.renderTemplate(".copytocloudexplain"), {
                                title: "Copy to my pCloud"
                            })
                        })
                }
            }).appendTo(d)
        }
    });
    return d
}

function buildRightClickMenu(a, b, c) {
    var d = []; - 1 != [HFN.CATEGORY.AUDIO, HFN.CATEGORY.VIDEO].indexOf(a.category) ? d.push([i18n.get("Play"), "", !1, ["/img/play-icon.png", "/img/play-icon-active.png"], {
        action: "preview"
    }]) : (a.category == HFN.CATEGORY.IMAGE || a.category == HFN.CATEGORY.DOCUMENT && -1 != HFN.config.documentCanRenderExt.indexOf(fileext(a.name.toLowerCase()))) && d.push([i18n.get("Preview"), "", !1, ["/img/preview-file-folder.png", "/img/preview-file-folder-active.png"], {
        action: "preview"
    }]);
    a.isfolder ? d.push([i18n.get("Download Archive"),
        "", !1, [CDN + "/img/drop-down-download.png", CDN + "/img/drop-down-download-over.png"], {
            action: "downloadzip"
        }
    ]) : d.push([i18n.get("Download Archive"), "", !1, [CDN + "/img/drop-down-download.png", CDN + "/img/drop-down-download-over.png"], {
        action: "download"
    }]);
    c && c.opts.metadata && c.opts.metadata.filter && d.push([i18n.get("Open Location"), "", !1, [CDN + "/img/open-location.png", CDN + "/img/open-location-active.png"], {
        action: "openloc"
    }]);
    (a.ismine || a.canmodify) && d.push([i18n.get("Rename"), "", !1, [CDN + "/img/drop-down-rename.png",
        CDN + "/img/drop-down-rename-over.png"
    ], {
        action: "rename"
    }]);
    d.push([i18n.get("Copy"), "", !1, [CDN + "/img/drop-down-copy.png", CDN + "/img/drop-down-copy-over.png"], {
        action: "copy"
    }]);
    (a.ismine || a.candelete) && d.push([i18n.get("Move"), "", !1, [CDN + "/img/drop-down-move.png", CDN + "/img/drop-down-move-over.png"], {
        action: "move"
    }]);
    a.isfolder && a.ismine && d.push([i18n.get("Share Folder"), "", !1, [CDN + "/img/drop-down-share.png", CDN + "/img/drop-down-share-over.png"], {
        action: "share"
    }]);
    (a.ismine || a.candelete) && d.push([i18n.get("Delete"),
        "", !1, [CDN + "/img/drop-down-delete.png", CDN + "/img/drop-down-delete-over.png"], {
            action: "delete"
        }
    ]);
    d.push([(a.isfolder ? i18n.get("Folder") : i18n.get("File")) + " " + i18n.get("info"), "", !1, [CDN + "/img/file-folder-info.png", CDN + "/img/file-folder-info-active.png"], {
        action: "info"
    }]);
    b.data("mnlist", d).on("contextmenu", function(b) {
        if (!(b.ctrlKey || b.shiftKey || b.metaKey) && 3 == b.which) return console.log(b), b.preventDefault(), dropDown.triggerList($(this).data("mnlist"), {
            x: b.pageX,
            y: b.pageY
        }, {
            direction: dropDown.DIR_RIGHT,
            buildCell: function(b, c) {
                return $("<a>").attr("href", "javascript:void(0);").attr("data-action", b[4].action).append($("<li>").append('<img src="' + b[3][0] + '" class="act">').append('<img src="' + b[3][1] + '" class="ina">').append(b[dropDown.N_TEXT] + "")).on("click", function(b) {
                    b.preventDefault();
                    b.stopPropagation();
                    dropDown.resetTo(0);
                    switch ($(this).data("action")) {
                        case "preview":
                            HFN.previewFile(a);
                            break;
                        case "download":
                            $.browser.msie && -1 == versionCompare($.browser.version, "10.0") ? HFN.downloadFile(a.fileid) :
                                HFN.apiMethod("getfilelink", {
                                    fileid: a.fileid,
                                    forcedownload: 1
                                }, function(a) {
                                    console.log("sending to: ", HFN.prepUrl(a));
                                    window.open(HFN.prepUrl(a))
                                }, {
                                    async: !1
                                });
                            break;
                        case "openloc":
                            $.bbq.pushState({
                                page: "filemanager",
                                folder: a.parentfolderid,
                                file: a.id
                            }, 2);
                            break;
                        case "downloadzip":
                            HFN.initDownloadArchive(a);
                            break;
                        case "getpublink":
                            HFN.getPublink(a, function(b) {
                                b ? HFN.sharePublink(b) : HFN.createPublink(a)
                            });
                            break;
                        case "getpuplink":
                            HFN.getPuplink(a, function(b) {
                                b ? HFN.viewPuplink(b) : HFN.createPuplink(a)
                            });
                            break;
                        case "rename":
                            HFN.initRename(a);
                            break;
                        case "copy":
                            HFN.initCopy(a);
                            break;
                        case "move":
                            HFN.initMove(a);
                            break;
                        case "share":
                            HFN.shareItem(a);
                            break;
                        case "delete":
                            HFN.deleteItem(a, triggerOpenFolder.bind(null, a.parentfolderid, !1, !0));
                            break;
                        case "info":
                            HFN.itemInfo(a)
                    }
                }).appendTo(c)
            }
        }), !1
    })
}

function handleContextMenuClick(a, b) {
    switch ($(a).data("action")) {
        case "shareall":
            HFN.initShareFolder(b);
            break;
        case "businessshare":
            HFN.initComboShare(b);
            break;
        case "comment":
            $.bbq.pushState({
                comments: b.id
            });
            break;
        case "preview":
            HFN.previewFile(b);
            break;
        case "playlistadd":
            HFN.playlistAdd(b);
            break;
        case "playeradd":
            HFN.audioPlayer.appendPlaylistItem([b]);
            break;
        case "extract":
            HFN.initExtract(b);
            break;
        case "savezip":
            HFN.initSaveZip(b);
            break;
        case "download":
            if (b.encrypted) pCloudCrypto.initFileDownload(b);
            else if ($.browser.msie && -1 == versionCompare($.browser.version, "10.0")) HFN.downloadFile(b.fileid);
            else {
                var c = {
                    fileid: b.fileid,
                    forcedownload: 1
                };
                b.revisionid && (c.revisionid = b.revisionid, c.name = b.name.replace(fileext(b.name)), c.name = b.name.replace(/\.([^\.]+)$/g, "-r" + b.revisionid + ".$1"));
                HFN.apiMethod("getfilelink", c, function(a) {
                    console.log("sending to: ", HFN.prepUrl(a));
                    window.open(HFN.prepUrl(a))
                }, {
                    async: !1
                })
            }
            break;
        case "downloadsizes":
            HFN.initDownloadImageSizes(b);
            break;
        case "downloadconv":
            HFN.initDownloadConverts(b);
            break;
        case "openloc":
            $.bbq.pushState({
                page: "filemanager",
                folder: b.parentfolderid,
                file: b.id
            }, 2);
            break;
        case "downloadzip":
            HFN.initDownloadArchive(b);
            break;
        case "getpublink":
            HFN.getPublink(b, function(a) {
                a ? HFN.sharePublink(a) : HFN.createPublink(b)
            });
            break;
        case "getpuplink":
            HFN.getPuplink(b, function(a) {
                a ? HFN.viewPuplink(a) : HFN.createPuplink(b)
            });
            break;
        case "rename":
            HFN.initRename(b);
            break;
        case "copy":
            HFN.initCopy(b);
            break;
        case "move":
            HFN.initMove(b);
            break;
        case "share":
            HFN.shareItem(b);
            break;
        case "sharestop":
            HFN.shareStop(b);
            break;
        case "delete":
            HFN.deleteItem(b, triggerOpenFolder.bind(null, b.parentfolderid, !1, !0));
            break;
        case "info":
            HFN.itemInfo(b);
            break;
        case "revisions":
            $.bbq.pushState({
                page: "revisions",
                fileid: b.fileid
            });
            break;
        case "revertrev":
            HFN.initRevertRev(b);
            break;
        case "open-orig":
            HFN.apiMethod("getfilelink", {
                fileid: b.fileid
            }, function(a) {
                window.open(HFN.prepUrl(a))
            }, {
                async: !1
            })
    }
}

function handleTrashContextMenuClick(a, b) {
    switch ($(a).data("action")) {
        case "restore":
            HFN.initTrashRestore([b]);
            break;
        case "delete":
            HFN.initTrashDelete([b])
    }
}

function handleArtistContextMenuClick(a, b) {
    switch ($(a).data("action")) {
        case "play":
            HFN.audioPlayer.init({
                asMaximized: !0
            });
            HFN.audioPlayer.clearPlaylist();
            HFN.audioPlayer.appendPlaylistItem(HFN.getArtistSongs(b));
            HFN.audioPlayer.go(HFN.audioPlayer.getFirst());
            break;
        case "playeradd":
            HFN.audioPlayer.appendPlaylistItem(HFN.getArtistSongs(b));
            break;
        case "playlistadd":
            HFN.playlistAdd(HFN.getArtistSongs(b))
    }
}

function handlePlaylistContextMenu(a, b) {
    switch ($(a).data("action")) {
        case "rename":
            HFN.initRenamePlaylist(b);
            break;
        case "play":
            HFN.getPlaylist(b.id, function(a) {
                HFN.audioPlayer.loadPlaylist(a);
                HFN.audioPlayer.go(HFN.audioPlayer.getFirst())
            });
            break;
        case "playeradd":
            HFN.getPlaylist(b.id, function(a) {
                HFN.audioPlayer.appendPlaylistItem(a.contents)
            });
            break;
        case "delete":
            HFN.initDeletePlaylist(b)
    }
}

function buildPlaylistMenuItems(a, b) {
    var c = [];
    c.push([__("Rename"), "", !1, ["/img/drop-down-rename.png", "/img/drop-down-rename-over.png"], {
        action: "rename"
    }]);
    a.items && (c.push([__("Play"), "", !1, ["/img/play-icon.png", "/img/play-icon-active.png"], {
        action: "play"
    }]), c.push([__("Add to Player"), "", !1, ["/img/add-to-player.png", "/img/add-to-player-a.png"], {
        action: "playeradd"
    }]));
    c.push([__("Delete"), "", !1, ["/img/drop-down-delete.png", "/img/drop-down-delete-over.png"], {
        action: "delete"
    }]);
    return c
}

function buildPlaylistSongMenuItems(a, b) {
    var c = [];
    a.isfolder || c.push([i18n.get("Download"), "", !1, ["/img/drop-down-download.png", "/img/drop-down-download-over.png"], {
        action: "download"
    }]); - 1 != [HFN.CATEGORY.AUDIO, HFN.CATEGORY.VIDEO].indexOf(a.category) && c.push([i18n.get("Play"), "", !1, ["/img/play-icon.png", "/img/play-icon-active.png"], {
        action: "preview"
    }]);
    a.category == HFN.CATEGORY.AUDIO && c.push([__("Add to ..."), "", [
            [__("Add to Playlist"), "", !1, ["/img/add-to-list.png", "/img/add-to-list-a.png"], {
                action: "playlistadd"
            }],
            [__("Add to Player"), "", !1, ["/img/add-to-player.png", "/img/add-to-player-a.png"], {
                action: "playeradd"
            }]
        ],
        ["/img/add-to.png", "/img/add-to-a.png"], {
            action: "sub"
        }
    ]);
    HFN.config.isBusiness() && !PCB.permissions.canCreateDownloadLinks() || c.push([i18n.get("Share"), "", !1, ["/img/drop-down-share.png", "/img/drop-down-share-over.png"], {
        action: "getpublink"
    }]);
    c.push([i18n.get("Open Location"), "", !1, ["/img/open-location.png", "/img/open-location-active.png"], {
        action: "openloc"
    }]);
    return c
}

function buildMenuItems(a, b) {
    var c = [];
    !HFN.config.isBusiness() || "revisionid" in a || a.encrypted || c.push([__("Add Comment"), "", !1, ["/img/mn/small/comments-dark.png", "/img/mn/small/comments-dark.png"], {
        action: "comment"
    }]);
    a.encrypted || (-1 != [HFN.CATEGORY.AUDIO, HFN.CATEGORY.VIDEO].indexOf(a.category) ? c.push([i18n.get("Play"), "", !1, ["/img/play-icon.png", "/img/play-icon-active.png"], {
        action: "preview"
    }]) : -1 != [HFN.CATEGORY.IMAGE, HFN.CATEGORY.DOCUMENT].indexOf(a.category) ? c.push([i18n.get("Preview"), "", !1, ["/img/preview-file-folder.png",
        "/img/preview-file-folder-active.png"
    ], {
        action: "preview"
    }]) : HFN.CATEGORY.ARCHIVE == a.category && c.push([i18n.get("Extract"), "", !1, ["/img/dropdown-extract.png", "/img/dropdown-extract-active.png"], {
        action: "extract"
    }]));
    a.isfolder && !a.encrypted && c.push([__("Create Archive"), "", !1, ["/img/new-archive.png", "/img/new-archive-active.png"], {
        action: "savezip"
    }]);
    a.category != HFN.CATEGORY.AUDIO || a.encrypted || c.push([__("Add to ..."), "", [
            [__("Add to Playlist"), "", !1, ["/img/add-to-list.png", "/img/add-to-list-a.png"], {
                action: "playlistadd"
            }],
            [__("Add to Player"), "", !1, ["/img/add-to-player.png", "/img/add-to-player-a.png"], {
                action: "playeradd"
            }]
        ],
        ["/img/add-to.png", "/img/add-to-a.png"], {
            action: "sub"
        }
    ]);
    !a.isfolder && 0 == a.category && a.encrypted && (a.extention = HFN.textView.file_extention(a), HFN.textView.is_readable(a.extention) && c.push([i18n.get("Preview"), "", !1, ["/img/dropdown-extract.png", "/img/dropdown-extract-active.png"], {
        action: "preview"
    }]));
    a.isfolder || c.push([i18n.get("Download"), "", !1, ["/img/drop-down-download.png",
        "/img/drop-down-download-over.png"
    ], {
        action: "download"
    }]);
    a.encrypted ? 1 : a.category == HFN.CATEGORY.IMAGE && a.width && a.height && 120 <= a.width && 60 <= a.height ? c.push([__("Download Resized"), "", !1, ["/img/downl-convert-g.png", "/img/resize-download.png"], {
        action: "downloadsizes"
    }]) : a.category == HFN.CATEGORY.VIDEO && c.push([__("Download Converted"), "", !1, ["/img/resize-convert-g.png", "/img/resize-convert.png"], {
        action: "downloadconv"
    }]);
    if (a.encrypted) 1;
    else if (a.isfolder && (a.ismine || a.canmanage)) {
        var d = [];
        (a.ismine ||
            a.canmanage) && d.push([__("Share Folder"), "", !1, ["/img/drop-down-share.png", "/img/drop-down-share-over.png"], {
            action: "shareall"
        }]);
        !a.ismine || a.revisionid || HFN.config.isBusiness() && !PCB.permissions.canCreateDownloadLinks() || d.push([__("Share Download Link"), "", !1, ["/img/create-downld-link-drop-menu.png", "/img/create-downld-link-drop-menu-active.png"], {
            action: "getpublink"
        }]);
        !a.ismine || HFN.config.isBusiness() && !PCB.permissions.canCreateUploadLinks() || d.push([__("Share Upload Link"), "", !1, ["/img/create-upload-link-drop-menu.png",
            "/img/create-upload-link-drop-menu-active.png"
        ], {
            action: "getpuplink"
        }]);
        c.push([i18n.get("Share"), "", d, ["/img/drop-down-share.png", "/img/drop-down-share-over.png"], {
            action: "sub"
        }])
    } else a.ismine && (HFN.config.isBusiness() && !PCB.permissions.canCreateDownloadLinks() || c.push([i18n.get("Share"), "", !1, ["/img/drop-down-share.png", "/img/drop-down-share-over.png"], {
        action: "getpublink"
    }]));
    (b && b.opts.metadata && b.opts.metadata.filter || "revisions" == $.bbq.getState("page")) && c.push([i18n.get("Open Location"), "", !1, ["/img/open-location.png", "/img/open-location-active.png"], {
        action: "openloc"
    }]);
    Perm.canRename(a) && c.push([i18n.get("Rename"), "", !1, ["/img/drop-down-rename.png", "/img/drop-down-rename-over.png"], {
        action: "rename"
    }]);
    a.revisionid || a.encrypted || c.push([i18n.get("Copy"), "", !1, ["/img/mn/copy-dark.png", "/img/mn/copy-dark.png"], {
        action: "copy"
    }]);
    Perm.canMove(a) && c.push([i18n.get("Move"), "", !1, ["/img/drop-down-move.png", "/img/drop-down-move-over.png"], {
        action: "move"
    }]);
    a.isfolder && !a.encrypted && c.push([i18n.get("Download Archive"),
        "", !1, ["/img/drop-down-download.png", "/img/drop-down-download-over.png"], {
            action: "downloadzip"
        }
    ]);
    console.log("for delete");
    !a.ismine && !a.candelete || a.revisionid || a.revoriginal || a.encrypted && "Crypto Folder" == a.name || c.push([i18n.get("Delete"), "", !1, ["/img/drop-down-delete.png", "/img/drop-down-delete-over.png"], {
        action: "delete"
    }]);
    a.revisionid || c.push([(a.isfolder ? i18n.get("Folder") : i18n.get("File")) + " " + i18n.get("info"), "", !1, ["/img/file-folder-info.png", "/img/file-folder-info-active.png"], {
        action: "info"
    }]);
    a.isfolder || a.revisionid || "revisions" == $.bbq.getState("page") || a.encrypted || c.push([i18n.get("Revisions"), "", !1, ["/img/dropdown-revisions.png", "/img/dropdown-revisions-over.png"], {
        action: "revisions"
    }]);
    a.revisionid && c.push([i18n.get("Revert to this Revision"), "", !1, ["/img/dropdown-restrev.png", "/img/dropdown-restrev-over.png"], {
        action: "revertrev"
    }]);
    a.revisionid && c.push([i18n.get("Restore as new file"), "", !1, ["/img/dropdown-restfile.png", "/img/dropdown-restfile-over.png"], {
        action: "copy"
    }]);
    return c
}

function buildEncryptedMenuItems(a, b) {
    var c = [];
    a.isfolder || c.push([i18n.get("Download"), "", !1, ["/img/drop-down-download.png", "/img/drop-down-download-over.png"], {
        action: "download"
    }]);
    return c
}

function buildArtistMenuItems(a, b) {
    var c = [];
    c.push([__("Play"), "", !1, ["/img/play-icon.png", "/img/play-icon-active.png"], {
        action: "play"
    }]);
    c.push([__("Add to Playlist"), "", !1, ["/img/add-to-list.png", "/img/add-to-list-a.png"], {
        action: "playlistadd"
    }]);
    c.push([__("Add to Player"), "", !1, ["/img/add-to-player.png", "/img/add-to-player-a.png"], {
        action: "playeradd"
    }]);
    return c
}

function buildTrashMenuItems(a, b) {
    var c = [];
    c.push([i18n.get("Restore"), "", !1, ["/img/dropdown-restfile.png", "/img/dropdown-restfile-over.png"], {
        action: "restore"
    }]);
    c.push([i18n.get("Delete"), "", !1, ["/img/drop-down-delete.png", "/img/drop-down-delete-over.png"], {
        action: "delete"
    }]);
    return c
}

function buildDarkBoxMenu(a, b) {
    var c = buildMenuItems(a),
        d = $('<div class="opts">OPTS</div>');
    dropDown.bindList(c, d, {
        direction: dropDown.DIR_LEFT,
        eventTrigger: "click",
        buildCell: function(b, c) {
            return $("<a>").attr("href", "javascript:void(0);").attr("data-action", b[4].action).append($("<li>").append('<img src="//d1q46pwrruta9x.cloudfront.net' + b[3][0] + '" class="act">').append('<img src="//d1q46pwrruta9x.cloudfront.net' + b[3][1] + '" class="ina">').append(b[dropDown.N_TEXT])).on("click", function(b) {
                b.preventDefault();
                b.stopPropagation();
                dropDown.resetTo(0);
                handleContextMenuClick(this, a)
            }).appendTo(c)
        },
        buildHolder: function(a) {
            a.addClass("darkmn")
        }
    });
    return d
}

function buildTrashGearMenu(a, b) {
    var c = buildTrashMenuItems(a, b),
        d = $('<div class="gear"><img class="imggear" src="//d1q46pwrruta9x.cloudfront.net/img/icons/gear.png" width="15" height="15"></div>');
    dropDown.bindList(c, d, {
        direction: dropDown.DIR_LEFT,
        eventTrigger: "click",
        buildCell: function(b, c) {
            return $("<a>").attr("href", "javascript:void(0);").attr("data-action", b[4].action).append($("<li>").append('<img src="//d1q46pwrruta9x.cloudfront.net' + b[3][0] + '" class="act">').append('<img src="//d1q46pwrruta9x.cloudfront.net' +
                b[3][1] + '" class="ina">').append(b[dropDown.N_TEXT] + "")).on("click", function(b) {
                b.preventDefault();
                b.stopPropagation();
                dropDown.resetTo(0);
                handleTrashContextMenuClick(this, a)
            }).appendTo(c)
        }
    });
    return d
}

function buildPlaylistGearMenu(a, b) {
    var c = buildPlaylistMenuItems(a, b),
        d = $('<div class="gear"><img class="imggear" src="//d1q46pwrruta9x.cloudfront.net/img/icons/gear.png" width="15" height="15"></div>');
    dropDown.bindList(c, d, {
        direction: dropDown.DIR_LEFT,
        eventTrigger: "click",
        buildCell: function(b, c) {
            return $("<a>").attr("href", "javascript:void(0);").attr("data-action", b[4].action).append($("<li>").append('<img src="//d1q46pwrruta9x.cloudfront.net' + b[3][0] + '" class="act">').append('<img src="//d1q46pwrruta9x.cloudfront.net' +
                b[3][1] + '" class="ina">').append(b[dropDown.N_TEXT])).on("click", function(b) {
                b.preventDefault();
                b.stopPropagation();
                $(this).hasClass("sub") || (dropDown.resetTo(0), handlePlaylistContextMenu(this, a))
            }).appendTo(c)
        }
    });
    return d
}

function buildShareItems(a, b, c) {
    b = [];
    a.isfolder && (a.ismine || a.isbusiness_shared) ? (b.push([__("Share Folder"), "", !1, ["/img/share-invite-prople.png", "/img/share-invite-prople-gray.png"], {
            action: "shareall"
        },
        __("Invite friends to view and modify files as if they were their own."), c.share
    ]), !a.ismine || HFN.config.isBusiness() && !PCB.permissions.canCreateUploadLinks() || b.push([__("Share Upload Link"), "", !1, ["/img/share-send-uplink.png", "/img/share-send-uplink-gray.png"], {
            action: "getpuplink"
        },
        __("Share a link to this folder so people can upload files to the folder."),
        c.puplink
    ]), !a.ismine || a.revisionid || HFN.config.isBusiness() && !PCB.permissions.canCreateDownloadLinks() || b.push([__("Share Download Link"), "", !1, ["/img/share-send-dlink.png", "/img/share-send-dlink-gray.png"], {
            action: "getpublink"
        },
        __("Share a link to your files so people can view and download them."), c.publink
    ])) : a.ismine && (HFN.config.isBusiness() && !PCB.permissions.canCreateDownloadLinks() || b.push([__("Share Download Link"), "", !1, ["/img/share-send-dlink.png", "/img/share-send-dlink-gray.png"], {
            action: "getpublink"
        },
        __("Share a link to your files so people can view and download them."), c.publink
    ]));
    return b
}

function buildShareMenu(a, b) {
    var c = $('<div class="share-opts"></div>').text(__("Share")).append('<img src="/img/share-opt-black.png" width="7" height="4" class="black-arrow">').append('<img src="/img/share-publink.png" width="11" height="11" class="download-chain">');
    HFN.getSharedStatus(a, function(d) {
        d.isshared && c.addClass("has");
        a.isfolder && 0 != a.folderid && "c" != a.id.charAt(0) ? dropDown.bindList(buildShareItems(a, b, d), c, {
            direction: dropDown.DIR_LEFT,
            childDirection: dropDown.DIR_RIGHT,
            eventTrigger: "click",
            eventClose: "click",
            holderClass: "fileopts",
            overwriteTip: {
                right: "8px"
            },
            buildCell: function(b, c) {
                var d = $("<a>").attr("href", "javascript:void(0);").attr("data-action", b[4].action).append($("<li>").addClass("clearfix").append('<img src="//d1q46pwrruta9x.cloudfront.net' + b[3][0] + '" width="30" height="30" class="act">').append('<img src="//d1q46pwrruta9x.cloudfront.net' + b[3][1] + '" width="30" height="30" class="ina">').append($('<div class="mn-text"></div>').append('<div class="mn-title">' + b[dropDown.N_TEXT] +
                    "</div>").append('<div class="mn-explain">' + b[dropDown.N_EXPLN] + "</div>"))).on("click", function(b) {
                    b.preventDefault();
                    b.stopPropagation();
                    "sub" != $(this).data("action") && (dropDown.resetTo(0), handleContextMenuClick(this, a))
                }).appendTo(c);
                b[6] && d.addClass("hasshare");
                return d
            },
            buildHolder: function(a) {
                console.log("!! got obj", a);
                a.addClass("mnew-heighter")
            }
        }) : (c.find("img.black-arrow").remove(), c.addClass("down-only"), c.on("click", function() {
            HFN.getPublink(a, function(b) {
                b ? HFN.sharePublink(b) : HFN.createPublink(a)
            })
        }))
    });
    return c
}

function buildPlaylistSongGearMenu(a, b) {
    var c = buildPlaylistSongMenuItems(a, b),
        d = $('<div class="gear"><img class="imggear" src="//d1q46pwrruta9x.cloudfront.net/img/icons/gear.png" width="15" height="15"></div>');
    dropDown.bindList(c, d, {
        direction: dropDown.DIR_LEFT,
        childDirection: dropDown.DIR_RIGHT,
        eventTrigger: "click",
        eventClose: "click",
        holderClass: "fileopts",
        buildCell: function(b, c) {
            return $("<a>").attr("href", "javascript:void(0);").attr("data-action", b[4].action).append($("<li>").append('<img src="//d1q46pwrruta9x.cloudfront.net' + b[3][0] +
                '" width="15" height="15" class="act">').append('<img src="//d1q46pwrruta9x.cloudfront.net' + b[3][1] + '" width="15" height="15" class="ina">').append(b[dropDown.N_TEXT] + "")).on("click", function(b) {
                b.preventDefault();
                b.stopPropagation();
                "sub" != $(this).data("action") && (dropDown.resetTo(0), handleContextMenuClick(this, a))
            }).appendTo(c)
        },
        buildHolder: function(a) {}
    });
    return d
}

function buildEncryptedGearMenu(a, b) {
    var c = buildEncryptedMenuItems(a, b),
        d = $('<div class="gear"><img class="imggear" src="//d1q46pwrruta9x.cloudfront.net/img/icons/gear.png" width="15" height="15"></div>');
    dropDown.bindList(c, d, {
        direction: dropDown.DIR_LEFT,
        childDirection: dropDown.DIR_RIGHT,
        eventTrigger: "click",
        eventClose: "click",
        holderClass: "fileopts",
        buildCell: function(b, c) {
            return $("<a>").attr("href", "javascript:void(0);").attr("data-action", b[4].action).append($("<li>").append('<img src="//d1q46pwrruta9x.cloudfront.net' +
                b[3][0] + '" width="15" height="15" class="act">').append('<img src="//d1q46pwrruta9x.cloudfront.net' + b[3][1] + '" width="15" height="15" class="ina">').append(b[dropDown.N_TEXT] + "")).on("click", function(b) {
                b.preventDefault();
                b.stopPropagation();
                "sub" != $(this).data("action") && (dropDown.resetTo(0), handleContextMenuClick(this, a))
            }).appendTo(c)
        },
        buildHolder: function(a) {},
        onOpen: function() {
            console.log("dd opened");
            d.parent().addClass("gear-opn")
        },
        onClose: function() {
            console.log("dd closed");
            d.parent().removeClass("gear-opn")
        }
    });
    return d
}

function buildGearMenu(a, b) {
    var c = buildMenuItems(a, b),
        d = $('<div class="gear"><img class="imggear" src="//d1q46pwrruta9x.cloudfront.net/img/icons/gear.png" width="15" height="15"></div>');
    dropDown.bindList(c, d, {
        direction: dropDown.DIR_LEFT,
        childDirection: dropDown.DIR_RIGHT,
        eventTrigger: "click",
        eventClose: "click",
        holderClass: "fileopts",
        buildCell: function(b, c) {
            return $("<a>").attr("href", "javascript:void(0);").attr("data-action", b[4].action).append($("<li>").append('<img src="//d1q46pwrruta9x.cloudfront.net' + b[3][0] +
                '" width="15" height="15" class="act">').append('<img src="//d1q46pwrruta9x.cloudfront.net' + b[3][1] + '" width="15" height="15" class="ina">').append(b[dropDown.N_TEXT] + "")).on("click", function(b) {
                b.preventDefault();
                b.stopPropagation();
                "sub" != $(this).data("action") && (dropDown.resetTo(0), handleContextMenuClick(this, a))
            }).appendTo(c)
        },
        buildHolder: function(a) {},
        onOpen: function() {
            console.log("dd opened");
            d.parent().addClass("gear-opn")
        },
        onClose: function() {
            console.log("dd closed");
            d.parent().removeClass("gear-opn")
        }
    });
    return d
}

function buildArtistGearMenu(a, b) {
    var c = buildArtistMenuItems(a, b),
        d = $('<div class="gear"><img class="imggear" src="//d1q46pwrruta9x.cloudfront.net/img/icons/gear.png" width="15" height="15"></div>');
    dropDown.bindList(c, d, {
        direction: dropDown.DIR_LEFT,
        eventTrigger: "click",
        buildCell: function(b, c) {
            return $("<a>").attr("href", "javascript:void(0);").attr("data-action", b[4].action).append($("<li>").append('<img src="//d1q46pwrruta9x.cloudfront.net' + b[3][0] + '" class="act">').append('<img src="//d1q46pwrruta9x.cloudfront.net' + b[3][1] +
                '" class="ina">').append(b[dropDown.N_TEXT])).on("click", function(b) {
                b.preventDefault();
                b.stopPropagation();
                $(this).hasClass("sub") || (dropDown.resetTo(0), handleArtistContextMenuClick(this, a))
            }).appendTo(c)
        }
    });
    return d
}

function setupThumb(a, b, c, d) {
    HFN.thumbManager.setupThumb(a, b, c, d)
}
var hfnFile = function(a) {
    this.meta = a
};
hfnFile.prototype = {
    size: function() {
        if (this.meta.isfolder) return !1;
        var a = this.meta.size,
            a = a / 1024;
        if (1024 >= a) return a.toFixed(1) + i18n.get("Kb");
        a /= 1024;
        if (1024 >= a) return a.toFixed(1) + i18n.get("Mb");
        a /= 1024;
        if (1024 >= a) return a.toFixed(1) + i18n.get("Gb");
        a /= 1024;
        if (1024 >= a) return a.toFixed(1) + i18n.get("Tb")
    },
    isFolder: function() {
        return this.meta.isfolder
    },
    isFile: function() {
        return !this.meta.isfolder
    },
    getParam: function(a) {
        return this.meta[a] || -1
    },
    children: function(a) {
        if (this.isFile()) return !1;
        for (var b = [],
            c = 0; c < this.meta.contents.length; ++c)(!a || a == HFN.FILETYPE.FOLDER && this.meta.contents[c].isfolder || a == HFN.FILETYPE.FILE && !this.meta.contents[c].isfolder) && b.push(new hfnFile(this.meta.contents[c]));
        return b
    },
    name: function() {
        return this.meta.name
    },
    id: function() {
        return this.isfolder ? this.meta.folderid : this.meta.fileid
    },
    icon: function() {
        return this.meta.icon
    },
    modified: function() {
        return this.meta.modified
    },
    created: function() {
        return this.meta.created
    },
    path: function() {
        return this.meta.path || !1
    },
    ismine: function() {
        return this.meta.ismine
    },
    isshared: function() {
        return this.meta.isshared
    },
    contentType: function() {
        return this.meta.contenttype || !1
    },
    canread: function() {
        return this.meta.canread || -1
    },
    canmodify: function() {
        return this.meta.canmodify || -1
    },
    candelete: function() {
        return this.meta.candelete || -1
    },
    cancreate: function() {
        return this.meta.cancreate || -1
    }
};

function onEnter(a, b) {
    $(a).on("keyup.enter", function(a) {
        13 === a.keyCode && b()
    })
}

function onCtrlEnter(a, b) {
    $(a).on("keyup.enter", function(a) {
        13 === a.keyCode && a.ctrlKey && b()
    })
}

function clearOnEnter(a) {
    $(a).off("keyup.enter")
}
var MobilePopup = {
        cache: {},
        config: {
            ajax: !1,
            hasClose: !1,
            closeBtnSelector: !1,
            className: "",
            fadeSpeed: 0,
            overlay: !1,
            innerlay: "",
            cssPosition: "fixed",
            onEscClose: !0,
            clickClose: !0
        },
        instanceConfig: {},
        loaded: null,
        wrapper: null,
        init: function() {
            this.loaded && this.wrapper || (this.wrapper = $("<div>").addClass("modal modal-mobile").append($('<div class="modal-inner"></div>').append('<div class="modal-content"></div>')).appendTo(document.body).hide(), $("<a>", {
                    href: "javascript: void(0);",
                    "class": "modal-close"
                }).click(function() {
                    MobilePopup.close()
                }).appendTo(this.wrapper),
                this.loaded = !0)
        },
        resize: function() {
            h = $(window).height();
            w = $(window).width();
            h2 = $(".modal div").first().height();
            h3 = $(".body").height();
            h2 > h && (h = h2);
            h3 > h && (h = h3);
            this.wrapper.css({
                height: h,
                width: w
            }, function() {
                MobilePopup.setPosition()
            })
        },
        setTitle: function(a) {
            this.wrapper.find(".modal-title").text(a)
        },
        open: function(a, b) {
            this.init();
            b = this.instanceConfig = $.extend({}, this.config, b);
            this.wrapper.find(".modal-inner .modal-title").remove();
            b.title && (void 0 != b.dont_translate_title && !0 == b.dont_translate_title ?
                this.wrapper.find(".modal-inner").prepend($('<div class="modal-title"></div>').append($('<div class="modal-title-text cwrap"></div>').text(b.title))) : this.wrapper.find(".modal-inner").prepend($('<div class="modal-title"></div>').append($('<div class="modal-title-text cwrap"></div>').text(i18n.get(b.title)))));
            b.className && this.wrapper.addClass(b.className);
            b.overlay && Overlay.show(b.fadeSpeed, b.clickClose ? function() {
                MobilePopup.close()
            } : function() {}, b.clickClose);
            if (b.onEscClose) $(document).off("keyup.popup").on("keyup.popup",
                function(a) {
                    27 === a.keyCode && MobilePopup.close()
                });
            $(".modal .modal-close").show();
            b.hasClose ? $(".modal-close").show() : $(".modal-close").hide();
            b.ajax ? (this.contents(""), this.loading(), this.cache[a] ? this.show(Popup.cache[a]) : $.get(a, {}, function(b) {
                MobilePopup.cache[a] = b;
                MobilePopup.show(b)
            })) : "string" != typeof a || "#" != a.substring(0, 1) && "." != a.substring(0, 1) ? this.show(a, b.fadeSpeed) : this.show($(a).clone().css("display", ""), b.fadeSpeed);
            setTimeout(function() {
                    $(".megawrap").hide();
                    MobilePopup.resize()
                },
                200)
        },
        show: function(a, b) {
            this.contents(a);
            this.resize();
            "function" == typeof this.instanceConfig.setPosition ? this.instanceConfig.setPosition() : this.setPosition();
            this.instanceConfig.closeBtnSelector && $(this.instanceConfig.closeBtnSelector).click(function() {
                MobilePopup.close()
            });
            this.wrapper.fadeIn(0)
        },
        setPosition: function() {
            this.wrapper.outerWidth();
            this.wrapper.outerHeight();
            this.wrapper.css({
                top: 0,
                height: this.wrapper.outerHeight(),
                left: 0,
                position: "absolute"
            })
        },
        animateTo: function(a, b) {
            this.wrapper.css({
                width: a,
                height: b,
                marginLeft: -1 * (a / 2) + "px",
                position: "fixed"
            })
        },
        prepAnimate: function() {
            this.wrapper.css({
                width: this.wrapper.width(),
                height: this.wrapper.height()
            })
        },
        hideClose: function() {
            this.wrapper.find(".modal-close").hide()
        },
        showClose: function() {
            this.wrapper.find(".modal-close").show()
        },
        hideModalCont: function() {
            this.wrapper.find(".modal-inner").hide()
        },
        showModalCont: function() {
            this.wrapper.find(".modal-inner").show()
        },
        startLoading: function(a) {
            this.stopLoading(!0);
            a = $.extend({}, {
                processExplain: i18n.get("Loading ..."),
                processStopText: i18n.get("Stop"),
                stopCallback: !1,
                fast: !0
            }, a);
            this.prepAnimate();
            this.hideModalCont();
            this.hideClose();
            this.wrapper.append('<div class="processing"><div class="information"></div></div>');
            a.stopCallback && this.wrapper.find(".information").text(a.processExplain).after($('<div class="stopprocess"></div>').append($('<div class="button smallbut stopbut"></div>').append('<img src="//d1q46pwrruta9x.cloudfront.net/img/stop-process.png" width="9" height="9"> ' + a.processStopText).on("click",
                a.stopCallback)));
            var b = this.wrapper.find(".processing"),
                c = [b.outerWidth(), b.outerHeight()];
            console.log(b, c);
            a.now ? (this.wrapper.css({
                width: c[0],
                height: [c[1]],
                marginLeft: -1 * c[0] / 2
            }), b.show()) : this.wrapper.css({
                width: c[0],
                height: [c[1]],
                marginLeft: -1 * c[0] / 2
            }, 450, function() {
                b.show()
            })
        },
        stopLoading: function(a) {
            this.wrapper.stop(!0, !0);
            this.wrapper.find(".processing").remove();
            if (a) return this.wrapper.css({
                width: "",
                height: ""
            }), this.wrapper.find(".modal-inner").show(), this.showClose(), this;
            a = this.wrapper.find(".modal-inner");
            var b = [a.outerWidth(), a.outerHeight()];
            b[0] && b[1] ? (this.wrapper.css({
                width: b[0],
                height: [b[1]],
                marginLeft: -1 * b[0] / 2
            }), a.show()) : this.wrapper.css({
                width: "",
                height: ""
            });
            this.showClose();
            return this
        },
        contents: function(a) {
            a || this.wrapper.find(".modal-content").empty();
            this.wrapper.find(".modal-content").html(a)
        },
        close: function() {
            $(".megawrap").show();
            null != this.wrapper && (this.instanceConfig && this.instanceConfig.closeCallback && this.instanceConfig.closeCallback(), this.stopLoading(!0), this.wrapper.css({
                width: "",
                height: ""
            }), this.wrapper.find(".modal-content").empty(), this.wrapper.find(".modal-title").remove(), this.wrapper.hide(), this.instanceConfig = {}, $(document).off("keyup.popup"), Overlay.hide())
        },
        setOpt: function(a, b) {
            this.instanceConfig[a] = b
        }
    },
    Popup = {
        cache: {},
        config: {
            ajax: !1,
            hasClose: !0,
            closeBtnSelector: !1,
            className: "",
            fadeSpeed: 250,
            overlay: !0,
            innerlay: "",
            cssPosition: "fixed",
            onEscClose: !0,
            clickClose: !0,
            business: !1,
            overridePosition: !1
        },
        instanceConfig: {},
        overlay: null,
        wrapper: null,
        loading: !1,
        init: function() {
            this.overlay &&
                this.close(!1, !0);
            this.overlay = $("<div></div>").addClass("overlay popup").hide().appendTo(document.body);
            var a = this;
            if (this.instanceConfig.clickClose) this.overlay.on("click", function(b) {
                $(b.target).hasClass("overlay") && a.overlay.fadeOut(250, function() {
                    a.close()
                })
            });
            this.wrapper = $("<div>").addClass("modal").append($('<div class="modal-inner"></div>').append('<div class="modal-content"></div>')).appendTo(this.overlay).hide();
            $("<a>", {
                href: "javascript: void(0);",
                "class": "modal-close"
            }).click(function() {
                Popup.close()
            }).appendTo(this.wrapper);
            this.loaded = !0
        },
        resize: function() {
            this.wrapper.animate({
                height: this.wrapper.find(".modal-content").outerHeight(),
                width: this.wrapper.find(".modal-content").outerWidth()
            }, function() {
                Popup.setPosition()
            })
        },
        setTitle: function(a) {
            this.wrapper.find(".modal-title").text(i18n.get(a))
        },
        open: function(a, b) {
            if (HFN.config.isMobile()) return MobilePopup.init(), Popup = MobilePopup, Popup.open(a, b);
            b = this.instanceConfig = $.extend({}, this.config, b);
            this.init();
            this.overlay.show();
            this.wrapper.find(".modal-inner .modal-title").remove();
            b.title && (void 0 != b.dont_translate_title && !0 == b.dont_translate_title ? this.wrapper.find(".modal-inner").prepend($('<div class="modal-title"></div>').append($('<div class="modal-title-text cwrap"></div>').text(b.title).attr("title", b.title))) : this.wrapper.find(".modal-inner").prepend($('<div class="modal-title"></div>').append($('<div class="modal-title-text cwrap"></div>').text(i18n.get(b.title)).attr("title", i18n.get(b.title)))));
            b.business ? this.wrapper.addClass("businessmodal") : this.wrapper.removeClass("businessmodal");
            b.className && this.wrapper.addClass(b.className);
            if (b.onEscClose) $(window).off("keyup.popup").on("keyup.popup", function(a) {
                console.log("closing popup");
                27 === a.keyCode && Popup.close()
            });
            console.log("POPUP", b.hasClose, $(".modal .modal-close"));
            $(".modal .modal-close").show();
            b.hasClose ? $(".modal-close").show() : $(".modal-close").hide();
            b.ajax ? (this.contents(""), this.loading(), this.cache[a] ? this.show(Popup.cache[a]) : $.get(a, {}, function(b) {
                Popup.cache[a] = b;
                Popup.show(b)
            })) : "string" != typeof a || "#" != a.substring(0,
                1) && "." != a.substring(0, 1) ? this.show(a, b.fadeSpeed) : this.show($(a).clone().css("display", ""), b.fadeSpeed)
        },
        show: function(a, b) {
            this.contents(a);
            "function" == typeof this.instanceConfig.setPosition ? this.instanceConfig.setPosition() : this.setPosition();
            this.instanceConfig.closeBtnSelector && $(this.instanceConfig.closeBtnSelector).click(function() {
                Popup.close()
            });
            this.wrapper.fadeIn(250);
            $("html").addClass("modal-open")
        },
        setPosition: function() {
            this.wrapper.outerWidth();
            this.wrapper.outerHeight();
            this.instanceConfig.overridePosition &&
                this.wrapper.css(this.instanceConfig.overridePosition)
        },
        animateTo: function(a, b) {
            this.wrapper.css("position", "fixed");
            this.wrapper.animate({
                width: a,
                height: b
            }, 500, function() {})
        },
        prepAnimate: function() {
            null != this.wrapper && this.wrapper.css({
                width: this.wrapper.width(),
                height: this.wrapper.height()
            })
        },
        hideClose: function() {
            null != this.wrapper && this.wrapper.find(".modal-close").hide()
        },
        showClose: function() {
            this.wrapper.find(".modal-close").show()
        },
        hideModalCont: function() {
            null != this.wrapper && this.wrapper.find(".modal-inner").hide()
        },
        showModalCont: function() {
            null != this.wrapper && this.wrapper.find(".modal-inner").show()
        },
        startLoading: function(a) {
            if (null == this.wrapper) return !1;
            this.stopLoading(!0);
            a = $.extend({}, {
                processExplain: i18n.get("Loading ..."),
                processStopText: i18n.get("Stop"),
                stopCallback: !1,
                fast: !1
            }, a);
            this.prepAnimate();
            this.hideModalCont();
            this.hideClose();
            this.wrapper.append('<div class="processing"><div class="information"></div></div>');
            a.stopCallback && this.wrapper.find(".information").text(a.processExplain).after($('<div class="stopprocess"></div>').append($('<div class="button smallbut stopbut"></div>').append('<img src="//d1q46pwrruta9x.cloudfront.net/img/stop-process.png" width="9" height="9"> ' +
                a.processStopText).on("click", a.stopCallback)));
            var b = this.wrapper.find(".processing"),
                c = [b.outerWidth(), b.outerHeight()];
            this.loading = !0;
            a.now ? (this.wrapper.css({
                width: c[0],
                height: [c[1]]
            }), b.show()) : this.wrapper.animate({
                width: c[0],
                height: [c[1]]
            }, 450, function() {
                b.show()
            })
        },
        stopLoading: function(a) {
            if (null == this.wrapper) return this;
            this.wrapper.stop(!0, !0);
            this.wrapper.find(".processing").remove();
            if (a) return this.wrapper.css({
                    width: "",
                    height: ""
                }), this.wrapper.find(".modal-inner").show(), this.showClose(),
                this;
            var b = this.wrapper.find(".modal-inner");
            a = [b.outerWidth(), b.outerHeight()];
            var c = this;
            console.log("Starting Animation");
            a[0] && a[1] ? this.wrapper.animate({
                width: a[0],
                height: [a[1]]
            }, 450, function() {
                b.show();
                c.showClose();
                c.loading = !1;
                c.onFinishLoad && (c.onFinishLoad(), c.onFinishLoad = null);
                c.wrapper.css("height", "")
            }) : (this.wrapper.css({
                width: "",
                height: ""
            }), this.showClose(), this.loading = !1, this.onFinishLoad && (this.onFinishLoad(), this.onFinishLoad = null));
            return this
        },
        onLoad: function(a) {
            this.onFinishLoad =
                a
        },
        contents: function(a) {
            a || this.wrapper.find(".modal-content").empty();
            this.wrapper.find(".modal-content").html(a)
        },
        close: function(a, b) {
            MobilePopup.close();
            if (null != this.wrapper) {
                this.onFinishLoad = null;
                this.instanceConfig && this.instanceConfig.closeCallback && this.instanceConfig.closeCallback();
                this.stopLoading(!0);
                this.wrapper.css({
                    width: "",
                    height: ""
                });
                this.wrapper.find(".modal-content").empty();
                this.wrapper.find(".modal-title").remove();
                this.wrapper.hide();
                this.wrapper.remove();
                var c = this,
                    d = function() {
                        c.overlay &&
                            (c.overlay.stop().remove(), c.overlay = null);
                        $(c).trigger("mclose");
                        a && a()
                    };
                b ? d() : this.overlay ? this.overlay.fadeOut(250, function() {
                    d()
                }) : d();
                this.instanceConfig = {};
                $(document).off("keyup.popup");
                $("html").removeClass("modal-open")
            }
        },
        setOpt: function(a, b) {
            this.instanceConfig[a] = b
        }
    },
    Overlay = {
        obj: null,
        loaded: null,
        init: function() {
            this.loaded || (this.obj = $("<div/>").addClass("overlay").appendTo(document.body).hide(), this.loaded = !0)
        },
        show: function(a, b, c) {
            void 0 == c && (c = !0);
            a = a || 250;
            this.init();
            this.obj.fadeIn(a).off("click.overlay").on("click.overlay",
                function() {
                    b && b();
                    c && Overlay.hide()
                })
        },
        hide: function() {
            this.obj && (this.obj.stop(), this.obj.hide(), this.obj.off("click.overlay"))
        },
        isShowed: function() {
            return "block" == this.obj.css("display")
        }
    };

function folderBreadcrumb(a, b) {
    HFN.apiMethod("getbreadcrumb", {
        folderid: a,
        getkeys: 1
    }, function(a) {
        console.log("list", a);
        var d = [];
        a = a.breadcrumb;
        for (var e = 0; e < a.length; ++e) a[e].key && pCloudCrypto.saveKey(a[e].metadata.id, a[e].key), d.push(a[e].metadata);
        if (d[d.length - 1].encrypted) {
            do d.shift(); while (!d[0].encrypted)
        }
        b(d)
    })
}

function encryptedFolderBreadcrumb(a, b) {
    HFN.apiMethod("getbreadcrumb", {
        folderid: a
    }, function(a) {
        console.log("list", a);
        var d = [];
        a = a.breadcrumb;
        for (var e = 0; e < a.length; ++e) d.push(a[e].metadata);
        if (d[d.length - 1].encrypted) {
            do d.shift(); while (!d[0].encrypted)
        }
        b(d)
    })
}

function publicFolderBreadcrumb(a, b, c) {
    console.log("PUBLIC BREADCRUMB", arguments);
    var d = {},
        e, f, g, k = [];
    e = function(a) {
        g(a);
        c(k)
    };
    g = function(a) {
        k.unshift(d[a]);
        0 <= d[a].parentfolderid && g(d[a].parentfolderid)
    };
    f = function(a, b) {
        if (a.isfolder) {
            d[a.folderid] = a;
            for (var c = 0; c < a.contents.length; ++c) f(a.contents[c], 1 + b)
        }
    };
    HFN.apiMethod("showpublink", {
        code: a
    }, function(a) {
        f(a.metadata, 1);
        return e(b)
    });
    return 0
}

function trashFolderBreadcrumb(a, b) {
    console.log("TRASH BREADCRUMB", arguments);
    var c = {},
        d, e, f, g = [];
    d = function(a) {
        console.log("before bread");
        f(a);
        console.log("has bread");
        b(g)
    };
    f = function(a) {
        g.unshift(c[a]);
        0 <= c[a].parentfolderid && f(c[a].parentfolderid)
    };
    e = function(a, b) {
        if (a.isfolder) {
            c[a.folderid] = a;
            for (var d = 0; d < a.contents.length; ++d) e(a.contents[d], 1 + b)
        }
    };
    HFN.apiMethod("trash_list", {
        folder: 0,
        recursive: 1,
        nofiles: 1
    }, function(b) {
        e(b.metadata, 1);
        return d(a)
    }, {});
    return 0
}

function buildTrashBreadcrumb(a) {
    for (var b = $("<div>").addClass("folders"), c = 0, d; c < a.length; ++c) d = $("<span>"), "/" == a[c].name ? d.html("<b>" + i18n.get("Trash") + "</b>") : d.text(a[c].name), a.length - 1 == c ? d.addClass("current") : function(a) {
        d.on("click", function(b) {
            $.bbq.pushState({
                folder: a.folderid,
                page: "trash"
            }, 2)
        })
    }(a[c]), d.appendTo(b), c < a.length - 1 && b.append(' <img src="//d1q46pwrruta9x.cloudfront.net/img/bread.png" width="25" height="9" alt=""> ');
    return b
}

function buildBreadcrumb(a, b, c) {
    console.log("breadcrumbing", a);
    void 0 == c && (c = !0);
    for (var d = $("<div>").addClass("folders"), e = 0, f; e < a.length; ++e) {
        f = $("<span>");
        "/" == a[e].name ? f.html("<b>" + i18n.get("My pCloud") + "</b>") : "Crypto Folder" == a[e].name ? f.html('<img src="/img/lock.png" width="14" height="16" class="bread-img"><b>Crypto Folder</b>') : c ? f.text(HFN.metaName(a[e])) : f.html(HFN.metaName(a[e]));
        if (a.length - 1 == e) f.addClass("current");
        else f.on("click", {
            meta: a[e]
        }, function(a) {
            var c = {
                page: "filemanager"
            };
            0 < a.data.meta.folderid && (c.folder = a.data.meta.folderid);
            $.bbq.getState("tpl") && (c.tpl = $.bbq.getState("tpl"));
            b && (c.page = "publink", c.code = b);
            $.bbq.pushState(c, 2)
        });
        f.appendTo(d);
        e < a.length - 1 && d.append(' <img src="//d1q46pwrruta9x.cloudfront.net/img/bread.png" width="25" height="9" alt=""> ')
    }
    return d
}

function buildEncryptedBreadcrumb(a, b, c) {
    console.log("breadcrumbing", a);
    void 0 == c && (c = !0);
    for (var d = $("<div>").addClass("folders"), e = 0, f; e < a.length; ++e) {
        f = $("<span>");
        "/" == a[e].name ? f.html("<b>" + i18n.get("My pCloud") + "</b>") : "Crypto Folder" == a[e].name ? f.html('<img src="/img/lock.png" width="14" height="16" class="bread-img"><b>Crypto Folder</b>') : c ? f.text(a[e].name) : f.html(a[e].name);
        if (a.length - 1 == e) f.addClass("current");
        else f.on("click", {
            meta: a[e]
        }, function(a) {
            var c = {
                page: "encrypted"
            };
            0 < a.data.meta.folderid &&
                (c.folder = a.data.meta.folderid);
            $.bbq.getState("tpl") && (c.tpl = $.bbq.getState("tpl"));
            b && (c.page = "publink", c.code = b);
            $.bbq.pushState(c, 2)
        });
        f.appendTo(d);
        e < a.length - 1 && d.append(' <img src="//d1q46pwrruta9x.cloudfront.net/img/bread.png" width="25" height="9" alt=""> ')
    }
    return d
}

function buildBreadcrumbSimple(a) {
    for (var b = $("<div>").addClass("folders"), c = 0, d; c < a.length; ++c) d = $("<span>").html(0 == c ? "<b>" + a[c].name + "</b>" : a[c].name), a.length - 1 == c && d.addClass("current"), d.appendTo(b), c < a.length - 1 && b.append(' <img src="//d1q46pwrruta9x.cloudfront.net/img/bread.png" width="25" height="9" alt=""> ');
    return b
}

function dump(a, b) {
    var c = "";
    b || (b = 0);
    for (var d = "", e = 0; e < b + 1; e++) d += "    ";
    if ("object" == typeof a)
        for (var f in a) e = a[f], "object" == typeof e ? (c += d + "'" + f + "' ...\n", c += dump(e, b + 1)) : c += d + "'" + f + "' => \"" + e + '"\n';
    else c = "===>" + a + "<===(" + typeof a + ")";
    return c
}
var daGrid, currentFolder, defaultOpts;

function triggerOpenFolder(a, b, c, d) {
    currentFolder = a;
    console.log("listing folder", a, arguments);
    b = $.extend({}, defaultOpts, b);
    b.template = -1 != ["folderlist", "foldergrid", "albumgrid"].indexOf($.bbq.getState("tpl")) ? $.bbq.getState("tpl") : b.template;
    b.folderid = a;
    if (c.filter || c.q) b.paging = 30;
    daGrid && ($(window).off(".grid"), $(document).off(".grid"), $("*").off(".grid"), daGrid.cleanUp());
    daGrid = new Gridlist({
        options: b,
        dataSource: function(b) {
            c.q ? HFN.listSearch(c.q, c.filter, function(a) {
                b(a);
                d(a)
            }, c) : HFN.listFolder(a,
                function(a) {
                    b(a);
                    d(a)
                }, c)
        }
    })
}

function triggerOpenEncryptedFolder(a, b, c) {
    currentFolder = a;
    console.log("listing folder", a, arguments);
    b = $.extend({}, defaultOpts, b);
    b.template = "encryptedfolderlist";
    b.folderid = a;
    b.emptytitle = __("empty_encrypted_folder", "You have no encrypted files in this folder.");
    if (c.filter || c.q) b.paging = 30;
    daGrid && ($(window).off(".grid"), $(document).off(".grid"), $("*").off(".grid"), daGrid.cleanUp());
    daGrid = new Gridlist({
        options: b,
        dataSource: function(b) {
            c.q ? HFN.listSearch(c.q, c.filter, function(a) {
                b(a)
            }, c) : HFN.listEncryptedFolder(a,
                function(a) {
                    b(a)
                }, c)
        }
    })
}

function triggerOpenPublicFolder(a, b) {
    console.log("OPEN FOLDER", b);
    daGrid = new Gridlist({
        options: $.extend({}, {
            place: b.place,
            template: $.bbq.getState("tpl") || "publicfolderlist",
            paging: 5E3,
            onOpen: "triggerOpenPublicFolder",
            cheadtpl: "#pubcheadtmpl",
            templateswitch: !0
        }, b),
        dataSource: function(c) {
            HFN.listPublicFolder(b.code, a, function(a) {
                console.log("loaded data: ", a);
                c(a)
            })
        }
    })
}

function triggerOpenTrashFolder(a, b) {
    daGrid = new Gridlist({
        options: $.extend({}, {
            place: b.place,
            template: "trash",
            paging: 5E3
        }, b),
        dataSource: function(b) {
            HFN.megaLoad.show();
            HFN.listTrashFolder(a, function(a) {
                console.log("loaded data: ", a);
                HFN.megaLoad.hide();
                b(a)
            })
        }
    })
}

function triggerOpenFilter(a, b) {
    b = b || defaultOpts;
    b = $.extend({}, b, {
        metadata: {},
        noempty: 1
    });
    daGrid = new Gridlist({
        options: b,
        data: []
    });
    FileSelection.reset();
    console.log("flow start");
    HFN.listFolderFlow(0, a, daGrid)
}

function triggerOpenSongs(a) {
    daGrid = new Gridlist({
        options: $.extend({}, {
            place: a.place,
            template: "songs",
            paging: 30,
            trackPage: !1,
            letterhead: {
                id: "name",
                build: function(a, c, d, e) {
                    a.text(c.title ? c.title.trim().charAt(0).toUpperCase() : c.name.trim().charAt(0).toUpperCase())
                },
                genUnique: function(a, c, d) {
                    return a.title ? a.title.trim().charAt(0).toLowerCase() : a.name.trim().charAt(0).toLowerCase()
                }
            }
        }, a),
        dataSource: function(a) {
            HFN.megaLoad.show();
            HFN.listAudio(function(c) {
                console.log("loaded data: ", c);
                HFN.megaLoad.hide();
                a({
                    contents: c
                })
            })
        }
    })
}

function triggerOpenArtists(a) {
    daGrid = new Gridlist({
        options: $.extend({}, {
            place: a.place,
            template: "artists",
            paging: 30,
            trackPage: !1,
            letterhead: {
                id: "name",
                build: function(a, c, d, e) {
                    a.text(c.title ? c.title.charAt(0) : c.name.charAt(0))
                },
                genUnique: function(a, c, d) {
                    return a.title ? a.title.charAt(0) : a.name.charAt(0)
                }
            }
        }, a),
        dataSource: function(a) {
            HFN.megaLoad.show();
            HFN.listArtistList(function(c) {
                console.log("loaded data: ", c);
                HFN.megaLoad.hide();
                a({
                    contents: c
                })
            })
        }
    })
}

function triggerOpenArtist(a, b) {
    daGrid = new Gridlist({
        options: $.extend({}, {
            place: b.place,
            template: "artist",
            paging: 30,
            trackPage: !1,
            title: a,
            letterhead: {
                id: "album",
                build: function(a, b, e, f) {
                    a.append($("<label>").append($('<input type="checkbox" id="ccc">').on("change", function(a) {
                        var c = $(this).prop("checked");
                        console.log("chk", c);
                        console.log("data", b);
                        $(f.itemSelector()).each(function(a) {
                            a = f.getDataByPos($(this).data("n"));
                            b.album == a.album && (c ? f.selectOne(this) : f.deselectOne(this))
                        })
                    })).append((b.album ||
                        "Unknown") + (b.year ? " (" + b.year + ")" : "")))
                },
                genUnique: function(a, b, e) {
                    return a.album || ""
                }
            }
        }, b),
        dataSource: function(b) {
            HFN.megaLoad.show();
            HFN.listArtistList(function(d) {
                console.log("loaded data #2: ", d);
                var e = array_index_of(d, "name", a);
                console.log(e);
                if (-1 != e) {
                    d = d[e];
                    var e = [],
                        f = 0,
                        g;
                    for (console.log("aobj", d); f < d.albums.length; ++f)
                        for (g = 0; g < d.albums[f].songs.length; ++g) e.push(d.albums[f].songs[g]);
                    console.log("sarr", e);
                    b({
                        contents: e
                    })
                }
                HFN.megaLoad.hide()
            })
        }
    })
}

function triggerOpenAlbums(a) {
    console.log("open albums", a);
    daGrid = new Gridlist({
        options: $.extend({}, {
            place: a.place,
            template: "albums",
            paging: 30,
            trackPage: !1
        }, a),
        dataSource: function(a) {
            HFN.megaLoad.show();
            HFN.listArtistList(function(c) {
                console.log("loaded data #2: ", c);
                for (var d = 0, e = [], f = {}, g; d < c.length; ++d)
                    for (var k = 0; k < c[d].albums.length; ++k)
                        if (c[d].albums[k].name.toLowerCase(), c[d].albums[k].id = c[d].albums[k].name + "-" + c[d].name, c[d].albums[k].artist = c[d].name, g = c[d].albums[k].id.toLowerCase(), void 0 ==
                            f[g]) f[g] = e.push(c[d].albums[k]) - 1;
                        else
                            for (var l = 0; l < c[d].albums[k].songs.length; ++l) e[f[g]].songs.push(c[d].albums[k].songs[l]);
                a({
                    contents: e
                });
                HFN.megaLoad.hide()
            })
        }
    })
}

function triggerOpenAlbum(a, b) {
    console.log("open albums", b);
    daGrid = new Gridlist({
        options: $.extend({}, {
            title: a,
            place: b.place,
            template: "artist",
            paging: 30,
            trackPage: !1,
            letterhead: {
                id: "album",
                build: function(a, b, e, f) {
                    a.append($("<label>").append($('<input type="checkbox" id="ccc">').on("change", function(a) {
                        var c = $(this).prop("checked");
                        console.log("chk", c);
                        console.log("data", b);
                        $(f.itemSelector()).each(function(a) {
                            a = f.getDataByPos($(this).data("n"));
                            b.album == a.album && (c ? f.selectOne(this) : f.deselectOne(this))
                        })
                    })).append(b.album +
                        (b.year ? " (" + b.year + ")" : "")))
                },
                genUnique: function(a, b, e) {
                    return a.album || ""
                }
            }
        }, b),
        dataSource: function(b) {
            HFN.megaLoad.show();
            HFN.listArtistList(function(d, e) {
                console.log("loaded data #2: ", d);
                console.log("and the albums: ", e);
                console.log("and the name: ", a);
                var f = array_index_of(e, "name", a.trim());
                console.log(f); - 1 != f && (f = e[f], console.log("aobj", f), b({
                    contents: f.songs
                }));
                HFN.megaLoad.hide()
            })
        }
    })
}

function triggerOpenPlaylists(a) {
    daGrid = new Gridlist({
        options: $.extend({}, {
            place: a.place,
            template: "artist",
            paging: 5E3,
            trackPage: !1,
            letterhead: {
                id: "album",
                build: function(a, c, d, e) {
                    a.append(c.playlist)
                },
                genUnique: function(a, c, d) {
                    return a.playlist || ""
                }
            }
        }, a),
        dataSource: function(a) {
            HFN.megaLoad.show();
            HFN.listPlaylistsSongs(function(c) {
                for (var d = 0, e = 0, f = null, g = []; d < c.length; ++d) c[d].playlist != f && (e = 0, f = c[d].playlist), e++, 6 >= e && g.push(c[d]);
                a({
                    contents: g
                });
                HFN.megaLoad.hide()
            }, {
                forceFresh: !1
            })
        }
    })
}

function triggerOpenPlaylistList(a) {
    daGrid = new Gridlist({
        options: $.extend({}, {
            place: a.place,
            template: "playlists_list",
            paging: 5E3,
            trackPage: !1
        }, a),
        dataSource: function(a) {
            HFN.megaLoad.show();
            HFN.apiMethod("collection_list", {}, function(c) {
                console.log("#1", c.collections);
                for (var d = [], e = 0; e < c.collections.length; ++e) c.collections[e].system || d.push(c.collections[e]);
                console.log("#2", d);
                a({
                    contents: d
                });
                HFN.megaLoad.hide()
            }, {
                forceFresh: !1
            })
        }
    })
}

function triggerOpenPlaylist(a, b) {
    daGrid = new Gridlist({
        options: $.extend({}, {
            place: b.place,
            template: "playlist",
            paging: 5E3,
            trackPage: !1,
            playlistid: a,
            letterhead: {
                id: "playlist",
                build: function(a, b, e, f) {
                    a.append($("<label>").append($('<input type="checkbox" id="ccc">').on("change", function(a) {
                        var c = $(this).prop("checked");
                        console.log("chk", c);
                        console.log("data", b);
                        $(f.itemSelector()).each(function(a) {
                            a = f.getDataByPos($(this).data("n"));
                            b.playlist == a.playlist && (c ? f.selectOne(this) : f.deselectOne(this))
                        })
                    })).append(b.playlist +
                        (b.year ? " (" + b.year + ")" : "")))
                },
                genUnique: function(a, b, e) {
                    return a.playlist || ""
                }
            }
        }, b),
        dataSource: function(b) {
            HFN.megaLoad.show();
            HFN.listPlaylistSongs(a, function(a) {
                console.log("got data", a);
                a.sort(function(a, b) {
                    return a.position - b.position
                });
                console.log(a);
                b({
                    contents: a
                });
                HFN.megaLoad.hide()
            }, {
                forceFresh: !1
            })
        }
    })
}

function triggerIncomingShares(a, b) {
    $(a).length && HFN.apiMethod("listshares", {}, function(b) {
        console.log("shares: ");
        console.log(b);
        $(a + "-ctrl").find("b").remove().end().append("<b>" + b.shares.incoming.length + "</b>");
        daGrid = new Gridlist({
            options: {
                place: a,
                template: (HFN.config.isSite() ? "" : "mobile") + "sharedshares",
                title: i18n.get("Shared with me"),
                paging: 5E3,
                canPreview: !0,
                isRequest: !1,
                direction: "incoming"
            },
            data: b.shares.incoming
        })
    }, {
        forceFresh: b || !1
    })
}

function triggerIncomingRequests(a, b) {
    $(a).length && HFN.apiMethod("listshares", {}, function(b) {
        console.log("shares: ");
        console.log(b);
        daGrid = new Gridlist({
            options: {
                place: a,
                template: HFN.config.isSite() ? "incomingshares" : "mobilesharedshares",
                title: i18n.get("Shared with me"),
                paging: 5E3,
                canPreview: !1,
                isRequest: !0,
                direction: "incoming"
            },
            data: b.requests.incoming
        })
    }, {
        forceFresh: b || !1
    })
}

function triggerSharedWithMe(a, b) {
    $(a).length && (daGrid = new Gridlist({
        options: {
            place: a,
            template: HFN.config.isSite() ? "incomingshares" : "mobilesharedshares",
            title: __("Shared with me"),
            emptytitle: __("There are still no folders shared with you"),
            paging: 5E3,
            sorting: !1,
            letterhead: {
                id: "type",
                build: function(a, b, e, f) {
                    a.text("sharerequestid" in b ? __("Pending Invitations") : __("Accepted"))
                },
                genUnique: function(a, b, e) {
                    return "sharerequestid" in a ? 1 : 0
                }
            }
        },
        dataSource: function(a) {
            HFN.listIncomingShares(function(b) {
                console.log(b);
                a({
                    contents: b
                })
            })
        }
    }))
}

function triggerOpenShares(a, b) {
    $(a).length && (daGrid = new Gridlist({
        options: {
            place: a,
            template: "shares",
            paging: 5E3,
            emptytitle: __("You haven't shared anything yet."),
            sorting: !1
        },
        dataSource: function(a) {
            HFN.listShares(function(b) {
                a({
                    contents: b
                })
            })
        }
    }))
}

function triggerOutgoingShares(a, b) {
    $(a).length && HFN.apiMethod("listshares", {}, function(b) {
        console.log("shares: ");
        console.log(b);
        $(a + "-ctrl").find("b").remove().end().append("<b>" + b.shares.outgoing.length + "</b>");
        daGrid = new Gridlist({
            options: {
                place: a,
                template: (HFN.config.isSite() ? "" : "mobile") + "sharedshares",
                title: i18n.get("Shared with me"),
                paging: 5E3,
                isRequest: !1,
                direction: "outgoing"
            },
            data: b.shares.outgoing
        })
    }, {
        forceFresh: b || !1
    })
}

function triggerOutgoingRequests(a, b) {
    $(a).length && HFN.apiMethod("listshares", {}, function(b) {
        console.log("shares: ");
        console.log(b);
        $(a + "-ctrl").find("b").remove().end().append("<b>" + b.requests.outgoing.length + "</b>");
        daGrid = new Gridlist({
            options: {
                place: a,
                template: (HFN.config.isSite() ? "" : "mobile") + "sharedshares",
                title: i18n.get("Shared with me"),
                paging: 5E3,
                isRequest: !0,
                direction: "outgoing"
            },
            data: b.requests.outgoing
        })
    }, {
        forceFresh: b || !1
    })
}

function loadPublinks(a) {
    $(a).length && HFN.getPublinkList(function(b) {
        console.log("Publink list: ", b);
        $(a + "-ctrl").find("b").remove().end().append("<b>" + b.length + "</b>")
    })
}

function triggerOpenPublinks(a) {
    $(a).length && HFN.getPublinkList(function(b) {
        console.log("Publink list: ", b);
        $(a + "-ctrl").find("b").remove().end().append("<b>" + b.length + "</b>");
        daGrid = new Gridlist({
            options: {
                place: a,
                template: (HFN.config.isSite() ? "" : "mobile") + "publinks",
                title: i18n.get("Public Download Links"),
                paging: 5E3
            },
            data: b
        })
    })
}

function loadPuplinks(a) {
    $(a).length && HFN.getPuplinkList(function(b) {
        console.log("Puplink list: ", b);
        $(a + "-ctrl").find("b").remove().end().append("<b>" + b.length + "</b>")
    })
}

function triggerOpenPuplinks(a) {
    $(a).length && HFN.getPuplinkList(function(b) {
        console.log("Puplink list: ", b);
        $(a + "-ctrl").find("b").remove().end().append("<b>" + b.length + "</b>");
        daGrid = new Gridlist({
            options: {
                place: a,
                template: (HFN.config.isSite() ? "" : "mobile") + "puplinks",
                title: i18n.get("Public Download Links"),
                paging: 5E3
            },
            data: b
        })
    })
}
Date.prototype.toAPIString = function() {
    console.log(this.getTime());
    return "Mon Tue Wed Thu Fri Sat Sun".split(" ")[this.get]
};
Date.prototype.toISOString = function() {
    function a(a) {
        return 10 > a ? "0" + a : a
    }
    return this.getUTCFullYear() + "-" + a(this.getUTCMonth() + 1) + "-" + a(this.getUTCDate()) + "T" + a(this.getUTCHours()) + ":" + a(this.getUTCMinutes()) + ":" + a(this.getUTCSeconds()) + "Z"
};
var Perm = {
        canCreate: function(a) {
            return a.ismine || a.cancreate ? !0 : !1
        },
        canShare: function(a) {
            return a.isfolder && a.ismine ? !0 : !1
        },
        canCopy: function(a) {
            return a.ismine || a.canread ? !0 : !1
        },
        canRename: function(a) {
            return (a.ismine || a.ismount || a.canmodify) && !a.revisionid ? !0 : !1
        },
        canMove: function(a) {
            return (a.ismine || a.ismount || a.candelete) && !a.revisionid ? !0 : !1
        },
        canDelete: function(a) {
            return !a.ismine && !a.candelete || a.revisionid ? !1 : !0
        },
        canUpload: function(a) {
            return a.ismine || a.cancreate ? !0 : !1
        }
    },
    vLinks = {
        filterConverts: function(a) {
            for (var b =
                [], c = 0; c < a.length; ++c) a[c].isoriginal && b.push(a[c]);
            return b
        },
        getOriginal: function(a) {
            for (var b = 0; b < a.length; ++b)
                if (a[b].isoriginal) return a[b]
        },
        getOriginalUrl: function(a) {
            return HFN.prepUrl(this.getOriginal(a))
        },
        getBest: function(a) {
            for (var b = 0, c = -1, d = 0; b < a.length; ++b) "h264" == a[b].videocodec && "mp4" == fileext(a[b].path) && !a[b].rotate && !a[b].isoriginal && d < a[b].videobitrate && (d = a[b].videobitrate, c = b);
            return -1 == c ? this.getOriginal(a) : a[c]
        },
        getBestUrl: function(a) {
            return HFN.prepUrl(this.getBest(a))
        },
        getLowest: function(a) {
            for (var b =
                0, c = -1, d = -1; b < a.length; ++b) "h264" != a[b].videocodec || "mp4" != fileext(a[b].path) || a[b].rotate || a[b].isoriginal || !(d > a[b].videobitrate || -1 == d) || (d = a[b].videobitrate, c = b);
            return -1 == c ? this.getOriginal(a) : a[c]
        },
        getLowestUrl: function(a) {
            return HFN.prepUrl(this.getLowest(a))
        }
    },
    FileSelection = {
        opts: {},
        selection: {},
        ctrlto: null,
        add: function(a) {
            console.log("fs meta", a);
            this.selection[a.id] = a;
            this.prepControls()
        },
        remove: function(a) {
            this.selection[a.id] && delete this.selection[a.id];
            this.prepControls()
        },
        reset: function(a) {
            a =
                a || !1;
            this.selection = {};
            this.prepControls();
            a || (this.opts = {})
        },
        prepControls: function() {
            this.ctrlto && (clearTimeout(this.ctrlto), this.ctrlto = null);
            this.ctrlto = setTimeout(function() {
                HFN.controlsnew.loadControls(fs.getSelectionInfo())
            }, 5)
        },
        hasFolder: function() {
            var a = !1,
                b;
            for (b in this.selection)
                if (this.selection[b].isfolder) {
                    a = !0;
                    break
                }
            return a
        },
        hasFile: function() {
            var a = !1,
                b;
            for (b in this.selection)
                if (!this.selection[b].isfolder) {
                    a = !0;
                    break
                }
            return a
        },
        hasFileAndFolder: function() {
            return this.hasFolder() &&
                this.hasFile()
        },
        getAsQueryString: function() {
            var a = {},
                b, c, d = [];
            for (b in this.selection) c = this.selection[b], c.isfolder ? (void 0 == a.folderids && (a.folderids = []), a.folderids.push(c.folderid)) : (void 0 == a.fileids && (a.fileids = []), a.fileids.push(c.fileid));
            a.fileids && d.push("fileids=" + a.fileids.join(","));
            a.folderids && d.push("folderids=" + a.folderids.join(","));
            return d.join("&")
        },
        getAsParams: function() {
            var a = {},
                b = [],
                c = [],
                d, e;
            for (d in this.selection) e = this.selection[d], e.isfolder ? (void 0 == c && (c = []), c.push(e.folderid)) :
                (void 0 == b && (b = []), b.push(e.fileid));
            b.length && (a.fileids = b.join(","));
            c.length && (a.folderids = c.join(","));
            return a
        },
        filter: function(a, b, c, d) {
            void 0 == d && (d = !0);
            var e = [],
                f = 0;
            c = c || !1;
            d = d ? obLength(b) : 1;
            for (var g; f < a.length; ++f) {
                g = 0;
                for (var k in b) a[f][k] && (!c && a[f][k] == b[k] || c && a[f][k].toLowerCase().match(b[k].toLowerCase())) && g++;
                g >= d && e.push(a[f])
            }
            return e
        },
        getSelectionInfo: function() {
            var a = objToArr(this.selection);
            a.sort(function(a, c) {
                return c.isfolder - a.isfolder
            });
            return a
        },
        getAsArrays: function() {
            var a = {},
                b, c;
            for (b in this.selection) c = this.selection[b], c.isfolder ? (void 0 == a.folderids && (a.folderids = []), a.folderids.push(c.folderid)) : (void 0 == a.fileids && (a.fileids = []), a.fileids.push(c.fileid));
            return a
        },
        hasId: function(a) {
            return void 0 != this.selection[a]
        },
        getAsArray: function() {
            var a = {},
                b;
            for (b in this.selection) {
                var c = this.selection[b],
                    d = this.dataKey(c, !0),
                    c = this.dataValue(c);
                void 0 == a[d] && (a[d] = []);
                a[d].push(c)
            }
            return a
        },
        dataKey: function(a, b) {
            return (a.isfolder ? "folderid" : "fileid") + (b ? "s" : "")
        },
        dataValue: function(a) {
            return a.isfolder ?
                a.folderid : a.fileid
        },
        getAsTree: function() {},
        itemData: function(a) {
            return a.isfolder ? {
                folderids: [a.folderid]
            } : {
                fileids: [a.fileid]
            }
        }
    },
    fs = FileSelection,
    ap = HFN.audioPlayer;

function objToArr(a) {
    var b, c = [];
    for (b in a) a.hasOwnProperty(b) && c.push(a[b]);
    return c
}
var uniqueNum = {
    incr: 0,
    get: function(a) {
        void 0 == this.incr && this.init();
        return (a ? a + "-" : "") + ++this.incr
    }
};
uniqueNum.incr = Math.round(1E3 * Math.random());

function jqLoadScript(a, b) {
    b = $.extend(b || {}, {
        dataType: "script",
        cache: !0,
        url: a
    });
    return jQuery.ajax(b)
}

function jqLoadCSS(a) {
    document.createStyleSheet ? document.createStyleSheet(a) : $('<link rel="stylesheet" type="text/css" href="' + a + '" />').appendTo("head")
}
var batchApiCall = function(a) {
    this.options = $.extend({}, {
        sequential: !1,
        calls: [],
        continueOnError: !1,
        maxConcurentCalls: 50,
        callback: function(a) {
            console.log("Batch finished.", a)
        },
        errorCallback: function(a) {},
        callbackEach: function(a) {}
    }, a);
    this.batchId = uniqueNum.get();
    this.calls = [];
    this.result = [];
    this.run = [];
    this.status = this.concurentCalls = 0;
    this.options.calls.length && this.startBatch()
};
batchApiCall.prototype = {
    WAIT: 0,
    CALL: 1,
    DONE: 2,
    addCall: function(a, b, c) {
        this.options.calls.push({
            method: a,
            params: b,
            opts: c || {}
        });
        this.waitCall()
    },
    execute: function(a) {
        a && (this.options.callback = a);
        this.calls.length ? this.startBatch() : this.options.callback(this.result);
        this.status = 1
    },
    abort: function() {
        console.log("?!?!?!?!? aborting", this.run);
        if (!this.allDone()) {
            for (var a in this.run) this.run[a] && "pending" == this.run[a].state() && this.run[a].abort();
            this.calls = [];
            this.result = [];
            this.run = [];
            console.log("end of abort",
                this.run)
        }
    },
    startCall: function(a) {
        this.result[a] = {
            status: "started"
        };
        this.calls[a] = this.CALL;
        this.concurentCalls++
    },
    waitCall: function(a) {
        this.result.push({
            status: "waiting"
        });
        return this.calls.push(this.WAIT) - 1
    },
    statusCall: function(a) {
        return this.calls[a]
    },
    finishCall: function(a, b) {
        console.log("finishing call", a, b);
        this.calls[a] = this.DONE;
        this.result[a] = b;
        this.concurentCalls -= 1;
        this.allDone() ? (this.status = 2, this.options.callback(this.result)) : this.startBatch()
    },
    isFinished: function() {
        return 2 == this.status
    },
    allDone: function() {
        for (var a = !0, b = 0; b < this.calls.length; ++b)
            if (this.calls[b] != this.DONE) {
                a = !1;
                break
            }
        return a
    },
    startBatch: function() {
        for (var a = this, b = 0; b < this.options.calls.length; ++b)
            if (this.statusCall(b) == this.WAIT) {
                (function(c) {
                    c = a.options.calls[b];
                    c.params.id = a.batchId + "-" + b;
                    a.startCall(b);
                    c.opts.onXhrError = a.options.continueOnError ? c.opts.errorCallback = function(b) {
                        var e = c.params.id.split("-");
                        a.finishCall(e[1], {
                            method: c.method,
                            params: c.params,
                            ret: b
                        })
                    } : c.opts.errorCallback = function(b, c) {
                        a.options.errorCallback(b,
                            c)
                    };
                    c.opts.forceFresh = !0;
                    a.run[b] = HFN.apiMethod(c.method, c.params, function(b) {
                        var e = b.id.split("-");
                        c.opts.successCallback && c.opts.successCallback(b);
                        a.finishCall(e[1], {
                            method: c.method,
                            params: c.params,
                            ret: b
                        })
                    }, c.opts)
                })(this.options.calls[b]);
                if (this.options.sequential) break;
                if (this.options.maxConcurentCalls <= this.concurentCalls) break
            }
    }
};
var tabs = function(a, b) {
    this.tabs = [];
    this.id = a;
    this.current = !1;
    this.opts = b || {};
    console.log(this.opts);
    return this
};
tabs.prototype = {
    add: function(a) {
        $(a[1]).addClass("tabcontent");
        this.tabs.push(a);
        return this
    },
    show: function() {
        var a = $("<div></div>").addClass("ctrl"),
            b;
        for (b in this.tabs)
            if (this.tabs.hasOwnProperty(b)) {
                var c = this.tabs[b],
                    c = $("<span></span>").html(c[0]).data("tab", c).addClass(c[1].substring(1) + "-ctrl").click($.proxy(function(a, b) {
                        var c = $(a.currentTarget).data("tab");
                        $(this.id + ">div.ctrl .sel").removeClass("sel");
                        $(a.currentTarget).addClass("sel");
                        for (var g in this.tabs) {
                            var k = this.tabs[g];
                            if (c[1] ==
                                k[1]) {
                                if (this.current = k[1], $(k[1]).show(), void 0 !== this.opts.hashes) {
                                    var l = {};
                                    console.log(b);
                                    b && !b.usehash || $.bbq.getState(this.opts.hashes) == k[1].substring(1) || (l[this.opts.hashes] = k[1].substring(1), $.bbq.pushState(l))
                                }
                            } else $(k[1]).hide()
                        }
                    }, this));
                a.append(c)
            }
        $(this.id).addClass("tabs").prepend(a);
        this.opts.hashes || $($(this.id + " .ctrl span")[0]).trigger("click");
        return this
    },
    select: function(a, b) {
        for (var c = 0; c < this.tabs.length; ++c) this.tabs[c][1] == a && $($(this.id + " .ctrl span")[c]).trigger("click", {
            usehash: void 0 != b ? b : !0
        })
    }
};
HFN.tutorial = {
    json: "/json/tutorial.en.json",
    pages: void 0,
    page_index: {},
    check: 0,
    hover: !1,
    opened: !1,
    loading: !1,
    page_distribution: void 0,
    current_page: void 0,
    load: function(a) {
        HFN.tutorial.json = "/json/tutorial." + HFN.config.user.language + ".json";
        $.getJSON(HFN.tutorial.json, function(b) {
            HFN.tutorial.pages = b;
            console.log(HFN.tutorial.pages);
            for (var c = 0; c < b.length; c++) HFN.tutorial.page_index[b[c].id] = c;
            a && a(HFN.tutorial)
        })
    },
    next_page: function() {
        HFN.tutorial.show_page((HFN.tutorial.current_page + 1) % HFN.tutorial.pages.length)
    },
    previous_page: function() {
        0 > HFN.tutorial.current_page - 1 ? HFN.tutorial.show_page(HFN.tutorial.pages.length - 1) : HFN.tutorial.show_page((HFN.tutorial.current_page - 1) % HFN.tutorial.pages.length)
    },
    open: function() {
        HFN.tutorial.opened = !0;
        var a;
        a = '<div id="tutorials"><div id="tut-back"><img src="//d1q46pwrruta9x.cloudfront.net/img/tutorial/left-arrow.png" width="60" height="60"/></div><div id="tut-next"><img src="//d1q46pwrruta9x.cloudfront.net/img/tutorial/right-arrow.png" width="60" height="60"></div>';
        a +=
            '<div class="tutorials-header" rel="top">' + i18n.get("Tutorial") + '<span class="close-modal"><img src="//d1q46pwrruta9x.cloudfront.net/img/tutorial/close-tuts.png" width="10" height="12"></span></div>';
        a += '<div class="tutorials-content"><img src="//d1q46pwrruta9x.cloudfront.net/img/loading.gif" class="loader" style="height: 30px; width: 30px; position: absolute; top: 180px; left: 386px" ><img src="" class="tutorial"></div>';
        a += '<div class="tutorials-footer"><h1>' + i18n.get("Loading ...") + "</h1><p></p></div>";
        a += '<div class="tutorials-header" rel="bottom"><div class="tutorials-checkbox"><input type="checkbox" id="show-startup" /><label for="show-startup">' + i18n.get("Don't show again") + '</label><div id="tutorial-close-bottom" style="float: right;">' + i18n.get("Close") + "</div></div></div>";
        a += "</div>";
        a += '<div id="temp-black-screen"></div>';
        $("body").append(a);
        $(window).keydown(function(a) {
            39 == a.keyCode && HFN.tutorial.next_page();
            37 == a.keyCode && HFN.tutorial.previous_page();
            27 == a.keyCode && HFN.tutorial.close()
        });
        $("#tutorial-close-bottom").on("click", function() {
            HFN.tutorial.close()
        });
        $("#tut-back").click(function() {
            HFN.tutorial.previous_page()
        });
        $("#tut-next").click(function() {
            HFN.tutorial.next_page()
        });
        $("#temp-black-screen").click(function() {
            HFN.tutorial.hover || HFN.tutorial.close()
        });
        $("#tutorials .close-modal").click(function() {
            HFN.tutorial.close()
        });
        $("#show-startup").change(function() {
            var a = $(this).prop("checked") ? "1" : "0";
            setcookie("tutns", a, 365)
        });
        "1" == rcookie("tutns") && $("#show-startup").attr("checked",
            "on")
    },
    choose_random_page: function(a, b) {
        for (var c = Math.random(), d = 0; d < b.length; d++) {
            var e = b[d + 1];
            if (b[d] <= c && c < e) {
                HFN.tutorial.show_page(d);
                return
            }
        }
        HFN.tutorial.show_page(HFN.tutorial.pages.length - 1)
    },
    prepare_dist: function(a) {
        void 0 != HFN.tutorial.page_distribution ? a(HFN.tutorial.pages, HFN.tutorial.page_distribution) : HFN.apiMethod("userbonuses", {}, function(b) {
            for (var c = 0, d = [], e = 0; e < HFN.tutorial.pages.length; e++) d.push(0.5), c += 0.5;
            for (e = 0; e < b.steps.length; e++) {
                var f = b.steps[e];
                f.is_done ? (d[HFN.tutorial.page_index[f.page]] =
                    0.001, c += -0.499) : (d[HFN.tutorial.page_index[f.page]] = 2, c += 1.5)
            }
            f = 0;
            b = [];
            b.push(0);
            for (e = 0; e < d.length; e++) f = Math.round(1E4 * (f + d[e] / c)) / 1E4, e == d.length - 1 && (f = 1), b.push(f);
            HFN.tutorial.page_distribution = b;
            a(HFN.tutorial.pages, HFN.tutorial.page_distribution)
        })
    },
    login_hook: function() {
        "1" != rcookie("tutfim") && "1" != rcookie("tutns") && "1" != rcookie("tuts") && (HFN.tutorial.pages ? (setcookie("tuts", "1", 1), HFN.tutorial.prepare_dist(HFN.tutorial.choose_random_page)) : HFN.tutorial.load(function() {
            setcookie("tuts", "1",
                1);
            HFN.tutorial.prepare_dist(HFN.tutorial.choose_random_page)
        }))
    },
    close: function() {
        HFN.tutorial.opened && (HFN.tutorial.loading = !1, HFN.tutorial.opened = !1, $("#tutorials").remove(), $("#temp-black-screen").remove(), HFN.config.auth && HFN.apiMethod("givebonus", {
            bonus: 6,
            check: HFN.tutorial.check
        }, function(a) {
            void 0 != window.steps && steps.load()
        }, {
            errorCallback: function() {}
        }), $(window).unbind("keydown"), "show" == $.bbq.getState("tutorial") && $.bbq.pushState({
            tutorial: ""
        }))
    },
    open_on_page: function(a) {
        void 0 !== HFN.tutorial.page_index[a] &&
            HFN.tutorial.show_page(HFN.tutorial.page_index[a])
    },
    show_page: function(a) {
        if (HFN.config.isSite() && !$.browser.mobile && !HFN.tutorial.loading) {
            HFN.tutorial.loading = !0;
            HFN.tutorial.opened || HFN.tutorial.open();
            HFN.tutorial.current_page = a;
            HFN.tutorial.check |= 1 << a;
            a = HFN.tutorial.pages[HFN.tutorial.current_page];
            $(".tutorials-content img.tutorial").hide();
            $(".tutorials-content img.loader").show();
            var b = 0,
                c = setInterval(function() {
                    for (var a = "Loading ", c = 0; c < b; c++) a += ".";
                    $(".tutorials-footer h1").html(a);
                    b =
                        (b + 1) % 5
                }, 100);
            $(".tutorials-footer p").html("");
            $(".tutorials-header[rel=top]").html(i18n.get("Tutorial") + '<span class="close-modal"><img src="//d1q46pwrruta9x.cloudfront.net/img/tutorial/close-tuts.png" width="10" height="12"></span>');
            $(".close-modal").on("click", function() {
                HFN.tutorial.close()
            });
            $(".tutorials-content img.tutorial").attr("src", a.image).load(function() {
                clearInterval(c);
                $(".tutorials-content img.loader").hide();
                $(".tutorials-content img.tutorial").show();
                $(".tutorials-content img.tutorial").css({
                    height: 374,
                    width: 720
                });
                $(".tutorials-header[rel=top]").html(i18n.get("Tutorial") + ' (<span class="nt">' + (HFN.tutorial.current_page + 1) + " " + i18n.get("of") + " " + HFN.tutorial.pages.length + '</span>)<span class="close-modal"><img src="//d1q46pwrruta9x.cloudfront.net/img/tutorial/close-tuts.png" width="10" height="12"></span>');
                $(".close-modal").on("click", function() {
                    HFN.tutorial.close()
                });
                $(".tutorials-footer h1").html(__(a.title));
                $(".tutorials-footer p").html(__(a.content));
                12 != a.id || HFN.config.user.emailverified ||
                    ($(".tutorials-footer p").prepend('<div class="tutorials-get-app" style="top: 380px; left: 515px;" ><a href="javascript: void(0)" class="tut-invite-button">' + i18n.get("Verify your email") + "</a></div>"), $(".tutorials-footer .tutorials-get-app").on("click", function() {
                    HFN.showVerifyMail()
                }));
                HFN.tutorial.loading = !1
            })
        }
    }
};

function showTutorial() {
    $.bbq.pushState({
        tutorial: "show"
    })
}
HFN.fb_share = {
    defaultSettings: {
        app_id: "397181747048725",
        redirect_uri: "",
        ref: "pCloud",
        extra: "",
        from: "",
        to: "",
        display: "",
        link: "https://www.pcloud.com",
        picture: "https://my.pcloud.com/img/share_thumb.png",
        source: "",
        name: i18n.get("pCloud - Share on Facebook"),
        caption: i18n.get("Come to pCloud and Get 10GB FREE"),
        description: i18n.get("Personal or Professional Cloud Storage. Store everything. Share Anything. On any Device. Sign up now and get 10 GB FREE."),
        properties: "",
        actions: ""
    },
    init: function(a) {
        a = $.extend({},
            HFN.fb_share.defaultSettings, a);
        "" == a.redirect_uri && (a.redirect_uri = window.location.protocol + "//" + window.location.host + "/fbshare.html");
        "" == a.display && (a.display = HFN.config.isMobile() ? "touch" : "popup");
        HFN.fb_share.settings = a
    },
    show: function() {
        var a = [],
            b;
        for (b in HFN.fb_share.settings)
            if (HFN.fb_share.settings.hasOwnProperty(b)) {
                var c = "redirect_uri" == b ? HFN.fb_share.settings[b] + "?" + HFN.fb_share.settings.extra : HFN.fb_share.settings[b];
                "" != c && a.push(b + "=" + encodeURIComponent(c))
            }
        a = "https://www.facebook.com/dialog/feed?" +
            a.join("&");
        window.open(a, "facebook-share-dialog", "width=626,height=436")
    }
};
HFN.newsletter = {
    show: function() {
        var a = (new Date).getTime();
        HFN.apiMethod("newsletter_check", {
            auth: HFN.config.auth,
            _t: a
        }, function(a) {
            a.subscribed ? a.verified ? (a = HFN.renderTemplate(".newsletterModal", {
                title: i18n.get("Thank you for subscribing!"),
                body: i18n.get("Regularly you will get the latest pCloud news and promotions delivered straight to your inbox."),
                button_text: ""
            }), a.find(".butt-area").append(i18n.get("If you want to unsubscribe, use") + ' <a id="unsubscribe-link" href="javascript:void(0)">' + i18n.get("this link") +
                "</a>").append('<br /> <br /> <div class="button smallbut darkbut linebut modernbut" onclick="Popup.close();"> ' + i18n.get("Close") + " </div>"), Popup.open(a, {
                title: "pCloud Newsletter"
            }), $("#newsletter-button").remove(), $("#unsubscribe-link").on("click", function() {
                HFN.apiMethod("newsletter_unsubscribemail", {
                    mail: HFN.config.user.email
                }, function() {
                    Popup.close();
                    HFN.message("Mail sent. Check your mail.")
                })
            })) : (a = HFN.renderTemplate(".newsletterModal", {
                title: i18n.get("Verify your e-mail"),
                body: i18n.get("In the subscribtion mail there is link which you can use to verify your e-mail! If you lost the mail, you can use the button bellow to receive another e-mail from us."),
                button_text: i18n.get("Send mail")
            }), Popup.open(a, {
                title: i18n.get("pCloud Newsletter")
            }), setTimeout(function() {
                $("#newsletter-button").removeClass("disabled").on("click.verifyemail", function(a) {
                    $("#newsletter-button").addClass("disabled").off("click.verifyemail");
                    HFN.apiMethod("sendverificationemail", {}, function() {
                        HFN.message("Mail sent. Check your mail.");
                        Popup.close()
                    })
                })
            }, 2E3)) : (a = HFN.renderTemplate(".newsletterModal", {
                title: i18n.get("pCloud Newsletter"),
                body: i18n.get("Subscribe and stay updated with what's new about pCloud features and promotions!"),
                button_text: i18n.get("SUBSCRIBE")
            }), HFN.config.isMobile() ? MobilePopup.open(a, {
                title: i18n.get("pCloud Newsletter")
            }) : Popup.open(a, {
                title: i18n.get("pCloud Newsletter")
            }), setTimeout(function() {
                $("#newsletter-button").removeClass("disabled").on("click.subscribe", function(a) {
                    $("#newsletter-button").addClass("disabled").off("click.subscribe");
                    HFN.apiMethod("newsletter_subscribe", {
                        mail: HFN.config.user.email
                    }, function() {
                        Popup.close();
                        var a = HFN.renderTemplate(".newsletterModal", {
                            title: i18n.get("Thank you for subscribing!"),
                            body: i18n.get("Regularly you will get the latest pCloud news and promotions delivered straight to your inbox."),
                            button_text: ""
                        });
                        a.find(".butt-area").append("<strong>" + i18n.get("Note") + ": </strong>" + i18n.get("Please check your e-mail!"));
                        Popup.open(a, {
                            title: i18n.get("pCloud Newsletter")
                        });
                        $("#newsletter-button").remove();
                        void 0 != spacelist && spacelist.refresh()
                    })
                })
            }, 2E3))
        })
    }
};
HFN.textView = {
    inited: !1,
    loaded: !1,
    color_scheme: "",
    types: {
        plain: ["txt", "text", "brf", "srt", "pdf"],
        code: "ada adb cob cbl cs d e el for ftn f l lisp m pas pp p clj r scm tcl yaml vbs bas cls dba frm frx nb vb s S asm dart go rhtml phtml pht php phps php3 php3p php4 php5 asc atom atomcat atomsrv es rdf js json xhtml xht xml xsl xsd kml kmz xul csh html htm shtml css csv py scala sh p pas pl pm lhs java hs h h++ hpp hxx hh c++ cpp cxx cc c d diff patch sfv htc tcl tk mml tsv sct wsc rss rb sh sql dtd".split(" ")
    },
    file_extention: function(a) {
        a =
            a.name.split(".");
        return a[a.length - 1]
    },
    is_readable: function(a) {
        var b = HFN.textView;
        b.init();
        return b.types.plain[a] || b.types.code[a] ? !0 : !1
    },
    init: function() {
        var a = HFN.textView;
        if (!a.inited) {
            var b = {},
                c;
            for (c in a.types) {
                b[c] = {};
                for (var d in a.types[c]) b[c][a.types[c][d]] = !0
            }
            a.types = b;
            a.inited = !0
        }
    },
    view: function(a, b) {
        var c = HFN.textView;
        console.log(a, b);
        c.inited || c.init();
        if (c.types.plain[a.extention]) return HFN.getFileLinkBack(a, function(c) {
            HFN.previewDocument(c, a, b)
        }, {
            code: b || !1
        }), !0;
        if (c.types.code[a.extention]) {
            if (!c.loaded) return c.load(function() {
                c.view(a,
                    b)
            }), !0;
            var d = [Math.round(0.7 * $(window).outerWidth()), Math.max(150, Math.round(0.7 * $(window).outerHeight() - 110))],
                e = HFN.renderTemplate(".genericPreview");
            Popup.open(e, {
                title: i18n.get('Preview Document: "') + a.name + '"',
                cssPosition: "fixed"
            });
            Popup.startLoading({
                now: !0
            });
            $.ajax({
                type: "GET",
                url: b ? "https://api.pcloud.com/getpubtextfile?code=" + b + "&fileid=" + a.fileid : "https://api.pcloud.com/gettextfile?auth=" + HFN.config.auth + "&fileid=" + a.fileid,
                dataType: "text",
                success: function(a) {
                    e.find(".prevplc").css({
                        width: d[0] +
                            "px",
                        height: d[1] + "px"
                    }).html('<pre class="prettyprint linenums" style="overflow:scroll; height: ' + (d[1] - 20) + 'px" ></pre>');
                    e.find(".prettyprint").text(a).html();
                    prettyPrint();
                    Popup.stopLoading();
                    setTimeout(function() {
                        prettyPrint()
                    }, 100)
                }
            });
            return !0
        }
        return !1
    },
    load: function(a) {
        var b = HFN.textView;
        if (b.loaded) return a();
        b.loaded = !0;
        $("body").append("<style>.str{color: #EC7600;} .kwd{color: #93C763;} .com{color: #66747B;} .typ{color: #678CB1;} .lit{color: #FACD22;} .pun{color: #F1F2F3;} .pln{color: #F1F2F3;} .tag{color: #8AC763;} .atn{color: #E0E2E4;} .atv{color: #EC7600;} .dec{color: purple; } pre.prettyprint{ border: 0px solid #888; margin: 0; background-color: #000; } ol.linenums{ margin-top: 0; margin-bottom: 0; padding-left: 65px;}.prettyprint {background: #000;} li.L0, li.L1, li.L2, li.L3, li.L4, li.L5, li.L6, li.L7, li.L8, li.L9{ color: #555; list-style-type: decimal; }  li.L1, li.L3, li.L5, li.L7, li.L9 {background: #111;}</style>");
        $.getScript("//d1q46pwrruta9x.cloudfront.net/google-code-prettify/prettify.js", function() {
            a()
        })
    }
};
var labels = {
    pcloud: {
        hasLinkedAccounts: !0,
        hasAccountLangs: !0,
        hasSocialBackup: !0,
        hasFAQtabs: !0,
        hasPlans: !0,
        hasTerms: "/json/article.json",
        siteName: "pCloud",
        domain: "pcloud.com",
        siteLink: "https://www.pcloud.com",
        hasUpgradeInHeader: !0,
        hasLiveChat: !0,
        getLeftMenuItems: function(a, b) {
            var c;
            "files" == a ? (c = [
                [
                    ["root", __("Files"), {
                        page: "filemanager"
                    }, "leftmenu-allfiles.png", "leftmenu-allfiles-active.png"],
                    ["crypto", "Crypto Folder", {
                        page: "filemanager",
                        crypto: 1
                    }, "leftmenu-crypto.png", "leftmenu-crypto-active.png"],
                    ["shares", __("Shares"), {
                        page: "shares",
                        tab: "myshares-tab"
                    }, "leftmenu-shares.png", "leftmenu-shares-active.png"],
                    ["audio", __("Audio"), {
                        page: "audio"
                    }, "leftmenu-player.png", "leftmenu-player-active.png"]
                ],
                [
                    ["snbackup", __("Backups"), {
                        page: "snimport2"
                    }, "leftmenu-backup.png", "leftmenu-backup-active.png"],
                    ["trash", __("Trash"), {
                        page: "trash"
                    }, "leftmenu-trash.png", "leftmenu-trash-active.png"]
                ]
            ], HFN.config.isBusiness() && (c.splice(1, 0, []), c[1].splice(0, 0, ["b_business", __("Business"), {
                    page: "b_account",
                    "tab-baccount": "myaccount"
                },
                "leftmenu-business.png", "leftmenu-business-active.png", [
                    ["b_account", __("Account"), {
                        page: "b_account"
                    }, "leftmenu-myaccount.png", "leftmenu-myaccount-active.png"],
                    ["b_users", __("Users"), {
                        page: "b_users"
                    }, "leftmenu-users.png", "leftmenu-users-active.png"],
                    ["b_teams", __("Teams"), {
                        page: "b_teams"
                    }, "leftmenu-teams.png", "leftmenu-teams-active.png"]
                ]
            ]), HFN.config.user.account.permissions.log_view && (console.log(c[1]), c[1][0][5].push(["b_logs", __("Logs"), {
                page: "b_logs"
            }, "left-log.png", "left-log-active.png"])))) :
                "business" == a && (c = [
                    [
                        ["b_account", __("Account"), {
                            page: "b_account"
                        }, "leftmenu-myaccount.png", "leftmenu-myaccount-active.png"],
                        ["b_users", __("Users"), {
                            page: "b_users"
                        }, "leftmenu-users.png", "leftmenu-users-active.png"],
                        ["b_teams", __("Teams"), {
                            page: "b_teams"
                        }, "leftmenu-teams.png", "leftmenu-teams-active.png"]
                    ]
                ], PCB.permissions.viewLogs() && c[0].push(["b_logs", __("Logs"), {
                    page: "b_logs"
                }, "left-log.png", "left-log-active.png"]));
            console.log("!!!!! MENU", a, c);
            return c
        },
        mobile: {
            getPanelItems: function() {
                return [{
                    title: "My pCloud",
                    link: {
                        page: "filemanager",
                        folder: 0
                    },
                    "class": "root"
                }, {
                    title: "All Files",
                    link: {
                        page: "filemanager",
                        filter: "all",
                        q: "name:"
                    },
                    "class": "allfiles"
                }, {
                    title: "Documents",
                    link: {
                        page: "filemanager",
                        filter: HFN.CATEGORY.DOCUMENT,
                        q: "name:"
                    },
                    "class": "documents"
                }, {
                    title: "Videos",
                    link: {
                        page: "filemanager",
                        filter: HFN.CATEGORY.VIDEO,
                        q: "name:"
                    },
                    "class": "videos"
                }, {
                    title: "Audio",
                    link: {
                        page: "filemanager",
                        filter: HFN.CATEGORY.AUDIO,
                        q: "name:"
                    },
                    "class": "audio"
                }, {
                    title: "Images",
                    link: {
                        page: "filemanager",
                        filter: HFN.CATEGORY.IMAGE,
                        q: "name:"
                    },
                    "class": "images"
                }, {
                    title: "Archives",
                    link: {
                        page: "filemanager",
                        filter: HFN.CATEGORY.ARCHIVE,
                        q: "name:"
                    },
                    "class": "archives"
                }, {
                    separator: !0
                }, {
                    title: "Crypto Folder",
                    link: {
                        page: "cryptomob"
                    },
                    "class": "crypto"
                }, {
                    separator: !0
                }, {
                    title: "Upload files",
                    link: {
                        page: "uploader"
                    },
                    "class": "uploader"
                }, {
                    separator: !0
                }, {
                    title: "My Shares",
                    link: {
                        page: "myshares"
                    },
                    "class": "myshares"
                }, {
                    title: "Shared With Me",
                    link: {
                        page: "sharedwithme"
                    },
                    "class": "sharedwithme"
                }, {
                    title: "Download Links",
                    link: {
                        page: "mylinkspub"
                    },
                    "class": "mylinks"
                }, {
                    title: "Upload Links",
                    link: {
                        page: "mylinkspup"
                    },
                    "class": "mylinkspup"
                }, {
                    title: "Social backups",
                    link: {
                        page: "snimport2"
                    },
                    "class": "socialimport"
                }, {
                    separator: !0
                }, {
                    title: "Contact",
                    link: {
                        page: "contact"
                    },
                    "class": "feedback"
                }, {
                    separator: !0
                }, {
                    title: "Logout",
                    link: {
                        page: "login",
                        pg: "login"
                    },
                    "class": "logout"
                }]
            }
        }
    }
};
labels.coversafe = $.extend({}, labels.pcloud, {
    hasLinkedAccounts: !1,
    hasAccountLangs: !1,
    hasSocialBackup: !1,
    hasFAQtabs: !1,
    hasPlans: !1,
    hasTerms: "https://my.getcoversafe.co.uk/json/coversafe.json",
    siteName: "CoverSafe",
    domain: "getcoversafe.co.uk",
    siteLink: "https://www.getcoversafe.co.uk/",
    registerUrl: "https://www.getcoversafe.co.uk/#register",
    translationReplace: {
        pCloud: "CoverSafe"
    },
    hasUpgradeInHeader: !1,
    hasLiveChat: !1,
    getLeftMenuItems: function(a, b) {
        var c;
        "files" == a ? c = [
            [
                ["root", __("My CoverSafe\u2122"), {
                        page: "filemanager"
                    },
                    "coversafe/leftmenu/leftmenu-home.png", "coversafe/leftmenu/leftmenu-home-active.png"
                ],
                ["document", __("Documents"), {
                    page: "filemanager",
                    filter: HFN.CATEGORY.DOCUMENT,
                    q: "name:"
                }, "coversafe/leftmenu/leftmenu-doc.png", "coversafe/leftmenu/leftmenu-doc-active.png"]
            ],
            [
                ["shares", __("Shares"), {
                    page: "shares"
                }, "coversafe/leftmenu/leftmenu-share.png", "coversafe/leftmenu/leftmenu-share-active.png"]
            ],
            [
                ["history", __("History"), {
                    page: "history"
                }, "coversafe/leftmenu/history.png", "coversafe/leftmenu/history-active.png"],
                ["trash", __("Trash"), {
                    page: "trash"
                }, "coversafe/leftmenu/trash.png", "coversafe/leftmenu/trash-active.png"]
            ],
            [
                ["promo_partners", __('Promo Partners <span class="l-soon">soon</span>'), {
                    page: ""
                }, "coversafe/leftmenu/partners.png", "coversafe/leftmenu/partners.png"],
                ["send", __('Send <span class="l-soon">soon</span>'), {
                    page: ""
                }, "coversafe/leftmenu/send.png", "coversafe/leftmenu/send.png"]
            ]
        ] : "business" == a && (c = [
            [
                ["b_account", __("Account"), {
                    page: "b_account"
                }, "leftmenu-account.png", "leftmenu-account-active.png"],
                ["b_users", __("Users"), {
                    page: "b_users"
                }, "leftmenu-usersn.png", "leftmenu-users.png"],
                ["b_teams", __("Teams"), {
                    page: "b_teams"
                }, "leftmenu-teams.png", "leftmenu-teams-active.png"]
            ]
        ], PCB.permissions.viewLogs() && c[0].push(["b_logs", __("Logs"), {
            page: "b_logs"
        }, "left-log.png", "left-log-active.png"]), c[0].push(["b_shares", __("Business Shares"), {
            page: "b_shares_mn"
        }, "company-shares.png", "company-shares-active.png"]));
        console.log("!!!!! MENU", a, c);
        return c
    },
    mobile: {
        getPanelItems: function() {
            var a = function(a) {
                a.stopImmediatePropagation()
            };
            return [{
                title: "My CoverSafe",
                link: {
                    page: "filemanager",
                    folder: 0
                },
                "class": "root"
            }, {
                title: "Documents",
                link: {
                    page: "filemanager",
                    filter: HFN.CATEGORY.DOCUMENT,
                    q: "name:"
                },
                "class": "documents"
            }, {
                title: "My Shares",
                link: {
                    page: "myshares"
                },
                "class": "myshares"
            }, {
                separator: !0
            }, {
                title: "Upload files",
                link: {
                    page: "uploader"
                },
                "class": "uploader"
            }, {
                separator: !0
            }, {
                title: "Promo Partners",
                link: {
                    callback: a
                },
                "class": "promopartners soon"
            }, {
                title: "Send",
                link: {
                    callback: a
                },
                "class": "send soon"
            }, {
                title: "Alert",
                link: {
                    callback: a
                },
                "class": "alert soon"
            }, {
                separator: !0
            }, {
                title: "Feedback",
                link: {
                    page: "contact"
                },
                "class": "feedback"
            }, {
                separator: !0
            }, {
                title: "Logout",
                link: {
                    page: "login",
                    pg: "login"
                },
                "class": "logout"
            }]
        }
    }
});
(function(a, b, c, d) {
    function e(b, c) {
        this.element = a(b);
        this.settings = a.extend({}, g, c);
        this._defaults = g;
        this._name = f;
        this.init()
    }
    var f = "radioButtons",
        g = {
            onToggle: function(a) {}
        };
    a.extend(e.prototype, {
        init: function() {
            this.element.find("input").on("click.radioButtonsEvents", this.toggle.bind(this));
            this.element.find("label").css("cursor", "pointer")
        },
        toggle: function(b) {
            var c = a(b.target);
            this.element.find(".active").removeClass("active");
            c.parent().addClass("active");
            this.settings.onToggle(b)
        },
        setOn: function() {
            this.element.find('[value="on"]').prop("checked", !0).parent().addClass("active");
            this.element.find('[value="off"]').parent().removeClass("active")
        },
        getValue: function() {
            return this.element.find(".active input").val()
        }
    });
    a.fn[f] = function(b) {
        if (1 === this.length && "string" === typeof b) return a.data(this[0], "plugin_" + f)[b]();
        this.each(function() {
            if (!a.data(this, "plugin_" + f)) a.data(this, "plugin_" + f, new e(this, b));
            else if ("destroy" === b) a.removeData(this, "plugin_" + f), a(this).find("input").off("click.radioButtonsEvents"), a(this).find("label").css("cursor",
                "default");
            else if ("string" === typeof b) a.data(this, "plugin_" + f)[b]()
        });
        return this
    }
})(jQuery, window, document);

function browserSupportsCrypto() {
    for (var a = ["chrome", "chromium", "mozilla"], b = !1, c = 0; c < a.length; ++c) $.browser[a[c]] && (b = !0);
    return b
}

function eventCall(a, b, c) {
    for (var d = 0; d < b; d++) console.log(d), $.ajax("http://api.pcloud.com/" + a, {
        data: {
            userid: 1,
            messagetype: 2,
            messageid: d + 1,
            auth: HFN.config.auth
        },
        success: c
    })
}

function send_events(a) {
    eventCall("event_send", a, function(a) {
        console.log("event sent:", a)
    })
}

function wait_events(a) {
    eventCall("event_diff", a, function() {
        console.log("event received:", res)
    })
}
"undefined" == typeof pCloudCrypto && (pCloudCrypto = {});