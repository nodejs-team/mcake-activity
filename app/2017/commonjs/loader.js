/**
 var loader = new Loader('images/');
 loader.addGroup('preload', preData);
 loader.addGroup('resload', resData);
 loader.on('progress', function(groupName, ix, len){})
 loader.on('complete', function(groupName){})
 loader.loadGroup('resload');
 */






;(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        define('Loader', ['pubsub'], function(PubSub){
            return factory(root, PubSub);
        });
    } else if(typeof module === "object" && module.exports) {
        module.exports = factory(root, require('PubSub'));
    } else {
        root.Loader = factory(root, root.PubSub);
    }
}(this, function(global, PubSub) {
    function isArray(obj){
        return typeof Array.isArray === 'function' ? Array.isArray(obj) : Object.prototype.toString.call(obj) === '[object Array]'
    }
    function forEach(obj, fn, context){
        if(isArray(obj)){
            if(typeof obj.forEach === 'function'){
                obj.forEach(fn, context)
            } else {
                for(var i=0, length=obj.length; i<length; i++){
                    fn.call(context, obj[i], i, obj);
                }
            }
        } else {
            for (var key in obj){
                if(Object.prototype.hasOwnProperty.call(obj, key)){
                    fn.call(context, obj[key], key, obj);
                }
            }
        }
    }
    var DATATYPE = {
        IMAGE: 'image',
        JSON: 'json'
    }

    var REG = {
        IMAGE: /\.(jpg|png|gif)$/,
        JSON: /\.(json)$/
    }
    function getTypeByUrl(url){
        if(REG.IMAGE.test(url)) return DATATYPE.IMAGE;
        if(REG.JSON.test(url)) return DATATYPE.JSON;
        return null;
    }

    var Resource = {
        loadAsset: function(data, success, fail){
            var source = {};
            if(typeof data ==='string'){
                source.url = data;
                typeof success === 'string' ? (source.type = success, success = fail, fail = arguments[3]) : (source.type = getTypeByUrl(data));
            } else {
                data.type = typeof data.type === 'string' ? data.type : getTypeByUrl(data.type);
                source = data;
            }
            switch(source.type){
                case DATATYPE.IMAGE:
                    this.loadImage(source, success, fail);
                    break;
                case DATATYPE.JSON:
                    this.loadJson(source, success, fail);
                    break;
                default:
                    console.log('type not support')
                    fail && fail(source);
                    break;
            }
        },
        ajax: function(data){
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(){
                try{
                    if(xhr.readyState ===  XMLHttpRequest.DONE){
                        if(xhr.status === 200){
                            data.success && data.success(xhr.responseText);
                        } else {
                            data.error && data.error();
                        }
                    }
                } catch(e){
                    data.error && data.error();
                }

            }
            xhr.open('GET', data.url);
            xhr.send();
        },
        loadJson: function(data, success, fail){
            this.ajax({
                url: data.url,
                success: function(d){
                    data.data = JSON.parse(d);
                    success && success(data);
                },
                error: function(){
                    fail && fail(data);
                }
            })
        },
        loadImage: function(data, success, fail){
            var img = new Image();
            img.onload = function(){
                img.onload = new Function;
                data.data = img;
                success && success(data);
            }
            img.onerror = function(){
                img.onerror = new Function;
                console.error(data.url + ' load fail');
                fail && fail(data)
            }
            img.src = data.url;
        }
    }

    function Loader(baseUrl){
        this.baseUrl = baseUrl || '';
        this.resources = {};
        this.groups = {};
        PubSub.call(this);
    }
    Loader.prototype = Object.create(PubSub.prototype);

    Loader.prototype.constructor = Loader;
    Loader.prototype.add = function(name, url, type, options){
        if(!name || !url) throw new Error('No url passed to add loader to loader.');
        if(typeof type != 'string'){
            options = type;
            type = undefined;
        }
        if(isArray(url)) return this.addGroup(name, url, options);
        return this.resources[name] = {
            url: /^http:/.test(url) ? url : this.baseUrl + url,
            type: typeof type === 'string' ? type : getTypeByUrl(url),
            name: name
        }, this;
    }
    Loader.prototype.addGroup = function(name, data, options){
        if(!name || !data) throw new Error('No url passed to add loader to loader.');
        return this.groups[name] = data.map(function(item){
            item.url = /^http:/.test(item.url) ? item.url : this.baseUrl + item.url, item.type = typeof item.type==='string' ? item.type : getTypeByUrl(item.url);
            this.resources[item.name] = item;
            return item.name;
        }, this), this;
    }
    Loader.prototype.load = function(name, options){
        if(!(name in this.resources)) return this.loadGroup(name, options);
        var self = this,
            res = this.resources[name];
        return Resource.loadAsset(res, function(){
            self.trigger('complete', name);
        }), this;
    }
    Loader.prototype.loadGroup = function(name, options){
        if(!(name in this.groups)) return console.log('data not exit'), this;
        var group = this.groups[name],
            total = group.length,
            loaded = 0,
            self = this,
            data = this.resources[group[loaded]];
        if(total === loaded){
            this.trigger('complete', name, total);
            return this;
        }
        return Resource.loadAsset(data, function loadCallback(d){
            loaded++;
            self.trigger('progress', name, loaded, total);
            if(loaded == total){
                self.trigger('complete', name, total)
            } else {
                data = self.resources[group[loaded]];
                Resource.loadAsset(data, loadCallback);
            }
        }), this;
    }
    Loader.prototype.get = function(name){
        if(this.resources[name]){
            return this.resources[name]
        } else if(this.groups[name]) {
            return this.getGroup(name);
        } else {
            return null;
        }
    }
    Loader.prototype.getGroup = function(name){
        if(this.groups[name]){
            var self = this;
            return this.groups[name].map(function(key){
                return self.resources[key];
            })
        } else {
            return null;
        }
    }
    Loader.prototype.getAll = function(){
        return this.resources;
    }

    Loader.load = function(url, callback){
        if(isArray(url)) return Loader.loadGroup(url, callback)
        return Resource.loadAsset(url, callback), Loader;
    }
    Loader.loadGroup = function(data, callback){
        var total = data.length,
            loaded = 0;
        return forEach(data, function(item, index){
            Resource.loadAsset(typeof item == 'string' ? item : item.url, item.type, function(){
                loaded++;
                callback(loaded, total);
            })
        }), Loader;
    }

    return Loader;
}))