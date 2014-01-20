/**
 * @name index.js<beez-tab/s>
 * @author Masaki Sueda <sueda_masaki@cyberagent.co.jp>
 * @copyright (c) Cyberagent Inc.
 * @overview tab plug-in for Beez (browser)
 * @license MIT
 */

!function(){define("beez-tab/view/index",["require","exports","module","beez","beez.touch"],function(e){var t=e("beez"),i=t.getLogger("beez.scroll.view");e("beez.touch");var s=t.touch.View.extend("beez.tab.view",{vidx:"tab",constructor:function(e,t){t=t||{},this._PREFIX=t.prefix||"bztb",this.className=(this.className&&this.className+" "||"")+this._PREFIX+"-tabs",s.__super__.constructor.apply(this,arguments)},initialize:function(e){s.__super__.initialize.apply(this,arguments),e=e||{},e.className=e.className||{},this.options=e,this._width=e.width||"auto",this._height=e.height||"auto",this._adjust=e.adjust||!1,this._CLASSNAME_DISABLE=e.className.disable||"disable",this._CLASSNAME_SELECTED=e.className.selected||"selected",this.vidx=e.vidx||this.vidx,this._template=e.template},beforeOnce:function(){s.__super__.beforeOnce.apply(this,arguments),this.getParent().$el.append(this.$el)},after:function(){s.__super__.after.apply(this,arguments),this._setEvents(),this._onUpdate()},resize:function(e,t){this.$el.css({width:e||this._width,height:t||this._height}),this._width=e,this._height=t},_setEvents:function(){this.listenTo(this.model,"change",this._onUpdate),this.listenTo(this.model,"add",this._onAdd),this.listenTo(this.model,"remove",this._onUpdate)},_onUpdate:function(){this.$el.html(""),this.model.each(function(e){this._onAdd(e)},this)},_onAdd:function(e){var t,i=e.toJSON();t=this._template?$(this._template(i),{"class":this._PREFIX+"-tab"}):$("<div />",{"class":this._PREFIX+"-tab",text:i.label}),i.disable&&t.addClass(this._CLASSNAME_DISABLE),i.selected&&t.addClass(this._CLASSNAME_SELECTED),this.tap(t,function(e){e.stopPropagation(),this._onTap(e)},this),this.$el.append(t)},onChange:function(){},_onTap:function(e){i.trace("on tap");var t=this.$el.find("."+this._PREFIX+"-tab").index($(e.currentTarget)),s=this.model.at(t);s.get("disable")||this.model.update(s)},_onTouchStart:function(){i.trace("on touch start")},_onTouchEnd:function(){i.trace("on touch end")},dispose:function(){s.__super__.dispose.apply(this,arguments)}});return s})}(this),function(){define("beez-tab/model/index",["require","exports","module","beez","beez.touch"],function(e){var t=e("beez");t.getLogger("beez.tab.model"),e("beez.touch");var i=t.Model.extend("beez.tab.model",{midx:"tab",defaults:{id:"none",selected:!1,disable:!1,label:"no text"}}),s=t.Collection.extend("beez.tab.collection",{midx:"tabs",update:function(e){this.each(function(e){e.set({selected:!1},{silent:!0})}),e.set({selected:!0})}});return{Model:i,Collection:s}})}(this);var BEEZ_TAB_VERSION="0.1.0";"undefined"!=typeof module&&module.exports?exports.VERSION=BEEZ_TAB_VERSION:!function(){define("beez.tab",["require","exports","module","beez","beez-tab/view/index","beez-tab/model/index","beez-tab/model/index"],function(e){var t=e("beez"),i=t.getLogger("beez.tab");return t.tab?(i.warn("beez.tab is already loaded."),t.tab):(t.tab={View:e("beez-tab/view/index"),Model:e("beez-tab/model/index").Model,Collection:e("beez-tab/model/index").Collection},t.tab)})}(this);