var imgLoader = {

    _srcs: [],
    _onLoaded: null,
    _onLoading: null,

    load: function() {

        var srcs = this._srcs,
            l = srcs.length,
            loadCount = 0,
            that = this,
            tmp,
            i;
        function onImgLoad() {
            if (++loadCount === l) {
            	that._onLoading && that._onLoading(Math.floor(loadCount / l * 100));
            	setTimeout(function(){
            		that._onLoaded && that._onLoaded();
            	},500);
            } else {
                that._onLoading && that._onLoading(Math.floor(loadCount / l * 100));
            }
        }

        if (!l) {
            that._onLoaded && that._onLoaded();
            return this;
        }

        for (i = l; i--;) {
        	
            tmp = new Image();
            tmp.src = srcs[i];
            tmp.onload = onImgLoad;
        }

        return this;
    },

    init: function(arrSrcs, onLoaded, onLoading) {

        this._srcs = arrSrcs.slice(0);
        this._onLoaded = onLoaded;
        this._onLoading = onLoading;

        return this;
    }
};