var D=Object.create;var b=Object.defineProperty;var H=Object.getOwnPropertyDescriptor;var O=Object.getOwnPropertyNames;var k=Object.getPrototypeOf,R=Object.prototype.hasOwnProperty;var F=(f,u)=>()=>(u||f((u={exports:{}}).exports,u),u.exports);var $=(f,u,i,l)=>{if(u&&typeof u=="object"||typeof u=="function")for(let a of O(u))!R.call(f,a)&&a!==i&&b(f,a,{get:()=>u[a],enumerable:!(l=H(u,a))||l.enumerable});return f};var z=(f,u,i)=>(i=f!=null?D(k(f)):{},$(u||!f||!f.__esModule?b(i,"default",{value:f,enumerable:!0}):i,f));var N=F((X,B)=>{(function(){var f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",u={rotl:function(i,l){return i<<l|i>>>32-l},rotr:function(i,l){return i<<32-l|i>>>l},endian:function(i){if(i.constructor==Number)return u.rotl(i,8)&16711935|u.rotl(i,24)&4278255360;for(var l=0;l<i.length;l++)i[l]=u.endian(i[l]);return i},randomBytes:function(i){for(var l=[];i>0;i--)l.push(Math.floor(Math.random()*256));return l},bytesToWords:function(i){for(var l=[],a=0,c=0;a<i.length;a++,c+=8)l[c>>>5]|=i[a]<<24-c%32;return l},wordsToBytes:function(i){for(var l=[],a=0;a<i.length*32;a+=8)l.push(i[a>>>5]>>>24-a%32&255);return l},bytesToHex:function(i){for(var l=[],a=0;a<i.length;a++)l.push((i[a]>>>4).toString(16)),l.push((i[a]&15).toString(16));return l.join("")},hexToBytes:function(i){for(var l=[],a=0;a<i.length;a+=2)l.push(parseInt(i.substr(a,2),16));return l},bytesToBase64:function(i){for(var l=[],a=0;a<i.length;a+=3)for(var c=i[a]<<16|i[a+1]<<8|i[a+2],h=0;h<4;h++)a*8+h*6<=i.length*8?l.push(f.charAt(c>>>6*(3-h)&63)):l.push("=");return l.join("")},base64ToBytes:function(i){i=i.replace(/[^A-Z0-9+\/]/ig,"");for(var l=[],a=0,c=0;a<i.length;c=++a%4)c!=0&&l.push((f.indexOf(i.charAt(a-1))&Math.pow(2,-2*c+8)-1)<<c*2|f.indexOf(i.charAt(a))>>>6-c*2);return l}};B.exports=u})()});var S=F((P,_)=>{var E={utf8:{stringToBytes:function(f){return E.bin.stringToBytes(unescape(encodeURIComponent(f)))},bytesToString:function(f){return decodeURIComponent(escape(E.bin.bytesToString(f)))}},bin:{stringToBytes:function(f){for(var u=[],i=0;i<f.length;i++)u.push(f.charCodeAt(i)&255);return u},bytesToString:function(f){for(var u=[],i=0;i<f.length;i++)u.push(String.fromCharCode(f[i]));return u.join("")}}};_.exports=E});var M=F((Z,I)=>{I.exports=function(f){return f!=null&&(A(f)||q(f)||!!f._isBuffer)};function A(f){return!!f.constructor&&typeof f.constructor.isBuffer=="function"&&f.constructor.isBuffer(f)}function q(f){return typeof f.readFloatLE=="function"&&typeof f.slice=="function"&&A(f.slice(0,0))}});var w=F((J,U)=>{(function(){var f=N(),u=S().utf8,i=M(),l=S().bin,a=function(c,h){c.constructor==String?h&&h.encoding==="binary"?c=l.stringToBytes(c):c=u.stringToBytes(c):i(c)?c=Array.prototype.slice.call(c,0):!Array.isArray(c)&&c.constructor!==Uint8Array&&(c=c.toString());for(var o=f.bytesToWords(c),g=c.length*8,r=1732584193,t=-271733879,e=-1732584194,n=271733878,s=0;s<o.length;s++)o[s]=(o[s]<<8|o[s]>>>24)&16711935|(o[s]<<24|o[s]>>>8)&4278255360;o[g>>>5]|=128<<g%32,o[(g+64>>>9<<4)+14]=g;for(var x=a._ff,p=a._gg,T=a._hh,d=a._ii,s=0;s<o.length;s+=16){var v=r,m=t,C=e,L=n;r=x(r,t,e,n,o[s+0],7,-680876936),n=x(n,r,t,e,o[s+1],12,-389564586),e=x(e,n,r,t,o[s+2],17,606105819),t=x(t,e,n,r,o[s+3],22,-1044525330),r=x(r,t,e,n,o[s+4],7,-176418897),n=x(n,r,t,e,o[s+5],12,1200080426),e=x(e,n,r,t,o[s+6],17,-1473231341),t=x(t,e,n,r,o[s+7],22,-45705983),r=x(r,t,e,n,o[s+8],7,1770035416),n=x(n,r,t,e,o[s+9],12,-1958414417),e=x(e,n,r,t,o[s+10],17,-42063),t=x(t,e,n,r,o[s+11],22,-1990404162),r=x(r,t,e,n,o[s+12],7,1804603682),n=x(n,r,t,e,o[s+13],12,-40341101),e=x(e,n,r,t,o[s+14],17,-1502002290),t=x(t,e,n,r,o[s+15],22,1236535329),r=p(r,t,e,n,o[s+1],5,-165796510),n=p(n,r,t,e,o[s+6],9,-1069501632),e=p(e,n,r,t,o[s+11],14,643717713),t=p(t,e,n,r,o[s+0],20,-373897302),r=p(r,t,e,n,o[s+5],5,-701558691),n=p(n,r,t,e,o[s+10],9,38016083),e=p(e,n,r,t,o[s+15],14,-660478335),t=p(t,e,n,r,o[s+4],20,-405537848),r=p(r,t,e,n,o[s+9],5,568446438),n=p(n,r,t,e,o[s+14],9,-1019803690),e=p(e,n,r,t,o[s+3],14,-187363961),t=p(t,e,n,r,o[s+8],20,1163531501),r=p(r,t,e,n,o[s+13],5,-1444681467),n=p(n,r,t,e,o[s+2],9,-51403784),e=p(e,n,r,t,o[s+7],14,1735328473),t=p(t,e,n,r,o[s+12],20,-1926607734),r=T(r,t,e,n,o[s+5],4,-378558),n=T(n,r,t,e,o[s+8],11,-2022574463),e=T(e,n,r,t,o[s+11],16,1839030562),t=T(t,e,n,r,o[s+14],23,-35309556),r=T(r,t,e,n,o[s+1],4,-1530992060),n=T(n,r,t,e,o[s+4],11,1272893353),e=T(e,n,r,t,o[s+7],16,-155497632),t=T(t,e,n,r,o[s+10],23,-1094730640),r=T(r,t,e,n,o[s+13],4,681279174),n=T(n,r,t,e,o[s+0],11,-358537222),e=T(e,n,r,t,o[s+3],16,-722521979),t=T(t,e,n,r,o[s+6],23,76029189),r=T(r,t,e,n,o[s+9],4,-640364487),n=T(n,r,t,e,o[s+12],11,-421815835),e=T(e,n,r,t,o[s+15],16,530742520),t=T(t,e,n,r,o[s+2],23,-995338651),r=d(r,t,e,n,o[s+0],6,-198630844),n=d(n,r,t,e,o[s+7],10,1126891415),e=d(e,n,r,t,o[s+14],15,-1416354905),t=d(t,e,n,r,o[s+5],21,-57434055),r=d(r,t,e,n,o[s+12],6,1700485571),n=d(n,r,t,e,o[s+3],10,-1894986606),e=d(e,n,r,t,o[s+10],15,-1051523),t=d(t,e,n,r,o[s+1],21,-2054922799),r=d(r,t,e,n,o[s+8],6,1873313359),n=d(n,r,t,e,o[s+15],10,-30611744),e=d(e,n,r,t,o[s+6],15,-1560198380),t=d(t,e,n,r,o[s+13],21,1309151649),r=d(r,t,e,n,o[s+4],6,-145523070),n=d(n,r,t,e,o[s+11],10,-1120210379),e=d(e,n,r,t,o[s+2],15,718787259),t=d(t,e,n,r,o[s+9],21,-343485551),r=r+v>>>0,t=t+m>>>0,e=e+C>>>0,n=n+L>>>0}return f.endian([r,t,e,n])};a._ff=function(c,h,o,g,r,t,e){var n=c+(h&o|~h&g)+(r>>>0)+e;return(n<<t|n>>>32-t)+h},a._gg=function(c,h,o,g,r,t,e){var n=c+(h&g|o&~g)+(r>>>0)+e;return(n<<t|n>>>32-t)+h},a._hh=function(c,h,o,g,r,t,e){var n=c+(h^o^g)+(r>>>0)+e;return(n<<t|n>>>32-t)+h},a._ii=function(c,h,o,g,r,t,e){var n=c+(o^(h|~g))+(r>>>0)+e;return(n<<t|n>>>32-t)+h},a._blocksize=16,a._digestsize=16,U.exports=function(c,h){if(c==null)throw new Error("Illegal argument "+c);var o=f.wordsToBytes(a(c,h));return h&&h.asBytes?o:h&&h.asString?l.bytesToString(o):f.bytesToHex(o)}})()});var K=z(w(),1);function G(f){return{selectedLabel:{name:null,color:null},labelList:new Map,targetText:f.text,id:f.id,state:f.state,annotations:f.annotations,labels:f.labels,init:function(){var u="";let i=document.createElement("style");for(let l in this.labels){let a=this.labels[l],c=this.genColorCodeFromText(a.name);u+=`.radio-label .${a.name} { background-color: ${c}; } `}i.innerHTML=u,document.head.appendChild(i);for(let l in this.state)if(this.state.hasOwnProperty(l)){let a=this.state[l];a.start<a.end&&this.labelList.set(this.generateUUID(),{pattern:a.pattern,start:a.start,end:a.end,label:a.label.toUpperCase(),color:this.genColorCodeFromText(a.label)})}document.addEventListener("contextmenu",this.removeLabel.bind(this))},setSelectedLabel:function(u){this.selectedLabel=u},genColorCodeFromText:function(u){return(l=>{l=l.toLowerCase();let a=0;for(let d=0;d<l.length;d++)a=l.charCodeAt(d)+((a<<5)-a);let c=.6,h=.5,r=(a%360+360)%360/360,t=c,e=h,n,s,x;if(t===0)n=s=x=e;else{let d=(C,L,y)=>(y<0&&(y+=1),y>1&&(y-=1),y<.16666666666666666?C+(L-C)*6*y:y<.5?L:y<.6666666666666666?C+(L-C)*(.6666666666666666-y)*6:C),v=e<.5?e*(1+t):e+t-e*t,m=2*e-v;n=d(m,v,r+.3333333333333333),s=d(m,v,r),x=d(m,v,r-.3333333333333333)}let p=d=>{let v=Math.round(d*255).toString(16);return v.length===1?"0"+v:v};return`#${p(n)}${p(s)}${p(x)}`})(u)},updateState:function(){let u={};this.labelList.forEach((i,l)=>{u[l]={pattern:i.pattern,start:i.start,end:i.end,label:i.label.toUpperCase(),color:this.genColorCodeFromText(i.label)}}),this.state=u},markText:function(u){var i=document.getElementById(this.id),l=i.ownerDocument.getSelection();if(!(!this.selectedLabel||!this.selectedLabel.name||l.toString().length<=1)){var a=l.toString();if(a!==""){for(var c=l.getRangeAt(0),h=c.startOffset,o=c.endOffset;h>0&&!"s|-|,|/|\\".test(c.startContainer.textContent[h-1]);)h--;for(;o<c.startContainer.textContent.length&&!"s|-|,|/|\\".test(c.startContainer.textContent[o]);)o++;c.setStart(c.startContainer,h),c.setEnd(c.startContainer,o);var g=c.commonAncestorContainer,r=this.calculateOffset(l.anchorNode.parentNode,l.anchorNode),t=r+c.startOffset,e=r+c.endOffset,n=g.nodeType===Node.ELEMENT_NODE&&g.classList.contains("dynamic-span");if(!n){var s=!1;if(this.labelList.forEach(T=>{e<=T.start||t>=T.end||(s=!0)}),s)return;var x=this.generateUUID();this.labelList.set(x,{pattern:c.toString(),start:t,end:e,label:this.selectedLabel.name.toUpperCase(),color:this.genColorCodeFromText(this.selectedLabel.name)}),this.refreshTextField();var p=document.createElement("span");p.style.backgroundColor=this.genColorCodeFromText(this.selectedLabel.name),c.surroundContents(p)}}}},calculateOffset:function(u,i){var l=0;for(let a of u.childNodes){if(a===i)break;if(a.nodeType===Node.ELEMENT_NODE)for(let c of a.childNodes)c.nodeType===Node.TEXT_NODE&&(l+=c.textContent.length);else a.nodeType===Node.TEXT_NODE&&(l+=a.textContent.length)}return l},refreshTextField:function(){let u="",i=0;[...this.labelList.entries()].sort((c,h)=>c[1].start-h[1].start).forEach(([c,h])=>{i<h.start&&(u+=this.targetText.substring(i,h.start)),u+=this.createSpan(h,c),i=h.end}),i<this.targetText.length&&(u+=this.targetText.substring(i));var a=document.getElementById(this.id);a.innerHTML=u,this.updateState(this.state)},createSpan:function(u,i){var l=document.createElement("span");l.classList.add(i),l.classList.add("dynamic-span");var a=this.targetText.substring(u.start,u.end);l.textContent=a,l.style.borderBottom=`3px solid ${u.color}`;var c=document.createElement("span");return c.textContent=u.label,c.style.marginLeft="0.3em",c.style.backgroundColor=u.color,c.style.padding="0.2em",c.style.borderRadius="0.2em",c.style.fontSize="0.6em",c.style.verticalAlign="super",l.appendChild(c),l.addEventListener("contextmenu",h=>{h.preventDefault(),this.labelList.delete(i),this.refreshTextField()}),l.outerHTML},removeLabel:function(u){if(u.target.classList.contains("dynamic-span")){u.preventDefault();let i=Array.from(u.target.classList).find(l=>this.labelList.has(l));i&&(this.labelList.delete(i),this.refreshTextField())}},generateUUID:function(){return"xxx".replace(/[xy]/g,function(u){var i=Math.random()*16|0,l=u==="x"?i:i&3|8;return l.toString(16)})}}}export{G as default};
/*! Bundled license information:

is-buffer/index.js:
  (*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)
*/
