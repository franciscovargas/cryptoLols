(function(b) {
    function d(a) {
        var b = $(a.template, a.templateOpt);
        a.text ? b.text(a.text) : a.html && b.html(a.html);
        return b
    }
    var c = function(a) {
        this.opts = $.extend({}, b, a);
        this.events = [];
        this.init();
        this.opts.onInit();
        this.state = {
            script: 0,
            act: 0
        };
        this.objectExistCallCount = 0;
        this.showAct(this.getProps(this.state))
    };
    c.prototype.init = function() {
        var a;
        0 === $(this.opts.overlay.selector()).length && (a = d(this.opts.overlay), this.opts.buttons.close && (this.opts.buttons.close.templateOpt.click || (this.opts.buttons.close.templateOpt.click =
            this.close.bind(this)), $("body").append(d(this.opts.buttons.close))), $("body").append(a))
    };
    c.prototype.getNextAct = function() {
        var a = this.state;
        return this.opts.scripts[a.script].acts[a.act + 1] ? this.opts.scripts[a.script].acts[a.act + 1] : this.opts.scripts[a.script + 1] ? this.opts.scripts[a.script + 1].acts[0] : null
    };
    c.prototype.moveStateForward = function() {
        var a = this.state;
        if (this.opts.scripts[a.script].acts[a.act + 1]) a.act++;
        else {
            if (!this.opts.scripts[a.script + 1]) return null;
            a.script++;
            a.act = 0
        }
        return a
    };
    c.prototype.showAct =
        function(a) {
            var b = this;
            this.highlightCss = $(a.highlight).css(["position", "z-index", "background-color"]);
            $(a.highlight).css({
                position: "relative",
                "z-index": 111
            });
            "rgba(0, 0, 0, 0)" != this.highlightCss["background-color"] && "transparent" != this.highlightCss["background-color"] || $(a.highlight).css("background-color", "#fff");
            clearTimeout(b.rmtimer);
            var c = function() {
                b.rmtimer = setTimeout(function() {
                    b.closeCurrent();
                    b.showAct(a)
                }, 800)
            };
            $(a.highlight).on("remove", c);
            $(a.element).on("remove", c);
            console.log("HLTIP: ",
                a.highlight, a.element);
            $("#hlTips-overlay-2").remove();
            c = $("<div/>", {
                id: "hlTips-overlay-2"
            });
            "table" != $(a.highlight).get(0).nodeName.toLowerCase() && a.highlight && a.element != a.highlight && (this.elementCss = $(a.element).css(["position", "z-index", "background-color"]), $(a.element).css({
                position: "relative",
                "z-index": 113
            }), $(a.highlight).append(c));
            a.noDistraction && $(a.highlight).append(c);
            this.positionViewPort(a.element, function() {
                $(a.element).tooltip({
                    template: '<div class="tooltip hltip-tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
                    html: !0,
                    title: '<div class="pager">' + __("Step %step% of %all%", {
                        step: a.step,
                        all: a.stepsCount
                    }) + "</div>" + a.text + '<div class="module-info"' + (a.hideNext ? ' style="display:none"' : "") + '><button class="button modernbut">' + __("Next Step") + "</button></div>",
                    trigger: "manual",
                    placement: a.placement ? a.placement : "bottom",
                    container: "body"
                }).tooltip("show");
                a.init && a.init(this);
                $(".hltip-tooltip .module-info button").click(this.showNext.bind(this))
            })
    };
    c.prototype.positionViewPort = function(a, b) {
        var c = $("body").height(),
            d = $("body").scrollTop(),
            e = $(a).offset().top,
            f = e - d,
            g = {
                duration: 300,
                complete: b.bind(this)
            };
        f > c / 2 ? $("body").animate({
            scrollTop: e - c / 2
        }, g) : f < d ? $("body").animate({
            scrollTop: 0 < e - 100 ? e - 50 : 0
        }, g) : b.call(this)
    };
    c.prototype.offRemove = function() {
        var a = this.getProps(this.state);
        $(a.highlight).off("remove");
        $(a.element).off("remove")
    };
    c.prototype.closeCurrent = function() {
        var a = this.getProps(this.state);
        $(a.highlight).css(this.highlightCss);
        a.elementCss && ($(a.elementCss).css(this.elementCss), a.elementCss = !1);
        $(a.highlight).off("remove");
        $(a.element).off("remove");
        $(a.element).tooltip("destroy");
        $(".tooltip").remove();
        this.clearEvents()
    };
    c.prototype.clearEvents = function() {
        $.each(this.events, function(a) {
            $(a.object).unbind(a.event + ".hltips")
        });
        this.events = []
    };
    c.prototype.showNext = function() {
        var a;
        this.closeCurrent();
        (a = this.moveStateForward()) ? this.showAct(this.getProps(a)) : this.done()
    };
    c.prototype.showNextButton = function() {
        $(".hltip-tooltip .module-info").show()
    };
    c.prototype.done = function() {
        var a = this;
        $("#hlTips-button-close").remove();
        $(".header:first").tooltip({
            template: '<div class="tooltip hltip-tooltip" role="tooltip"><div class="tooltip-inner"></div></div>',
            html: !0,
            title: a.opts.doneText + '<div class="module-info"><button class="button modernbut">' + __("BINTRO_DONE_BUTTON") + "</button></div>",
            trigger: "manual",
            placement: "bottom",
            container: "body"
        }).tooltip("show");
        $(".hltip-tooltip button").click(function() {
            $(".header:first").tooltip("destroy");
            a.close()
        })
    };
    c.prototype.getProps = function(a) {
        a = $.extend({}, this.opts.scripts[a.script].acts[a.act], {
            step: a.act + 1,
            stepsCount: this.opts.scripts[a.script].acts.length
        });
        a.highlight || (a.highlight = a.element);
        return a
    };
    c.prototype.close = function() {
        this.closeCurrent();
        this.clearEvents();
        $(".hltip-tooltip").remove();
        $("");
        $(this.opts.overlay.selector()).remove();
        if (this.opts.onClose) this.opts.onClose()
    };
    c.prototype.objectExist = function(a, b, c) {
        this.objectExistCallCount++;
        0 < $(a).length && $(a).is(":visible") ? (this.objectExistCallCount = 0, b()) : 20 < this.objectExistCallCount ? c ? c() : this.close() : setTimeout(function() {
            this.objectExist(a,
                b, c)
        }.bind(this), 100)
    };
    c.prototype.bind = function(a, b, c) {
        this.events.push({
            object: a,
            event: b
        });
        $(a).bind(b + ".hltips", c)
    };
    window.hlTips = c
})({
    scripts: [{
        title: "Account Info",
        acts: [{
            element: ".global-settings",
            placement: "top",
            text: __("BINTRO_AI_GLOBAL_SETTINGS")
        }, {
            element: ".baccount-tabs .billing-ctrl",
            highlight: ".baccount-tabs .ctrl",
            text: __("BINTRO_AI_BILLING")
        }, {
            element: ".lnav .b_teams",
            highlight: ".lnav",
            text: __("BINTRO_AI_GO_TO_TEAMS"),
            placement: "right",
            hideNext: !0,
            init: function(b) {
                $(".lnav a").not(":nth(3)").off("click");
                b.bind(".b_teams", "click", function() {
                    b.closeCurrent();
                    var d = function() {
                        setTimeout(function() {
                            b.showNext()
                        }, 400)
                    };
                    b.objectExist(".crteam", function() {
                        daGrid.onReady(d)
                    })
                })
            }
        }]
    }, {
        title: "Teams",
        acts: [{
            element: ".teamacts:first",
            text: __("BINTRO_T_TEAM_ACTIONS"),
            placement: "left",
            init: function(b) {
                $(".teamacts:first img, .teamacts:first .teamonoff").off("click")
            }
        }, {
            element: ".crteam",
            text: __("BINTRO_T_CREATE_TEAM"),
            hideNext: !0,
            init: function(b) {
                $(".crteam").bind("click.hltips", function() {
                    b.offRemove();
                    b.callback =
                        function(d) {
                            b.teamName = d.team.name;
                            b.objectExist(".share-settings", function() {
                                b.closeCurrent();
                                b.moveStateForward();
                                b.showNext()
                            }, function() {
                                b.objectExist('.team:contains("' + b.teamName + '"):first', function() {
                                    b.getNextAct().element = $('.team:contains("' + b.teamName + '"):first');
                                    b.showNext()
                                }, function() {
                                    b.showNext()
                                });
                                b.callback = null
                            })
                    }
                })
            }
        }, {
            element: ".team:first",
            placement: "right",
            highlight: ".bteams table",
            text: __("BINTRO_T_OPEN_TEAM"),
            hideNext: !0,
            init: function(b) {
                var d = b.getProps(b.state);
                $(".bteams table .sortable").off("click");
                $(".bteams .team, .bteams .teamacts img, .bteams .teamonoff").not(d.element).off("click");
                $(this.element).click(function() {
                    b.closeCurrent();
                    b.objectExist(".share-settings", function() {
                        b.showNext()
                    })
                })
            }
        }]
    }, {
        title: "Team Page",
        acts: [{
            element: ".share-settings",
            text: __("BINTRO_TP_SHARE_SETTINGS"),
            placement: "top"
        }, {
            element: "table.adminsettings",
            text: __("BINTRO_TP_ADMIN_SETTINGS"),
            placement: "top"
        }, {
            element: ".invusers",
            text: __("BINTRO_TP_ADD_TO_TEAM"),
            hideNext: !0,
            init: function(b) {
                b.bind(".invusers", "click",
                    function() {
                        b.objectExist(".modal .greenbut", function() {
                            $(".modal .greenbut").click(b.showNext.bind(b))
                        })
                    })
            }
        }, {
            element: ".b_users",
            highlight: ".lnav",
            placement: "right",
            text: __("BINTRO_TP_GO_TO_USERS"),
            hideNext: !0,
            init: function(b) {
                $(".lnav a").not(":nth(2)").off("click");
                b.bind(".b_users", "click", function() {
                    b.closeCurrent();
                    b.objectExist(".busers table", function() {
                        b.getNextAct().element = '.busers td:contains("' + HFN.config.user.email + '") .username';
                        b.showNext()
                    })
                })
            }
        }]
    }, {
        title: "Users",
        acts: [{
            element: ".busers table .username:first",
            highlight: ".busers table",
            text: __("BINTRO_U_VIEW_PROFILE"),
            hideNext: !0,
            init: function(b) {
                var d = b.getProps(b.state);
                $(".busers .sortable").off("click");
                $(".busers .username, .busers .team, .busers img, .busers .teamonoff").not(d.element).off("click");
                b.bind(d.element, "click", function() {
                    b.closeCurrent();
                    b.objectExist(".userinfo", function() {
                        b.showNext()
                    })
                })
            }
        }]
    }, {
        title: "User manage",
        acts: [{
            element: ".userinfo .actions",
            highlight: ".userinfo .actions",
            text: __("BINTRO_UM_ACTIONS"),
            init: function() {
                $(".userinfo .actions img").off("click")
            }
        }, {
            element: ".teamtbl",
            text: __("BINTRO_UM_TEAMS"),
            placement: "top",
            init: function() {
                $(".teams .team, .teams .userteamacts img").off("click")
            }
        }, {
            element: ".share-settings",
            text: __("BINTRO_UM_SHARE_SETTINGS"),
            placement: "top"
        }, {
            element: "table.adminsettings",
            text: __("BINTRO_UM_ADMIN_SETTINGS"),
            placement: "top"
        }]
    }],
    doneText: __("BINTRO_DONE_TEXT"),
    onInit: function() {
        $(".upload-container").data("org-opacity", $(".upload-container").css("opacity"));
        $(".upload-container").data("org-z-index", $(".upload-container").css("z-index"));
        $(".upload-container").css({
            opacity: 0.3,
            "z-index": 18
        })
    },
    onClose: function() {
        $(".upload-container").css({
            opacity: $(".upload-container").data("org-opacity"),
            "z-index": $(".upload-container").data("org-z-index")
        });
        $("#hlTips-overlay-2, #hlTips-button-close").remove();
        HFN.pages.pagesobj[$.bbq.getState("page")].onComplete()
    },
    overlay: {
        template: "<div/>",
        templateOpt: {
            id: "hlTips-overlay"
        },
        selector: function() {
            return "#" + this.templateOpt.id
        }
    },
    buttons: {
        close: {
            template: "<button/>",
            templateOpt: {
                id: "hlTips-button-close"
            },
            html: __("SKIP_TUTORIAL"),
            selector: function() {
                return "#" + this.templateOpt.id
            }
        }
    }
});