var $, Sidebar;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
if (typeof Spine !== "undefined" && Spine !== null) {
  Spine;
} else {
  Spine = require("spine");
};
$ = Spine.$;
Sidebar = (function() {
  __extends(Sidebar, Spine.Controller);
  Sidebar.prototype.elements = {
    ".items": "items",
    "input": "input"
  };
  Sidebar.prototype.events = {
    "click button": "create",
    "keyup input": "filter",
    "click input": "filter",
    "dblclick .draghandle": 'toggleDraghandle'
  };
  Sidebar.prototype.template = function(items) {
    return $("#contactsTemplate").tmpl(items);
  };
  function Sidebar() {
    Sidebar.__super__.constructor.apply(this, arguments);
    Spine.list = this.list = new Spine.List({
      el: this.items,
      template: this.template
    });
    Contact.bind("refresh change", this.proxy(this.render));
  }
  Sidebar.prototype.filter = function() {
    this.query = this.input.val();
    return this.render();
  };
  Sidebar.prototype.render = function() {
    var items;
    items = Contact.filter(this.query);
    items = items.sort(Contact.nameSort);
    return this.list.render(items);
  };
  Sidebar.prototype.newAttributes = function() {
    return {
      first_name: '',
      last_name: ''
    };
  };
  Sidebar.prototype.create = function(e) {
    var contact;
    e.preventDefault();
    contact = new Contact(this.newAttributes());
    return contact.save();
  };
  Sidebar.prototype.toggleDraghandle = function() {
    var width;
    width = __bind(function() {
      var max, min;
      width = this.el.width();
      max = App.vmanager.max();
      min = App.vmanager.min;
      if (width >= min && width < max - 20) {
        return max + "px";
      } else {
        return min + 'px';
      }
    }, this);
    return this.el.animate({
      width: width()
    }, 400);
  };
  return Sidebar;
})();
if (typeof module !== "undefined" && module !== null) {
  module.exports = Sidebar;
}