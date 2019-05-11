$(document).ready(function() {
    function e(e) {
        return e && !/^(f|ht)tps?:\/\//i.test(e) && (e = window.location.protocol + e), e
    }



    function n() {
        var e = $("#svg-budget"),
            t = {
                name: "Budget",
                children: $.parseJSON(e.attr("data-json"))
            },
            n = a(t),
            i = e.width(),
            r = e.height(),
            l = d3.scale.linear().domain([0, 35]).range(["#ef5c59", "#ffffff"]),
            c = d3.select("#svg-budget").append("div").style("position", "relative"),
            d = d3.layout.treemap().size([i, r]).sticky(!0).value(function(e) {
                return e.value
            });
        c.datum(t).selectAll(".node").data(d.nodes).enter().append("div").attr("class", "node").call(s).style("background-color", function(e) {
            return l(o(e.value, n))
        }).append("div").attr("class", "texte").html(function(e) {
            return e.children ? null : "<p>" + e.name + "</p><p>" + Math.round(e.value) + " €</p>"
        })
    }




    function i() {
        $(".pages").removeClass("first-hovered second-hovered third-hovered first-open second-open third-open"), $(".ctn-page").removeClass("open close"), $(".page-tabslist-tab-content.open, .tab-content-participant-links.open, .tab-content-credit-details.open").css("height", 0).removeClass("open").addClass("closed"), $("#step-1.hide").removeClass("hide"), $("#step-2").not(".hide").addClass("hide"), l.width() < 800 && $(".page").each(function() {
            $(this).scrollTop(0)
        })
    }

    function r() {
        $(".page-tabslist-tab-content.open, .tab-content-participant-links.open, .tab-content-credit-details.open").css("height", 0).removeClass("open").addClass("closed"), $(".page").each(function() {
            $(this).scrollTop(0)
        })
    }


    var l = $(window),
        c = (window, !1);
    if (l.width() < 800 && (c = !0, $("#pages").addClass("not-animated").removeClass("out"), $("#prompter").remove()), l.on("resize", function() {
            c = l.width() < 800, n()
        }), function() {
            for (var e = 0, t = ["ms", "moz", "webkit", "o"], n = 0; n < t.length && !window.requestAnimationFrame; ++n) window.requestAnimationFrame = window[t[n] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[n] + "CancelAnimationFrame"] || window[t[n] + "CancelRequestAnimationFrame"];
            window.requestAnimationFrame || (window.requestAnimationFrame = function(t, n) {
                var a = (new Date).getTime(),
                    o = Math.max(0, 16 - (a - e)),
                    s = window.setTimeout(function() {
                        t(a + o)
                    }, o);
                return e = a + o, s
            }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(e) {
                clearTimeout(e)
            })
        }(), $("#intro").length) {
        var d, u = $("#intro"),
            p = setInterval(function() {
                var e = u.find(".intro-step.out").first();
                if (e.removeClass("out"), e.index() == u.find(".intro-step").length - 1) return clearInterval(p), setTimeout(function() {
                    $("#circles .section-circles-ctn .hidden").first().removeClass("hidden").addClass("playing"), d = setInterval(function() {
                        var e = $("#circles .section-circles-ctn"),
                            t = e.find(".playing"),
                            n = t.next("img").length ? t.next("img") : e.find("img").first();
                        t.removeClass("playing").addClass("hidden"), n.removeClass("hidden").addClass("playing")
                    }, 5e3)
                }, 2500), !1
            }, 1400);
        $("#intro-skip button").on("click", function(e) {
            function t() {
                clearInterval(d), $("#circles .section-circles-ctn .playing").removeClass("playing").addClass("hidden"), $("#circles").removeClass("animated").addClass("out"), u.addClass("out"), a.removeClass("out");
                var e = document.title,
                    t = window.location.href.replace(/\/$/, "") + "/menu";
                History.pushState(null, e, t), setTimeout(function() {
                    u.remove()
                }, 410)
            }
            var a = $("#pages"),
                o = $("html").attr("lang");
            if (a.attr("data-lang") == o) t();
            else {
                var s = $(this),
                    i = s.attr("data-loading"),
                    r = a.attr("data-baseurl");
                s.html(i), $.ajax({
                    type: "post",
                    url: r + "/set-content/get-correct-language",
                    data: {
                        lang: o
                    },
                    success: function(e) {
                        a.html(e).attr("data-lang", o), t(), n()
                    },
                    error: function(e, t, n) {}
                })
            }
        }), $(document).on("click", ".change-language", function() {
            $(this);
            var t = $(".content-lang").not(".hide"),
                n = $(".content-lang.hide"),
                a = n.attr("data-lang"),
                o = e(n.attr("data-url"));
            History.replaceState(null, document.title, o), $("html").attr("lang", a), t.addClass("hide"), n.removeClass("hide")
        })
    }
    $(document).on({
        mouseenter: function() {
            if (!c) {
                var e = ["first", "second", "third"][$(this).index()] + "-hovered";
                $(".pages").addClass(e)
            }
        },
        mouseleave: function() {
            if (!c) {
                var e = ["first", "second", "third"][$(this).index()] + "-hovered";
                $(".pages").removeClass(e)
            }
        },
        "click touchstart": function(e) {
            var t = $(this),
                n = ["first", "second", "third"][t.index()] + "-open";
            e.preventDefault(), l.width() < 800 && r(), $(".pages").removeClass("first-hovered second-hovered third-hovered first-open second-open third-open").addClass(n), t.removeClass("close").addClass("open"), $(".ctn-page").not(t).removeClass("open close").addClass("close");
            var a = window.location.href,
                o = t.attr("data-uid");
            _newTitle = document.title, _newHref = a.substr(0, a.lastIndexOf("/")) + "/" + o, History.pushState(null, _newTitle, _newHref)
        }

    },


     ".ctn-page:not(.open)"), $(document).on("click", ".page-close", function(e) {
        i(), e.stopPropagation();
        var t = window.location.href,
            n = document.title,
            a = t.substr(0, t.lastIndexOf("/")) + "/menu";
        History.pushState(null, n, a)
    }),

     $(document).on("click", ".page-tabslist-tab", function() {
        var e = $(this),
            n = e.closest(".page"),
            a = e.next(".page-tabslist-tab-content");
        if (a.hasClass("closed")) {
            var o = a.find(".height-container").outerHeight();
            a.css("height", o).removeClass("closed").addClass("open"), t(o, a, n, !0)
        } else a.hasClass("open") && a.css("height", 0).removeClass("open").addClass("closed")
    }), 

     $(document).on("click", ".tab-content-participant, .tab-content-credit", function() {
        var e = $(this),
            n = e.next(".tab-content-participant-links, .tab-content-credit-details"),
            a = e.closest(".page-tabslist-tab-content, .page-tabslist-tab-content"),
            o = a.outerHeight(),
            s = n.find(".height-container").outerHeight(),
            i = e.closest(".page");
        n.hasClass("closed") ? (n.css("height", s).removeClass("closed").addClass("open"), a.css("height", o + s), t(s, n, i, !1)) : n.hasClass("open") && (n.css("height", 0).removeClass("open").addClass("closed"), a.css("height", o - s))
    }), n(), $(document).on("click", "#page-watch button", function(e) {
        var t = $(this);
        "yes" == t.val() ? ($("#step-1").addClass("hide"), $("#step-2").removeClass("hide")) : "no" == t.val() && i(), e.stopPropagation()
    }), 

    $(document).on("click", "#page-languages button", function(e) {
        var t = $(this),
            n = (t.val(), t.attr("data-href"));
        t.closest(".page").addClass("hide"), $("#pages").addClass("closing"), setTimeout(function() {
            window.location = n
        }, 210), e.stopPropagation()
    })
});