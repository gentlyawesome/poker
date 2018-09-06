function poker(connection) {
    var connection = connection();
    var currentTable = "";
    var aZ = {};
    aZ.clientVersion = "4.49";
    aZ.copyright = "2016";
    aZ.actionQueue = [];
    aZ.audio = {};
    aZ.bytesIn = 0;
    aZ.bytesInList = [];
    aZ.bytesOut = 0;
    aZ.bytesOutList = [];
    aZ.color = {};
    aZ.connected = false;
    aZ.crc = {};
    aZ.data = {};
    aZ.debug = [];
    aZ.debugShowing = false;
    aZ.debugStatsTimer = null ;
    aZ.debugTimer = null ;
    aZ.deck = "";
    aZ.doc = {};
    aZ.arrowD = "&#9660;";
    aZ.arrowL = "&#9664;";
    aZ.arrowR = "&#9654;";
    aZ.arrowU = "&#9650;";
    aZ.eSeed = "";
    aZ.firstError = true;
    aZ.focused = null ;
    aZ.hasTouch = "ontouchstart"in document;
    aZ.lang = {};
    aZ.lobby = null ;
    aZ.local = {};
    aZ.loginData = {};
    aZ.licenseType = "";
    aZ.lobbyChatQueue = [];
    aZ.loggedIn = false;
    aZ.lurking = false;
    aZ.maxAvatar = 64;
    aZ.minAvatar = 1;
    aZ.mobile = false;
    aZ.mouse = true;
    aZ.newAccounts = false;
    aZ.params = {};
    aZ.passwordRecovery = false;
    aZ.passwords = {};
    aZ.profileURL = "";
    aZ.quit = false;
    aZ.reconKey = "";
    aZ.sessionID = "";
    aZ.sitting = [];
    aZ.soundOK = true;
    aZ.tableCurrent = -1;
    aZ.tables = [];
    aZ.validateEmails = false;
    aZ.waiting = [];
    aZ.winOfsX = 10;
    aZ.winOfsY = 10;
    aZ.zTop = 0;
    aZ.currentWebcam = false;
    aZ.zoomWebcam = 30.0;
    aZ.numberTable = 0;

    function bb() {
        var g;
        for (g = aZ.actionQueue.length - 1; g >= 0; g--) {
            if (aZ.actionQueue[g].queued == false) {
                aZ.actionQueue.splice(g, 1)
            }
        }
        if (aZ.actionQueue.length > 0) {
            p(aZ.actionQueue[0])
        }
    }
    function aJ(g) {
        if (g.queued == true) {
            return
        }
        aZ.actionQueue.push(g);
        g.queued = true;
        if (aZ.actionQueue.length == 1) {
            p(g)
        }
    }
    function p(g) {
        if (aZ.local.bringToFront == true) {
            g.bringToFront()
        }
    }
    function a4() {
        var bK, bJ, bI, bL, bM, g;
        bK = aZ.$webLeft.width();
        bJ = aZ.$webRight.width();
        bI = aZ.$webTop.height();
        bL = aZ.$webBottom.height();
        bM = $(window.parent.document).width();
        g = $(window.parent.document).height();
        if (g - bI < aZ.params.minHeight) {
            bI = 0
        }
        aZ.$webTop.toggle(bI > 0);
        aZ.$webClient.css("top", bI);
        if (g - bI - bL < aZ.params.minHeight) {
            bL = 0
        }
        aZ.$webBottom.toggle(bL > 0);
        aZ.$webClient.css("bottom", bL);
        if (bM - bK < aZ.params.minWidth) {
            bK = 0
        }
        aZ.$webLeft.toggle(bK > 0);
        aZ.$webClient.css("left", bK);
        if (bM - bK - bJ < aZ.params.minWidth) {
            bJ = 0
        }
        aZ.$webRight.toggle(bJ > 0);
        aZ.$webClient.css("right", bJ)
    }
    function f(bI, g) {
        aZ.audio[bI].enabled = g;
        if (bI == "card2" || bI == "card3" || bI == "card4") {
            return
        }
        localStorage[bI + "Sound"] = g
    }
    function aF(g) {
        var bI = (new Date).getTime();
        aZ.bytesInList.push({
            time: bI,
            size: g
        });
        aZ.bytesIn += g
    }
    function ac(g) {
        var bJ, bI;
        bJ = (new Date).getTime();
        bI = bJ - 60000;
        aZ.bytesOutList.push({
            time: bJ,
            size: g
        });
        aZ.bytesOut += g;
        while (aZ.bytesOutList[0].time < bI) {
            aZ.bytesOut -= aZ.bytesOutList[0].size;
            aZ.bytesOutList.splice(0, 1)
        }
    }
    function q(bI) {
        var g, bJ;
        if (bI) {
            g = aZ.lobby.sitnGoGrid.selrow
        } else {
            g = aZ.lobby.tourneyGrid.selrow
        }
        if (g < 0) {
            return false
        }
        if (bI) {
            bJ = aZ.data.SitnGo.rows[g].startMin
        } else {
            bJ = aZ.data.Tourney.rows[g].startMin
        }
        return ( bJ > 0)
    }
    function aa(bK) {
        var bJ, bI, bL, g;
        g = (ag(bK));
        for (bJ = 0; bJ < aZ.tables.length; bJ++) {
            bL = aZ.tables[bJ];
            for (bI = 1; bI <= bL.seats; bI++) {
                if (bL.playerName[bI] == bK) {
                    bL.$block[bI].toggle(g);
                    break
                }
            }
        }
    }
    function aU(bI) {
        var bJ, g;
        bJ = "http://192.99.236.77:81/Image?Name=Cards";
        if (bI) {
            bJ = bJ + "4"
        } else {
            bJ = bJ + "2"
        }
        aZ.deck = bJ + "&Crc=" + aZ.crc.image;
        for (g = 0; g < aZ.tables.length; g++) {
            aZ.tables[g].deckChange()
        }
    }
    function Y(bI) {
        var g, bJ;
        g = bI.split("<br>");
        for (bJ = 0; bJ < g.length; bJ++) {
            g[bJ] = aM(g[bJ])
        }
        return g.join("<br>")
    }
    function u(g) {
        return ag(g) ? aZ.lang.LobbyColumnLoginsChatBlock : aZ.lang.LobbyColumnLoginsChatOK
    }
    function x(bL) {
        if (bL.substr(0, 1) == "#") {
            bL = "0x" + bL.substr(1)
        }
        var bK, bJ, bI;
        bK = bL >> 16 & 255;
        bJ = bL >> 8 & 255;
        bI = bL & 255;
        return d(bK, bJ, bI)
    }
    function U(bM, bJ, bI, bL, bO) {
        var bN, g, bK;
        if (bI == "T") {
            bN = ao(bJ)
        } else {
            bN = bJ
        }
        g = aZ.passwords[bI + bN];
        if (bL == true && g == null ) {
            aZ.lobby.getPasswordShow(bJ, bI, bO, bM)
        } else {
            bK = {
                Response: bM,
                Table: bJ,
                Type: bI,
                Seat: bO
            };
            if (g != null ) {
                bK.Password = g
            }
            bt(bK)
        }
    }
    function M(bI) {
        if (bI.length == 0) {
            return ""
        }
        var g, bJ;
        g = Math.round(Math.random() * 4294967295).toString(16).toUpperCase();
        while (g.length < 8) {
            g = "0" + g
        }
        bJ = k(k(bI + g));
        return g + "-" + bJ
    }
    function y(g, bM, bL) {
        var bJ, bO, bK, bI, bN;
        bO = document.styleSheets.length;
        for (bJ = 0; bJ < bO; bJ++) {
            bI = document.styleSheets[bJ];
            bN = bI.cssRules || bI.rules;
            for (bK in bN) {
                if (bN[bK].selectorText == g) {
                    bN[bK].style[bM] = bL;
                    return true
                }
            }
        }
        return false
    }
    function N(bI) {
        var g = "";
        if (bI >= 1000000000) {
            bI = bI / 1000000000;
            g = "B"
        } else {
            if (bI >= 1000000) {
                bI = bI / 1000000;
                g = "M"
            } else {
                if (bI >= 10000) {
                    bI = bI / 1000;
                    g = "K"
                }
            }
        }
        return bv(bI) + g
    }
    function bv(bJ) {
        var g, bI;
        g = bJ.toString();
        bI = g.indexOf(".");
        if (bI < 0) {
            return g
        }
        g = g + "0";
        return g.substr(0, bI) + aZ.local.decimalMark + g.substr(bI + 1, 2)
    }
    function bl(bN) {
        var g, bM, bJ, bL, bI, bK;
        if (bN < 0) {
            g = "-"
        } else {
            g = ""
        }
        bM = Math.abs(bN);
        bJ = bv(bM);
        if (bM < 10000) {
            return g + bJ
        }
        bL = bJ.indexOf(aZ.local.decimalMark);
        if (bL < 0) {
            bL = bJ.length
        }
        bI = bJ.substr(bL, 3);
        bK = 0;
        while (bL > 0) {
            if (bK == 3) {
                bI = aZ.local.thouSeparator + bI;
                bK = 0
            }
            bL--;
            bI = bJ.substr(bL, 1) + bI;
            bK++
        }
        return g + bI
    }
    function i(bL) {
        var bJ, g, bI, bK;
        bJ = bL.getHours();
        if (bJ > 12) {
            bJ = bJ - 12
        }
        if (bJ < 10) {
            bK = "0" + bJ
        } else {
            bK = bJ
        }
        g = bL.getMinutes();
        if (g < 10) {
            bK = bK + ":0" + g
        } else {
            bK = bK + ":" + g
        }
        bI = bL.getSeconds();
        if (bI < 10) {
            bK = bK + ":0" + bI
        } else {
            bK = bK + ":" + bI
        }
        return bK
    }
    function l(bN) {
        var bM, bK, g, bJ, bI, bL;
        bM = new Date;
        bK = bM.getUTCHours();
        if (bK < 10) {
            bK = "0" + bK
        }
        g = bM.getUTCMinutes();
        if (g < 10) {
            g = "0" + g
        }
        bJ = bM.getUTCSeconds();
        if (bJ < 10) {
            bJ = "0" + bJ
        }
        bI = bM.getUTCMilliseconds();
        if (bI < 10) {
            bI = "00" + bI
        } else {
            if (bI < 100) {
                bI = "0" + bI
            }
        }
        bL = bK + ":" + g + ":" + bJ + "." + bI + " " + bN;
        aZ.debug.push(bL);
        if (aZ.debugShowing) {
            aZ.debugContent.addTextLine(bL)
        }
    }
    function ay() {
        aZ.color.TableTop = "#FFFFFF";
        aZ.color.TableBackground = "#FFFFFF";
        aZ.color.Background = "#FFFFFF";
        aZ.color.Window = "#303030";
        aZ.color.Button = "#C0C0C0";
        aZ.color.List = "#FFFFFF";
        aV();
        aZ.debugLog = new a2($("#DebugLog"),null ,{
            minwidth: 250,
            minheight: 150,
            onresize: function() {
                aZ.debugContent.updateScrollPosition()
            }
        });
        aZ.debugLog.setTitle("Debugger");
        new w($(".ok", aZ.debugLog.$dialog),"OK",25,function() {
                aZ.debugShowing = false;
                aZ.debugLog.close()
            }
        );
        new w($(".save", aZ.debugLog.$dialog),"Save",25,function() {
                aO("Debugger", aZ.debugContent.getText(), true)
            }
        );
        $(".closebtn", aZ.debugLog.$dialog).on("touchstart mousedown", function() {
            aZ.debugShowing = false;
            aZ.debugLog.close();
            return false
        });
        aZ.debugContent = new bc($(".debugcontent", aZ.debugLog.$dialog),true);
        l("MSG Version " + aZ.clientVersion + " : " + aZ.params.siteID);
        aZ.debugStatsTimer = setInterval(bh, 60000)
    }
    function aQ() {
        aZ.doc.debug = false;
        if (aZ.doc.$menu) {
            aZ.doc.$menu.hide();
            aZ.doc.$menu = null
        }
        aZ.debugLog.show(false);
        var g, bI;
        g = ($(window).width() - aZ.debugLog.$dialog.width()) / 2;
        bI = ($(window).height() - aZ.debugLog.$dialog.height()) / 2;
        aZ.debugLog.$dialog.css({
            left: g,
            top: bI
        });
        aZ.debugShowing = true;
        aZ.debugContent.setText(aZ.debug.join("\r\n") + "\r\n");
        aZ.debugContent.bottomScroll()
    }
    function bh() {
        var g = (new Date).getTime() - 60000;
        while (aZ.bytesInList.length > 0 && aZ.bytesInList[0].time < g) {
            aZ.bytesIn -= aZ.bytesInList[0].size;
            aZ.bytesInList.splice(0, 1)
        }
        while (aZ.bytesOutList.length > 0 && aZ.bytesOutList[0].time < g) {
            aZ.bytesOut -= aZ.bytesOutList[0].size;
            aZ.bytesOutList.splice(0, 1)
        }
        if (aZ.debugShowing) {
            l("MSG Packets per minute: " + aZ.bytesInList.length + " in, " + aZ.bytesOutList.length + " out");
            l("MSG Bytes per minute: " + aZ.bytesIn + " in, " + aZ.bytesOut + " out")
        }
    }
    function bg() {
        var g = !aZ.hasTouch;
        aZ.doc.$menu = null ;
        aZ.doc.menuitem = null ;
        aZ.doc.button = null ;
        aZ.doc.dialog = null ;
        aZ.doc.grid = null ;
        aZ.doc.memo = null ;
        aZ.doc.nameplate = null ;
        aZ.doc.scrollbar = null ;
        aZ.doc.slider = null ;
        aZ.doc.debug = false;
        $(document).on("contextmenu", function() {
            return false
        });
        $(document).on("touchend mouseup", function(bJ) {
            if (aC(bJ)) {
                return
            }
            var bI = false;
            if (!g) {
                g = true;
                aZ.audio.beep.play(true)
            }
            if (aZ.doc.debug) {
                aZ.doc.debug = false;
                clearTimeout(aZ.debugTimer)
            }
            if (aZ.doc.$menu) {
                aZ.doc.$menu.hide();
                aZ.doc.$menu = null ;
                bI = true
            }
            if (aZ.doc.menuitem) {
                aZ.doc.menuitem.$menu.parent().hide();
                aZ.doc.menuitem = null ;
                bI = true
            }
            if (aZ.doc.button) {
                aZ.doc.button.up();
                bI = true
            }
            if (aZ.doc.dialog) {
                aZ.doc.dialog.offDialog();
                bI = true
            }
            if (aZ.doc.grid) {
                aZ.doc.grid.offGrid();
                bI = true
            }
            if (aZ.doc.memo) {
                aZ.doc.memo = null ;
                bI = true
            }
            if (aZ.doc.nameplate) {
                aZ.doc.nameplate.hintOff();
                bI = true
            }
            if (aZ.doc.scrollbar) {
                clearTimeout(aZ.doc.scrollbar.timer);
                aZ.doc.scrollbar = null ;
                bI = true
            }
            if (aZ.doc.slider) {
                aZ.doc.slider = null ;
                bI = true
            }
            if (bI) {
                return false
            }
        });
        $(document).on("touchmove mousemove", function(bJ) {
            if (aC(bJ)) {
                return
            }
            var bI = false;
            if (aZ.doc.dialog) {
                aZ.doc.dialog.onDialog(bJ);
                bI = true
            }
            if (aZ.doc.grid) {
                aZ.doc.grid.onGrid(bJ);
                bI = true
            }
            if (aZ.doc.memo) {
                aZ.doc.memo.scroll(bJ);
                bI = true
            }
            if (aZ.doc.scrollbar) {
                aZ.doc.scrollbar.dragThumb(bJ);
                bI = true
            }
            if (aZ.doc.slider) {
                aZ.doc.slider.slide(bJ);
                bI = true
            }
            if (bI) {
                return false
            }
        })
    }
    function ao(g) {
        var bI = g.lastIndexOf(" - ");
        if (bI < 0) {
            return g
        } else {
            return g.substring(0, bI)
        }
    }
    function at(g) {
        $(".dialog .title").removeClass("bold");
        $(".title", g.$dialog).addClass("bold");
        aZ.focused = g
    }
    function W(bV, bT, bS, bR) {
        var bM, bQ, bZ, bY, bX, bW, bU, bP, bN, bO, bK, bL, bJ, bI, g;
        bM = "23456789TJQKA";
        bQ = "cdhs";
        bU = "[";
        if (bV > 0 && bV < 53) {
            bP = Math.floor((bV - 1) / 4);
            bN = (bV - 1) % 4;
            bZ = bM.charAt(bP) + bQ.charAt(bN);
            bU = bU + bZ
        }
        if (bT > 0 && bT < 53) {
            bO = Math.floor((bT - 1) / 4);
            bK = (bT - 1) % 4;
            bY = bM.charAt(bO) + bQ.charAt(bK);
            bU = bU + " " + bY
        }
        if (bS > 0 && bS < 53) {
            bL = Math.floor((bS - 1) / 4);
            bJ = (bS - 1) % 4;
            bX = bM.charAt(bL) + bQ.charAt(bJ);
            bU = bU + " " + bX
        }
        if (bR > 0 && bR < 53) {
            bI = Math.floor((bR - 1) / 4);
            g = (bR - 1) % 4;
            bW = bM.charAt(bI) + bQ.charAt(g);
            bU = bU + " " + bW
        }
        bU = bU + "]";
        return bU
    }
    function A() {
        if (!localStorage.PCID) {
            var g = Math.round(Math.random() * 4294967295).toString(16).toUpperCase();
            while (g.length < 8) {
                g = "0" + g
            }
            localStorage.PCID = g
        }
        return localStorage.PCID
    }
    function n(bK) {
        var bJ, bI, g;
        bJ = null ;
        bI = T(bK.Type) + T(bK.Table);
        for (g = 0; g < aZ.tables.length; g++) {
            if (aZ.tables[g].type + aZ.tables[g].id == bI) {
                bJ = aZ.tables[g];
                break
            }
        }
        return bJ
    }
    function bk(bK, bJ, bM) {
        var bI, g, bN, bL;
        bI = "";
        if (aZ.loggedIn && !aZ.mobile) {
            bI = " - " + aZ.lang.TableCaptionLoggedIn.split("%1%").join(aZ.loginData.player)
        }
        if (bJ == "R") {
            for (g = 0; g < aZ.data.Ring.rows.length; g++) {
                if (aZ.data.Ring.rows[g].id == bK) {
                    return bK + " - " + aZ.data.Ring.rows[g].game + " (" + aZ.data.Ring.rows[g].buyin + ")" + bI
                }
            }
            return "?"
        } else {
            if (bM) {
                bL = aZ.data.SitnGo.rows
            } else {
                bL = aZ.data.Tourney.rows
            }
            bN = ao(bK);
            for (g = 0; g < bL.length; g++) {
                if (bL[g].id == bN) {
                    return bK + " - " + bL[g].game + " (" + bL[g].buyin + ")" + bI
                }
            }
            return "?"
        }
    }
    function bq(bP, bK, bO) {
        var bL, bM, bV, bT, bU, bW, g, bI, bS, bJ, bN, bR, bQ;
        bT = bP / 100;
        bU = bK / 100;
        bW = bO / 100;
        if (bW < 0.5) {
            g = bW * (1 + bU)
        } else {
            g = bW + bU - (bW * bU)
        }
        bI = (2 * bW) - g;
        bS = bT + (1 / 3);
        if (bS > 1) {
            bS = bS - 1
        }
        if (bS < (1 / 6)) {
            bL = bI + ((g - bI) * 6 * bS)
        } else {
            if (bS < (1 / 2)) {
                bL = g
            } else {
                if (bS < (2 / 3)) {
                    bL = bI + ((g - bI) * 6 * ((2 / 3) - bS))
                } else {
                    bL = bI
                }
            }
        }
        bL = Math.round(bL * 255);
        bJ = bT;
        if (bJ < (1 / 6)) {
            bM = bI + ((g - bI) * 6 * bJ)
        } else {
            if (bJ < (1 / 2)) {
                bM = g
            } else {
                if (bJ < (2 / 3)) {
                    bM = bI + ((g - bI) * 6 * ((2 / 3) - bJ))
                } else {
                    bM = bI
                }
            }
        }
        bM = Math.round(bM * 255);
        bN = bT - (1 / 3);
        if (bN < 0) {
            bN = bN + 1
        }
        if (bN < (1 / 6)) {
            bV = bI + ((g - bI) * 6 * bN)
        } else {
            if (bN < (1 / 2)) {
                bV = g
            } else {
                if (bN < (2 / 3)) {
                    bV = bI + ((g - bI) * 6 * ((2 / 3) - bN))
                } else {
                    bV = bI
                }
            }
        }
        bV = Math.round(bV * 255);
        bR = (bL << 16) | (bM << 8) | bV;
        bQ = bR.toString(16);
        while (bQ.length < 6) {
            bQ = "0" + bQ
        }
        return "#" + bQ
    }
    function aM(g) {
        return g.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;").split("'").join("&apos;").split('"').join("&quot;")
    }
    function aC(g) {
        if (g.type.indexOf("mouse") == 0) {
            return !aZ.mouse
        } else {
            aZ.mouse = false;
            return false
        }
    }
    function aG() {
        aZ.winOfsX = aZ.winOfsX + 35;
        aZ.winOfsY = aZ.winOfsY + 35;
        if (aZ.winOfsX + 706 > $(window).width() - 5) {
            aZ.winOfsX = 10
        }
        if (aZ.winOfsY + 568 > $(window).height() - 5) {
            aZ.winOfsY = 10
        }
    }
    function bu() {
        var g;
        $.fn.xytrans = function(bI) {
            if (bI == 0) {
                return $(this).each(function() {
                    $(this).css("transition", "none")
                })
            } else {
                return $(this).each(function() {
                    $(this).css({
                        transition: "left " + bI + "ms ease-out, top " + bI + "ms ease-out",
                        "-webkit-backface-visibility": "hidden"
                    })
                })
            }
        }
        ;
        $.fn.optrans = function(bI) {
            return $(this).each(function() {
                $(this).css({
                    transition: "opacity " + bI + "ms",
                    "-webkit-backface-visibility": "hidden"
                })
            })
        }
        ;
        $.fn.redraw = function() {
            return $(this).each(function() {
                g = getComputedStyle(this).display
            })
        }
    }
    function ag(g) {
        return ( aZ.local.blocked.indexOf(g) >= 0)
    }
    function a8(g) {
        return encodeURI(g).split(/%..|./).length - 1
    }
    function ax() {
        if (typeof AudioContext !== "undefined") {
            aZ.waContext = new AudioContext();
            aZ.waGain = (typeof aZ.waContext.createGain == "undefined") ? aZ.waContext.createGainNode() : aZ.waContext.createGain();
            aZ.mp3 = true;
            l("MSG Using Web Audio")
        } else {
            if (typeof webkitAudioContext !== "undefined") {
                aZ.waContext = new webkitAudioContext();
                aZ.waGain = (typeof aZ.waContext.createGain == "undefined") ? aZ.waContext.createGainNode() : aZ.waContext.createGain();
                aZ.mp3 = true;
                l("MSG Using Webkit Audio")
            } else {
                aZ.waContext = null ;
                aZ.waGain = null ;
                aZ.mp3 = (new Audio()).canPlayType("audio/mpeg");
                l("MSG Using HTML Audio")
            }
        }
        aZ.audio.beep = new P("beep",localStorage.beepSound != "false");
        aZ.audio.bet = new P("bet",localStorage.betSound != "false");
        aZ.audio.card = new P("card",localStorage.cardSound != "false");
        aZ.audio.card2 = new P("card",localStorage.cardSound != "false");
        aZ.audio.card3 = new P("card",localStorage.cardSound != "false");
        aZ.audio.card4 = new P("card",localStorage.cardSound != "false");
        aZ.audio.check = new P("check",localStorage.checkSound != "false");
        aZ.audio.login = new P("login",localStorage.loginSound == "true");
        aZ.audio.pot = new P("pot",localStorage.potSound != "false")
    }
    function S() {
        aZ.params.buttonRadius = T(parent.params.buttonRadius);
        aZ.params.fontFamily = T(parent.params.fontFamily);
        aZ.params.fontLarge = T(parent.params.fontLarge);
        aZ.params.fontNormal = T(parent.params.fontNormal);
        aZ.params.fontSmall = T(parent.params.fontSmall);
        aZ.params.gradients = T(parent.params.gradients) == "Yes";
        aZ.params.guiMode = T(parent.params.guiMode);
        aZ.params.loginName = T(parent.params.loginName);
        aZ.params.loginPassword = T(parent.params.loginPassword);
        aZ.params.logoutLink = T(parent.params.logoutLink);
        aZ.params.minHeight = a5(parent.params.minHeight);
        aZ.params.minWidth = a5(parent.params.minWidth);
        aZ.params.packetPort = T(parent.params.packetPort);
        aZ.params.sessionKey = T(parent.params.sessionKey);
        aZ.params.showRealNames = T(parent.params.showRealNames) == "Yes";
        aZ.params.showNetChips = T(parent.params.showNetChips) == "Yes";
        aZ.params.sitAndGoTab = T(parent.params.sitAndGoTab) == "Yes";
        aZ.params.siteID = T(parent.params.siteID);
        aZ.params.sitePassword = T(parent.params.sitePassword);
        aZ.params.tableDelimiter = T(parent.params.tableDelimiter);
        aZ.params.tableName = T(parent.params.tableName);
        aZ.params.tablePassword = T(parent.params.tablePassword);
        aZ.params.tableType = T(parent.params.tableType);
        aZ.params.useSSL = T(parent.params.useSSL);
        aZ.$webBottom = $("#bottom_div", window.parent.document);
        aZ.$webClient = $("#client_div", window.parent.document);
        aZ.$webLeft = $("#left_div", window.parent.document);
        aZ.$webRight = $("#right_div", window.parent.document);
        aZ.$webTop = $("#top_div", window.parent.document);
        if (aZ.params.gradients) {
            y(".menu", "backgroundImage", "url('http://192.99.236.77:81/Image?Name=Grad25')");
            y(".tabs_normal", "backgroundImage", "url('http://192.99.236.77:81/Image?Name=Grad25')");
            y(".header", "backgroundImage", "url('http://192.99.236.77:81/Image?Name=Grad30')")
        }
    }
    function aP() {
        var g, bI;
        if (localStorage.decimalMark == ",") {
            aZ.local.decimalMark = ",";
            aZ.local.thouSeparator = "."
        } else {
            aZ.local.decimalMark = ".";
            aZ.local.thouSeparator = ","
        }
        g = localStorage.getItem("soundVolume");
        if (g == null || g < 0 || g > 1) {
            g = 1
        }
        aZ.local.soundVolume = g;
        aZ.local.bringToFront = localStorage.bringToFront != "false";
        aZ.local.handHelper = localStorage.handHelper != "false";
        aZ.local.autoMuck = localStorage.autoMuck != "false";
        aZ.local.fourColorDeck = localStorage.fourColorDeck == "true";
        aZ.local.dealFaceDown = localStorage.dealFaceDown == "true";
        aZ.local.muteDealer = localStorage.muteDealer == "true";
        aZ.local.arrangeLobby = localStorage.arrangeLobby == "true";
        if (aZ.params.guiMode == "") {
            aZ.local.gui = localStorage.gui
        } else {
            aZ.local.gui = aZ.params.guiMode;
            bj("gui", aZ.local.gui)
        }
        if (aZ.local.gui != "desktop" && aZ.local.gui != "mobile") {
            aZ.local.gui = "auto"
        }
        if (aZ.local.gui == "auto") {
            aZ.mobile = aZ.hasTouch
        } else {
            aZ.mobile = (aZ.local.gui == "mobile")
        }
        aZ.local.fontSize = localStorage.fontSize;
        if (aZ.local.fontSize != "small" && aZ.local.fontSize != "large") {
            aZ.local.fontSize = "normal"
        }
        I();
        y("body", "fontFamily", aZ.params.fontFamily);
        aZ.local.chatBlockAsterisk = localStorage.chatBlockAsterisk != "false";
        bI = localStorage.chatBlockList;
        if (!bI || bI == "undefined" || bI == "") {
            aZ.local.blocked = []
        } else {
            aZ.local.blocked = JSON.parse(bI)
        }
        aZ.local.lobbyChatTime = localStorage.lobbyChatTime == "true";
        aZ.local.tableChatTime = localStorage.tableChatTime == "true";
        aZ.local.filterRingActivate = localStorage.filterRingActivate == "true";
        aZ.local.filterRingHoldem = localStorage.filterRingHoldem != "false";
        aZ.local.filterRingOmaha = localStorage.filterRingOmaha != "false";
        aZ.local.filterRingOmahaHiLo = localStorage.filterRingOmahaHiLo != "false";
        aZ.local.filterRingNL = localStorage.filterRingNL != "false";
        aZ.local.filterRingPL = localStorage.filterRingPL != "false";
        aZ.local.filterRingFixed = localStorage.filterRingFixed != "false";
        aZ.local.filterRingStakesMin = localStorage.filterRingStakesMin;
        aZ.local.filterRingStakesMax = localStorage.filterRingStakesMax;
        aZ.local.filterRingBuyinMin = localStorage.filterRingBuyinMin;
        aZ.local.filterRingBuyinMax = localStorage.filterRingBuyinMax;
        aZ.local.filterRingSeatsMin = localStorage.filterRingSeatsMin;
        aZ.local.filterRingSeatsMax = localStorage.filterRingSeatsMax;
        aZ.local.filterRingPlayersMin = localStorage.filterRingPlayersMin;
        aZ.local.filterRingHideFull = localStorage.filterRingHideFull == "true";
        aZ.local.filterRingHidePrivate = localStorage.filterRingHidePrivate == "true";
        aZ.local.filterTourneyActivate = localStorage.filterTourneyActivate == "true";
        aZ.local.filterTourneyHoldem = localStorage.filterTourneyHoldem != "false";
        aZ.local.filterTourneyOmaha = localStorage.filterTourneyOmaha != "false";
        aZ.local.filterTourneyOmahaHiLo = localStorage.filterTourneyOmahaHiLo != "false";
        aZ.local.filterTourneyNL = localStorage.filterTourneyNL != "false";
        aZ.local.filterTourneyPL = localStorage.filterTourneyPL != "false";
        aZ.local.filterTourneyFixed = localStorage.filterTourneyFixed != "false";
        aZ.local.filterTourneyFreezeout = localStorage.filterTourneyFreezeout != "false";
        aZ.local.filterTourneyRebuy = localStorage.filterTourneyRebuy != "false";
        aZ.local.filterTourneyShootout = localStorage.filterTourneyShootout != "false";
        aZ.local.filterTourneyBuyinMin = localStorage.filterTourneyBuyinMin;
        aZ.local.filterTourneyBuyinMax = localStorage.filterTourneyBuyinMax;
        aZ.local.filterTourneySizeMin = localStorage.filterTourneySizeMin;
        aZ.local.filterTourneySizeMax = localStorage.filterTourneySizeMax;
        aZ.local.filterTourneyTime = localStorage.filterTourneyTime != "false";
        aZ.local.filterTourneyOther = localStorage.filterTourneyOther != "false";
        aZ.local.filterTourneyHidePrivate = localStorage.filterTourneyHidePrivate == "true";
        aZ.local.filterTourneyHideRunning = localStorage.filterTourneyHideRunning == "true";
        aZ.local.filterSitnGoActivate = localStorage.filterSitnGoActivate == "true";
        aZ.local.filterSitnGoHoldem = localStorage.filterSitnGoHoldem != "false";
        aZ.local.filterSitnGoOmaha = localStorage.filterSitnGoOmaha != "false";
        aZ.local.filterSitnGoOmahaHiLo = localStorage.filterSitnGoOmahaHiLo != "false";
        aZ.local.filterSitnGoNL = localStorage.filterSitnGoNL != "false";
        aZ.local.filterSitnGoPL = localStorage.filterSitnGoPL != "false";
        aZ.local.filterSitnGoFixed = localStorage.filterSitnGoFixed != "false";
        aZ.local.filterSitnGoFreezeout = localStorage.filterSitnGoFreezeout != "false";
        aZ.local.filterSitnGoRebuy = localStorage.filterSitnGoRebuy != "false";
        aZ.local.filterSitnGoShootout = localStorage.filterSitnGoShootout != "false";
        aZ.local.filterSitnGoBuyinMin = localStorage.filterSitnGoBuyinMin;
        aZ.local.filterSitnGoBuyinMax = localStorage.filterSitnGoBuyinMax;
        aZ.local.filterSitnGoSizeMin = localStorage.filterSitnGoSizeMin;
        aZ.local.filterSitnGoSizeMax = localStorage.filterSitnGoSizeMax;
        aZ.local.filterSitnGoTime = localStorage.filterSitnGoTime != "false";
        aZ.local.filterSitnGoOther = localStorage.filterSitnGoOther != "false";
        aZ.local.filterSitnGoHidePrivate = localStorage.filterSitnGoHidePrivate == "true";
        aZ.local.filterSitnGoHideRunning = localStorage.filterSitnGoHideRunning == "true"
    }
    function bj(g, bI) {
        aZ.local[g] = bI;
        localStorage[g] = bI
    }
    function ab(bI) {
        var g;
        if (bI == "#000000") {
            return "#333333"
        }
        g = x(bI);
        return bq(g.hu, g.sa, g.li * 0.75)
    }
    function aV() {
        aZ.color.WindowText = a7(aZ.color.Window);
        aZ.color.WindowDisabled = r(aZ.color.Window);
        aZ.color.ButtonText = a7(aZ.color.Button);
        aZ.color.ButtonDisabled = r(aZ.color.Button);
        aZ.color.ButtonBorder = ab(aZ.color.Button);
        aZ.color.ListText = a7(aZ.color.List);
        aZ.color.ListDisabled = r(aZ.color.List)
    }
    function r(bI) {
        var g = x(bI);
        if (g.y >= 50) {
            g.li = g.li / 2
        } else {
            g.li = g.li / 2 + 50
        }
        return bq(g.hu, g.sa, g.li)
    }
    function a7(bI) {
        var g = x(bI);
        if (g.y >= 50) {
            g.li = g.li / 4
        } else {
            g.li = g.li / 4 + 75
        }
        return bq(g.hu, g.sa, g.li)
    }
    function ba() {
        var bI, g;
        bI = aZ.color.List;
        if ($(this).hasClass("disabled")) {
            g = aZ.color.ListDisabled
        } else {
            g = aZ.color.ListText
        }
        $(this).css({
            color: bI,
            "background-color": g
        })
    }
    function br() {
        var g, bI;
        g = aZ.color.List;
        if ($(this).hasClass("disabled")) {
            bI = aZ.color.ListDisabled
        } else {
            bI = aZ.color.ListText
        }
        $(this).css({
            color: bI,
            "background-color": g
        })
    }
    function a5(g) {
        var bI = Number(g);
        if (isNaN(bI) == true) {
            return 0
        } else {
            return bI
        }
    }
    function T(g) {
        if (g == null ) {
            return ""
        } else {
            return String(g)
        }
    }
    function bo(g) {
        var bI = (g.type.indexOf("touch") == 0 && g.originalEvent.touches.length > 1);
        return bI
    }
    function e(g) {
        while (aZ.tables.length > 0) {
            aZ.tables[0].closeTable()
        }
        aZ.lobby.popoutChat.close();
        aZ.lobby.info.close();
        aZ.lobby.news.close();
        aZ.connected = false;
        aZ.loggedIn = false;
        aZ.loginData = {};
        ai();
        aZ.lobby.dialog.close();
        aZ.lobby = null ;
        aZ.quit = true;
        if (g == true) {
            alert(aZ.lang.MessageTerminated)
        } else {
            bt({
                Response: "Logout"
            })
        }
        aZ.ws.close();
        clearInterval(aZ.debugStatsTimer);
        if (!g && aZ.params.logoutLink != "") {
            window.parent.location.href = aZ.params.logoutLink
        }
    }
    function bi(g) {
        if (aZ.audio[g].enabled) {
            aZ.audio[g].play()
        }
    }
    function bf(bJ, bI) {
        if(bI.Command == "Table"){
	  if(currentTable == ''){
	    currentTable = bI.Table;
	  }
	}

        var g = n(bI);
        if (g == null ) {
            return
        }
        if (g.animating == 0) {
            bJ(bI)
        } else {
            g.packetQueue.push({
                command: bJ,
                packet: bI
            })
        }

        if(bI.Command == "TableBanner"){
            if(bI.Text == "Tournament is on break") {
                g.playVideo(1);
            }
            else if(bI.Text == ""){
                g.playVideo(0);
            }
        }

        if(bI.Command == "Table"){
            var p = bI.Player.indexOf(aZ.loginData.player);
            if(p >= 0) {
                console.log('p = ' + p);
		connection.openOrJoin(currentTable);
                g.showWebcam(p+1);
            }
        }
    }
    function v(bI) {
        var bJ;
        while (bI.animating == 0 && bI.packetQueue.length > 0) {
            bJ = bI.packetQueue.shift();
            try {
                bJ.command(bJ.packet)
            } catch (g) {
                l("ERR queueProcess error: " + g)
            }
        }
    }
    function D(g) {
        switch (g) {
            case 1:
                return aZ.lang.CardsAce;
            case 2:
                return aZ.lang.CardsDeuce;
            case 3:
                return aZ.lang.CardsThree;
            case 4:
                return aZ.lang.CardsFour;
            case 5:
                return aZ.lang.CardsFive;
            case 6:
                return aZ.lang.CardsSix;
            case 7:
                return aZ.lang.CardsSeven;
            case 8:
                return aZ.lang.CardsEight;
            case 9:
                return aZ.lang.CardsNine;
            case 10:
                return aZ.lang.CardsTen;
            case 11:
                return aZ.lang.CardsJack;
            case 12:
                return aZ.lang.CardsQueen;
            case 13:
                return aZ.lang.CardsKing;
            case 14:
                return aZ.lang.CardsAce;
            default:
                return "?"
        }
    }
    function m(g) {
        switch (g) {
            case 1:
                return aZ.lang.CardsAces;
            case 2:
                return aZ.lang.CardsDeuces;
            case 3:
                return aZ.lang.CardsThrees;
            case 4:
                return aZ.lang.CardsFours;
            case 5:
                return aZ.lang.CardsFives;
            case 6:
                return aZ.lang.CardsSixes;
            case 7:
                return aZ.lang.CardsSevens;
            case 8:
                return aZ.lang.CardsEights;
            case 9:
                return aZ.lang.CardsNines;
            case 10:
                return aZ.lang.CardsTens;
            case 11:
                return aZ.lang.CardsJacks;
            case 12:
                return aZ.lang.CardsQueens;
            case 13:
                return aZ.lang.CardsKings;
            case 14:
                return aZ.lang.CardsAces;
            default:
                return "?"
        }
    }
    function a0(bN) {
        var g, bI, bO, bM, bL, bK, bJ;
        g = ["", "A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
        bO = (bN & 983040) >>> 16;
        bM = (bN & 61440) >>> 12;
        bL = (bN & 3840) >>> 8;
        bK = (bN & 240) >>> 4;
        bJ = bN & 15;
        if (bN == 10411194) {
            bI = aZ.lang.HandRoyalFlush
        } else {
            if (bN >= 9437184) {
                bI = aZ.lang.HandStraightFlushLong.split("%1%").join(D(bJ));
                bI = bI.split("%2%").join(D(bO))
            } else {
                if (bN >= 8388608) {
                    bI = aZ.lang.HandFourOfAKindLong.split("%1%").join(m(bO));
                    bI = bI.split("%2%").join(g[bJ])
                } else {
                    if (bN >= 7340032) {
                        bI = aZ.lang.HandFullHouseLong.split("%1%").join(m(bO));
                        bI = bI.split("%2%").join(m(bK))
                    } else {
                        if (bN >= 6291456) {
                            bI = aZ.lang.HandFlushLong.split("%1%").join(D(bO));
                            bI = bI.split("%2%").join(g[bM] + g[bL] + g[bK] + g[bJ])
                        } else {
                            if (bN >= 5242880) {
                                bI = aZ.lang.HandStraightLong.split("%1%").join(D(bJ));
                                bI = bI.split("%2%").join(D(bO))
                            } else {
                                if (bN >= 4194304) {
                                    bI = aZ.lang.HandThreeOfAKindLong.split("%1%").join(m(bO));
                                    bI = bI.split("%2%").join(g[bK] + g[bJ])
                                } else {
                                    if (bN >= 3145728) {
                                        bI = aZ.lang.HandTwoPairLong.split("%1%").join(m(bO));
                                        bI = bI.split("%2%").join(m(bL));
                                        bI = bI.split("%3%").join(g[bJ])
                                    } else {
                                        if (bN >= 2097152) {
                                            if (bJ != 0) {
                                                bI = aZ.lang.HandPairLong
                                            } else {
                                                bI = aZ.lang.HandPairShort
                                            }
                                            bI = bI.split("%1%").join(m(bO));
                                            if (bJ != 0) {
                                                bI = bI.split("%2%").join(g[bL] + g[bK] + g[bJ])
                                            }
                                        } else {
                                            if (bN >= 1048576) {
                                                if (bJ != 0) {
                                                    bI = aZ.lang.HandHighCardLong
                                                } else {
                                                    bI = aZ.lang.HandHighCardShort
                                                }
                                                bI = bI.split("%1%").join(D(bO));
                                                if (bJ != 0) {
                                                    bI = bI.split("%2%").join(g[bM] + g[bL] + g[bK] + g[bJ])
                                                }
                                            } else {
                                                bI = "?"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return bI
    }
    function R(bK) {
        var g, bJ, bI = [];
        if (bK == 629145) {
            return aZ.lang.GameNone
        }
        bI[1] = (bK >>> 16) & 15;
        bI[2] = (bK >>> 12) & 15;
        bI[3] = (bK >>> 8) & 15;
        bI[4] = (bK >>> 4) & 15;
        bI[5] = bK & 15;
        bJ = "";
        for (g = 1; g <= 5; g++) {
            if (bI[g] == 1) {
                bJ = bJ + "A"
            } else {
                bJ = bJ + bI[g]
            }
        }
        return bJ
    }
    function aB(bI) {
        if (aZ.profileURL == "" || bI == "") {
            return
        }
        var g = aZ.profileURL;
        if (g.indexOf("?") < 0) {
            g = g + "?"
        } else {
            g = g + "&"
        }
        g = g + "Player=" + encodeURIComponent(bI);
        window.open(g, "_blank")
    }
    function d(bJ, bK, bT) {
        var bI, bN, bR, bQ, bL, bP, bO, bS, bU, bM;
        bI = bJ / 255;
        bN = bK / 255;
        bR = bT / 255;
        bQ = 0.2126 * bI + 0.7152 * bN + 0.0722 * bR;
        bL = bI;
        bP = bI;
        if (bN < bL) {
            bL = bN
        }
        if (bR < bL) {
            bL = bR
        }
        if (bN > bP) {
            bP = bN
        }
        if (bR > bP) {
            bP = bR
        }
        if (bP == bL) {
            bO = 0
        } else {
            if (bP == bI) {
                bO = (60 * (bN - bR) / (bP - bL) + 360) % 360
            } else {
                if (bP == bN) {
                    bO = 60 * (bR - bI) / (bP - bL) + 120
                } else {
                    bO = 60 * (bI - bN) / (bP - bL) + 240
                }
            }
        }
        bU = (bP + bL) / 2;
        if (bP == bL) {
            bS = 0
        } else {
            if (bU <= 0.5) {
                bS = (bP - bL) / (bP + bL)
            } else {
                bS = (bP - bL) / (2 - (bP + bL))
            }
        }
        bM = {};
        bM.hu = Math.round(bO * 100 / 360);
        bM.sa = Math.round(bS * 100);
        bM.li = Math.round(bU * 100);
        bM.y = Math.round(bQ * 100);
        return bM
    }
    function bt(bJ) {
        var bI, g;
        bJ.ID = aZ.sessionID;
        aZ.PNum = aZ.PNum + 1;
        bJ.PNum = aZ.PNum;
        bI = JSON.stringify(bJ);
        g = a8(bI);
        aZ.ws.send(bI);
        ac(g)
    }
    function a() {
        var g, bI;
        g = "ws";
        if (aZ.params.useSSL == "Yes") {
            g = g + "s"
        }
        bI = window.location.hostname;
        if (bI.indexOf(":") >= 0 && bI.indexOf("[") < 0) {
            bI = "[" + bI + "]"
        }
        //g = g + "://" + bI + ":" + aZ.params.packetPort;
        g = g + "://" + "192.99.236.78" + ":" + aZ.params.packetPort;
        l("MSG Connecting to " + g + " ...");
        aZ.ws = new WebSocket(g);
        aZ.ws.onopen = function() {
            var bJ;
            l("MSG Connected");
            aZ.firstError = false;
            if (aZ.sessionID == "") {
                aZ.PNum = 0;
                bJ = {
                    Response: "Session",
                    PC: A(),
                    Version: aZ.clientVersion,
                    SitePassword: aZ.params.sitePassword
                };
                bt(bJ)
            } else {
                aZ.lobby.retryMessage.close();
                bJ = {
                    Response: "Reconnect"
                };
                bJ.ReconKey = aZ.reconKey;
                if (aZ.loginData.player != null ) {
                    bJ.Player = aZ.loginData.player;
                    bJ.PWHash = k(aZ.eSeed + aZ.sessionID)
                }
                aZ.connected = true;
                bt(bJ)
            }
        }
        ;
        aZ.ws.onmessage = function(bJ) {
            //console.log('onmessage')
            //console.log(bJ.data)
            az(bJ.data)
        }
        ;
        aZ.ws.onerror = function() {
            l("MSG WebSocket Connection Error");
            l("MSG Check Browser Error Console");
            if (aZ.firstError) {
                $("#Connecting").text(parent.params.connectError);
                aZ.firstError = false;
                aQ()
            }
        }
        ;
        aZ.ws.onclose = function(bJ) {
            l("MSG Connection Closed with Event Code " + bJ.code);
            aZ.connected = false;
            if (aZ.quit) {
                return
            }
            if (aZ.lobby.retryMessage.isVisible()) {
                l("MSG Retrying connection...");
                setTimeout(a, 10000)
            } else {
                bi("beep");
                aZ.lobby.retryMessage.showMessage(aZ.lang.ConnectRetry, true);
                setTimeout(a, 1000)
            }
        }
    }
    function az(bJ) {
        var bK, bI;
        if (aZ.quit == true) {
            return
        }
        try {
            bK = JSON.parse(bJ);
            bI = a8(bJ);
            aF(bI)
        } catch (g) {
            l("ERR " + g + " : " + bJ)
        }
        try {
            switch (bK.Command) {
                case "ActionChips":
                    bf(bH, bK);
                    break;
                case "BadPassword":
                    L(bK);
                    break;
                case "Balance":
                    av(bK);
                    break;
                case "Bet":
                    bf(be, bK);
                    break;
                case "BetCollection":
                    bf(bE, bK);
                    break;
                case "Buttons":
                    bf(bF, bK);
                    break;
                case "Cards":
                    bf(aT, bK);
                    break;
                case "Chat":
                    bf(F, bK);
                    break;
                case "Clear":
                    bf(by, bK);
                    break;
                case "Deal":
                    bf(bG, bK);
                    break;
                case "Dealer":
                    bf(H, bK);
                    break;
                case "ECards":
                    bf(s, bK);
                    break;
                case "Flop":
                    bf(aW, bK);
                    break;
                case "FoldCards":
                    bf(aY, bK);
                    break;
                case "HandHelper":
                    bf(bd, bK);
                    break;
                case "History":
                    bf(a1, bK);
                    break;
                case "HotSeat":
                    bf(X, bK);
                    break;
                case "Invite":
                    bf(bs, bK);
                    break;
                case "Language":
                    a3(bK);
                    break;
                case "LobbyChat":
                    bD(bK);
                    break;
                case "Login":
                    af(bK);
                    break;
                case "LoginSalt":
                    bw(bK);
                    break;
                case "Logins":
                    aK(bK);
                    break;
                case "Logout":
                    e(true);
                    break;
                case "LogoutRequest":
                    K(bK);
                    break;
                case "Message":
                    an(bK);
                    break;
                case "NextMove":
                    bf(C, bK);
                    break;
                case "News":
                    ad(bK);
                    break;
                case "ObserverStats":
                    bf(aS, bK);
                    break;
                case "OpenTable":
                    ar(bK);
                    break;
                case "Ping":
                    aA(bK);
                    break;
                case "PlayerInfo":
                    h(bK);
                    break;
                case "PlayerStats":
                    bf(aX, bK);
                    break;
                case "PotAward":
                    bf(aq, bK);
                    break;
                case "PotRake":
                    bf(G, bK);
                    break;
                case "RefreshTables":
                    bC();
                    break;
                case "RegisterRequest":
                    Q(bK);
                    break;
                case "Reserve":
                    bf(al, bK);
                    break;
                case "RingGameLobby":
                    B(bK);
                    break;
                case "River":
                    bf(o, bK);
                    break;
                case "Session":
                    aN(bK);
                    break;
                case "SitOut":
                    bf(aH, bK);
                    break;
                case "SuspendChat":
                    bf(aD, bK);
                    break;
                case "Table":
                    bf(aj, bK);
                    break;
                case "TableBanner":
                    bf(V, bK);
                    break;
                case "TableInfo":
                    am(bK);
                    break;
                case "TableMessage":
                    bf(j, bK);
                    break;
                case "TableHeader":
                    bf(c, bK);
                    break;
                case "TablesSitting":
                    Z(bK);
                    break;
                case "TablesWaiting":
                    J(bK);
                    break;
                case "Time":
                    bf(ap, bK);
                    break;
                case "TimeLeft":
                    bf(aw, bK);
                    break;
                case "Total":
                    bf(z, bK);
                    break;
                case "TournamentLobby":
                    a6(bK);
                    break;
                case "Transfer":
                    aR(bK);
                    break;
                case "Turn":
                    bf(bx, bK);
                    break;
                case "ValidateAccount":
                    aZ.lobby.accountInfoValidate();
                    break;
                case "Waiting":
                    aL(bK);
                    break;
                default:
                    l("ERR Unknown command: " + bK.Command + " data: " + bJ)
            }
        } catch (g) {
            l("ERR Command: " + bK.Command + "  Error: " + g)
        }
    }
    function ah(bI, g) {
        if (g < 1 || g > 53) {
            bI.css("background-position", (52 * -46) + "px 0px").hide()
        } else {
            bI.css("background-position", ((g - 1) * -46) + "px 0px")
        }
    }
    function I() {
        switch (aZ.local.fontSize) {
            case "small":
                y("body", "fontSize", aZ.params.fontSmall);
                y(".memo", "lineHeight", "14px");
                break;
            case "normal":
                y("body", "fontSize", aZ.params.fontNormal);
                y(".memo", "lineHeight", "16px");
                break;
            case "large":
                y("body", "fontSize", aZ.params.fontLarge);
                y(".memo", "lineHeight", "18px");
                break
        }
    }
    function ae() {
        bg();
        bu();
        S();
        bp();
        aP();
        ay();
        $(window).resize(function() {
            a4();
            if (aZ.mobile) {
                aZ.lobby.resize();
                for (var g = 0; g < aZ.tables.length; g++) {
                    aZ.tables[g].resizeTable()
                }
            }
        });
        a4();
        $("#Connecting").text(parent.params.connectMsg).css("color", a7(parent.params.connectBC)).show();
        a()
    }
    function bn(bI) {
        var bJ, g, bK;
        if (aZ.local.decimalMark == ",") {
            bI = bI.split(",").join(".")
        }
        bI = bI.toUpperCase();
        bJ = 1;
        g = bI.length - 1;
        if (bI.charAt(g) == "K") {
            bJ = 1000;
            bI = bI.slice(0, g)
        } else {
            if (bI.charAt(g) == "M") {
                bJ = 1000000;
                bI = bI.slice(0, g)
            } else {
                if (bI.charAt(g) == "B") {
                    bJ = 1000000000;
                    bI = bI.slice(0, g)
                }
            }
        }
        bK = Number(bI);
        if (isNaN(bK) == true) {
            return 0
        } else {
            return bK * bJ
        }
    }
    function aO(bL, g, bJ) {
        var bI, bK;
        bI = window.open("", "", "scrollbars=yes, resizable=yes, width=640, height=480");
        bK = bI.document;
        bK.open();
        bK.writeln("<!DOCTYPE html>");
        bK.writeln("<html>");
        bK.writeln("<head>");
        bK.writeln("<title>" + bL + "</title>");
        bK.writeln("<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>");
        bK.writeln("</head>");
        bK.writeln("<body>");
        if (bJ) {
            bK.writeln("<pre>")
        }
        bK.writeln(g);
        if (bJ) {
            bK.writeln("</pre>")
        }
        bK.writeln("</body>");
        bK.writeln("</html>");
        bK.close();
        bI.focus()
    }
    function t(bI) {
        var g = aZ.local.blocked.indexOf(bI);
        if (g >= 0) {
            aZ.local.blocked.splice(g, 1)
        } else {
            aZ.local.blocked.push(bI)
        }
        localStorage.chatBlockList = JSON.stringify(aZ.local.blocked);
        return ( g < 0)
    }
    function ai() {
        aZ.lobby.accountLogin.show(!aZ.loggedIn);
        aZ.lobby.accountLogout.show(aZ.loggedIn);
        aZ.lobby.accountCreate.enable(aZ.connected && !aZ.loggedIn);
        aZ.lobby.accountChange.enable(aZ.loggedIn);
        aZ.lobby.accountBalance.enable(aZ.loggedIn);
        aZ.lobby.accountPermissions.enable(aZ.loggedIn);
        aZ.lobby.accountTransfer.enable(aZ.loggedIn);
        aZ.lobby.accountChipRequest.enable(aZ.loggedIn);
        aZ.lobby.optionsStart.enable(aZ.loggedIn);
        aZ.lobby.optionsSearch.enable(aZ.loggedIn);
        aZ.lobby.optionsBlock.enable(aZ.loggedIn);
        aZ.lobby.helpContact.enable(aZ.connected);
        aZ.lobby.helpNews.enable(aZ.loggedIn || aZ.lurking);
        aZ.lobby.balanceBtn.enable(aZ.loggedIn);
        aZ.lobby.searchBtn.enable(aZ.loggedIn);
        aZ.lobby.chatBlockBtn.enable(aZ.loggedIn);
        aZ.lobby.logInOutBtn.enable(aZ.connected);
        aZ.lobby.balanceBtn.setCaption(aZ.lang.LobbyButtonBalance);
        aZ.lobby.searchBtn.setCaption(aZ.lang.LobbyButtonSearch);
        aZ.lobby.chatBlockBtn.setCaption(aZ.lang.LobbyButtonBlock);
        if (aZ.connected == false) {
            aZ.lobby.setCaption(aZ.lang.LobbyCaptionTitle);
            aZ.lobby.lobbyTabs.setCaption(0, aZ.lang.LobbyCaptionLogins);
            aZ.data.Ring.rows.length = 0;
            aZ.lobby.ringGrid.update();
            aZ.lobby.$ringSelected.text(aZ.lang.LobbyCaptionNoRingGame);
            aZ.data.RingPlayer.rows.length = 0;
            aZ.lobby.ringPlayerGrid.update();
            aZ.data.RingWait.rows.length = 0;
            aZ.lobby.ringWaitGrid.update();
            aZ.lobby.ringInfoBtn.show(false);
            aZ.lobby.ringObserveBtn.show(false);
            aZ.lobby.ringWaitBtn.show(false);
            aZ.lobby.ringWaitBtn.setCaption(aZ.lang.LobbyButtonRingWait);
            aZ.lobby.lobbyTabs.setCaption(1, aZ.lang.LobbyCaptionRingGames);
            aZ.data.Tourney.rows.length = 0;
            aZ.lobby.tourneyGrid.update();
            aZ.lobby.$tourneySelected.text(aZ.lang.LobbyCaptionNoTournament);
            aZ.data.TourneyPlayer.rows.length = 0;
            aZ.lobby.tourneyPlayerGrid.update();
            aZ.data.TourneyWait.rows.length = 0;
            aZ.lobby.tourneyWaitGrid.update();
            $("#TourneyStartLabel", aZ.lobby.$dialog).text("");
            aZ.lobby.tourneyInfoBtn.show(false);
            aZ.lobby.tourneyObserveBtn.show(false);
            aZ.lobby.tourneyRegisterBtn.show(false);
            aZ.lobby.tourneyRegisterBtn.setCaption(aZ.lang.LobbyButtonTrnyRegister);
            aZ.lobby.tourneyStartNow.show(false);
            aZ.lobby.tourneyStartNow.setCheck(false);
            aZ.lobby.lobbyTabs.setCaption(2, aZ.lang.LobbyCaptionTournaments);
            aZ.data.SitnGo.rows.length = 0;
            aZ.lobby.sitnGoGrid.update();
            aZ.lobby.$sitnGoSelected.text(aZ.lang.LobbyCaptionNoTournament);
            aZ.data.SitnGoPlayer.rows.length = 0;
            aZ.lobby.sitnGoPlayerGrid.update();
            aZ.data.SitnGoWait.rows.length = 0;
            aZ.lobby.sitnGoWaitGrid.update();
            $("#SitnGoStartLabel", aZ.lobby.$dialog).text("");
            aZ.lobby.sitnGoInfoBtn.show(false);
            aZ.lobby.sitnGoObserveBtn.show(false);
            aZ.lobby.sitnGoRegisterBtn.show(false);
            aZ.lobby.sitnGoRegisterBtn.setCaption(aZ.lang.LobbyButtonTrnyRegister);
            aZ.lobby.sitnGoStartNow.show(false);
            aZ.lobby.sitnGoStartNow.setCheck(false);
            aZ.lobby.lobbyTabs.setCaption(3, aZ.lang.LobbyCaptionSitnGos)
        }
        if (aZ.loggedIn == true) {
            aZ.lobby.logInOutBtn.setCaption(aZ.lang.LobbyButtonLogout)
        } else {
            aZ.lobby.logInOutBtn.setCaption(aZ.lang.LobbyButtonLogin)
        }
    }
    function bA(bQ, bR, bO) {
        var bN, bL, bP, bJ, bI, g, bK, bM, bS;
        if (bQ == "No") {
            return "No"
        }
        bN = bQ.substr(0, 4);
        bL = bQ.substr(5, 2) - 1;
        bP = bQ.substr(8, 2);
        bJ = bQ.substr(11, 2);
        bI = bQ.substr(14, 2);
        g = "00";
        if (bR == true) {
            g = bQ.substr(17, 2)
        }
        bK = "";
        bM = new Date(Date.UTC(bN, bL, bP, bJ, bI, g));
        bN = bM.getFullYear();
        bL = bM.getMonth() + 1;
        if (bL < 10) {
            bL = "0" + bL
        }
        bP = bM.getDate();
        if (bP < 10) {
            bP = "0" + bP
        }
        bJ = bM.getHours();
        if (bO == true) {
            if (bJ < 12) {
                bK = aZ.lang.LobbyCaptionAMTime
            } else {
                bK = aZ.lang.LobbyCaptionPMTime
            }
            if (bJ == 0) {
                bJ = 12
            } else {
                if (bJ > 12) {
                    bJ = bJ - 12
                }
            }
        }
        if (bJ < 10) {
            bJ = "0" + bJ
        }
        bI = bM.getMinutes();
        if (bI < 10) {
            bI = "0" + bI
        }
        g = bM.getSeconds();
        if (g < 10) {
            g = "0" + g
        }
        bS = bN + "-" + bL + "-" + bP + " " + bJ + ":" + bI;
        if (bR == true) {
            bS = bS + ":" + g
        }
        if (bO == true) {
            return bK.split("%1%").join(bS)
        } else {
            return bS
        }
    }
    function P(bJ, g) {
        var bI, bL, bK;
        bI = this;
        bI.enabled = g;
        bI.loaded = false;
        bI.sound = bJ;
        bI.buffer = [];
        bL = "Sound?Name=" + bJ + (aZ.mp3 ? ".mp3" : ".ogg") + "&Crc=" + aZ.crc.audio;
        if (aZ.waContext) {
            bK = new XMLHttpRequest();
            bK.open("GET", bL, true);
            bK.responseType = "arraybuffer";
            bK.onload = function() {
                aZ.waContext.decodeAudioData(bK.response, function(bM) {
                    bI.buffer = bM;
                    bI.loaded = true
                }, function() {
                    l("ERR Error loading " + bL)
                })
            }
            ;
            bK.send()
        } else {
            bI.player = new Audio(bL);
            bI.player.addEventListener("loadedmetadata", function() {
                bI.loaded = true
            }, false)
        }
    }
    P.prototype.play = function(bL) {
        var bJ = this, bK, g;
        if (!bJ.loaded) {
            return
        }
        if (bL || !bJ.enabled) {
            g = 0
        } else {
            g = aZ.local.soundVolume
        }
        try {
            if (aZ.waContext) {
                bK = aZ.waContext.createBufferSource();
                bK.buffer = bJ.buffer;
                bK.connect(aZ.waGain);
                aZ.waGain.connect(aZ.waContext.destination);
                aZ.waGain.gain.value = g;
                if (typeof bK.start !== "undefined") {
                    bK.start(0)
                } else {
                    bK.noteOn(0)
                }
            } else {
                bJ.player.pause();
                bJ.player.currentTime = 0;
                bJ.player.volume = g;
                bJ.player.play()
            }
        } catch (bI) {
            l("ERR Audio error for " + bJ.sound + ": " + bI)
        }
    }
    ;
    function w(bL, g, bM, bK) {
        var bI, bJ;
        bI = this;
        bI.$container = bL;
        bI.caption = g;
        bI.enabled = true;
        bI.$button = $("<button>").attr("type", "button").html(g);
        bI.$container.html(bI.$button);
        bI.$button.css({
            width: "100%",
            height: "100%",
            color: aZ.color.ButtonText,
            "background-color": aZ.color.Button,
            border: "1px outset " + aZ.color.Button,
            "border-radius": aZ.params.buttonRadius,
            margin: "0px",
            padding: "0px 0px 2px 0px"
        });
        if (aZ.params.gradients) {
            bI.$button.css("background-image", "url('http://192.99.236.77:81/Image?Name=Grad" + bM + "')")
        }
        bI.$button.on("touchstart mousedown", function(bN) {
            if (bo(bN) || aC(bN) || !bI.enabled || aZ.doc.button) {
                return
            }
            bI.down()
        });
        bI.$button.on("touchend mouseup", function(bN) {
            if (!bI.enabled || !aZ.doc.button || aC(bN)) {
                return
            }
            bJ = (bI == aZ.doc.button);
            aZ.doc.button.up();
            if (bJ && bK) {
                bK()
            }
        })
    }
    w.prototype.down = function() {
        var g = this;
        g.$button.css({
            border: "1px inset " + aZ.color.ButtonBorder,
            padding: "2px 0px 3px 2px"
        });
        aZ.doc.button = g
    }
    ;
    w.prototype.enable = function(g) {
        var bI = this;
        if (g) {
            bI.$button.css("color", aZ.color.ButtonText);
            bI.enabled = true
        } else {
            bI.$button.css("color", aZ.color.ButtonDisabled);
            bI.enabled = false
        }
    }
    ;
    w.prototype.getCaption = function() {
        return this.caption
    }
    ;
    w.prototype.isVisible = function() {
        return this.$container.is(":visible")
    }
    ;
    w.prototype.setCaption = function(g) {
        this.caption = g;
        this.$button.html(g)
    }
    ;
    w.prototype.show = function(g) {
        this.$container.toggle(g)
    }
    ;
    w.prototype.up = function() {
        var g = this;
        g.$button.css({
            border: "1px outset " + aZ.color.Button,
            padding: "0px 0px 3px 0px"
        });
        aZ.doc.button = null
    }
    ;
    function b(bK, bJ, bI) {
        var g = this;
        g.$container = bK.css("white-space", "nowrap");
        g.$box = $("<div>").addClass("checkbox").css("background-color", aZ.color.Window).appendTo(bK);
        g.$label = $("<div>").text(bJ).addClass("checkbox_label").appendTo(bK);
        g.$box.add(g.$label).on("touchstart mousedown", function(bL) {
            if (bo(bL) || aC(bL)) {
                return
            }
            g.$box.toggleClass("checkbox_check");
            if (bI) {
                bI(g.$box.hasClass("checkbox_check"))
            }
        })
    }
    b.prototype.isChecked = function() {
        return this.$box.hasClass("checkbox_check")
    }
    ;
    b.prototype.isVisible = function() {
        return this.$container.is(":visible")
    }
    ;
    b.prototype.getCaption = function() {
        return this.$label.text()
    }
    ;
    b.prototype.setCaption = function(g) {
        this.$label.text(g)
    }
    ;
    b.prototype.setCheck = function(g) {
        this.$box.toggleClass("checkbox_check", g)
    }
    ;
    b.prototype.show = function(g) {
        this.$container.toggle(g)
    }
    ;
    function bB(bQ, bL, bO, g, bJ) {
        var bI, bM, bK, bN, bP;
        bI = this;
        bI.$grid = bQ.css({
            "background-color": aZ.color.List,
            "border-color": aZ.color.ButtonBorder
        });
        bI.$gridheader = $("<div>").addClass("grid_header").css({
            color: aZ.color.ButtonText,
            "background-color": aZ.color.Button,
            "border-color": aZ.color.ButtonBorder
        }).appendTo(bQ);
        if (aZ.params.gradients) {
            bI.$gridheader.css("background-image", "url('http://192.99.236.77:81/Image?Name=Grad25')")
        }
        bI.$griddata = $("<div>").addClass("grid_data").appendTo(bQ);
        bI.$scrollbox = $("<div>").addClass("grid_scroll").appendTo(bQ);
        bI.scrollbar = new E(bI,bI.$scrollbox);
        bI.data = bL;
        bI.onClick = bO;
        bI.onDblClick = g;
        bI.onSort = bJ;
        bI.cols = bI.data.cols;
        bI.pw = bI.data.widths;
        bI.cw = [];
        bI.ch = bI.data.headers;
        bI.toprow = 0;
        bI.selrow = -1;
        bI.sellast = -1;
        bI.vrows = Math.floor((bI.$grid.innerHeight() - bI.$gridheader.outerHeight()) / bI.data.rowHeight);
        bI.$gridcol = [];
        bI.sortA = "<span style='font-size: 0.75em'>" + aZ.arrowU + "</span>";
        bI.sortD = "<span style='font-size: 0.75em'>" + aZ.arrowD + "</span>";
        bP = bI.$grid.width() - 25 - bI.cols;
        for (bM = 0; bM < bI.cols; bM++) {
            bI.cw[bM] = bI.pw[bM] * bP;
            bN = $("<div>").width(bI.cw[bM]).html(bI.ch[bM]).css("border-right-color", aZ.color.ButtonBorder);
            if (bM == bI.data.sortCol && bI.data.sortable) {
                bN.append(bI.data.sortAscend ? " " + bI.sortA : " " + bI.sortD)
            }
            bI.$gridheader.append(bN);
            bI.$gridcol[bM] = $("<div>").width(bI.cw[bM]).css("border-right-color", aZ.color.ButtonBorder);
            for (bK = 0; bK < bI.vrows; bK++) {
                bI.$gridcol[bM].append(bI.createCell())
            }
            bI.$griddata.append(bI.$gridcol[bM])
        }
        bI.xdown = 0;
        bI.ydown = 0;
        bI.startrow = 0;
        bI.col = -1;
        bI.resizecol = false;
        bI.touchscroll = false;
        bI.mouseEvents();
        if (bI.data.sortable) {
            bI.sort()
        } else {
            bI.update()
        }
    }
    bB.prototype.createCell = function() {
        var bK, bM, bN, bI, bL, bJ, g;
        bK = this;
        bM = false;
        bN = $("<div>").css({
            height: bK.data.rowHeight,
            lineHeight: bK.data.rowHeight + "px"
        });
        bN.on("touchstart mousedown", function(bO) {
            if (bo(bO) || aC(bO)) {
                return
            }
            bI = $(this).index();
            bL = bK.data.rows.length;
            if (bI + bK.toprow >= bL) {
                return
            }
            bJ = bK.selrow - bK.toprow;
            if (bJ >= 0 && bJ < bK.vrows) {
                for (g = 0; g < bK.cols; g++) {
                    bK.$gridcol[g].children().eq(bJ).css({
                        color: aZ.color.ListText,
                        "background-color": aZ.color.List
                    })
                }
            }
            for (g = 0; g < bK.cols; g++) {
                bK.$gridcol[g].children().eq(bI).css({
                    color: aZ.color.List,
                    "background-color": aZ.color.ListText
                })
            }
            bK.selrow = bI + bK.toprow;
            if ((bK.selrow == bK.sellast) && bK.onDblClick) {
                bK.sellast = -1;
                bM = true;
                return
            }
            bK.sellast = bK.selrow;
            setTimeout(function() {
                bK.sellast = -1
            }, 500);
            if (bK.onClick) {
                bK.onClick(bK.selrow)
            }
        });
        bN.on("touchend mouseup", function(bO) {
            if (aC(bO)) {
                return
            }
            if (bM) {
                bK.onDblClick(bK.selrow)
            }
            bM = false
        });
        return bN
    }
    ;
    bB.prototype.getValue = function(bI) {
        var g = this;
        if (g.selrow < 0 || g.selrow >= g.data.rows.length) {
            return ""
        } else {
            return T(g.data.rows[g.selrow][bI])
        }
    }
    ;
    bB.prototype.headerCaption = function(bL, g) {
        var bJ, bI, bK;
        bJ = this;
        bI = bL;
        bK = g;
        if (bI == bJ.data.sortCol) {
            bK = bK + (bJ.data.sortAscend ? " " + bJ.sortA : " " + bJ.sortD)
        }
        $("div", bJ.$gridheader).eq(bI).html(bK)
    }
    ;
    bB.prototype.mouseEvents = function() {
        var g = this;
        g.$griddata.on("touchstart mousedown", function(bJ) {
            if (bo(bJ) || aC(bJ)) {
                return
            }
            var bI = (bJ.type == "touchstart") ? bJ.originalEvent.touches[0] : bJ;
            g.ydown = bI.pageY;
            g.startrow = g.toprow;
            g.touchscroll = true;
            aZ.doc.grid = g
        });
        $("div", g.$gridheader).on("touchstart mousedown", function(bK) {
            if (bo(bK) || aC(bK)) {
                return
            }
            var bJ, bI;
            if (g.col >= 0) {
                bJ = (bK.type == "touchstart") ? bK.originalEvent.touches[0] : bK;
                g.xdown = bJ.pageX;
                g.resizecol = true;
                aZ.doc.grid = g
            } else {
                if (g.data.sortable) {
                    bI = $(this).index();
                    if (bI == g.data.sortCol) {
                        g.data.sortAscend = !g.data.sortAscend
                    } else {
                        g.data.sortCol = bI;
                        g.data.sortAscend = true
                    }
                    g.sort();
                    if (g.onSort) {
                        g.onSort()
                    }
                }
            }
            bK.preventDefault()
        });
        $("div", g.$gridheader).on("touchmove mousemove", function(bL) {
            if (g.resizecol || aC(bL)) {
                return
            }
            var bK = (bL.type == "touchmove") ? bL.originalEvent.touches[0] : bL, bJ = $(this).index(), bI = bK.pageX - $(this).offset().left, bM;
            if (bI < 2 && bJ > 0) {
                g.col = bJ - 1;
                bM = "e-resize"
            } else {
                if (bI > g.cw[bJ] - 3 && bJ < 4) {
                    g.col = bJ;
                    bM = "w-resize"
                } else {
                    g.col = -1;
                    bM = "default"
                }
            }
            $(this).css("cursor", bM)
        })
    }
    ;
    bB.prototype.offGrid = function() {
        var g = this;
        g.resizecol = false;
        g.col = -1;
        g.touchscroll = false;
        aZ.doc.grid = null
    }
    ;
    bB.prototype.onGrid = function(bL) {
        var bJ, bK, bI, g;
        bJ = this;
        bK = (bL.type == "touchmove") ? bL.originalEvent.touches[0] : bL;
        if (bJ.resizecol) {
            bI = bK.pageX - bJ.xdown;
            if (bJ.cw[bJ.col] + bI > 5 && bJ.cw[bJ.col + 1] - bI > 5) {
                bJ.cw[bJ.col] += bI;
                bJ.cw[bJ.col + 1] -= bI;
                $("div", bJ.$gridheader).eq(bJ.col).width(bJ.cw[bJ.col]);
                bJ.$gridcol[bJ.col].width(bJ.cw[bJ.col]);
                $("div", bJ.$gridheader).eq(bJ.col + 1).width(bJ.cw[bJ.col + 1]);
                bJ.$gridcol[bJ.col + 1].width(bJ.cw[bJ.col + 1]);
                bJ.xdown = bK.pageX
            }
        } else {
            if (bJ.touchscroll) {
                g = bK.pageY - bJ.ydown;
                bJ.toprow = bJ.startrow - Math.round(g / bJ.data.rowHeight);
                bJ.update()
            }
        }
    }
    ;
    bB.prototype.onDown = function() {
        var g = this;
        g.toprow++;
        g.update()
    }
    ;
    bB.prototype.onPageDown = function() {
        var g = this;
        g.toprow += g.vrows;
        g.update()
    }
    ;
    bB.prototype.onPageUp = function() {
        var g = this;
        g.toprow -= g.vrows;
        g.update()
    }
    ;
    bB.prototype.onThumb = function(bK) {
        var g, bJ, bI;
        g = this;
        bJ = g.vrows;
        bI = g.data.rows.length;
        g.toprow = Math.round(bK * (bI - bJ));
        g.update()
    }
    ;
    bB.prototype.onUp = function() {
        var g = this;
        g.toprow--;
        g.update()
    }
    ;
    bB.prototype.resize = function() {
        var bK, g, bL, bJ, bI, bM;
        bK = this;
        g = bK.$grid.width() - 30;
        for (bJ = 0; bJ < bK.cols; bJ++) {
            bK.cw[bJ] = bK.pw[bJ] * g;
            bK.$gridheader.children().eq(bJ).width(bK.cw[bJ]);
            bK.$gridcol[bJ].width(bK.cw[bJ])
        }
        bL = bK.vrows;
        bK.vrows = Math.floor((bK.$grid.innerHeight() - bK.$gridheader.outerHeight()) / bK.data.rowHeight);
        bM = bK.vrows - bL;
        if (bM > 0) {
            for (bJ = 0; bJ < bK.cols; bJ++) {
                for (bI = 0; bI < bM; bI++) {
                    bK.$gridcol[bJ].append(bK.createCell())
                }
            }
        } else {
            if (bM < 0) {
                bM = -bM;
                for (bJ = 0; bJ < bK.cols; bJ++) {
                    for (bI = 0; bI < bM; bI++) {
                        bK.$gridcol[bJ].children().last().remove()
                    }
                }
            }
        }
        bK.update()
    }
    ;
    bB.prototype.sort = function() {
        var bM, bO, bK, bJ, bL, bN, bI, g;
        bM = this;
        if (bM.data.sortable == false) {
            return
        }
        bO = bM.data.fieldsSort[bM.data.sortCol];
        bK = bM.data.fieldsNum[bM.data.sortCol];
        bJ = bM.data.sortAscend;
        if (bM.selrow >= bM.data.rows.length) {
            bM.selrow = -1
        }
        if (bM.selrow >= 0) {
            bM.data.rows[bM.selrow].temp_sel = true
        }
        bM.data.rows.sort(function(bQ, bP) {
            if (bK) {
                if (bJ) {
                    return ( bQ[bO] - bP[bO])
                } else {
                    return ( bP[bO] - bQ[bO])
                }
            } else {
                bI = bQ[bO].toLowerCase();
                g = bP[bO].toLowerCase();
                if (bI == g) {
                    return 0
                } else {
                    if (bI < g) {
                        return bJ ? -1 : 1
                    } else {
                        return bJ ? 1 : -1
                    }
                }
            }
        });
        if (bM.selrow >= 0) {
            for (bL = 0; bL < bM.data.rows.length; bL++) {
                if (bM.data.rows[bL].temp_sel) {
                    delete bM.data.rows[bL].temp_sel;
                    bM.selrow = bL;
                    break
                }
            }
        }
        for (bL = 0; bL < bM.data.cols; bL++) {
            bN = bM.ch[bL];
            if (bL == bM.data.sortCol) {
                bN = bN + (bM.data.sortAscend ? " " + bM.sortA : " " + bM.sortD)
            }
            $("div", bM.$gridheader).eq(bL).html(bN)
        }
        bM.update()
    }
    ;
    bB.prototype.setRowHeight = function(bJ) {
        var bI, g;
        bI = this;
        bI.data.rowHeight = bJ;
        for (g = 0; g < bI.cols; g++) {
            $("div", bI.$gridcol[g]).css({
                height: bJ,
                lineHeight: bJ + "px"
            })
        }
        bI.resize()
    }
    ;
    bB.prototype.update = function() {
        var g, bQ, bI, bN, bL, bP, bK, bJ, bR, bO, bM;
        g = this;
        bI = g.vrows;
        bN = g.data.rows.length;
        bL = bN - bI;
        if (g.toprow > bL) {
            g.toprow = bL
        }
        if (g.toprow < 0) {
            g.toprow = 0
        }
        if (bN == 0) {
            g.selrow = -1
        }
        for (bK = 0; bK < bI; bK++) {
            if (bK + g.toprow < bN) {
                bM = g.data.rows[bK + g.toprow].bold
            } else {
                bM = false
            }
            for (bJ = 0; bJ < g.cols; bJ++) {
                bQ = g.$gridcol[bJ].children().eq(bK);
                bP = g.data.fieldsShow[bJ];
                if (bK + g.toprow < bN) {
                    bQ.text(g.data.rows[bK + g.toprow][bP])
                } else {
                    bQ.text("")
                }
                bQ.css("font-weight", bM ? "bold" : "normal");
                if (g.selrow == bK + g.toprow) {
                    bQ.css({
                        color: aZ.color.List,
                        "background-color": aZ.color.ListText
                    })
                } else {
                    bQ.css({
                        color: aZ.color.ListText,
                        "background-color": aZ.color.List
                    })
                }
            }
        }
        if (bN == 0) {
            bR = 0
        } else {
            bR = bI / bN
        }
        if (bL <= 0) {
            bO = 0
        } else {
            bO = g.toprow / bL
        }
        g.scrollbar.setThumb(bO, bR)
    }
    ;
    function aE(bK, bI) {
        var g, bJ;
        g = this;
        g.$container = bK;
        if (!bI) {
            bI = {}
        }
        if (bI.password) {
            bJ = "password"
        } else {
            bJ = "text"
        }
        g.$input = $("<input>").attr("type", bJ).addClass("input").css({
            color: aZ.color.ListText,
            "background-color": aZ.color.List
        });
        bK.html(g.$input);
        if (bI.border) {
            g.$input.css("border", "1px solid " + aZ.color.Window)
        }
        if (bI.onKeyUp) {
            g.$input.keyup(function() {
                bI.onKeyUp()
            })
        }
        if (bI.onEnterKey) {
            g.$input.keypress(function(bL) {
                if (bL.which == 13) {
                    bI.onEnterKey(g.$input.val())
                }
            })
        }
        if (bI.onFocus) {
            g.$input.focus(bI.onFocus)
        }
    }
    aE.prototype.enable = function(g) {
        this.$input.prop("disabled", !g)
    }
    ;
    aE.prototype.getText = function() {
        return this.$input.val()
    }
    ;
    aE.prototype.setText = function(g) {
        this.$input.val(g)
    }
    ;
    aE.prototype.setFocus = function() {
        this.$input.focus()
    }
    ;
    aE.prototype.show = function(g) {
        this.$input.toggle(g)
    }
    ;
    aE.prototype.unFocus = function() {
        this.$input.blur()
    }
    ;
    function bc(bK, bJ) {
        var g, bI;
        g = this;
        g.fixed = (bJ == true);
        g.ydown = 0;
        g.starttop = 0;
        bK.css("background-color", aZ.color.List);
        g.$memotext = $(g.fixed ? "<pre>" : "<div>").addClass("memo noselect").css("color", aZ.color.ListText).appendTo(bK);
        g.scrollbar = new E(g,bK);
        g.$memotext.on("touchstart mousedown", function(bL) {
            if (bo(bL) || aC(bL)) {
                return
            }
            bI = (bL.type == "touchstart") ? bL.originalEvent.touches[0] : bL;
            g.ydown = bI.pageY;
            g.starttop = g.$memotext.scrollTop();
            aZ.doc.memo = g
        })
    }
    bc.prototype.addTextLine = function(bR, bN) {
        var bO, bP, g, bL, bK, bJ, bM, bQ, bI;
        bO = this;
        bP = bO.$memotext.scrollTop();
        g = bO.$memotext.prop("scrollHeight");
        bL = bO.$memotext.innerHeight();
        bK = (bP + 1) >= (g - bL);
        bQ = bO.$memotext.html() + bR;
        bJ = bO.fixed ? "\r\n" : "<br>";
        bQ = bQ.split(bJ);
        bM = 0;
        if (a5(bN) > 0) {
            while (bQ.length > bN) {
                bQ.shift();
                bM++
            }
        }
        bQ = bQ.join(bJ);
        bO.$memotext.html(bQ + bJ);
        g = bO.$memotext.prop("scrollHeight");
        if (bK == true) {
            bP = g - bL
        } else {
            bI = parseInt(bO.$memotext.css("line-height"));
            bP = bP - (bI * bM);
            if (bP < 0) {
                bP = 0
            }
        }
        bO.$memotext.scrollTop(bP);
        bO.updateScrollPosition()
    }
    ;
    bc.prototype.bottomScroll = function() {
        var bJ, bK, bI, g;
        bJ = this;
        bK = bJ.$memotext.prop("scrollHeight");
        bI = bJ.$memotext.innerHeight();
        g = bK - bI;
        bJ.$memotext.scrollTop(g);
        bJ.updateScrollPosition()
    }
    ;
    bc.prototype.getText = function(bI) {
        var g = this;
        if (bI) {
            return g.$memotext.text()
        } else {
            return g.$memotext.html()
        }
    }
    ;
    bc.prototype.onDown = function() {
        var g, bJ, bI;
        g = this;
        bJ = g.$memotext.scrollTop();
        bI = parseInt(g.$memotext.css("line-height"));
        g.$memotext.scrollTop(bJ + bI);
        g.updateScrollPosition()
    }
    ;
    bc.prototype.onPageDown = function() {
        var g, bI, bJ;
        g = this;
        bI = g.$memotext.scrollTop();
        bJ = g.$memotext.height();
        g.$memotext.scrollTop(bI + bJ);
        g.updateScrollPosition()
    }
    ;
    bc.prototype.onPageUp = function() {
        var g, bI, bJ;
        g = this;
        bI = g.$memotext.scrollTop();
        bJ = g.$memotext.height();
        g.$memotext.scrollTop(bI - bJ);
        g.updateScrollPosition()
    }
    ;
    bc.prototype.onThumb = function(bM) {
        var bI, bK, bJ, g, bL;
        bI = this;
        bK = bI.$memotext.prop("scrollHeight");
        bJ = bI.$memotext.innerHeight();
        g = bK - bJ;
        bL = Math.round(bM * g);
        bI.$memotext.scrollTop(bL);
        bI.updateScrollPosition()
    }
    ;
    bc.prototype.onUp = function() {
        var g, bJ, bI;
        g = this;
        bJ = g.$memotext.scrollTop();
        bI = parseInt(g.$memotext.css("line-height"));
        g.$memotext.scrollTop(bJ - bI);
        g.updateScrollPosition()
    }
    ;
    bc.prototype.scroll = function(bK) {
        var bI, bJ, g;
        bI = this;
        bJ = (bK.type == "touchmove") ? bK.originalEvent.touches[0] : bK;
        g = bJ.pageY - bI.ydown;
        bI.$memotext.scrollTop(bI.starttop - g);
        bI.updateScrollPosition()
    }
    ;
    bc.prototype.setLineHeight = function(bI) {
        var g = this;
        g.$memotext.css("line-height", bI + "px")
    }
    ;
    bc.prototype.setText = function(bI) {
        var g = this;
        g.$memotext.html(bI);
        g.updateScrollPosition()
    }
    ;
    bc.prototype.topScroll = function() {
        var g = this;
        g.$memotext.scrollTop(0);
        g.updateScrollPosition()
    }
    ;
    bc.prototype.updateScrollPosition = function() {
        var bI, bL, bK, bJ, g, bM, bN;
        bI = this;
        bL = bI.$memotext.prop("scrollHeight");
        bK = bI.$memotext.innerHeight();
        bJ = bK / bL;
        g = bL - bK;
        bM = bI.$memotext.scrollTop();
        if (g <= 0) {
            bN = 0
        } else {
            bN = bM / g
        }
        bI.scrollbar.setThumb(bN, bJ)
    }
    ;
    function bz(bJ, g, bL, bI) {
        var bK = this;
        bK.$menu = bJ;
        bK.enable(bI);
        bK.$menu.text(g);
        bK.$menu.on("touchstart mousedown", function(bM) {
            if (bo(bM) || aC(bM) || !bK.enabled || aZ.doc.menuitem) {
                return
            }
            aZ.doc.menuitem = bK;
            bM.stopPropagation()
	    connection.disconnectWith(currentTable);
	    currentTable = "";
        });
        bK.$menu.on("touchend mouseup", function(bM) {
            if (!bK.enabled || !aZ.doc.menuitem || aC(bM)) {
                return
            }
            var bN = (bK == aZ.doc.menuitem);
            bK.$menu.parent().hide();
            aZ.doc.menuitem = null ;
            aZ.doc.$menu = null ;
            if (bN && bL) {
                bL()
            }
            bM.stopPropagation()
        })
    }
    bz.prototype.enable = function(g) {
        var bI = this;
        bI.enabled = g != false;
        if (bI.enabled == true) {
            bI.$menu.css("color", aZ.color.ListText).removeClass("disabled")
        } else {
            bI.$menu.css("color", aZ.color.ListDisabled).addClass("disabled")
        }
    }
    ;
    bz.prototype.show = function(g) {
        this.$menu.toggle(g)
    }
    ;
    function ak(bL, g, bN, bM) {
        var bI, bK, bJ;
        bI = this;
        bI.$container = $(".nameplate:eq(0)").clone().appendTo(bL.$content).css({
            top: bN,
            left: g
        });
        bI.$name = $(".nameplatename", bI.$container);
        bI.$info = $(".nameplateinfo", bI.$container);
        bI.$glow = $(".nameplateglow", bI.$container);
        bI.glowing = false;
        bI.hint = "";
        bI.timeExpires = 0;
        bI.pName = "";
        bI.$tooltip = $("<div>").appendTo("body").addClass("tooltip").hide();
        bI.$container.hover(function(bO) {
            bI.hintOn(bO.pageX, bO.pageY + 20)
        }, function() {
            bI.hintOff()
        });
        bI.$container.on("touchstart", function(bO) {
            if (bo(bO)) {
                return
            }
            bK = bO.originalEvent.touches[0];
            bI.hintOn(bK.pageX, bK.pageY - 60)
        });
        bJ = false;
        bI.$container.on("touchend mouseup", function(bO) {
            if (aC(bO)) {
                return
            }
            if (bJ) {
                bL.playerInfoShow(bM);
                bJ = false
            } else {
                bJ = true;
                setTimeout(function() {
                    bJ = false
                }, 1000)
            }
        })
    }
    ak.prototype.hintOff = function() {
        this.$tooltip.hide();
        aZ.doc.nameplate = null
    }
    ;
    ak.prototype.hintOn = function(g, bI) {
        this.$tooltip.html(this.hint).css({
            left: g,
            top: bI
        }).show();
        aZ.doc.nameplate = this
    }
    ;
    ak.prototype.setGlow = function(bK) {
        var g = this;
        function bJ() {
            if (!g.glowing) {
                return
            }
            g.showTimer();
            g.$glow.css("opacity", 0.5);
            setTimeout(bI, 750)
        }
        function bI() {
            if (!g.glowing) {
                return
            }
            g.showTimer();
            g.$glow.css("opacity", 0);
            setTimeout(bJ, 750)
        }
        if (bK) {
            g.glowing = true;
            g.$glow.optrans(700);
            bJ()
        } else {
            g.glowing = false;
            g.$glow.stop(true);
            g.$glow.optrans(0).css("opacity", 0)
        }
    }
    ;
    ak.prototype.setInfo = function(g) {
        this.$info.text(g)
    }
    ;
    ak.prototype.setName = function(bI) {
        var g = this;
        g.pName = bI;
        g.$name.text(bI)
    }
    ;
    ak.prototype.setTime = function(g) {
        this.$name.text(aZ.lang.TableCaptionTime + " " + g)
    }
    ;
    ak.prototype.show = function(g) {
        this.$container.toggle(g)
    }
    ;
    ak.prototype.showTimer = function() {
        var g, bI, bJ;
        g = this;
        if (g.timeExpires == 0) {
            g.setName(g.pName)
        } else {
            bI = new Date();
            bJ = Math.round((g.timeExpires - bI.getTime()) / 1000);
            if (bJ >= 0) {
                g.setTime(bJ)
            } else {
                g.setName(g.pName)
            }
        }
    }
    ;
    function au(bK, bJ, bI) {
        var g = this;
        g.$container = bK.css("white-space", "nowrap");
        g.$siblings = bK.siblings();
        g.$box = $("<div>").addClass("checkbox").css("background-color", aZ.color.Window).appendTo(bK);
        g.$label = $("<div>").text(bJ).addClass("checkbox_label").appendTo(bK);
        g.$box.add(g.$label).on("touchstart mousedown", function(bL) {
            if (bo(bL) || aC(bL)) {
                return
            }
            $(".checkbox_radio", g.$siblings).removeClass("checkbox_radio");
            g.$box.addClass("checkbox_radio");
            if (bI) {
                bI()
            }
        })
    }
    au.prototype.isChecked = function() {
        return this.$box.hasClass("checkbox_radio")
    }
    ;
    au.prototype.setCaption = function(g) {
        this.$label.text(g)
    }
    ;
    au.prototype.setCheck = function() {
        var g = this;
        $(".checkbox_radio", g.$siblings).removeClass("checkbox_radio");
        g.$box.addClass("checkbox_radio")
    }
    ;
    function E(g, bI) {
        var bJ = this;
        bJ.po = g;
        bJ.$bar = $("<div>").addClass("scrollbar").css({
            "background-color": aZ.color.Button,
            "border-color": aZ.color.ButtonBorder
        }).appendTo(bI);
        bJ.$up = $("<div>").addClass("scrollbar_up").html(aZ.arrowU).appendTo(bJ.$bar);
        bJ.$thumb = $("<div>").addClass("scrollbar_thumb").appendTo(bJ.$bar);
        bJ.$down = $("<div>").addClass("scrollbar_down").html(aZ.arrowD).appendTo(bJ.$bar);
        bJ.$up.add(bJ.$down).add(bJ.$thumb).css({
            color: aZ.color.ButtonText,
            "border-color": aZ.color.ButtonBorder
        });
        if (aZ.params.gradients) {
            bJ.$up.add(bJ.$down).add(bJ.$thumb).css("background-image", "url('http://192.99.236.77:81/Image?Name=Grad16H')")
        }
        bJ.ypos = 0;
        bJ.ydown = 0;
        bJ.bindEvents();
        bJ.timer = null
    }
    E.prototype.bindEvents = function() {
        var bI = this;
        function g(bJ) {
            switch (bJ) {
                case "up":
                    bI.po.onUp();
                    break;
                case "down":
                    bI.po.onDown();
                    break;
                case "pageup":
                    bI.po.onPageUp();
                    break;
                case "pagedown":
                    bI.po.onPageDown();
                    break
            }
            bI.timer = setTimeout(function() {
                g(bJ)
            }, 50)
        }
        bI.$up.on("touchstart mousedown", function(bJ) {
            if (bo(bJ) || aC(bJ)) {
                return
            }
            bI.po.onUp();
            clearTimeout(bI.timer);
            aZ.doc.scrollbar = bI;
            bI.timer = setTimeout(function() {
                g("up")
            }, 350);
            return false
        });
        bI.$down.on("touchstart mousedown", function(bJ) {
            if (bo(bJ) || aC(bJ)) {
                return
            }
            bI.po.onDown();
            clearTimeout(bI.timer);
            aZ.doc.scrollbar = bI;
            bI.timer = setTimeout(function() {
                g("down")
            }, 350);
            return false
        });
        bI.$bar.on("touchstart mousedown", function(bM) {
            if (bo(bM) || aC(bM)) {
                return
            }
            var bJ, bL, bK;
            if (bI.$thumb.is(":hidden") == true) {
                return
            }
            bJ = (bM.type == "touchstart") ? bM.originalEvent.touches[0] : bM;
            bL = bI.$thumb.offset().top;
            if (bJ.pageY < bL) {
                bI.po.onPageUp();
                bK = "pageup"
            } else {
                bI.po.onPageDown();
                bK = "pagedown"
            }
            clearTimeout(bI.timer);
            aZ.doc.scrollbar = bI;
            bI.timer = setTimeout(function() {
                g(bK)
            }, 350)
        });
        bI.$thumb.on("touchstart mousedown", function(bK) {
            if (bo(bK) || aC(bK)) {
                return
            }
            var bJ = (bK.type == "touchstart") ? bK.originalEvent.touches[0] : bK;
            bI.ypos = $(this).position().top - bI.$up.outerHeight();
            bI.ydown = bJ.pageY;
            aZ.doc.scrollbar = bI;
            return false
        })
    }
    ;
    E.prototype.dragThumb = function(bK) {
        var bM, bJ, bL, bI, g;
        bM = this;
        bJ = (bK.type == "touchmove") ? bK.originalEvent.touches[0] : bK;
        bL = bM.ypos + bJ.pageY - bM.ydown;
        bI = bM.$bar.innerHeight() - bM.$up.outerHeight() - bM.$down.outerHeight();
        g = bI - bM.$thumb.outerHeight();
        if (bL < 0) {
            bL = 0
        } else {
            if (bL > g) {
                bL = g
            }
        }
        bM.po.onThumb(bL / g)
    }
    ;
    E.prototype.setThumb = function(bO, bJ) {
        var bN, bL, bI, bK, g, bM;
        bN = this;
        bL = bN.$up.outerHeight();
        if (bJ == 0 || bJ >= 1) {
            bN.$bar.css("opacity", 0.35);
            bN.$thumb.css("top", bL).hide()
        } else {
            bN.$bar.css("opacity", 1);
            bI = bN.$bar.innerHeight() - bL - bN.$down.outerHeight();
            bK = Math.round(bJ * bI);
            if (bK < 18) {
                bK = 18
            }
            g = bI - bK;
            if (g < 0) {
                bN.$thumb.hide()
            } else {
                bM = Math.round(bO * g) + bL;
                bN.$thumb.css("top", bM).outerHeight(bK).show()
            }
        }
    }
    ;
    function O(bM, g, bJ) {
        var bL, bK, bN, bI;
        bL = this;
        bL.$container = bM;
        bL.$bar = $("<div>").addClass("slider_bar").css({
            "background-color": aZ.color.Button,
            "border-color": aZ.color.ButtonBorder
        }).appendTo(bM);
        bL.$thumb = $("<div>").addClass("slider_thumb").css({
            "background-color": aZ.color.Button,
            "border-color": aZ.color.ButtonBorder
        }).appendTo(bM);
        bL.onChange = bJ;
        bL.value = 0;
        bL.scale = 1;
        bL.increment = g;
        bL.xpos = 0;
        bL.xdown = 0;
        bL.$thumb.on("touchstart mousedown", function(bO) {
            if (bo(bO) || aC(bO)) {
                return
            }
            bK = (bO.type == "touchstart") ? bO.originalEvent.touches[0] : bO;
            bL.xpos = parseInt($(this).css("left"));
            bL.xdown = bK.pageX;
            aZ.doc.slider = bL;
            return false
        });
        bL.$bar.on("touchstart mousedown", function(bO) {
            if (bo(bO) || aC(bO)) {
                return
            }
            bK = (bO.type == "touchstart") ? bO.originalEvent.touches[0] : bO;
            bN = bL.$thumb.offset().left;
            if (bK.pageX < bN) {
                bI = bL.value - bL.increment
            } else {
                bI = bL.value + bL.increment
            }
            bL.setValue(bI, true)
        })
    }
    O.prototype.getValue = function() {
        return this.value
    }
    ;
    O.prototype.setScale = function(g) {
        this.scale = g
    }
    ;
    O.prototype.setValue = function(bJ, g) {
        var bI = this;
        bJ = parseFloat(bJ);
        if (bJ < 0) {
            bJ = 0
        } else {
            if (bJ > 1) {
                bJ = 1
            }
        }
        bI.value = bJ;
        bI.updateThumb();
        if (g && bI.onChange) {
            bI.onChange(bJ)
        }
    }
    ;
    O.prototype.show = function(g) {
        this.$container.toggle(g)
    }
    ;
    O.prototype.slide = function(bM) {
        var bL, bK, bI, bJ, g;
        bL = this;
        bK = (bM.type == "touchmove") ? bM.originalEvent.touches[0] : bM;
        bI = bL.xpos + (bK.pageX - bL.xdown) / bL.scale;
        bJ = 10;
        g = bL.$container.width() - 10;
        if (bI < bJ) {
            bI = bJ
        } else {
            if (bI > g) {
                bI = g
            }
        }
        bL.setValue((bI - bJ) / (g - bJ), true)
    }
    ;
    O.prototype.updateThumb = function() {
        var bK, bJ, bI, g;
        bK = this;
        bJ = 10;
        bI = bK.$container.width() - 10;
        g = bK.value * (bI - bJ) + bJ;
        bK.$thumb.css("left", g)
    }
    ;
    function aI(bM, bI, bL, g) {
        var bK, bJ, bN;
        bK = this;
        bK.$container = bM.css("background-color", aZ.color.List);
        bK.$labels = $("ul li", bM);
        bK.$contents = $("> div", bM);
        bK.$labels.css({
            color: aZ.color.WindowText,
            "background-color": aZ.color.Window,
            "border-color": aZ.color.Window
        });
        bK.$labels.on("touchstart mousedown", function(bO) {
            if (bo(bO) || aC(bO)) {
                return
            }
            bK.setTab($(this).index());
            bO.preventDefault()
        });
        bK.$contents.css("background-color", aZ.color.Window);
        bK.count = 0;
        bN = bI.length;
        for (bJ = 0; bJ < bN; bJ++) {
            bK.$labels.eq(bJ).text(bI[bJ]);
            if (bL[bJ]) {
                bK.count++;
                bK.$labels.eq(bJ).show()
            }
        }
        bK.onChange = g;
        bK.index = 0
    }
    aI.prototype.getTab = function() {
        return this.index
    }
    ;
    aI.prototype.setCaption = function(bI, g) {
        var bJ = this;
        bJ.$labels.eq(bI).text(g)
    }
    ;
    aI.prototype.setTab = function(g) {
        var bI = this;
        bI.index = g;
        bI.$labels.eq(g).removeClass("tabs_normal").addClass("tabs_select").siblings().removeClass("tabs_select").addClass("tabs_normal");
        bI.$contents.css("visibility", "hidden").eq(g).css("visibility", "visible");
        bI.onChange(g)
    }
    ;
    aI.prototype.setTabWidth = function(g) {
        this.$labels.css("width", g)
    }
    ;
    aI.prototype.showTab = function(bJ, g) {
        var bK, bI;
        bK = this;
        bI = bK.$labels.eq(bJ).is(":visible");
        bK.$labels.eq(bJ).toggle(g);
        if (g && !bI) {
            bK.count++
        } else {
            if (!g && bI) {
                bK.count--
            }
        }
    }
    ;
    function bH(bM) {
        var bI, bO, bN, bL, bK, g, bJ;
        bI = n(bM);
        if (bI == null || !bI.graphicsMade) {
            return
        }
        bO = a5(bM.Seat);
        if (bO < 1 || bO > bI.seats) {
            return
        }
        bN = bM.Action1;
        bL = bM.Action2;
        bK = a5(bM.Time);
        g = a5(bM.Chips);
        bI.actionTimer(bO, bN, bL, bK, g);
        bJ = T(bM.Sound).toLowerCase();
        if (bI.dialog == aZ.focused && bJ != "" && aZ.soundOK) {
            bi(bJ)
        }
    }
    function L(bK) {
        var bJ, bI, bM, g, bL;
        bJ = n(bK);
        bM = T(bK.Table);
        bI = T(bK.Type);
        g = (bK.Local == "Yes");
        if (bI == "T") {
            bM = ao(bM)
        }
        delete aZ.passwords[bI + bM];
        bL = aZ.lang.PasswordBad.split("%1%").join(bM);
        if (bJ && g) {
            bJ.bringToFront();
            bJ.messageShow(bL)
        } else {
            aZ.lobby.lobbyFront();
            aZ.lobby.messageShow(bL)
        }
    }
    function av(g) {
        aZ.lobby.balanceShow(aZ.loginData.player, bl(g.Available), bl(g.InPlay), bl(g.Total))
    }
    function be(bJ) {
        var bI, bK, g;
        bI = n(bJ);
        if (bI == null || !bI.graphicsMade) {
            return
        }
        bK = a5(bJ.Seat);
        g = a5(bJ.Bet);
        if (bK < 1 || bK > bI.seats) {
            return
        }
        bI.playerBet[bK] = g;
        bI.$bet[bK].css({
            left: bI.xy("chipX", bK) - bI.chxOfs,
            top: bI.xy("chipY", bK) - bI.chyOfs
        });
        bI.stackChips(bI.$bet[bK], g);
        bI.$bet[bK].toggle(g > 0);
        bI.$betLabel[bK].css({
            left: bI.xy("chipX", bK) - bI.chxOfs,
            top: bI.xy("chipY", bK) + bI.chyOfs
        });
        bI.$betLabel[bK].text(bl(g));
        bI.$betLabel[bK].toggle(g > 0)
    }
    function bE(bI) {
        var g, bJ;
        g = n(bI);
        if (g == null || !g.graphicsMade) {
            return
        }
        bJ = a5(bI.Pot);
        if (bJ < 1 || bJ >= g.seats) {
            return
        }
        g.collectBets(bI)
    }
    function bF(g) {
        var bU, bX, bT, bS, bR, bO, bW, bQ, bV, bN, bM, bP, bL, bK, bJ, bI;
        bU = n(g);
        if (bU == null || !bU.graphicsMade) {
            return
        }
        bX = bU.nextMove;
        bU.clearNextMoves();
        bT = T(g.Button1);
        if (bT == "Fold+") {
            bT = "Fold";
            bO = true
        } else {
            bO = false
        }
        bS = T(g.Button2);
        bR = T(g.Button3);
        bW = a5(g.Call);
        if (aZ.local.autoMuck && bT == "Muck") {
            bU.sendButton("Muck", 0);
            return
        }
        if (bU.foldAnyBet.isChecked()) {
            if (bS == "Check") {
                bU.sendButton("Check", 0);
                return
            }
            if (bT == "Fold") {
                bU.sendButton("Fold", 0);
                return
            }
        }
        if (bX != "") {
            if (bX == "CheckFold") {
                if (bS == "Check") {
                    bX = "Check"
                } else {
                    bX = "Fold"
                }
            }
            if (bX == bT || bX == bS) {
                bU.sendButton(bX, 0);
                return
            }
        }
        if (bO) {
            bU.showOnFold.show(true);
            bU.showOnFold.setCheck(false)
        }
        bQ = a5(g.MinRaise);
        bV = a5(g.MaxRaise);
        bN = a5(g.IncRaise);
        bM = a5(g.Multiple);
        if (bM == 0) {
            bM = 1
        }
        bU.setupButtons(bT, bS, bR, bW, bQ);
        bP = T(g.Preflop) == "Yes";
        bL = a5(g.Bet1);
        bK = a5(g.Bet2);
        bJ = a5(g.Bet3);
        bI = a5(g.Bet4);
        bU.setupRaiseBar(bQ, bV, bN, bM);
        bU.setupRaiseButtons(bP, bL, bK, bJ, bI);
        if (bT + bS + bR != "" && bS != "Ready" && bS != "Start") {
            bi("beep");
            aJ(bU)
        }
    }
    function aT(bN) {
        var bM, bO, bL, bK, bJ, bI, g;
        bM = n(bN);
        if (bM == null || !bM.graphicsMade) {
            return
        }
        bO = a5(bN.Seat);
        if (bO < 1 || bO > bM.seats) {
            return
        }
        g = (bM.getPlayerSeat() == bO);
        bL = a5(bN.Card1);
        bK = a5(bN.Card2);
        bJ = a5(bN.Card3);
        bI = a5(bN.Card4);
        bM.holeCard1[bO] = bL;
        bM.holeCard2[bO] = bK;
        bM.holeCard3[bO] = bJ;
        bM.holeCard4[bO] = bI;
        if (bL != 0 || !g) {
            ah(bM.$card1[bO], bL)
        }
        if (bL != 0) {
            bM.$card1[bO].show()
        }
        if (bK != 0 || !g) {
            ah(bM.$card2[bO], bK)
        }
        if (bK != 0) {
            bM.$card2[bO].show()
        }
        if (bM.omaha) {
            if (bJ != 0 || !g) {
                ah(bM.$card3[bO], bJ)
            }
            if (bJ != 0) {
                bM.$card3[bO].show()
            }
            if (bI != 0 || !g) {
                ah(bM.$card4[bO], bI)
            }
            if (bI != 0) {
                bM.$card4[bO].show()
            }
        }
        if (g) {
            bM.isFaceDown = (bL == 53);
            bM.updateHandHelper()
        }
    }
    function F(bJ) {
        var bQ, bI, bL, bR, g, bP, bT, bO, bS, bM, bK, bN;
        bQ = n(bJ);
        if (bQ == null || !bQ.graphicsMade) {
            return
        }
        bI = T(bJ.Player);
        bL = ag(bI);
        if (bL && !aZ.local.chatBlockAsterisk) {
            return
        }
        bR = aM(T(bJ.Title));
        if (bR != "") {
            bR = "[" + bR + "] "
        }
        if ((bI == "" || bI == aZ.lang.ReservedDealer) && aZ.local.muteDealer) {
            return
        }
        g = T(bJ.Text);
        bP = T(bJ.Chips);
        if (bP == "Yes" && aZ.local.decimalMark != ".") {
            g = g.split(".").join(aZ.local.decimalMark)
        }
        if (bI != aZ.lang.ReservedDealer && bI != aZ.lang.ReservedSystem) {
            g = aM(g)
        }
        if (bL) {
            g = "*"
        }
        bO = 100;
        bS = {};
        bS.color1 = aZ.color.ListText;
        bS.color2 = T(bJ.Color);
        bS.time = i(new Date());
        bS.title = bR;
        bS.player = bI;
        bS.text = g;
        bQ.chatQueue.push(bS);
        while (bQ.chatQueue.length > bO) {
            bQ.chatQueue.shift()
        }
        bK = bQ.chatInfoMove.isChecked();
        if (bK && aZ.local.tableChatTime) {
            bN = "[" + bS.time + "] "
        } else {
            bN = ""
        }
        if (bI == "") {
            bT = ""
        } else {
            bT = "<font color='" + bS.color1 + "'>" + bN + bR + bI + ":  </font><font color='" + bS.color2 + "'>" + g + "</font>"
        }
        bT = "<span>" + bT + "</span>";
        if (bK) {
            bM = bQ.chatInfoText
        } else {
            bM = bQ.chatText
        }
        bM.addTextLine(bT, bO)
    }
    function by(bI) {
        var g = n(bI);
        if (g == null || !g.graphicsMade) {
            return
        }
        g.buttonsOff()
    }
    function bG(bI) {
        var g = n(bI);
        if (g == null || !g.graphicsMade) {
            return
        }
        g.dealCards(bI.Seats)
    }
    function H(bJ) {
        var bI, g;
        bI = n(bJ);
        if (bI == null || !bI.graphicsMade) {
            return
        }
        g = a5(bJ.Dealer);
        bI.moveDealer(g)
    }
    function s(g) {
        var bS, bM, bR, bQ, bP, bO, bN, bL, bK, bI, bJ;
        bS = n(g);
        if (bS == null || !bS.graphicsMade) {
            return
        }
        bM = k(aZ.eSeed + T(g.Salt));
        bR = parseInt(bM.substring(0, 2), 16);
        bQ = parseInt(bM.substring(2, 4), 16);
        bP = parseInt(bM.substring(4, 6), 16);
        bO = parseInt(bM.substring(6, 8), 16);
        bN = parseInt(T(g.Card1), 16) ^ bR;
        bL = parseInt(T(g.Card2), 16) ^ bQ;
        bK = parseInt(T(g.Card3), 16) ^ bP;
        bI = parseInt(T(g.Card4), 16) ^ bO;
        bJ = T(g.Hand);
        if (bN < 0 || bN > 53) {
            bN = 0
        }
        if (bL < 0 || bL > 53) {
            bL = 0
        }
        if (bK < 0 || bK > 53) {
            bK = 0
        }
        if (bI < 0 || bI > 53) {
            bI = 0
        }
        bS.card1 = bN;
        bS.card2 = bL;
        bS.card3 = bK;
        bS.card4 = bI;
        if (bN > 0 && bL > 0) {
            bS.historyAdd(bJ, aZ.lang.HHDealt.split("%1%").join(aZ.loginData.player).split("%2%").join(W(bN, bL, bK, bI)))
        }
        if (g.Show == "Yes") {
            bS.showHoleCards()
        }
    }
    function aW(bI) {
        var g = n(bI);
        if (g == null || !g.graphicsMade) {
            return
        }
        g.boardCard[1] = a5(bI.Board1);
        g.boardCard[2] = a5(bI.Board2);
        g.boardCard[3] = a5(bI.Board3);
        g.boardCard[4] = 0;
        g.boardCard[5] = 0;
        g.dealFlop()
    }
    function aY(bI) {
        var g, bJ;
        g = n(bI);
        if (g == null || !g.graphicsMade) {
            return
        }
        bJ = g.getPlayerSeat();
        if (bJ < 1 || bJ > g.seats) {
            return
        }
        if (bI.Ghost == "Yes") {
            if (g.isFaceDown) {
                g.toggleCards(bJ)
            }
            g.$card1[bJ].css("opacity", 0.65).hide();
            g.$card2[bJ].css("opacity", 0.65).hide();
            if (g.omaha) {
                g.$card3[bJ].css("opacity", 0.65).hide();
                g.$card4[bJ].css("opacity", 0.65).hide()
            }
        } else {
            g.card1 = 0;
            g.card2 = 0;
            g.card3 = 0;
            g.card4 = 0;
            g.holeCard1[bJ] = 0;
            g.holeCard2[bJ] = 0;
            g.holeCard3[bJ] = 0;
            g.holeCard4[bJ] = 0;
            ah(g.$card1[bJ], 0);
            ah(g.$card2[bJ], 0);
            g.$card1[bJ].css("opacity", 1);
            g.$card2[bJ].css("opacity", 1);
            if (g.omaha) {
                ah(g.$card3[bJ], 0);
                ah(g.$card4[bJ], 0);
                g.$card3[bJ].css("opacity", 1);
                g.$card4[bJ].css("opacity", 1)
            }
        }
        g.foldAnyBet.setCheck(false);
        g.foldAnyBet.show(false);
        g.handHelper = "";
        g.updateHandHelper()
    }
    function bd(bJ) {
        var bP, bM, bI, bO, bN, bL, g, bK;
        bP = n(bJ);
        if (bP == null || !bP.graphicsMade) {
            return
        }
        bM = k(aZ.eSeed + T(bJ.HSalt));
        bO = parseInt(bM.substring(0, 8), 16);
        bL = parseInt(T(bJ.HRank), 16) ^ bO;
        bI = k(aZ.eSeed + T(bJ.LSalt));
        bN = parseInt(bI.substring(0, 8), 16);
        g = parseInt(T(bJ.LRank), 16) ^ bN;
        if (g == 0) {
            bK = aZ.lang.HandHelper.split("%1%").join(a0(bL))
        } else {
            bK = aZ.lang.HandHelperHiLo.split("%1%").join(a0(bL));
            bK = bK.split("%2%").join(R(g))
        }
        bP.handHelper = bK
    }
    function a1(bK) {
        var bJ, bM, bL, g, bI;
        bJ = n(bK);
        if (bJ == null || !bJ.graphicsMade) {
            return
        }
        bM = T(bK.Hand);
        bL = a5(bK.Text.length);
        for (g = 0; g < bL; g++) {
            bI = aM(T(bK.Text[g]));
            bJ.historyAdd(bM, bI)
        }
    }
    function X(bI) {
        var g = n(bI);
        if (g == null || !g.graphicsMade) {
            return
        }
        if (g.turn > 0 && g.turn <= g.seats) {
            g.name[g.turn].setGlow(false)
        }
        g.turn = a5(bI.Seat);
        if (g.turn > 0 && g.turn <= g.seats) {
            g.name[g.turn].setGlow(true)
        }
    }
    function bs(bN) {
        bN.Balance = 50000; // test
        var bL, bO, bJ, g, bM, bI, bK;
        bL = n(bN);
        if (bL == null ) {
            return
        }
        bO = a5(bN.Timer);
        if (bO <= 0) {
            return
        }
        bJ = a5(bN.MinBuyIn);
        g = a5(bN.MaxBuyIn);
        bM = a5(bN.DefBuyIn);
        bI = a5(bN.Balance);
        bK = bN.Rathole == "Yes";
        bL.buyInRingChipsShow(bO, bJ, g, bM, bI, bK)
    }
    function a3(bI) {
        delete bI.Command;
        var g;
        for (g in bI) {
            aZ.lang[g] = bI[g]
        }
    }
    function bD(bJ) {
        var bI, bL, bP, g, bM, bR, bN, bK, bQ, bO;
        bI = T(bJ.Player);
        bL = ag(bI);
        if (bL && !aZ.local.chatBlockAsterisk) {
            return
        }
        bP = aM(T(bJ.Title));
        if (bP != "") {
            bP = "[" + bP + "] "
        }
        g = aM(T(bJ.Text));
        if (bL) {
            g = "*"
        }
        bO = 100;
        bQ = {};
        bQ.color1 = aZ.color.ListText;
        bQ.color2 = T(bJ.Color);
        bQ.time = i(new Date());
        bQ.title = bP;
        bQ.player = bI;
        bQ.text = g;
        aZ.lobbyChatQueue.push(bQ);
        while (aZ.lobbyChatQueue.length > bO) {
            aZ.lobbyChatQueue.shift()
        }
        bK = aZ.lobby.popoutChat.$dialog.is(":visible");
        if (bK && aZ.local.lobbyChatTime) {
            bN = "[" + bQ.time + "] "
        } else {
            bN = ""
        }
        if (bI == "") {
            bR = ""
        } else {
            bR = "<font color='" + bQ.color1 + "'>" + bN + bP + bI + ":  </font><font color='" + bQ.color2 + "'>" + g + "</font>"
        }
        bR = "<span>" + bR + "</span>";
        if (bK) {
            bM = aZ.lobby.popoutChatText
        } else {
            bM = aZ.lobby.lobbyChatText
        }
        bM.addTextLine(bR, bO)
    }
    function af(bI) {
        var bL, bP, g, bM, bJ, bQ, bN, bO, bK;
        switch (T(bI.Status)) {
            case "Ok":
                aZ.loginData.player = T(bI.Player);
                aZ.loginData.realName = T(bI.RealName);
                aZ.loginData.avatar = a5(bI.Avatar);
                aZ.loginData.avatarCrc = T(bI.AvatarCrc);
                if (bI.AvatarFile == "Yes") {
                    aZ.minAvatar = 0
                }
                aZ.loginData.gender = T(bI.Gender);
                aZ.loginData.location = T(bI.Location);
                aZ.loginData.email = T(bI.Email);
                aZ.loginData.custom = T(bI.Custom);
                aZ.loggedIn = true;
                for (bL = 0; bL < aZ.tables.length; bL++) {
                    bP = aZ.tables[bL];
                    g = bP.id;
                    bM = bP.type;
                    bJ = bP.sng;
                    bP.setTitle(bk(g, bM, bJ));
                    bP.player = aZ.loginData.player
                }
                ai();
                break;
            case "Error":
                aZ.lobby.messageShow(T(bI.Text));
                aZ.loggedIn = false;
                ai();
                break
        }
        aZ.lobby.updateLobbyTitle();
        if (aZ.loggedIn == false || aZ.params.tableName == "") {
            return
        }
        bQ = [];
        bN = [];
        bO = [];
        if (aZ.params.tableDelimiter == "") {
            bQ[0] = aZ.params.tableName;
            bN[0] = aZ.params.tableType;
            bO[0] = aZ.params.tablePassword
        } else {
            bQ = aZ.params.tableName.split(aZ.params.tableDelimiter);
            bN = aZ.params.tableType.split(aZ.params.tableDelimiter);
            bO = aZ.params.tablePassword.split(aZ.params.tableDelimiter)
        }
        for (bL = 0; bL < bQ.length; bL++) {
            bK = {
                Response: "OpenTable"
            };
            bK.Table = bQ[bL];
            bK.Type = bN[bL];
            if (bO[bL] != "") {
                bK.Password = bO[bL];
                if (bN[bL] == "T") {
                    g = ao(bQ[bL])
                } else {
                    g = bQ[bL]
                }
                aZ.passwords[bN[bL] + g] = bO[bL]
            }
            bt(bK)
        }
    }
    function bw(bJ) {
        var bI, g;
        bI = T(bJ.Salt);
        g = {
            Response: "Login"
        };
        g.Player = aZ.loginData.player;
        g.Hash = k(aZ.loginData.password + bI);
        aZ.eSeed = M(aZ.loginData.password);
        g.NextHash = aZ.eSeed;
        g.ValCode = aZ.loginData.valCode;
        bt(g)
    }
    function aK(bI) {
        var bM, bL, bK, g, bJ, bP, bN, bO;
        bP = aZ.lobby.loginGrid.selrow;
        if (bP < 0) {
            bJ = ""
        } else {
            bJ = aZ.data.Login.rows[bP].player
        }
        bN = (bI.Clear == "Yes");
        if (bN) {
            aZ.data.Login.rows.length = 0
        }
        if (!bI.Remove) {
            bI.Remove = []
        }
        for (bM = 0; bM < bI.Remove.length; bM++) {
            g = bI.Remove[bM];
            if (g == bJ) {
                bJ = ""
            }
            bK = aZ.data.Login.rows.length;
            for (bL = 0; bL < bK; bL++) {
                if (g == aZ.data.Login.rows[bL].player) {
                    aZ.data.Login.rows.splice(bL, 1);
                    break
                }
            }
        }
        if (!bI.Player) {
            bI.Player = []
        }
        for (bM = 0; bM < bI.Player.length; bM++) {
            bO = {};
            bO.player = bI.Player[bM];
            bO.bold = bO.player == aZ.loginData.player;
            bO.name = bI.Name[bM];
            bO.location = bI.Location[bM];
            bO.chat = u(bO.player);
            bO.login = bA(bI.Login[bM], true, true);
            bO.loginSort = bA(bI.Login[bM], true, false);
            aZ.data.Login.rows.push(bO)
        }
        if (!bN && bI.Player.length > 0) {
            bi("login")
        }
        bK = aZ.data.Login.rows.length;
        aZ.lobby.loginGrid.selrow = -1;
        if (bJ == "") {
            aZ.lobby.loginSelected = ""
        } else {
            for (bM = 0; bM < bK; bM++) {
                if (bJ == aZ.data.Login.rows[bM].player) {
                    aZ.lobby.loginGrid.selrow = bM;
                    break
                }
            }
        }
        aZ.lobby.loginGrid.sort();
        aZ.lobby.lobbyTabs.setCaption(0, aZ.lang.LobbyCaptionLogins + ": " + bK);
        if (bK != bI.Total) {
            bt({
                Response: "Logins"
            })
        }
    }
    function K(g) {
        var bI = T(g.Message);
        if (bI == "Ok") {
            e(false)
        } else {
            aZ.lobby.logoutConfirmShow(bI)
        }
    }
    function an(bI) {
        var g, bK, bJ;
        g = n(bI);
        bK = T(bI.Title);
        bJ = T(bI.Text);
        if (g) {
            g.messageShow(bJ, bK)
        } else {
            if (aZ.lobby) {
                aZ.lobby.lobbyFront();
                aZ.lobby.messageShow(bJ, bK)
            } else {
                alert(bJ)
            }
        }
        if (bI.Disconnect == "Yes") {
            aZ.quit = true;
            aZ.ws.close();
            bi("beep")
        }
    }
    function C(bJ) {
        var bI, g, bK;
        bI = n(bJ);
        if (bI == null || !bI.graphicsMade) {
            return
        }
        g = a5(bJ.Call);
        if (g < 0) {
            bI.clearNextMoves();
            return
        }
        bI.$nextMove.show();
        if (g == 0) {
            bI.nextMove1.setCaption(aZ.lang.TableCaptionNextCheckFold);
            bI.nextMove1.show(true);
            bI.nextCommand1 = "CheckFold";
            bI.nextMove2.$container.css("top", 360);
            bI.nextMove2.setCaption(aZ.lang.TableCaptionNextCheck);
            bI.nextMove2.show(true);
            bI.nextCommand2 = "Check"
        } else {
            bI.nextMove1.setCaption(aZ.lang.TableCaptionNextFold);
            bI.nextMove1.show(true);
            bI.nextCommand1 = "Fold";
            bK = aZ.lang.TableCaptionNextCall + " " + bl(g);
            if (bI.nextMove2.getCaption() != bK) {
                if (bI.nextMove == "Call") {
                    bI.nextMove = ""
                }
                bI.nextMove2.setCheck(false);
                if (bI.nextMove2.$container.css("top") == "360px") {
                    bI.nextMove2.$container.css("top", 375)
                } else {
                    bI.nextMove2.$container.css("top", 360)
                }
            }
            bI.nextMove2.setCaption(bK);
            bI.nextMove2.show(true);
            bI.nextCommand2 = "Call"
        }
    }
    function ad(g) {
        aZ.lobby.newsShow(g.Text)
    }
    function aS(bL) {
        var bK, bM, bI, g, bJ;
        bK = n(bL);
        if (bK == null || !bK.graphicsMade || bK.getPlayerSeat() != 0) {
            return
        }
        bM = a5(bL.Count);
        bI = "<pre>";
        for (g = 0; g < bM; g++) {
            bJ = T(bL.Line[g]);
            if (aZ.local.decimalMark != ".") {
                bJ = bJ.split(".").join(aZ.local.decimalMark)
            }
            bI = bI + bJ + "\r\n"
        }
        bI = bI + "</pre>";
        bK.statsInfo.setText(bI)
    }
    function ar(bI) {
        var bP, g, bL, bM, bK, bO, bJ, bN;
        if (aZ.mobile && aZ.lobby.lobbyTabs.getTab() != 4) {
            aZ.lobby.lobbyTabs.setTab(4)
        }
        bP = n(bI);
        if (bP) {
            p(bP)
        } else {
            g = T(bI.Table);
            bL = T(bI.Type);
            bJ = (T(bI.SnG) == "Yes");
            bM = bk(g, bL, bJ);
            bK = (T(bI.Omaha) == "Yes");
            bO = a5(bI.RebuyFee);
            bN = T(aZ.loginData.player);
            bP = new a9(bM,g,bL,bK,bO,bJ,bN,aZ.winOfsX,aZ.winOfsY);
            aG();

            bP.resizeTable();

            aZ.tables.push(bP);
            bP.bringToFront();
            at(bP.dialog)
        }
        aZ.lobby.lobbyTabs.setCaption(4, aZ.lang.LobbyCaptionOpen + ": " + aZ.tables.length);
        if (bI.Beep == "Yes") {
            bi("beep")
        }
    }
    function aA(g) {
        if (T(g.Pong) == "Yes") {
            bt({
                Response: "Pong"
            })
        }
    }
    function h(bI) {
        var g, bN, bJ, bP, bQ, bM, bO, bL, bK;
        g = T(bI.Table);
        bN = T(bI.Type);
        bJ = a5(bI.Count);
        bK = T(bI.SnG) == "Yes";
        bP = [];
        if (bN == "R") {
            aZ.lobby.$ringSelected.text(g);
            for (bM = 0; bM < bJ; bM++) {
                bO = {};
                bO.player = T(bI.Player[bM]);
                bQ = T(bI.Chips[bM]);
                bO.chipsSort = bQ;
                if (aZ.local.decimalMark != ".") {
                    bQ = bQ.split(".").join(aZ.local.decimalMark)
                }
                bO.chips = bQ;
                bQ = T(bI.Net[bM]);
                bO.netSort = bQ;
                if (aZ.local.decimalMark != ".") {
                    bQ = bQ.split(".").join(aZ.local.decimalMark)
                }
                bO.net = bQ;
                bP.push(bO)
            }
            aZ.data.RingPlayer.rows = bP;
            aZ.lobby.ringPlayerGrid.sort()
        } else {
            bL = T(bI.Time);
            if (bL == "") {
                bQ = g
            } else {
                bQ = aZ.lang.LobbyCaptionRunning.split("%1%").join(g).split("%2%").join(bL)
            }
            if (bK) {
                aZ.lobby.$sitnGoSelected.text(bQ)
            } else {
                aZ.lobby.$tourneySelected.text(bQ)
            }
            for (bM = 0; bM < bJ; bM++) {
                bO = {};
                bO.player = T(bI.Player[bM]);
                bO.chips = T(bI.Chips[bM]);
                bO.rank = T(bI.Rank[bM]);
                bO.table = T(bI.TNum[bM]);
                bP.push(bO)
            }
            if (bK) {
                aZ.data.SitnGoPlayer.rows = bP;
                aZ.lobby.sitnGoPlayerGrid.sort()
            } else {
                aZ.data.TourneyPlayer.rows = bP;
                aZ.lobby.tourneyPlayerGrid.sort()
            }
        }
    }
    function aX(bL) {
        var bK, bM, bI, g, bJ;
        bK = n(bL);
        if (bK == null || !bK.graphicsMade) {
            return
        }
        bM = a5(bL.Count);
        bI = "<pre>";
        for (g = 0; g < bM; g++) {
            bJ = T(bL.Line[g]);
            if (aZ.local.decimalMark != ".") {
                bJ = bJ.split(".").join(aZ.local.decimalMark)
            }
            bI = bI + bJ + "\r\n"
        }
        bI = bI + "</pre>";
        bK.statsInfo.setText(bI)
    }
    function aq(bI) {
        var g, bJ;
        g = n(bI);
        if (g == null || !g.graphicsMade) {
            return
        }
        bJ = a5(bI.Pot);
        if (bJ < 1 || bJ > 9) {
            return
        }
        g.potAward(bI)
    }
    function G(bJ) {
        var g, bK, bI;
        g = n(bJ);
        if (g == null || !g.graphicsMade) {
            return
        }
        bK = a5(bJ.Pot);
        if (bK < 1 || bK > 9) {
            return
        }
        bI = a5(bJ.Value);
        g.potChips[bK] = bI;
        g.stackChips(g.$pot[bK], bI);
        g.$potLabel[bK].text(bl(bI));
        g.totalPot = bJ.Total;
        g.updateTotal()
    }
    function bC() {
        for (var g = 0; g < aZ.tables.length; g++) {
            aZ.tables[g].refreshTable()
        }
    }
    function Q(bK) {
        var bM, bI, g, bJ, bL;
        bM = T(bK.Table);
        bI = bv(bK.BuyIn);
        g = bK.Password == "Yes";
        bJ = bl(bK.Balance);
        bL = aZ.lang.BuyInTourney + "<br><br>" + aZ.lang.BuyInTotal.split("%1%").join(bI) + "<br>" + aZ.lang.BuyInBalance.split("%1%").join(bJ);
        aZ.lobby.tourneyRegShow(bL, bM, g)
    }
    function al(bJ) {
        var bI, bK, g;
        bI = n(bJ);
        if (bI == null || !bI.graphicsMade) {
            return
        }
        bK = a5(bJ.Seat);
        if (bK < 1 || bK > bI.seats) {
            return
        }
        g = bJ.Player;
        bI.playerName[bK] = g;
        bI.playerAction[bK] = bJ.Action;
        bI.name[bK].setGlow(false);
        bI.name[bK].setName(g);
        bI.name[bK].setInfo(bJ.Action);
        bI.name[bK].show(true)
    }
    function B(bI) {
        var bM, bL, bK, g, bQ, bJ, bR, bN, bO, bP;
        bR = aZ.lobby.ringGrid.selrow;
        if (bR < 0) {
            bJ = ""
        } else {
            bJ = aZ.data.Ring.rows[bR].id
        }
        bN = bI.Clear == "Yes";
        if (bN) {
            aZ.data.Ring.urows.length = 0;
            bK = 0
        } else {
            bK = aZ.data.Ring.urows.length
        }
        bO = a5(bI.Count);
        for (bM = 0; bM < bO; bM++) {
            g = T(bI.ID[bM]);
            if (g == "") {
                continue
            }
            bP = {};
            bP.id = g;
            bP.bold = (aZ.sitting.indexOf("R" + g) > -1) || (aZ.waiting.indexOf("R" + g) > -1);
            bP.game = T(bI.Game[bM]);
            bP.gameIndex = a5(bI.GameIndex[bM]);
            bP.stakesLo = T(bI.StakesLo[bM]);
            bP.stakesHi = T(bI.StakesHi[bM]);
            bP.stakesSort = bP.stakesLo;
            bP.stakes = N(bP.stakesLo) + "/" + N(bP.stakesHi);
            bP.buyinMin = T(bI.BuyinMin[bM]);
            bP.buyinMax = T(bI.BuyinMax[bM]);
            bP.buyinSort = bP.buyinMin;
            bP.buyin = N(bP.buyinMin) + " - " + N(bP.buyinMax);
            bP.playing = T(bI.Players[bM]);
            bP.seats = T(bI.Seats[bM]);
            bP.waiting = T(bI.Waiting[bM]);
            bP.password = T(bI.Password[bM]);
            bQ = false;
            if (bN == false) {
                for (bL = 0; bL < bK; bL++) {
                    if (g == aZ.data.Ring.urows[bL].id) {
                        bQ = true;
                        aZ.data.Ring.urows[bL] = bP;
                        break
                    }
                }
            }
            if (bQ == false) {
                aZ.data.Ring.urows.push(bP)
            }
        }
        aZ.lobby.ringFilterData();
        aZ.lobby.ringGameSelectID(bJ);
        aZ.lobby.ringGrid.sort();
        aZ.lobby.ringGameSelect(aZ.lobby.ringGrid.selrow);
        aZ.lobby.ringTabCaption()
    }
    function o(bI) {
        var g = n(bI);
        if (g == null || !g.graphicsMade) {
            return
        }
        g.boardCard[5] = a5(bI.Board5);
        g.dealRiver()
    }
    function aN(bM) {
        var bL, bI, bJ, g, bK;
        aZ.color.TableTop = T(bM.TextColorTop);
        aZ.color.TableBackground = T(bM.TextColorBack);
        aZ.color.Background = T(bM.BackgroundColor);
        aZ.color.Window = T(bM.WindowColor);
        aZ.color.Button = T(bM.ButtonColor);
        aZ.color.List = T(bM.ListColor);
        aZ.crc.audio = T(bM.AudioCrc);
        aZ.crc.image = T(bM.ImageCrc);
        aV();
        $("body, #OpenBackground").css("background-color", aZ.color.Background);
        if (bM.BackgroundGraphic == "Default") {
            $("#BGLogo img").attr("src", "http://192.99.236.77:81/Image?Name=PMLogo");
            $("#BGLogo a").attr("href", "http://www.briggsoft.com");
            $("#BGLogo").css({
                top: 50,
                height: 150
            }).show();
            bK = $("#BGLogo").clone().attr("id", "BGLogo2").appendTo("#OpenBackground");
            $("a", bK).removeAttr("href").removeAttr("target")
        } else {
            if (bM.BackgroundGraphic == "Yes") {
                if (bM.BackgroundTile == "Yes") {
                    $("#BGTile").css("background-image", "url('http://192.99.236.77:81/Image?Name=Logo&Crc=" + aZ.crc.image + "')");
                    bL = T(bM.BackgroundLink);
                    if (bL != "") {
                        $("#BGTile").attr("href", bL)
                    }
                    $("#BGTile").show();
                    bK = $("#BGTile").clone().attr("id", "BGTile2").appendTo("#OpenBackground");
                    bK.removeAttr("href").removeAttr("target")
                } else {
                    $("#BGLogo img").attr("src", "http://192.99.236.77:81/Image?Name=Logo&Crc=" + aZ.crc.image);
                    bL = T(bM.BackgroundLink);
                    if (bL != "") {
                        $("#BGLogo a").attr("href", bL)
                    }
                    $("#BGLogo").show();
                    bK = $("#BGLogo").clone().attr("id", "BGLogo2").appendTo("#OpenBackground");
                    $("a", bK).removeAttr("href").removeAttr("target")
                }
            }
        }
        aZ.sessionID = T(bM.ID);
        aZ.siteName = T(bM.Site);
        aZ.siteEmail = T(bM.Email);
        aZ.siteWeb = T(bM.Web);
        aZ.licenseType = T(bM.LicenseType);
        aZ.customCaption = T(bM.CustomCaption);
        aZ.customDescription = T(bM.CustomDescription);
        aZ.customEdit = bM.CustomEdit == "Yes";
        aZ.customMouseOver = bM.CustomMouseOver == "Yes";
        aZ.profileURL = T(bM.ProfileURL);
        aZ.reconKey = T(bM.ReconKey);
        ax();
        aZ.lurking = bM.Lurking == "Yes";
        aZ.newAccounts = bM.NewAccounts == "Yes";
        aZ.passwordRecovery = bM.PasswordRecovery == "Yes";
        aZ.validateEmails = bM.ValidateEmails == "Yes";
        aZ.maxAvatar = a5(bM.Avatars);
        aZ.lobby = new bm($("#Lobby"));
        at(aZ.lobby.dialog);
        $("#Connecting").hide();
        if (bM.RemoveAbout == "Yes") {
            $("#HelpSep").hide();
            aZ.lobby.helpAbout.show(false)
        }
        aZ.lobby.lobbyChatDisplay(bM.LobbyChat == "Yes");
        aZ.lobby.accountPermissions.show(bM.PermissionsMenu == "Yes");
        if (aZ.newAccounts == true) {
            aZ.lobby.accountCreate.show(true)
        }
        if (bM.AccountChanges == "Yes") {
            aZ.lobby.accountChange.show(true)
        }
        if (bM.ChipTransfers == "Yes") {
            aZ.lobby.accountTransfer.show(true)
        }
        if (bM.BalanceResets == "Yes") {
            aZ.lobby.accountChipRequest.show(true)
        }
        aU(aZ.local.fourColorDeck);
        aZ.lobby.$sitePanel.text(aZ.siteName);
        aZ.connected = true;
        ai();
        if (aZ.quit == true) {
            e(false);
            return
        }
        if (aZ.params.loginName == "") {
            aZ.lobby.loginShow()
        } else {
            aZ.loginData = {};
            aZ.loginData.player = aZ.params.loginName;
            bI = aZ.params.sessionKey;
            bJ = aZ.params.loginPassword;
            if (bI != "") {
                g = {
                    Response: "Login",
                    SessionKey: bI
                };
                aZ.eSeed = bI
            } else {
                g = {
                    Response: "LoginRequest"
                };
                aZ.loginData.password = bJ;
                aZ.loginData.valCode = ""
            }
            g.Player = aZ.params.loginName;
            bt(g)
        }
    }
    function aH(bK) {
        var bJ, g, bI;
        bJ = n(bK);
        if (bJ == null || !bJ.graphicsMade) {
            return
        }
        g = (bK.Show == "Yes");
        bI = (bK.Type == "R");
        bJ.outNextHand.setCheck(false);
        bJ.outNextHand.show(g);
        bJ.outNextBlind.setCheck(false);
        bJ.outNextBlind.show(g && bI)
    }
    function aD(bI) {
        var g = n(bI);
        if (g == null ) {
            return
        }
        g.suspendChat = T(bI.Suspend) == "Yes"
    }
    function aj(bK) {
        var bJ, g, bI;
        bJ = n(bK);
        if (bJ == null ) {
            return
        }
        bJ.password = bK.Password == "Yes";
        bI = bJ.seats;
        bJ.seats = a5(bK.Seats);
        if (bJ.seats < 0 || bJ.seats > 10) {
            bJ.seats = 0
        }
        if (bJ.graphicsMade && bI != bJ.seats) {
            bJ.refreshTable();
            return
        }
        bJ.dealer = a5(bK.Dealer);
        bJ.turn = a5(bK.Turn);
        bJ.totalPot = T(bK.Total);
        for (g = 1; g <= 10; g++) {
            bJ.playerName[g] = T(bK.Player[g - 1]);
            bJ.playerTitle[g] = T(bK.Title[g - 1]);
            bJ.playerLevel[g] = T(bK.Level[g - 1]);
            bJ.playerCustom[g] = T(bK.Custom[g - 1]);
            bJ.playerRealName[g] = T(bK.RealName[g - 1]);
            bJ.playerAvatar[g] = a5(bK.Avatar[g - 1]);
            bJ.playerAvatarCrc[g] = T(bK.AvatarCrc[g - 1]);
            bJ.playerGender[g] = T(bK.Gender[g - 1]);
            bJ.playerLocation[g] = T(bK.Location[g - 1]);
            bJ.playerAction[g] = T(bK.Action[g - 1]);
            bJ.playerChips[g] = T(bK.Chips[g - 1]);
            bJ.playerTime[g] = T(bK.Time[g - 1]);
            bJ.playerAway[g] = T(bK.Away[g - 1]);
            bJ.playerBet[g] = a5(bK.Bet[g - 1]);
            if (bJ.getPlayerSeat() == g && bJ.isFaceDown == false) {
                bJ.holeCard1[g] = bJ.card1;
                bJ.holeCard2[g] = bJ.card2;
                bJ.holeCard3[g] = bJ.card3;
                bJ.holeCard4[g] = bJ.card4
            } else {
                bJ.holeCard1[g] = a5(bK.Card1[g - 1]);
                bJ.holeCard2[g] = a5(bK.Card2[g - 1]);
                bJ.holeCard3[g] = a5(bK.Card3[g - 1]);
                bJ.holeCard4[g] = a5(bK.Card4[g - 1])
            }
        }
        for (g = 1; g <= 9; g++) {
            bJ.potChips[g] = a5(bK.Pot[g - 1])
        }
        for (g = 1; g <= 5; g++) {
            bJ.boardCard[g] = a5(bK.Board[g - 1])
        }
        bJ.drawTable()
    }
    function V(bI) {
        var g = n(bI);
        if (g == null || !g.graphicsMade) {
            return
        }
        g.setTableBanner(T(bI.Text))
    }
    function am(bK) {
        var bO, bN, bM, g, bI, bL, bJ;
        bO = a5(bK.Count);
        bN = "";
        bM = T(bK.Desc);
        if (bM != "") {
            bN = bN + bM + "<br>\r\n"
        }
        bN = bN + "<pre>";
        for (g = 0; g < bO; g++) {
            bI = T(bK.Line[g]);
            if (g > 0 && aZ.local.decimalMark != ".") {
                bI = bI.split(".").join(aZ.local.decimalMark)
            }
            bN = bN + (aM(bI) + "\r\n")
        }
        bN = bN + "</pre>";
        if (bK.Target == "Lobby") {
            bL = aZ.lang.InfoTitle + " - " + ao(bK.Table);
            aZ.lobby.infoShow(bL, bN)
        } else {
            bJ = n(bK);
            if (bJ == null || !bJ.graphicsMade) {
                return
            }
            bJ.generalInfo.setText(bN)
        }
    }
    function j(bI) {
        var g = n(bI);
        if (g == null || !g.graphicsMade) {
            return
        }
        g.setTableMessage(T(bI.Text))
    }
    function c(bJ) {
        var bI, g;
        bI = n(bJ);
        if (bI == null ) {
            return
        }
        g = bJ.Text;
        if (aZ.local.decimalMark != ".") {
            g = g.split(".").join(aZ.local.decimalMark)
        }
        bI.headerCaption(g)
    }
    function Z(g) {
        aZ.sitting = g.Tables
    }
    function J(g) {
        aZ.waiting = g.Tables
    }
    function ap(bJ) {
        var bI, g;
        bI = n(bJ);
        if (bI == null || !bI.graphicsMade) {
            return
        }
        if (bI.button1.isVisible() == false) {
            bF(bJ)
        }
        g = a5(bJ.Bank);
        bI.timeBankBtn.setCaption(aZ.lang.TableButtonTime.split("%1%").join(g));
        bI.timeBankBtn.show(g > 0);
        bi("beep");
        aJ(bI)
    }
    function aw(bJ) {
        var bI, bL, bK, g;
        bI = n(bJ);
        if (bI == null || !bI.graphicsMade) {
            return
        }
        bL = a5(bJ.Seat);
        if (bL < 1 || bL > bI.seats) {
            return
        }
        bK = a5(bJ.Time);
        if (bK == 0) {
            bI.name[bL].timeExpires = 0
        } else {
            g = new Date();
            g.setTime(g.getTime() + bK * 1000);
            bI.name[bL].timeExpires = g.getTime()
        }
        bI.name[bL].showTimer()
    }
    function z(bI) {
        var g = n(bI);
        if (g == null || !g.graphicsMade) {
            return
        }
        g.totalPot = a5(bI.Total);
        g.updateTotal()
    }
    function a6(bN) {
        var bX, bV, bS, bQ, bO, bJ, bI, bY, b0, bM, bP, bT, bU, bR, bL, bZ, bK, bW, g;
        bM = aZ.lobby.sitnGoGrid.selrow;
        if (bM < 0) {
            bY = ""
        } else {
            bY = aZ.data.SitnGo.rows[bM].id
        }
        bP = aZ.lobby.tourneyGrid.selrow;
        if (bP < 0) {
            b0 = ""
        } else {
            b0 = aZ.data.Tourney.rows[bP].id
        }
        bR = bN.Clear == "Yes";
        if (bR) {
            aZ.data.Tourney.urows.length = 0;
            bS = 0
        } else {
            bS = aZ.data.Tourney.urows.length
        }
        bL = a5(bN.Count);
        for (bX = 0; bX < bL; bX++) {
            bQ = T(bN.ID[bX]);
            if (bQ == "") {
                continue
            }
            g = {};
            g.id = bQ;
            g.bold = (aZ.sitting.indexOf("T" + bQ) > -1) || (aZ.waiting.indexOf("T" + bQ) > -1);
            g.sng = T(bN.SnG[bX]) == "Yes";
            g.shootout = T(bN.Shootout[bX]) == "Yes";
            g.game = T(bN.Game[bX]);
            g.gameIndex = a5(bN.GameIndex[bX]);
            bJ = T(bN.Buyin[bX]);
            bI = T(bN.EntryFee[bX]);
            bU = T(bN.Rebuy[bX]);
            g.buyinSort = bJ;
            g.buyin = N(bJ) + "+" + N(bI);
            g.buyinTotal = a5(bJ) + a5(bI);
            g.rebuy = bU != "";
            if (g.rebuy) {
                g.buyin = g.buyin + "+" + bU
            }
            g.ts = T(bN.TS[bX]);
            bZ = T(bN.PreReg[bX]) == "Yes";
            bK = T(bN.Reg[bX]);
            bW = T(bN.Max[bX]);
            if (bZ) {
                g.reg = "x/" + bW
            } else {
                g.reg = bK + "/" + bW
            }
            while (bK.length < 4) {
                bK = "0" + bK
            }
            while (bW.length < 4) {
                bW = "0" + bW
            }
            g.regSort = bK + "/" + bW;
            g.tables = T(bN.Tables[bX]);
            g.starts = T(bN.Starts[bX]);
            bT = T(bN.StartTime[bX]);
            if (g.starts == "Time") {
                g.starts = aZ.lang.StatusStartsTime.split("%1%").join(bA(bT, false, false))
            }
            g.startMin = T(bN.StartMin[bX]);
            g.startTime = bA(bT, false, true);
            g.running = T(bN.Running[bX]);
            g.password = T(bN.Password[bX]);
            bO = false;
            if (bR == false) {
                for (bV = 0; bV < bS; bV++) {
                    if (bQ == aZ.data.Tourney.urows[bV].id) {
                        bO = true;
                        aZ.data.Tourney.urows[bV] = g;
                        break
                    }
                }
            }
            if (bO == false) {
                aZ.data.Tourney.urows.push(g)
            }
        }
        aZ.lobby.tourneyFilterData();
        aZ.lobby.tourneySelectID(b0);
        aZ.lobby.tourneyGrid.sort();
        aZ.lobby.tourneySelect(aZ.lobby.tourneyGrid.selrow);
        aZ.lobby.tourneyTabCaption();
        aZ.lobby.sitnGoFilterData();
        aZ.lobby.sitnGoSelectID(bY);
        aZ.lobby.sitnGoGrid.sort();
        aZ.lobby.sitnGoSelect(aZ.lobby.sitnGoGrid.selrow);
        aZ.lobby.sitnGoTabCaption()
    }
    function aR(g) {
        aZ.lobby.transferConfirmShow(g.Message, g.Recipient, g.Amount)
    }
    function bx(bI) {
        var g = n(bI);
        if (g == null || !g.graphicsMade) {
            return
        }
        g.boardCard[4] = a5(bI.Board4);
        g.dealTurn()
    }
    function aL(bK) {
        var g, bO, bL, bP, bS, bI, bT, bR, bN, bQ, bJ, bM;
        g = T(bK.Table);
        bO = T(bK.Type);
        bL = a5(bK.Count);
        bJ = T(bK.LateReg);
        bM = T(bK.SnG) == "Yes";
        bP = 0;
        bS = false;
        bI = false;
        bT = [];
        for (bN = 0; bN < bL; bN++) {
            bR = T(bK.Wait[bN]);
            if (bR == aZ.loginData.player) {
                bP = bN;
                bS = true
            } else {
                if (bR == aZ.loginData.player + " *") {
                    bP = bN;
                    bI = true
                }
            }
            bQ = {};
            bQ.pos = bN + 1;
            bQ.player = bR;
            bT.push(bQ)
        }
        if (bO == "R") {
            aZ.data.RingWait.rows = bT;
            aZ.lobby.ringWaitGrid.update();
            if (bS == true) {
                bR = aZ.lang.LobbyButtonRingUnjoin
            } else {
                bR = aZ.lang.LobbyButtonRingWait
            }
            aZ.lobby.ringWaitBtn.setCaption(bR)
        } else {
            bR = aZ.lang.LobbyColumnTrnyWaiting;
            if (bL > 0) {
                bR = bR + ": " + bL
            }
            if (bM) {
                aZ.data.SitnGoWait.rows = bT;
                aZ.lobby.sitnGoWaitGrid.update();
                aZ.lobby.sitnGoWaitGrid.headerCaption(1, bR)
            } else {
                aZ.data.TourneyWait.rows = bT;
                aZ.lobby.tourneyWaitGrid.update();
                aZ.lobby.tourneyWaitGrid.headerCaption(1, bR)
            }
            if (bI == true) {
                bS = true
            }
            if (bS == true) {
                bR = aZ.lang.LobbyButtonTrnyUnregister
            } else {
                if (bJ == "Yes") {
                    bR = aZ.lang.LobbyButtonTrnyRegLate
                } else {
                    bR = aZ.lang.LobbyButtonTrnyRegister
                }
            }
            if (bM) {
                aZ.lobby.sitnGoRegisterBtn.setCaption(bR);
                aZ.lobby.sitnGoStartNow.show(bS && q(true));
                aZ.lobby.sitnGoStartNow.setCheck(bI)
            } else {
                aZ.lobby.tourneyRegisterBtn.setCaption(bR);
                aZ.lobby.tourneyStartNow.show(bS && q(false));
                aZ.lobby.tourneyStartNow.setCheck(bI)
            }
        }
    }
    function bm(bM) {
        var bL, g, bK, bO, bJ, bN, bI;
        bL = this;
        bL.modalList = [];
        bL.$dialog = bM;
        bL.dialog = new a2(bL.$dialog,null ,{
            shadeparent: bL,
            title: aZ.lang.LobbyCaptionTitle,
            removeonclose: true,
            minwidth: 640,
            minheight: 480,
            onresize: function() {
                bL.resize()
            }
        });
        aG();
        bL.modalList.push(bL.dialog);
        bL.dialog.show(false);
        bL.menuInit();
        bL.$sitePanel = $("#SitePanel", bL.$dialog).css({
            color: aZ.color.ListText,
            backgroundColor: aZ.color.List
        });
        bL.$closeBtn = $(".closebtn", bL.$dialog).on("touchstart mousedown", function(bP) {
            bL.close();
            return false
        });
        bL.createDialogs();
        bL.loginTabSetup();
        bL.ringTabSetup();
        bL.tourneyTabSetup();
        bL.sitnGoTabSetup();
        bL.$openTableBox = $("#OpenTableBox");
        g = [aZ.lang.LobbyCaptionLogins, aZ.lang.LobbyCaptionRingGames, aZ.lang.LobbyCaptionTournaments, aZ.lang.LobbyCaptionSitnGos, aZ.lang.LobbyCaptionOpen];
        bK = [true, true, true, aZ.params.sitAndGoTab, false];
        bL.lobbyTabs = new aI($(".tabs", bL.$dialog),g,bK,function(bP) {
                bL.lobbyTabsChange(bP)
            }
        );
        bL.lobbyTabs.setTab(0);
        bL.prevTableBtn = new w($("#PrevTableBtn", bL.$dialog),"&#9664;",0,function() {
                bL.prevTable()
            }
        );
        bL.nextTableBtn = new w($("#NextTableBtn", bL.$dialog),"&#9654;",0,function() {
                bL.nextTable()
            }
        );
        if (aZ.mobile) {
            bL.guiChange()
        } else {
            // bO = bL.$dialog.width();
            // bJ = bL.$dialog.height();

            bO = $(window).width();
            bJ = $(window).height();

            bN = $(window).width();
            bI = $(window).height();
            if (bO > bN) {
                bO = bN
            }
            if (bJ > bI) {
                bJ = bI
            }

            // if (bO != 706 || bJ != 568) {
            //     bL.$dialog.css({
            //         width: bO ,
            //         height: bJ
            //     })
            // }

            if (bO != 706 || bJ != 568) {
                bL.$dialog.css({
                    width: bO * 0.90,
                    height: bJ * 0.95
                })
            }
        }

        bL.resize()
    }
    bm.prototype.aboutCreate = function() {
        var g = this;
        g.about = new a2($("#About"),g,{
            title: aZ.lang.AboutTitle
        });
        new w($(".okbtn", g.about.$dialog),aZ.lang.DialogOK,25,function() {
                g.about.close()
            }
        );
        $(".closebtn", g.about.$dialog).on("touchstart mousedown", function() {
            g.about.close();
            return false
        })
    }
    ;
    bm.prototype.aboutShow = function() {
        var g = this;
        $("#about_title").text("Poker Mavens");
        $("#about_license").text(aZ.licenseType + " " + aZ.clientVersion);
        $("#about_copyright").html("Copyright &copy; " + aZ.copyright + " Kent Briggs");
        $("#about_company").text("Briggs Softworks");
        $("#about_link a").attr("href", "http://www.briggsoft.com").text("www.briggsoft.com");
        g.about.show(true)
    }
    ;
    bm.prototype.accountChangeShow = function() {
        var g, bI;
        g = this;
        g.accountInfo.setTitle(aZ.lang.AccountChange);
        $("#ai_custom").toggle(aZ.customEdit);
        g.accountInfo.show(true);
        g.aiPlayer.$input.css("color", aZ.color.ListDisabled);
        g.aiPlayer.setText(aZ.loginData.player);
        g.aiPlayer.enable(false);
        g.aiRealName.setText(aZ.loginData.realName);
        if (aZ.loginData.gender == "Female") {
            g.aiFemale.setCheck(true)
        } else {
            g.aiMale.setCheck(true)
        }
        g.avatarSlider.increment = 1 / (aZ.maxAvatar - aZ.minAvatar);
        bI = (aZ.loginData.avatar - aZ.minAvatar) / (aZ.maxAvatar - aZ.minAvatar);
        g.avatarSlider.setValue(bI, true);
        g.aiLocation.setText(aZ.loginData.location);
        g.aiPassword1.setText("");
        g.aiPassword2.setText("");
        $("#ai_pw_desc").text(aZ.lang.AccountPWDesc2);
        g.aiEmail.setText(aZ.loginData.email);
        g.aiCustom.setText(aZ.loginData.custom)
    }
    ;
    bm.prototype.accountCreateShow = function() {
        var g = this;
        g.accountInfo.setTitle(aZ.lang.AccountNew);
        $("#ai_custom").toggle(aZ.customEdit);
        g.accountInfo.show(true);
        g.aiPlayer.$input.css("color", aZ.color.ListText);
        g.aiPlayer.enable(true);
        $("#ai_pw_desc").text(aZ.lang.AccountPWDesc);
        g.avatarSlider.setValue(0, true)
    }
    ;
    bm.prototype.accountInfoAvatar = function(bK) {
        var bI, g, bJ;
        bI = this;
        bI.aiAvatar = Math.round(bK * (aZ.maxAvatar - aZ.minAvatar)) + aZ.minAvatar;
        $("#ai_avatar_label").text(aZ.lang.AccountAvatar + " " + bI.aiAvatar);
        g = bI.aiAvatar;
        if (g == 0) {
            $("#ai_avatar_image").css("background", "url('Avatar?Player=" + encodeURIComponent(aZ.loginData.player) + "&Crc=" + aZ.loginData.avatarCrc + "') no-repeat")
        } else {
            bJ = ((g - 1) * -48) + "px 0px";
            $("#ai_avatar_image").css("background", "url('http://192.99.236.77:81/Image?Name=Avatars&Crc=" + aZ.crc.image + "') no-repeat " + bJ)
        }
    }
    ;
    bm.prototype.accountInfoAvatarPrev = function() {
        var g, bI;
        g = this;
        bI = g.avatarSlider.value - g.avatarSlider.increment;
        g.avatarSlider.setValue(bI, true)
    }
    ;
    bm.prototype.accountInfoAvatarNext = function() {
        var g, bI;
        g = this;
        bI = g.avatarSlider.value + g.avatarSlider.increment;
        g.avatarSlider.setValue(bI, true)
    }
    ;
    bm.prototype.accountInfoCreate = function() {
        var g = this;
        g.accountInfo = new a2($("#AccountInfo"),g,{});
        $("#ai_player_label").text(aZ.lang.AccountPlayer);
        g.aiPlayer = new aE($("#ai_player_input"),{
            border: true
        });
        $("#ai_player_desc").text(aZ.lang.AccountPlayerDesc).css("color", aZ.color.ListDisabled);
        $("#ai_real_label").text(aZ.lang.AccountReal);
        g.aiRealName = new aE($("#ai_real_input"),{
            border: true
        });
        $("#ai_real_desc").text(aZ.lang.AccountRealDesc).css("color", aZ.color.ListDisabled);
        $("#ai_gender_label").text(aZ.lang.AccountGender);
        g.aiMale = new au($("#ai_gender_male"),aZ.lang.AccountMale);
        g.aiMale.setCheck(true);
        g.aiFemale = new au($("#ai_gender_female"),aZ.lang.AccountFemale);
        $("#ai_avatar_label").text(aZ.lang.AccountAvatar);
        new w($("#ai_avatar_prev"),aZ.arrowL,20,function() {
                g.accountInfoAvatarPrev()
            }
        );
        g.avatarSlider = new O($("#ai_avatar_slider"),1 / (aZ.maxAvatar - aZ.minAvatar + 1),function(bI) {
                g.accountInfoAvatar(bI)
            }
        );
        new w($("#ai_avatar_next"),aZ.arrowR,20,function() {
                g.accountInfoAvatarNext()
            }
        );
        $("#ai_loc_label").text(aZ.lang.AccountLocation);
        g.aiLocation = new aE($("#ai_loc_input"),{
            border: true
        });
        $("#ai_loc_desc").text(aZ.lang.AccountLocationDesc).css("color", aZ.color.ListDisabled);
        $("#ai_pw_label1").text(aZ.lang.AccountPWSelect);
        g.aiPassword1 = new aE($("#ai_pw_input1"),{
            border: true,
            password: true
        });
        $("#ai_pw_label2").text(aZ.lang.AccountPWConfirm);
        g.aiPassword2 = new aE($("#ai_pw_input2"),{
            border: true,
            password: true
        });
        $("#ai_pw_desc").text(aZ.lang.AccountPWDesc).css("color", aZ.color.ListDisabled);
        $("#ai_email_label").text(aZ.lang.AccountEmail);
        g.aiEmail = new aE($("#ai_email_input"),{
            border: true
        });
        $("#ai_email_desc").text(aZ.lang.AccountEmailDesc).css("color", aZ.color.ListDisabled);
        $("#ai_custom_label").text(aZ.customCaption);
        $("#ai_custom_desc").text(aZ.customDescription).css("color", aZ.color.ListDisabled);
        g.aiCustom = new aE($("#ai_custom_input"),{
            border: true
        });
        new w($(".ok", g.accountInfo.$dialog),aZ.lang.DialogOK,25,function() {
                g.accountInfoOk()
            }
        );
        new w($(".cancel", g.accountInfo.$dialog),aZ.lang.DialogCancel,25,function() {
                g.accountInfo.close()
            }
        );
        $(".closebtn", g.accountInfo.$dialog).on("touchstart mousedown", function() {
            g.accountInfo.close();
            return false
        })
    }
    ;
    bm.prototype.accountInfoOk = function() {
        var bJ, bI, g, bK;
        bJ = this;
        bI = bJ.aiPassword1.getText();
        g = bJ.aiPassword2.getText();
        if (bI != g) {
            bJ.messageShow(aZ.lang.AccountPWError);
            return
        }
        bK = {
            Response: "ChangeAccount"
        };
        bK.RealName = bJ.aiRealName.getText();
        if (bJ.aiFemale.isChecked()) {
            bK.Gender = "Female"
        } else {
            bK.Gender = "Male"
        }
        bK.Avatar = bJ.aiAvatar;
        bK.Location = bJ.aiLocation.getText();
        if (bI != "") {
            bK.Hash = M(bI)
        }
        bK.Email = bJ.aiEmail.getText();
        if (aZ.customEdit == true) {
            bK.Custom = bJ.aiCustom.getText()
        }
        if (bJ.accountInfo.title == aZ.lang.AccountNew) {
            bK.Response = "NewAccount";
            bK.Player = bJ.aiPlayer.getText()
        }
        bt(bK)
    }
    ;
    bm.prototype.accountInfoValidate = function() {
        var g = this;
        g.accountInfo.close();
        if (g.accountInfo.title == aZ.lang.AccountNew) {
            g.loginShow();
            g.loginNameInput.setText(g.aiPlayer.getText());
            g.loginPWInput.setText(g.aiPassword1.getText())
        } else {
            aZ.loginData.realName = g.aiRealName.getText();
            aZ.loginData.avatar = g.aiAvatar;
            if (g.aiFemale.isChecked()) {
                aZ.loginData.gender = "Female"
            } else {
                aZ.loginData.gender = "Male"
            }
            aZ.loginData.location = g.aiLocation.getText();
            aZ.loginData.email = g.aiEmail.getText()
        }
    }
    ;
    bm.prototype.arrangeCascade = function() {
        var bJ, bI, g, bL, bK;
        bJ = this;
        bI = bJ.arrangeLobby.isChecked();
        bj("arrangeLobby", bI);
        bJ.arrangeWindows.close();
        bK = aZ.tables.length;
        if (bI) {
            bK++
        }
        if (bK == 0) {
            return
        }
        aZ.winOfsX = 10;
        aZ.winOfsY = 10;
        if (bI) {
            bJ.popoutChatClose();
            bJ.info.close();
            bJ.news.close();
            bJ.$dialog.css({
                left: aZ.winOfsX,
                top: aZ.winOfsY,
                width: 706,
                height: 568
            });
            aG();
            bJ.resize();
            bJ.lobbyFront()
        }
        for (g = 0; g < aZ.tables.length; g++) {
            bL = aZ.tables[g];
            bL.infoClose();
            bL.$dialog.css({
                left: aZ.winOfsX,
                top: aZ.winOfsY,
                width: 706,
                height: 568
            });
            aG();
            bL.resizeTable();
            bL.bringToFront()
        }
    }
    ;
    bm.prototype.arrangeTile = function() {
        var bX, g, bU, bY, bT, bK, bZ, bI, bQ, bV, bN, bL, bJ, bO, bS, bR, bW, bM, bP;
        bX = this;
        g = bX.arrangeLobby.isChecked();
        bj("arrangeLobby", g);
        bX.arrangeWindows.close();
        bK = aZ.tables.length;
        if (g) {
            bK++
        }
        if (bK == 0) {
            return
        }
        aZ.winOfsX = 40;
        aZ.winOfsY = 40;
        bR = $(window).width() - 5;
        bW = $(window).height() - 5;
        bQ = 0;
        bV = 0;
        bP = 0;
        bM = 0;
        for (bY = 1; bY <= bK; bY++) {
            bT = Math.ceil(bK / bY);
            bZ = bR / bY;
            bI = (bZ - 6) * (510 / 700) + 58;
            if (bI > (bW / bT)) {
                bI = bW / bT;
                bZ = (bI - 58) * (700 / 510) + 6
            }
            if (bZ > bQ) {
                bQ = bZ;
                bV = bI;
                bM = bT;
                bP = bY
            }
        }
        if (bQ < 356 || bV < 313) {
            bQ = 356;
            bV = 313
        }
        if (bQ * bP > bR && bP > 1) {
            bJ = (bR - bQ) / (bP - 1);
            bS = 0
        } else {
            bJ = bQ;
            bS = (bR - (bP * bQ)) / 2
        }
        if (bV * bM > bW && bM > 1) {
            bO = (bW - bV) / (bM - 1)
        } else {
            bO = bV
        }
        bN = bS;
        bL = 0;
        bY = 0;
        if (g) {
            bX.popoutChatClose();
            bX.info.close();
            bX.news.close();
            if (bQ < 640) {
                bZ = 640
            } else {
                bZ = bQ
            }
            if (bV < 480) {
                bI = 480
            } else {
                bI = bV
            }
            bX.$dialog.css({
                left: bN,
                top: bL,
                width: bZ,
                height: bI
            });
            bX.resize();
            bX.lobbyFront();
            bN = bN + bJ;
            bY++;
            if (bY == bP) {
                bY = 0;
                bN = bS;
                bL = bL + bO
            }
        }
        for (bU = 0; bU < aZ.tables.length; bU++) {
            table = aZ.tables[bU];
            table.infoClose();
            table.$dialog.css({
                left: bN,
                top: bL,
                width: bQ,
                height: bV
            });
            table.resizeTable();
            table.bringToFront();
            bN = bN + bJ;
            bY++;
            if (bY == bP) {
                bY = 0;
                bN = bS;
                bL = bL + bO
            }
        }
    }
    ;
    bm.prototype.arrangeWindowsCreate = function() {
        var g = this;
        g.arrangeWindows = new a2($("#ArrangeWindows"),g,{
            title: aZ.lang.ArrangeTitle
        });
        g.arrangeLobby = new b($("#aw_lobby"),aZ.lang.ArrangeLobby);
        new w($("#aw_tile", g.arrangeWindows.$dialog),aZ.lang.ArrangeTile,25,function() {
                g.arrangeTile()
            }
        );
        new w($("#aw_cascade", g.arrangeWindows.$dialog),aZ.lang.ArrangeCascade,25,function() {
                g.arrangeCascade()
            }
        );
        new w($(".cancelbtn", g.arrangeWindows.$dialog),aZ.lang.DialogCancel,25,function() {
                g.arrangeWindows.close()
            }
        );
        $(".closebtn", g.arrangeWindows.$dialog).on("touchstart mousedown", function() {
            g.arrangeWindows.close();
            return false
        })
    }
    ;
    bm.prototype.arrangeWindowsShow = function() {
        var g = this;
        g.arrangeLobby.setCheck(aZ.local.arrangeLobby);
        g.arrangeWindows.show(true)
    }
    ;
    bm.prototype.balanceCreate = function() {
        var g = this;
        g.balance = new a2($("#Balance"),g,{
            title: aZ.lang.BalanceTitle
        });
        $("#bal_avail1").text(aZ.lang.BalanceAvailable);
        $("#bal_play1").text(aZ.lang.BalanceInPlay);
        $("#bal_total1").text(aZ.lang.BalanceTotal);
        new w($(".okbtn", g.balance.$dialog),aZ.lang.DialogOK,25,function() {
                g.balance.close()
            }
        );
        $(".closebtn", g.balance.$dialog).on("touchstart mousedown", function() {
            g.balance.close();
            return false
        })
    }
    ;
    bm.prototype.balanceShow = function(bI, bL, g, bK) {
        var bJ = this;
        $("#bal_player").text(bI);
        $("#bal_avail2").text(bL);
        $("#bal_play2").text(g);
        $("#bal_total2").text(bK);
        bJ.balance.show(true)
    }
    ;
    bm.prototype.chatBlock = function() {
        var bJ, bI, g;
        bJ = this;
        if (bJ.lobbyTabs.getTab() != 0) {
            bJ.messageShow(aZ.lang.MessageLoginsTab);
            return
        }
        bI = bJ.loginGrid.selrow;
        if (bI < 0) {
            bJ.messageShow(aZ.lang.MessageChatPlayer);
            return
        }
        g = aZ.data.Login.rows[bI].player;
        if (g == aZ.loginData.player) {
            bJ.messageShow(aZ.lang.MessageChatBlock)
        } else {
            t(g);
            aZ.data.Login.rows[bI].chat = u(g);
            bJ.loginGrid.update();
            aa(g)
        }
    }
    ;
    bm.prototype.chipTransferCreate = function() {
        var g = this;
        g.chipTransfer = new a2($("#ChipTransfer"),g,{
            title: aZ.lang.TransferTitle
        });
        $("#ct_chipslabel").text(aZ.lang.TransferChips);
        g.ctChipsInput = new aE($("#ct_chipsinput"),{
            border: true
        });
        $("#ct_reciplabel").text(aZ.lang.TransferRecipient);
        g.ctRecipInput = new aE($("#ct_recipinput"),{
            onEnterKey: function() {
                g.chipTransferOk()
            },
            border: true
        });
        new w($(".ok", g.chipTransfer.$dialog),aZ.lang.DialogOK,25,function() {
                g.chipTransferOk()
            }
        );
        new w($(".cancel", g.chipTransfer.$dialog),aZ.lang.DialogCancel,25,function() {
                g.chipTransfer.close()
            }
        );
        $(".closebtn", g.chipTransfer.$dialog).on("touchstart mousedown", function() {
            g.chipTransfer.close();
            return false
        })
    }
    ;
    bm.prototype.chipTransferOk = function() {
        var g, bI;
        g = this;
        g.chipTransfer.close();
        bI = {
            Response: "Transfer"
        };
        bI.Action = "Confirm";
        bI.Amount = bn(g.ctChipsInput.getText());
        bI.Recipient = g.ctRecipInput.getText();
        bt(bI)
    }
    ;
    bm.prototype.chipTransferShow = function() {
        var g = this;
        g.chipTransfer.show(true);
        g.ctChipsInput.setText("");
        g.ctRecipInput.setText("");
        if (aZ.hasTouch == false) {
            g.ctChipsInput.setFocus()
        }
    }
    ;
    bm.prototype.close = function() {
        if (aZ.loggedIn == false || aZ.quit) {
            e(false)
        } else {
            bt({
                Response: "LogoutRequest"
            })
        }
    }
    ;
    bm.prototype.contactCreate = function() {
        var g = this;
        g.contactAdmin = new a2($("#ContactAdmin"),g,{
            title: aZ.lang.ContactTitle
        });
        $("#ca_label1").text(aZ.lang.ContactEmail);
        $("#ca_label2").text(aZ.lang.ContactWeb);
        new w($(".okbtn", g.contactAdmin.$dialog),aZ.lang.DialogOK,25,function() {
                g.contactAdmin.close()
            }
        );
        $(".closebtn", g.contactAdmin.$dialog).on("touchstart mousedown", function() {
            g.contactAdmin.close();
            return false
        })
    }
    ;
    bm.prototype.contactShow = function() {
        var bI, g;
        bI = this;
        g = aM(aZ.siteEmail);
        if (g == "") {
            $("#ca_email").text(aZ.lang.ContactNone)
        } else {
            $("#ca_email").attr("href", "mailto:" + g + "?subject=" + aM(aZ.siteName)).text(g)
        }
        if (aZ.siteWeb == "") {
            $("#ca_web").text(aZ.lang.ContactNone)
        } else {
            $("#ca_web").attr("href", aZ.siteWeb).text(aZ.siteWeb)
        }
        bI.contactAdmin.show(true)
    }
    ;
    bm.prototype.createDialogs = function() {
        var g = this;
        g.aboutCreate();
        g.accountInfoCreate();
        g.arrangeWindowsCreate();
        g.balanceCreate();
        g.chipTransferCreate();
        g.contactCreate();
        g.displaySettingsCreate();
        g.getPasswordCreate();
        g.infoCreate();
        g.loginCreate();
        g.logoutConfirmCreate();
        g.newsCreate();
        g.playerSearchCreate();
        g.popoutChatCreate();
        g.recoveryCreate();
        g.retryCreate();
        g.ringFilterCreate();
        g.sitnGoRegCreate();
        g.soundCreate();
        g.startTournamentCreate();
        g.tableSelectCreate();
        g.tableSettingsCreate();
        g.tourneyFilterCreate();
        g.tourneyRegCreate();
        g.transferConfirmCreate()
    }
    ;
    bm.prototype.displaySettingsCreate = function() {
        var g = this;
        g.displaySettings = new a2($("#DisplaySettings"),g,{
            title: aZ.lang.DisplayTitle
        });
        $("#Interface").text(aZ.lang.DisplayInterface);
        g.guiDesktop = new au($("#GUIDesktop"),aZ.lang.DisplayDesktop);
        g.guiMobile = new au($("#GUIMobile"),aZ.lang.DisplayMobile);
        g.guiAuto = new au($("#GUIAuto"),aZ.lang.DisplayAutoDetect);
        $("#FontSize").text(aZ.lang.DisplayFont);
        g.fontSmall = new au($("#FontSmall"),aZ.lang.DisplayFontSmall);
        g.fontNormal = new au($("#FontNormal"),aZ.lang.DisplayFontNormal);
        g.fontLarge = new au($("#FontLarge"),aZ.lang.DisplayFontLarge);
        $("#NumberFormat").text(aZ.lang.DisplayNumber);
        g.numberFormat1 = new au($("#NumberFormat1"),"12,345.67");
        g.numberFormat2 = new au($("#NumberFormat2"),"12.345,67");
        $("#BlockedChat").text(aZ.lang.DisplayBlocked);
        g.echoAsterisk = new au($("#EchoAsterisk"),aZ.lang.DisplayAsterisk);
        g.echoNothing = new au($("#EchoNothing"),aZ.lang.DisplayNothing);
        $("#ChatTimestamps").text(aZ.lang.DisplayChatTime);
        g.lobbyChatTime = new b($("#LobbyChatTime"),aZ.lang.DisplayLobbyChatTime);
        g.tableChatTime = new b($("#TableChatTime"),aZ.lang.DisplayTableChatTime);
        new w($(".ok", g.displaySettings.$dialog),aZ.lang.DialogOK,25,function() {
                g.displaySettingsOk()
            }
        );
        new w($(".cancel", g.displaySettings.$dialog),aZ.lang.DialogCancel,25,function() {
                g.displaySettings.close()
            }
        );
        $(".closebtn", g.displaySettings.$dialog).on("touchstart mousedown", function() {
            g.displaySettings.close();
            return false
        })
    }
    ;
    bm.prototype.displaySettingsOk = function() {
        var bK, bI, bL, g, bJ;
        bK = this;
        if (bK.guiDesktop.isChecked()) {
            bj("gui", "desktop")
        } else {
            if (bK.guiMobile.isChecked()) {
                bj("gui", "mobile")
            } else {
                bj("gui", "auto")
            }
        }
        if (aZ.local.gui == "auto") {
            bI = aZ.hasTouch
        } else {
            bI = (aZ.local.gui == "mobile")
        }
        if (bK.fontSmall.isChecked()) {
            bj("fontSize", "small")
        } else {
            if (bK.fontLarge.isChecked()) {
                bj("fontSize", "large")
            } else {
                bj("fontSize", "normal")
            }
        }
        I();
        if (bK.numberFormat1.isChecked()) {
            bj("decimalMark", ".");
            bj("thouSeparator", ",")
        } else {
            bj("decimalMark", ",");
            bj("thouSeparator", ".")
        }
        bj("chatBlockAsterisk", bK.echoAsterisk.isChecked());
        bL = bK.lobbyChatTime.isChecked();
        g = bK.tableChatTime.isChecked();
        bK.displaySettings.close();
        if (aZ.local.lobbyChatTime != bL) {
            bj("lobbyChatTime", bL);
            bK.lobbyChatUpdate()
        }
        if (aZ.local.tableChatTime != g) {
            bj("tableChatTime", g);
            for (bJ = 0; bJ < aZ.tables.length; bJ++) {
                aZ.tables[bJ].chatUpdate()
            }
        }
        if (bI != aZ.mobile) {
            aZ.mobile = bI;
            bK.guiChange()
        }
    }
    ;
    bm.prototype.displaySettingsShow = function() {
        var g = this;
        if (aZ.local.gui == "desktop") {
            g.guiDesktop.setCheck()
        } else {
            if (aZ.local.gui == "mobile") {
                g.guiMobile.setCheck()
            } else {
                g.guiAuto.setCheck()
            }
        }
        if (aZ.local.fontSize == "small") {
            g.fontSmall.setCheck()
        } else {
            if (aZ.local.fontSize == "large") {
                g.fontLarge.setCheck()
            } else {
                g.fontNormal.setCheck()
            }
        }
        if (aZ.local.decimalMark == ".") {
            g.numberFormat1.setCheck()
        } else {
            g.numberFormat2.setCheck()
        }
        if (aZ.local.chatBlockAsterisk) {
            g.echoAsterisk.setCheck()
        } else {
            g.echoNothing.setCheck()
        }
        g.lobbyChatTime.setCheck(aZ.local.lobbyChatTime);
        g.tableChatTime.setCheck(aZ.local.tableChatTime);
        g.displaySettings.show(true)
    }
    ;
    bm.prototype.getPasswordCreate = function() {
        var g = this;
        g.getPassword = new a2($("#Password"),g,{
            title: aZ.lang.PasswordTitle
        });
        g.getPasswordInput = new aE($("#pw_input"),{
            onEnterKey: function() {
                g.getPasswordOk()
            },
            border: true
        });
        new w($(".ok", g.getPassword.$dialog),aZ.lang.DialogOK,25,function() {
                g.getPasswordOk()
            }
        );
        new w($(".cancel", g.getPassword.$dialog),aZ.lang.DialogCancel,25,function() {
                g.getPassword.close()
            }
        );
        $(".closebtn", g.getPassword.$dialog).on("touchstart mousedown", function() {
            g.getPassword.close();
            return false
        })
    }
    ;
    bm.prototype.getPasswordOk = function() {
        var bJ, bI, bK, g, bO, bM, bN, bL;
        bJ = this;
        bJ.getPassword.close();
        bI = bJ.getPasswordInput.getText();
        bK = bJ.getPassword.table;
        g = bJ.getPassword.tt;
        bO = bJ.getPassword.seat;
        bM = bJ.getPassword.command;
        if (g == "T") {
            bN = ao(bK)
        } else {
            bN = bK
        }
        aZ.passwords[g + bN] = bI;
        bL = {
            Response: bM
        };
        bL.Table = bK;
        bL.Type = g;
        bL.Seat = bO;
        bL.Password = bI;
        bt(bL)
    }
    ;
    bm.prototype.getPasswordShow = function(bK, bJ, bN, bL) {
        var bI, bM, g;
        bI = this;
        bI.getPassword.table = bK;
        bI.getPassword.tt = bJ;
        bI.getPassword.seat = bN;
        bI.getPassword.command = bL;
        bI.getPassword.show(true);
        if (bJ == "T") {
            bM = ao(bK)
        } else {
            bM = bK
        }
        g = aZ.lang.PasswordPrompt.split("%1%").join(bM);
        $("#pw_label").text(g);
        bI.getPasswordInput.setText("");
        if (aZ.hasTouch == false) {
            bI.getPasswordInput.setFocus()
        }
    }
    ;
    bm.prototype.guiChange = function() {
        var bK, bJ, bI, g;
        bK = this;
        bK.popoutChatClose();
        bK.info.close();
        bK.news.close();
        aZ.debugLog.close();
        aZ.winOfsX = 10;
        aZ.winOfsY = 10;
        if (aZ.mobile) {
            bK.$dialog.css({
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                borderRadius: 0,
                boxShadow: "none"
            });
            $("#Lobby > .header").hide();
            if (aZ.params.gradients) {
                g = "url('http://192.99.236.77:81/Image?Name=Grad40')"
            } else {
                g = "none"
            }
            $("#Lobby > .menu").css({
                top: 3,
                height: 40,
                lineHeight: "40px",
                backgroundImage: g
            });
            $("#Lobby > .menu_fill").append(bK.$closeBtn.css("top", 12));
            bK.$sitePanel.css("top", 43);
            $("#Lobby > .tabs").css("top", 78);
            bJ = 24
        } else {
            bK.$dialog.css({
                left: aZ.winOfsX,
                top: aZ.winOfsY,
                width: 706,
                height: 568,
                borderRadius: "10px 10px 0px 0px",
                boxShadow: "3px 3px 10px 0px #404040"
            });
            aG();
            $("#Lobby > .header").show();
            if (aZ.params.gradients) {
                g = "url('http://192.99.236.77:81/Image?Name=Grad25')"
            } else {
                g = "none"
            }
            $("#Lobby > .menu").css({
                top: 30,
                height: 25,
                lineHeight: "25px",
                backgroundImage: g
            });
            $("#Lobby > .header").append(bK.$closeBtn.css("top", 7));
            bK.$sitePanel.css("top", 55);
            $("#Lobby > .tabs").css("top", 90);
            if (bK.lobbyTabs.getTab() == 4) {
                bK.lobbyTabs.setTab(0)
            }
            bJ = 16
        }
        bK.optionsArrange.show(!aZ.mobile);
        bK.lobbyTabs.showTab(4, aZ.mobile);
        bK.loginGrid.setRowHeight(bJ);
        bK.ringGrid.setRowHeight(bJ);
        bK.sitnGoGrid.setRowHeight(bJ);
        bK.tableSelectGrid.setRowHeight(bJ);
        bK.tourneyGrid.setRowHeight(bJ);
        bK.updateLobbyTitle();
        $(".resize", bK.$dialog).toggle(!aZ.mobile);
        bK.resize();
        for (bI = 0; bI < aZ.tables.length; bI++) {
            aZ.tables[bI].guiChange()
        }
    }
    ;
    bm.prototype.infoCreate = function() {
        var g = this;
        g.info = new a2($("#Info"),g,{
            minwidth: 250,
            minheight: 150,
            onresize: function() {
                g.infoResize()
            }
        });
        new w($(".ok", g.info.$dialog),aZ.lang.DialogOK,25,function() {
                g.info.close()
            }
        );
        new w($(".save", g.info.$dialog),aZ.lang.DialogSave,25,function() {
                aO(g.$sitePanel.text(), g.infoContent.getText(), false)
            }
        );
        $(".closebtn", g.info.$dialog).on("touchstart mousedown", function() {
            g.info.close();
            return false
        });
        g.infoContent = new bc($(".infocontent", g.info.$dialog),false)
    }
    ;
    bm.prototype.infoResize = function() {
        this.infoContent.updateScrollPosition()
    }
    ;
    bm.prototype.infoShow = function(bJ, bI) {
        var g = this;
        g.info.setTitle(bJ);
        g.info.show(aZ.mobile);
        g.infoContent.setText(bI);
        g.infoContent.topScroll()
    }
    ;
    bm.prototype.lobbyChatEnter = function(bJ) {
        var bI, g;
        bI = this;
        g = $.trim(bJ);
        if (g == "") {
            return
        }
        if (aZ.loggedIn == false) {
            bI.messageShow(aZ.lang.MessageChatLogin)
        } else {
            bt({
                Response: "LobbyChat",
                Text: g
            });
            bI.lobbyChatEdit.setText("");
            if (aZ.hasTouch) {
                bI.lobbyChatEdit.unFocus()
            }
        }
    }
    ;
    bm.prototype.lobbyChatDisplay = function(g) {
        var bI = this;
        bI.$lobbyChatGroup.toggle(g);
        if (g) {
            bI.$lobbyButtonGroup.css({
                "margin-right": "auto",
                right: 49
            })
        } else {
            bI.$lobbyButtonGroup.css({
                "margin-right": -120,
                right: "50%"
            })
        }
    }
    ;
    bm.prototype.lobbyChatUpdate = function() {
        var bM, bI, bO, g, bL, bJ, bN, bK;
        bM = this;
        bI = bM.popoutChat.$dialog.is(":visible");
        if (bI) {
            bO = bM.popoutChatText
        } else {
            bO = bM.lobbyChatText
        }
        bK = aZ.local.lobbyChatTime;
        bL = "";
        for (bJ = 0; bJ < aZ.lobbyChatQueue.length; bJ++) {
            g = aZ.lobbyChatQueue[bJ];
            if (bI && bK) {
                bN = "[" + g.time + "] "
            } else {
                bN = ""
            }
            bL = bL + "<span>";
            if (g.player != "") {
                bL = bL + "<font color='" + g.color1 + "'>" + bN + g.title + g.player + ":  </font><font color='" + g.color2 + "'>" + g.text + "</font>"
            }
            bL = bL + "</span><br>"
        }
        bO.setText(bL);
        bO.bottomScroll()
    }
    ;
    bm.prototype.lobbyFront = function() {
        var bI, g;
        bI = this;
        if (aZ.mobile) {
            return
        }
        if (bI.$dialog.css("z-index") < aZ.zTop) {
            for (g = 0; g < bI.modalList.length; g++) {
                bI.modalList[g].$dialog.css("z-index", ++aZ.zTop)
            }
        }
        at(bI.dialog)
    }
    ;
    bm.prototype.lobbyTabsChange = function(g) {
        if (aZ.mobile) {
            aZ.soundOk = (g == 4)
        }
    }
    ;
    bm.prototype.loginCreate = function() {
        var g = this;
        g.login = new a2($("#Login"),g,{
            title: aZ.lang.LoginTitle
        });
        $("#li_namelabel").text(aZ.lang.LoginName);
        g.loginNameInput = new aE($("#li_nameinput"),{
            border: true,
            onEnterKey: function() {
                g.loginOk()
            }
        });
        $("#li_pwlabel").text(aZ.lang.LoginPassword);
        g.loginPWInput = new aE($("#li_pwinput"),{
            border: true,
            password: true,
            onEnterKey: function() {
                g.loginOk()
            }
        });
        g.loginPWCheck = new b($("#li_remember"),aZ.lang.LoginRemember);
        new w($("#li_createbtn"),aZ.lang.LoginAccount,20,function() {
                g.login.close();
                g.accountCreateShow()
            }
        );
        new w($("#li_resetbtn"),aZ.lang.LoginResetPW,20,function() {
                g.resetPassword()
            }
        );
        new w($("#li_resendbtn"),aZ.lang.LoginResendVC,20,function() {
                g.resendValCode()
            }
        );
        $("#li_valcodelabel").text(aZ.lang.LoginValCode);
        g.loginValCodeInput = new aE($("#li_valcodeinput"),{
            border: true
        });
        new w($(".ok", g.login.$dialog),aZ.lang.DialogOK,25,function() {
                g.loginOk()
            }
        );
        new w($(".cancel", g.login.$dialog),aZ.lang.DialogCancel,25,function() {
                g.login.close()
            }
        );
        $(".closebtn", g.login.$dialog).on("touchstart mousedown", function() {
            g.login.close();
            return false
        })
    }
    ;
    bm.prototype.loginOk = function() {
        var bI, g;
        bI = this;
        bI.logInOutBtn.enable(false);
        bI.accountLogin.enable(false);
        localStorage.PlayerName = bI.loginNameInput.getText();
        g = bI.loginPWInput.getText();
        if (bI.loginPWCheck.isChecked() == false) {
            g = ""
        }
        localStorage.PlayerPassword = g;
        localStorage.RememberPassword = bI.loginPWCheck.isChecked();
        aZ.loginData = {};
        aZ.loginData.player = bI.loginNameInput.getText();
        aZ.loginData.password = bI.loginPWInput.getText();
        aZ.loginData.valCode = bI.loginValCodeInput.getText();
        bt({
            Response: "LoginRequest",
            Player: aZ.loginData.player
        });
        bI.login.close()
    }
    ;
    bm.prototype.loginSaveSort = function() {
        localStorage.LoginSortColumn = aZ.data.Login.sortCol;
        localStorage.LoginSortAscend = aZ.data.Login.sortAscend
    }
    ;
    bm.prototype.loginShow = function() {
        var g = this;
        $("#li_createbtn").toggle(aZ.newAccounts);
        $("#li_resetbtn").toggle(aZ.passwordRecovery);
        $("#li_resendbtn").toggle(aZ.passwordRecovery || aZ.validateEmails);
        $("#li_valcodelabel").toggle(aZ.passwordRecovery || aZ.validateEmails);
        $("#li_valcodeinput").toggle(aZ.passwordRecovery || aZ.validateEmails);
        g.loginNameInput.setText(T(localStorage.PlayerName));
        g.loginPWInput.setText(T(localStorage.PlayerPassword));
        g.loginPWCheck.setCheck(T(localStorage.RememberPassword) == "true");
        g.login.show(true);
        if (aZ.hasTouch == false) {
            g.loginNameInput.setFocus()
        }
    }
    ;
    bm.prototype.loginTabSetup = function() {
        var g, bI;
        g = this;
        aZ.data.Login = {};
        aZ.data.Login.cols = 5;
        aZ.data.Login.widths = [0.19, 0.23, 0.25, 0.08, 0.25];
        aZ.data.Login.headers = [aZ.lang.LobbyColumnLoginsPlayer, aZ.lang.LobbyColumnLoginsName, aZ.lang.LobbyColumnLoginsLocation, aZ.lang.LobbyColumnLoginsChat, aZ.lang.LobbyColumnLoginsTime];
        aZ.data.Login.fields = ["player", "name", "location", "chat", "login", "loginSort"];
        aZ.data.Login.fieldsShow = ["player", "name", "location", "chat", "login"];
        aZ.data.Login.fieldsSort = ["player", "name", "location", "chat", "loginSort"];
        aZ.data.Login.fieldsNum = [false, false, false, false, false];
        if (!aZ.params.showRealNames) {
            aZ.data.Login.cols--;
            aZ.data.Login.widths = [0.27, 0.4, 0.08, 0.25];
            aZ.data.Login.headers.splice(1, 1);
            aZ.data.Login.fieldsShow.splice(1, 1);
            aZ.data.Login.fieldsSort.splice(1, 1);
            aZ.data.Login.fieldsNum.splice(1, 1)
        }
        bI = a5(localStorage.LoginSortColumn);
        if (bI < 0 || bI >= aZ.data.Login.cols) {
            bI = 0
        }
        aZ.data.Login.sortCol = bI;
        aZ.data.Login.sortAscend = localStorage.LoginSortAscend != "false";
        aZ.data.Login.sortable = true;
        aZ.data.Login.rows = [];
        aZ.data.Login.rowHeight = aZ.mobile ? 24 : 16;
        g.loginGrid = new bB($("#LoginGrid", g.$dialog),aZ.data.Login,null ,function() {
                aB(g.loginGrid.getValue("player"))
            }
            ,function() {
                g.loginSaveSort()
            }
        );
        g.$lobbyChatGroup = $("#LobbyChatGroup", g.$dialog);
        g.lobbyChatText = new bc($("#LobbyChatText", g.$dialog),false);
        g.$lobbyChatGroup.css("border-color", aZ.color.Button);
        g.lobbyChatBtn = new w($("#LobbyChatBtn", g.$dialog),aZ.lang.LobbyButtonChatOpen,25,function() {
                g.popoutChatShow()
            }
        );
        g.lobbyChatEdit = new aE($("#LobbyChatEdit", g.$dialog),{
            onEnterKey: function(bJ) {
                g.lobbyChatEnter(bJ)
            }
        });
        g.$lobbyButtonGroup = $("#LobbyButtonGroup", g.$dialog);
        g.balanceBtn = new w($("#BalanceBtn", g.$dialog),aZ.lang.LobbyButtonBalance,40,function() {
                bt({
                    Response: "Balance"
                })
            }
        );
        g.searchBtn = new w($("#SearchBtn", g.$dialog),aZ.lang.LobbyButtonSearch,40,function() {
                g.playerSearchShow()
            }
        );
        g.chatBlockBtn = new w($("#ChatBlockBtn", g.$dialog),aZ.lang.LobbyButtonBlock,40,function() {
                g.chatBlock()
            }
        );
        g.logInOutBtn = new w($("#LogInOutBtn", g.$dialog),aZ.lang.LobbyButtonLogin,40,function() {
                if (aZ.loggedIn == false) {
                    g.loginShow()
                } else {
                    bt({
                        Response: "LogoutRequest"
                    })
                }
            }
        )
    }
    ;
    bm.prototype.logoutConfirmCreate = function() {
        var bI, g;
        bI = this;
        g = $(".yesno:eq(0)").clone().appendTo("body");
        bI.logoutConfirm = new a2(g,bI,{
            title: aZ.lang.DialogConfirm
        });
        new w($(".ok", bI.logoutConfirm.$dialog),aZ.lang.DialogOK,25,function() {
                bI.logoutConfirmOk()
            }
        );
        new w($(".cancel", bI.logoutConfirm.$dialog),aZ.lang.DialogCancel,25,function() {
                bI.logoutConfirm.close()
            }
        );
        $(".closebtn", bI.logoutConfirm.$dialog).on("touchstart mousedown", function() {
            bI.logoutConfirm.close();
            return false
        })
    }
    ;
    bm.prototype.logoutConfirmOk = function() {
        var g = this;
        g.logoutConfirm.close();
        e(false)
    }
    ;
    bm.prototype.logoutConfirmShow = function(bI) {
        var g = this;
        g.logoutConfirm.showMessage(bI, true)
    }
    ;
    bm.prototype.menuInit = function() {
        var g = this;
        $("#AccountMenu", g.$dialog).text(aZ.lang.LobbyMenuAccount);
        g.accountLogin = new bz($("#AccountLogin", g.$dialog),aZ.lang.LobbyMenuAccountLogin,function() {
                g.loginShow()
            }
            ,true);
        g.accountLogout = new bz($("#AccountLogout", g.$dialog),aZ.lang.LobbyMenuAccountLogout,function() {
                g.close()
            }
            ,true);
        g.accountCreate = new bz($("#AccountCreate", g.$dialog),aZ.lang.LobbyMenuAccountCreate,function() {
                g.accountCreateShow()
            }
            ,true);
        g.accountChange = new bz($("#AccountChange", g.$dialog),aZ.lang.LobbyMenuAccountChange,function() {
                g.accountChangeShow()
            }
            ,true);
        g.accountBalance = new bz($("#AccountBalance", g.$dialog),aZ.lang.LobbyMenuAccountBalance,function() {
                bt({
                    Response: "Balance"
                })
            }
            ,false);
        g.accountPermissions = new bz($("#AccountPermissions", g.$dialog),aZ.lang.LobbyMenuAccountPerm,function() {
                bt({
                    Response: "Permissions"
                })
            }
            ,false);
        g.accountTransfer = new bz($("#AccountTransfer", g.$dialog),aZ.lang.LobbyMenuAccountTransfer,function() {
                g.chipTransferShow()
            }
            ,false);
        g.accountChipRequest = new bz($("#AccountChipRequest", g.$dialog),aZ.lang.LobbyMenuAccountRequest,function() {
                bt({
                    Response: "BalanceReset"
                })
            }
            ,false);
        g.accountExit = new bz($("#AccountExit", g.$dialog),aZ.lang.LobbyMenuAccountExit,function() {
                g.close()
            }
            ,true);
        $("#OptionsMenu", g.$dialog).text(aZ.lang.LobbyMenuOptions);
        g.optionsArrange = new bz($("#OptionsArrange", g.$dialog),aZ.lang.LobbyMenuOptionsArrange,function() {
                g.arrangeWindowsShow()
            }
            ,true);
        g.optionsDisplay = new bz($("#OptionsDisplay", g.$dialog),aZ.lang.LobbyMenuOptionsDisplay,function() {
                g.displaySettingsShow()
            }
            ,true);
        g.optionsTable = new bz($("#OptionsTable", g.$dialog),aZ.lang.LobbyMenuOptionsTable,function() {
                g.tableSettingsShow()
            }
            ,true);
        g.optionsSound = new bz($("#OptionsSound", g.$dialog),aZ.lang.LobbyMenuOptionsSound,function() {
                g.soundShow()
            }
            ,true);
        g.optionsStart = new bz($("#OptionsStart", g.$dialog),aZ.lang.LobbyMenuOptionsStart,function() {
                g.startTournamentShow()
            }
            ,true);
        g.optionsSearch = new bz($("#OptionsSearch", g.$dialog),aZ.lang.LobbyMenuOptionsSearch,function() {
                g.playerSearchShow()
            }
            ,true);
        g.optionsBlock = new bz($("#OptionsBlock", g.$dialog),aZ.lang.LobbyMenuOptionsBlock,function() {
                g.chatBlock()
            }
            ,true);
        $("#HelpMenu", g.$dialog).text(aZ.lang.LobbyMenuHelp).on("touchstart mousedown", function(bI) {
            if (aC(bI)) {
                return
            }
            aZ.doc.debug = true;
            aZ.debugTimer = setTimeout(function() {
                if (aZ.doc.debug) {
                    aQ()
                }
            }, 2000)
        });
        g.helpContact = new bz($("#HelpContact", g.$dialog),aZ.lang.LobbyMenuHelpContact,function() {
                g.contactShow()
            }
            ,true);
        g.helpNews = new bz($("#HelpNews", g.$dialog),aZ.lang.LobbyMenuHelpNews,function() {
                bt({
                    Response: "News"
                })
            }
            ,true);
        g.helpAbout = new bz($("#HelpAbout", g.$dialog),aZ.lang.LobbyMenuHelpAbout + " Poker Mavens...",function() {
                g.aboutShow()
            }
            ,true);
        $(".menu", g.$dialog).css({
            color: aZ.color.ButtonText,
            "background-color": aZ.color.Button
        });
        $(".menu ul", g.$dialog).css({
            color: aZ.color.ListText,
            "background-color": aZ.color.List,
            "border-color": aZ.color.ListText
        });
        $(".menu_sep", g.$dialog).css({
            "background-color": aZ.color.ListText
        });
        $(".menu ul li", g.$dialog).hover(ba, br)
    }
    ;
    bm.prototype.messageShow = function(bL, bK) {
        var bI, g, bJ;
        bI = this;
        g = $(".message:eq(0)").clone().appendTo("body");
        if (!bK || bK == "") {
            bK = aZ.lang.DialogMessage
        }
        bJ = new a2(g,bI,{
            title: bK,
            removeonclose: true
        });
        new w($(".okbtn", bJ.$dialog),aZ.lang.DialogOK,25,function() {
                bJ.close()
            }
        );
        $(".closebtn", bJ.$dialog).on("touchstart mousedown", function() {
            bJ.close();
            return false
        });
        bJ.showMessage(bL, true)
    }
    ;
    bm.prototype.newsCreate = function() {
        var g = this;
        g.news = new a2($("#News"),g,{
            minwidth: 250,
            minheight: 150,
            onresize: function() {
                g.newsResize()
            }
        });
        new w($(".ok", g.news.$dialog),aZ.lang.DialogOK,25,function() {
                g.news.close()
            }
        );
        new w($(".save", g.news.$dialog),aZ.lang.DialogSave,25,function() {
                aO(g.$sitePanel.text(), g.newsContent.getText(), false)
            }
        );
        $(".closebtn", g.news.$dialog).on("touchstart mousedown", function() {
            g.news.close();
            return false
        });
        g.newsContent = new bc($(".newscontent", g.news.$dialog),false)
    }
    ;
    bm.prototype.newsResize = function() {
        this.newsContent.updateScrollPosition()
    }
    ;
    bm.prototype.newsShow = function(bI) {
        var g = this;
        g.news.setTitle(aZ.lang.NewsTitle);
        g.news.show(aZ.mobile);
        g.newsContent.setText(bI);
        g.newsContent.topScroll()
    }
    ;
    bm.prototype.nextTable = function() {
        if (aZ.tableCurrent < aZ.tables.length - 1) {
            aZ.tables[aZ.tableCurrent + 1].bringToFront()
        }
    }
    ;
    bm.prototype.playerSearchCreate = function() {
        var g = this;
        g.playerSearch = new a2($("#PlayerSearch"),g,{
            title: aZ.lang.SearchTitle
        });
        $("#ps_label").text(aZ.lang.SearchName);
        g.playerSearchInput = new aE($("#ps_input"),{
            onEnterKey: function() {
                g.playerSearchOk()
            },
            border: true
        });
        new w($(".ok", g.playerSearch.$dialog),aZ.lang.DialogOK,25,function() {
                g.playerSearchOk()
            }
        );
        new w($(".cancel", g.playerSearch.$dialog),aZ.lang.DialogCancel,25,function() {
                g.playerSearch.close()
            }
        );
        $(".closebtn", g.playerSearch.$dialog).on("touchstart mousedown", function() {
            g.playerSearch.close();
            return false
        })
    }
    ;
    bm.prototype.playerSearchOk = function() {
        var g = this;
        g.playerSearch.close();
        bt({
            Response: "PlayerSearch",
            Player: g.playerSearchInput.getText()
        })
    }
    ;
    bm.prototype.playerSearchShow = function() {
        var g, bI;
        g = this;
        g.playerSearch.show(true);
        bI = g.loginGrid.getValue("player");
        g.playerSearchInput.setText(bI);
        if (aZ.hasTouch == false) {
            g.playerSearchInput.setFocus()
        }
    }
    ;
    bm.prototype.popoutChatClose = function() {
        var g = this;
        if (g.popoutChat.$dialog.is(":visible")) {
            g.popoutChat.close();
            g.lobbyChatDisplay(true);
            g.lobbyChatEdit.setText(g.popoutChatEdit.getText());
            g.lobbyChatUpdate()
        }
    }
    ;
    bm.prototype.popoutChatCreate = function() {
        var g = this;
        g.popoutChat = new a2($("#PopoutChat"),g,{
            title: aZ.lang.LobbyCaptionChat,
            minwidth: 250,
            minheight: 200,
            onresize: function() {
                g.popoutChatResize()
            }
        });
        g.popoutChatEdit = new aE($("#PopoutChatEdit"),{
            onEnterKey: function(bI) {
                g.popoutChatEnter(bI)
            }
        });
        g.popoutChatText = new bc($("#PopoutChatText"),false);
        new w($(".ok", g.popoutChat.$dialog),aZ.lang.DialogOK,25,function() {
                g.popoutChatClose()
            }
        );
        new w($(".save", g.popoutChat.$dialog),aZ.lang.DialogSave,25,function() {
                g.popoutChatSave()
            }
        );
        $(".closebtn", g.popoutChat.$dialog).on("touchstart mousedown", function() {
            g.popoutChatClose();
            return false
        })
    }
    ;
    bm.prototype.popoutChatEnter = function(bJ) {
        var bI, g;
        bI = this;
        g = $.trim(bJ);
        if (g == "") {
            return
        }
        if (aZ.loggedIn == false) {
            bI.messageShow(aZ.lang.MessageChatLogin)
        } else {
            bt({
                Response: "LobbyChat",
                Text: g
            });
            bI.popoutChatEdit.setText("");
            if (aZ.hasTouch) {
                bI.popoutChatEdit.unFocus()
            }
        }
    }
    ;
    bm.prototype.popoutChatResize = function() {
        this.popoutChatText.updateScrollPosition()
    }
    ;
    bm.prototype.popoutChatSave = function() {
        var bI, bJ, g;
        bI = this;
        bJ = bI.popoutChatText.$memotext.clone();
        $("span", bJ).each(function() {
            $(this).replaceWith($(this).text())
        });
        $("font", bJ).each(function() {
            $(this).replaceWith($(this).text())
        });
        g = Y(bJ.html());
        aO(bI.$sitePanel.text(), g, false)
    }
    ;
    bm.prototype.popoutChatShow = function() {
        var bL, bJ, bI, g, bK;
        bL = this;
        bL.lobbyChatDisplay(false);
        if (aZ.mobile) {
            bL.popoutChat.$dialog.css({
                width: 500,
                height: bL.lobbyTabs.$container.height() - 90
            });
            bL.popoutChat.show(true)
        } else {
            bJ = bL.$dialog.offset().top;
            bI = bL.$dialog.offset().left + bL.$dialog.outerWidth() + 5;
            g = 350;
            bK = bL.$dialog.height();
            $(".resize", bL.popoutChat.$dialog).show();
            bL.popoutChat.$dialog.css({
                top: bJ,
                left: bI,
                width: g,
                height: bK
            }).show().css("z-index", ++aZ.zTop);
            at(bL.popoutChat)
        }
        bL.popoutChatEdit.setText(bL.lobbyChatEdit.getText());
        bL.lobbyChatUpdate()
    }
    ;
    bm.prototype.prevTable = function() {
        if (aZ.tableCurrent > 0) {
            aZ.tables[aZ.tableCurrent - 1].bringToFront()
        }
    }
    ;
    bm.prototype.recoveryCreate = function() {
        var bI, g;
        bI = this;
        g = $(".yesno:eq(0)").clone().appendTo("body");
        bI.recovery = new a2(g,bI,{});
        new w($(".ok", bI.recovery.$dialog),aZ.lang.DialogOK,25,function() {
                bI.recoveryOk()
            }
        );
        new w($(".cancel", bI.recovery.$dialog),aZ.lang.DialogCancel,25,function() {
                bI.recovery.close()
            }
        );
        $(".closebtn", bI.recovery.$dialog).on("touchstart mousedown", function() {
            bI.recovery.close();
            return false
        })
    }
    ;
    bm.prototype.recoveryOk = function() {
        var g = this;
        g.recovery.close();
        bt({
            Response: g.recovery.command,
            Player: g.recovery.player
        })
    }
    ;
    bm.prototype.recoveryShow = function(bJ, g) {
        var bI = this;
        bI.recovery.setTitle(g);
        bI.recovery.showMessage(bJ, true)
    }
    ;
    bm.prototype.resendValCode = function() {
        var bI, g;
        bI = this;
        g = bI.loginNameInput.getText();
        if (g == "") {
            bI.messageShow(aZ.lang.LoginNoName)
        } else {
            bI.recovery.player = g;
            bI.recovery.command = "ResendValCode";
            bI.recoveryShow(aZ.lang.ValCodeMsg1, g)
        }
    }
    ;
    bm.prototype.resetPassword = function() {
        var bI, g;
        bI = this;
        g = bI.loginNameInput.getText();
        if (g == "") {
            bI.messageShow(aZ.lang.LoginNoName)
        } else {
            bI.recovery.player = g;
            bI.recovery.command = "ResetPassword";
            bI.recoveryShow(aZ.lang.ValCodeMsg2, g)
        }
    }
    ;
    bm.prototype.resize = function() {
        var bI, g;
        bI = this;
        g = (bI.lobbyTabs.$container.width() - 25) / bI.lobbyTabs.count;
        bI.lobbyTabs.setTabWidth(g);
        bI.loginGrid.resize();
        bI.ringGrid.resize();
        bI.ringPlayerGrid.resize();
        bI.sitnGoGrid.resize();
        bI.sitnGoPlayerGrid.resize();
        bI.tourneyGrid.resize();
        bI.tourneyPlayerGrid.resize()
    }
    ;
    bm.prototype.retryCancel = function() {
        var g = this;
        g.retryMessage.close();
        e(false)
    }
    ;
    bm.prototype.retryCreate = function() {
        var bI, g;
        bI = this;
        g = $(".message:eq(0)").clone().appendTo("body");
        bI.retryMessage = new a2(g,bI,{
            title: aZ.lang.ConnectTitle
        });
        new w($(".okbtn", bI.retryMessage.$dialog),aZ.lang.DialogCancel,25,function() {
                bI.retryCancel()
            }
        );
        $(".closebtn", bI.retryMessage.$dialog).on("touchstart mousedown", function() {
            bI.retryCancel();
            return false
        })
    }
    ;
    bm.prototype.ringGameSelect = function(g) {
        var bI, bJ;
        bI = this;
        if (g < 0 || g >= aZ.data.Ring.rows.length) {
            bI.ringUnselect()
        } else {
            bJ = bI.ringSelected != aZ.data.Ring.rows[g].id;
            bI.ringSelected = aZ.data.Ring.rows[g].id;
            bI.ringInfoBtn.show(true);
            bI.ringObserveBtn.show(true);
            bI.ringWaitBtn.show(aZ.data.Ring.rows[g].playing == aZ.data.Ring.rows[g].seats);
            if (bJ) {
                bt({
                    Response: "GameSelected",
                    Table: bI.ringSelected,
                    Type: "R"
                })
            }
        }
    }
    ;
    bm.prototype.ringGameSelectID = function(bK) {
        var bI, bJ, g;
        bI = this;
        bI.ringGrid.selrow = -1;
        if (bK == "") {
            bI.ringUnselect();
            return
        }
        bJ = aZ.data.Ring.rows.length;
        for (g = 0; g < bJ; g++) {
            if (bK == aZ.data.Ring.rows[g].id) {
                bI.ringGrid.selrow = g;
                break
            }
        }
    }
    ;
    bm.prototype.ringFilterChange = function() {
        var bI, bJ, g;
        bI = this;
        bj("filterRingActivate", bI.ringFilterCB.isChecked());
        bI.ringFilterBtn.setCaption(aZ.local.filterRingActivate ? aZ.lang.LobbyButtonFilterOn : aZ.lang.LobbyButtonFilterOff);
        bJ = "";
        g = bI.ringGrid.selrow;
        if (g >= 0) {
            bJ = aZ.data.Ring.rows[g].id
        }
        bI.ringFilterData();
        bI.ringGameSelectID(bJ);
        bI.ringGrid.sort();
        bI.ringGameSelect(bI.ringGrid.selrow);
        bI.ringTabCaption()
    }
    ;
    bm.prototype.ringFilterCreate = function() {
        var g = this;
        g.ringFilter = new a2($("#RingFilter"),g,{
            title: aZ.lang.FilterTitleRing
        });
        $("#rf_game").text(aZ.lang.FilterGame);
        g.rfHoldem = new b($("#rf_holdem"),aZ.lang.FilterHoldem);
        g.rfOmaha = new b($("#rf_omaha"),aZ.lang.FilterOmaha);
        g.rfOmahaHiLo = new b($("#rf_omahahilo"),aZ.lang.FilterOmahaHiLo);
        $("#rf_limit").text(aZ.lang.FilterLimit);
        g.rfNL = new b($("#rf_nl"),aZ.lang.FilterNL);
        g.rfPL = new b($("#rf_pl"),aZ.lang.FilterPL);
        g.rfFixed = new b($("#rf_fixed"),aZ.lang.FilterFixed);
        $("#rf_stakes").text(aZ.lang.FilterStakes);
        $("#rf_stakesmincap").text(aZ.lang.FilterMin);
        g.rfStakesMin = new aE($("#rf_stakesmin"),{
            border: true
        });
        $("#rf_stakesmaxcap").text(aZ.lang.FilterMax);
        g.rfStakesMax = new aE($("#rf_stakesmax"),{
            border: true
        });
        $("#rf_buyin").text(aZ.lang.FilterBuyin);
        $("#rf_buyinmincap").text(aZ.lang.FilterMin);
        g.rfBuyinMin = new aE($("#rf_buyinmin"),{
            border: true
        });
        $("#rf_buyinmaxcap").text(aZ.lang.FilterMax);
        g.rfBuyinMax = new aE($("#rf_buyinmax"),{
            border: true
        });
        $("#rf_seats").text(aZ.lang.FilterSeats);
        $("#rf_seatsmincap").text(aZ.lang.FilterMin);
        g.rfSeatsMin = new aE($("#rf_seatsmin"),{
            border: true
        });
        $("#rf_seatsmaxcap").text(aZ.lang.FilterMax);
        g.rfSeatsMax = new aE($("#rf_seatsmax"),{
            border: true
        });
        $("#rf_players").text(aZ.lang.FilterPlayers);
        $("#rf_playersmincap").text(aZ.lang.FilterMin);
        g.rfPlayersMin = new aE($("#rf_playersmin"),{
            border: true
        });
        g.rfHideFull = new b($("#rf_hidefull"),aZ.lang.FilterFull);
        g.rfHidePrivate = new b($("#rf_hideprivate"),aZ.lang.FilterPrivate);
        new w($("#rf_reset", g.ringFilter.$dialog),aZ.lang.FilterReset,20,function() {
                g.ringFilterReset()
            }
        );
        new w($(".ok", g.ringFilter.$dialog),aZ.lang.DialogOK,25,function() {
                g.ringFilterOk()
            }
        );
        new w($(".cancel", g.ringFilter.$dialog),aZ.lang.DialogCancel,25,function() {
                g.ringFilter.close()
            }
        );
        $(".closebtn", g.ringFilter.$dialog).on("touchstart mousedown", function() {
            g.ringFilter.close();
            return false
        })
    }
    ;
    bm.prototype.ringFilterData = function() {
        var bS, bN, bL, bP, bQ, bI, bJ, bO, g, bM, bR, bK;
        if (!aZ.local.filterRingActivate) {
            aZ.data.Ring.rows = aZ.data.Ring.urows.slice(0)
        } else {
            aZ.data.Ring.rows.length = 0;
            bL = a5(aZ.local.filterRingStakesMin);
            bP = a5(aZ.local.filterRingStakesMax);
            bQ = a5(aZ.local.filterRingBuyinMin);
            bI = a5(aZ.local.filterRingBuyinMax);
            bJ = a5(aZ.local.filterRingSeatsMin);
            bO = a5(aZ.local.filterRingSeatsMax);
            g = a5(aZ.local.filterRingPlayersMin);
            bM = aZ.local.filterRingHideFull;
            bR = aZ.local.filterRingHidePrivate;
            for (bK = 0; bK < aZ.data.Ring.urows.length; bK++) {
                bS = aZ.data.Ring.urows[bK];
                bN = bS.gameIndex;
                switch (bN) {
                    case 0:
                        if (!aZ.local.filterRingHoldem || !aZ.local.filterRingFixed) {
                            continue
                        }
                        break;
                    case 1:
                        if (!aZ.local.filterRingHoldem || !aZ.local.filterRingPL) {
                            continue
                        }
                        break;
                    case 2:
                        if (!aZ.local.filterRingHoldem || !aZ.local.filterRingNL) {
                            continue
                        }
                        break;
                    case 3:
                        if (!aZ.local.filterRingOmaha || !aZ.local.filterRingFixed) {
                            continue
                        }
                        break;
                    case 4:
                        if (!aZ.local.filterRingOmaha || !aZ.local.filterRingPL) {
                            continue
                        }
                        break;
                    case 5:
                        if (!aZ.local.filterRingOmaha || !aZ.local.filterRingNL) {
                            continue
                        }
                        break;
                    case 6:
                        if (!aZ.local.filterRingOmahaHiLo || !aZ.local.filterRingFixed) {
                            continue
                        }
                        break;
                    case 7:
                        if (!aZ.local.filterRingOmahaHiLo || !aZ.local.filterRingPL) {
                            continue
                        }
                        break;
                    case 8:
                        if (!aZ.local.filterRingOmahaHiLo || !aZ.local.filterRingNL) {
                            continue
                        }
                        break
                }
                if (bS.stakesLo < bL) {
                    continue
                }
                if (bP > 0 && bS.stakesHi > bP) {
                    continue
                }
                if (bS.buyinMin < bQ) {
                    continue
                }
                if (bI > 0 && bS.buyinMax > bI) {
                    continue
                }
                if (bS.seats < bJ) {
                    continue
                }
                if (bO > 0 && bS.seats > bO) {
                    continue
                }
                if (bS.playing < g) {
                    continue
                }
                if (bM && bS.playing == bS.seats) {
                    continue
                }
                if (bR && bS.password != "No") {
                    continue
                }
                aZ.data.Ring.rows.push(bS)
            }
        }
    }
    ;
    bm.prototype.ringFilterOk = function() {
        var g = this;
        g.ringFilter.close();
        bj("filterRingHoldem", g.rfHoldem.isChecked());
        bj("filterRingOmaha", g.rfOmaha.isChecked());
        bj("filterRingOmahaHiLo", g.rfOmahaHiLo.isChecked());
        bj("filterRingNL", g.rfNL.isChecked());
        bj("filterRingPL", g.rfPL.isChecked());
        bj("filterRingFixed", g.rfFixed.isChecked());
        bj("filterRingStakesMin", g.rfStakesMin.getText());
        bj("filterRingStakesMax", g.rfStakesMax.getText());
        bj("filterRingBuyinMin", g.rfBuyinMin.getText());
        bj("filterRingBuyinMax", g.rfBuyinMax.getText());
        bj("filterRingSeatsMin", g.rfSeatsMin.getText());
        bj("filterRingSeatsMax", g.rfSeatsMax.getText());
        bj("filterRingPlayersMin", g.rfPlayersMin.getText());
        bj("filterRingHideFull", g.rfHideFull.isChecked());
        bj("filterRingHidePrivate", g.rfHidePrivate.isChecked());
        if (aZ.local.filterRingActivate) {
            g.ringFilterChange()
        }
    }
    ;
    bm.prototype.ringFilterReset = function() {
        var g = this;
        g.rfHoldem.setCheck(true);
        g.rfOmaha.setCheck(true);
        g.rfOmahaHiLo.setCheck(true);
        g.rfNL.setCheck(true);
        g.rfPL.setCheck(true);
        g.rfFixed.setCheck(true);
        g.rfStakesMin.setText("");
        g.rfStakesMax.setText("");
        g.rfBuyinMin.setText("");
        g.rfBuyinMax.setText("");
        g.rfSeatsMin.setText("");
        g.rfSeatsMax.setText("");
        g.rfPlayersMin.setText("");
        g.rfHideFull.setCheck(false);
        g.rfHidePrivate.setCheck(false)
    }
    ;
    bm.prototype.ringFilterShow = function() {
        var g = this;
        g.rfHoldem.setCheck(aZ.local.filterRingHoldem);
        g.rfOmaha.setCheck(aZ.local.filterRingOmaha);
        g.rfOmahaHiLo.setCheck(aZ.local.filterRingOmahaHiLo);
        g.rfNL.setCheck(aZ.local.filterRingNL);
        g.rfPL.setCheck(aZ.local.filterRingPL);
        g.rfFixed.setCheck(aZ.local.filterRingFixed);
        g.rfStakesMin.setText(aZ.local.filterRingStakesMin);
        g.rfStakesMax.setText(aZ.local.filterRingStakesMax);
        g.rfBuyinMin.setText(aZ.local.filterRingBuyinMin);
        g.rfBuyinMax.setText(aZ.local.filterRingBuyinMax);
        g.rfSeatsMin.setText(aZ.local.filterRingSeatsMin);
        g.rfSeatsMax.setText(aZ.local.filterRingSeatsMax);
        g.rfPlayersMin.setText(aZ.local.filterRingPlayersMin);
        g.rfHideFull.setCheck(aZ.local.filterRingHideFull);
        g.rfHidePrivate.setCheck(aZ.local.filterRingHidePrivate);
        g.ringFilter.show(true)
    }
    ;
    bm.prototype.ringInfoRequest = function() {
        var g, bI;
        g = this;
        if (g.ringSelected == "") {
            g.messageShow(aZ.lang.LobbyCaptionNoRingGame);
            return
        }
        bI = {
            Response: "TableInfo"
        };
        bI.Table = g.ringSelected;
        bI.Type = "R";
        bt(bI)
    }
    ;
    bm.prototype.ringRegister = function() {
        var bK, g, bJ, bL, bM, bI;
        bK = this;
        g = bK.ringGrid.selrow;
        if (g < 0) {
            bK.messageShow(aZ.lang.LobbyCaptionNoRingGame);
            return
        }
        if (aZ.loggedIn == false) {
            bK.messageShow(aZ.lang.MessageRingGameLogin);
            return
        }
        bJ = aZ.data.Ring.rows[g].password;
        bL = (bJ == "Yes" || bJ == "Yes+");
        bM = aZ.data.Ring.rows[g].id;
        bI = bK.ringWaitBtn.getCaption() == aZ.lang.LobbyButtonRingWait;
        if (bI == true) {
            U("Register", bM, "R", bL, 0)
        } else {
            bt({
                Response: "Unregister",
                Table: bM,
                Type: "R"
            })
        }
    }
    ;
    bm.prototype.ringSaveSort = function() {
        localStorage.RingSortColumn = aZ.data.Ring.sortCol;
        localStorage.RingSortAscend = aZ.data.Ring.sortAscend;
        localStorage.RingPlayerSortColumn = aZ.data.RingPlayer.sortCol;
        localStorage.RingPlayerSortAscend = aZ.data.RingPlayer.sortAscend
    }
    ;
    bm.prototype.ringTabCaption = function() {
        var g, bI;
        g = this;
        bI = aZ.lang.LobbyCaptionRingGames + ": ";
        if (aZ.local.filterRingActivate) {
            bI = bI + aZ.data.Ring.rows.length + "/"
        }
        bI = bI + aZ.data.Ring.urows.length;
        g.lobbyTabs.setCaption(1, bI)
    }
    ;
    bm.prototype.ringTableOpen = function(bI) {
        var bJ, bK, g;
        bJ = this;
        if (bI < 0) {
            bJ.messageShow(aZ.lang.LobbyCaptionNoRingGame);
            return
        }
        bK = aZ.data.Ring.rows[bI].password == "Yes+";
        g = aZ.data.Ring.rows[bI].id;
        U("OpenTable", g, "R", bK, 0)
    }
    ;
    bm.prototype.ringTableSelectedOpen = function() {
        var g = this;
        g.ringTableOpen(g.ringGrid.selrow)
    }
    ;
    bm.prototype.ringTabSetup = function() {
        var g, bJ, bI;
        g = this;
        aZ.data.Ring = {};
        aZ.data.Ring.cols = 7;
        bJ = a5(localStorage.RingSortColumn);
        if (bJ < 0 || bJ > 6) {
            bJ = 0
        }
        aZ.data.Ring.sortCol = bJ;
        aZ.data.Ring.sortAscend = localStorage.RingSortAscend != "false";
        aZ.data.Ring.sortable = true;
        aZ.data.Ring.widths = [0.26, 0.18, 0.15, 0.17, 0.08, 0.08, 0.08];
        aZ.data.Ring.rows = [];
        aZ.data.Ring.urows = [];
        aZ.data.Ring.rowHeight = aZ.mobile ? 24 : 16;
        aZ.data.Ring.headers = [aZ.lang.LobbyColumnRingID, aZ.lang.LobbyColumnRingGame, aZ.lang.LobbyColumnRingStakes, aZ.lang.LobbyColumnRingBuyIn, aZ.lang.LobbyColumnRingSeats, aZ.lang.LobbyColumnRingPlay, aZ.lang.LobbyColumnRingWait];
        aZ.data.Ring.fields = ["id", "game", "gameIndex", "stakes", "stakesLo", "stakesHi", "stakesSort", "buyin", "buyinMin", "buyinMax", "buyinSort", "seats", "playing", "waiting", "password"];
        aZ.data.Ring.fieldsShow = ["id", "game", "stakes", "buyin", "seats", "playing", "waiting"];
        aZ.data.Ring.fieldsSort = ["id", "game", "stakesSort", "buyinSort", "seats", "playing", "waiting"];
        aZ.data.Ring.fieldsNum = [false, false, true, true, true, true, true];
        g.ringGrid = new bB($("#RingGrid", g.$dialog),aZ.data.Ring,function(bK) {
                g.ringGameSelect(bK)
            }
            ,function(bK) {
                g.ringTableOpen(bK)
            }
            ,function() {
                g.ringSaveSort()
            }
        );
        g.ringFilterCB = new b($("#RingFilterCB", g.$dialog),"",function() {
                g.ringFilterChange()
            }
        );
        g.ringFilterCB.setCheck(aZ.local.filterRingActivate);
        bI = aZ.local.filterRingActivate ? aZ.lang.LobbyButtonFilterOn : aZ.lang.LobbyButtonFilterOff;
        g.ringFilterBtn = new w($("#RingFilterBtn", g.$dialog),bI,20,function() {
                g.ringFilterShow()
            }
        );
        g.ringObserveBtn = new w($("#RingObserveBtn", g.$dialog),aZ.lang.LobbyButtonRingObserve,30,function() {
                g.ringTableSelectedOpen()
            }
        );
        g.ringInfoBtn = new w($("#RingInfoBtn", g.$dialog),aZ.lang.LobbyButtonRingInfo,30,function() {
                g.ringInfoRequest()
            }
        );
        g.ringWaitBtn = new w($("#RingWaitBtn", g.$dialog),aZ.lang.LobbyButtonRingWait,30,function() {
                g.ringRegister()
            }
        );
        g.ringSelected = "";
        g.$ringSelected = $("#RingSelected", g.$dialog);
        aZ.data.RingPlayer = {};
        aZ.data.RingPlayer.cols = 3;
        bJ = a5(localStorage.RingPlayerSortColumn);
        if (bJ < 0 || bJ > 2) {
            bJ = 0
        }
        aZ.data.RingPlayer.sortCol = bJ;
        aZ.data.RingPlayer.sortAscend = localStorage.RingPlayerSortAscend != "false";
        aZ.data.RingPlayer.sortable = true;
        aZ.data.RingPlayer.widths = [0.4, 0.3, 0.3];
        aZ.data.RingPlayer.rows = [];
        aZ.data.RingPlayer.rowHeight = 16;
        aZ.data.RingPlayer.headers = [aZ.lang.LobbyColumnRingPlayer, aZ.lang.LobbyColumnRingChips, aZ.lang.LobbyColumnRingNet];
        aZ.data.RingPlayer.fields = ["player", "chips", "chipsSort", "net", "netSort"];
        aZ.data.RingPlayer.fieldsShow = ["player", "chips", "net"];
        aZ.data.RingPlayer.fieldsSort = ["player", "chipsSort", "netSort"];
        aZ.data.RingPlayer.fieldsNum = [false, true, true];
        if (!aZ.params.showNetChips) {
            aZ.data.RingPlayer.cols--;
            aZ.data.RingPlayer.widths = [0.6, 0.4];
            aZ.data.RingPlayer.headers.splice(2, 1);
            aZ.data.RingPlayer.fieldsShow.splice(2, 1);
            aZ.data.RingPlayer.fieldsSort.splice(2, 1);
            aZ.data.RingPlayer.fieldsNum.splice(2, 1)
        }
        g.ringPlayerGrid = new bB($("#RingPlayerGrid", g.$dialog),aZ.data.RingPlayer,null ,null ,function() {
                g.ringSaveSort()
            }
        );
        aZ.data.RingWait = {};
        aZ.data.RingWait.cols = 2;
        aZ.data.RingWait.sortCol = -1;
        aZ.data.RingWait.sortAscend = true;
        aZ.data.RingWait.sortable = false;
        aZ.data.RingWait.widths = [0.23, 0.77];
        aZ.data.RingWait.rows = [];
        aZ.data.RingWait.rowHeight = 16;
        aZ.data.RingWait.headers = ["#", aZ.lang.LobbyColumnRingWaiting];
        aZ.data.RingWait.fields = ["pos", "player"];
        aZ.data.RingWait.fieldsShow = ["pos", "player"];
        aZ.data.RingWait.fieldsSort = ["pos", "player"];
        aZ.data.RingWait.fieldsNum = [true, false];
        g.ringWaitGrid = new bB($("#RingWaitGrid", g.$dialog),aZ.data.RingWait)
    }
    ;
    bm.prototype.ringUnselect = function() {
        var g = this;
        g.ringSelected = "";
        g.$ringSelected.text(aZ.lang.LobbyCaptionNoRingGame);
        aZ.data.RingPlayer.rows.length = 0;
        g.ringPlayerGrid.update();
        aZ.data.RingWait.rows.length = 0;
        g.ringWaitGrid.update();
        g.ringInfoBtn.show(false);
        g.ringObserveBtn.show(false);
        g.ringWaitBtn.show(false)
    }
    ;
    bm.prototype.setCaption = function(g) {
        this.dialog.setTitle(g)
    }
    ;
    bm.prototype.sitnGoFilterData = function() {
        var bM, g, bL, bJ, bI, bN, bK;
        if (!aZ.params.sitAndGoTab) {
            return
        }
        aZ.data.SitnGo.total = aZ.data.Tourney.urows.length;
        aZ.data.SitnGo.rows.length = 0;
        if (!aZ.local.filterSitnGoActivate) {
            for (bK = 0; bK < aZ.data.Tourney.urows.length; bK++) {
                bM = aZ.data.Tourney.urows[bK];
                if (!bM.sng) {
                    aZ.data.SitnGo.total--
                } else {
                    aZ.data.SitnGo.rows.push(bM)
                }
            }
        } else {
            bL = a5(aZ.local.filterSitnGoBuyinMin);
            bJ = a5(aZ.local.filterSitnGoBuyinMax);
            bI = a5(aZ.local.filterSitnGoSizeMin);
            bN = a5(aZ.local.filterSitnGoSizeMax);
            for (bK = 0; bK < aZ.data.Tourney.urows.length; bK++) {
                bM = aZ.data.Tourney.urows[bK];
                if (!bM.sng) {
                    aZ.data.SitnGo.total--;
                    continue
                }
                g = bM.gameIndex;
                switch (g) {
                    case 0:
                        if (!aZ.local.filterSitnGoHoldem || !aZ.local.filterSitnGoFixed) {
                            continue
                        }
                        break;
                    case 1:
                        if (!aZ.local.filterSitnGoHoldem || !aZ.local.filterSitnGoPL) {
                            continue
                        }
                        break;
                    case 2:
                        if (!aZ.local.filterSitnGoHoldem || !aZ.local.filterSitnGoNL) {
                            continue
                        }
                        break;
                    case 3:
                        if (!aZ.local.filterSitnGoOmaha || !aZ.local.filterSitnGoFixed) {
                            continue
                        }
                        break;
                    case 4:
                        if (!aZ.local.filterSitnGoOmaha || !aZ.local.filterSitnGoPL) {
                            continue
                        }
                        break;
                    case 5:
                        if (!aZ.local.filterSitnGoOmaha || !aZ.local.filterSitnGoNL) {
                            continue
                        }
                        break;
                    case 6:
                        if (!aZ.local.filterSitnGoOmahaHiLo || !aZ.local.filterSitnGoFixed) {
                            continue
                        }
                        break;
                    case 7:
                        if (!aZ.local.filterSitnGoOmahaHiLo || !aZ.local.filterSitnGoPL) {
                            continue
                        }
                        break;
                    case 8:
                        if (!aZ.local.filterSitnGoOmahaHiLo || !aZ.local.filterSitnGoNL) {
                            continue
                        }
                        break
                }
                if (!aZ.local.filterSitnGoFreezeout && !bM.rebuy && !bM.shootout) {
                    continue
                }
                if (!aZ.local.filterSitnGoRebuy && bM.rebuy) {
                    continue
                }
                if (!aZ.local.filterSitnGoShootout && bM.shootout) {
                    continue
                }
                if (bM.buyinTotal < bL) {
                    continue
                }
                if (bJ > 0 && bM.buyinTotal > bJ) {
                    continue
                }
                if (bM.ts < bI) {
                    continue
                }
                if (bN > 0 && bM.ts > bN) {
                    continue
                }
                if (aZ.local.filterSitnGoHidePrivate && bM.password != "No") {
                    continue
                }
                if (aZ.local.filterSitnGoHideRunning && bM.running == "Yes") {
                    continue
                }
                aZ.data.SitnGo.rows.push(bM)
            }
        }
    }
    ;
    bm.prototype.sitnGoInfoRequest = function() {
        var g = this;
        if (g.sitnGoSelected == "") {
            g.messageShow(aZ.lang.LobbyCaptionNoTournament);
            return
        }
        bt({
            Response: "TableInfo",
            Table: g.sitnGoSelected,
            Type: "T"
        })
    }
    ;
    bm.prototype.sitnGoRegister = function() {
        var bK, bJ, g, bL, bM, bI;
        bK = this;
        if (bK.sitnGoSelected == "") {
            bK.messageShow(aZ.lang.LobbyCaptionNoTournament);
            return
        }
        if (aZ.loggedIn == false) {
            bK.messageShow(aZ.lang.MessageTournamentLogin);
            return
        }
        bM = bK.sitnGoRegisterBtn.getCaption();
        bJ = (bM == aZ.lang.LobbyButtonTrnyRegister || bM == aZ.lang.LobbyButtonTrnyRegLate);
        if (bJ) {
            bt({
                Response: "RegisterRequest",
                Table: bK.sitnGoSelected,
                Type: "T"
            })
        } else {
            g = bK.sitnGoGrid.selrow;
            bI = aZ.data.SitnGo.rows[g].password;
            bL = (bI == "Yes" || bI == "Yes+");
            U("Unregister", bK.sitnGoSelected, "T", bL, 0)
        }
    }
    ;
    bm.prototype.sitnGoRegCreate = function() {
        var bI, g;
        bI = this;
        g = $(".yesno:eq(0)").clone().appendTo("body");
        bI.sitnGoReg = new a2(g,bI,{});
        new w($(".ok", bI.sitnGoReg.$dialog),aZ.lang.DialogOK,25,function() {
                bI.sitnGoRegOk()
            }
        );
        new w($(".cancel", bI.sitnGoReg.$dialog),aZ.lang.DialogCancel,25,function() {
                bI.sitnGoReg.close()
            }
        );
        $(".closebtn", bI.sitnGoReg.$dialog).on("touchstart mousedown", function() {
            bI.sitnGoReg.close();
            return false
        })
    }
    ;
    bm.prototype.sitnGoRegOk = function() {
        var g = this;
        g.sitnGoReg.close();
        U("Register", g.sitnGoReg.sitnGo, "T", g.sitnGoReg.needpw, 0)
    }
    ;
    bm.prototype.sitnGoRegShow = function(bK, g, bJ) {
        var bI = this;
        bI.sitnGoReg.setTitle(g);
        bI.sitnGoReg.sitnGo = g;
        bI.sitnGoReg.needpw = bJ;
        bI.sitnGoReg.showMessage(bK, true)
    }
    ;
    bm.prototype.sitnGoSaveSort = function() {
        localStorage.SitnGoSortColumn = aZ.data.SitnGo.sortCol;
        localStorage.SitnGoSortAscend = aZ.data.SitnGo.sortAscend;
        localStorage.SitnGoPlayerSortColumn = aZ.data.SitnGoPlayer.sortCol;
        localStorage.SitnGoPlayerSortAscend = aZ.data.SitnGoPlayer.sortAscend
    }
    ;
    bm.prototype.sitnGoSelect = function(g) {
        var bJ, bI, bK;
        bJ = this;
        if (g < 0 || g >= aZ.data.SitnGo.rows.length) {
            bJ.sitnGoUnselect()
        } else {
            bK = bJ.sitnGoSelected != aZ.data.SitnGo.rows[g].id;
            bJ.sitnGoSelected = aZ.data.SitnGo.rows[g].id;
            bI = aZ.data.SitnGo.rows[g].startTime;
            if (bI == "No") {
                bI = ""
            } else {
                bI = aZ.lang.LobbyCaptionStartTime + ":<br>" + bI
            }
            bJ.$sitnGoStartLabel.html(bI);
            bJ.sitnGoInfoBtn.show(true);
            bJ.sitnGoObserveBtn.show(true);
            bJ.sitnGoRegisterBtn.show(true);
            if (bK) {
                bt({
                    Response: "GameSelected",
                    Table: bJ.sitnGoSelected,
                    Type: "T"
                })
            }
        }
    }
    ;
    bm.prototype.sitnGoSelectID = function(bK) {
        var bI, bJ, g;
        bI = this;
        bI.sitnGoGrid.selrow = -1;
        if (bK == "") {
            bI.sitnGoUnselect();
            return
        }
        bJ = aZ.data.SitnGo.rows.length;
        for (g = 0; g < bJ; g++) {
            if (bK == aZ.data.SitnGo.rows[g].id) {
                bI.sitnGoGrid.selrow = g;
                break
            }
        }
    }
    ;
    bm.prototype.sitnGoTabCaption = function() {
        var g, bI;
        g = this;
        bI = aZ.lang.LobbyCaptionSitnGos + ": ";
        if (aZ.local.filterSitnGoActivate) {
            bI = bI + aZ.data.SitnGo.rows.length + "/"
        }
        bI = bI + aZ.data.SitnGo.total;
        g.lobbyTabs.setCaption(3, bI)
    }
    ;
    bm.prototype.sitnGoTableSelectedOpen = function() {
        var g = this;
        g.tourneyTableOpen(true, g.sitnGoGrid.selrow)
    }
    ;
    bm.prototype.sitnGoTabSetup = function() {
        var g, bJ, bI;
        g = this;
        aZ.data.SitnGo = {};
        aZ.data.SitnGo.cols = 6;
        bJ = a5(localStorage.SitnGoSortColumn);
        if (bJ < 0 || bJ > 5) {
            bJ = 0
        }
        aZ.data.SitnGo.sortCol = bJ;
        aZ.data.SitnGo.sortAscend = localStorage.SitnGoSortAscend != "false";
        aZ.data.SitnGo.sortable = true;
        aZ.data.SitnGo.widths = [0.26, 0.18, 0.16, 0.06, 0.11, 0.23];
        aZ.data.SitnGo.rows = [];
        aZ.data.SitnGo.total = 0;
        aZ.data.SitnGo.rowHeight = aZ.mobile ? 24 : 16;
        aZ.data.SitnGo.headers = [aZ.lang.LobbyColumnTrnyID, aZ.lang.LobbyColumnTrnyGame, aZ.lang.LobbyColumnTrnyBuyIn, aZ.lang.LobbyColumnTrnyTS, aZ.lang.LobbyColumnTrnyReg, aZ.lang.LobbyColumnTrnyStarts];
        aZ.data.SitnGo.fields = ["id", "game", "gameIndex", "buyin", "buyinSort", "ts", "reg", "regSort", "tables", "starts", "startMin", "startTime", "password"];
        aZ.data.SitnGo.fieldsShow = ["id", "game", "buyin", "ts", "reg", "starts"];
        aZ.data.SitnGo.fieldsSort = ["id", "game", "buyinSort", "ts", "regSort", "starts"];
        aZ.data.SitnGo.fieldsNum = [false, false, true, true, false, false];
        g.sitnGoGrid = new bB($("#SitnGoGrid", g.$dialog),aZ.data.SitnGo,function(bK) {
                g.sitnGoSelect(bK)
            }
            ,function(bK) {
                g.tourneyTableOpen(true, bK)
            }
            ,function() {
                g.sitnGoSaveSort()
            }
        );
        g.$sitnGoStartLabel = $("#SitnGoStartLabel", g.$dialog);
        g.sitnGoFilterCB = new b($("#SitnGoFilterCB", g.$dialog),"",function() {
                g.tourneyFilterChange(true)
            }
        );
        g.sitnGoFilterCB.setCheck(aZ.local.filterSitnGoActivate);
        bI = aZ.local.filterSitnGoActivate ? aZ.lang.LobbyButtonFilterOn : aZ.lang.LobbyButtonFilterOff;
        g.sitnGoFilterBtn = new w($("#SitnGoFilterBtn", g.$dialog),bI,20,function() {
                g.tourneyFilterShow(true)
            }
        );
        g.sitnGoObserveBtn = new w($("#SitnGoObserveBtn", g.$dialog),aZ.lang.LobbyButtonTrnyObserve,30,function() {
                g.sitnGoTableSelectedOpen()
            }
        );
        g.sitnGoInfoBtn = new w($("#SitnGoInfoBtn", g.$dialog),aZ.lang.LobbyButtonTrnyInfo,30,function() {
                g.sitnGoInfoRequest()
            }
        );
        g.sitnGoRegisterBtn = new w($("#SitnGoRegisterBtn", g.$dialog),aZ.lang.LobbyButtonTrnyRegister,30,function() {
                g.sitnGoRegister()
            }
        );
        g.sitnGoStartNow = new b($("#SitnGoStartNow", g.$dialog),aZ.lang.LobbyCaptionStartNow + " *",function() {
                g.sitnGoStartNowCheck()
            }
        );
        g.sitnGoSelected = "";
        g.$sitnGoSelected = $("#SitnGoSelected", g.$dialog);
        aZ.data.SitnGoPlayer = {};
        aZ.data.SitnGoPlayer.cols = 4;
        bJ = a5(localStorage.SitnGoPlayerSortColumn);
        if (bJ < 0 || bJ > 3) {
            bJ = 0
        }
        aZ.data.SitnGoPlayer.sortCol = bJ;
        aZ.data.SitnGoPlayer.sortAscend = localStorage.SitnGoPlayerSortAscend != "false";
        aZ.data.SitnGoPlayer.sortable = true;
        aZ.data.SitnGoPlayer.widths = [0.4, 0.2, 0.2, 0.2];
        aZ.data.SitnGoPlayer.rows = [];
        aZ.data.SitnGoPlayer.rowHeight = 16;
        aZ.data.SitnGoPlayer.headers = [aZ.lang.LobbyColumnTrnyPlayer, aZ.lang.LobbyColumnTrnyTable, aZ.lang.LobbyColumnTrnyChips, aZ.lang.LobbyColumnTrnyRank];
        aZ.data.SitnGoPlayer.fields = ["player", "table", "chips", "rank"];
        aZ.data.SitnGoPlayer.fieldsShow = ["player", "table", "chips", "rank"];
        aZ.data.SitnGoPlayer.fieldsSort = ["player", "table", "chips", "rank"];
        aZ.data.SitnGoPlayer.fieldsNum = [false, true, true, true];
        g.sitnGoPlayerGrid = new bB($("#SitnGoPlayerGrid", g.$dialog),aZ.data.SitnGoPlayer,null ,null ,function() {
                g.sitnGoSaveSort()
            }
        );
        aZ.data.SitnGoWait = {};
        aZ.data.SitnGoWait.cols = 2;
        aZ.data.SitnGoWait.sortCol = -1;
        aZ.data.SitnGoWait.sortAscend = true;
        aZ.data.SitnGoWait.sortable = false;
        aZ.data.SitnGoWait.widths = [0.23, 0.77];
        aZ.data.SitnGoWait.rows = [];
        aZ.data.SitnGoWait.rowHeight = 16;
        aZ.data.SitnGoWait.headers = ["#", aZ.lang.LobbyColumnTrnyWaiting];
        aZ.data.SitnGoWait.fields = ["pos", "player"];
        aZ.data.SitnGoWait.fieldsShow = ["pos", "player"];
        aZ.data.SitnGoWait.fieldsSort = ["pos", "player"];
        aZ.data.SitnGoWait.fieldsNum = [true, false];
        g.sitnGoWaitGrid = new bB($("#SitnGoWaitGrid", g.$dialog),aZ.data.SitnGoWait)
    }
    ;
    bm.prototype.sitnGoStartNowCheck = function() {
        var g = this;
        if (g.sitnGoSelected == aZ.lang.LobbyCaptionNoTournament) {
            return
        }
        bt({
            response: "StartNow",
            Table: g.sitnGoSelected,
            Checked: g.sitnGoStartNow.isChecked() ? "Yes" : "No"
        })
    }
    ;
    bm.prototype.sitnGoUnselect = function() {
        var g = this;
        g.sitnGoSelected = "";
        g.$sitnGoSelected.text(aZ.lang.LobbyCaptionNoTournament);
        aZ.data.SitnGoPlayer.rows.length = 0;
        g.sitnGoPlayerGrid.update();
        aZ.data.SitnGoWait.rows.length = 0;
        g.sitnGoWaitGrid.update();
        g.$sitnGoStartLabel.text("");
        g.sitnGoInfoBtn.show(false);
        g.sitnGoObserveBtn.show(false);
        g.sitnGoRegisterBtn.show(false);
        g.sitnGoStartNow.show(false)
    }
    ;
    bm.prototype.soundCreate = function() {
        var g = this;
        g.soundEffects = new a2($("#SoundEffects"),g,{
            title: aZ.lang.SoundTitle
        });
        g.$soundPercent = $("#SoundPercent");
        g.beepSound = new b($("#BeepSound"),aZ.lang.SoundBeep);
        g.betSound = new b($("#BetSound"),aZ.lang.SoundBet);
        g.cardSound = new b($("#CardSound"),aZ.lang.SoundCard);
        g.checkSound = new b($("#CheckSound"),aZ.lang.SoundCheck);
        g.potSound = new b($("#PotSound"),aZ.lang.SoundPot);
        g.loginSound = new b($("#LoginSound"),aZ.lang.SoundLogin);
        new w($(".ok", g.soundEffects.$dialog),aZ.lang.DialogOK,25,function() {
                g.soundOk()
            }
        );
        new w($(".cancel", g.soundEffects.$dialog),aZ.lang.DialogCancel,25,function() {
                g.soundEffects.close()
            }
        );
        $(".closebtn", g.soundEffects.$dialog).on("touchstart mousedown", function() {
            g.soundEffects.close();
            return false
        });
        g.volumeSlider = new O($("#SoundVolume"),0.01,function(bI) {
                g.soundVolumeChange(bI)
            }
        )
    }
    ;
    bm.prototype.soundOk = function() {
        var g, bI;
        g = this;
        bI = g.volumeSlider.getValue();
        bj("soundVolume", bI);
        f("beep", g.beepSound.isChecked());
        f("bet", g.betSound.isChecked());
        f("card", g.cardSound.isChecked());
        f("card2", g.cardSound.isChecked());
        f("card3", g.cardSound.isChecked());
        f("card4", g.cardSound.isChecked());
        f("check", g.checkSound.isChecked());
        f("pot", g.potSound.isChecked());
        f("login", g.loginSound.isChecked());
        g.soundEffects.close()
    }
    ;
    bm.prototype.soundShow = function() {
        var g = this;
        g.beepSound.setCheck(aZ.audio.beep.enabled);
        g.betSound.setCheck(aZ.audio.bet.enabled);
        g.cardSound.setCheck(aZ.audio.card.enabled);
        g.checkSound.setCheck(aZ.audio.check.enabled);
        g.potSound.setCheck(aZ.audio.pot.enabled);
        g.loginSound.setCheck(aZ.audio.login.enabled);
        g.volumeSlider.setValue(aZ.local.soundVolume, true);
        g.soundEffects.show(true)
    }
    ;
    bm.prototype.soundVolumeChange = function(g) {
        this.$soundPercent.text(aZ.lang.SoundVolume + " " + Math.round(g * 100) + "%")
    }
    ;
    bm.prototype.startTournamentCreate = function() {
        var g = this;
        g.startTournament = new a2($("#StartTournament"),g,{});
        $("#st_label").text(aZ.lang.StartCodeTitle);
        g.startTournamentInput = new aE($("#st_input"),{
            onEnterKey: function() {
                g.startTournamentOk()
            },
            border: true
        });
        new w($(".ok", g.startTournament.$dialog),aZ.lang.DialogOK,25,function() {
                g.startTournamentOk()
            }
        );
        new w($(".cancel", g.startTournament.$dialog),aZ.lang.DialogCancel,25,function() {
                g.startTournament.close()
            }
        );
        $(".closebtn", g.startTournament.$dialog).on("touchstart mousedown", function() {
            g.startTournament.close();
            return false
        })
    }
    ;
    bm.prototype.startTournamentOk = function() {
        var g, bI;
        g = this;
        bI = g.startTournamentInput.getText();
        g.startTournament.close();
        if (bI == "") {
            return
        }
        bt({
            Response: "StartCode",
            Table: g.startTournamentName,
            Code: bI
        })
    }
    ;
    bm.prototype.startTournamentShow = function() {
        var bI, bJ, g;
        bI = this;
        g = bI.lobbyTabs.getTab();
        if (g < 2 || g > 3) {
            bI.messageShow(aZ.lang.MessageTournamentTab);
            return
        }
        bJ = (g == 2) ? bI.tourneySelected : bI.sitnGoSelected;
        if (bJ == "") {
            bI.messageShow(aZ.lang.LobbyCaptionNoTournament);
            return
        }
        bI.startTournamentName = bJ;
        bI.startTournament.show(true);
        bI.startTournament.setTitle(bJ);
        bI.startTournamentInput.setText("");
        if (aZ.hasTouch == false) {
            bI.startTournamentInput.setFocus()
        }
    }
    ;
    bm.prototype.tableSelectCreate = function() {
        var g = this;
        g.tableSelect = new a2($("#TableSelect"),g,{});
        aZ.data.TableSelect = {};
        aZ.data.TableSelect.cols = 1;
        aZ.data.TableSelect.sortCol = -1;
        aZ.data.TableSelect.sortAscend = true;
        aZ.data.TableSelect.sortable = false;
        aZ.data.TableSelect.widths = [1];
        aZ.data.TableSelect.rows = [];
        aZ.data.TableSelect.rowHeight = aZ.mobile ? 24 : 16;
        aZ.data.TableSelect.headers = [aZ.lang.LobbyCaptionSelect];
        aZ.data.TableSelect.fields = ["table"];
        aZ.data.TableSelect.fieldsShow = ["table"];
        aZ.data.TableSelect.fieldsSort = ["table"];
        aZ.data.TableSelect.fieldsNum = [false];
        g.tableSelectGrid = new bB($("#TableSelectGrid"),aZ.data.TableSelect,null ,function() {
                g.tableSelectOk()
            }
        );
        new w($(".ok", g.tableSelect.$dialog),aZ.lang.DialogOK,25,function() {
                g.tableSelectOk()
            }
        );
        new w($(".cancel", g.tableSelect.$dialog),aZ.lang.DialogCancel,25,function() {
                g.tableSelect.close()
            }
        );
        $(".closebtn", g.tableSelect.$dialog).on("touchstart mousedown", function() {
            g.tableSelect.close();
            return false
        })
    }
    ;
    bm.prototype.tableSelectOk = function() {
        var bJ, bI, bK, bL, g;
        bJ = this;
        bI = bJ.tableSelect.name;
        bK = bJ.tableSelect.needpw;
        bJ.tableSelect.close();
        bL = bJ.tableSelectGrid.selrow + 1;
        if (bL <= 0) {
            return
        }
        g = aZ.lang.TableCaptionTable + " " + bL;
        U("OpenTable", bI + " - " + g, "T", bK, 0)
    }
    ;
    bm.prototype.tableSettingsCreate = function() {
        var g = this;
        g.tableSettings = new a2($("#TableSettings"),g,{
            title: aZ.lang.TableSettingsTitle
        });
        g.bringToFront = new b($("#BringToFront"),aZ.lang.TableSettingsFront);
        g.handHelper = new b($("#HandHelper"),aZ.lang.TableSettingsHandHelper);
        g.autoMuck = new b($("#AutoMuck"),aZ.lang.TableSettingsAutoMuck);
        g.fourColorDeck = new b($("#FourColorDeck"),aZ.lang.TableSettingsFourColor);
        g.dealFaceDown = new b($("#DealFaceDown"),aZ.lang.TableSettingsFaceDown);
        g.muteDealer = new b($("#MuteDealer"),aZ.lang.TableSettingsMuteDealer);
        new w($(".ok", g.tableSettings.$dialog),aZ.lang.DialogOK,25,function() {
                g.tableSettingsOk()
            }
        );
        new w($(".cancel", g.tableSettings.$dialog),aZ.lang.DialogCancel,25,function() {
                g.tableSettings.close()
            }
        );
        $(".closebtn", g.tableSettings.$dialog).on("touchstart mousedown", function() {
            g.tableSettings.close();
            return false
        })
    }
    ;
    bm.prototype.tableSettingsOk = function() {
        var g = this;
        bj("bringToFront", g.bringToFront.isChecked());
        bj("handHelper", g.handHelper.isChecked());
        bj("autoMuck", g.autoMuck.isChecked());
        bj("fourColorDeck", g.fourColorDeck.isChecked());
        bj("dealFaceDown", g.dealFaceDown.isChecked());
        bj("muteDealer", g.muteDealer.isChecked());
        g.tableSettings.close();
        aU(aZ.local.fourColorDeck)
    }
    ;
    bm.prototype.tableSettingsShow = function() {
        var g = this;
        g.bringToFront.setCheck(aZ.local.bringToFront);
        g.handHelper.setCheck(aZ.local.handHelper);
        g.autoMuck.setCheck(aZ.local.autoMuck);
        g.fourColorDeck.setCheck(aZ.local.fourColorDeck);
        g.dealFaceDown.setCheck(aZ.local.dealFaceDown);
        g.muteDealer.setCheck(aZ.local.muteDealer);
        g.tableSettings.show(true)
    }
    ;
    bm.prototype.tourneyFilterChange = function(bJ) {
        var bI, bK, g;
        bI = this;
        if (bJ) {
            bj("filterSitnGoActivate", bI.sitnGoFilterCB.isChecked());
            bI.sitnGoFilterBtn.setCaption(aZ.local.filterSitnGoActivate ? aZ.lang.LobbyButtonFilterOn : aZ.lang.LobbyButtonFilterOff);
            bK = "";
            g = bI.sitnGoGrid.selrow;
            if (g >= 0) {
                bK = aZ.data.SitnGo.rows[g].id
            }
            bI.sitnGoFilterData();
            bI.sitnGoSelectID(bK);
            bI.sitnGoGrid.sort();
            bI.sitnGoSelect(bI.sitnGoGrid.selrow);
            bI.sitnGoTabCaption()
        } else {
            bj("filterTourneyActivate", bI.tourneyFilterCB.isChecked());
            bI.tourneyFilterBtn.setCaption(aZ.local.filterTourneyActivate ? aZ.lang.LobbyButtonFilterOn : aZ.lang.LobbyButtonFilterOff);
            bK = "";
            g = bI.tourneyGrid.selrow;
            if (g >= 0) {
                bK = aZ.data.Tourney.rows[g].id
            }
            bI.tourneyFilterData();
            bI.tourneySelectID(bK);
            bI.tourneyGrid.sort();
            bI.tourneySelect(bI.tourneyGrid.selrow);
            bI.tourneyTabCaption()
        }
    }
    ;
    bm.prototype.tourneyFilterCreate = function() {
        var g = this;
        g.tourneyFilter = new a2($("#TourneyFilter"),g,{
            title: aZ.lang.FilterTitleTourney
        });
        $("#tf_game").text(aZ.lang.FilterGame);
        g.tfHoldem = new b($("#tf_holdem"),aZ.lang.FilterHoldem);
        g.tfOmaha = new b($("#tf_omaha"),aZ.lang.FilterOmaha);
        g.tfOmahaHiLo = new b($("#tf_omahahilo"),aZ.lang.FilterOmahaHiLo);
        $("#tf_limit").text(aZ.lang.FilterLimit);
        g.tfNL = new b($("#tf_nl"),aZ.lang.FilterNL);
        g.tfPL = new b($("#tf_pl"),aZ.lang.FilterPL);
        g.tfFixed = new b($("#tf_fixed"),aZ.lang.FilterFixed);
        $("#tf_format").text(aZ.lang.FilterFormat);
        g.tfFreezeout = new b($("#tf_freezeout"),aZ.lang.FilterFreezeout);
        g.tfRebuy = new b($("#tf_rebuy"),aZ.lang.FilterRebuy);
        g.tfShootout = new b($("#tf_shootout"),aZ.lang.FilterShootout);
        $("#tf_buyin").text(aZ.lang.FilterBuyin);
        $("#tf_buyinmincap").text(aZ.lang.FilterMin);
        g.tfBuyinMin = new aE($("#tf_buyinmin"),{
            border: true
        });
        $("#tf_buyinmaxcap").text(aZ.lang.FilterMax);
        g.tfBuyinMax = new aE($("#tf_buyinmax"),{
            border: true
        });
        $("#tf_size").text(aZ.lang.FilterSize);
        $("#tf_sizemincap").text(aZ.lang.FilterMin);
        g.tfSizeMin = new aE($("#tf_sizemin"),{
            border: true
        });
        $("#tf_sizemaxcap").text(aZ.lang.FilterMax);
        g.tfSizeMax = new aE($("#tf_sizemax"),{
            border: true
        });
        g.$tfStarts = $("#tf_starts");
        g.$tfStarts.text(aZ.lang.FilterStarts);
        g.tfTime = new b($("#tf_time"),aZ.lang.FilterTime);
        g.tfOther = new b($("#tf_other"),aZ.lang.FilterOther);
        g.tfHidePrivate = new b($("#tf_hideprivate"),aZ.lang.FilterPrivate);
        g.tfHideRunning = new b($("#tf_hiderunning"),aZ.lang.FilterRunning);
        new w($("#tf_reset", g.tourneyFilter.$dialog),aZ.lang.FilterReset,20,function() {
                g.tourneyFilterReset()
            }
        );
        new w($(".ok", g.tourneyFilter.$dialog),aZ.lang.DialogOK,25,function() {
                g.tourneyFilterOk()
            }
        );
        new w($(".cancel", g.tourneyFilter.$dialog),aZ.lang.DialogCancel,25,function() {
                g.tourneyFilter.close()
            }
        );
        $(".closebtn", g.tourneyFilter.$dialog).on("touchstart mousedown", function() {
            g.tourneyFilter.close();
            return false
        })
    }
    ;
    bm.prototype.tourneyFilterData = function() {
        var bM, g, bL, bJ, bI, bN, bK;
        aZ.data.Tourney.total = aZ.data.Tourney.urows.length;
        if (!aZ.local.filterTourneyActivate) {
            if (!aZ.params.sitAndGoTab) {
                aZ.data.Tourney.rows = aZ.data.Tourney.urows.slice(0)
            } else {
                aZ.data.Tourney.rows.length = 0;
                for (bK = 0; bK < aZ.data.Tourney.urows.length; bK++) {
                    bM = aZ.data.Tourney.urows[bK];
                    if (bM.sng) {
                        aZ.data.Tourney.total--
                    } else {
                        aZ.data.Tourney.rows.push(bM)
                    }
                }
            }
        } else {
            aZ.data.Tourney.rows.length = 0;
            bL = a5(aZ.local.filterTourneyBuyinMin);
            bJ = a5(aZ.local.filterTourneyBuyinMax);
            bI = a5(aZ.local.filterTourneySizeMin);
            bN = a5(aZ.local.filterTourneySizeMax);
            for (bK = 0; bK < aZ.data.Tourney.urows.length; bK++) {
                bM = aZ.data.Tourney.urows[bK];
                if (bM.sng) {
                    aZ.data.Tourney.total--;
                    continue
                }
                g = bM.gameIndex;
                switch (g) {
                    case 0:
                        if (!aZ.local.filterTourneyHoldem || !aZ.local.filterTourneyFixed) {
                            continue
                        }
                        break;
                    case 1:
                        if (!aZ.local.filterTourneyHoldem || !aZ.local.filterTourneyPL) {
                            continue
                        }
                        break;
                    case 2:
                        if (!aZ.local.filterTourneyHoldem || !aZ.local.filterTourneyNL) {
                            continue
                        }
                        break;
                    case 3:
                        if (!aZ.local.filterTourneyOmaha || !aZ.local.filterTourneyFixed) {
                            continue
                        }
                        break;
                    case 4:
                        if (!aZ.local.filterTourneyOmaha || !aZ.local.filterTourneyPL) {
                            continue
                        }
                        break;
                    case 5:
                        if (!aZ.local.filterTourneyOmaha || !aZ.local.filterTourneyNL) {
                            continue
                        }
                        break;
                    case 6:
                        if (!aZ.local.filterTourneyOmahaHiLo || !aZ.local.filterTourneyFixed) {
                            continue
                        }
                        break;
                    case 7:
                        if (!aZ.local.filterTourneyOmahaHiLo || !aZ.local.filterTourneyPL) {
                            continue
                        }
                        break;
                    case 8:
                        if (!aZ.local.filterTourneyOmahaHiLo || !aZ.local.filterTourneyNL) {
                            continue
                        }
                        break
                }
                if (!aZ.local.filterTourneyFreezeout && !bM.rebuy && !bM.shootout) {
                    continue
                }
                if (!aZ.local.filterTourneyRebuy && bM.rebuy) {
                    continue
                }
                if (!aZ.local.filterTourneyShootout && bM.shootout) {
                    continue
                }
                if (bM.buyinTotal < bL) {
                    continue
                }
                if (bJ > 0 && bM.buyinTotal > bJ) {
                    continue
                }
                if (bM.ts < bI) {
                    continue
                }
                if (bN > 0 && bM.ts > bN) {
                    continue
                }
                if (!aZ.local.filterTourneyTime && bM.startTime != "No") {
                    continue
                }
                if (!aZ.local.filterTourneyOther && bM.startTime == "No") {
                    continue
                }
                if (aZ.local.filterTourneyHidePrivate && bM.password != "No") {
                    continue
                }
                if (aZ.local.filterTourneyHideRunning && bM.running == "Yes") {
                    continue
                }
                aZ.data.Tourney.rows.push(bM)
            }
        }
    }
    ;
    bm.prototype.tourneyFilterOk = function() {
        var bI, bJ, g;
        bI = this;
        bJ = bI.tourneyFilterSnG;
        g = bJ ? "SitnGo" : "Tourney";
        bI.tourneyFilter.close();
        bj("filter" + g + "Holdem", bI.tfHoldem.isChecked());
        bj("filter" + g + "Omaha", bI.tfOmaha.isChecked());
        bj("filter" + g + "OmahaHiLo", bI.tfOmahaHiLo.isChecked());
        bj("filter" + g + "NL", bI.tfNL.isChecked());
        bj("filter" + g + "PL", bI.tfPL.isChecked());
        bj("filter" + g + "Fixed", bI.tfFixed.isChecked());
        bj("filter" + g + "Freezeout", bI.tfFreezeout.isChecked());
        bj("filter" + g + "Rebuy", bI.tfRebuy.isChecked());
        bj("filter" + g + "Shootout", bI.tfShootout.isChecked());
        bj("filter" + g + "BuyinMin", bI.tfBuyinMin.getText());
        bj("filter" + g + "BuyinMax", bI.tfBuyinMax.getText());
        bj("filter" + g + "SizeMin", bI.tfSizeMin.getText());
        bj("filter" + g + "SizeMax", bI.tfSizeMax.getText());
        if (!bI.tourneyFilterSnG) {
            bj("filter" + g + "Time", bI.tfTime.isChecked());
            bj("filter" + g + "Other", bI.tfOther.isChecked())
        }
        bj("filter" + g + "HidePrivate", bI.tfHidePrivate.isChecked());
        bj("filter" + g + "HideRunning", bI.tfHideRunning.isChecked());
        if (aZ.local["filter" + g + "Activate"]) {
            bI.tourneyFilterChange(bJ)
        }
    }
    ;
    bm.prototype.tourneyFilterReset = function() {
        var g = this;
        g.tfHoldem.setCheck(true);
        g.tfOmaha.setCheck(true);
        g.tfOmahaHiLo.setCheck(true);
        g.tfNL.setCheck(true);
        g.tfPL.setCheck(true);
        g.tfFixed.setCheck(true);
        g.tfFreezeout.setCheck(true);
        g.tfRebuy.setCheck(true);
        g.tfShootout.setCheck(true);
        g.tfBuyinMin.setText("");
        g.tfBuyinMax.setText("");
        g.tfSizeMin.setText("");
        g.tfSizeMax.setText("");
        g.tfTime.setCheck(true);
        g.tfOther.setCheck(true);
        g.tfHidePrivate.setCheck(false);
        g.tfHideRunning.setCheck(false)
    }
    ;
    bm.prototype.tourneyFilterShow = function(bJ) {
        var bI, g;
        bI = this;
        g = bJ ? "SitnGo" : "Tourney";
        bI.tfHoldem.setCheck(aZ.local["filter" + g + "Holdem"]);
        bI.tfOmaha.setCheck(aZ.local["filter" + g + "Omaha"]);
        bI.tfOmahaHiLo.setCheck(aZ.local["filter" + g + "OmahaHiLo"]);
        bI.tfNL.setCheck(aZ.local["filter" + g + "NL"]);
        bI.tfPL.setCheck(aZ.local["filter" + g + "PL"]);
        bI.tfFixed.setCheck(aZ.local["filter" + g + "Fixed"]);
        bI.tfFreezeout.setCheck(aZ.local["filter" + g + "Freezeout"]);
        bI.tfRebuy.setCheck(aZ.local["filter" + g + "Rebuy"]);
        bI.tfShootout.setCheck(aZ.local["filter" + g + "Shootout"]);
        bI.tfBuyinMin.setText(aZ.local["filter" + g + "BuyinMin"]);
        bI.tfBuyinMax.setText(aZ.local["filter" + g + "BuyinMax"]);
        bI.tfSizeMin.setText(aZ.local["filter" + g + "SizeMin"]);
        bI.tfSizeMax.setText(aZ.local["filter" + g + "SizeMax"]);
        bI.$tfStarts.toggle(!bJ);
        bI.tfTime.show(!bJ);
        bI.tfOther.show(!bJ);
        if (!bJ) {
            bI.tfTime.setCheck(aZ.local["filter" + g + "Time"]);
            bI.tfOther.setCheck(aZ.local["filter" + g + "Other"])
        }
        bI.tfHidePrivate.setCheck(aZ.local["filter" + g + "HidePrivate"]);
        bI.tfHideRunning.setCheck(aZ.local["filter" + g + "HideRunning"]);
        bI.tourneyFilterSnG = bJ;
        bI.tourneyFilter.setTitle(aZ.lang["FilterTitle" + g]);
        bI.tourneyFilter.show(true)
    }
    ;
    bm.prototype.tourneyInfoRequest = function() {
        var g = this;
        if (g.tourneySelected == "") {
            g.messageShow(aZ.lang.LobbyCaptionNoTournament);
            return
        }
        bt({
            Response: "TableInfo",
            Table: g.tourneySelected,
            Type: "T"
        })
    }
    ;
    bm.prototype.tourneyRegister = function() {
        var bK, bJ, g, bL, bM, bI;
        bK = this;
        if (bK.tourneySelected == "") {
            bK.messageShow(aZ.lang.LobbyCaptionNoTournament);
            return
        }
        if (aZ.loggedIn == false) {
            bK.messageShow(aZ.lang.MessageTournamentLogin);
            return
        }
        bM = bK.tourneyRegisterBtn.getCaption();
        bJ = (bM == aZ.lang.LobbyButtonTrnyRegister || bM == aZ.lang.LobbyButtonTrnyRegLate);
        if (bJ) {
            bt({
                Response: "RegisterRequest",
                Table: bK.tourneySelected,
                Type: "T"
            })
        } else {
            g = bK.tourneyGrid.selrow;
            bI = aZ.data.Tourney.rows[g].password;
            bL = (bI == "Yes" || bI == "Yes+");
            U("Unregister", bK.tourneySelected, "T", bL, 0)
        }
    }
    ;
    bm.prototype.tourneyRegCreate = function() {
        var bI, g;
        bI = this;
        g = $(".yesno:eq(0)").clone().appendTo("body");
        bI.tourneyReg = new a2(g,bI,{});
        new w($(".ok", bI.tourneyReg.$dialog),aZ.lang.DialogOK,25,function() {
                bI.tourneyRegOk()
            }
        );
        new w($(".cancel", bI.tourneyReg.$dialog),aZ.lang.DialogCancel,25,function() {
                bI.tourneyReg.close()
            }
        );
        $(".closebtn", bI.tourneyReg.$dialog).on("touchstart mousedown", function() {
            bI.tourneyReg.close();
            return false
        })
    }
    ;
    bm.prototype.tourneyRegOk = function() {
        var g = this;
        g.tourneyReg.close();
        U("Register", g.tourneyReg.tourney, "T", g.tourneyReg.needpw, 0)
    }
    ;
    bm.prototype.tourneyRegShow = function(bJ, bK, bI) {
        var g = this;
        g.tourneyReg.setTitle(bK);
        g.tourneyReg.tourney = bK;
        g.tourneyReg.needpw = bI;
        g.tourneyReg.showMessage(bJ, true)
    }
    ;
    bm.prototype.tourneySaveSort = function() {
        localStorage.TourneySortColumn = aZ.data.Tourney.sortCol;
        localStorage.TourneySortAscend = aZ.data.Tourney.sortAscend;
        localStorage.TourneyPlayerSortColumn = aZ.data.TourneyPlayer.sortCol;
        localStorage.TourneyPlayerSortAscend = aZ.data.TourneyPlayer.sortAscend
    }
    ;
    bm.prototype.tourneySelect = function(g) {
        var bJ, bI, bK;
        bJ = this;
        if (g < 0 || g >= aZ.data.Tourney.rows.length) {
            bJ.tourneyUnselect()
        } else {
            bK = bJ.tourneySelected != aZ.data.Tourney.rows[g].id;
            bJ.tourneySelected = aZ.data.Tourney.rows[g].id;
            bI = aZ.data.Tourney.rows[g].startTime;
            if (bI == "No") {
                bI = ""
            } else {
                bI = aZ.lang.LobbyCaptionStartTime + ":<br>" + bI
            }
            bJ.$tourneyStartLabel.html(bI);
            bJ.tourneyInfoBtn.show(true);
            bJ.tourneyObserveBtn.show(true);
            bJ.tourneyRegisterBtn.show(true);
            if (bK) {
                bt({
                    Response: "GameSelected",
                    Table: bJ.tourneySelected,
                    Type: "T"
                })
            }
        }
    }
    ;
    bm.prototype.tourneySelectID = function(bK) {
        var bI, bJ, g;
        bI = this;
        bI.tourneyGrid.selrow = -1;
        if (bK == "") {
            bI.tourneyUnselect();
            return
        }
        bJ = aZ.data.Tourney.rows.length;
        for (g = 0; g < bJ; g++) {
            if (bK == aZ.data.Tourney.rows[g].id) {
                bI.tourneyGrid.selrow = g;
                break
            }
        }
    }
    ;
    bm.prototype.tourneyTabCaption = function() {
        var g, bI;
        g = this;
        bI = aZ.lang.LobbyCaptionTournaments + ": ";
        if (aZ.local.filterTourneyActivate) {
            bI = bI + aZ.data.Tourney.rows.length + "/"
        }
        bI = bI + aZ.data.Tourney.total;
        g.lobbyTabs.setCaption(2, bI)
    }
    ;
    bm.prototype.tourneyTableOpen = function(bK, bN) {
        var bL, bJ, g, bI, bM, bP, bO, bQ;
        bL = this;
        if (bN < 0) {
            bL.messageShow(aZ.lang.LobbyCaptionNoTournament);
            return
        }
        bQ = bK ? aZ.data.SitnGo.rows : aZ.data.Tourney.rows;
        bJ = bQ[bN].password == "Yes+";
        g = bQ[bN].id;
        bI = bQ[bN].tables;
        if (bI > 1) {
            aZ.data.TableSelect.rows.length = 0;
            for (bM = 1; bM <= bI; bM++) {
                bO = {};
                bO.table = aZ.lang.TableCaptionTable + " " + bM;
                aZ.data.TableSelect.rows.push(bO)
            }
            bL.tableSelect.name = g;
            bL.tableSelect.needpw = bJ;
            bL.tableSelect.setTitle(g);
            bL.tableSelect.show(true);
            bL.tableSelectGrid.selrow = 0;
            bL.tableSelectGrid.toprow = 0;
            bL.tableSelectGrid.resize()
        } else {
            bP = aZ.lang.TableCaptionTable + " 1";
            U("OpenTable", g + " - " + bP, "T", bJ, 0)
        }
    }
    ;
    bm.prototype.tourneyTableSelectedOpen = function() {
        var g = this;
        g.tourneyTableOpen(false, g.tourneyGrid.selrow)
    }
    ;
    bm.prototype.tourneyTabSetup = function() {
        var g, bJ, bI;
        g = this;
        aZ.data.Tourney = {};
        aZ.data.Tourney.cols = 6;
        bJ = a5(localStorage.TourneySortColumn);
        if (bJ < 0 || bJ > 5) {
            bJ = 0
        }
        aZ.data.Tourney.sortCol = bJ;
        aZ.data.Tourney.sortAscend = localStorage.TourneySortAscend != "false";
        aZ.data.Tourney.sortable = true;
        aZ.data.Tourney.widths = [0.26, 0.18, 0.16, 0.06, 0.11, 0.23];
        aZ.data.Tourney.rows = [];
        aZ.data.Tourney.urows = [];
        aZ.data.Tourney.total = 0;
        aZ.data.Tourney.rowHeight = aZ.mobile ? 24 : 16;
        aZ.data.Tourney.headers = [aZ.lang.LobbyColumnTrnyID, aZ.lang.LobbyColumnTrnyGame, aZ.lang.LobbyColumnTrnyBuyIn, aZ.lang.LobbyColumnTrnyTS, aZ.lang.LobbyColumnTrnyReg, aZ.lang.LobbyColumnTrnyStarts];
        aZ.data.Tourney.fields = ["id", "game", "gameIndex", "buyin", "buyinSort", "ts", "reg", "regSort", "tables", "starts", "startMin", "startTime", "password"];
        aZ.data.Tourney.fieldsShow = ["id", "game", "buyin", "ts", "reg", "starts"];
        aZ.data.Tourney.fieldsSort = ["id", "game", "buyinSort", "ts", "regSort", "starts"];
        aZ.data.Tourney.fieldsNum = [false, false, true, true, false, false];
        g.tourneyGrid = new bB($("#TourneyGrid", g.$dialog),aZ.data.Tourney,function(bK) {
                g.tourneySelect(bK)
            }
            ,function(bK) {
                g.tourneyTableOpen(false, bK)
            }
            ,function() {
                g.tourneySaveSort()
            }
        );
        g.$tourneyStartLabel = $("#TourneyStartLabel", g.$dialog);
        g.tourneyFilterCB = new b($("#TourneyFilterCB", g.$dialog),"",function() {
                g.tourneyFilterChange()
            }
        );
        g.tourneyFilterCB.setCheck(aZ.local.filterTourneyActivate);
        bI = aZ.local.filterTourneyActivate ? aZ.lang.LobbyButtonFilterOn : aZ.lang.LobbyButtonFilterOff;
        g.tourneyFilterBtn = new w($("#TourneyFilterBtn", g.$dialog),bI,20,function() {
                g.tourneyFilterShow()
            }
        );
        g.tourneyObserveBtn = new w($("#TourneyObserveBtn", g.$dialog),aZ.lang.LobbyButtonTrnyObserve,30,function() {
                g.tourneyTableSelectedOpen()
            }
        );
        g.tourneyInfoBtn = new w($("#TourneyInfoBtn", g.$dialog),aZ.lang.LobbyButtonTrnyInfo,30,function() {
                g.tourneyInfoRequest()
            }
        );
        g.tourneyRegisterBtn = new w($("#TourneyRegisterBtn", g.$dialog),aZ.lang.LobbyButtonTrnyRegister,30,function() {
                g.tourneyRegister()
            }
        );
        g.tourneyStartNow = new b($("#TourneyStartNow", g.$dialog),aZ.lang.LobbyCaptionStartNow + " *",function() {
                g.tourneyStartNowCheck()
            }
        );
        g.tourneySelected = "";
        g.$tourneySelected = $("#TourneySelected", g.$dialog);
        aZ.data.TourneyPlayer = {};
        aZ.data.TourneyPlayer.cols = 4;
        bJ = a5(localStorage.TourneyPlayerSortColumn);
        if (bJ < 0 || bJ > 3) {
            bJ = 0
        }
        aZ.data.TourneyPlayer.sortCol = bJ;
        aZ.data.TourneyPlayer.sortAscend = localStorage.TourneyPlayerSortAscend != "false";
        aZ.data.TourneyPlayer.sortable = true;
        aZ.data.TourneyPlayer.widths = [0.4, 0.2, 0.2, 0.2];
        aZ.data.TourneyPlayer.rows = [];
        aZ.data.TourneyPlayer.rowHeight = 16;
        aZ.data.TourneyPlayer.headers = [aZ.lang.LobbyColumnTrnyPlayer, aZ.lang.LobbyColumnTrnyTable, aZ.lang.LobbyColumnTrnyChips, aZ.lang.LobbyColumnTrnyRank];
        aZ.data.TourneyPlayer.fields = ["player", "table", "chips", "rank"];
        aZ.data.TourneyPlayer.fieldsShow = ["player", "table", "chips", "rank"];
        aZ.data.TourneyPlayer.fieldsSort = ["player", "table", "chips", "rank"];
        aZ.data.TourneyPlayer.fieldsNum = [false, true, true, true];
        g.tourneyPlayerGrid = new bB($("#TourneyPlayerGrid", g.$dialog),aZ.data.TourneyPlayer,null ,null ,function() {
                g.tourneySaveSort()
            }
        );
        aZ.data.TourneyWait = {};
        aZ.data.TourneyWait.cols = 2;
        aZ.data.TourneyWait.sortCol = -1;
        aZ.data.TourneyWait.sortAscend = true;
        aZ.data.TourneyWait.sortable = false;
        aZ.data.TourneyWait.widths = [0.23, 0.77];
        aZ.data.TourneyWait.rows = [];
        aZ.data.TourneyWait.rowHeight = 16;
        aZ.data.TourneyWait.headers = ["#", aZ.lang.LobbyColumnTrnyWaiting];
        aZ.data.TourneyWait.fields = ["pos", "player"];
        aZ.data.TourneyWait.fieldsShow = ["pos", "player"];
        aZ.data.TourneyWait.fieldsSort = ["pos", "player"];
        aZ.data.TourneyWait.fieldsNum = [true, false];
        g.tourneyWaitGrid = new bB($("#TourneyWaitGrid", g.$dialog),aZ.data.TourneyWait)
    }
    ;
    bm.prototype.tourneyStartNowCheck = function() {
        var g = this;
        if (g.tourneySelected == aZ.lang.LobbyCaptionNoTournament) {
            return
        }
        bt({
            response: "StartNow",
            Table: g.tourneySelected,
            Checked: g.tourneyStartNow.isChecked() ? "Yes" : "No"
        })
    }
    ;
    bm.prototype.tourneyUnselect = function() {
        var g = this;
        g.tourneySelected = "";
        g.$tourneySelected.text(aZ.lang.LobbyCaptionNoTournament);
        aZ.data.TourneyPlayer.rows.length = 0;
        g.tourneyPlayerGrid.update();
        aZ.data.TourneyWait.rows.length = 0;
        g.tourneyWaitGrid.update();
        g.$tourneyStartLabel.text("");
        g.tourneyInfoBtn.show(false);
        g.tourneyObserveBtn.show(false);
        g.tourneyRegisterBtn.show(false);
        g.tourneyStartNow.show(false)
    }
    ;
    bm.prototype.transferConfirmCreate = function() {
        var bI, g;
        bI = this;
        g = $(".yesno:eq(0)").clone().appendTo("body");
        bI.transferConfirm = new a2(g,bI,{
            title: aZ.lang.DialogConfirm
        });
        new w($(".ok", bI.transferConfirm.$dialog),aZ.lang.DialogOK,25,function() {
                bI.transferConfirmOk()
            }
        );
        new w($(".cancel", bI.transferConfirm.$dialog),aZ.lang.DialogCancel,25,function() {
                bI.transferConfirm.close()
            }
        );
        $(".closebtn", bI.transferConfirm.$dialog).on("touchstart mousedown", function() {
            bI.transferConfirm.close();
            return false
        })
    }
    ;
    bm.prototype.transferConfirmOk = function() {
        var g = this;
        g.transferConfirm.close();
        bt({
            Response: "Transfer",
            Action: "Finish",
            Recipient: g.transferConfirm.recipient,
            Amount: g.transferConfirm.amount
        })
    }
    ;
    bm.prototype.transferConfirmShow = function(bK, bJ, g) {
        var bI = this;
        bI.transferConfirm.recipient = bJ;
        bI.transferConfirm.amount = g;
        bI.transferConfirm.showMessage(bK, true)
    }
    ;
    bm.prototype.updateLobbyTitle = function() {
        var bI, g;
        bI = this;
        if (aZ.mobile) {
            g = aM(aZ.siteName);
            if (aZ.loggedIn) {
                g = g + " - " + aZ.lang.TableCaptionLoggedIn.split("%1%").join(aZ.loginData.player)
            }
            bI.$sitePanel.text(g)
        } else {
            if (aZ.loggedIn) {
                g = aZ.lang.LobbyCaptionTitleLogged.split("%1%").join(aZ.loginData.player)
            } else {
                g = aZ.lang.LobbyCaptionTitle
            }
            bI.setCaption(g);
            bI.$sitePanel.text(aZ.siteName)
        }
    }
    ;
    function a9(bS, bJ, bQ, bP, bU, bK, bT, bL, bR) {
        var bV, bM, bO, bI, bN, g;
        bV = this;
        bV.id = bJ;
        aZ.numberTable++;
        bV.number = aZ.numberTable;
        bV.omaha = bP;
        bV.rebuyfee = bU;
        bV.sng = bK;
        bV.player = bT;
        bV.title = bS;
        bV.chatQueue = [];
        bV.infotext = "";
        bV.type = bQ;
        bV.initLocalVariables();
        bV.$dialog = $(".table").clone().removeClass("table").appendTo(aZ.mobile ? aZ.lobby.$openTableBox : "body").css({
            left: bL,
            top: bR
        }).attr("id", bQ + bJ);
        bV.dialog = new a2(bV.$dialog,null ,{
            shadeparent: bV,
            title: bS,
            removeonclose: true,
            minwidth: 356,
            minheight: 313,
            onresize: function() {
                bV.resizeTable()
            }
        });
        bV.modalList.push(bV.dialog);
        bV.$closeBtn = $(".closebtn", bV.$dialog).on("touchstart mousedown", function() {
            bV.closeTable();
            return false
        });
        bV.$content = $(".tablecontent", bV.$dialog).css({
            background: "url('http://192.99.236.77:81/Image?Name=Table&Crc=" + aZ.crc.image + "') no-repeat"
        });
        $(".chatimage", bV.$dialog).attr("src", "http://192.99.236.77:81/Image?Name=Chat&Crc=" + aZ.crc.image).on("dragstart", function(bW) {
            return false
        });
        bV.$chatEdit = $(".tablechatedit", bV.$content);
        bV.chatEdit = new aE(bV.$chatEdit,{
            onEnterKey: function() {
                bV.chatSend()
            }
        });
        bV.$chatText = $(".tablechattext", bV.$content);
        bV.chatText = new bc($(".tablechattext", bV.$content),false);
        bV.$totalPlate = $(".totalplate", bV.$content);
        bV.horzChrome = 6;
        bV.vertChrome = 58;
        bV.createDialogs();
        bV.dialog.show(false);
        if (aZ.mobile) {
            bV.vertChrome = 46;
            bV.$dialog.css({
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                borderRadius: 0,
                boxShadow: "none"
            });
            $(".header", bV.$dialog).hide();
            if (aZ.params.gradients) {
                bM = "url('http://192.99.236.77:81/Image?Name=Grad40')"
            } else {
                bM = "none"
            }
            $(".menu", bV.$dialog).css({
                top: 3,
                height: 40,
                lineHeight: "40px",
                backgroundImage: bM
            });
            $(".infobar", bV.$dialog).css({
                lineHeight: "15px",
                height: 35,
                padding: "5px 0 0 0"
            });
            $(".tablecontent", bV.$dialog).css("top", 43);
            bV.resizeTable()
        } else {
            bO = bV.$dialog.width();
            bI = bV.$dialog.height();
            bN = $(window).width();
            g = $(window).height();
            if (bO > bN) {
                bO = bN;
                bI = ((bO - bV.horzChrome) * 510 / 700) + bV.vertChrome
            }
            if (bI > g) {
                bI = g;
                bO = ((bI - bV.vertChrome) * 700 / 510) + bV.horzChrome
            }
            if (bO != 706 || bI != 568) {
                bV.$dialog.css({
                    width: bO,
                    height: bI
                });
                bV.resizeTable()
            }
        }
    }
    a9.prototype.actionTimer = function(bN, bM, bL, bK, g) {
        var bJ = this;
        if (g == 0 && bJ.getPlayerSeat() == bN) {
            bJ.foldAnyBet.setCheck(false);
            bJ.foldAnyBet.show(false)
        }
        bJ.playerAction[bN] = bL;
        bJ.playerChips[bN] = g;
        bJ.setHint(bN);
        if (bK == 0) {
            bI()
        } else {
            bJ.name[bN].setInfo(bM);
            setTimeout(bI, bK)
        }
        function bI() {
            bL = bJ.playerAction[bN];
            g = bJ.playerChips[bN];
            if (bL == "") {
                bJ.name[bN].setInfo(bl(g))
            } else {
                bJ.name[bN].setInfo(bL)
            }
        }
    }
    ;
    a9.prototype.addRingChipsCreate = function() {
        var bI, g;
        bI = this;
        g = $(".addringchips:eq(0)").clone().appendTo(aZ.mobile ? aZ.lobby.$openTableBox : "body");
        bI.addRingChips = new a2(g,bI,{
            title: bI.id
        });
        $(".arc_addchips", g).text(aZ.lang.ChipsTitle);
        bI.chipsMin = new au($(".arc_buyinmin", g),aZ.lang.ChipsMin,function() {
                bI.chipsInput.setText("")
            }
        );
        bI.chipsMax = new au($(".arc_buyinmax", g),aZ.lang.ChipsMax,function() {
                bI.chipsInput.setText("")
            }
        );
        bI.chipsOther = new au($(".arc_buyinother", g),aZ.lang.ChipsOther);
        bI.chipsInput = new aE($(".arc_otherinput", g),{
            onFocus: function() {
                bI.chipsOther.setCheck()
            },
            border: true
        });
        bI.chipsAuto = new b($(".arc_autorebuy", g),aZ.lang.ChipsAuto);
        new w($(".ok", g),aZ.lang.DialogOK,25,function() {
                bI.addRingChipsOk()
            }
        );
        new w($(".cancel", g),aZ.lang.DialogCancel,25,function() {
                bI.addRingChips.close()
            }
        );
        $(".closebtn", g).on("touchstart mousedown", function() {
            bI.addRingChips.close();
            return false
        })
    }
    ;
    a9.prototype.addRingChipsOk = function() {
        var g, bJ, bI;
        g = this;
        g.addRingChips.close();
        bJ = bn(g.chipsInput.getText());
        if (g.chipsMin.isChecked()) {
            bJ = "Min"
        } else {
            if (g.chipsMax.isChecked()) {
                bJ = "Max"
            } else {
                if (bJ < 0) {
                    g.messageShow(aZ.lang.ChipsInvalid);
                    return
                }
            }
        }
        bI = {
            Response: "AddChips"
        };
        bI.Table = g.id;
        bI.Type = "R";
        bI.Amount = bJ;
        if (g.chipsAuto.isChecked()) {
            bI.AutoRebuy = "Yes"
        } else {
            bI.AutoRebuy = "No"
        }
        bt(bI)
    }
    ;
    a9.prototype.addRingChipsShow = function() {
        var g = this;
        g.chipsMin.setCheck();
        g.addRingChips.show(true)
    }
    ;
    a9.prototype.addTourneyChipsOk = function() {
        var g, bI;
        g = this;
        g.addTourneyChips.close();
        bI = {
            Response: "AddChips"
        };
        bI.Table = g.id;
        bI.Type = g.type;
        bt(bI)
    }
    ;
    a9.prototype.addTourneyChipsCreate = function() {
        var bI, g;
        bI = this;
        g = $(".yesno:eq(0)").clone().appendTo(aZ.mobile ? aZ.lobby.$openTableBox : "body");
        bI.addTourneyChips = new a2(g,bI,{
            title: bI.id
        });
        new w($(".ok", g),aZ.lang.DialogOK,25,function() {
                bI.addTourneyChipsOk()
            }
        );
        new w($(".cancel", g),aZ.lang.DialogCancel,25,function() {
                bI.addTourneyChips.close()
            }
        );
        $(".closebtn", g).on("touchstart mousedown", function() {
            bI.addTourneyChips.close();
            return false
        })
    }
    ;
    a9.prototype.avatarClick = function(bI) {
        var g = this;
        if (aC(bI)) {
            return
        }
        if (g.getPlayerSeat() == bI.data.seatNum) {
            g.ghostCards(true, bI.data.seatNum)
        } else {
            g.seatClick(bI)
        }
    }
    ;
    a9.prototype.betButtonClick = function(bI) {
        var bJ, g;
        bJ = this;
        g = 0;
        switch (bI) {
            case 1:
                g = bJ.betButton1.amount;
                break;
            case 2:
                g = bJ.betButton2.amount;
                break;
            case 3:
                g = bJ.betButton3.amount;
                break;
            case 4:
                g = bJ.betButton4.amount;
                break
        }
        if (g < bJ.minRaiseTo) {
            g = bJ.minRaiseTo
        } else {
            if (g > bJ.maxRaiseTo) {
                g = bJ.maxRaiseTo
            }
        }
        bJ.raiseInput.setText(g);
        bJ.raiseInputChange()
    }
    ;
    a9.prototype.bringToFront = function() {
        var bI, g;
        bI = this;
        if (bI.$dialog.css("z-index") < aZ.zTop) {
            for (g = 0; g < bI.modalList.length; g++) {
                bI.modalList[g].$dialog.css("z-index", ++aZ.zTop)
            }
        }
        at(bI.dialog);
        aZ.tableCurrent = aZ.tables.indexOf(bI);
        if (aZ.mobile) {
            aZ.lobby.prevTableBtn.enable(aZ.tableCurrent > 0);
            aZ.lobby.nextTableBtn.enable(aZ.tableCurrent < aZ.tables.length - 1)
        }
    }
    ;
    a9.prototype.button1Click = function() {
        var g, bI;
        g = this;
        if (aZ.hasTouch == false) {
            g.chatFocus()
        }
        bI = g.button1.command;
        if (bI == "Fold") {
            if (g.button2.command == "Check") {
                g.confirmFold.showMessage(aZ.lang.MessageConfirmFold, true);
                return
            }
            if (g.showOnFold.isVisible() && g.showOnFold.isChecked()) {
                bI = "Fold+"
            }
        }
        g.sendButton(bI, 0);
        g.buttonsOff()
    }
    ;
    a9.prototype.button2Click = function() {
        var g, bI;
        g = this;
        if (aZ.hasTouch == false) {
            g.chatFocus()
        }
        bI = g.button2.command;
        g.sendButton(bI, 0);
        g.buttonsOff()
    }
    ;
    a9.prototype.button3Click = function() {
        var g, bI;
        g = this;
        if (aZ.hasTouch == false) {
            g.chatFocus()
        }
        bI = g.button3.command;
        g.sendButton(bI, g.raiseTo);
        g.buttonsOff()
    }
    ;
    a9.prototype.buttonsOff = function() {
        var g = this;
        g.setCommand(g.button1, "Off", 0);
        g.setCommand(g.button2, "Off", 0);
        g.setCommand(g.button3, "Off", 0);
        g.showOnFold.setCheck(false);
        g.showOnFold.show(false);
        g.timeBankBtn.show(false);
        g.raiseInput.setText("");
        g.$raiseBox.hide();
        g.betButton1.show(false);
        g.betButton2.show(false);
        g.betButton3.show(false);
        g.betButton4.show(false);
        g.queued = false;
        bb()
    }
    ;
    a9.prototype.buyInRingChipsCreate = function() {
        var bI, g;
        bI = this;
        g = $(".buyinringchips:eq(0)").clone().appendTo(aZ.mobile ? aZ.lobby.$openTableBox : "body");
        bI.buyInRingChips = new a2(g,bI,{
            title: aZ.lang.BuyInTitle
        });
        bI.buyInMin = new au($(".brc_buyinmin", g),aZ.lang.BuyInMin,function() {
                bI.buyInInput.setText("")
            }
        );
        bI.buyInMax = new au($(".brc_buyinmax", g),aZ.lang.BuyInMax,function() {
                bI.buyInInput.setText("")
            }
        );
        bI.buyInOther = new au($(".brc_buyinother", g),aZ.lang.BuyInOther);
        bI.buyInInput = new aE($(".brc_otherinput", g),{
            onFocus: function() {
                bI.buyInOther.setCheck()
            },
            border: true
        });
        bI.buyInAuto = new b($(".brc_autorebuy", g),aZ.lang.BuyInAuto);
        new w($(".ok", g),aZ.lang.DialogOK,25,function() {
                bI.buyInRingChipsOk()
            }
        );
        new w($(".cancel", g),aZ.lang.DialogCancel,25,function() {
                bI.buyInRingChipsDecline()
            }
        );
        $(".closebtn", g).on("touchstart mousedown", function() {
            bI.buyInRingChipsDecline();
            return false
        })
    }
    ;
    a9.prototype.buyInRingChipsDecline = function() {
        var g, bI;
        g = this;
        clearInterval(g.interval);
        bI = {
            Response: "RSVP"
        };
        bI.Table = g.id;
        bI.Type = "R";
        bI.BuyIn = 0;
        bt(bI);
        g.buyInRingChips.close()
    }
    ;
    a9.prototype.buyInRingChipsOk = function() {
        var bJ, bI, g, bL, bK;
        bJ = this;
        clearInterval(bJ.interval);
        bI = bJ.buyInRingChips.min;
        g = bJ.buyInRingChips.max;
        bL = bn(bJ.buyInInput.getText());
        if (bJ.buyInMin.isChecked()) {
            bL = bI
        } else {
            if (bJ.buyInMax.isChecked()) {
                bL = g
            } else {
                if (bL < bI) {
                    bJ.messageShow(aZ.lang.BuyInMessageMin.split("%1%").join(bI));
                    return
                } else {
                    if (bL > g) {
                        bJ.messageShow(aZ.lang.BuyInMessageMax.split("%1%").join(g));
                        return
                    }
                }
            }
        }
        bK = {
            Response: "RSVP"
        };
        bK.Table = bJ.id;
        bK.Type = "R";
        bK.BuyIn = bL;
        if (bJ.buyInAuto.isChecked()) {
            bK.AutoRebuy = "Yes"
        } else {
            bK.AutoRebuy = "No"
        }
        bt(bK);
        bJ.buyInRingChips.close()
    }
    ;
    a9.prototype.buyInRingChipsShow = function(g, bL, bM, bJ, bN, bP) {
        var bO, bK;
        bO = this;
        bO.buyInRingChips.min = bL;
        bO.buyInRingChips.max = bM;
        $(".brc_instruct", bO.buyInRingChips.$dialog).text(aZ.lang.BuyInMessage.split("%1%").join(g).split("%2%").join(bO.id));
        $(".brc_seconds", bO.buyInRingChips.$dialog).text(aZ.lang.BuyInSeconds + " " + g);
        $(".brc_balance", bO.buyInRingChips.$dialog).text(aZ.lang.BuyInBalance.split("%1%").join(bl(bN)));
        $(".brc_rathole", bO.buyInRingChips.$dialog).text(aZ.lang.BuyInRathole).toggle(bP);
        bO.buyInMin.setCaption(aZ.lang.BuyInMin + " " + bv(bL));
        bO.buyInMax.setCaption(aZ.lang.BuyInMax + " " + bv(bM));
        bO.buyInInput.setText(bv(bJ));
        bO.buyInOther.setCheck();
        bO.buyInRingChips.show(true);
        bi("beep");
        bK = (new Date()).getTime();
        bO.interval = setInterval(bI, 1000);
        function bI() {
            var bQ = g - Math.round(((new Date()).getTime() - bK) / 1000);
            $(".brc_seconds", bO.buyInRingChips.$dialog).text(aZ.lang.BuyInSeconds + " " + bQ);
            if (bQ <= 0) {
                bO.buyInRingChipsDecline()
            }
        }
    }
    ;
    a9.prototype.cardClick = function(bI) {
        var g = this;
        if (aC(bI)) {
            return
        }
        if (g.getPlayerSeat() == bI.data.seatNum) {
            g.toggleCards(bI.data.seatNum)
        } else {
            g.seatClick(bI)
        }
    }
    ;
    a9.prototype.chatFocus = function() {
        var g = this;
        if (g.chatInfoMove.isChecked()) {
            g.chatInfoEdit.setFocus()
        } else {
            g.chatEdit.setFocus()
        }
    }
    ;
    a9.prototype.chatSend = function() {
        var bI, g, bJ;
        bI = this;
        g = $.trim(bI.chatEdit.getText());
        if (g == "") {
            return
        }
        if (aZ.loggedIn == false) {
            bI.messageShow(aZ.lang.MessageChatLogin);
            return
        }
        if (bI.suspendChat == true) {
            bI.messageShow(aZ.lang.InfoSuspendChat);
            return
        }
        bJ = {
            Response: "Chat"
        };
        bJ.Table = bI.id;
        bJ.Type = bI.type;
        bJ.Text = g;
        bt(bJ);
        bI.chatEdit.setText("")
    }
    ;
    a9.prototype.chatInfoSend = function() {
        var bI, g, bJ;
        bI = this;
        g = $.trim(bI.chatInfoEdit.getText());
        if (g == "") {
            return
        }
        if (aZ.loggedIn == false) {
            bI.messageShow(aZ.lang.MessageChatLogin);
            return
        }
        if (bI.suspendChat == true) {
            bI.messageShow(aZ.lang.InfoSuspendChat);
            return
        }
        if (bI.chatInfoMove.isChecked() == false) {
            bI.chatInfoMove.setCheck(true);
            bI.moveChat()
        }
        bJ = {
            Response: "Chat"
        };
        bJ.Table = bI.id;
        bJ.Type = bI.type;
        bJ.Text = g;
        bt(bJ);
        bI.chatInfoEdit.setText("")
    }
    ;
    a9.prototype.chatUpdate = function() {
        var bO, bI, bN, g, bL, bJ, bM, bK;
        bO = this;
        bI = bO.chatInfoMove.isChecked();
        if (bI) {
            bN = bO.chatInfoText
        } else {
            bN = bO.chatText
        }
        bK = aZ.local.tableChatTime;
        bL = "";
        for (bJ = 0; bJ < bO.chatQueue.length; bJ++) {
            g = bO.chatQueue[bJ];
            bL = bL + "<span>";
            if (bI && bK) {
                bM = "[" + g.time + "] "
            } else {
                bM = ""
            }
            if (g.player != "") {
                bL = bL + "<font color='" + g.color1 + "'>" + bM + g.title + g.player + ":  </font><font color='" + g.color2 + "'>" + g.text + "</font>"
            }
            bL = bL + "</span><br>"
        }
        bN.setText(bL);
        bN.bottomScroll()
    }
    ;
    a9.prototype.clearNextMoves = function() {
        var g = this;
        g.nextMove = "";
        g.nextCommand1 = "";
        g.nextCommand2 = "";
        g.$nextMove.hide();
        g.nextMove1.show(false);
        g.nextMove2.show(false);
        g.nextMove1.setCheck(false);
        g.nextMove2.setCheck(false);
        g.nextMove2.$container.css("top", 360)
    }
    ;
    a9.prototype.closeTable = function() {
        var bI, bJ, g;
        bI = this;
        bI.buttonsOff();
        bJ = {
            Response: "CloseTable"
        };
        bJ.Table = bI.id;
        bJ.Type = bI.type;
        bt(bJ);
        bI.infoClose();

        bI.hideWebcam();

        while (bI.modalList.length > 1) {
            bI.modalList[bI.modalList.length - 1].close()
        }
        g = aZ.tables.indexOf(bI);
        if (g >= 0) {
            aZ.tables.splice(g, 1)
        }
        bI.dialog.close();
        if (aZ.tables.length == 0) {
            aZ.lobby.prevTableBtn.show(false);
            aZ.lobby.$openTableBox.hide();
            aZ.lobby.nextTableBtn.show(false);
            $("#OpenBackground").show()
        }
        aZ.lobby.lobbyTabs.setCaption(4, aZ.lang.LobbyCaptionOpen + ": " + aZ.tables.length);
        if (aZ.tableCurrent >= aZ.tables.length) {
            aZ.tableCurrent = aZ.tables.length - 1
        }
        if (aZ.tables.length > 0) {
            aZ.tables[aZ.tableCurrent].bringToFront()
        }

    }
    ;
    a9.prototype.collectBets = function(bI) {
        var bQ, g, bJ, bP, bO, bM, bK, bL;
        bQ = this;
        bQ.animating++;
        g = bI.Pot;
        bJ = bQ.seats;
        bP;
        bO = "";
        bM = 0;
        bK = 300;
        if (bQ.dialog == aZ.focused && aZ.soundOK) {
            bi("pot")
        }
        for (bL = 1; bL <= bJ; bL++) {
            bP = a5(bI["Seat" + bL]);
            if (bP > 0) {
                bM++;
                bQ.potChips[g] = a5(bQ.potChips[g]) + bP;
                bO = bO + (bL % 10).toString();
                bQ.stackChips(bQ.$bet[bL], bP);
                bQ.$bet[bL].xytrans(0).css({
                    left: bQ.xy("chipX", bL) - bQ.chxOfs,
                    top: bQ.xy("chipY", bL) - bQ.chyOfs
                }).show().redraw();
                bQ.$betLabel[bL].xytrans(0).css({
                    left: bQ.xy("chipX", bL) - bQ.chxOfs,
                    top: bQ.xy("chipY", bL) + bQ.chyOfs
                }).text(bl(bP)).show().redraw();
                bQ.$bet[bL].xytrans(bK).css({
                    left: bQ.potX[g] - bQ.chxOfs,
                    top: bQ.potY[g] - bQ.chyOfs
                });
                bQ.$betLabel[bL].xytrans(bK).css({
                    left: bQ.potX[g] - bQ.chxOfs,
                    top: bQ.potY[g] + bQ.chyOfs
                })
            }
        }
        setTimeout(bN, bK + 25);
        function bN() {
            var bS, bT, bR;
            bS = bI.Pot;
            bT = bQ.potChips[bS];
            bQ.stackChips(bQ.$pot[bS], bT);
            bQ.$potLabel[bS].text(bl(bT)).show();
            for (bR = 1; bR <= bQ.seats; bR++) {
                if (bO.indexOf(bR % 10) >= 0) {
                    bQ.$bet[bR].hide();
                    bQ.$betLabel[bR].hide()
                }
            }
            if (bQ.animating > 0) {
                bQ.animating--
            }
            v(bQ)
        }
    }
    ;
    a9.prototype.confirmFoldCreate = function() {
        var g, bI;
        g = this;
        bI = $(".yesno:eq(0)").clone().appendTo(aZ.mobile ? aZ.lobby.$openTableBox : "body");
        g.confirmFold = new a2(bI,g,{
            title: g.id
        });
        new w($(".ok", bI),aZ.lang.DialogOK,25,function() {
                g.confirmFoldOk()
            }
        );
        new w($(".cancel", bI),aZ.lang.DialogCancel,25,function() {
                g.confirmFold.close()
            }
        );
        $(".closebtn", bI).on("touchstart mousedown", function() {
            g.confirmFold.close();
            return false
        })
    }
    ;
    a9.prototype.confirmFoldOk = function() {
        var g, bI;
        g = this;
        g.confirmFold.close();
        if (g.showOnFold.isVisible() && g.showOnFold.isChecked()) {
            bI = "Fold+"
        } else {
            bI = "Fold"
        }
        g.sendButton(bI, 0);
        g.buttonsOff()
    }
    ;
    a9.prototype.confirmLeave = function(bJ) {
        var bI, g, bK;
        bI = this;
        g = bI.getPlayerSeat();
        if (g == 0) {
            bI.closeTable();
            return
        }
        if (bJ) {
            bI.card1 = 0;
            bI.card2 = 0;
            bI.card3 = 0;
            bI.card4 = 0;
            bI.holeCard1[g] = 0;
            bI.holeCard2[g] = 0;
            bI.holeCard3[g] = 0;
            bI.holeCard4[g] = 0;
            ah(bI.$card1[g], 0);
            ah(bI.$card2[g], 0);
            if (bI.omaha) {
                ah(bI.$card3[g], 0);
                ah(bI.$card4[g], 0)
            }
            bI.buttonsOff();
            bI.clearNextMoves();
            bK = {
                Response: "LeaveSeat"
            };
            bK.Table = bI.id;
            bK.Type = bI.type;
            bt(bK);
            bI.hideWebcam();
            return
        }
        if (bI.type == "R") {
            bI.closeTable()
        } else {
            if( bI.confirmLeaveDlg.showMessage(aZ.lang.MessageConfirmLeave, true)){
                bI.hideWebcam();
            }
        }
    }
    ;
    a9.prototype.confirmLeaveCreate = function() {
        var bI, g;
        bI = this;
        g = $(".yesno:eq(0)").clone().appendTo(aZ.mobile ? aZ.lobby.$openTableBox : "body");
        bI.confirmLeaveDlg = new a2(g,bI,{
            title: bI.id
        });
        new w($(".ok", g),aZ.lang.DialogOK,25,function() {
                bI.closeTable()
            }
        );
        new w($(".cancel", g),aZ.lang.DialogCancel,25,function() {
                bI.confirmLeaveDlg.close()
            }
        );
        $(".closebtn", g).on("touchstart mousedown", function() {
            bI.confirmLeaveDlg.close();
            return false
        })
    }
    ;
    a9.prototype.playVideo = function(p) {
        var g = this;
        var v = $(".video-break", g.$content);

        if(p == 1){
            if(v.attr('src') == undefined || v.attr('src') == '') {
                v.attr('src', './tournament-break.mp4').parent().show();
            }
        }

        console.log('Paylay video ' + p);
        if(p == 0){
            v.stop().attr('src', '').parent().hide();
        }
    };
    a9.prototype.showWebcam = function(p) {
        var bI = this;

        var newWebcam = "#cam" + bI.number + "-" + p;
        console.log(aZ.currentWebcam +"=="+ newWebcam);
	var vidContainer = document.getElementById("cam" + bI.number + "-" + p);

	connection.onstream = function(event){
          var existing = document.getElementById(event.streamid);
          if(existing && existing.parentNode) {
            existing.parentNode.removeChild(existing);
          }
          
          event.mediaElement.removeAttribute('src');
          event.mediaElement.removeAttribute('srcObject');
          event.mediaElement.muted = true;
          event.mediaElement.volume = 0;

	  vidContainer.srcObject = event.stream;

          //try {
          //    video.setAttributeNode(document.createAttribute('autoplay'));
          //    video.setAttributeNode(document.createAttribute('playsinline'));
          //} catch (e) {
          //    video.setAttribute('autoplay', true);
          //    video.setAttribute('playsinline', true);
          //}
          //
          //if(event.type === 'local') {
          //  video.volume = 0;
          //  try {
          //      video.setAttributeNode(document.createAttribute('muted'));
          //  } catch (e) {
          //      video.setAttribute('muted', true);
          //  }
          //}
	};
    };
    a9.prototype.hideWebcam = function() {
        if(aZ.currentWebcam == false) return;
        const video = document.querySelector(aZ.currentWebcam);
        if(video != null && video.srcObject != null)  video.srcObject.getTracks().forEach(track => track.stop());
        aZ.currentWebcam = false;
    };
    a9.prototype.controlsCreate = function() {
        var g = this;
        g.$tablebanner = $(".tablebanner", g.$dialog).css("color", aZ.color.TableTop);
        g.foldAnyBet = new b($(".foldanybet", g.$dialog),aZ.lang.TableCaptionFoldAnyBet,function(bI) {
                g.foldAnyBetClick(bI)
            }
        );
        g.foldAnyBet.show(false);
        g.outNextHand = new b($(".outnexthand", g.$dialog),aZ.lang.TableCaptionAwayHand,function(bI) {
                g.sendSitOut("SitHand", bI)
            }
        );
        g.outNextHand.show(false);
        g.outNextBlind = new b($(".outnextblind", g.$dialog),aZ.lang.TableCaptionAwayBlind,function(bI) {
                g.sendSitOut("SitBlind", bI)
            }
        );

        g.outNextBlind.show(false);
        g.$nextMove = $(".nextmovelabel", g.$content).text(aZ.lang.TableCaptionNextMove).hide();
        g.nextMove1 = new b($(".nextmove1", g.$dialog),aZ.lang.TableCaptionNextCheck,function(bI) {
                g.nextMove1Change(bI)
            }
        );
        g.nextMove1.show(false);
        g.nextMove2 = new b($(".nextmove2", g.$dialog),aZ.lang.TableCaptionNextCheckFold,function(bI) {
                g.nextMove2Change(bI)
            }
        );
        g.nextMove2.show(false);
        g.showOnFold = new b($(".showonfold", g.$dialog),aZ.lang.TableCaptionShowFold);
        g.showOnFold.show(false);
        g.$controlView = $(".controlview", g.$dialog);
        g.$tablemessage = $(".tablemessage", g.$controlView);
        g.$raiseBox = $(".raisebox", g.$controlView).hide().css({
            "background-color": aZ.color.List,
            border: "1px outset " + aZ.color.List
        });
        if (aZ.params.gradients) {
            g.$raiseBox.css("background-image", "url('http://192.99.236.77:81/Image?Name=Grad25')")
        }
        g.raiseInput = new aE($(".raiseinput", g.$raiseBox),{
            onEnterKey: function() {
                g.button3Click()
            },
            onKeyUp: function() {
                g.raiseInputChange()
            }
        });
        g.raiseInput.$input.css("border", "1px solid " + aZ.color.ButtonBorder);
        g.raiseSlider = new O($(".raiseslider", g.$raiseBox),0.01,function(bI) {
                g.raiseSliderChange(bI)
            }
        );
        g.timeBankBtn = new w($(".timebankbtn", g.$controlView),aZ.lang.TableButtonTime,25,function() {
                g.timeBankBtn.show(false);
                g.sendButton("Time", 0)
            }
        );
        g.timeBankBtn.show(false);
        g.button1 = new w($(".commandbtn1", g.$controlView),"",30,function() {
                g.button1Click()
            }
        );
        g.button1.show(false);
        g.button2 = new w($(".commandbtn2", g.$controlView),"",30,function() {
                g.button2Click()
            }
        );
        g.button2.show(false);
        g.button3 = new w($(".commandbtn3", g.$controlView),"",30,function() {
                g.button3Click()
            }
        );
        g.button3.show(false);
        g.betButton1 = new w($(".betbtn1", g.$dialog),"",20,function() {
                g.betButtonClick(1)
            }
        );
        g.betButton1.show(false);
        g.betButton2 = new w($(".betbtn2", g.$dialog),"",20,function() {
                g.betButtonClick(2)
            }
        );
        g.betButton2.show(false);
        g.betButton3 = new w($(".betbtn3", g.$dialog),"",20,function() {
                g.betButtonClick(3)
            }
        );
        g.betButton3.show(false);
        g.betButton4 = new w($(".betbtn4", g.$dialog),"",20,function() {
                g.betButtonClick(4)
            }
        );
        g.betButton4.show(false)
    }
    ;
    a9.prototype.createDialogs = function() {
        var g = this;
        g.addRingChipsCreate();
        g.addTourneyChipsCreate();
        g.buyInRingChipsCreate();
        g.confirmFoldCreate();
        g.confirmLeaveCreate();
        g.controlsCreate();
        g.getPasswordCreate();
        g.infoInit();
        g.initCoordinates();
        g.menuInit();
        g.playerInfoCreate();
        g.rotateSeatsCreate()
    }
    ;
    a9.prototype.dealCards = function(bQ) {
        var bT, bJ, bM, bK, bR, bO, bN;
        bT = this;
        bT.animating++;
        bJ = bT.seats;
        for (bM = 1; bM <= bJ; bM++) {
            bR = 350 - bT.cxOfs;
            bO = 5;
            ah(bT.$card1[bM], 53);
            ah(bT.$card2[bM], 53);
            $(".cardshade", bT.$card1[bM]).hide();
            $(".cardshade", bT.$card2[bM]).hide();
            bT.$card1[bM].xytrans(0).css({
                opacity: 1,
                left: bR,
                top: bO
            }).hide();
            bT.$card2[bM].xytrans(0).css({
                opacity: 1,
                left: bR,
                top: bO
            }).hide();
            if (bT.omaha) {
                ah(bT.$card3[bM], 53);
                ah(bT.$card4[bM], 53);
                $(".cardshade", bT.$card3[bM]).hide();
                $(".cardshade", bT.$card4[bM]).hide();
                bT.$card3[bM].xytrans(0).css({
                    opacity: 1,
                    left: bR,
                    top: bO
                }).hide();
                bT.$card4[bM].xytrans(0).css({
                    opacity: 1,
                    left: bR,
                    top: bO
                }).hide()
            }
        }
        bN = Math.round(150 / (bJ - 1));
        bM = bT.dealer;
        bK = 200;
        if (bT.dialog == aZ.focused && aZ.soundOK) {
            bi("card")
        }
        do {
            bM++;
            if (bM > bJ) {
                bM = 1
            }
            if (bQ.indexOf(bM % 10) < 0) {
                continue
            }
            bR = bT.xy("seatX", bM) - (bT.omaha ? bT.oHole1XOfs : bT.hole1XOfs);
            bO = bT.xy("seatY", bM) - (bT.omaha ? bT.oHole1YOfs : bT.hole1YOfs);
            bK = bK + bN;
            bT.$card1[bM].show().redraw().xytrans(bK).css({
                left: bR,
                top: bO
            })
        } while (bM != bT.dealer);setTimeout(bI, bK + 25);
        function bI() {
            bK = 200;
            bM = bT.dealer;
            if (bT.dialog == aZ.focused && aZ.soundOK) {
                bi("card2")
            }
            do {
                bM++;
                if (bM > bJ) {
                    bM = 1
                }
                if (bQ.indexOf(bM % 10) < 0) {
                    continue
                }
                bR = bT.xy("seatX", bM) - (bT.omaha ? bT.oHole2XOfs : bT.hole2XOfs);
                bO = bT.xy("seatY", bM) - (bT.omaha ? bT.oHole2YOfs : bT.hole2YOfs);
                bK = bK + bN;
                bT.$card2[bM].show().redraw().xytrans(bK).css({
                    left: bR,
                    top: bO
                })
            } while (bM != bT.dealer);if (bT.omaha) {
                setTimeout(bL, bK + 25)
            } else {
                setTimeout(bP, bK + 100)
            }
        }
        function bL() {
            bK = 200;
            bM = bT.dealer;
            if (bT.dialog == aZ.focused && aZ.soundOK) {
                bi("card3")
            }
            do {
                bM++;
                if (bM > bJ) {
                    bM = 1
                }
                if (bQ.indexOf(bM % 10) < 0) {
                    continue
                }
                bR = bT.xy("seatX", bM) - (bT.omaha ? bT.oHole3XOfs : bT.hole3XOfs);
                bO = bT.xy("seatY", bM) - (bT.omaha ? bT.oHole3YOfs : bT.hole3YOfs);
                bK = bK + bN;
                bT.$card3[bM].show().redraw().xytrans(bK).css({
                    left: bR,
                    top: bO
                })
            } while (bM != bT.dealer);setTimeout(bS, bK + 25)
        }
        function bS() {
            bK = 200;
            bM = bT.dealer;
            if (bT.dialog == aZ.focused && aZ.soundOK) {
                bi("card4")
            }
            do {
                bM++;
                if (bM > bJ) {
                    bM = 1
                }
                if (bQ.indexOf(bM % 10) < 0) {
                    continue
                }
                bR = bT.xy("seatX", bM) - (bT.omaha ? bT.oHole4XOfs : bT.hole4XOfs);
                bO = bT.xy("seatY", bM) - (bT.omaha ? bT.oHole4YOfs : bT.hole4YOfs);
                bK = bK + bN;
                bT.$card4[bM].show().redraw().xytrans(bK).css({
                    left: bR,
                    top: bO
                })
            } while (bM != bT.dealer);setTimeout(bP, bK + 100)
        }
        function g() {
            bM = bT.getPlayerSeat();
            if (bM == 0 || bQ.indexOf(bM % 10) < 0) {
                return
            }
            bR = bT.xy("seatX", bM) - (bT.omaha ? bT.oHole1XOfs : bT.hole1XOfs);
            bO = bT.xy("seatY", bM) - (bT.omaha ? bT.oHole1YOfs : bT.hole1YOfs);
            bT.$card1[bM].xytrans(0).css({
                left: bR,
                top: bO
            }).redraw();
            bR = bT.xy("seatX", bM) - (bT.omaha ? bT.oHole2XOfs : bT.hole2XOfs);
            bO = bT.xy("seatY", bM) - (bT.omaha ? bT.oHole2YOfs : bT.hole2YOfs);
            bT.$card2[bM].xytrans(0).css({
                left: bR,
                top: bO
            }).redraw();
            if (bT.omaha) {
                bR = bT.xy("seatX", bM) - (bT.omaha ? bT.oHole3XOfs : bT.hole3XOfs);
                bO = bT.xy("seatY", bM) - (bT.omaha ? bT.oHole3YOfs : bT.hole3YOfs);
                bT.$card3[bM].xytrans(0).css({
                    left: bR,
                    top: bO
                }).redraw();
                bR = bT.xy("seatX", bM) - (bT.omaha ? bT.oHole4XOfs : bT.hole4XOfs);
                bO = bT.xy("seatY", bM) - (bT.omaha ? bT.oHole4YOfs : bT.hole4YOfs);
                bT.$card4[bM].xytrans(0).css({
                    left: bR,
                    top: bO
                }).redraw()
            }
        }
        function bP() {
            g();
            bT.showHoleCards();
            bT.updateHandHelper();
            if (bT.animating > 0) {
                bT.animating--
            }
            v(bT)
        }
    }
    ;
    a9.prototype.dealFlop = function() {
        var bJ, bK, bI;
        bJ = this;
        bJ.animating++;
        bK = 250;
        if (bJ.dialog == aZ.focused && aZ.soundOK) {
            bi("card")
        }
        for (bI = 1; bI <= 3; bI++) {
            ah(bJ.$board[bI], 53);
            $(".cardshade", bJ.$board[bI]).hide();
            bJ.$board[bI].xytrans(0).css({
                left: 350 - bJ.cxOfs,
                top: 5
            }).show().redraw();
            bJ.$board[bI].xytrans(bK).css({
                left: bJ.boardX[bI] - bJ.cxOfs,
                top: bJ.boardY - bJ.cyOfs
            })
        }
        setTimeout(g, bK + 100);
        function g() {
            var bL;
            for (bL = 1; bL <= 3; bL++) {
                bJ.$board[bL].xytrans(0).css({
                    left: bJ.boardX[bL] - bJ.cxOfs,
                    top: bJ.boardY - bJ.cyOfs
                }).redraw();
                ah(bJ.$board[bL], bJ.boardCard[bL])
            }
            bJ.updateHandHelper();
            if (bJ.animating > 0) {
                bJ.animating--
            }
            v(bJ)
        }
    }
    ;
    a9.prototype.dealRiver = function() {
        var bI, bJ;
        bI = this;
        bI.animating++;
        bJ = 250;
        if (bI.dialog == aZ.focused && aZ.soundOK) {
            bi("card")
        }
        ah(bI.$board[5], 53);
        $(".cardshade", bI.$board[5]).hide();
        bI.$board[5].xytrans(0).css({
            left: 350 - bI.cxOfs,
            top: 5
        }).show().redraw();
        bI.$board[5].xytrans(bJ).css({
            left: bI.boardX[5] - bI.cxOfs,
            top: bI.boardY - bI.cyOfs
        });
        setTimeout(g, bJ + 100);
        function g() {
            bI.$board[5].xytrans(0).css({
                left: bI.boardX[5] - bI.cxOfs,
                top: bI.boardY - bI.cyOfs
            }).redraw();
            ah(bI.$board[5], bI.boardCard[5]);
            bI.updateHandHelper();
            if (bI.animating > 0) {
                bI.animating--
            }
            v(bI)
        }
    }
    ;
    a9.prototype.dealTurn = function() {
        var bI, bJ;
        bI = this;
        bI.animating++;
        bJ = 250;
        if (bI.dialog == aZ.focused && aZ.soundOK) {
            bi("card")
        }
        ah(bI.$board[4], 53);
        $(".cardshade", bI.$board[4]).hide();
        bI.$board[4].xytrans(0).css({
            left: 350 - bI.cxOfs,
            top: 5
        }).show().redraw();
        bI.$board[4].xytrans(bJ).css({
            left: bI.boardX[4] - bI.cxOfs,
            top: bI.boardY - bI.cyOfs
        });
        setTimeout(g, bJ + 100);
        function g() {
            bI.$board[4].xytrans(0).css({
                left: bI.boardX[4] - bI.cxOfs,
                top: bI.boardY - bI.cyOfs
            }).redraw();
            ah(bI.$board[4], bI.boardCard[4]);
            bI.updateHandHelper();
            if (bI.animating > 0) {
                bI.animating--
            }
            v(bI)
        }
    }
    ;
    a9.prototype.deckChange = function() {
        var bI, g;
        bI = this;
        for (g = 1; g <= 5; g++) {
            bI.$board[g].css("background-image", "url('" + aZ.deck + "')")
        }
        for (g = 1; g <= bI.seats; g++) {
            bI.$card1[g].css("background-image", "url('" + aZ.deck + "')");
            bI.$card2[g].css("background-image", "url('" + aZ.deck + "')");
            if (bI.omaha) {
                bI.$card3[g].css("background-image", "url('" + aZ.deck + "')");
                bI.$card4[g].css("background-image", "url('" + aZ.deck + "')")
            }
        }
    }
    ;
    a9.prototype.defaultWindowSize = function() {
        var g = this;
        g.$dialog.width(706);
        g.resizeTable()
    }
    ;
    a9.prototype.drawTable = function() {
        var bS, g, bN, bQ, bM, bL, bK, bI, bJ, bR, bP, bO;
        bS = this;
        g = bS.seats;
        if (g == 0) {
            return
        }
        if (bS.graphicsMade == false) {
            bS.makeGraphics()
        }
        bO = false;
        for (bN = 1; bN <= 5; bN++) {
            bQ = a5(bS.boardCard[bN]);
            ah(bS.$board[bN], bQ);
            if (bQ != 0) {
                bS.$board[bN].show()
            }
        }
        for (bN = 1; bN < g; bN++) {
            bQ = a5(bS.potChips[bN]);
            if (bQ > 0) {
                bS.stackChips(bS.$pot[bN], bQ);
                bS.$potLabel[bN].text(bl(bQ)).show()
            } else {
                bS.$pot[bN].hide();
                bS.$potLabel[bN].hide()
            }
        }
        bS.$dealer.hide();
        for (bN = 1; bN <= g; bN++) {
            bS.$avatar[bN].hide();
            bS.$card1[bN].hide();
            bS.$card2[bN].hide();
            if (bS.omaha) {
                bS.$card3[bN].hide();
                bS.$card4[bN].hide()
            }
            bS.name[bN].show(false);
            bS.$bet[bN].hide();
            bS.$betLabel[bN].hide();
            if (bS.dealer == bN) {
                bS.$dealer.css({
                    left: bS.xy("dealerX", bN) - bS.dxOfs,
                    top: bS.xy("dealerY", bN) - bS.dyOfs
                }).show()
            }
            bS.setHint(bN);
            bJ = T(bS.playerName[bN]);
            if (bJ != "") {
                bR = bS.playerAvatar[bN];
                if (bR == 0) {
                    bS.$avatar[bN].css("background", "url('Avatar?Player=" + encodeURIComponent(bS.playerName[bN]) + "&Crc=" + bS.playerAvatarCrc[bN] + "') no-repeat").show()
                } else {
                    bP = ((bR - 1) * -48) + "px 0px";
                    bS.$avatar[bN].css("background", "url('http://192.99.236.77:81/Image?Name=Avatars&Crc=" + aZ.crc.image + "') no-repeat " + bP).show()
                }
                bS.$block[bN].toggle(ag(bJ));
                bM = bS.holeCard1[bN];
                bL = bS.holeCard2[bN];
                bK = bS.holeCard3[bN];
                bI = bS.holeCard4[bN];
                ah(bS.$card1[bN], bM);
                if (bM != 0) {
                    bS.$card1[bN].toggle(bS.$card1[bN].css("opacity") == 1)
                }
                ah(bS.$card2[bN], bL);
                if (bL != 0) {
                    bS.$card2[bN].toggle(bS.$card2[bN].css("opacity") == 1)
                }
                if (bS.omaha) {
                    ah(bS.$card3[bN], bK);
                    if (bK != 0) {
                        bS.$card3[bN].toggle(bS.$card3[bN].css("opacity") == 1)
                    }
                    ah(bS.$card4[bN], bI);
                    if (bI != 0) {
                        bS.$card4[bN].toggle(bS.$card4[bN].css("opacity") == 1)
                    }
                }
                if (bJ == bS.player) {
                    bS.isFaceDown = (bM == 53);
                    bS.updateHandHelper();
                    bO = true
                }
                bS.name[bN].setGlow(bS.turn == bN);
                bS.name[bN].setName(bJ);
                if (bS.playerAction[bN] == "") {
                    bS.name[bN].setInfo(bl(bS.playerChips[bN]))
                } else {
                    bS.name[bN].setInfo(bS.playerAction[bN])
                }
                bS.name[bN].show(true);
                bQ = bS.playerBet[bN];
                if (bQ > 0) {
                    bS.$bet[bN].css({
                        left: bS.xy("chipX", bN) - bS.chxOfs,
                        top: bS.xy("chipY", bN) - bS.chyOfs
                    });
                    bS.stackChips(bS.$bet[bN], bQ);
                    bS.$betLabel[bN].css({
                        left: bS.xy("chipX", bN) - bS.chxOfs,
                        top: bS.xy("chipY", bN) + bS.chyOfs
                    }).text(bl(bQ)).show()
                }
            }
        }
        bS.updateTotal();
        bS.$closeBtn.toggle(!bO)
    }
    ;
    a9.prototype.foldAnyBetClick = function(bI) {
        var g = this;
        if (aZ.hasTouch == false) {
            g.chatFocus()
        }
        if (bI) {
            g.nextMove1.setCheck(false);
            g.nextMove2.setCheck(false);
            g.nextMove = "";
            if (g.button2.command == "Check") {
                g.button2Click()
            } else {
                if (g.button1.command == "Fold") {
                    g.button1Click()
                }
            }
        }
    }
    ;
    a9.prototype.getPasswordCreate = function() {
        var bI, g;
        bI = this;
        g = $(".tablepassword:eq(0)").clone().appendTo(aZ.mobile ? aZ.lobby.$openTableBox : "body");
        bI.getPassword = new a2(g,bI,{
            title: aZ.lang.PasswordTitle
        });
        bI.getPasswordInput = new aE($(".tp_input", g),{
            onEnterKey: function() {
                bI.getPasswordOk()
            },
            border: true
        });
        new w($(".ok", g),aZ.lang.DialogOK,25,function() {
                bI.getPasswordOk()
            }
        );
        new w($(".cancel", g),aZ.lang.DialogCancel,25,function() {
                bI.getPassword.close()
            }
        );
        $(".closebtn", g).on("touchstart mousedown", function() {
            bI.getPassword.close();
            return false
        })
    }
    ;
    a9.prototype.getPasswordOk = function() {
        var bI, g, bK, bJ;
        bI = this;
        bI.getPassword.close();
        g = bI.getPasswordInput.getText();
        bK = bI.getPassword.seat;
        aZ.passwords["R" + bI.id] = g;
        bJ = {
            Response: "RequestSeat"
        };
        bJ.Table = bI.id;
        bJ.Type = "R";
        bJ.Seat = bK;
        bJ.Password = g;
        bt(bJ)
    }

    a9.prototype.getPasswordShow = function(bJ) {
        var bI, g;
        bI = this;
        bI.getPassword.seat = bJ;
        bI.getPassword.show(true);
        g = aZ.lang.PasswordPrompt.split("%1%").join(bI.id);
        $(".tp_label", bI.getPassword.$dialog).text(g);
        bI.getPasswordInput.setText("");
        if (aZ.hasTouch == false) {
            bI.getPasswordInput.setFocus()
        }
    }
    ;
    a9.prototype.getPlayerSeat = function() {
        var bI, g;
        bI = this;
        if (bI.player == "") {
            return 0
        }
        for (g = 1; g <= bI.seats; g++) {
            if (bI.player == bI.playerName[g]) {
                return g
            }
        }
        return 0
    }
    ;
    a9.prototype.getRebuy = function() {
        var g = this, bI;
        if (g.getPlayerSeat() == 0) {
            g.messageShow(aZ.lang.MessageNotSeated);
            return
        }
        if (g.type == "R") {
            g.addRingChipsShow()
        } else {
            bI = aZ.lang.ChipsRebuy.split("%1%").join(bv(g.rebuyfee));
            g.addTourneyChips.showMessage(bI, true)
        }
    }
    ;
    a9.prototype.ghostCards = function(g, bJ) {
        var bI = this;
        if (bI.getPlayerSeat() != bJ || bI.$card1[bJ].css("opacity") == 1) {
            return
        }
        bI.$card1[bJ].toggle(g);
        bI.$card2[bJ].toggle(g);
        if (bI.omaha) {
            bI.$card3[bJ].toggle(g);
            bI.$card4[bJ].toggle(g)
        }
    }
    ;
    a9.prototype.guiChange = function() {
        var bI, g;
        bI = this;
        bI.infoClose();
        while (bI.modalList.length > 1) {
            bI.modalList[bI.modalList.length - 1].close()
        }
        if (aZ.mobile) {
            bI.vertChrome = 46;
            bI.$dialog.appendTo(aZ.lobby.$openTableBox).css({
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                borderRadius: 0,
                boxShadow: "none"
            });
            $(".header", bI.$dialog).hide();
            if (aZ.params.gradients) {
                g = "url('http://192.99.236.77:81/Image?Name=Grad40')"
            } else {
                g = "none"
            }
            $(".menu", bI.$dialog).css({
                top: 3,
                height: 40,
                lineHeight: "40px",
                backgroundImage: g
            });
            $(".infobar", bI.$dialog).css({
                lineHeight: "15px",
                height: 35,
                padding: "5px 0 0 0"
            });
            $(".tablecontent", bI.$dialog).css("top", 43)
        } else {
            bI.vertChrome = 58;
            bI.$dialog.appendTo("body").css({
                left: aZ.winOfsX,
                top: aZ.winOfsY,
                width: 706,
                height: 568,
                borderRadius: "10px 10px 0px 0px",
                boxShadow: "3px 3px 10px 0px #404040"
            });
            aG();
            $(".header", bI.$dialog).show();
            if (aZ.params.gradients) {
                g = "url('http://192.99.236.77:81/Image?Name=Grad25')"
            } else {
                g = "none"
            }
            $(".menu", bI.$dialog).css({
                top: 30,
                height: 25,
                lineHeight: "25px",
                backgroundImage: g
            });
            $(".infobar", bI.$dialog).css({
                lineHeight: "25px",
                height: 25,
                padding: 0
            });
            $(".tablecontent", bI.$dialog).css("top", 55)
        }
        bI.setTitle(bk(bI.id, bI.type, bI.sng));
        bI.headerCaption(bI.infotext);
        bI.menuDWS.show(!aZ.mobile);
        $(".resize", bI.$dialog).toggle(!aZ.mobile);
        bI.resizeTable();
        bI.bringToFront();
        bI.addRingChips.$dialog.appendTo(aZ.mobile ? aZ.lobby.$openTableBox : "body");
        bI.addTourneyChips.$dialog.appendTo(aZ.mobile ? aZ.lobby.$openTableBox : "body");
        bI.buyInRingChips.$dialog.appendTo(aZ.mobile ? aZ.lobby.$openTableBox : "body");
        bI.confirmFold.$dialog.appendTo(aZ.mobile ? aZ.lobby.$openTableBox : "body");
        bI.confirmLeaveDlg.$dialog.appendTo(aZ.mobile ? aZ.lobby.$openTableBox : "body");
        bI.getPassword.$dialog.appendTo(aZ.mobile ? aZ.lobby.$openTableBox : "body");
        bI.infoDialog.$dialog.appendTo(aZ.mobile ? aZ.lobby.$openTableBox : "body");
        bI.playerInfo.$dialog.appendTo(aZ.mobile ? aZ.lobby.$openTableBox : "body");
        bI.rotateDialog.$dialog.appendTo(aZ.mobile ? aZ.lobby.$openTableBox : "body")
    }
    ;
    a9.prototype.headerCaption = function(g) {
        var bI = this;
        bI.infotext = g;
        if (aZ.mobile) {
            g = "<b>" + aM(bI.title) + "</b><br>" + g
        }
        $(".infobar", bI.$dialog).html(g)
    }
    ;
    a9.prototype.historyAdd = function(bN, bK) {
        var bJ, bI, bL, bM, g;
        bJ = this;
        bI = bJ.hhNumbers.length;
        g = bJ.historySlider.getValue();
        bM = g * (bI - 1);
        if (bI <= 1 || g == 1) {
            bJ.historyInfo.addTextLine(bK, 0)
        }
        if (bI > 0 && bJ.hhNumbers[bI - 1] == bN) {
            bJ.hhData[bI - 1] += bK + "<br>"
        } else {
            bJ.hhNumbers[bI] = bN;
            bJ.hhData[bI] = bK + "<br>";
            bL = bJ.hhNumbers.length - 1;
            if (bL == 0) {
                bL = 1
            }
            bJ.historySlider.increment = 1 / bL;
            if (g < 1) {
                if (bM < 0 || bI < 1) {
                    g = 0
                } else {
                    g = bM / bI
                }
                bJ.historySlider.setValue(g, false)
            }
            bJ.historyChange(g)
        }
    }
    ;
    a9.prototype.historyChange = function(bJ) {
        var bI, bK, g;
        bI = this;
        if (bI.hhNumbers.length == 0) {
            return
        }
        bI.historyLabel(bJ);
        bK = bI.hhNumbers.length;
        g = Math.round(bJ * (bK - 1));
        bI.historyInfo.setText(bI.hhData[g]);
        bI.historyInfo.topScroll()
    }
    ;
    a9.prototype.historyFirst = function() {
        this.historySlider.setValue(0, true)
    }
    ;
    a9.prototype.historyLabel = function(bK) {
        var bJ, bL, bI, g;
        bJ = this;
        if (bJ.hhNumbers.length == 0) {
            return
        }
        bL = bJ.hhNumbers.length;
        bI = Math.round(bK * (bL - 1));
        g = bI + 1;
        bJ.$historyNumber.text(bJ.hhNumbers[bI] + "  (" + aZ.lang.InfoHistoryOf.split("%1%").join(g).split("%2%").join(bL) + ")")
    }
    ;
    a9.prototype.historyLast = function() {
        this.historySlider.setValue(1, true)
    }
    ;
    a9.prototype.historyNext = function() {
        var bI, g;
        bI = this;
        g = bI.historySlider.getValue() + bI.historySlider.increment;
        if (g > 1) {
            g = 1
        }
        bI.historySlider.setValue(g, true)
    }
    ;
    a9.prototype.historyPrevious = function() {
        var bI, g;
        bI = this;
        g = bI.historySlider.getValue() - bI.historySlider.increment;
        if (g < 0) {
            g = 0
        }
        bI.historySlider.setValue(g, true)
    }
    ;
    a9.prototype.infoClose = function() {
        var g = this;
        if (g.chatInfoMove.isChecked()) {
            g.chatInfoMove.setCheck(false);
            g.moveChat()
        }
        g.infoDialog.close()
    }
    ;
    a9.prototype.infoInit = function() {
        var bK, bI, g, bJ;
        bK = this;
        bI = $(".tableinfo").clone().removeClass("tableinfo").appendTo(aZ.mobile ? aZ.lobby.$openTableBox : "body");
        bK.infoDialog = new a2(bI,bK,{
            title: aZ.lang.InfoTitle + " - " + bK.id,
            minwidth: 300,
            minheight: 250,
            onresize: function() {
                bK.resizeInfo()
            }
        });
        $(".infopanel", bI).css("background-color", aZ.color.List);
        bK.generalInfo = new bc($(".generalinfo", bI),false);
        bK.statsInfo = new bc($(".statsinfo", bI),false);
        bK.$historyNumber = $(".historynumber", bI);
        bK.historySlider = new O($(".historyslider", bI),1,function(bL) {
                bK.historyChange(bL)
            }
        );
        bK.historySlider.setValue(1, false);
        bK.historyInfo = new bc($(".historyinfo", bI),false);
        bK.chatInfoText = new bc($(".chatinfotext", bI),false);
        bK.chatInfoMove = new b($(".chatinfomove", bI),aZ.lang.InfoMoveChat,function() {
                bK.moveChat()
            }
        );
        new w($(".historyfirstbtn", bI),"|" + aZ.arrowL,30,function() {
                bK.historyFirst()
            }
        );
        new w($(".historyprevbtn", bI),aZ.arrowL,30,function() {
                bK.historyPrevious()
            }
        );
        new w($(".historynextbtn", bI),aZ.arrowR,30,function() {
                bK.historyNext()
            }
        );
        new w($(".historylastbtn", bI),aZ.arrowR + "|",30,function() {
                bK.historyLast()
            }
        );
        new w($(".ok", bI),aZ.lang.DialogOK,25,function() {
                bK.infoClose()
            }
        );
        new w($(".save", bI),aZ.lang.DialogSave,25,function() {
                bK.infoSave()
            }
        );
        bK.chatInfoEdit = new aE($(".chatinfoedit", bI),{
            onEnterKey: function() {
                bK.chatInfoSend()
            }
        });
        $(".closebtn", bI).on("touchstart mousedown", function() {
            bK.infoClose();
            return false
        });
        g = [aZ.lang.InfoGeneral, aZ.lang.InfoStats, aZ.lang.InfoHistory, aZ.lang.InfoChat];
        bJ = [true, true, true, true];
        bK.infoTabs = new aI($(".infotabs", bI),g,bJ,function(bL) {
                bK.selectInfoTab(bL)
            }
        )
    }
    ;
    a9.prototype.infoSave = function() {
        var bJ, bI, g, bK;
        bJ = this;
        switch (bJ.infoTabs.getTab()) {
            case 0:
                aO(bJ.title, bJ.generalInfo.getText(), false);
                break;
            case 1:
                aO(bJ.title, bJ.statsInfo.getText(), false);
                break;
            case 2:
                bI = "";
                for (g = 0; g < bJ.hhData.length; g++) {
                    bI = bI + bJ.hhData[g] + "<br><br>"
                }
                aO(bJ.title, bI, false);
                break;
            case 3:
                bK = bJ.chatInfoText.$memotext.clone();
                $("span", bK).each(function() {
                    $(this).replaceWith($(this).text())
                });
                $("font", bK).each(function() {
                    $(this).replaceWith($(this).text())
                });
                bI = Y(bK.html());
                aO(bJ.title, bI, false);
                break
        }
    }
    ;
    a9.prototype.initCoordinates = function() {
        var g = this;
        g.axOfs = 24;
        g.ayOfs = 24;
        g.boardX = [0, 252, 301, 350, 399, 448];
        g.boardY = 193;
        g.chipX = [];
        g.chipX[2] = [0, 549, 150];
        g.chipX[3] = [0, 515, 339, 179];
        g.chipX[4] = [0, 459, 454, 245, 240];
        g.chipX[5] = [0, 437, 549, 339, 150, 262];
        g.chipX[6] = [0, 459, 549, 454, 245, 150, 240];
        g.chipX[7] = [0, 462, 515, 488, 339, 203, 179, 301];
        g.chipX[8] = [0, 462, 515, 488, 393, 306, 203, 179, 301];
        g.chipX[9] = [0, 462, 515, 549, 488, 339, 211, 150, 179, 301];
        g.chipX[10] = [0, 462, 515, 549, 488, 393, 306, 203, 150, 179, 301];
        g.chipY = [];
        g.chipY[2] = [0, 192, 192];
        g.chipY[3] = [0, 130, 290, 130];
        g.chipY[4] = [0, 103, 264, 264, 103];
        g.chipY[5] = [0, 97, 192, 290, 192, 97];
        g.chipY[6] = [0, 103, 192, 264, 264, 192, 103];
        g.chipY[7] = [0, 96, 130, 247, 290, 260, 130, 96];
        g.chipY[8] = [0, 96, 130, 247, 285, 285, 260, 130, 96];
        g.chipY[9] = [0, 96, 130, 192, 261, 290, 261, 192, 130, 96];
        g.chipY[10] = [0, 96, 130, 192, 247, 285, 285, 260, 192, 130, 96];
        g.chxOfs = 11;
        g.chyOfs = 9;
        g.cxOfs = 23;
        g.cyOfs = 32;
        g.dealerX = [];
        g.dealerX[2] = [0, 581, 118];
        g.dealerX[3] = [0, 548, 368, 151];
        g.dealerX[4] = [0, 497, 507, 192, 202];
        g.dealerX[5] = [0, 475, 581, 368, 118, 224];
        g.dealerX[6] = [0, 497, 581, 507, 192, 118, 202];
        g.dealerX[7] = [0, 426, 548, 540, 368, 159, 151, 273];
        g.dealerX[8] = [0, 426, 548, 540, 423, 276, 159, 151, 273];
        g.dealerX[9] = [0, 426, 548, 581, 517, 368, 182, 118, 151, 273];
        g.dealerX[10] = [0, 426, 548, 581, 540, 423, 276, 159, 118, 151, 273];
        g.dealerY = [];
        g.dealerY[2] = [0, 226, 226];
        g.dealerY[3] = [0, 128, 293, 128];
        g.dealerY[4] = [0, 103, 264, 264, 103];
        g.dealerY[5] = [0, 97, 226, 293, 226, 97];
        g.dealerY[6] = [0, 103, 226, 264, 264, 226, 103];
        g.dealerY[7] = [0, 85, 128, 247, 293, 260, 128, 85];
        g.dealerY[8] = [0, 85, 128, 247, 285, 285, 260, 128, 85];
        g.dealerY[9] = [0, 85, 128, 226, 261, 293, 269, 226, 128, 85];
        g.dealerY[10] = [0, 85, 128, 226, 247, 285, 285, 260, 226, 128, 85];
        g.dxOfs = 11;
        g.dyOfs = 9;
        g.hole1XOfs = 30;
        g.hole1YOfs = 34;
        g.hole2XOfs = 16;
        g.hole2YOfs = 31;
        g.nameX = [];
        g.nameX[2] = [0, 650, 50];
        g.nameX[3] = [0, 653, 349, 47];
        g.nameX[4] = [0, 591, 511, 188, 108];
        g.nameX[5] = [0, 572, 650, 349, 50, 127];
        g.nameX[6] = [0, 591, 650, 511, 188, 50, 108];
        g.nameX[7] = [0, 526, 653, 553, 349, 146, 47, 178];
        g.nameX[8] = [0, 526, 653, 553, 423, 277, 146, 47, 178];
        g.nameX[9] = [0, 526, 653, 650, 523, 349, 176, 50, 47, 178];
        g.nameX[10] = [0, 526, 653, 650, 553, 423, 277, 146, 50, 47, 173];
        g.nameY = [];
        g.nameY[2] = [0, 246, 246];
        g.nameY[3] = [0, 80, 404, 80];
        g.nameY[4] = [0, 57, 378, 378, 57];
        g.nameY[5] = [0, 52, 246, 404, 246, 52];
        g.nameY[6] = [0, 57, 246, 378, 378, 246, 57];
        g.nameY[7] = [0, 22, 80, 362, 404, 362, 80, 22];
        g.nameY[8] = [0, 22, 80, 362, 399, 399, 362, 80, 22];
        g.nameY[9] = [0, 22, 80, 246, 375, 404, 375, 246, 80, 22];
        g.nameY[10] = [0, 22, 80, 246, 362, 398, 398, 362, 246, 80, 22];
        g.nxOfs = 45;
        g.nyOfs = 17;
        g.oHole1XOfs = 44;
        g.oHole1YOfs = 37;
        g.oHole2XOfs = 30;
        g.oHole2YOfs = 34;
        g.oHole3XOfs = 16;
        g.oHole3YOfs = 31;
        g.oHole4XOfs = 2;
        g.oHole4YOfs = 28;
        g.potX = [0, 350, 318, 372, 265, 425, 297, 403, 244, 456];
        g.potY = [0, 134, 245, 245, 245, 245, 134, 134, 134, 134];
        g.seatX = [];
        g.seatX[2] = [0, 645, 55];
        g.seatX[3] = [0, 568, 349, 133];
        g.seatX[4] = [0, 510, 511, 188, 189];
        g.seatX[5] = [0, 491, 645, 349, 54, 208];
        g.seatX[6] = [0, 510, 645, 511, 188, 54, 189];
        g.seatX[7] = [0, 438, 568, 553, 349, 146, 133, 259];
        g.seatX[8] = [0, 438, 568, 553, 422, 277, 146, 133, 259];
        g.seatX[9] = [0, 438, 568, 645, 523, 349, 176, 55, 133, 259];
        g.seatX[10] = [0, 438, 568, 645, 553, 422, 277, 146, 55, 133, 259];
        g.seatY = [];
        g.seatY[2] = [0, 192, 192];
        g.seatY[3] = [0, 82, 350, 82];
        g.seatY[4] = [0, 57, 324, 324, 57];
        g.seatY[5] = [0, 52, 192, 350, 192, 52];
        g.seatY[6] = [0, 57, 192, 324, 324, 192, 57];
        g.seatY[7] = [0, 41, 82, 308, 350, 308, 82, 41];
        g.seatY[8] = [0, 41, 82, 308, 345, 345, 308, 82, 41];
        g.seatY[9] = [0, 41, 82, 192, 321, 350, 321, 192, 82, 41];
        g.seatY[10] = [0, 41, 82, 192, 308, 344, 344, 308, 192, 82, 41];
        g.sxOfs = 32;
        g.syOfs = 32
    }
    ;
    a9.prototype.initLocalVariables = function() {
        var g = this;
        g.animating = 0;
        g.boardCard = [];
        g.card1 = 0;
        g.card2 = 0;
        g.card3 = 0;
        g.card4 = 0;
        g.dealer = 1;
        g.graphicsMade = false;
        g.handHelper = "";
        g.hhData = [];
        g.hhNumbers = [];
        g.holeCard1 = [];
        g.holeCard2 = [];
        g.holeCard3 = [];
        g.holeCard4 = [];
        g.isFaceDown = false;
        g.maxRaiseTo = 0;
        g.minRaiseTo = 0;
        g.modalList = [];
        g.name = [];
        g.nextCommand1 = "";
        g.nextCommand2 = "";
        g.nextMove = "";
        g.packetQueue = [];
        g.password = false;
        g.playerAction = [];
        g.playerAvatar = [];
        g.playerAvatarCrc = [];
        g.playerBet = [];
        g.playerChips = [];
        g.playerCustom = [];
        g.playerGender = [];
        g.playerLevel = [];
        g.playerLocation = [];
        g.playerName = [];
        g.playerRealName = [];
        g.playerAway = [];
        g.playerTime = [];
        g.playerTitle = [];
        g.potChips = [];
        g.queued = false;
        g.raiseInc = 0;
        g.raiseMultiple = 1;
        g.raiseTo = 0;
        g.rotate = 0;
        g.seats = 0;
        g.suspendChat = false;
        g.totalPot = "";
        g.turn = 0;
        g.$avatar = [];
        g.$bet = [];
        g.$betLabel = [];
        g.$block = [];
        g.$board = [];
        g.$card1 = [];
        g.$card2 = [];
        g.$card3 = [];
        g.$card4 = [];
        g.$dealer = null ;
        g.$pot = [];
        g.$potLabel = [];
        g.$seat = []
    }
    ;
    a9.prototype.makeGraphics = function() {
        var bJ, bI, g, bL, bK, top, left;
        bJ = this;
        for (bI = 1; bI <= 5; bI++) {
            g = bJ.boardX[bI] - bJ.cxOfs;
            bL = bJ.boardY - bJ.cyOfs;
            bJ.$board[bI] = $("<div>").addClass("card").css({
                left: g,
                top: bL,
                "background-image": "url('" + aZ.deck + "')"
            }).appendTo(bJ.$content);
            bJ.$board[bI].on("touchstart mousedown", function(bM) {
                bJ.toggleBoard();
                bM.preventDefault()
            });
            $("<div>").addClass("cardshade").appendTo(bJ.$board[bI])
        }
        bK = bJ.seats;
        for (bI = 1; bI <= bK; bI++) {
            bJ.name[bI] = new ak(bJ,bJ.xy("nameX", bI) - bJ.nxOfs,bJ.xy("nameY", bI) - bJ.nyOfs,bI);
            g = bJ.xy("seatX", bI);
            bL = bJ.xy("seatY", bI);
            //
            // bJ.$seat[bI] = $("<div>").addClass("seat").css({
            //     left: g - bJ.sxOfs,
            //     top: bL - bJ.syOfs,
            //     background: "url('http://192.99.236.77:81/Image?Name=Seat&Crc=" + aZ.crc.image + "')"
            // }).appendTo(bJ.$content);

            bJ.$seat[bI] = $("<div>").addClass("seat").css({
                left: g - bJ.sxOfs,
                top: bL - bJ.syOfs,
                background: "url('http://192.99.236.77:81/Image?Name=Seat&Crc=" + aZ.crc.image + "')"
            }).appendTo(bJ.$content);

            bJ.$seat[bI].on("touchstart mousedown", {
                seatNum: bI
            }, function(bM) {
                if (bo(bM) || aC(bM)) {
                    return
                }
                bJ.seatClick(bM);
                bM.preventDefault()
            });

            left = g - bJ.sxOfs;
            top = bL - bJ.syOfs;

            if(top <= 9){
                left = g - bJ.sxOfs + 65;
                top = bL - bJ.syOfs + 28;
            }
            else if(top <= 50 & left >= 536 ){
                left = g - bJ.sxOfs + 65;
                top = bL - bJ.syOfs + 42;
            }
            else if(left >= 613){
                left = g - bJ.sxOfs - 70;
                top = bL - bJ.syOfs;
            }
            else{
                left = g - bJ.sxOfs + 65;
                top = bL - bJ.syOfs  - 4;
            }

            bJ.$seat[bI] = $("<div>").addClass("cam").css({
                left: left,
                top: top,
                background: "url('"+ window.parent.location.href +"cam3.png')"
            }).append('<video id="cam' + bJ.number + "-" + bI +'" class="video" autoplay="true" ></video>')
                .appendTo(bJ.$content);


            bJ.$avatar[bI] = $("<div>").addClass("avatar").css({
                left: g - bJ.axOfs,
                top: bL - bJ.ayOfs
            }).appendTo(bJ.$content);
            bJ.$avatar[bI].on("touchstart mousedown", {
                seatNum: bI
            }, function(bM) {
                bJ.avatarClick(bM);
                return false
            }).on("mouseover", {
                seatNum: bI
            }, function(bM) {
                bJ.ghostCards(true, bM.data.seatNum);
                return false
            }).on("touchend", {
                seatNum: bI
            }, function(bM) {
                bJ.ghostCards(false, bM.data.seatNum);
                return false
            });
            bJ.$block[bI] = $("<div>").addClass("block").css({
                top: 0,
                right: 0
            }).appendTo(bJ.$avatar[bI]);
            if (bJ.omaha) {
                bJ.$card1[bI] = $("<div>").addClass("card").css({
                    left: g - bJ.oHole1XOfs,
                    top: bL - bJ.oHole1YOfs,
                    "background-image": "url('" + aZ.deck + "')"
                }).appendTo(bJ.$content);
                bJ.$card1[bI].on("touchstart mousedown", {
                    seatNum: bI
                }, function(bM) {
                    bJ.cardClick(bM);
                    return false
                }).on("mouseout", {
                    seatNum: bI
                }, function(bM) {
                    bJ.ghostCards(false, bM.data.seatNum)
                });
                bJ.$card2[bI] = $("<div>").addClass("card").css({
                    left: g - bJ.oHole2XOfs,
                    top: bL - bJ.oHole2YOfs,
                    "background-image": "url('" + aZ.deck + "')"
                }).appendTo(bJ.$content);
                bJ.$card2[bI].on("touchstart mousedown", {
                    seatNum: bI
                }, function(bM) {
                    bJ.cardClick(bM);
                    return false
                }).on("mouseout", {
                    seatNum: bI
                }, function(bM) {
                    bJ.ghostCards(false, bM.data.seatNum)
                });
                bJ.$card3[bI] = $("<div>").addClass("card").css({
                    left: g - bJ.oHole3XOfs,
                    top: bL - bJ.oHole3YOfs,
                    "background-image": "url('" + aZ.deck + "')"
                }).appendTo(bJ.$content);
                bJ.$card3[bI].on("touchstart mousedown", {
                    seatNum: bI
                }, function(bM) {
                    bJ.cardClick(bM);
                    return false
                }).on("mouseout", {
                    seatNum: bI
                }, function(bM) {
                    bJ.ghostCards(false, bM.data.seatNum)
                });
                bJ.$card4[bI] = $("<div>").addClass("card").css({
                    left: g - bJ.oHole4XOfs,
                    top: bL - bJ.oHole4YOfs,
                    "background-image": "url('" + aZ.deck + "')"
                }).appendTo(bJ.$content);
                bJ.$card4[bI].on("touchstart mousedown", {
                    seatNum: bI
                }, function(bM) {
                    bJ.cardClick(bM);
                    return false
                }).on("mouseout", {
                    seatNum: bI
                }, function(bM) {
                    bJ.ghostCards(false, bM.data.seatNum)
                })
            } else {
                bJ.$card1[bI] = $("<div>").addClass("card").css({
                    left: g - bJ.hole1XOfs,
                    top: bL - bJ.hole1YOfs,
                    "background-image": "url('" + aZ.deck + "')"
                }).appendTo(bJ.$content);
                bJ.$card1[bI].on("touchstart mousedown", {
                    seatNum: bI
                }, function(bM) {
                    bJ.cardClick(bM);
                    return false
                }).on("mouseout", {
                    seatNum: bI
                }, function(bM) {
                    bJ.ghostCards(false, bM.data.seatNum)
                });
                bJ.$card2[bI] = $("<div>").addClass("card").css({
                    left: g - bJ.hole2XOfs,
                    top: bL - bJ.hole2YOfs,
                    "background-image": "url('" + aZ.deck + "')"
                }).appendTo(bJ.$content);
                bJ.$card2[bI].on("touchstart mousedown", {
                    seatNum: bI
                }, function(bM) {
                    bJ.cardClick(bM);
                    return false
                }).on("mouseout", {
                    seatNum: bI
                }, function(bM) {
                    bJ.ghostCards(false, bM.data.seatNum)
                })
            }
            $("<div>").addClass("cardshade").appendTo(bJ.$card1[bI]);
            $("<div>").addClass("cardshade").appendTo(bJ.$card2[bI]);
            if (bJ.omaha) {
                $("<div>").addClass("cardshade").appendTo(bJ.$card3[bI]);
                $("<div>").addClass("cardshade").appendTo(bJ.$card4[bI])
            }
            g = bJ.xy("chipX", bI) - bJ.chxOfs;
            bL = bJ.xy("chipY", bI) - bJ.chyOfs;
            bJ.$bet[bI] = $("<div>").addClass("chipstack").css({
                left: g,
                top: bL
            }).appendTo(bJ.$content);
            bL = bJ.xy("chipY", bI) + bJ.chyOfs;
            bJ.$betLabel[bI] = $("<div>").css({
                left: g,
                top: bL,
                color: aZ.color.TableTop
            }).appendTo(bJ.$content)
        }
        for (bI = 1; bI < bK; bI++) {
            g = bJ.potX[bI] - bJ.chxOfs;
            bL = bJ.potY[bI] - bJ.chyOfs;
            bJ.$pot[bI] = $("<div>").addClass("chipstack").css({
                left: g,
                top: bL
            }).appendTo(bJ.$content);
            bL = bJ.potY[bI] + bJ.chyOfs;
            bJ.$potLabel[bI] = $("<div>").css({
                left: g,
                top: bL,
                color: aZ.color.TableTop
            }).appendTo(bJ.$content)
        }
        g = bJ.xy("dealerX", 1) - bJ.dxOfs;
        bL = bJ.xy("dealerY", 1) - bJ.dyOfs;
        bJ.$dealer = $("<div>").addClass("dealer").css({
            left: g,
            top: bL,
            background: "url('http://192.99.236.77:81/Image?Name=Chips&Crc=" + aZ.crc.image + "') no-repeat 0px 0px"
        }).appendTo(bJ.$content);
        bJ.graphicsMade = true
    }

    a9.prototype.menuInit = function() {
        var g = this;
        $(".menu, .infobar", g.$dialog).css({
            color: aZ.color.ButtonText,
            "background-color": aZ.color.Button
        });
        $(".menu ul", g.$dialog).css({
            color: aZ.color.ListText,
            "background-color": aZ.color.List,
            "border-color": aZ.color.ListText
        });
        $(".menu_sep", g.$dialog).css({
            "background-color": aZ.color.ListText
        });
        $(".menu ul li", g.$dialog).hover(ba, br);
        $(".tablemenu", g.$dialog).text(aZ.lang.TableMenuMenu);
        new bz($(".menuGeneralInfo", g.$dialog),aZ.lang.TableMenuOptionsGeneral,function() {
                g.showInfo(0)
            }
            ,true);
        new bz($(".menuStatistics", g.$dialog),aZ.lang.TableMenuOptionsStats,function() {
                g.showInfo(1)
            }
            ,true);
        new bz($(".menuHandHistory", g.$dialog),aZ.lang.TableMenuOptionsHistory,function() {
                g.showInfo(2)
            }
            ,true);
        new bz($(".menuExtendedChat", g.$dialog),aZ.lang.TableMenuOptionsChat,function() {
                g.showInfo(3)
            }
            ,true);
        new bz($(".menuAddMoreChips", g.$dialog),aZ.lang.TableMenuOptionsAddChips,function() {
                g.getRebuy()
            }
            ,true);
        g.menuDWS = new bz($(".menuDefaultWindowSize", g.$dialog),aZ.lang.TableMenuOptionsWindowSize,function() {
                g.defaultWindowSize()
            }
            ,true);
        g.menuDWS.show(!aZ.mobile);
        new bz($(".menuRefreshTable", g.$dialog),aZ.lang.TableMenuOptionsRefresh,function() {
                g.refreshTable()
            }
            ,true);
        new bz($(".menuRotateSeats", g.$dialog),aZ.lang.TableMenuOptionsRotate,function() {
                g.rotateSeatsShow(0)
            }
            ,true);
        $(".leavemenu", g.$dialog).text(aZ.lang.TableMenuLeave).on("touchstart mousedown", function(bI) {
            g.leaveSeatMenu.enable(g.getPlayerSeat() > 0 && g.type == "R");
            bI.preventDefault()
        });
        g.leaveSeatMenu = new bz($(".menuLeaveSeat", g.$dialog),aZ.lang.TableMenuLeaveSeat,function() {
                g.confirmLeave(true)
            }
            ,true);
        new bz($(".menuLeaveTable", g.$dialog),aZ.lang.TableMenuLeaveTable,function() {
                g.confirmLeave(false)
            }
            ,true)
    }
    ;
    a9.prototype.messageShow = function(bL, bK) {
        var bJ, g, bI;
        bJ = this;
        g = $(".message:eq(0)").clone().appendTo(aZ.mobile ? aZ.lobby.$openTableBox : "body");
        if (!bK || bK == "") {
            bK = aZ.lang.DialogMessage
        }
        bI = new a2(g,bJ,{
            title: bK,
            removeonclose: true
        });
        new w($(".okbtn", bI.$dialog),aZ.lang.DialogOK,25,function() {
                bI.close()
            }
        );
        $(".closebtn", bI.$dialog).on("touchstart mousedown", function() {
            bI.close();
            return false
        });
        bI.showMessage(bL, true)
    }
    ;
    a9.prototype.moveChat = function() {
        var g = this;
        if (g.chatInfoMove.isChecked()) {
            g.chatInfoEdit.setText(g.chatEdit.getText());
            g.chatEdit.setText("");
            g.chatText.setText("");
            g.showChat(false)
        } else {
            g.chatEdit.setText(g.chatInfoEdit.getText());
            g.chatInfoEdit.setText("");
            g.chatInfoText.setText("");
            g.showChat(true)
        }
        g.chatUpdate()
    }
    ;
    a9.prototype.moveDealer = function(bJ) {
        var bK, g, bM, bL;
        bK = this;
        bK.animating++;
        bK.dealer = bJ;
        g = bK.xy("dealerX", bJ) - bK.dxOfs;
        bM = bK.xy("dealerY", bJ) - bK.dyOfs;
        bL = 500;
        bK.$dealer.xytrans(bL).css({
            left: g,
            top: bM
        });
        setTimeout(bI, bL + 25);
        function bI() {
            if (bK.animating > 0) {
                bK.animating--
            }
            v(bK)
        }
    }
    ;
    a9.prototype.nextMove1Change = function(bI) {
        var g = this;
        if (!bI) {
            g.nextMove = ""
        } else {
            g.nextMove2.setCheck(false);
            g.nextMove = g.nextCommand1;
            g.foldAnyBet.setCheck(false)
        }
    }
    ;
    a9.prototype.nextMove2Change = function(bI) {
        var g = this;
        if (!bI) {
            g.nextMove = ""
        } else {
            g.nextMove1.setCheck(false);
            g.nextMove = g.nextCommand2;
            g.foldAnyBet.setCheck(false)
        }
    }
    ;
    a9.prototype.playerInfoCreate = function() {
        var g, bI;
        g = this;
        bI = $(".playerinfo:eq(0)").clone().appendTo(aZ.mobile ? aZ.lobby.$openTableBox : "body");
        g.piName = "";
        g.playerInfo = new a2(bI,g,{});
        g.$piStatus = $(".pi_status", bI);
        g.piProfile = new w($(".pi_profile", bI),aZ.lang.PlayerProfile,25,function() {
                aB(g.piName)
            }
        );
        g.piChat = new w($(".pi_chat", bI),aZ.lang.PlayerChat,25,function() {
                g.playerInfoToggle()
            }
        );
        g.piSearch = new w($(".pi_search", bI),aZ.lang.PlayerSearch,25,function() {
                g.playerInfoSearch()
            }
        );
        new w($(".okbtn", bI),aZ.lang.DialogOK,25,function() {
                g.playerInfo.close()
            }
        );
        $(".closebtn", bI).on("touchstart mousedown", function() {
            g.playerInfo.close();
            return false
        })
    }
    ;
    a9.prototype.playerInfoShow = function(bK) {
        var bJ, bI, g;
        bJ = this;
        bJ.piName = bJ.playerName[bK];
        bI = bJ.piName;
        if (!bI || bI == "") {
            return
        }
        g = (ag(bI));
        bJ.playerInfo.setTitle(bI);
        bJ.$piStatus.text(g ? aZ.lang.PlayerChatBlock : aZ.lang.PlayerChatOK);
        bJ.piProfile.show(aZ.profileURL != "");
        bJ.playerInfo.show(true)
    }
    ;
    a9.prototype.playerInfoSearch = function() {
        var g = this;
        bt({
            Response: "PlayerSearch",
            Player: g.piName,
            Table: g.id,
            TT: g.type
        })
    }
    ;
    a9.prototype.playerInfoToggle = function() {
        var bJ, bI, g;
        bJ = this;
        bI = bJ.piName;
        if (bI == aZ.loginData.player) {
            bJ.messageShow(aZ.lang.MessageChatBlock);
            return
        }
        bJ.$piStatus.text(t(bI) ? aZ.lang.PlayerChatBlock : aZ.lang.PlayerChatOK);
        for (g = 0; g < aZ.data.Login.rows.length; g++) {
            if (aZ.data.Login.rows[g].player == bI) {
                aZ.data.Login.rows[g].chat = u(bI);
                break
            }
        }
        if (aZ.lobby.lobbyTabs.getTab() == 0) {
            aZ.lobby.loginGrid.update()
        }
        aa(bI)
    }
    ;
    a9.prototype.potAward = function(g) {
        var bQ, bJ, bN, bP, bR, bI, bM, bL, bK;
        bQ = this;
        bQ.animating++;
        bJ = 300;
        bN = g.Pot;
        bP;
        bQ.potChips[bN] = 0;
        bQ.$pot[bN].hide();
        bQ.$potLabel[bN].hide();
        bI = bQ.seats;
        bM = 0;
        if (bQ.dialog == aZ.focused && aZ.soundOK) {
            bi("pot")
        }
        for (bL = 1; bL <= bI; bL++) {
            bP = a5(g["Seat" + bL]);
            if (bP > 0) {
                bM++;
                bQ.stackChips(bQ.$bet[bL], bP);
                bQ.$bet[bL].xytrans(0).css({
                    left: bQ.potX[bN] - bQ.chxOfs,
                    top: bQ.potY[bN] - bQ.chyOfs
                }).show().redraw();
                bQ.$betLabel[bL].xytrans(0).css({
                    left: bQ.potX[bN] - bQ.chxOfs,
                    top: bQ.potY[bN] + bQ.chyOfs
                }).text(bl(bP)).show().redraw();
                bQ.$bet[bL].xytrans(bJ).css({
                    left: bQ.xy("chipX", bL) - bQ.chxOfs,
                    top: bQ.xy("chipY", bL) - bQ.chyOfs
                });
                bQ.$betLabel[bL].xytrans(bJ).css({
                    left: bQ.xy("chipX", bL) - bQ.chxOfs,
                    top: bQ.xy("chipY", bL) + bQ.chyOfs
                });
                bR = T(g["Mask" + bL]);
                if (bR == "") {
                    continue
                }
                for (bK = 1; bK <= 5; bK++) {
                    $(".cardshade", bQ.$board[bK]).toggle(bR.charAt(bK - 1) == "0")
                }
                $(".cardshade", bQ.$card1[bL]).toggle(bR.charAt(5) == "0");
                $(".cardshade", bQ.$card2[bL]).toggle(bR.charAt(6) == "0");
                if (bQ.omaha) {
                    $(".cardshade", bQ.$card3[bL]).toggle(bR.charAt(7) == "0");
                    $(".cardshade", bQ.$card4[bL]).toggle(bR.charAt(8) == "0")
                }
            }
        }
        setTimeout(bO, bJ + 25);
        function bO() {
            if (bQ.animating > 0) {
                bQ.animating--
            }
            v(bQ)
        }
    }
    ;
    a9.prototype.raiseInputChange = function() {
        var g, bI, bJ;
        g = this;
        g.raiseTo = bn(g.raiseInput.getText());
        g.raiseTo = Math.round(g.raiseTo / g.raiseMultiple) * g.raiseMultiple;
        if (g.raiseTo < g.minRaiseTo) {
            g.raiseTo = g.minRaiseTo
        }
        if (g.raiseTo > g.maxRaiseTo) {
            g.raiseTo = g.maxRaiseTo
        }
        bI = (g.raiseTo - g.minRaiseTo) / (g.maxRaiseTo - g.minRaiseTo);
        g.raiseSlider.setValue(bI, false);
        if (g.button3.isVisible()) {
            bJ = g.button3.command;
            if (bJ == "Bet") {
                g.setCommand(g.button3, "Bet", g.raiseTo)
            } else {
                g.setCommand(g.button3, "Raise", g.raiseTo)
            }
        }
    }
    ;
    a9.prototype.raiseSliderChange = function(bJ) {
        var bI, g;
        bI = this;
        if (bJ == 0) {
            g = bI.minRaiseTo
        } else {
            if (bJ == 1) {
                g = bI.maxRaiseTo
            } else {
                g = bJ * (bI.maxRaiseTo - bI.minRaiseTo) + bI.minRaiseTo;
                g = Math.round(g / bI.raiseInc) * bI.raiseInc
            }
        }
        bI.raiseInput.setText(bv(g));
        bI.raiseInputChange()
    }
    ;
    a9.prototype.refreshTable = function() {
        var bJ, g, bK, bI;
        bJ = this;
        for (g = 1; g <= 5; g++) {
            if (bJ.$board[g]) {
                bJ.$board[g].remove()
            }
        }
        for (g = 1; g <= 10; g++) {
            if (bJ.$seat[g]) {
                bJ.$seat[g].remove()
            }
            if (bJ.$avatar[g]) {
                bJ.$avatar[g].remove()
            }
            if (bJ.$card1[g]) {
                bJ.$card1[g].remove()
            }
            if (bJ.$card2[g]) {
                bJ.$card2[g].remove()
            }
            if (bJ.$card3[g]) {
                bJ.$card3[g].remove()
            }
            if (bJ.$card4[g]) {
                bJ.$card4[g].remove()
            }
            if (bJ.name[g]) {
                bJ.name[g].$container.remove();
                delete bJ.name[g]
            }
            if (bJ.$bet[g]) {
                bJ.$bet[g].remove()
            }
            if (bJ.$betLabel[g]) {
                bJ.$betLabel[g].remove()
            }
        }
        for (g = 1; g <= 9; g++) {
            if (bJ.$pot[g]) {
                bJ.$pot[g].remove()
            }
            if (bJ.$potLabel[g]) {
                bJ.$potLabel[g].remove()
            }
        }
        if (bJ.$dealer) {
            bJ.$dealer.remove()
        }
        bJ.graphicsMade = false;
        bJ.card1 = 0;
        bJ.card2 = 0;
        bJ.card3 = 0;
        bJ.card4 = 0;
        bJ.animating = 0;
        bJ.packetQueue.length = 0;
        bK = {
            Response: "OpenTable"
        };
        bK.Table = bJ.id;
        bK.Type = bJ.type;
        bI = aZ.passwords[bJ.type + bJ.id];
        if (bI) {
            bK.Password = bI
        }
        bt(bK)
    }
    ;
    a9.prototype.resizeInfo = function() {
        var bI, g;
        bI = this;
        g = ($(".infotabs", bI.infoDialog.$dialog).width() - 20) / 4;
        bI.infoTabs.setTabWidth(g);
        bI.generalInfo.updateScrollPosition();
        bI.statsInfo.updateScrollPosition();
        bI.chatInfoText.updateScrollPosition();
        bI.historySlider.updateThumb();
        bI.historyInfo.updateScrollPosition()
    }

    a9.prototype.resizeTable = function() {
        var bR, bP, bM, bK, g, bJ, bL, bO, bN, bQ, bI;
        bR = this;
        if (aZ.mobile) {
            $("#OpenBackground").hide();
            bP = aZ.lobby.$openTableBox.parent().width();
            bM = aZ.lobby.$openTableBox.parent().height();
            bK = bP - 66 - bR.horzChrome;
            g = bM - bR.vertChrome;
            bJ = 700 / 510;
            if (bK / g > bJ) {
                bL = bM;
                bO = Math.round((bL - bR.vertChrome) * bJ) + bR.horzChrome;
                bN = (bP - bO) / 2;
                aZ.lobby.$openTableBox.css({
                    top: 0,
                    left: bN,
                    right: bN,
                    bottom: 0
                });
                aZ.lobby.prevTableBtn.$container.css({
                    top: 3,
                    width: bN,
                    bottom: 3
                });
                aZ.lobby.nextTableBtn.$container.css({
                    top: 3,
                    width: bN,
                    bottom: 3
                })
            } else {
                bO = bP - 66;
                bL = Math.round((bO - bR.horzChrome) / bJ) + bR.vertChrome;
                bQ = (bM - bL) / 2;
                bN = 30;
                aZ.lobby.$openTableBox.css({
                    top: bQ,
                    left: bN + 3,
                    right: bN + 3,
                    bottom: bQ
                });
                aZ.lobby.prevTableBtn.$container.css({
                    top: bQ + 3,
                    width: bN,
                    bottom: bQ + 3
                });
                aZ.lobby.nextTableBtn.$container.css({
                    top: bQ + 3,
                    width: bN,
                    bottom: bQ + 3
                })
            }
            aZ.lobby.prevTableBtn.$container.show().css("font-size", (bN / 30) + "em");
            aZ.lobby.$openTableBox.show();
            aZ.lobby.nextTableBtn.$container.show().css("font-size", (bN / 30) + "em");
            bI = (bO - bR.horzChrome) / 700

            bR.$content.css("transform", "scale(" + bI + ")");
        } else {
            //bI = (bR.$dialog.width() - bR.horzChrome) / 700;
            //bI = (bR.$dialog.width() - bR.horzChrome) / 700;
            //bI = Math.min(($(document).width() - bR.horzChrome) / 700, ($(document).height() - bR.vertChrome) / 510);
            //bL = Math.round(bI * 510) + bR.vertChrome;
            //bR.$dialog.css("height", bL)

            var rh, rw;
            //console.log('Table name ' + bR.id);
            //alert('Table name ' + bR.id);

            rh = 0.95 * ($(document).width() - bR.horzChrome) / 700;
            rw = 0.90 * ($(document).height() - bR.vertChrome + 50) / 510;

            bR.$dialog.css({top: 10, left: 10});
            bR.$content.css("transform", "scale(" + rh + "," + rw + ")");
            bR.$dialog.css({width : (700+5)*rh, height : (510+45)*rw});
        }

        bR.raiseSlider.setScale(bI);
    }

    a9.prototype.rotateSeats = function(bK) {
        var bJ, bI, g, bL;
        bJ = this;
        bJ.rsHereValue = bJ.rsHereValue - bK;
        bJ.rotate = (bJ.rotate + bK) % bJ.seats;
        if (bJ.rotate < 0) {
            bJ.rotate = bJ.rotate + bJ.seats
        }
        bJ.$rsStatus.text(aZ.lang.RotateStatus.split("%1%").join(bJ.rotate));
        for (bI = 1; bI <= bJ.seats; bI++) {
            g = bJ.xy("seatX", bI);
            bL = bJ.xy("seatY", bI);
            if (bJ.$seat[bI]) {
                bJ.$seat[bI].xytrans(500).css({
                    left: g - bJ.sxOfs,
                    top: bL - bJ.syOfs
                })
            }
            if (bJ.$avatar[bI]) {
                bJ.$avatar[bI].xytrans(500).css({
                    left: g - bJ.axOfs,
                    top: bL - bJ.ayOfs
                })
            }
            if (bJ.omaha) {
                if (bJ.$card1[bI]) {
                    bJ.$card1[bI].xytrans(500).css({
                        left: g - bJ.oHole1XOfs,
                        top: bL - bJ.oHole1YOfs
                    })
                }
                if (bJ.$card2[bI]) {
                    bJ.$card2[bI].xytrans(500).css({
                        left: g - bJ.oHole2XOfs,
                        top: bL - bJ.oHole2YOfs
                    })
                }
                if (bJ.$card3[bI]) {
                    bJ.$card3[bI].xytrans(500).css({
                        left: g - bJ.oHole3XOfs,
                        top: bL - bJ.oHole3YOfs
                    })
                }
                if (bJ.$card4[bI]) {
                    bJ.$card4[bI].xytrans(500).css({
                        left: g - bJ.oHole4XOfs,
                        top: bL - bJ.oHole4YOfs
                    })
                }
            } else {
                if (bJ.$card1[bI]) {
                    bJ.$card1[bI].xytrans(500).css({
                        left: g - bJ.hole1XOfs,
                        top: bL - bJ.hole1YOfs
                    })
                }
                if (bJ.$card2[bI]) {
                    bJ.$card2[bI].xytrans(500).css({
                        left: g - bJ.hole2XOfs,
                        top: bL - bJ.hole2YOfs
                    })
                }
            }
            g = bJ.xy("nameX", bI);
            bL = bJ.xy("nameY", bI);
            if (bJ.name[bI]) {
                bJ.name[bI].$container.xytrans(500).css({
                    left: g - bJ.nxOfs,
                    top: bL - bJ.nyOfs
                })
            }
            g = bJ.xy("chipX", bI);
            bL = bJ.xy("chipY", bI);
            if (bJ.$bet[bI]) {
                bJ.$bet[bI].xytrans(500).css({
                    left: g - bJ.chxOfs,
                    top: bL - bJ.chyOfs
                })
            }
            if (bJ.$betLabel[bI]) {
                bJ.$betLabel[bI].xytrans(500).css({
                    left: g - bJ.chxOfs,
                    top: bL + bJ.chyOfs
                })
            }
        }
        g = bJ.xy("dealerX", bJ.dealer);
        bL = bJ.xy("dealerY", bJ.dealer);
        if (bJ.$dealer) {
            bJ.$dealer.xytrans(500).css({
                left: g - bJ.dxOfs,
                top: bL - bJ.dyOfs
            })
        }
    }
    ;
    a9.prototype.rotateSeatsCreate = function() {
        var bI, g;
        bI = this;
        g = $(".rotateseats:eq(0)").clone().appendTo(aZ.mobile ? aZ.lobby.$openTableBox : "body");
        bI.rotateDialog = new a2(g,bI,{
            title: aZ.lang.RotateTitle
        });
        bI.$rsStatus = $(".rs_status", g);
        bI.rsHereValue = 0;
        bI.rsHere = new w($(".rs_here", g),aZ.lang.RotateHere,25,function() {
                bI.rotateSeats(bI.rsHereValue)
            }
        );
        bI.rsCW = new w($(".rs_cw", g),aZ.lang.RotateCW,25,function() {
                bI.rotateSeats(1)
            }
        );
        bI.rsCCW = new w($(".rs_ccw", g),aZ.lang.RotateCCW,25,function() {
                bI.rotateSeats(-1)
            }
        );
        bI.rsReset = new w($(".rs_reset", g),aZ.lang.RotateReset,25,function() {
                bI.rotateSeats(-bI.rotate)
            }
        );
        new w($(".okbtn", g),aZ.lang.DialogOK,25,function() {
                bI.rotateDialog.close()
            }
        );
        $(".closebtn", g).on("touchstart mousedown", function() {
            bI.rotateDialog.close();
            return false
        })
    }
    ;
    a9.prototype.rotateSeatsShow = function(bI) {
        var g;
        g = this;
        g.$rsStatus.text(aZ.lang.RotateStatus.split("%1%").join(g.rotate));
        g.rsHereValue = bI;
        g.rsHere.enable(bI != 0);
        g.rotateDialog.show(true)
    }
    ;
    a9.prototype.seatClick = function(bK) {
        var bJ, bL, g, bI;
        bJ = this;
        bL = bK.data.seatNum;
        g = bJ.getPlayerSeat();
        if (g > 0 && g != bL) {
            bJ.rotateSeatsShow(bL - g)
        } else {
            if (bJ.type == "T") {
                return
            }
            if (aZ.loggedIn == false) {
                bJ.messageShow(aZ.lang.MessageRingGameLogin);
                return
            }
            if (g > 0) {
                return
            }
            if (bJ.playerName[bL] != null && bJ.playerName[bL] != "") {
                return
            }
            bI = aZ.passwords["R" + bJ.id];
            if (bJ.password == true && bI == null ) {
                bJ.getPasswordShow(bL)
            } else {
                packet = {
                    Response: "RequestSeat",
                    Table: bJ.id,
                    Type: "R",
                    Seat: bL
                };
                if (bI != null ) {
                    packet.Password = bI
                }
                bt(packet)
            }
        }
    }
    ;
    a9.prototype.selectInfoTab = function(g) {
        var bI = this;
        switch (g) {
            case 0:
                bI.generalInfo.topScroll();
                break;
            case 1:
                bI.statsInfo.topScroll();
                break;
            case 2:
                bI.historyInfo.topScroll();
                bI.historySlider.updateThumb();
                break;
            case 3:
                bI.chatInfoText.updateScrollPosition();
                break
        }
    }
    ;
    a9.prototype.sendButton = function(bK, g) {
        var bI, bJ;
        bI = this;
        bJ = {
            Response: "Button"
        };
        bJ.Table = bI.id;
        bJ.Type = bI.type;
        bJ.Button = bK;
        bJ.Amount = g;
        bt(bJ)
    }
    ;
    a9.prototype.sendSitOut = function(bJ, bI) {
        var g, bK;
        g = this;
        bK = {
            Response: "SitOut"
        };
        bK.Table = g.id;
        bK.Type = g.type;
        bK.Box = bJ;
        if (bI) {
            bK.Checked = "Yes"
        } else {
            bK.Checked = "No"
        }
        bt(bK)
    }
    ;
    a9.prototype.setCommand = function(bJ, bK, bI) {
        var g = "Error";
        switch (bK) {
            case "BB3":
                g = aZ.lang.TableButtonBB.split("%1%").join("3");
                break;
            case "BB4":
                g = aZ.lang.TableButtonBB.split("%1%").join("4");
                break;
            case "BB5":
                g = aZ.lang.TableButtonBB.split("%1%").join("5");
                break;
            case "Pot13":
                g = "1/3";
                break;
            case "Pot12":
                g = "1/2";
                break;
            case "Pot23":
                g = "2/3";
                break;
            case "Pot":
                g = aZ.lang.TableButtonPot;
                break;
            case "Fold":
                g = aZ.lang.TableButtonFold;
                break;
            case "Check":
                g = aZ.lang.TableButtonCheck;
                break;
            case "Call":
                g = aZ.lang.TableButtonCall.split("%1%").join(bl(bI));
                break;
            case "Bet":
                g = aZ.lang.TableButtonBet.split("%1%").join(bl(bI));
                break;
            case "Raise":
                g = aZ.lang.TableButtonRaise.split("%1%").join(bl(bI));
                break;
            case "Wait":
                g = aZ.lang.TableButtonWait;
                break;
            case "Ready":
                g = aZ.lang.TableButtonReady;
                break;
            case "Start":
                g = aZ.lang.TableButtonStart;
                break;
            case "Muck":
                g = aZ.lang.TableButtonMuck;
                break;
            case "Show":
                g = aZ.lang.TableButtonShow;
                break;
            case "Leave":
                g = aZ.lang.TableButtonLeave;
                break;
            case "Rebuy":
                g = aZ.lang.TableButtonRebuy;
                break;
            case "Double Rebuy":
                g = aZ.lang.TableButtonDoubleRebuy;
                break;
            case "Off":
                g = "";
                bJ.show(false);
                break
        }
        bJ.command = bK;
        bJ.amount = bI;
        bJ.setCaption(g)
    }
    ;
    a9.prototype.setHint = function(bL) {
        var bR, bJ, g, bI, bK, bP, bQ, bM, bO, bN;
        bR = this;
        bJ = T(bR.playerName[bL]);
        if (bJ == "") {
            bM = aZ.lang.MouseOverSeat + " #" + bL
        } else {
            g = aM(bR.playerRealName[bL]);
            bI = aM(bR.playerTitle[bL]);
            bK = aM(bR.playerLevel[bL]);
            bP = aM(bR.playerCustom[bL]);
            bQ = bR.playerAway[bL];
            bM = aZ.lang.MouseOverSeat + " " + bL + ": " + bJ + "  (" + g;
            if (g != "") {
                bM = bM + " "
            }
            bM = bM + aZ.lang.MouseOverFrom + " " + aM(bR.playerLocation[bL]) + ")  " + bR.playerGender[bL] + "<br>" + aZ.lang.MouseOverChips + ": " + bl(bR.playerChips[bL]) + "  " + aZ.lang.MouseOverTimeBank + ": " + bR.playerTime[bL];
            if (bQ != "") {
                bM = bM + "<br>" + aZ.lang.MouseOverAway + ": " + bR.playerAway[bL]
            }
            bO = "";
            if (bI != "") {
                bO = aZ.lang.MouseOverTitle + ": " + bI + "  "
            }
            if (bK != "") {
                bO = bO + aZ.lang.MouseOverLevel + ": " + bK
            }
            if (bO != "") {
                bM = bM + "<br>" + bO
            }
            if (bP != "" && aZ.customMouseOver == true) {
                bN = "";
                if (aZ.customCaption != "") {
                    bN = aZ.customCaption + ": "
                }
                bN = bN + bP;
                bM = bM + "<br>" + bN
            }
            bM = bM + "<br>" + aZ.lang.MouseOverClick
        }
        bR.name[bL].hint = bM
    }
    ;
    a9.prototype.setTableBanner = function(g) {
        this.$tablebanner.text(g)
    }
    ;
    a9.prototype.setTableMessage = function(g) {
        this.$tablemessage.text(g)
    }
    ;
    a9.prototype.setTitle = function(bI) {
        var g = this;
        g.title = bI;
        $(".title", g.$dialog).text(bI);
        if (aZ.mobile) {
            $(".infobar", g.$dialog).html("<b>" + aM(bI) + "</b><br>" + g.infotext)
        }
    }
    ;
    a9.prototype.setupButtons = function(bK, bI, g, bL, bJ) {
        var bM = this;
        bM.button1.show(bK != "");
        bM.button2.show(bI != "");
        bM.button3.show(g != "");
        bM.setCommand(bM.button1, bK, 0);
        bM.setCommand(bM.button2, bI, bL);
        bM.setCommand(bM.button3, g, bJ)
    }
    ;
    a9.prototype.setupRaiseBar = function(g, bM, bK, bL) {
        var bJ, bI;
        bJ = this;
        bJ.minRaiseTo = g;
        bJ.raiseTo = g;
        bJ.maxRaiseTo = bM;
        bJ.raiseInc = bK;
        bJ.raiseMultiple = bL;
        bI = (bJ.minRaiseTo > 0 && bJ.minRaiseTo < bJ.maxRaiseTo);
        bJ.$raiseBox.toggle(bI);
        if (!bI) {
            return
        }
        bJ.raiseInput.setText(bv(g));
        bJ.raiseSlider.increment = bK / (bM - g);
        bJ.raiseSlider.setValue(0, false)
    }
    ;
    a9.prototype.setupRaiseButtons = function(bI, bL, bK, bJ, g) {
        var bM, bN;
        bM = this;
        bN = (bM.$raiseBox.is(":visible") && bL > 0);
        bM.betButton1.show(bN);
        bM.betButton2.show(bN);
        bM.betButton3.show(bN);
        bM.betButton4.show(bN);
        if (!bN) {
            return
        }
        if (bI) {
            bM.setCommand(bM.betButton1, "BB3", bL);
            bM.setCommand(bM.betButton2, "BB4", bK);
            bM.setCommand(bM.betButton3, "BB5", bJ)
        } else {
            bM.setCommand(bM.betButton1, "Pot13", bL);
            bM.setCommand(bM.betButton2, "Pot12", bK);
            bM.setCommand(bM.betButton3, "Pot23", bJ)
        }
        bM.setCommand(bM.betButton4, "Pot", g);
        bM.betButton1.enable(bL >= bM.minRaiseTo);
        bM.betButton2.enable(bK >= bM.minRaiseTo);
        bM.betButton3.enable(bJ >= bM.minRaiseTo);
        bM.betButton4.enable(g >= bM.minRaiseTo)
    }
    ;
    a9.prototype.showChat = function(g) {
        var bI = this;
        $(".chatimage", bI.$dialog).toggle(g);
        bI.$chatEdit.toggle(g);
        bI.$chatText.toggle(g);
        if (g) {
            bI.chatText.updateScrollPosition();
            bI.$controlView.css("left", 365)
        } else {
            bI.$controlView.css("left", 190)
        }
    }
    ;
    a9.prototype.showHoleCards = function() {
        var bI, g;
        bI = this;
        g = bI.getPlayerSeat();
        if (g == 0) {
            return
        }
        if (aZ.local.dealFaceDown) {
            bI.holeCard1[g] = 53;
            bI.holeCard2[g] = 53;
            bI.holeCard3[g] = 53;
            bI.holeCard4[g] = 53;
            bI.isFaceDown = true
        } else {
            bI.holeCard1[g] = bI.card1;
            bI.holeCard2[g] = bI.card2;
            bI.holeCard3[g] = bI.card3;
            bI.holeCard4[g] = bI.card4;
            bI.isFaceDown = false;
            ah(bI.$card1[g], bI.card1);
            if (bI.card1 != 0) {
                bI.$card1[g].show()
            }
            ah(bI.$card2[g], bI.card2);
            if (bI.card2 != 0) {
                bI.$card2[g].show()
            }
            if (bI.omaha) {
                ah(bI.$card3[g], bI.card3);
                if (bI.card3 != 0) {
                    bI.$card3[g].show()
                }
                ah(bI.$card4[g], bI.card4);
                if (bI.card4 != 0) {
                    bI.$card4[g].show()
                }
            }
        }
        bI.foldAnyBet.show(bI.card1 > 0)
    }
    ;
    a9.prototype.showInfo = function(bJ) {
        var bM, bK, bI, g, bL;
        bM = this;
        if (aZ.mobile) {
            bM.infoDialog.$dialog.css({
                width: 500,
                height: bM.$dialog.height() - 90
            });
            bM.infoDialog.show(true)
        } else {
            bK = bM.$dialog.position().top;
            bI = bM.$dialog.position().left + bM.$dialog.outerWidth() + 5;
            g = 350;
            bL = bM.$dialog.height();
            bM.infoDialog.$dialog.css({
                top: bK,
                left: bI,
                width: g,
                height: bL
            });
            bM.infoDialog.$dialog.show().css("z-index", ++aZ.zTop);
            at(bM.infoDialog)
        }
        bM.resizeInfo();
        bM.infoTabs.setTab(bJ)
    }
    ;
    a9.prototype.stackChips = function(bN, bJ) {
        var bM, bI, bO, bL, g;
        bM = this;
        function bK(bQ, bP) {
            while (Math.round(bJ * 100) >= Math.round(bQ * 100)) {
                bI.push(bP);
                bJ = bJ - bQ
            }
        }
        if (!bN) {
            return
        }
        bN.empty();
        if (bJ == 0) {
            return
        }
        bI = [];
        bK(1000000000, 19);
        bK(500000000, 18);
        bK(100000000, 17);
        bK(25000000, 16);
        bK(5000000, 15);
        bK(1000000, 14);
        bK(500000, 13);
        bK(100000, 12);
        bK(25000, 11);
        bK(5000, 10);
        bK(1000, 9);
        bK(500, 8);
        bK(100, 7);
        bK(25, 6);
        bK(5, 5);
        bK(1, 4);
        bK(0.25, 3);
        bK(0.05, 2);
        bK(0.01, 1);
        bO = bI.length - 20;
        if (bO < 0) {
            bO = 0
        }
        bL;
        g = 0;
        while (bO < bI.length) {
            bL = (bI[bO] * -23) + "px 0px";
            $("<div>").addClass("chip").css({
                bottom: g,
                background: "url('http://192.99.236.77:81/Image?Name=Chips&Crc=" + aZ.crc.image + "') no-repeat " + bL
            }).appendTo(bN);
            g = g + 3;
            bO++
        }
        bN.show()
    }
    ;
    a9.prototype.toggleBoard = function() {
        var bI, bJ;
        bJ = this;
        for (bI = 1; bI <= 5; bI++) {
            if (bJ.boardCard[bI] != 0) {
                ah(bJ.$board[bI], 53)
            }
        }
        setTimeout(g, 100);
        function g() {
            for (bI = 1; bI <= 5; bI++) {
                if (bJ.boardCard[bI] != 0) {
                    ah(bJ.$board[bI], bJ.boardCard[bI])
                }
            }
        }
    }
    ;
    a9.prototype.toggleCards = function(g) {
        var bI = this;
        if (bI.getPlayerSeat() != g || bI.card1 == 0) {
            return
        }
        if (bI.$card1[g].css("opacity") < 1) {
            return
        }
        bI.isFaceDown = !bI.isFaceDown;
        if (bI.isFaceDown) {
            bI.holeCard1[g] = 53;
            bI.holeCard2[g] = 53;
            bI.holeCard3[g] = 53;
            bI.holeCard4[g] = 53
        } else {
            bI.holeCard1[g] = bI.card1;
            bI.holeCard2[g] = bI.card2;
            bI.holeCard3[g] = bI.card3;
            bI.holeCard4[g] = bI.card4
        }
        ah(bI.$card1[g], bI.holeCard1[g]);
        ah(bI.$card2[g], bI.holeCard2[g]);
        if (bI.omaha) {
            ah(bI.$card3[g], bI.holeCard3[g]);
            ah(bI.$card4[g], bI.holeCard4[g])
        }
        bI.updateHandHelper()
    }
    ;
    a9.prototype.updateHandHelper = function() {
        var bJ, g, bI;
        bJ = this;
        g = bJ.getPlayerSeat();
        if (g == 0) {
            return
        }
        bI = "";
        if (aZ.local.handHelper) {
            bI = bJ.handHelper
        }
        if (bJ.$card1[g].is(":visible") && bJ.isFaceDown) {
            bI = aZ.lang.TableCaptionFlipCards
        }
        bJ.setTableMessage(bI)
    }
    ;
    a9.prototype.updateTotal = function() {
        var g = this;
        if (g.totalPot == "") {
            g.$totalPlate.html("").hide()
        } else {
            g.$totalPlate.html(aZ.lang.TableCaptionTotal + "<br>" + bl(g.totalPot)).show()
        }
    }
    ;
    a9.prototype.xy = function(g, bK) {
        var bJ, bL, bI;
        bJ = this;
        bL = bJ.seats;
        bI = bK + bJ.rotate;
        if (bI > bL) {
            bI = bI - bL
        }
        return bJ[g][bL][bI]
    }
    ;
    function a2(bK, bJ, g) {
        var bI = this;
        bI.$dialog = bK;
        bI.parent = bJ;
        bI.shadeparent = g.shadeparent;
        bI.title = T(g.title);
        bI.minwidth = a5(g.minwidth);
        bI.minheight = a5(g.minheight);
        bI.onresize = g.onresize;
        bI.removeonclose = (g.removeonclose == true);
        bI.modal = false;
        bI.$dialog.css({
            color: aZ.color.WindowText,
            "background-color": aZ.color.Window
        });
        $(".title", bI.$dialog).css("color", aZ.color.WindowText).text(bI.title);
        $(".dialogcontent, .infocontent", bI.$dialog).css({
            color: aZ.color.ListText,
            "background-color": aZ.color.List
        });
        $(".tablecontent", bI.$dialog).css("color", aZ.color.TableBackground);
        $("<div>").addClass("shader").appendTo(bI.$dialog);
        bI.dragging = false;
        bI.resizing = false;
        bI.ofx = 0;
        bI.ofy = 0;
        bI.xmax = 0;
        bI.ymax = 0;
        bI.rxmax = 0;
        bI.rymax = 0;
        bI.xdown = 0;
        bI.ydown = 0;
        bI.wdialog = 0;
        bI.hdialog = 0;
        bI.mouseEvents()
    }
    a2.prototype.close = function() {
        var g, bI;
        g = this;
        if (g.isVisible() == false) {
            return
        }
        $("button", g.$dialog).first().focus();
        g.$dialog.hide();
        if (g.removeonclose) {
            g.$dialog.remove()
        }
        if (g.parent == null || g.modal == false) {
            return
        }
        g.parent.modalList.pop();
        bI = g.parent.modalList.length;
        if (bI > 0) {
            g.parent.modalList[bI - 1].shadeModal(false)
        }
    }
    ;
    a2.prototype.isVisible = function() {
        return this.$dialog.is(":visible")
    }
    ;
    a2.prototype.mouseEvents = function() {
        var g;
        g = this;
        $(".menu", g.$dialog).on("touchstart mousedown", function(bI) {
            if (bo(bI) || aC(bI)) {
                return
            }
            if (aZ.doc.$menu) {
                aZ.doc.$menu.hide()
            }
            if (aZ.doc.$menu && aZ.doc.$menu.parent().get(0) == this) {
                aZ.doc.$menu = null
            } else {
                aZ.doc.$menu = $("ul", $(this))
            }
        });
        $(".menu", g.$dialog).on("touchend mouseup", function(bI) {
            if (aC(bI)) {
                return
            }
            if (aZ.doc.debug) {
                aZ.doc.debug = false;
                clearTimeout(aZ.debugTimer)
            }
            if (aZ.doc.$menu) {
                aZ.doc.$menu.show()
            }
            return false
        });
        $(".header", g.$dialog).on("touchstart mousedown", function(bI) {
            if (aZ.mobile || bo(bI) || aC(bI)) {
                return
            }
            g.dragging = true;
            aZ.doc.dialog = g
        });
        $(".resize", g.$dialog).on("touchstart mousedown", function(bI) {
            if (aZ.mobile || bo(bI) || aC(bI)) {
                return
            }
            g.resizing = true;
            g.rxmax = $(document).width() - 5;
            g.rymax = $(document).height() - 5;
            aZ.doc.dialog = g;
            $("body").css("cursor", "se-resize");
            bI.preventDefault()
        });
        g.$dialog.on("touchstart mousedown", function(bL) {
            if (aZ.mobile || bo(bL) || aC(bL)) {
                return
            }
            var bI, bJ, bK, bM;
            bM = $(".shader", g.$dialog).is(":visible");
            if (g.$dialog.css("z-index") < aZ.zTop) {
                if (g.modal) {
                    for (bI = 0; bI < g.parent.modalList.length; bI++) {
                        g.parent.modalList[bI].$dialog.css("z-index", ++aZ.zTop)
                    }
                    at(g.parent.dialog)
                } else {
                    if (bM) {
                        for (bI = 0; bI < g.shadeparent.modalList.length; bI++) {
                            g.shadeparent.modalList[bI].$dialog.css("z-index", ++aZ.zTop)
                        }
                        at(g.shadeparent.dialog)
                    } else {
                        g.$dialog.css("z-index", ++aZ.zTop);
                        at(g)
                    }
                }
            }
            if (bM) {
                return false
            }
            bJ = (bL.type == "touchstart") ? bL.originalEvent.touches[0] : bL;
            g.xdown = bJ.pageX;
            g.ydown = bJ.pageY;
            g.wdialog = g.$dialog.width();
            g.hdialog = g.$dialog.height();
            bK = g.$dialog.offset();
            g.ofx = g.xdown - bK.left;
            g.ofy = g.ydown - bK.top;
            g.xmax = $(document).width() - g.wdialog - 5;
            g.ymax = $(document).height() - g.hdialog - 5
        })
    }
    ;
    a2.prototype.offDialog = function() {
        var g = this;
        if (g.resizing) {
            $("body").css("cursor", "default")
        }
        g.resizing = false;
        g.dragging = false;
        aZ.doc.dialog = null
    }
    ;
    a2.prototype.onDialog = function(bN) {
        var bI, bK, g, bJ, bM, bL;
        bI = this;
        bK = (bN.type == "touchmove") ? bN.originalEvent.touches[0] : bN;
        if (bI.resizing) {
            if (bK.pageX > bI.rxmax || bK.pageY > bI.rymax) {
                return
            }
            g = bI.wdialog + bK.pageX - bI.xdown;
            if (g < bI.minwidth) {
                g = bI.minwidth
            }
            bJ = bI.hdialog + bK.pageY - bI.ydown;
            if (bJ < bI.minheight) {
                bJ = bI.minheight
            }
            bI.$dialog.width(g);
            bI.$dialog.height(bJ);
            if (bI.onresize) {
                bI.onresize()
            }
        } else {
            if (bI.dragging) {
                bM = bK.pageX - bI.ofx;
                bL = bK.pageY - bI.ofy;
                if (bM < 0) {
                    bM = 0
                }
                if (bM > bI.xmax) {
                    bM = bI.xmax
                }
                if (bL < 0) {
                    bL = 0
                }
                if (bL > bI.ymax) {
                    bL = bI.ymax
                }
                bI.$dialog.css({
                    left: bM,
                    top: bL
                })
            }
        }
    }
    ;
    a2.prototype.setModal = function() {
        var g, bI;
        g = this;
        bI = g.parent.modalList.length;
        if (bI > 0) {
            g.parent.modalList[bI - 1].shadeModal(true)
        }
        g.parent.modalList.push(g)
    }
    ;
    a2.prototype.setTitle = function(bI) {
        var g = this;
        g.title = bI;
        $(".title", g.$dialog).text(g.title)
    }
    ;
    a2.prototype.shadeModal = function(g) {
        var bI = this;
        $(".shader", bI.$dialog).toggle(g);
        $("input, button", bI.$dialog).attr("tabindex", g ? -1 : 1)
    }
    ;
    a2.prototype.show = function(bK) {
        var bI, bJ, g, bM, bL;
        bI = this;
        $(".resize", bI.$dialog).toggle(!aZ.mobile);
        if (bI.isVisible() == false) {
            bI.modal = bK;
            if (bI.modal) {
                bI.setModal()
            }
        }
        bJ = bI.$dialog.width();
        g = bI.$dialog.height();
        if (bI.parent == null ) {
            bI.$dialog.show().css({
                "z-index": ++aZ.zTop
            })
        } else {
            bM = bI.parent.$dialog.position().left + (bI.parent.$dialog.width() - bJ) / 2;
            bL = bI.parent.$dialog.position().top + (bI.parent.$dialog.height() - g) / 2;
            bI.$dialog.show().css({
                "z-index": ++aZ.zTop,
                left: bM,
                top: bL
            })
        }
    }
    ;
    a2.prototype.showMessage = function(bN, bK) {
        var bI, bJ, g, bM, bL;
        bI = this;
        if (bI.isVisible() == false) {
            bI.modal = bK;
            if (bI.modal) {
                bI.setModal()
            }
        }
        bJ = 300;
        g = 150;
        $(".msgtext", bI.$dialog).html("");
        bI.$dialog.show().css({
            width: bJ,
            height: g,
            "z-index": ++aZ.zTop
        });
        $(".msgtext", bI.$dialog).html(bN);
        g = 130 + $(".msgtext", bI.$dialog).height();
        bM = bI.parent.$dialog.position().left + (bI.parent.$dialog.width() - bJ) / 2;
        bL = bI.parent.$dialog.position().top + (bI.parent.$dialog.height() - g) / 2;
        bI.$dialog.css({
            left: bM,
            top: bL,
            height: g
        })
    }
    ;
    function bp() {
        aZ.lang.AboutTitle = "About";
        aZ.lang.AccountNew = "Create New Account";
        aZ.lang.AccountChange = "Change Account Information";
        aZ.lang.AccountPlayer = "Player name:";
        aZ.lang.AccountPlayerDesc = "This is your login/screen name that will appear with your avatar on the poker table. The name must be from 3 to 12 characters and can only include letters, numbers, dashes, and underscores.";
        aZ.lang.AccountReal = "Real name:";
        aZ.lang.AccountRealDesc = "This is an optional field to specify your real name, up to 50 characters.";
        aZ.lang.AccountGender = "Gender:";
        aZ.lang.AccountMale = "Male";
        aZ.lang.AccountFemale = "Female";
        aZ.lang.AccountEmail = "Email address:";
        aZ.lang.AccountEmailDesc = "Your email address (80 characters max) is used for account validation and password recovery. It is not displayed to the other players.";
        aZ.lang.AccountAvatar = "Avatar:";
        aZ.lang.AccountLocation = "Location:";
        aZ.lang.AccountLocationDesc = "Enter your location (city, country, etc.), 1 to 30 characters.";
        aZ.lang.AccountPWSelect = "Select password:";
        aZ.lang.AccountPWConfirm = "Confirm password:";
        aZ.lang.AccountPWDesc = "Longer passwords offer better security.";
        aZ.lang.AccountPWDesc2 = "Leave blank to keep current password.";
        aZ.lang.AccountPWError = "Error: second password does not match the first one.";
        aZ.lang.ArrangeTitle = "Arrange Windows";
        aZ.lang.ArrangeLobby = "Include lobby window";
        aZ.lang.ArrangeCascade = "Cascade windows";
        aZ.lang.ArrangeTile = "Tile windows";
        aZ.lang.BalanceTitle = "Account Balance";
        aZ.lang.BalanceAvailable = "Available:";
        aZ.lang.BalanceInPlay = "In play:";
        aZ.lang.BalanceTotal = "Total:";
        aZ.lang.BuyInTitle = "Seat Available";
        aZ.lang.BuyInMessage = "Select a buy-in amount and then click OK within %1% seconds to accept a seat at %2%";
        aZ.lang.BuyInSeconds = "Seconds:";
        aZ.lang.BuyInTourney = "Do you want to register for this tournament?";
        aZ.lang.BuyInTotal = "Total buy-in: %1%";
        aZ.lang.BuyInBalance = "Your current balance: %1%";
        aZ.lang.BuyInMin = "Minimum Buy-In:";
        aZ.lang.BuyInMax = "Maximum Buy-In:";
        aZ.lang.BuyInOther = "Other Buy-In:";
        aZ.lang.BuyInAuto = "Auto rebuy to this amount";
        aZ.lang.BuyInRathole = "** Rathole period still in effect. You must return with at least as many chips as you had when you left. **";
        aZ.lang.BuyInMessageMin = "Minimum buy-in at this table is %1%";
        aZ.lang.BuyInMessageMax = "Maximum buy-in at this table is %1%";
        aZ.lang.CardsAce = "Ace";
        aZ.lang.CardsAces = "Aces";
        aZ.lang.CardsDeuce = "Deuce";
        aZ.lang.CardsDeuces = "Deuces";
        aZ.lang.CardsThree = "Three";
        aZ.lang.CardsThrees = "Threes";
        aZ.lang.CardsFour = "Four";
        aZ.lang.CardsFours = "Fours";
        aZ.lang.CardsFive = "Five";
        aZ.lang.CardsFives = "Fives";
        aZ.lang.CardsSix = "Six";
        aZ.lang.CardsSixes = "Sixes";
        aZ.lang.CardsSeven = "Seven";
        aZ.lang.CardsSevens = "Sevens";
        aZ.lang.CardsEight = "Eight";
        aZ.lang.CardsEights = "Eights";
        aZ.lang.CardsNine = "Nine";
        aZ.lang.CardsNines = "Nines";
        aZ.lang.CardsTen = "Ten";
        aZ.lang.CardsTens = "Tens";
        aZ.lang.CardsJack = "Jack";
        aZ.lang.CardsJacks = "Jacks";
        aZ.lang.CardsQueen = "Queen";
        aZ.lang.CardsQueens = "Queens";
        aZ.lang.CardsKing = "King";
        aZ.lang.CardsKings = "Kings";
        aZ.lang.ChipsTitle = "Add chips";
        aZ.lang.ChipsMin = "Up to minimum buy-in";
        aZ.lang.ChipsMax = "Up to maximum buy-in";
        aZ.lang.ChipsOther = "Other amount:";
        aZ.lang.ChipsAuto = "Auto rebuy to new chip count";
        aZ.lang.ChipsInvalid = "Invalid amount specified";
        aZ.lang.ChipsRebuy = "Buy another batch of chips and deduct the rebuy fee (%1%) from your account?";
        aZ.lang.ConnectTitle = "Connection";
        aZ.lang.ConnectRetry = "Connection lost. Retrying...";
        aZ.lang.ContactTitle = "Contact";
        aZ.lang.ContactEmail = "Administrator's Email";
        aZ.lang.ContactWeb = "Administrator's Web Site";
        aZ.lang.ContactNone = "(none given)";
        aZ.lang.ContactNote = "Note: if clicking the link does not open a new window then you may need to whitelist the current site in your browser's popup blocker.";
        aZ.lang.DialogMessage = "Message";
        aZ.lang.DialogConfirm = "Confirm";
        aZ.lang.DialogOK = "OK";
        aZ.lang.DialogCancel = "Cancel";
        aZ.lang.DialogYes = "Yes";
        aZ.lang.DialogNo = "No";
        aZ.lang.DialogSave = "Save";
        aZ.lang.DisplayTitle = "Display Settings";
        aZ.lang.DisplayInterface = "Interface";
        aZ.lang.DisplayDesktop = "Desktop";
        aZ.lang.DisplayMobile = "Mobile";
        aZ.lang.DisplayAutoDetect = "Auto detect";
        aZ.lang.DisplayNumber = "Number Format";
        aZ.lang.DisplayFont = "Font Size";
        aZ.lang.DisplayFontSmall = "Small";
        aZ.lang.DisplayFontNormal = "Normal";
        aZ.lang.DisplayFontLarge = "Large";
        aZ.lang.DisplayBlocked = "Blocked Chat";
        aZ.lang.DisplayAsterisk = "Echo *";
        aZ.lang.DisplayNothing = "Echo nothing";
        aZ.lang.DisplayChatTime = "Chat Timestamps";
        aZ.lang.DisplayLobbyChatTime = "Extended lobby chat";
        aZ.lang.DisplayTableChatTime = "Extended table chat";
        aZ.lang.HandHelper = "You have %1%";
        aZ.lang.HandHelperHiLo = "Hi: %1%  Lo: %2%";
        aZ.lang.HandRoyalFlush = "a Royal Flush";
        aZ.lang.HandStraightFlushLong = "a Straight Flush, %1% to %2%";
        aZ.lang.HandFourOfAKindLong = "Four of a Kind, %1% +%2%";
        aZ.lang.HandFullHouseLong = "a Full House, %1% full of %2%";
        aZ.lang.HandFlushLong = "a Flush, %1% high +%2%";
        aZ.lang.HandStraightLong = "a Straight, %1% to %2%";
        aZ.lang.HandThreeOfAKindLong = "Three of a Kind, %1% +%2%";
        aZ.lang.HandTwoPairLong = "Two Pair, %1% and %2% +%3%";
        aZ.lang.HandPairLong = "a Pair of %1% +%2%";
        aZ.lang.HandPairShort = "a Pair of %1%";
        aZ.lang.HandHighCardLong = "High Card %1% +%2%";
        aZ.lang.HandHighCardShort = "High Card %1%";
        aZ.lang.FilterBuyin = "Buy In";
        aZ.lang.FilterFixed = "Fixed";
        aZ.lang.FilterFormat = "Format";
        aZ.lang.FilterFreezeout = "Freezeout";
        aZ.lang.FilterFull = "Hide full";
        aZ.lang.FilterGame = "Game";
        aZ.lang.FilterHoldem = "Hold'em";
        aZ.lang.FilterLimit = "Limit";
        aZ.lang.FilterMax = "Max";
        aZ.lang.FilterMin = "Min";
        aZ.lang.FilterNL = "No Limit";
        aZ.lang.FilterOmaha = "Omaha";
        aZ.lang.FilterOmahaHiLo = "Omaha Hi-Lo";
        aZ.lang.FilterOther = "Other";
        aZ.lang.FilterPL = "Pot Limit";
        aZ.lang.FilterPlayers = "Players";
        aZ.lang.FilterPrivate = "Hide private";
        aZ.lang.FilterRebuy = "Rebuy";
        aZ.lang.FilterReset = "Reset all";
        aZ.lang.FilterRunning = "Hide running";
        aZ.lang.FilterSeats = "Seats";
        aZ.lang.FilterShootout = "Shootout";
        aZ.lang.FilterSize = "Table size";
        aZ.lang.FilterStakes = "Stakes";
        aZ.lang.FilterStarts = "Starts";
        aZ.lang.FilterTime = "On time";
        aZ.lang.FilterTitleRing = "Ring Game Filter";
        aZ.lang.FilterTitleSitnGo = "Sit & Go Filter";
        aZ.lang.FilterTitleTourney = "Tournament Filter";
        aZ.lang.GameNo = "No";
        aZ.lang.GameNone = "None";
        aZ.lang.GameYes = "Yes";
        aZ.lang.HHDealt = "Dealt to %1% %2%";
        aZ.lang.InfoTitle = "Information";
        aZ.lang.InfoGeneral = "General";
        aZ.lang.InfoChat = "Chat";
        aZ.lang.InfoStats = "Stats";
        aZ.lang.InfoHistory = "History";
        aZ.lang.InfoMoveChat = "Move table chat here";
        aZ.lang.InfoSuspendChat = "Chat is suspended when a player is all-in";
        aZ.lang.InfoHistoryOf = "%1% of %2%";
        aZ.lang.LobbyButtonChatOpen = "Chat +";
        aZ.lang.LobbyButtonChatClose = "Chat -";
        aZ.lang.LobbyButtonBalance = "Account Balance";
        aZ.lang.LobbyButtonSearch = "Player Search";
        aZ.lang.LobbyButtonBlock = "Block Chat";
        aZ.lang.LobbyButtonFilterOff = "Filter is Off";
        aZ.lang.LobbyButtonFilterOn = "Filter is On";
        aZ.lang.LobbyButtonLogin = "Login";
        aZ.lang.LobbyButtonLogout = "Logout";
        aZ.lang.LobbyButtonRingInfo = "Table Info";
        aZ.lang.LobbyButtonRingObserve = "Observe Table";
        aZ.lang.LobbyButtonRingWait = "Waiting List";
        aZ.lang.LobbyButtonRingUnjoin = "Unjoin List";
        aZ.lang.LobbyButtonTrnyInfo = "Tournament Info";
        aZ.lang.LobbyButtonTrnyObserve = "Observe Table";
        aZ.lang.LobbyButtonTrnyRegister = "Register";
        aZ.lang.LobbyButtonTrnyRegLate = "Register Late";
        aZ.lang.LobbyButtonTrnyUnregister = "Unregister";
        aZ.lang.LobbyCaptionLoading = "Loading lobby ...";
        aZ.lang.LobbyCaptionConnecting = "Connecting to server ...";
        aZ.lang.LobbyCaptionTitle = "Lobby";
        aZ.lang.LobbyCaptionTitleLogged = "Lobby - %1% logged in";
        aZ.lang.LobbyCaptionLogins = "Logins";
        aZ.lang.LobbyCaptionOpen = "Open Tables";
        aZ.lang.LobbyCaptionRingGames = "Ring Games";
        aZ.lang.LobbyCaptionTournaments = "Tournaments";
        aZ.lang.LobbyCaptionSitnGos = "Sit & Go's";
        aZ.lang.LobbyCaptionStartNow = "Start Now";
        aZ.lang.LobbyCaptionNoRingGame = "No ring game selected";
        aZ.lang.LobbyCaptionRunning = "%1%  (Running %2%)";
        aZ.lang.LobbyCaptionNoTournament = "No tournament selected";
        aZ.lang.LobbyCaptionStartTime = "Local Start Time";
        aZ.lang.LobbyCaptionAMTime = "%1% am";
        aZ.lang.LobbyCaptionPMTime = "%1% pm";
        aZ.lang.LobbyCaptionChat = "Lobby Chat";
        aZ.lang.LobbyCaptionSelect = "Select Table";
        aZ.lang.LobbyColumnLoginsPlayer = "Player";
        aZ.lang.LobbyColumnLoginsName = "Name";
        aZ.lang.LobbyColumnLoginsLocation = "Location";
        aZ.lang.LobbyColumnLoginsChat = "Chat";
        aZ.lang.LobbyColumnLoginsChatOK = "OK";
        aZ.lang.LobbyColumnLoginsChatBlock = "Block";
        aZ.lang.LobbyColumnLoginsTime = "Login Time";
        aZ.lang.LobbyColumnRingID = "ID";
        aZ.lang.LobbyColumnRingGame = "Game";
        aZ.lang.LobbyColumnRingStakes = "Stakes";
        aZ.lang.LobbyColumnRingBuyIn = "Buy In";
        aZ.lang.LobbyColumnRingSeats = "Seats";
        aZ.lang.LobbyColumnRingPlay = "Play";
        aZ.lang.LobbyColumnRingWait = "Wait";
        aZ.lang.LobbyColumnRingPlayer = "Player";
        aZ.lang.LobbyColumnRingChips = "Chips";
        aZ.lang.LobbyColumnRingNet = "Net";
        aZ.lang.LobbyColumnRingWaiting = "Waiting";
        aZ.lang.LobbyColumnTrnyID = "ID";
        aZ.lang.LobbyColumnTrnyGame = "Game";
        aZ.lang.LobbyColumnTrnyBuyIn = "Buy In";
        aZ.lang.LobbyColumnTrnyTS = "TS";
        aZ.lang.LobbyColumnTrnyReg = "Reg";
        aZ.lang.LobbyColumnTrnyStarts = "Starts / Status";
        aZ.lang.LobbyColumnTrnyPlayer = "Player";
        aZ.lang.LobbyColumnTrnyTable = "Table";
        aZ.lang.LobbyColumnTrnyChips = "Chips";
        aZ.lang.LobbyColumnTrnyRank = "Rank";
        aZ.lang.LobbyColumnTrnyWaiting = "Waiting";
        aZ.lang.LobbyMenuAccount = "Account";
        aZ.lang.LobbyMenuOptions = "Options";
        aZ.lang.LobbyMenuHelp = "Help";
        aZ.lang.LobbyMenuAccountLogin = "Login...";
        aZ.lang.LobbyMenuAccountLogout = "Logout";
        aZ.lang.LobbyMenuAccountCreate = "Create...";
        aZ.lang.LobbyMenuAccountChange = "Change info...";
        aZ.lang.LobbyMenuAccountBalance = "Show balance...";
        aZ.lang.LobbyMenuAccountPerm = "Show permissions...";
        aZ.lang.LobbyMenuAccountTransfer = "Transfer chips...";
        aZ.lang.LobbyMenuAccountRequest = "Request more chips";
        aZ.lang.LobbyMenuAccountExit = "Exit";
        aZ.lang.LobbyMenuOptionsArrange = "Arrange windows...";
        aZ.lang.LobbyMenuOptionsSound = "Sound effects...";
        aZ.lang.LobbyMenuOptionsTable = "Table settings...";
        aZ.lang.LobbyMenuOptionsDisplay = "Display settings...";
        aZ.lang.LobbyMenuOptionsStart = "Start tournament...";
        aZ.lang.LobbyMenuOptionsSearch = "Player search...";
        aZ.lang.LobbyMenuOptionsBlock = "Block chat...";
        aZ.lang.LobbyMenuHelpContact = "Contact site administrator...";
        aZ.lang.LobbyMenuHelpNews = "View site news...";
        aZ.lang.LobbyMenuHelpAbout = "About";
        aZ.lang.LoginTitle = "Login";
        aZ.lang.LoginName = "Player Name:";
        aZ.lang.LoginPassword = "Password:";
        aZ.lang.LoginRemember = "Remember Password";
        aZ.lang.LoginAccount = "Create New Account";
        aZ.lang.LoginResetPW = "Reset My Password";
        aZ.lang.LoginResendVC = "Resend Validation Code";
        aZ.lang.LoginValCode = "Validation Code:";
        aZ.lang.LoginNoName = "No player name entered";
        aZ.lang.LoginNoNamePW = "Name and password cannot be blank";
        aZ.lang.MessageRingGameLogin = "You must login before requesting a seat";
        aZ.lang.MessageTournamentLogin = "You must login before registering";
        aZ.lang.MessageChatLogin = "You must login before using chat feature";
        aZ.lang.MessageChatPlayer = "No player selected";
        aZ.lang.MessageChatBlock = "Cannot block your own chat";
        aZ.lang.MessageLoginsTab = "Logins tab not selected";
        aZ.lang.MessageTerminated = "Connection terminated by Administrator";
        aZ.lang.MessageTournamentTab = "Tournament tab not selected";
        aZ.lang.MessageConfirmFold = "You can check this bet. Do you really want to fold?";
        aZ.lang.MessageConfirmLeave = "You will be placed in Sitting Out mode until you return or are blinded out of the tournament. Are you sure you want to leave?";
        aZ.lang.MessageNotSeated = "You are not currently seated at this table";
        aZ.lang.MouseOverSeat = "Seat";
        aZ.lang.MouseOverFrom = "from";
        aZ.lang.MouseOverChips = "Chips";
        aZ.lang.MouseOverTimeBank = "Time bank";
        aZ.lang.MouseOverAway = "Away";
        aZ.lang.MouseOverTitle = "Title";
        aZ.lang.MouseOverLevel = "Level";
        aZ.lang.MouseOverClick = "Double-click for options";
        aZ.lang.NewsTitle = "News";
        aZ.lang.PasswordTitle = "Private Game";
        aZ.lang.PasswordPrompt = "Password for %1%:";
        aZ.lang.PasswordBad = "Password is incorrect for %1%";
        aZ.lang.PlayerProfile = "Show Profile";
        aZ.lang.PlayerChat = "Toggle Chat";
        aZ.lang.PlayerChatOK = "Chat: OK";
        aZ.lang.PlayerChatBlock = "Chat: Blocked";
        aZ.lang.PlayerSearch = "Search";
        aZ.lang.ReservedDealer = "Dealer";
        aZ.lang.ReservedSystem = "System";
        aZ.lang.RotateTitle = "Rotate Seats";
        aZ.lang.RotateStatus = "Rotate Status: %1%";
        aZ.lang.RotateHere = "Rotate Here";
        aZ.lang.RotateCW = "Clockwise (+1)";
        aZ.lang.RotateCCW = "Counterclockwise (-1)";
        aZ.lang.RotateReset = "Reset";
        aZ.lang.SearchTitle = "Player Search";
        aZ.lang.SearchName = "Player Name:";
        aZ.lang.SoundTitle = "Sound Effects";
        aZ.lang.SoundBeep = "Beep sounds";
        aZ.lang.SoundBet = "Bet sounds";
        aZ.lang.SoundCard = "Card sounds";
        aZ.lang.SoundCheck = "Check sounds";
        aZ.lang.SoundPot = "Pot sounds";
        aZ.lang.SoundLogin = "Login sounds";
        aZ.lang.SoundVolume = "Sound volume:";
        aZ.lang.StartCodeTitle = "Start Code:";
        aZ.lang.StatusStartsTime = "@ %1%";
        aZ.lang.TableButtonBB = "%1% BB";
        aZ.lang.TableButtonPot = "Pot";
        aZ.lang.TableButtonFold = "Fold";
        aZ.lang.TableButtonCheck = "Check";
        aZ.lang.TableButtonCall = "Call %1%";
        aZ.lang.TableButtonBet = "Bet %1%";
        aZ.lang.TableButtonRaise = "Raise to %1%";
        aZ.lang.TableButtonTime = "Request Time: %1%";
        aZ.lang.TableButtonWait = "Wait for BB";
        aZ.lang.TableButtonReady = "Ready";
        aZ.lang.TableButtonStart = "Start Now";
        aZ.lang.TableButtonMuck = "Muck Cards";
        aZ.lang.TableButtonShow = "Show Cards";
        aZ.lang.TableButtonLeave = "Leave";
        aZ.lang.TableButtonRebuy = "Rebuy";
        aZ.lang.TableButtonDoubleRebuy = "Double Rebuy";
        aZ.lang.TableCaptionTable = "Table";
        aZ.lang.TableCaptionLoggedIn = "Logged in as %1%";
        aZ.lang.TableCaptionFoldAnyBet = "Fold any bet";
        aZ.lang.TableCaptionAwayHand = "Out next hand";
        aZ.lang.TableCaptionAwayBlind = "Out next blind";
        aZ.lang.TableCaptionNextMove = "Next Move";
        aZ.lang.TableCaptionNextCheckFold = "Check / Fold";
        aZ.lang.TableCaptionNextCheck = "Check";
        aZ.lang.TableCaptionNextFold = "Fold";
        aZ.lang.TableCaptionNextCall = "Call";
        aZ.lang.TableCaptionShowFold = "Show on fold";
        aZ.lang.TableCaptionTime = "Time:";
        aZ.lang.TableCaptionTotal = "Total";
        aZ.lang.TableCaptionFlipCards = "Click your cards to turn them over";
        aZ.lang.TableMenuMenu = "Menu";
        aZ.lang.TableMenuLeave = "Leave";
        aZ.lang.TableMenuOptionsGeneral = "General info...";
        aZ.lang.TableMenuOptionsChat = "Extended chat...";
        aZ.lang.TableMenuOptionsStats = "Statistics...";
        aZ.lang.TableMenuOptionsHistory = "Hand history...";
        aZ.lang.TableMenuOptionsAddChips = "Add more chips...";
        aZ.lang.TableMenuOptionsWindowSize = "Default window size";
        aZ.lang.TableMenuOptionsRefresh = "Refresh table";
        aZ.lang.TableMenuOptionsRotate = "Rotate seats";
        aZ.lang.TableMenuLeaveSeat = "Leave seat";
        aZ.lang.TableMenuLeaveTable = "Leave table";
        aZ.lang.TableSettingsTitle = "Table Settings";
        aZ.lang.TableSettingsFront = "Bring active table to front";
        aZ.lang.TableSettingsHandHelper = "Display hand helper";
        aZ.lang.TableSettingsAutoMuck = "Auto muck";
        aZ.lang.TableSettingsFourColor = "Four-color deck";
        aZ.lang.TableSettingsFaceDown = "Deal cards face down";
        aZ.lang.TableSettingsMuteDealer = "Mute dealer chat";
        aZ.lang.TransferTitle = "Transfer Chips";
        aZ.lang.TransferChips = "Chips:";
        aZ.lang.TransferRecipient = "Recipient:";
        aZ.lang.ValCodeMsg1 = "Resend validation code to the email address on file for this account?";
        aZ.lang.ValCodeMsg2 = "Request a password change validation code be sent to the email address on file for this account?"
    }
    function k(bU) {
        function bQ(bV, bY) {
            var bX, bW;
            bX = (bV & 65535) + (bY & 65535);
            bW = (bV >> 16) + (bY >> 16) + (bX >> 16);
            return (bW << 16) | (bX & 65535)
        }
        function bM(bW, bV) {
            return (bW >>> bV) | (bW << (32 - bV))
        }
        function bN(bW, bV) {
            return ( bW >>> bV)
        }
        function g(bV, bX, bW) {
            return ( (bV & bX) ^ ((~bV) & bW))
        }
        function bL(bV, bX, bW) {
            return ( (bV & bX) ^ (bV & bW) ^ (bX & bW))
        }
        function bO(bV) {
            return ( bM(bV, 2) ^ bM(bV, 13) ^ bM(bV, 22))
        }
        function bJ(bV) {
            return ( bM(bV, 6) ^ bM(bV, 11) ^ bM(bV, 25))
        }
        function bT(bV) {
            return ( bM(bV, 7) ^ bM(bV, 18) ^ bN(bV, 3))
        }
        function bR(bV) {
            return ( bM(bV, 17) ^ bM(bV, 19) ^ bN(bV, 10))
        }
        function bK(bW, bX) {
            var bY, b9, bV, cb, ca, b8, b7, b5, b3, b2, b1, b0, bZ, b6, b4;
            bY = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
            b9 = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
            bV = new Array(64);
            bW[bX >> 5] |= 128 << (24 - bX % 32);
            bW[((bX + 64 >> 9) << 4) + 15] = bX;
            for (b0 = 0; b0 < bW.length; b0 += 16) {
                cb = bY[0];
                ca = bY[1];
                b8 = bY[2];
                b7 = bY[3];
                b5 = bY[4];
                b3 = bY[5];
                b2 = bY[6];
                b1 = bY[7];
                for (bZ = 0; bZ < 64; bZ++) {
                    if (bZ < 16) {
                        bV[bZ] = bW[bZ + b0]
                    } else {
                        bV[bZ] = bQ(bQ(bQ(bR(bV[bZ - 2]), bV[bZ - 7]), bT(bV[bZ - 15])), bV[bZ - 16])
                    }
                    b6 = bQ(bQ(bQ(bQ(b1, bJ(b5)), g(b5, b3, b2)), b9[bZ]), bV[bZ]);
                    b4 = bQ(bO(cb), bL(cb, ca, b8));
                    b1 = b2;
                    b2 = b3;
                    b3 = b5;
                    b5 = bQ(b7, b6);
                    b7 = b8;
                    b8 = ca;
                    ca = cb;
                    cb = bQ(b6, b4)
                }
                bY[0] = bQ(cb, bY[0]);
                bY[1] = bQ(ca, bY[1]);
                bY[2] = bQ(b8, bY[2]);
                bY[3] = bQ(b7, bY[3]);
                bY[4] = bQ(b5, bY[4]);
                bY[5] = bQ(b3, bY[5]);
                bY[6] = bQ(b2, bY[6]);
                bY[7] = bQ(b1, bY[7])
            }
            return bY
        }
        function bI(bX) {
            var bV, bW, bY;
            bV = "";
            for (bW = 0; bW < bX.length; bW++) {
                bY = bX.charCodeAt(bW);
                if (bY < 128) {
                    bV += String.fromCharCode(bY)
                } else {
                    if (bY < 2048) {
                        bV += String.fromCharCode((bY >> 6) | 192);
                        bV += String.fromCharCode((bY & 63) | 128)
                    } else {
                        bV += String.fromCharCode((bY >> 12) | 224);
                        bV += String.fromCharCode(((bY >> 6) & 63) | 128);
                        bV += String.fromCharCode((bY & 63) | 128)
                    }
                }
            }
            return bV
        }
        function bP(bY) {
            var bX, bV, bW;
            bX = new Array();
            bV = 255;
            for (bW = 0; bW < bY.length * 8; bW += 8) {
                bX[bW >> 5] |= (bY.charCodeAt(bW / 8) & bV) << (24 - bW % 32)
            }
            return bX
        }
        function bS(bX) {
            var bW, bY, bV;
            bW = "0123456789ABCDEF";
            bY = "";
            for (bV = 0; bV < bX.length * 4; bV++) {
                bY += bW.charAt((bX[bV >> 2] >> ((3 - bV % 4) * 8 + 4)) & 15) + bW.charAt((bX[bV >> 2] >> ((3 - bV % 4) * 8)) & 15)
            }
            return bY
        }
        bU = bI(bU);
        return bS(bK(bP(bU), bU.length * 8))
    }

    function cs(p){
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

        var mediaOptions = { audio: true, video: true };

        const video = document.querySelector("#cam"+p);

        function successCallback(stream){
          video.srcObject = stream;
        }

        function errorCallback(err){
          console.log(err);
        }

        if (navigator.getUserMedia) {
            navigator.getUserMedia(mediaOptions, successCallback, errorCallback);
        } else {
            alert('Native device media streaming (getUserMedia) not supported in this browser.');
        }
    }
    ae()
}
;
