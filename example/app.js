(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ImageCropper = require('./imagecrop.min.js');

var dimensions = null;
var is_active = false;
var img_c = null;

var onUpdateHandler = function (dim) {
  dimensions = dim;
};

var onCropHandler = function() {
  var img = new Image();
  img.src = img_c.crop('image/jpeg', 1);
  img.width = dimensions.w;
  img.height = dimensions.h;
  var target = document.querySelector('.preview');
  while(target.firstChild) {
    target.removeChild(target.firstChild)
  }
  target.appendChild(img);
};

var onCreateHandler = function() {
  if(is_active) { return; }

  new ImageCropper('.test-imagecrop', 'img2.jpg', {
    update: onUpdateHandler
  });
  destroy_btn.style.display = 'initial';
  create_btn.style.display = 'none';

  is_active = true;
};

var onDestroyHandler = function() {
  if(!is_active) { return; }

  img_c.destroy();
  destroy_btn.style.display = 'none';
  create_btn.style.display = 'initial';

  is_active = false;
};

var crop_btn = document.querySelector('.crop-button');
crop_btn.addEventListener('click', onCropHandler);

var create_btn = document.querySelector('.create-button');
create_btn.addEventListener('click', onCreateHandler);
create_btn.style.display = 'none';

var destroy_btn = document.querySelector('.destroy-button');
destroy_btn.addEventListener('click', onDestroyHandler);

img_c = new ImageCropper('.test-imagecrop', 'img.jpg', {
  update: onUpdateHandler,
  fixed_size: true,
  create_cb: function(dim) {
    console.log('created - ', dim);
  },
  destroy_cb: function() {
    console.log('destroy');
  }
});
is_active = true;
},{"./imagecrop.min.js":2}],2:[function(require,module,exports){
module.exports=function(){function e(e,t,n){if(t&&e){n=n?n:{};for(var i in m)g[m[i][0]]=i in n?n[i]:m[i][1];x(e),y=new Image,y.addEventListener("load",function(e){this.create()}.bind(this)),y.src=t}}function t(e){var t=s.getBoundingClientRect(),n=e.clientX-t.left,i=e.clientY-t.top;return{x:0>n?0:n>t.width?t.width:n,y:0>i?0:i>t.height?t.height:i}}function n(){var e=s.getBoundingClientRect();g.fs&&(f.w=f.h),f.w=f.w<32?32:f.w,f.h=f.h<32?32:f.h,f.x=f.x<0?0:f.x+f.w>e.width?e.width-f.w:f.x,f.y=f.y<0?0:f.y+f.h>e.height?e.height-f.h:f.y}function i(){var e=s.getBoundingClientRect();a.style.top=f.y+"px",a.style.left=f.x+"px",a.style.width=f.w+"px",a.style.height=f.h+"px",c.setAttribute("d","M 0 0 v"+e.height+"h"+e.width+"v"+-e.height+"H-0zM"+f.x+" "+f.y+"h"+f.w+"v"+f.h+"h-"+f.w+"V-"+f.h+"z"),g.up&&g.up(f)}function o(e){e=t(e),f.x=e.x-.5*f.w,f.y=e.y-.5*f.h,n(),i()}function h(e){v||(document.addEventListener("mousemove",d),document.addEventListener("mouseup",r),o(e),v=!0)}function r(e){v&&(document.removeEventListener("mouseup",r),document.removeEventListener("mousemove",d),v=!1)}function d(e){v&&o(e)}function u(e,o,h){function r(e){e.stopPropagation(),s=!0,document.addEventListener("mouseup",u),document.addEventListener("mousemove",d)}function d(e){e.stopPropagation(),s&&(h(t(e)),n(),i())}function u(e){e.stopPropagation(),s=!1,document.removeEventListener("mouseup",u),document.removeEventListener("mousemove",d)}var s=!1;this.el=document.createElement("span"),this.el.className="imgc-handles-el-"+e+"-"+o,this.el.addEventListener("mousedown",r)}var s,a,c,m={update:["up",!1],create_cb:["cr",!1],destroy_cb:["de",!1],max_width:["mw",500],max_height:["mh",500],fixed_size:["fs",!1]},w=[function(e){w[7](e),w[4](e)},function(e){f.w=e.x-f.x,w[4](e)},function(e){f.w=e.x-f.x,f.h=e.y-f.y},function(e){w[7],f.h=e.y-f.y},function(e){f.h+=f.y-e.y,f.y=e.y},function(e){f.w=e.x-f.x},function(e){f.h=e.y-f.y},function(e){f.w+=f.x-e.x,f.x=e.x}],l=null,p=!1,v=!1,f={x:0,y:0,w:80,h:80},g={},y=null,x=function(e){s&&this.destroy(),s=document.querySelector(e),s.className+=" imgc ".indexOf(" "+g.cn+" ")>-1?"":" imgc"};return e.prototype.create=function(e){if(!p){s||x(e);var t=y.width,n=y.height;t>g.mw&&(n=~~(g.mw*n/t),t=g.mw),n>g.mh&&(t=~~(g.mh*t/n),n=g.mh),w_h_ratio={w:y.naturalWidth/t,h:y.naturalHeight/n},s.style.width=t+"px",s.style.height=n+"px",s.addEventListener("DOMNodeRemovedFromDocument",this.destroy),l=document.createElement("canvas"),l.setAttribute("width",t),l.setAttribute("height",n),s.appendChild(l),s.appendChild(y);var o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.setAttribute("height",n),o.setAttribute("width",t),s.appendChild(o),c=document.createElementNS("http://www.w3.org/2000/svg","path"),c.style.fill="rgba(0, 0, 0, .8)",o.appendChild(c),a=document.createElement("div"),a.className="imgc-handles",s.appendChild(a);for(var r=0;r<(g.fs?4:8);r++){var d=new u(g.fs?0:~~(r/4),r%4,w[r]);a.appendChild(d.el)}s.addEventListener("mousedown",h),p=!0,i(),g.cr&&g.cr(f)}},e.prototype.destroy=function(){if(p){if(s){for(s.removeEventListener("DOMNodeRemovedFromDocument",this.destroy),s.removeEventListener("mousedown",h);s.firstChild;)s.removeChild(s.firstChild);s=l=y=a=c=null}p=!1,g.de&&g.de()}},e.prototype.crop=function(e,t){(!e||"image/jpeg"!==e&&"image/png"!==e)&&(e="image/jpeg"),(!t||0>t||t>1)&&(t=1),l.setAttribute("width",f.w),l.setAttribute("height",f.h);var n=l.getContext("2d");return n.drawImage(y,w_h_ratio.w*f.x,w_h_ratio.h*f.y,w_h_ratio.w*f.w,w_h_ratio.h*f.h,0,0,f.w,f.h),l.toDataURL(e,t)},e}();
},{}]},{},[1]);
