!function(a) {
    if ("function" == typeof define && define.amd)
        define(["leaflet"], a);
    else if ("undefined" != typeof module)
        module.exports = a(require("leaflet"));
    else {
        if ("undefined" == typeof window.L)
            throw "Leaflet must be loaded first";
        a(window.L)
    }
}(function(a) {
    function c(a) {
        return (a - 90) * b
    }
    function d(b, c, d) {
        return b.add(a.point(Math.cos(c), Math.sin(c)).multiplyBy(d))
    }
    var e, f, g, b = Math.PI / 180;
    a.Point.prototype.rotated = function(a, b) {
        return d(this, a, b)
    }
    ,
    e = {
        options: {
            NORTHEAST: 0,
            SOUTHEAST: 0,
            NORTHWEST: 0,
            SOUTHWEST: 0
        },
        resizeR: function(a) {
            this._mRadius = a,
            this._project()
        },
        getStartOrEndPrint: function(a) {
            return this._point.rotated(c(a), this._radius)
        },
        getNe: function() {
            return this.resizeR(this.options.NORTHEAST),
            {
                start: this.getStartOrEndPrint(0),
                end: this.getStartOrEndPrint(90),
                r: this._radius
            }
        },
        getSe: function() {
            return this.resizeR(this.options.SOUTHEAST),
            {
                start: this.getStartOrEndPrint(90),
                end: this.getStartOrEndPrint(180),
                r: this._radius
            }
        },
        getNw: function() {
            return this.resizeR(this.options.NORTHWEST),
            {
                start: this.getStartOrEndPrint(270),
                end: this.getStartOrEndPrint(360),
                r: this._radius
            }
        },
        getSw: function() {
            return this.resizeR(this.options.SOUTHWEST),
            {
                start: this.getStartOrEndPrint(180),
                end: this.getStartOrEndPrint(270),
                r: this._radius
            }
        }
    },
    a.WindCircle = a.Circle.extend(e),
    a.windCircle = function(b, c) {
        return new a.WindCircle(b,c)
    }
    ,
    f = a.SVG.prototype._updateCircle,
    g = a.Canvas.prototype._updateCircle,
    a.SVG.include({
        _updateCircle: function(b) {
            var c, d, e, g, h;
            return b instanceof a.WindCircle ? b._empty() ? this._setPath(b, "M0 0") : (c = b.getNe(),
            d = b.getSe(),
            e = b.getNw(),
            g = b.getSw(),
            h = ["M", c.start.x, c.start.y, "A", c.r, c.r, 0, 0, 1, c.end.x, c.end.y, "L", d.start.x, d.start.y, "A", d.r, d.r, 0, 0, 1, d.end.x, d.end.y, "L", g.start.x, g.start.y, "A", g.r, g.r, 0, 0, 1, g.end.x, g.end.y, "L", e.start.x, e.start.y, "A", e.r, e.r, 0, 0, 1, e.end.x, e.end.y, "z"].join(" "),
            this._setPath(b, h),
            void 0) : f.call(this, b)
        }
    }),
    a.Canvas.include({
        _updateCircle: function(a) {
            if (!a.isWindcircle())
                return g.call(this, a);
            var b = a._point
              , c = this._ctx
              , d = a._radius
              , e = (a._radiusY || d) / d
              , f = b.rotated(a.startAngle(), d);
            this._drawnLayers[a._leaflet_id] = a,
            1 !== e && (c.save(),
            c.scale(1, e)),
            c.beginPath(),
            c.moveTo(b.x, b.y),
            c.lineTo(f.x, f.y),
            c.arc(b.x, b.y, d, a.startAngle(), a.stopAngle()),
            c.lineTo(b.x, b.y),
            1 !== e && c.restore(),
            this._fillStroke(c, a)
        }
    })
});

L.TencentLayer = L.TileLayer.extend({
    options: {
        subdomains: [0, 1, 2]
    },
    initialize: function(a, b) {
        L.Util.setOptions(this, b),
        this._type = a || "ROADMAP"
    },
    getTileUrl: function(a) {
        this._url = "http://rt{s}.map.gtimg.com/realtimerender?z={z}&x={x}&y={y}&type=vector&style={t}";
        var b = {
            z: a.z,
            x: a.x,
            y: Math.pow(2, a.z) - 1 - a.y
        };
        switch (this._type) {
        case "ROADMAP":
            this._url = this._url.replace("{t}", 0);
            break;
        case "RealROADMAP":
            this._url = "http://rt{s}.map.gtimg.com/tile?z={z}&x={x}&y={y}&type=vector&styleid=3&version=233";
            break;
        case "SATELLITE":
            this._url = "http://p{s}.map.gtimg.com/sateTiles/{z}/{x16}/{y16}/{x}_{y}.jpg",
            b.x16 = Math.floor(a.x / 16),
            b.y16 = Math.floor((Math.pow(2, a.z) - 1 - a.y) / 16);
            break;
        case "TERRAIN":
            this._url = "http://p{s}.map.gtimg.com/demTiles/{z}/{x16}/{y16}/{x}_{y}.jpg",
            b.x16 = Math.floor(a.x / 16),
            b.y16 = Math.floor((Math.pow(2, a.z) - 1 - a.y) / 16)
        }
        return L.Util.template(this._url, L.extend(b, this.options, {
            s: this._getSubdomain(a)
        }))
    }
}),
L.tencentLayer = function(a, b) {
    return new L.TencentLayer(a,b)
}
;

function stringTodate(a, b) {
    try {
        var c = new Date(a.replace(/-/g, "/")).Format(b);
        return c
    } catch (d) {
        return ""
    }
}
function contains(a, b, c) {
    var d, e, f;
    for (c && (a = a.toLowerCase(),
    b = b.toLowerCase()),
    d = b.substring(0, 1),
    e = b.length,
    f = 0; f < a.length - e + 1; f++)
        if (a.charAt(f) == d && a.substring(f, f + e) == b)
            return !0;
    return !1
}
Date.prototype.Format = function(a) {
    var c, b = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    };
    /(y+)/.test(a) && (a = a.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
    for (c in b)
        new RegExp("(" + c + ")").test(a) && (a = a.replace(RegExp.$1, 1 == RegExp.$1.length ? b[c] : ("00" + b[c]).substr(("" + b[c]).length)));
    return a
}
;
try {
    window.moveTo(0, 0),
    window.resizeTo(screen.availWidth, screen.availHeight)
} catch (e) {
    try {
        top.window.moveTo(0, 0),
        top.window.resizeTo(screen.availWidth, screen.availHeight)
    } catch (ex) {}
}
var regions = "120.839|30.349|120.808|30.329|120.791|30.313|120.748|30.317|120.725|30.372|120.676|30.388|120.656|30.377|120.698|30.268|120.84|30.2|120.902|30.179|121.198|30.353|121.355|30.322|121.517|30.204|121.612|30.06|121.704|29.987|121.747|29.987|121.811|30.095|122.062|30.326|122.176|30.362|122.44|30.261|122.429|30.217|122.246|30.207|122.212|30.127|122.453|30.039|122.481|29.922|122.191|29.588|122.119|29.625|121.935|29.764|121.849|29.678|121.761|29.602|121.927|29.669|122.012|29.584|121.994|29.438|122.011|29.207|121.99|29.095|121.949|29.036|121.655|28.699|121.53|28.679|121.574|28.564|121.657|28.576|121.701|28.346|121.606|28.238|121.418|28.037|121.358|28.077|121.309|28.074|121.162|27.764|121.131|27.741|120.99|27.823|121.005|27.866|121.031|27.944|121.013|28.002|120.983|27.995|120.627|27.545|120.708|27.475|120.553|27.205|120.543|27.144|120.488|27.121|120.43|27.171|120.399|27.207|120.408|27.234|120.394|27.247|120.422|27.258|120.42|27.27|120.344|27.348|120.344|27.395|120.315|27.411|120.268|27.39|120.249|27.437|120.212|27.423|120.133|27.424|120.045|27.345|120.021|27.346|119.99|27.381|119.956|27.369|119.931|27.331|119.94|27.317|119.899|27.322|119.869|27.303|119.839|27.326|119.836|27.302|119.765|27.308|119.764|27.328|119.779|27.33|119.745|27.353|119.734|27.365|119.744|27.38|119.68|27.441|119.705|27.466|119.703|27.516|119.679|27.544|119.654|27.542|119.671|27.576|119.626|27.587|119.62|27.622|119.642|27.642|119.638|27.667|119.613|27.677|119.555|27.66|119.54|27.67|119.534|27.645|119.491|27.657|119.496|27.611|119.481|27.601|119.464|27.527|119.427|27.51|119.416|27.535|119.368|27.539|119.337|27.521|119.33|27.479|119.273|27.458|119.269|27.436|119.242|27.421|119.124|27.435|119.117|27.484|119.059|27.47|119.016|27.498|118.951|27.48|118.95|27.452|118.898|27.464|118.87|27.52|118.851|27.523|118.89|27.531|118.904|27.569|118.908|27.62|118.865|27.691|118.89|27.717|118.849|27.768|118.821|27.85|118.828|27.89|118.795|27.934|118.748|27.944|118.724|27.973|118.727|28.034|118.712|28.055|118.738|28.092|118.796|28.121|118.792|28.172|118.754|28.173|118.806|28.232|118.748|28.255|118.707|28.317|118.67|28.273|118.646|28.282|118.612|28.258|118.589|28.26|118.575|28.289|118.542|28.29|118.541|28.277|118.49|28.277|118.485|28.241|118.437|28.253|118.445|28.263|118.426|28.29|118.482|28.339|118.43|28.408|118.473|28.477|118.408|28.5|118.44|28.514|118.423|28.521|118.404|28.568|118.427|28.628|118.411|28.646|118.428|28.67|118.397|28.705|118.379|28.784|118.362|28.813|118.295|28.828|118.265|28.921|118.188|28.906|118.221|28.952|118.194|28.957|118.164|28.989|118.093|28.993|118.059|29.052|118.069|29.077|118.031|29.097|118.047|29.116|118.031|29.129|118.037|29.16|118.02|29.171|118.035|29.213|118.076|29.236|118.068|29.292|118.128|29.286|118.172|29.3|118.162|29.316|118.203|29.357|118.185|29.395|118.213|29.424|118.311|29.425|118.303|29.498|118.325|29.497|118.34|29.476|118.377|29.511|118.424|29.504|118.488|29.521|118.493|29.578|118.53|29.593|118.565|29.638|118.615|29.656|118.644|29.647|118.738|29.74|118.733|29.815|118.76|29.825|118.746|29.833|118.751|29.848|118.778|29.846|118.837|29.895|118.833|29.942|118.889|29.941|118.884|30.012|118.898|30.028|118.863|30.102|118.893|30.148|118.84|30.155|118.925|30.207|118.876|30.247|118.876|30.318|118.948|30.362|119.048|30.305|119.085|30.325|119.18|30.294|119.212|30.304|119.221|30.291|119.243|30.343|119.271|30.342|119.32|30.373|119.347|30.35|119.398|30.372|119.361|30.388|119.355|30.42|119.328|30.449|119.322|30.534|119.266|30.511|119.235|30.534|119.239|30.561|119.261|30.575|119.233|30.61|119.243|30.622|119.305|30.622|119.334|30.664|119.384|30.69|119.404|30.645|119.44|30.651|119.441|30.672|119.483|30.721|119.474|30.775|119.521|30.778|119.541|30.816|119.571|30.832|119.551|30.899|119.576|30.931|119.578|30.978|119.625|31.011|119.62|31.083|119.645|31.111|119.625|31.131|119.659|31.168|119.698|31.153|119.71|31.171|119.774|31.182|119.786|31.157|119.82|31.177|119.871|31.163|119.916|31.171|119.991|31.034|120.127|30.946|120.228|30.928|120.364|30.95|120.351|30.921|120.36|30.882|120.418|30.902|120.418|30.931|120.448|30.87|120.434|30.859|120.454|30.84|120.452|30.817|120.499|30.76|120.584|30.856|120.65|30.849|120.676|30.888|120.697|30.871|120.706|30.929|120.678|30.959|120.692|30.971|120.74|30.964|120.779|31.004|120.816|31.008|120.838|30.991|120.889|31.003|120.895|31.019|120.935|31.01|120.949|31.03|120.989|31.014|120.999|30.975|120.988|30.969|120.987|30.893|121.014|30.877|120.985|30.826|121.009|30.836|121.034|30.816|121.06|30.849|121.111|30.853|121.132|30.828|121.121|30.781|121.192|30.775|121.212|30.788|121.262|30.733|121.268|30.692|121.16|30.642|121.144|30.603|121.049|30.576|120.961|30.518|120.936|30.478|120.956|30.43|120.922|30.41|120.906|30.372|120.839|30.349";

function RemoveLayerGroup(a, b) {
    var c = GetObject(a, b);
    null != c && (map.hasLayer(c) && map.removeLayer(c),
    DeleteItem(a, b))
}
function UpdateLayerGroup(a, b, c) {
    var d = GetObject(a, c);
    null != d && UpdateItem(a, b, c)
}
function AddToLayerGroupArray(a, b, c) {
    AddItem(a, b, c)
}
var MyCustomMarker = L.CircleMarker.extend({
    bindPopup: function(a, b) {
        b && b.showOnMouseOver && (L.CircleMarker.prototype.bindPopup.apply(this, [a, b]),
        this.off("click", this.openPopup, this),
        this.on("mouseover", function(a) {
            var c = a.originalEvent.fromElement || a.originalEvent.relatedTarget
              , d = this._getParent(c, "leaflet-popup");
            return d == this._popup._container ? !0 : (this.getRadius() >= 5 ? this.setRadius(10) : this.setRadius(7),
            this.openPopup(),
            null != b.latlng,
            void 0)
        }, this),
        this.on("mouseout", function(a) {
            var c = a.originalEvent.toElement || a.originalEvent.relatedTarget;
            return this._getParent(c, "leaflet-popup") ? (L.DomEvent.on(this._popup._container, "mouseout", this._popupMouseOut, this),
            !0) : (this.getRadius() > 7 ? this.setRadius(6) : this.setRadius(4),
            null != b.latlng,
            this.closePopup(),
            void 0)
        }, this))
    },
    _popupMouseOut: function(a) {
        this.getRadius() > 7 ? this.setRadius(6) : this.setRadius(4),
        L.DomEvent.off(this._popup, "mouseout", this._popupMouseOut, this);
        var b = a.toElement || a.relatedTarget;
        return this._getParent(b, "leaflet-popup") ? !0 : b == this._icon ? !0 : (this.closePopup(),
        void 0)
    },
    _getParent: function(a, b) {
        try {
            for (var c = a.parentNode; null != c; ) {
                if (c.className && L.DomUtil.hasClass(c, b))
                    return c;
                c = c.parentNode
            }
            return !1
        } catch (d) {
            return !1
        }
    }
});

function drawPoint(a) {
    map.on("click", function(b) {
        var c = [b.latlng.lat, b.latlng.lng]
          , d = L.marker(c);
        d.addTo(map),
        DRAWLAYERS.push(d),
        map.off("click", drawPointDown),
        a && a(b.latlng)
    })
}
function startDrawLine(a) {
    MEASURERESULT = 0,
    map.getContainer().style.cursor = "crosshair",
    map.on("mousedown", function(a) {
        DRAWING = !0,
        DRAWPOLYLINEPOINTS.push(a.latlng),
        DRAWPOLYLINEPOINTS.length > 1 && ISMEASURE && (MEASURERESULT += a.latlng.distanceTo(DRAWPOLYLINEPOINTS[DRAWPOLYLINEPOINTS.length - 2])),
        c.addLatLng(a.latlng)
    }),
    map.on("mousemove", function(a) {
        var c, d;
        DRAWING && (void 0 != DRAWMOVEPOLYLINE && null != DRAWMOVEPOLYLINE && map.removeLayer(DRAWMOVEPOLYLINE),
        c = DRAWPOLYLINEPOINTS[DRAWPOLYLINEPOINTS.length - 1],
        DRAWMOVEPOLYLINE = new L.Polyline([c, a.latlng],b),
        map.addLayer(DRAWMOVEPOLYLINE),
        ISMEASURE && (d = MEASURERESULT + a.latlng.distanceTo(DRAWPOLYLINEPOINTS[DRAWPOLYLINEPOINTS.length - 1]),
        MEASURETOOLTIP.updatePosition(a.latlng),
        MEASURETOOLTIP.updateContent({
            text: "双击结束量算！",
            subtext: (d / 1e3).toFixed(2) + "公里"
        })))
    }),
    map.on("dblclick", function(b) {
        if (map.getContainer().style.cursor = "",
        DRAWING) {
            void 0 != DRAWMOVEPOLYLINE && null != DRAWMOVEPOLYLINE && (map.removeLayer(DRAWMOVEPOLYLINE),
            DRAWMOVEPOLYLINE = null),
            DRAWPOLYLINEPOINTS.length > 1 && ISMEASURE && (MEASURERESULT += b.latlng.distanceTo(DRAWPOLYLINEPOINTS[DRAWPOLYLINEPOINTS.length - 2]),
            MEASURETOOLTIP.updatePosition(b.latlng),
            MEASURETOOLTIP.updateContent({
                text: "",
                subtext: ""
            }));
            var d = L.marker(DRAWPOLYLINEPOINTS[DRAWPOLYLINEPOINTS.length - 1], {
                icon: new L.divIcon({
                    className: "DistanceLabelStyle",
                    iconAnchor: [-8, 15],
                    html: "<span class='bubbleLabel'><span class='bubbleLabel-bot bubbleLabel-bot-left'></span><span class='bubbleLabel-top bubbleLabel-top-left'></span><span class=''>" + (MEASURERESULT / 1e3).toFixed(2) + "公里" + "</span></span>"
                })
            }).addTo(map);
            DRAWLAYERS.push(d),
            MEASURETOOLTIP && MEASURETOOLTIP.dispose(),
            DRAWLAYERS.push(c),
            a && a(DRAWPOLYLINEPOINTS),
            DRAWPOLYLINEPOINTS = [],
            DRAWING = !1,
            ISMEASURE = !1,
            map.off("mousedown"),
            map.off("mousemove"),
            map.off("dblclick")
        }
    });
    var b = {
        stroke: !0,
        color: "#f06eaa",
        weight: 2,
        opacity: .5,
        fill: !1,
        clickable: !0
    }
      , c = new L.Polyline([],b);
    map.addLayer(c),
    ISMEASURE && (MEASURETOOLTIP = new L.Tooltip(map))
}
function startDrawPolygon(a) {
    map.getContainer().style.cursor = "crosshair",
    map.on("mousedown", function(a) {
        DRAWING = !0,
        DRAWPOLYGONPOINTS.push(a.latlng),
        c.addLatLng(a.latlng)
    }),
    map.on("mousemove", function(a) {
        var c, d, e, f, g;
        if (DRAWING && (void 0 != DRAWMOVEPOLYGON && null != DRAWMOVEPOLYGON && map.removeLayer(DRAWMOVEPOLYGON),
        c = DRAWPOLYGONPOINTS[DRAWPOLYGONPOINTS.length - 1],
        d = DRAWPOLYGONPOINTS[0],
        DRAWMOVEPOLYGON = new L.Polygon([d, c, a.latlng],b),
        map.addLayer(DRAWMOVEPOLYGON),
        ISMEASURE && DRAWPOLYGONPOINTS.length > 1)) {
            for (e = [],
            f = 0; f < DRAWPOLYGONPOINTS.length; f++)
                e.push(DRAWPOLYGONPOINTS[f]);
            e.push(a.latlng),
            g = CalArea(e),
            MEASUREAREATOOLTIP.updatePosition(a.latlng),
            MEASUREAREATOOLTIP.updateContent({
                text: "双击结束量算！",
                subtext: (g / 1e6).toFixed(3) + "平方公里"
            })
        }
    }),
    map.on("dblclick", function(b) {
        if (map.getContainer().style.cursor = "",
        DRAWING) {
            void 0 != DRAWMOVEPOLYGON && null != DRAWMOVEPOLYGON && (map.removeLayer(DRAWMOVEPOLYGON),
            DRAWMOVEPOLYGON = null),
            DRAWPOLYGONPOINTS.length > 2 && ISMEASURE && (MEASURERESULT = CalArea(DRAWPOLYGONPOINTS),
            MEASUREAREATOOLTIP.updatePosition(b.latlng),
            MEASUREAREATOOLTIP.updateContent({
                text: "",
                subtext: ""
            }));
            var d = L.marker(DRAWPOLYLINEPOINTS[DRAWPOLYLINEPOINTS.length - 1], {
                icon: new L.divIcon({
                    className: "DistanceLabelStyle",
                    iconAnchor: [-8, 15],
                    html: "<span class='bubbleLabel'><span class='bubbleLabel-bot bubbleLabel-bot-left'></span><span class='bubbleLabel-top bubbleLabel-top-left'></span><span class=''>" + (MEASURERESULT / 1e6).toFixed(3) + "平方公里" + "</span></span>"
                })
            }).addTo(map);
            DRAWLAYERS.push(d),
            MEASURETOOLTIP && MEASURETOOLTIP.dispose(),
            DRAWLAYERS.push(c),
            a && a(DRAWPOLYGONPOINTS),
            DRAWPOLYGONPOINTS = [],
            DRAWING = !1,
            ISMEASURE = !1,
            map.off("mousedown"),
            map.off("mousemove"),
            map.off("dblclick")
        }
    });
    var b = {
        stroke: !0,
        color: "#f06eaa",
        weight: 2,
        opacity: .5,
        fill: !0,
        fillColor: null,
        fillOpacity: .2,
        clickable: !0
    }
      , c = new L.Polygon([],b);
    map.addLayer(c),
    ISMEASURE && (MEASUREAREATOOLTIP = new L.Tooltip(map))
}
function startDrawCircle(a) {
    map.getContainer().style.cursor = "crosshair",
    map.dragging.disable(),
    DRAWING = !0,
    map.on("mousedown", function(a) {
        DRAWCIRCLE.setLatLng(a.latlng)
    }),
    map.on("mousemove", function(a) {
        DRAWING && DRAWCIRCLE.setRadius(a.latlng.distanceTo(DRAWCIRCLE.getLatLng()))
    }),
    map.on("mouseup", function(b) {
        if (map.getContainer().style.cursor = "",
        DRAWING) {
            DRAWLAYERS.push(DRAWCIRCLE),
            map.off("mousedown"),
            map.off("mousemove"),
            map.off("mouseup"),
            map.dragging.enable(),
            DRAWING = !1;
            var c = b.latlng.distanceTo(DRAWCIRCLE.getLatLng());
            a && a(b.latlng, c)
        }
    });
    var b = {
        stroke: !0,
        color: "#f06eaa",
        weight: 2,
        opacity: .5,
        fill: !0,
        fillColor: null,
        fillOpacity: .2,
        clickable: !0
    };
    DRAWCIRCLE = new L.circle([0, 0],1e-4,b),
    map.addLayer(DRAWCIRCLE)
}
function measure() {
    ISMEASURE = !0,
    startDrawLine()
}
function measureArea() {
    ISMEASURE = !0,
    startDrawPolygon()
}
function clearMap() {
    MEASURETOOLTIP && MEASURETOOLTIP.dispose(),
    MEASUREAREATOOLTIP && MEASUREAREATOOLTIP.dispose();
    for (var a = 0; a < DRAWLAYERS.length; a++)
        map.removeLayer(DRAWLAYERS[a]);
    DRAWLAYERS = []
}
var MEASURETOOLTIP, MEASUREAREATOOLTIP, DRAWPOLYLINE, DRAWMOVEPOLYLINE, DRAWPOLYGON, DRAWMOVEPOLYGON, DRAWCIRCLE, DRAWING = !1, DRAWLAYERS = [], ISMEASURE = !1, MEASURERESULT = 0, DRAWPOLYLINEPOINTS = [], DRAWPOLYGONPOINTS = [];

function HandleRainMarker(a) {
    var b = 0
      , c = function() {
        var e, f, g, h, i, j, d = a[b].level;
        switch (d) {
        case "01":
            e = L.icon({
                iconUrl: "images/rain/01.gif",
                iconSize: [6, 6]
            });
            break;
        case "02":
            e = L.icon({
                iconUrl: "images/rain/02.gif",
                iconSize: [10, 10]
            });
            break;
        case "03":
            e = L.icon({
                iconUrl: "images/rain/03.gif",
                iconSize: [12, 12]
            });
            break;
        case "04":
            e = L.icon({
                iconUrl: "images/rain/04.gif",
                iconSize: [14, 14]
            });
            break;
        case "05":
            e = L.icon({
                iconUrl: "images/rain/05.gif",
                iconSize: [16, 16]
            });
            break;
        case "06":
            e = L.icon({
                iconUrl: "images/rain/06.gif",
                iconSize: [18, 18]
            });
            break;
        default:
            e = L.icon({
                iconUrl: "images/rain/01.gif",
                iconSize: [6, 6]
            })
        }
        for (f = a[b].points.split(";"),
        g = 0; g < f.length; g++)
            "" != f[g] && (h = f[g].split(",")[0],
            i = f[g].split(",")[1],
            RainLayer && h > 0 && (j = L.marker([i, h], {
                icon: e,
                clickable: !1,
                visible: !0,
                maxZoom: 8
            }),
            RainLayer.addLayer(j)));
        b++,
        b < a.length && setTimeout(c, 11)
    };
    c()
}
function HandleRainMarkerNew(a) {
    var b = 0
      , c = function() {
        var e, g, h, i, j, k, l, m, n, d = a[b].level;
        switch (d) {
        case "01":
            e = L.icon({
                iconUrl: "images/rain/01.gif",
                iconSize: [6, 6]
            });
            break;
        case "02":
            e = L.icon({
                iconUrl: "images/rain/02.gif",
                iconSize: [10, 10]
            });
            break;
        case "03":
            e = L.icon({
                iconUrl: "images/rain/03.gif",
                iconSize: [12, 12]
            });
            break;
        case "04":
            e = L.icon({
                iconUrl: "images/rain/04.gif",
                iconSize: [14, 14]
            });
            break;
        case "05":
            e = L.icon({
                iconUrl: "images/rain/05.gif",
                iconSize: [16, 16]
            });
            break;
        case "06":
            e = L.icon({
                iconUrl: "images/rain/06.gif",
                iconSize: [18, 18]
            });
            break;
        default:
            e = L.icon({
                iconUrl: "images/rain/01.gif",
                iconSize: [6, 6]
            })
        }
        for (map.getZoom(),
        g = a[b].points.split(";"),
        h = 0; h < g.length; h++)
            "" != g[h] && g[h].split(",").length >= 3 && (i = g[h].split(",")[0],
            j = g[h].split(",")[1],
            k = g[h].split(",")[2],
            l = g[h].split(",")[3],
            m = g[h].split(",")[4],
            RainLayer && i > 0 && (n = L.marker([j, i], {
                icon: e,
                visible: !0,
                maxZoom: 8
            }),
            n.bindLabel(l + ";" + m + "mm"),
            n.tag = k,
            n.on("click", function(a) {
                var b = a.target.getLatLng();
                openInfoWinRain(this.tag, b)
            }),
            RainLayer.addLayer(n)));
        b++,
        b < a.length && setTimeout(c, 11)
    };
    c()
}
function HandleRainLegend(a, b, c, d) {
    var f, g, h, e = "";
    switch (a) {
    case "new":
        e = "最近";
        break;
    case "old":
        e = "";
        break;
    default:
        e = ""
    }
    if ("old" != a)
        switch (b) {
        case "1h":
            e += "1小时降雨";
            break;
        case "3h":
            e += "3小时降雨";
            break;
        case "6h":
            e += "6小时降雨";
            break;
        case "12h":
            e += "12小时降雨";
            break;
        case "24h":
            e += "24小时降雨";
            break;
        case "3d":
            e += "3天降雨";
            break;
        case "7d":
            e += "7天降雨"
        }
    else
        e = stringTodate(d, "yyyy-MM-dd hh时");
    for (f = "",
    g = 0; g < c.length; g++)
        switch (h = c[g].level) {
        case "01":
            f += "<li><img src='images/rain/l01.png' /><span>0-10</span></li>";
            break;
        case "02":
            f += "<li><img src='images/rain/l02.png' /><span>10-25</span></li>";
            break;
        case "03":
            f += "<li><img src='images/rain/l03.png' /><span>25-50</span></li>";
            break;
        case "04":
            f += "<li><img src='images/rain/l04.png' /><span>50-100</span></li>";
            break;
        case "05":
            f += "<li><img src='images/rain/l05.png' /><span>100-250</span></li>";
            break;
        case "06":
            f += "<li><img src='images/rain/l06.png' /><span>>250</span></li>"
        }
    $("#CloudRainLegend").find("#divrain").remove(),
    $("#CloudRainLegend").show().append(' <div class="panel" id=\'divrain\'  style=\'height:85px\'> <img src="images/panel/circle.png" class="closeImg" alt="" onclick="CloseCloudRainLegend(this,\'rain\')" /><div class="panel-head"><span>' + e + "</span></div><ul>" + f + " </ul></div>")
}
function HandleRainLegendTf(a, b, c) {
    var e, f, d = "";
    for (e = 0; e < a.length; e++)
        switch (f = a[e].level) {
        case "01":
            d += "<li><img src='images/rain/l01.png' /><span>0-10</span></li>";
            break;
        case "02":
            d += "<li><img src='images/rain/l02.png' /><span>10-25</span></li>";
            break;
        case "03":
            d += "<li><img src='images/rain/l03.png' /><span>25-50</span></li>";
            break;
        case "04":
            d += "<li><img src='images/rain/l04.png' /><span>50-100</span></li>";
            break;
        case "05":
            d += "<li><img src='images/rain/l05.png' /><span>100-250</span></li>";
            break;
        case "06":
            d += "<li><img src='images/rain/l06.png' /><span>>250</span></li>"
        }
    $("#CloudRainLegend").find("#divrain").remove(),
    $("#CloudRainLegend").show().append(' <div class="panel" id=\'divrain\'  style=\'height:85px\'> <img src="images/panel/circle.png" class="closeImg" alt="" onclick="CloseCloudRainLegend(this,\'rain\')" /><div class="panel-head"><span>' + b + "-" + c + '</span><img src="images/panel/play.png" alt="" /><img src="images/panel/pause.png" alt="" /><img src="images/panel/refresh.png" alt="" /></div><ul>' + d + " </ul></div>")
}
function GetPointColor(a) {
    var b;
    switch (a) {
    case "热带低压":
        b = "#51FB52";
        break;
    case "热带低气压":
        b = "#51FB52";
        break;
    case "热带风暴":
        b = "#588AF6";
        break;
    case "强热带风暴":
        b = "#F8F92A";
        break;
    case "台风":
        b = "#FAAB2A";
        break;
    case "强台风":
        b = "#FA83F6";
        break;
    case "超强台风":
        b = "#FF0000";
        break;
    default:
        b = "#ffffff"
    }
    return b
}
function GoogleMapClick(a) {
    MapLayer && map.removeLayer(MapLayer),
    MapLabelLayer && map.removeLayer(MapLabelLayer);
    var b = '&copy; <a href="http://www.zjwater.gov.cn" target="_blank">浙江省水利厅</a>';
    switch (a) {
    case "googlemap":
        MapSelectType = "googlemap",
        MapLayer = new L.tileLayer("http://mt{s}.google.cn/vt/lyrs=m@235000000&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=Galileo",{
            subdomains: [1, 2, 3],
            maxZoom: 17,
            minZoom: 4,
            attribution: b
        }).addTo(map);
        break;
    case "googlesatelite":
        MapSelectType = "googlesatelite",
        MapLayer = new L.tileLayer("http://mt{s}.google.cn/vt/lyrs=y&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=G",{
            subdomains: [1, 2, 3],
            maxZoom: 17,
            minZoom: 4,
            attribution: b
        }).addTo(map);
        break;
    case "googleterra":
        MapSelectType = "googleterra",
        MapLayer = new L.tileLayer("http://mt{s}.google.cn/vt/lyrs=t@131,r@216000000&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=Gal",{
            subdomains: [1, 2, 3],
            maxZoom: 17,
            minZoom: 4,
            attribution: b
        }).addTo(map);
        break;
    case "tianditu":
        MapSelectType = "tianditu",
        MapLayer = new L.tileLayer("http://t{s}.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk={tk}",{
            subdomains: [1, 2, 3],
            maxZoom: 17,
            minZoom: 4,
            attribution: b,
            tk: 'd480ae82dfd0d47d9bb995b48da67ceb'
        }).addTo(map),
        MapLabelLayer = new L.tileLayer("http://t{s}.tianditu.gov.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk={tk}",{
            subdomains: [1, 2, 3],
            maxZoom: 15,
            attribution: b,
            tk: 'd480ae82dfd0d47d9bb995b48da67ceb'
        }).addTo(map);
        break;
    case "tianditusatelite":
        MapSelectType = "tianditusatelite",
        MapLayer = new L.tileLayer("http://t{s}.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk={tk}",{
            subdomains: [1, 2, 3],
            maxZoom: 17,
            minZoom: 4,
            attribution: b,
            tk: 'd480ae82dfd0d47d9bb995b48da67ceb'
        }).addTo(map),
        MapLabelLayer = new L.tileLayer("http://t{s}.tianditu.gov.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk={tk}",{
            subdomains: [1, 2, 3],
            maxZoom: 15,
            attribution: b,
            tk: 'd480ae82dfd0d47d9bb995b48da67ceb'
        }).addTo(map);
        break;
    case "amap":
        MapSelectType = "amap",
        MapLayer = new L.tileLayer("http://webrd0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8",{
            subdomains: [1, 2, 3],
            maxZoom: 17,
            minZoom: 4,
            attribution: b
        }).addTo(map);
        break;
    case "amapsatelite":
        MapSelectType = "amapsatelite",
        MapLayer = new L.tileLayer("http://webst0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=6",{
            subdomains: [1, 2, 3],
            maxZoom: 17,
            minZoom: 4,
            attribution: b
        }).addTo(map),
        MapLabelLayer = new L.tileLayer("http://webst0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8",{
            subdomains: [1, 2, 3],
            maxZoom: 15,
            attribution: b
        }).addTo(map);
        break;
    case "qqroadmap":
        MapSelectType = "qqroadmap",
        MapLayer = new L.TencentLayer("ROADMAP",{
            attribution: '&copy; <a href="http://www.zjwater.gov.cn" target="_blank">浙江省水利厅</a>&nbsp;&nbsp;GS(2016)930号'
        }).addTo(map);
        break;
    case "qqterrain":
        MapSelectType = "qqterrain",
        MapLayer = new L.TencentLayer("TERRAIN",{
            attribution: '&copy; <a href="http://www.zjwater.gov.cn" target="_blank">浙江省水利厅</a>&nbsp;&nbsp;GS(2016)930号'
        }).addTo(map),
        MapLabelLayer = new L.TencentLayer("RealROADMAP").addTo(map);
        break;
    case "qqsatellite":
        MapSelectType = "qqsatellite",
        MapLayer = new L.TencentLayer("SATELLITE",{
            attribution: '&copy; <a href="http://www.zjwater.gov.cn" target="_blank">浙江省水利厅</a>&nbsp;&nbsp;GS(2017)156'
        }).addTo(map),
        MapLabelLayer = new L.TencentLayer("RealROADMAP").addTo(map);
        break;
    default:
        MapSelectType = "qqterrain",
        MapLayer = new L.TencentLayer("TERRAIN",{
            attribution: '&copy; <a href="http://www.zjwater.gov.cn" target="_blank">浙江省水利厅</a>&nbsp;&nbsp;GS(2016)930号'
        }).addTo(map),
        MapLabelLayer = new L.TencentLayer("RealROADMAP").addTo(map)
    }
}
function DisplayEventPoint(a, b) {
    var c, d, e, f, i, k, l, m, n, o;
    for (e = 0; e < a.length; e++)
        f = a[e].etype,
        a[e].lat,
        a[e].lng,
        i = a[e].description,
        a[e].url,
        k = a[e].ename,
        k = k.length > 20 ? k.substr(0, 20) + "..." : k,
        l = a[e].image,
        m = a[e].docid,
        n = "",
        n = "" != l && null != l && "null" != l && void 0 != l ? "<table id='MeetingInfo' style='width: 285px; border: 0px;margin:8px 8px 0px 8px;' cellpadding='0' cellspacing='0'><tr><td style='font-size: 12px; font-weight: bold; color: #333;height:28px;'><img src='images/meet_arrow.png' style='width: 12px; height: 12px; border: 0px; vertical-align: -2px;' />&nbsp;" + k + "</td></tr><tr><td style='background-color: #F1F1F1; padding: 10px 10px 0px 10px; vertical-align: top; text-align: center;'><img src='" + l + "' style='height: 100px; width: 262px;border: 0px;' /></td></tr><tr><td style='width: 285px; background-color: #F1F1F1; padding: 5px 10px 0px 10px; font-size: 12px; color: #666; line-height: 20px; vertical-align: top;'>" + i + "...<a href='#' onclick=\"ShowMeettingInfo('" + m + "')\">[查看详情]</a></td></tr></table><br/>" : "<table id='MeetingInfo' style='width: 285px; border: 0px;margin:8px 8px 0px 8px;' cellpadding='0' cellspacing='0'><tr><td style='font-size: 12px; font-weight: bold; color: #333;height:28px;'><img src='images/meet_arrow.png' style='width: 12px; height: 12px; border: 0px; vertical-align: -2px;' />&nbsp;" + k + "</td></tr><tr><td style='width: 285px; background-color: #F1F1F1; padding: 5px 10px 0px 10px; font-size: 12px; color: #666; line-height: 20px; vertical-align: top;'>" + i + "...<a href='#' onclick=\"ShowMeettingInfo('" + m + "')\">[查看详情]</a></td></tr></table><br/>",
        o = {
            closeButton: !1,
            maxWidth: 300
        },
        "重要会议" == f && (d = L.icon({
            iconUrl: "images/meeting01.png",
            iconSize: [21, 21]
        }),
        c = L.marker([a[e].lat, a[e].lng], {
            icon: d,
            maxZoom: 6
        }).bindPopup(n, o),
        b.addLayer(c)),
        "应急响应" == f && ("I级响应" == a[e].ename && (d = L.icon({
            iconUrl: "images/1.png",
            iconSize: [20, 20]
        }),
        c = L.marker([a[e].lat, a[e].lng], {
            icon: d,
            maxZoom: 6
        }).bindPopup(n, o),
        b.addLayer(c)),
        "Ⅱ级响应" == a[e].ename && (d = L.icon({
            iconUrl: "images/2.png",
            iconSize: [20, 20]
        }),
        c = L.marker([a[e].lat, a[e].lng], {
            icon: d,
            maxZoom: 6
        }).bindPopup(n, o),
        b.addLayer(c)),
        "Ⅲ级响应" == a[e].ename && (d = L.icon({
            iconUrl: "images/3.png",
            iconSize: [20, 20]
        }),
        c = L.marker([a[e].lat, a[e].lng], {
            icon: d,
            maxZoom: 6
        }).bindPopup(n, o),
        b.addLayer(c)),
        "Ⅳ级响应" == a[e].ename && (d = L.icon({
            iconUrl: "images/4.png",
            iconSize: [20, 20]
        }),
        c = L.marker([a[e].lat, a[e].lng], {
            icon: d,
            maxZoom: 6
        }).bindPopup(n, o),
        b.addLayer(c)))
}
function DisplayCloud(a) {
    $.ajax({
        type: "GET",
        url: "Api/LeastCloud",
        dataType: "jsonp",
        jsonp: "callback",
        success: function(b) {
            var c, d, f, g, h, i, j;
            b.length > 0 ? (c = b[0].cloudFullPath,
            d = "",
            "1" == a && (d = b[0].cloud1h),
            "3" == a && (d = b[0].cloud3h),
            "6" == a && (d = b[0].cloud6h),
            "30" == a && (d = b[0].cloudname),
            b[0].cloudtime,
            f = b[0].diffTime,
            g = b[0].minLng,
            h = b[0].maxLng,
            i = b[0].minLat,
            j = b[0].maxLat,
            parseFloat(f) < 3 ? (map.removeLayer(CloudLayer),
            imageBounds = [[i, g], [j, h]],
            CloudLayer = L.imageOverlay(c + "/" + d, imageBounds, {
                maxZoom: 11
            }),
            CloudLayer.addTo(map),
            map._panes.overlayPane.children[0].style.zIndex = "2",
            map._panes.overlayPane.children[1].style.zIndex = "-1",
            toastr.options = {
                closeButton: !0,
                progressBar: !0,
                showMethod: "slideDown",
                positionClass: "toast-bottom-right",
                timeOut: 4e3
            },
            toastr["info"]("", "数据发布时间：" + 1 * d.substr(4, 2) + "月" + 1 * d.substr(6, 2) + "日" + 1 * d.substr(8, 2) + "时")) : (toastr.options = {
                closeButton: !0,
                progressBar: !0,
                showMethod: "slideDown",
                positionClass: "toast-bottom-right",
                timeOut: 4e3
            },
            toastr.warning("", "无最新云图！"))) : (toastr.options = {
                closeButton: !0,
                progressBar: !0,
                showMethod: "slideDown",
                positionClass: "toast-bottom-right",
                timeOut: 4e3
            },
            toastr.error("", "获取云图失败！"))
        }
    })
}
function DisplayRainPublic(a) {
    try {
        $.ajax({
            type: "GET",
            url: "Api/LeastRain/" + a,
            dataType: "jsonp",
            jsonp: "callback",
            success: function(a) {
                var b, c, d, e, f, g, h, i, j, k;
                for (RainImgLayer.clearLayers(),
                b = JSON.parse(a.contours),
                c = 0; c < b.length; c++) {
                    for (d = [],
                    e = b[c],
                    f = 0; f < e.latAndLong.length; f++)
                        d.push([e.latAndLong[f][0], e.latAndLong[f][1]]);
                    g = b[c].color.substring(0, b[c].color.lastIndexOf(",")),
                    h = L.polygon(d, {
                        fillOpacity: .5,
                        color: "rgb(" + g + ")",
                        weight: 0
                    }).bindLabel(rainLevel[e.symbol], {
                        pane: "popupPane"
                    }),
                    h.addTo(RainImgLayer)
                }
                RainImgLayer.addTo(map),
                toastr.options = {
                    closeButton: !0,
                    progressBar: !0,
                    showMethod: "slideDown",
                    positionClass: "toast-bottom-right",
                    timeOut: 4e3
                },
                i = stringTodate(a.time, "M月d日h时"),
                /([1-9]\d*)时/.exec(i),
                j = "17时",
                RegExp.$1 >= 5 && RegExp.$1 < 16 && (j = "6时"),
                RegExp.$1 < 5 && (k = new Date(a.time.replace(/-/g, "/")),
                k.setDate(k.getDate() - 1),
                i = k.Format("M月d日h时")),
                i = i.replace(/([1-9]\d*)时/, j),
                toastr["info"]("", "&nbsp;&nbsp;数据来源：中央气象台<br/><p/>&nbsp;&nbsp;发布时间：" + i)
            }
        })
    } catch (b) {}
}
function DisplayRains(type) {
    AddBoundary(),
    RainLayer.clearLayers(),
    "" != historyTyphoonId ? $.ajax({
        type: "GET",
        url: "Api/TyphoonRainData/" + historyTyphoonId,
        dataType: "jsonp",
        jsonp: "callback",
        success: function(result) {
            var data, rain, starttime, endtime;
            result.length > 0 ? (data = eval("(" + result[0].data + ")"),
            rain = data.rain,
            starttime = data.starttime,
            endtime = data.endtime,
            HandleRainMarker(rain),
            HandleRainLegendTf(rain, starttime, endtime)) : alert("获取降雨失败!")
        }
    }) : ("48" == type ? type = "3d" : type += "h",
    $.ajax({
        type: "POST",
        url: "Api/LeastData/" + type,
        dataType: "jsonp",
        jsonp: "callback",
        success: function(result) {
            var data, rain;
            result.length > 0 ? (data = eval("(" + result[0].data.replace("\n", "").replace("\r", "") + ")"),
            rain = data.rain,
            HandleRainMarkerNew(rain),
            HandleRainLegend("new", "24h", rain, "")) : alert("获取降雨失败!")
        }
    }))
}
function DisplayVideoCamera() {
    map.setView([29.15, 120.34], 8),
    CameraLayer.clearLayers(),
    $.ajax({
        type: "GET",
        url: "Api/CameraVideoList",
        dataType: "jsonp",
        jsonp: "callback",
        success: function(a) {
            var b, c, d, e, f, g;
            if (null != a && a.length > 0)
                for (b = L.icon({
                    iconUrl: "images/camera.png",
                    iconSize: [18, 20]
                }),
                c = 0; c < a.length; c++)
                    d = a[c].lng,
                    e = a[c].lat,
                    f = L.marker([e, d], {
                        icon: b,
                        clickable: !1,
                        visible: !0,
                        maxZoom: 8
                    }),
                    f.tag = a[c],
                    CameraLayer.addLayer(f),
                    g = L.marker(new L.LatLng(e,d), {
                        icon: new L.divIcon({
                            className: "DistanceLabelStyle",
                            iconAnchor: [-13, 10],
                            html: "<span class='bubbleLabel'><span class='bubbleLabel-bot bubbleLabel-bot-left'></span><span class='bubbleLabel-top bubbleLabel-top-left'></span><span class=''>" + a[c].cameraname + "</span></span>"
                        })
                    }),
                    g.tag = a[c],
                    CameraLayer.addLayer(g),
                    f.on("click", function(a) {
                        var b = a.target.getLatLng();
                        openInfoWin(this.tag.cameraid, this.tag.channelid, this.tag.imgfileurl, b)
                    }),
                    g.on("click", function(a) {
                        var b = a.target.getLatLng();
                        openInfoWin(this.tag.cameraid, this.tag.channelid, this.tag.imgfileurl, b)
                    });
            else
                alert("获取视频切片失败!")
        }
    })
}
function DisplayCamera() {
    map.setView([29.15, 120.34], 8),
    CameraLayer.clearLayers(),
    $.ajax({
        type: "GET",
        url: "Api/CameraList",
        dataType: "jsonp",
        jsonp: "callback",
        success: function(a) {
            var b, c, d, e, f, g, h;
            if (null != a && a.length > 0)
                for (b = L.icon({
                    iconUrl: "images/camera.png",
                    iconSize: [18, 20]
                }),
                "True" == IsLogin && (b = L.icon({
                    iconUrl: "images/video.png",
                    iconSize: [28, 28]
                })),
                c = "",
                d = 0; d < a.length; d++)
                    e = a[d].lng,
                    f = a[d].lat,
                    g = L.marker([f, e], {
                        icon: b,
                        clickable: !1,
                        visible: !0,
                        maxZoom: 8
                    }),
                    g.tag = a[d],
                    CameraLayer.addLayer(g),
                    h = L.marker(new L.LatLng(f,e), {
                        icon: new L.divIcon({
                            className: "DistanceLabelStyle",
                            iconAnchor: [-13, 10],
                            html: "<span class='bubbleLabel'><span class='bubbleLabel-bot bubbleLabel-bot-left'></span><span class='bubbleLabel-top bubbleLabel-top-left'></span><span class=''>" + a[d].cameraname + "</span></span>"
                        })
                    }),
                    h.tag = a[d],
                    CameraLayer.addLayer(h),
                    "True" == IsLogin ? (c += "<li><img src='images/video.png' alt=''/>" + a[d].cameraname + "</li>",
                    g.on("click", function(a) {
                        var b = a.target.getLatLng();
                        openInfoWinVideo(this.tag.cameraid, this.tag.channelid, this.tag.imgfileurl, b)
                    }),
                    h.on("click", function(a) {
                        var b = a.target.getLatLng();
                        openInfoWinVideo(this.tag.cameraid, this.tag.channelid, this.tag.imgfileurl, b)
                    })) : (c += "<li><img src='images/camera.png' alt=''/>" + a[d].cameraname + "</li>",
                    g.on("click", function(a) {
                        var b = a.target.getLatLng();
                        openInfoWin(this.tag.cameraid, this.tag.channelid, this.tag.imgfileurl, b)
                    }),
                    h.on("click", function(a) {
                        var b = a.target.getLatLng();
                        openInfoWin(this.tag.cameraid, this.tag.channelid, this.tag.imgfileurl, b)
                    }));
            else
                alert("获取视频切片失败!")
        }
    })
}
function openInfoWin(a, b, c, d) {
    closeInfoWin(),
    c = "http://taifeng.oss-cn-hangzhou.aliyuncs.com/cameraimg/" + c;
    var e = "<a href='" + c + "' target='_blank'><img src='" + c + "' style='border:0px; padding:15px; width:430px; height:315px;' /></a>";
    infowin = L.popup({
        minWidth: 380,
        minHeight: h
    }).setLatLng(d).setContent(e).openOn(map)
}
function openInfoWinVideo(a, b, c, d) {
    closeInfoWin(),
    c = "Video.htm?id=" + a + "&cid=" + b;
    var e = "<iframe name='frame' marginwidth='0' marginheight='0' frameborder='0' src='" + c + "' width='100%' height='330px' scrolling='no'></iframe>";
    infowin = L.popup({
        minWidth: 390,
        minHeight: h
    }).setLatLng(d).setContent(e).openOn(map)
}
function openInfoWinRain(a, b) {
    var c, d;
    closeInfoWin(),
    c = "Rain.aspx?stcd=" + a,
    d = "<iframe name='frame' marginwidth='0' marginheight='0' frameborder='0' src='" + c + "' width='100%' height='260px' scrolling='no'></iframe>",
    infowin = L.popup({
        minWidth: 390,
        minHeight: h
    }).setLatLng(b).setContent(d).openOn(map)
}
function closeInfoWin() {
    null != infowin && map.closePopup()
}
var rainLevel = {
    0: "小雨",
    2.5: "小雨",
    5: "小雨",
    10: "中雨",
    25: "大雨",
    50: "暴雨",
    100: "大暴雨",
    250: "特大暴雨"
}
  , infowin = null;

function openSwitchCamera(a) {
    var b = $(a).attr("alt")
      , c = $(a).attr("id");
    "0" == b && "fengn" != c ? ($(a).attr("alt", "1"),
    $(a).attr("src", "images/switch_on.png"),
    CameraLayer = L.featureGroup([]).addTo(map),
    DisplayCamera()) : ($(a).attr("alt", "0"),
    $(a).attr("src", "images/switch_off.png"),
    $("#btnCamera").attr("alt", "0"),
    $("#btnCamera").attr("src", "images/switch_off.png"),
    CameraLayer.clearLayers())
}
function openSwitchCameraNoLogin(a) {
    var b = $(a).attr("alt");
    "0" == b ? ($(a).attr("alt", "1"),
    $(a).attr("src", "images/switch_on.png"),
    CameraLayer = L.featureGroup([]).addTo(map),
    DisplayCamera()) : ($(a).attr("alt", "0"),
    $(a).attr("src", "images/switch_off.png"),
    CameraLayer.clearLayers())
}
function typeaheadFunc(a) {
    "" == $.trim(a) ? $(".search-bar-panel").hide() : ($(".search-bar-panel").hide(),
    $("#typeahead1").attr("readOnly", !0),
    $.ajax({
        type: "GET",
        url: "Api/TyphoonSearch/" + a,
        dataType: "jsonp",
        jsonp: "callback",
        success: function(b) {
            var c, d, e;
            if (null != b && b.length > 0) {
                for (c = "",
                a <= (new Date).getFullYear() && a >= 1945 && (c = "<li class='divider'></li><li><a href='###' id='" + a + "'>" + a + "</a></li>"),
                d = b.length > 6 ? 6 : b.length,
                e = 0; d > e; e++)
                    c = "<li><a href='###' id='" + b[e].value + "' name='" + b[e].name + "' start='" + b[e].starttime + "' end='" + b[e].endtime + "'>" + b[e].name + "</a><li>" + c;
                $(".search-bar-panel ul").html(c),
                $(".search-bar-panel").show(),
                $("#typeahead1").attr("readOnly", !1),
                $("#typeahead1").attr("readOnly", !1),
                $(".search-bar-panel ul li a").click(function() {
                    var a, b, c;
                    _id = "",
                    $(".search-bar-panel").hide(),
                    "divider" == $(this).parent().prev().attr("class") ? ($("#typeahead1").val($(this).attr("id")),
                    year = $(this).attr("id"),
                    InitializationEject(),
                    InitializationYear(),
                    HistoryTyphoonByYear()) : ($("#typeahead1").val($(this).attr("name")),
                    InitializationEject(),
                    InitializationYear(),
                    $("#namelist").find("#nameactive").addClass("namelist-select"),
                    $("#namelist").find("#namehistory").remove(),
                    a = new Date($(this).attr("start").replace(/-/g, "/")),
                    b = new Date($(this).attr("end").replace(/-/g, "/")),
                    c = $(this).attr("name").replace(/^\d*/, ""),
                    year = $(this).attr("name").substring(0, 4),
                    TyphoonEvents(c, $(this).attr("id"), a, b))
                })
            } else
                $(".search-bar-panel ul").html("<li><a href='###'>无匹配的结果项!</a></li>"),
                $("#typeahead1").attr("readOnly", !1),
                $(".search-bar-panel").show();
            $(".search-bar-panel").css({
                left: $("#typeahead1").offset().left,
                top: $("#typeahead1").offset().top - $(".search-bar-panel ul").height()
            })
        },
        error: function() {
            $(".search-bar-panel ul").html("<li><a href='###'>无匹配的结果项!</a></li>"),
            $("#typeahead1").attr("readOnly", !1),
            $(".search-bar-panel").css({
                left: $("#typeahead1").offset().left,
                top: $("#typeahead1").offset().top - $(".search-bar-panel ul").height()
            }),
            $(".search-bar-panel").show()
        }
    }))
}
function refreshGrid() {
    window.location("Default.aspx")
}
function Login() {
    $("#loginmodal").modal("view", {
        speed: 500,
        easing: "easeInOutElastic",
        animation: "top height width",
        position: "10% auto",
        overlayClose: !1,
        on: "click",
        overlayColor: "#222",
        overlayOpacity: .5,
        close: ".close"
    })
}
function LoginSystem() {
    "Login" == $("#btnLogin").text() && "" != $("#txtname").val() && "" != $("#txtpwd").val() && ($("#btnLogin").text("Login..."),
    $.ajax({
        url: "DataHandler.ashx?operateType=login&name=" + $("#txtname").val() + "&pwd=" + $("#txtpwd").val(),
        success: function(a) {
            "true" == a ? ($("#DivMsg").empty().val("登陆成功").attr("color", "green").show(),
            setTimeout("window.location.href = 'default.aspx'", 1e3)) : ($("#DivMsg").empty().val(a).attr("color", "red").show(),
            $("#btnLogin").text("Login"))
        },
        error: function() {
            $("#btnLogin").text("Login")
        }
    }))
}
function Logout() {
    confirm("您确定要退出系统吗？") && $.ajax({
        url: "DataHandler.ashx?operateType=Logout",
        success: function() {
            window.location.href = "default.aspx"
        }
    })
}
function MapTypeSet(a) {
    GoogleMapClick(a)
}
function checkOpt(a) {
    $("#set :radio").each(function() {
        $(this).attr("checked", !1)
    }),
    "" != a && $.each(a.split(","), function(a, b) {
        $("#" + b).attr("checked", !0)
    })
}
function ShowMeettingInfo(a) {
    $.blockUI({
        message: '<h6 style="text-align:right; margin:0; padding:0; padding-top:2px;"><img src="images/close_00.png" onclick="$.unblockUI()" style="cursor:pointer"/></h6><div style="padding:5px;  -webkit-border-radius: 10px;-moz-border-radius: 10px; "><iframe height="500px" width="700px" src="MeettingInfo.aspx?mid=' + a + '" frameborder="0" ></iframe></div>',
        css: {
            width: "720px",
            top: "80px",
            cursor: "",
            left: __left,
            position: "fixed",
            border: "none"
        }
    })
}
var MapLayer, MapLabelLayer, map, RainLayer, CloudLayer, RainImgLayer, LatLngLayer, BoundaryLayer, LabelingLayer, CameraLayer, _infowin, TaipeiImageLayer, MulchLayer, TaipeiMarker, HongkongMarker, MacaoMarker, __widowWidth, __popWidth, __left, __windowHeight, __popHeight, __top, hashtable = new Hashtable, typeaheadTimes = 0, historyTyphoonId = "", ShowRain = !1, ShowLatLngLayer = !1, ShowCloud = !1;
ShowRain = !1,
$(document).ready(function() {
    var b, a = 56;
    switch ($("#map").css("height", $(window).height() - a).css("marginTop", a),
    $(".top").css("width", $(window).width()),
    $("#typhoonlegend").css("top", $(window).height() - 330),
    $("#nextyearDiv").text(year + 1),
    $("#lastyearDiv").text(year - 1),
    $("#lastyearDiv").css("marginLeft", "2px"),
    $("#nextyearDiv").css("marginLeft", "2px"),
    map = L.map("map", {
        attributionControl: !1,
        minZoom: 4
    }).setView([30.25, 126.34], 5),
    L.control.attribution({
        prefix: ""
    }).addTo(map),
    b = '&copy; <a href="http://www.zjwater.gov.cn" target="_blank">浙江省水利厅</a>',
    MapSelectType) {
    case "googlemap":
        MapSelectType = "googlemap",
        MapLayer = new L.tileLayer("http://mt{s}.google.cn/vt/lyrs=m@235000000&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=Galileo",{
            subdomains: [1, 2, 3],
            maxZoom: 17,
            minZoom: 4,
            attribution: b
        }).addTo(map);
        break;
    case "googlesatelite":
        MapSelectType = "googlesatelite",
        MapLayer = new L.tileLayer("http://mt{s}.google.cn/vt/lyrs=y&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=G",{
            subdomains: [1, 2, 3],
            maxZoom: 17,
            minZoom: 4,
            attribution: b
        }).addTo(map);
        break;
    case "googleterra":
        MapSelectType = "googleterra",
        MapLayer = new L.tileLayer("http://mt{s}.google.cn/vt/lyrs=t@131,r@216000000&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=Gal",{
            subdomains: [1, 2, 3],
            maxZoom: 17,
            minZoom: 4,
            attribution: b
        }).addTo(map);
        break;
    case "tianditu":
        b += " &nbsp;GS(2018)1432号",
        MapSelectType = "tianditu",
        MapLayer = new L.tileLayer("http://t{s}.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk={tk}",{
            subdomains: [1, 2, 3],
            maxZoom: 17,
            minZoom: 4,
            attribution: b,
            tk: 'd480ae82dfd0d47d9bb995b48da67ceb'
        }).addTo(map),
        MapLabelLayer = new L.tileLayer("http://t{s}.tianditu.gov.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk={tk}",{
            subdomains: [1, 2, 3],
            maxZoom: 15,
            attribution: b,
            tk: 'd480ae82dfd0d47d9bb995b48da67ceb'
        }).addTo(map);
        break;
    case "tianditusatelite":
        b += " &nbsp;GS(2017)508号",
        MapSelectType = "tianditusatelite",
        MapLayer = new L.tileLayer("http://t{s}.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk={tk}",{
            subdomains: [1, 2, 3],
            maxZoom: 17,
            minZoom: 4,
            attribution: b,
            tk: 'd480ae82dfd0d47d9bb995b48da67ceb'
        }).addTo(map),
        MapLabelLayer = new L.tileLayer("http://t{s}.tianditu.gov.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk={tk}&tk={tk}",{
            subdomains: [1, 2, 3],
            maxZoom: 15,
            attribution: b,
            tk: 'd480ae82dfd0d47d9bb995b48da67ceb'
        }).addTo(map);
        break;
    case "amap":
        b += " &nbsp;GS(2018)1709号",
        MapSelectType = "amap",
        MapLayer = new L.tileLayer("http://webrd0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8",{
            subdomains: [1, 2, 3],
            maxZoom: 17,
            minZoom: 4,
            attribution: b
        }).addTo(map);
        break;
    case "amapsatelite":
        b += " &nbsp;GS(2018)984号",
        MapSelectType = "amapsatelite",
        MapLayer = new L.tileLayer("http://webst0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=6",{
            subdomains: [1, 2, 3],
            maxZoom: 17,
            minZoom: 4,
            attribution: b
        }).addTo(map),
        MapLabelLayer = new L.tileLayer("http://webst0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8",{
            subdomains: [1, 2, 3],
            maxZoom: 15,
            attribution: b
        }).addTo(map);
        break;
    case "qqroadmap":
        MapSelectType = "qqroadmap",
        MapLayer = new L.TencentLayer("ROADMAP",{
            attribution: '&copy; <a href="http://www.zjwater.gov.cn" target="_blank">浙江省水利厅</a>&nbsp;&nbsp;GS(2016)930号'
        }).addTo(map);
        break;
    case "qqterrain":
        MapSelectType = "qqterrain",
        MapLayer = new L.TencentLayer("TERRAIN",{
            attribution: '&copy; <a href="http://www.zjwater.gov.cn" target="_blank">浙江省水利厅</a>&nbsp;&nbsp;GS(2016)930号'
        }).addTo(map),
        MapLabelLayer = new L.TencentLayer("RealROADMAP").addTo(map);
        break;
    case "qqsatellite":
        MapSelectType = "qqsatellite",
        MapLayer = new L.TencentLayer("SATELLITE",{
            attribution: '&copy; <a href="http://www.zjwater.gov.cn" target="_blank">浙江省水利厅</a>&nbsp;&nbsp;GS(2017)156'
        }).addTo(map),
        MapLabelLayer = new L.TencentLayer("RealROADMAP").addTo(map);
        break;
    default:
        MapSelectType = "qqterrain",
        MapLayer = new L.TencentLayer("TERRAIN",{
            attribution: '&copy; <a href="http://www.zjwater.gov.cn" target="_blank">浙江省水利厅</a>&nbsp;&nbsp;GS(2016)930号'
        }).addTo(map),
        MapLabelLayer = new L.TencentLayer("RealROADMAP").addTo(map)
    }
    RainLayer = L.featureGroup([]).addTo(map),
    RainImgLayer = L.featureGroup([]).addTo(map),
    CloudLayer = L.featureGroup([]).addTo(map),
    BoundaryLayer = L.featureGroup([]).addTo(map),
    LabelingLayer = L.featureGroup([]).addTo(map),
    TaipeiImageLayer = L.featureGroup([]),
    MulchLayer = L.featureGroup([]).addTo(map),
    $("#set").css("height", $(window).height()),
    $("#Setting").click(function() {
        $("#set").show(100)
    }),
    $(".me_backarrow").click(function() {
        $("#set").hide(100)
    }),
    $("#logout-i,logout-span").click(function() {
        Logout()
    }),
    $("#btnLogin").click(function() {
        LoginSystem()
    }),
    $("#loginmodal input").bind("keypress", function(a) {
        "13" == a.keyCode && LoginSystem()
    }),
    $("#SaveSetting").click(function() {
        var a = $(":radio:checked[name='mapGroup']").val() + "," + $(":radio:checked[name='rainGrpup']").val() + "," + $(":radio:checked[name='rainIconGroup']").val();
        $.ajax({
            url: "DataHandler.ashx?operateType=SaveSetting&name=" + a,
            success: function(a) {
                "true" == a ? window.location("Default.aspx") : (toastr.options = {
                    closeButton: !0,
                    progressBar: !0,
                    showMethod: "slideDown",
                    positionClass: "toast-bottom-right",
                    timeOut: 4e3
                },
                toastr.error("", "设置失败，请检查！"))
            },
            error: function() {
                toastr.options = {
                    closeButton: !0,
                    progressBar: !0,
                    showMethod: "slideDown",
                    positionClass: "toast-bottom-right",
                    timeOut: 4e3
                },
                toastr.error("", "设置失败，请检查！")
            }
        })
    }),
    $(".search-bar").one("click", function() {
        $(".search-bar").css({
            width: "138px"
        }),
        $(".search-bar-1").animate({
            width: "190px"
        }, 300)
    }),
    $("#btn_search").click(function() {
        $(".search-bar").css({
            width: "84px"
        }),
        $(".search-bar-1").css({
            width: "0"
        }),
        setTimeout(function() {
            $(".search-bar").one("click", function() {
                $(".search-bar").css({
                    width: "138px"
                }),
                $(".search-bar-1").animate({
                    width: "190px"
                }, 300)
            })
        }, 200)
    }),
    $("#typeahead1").bind("keypress", function() {
        "" != $.trim($("#typeahead1").val()) && 1 != $("#typeahead1").attr("readOnly") ? (clearTimeout(typeaheadTimes),
        typeaheadTimes = setTimeout(function() {
            typeaheadFunc($("#typeahead1").val())
        }, 700)) : $(".search-bar-panel").hide()
    }).bind("keydown", function() {
        "" != $.trim($("#typeahead1").val()) && 1 != $("#typeahead1").attr("readOnly") ? (clearTimeout(typeaheadTimes),
        typeaheadTimes = setTimeout(function() {
            typeaheadFunc($("#typeahead1").val())
        }, 700)) : $(".search-bar-panel").hide()
    }).bind("input", function() {
        "" != $.trim($("#typeahead1").val()) && 1 != $("#typeahead1").attr("readOnly") ? (clearTimeout(typeaheadTimes),
        typeaheadTimes = setTimeout(function() {
            typeaheadFunc($("#typeahead1").val())
        }, 700)) : $(".search-bar-panel").hide()
    }).bind("click", function() {
        "" != $.trim($("#typeahead1").val()) && 1 != $("#typeahead1").attr("readOnly") ? (clearTimeout(typeaheadTimes),
        typeaheadTimes = setTimeout(function() {
            typeaheadFunc($("#typeahead1").val())
        }, 700)) : $(".search-bar-panel").hide()
    }).bind("blur", function() {
        setTimeout(function() {
            $(".search-bar-panel").hide()
        }, 200)
    }),
    $("#cameraSwich").show()
}),
String.prototype.trim = function() {
    return this.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
}
,
__widowWidth = $(window).width(),
__popWidth = 700,
__left = (__widowWidth - __popWidth) / 2 + "px",
__windowHeight = $(window).height(),
__popHeight = $("#Loading").height(),
__top = (__windowHeight - __popHeight) / 2 + "px";

function resize() {
    var a = document.documentElement.clientHeight
      , b = document.documentElement.clientWidth;
    $("#map").css("height", $(window).height()),
    $(".top").css("width", $(window).width()),
    $("#typhoonlegend").css("top", $(window).height() - 330),
    $(".leaflet-control-zoom").css("marginTop", "100px"),
    $("body").css("height", a + "px").css("width", b + "px").css("overflow", "hidden"),
    $(".main").css("height", a - 61 + "px"),
    $(".lishi-top").html().indexOf("︿") > 0 ? $(".lishi").css("top", a - 54 + "px") : $(".lishi").css("top", a - 168 + "px"),
    $(".LiShi").css("width", b - 8),
    $(".lishi-top").unbind(),
    $(".lishi-top").click(function() {
        var b;
        $(".lishi-top").html().indexOf("︿") > 0 ? (up = $(".lishi-top").html(),
        $(".lishi-top").html(down),
        b = !1,
        $(".search-bar-panel").is(":visible") && ($(".search-bar-panel").hide(),
        b = !0),
        $(".lishi").animate({
            top: a - 147 + "px"
        }, 400, function() {
            LocationSearchBar(),
            b && $(".search-bar-panel").show()
        }),
        $(".lishi-top").find("img").length > 0 && ($(".eventType").show(),
        $("#back").unbind(),
        BackClick())) : (down = $(".lishi-top").html(),
        $(".lishi-top").find("img").length > 0 ? ($(".lishi-top").find("img").remove(),
        $(".eventType").hide(),
        $(".lishi-top").html($(".lishi-top").html() + "<span>︿</span>")) : $(".lishi-top").html(up),
        b = !1,
        $(".search-bar-panel").is(":visible") && ($(".search-bar-panel").hide(),
        b = !0),
        $(".lishi").animate({
            top: a - 54 + "px"
        }, 400, function() {
            LocationSearchBar(),
            b && $(".search-bar-panel").show()
        }))
    }),
    $("#closebox").unbind(),
    $("#closebox").click(function() {
        $(".box").fadeOut("slow", function() {
            $("body").append("<img src='images/list.png'  alt='' class='xtb'/>"),
            $(".xtb").css("left", b - 37 + "px"),
            MoveCloudRainLegend(),
            $(".xtb").unbind(),
            $(".xtb").click(function() {
                $(".xtb").remove(),
                $(".box").fadeIn("slow"),
                MoveCloudRainLegend()
            })
        })
    }).hover(function() {
        $(this).attr("src", $(this).attr("src").replace("_00", "_01"))
    }, function() {
        $(this).attr("src", $(this).attr("src").replace("_01", "_00"))
    }),
    InitializationYear(),
    "" == _id ? HistoryTyphoonByYear() : TyphoonEvents(_name, _id, _start, _end),
    MoveCloudRainLegend()
}
function sjjd(a) {
    $(".lastyear,.nextyear").show(),
    a == (new Date).getFullYear() && $(".nextyear").hide(),
    1945 == a && $(".lastyear").hide()
}
function backToHistoryList() {
    var a = year + "<span>﹀</span>";
    $(".lishi-top").html(a),
    HistoryTyphoonByYear()
}
function MarqueeScrolling() {
    var a, b;
    $("#tfinfomarqueen").show(),
    $(".top-bottom div")[0].scrollWidth <= $(window).width() / 2 && $(".top-bottom div").css({
        display: "block",
        width: .8 * $(window).width()
    }),
    a = $(".top-bottom div")[0].scrollWidth + 200,
    $(".top-bottom").css("width", 2 * a + $(window).width()),
    $(".top-bottom").append($(".top-bottom").html()),
    $(".top-bottom div:eq(0)").css("left", $(window).width() + "px"),
    $(".top-bottom div:eq(1)").css("left", a + $(window).width() + "px"),
    b = (a + $(window).width()) * (a > 2e3 ? 15 * a : 2e4) / a,
    b = 1.5 * b,
    $(".top-bottom div:eq(0)").animate({
        left: -a + "px"
    }, b, "linear", function() {
        $(".top-bottom div:eq(0)").css("left", "0"),
        divmove1()
    }),
    $(".top-bottom div:eq(1)").animate({
        left: "0px"
    }, b, "linear", function() {
        $(".top-bottom div:eq(1)").css("left", a + "px"),
        divmove2()
    })
}
function divmove1() {
    var a = $(".top-bottom div:eq(0)")
      , b = a[0].scrollWidth + 200
      , c = b > 2e3 ? 15 * b : 2e4;
    c = 1.5 * c,
    a.animate({
        left: -b + "px"
    }, c, "linear", function() {
        a.css("left", "0"),
        divmove1()
    })
}
function divmove2() {
    var a = $(".top-bottom div:eq(1)")
      , b = a[0].scrollWidth + 200
      , c = b > 2e3 ? 15 * b : 2e4;
    c = 1.5 * c,
    a.animate({
        left: "0px"
    }, c, "linear", function() {
        a.css("left", b + "px"),
        divmove2()
    })
}
function moveDIV() {
    var a = $(".top-bottom div:eq(0)")
      , b = $(".top-bottom div:eq(1)");
    $(".top-bottom").mousemove(function() {
        a.pause(),
        b.pause()
    }),
    $(".top-bottom").mouseout(function() {
        a.resume(),
        b.resume()
    })
}
function CloseCloudRainLegend(a, b) {
    $(a).parent().remove(),
    MoveCloudRainLegend(),
    "cloud" == b && (CloudLayer._image.style.visibility = "hidden",
    $("#btncloud").attr("src", "images/btn_cloud_00.png"),
    ShowCloud = !1),
    "rain" == b && (RainLayer.clearLayers(),
    BoundaryLayer.clearLayers(),
    $("#btnrain").attr("src", "images/btn_rain_00.png"),
    ShowRain = !1),
    "station" == b && MobileStationLayer.clearLayers(),
    "station1" == b && MobileStationGroupLayer.clearLayers(),
    "station2" == b && heat.setLatLngs(addressPoints)
}
function MoveCloudRainLegend() {
    document.documentElement.clientWidth;
    var b;
    b = $(".box").is(":hidden") ? 39 : 292,
    $("#CloudRainLegend").css("right", b + "px")
}
function HistoryTyphoonByYear() {
    $("#typeahead1").show(),
    $("#LiShi").css("background-image", "url('images/lishi_bg.png')");
    try {
        paper.clear(),
        sjjd(year),
        $.ajax({
            type: "GET",
            url: "Api/TyphoonList/" + year,
            dataType: "jsonp",
            jsonp: "callback",
            success: function(a) {
                var b, c, d, e, f, g, i, j, k, l, m, n, o, p, q, r;
                for (data = a,
                b = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                c = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                d = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                e = !1,
                f = 0; f < a.length; f++)
                    a[f].endtime = new Date(a[f].endtime.replace(/-/g, "/")),
                    a[f].starttime = new Date(a[f].starttime.replace(/-/g, "/")),
                    a[f].starttime.getFullYear() == year ? c[a[f].starttime.getMonth()] += 1 : (e = !0,
                    b[a[f].starttime.getMonth()] += 1),
                    c[a[f].endtime.getMonth()] += 1;
                if (g = 10 * ($("#LiShi").css("width").replace("px", "") / 10).toFixed(0) - 82,
                i = 22,
                e)
                    for (f = 0; f < b.length; f++)
                        0 != b[f] && (j = 10 * (b[f] / a.length / 2 * g / 10).toFixed(0),
                        k = i + j / 2,
                        i += j,
                        d[f] = i - j,
                        paper.rect(i, 100, 2, 8).attr("fill", "#fff").attr("stroke", "#fff"),
                        paper.text(k, 108, f + 1 + "月").attr("fill", "#ffffff"));
                for (f = 0; f < c.length; f++)
                    0 != c[f] && (j = 10 * (c[f] / a.length / 2 * g / 10).toFixed(0),
                    k = i + j / 2,
                    i += j,
                    d[f + 12] = i - j,
                    paper.rect(i, 100, 2, 8).attr("fill", "#fff").attr("stroke", "#fff"),
                    paper.text(k, 108, f + 1 + "月").attr("fill", "#ffffff"));
                for (f = 0; f < a.length; f++)
                    l = 8 * Math.random(),
                    m = c[a[f].starttime.getMonth()] / a.length / 2 * g,
                    a[f].starttime.getFullYear() != year && (m = b[a[f].starttime.getMonth()] / a.length / 2 * g),
                    n = mGetDate(a[f].starttime.getFullYear(), a[f].starttime.getMonth() + 1),
                    o = parseInt((a[f].endtime.getTime() - a[f].starttime.getTime()) / 864e5) + 1,
                    p = o / n * m > 11 * (a[f].name.length + 2) ? o / n * m : 12 * (a[f].name.length + 2),
                    j = a[f].starttime.getDate() / n * m + d[a[f].starttime.getMonth() + 12],
                    a[f].starttime.getFullYear() != year && (j = a[f].starttime.getDate() / n * m + d[a[f].starttime.getMonth()]),
                    q = "#fff",
                    r = a[f].warnlevel,
                    r = "" == r ? "-1" : r,
                    r = "1" == r || "2" == r || "3" == r ? "-1" : r,
                    paper.image("images/historybg/h-" + r + ".png", j, h[f % 4] + l, p, 16).click(function() {
                        var a = paper.getById($(this).attr("id")).attr("uid");
                        TyphoonEvents(data[a].name, data[a].tfid, data[a].starttime, data[a].endtime)
                    }).attr("cursor", "pointer").attr("uid", f),
                    paper.text(j + p / 2, h[f % 4] + l + 8, parseInt(a[f].tfid.substr(4, 2)) + "号" + a[f].name).attr({
                        "font-size": "12px",
                        "font-family": "宋体"
                    }).attr("fill", q).click(function() {
                        var a = paper.getById($(this).attr("id")).attr("uid");
                        TyphoonEvents(data[a].name, data[a].tfid, data[a].starttime, data[a].endtime)
                    }).attr("cursor", "pointer").attr("uid", f)
            },
            error: function(a, b, c) {
                toastr.options = {
                    closeButton: !0,
                    progressBar: !0,
                    showMethod: "slideDown",
                    positionClass: "toast-bottom-right",
                    timeOut: 4e3
                },
                toastr.error(c, "提示")
            }
        })
    } catch (a) {}
}
function mGetDate(a, b) {
    var c = new Date(a,b,0);
    return c.getDate()
}
function TyphoonEvents(a, b, c, d) {
    var f, e = hashtable.get("tfids");
    if (e = null == e || void 0 == e || "null" == e ? e = "" : e,
    f = e.split(",").length,
    4 > f || 4 == f && e.indexOf(b) > -1) {
        $("#typeahead1").hide(),
        historyTyphoonId = b,
        _name = a,
        _id = b,
        _end = d,
        _start = c,
        $(".lishi-top2 b").html("" + b + a).parent().show(),
        $("#LiShi").css("background-image", "url('images/lishi_bg1.png')");
        try {
            $.ajax({
                type: "GET",
                url: "Api/TyphoonEvent/" + b + "/" + IsLogin,
                dataType: "jsonp",
                jsonp: "callback",
                success: function(f) {
                    var h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, g = hashtable.get("tfids");
                    for ("" == g || null == g || void 0 == g ? g = b : g.indexOf(b) < 0 && (g = g + "," + b),
                    hashtable.put("tfids", g),
                    $(".lastyear,.nextyear").hide(),
                    paper.clear(),
                    h = 10 * ($("#LiShi").css("width").replace("px", "") / 10).toFixed(0),
                    i = ((Date.parse(d) - Date.parse(c)) / 60 / 60 / 1e3 / 24 >> 0) + 3,
                    j = 1e3 * 60 * 60 * 24 * i,
                    k = Date.parse(new Date(c.getFullYear(),c.getMonth(),c.getDate())),
                    l = 0,
                    c = new Date((c + "").replace(/-/g, "/")),
                    m = 0; i > m; m++)
                        for (paper.rect(l, 100, 2, 8).attr("fill", "#fff").attr("stroke", "#fff"),
                        n = l,
                        l += h / i,
                        paper.text(n + (l - n) / 2, 108, c.getMonth() + 1 + "-" + c.getDate()).attr("fill", "#fff"),
                        c = new Date(c.setDate(c.getDate() + 1)),
                        o = h / i / 8,
                        p = 0; 8 > p; p++)
                            paper.path("M" + (l - o * (p + 1)) + " 0L" + (l - o * (p + 1)) + " 99").attr("stroke", "#fefefe").attr("stroke-width", .7);
                    for (paper.rect(l - 2, 100, 2, 8).attr("fill", "#fff").attr("stroke", "#fff"),
                    q = [14, 39],
                    r = [43, 24, 6, 25, 46, 67, 30],
                    m = 0; m < f.length; m++)
                        s = (Date.parse(f[m].time) - k) * (h / j),
                        t = f[m].etype,
                        u = f[m].lat,
                        v = f[m].lng,
                        w = f[m].description,
                        x = f[m].url,
                        y = f[m].ename,
                        z = f[m].image,
                        A = f[m].docid,
                        "重要会议" == t && (eventtypehtml.indexOf("zyhy") < 0 && (eventtypehtml += "<li id='zyhy'><img src='images/meeting02.png' alt=''>重要会议</li>"),
                        tooltip("images/meeting01.png", s, q[m % 2], 21, 21, f[m].ename, u, v, w, x, y, z, A).attr("tuType", "zyhy")),
                        "应急响应" == t && (eventtypehtml.indexOf("jjxy") < 0 && (eventtypehtml += "<li id='jjxy'><img src='images/1.png' alt=''>应急响应</li>"),
                        "I级响应" == f[m].ename && tooltip("images/1.png", s, 72, 20, 20, f[m].ename, u, v, w, x, y, z, A).attr("tuType", "jjxy"),
                        "Ⅱ级响应" == f[m].ename && tooltip("images/2.png", s, 72, 20, 20, f[m].ename, u, v, w, x, y, z, A).attr("tuType", "jjxy"),
                        "Ⅲ级响应" == f[m].ename && tooltip("images/3.png", s, 72, 20, 20, f[m].ename, u, v, w, x, y, z, A).attr("tuType", "jjxy"),
                        "Ⅳ级响应" == f[m].ename && tooltip("images/4.png", s, 72, 20, 20, f[m].ename, u, v, w, x, y, z, A).attr("tuType", "jjxy")),
                        "台风等级变化" == t && ("台风生成" == f[m].ename && tooltip("images/start.png", s, r[m % 7], 70, 18, f[m].ename, u, v, w, x, y, z, A).attr("tuType", "tfsj"),
                        "台风消亡" == f[m].ename ? tooltip("images/end.png", s, r[m % 7], 70, 18, f[m].ename, u, v, w, x, y, z, A).attr("tuType", "tfsj") : "强热带风暴" == f[m].ename ? tooltip("images/qrdfb.png", s, r[m % 7], 86, 19, f[m].ename, u, v, w, x, y, z, A).attr("tuType", "tfsj") : "台风" == f[m].ename ? tooltip("images/tf.png", s, r[m % 7], 53, 19, f[m].ename, u, v, w, x, y, z, A).attr("tuType", "tfsj") : "强台风" == f[m].ename ? tooltip("images/qtf.png", s, r[m % 7], 57, 19, f[m].ename, u, v, w, x, y, z, A).attr("tuType", "tfsj") : "热带风暴" == f[m].ename ? tooltip("images/rdfb.png", s, r[m % 7], 74, 18, f[m].ename, u, v, w, x, y, z, A).attr("tuType", "tfsj") : "超强台风" == f[m].ename ? tooltip("images/cqtf.png", s, r[m % 7], 69, 19, f[m].ename, u, v, w, x, y, z, A).attr("tuType", "tfsj") : ("热带低压" == f[m].ename || "热带低气压" == f[m].ename) && tooltip("images/rddy.png", s, r[m % 7], 73, 18, f[m].ename, u, v, w, x, y, z, A).attr("tuType", "tfsj"));
                    $(".eventType").html(eventtypehtml),
                    $(".eventType").find("li").length > 0 && $(".eventType").show(),
                    contains(e, b, !0) ? $("#namelist").find("#" + b).click() : (HandleNameList(b, a, "", "0"),
                    DrawTyphoonPath(b, ""))
                },
                error: function(a, b, c) {
                    toastr.options = {
                        closeButton: !0,
                        progressBar: !0,
                        showMethod: "slideDown",
                        positionClass: "toast-bottom-right",
                        timeOut: 4e3
                    },
                    toastr.error("", c)
                }
            })
        } catch (g) {}
    } else
        toastr.options = {
            closeButton: !0,
            progressBar: !0,
            showMethod: "slideDown",
            positionClass: "toast-bottom-right",
            timeOut: 4e3
        },
        toastr.warning("", "最多叠加4场台风！")
}
function InitializationYear() {
    sjjd(year),
    $("#lastyearDiv").html(year - 1),
    $("#nextyearDiv").html(year + 1)
}
function InitializationEject() {
    var b, a = document.documentElement.clientHeight;
    up = "历史台风 <span>︿</span>",
    down = year + "<span>﹀</span>",
    $(".lishi-top").html(down),
    $(".lishi").css("top") == a - 54 + "px" && (b = !1,
    $(".search-bar-panel").is(":visible") && ($(".search-bar-panel").hide(),
    b = !0),
    $(".lishi").animate({
        top: a - 147 + "px"
    }, 400, function() {
        LocationSearchBar(),
        b && $(".search-bar-panel").show()
    })),
    $(".lishi-top").find("img").length > 0 && ($(".eventType").show(),
    BackClick())
}
function tooltip(a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n, o = paper.image(a, b, c, d, e).attr("cursor", "pointer").mousemove(function() {
        $(".tooltip-body").html(f)
    }).mouseout(function() {
        $(".tooltip").hide()
    }).mousedown(function(a) {
        var b, c;
        if ("" != j && null != j && void 0 != j) {
            k = k.length > 20 ? k.substr(0, 20) + "..." : k,
            b = "",
            b = "" != l && null != l && "null" != l && void 0 != l ? "<table id='MeetingInfo' style='width: 285px; border: 0px;margin:8px 8px 0px 8px;' cellpadding='0' cellspacing='0'><tr><td style='font-size: 12px; font-weight: bold; color: #333;height:28px;'><img src='images/meet_arrow.png' style='width: 12px; height: 12px; border: 0px; vertical-align: -2px;' />&nbsp;" + k + "</td></tr><tr><td style='background-color: #F1F1F1; padding: 10px 10px 0px 10px; vertical-align: top; text-align: center;'><img src='" + l + "' style='height: 100px; width: 262px;border: 0px;' /></td></tr><tr><td style='width: 285px; background-color: #F1F1F1; padding: 5px 10px 0px 10px; font-size: 12px; color: #666; line-height: 20px; vertical-align: top;'>" + i + "...<a href='#' onclick=\"ShowMeettingInfo('" + m + "')\">[查看详情]</a></td></tr></table><br/>" : "<table id='MeetingInfo' style='width: 285px; border: 0px;margin:8px 8px 0px 8px;' cellpadding='0' cellspacing='0'><tr><td style='font-size: 12px; font-weight: bold; color: #333;height:28px;'><img src='images/meet_arrow.png' style='width: 12px; height: 12px; border: 0px; vertical-align: -2px;' />&nbsp;" + k + "</td></tr><tr><td style='width: 285px; background-color: #F1F1F1; padding: 5px 10px 0px 10px; font-size: 12px; color: #666; line-height: 20px; vertical-align: top;'>" + i + "...<a href='#' onclick=\"ShowMeettingInfo('" + m + "')\">[查看详情]</a></td></tr></table><br/>";
            try {
                c = {
                    closeButton: !1,
                    maxWidth: 300
                },
                n = L.popup(c).setLatLng(new L.LatLng(g,h)).setContent(b).openOn(map)
            } catch (a) {
                toastr.options = {
                    closeButton: !0,
                    progressBar: !0,
                    showMethod: "slideDown",
                    positionClass: "toast-bottom-right",
                    timeOut: 4e3
                },
                toastr.error("", a.message)
            }
        }
    });
    return o
}
function ReSetListAndTitle(a, b) {
    var c, d, e, f, g, h, i;
    if (b) {
        $(a).siblings().removeClass("namelist-select"),
        $(a).addClass("namelist-select"),
        "" != b && (c = hashtable.get(b + "datas"));
        try {
            c.length > 0 ? (d = c[0].points,
            e = c[0].enname,
            f = c[0].name,
            g = c[0].isactive,
            "1" == g ? (h = "",
            i = hashtable.get("typhoon" + b),
            null != i && (h = i["strong"]),
            $(".typhoonNameLabel,#box-typhoonname").empty().html(b + f + "(" + e + ")</br><span style='font-size:15px;'>等级:" + h + "<span>")) : $(".typhoonNameLabel,#box-typhoonname").empty().html(b + f + "(" + e + ")"),
            ShowTyphoonList(b, f, e, d)) : ($(".typhoonNameLabel").empty(),
            $("#namelist").empty().html('<li class="namelist-select" style="width: 279px;text-align: left;line-height: 43px;font-weight: bold;"><img src="images/announce.gif" style="vertical-align: -3px;" />&nbsp;&nbsp;<span>当前西太平洋无台风</span></li>'),
            $("#tflist").empty().html('<table border="0" cellpadding="0" cellspacing="0" style="margin-top: 0;"><thead><tr><td style="padding-left: 1px;"><img src="images/box_table_title.png" style="border: 0;" alt="" /></td></tr></thead></table><div style="overflow: hidden; height: 200px; margin: auto;"><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td style="width: 220px; text-align: center;"><img src=\'images/noty.png\' /></td></tr></tbody></table></div>'))
        } catch (j) {
            $(".typhoonNameLabel").empty(),
            $("#namelist").empty().html('<li class="namelist-select" style="width: 279px;text-align: left;line-height: 43px;font-weight: bold;"><img src="images/announce.gif" style="vertical-align: -3px;" />&nbsp;&nbsp;<span>当前西太平洋无台风</span></li>'),
            $("#tflist").empty().html('<table border="0" cellpadding="0" cellspacing="0" style="margin-top: 0;"><thead><tr><td style="padding-left: 1px;"><img src="images/box_table_title.png" style="border: 0;" alt="" /></td></tr></thead></table><div style="overflow: hidden; height: 200px; margin: auto;"><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td style="width: 220px; text-align: center;"><img src=\'images/noty.png\' /></td></tr></tbody></table></div>')
        }
    }
}
function LocationSearchBar() {}
function BackClick() {
    $("#back").click(function(a) {
        _id = "",
        a.stopPropagation(),
        InitializationYear(),
        $(".lastyear,.nextyear").show(),
        $(".lishi-top").html(year + "<span>﹀</span>"),
        $(".eventType").hide(),
        HistoryTyphoonByYear(),
        up = "历史台风<span>︿</span>",
        $(".lishi-top2").hide()
    })
}
var paper, w, eventresult, h = [5, 28, 52, 76], up = "历史台风<span>︿</span>", down = year + "<span>﹀</span>", _name = "", _id = "", _end = "", _start = "", eventtypehtml = "";
$(document).ready(function() {
    var b, a = document.documentElement.clientHeight;
    w = document.documentElement.clientWidth,
    $(window).on("resize", resize),
    $("#tfinfomarqueen").hide(),
    BackClick(),
    year == (new Date).getFullYear() && $(".nextyear").hide(),
    $("body").css("height", a + "px").css("width", w + "px").css("overflow", "hidden"),
    $(".box>div>table").find("tr").each(function(a) {
        1 == a % 2 && $(this).addClass("white")
    }),
    $("#closebox").click(function() {
        "0px" != $("#closebox").css("right") ? ($("#closebox").animate({
            right: "0px"
        }, "normal", function() {
            $(this).attr("src", "images/Eject.png")
        }),
        $(".tf-box").animate({
            right: "-285px"
        }, "normal")) : ($("#closebox").animate({
            right: "285px"
        }, "normal", function() {
            $(this).attr("src", "images/Indent.png")
        }),
        $(".tf-box").animate({
            right: "0px"
        }, "normal"))
    }),
    $("#showLegend").click(function() {
        $(".tuli").is(":visible") ? $(".tuli").fadeOut("slow") : $(".tuli").fadeIn("slow")
    }),
    b = 0,
    $(".tuli,#showLegend").blur(function() {
        b = setTimeout(function() {
            $(".tuli").fadeOut("slow")
        }, 200)
    }),
    $(".tuli").click(function() {
        clearTimeout(b)
    }),
    $(".lishi").css("top", a - 54 + "px").show(),
    $(".LiShi").css("width", w - 8),
    $(".lishi-top").click(function() {
        var b;
        $(".lishi").css("top") == a - 54 + "px" ? ($(".leaflet-control-attribution").hide(),
        up = $(".lishi-top").html(),
        $(".lishi-top").html(down),
        b = !1,
        $(".search-bar-panel").is(":visible") && ($(".search-bar-panel").hide(),
        b = !0),
        $(".lishi").animate({
            top: a - 168 + "px"
        }, 400, function() {
            LocationSearchBar(),
            b && $(".search-bar-panel").show()
        }),
        $(".lishi-top").find("img").length > 0 && ($(".eventType").show(),
        BackClick())) : ($(".leaflet-control-attribution").show(),
        down = $(".lishi-top").html(),
        $(".lishi-top").find("img").length > 0 ? ($(".lishi-top").find("img").remove(),
        $(".eventType").hide(),
        $(".lishi-top").html($(".lishi-top").html() + "<span>︿</span>")) : $(".lishi-top").html(up),
        b = !1,
        $(".search-bar-panel").is(":visible") && ($(".search-bar-panel").hide(),
        b = !0),
        $(".lishi").animate({
            top: a - 54 + "px"
        }, 400, function() {
            LocationSearchBar(),
            b && $(".search-bar-panel").show()
        }))
    }),
    $(".lastyear").click(function() {
        year--,
        sjjd(year),
        $("#lastyearDiv").text(year - 1),
        $("#nextyearDiv").text(year + 1),
        backToHistoryList()
    }),
    $(".nextyear").click(function() {
        year++,
        sjjd(year),
        $("#nextyearDiv").text(year + 1),
        $("#lastyearDiv").text(year - 1),
        backToHistoryList()
    }),
    paper = Raphael("LiShi", 1 * $("#LiShi").css("width").replace("px", ""), 115),
    paper.customAttributes.uid = function(a) {
        return a
    }
    ,
    paper.customAttributes.tuType = function(a) {
        return a
    }
    ,
    HistoryTyphoonByYear(),
    MoveCloudRainLegend()
});

function ShowRainCloud(a) {
    "True" == IsLogin.toString() ? DisplayRains(a) : DisplayRainPublic(a)
}
function HideRainCloud() {
    map.removeLayer(RainImgLayer),
    RainLayer.clearLayers(),
    BoundaryLayer.clearLayers()
}
function ShowClouds(a) {
    DisplayCloud(a)
}
function HideClouds() {
    map.removeLayer(CloudLayer)
}
function DrawTyphoonPath(a, b) {
    var d, e, f, g, h, i, c = new L.featureGroup([]);
    c.addTo(map),
    d = new L.featureGroup([]),
    d.addTo(map),
    e = new L.featureGroup([]),
    e.addTo(map),
    f = new L.featureGroup([]),
    f.addTo(map),
    g = new L.featureGroup([]),
    g.addTo(map),
    h = new L.featureGroup([]),
    h.addTo(map),
    i = new L.featureGroup([]),
    i.addTo(map),
    hashtable.put(a + "tfpathLayer", f),
    hashtable.put(a + "tfpointLayer", g),
    hashtable.put(a + "forecastLayer", h),
    hashtable.put(a + "eventLayer", i),
    hashtable.put(a + "circle7Layer", c),
    hashtable.put(a + "circle10Layer", d),
    hashtable.put(a + "circle12Layer", e),
    $.ajax({
        type: "GET",
        url: "Api/TyphoonInfo/" + a,
        dataType: "jsonp",
        jsonp: "callback",
        success: function(j) {
            var k, l, m, n, o, p, q, r, s, t, u, v, w, x;
            if (j.length > 0) {
                for (l = j[0].isactive,
                m = j[0].name,
                n = 0; n < j[0].points.length; n++)
                    j[0].points[n]["name"] = m;
                hashtable.put(a + "datas", j),
                k = "1" == l ? L.icon({
                    iconUrl: "images/typhoon.gif",
                    iconSize: [32, 32],
                    iconAnchor: [17, 17]
                }) : L.icon({
                    iconUrl: "images/typhoon.png",
                    iconSize: [32, 32],
                    iconAnchor: [17, 17]
                }),
                o = j[0].points,
                p = j[0].enname,
                q = a,
                q = void 0 != q && null != q && "undefined" != q && "null" != q ? q : "",
                "" == b || null == b || void 0 == b ? $(".typhoonNameLabel,#box-typhoonname").empty().html(q + m + "(" + p + ")") : $(".typhoonNameLabel,#box-typhoonname").empty().html(q + m + "(" + p + ")</br><span style='font-size:15px;'>等级:" + b + "<span>"),
                ShowTyphoonList(a, m, p, o),
                r = {
                    stroke: !0,
                    color: "#0076c9",
                    weight: 2,
                    opacity: 1,
                    fill: !1,
                    clickable: !0
                },
                s = {
                    stroke: !0,
                    color: "#353433",
                    weight: 1,
                    opacity: .5,
                    fill: !0,
                    fillOpacity: 1,
                    fillColor: "#ffffff",
                    clickable: !0
                },
                t = new L.Polyline([],r),
                f.addLayer(t),
                u = L.marker([0, 0], {
                    icon: k
                }),
                g.addLayer(u),
                map.setView([j[0].centerlat, j[0].centerlng], 5),
                v = 0,
                w = function() {
                    var b, k, n, p, q, r, x, y, z, A, B, C, D, E, F;
                    if (isPlaying = !0,
                    b = a,
                    k = o[v].lng,
                    n = o[v].lat,
                    p = o[v].strong,
                    q = o[v].radius7,
                    r = o[v].radius10,
                    x = o[v].radius12,
                    y = stringTodate(o[v].time, "MM月dd日hh时").toString(),
                    z = stringTodate(o[v].time, "yyyyMMddhh").toString(),
                    o[v].name = m,
                    map.removeLayer(c),
                    map.removeLayer(d),
                    map.removeLayer(e),
                    DrawCircle(n, k, x, 12, e),
                    DrawCircle(n, k, r, 10, d),
                    DrawCircle(n, k, q, 7, c),
                    A = GetPopupContent(o[v]),
                    u.setLatLng([n, k]),
                    t.addLatLng(new L.LatLng(n,k)),
                    s.fillColor = GetPointColor(p),
                    B = new MyCustomMarker(new L.LatLng(n,k),s),
                    B.tag = o[v],
                    B.bindPopup(A, {
                        showOnMouseOver: !0,
                        closeButton: !1,
                        latlng: b + "" + z,
                        autoClose: !1
                    }),
                    v > 2 ? p != o[v - 1].strong ? B.setRadius(6) : B.setRadius(4) : B.setRadius(4),
                    g.addLayer(B),
                    v == o.length - 1) {
                        if (isPlaying = !1,
                        DrawForecastLine(a, m, o[v].forecast, h),
                        C = j[0].land,
                        o.length > 20 && (D = L.marker(new L.LatLng(o[o.length - 1].lat,o[o.length - 1].lng), {
                            icon: new L.divIcon({
                                className: "DistanceLabelStyle",
                                iconAnchor: [-13, 10],
                                html: "<span class='bubbleLabel'><span class='bubbleLabel-bot bubbleLabel-bot-left'></span><span class='bubbleLabel-top bubbleLabel-top-left'></span><span class=''>" + m + "(" + y + ")" + "</span></span>"
                            })
                        }),
                        f.addLayer(D)),
                        C.length > 0) {
                            for (E = 0; E < C.length; E++)
                                F = L.marker([C[E].lat, C[E].lng], {
                                    icon: new L.divIcon({
                                        className: "leaflet-div-land",
                                        html: "<img src='images/land.svg' style='width:24px; height:24px;'/><div style='position: relative;bottom: 140px;left:11px; '><span style='padding: 5px;border: 1px #34A4CD solid;background-color: #F0F4F7;border-radius: 3px;color: #428BCA;float: left;'>" + C[E].info + "</span><img src='images/zx.png' style='position: relative;display:block;bottom: 1px;float: left;'/></div>"
                                    })
                                }),
                                i.addLayer(F);
                            $("#chkLand").is(":checked") && map.getZoom() < 6 && map.removeLayer(i)
                        }
                    } else
                        v++,
                        SetTimeoutId = setTimeout(w, 80),
                        v == o.length - 1 && "1" == l && (o[v].name = m,
                        A = GetPopupContent(o[o.length - 1]),
                        u.bindPopup(A, {
                            showOnMouseOver: !0,
                            closeButton: !1,
                            latlng: b + "" + z,
                            autoClose: !1
                        }),
                        typhoonMarkerArr.push(u),
                        $.each(typhoonMarkerArr, function(a, b) {
                            b.closePopup()
                        }))
                }
                ,
                o.length >= 1 && (w(),
                x = L.marker(new L.LatLng(o[0].lat,o[0].lng), {
                    icon: new L.divIcon({
                        className: "DistanceLabelStyle",
                        iconAnchor: [-13, 10],
                        html: "<span class='bubbleLabel'><span class='bubbleLabel-bot bubbleLabel-bot-left'></span><span class='bubbleLabel-top bubbleLabel-top-left'></span><span class=''>" + a + m + "</span></span>"
                    })
                }),
                f.addLayer(x))
            }
        },
        error: function(a, b, c) {
            toastr.options = {
                closeButton: !0,
                progressBar: !0,
                showMethod: "slideDown",
                positionClass: "toast-bottom-right",
                timeOut: 4e3
            },
            toastr.error("", c)
        }
    })
}
function TyphoonPointMouseOverFromPath(a) {
    var b, c, d;
    try {
        for (b = document.getElementById("typhoonbody").children,
        c = 0,
        d = 0; d < b.length; d++)
            b[d].style.backgroundColor = "",
            b[d].id == a && (c = d);
        document.getElementById("typhoonbody").parentNode.parentNode.scrollTop = 25 * c,
        $("#tflist").find("tr[id='" + a + "']").children("td").addClass("tdhover")
    } catch (e) {}
}
function TyphoonPointMouseOutFromPath(a) {
    try {
        $("#tflist").find("tr[id='" + a + "']").children("td").removeClass("tdhover"),
        $("#tflist").find("tr[id='" + a + "']").siblings("tr td").removeClass("tdhover")
    } catch (b) {}
}
function DrawCircle(a, b, c, d, e) {
    var f, g, h, i, j;
    e.clearLayers(),
    f = {
        stroke: !0,
        color: "#eea01d",
        weight: 1,
        opacity: .8,
        fill: !0,
        fillOpacity: .3,
        fillColor: "#eea01d",
        clickable: !0
    },
    c = c.split("|"),
    4 == c.length && 0 != c[0] && 0 != c[1] && 0 != c[2] && 0 != c[3] && (f = $.extend({
        NORTHEAST: 1e3 * c[0],
        SOUTHEAST: 1e3 * c[1],
        NORTHWEST: 1e3 * c[2],
        SOUTHWEST: 1e3 * c[3]
    }, f),
    g = (d + "").replace("7", "七").replace("10", "十").replace("12", "十二") + "级风圈<br/>西北:" + c[2] + "km | 东北:" + c[0] + "km<br/>西南:" + c[3] + "km | 东南:" + c[1] + "km",
    7 == d && (h = new L.windCircle(new L.LatLng(a,b),f),
    e.bindPopup(g, {
        className: "windCircle"
    }).addLayer(h)),
    10 == d && (f.fillOpacity = .5,
    i = new L.windCircle(new L.LatLng(a,b),f),
    e.bindPopup(g, {
        className: "windCircle"
    }).addLayer(i)),
    12 == d && (f.fillOpacity = .7,
    j = new L.windCircle(new L.LatLng(a,b),f),
    e.bindPopup(g, {
        className: "windCircle"
    }).addLayer(j)),
    e.on("mouseover", function() {
        this.openPopup()
    }).on("mouseout", function() {
        this.closePopup()
    }),
    $("#chkCircle").is(":checked") && (e.addTo(map),
    e.bringToBack()))
}
function DrawForecastLine(a, b, c, d) {
    var e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u;
    for (d.clearLayers(),
    e = 0; e < c.length; e++) {
        switch (f = "",
        g = c[e].tm) {
        case "中国":
            f = "#ff0000";
            break;
        case "日本":
            f = "#2BBE00";
            break;
        case "中国香港":
            f = "#fe9104";
            break;
        case "中国台湾":
            f = "#FF00FF";
            break;
        case "美国":
            f = "#11f7f7"
        }
        for (h = {
            stroke: !0,
            color: f,
            dashArray: "10,5",
            weight: 1,
            opacity: 1,
            fill: !1,
            clickable: !0
        },
        i = {
            stroke: !0,
            color: "#353433",
            weight: 1,
            opacity: .5,
            fill: !0,
            fillOpacity: 1,
            fillColor: "#ffffff",
            clickable: !0
        },
        j = new L.Polyline([],h),
        d.addLayer(j),
        k = c[e].forecastpoints,
        l = 0; l < k.length; l++)
            m = k[l].time,
            n = k[l].lng,
            o = k[l].lat,
            p = k[l].speed,
            q = k[l].pressure,
            r = k[l].strong,
            s = k[l].power,
            j.addLatLng(new L.LatLng(o,n)),
            s = "" != s || null != s || "null" != s.toLowerCase() ? s > 17 ? "17级以上" : s + "级" : "--",
            t = "<div><ul class='tfinfo' style='top: 20%; left: 50%;'>",
            t += "<li class='tfinfo-head'><span style='font-weight:bold;font-size:14px;'>" + g + "</span>&nbsp;&nbsp;&nbsp;&nbsp;" + stringTodate(m, "M月d日h时") + "&nbsp;预报</li>",
            t += "<li>当前位置<span>" + CheckData(n) + "°&nbsp;/&nbsp;" + CheckData(o) + "°</span></li>",
            t += "<li>中心气压<span>" + CheckData(q) + "&nbsp;百帕</span></li>",
            t += "<li>最大风速<span>" + CheckData(p) + "&nbsp;米/秒</span></li>",
            t += "<li style='background: #fff;'>风&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;力<span>" + s + "</span></li>",
            t += " </ul></div>",
            i.fillColor = GetPointColor(r),
            0 != l && (u = new MyCustomMarker(new L.LatLng(o,n),i),
            u.tag = k[l],
            u.tm = g,
            u.bindPopup(t, {
                showOnMouseOver: !0,
                closeButton: !1,
                latlng: o + "" + n
            }),
            u.setRadius(4),
            d.addLayer(u))
    }
    $("#chkForecast").is(":checked") || map.removeLayer(d)
}
function ShowTyphoonList(a, b, c, d) {
    var e, f, g, h, i, j, k, l, m, n;
    for (CurTyphoonListIndex = 0,
    e = '<table border="0" cellpadding="0" cellspacing="0" style="margin-top: 0;"><thead><tr><td style="padding-left: 0px;"><img src="images/tfbox/fengn.png" alt="" style="float: left; position: absolute; left: 13px; padding-top: 2px;" /><img src="images/box_table_title.png" style="border: 0;" alt="" /></td></tr></thead></table>',
    e += " <div style='overflow-y: scroll; overflow-x: hidden; height: 201px; margin: auto;width:273px;border-bottom: 1px #ddd solid;border-right: 1px #ddd solid;border-left:1px #ddd solid;'><table border='0' cellpadding='0' cellspacing='0' style='border-collapse: collapse;'><tbody id='typhoonbody'>",
    f = d.length - 1; f >= 0; f--)
        g = a,
        h = d[f].time,
        i = d[f].pressure,
        j = d[f].movespeed,
        k = d[f].power,
        k = k > 17 ? "17以上" : k,
        l = stringTodate(h, "yyyyMMddhh").toString(),
        e += "<tr id='" + g + l + "' onmousedown=\"TyphoonPointMouseDown(this,'" + g + "','" + h + "');\" onmouseover=\"TyphoonPointMouseOverFromList(this,'" + g + "')\" onmouseout='TyphoonPointMouseOutFromList(this)'  style='cursor:pointer'><td class='td125'>" + stringTodate(h, "MM月dd日 hh时") + "</td><td class='td35'>" + i + "</td><td class='td35'>" + k + "</td><td class='td25'>" + j + "</td></tr>";
    if (d.length < 8)
        for (m = 0; m < 8 - d.length; m++)
            e += "<tr ><td class='td125'></td><td class='td35'></td><td class='td35'></td><td class='td25'></td></tr>";
    e += "</tbody></table> </div>",
    n = $("#namelist").find(".namelist-select").attr("id"),
    n && n != a || $("#tflist").empty().html(e),
    $("#tflist table:not(:first)").find("tr").each(function(a) {
        0 == a % 2 ? $.each($(this).find("td"), function(a, b) {
            $(b).addClass("tdnormal")
        }) : $.each($(this).find("td"), function(a, b) {
            $(b).addClass("tdeven")
        })
    })
}
function TyphoonPointMouseDownWithoutLogin(a, b, c) {
    var d, e, f, g, h, i, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, C, D, E, F, J, K, M, O, P;
    if ($(a).siblings("tr").children("td").removeClass("tdclick"),
    $(a).children("td").addClass("tdclick"),
    $(a).siblings("tr").children("td").removeClass("tdclick"),
    $(a).children("td").addClass("tdclick"),
    d = hashtable.get(b + "datas"),
    f = "0",
    null != d && (e = d[0].points,
    f = d[0].isactive),
    e) {
        if (isPlaying)
            return;
        for (g = hashtable.get(b + "tfpathLayer").clearLayers(),
        h = hashtable.get(b + "tfpointLayer").clearLayers(),
        i = hashtable.get(b + "forecastLayer").clearLayers(),
        hashtable.get(b + "eventLayer").clearLayers(),
        k = hashtable.get(b + "circle7Layer").clearLayers(),
        l = hashtable.get(b + "circle10Layer").clearLayers(),
        m = hashtable.get(b + "circle12Layer").clearLayers(),
        n = {
            stroke: !0,
            color: "#0076c9",
            weight: 2,
            opacity: 1,
            fill: !1,
            clickable: !0
        },
        o = {
            stroke: !0,
            color: "#353433",
            weight: 1,
            opacity: .5,
            fill: !0,
            fillOpacity: 1,
            fillColor: "#ffffff",
            clickable: !0
        },
        p = new L.Polyline([],n),
        g.addLayer(p),
        q = "1" == f ? L.icon({
            iconUrl: "images/typhoon.gif",
            iconSize: [32, 32],
            iconAnchor: [17, 17]
        }) : L.icon({
            iconUrl: "images/typhoon.png",
            iconSize: [32, 32],
            iconAnchor: [17, 17]
        }),
        r = L.marker([0, 0], {
            icon: q
        }),
        h.addLayer(r),
        CurTyphoonListIndex = 0,
        s = 0; s < e.length; s++)
            if (t = stringTodate(e[s].time, "yyyyMMddhh").toString(),
            u = b + t,
            a.id == u) {
                CurTyphoonListIndex = s;
                break
            }
        for (v = [],
        w = 0; w < e.length; w++)
            if (x = e[w].time,
            y = e[w].lng,
            z = e[w].lat,
            e[w].speed,
            e[w].pressure,
            C = e[w].strong,
            D = e[w].radius7,
            E = e[w].radius10,
            F = e[w].radius12,
            e[w].movespeed,
            e[w].movedirection,
            e[w].power,
            p.addLatLng(new L.LatLng(z,y)),
            !(w > CurTyphoonListIndex)) {
                if (o.fillColor = GetPointColor(C),
                J = b + stringTodate(x, "yyyyMMddhh").toString(),
                a.id == J && (CurTyphoonListIndex >= w || 0 == CurTyphoonListIndex)) {
                    K = GetPopupContent(e[w]),
                    r.setLatLng([z, y]);
                    try {
                        M = {
                            closeButton: !1
                        },
                        P = L.popup(M).setLatLng(new L.LatLng(z,y)).setContent(K).openOn(map)
                    } catch (N) {
                        toastr.options = {
                            closeButton: !0,
                            progressBar: !0,
                            showMethod: "slideDown",
                            positionClass: "toast-bottom-right",
                            timeOut: 4e3
                        },
                        toastr.error("", N.message)
                    }
                }
                O = new L.CircleMarker(new L.LatLng(z,y),o),
                O.tag = e[w],
                w > 2 ? C != e[w - 1].strong ? O.setRadius(6) : O.setRadius(4) : O.setRadius(4),
                h.addLayer(O),
                M = {
                    closeButton: !1
                },
                P = L.popup(M),
                O.on("mouseover", function() {
                    var b, c, d;
                    this.getRadius() > 6 ? this.setRadius(10) : this.setRadius(8),
                    b = GetPopupContent(this.tag),
                    c = this.tag.lat,
                    d = this.tag.lng,
                    setTimeout(function() {
                        var a = {
                            closeButton: !1
                        };
                        P = L.popup(a).setLatLng(new L.LatLng(c,d)).setContent(b).openOn(map),
                        TyphoonPointMouseOverFromPath(c + "" + d)
                    }, 200)
                }),
                O.on("mouseout", function() {
                    this.getRadius() > 8 ? this.setRadius(6) : this.setRadius(4),
                    TyphoonPointMouseOutFromPath(z + "" + y),
                    P && map.removeLayer(P)
                }),
                map.removeLayer(k),
                map.removeLayer(l),
                DrawCircle(z, y, F, 12, m),
                DrawCircle(z, y, E, 10, l),
                DrawCircle(z, y, D, 7, k),
                v.push(O),
                DrawForecastLine(b, c, e[w].forecast, i)
            }
        for (p.bringToFront(),
        w = 0; w < v.length; w++)
            v[w].bringToFront()
    }
}
function TyphoonPointMouseDown(a, b, c) {
    var d, e, f, g, h, i, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, B, C, D, E, I, J, K, N;
    if ($(a).siblings("tr").children("td").removeClass("tdclick"),
    $(a).children("td").addClass("tdclick"),
    DisplayHistoryRainAndCloud(c),
    $(a).siblings("tr").children("td").removeClass("tdclick"),
    $(a).children("td").addClass("tdclick"),
    d = hashtable.get(b + "datas"),
    f = "0",
    null != d && (e = d[0].points,
    f = d[0].isactive),
    e) {
        if (isPlaying)
            return;
        for (g = hashtable.get(b + "tfpathLayer").clearLayers(),
        h = hashtable.get(b + "tfpointLayer").clearLayers(),
        i = hashtable.get(b + "forecastLayer").clearLayers(),
        hashtable.get(b + "eventLayer").clearLayers(),
        k = hashtable.get(b + "circle7Layer").clearLayers(),
        l = hashtable.get(b + "circle10Layer").clearLayers(),
        m = hashtable.get(b + "circle12Layer").clearLayers(),
        n = {
            stroke: !0,
            color: "#0076c9",
            weight: 2,
            opacity: 1,
            fill: !1,
            clickable: !0
        },
        o = {
            stroke: !0,
            color: "#353433",
            weight: 1,
            opacity: .5,
            fill: !0,
            fillOpacity: 1,
            fillColor: "#ffffff",
            clickable: !0
        },
        p = new L.Polyline([],n),
        g.addLayer(p),
        q = "1" == f ? L.icon({
            iconUrl: "images/typhoon.gif",
            iconSize: [32, 32],
            iconAnchor: [17, 17]
        }) : L.icon({
            iconUrl: "images/typhoon.png",
            iconSize: [32, 32],
            iconAnchor: [17, 17]
        }),
        r = L.marker([0, 0], {
            icon: q
        }),
        h.addLayer(r),
        CurTyphoonListIndex = 0,
        s = 0; s < e.length; s++)
            if (t = stringTodate(e[s].time, "yyyyMMddhh").toString(),
            u = b + t,
            a.id == u) {
                CurTyphoonListIndex = s;
                break
            }
        for (v = [],
        w = 0; w < e.length; w++)
            if (c = e[w].time,
            x = e[w].lng,
            y = e[w].lat,
            e[w].speed,
            e[w].pressure,
            B = e[w].strong,
            C = e[w].radius7,
            D = e[w].radius10,
            E = e[w].radius12,
            e[w].movespeed,
            e[w].movedirection,
            e[w].power,
            p.addLatLng(new L.LatLng(y,x)),
            !(w > CurTyphoonListIndex)) {
                if (o.fillColor = GetPointColor(B),
                I = b + stringTodate(c, "yyyyMMddhh").toString(),
                a.id == I && (CurTyphoonListIndex >= w || 0 == CurTyphoonListIndex)) {
                    J = GetPopupContent(e[w]),
                    r.setLatLng([y, x]);
                    try {
                        K = {
                            closeButton: !1
                        },
                        _infowin = L.popup(K).setLatLng(new L.LatLng(y,x)).setContent(J).openOn(map)
                    } catch (M) {
                        toastr.options = {
                            closeButton: !0,
                            progressBar: !0,
                            showMethod: "slideDown",
                            positionClass: "toast-bottom-right",
                            timeOut: 4e3
                        },
                        toastr.error("", M.message)
                    }
                }
                N = new MyCustomMarker(new L.LatLng(y,x),o),
                N.tag = e[w],
                J = GetPopupContent(e[w]),
                N.bindPopup(J, {
                    showOnMouseOver: !0,
                    closeButton: !1,
                    latlng: b + "" + c
                }),
                w > 2 ? B != e[w - 1].strong ? N.setRadius(6) : N.setRadius(4) : N.setRadius(4),
                h.addLayer(N),
                map.removeLayer(k),
                map.removeLayer(l),
                DrawCircle(y, x, E, 12, m),
                DrawCircle(y, x, D, 10, l),
                DrawCircle(y, x, C, 7, k),
                v.push(N),
                DrawForecastLine(b, name, e[w].forecast, i)
            }
        for (p.bringToFront(),
        w = 0; w < v.length; w++)
            v[w].bringToFront()
    }
}
function DisplayHistoryRainAndCloud(time) {
    $.ajax({
        type: "GET",
        url: "Api/HistoryData/" + stringTodate(time, "yyyy-MM-dd_hh_mm_ss") + "/24h",
        dataType: "jsonp",
        jsonp: "callback",
        success: function(result) {
            var data, imageUrl, imageBounds, rain;
            result.length > 0 && (data = eval("(" + result[0].data + ")"),
            map.removeLayer(CloudLayer),
            imageUrl = "http://taifeng.oss.aliyuncs.com/cloud/" + data.cloudName,
            imageBounds = [[-2, 95], [43, 160]],
            CloudLayer = L.imageOverlay(imageUrl, imageBounds, {
                maxZoom: 8
            }),
            CloudLayer.addTo(map),
            map._panes.overlayPane.children[0].style.zIndex = "2",
            map._panes.overlayPane.children[1].style.zIndex = "-1",
            RainLayer.clearLayers(),
            BoundaryLayer.clearLayers(),
            rain = data.rain,
            HandleRainMarker(rain),
            HandleRainLegend("old", "24h", rain, time))
        },
        error: function() {}
    })
}
function TyphoonPointMouseOverFromList(a, b) {
    $(a).children("td").addClass("tdhover"),
    clearTimeout(delayid),
    delayid = setTimeout(function() {
        DelayMethod(a, b)
    }, 500)
}
function DelayMethod(a, b) {
    var c, d, e, f, g, h, i, j, k;
    if (!isPlaying && (_infowin && map.removeLayer(_infowin),
    c = hashtable.get(b + "datas"),
    null != c))
        for (d = c[0].points,
        e = 0; e < d.length; e++)
            if (f = d[e].lng,
            g = d[e].lat,
            h = stringTodate(d[e].time, "yyyyMMddhh").toString(),
            i = b + h,
            a.id == i && (CurTyphoonListIndex >= e || 0 == CurTyphoonListIndex)) {
                j = GetPopupContent(d[e]);
                try {
                    k = {
                        closeButton: !1
                    },
                    _infowin = L.popup(k).setLatLng(new L.LatLng(g,f)).setContent(j).openOn(map)
                } catch (l) {
                    toastr.options = {
                        closeButton: !0,
                        progressBar: !0,
                        showMethod: "slideDown",
                        positionClass: "toast-bottom-right",
                        timeOut: 4e3
                    },
                    toastr.error("", l.message)
                }
                break
            }
}
function TyphoonPointMouseOutFromList(a) {
    clearTimeout(delayid),
    delayid = setTimeout(function() {
        _infowin && (map.removeLayer(_infowin),
        map.closePopup())
    }, 300),
    $(a).children("td").removeClass("tdhover")
}
function AddBoundary() {
    var a, b, c, d, e;
    for (BoundaryLayer.clearLayers(),
    a = {
        stroke: !0,
        color: "red",
        dashArray: "10,5",
        weight: 2,
        opacity: .7,
        fillColor: "white",
        fillOpacity: .5,
        fill: !0,
        clickable: !0
    },
    b = regions.split("|"),
    c = new Array,
    d = 0; d < b.length; d += 2)
        c.push(new L.LatLng(b[d + 1],b[d]));
    e = new L.polygon(c,a),
    BoundaryLayer.addLayer(e)
}
function CheckData(a) {
    return "0" == a || null == a || "null" == a || void 0 == a || "undefined" == a ? "--" : a
}
function GetPopupContent(a) {
    function c(a) {
        var c, b = a.split("|");
        return 4 == b.length ? (b.sort(function(a, b) {
            return a - b
        }),
        c = b[0] == b[3] ? b[3] : b[0] + "~" + b[3],
        c + "&nbsp;公里") : ""
    }
    var d, b = "<div><ul class='tfinfo' style='top: 20%; left: 50%;'>";
    try {
        d = "" != a.power || null != a.power || "null" != a.power.toLowerCase() ? a.power > 17 ? "17级以上" : a.power + "级" : "--",
        b += "<li class='tfinfo-head'><span style='font-weight:bold;font-size:14px;'>" + a.name + "</span>&nbsp;&nbsp;&nbsp;&nbsp;" + stringTodate(a.time, "M月d日h时") + "</li>",
        b += "<li>中心位置<span>" + CheckData(a.lng) + "°&nbsp;/&nbsp;" + CheckData(a.lat) + "°</span></li>",
        b += "<li>风速风力<span>" + CheckData(a.speed) + "&nbsp;米/秒,<span style='font-weight:700;color:red;'>" + d + "(" + CheckData(a.strong) + ")</span></span></li>",
        b += "<li>中心气压<span>" + CheckData(a.pressure) + "&nbsp;百帕</span></li>",
        b += "<li>移速移向<span>" + CheckData(a.movespeed) + "公里/小时，" + CheckData(a.movedirection) + "</span></li>",
        a.radius7 && "" != a.radius7 && (b += " <li>七级半径<span>" + c(CheckData(a.radius7)) + "</li>"),
        a.radius10 && "" != a.radius10 && (b += " <li>十级半径<span>" + c(CheckData(a.radius10)) + "</span></li>"),
        a.radius12 && "" != a.radius12 && (b += " <li>十二级半径<span>" + c(CheckData(a.radius12)) + "</span></li>"),
        a.ckposition && "" != a.ckposition && (b += " <li class='multiline'>参考位置<span>" + CheckData(a.ckposition) + "</span></li>"),
        a.jl && "" != a.jl && (/(.*)(（.*?）)/.exec(CheckData(a.jl)),
        b += " <li class='multiline' style='padding: 3px 0;'>未来趋势<span>" + CheckData(RegExp.$1) + "</span></li>")
    } catch (e) {}
    return b += " </ul></div>"
}
function refreshTF(a) {
    event.stopPropagation(),
    DrawTyphoonPathWithOutPlaying(this, a)
}
function CloseTF(a, b, c) {
    var d, e, f, h, i, j, k, l;
    stopPropagation(b),
    d = hashtable.get("tfids"),
    d = d.replace("," + c, "").replace(c, "").replace(",,", ""),
    hashtable.put("tfids", d),
    hashtable.remove(c + "datas"),
    clearTimeout(SetTimeoutId),
    $(a).parent().remove(),
    map.removeLayer(hashtable.get(c + "tfpathLayer")),
    map.removeLayer(hashtable.get(c + "tfpointLayer")),
    map.removeLayer(hashtable.get(c + "forecastLayer")),
    map.removeLayer(hashtable.get(c + "eventLayer")),
    map.removeLayer(hashtable.get(c + "circle7Layer")),
    map.removeLayer(hashtable.get(c + "circle10Layer")),
    map.removeLayer(CloudLayer),
    RainLayer.clearLayers(),
    BoundaryLayer.clearLayers(),
    $("#back").click(),
    e = $("#namelist li").size(),
    0 == e && ($("#tflist").empty().html('<table border="0" cellpadding="0" cellspacing="0" style="margin-top: 0;"><thead><tr><td style="padding-left: 1px;"><img src="images/box_table_title.png" style="border: 0;" alt="" /></td></tr></thead></table><div style="overflow: hidden; height: 200px; margin: auto;"><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td style="width: 220px; text-align: center;"><img src=\'images/noty.png\' /></td></tr></tbody></table></div>'),
    $(".typhoonNameLabel").empty(),
    $("#namelist").empty().html('<li class="namelist-select" style="width: 279px;text-align: left;line-height: 43px;font-weight: bold;"><img src="images/announce.gif" style="vertical-align: -3px;" />&nbsp;&nbsp;<span>当前西太平洋无台风</span></li>')),
    $("#namelist li").eq(0).click(),
    1 == e && (f = hashtable.get(d + "datas"),
    f[0].points,
    h = f[0].enname,
    i = f[0].name,
    j = f[0].isactive,
    "1" == j ? (k = "",
    l = hashtable.get("typhoon" + d),
    null != l && (k = l["strong"]),
    $("#namelist").empty().html('<li id="' + d + '" onclick="DrawTyphoonPathWithOutPlaying(this,\'' + d + '\')" class="namelist-select" style="width: 279px;text-align: left;line-height: 43px;font-weight: bold;"><img src="images/announce.gif" style="vertical-align: -3px;" />&nbsp;<span>' + i + "</span>&nbsp;【<span>" + k + '</span>】&nbsp;<img src="images/tfbox/refresh.gif" style="vertical-align: -4px;"  alt="刷新" onclick="refreshTF(' + d + ')" /></li>'),
    $(".typhoonNameLabel,#box-typhoonname").empty().html(c + i + "(" + h + ")</br><span style='font-size:15px;'>等级:" + k + "<span>")) : ($("#namelist").empty().html('<li id="' + d + '" onclick="ReSetListAndTitle(this,' + d + ')" class="namelist-select" style="width: 279px;text-align: left;line-height: 43px;font-weight: bold;">&nbsp;&nbsp;<span>' + i + "</span>&nbsp;(" + d + ')&nbsp;&nbsp;&nbsp;<img src="images/tfbox/closen.png" style="vertical-align: -2px;"  alt="关闭" onclick="CloseTF(this,event,' + d + ')" /></li>'),
    $(".typhoonNameLabel,#box-typhoonname").empty().html(c + i + "(" + h + ")")))
}
function DrawTyphoonPathWithOutPlaying(a, b) {
    $(a).siblings().removeClass("namelist-select"),
    $(a).addClass("namelist-select");
    var c = hashtable.get(b + "datas");
    $.ajax({
        type: "GET",
        url: "Api/TyphoonInfo/" + b,
        dataType: "jsonp",
        jsonp: "callback",
        success: function(a) {
            var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, M, N;
            if (a.length > 0)
                if (d = a[0].points,
                d.length != c[0].points.length) {
                    for (e = hashtable.get(b + "tfpathLayer").clearLayers(),
                    f = hashtable.get(b + "tfpointLayer").clearLayers(),
                    g = hashtable.get(b + "forecastLayer").clearLayers(),
                    h = hashtable.get(b + "eventLayer").clearLayers(),
                    i = hashtable.get(b + "circle7Layer").clearLayers(),
                    j = hashtable.get(b + "circle10Layer").clearLayers(),
                    k = hashtable.get(b + "circle12Layer").clearLayers(),
                    m = a[0].isactive,
                    n = a[0].name,
                    o = 0; o < a[0].points.length; o++)
                        a[0].points[o]["name"] = n;
                    for (hashtable.put(b + "datas", a),
                    l = "1" == m ? L.icon({
                        iconUrl: "images/typhoon.gif",
                        iconSize: [32, 32],
                        iconAnchor: [17, 17]
                    }) : L.icon({
                        iconUrl: "images/typhoon.png",
                        iconSize: [32, 32],
                        iconAnchor: [17, 17]
                    }),
                    p = a[0].points,
                    q = a[0].enname,
                    r = b,
                    r = void 0 != r && null != r && "undefined" != r && "null" != r ? r : "",
                    "1" == m ? (s = "",
                    t = hashtable.get("typhoon" + b),
                    null != t && (s = t["strong"]),
                    $(".typhoonNameLabel,#box-typhoonname").empty().html(r + n + "(" + q + ")</br><span style='font-size:15px;'>等级:" + s + "<span>")) : $(".typhoonNameLabel,#box-typhoonname").empty().html(r + n + "(" + q + ")"),
                    ShowTyphoonList(b, n, q, p),
                    u = {
                        stroke: !0,
                        color: "#0076c9",
                        weight: 2,
                        opacity: 1,
                        fill: !1,
                        clickable: !0
                    },
                    v = {
                        stroke: !0,
                        color: "#353433",
                        weight: 1,
                        opacity: .5,
                        fill: !0,
                        fillOpacity: 1,
                        fillColor: "#ffffff",
                        clickable: !0
                    },
                    w = new L.Polyline([],u),
                    e.addLayer(w),
                    x = L.marker([0, 0], {
                        icon: l
                    }),
                    f.addLayer(x),
                    y = 0; y < p.length; y++)
                        if (p[y].name = n,
                        z = b,
                        A = p[y].lng,
                        B = p[y].lat,
                        C = p[y].strong,
                        D = p[y].radius7,
                        E = p[y].radius10,
                        F = p[y].radius12,
                        G = stringTodate(p[y].time, "yyyyMMddhh").toString(),
                        map.removeLayer(i),
                        map.removeLayer(j),
                        DrawCircle(B, A, F, 12, k),
                        DrawCircle(B, A, E, 10, j),
                        DrawCircle(B, A, D, 7, i),
                        x.setLatLng([B, A]),
                        w.addLatLng(new L.LatLng(B,A)),
                        H = GetPopupContent(p[y]),
                        v.fillColor = GetPointColor(C),
                        I = new MyCustomMarker(new L.LatLng(B,A),v),
                        I.tag = p[y],
                        I.bindPopup(H, {
                            showOnMouseOver: !0,
                            closeButton: !1,
                            latlng: z + "" + G
                        }),
                        y > 2 ? C != p[y - 1].strong ? I.setRadius(6) : I.setRadius(4) : I.setRadius(4),
                        e.addLayer(I),
                        y == p.length - 1 && (DrawForecastLine(b, n, p[y].forecast, g),
                        J = a[0].land,
                        J.length > 0))
                            for (K = 0; K < J.length; K++)
                                M = L.marker([J[K].lat, J[K].lng], {
                                    icon: new L.divIcon({
                                        className: "leaflet-div-land",
                                        html: "<img src='images/flag.png' style='width:24px; height:24px;'/><div style='position: relative;bottom: 135px;left:2px; '><span style='padding: 5px;border: 1px #34A4CD solid;background-color: #F0F4F7;border-radius: 3px;color: #428BCA;float: left;'>" + J[K].info + "</span><img src='images/zx.png' style='position: relative;display:block;bottom: 1px;float: left;'/></div>",
                                        iconAnchor: [24, 24]
                                    })
                                }),
                                h.addLayer(M);
                    p.length >= 1 && (play(),
                    N = L.marker(new L.LatLng(p[0].lat,p[0].lng), {
                        icon: new L.divIcon({
                            className: "DistanceLabelStyle",
                            iconAnchor: [-13, 10],
                            html: "<span class='bubbleLabel'><span class='bubbleLabel-bot bubbleLabel-bot-left'></span><span class='bubbleLabel-top bubbleLabel-top-left'></span><span class=''>" + b + n + "</span></span>"
                        })
                    }),
                    e.addLayer(N))
                } else
                    ReSetListAndTitle(this, b)
        },
        error: function(a, b, c) {
            toastr.options = {
                closeButton: !0,
                progressBar: !0,
                showMethod: "slideDown",
                positionClass: "toast-bottom-right",
                timeOut: 4e3
            },
            toastr.error("", c)
        }
    })
}
function HandleNameList(a, b, c, d) {
    var e, f, g, h, i, j;
    "" != a && null != a && null != b && "" != b && (e = $("#namelist li").size(),
    $("#namelist li").removeClass("namelist-select"),
    1 >= e ? (f = $.trim($("#namelist li").text()),
    1 == contains(f, "当前西太平洋无台风", !0) || "" == f || "  " == f ? "1" == d ? $("#namelist").empty().html('<li id="' + a + '" onclick="DrawTyphoonPathWithOutPlaying(this,\'' + a + '\')" class="namelist-select" style="width: 279px;text-align: left;line-height: 43px;font-weight: bold;"><img src="images/announce.gif" style="vertical-align: -3px;" />&nbsp;&nbsp;&nbsp;<span>' + b + "</span>&nbsp;【<span >" + c + '</span>】&nbsp;<img src="images/tfbox/refresh.gif" style="vertical-align: -4px;"  alt="刷新" onclick="refreshTF(' + a + ')" /></li>') : $("#namelist").empty().html('<li id="' + a + '" onclick="ReSetListAndTitle(this,' + a + ')" class="namelist-select" style="width: 279px;text-align: left;line-height: 43px;font-weight: bold;">&nbsp;&nbsp;<span>' + b + "</span>&nbsp;(" + a + ')&nbsp;&nbsp;&nbsp;<img src="images/tfbox/closen.png" style="vertical-align: -2px;"  alt="关闭" onclick="CloseTF(this,event,' + a + ')" /></li>') : (g = hashtable.get("tfids"),
    g = g.replace("," + a, "").replace(",,", ""),
    h = $("#namelist li span").text(),
    i = "",
    j = hashtable.get("typhoon" + g),
    null != j && (i = j["strong"]),
    1 == contains(h, i, !0) && "" != i ? $("#namelist").empty().html(NameListHtmlG(g, h.replace(i, ""), i, "1")) : $("#namelist").empty().html(NameListHtmlG(g, h.replace(i, ""), i, "0")),
    $("#namelist li").removeClass("namelist-select"),
    "1" == d ? $("#namelist").append('<li id="' + a + '" class="namelist-select" onclick="DrawTyphoonPathWithOutPlaying(this,\'' + a + "')\"><i style='background:#0099CC;border-radius: 50%;'><img src='images/refresh.gif' alt='' style='width: 14px;'/></i><span>" + b + "</span><br /><span >" + c + "</span></li>") : $("#namelist").append('<li id="' + a + '" onclick="ReSetListAndTitle(this,' + a + ')" class="namelist-select"><i class="namelist-close" alt="关闭" onclick="CloseTF(this,event,' + a + ')"></i><span>' + b + "</span><br />" + a + "</li>"))) : "1" == d ? $("#namelist").append('<li id="' + a + '" class="namelist-select" onclick="DrawTyphoonPathWithOutPlaying(this,\'' + a + "')\"><i style='background:#0099CC;border-radius: 50%;'><img src='images/refresh.gif' alt='' style='width: 14px;'/></i><span>" + b + "</span><br /><span >" + c + "</span></li>") : $("#namelist").append('<li id="' + a + '" onclick="ReSetListAndTitle(this,' + a + ')" class="namelist-select"><i class="namelist-close" alt="关闭" onclick="CloseTF(this,event,' + a + ')"></i><span>' + b + "</span><br />" + a + "</li>"))
}
function NameListHtmlG(a, b, c, d) {
    var e = "";
    return e = "1" == d ? '<li id="' + a + '" class="namelist-select" onclick="DrawTyphoonPathWithOutPlaying(this,\'' + a + "')\"><i style='background:#0099CC;border-radius: 50%;'><img src='images/refresh.gif' alt='' style='width: 14px;'/></i><span>" + b + "</span><br /><span >" + c + "</span></li>" : '<li id="' + a + '" onclick="ReSetListAndTitle(this,' + a + ')" class="namelist-select"><i class="namelist-close" alt="关闭" onclick="CloseTF(this,event,' + a + ')"></i><span>' + b + "</span><br />" + a + "</li>"
}
function stopPropagation(a) {
    a = a || window.event,
    a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
}
var cloudNmae, isPlaying, typhoonMarkerArr, CurTyphoonListIndex, delayid;
$(document).ready(function() {
    function j(a, b) {
        var d, e, f, c = hashtable.get("tfids");
        if (null != c && c.length > 0)
            for (d = c.split(","),
            e = 0; e < d.length; e++)
                f = hashtable.get(d[e] + a),
                null != f && (b ? map.addLayer(f) : map.removeLayer(f))
    }
    var a, b, c, d, e, f, g, h, i, k, l, n, o;
    $("#raincloud img[id^='rc']").css({
        cursor: "pointer",
        border: "0px"
    }).click(function() {
        var a = $(this).attr("alt")
          , b = $(this).attr("src");
        contains(b, "-1", !0) ? ($(this).siblings().each(function() {
            $(this).attr("src") && $(this).attr("src", $(this).attr("src").replace("-2", "-1"))
        }),
        $(this).attr("src", $(this).attr("src").replace("-1", "-2")),
        ShowRainCloud(a)) : ($(this).attr("src", $(this).attr("src").replace("-2", "-1")),
        HideRainCloud())
    }),
    $("#DivCloud img[id^='cl']").css({
        cursor: "pointer",
        border: "0px"
    }).click(function() {
        var a = $(this).attr("alt")
          , b = $(this).attr("src");
        contains(b, "-1", !0) ? ($(this).siblings().each(function() {
            $(this).attr("src", $(this).attr("src").replace("-2", "-1"))
        }),
        $(this).attr("src", $(this).attr("src").replace("-1", "-2")),
        ShowClouds(a)) : ($(this).attr("src", $(this).attr("src").replace("-2", "-1")),
        HideClouds())
    }),
    a = L.icon({
        iconUrl: "images/hour24.png",
        iconSize: [15, 89]
    }),
    b = L.icon({
        iconUrl: "images/hour48.png",
        iconSize: [15, 89]
    }),
    c = L.marker([26, 127], {
        icon: a
    }),
    d = L.marker([26, 132], {
        icon: b
    }),
    LabelingLayer.addLayer(c),
    LabelingLayer.addLayer(d),
    e = [new L.LatLng(34,127), new L.LatLng(22,127), new L.LatLng(18,120), new L.LatLng(11,120), new L.LatLng(4.5,113), new L.LatLng(0,105)],
    f = [new L.LatLng(34,132), new L.LatLng(15,132), new L.LatLng(0,120), new L.LatLng(0,105)],
    L.polyline(e, {
        color: "#ffff00",
        weight: 1.5
    }).addTo(map),
    L.polyline(f, {
        color: "#0000ff",
        weight: .8
    }).addTo(map),
    $("#CenterToZhejiang").click(function() {
        map.setView([29.6, 124.5], 7)
    }),
    $("#CenterToPacific").click(function() {
        map.setView([27.102876824034496, 170.44657177734373], 4)
    }),
    g = !1,
    h = L.grid({
        redraw: "moveend"
    }),
    i = 0,
    $("#Refresh").click(function() {
        i || (toastr.options = {
            closeButton: !0,
            progressBar: !0,
            showMethod: "slideDown",
            positionClass: "toast-bottom-right",
            timeOut: 4e3
        },
        toastr["info"]("", "正在重载数据……"),
        $("#namelist li").each(function() {
            DrawTyphoonPathWithOutPlaying(null, $(this).attr("id"))
        }),
        i = setTimeout(function() {
            i = 0
        }, 4800))
    }),
    $("#LatLngLine").click(function() {
        g ? map.removeLayer(h) : h.addTo(map),
        g = !g
    }),
    $("#Measure").click(function() {
        measure()
    }),
    $("#Clear").click(function() {
        clearMap()
    }),
    $("#Help").click(function() {
        window.location.href = "mailto:yjm@zjwater.gov.cn"
    }),
    $("#UserLogin").click(function() {
        Login()
    }),
    $("#mapTypeSelect img").click(function() {
        GoogleMapClick($(this).attr("name")),
        $(this).attr("src", $(this).attr("src").replace("_00", "_01")).attr("disable", "true"),
        $(this).siblings().each(function() {
            $(this).attr("src", $(this).attr("src").replace("_01", "_00")).attr("disable", "false")
        })
    }),
    $("#chkForecast").on("ifChecked", function() {
        j("forecastLayer", !0)
    }).on("ifUnchecked", function() {
        j("forecastLayer", !1)
    }),
    $("#chkCircle").on("ifChecked", function() {
        j("circle7Layer", !0),
        j("circle10Layer", !0)
    }).on("ifUnchecked", function() {
        j("circle7Layer", !1),
        j("circle10Layer", !1)
    }),
    $("#chkLand").on("ifChecked", function() {
        j("eventLayer", !0)
    }).on("ifUnchecked", function() {
        j("eventLayer", !1)
    }),
    k = L.marker([25.8143, 123.6172], {
        icon: new L.divIcon({
            className: "leaflet-divicon",
            html: "钓鱼岛",
            iconSize: [40, 20]
        })
    }),
    LabelingLayer.addLayer(k),
    l = L.icon({
        iconUrl: "images/tb.png",
        iconSize: [256, 256]
    }),
    L.marker([31.9, 123.75], {
        icon: l
    }),
    n = {
        stroke: !0,
        color: "#DDEBEB",
        weight: 1,
        opacity: 1,
        fill: !0,
        fillOpacity: 1,
        fillColor: "#DDEBEB",
        clickable: !1
    },
    TaipeiMarker = new MyCustomMarker(new L.LatLng(25.0465,121.5966),n),
    TaipeiMarker.setRadius(2),
    HongkongMarker = new MyCustomMarker(new L.LatLng(22.28009,114.20988),n),
    HongkongMarker.setRadius(2),
    MacaoMarker = new MyCustomMarker(new L.LatLng(22.20318,113.56765),n),
    MacaoMarker.setRadius(2),
    -1 != MapSelectType.indexOf("google") && (MulchLayer.addLayer(TaipeiMarker),
    MulchLayer.addLayer(HongkongMarker),
    MulchLayer.addLayer(MacaoMarker)),
    o = "",
    $.ajax({
        type: "GET",
        url: "Api/TyhoonActivity",
        dataType: "jsonp",
        jsonp: "callback",
        success: function(a) {
            var b, c, d, e, f, g, h, i, j, k, l, m, n, q;
            if ("" != a && void 0 != a && "undefined" != a && "null" != a && null != a) {
                if (a.length > 0)
                    for (b = 0; b < a.length; b++)
                        c = a[b]["tfid"],
                        "" != c && null != c && "null" != c && "undefined" != c && void 0 != c && (d = hashtable.get("tfids"),
                        "" == d || null == d || void 0 == d ? d = c : d.indexOf(c) < 0 && (d = d + "," + c),
                        e = a[b]["name"],
                        f = a[b]["enname"],
                        f = "" != f || null != f || "null" != f.toLowerCase() ? "(" + f + ")" : "",
                        g = a[b]["timeformate"],
                        h = a[b]["lng"],
                        h = "" != h || null != h || "null" != h.toLowerCase() ? h + "°" : "--",
                        i = a[b]["lat"],
                        i = "" != i || null != i || "null" != i.toLowerCase() ? i + "°" : "--",
                        j = a[b]["strong"],
                        k = a[b]["power"],
                        k = "" != k || null != k || "null" != k.toLowerCase() ? k > 17 ? "17级以上" : k + "级" : "--",
                        l = a[b]["speed"],
                        l = "" != l || null != l || "null" != l.toLowerCase() ? l + "米/秒" : "--",
                        m = a[b]["pressure"],
                        m = "" != m || null != m || "null" != m.toLowerCase() ? m + "百帕" : "--",
                        n = a[b]["movespeed"],
                        n = "" != n || null != n || "null" != n.toLowerCase() ? n + "公里/小时" : "--",
                        a[b]["movedirection"],
                        o = o + "<span>" + c.substr(0, 4) + "年第" + c.substr(4, 2) + "号" + j + e + f + "</span> &nbsp; " + g + "，风速" + l + "，移速" + n + "，东经" + h + "，北纬" + i + "，气压" + m + "，近中心最大风力" + k + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp",
                        hashtable.put("tfids", d),
                        hashtable.put("typhoon" + c, a[b]),
                        DrawTyphoonPath(c, a[b]["strong"]),
                        HandleNameList(c, a[b]["name"], a[b]["strong"], "1"));
                1 == a.length && (q = a[0]["tfid"],
                ("" == q || null == q || "null" == q) && ($("#raincloud img[id^='rc03']").click(),
                o = "<span>" + stringTodate(thetime, "yyyy年MM月dd日") + "</span>&nbsp;&nbsp;&nbsp;当前西太平洋无台风",
                $("#tdnotf").empty().html("<img src='images/noty.png' />")))
            } else
                $("#nametab").empty().html("当前西太平洋无台风"),
                o = "<span>" + stringTodate(thetime, "yyyy年MM月dd日") + "</span>&nbsp;&nbsp;&nbsp;当前西太平洋无台风",
                $("#tdnotf").empty().html("<img src='images/noty.png' />"),
                "True" == IsLogin.toString() ? map.setView([30.25, 126.34], 5) : $("#raincloud img[id^='rc03']").click();
            $("#tfinfomarqueen").empty().html(o),
            MarqueeScrolling(),
            moveDIV()
        }
    }),
    map.on("zoomend", function() {
        this.getZoom() > 8 || this.getZoom() < 4 ? map.removeLayer(MulchLayer) : -1 != MapSelectType.indexOf("google") && map.addLayer(MulchLayer),
        6 == this.getZoom() && (TaipeiMarker.setLatLng([25.0335, 121.5806]),
        HongkongMarker.setLatLng([22.26009, 114.17288])),
        7 == this.getZoom() && TaipeiMarker.setLatLng([25.0405, 121.5676]),
        8 == this.getZoom() && (TaipeiMarker.setLatLng([25.0305, 121.5646]),
        HongkongMarker.setLatLng([22.28009, 114.17288])),
        this.getZoom() < 5 ? (map.removeLayer(LabelingLayer),
        map.removeLayer(RainLayer),
        map.removeLayer(BoundaryLayer),
        j("eventLayer", !1)) : (LabelingLayer.addTo(map),
        this.getZoom() < 6 ? (j("eventLayer", !1),
        RainLayer.addTo(map),
        BoundaryLayer.addTo(map)) : (RainLayer.addTo(map),
        BoundaryLayer.addTo(map),
        $("#chkLand").is(":checked") ? j("eventLayer", !0) : j("eventLayer", !1)))
    }),
    setInterval(function() {
        $("#Refresh").click(),
        $.ajax({
            type: "GET",
            url: "Api/TyhoonActivity",
            dataType: "jsonp",
            jsonp: "callback",
            success: function(a) {
                var b, c, d, e, f, g, h, i, j, k, l, m;
                if ("" != a && void 0 != a && "undefined" != a && "null" != a && null != a && a.length > 0) {
                    for ($.each(a, function(a) {
                        $("#" + a.id).length || window.location.reload(0)
                    }),
                    b = 0; b < a.length; b++)
                        c = a[b]["tfid"],
                        d = a[b]["name"],
                        e = a[b]["enname"],
                        e = "" != e || null != e || "null" != e.toLowerCase() ? "(" + e + ")" : "",
                        f = a[b]["timeformate"],
                        g = a[b]["lng"],
                        g = "" != g || null != g || "null" != g.toLowerCase() ? g + "°" : "--",
                        h = a[b]["lat"],
                        h = "" != h || null != h || "null" != h.toLowerCase() ? h + "°" : "--",
                        i = a[b]["strong"],
                        j = a[b]["power"],
                        j = "" != j || null != j || "null" != j.toLowerCase() ? j > 17 ? "17级以上" : j + "级" : "--",
                        k = a[b]["speed"],
                        k = "" != k || null != k || "null" != k.toLowerCase() ? k + "米/秒" : "--",
                        l = a[b]["pressure"],
                        l = "" != l || null != l || "null" != l.toLowerCase() ? l + "百帕" : "--",
                        m = a[b]["movespeed"],
                        m = "" != m || null != m || "null" != m.toLowerCase() ? m + "公里/小时" : "--",
                        o = o + "<span>" + c.substr(0, 4) + "年第" + c.substr(4, 2) + "号" + i + d + e + "</span> &nbsp; " + f + "，风速" + k + "，移速" + m + "，东经" + g + "，北纬" + h + "，气压" + l + "，近中心最大风力" + j + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp";
                    $("#marquee").empty().html("<div style='position: absolute; top: 35px; overflow: hidden; height: 21px; display: inline;' id='tfinfomarqueen'></div>"),
                    $("#tfinfomarqueen").empty().html(o),
                    MarqueeScrolling(),
                    moveDIV()
                }
            }
        }),
        $("#DivCloud img").each(function() {
            $(this).attr("src").indexOf("-2") > 0 && DisplayCloud($(this).attr("alt"))
        }),
        $("#raincloud img").each(function() {
            $(this).attr("src").indexOf("-2") > 0 && ("True" == IsLogin.toString() ? DisplayRains($(this).attr("alt")) : DisplayRainPublic($(this).attr("alt")))
        })
    }, 6e5)
}),
isPlaying = !1,
typhoonMarkerArr = [],
CurTyphoonListIndex = 0,
delayid = 0;
