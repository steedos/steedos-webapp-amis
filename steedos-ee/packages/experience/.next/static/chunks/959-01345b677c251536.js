(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[959],{9361:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,i){t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i;return e}},8045:function(e,t,i){"use strict";var n=i(9361).default,r=i(4941).Z,o=i(3929).Z;Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e.src,i=e.sizes,a=e.unoptimized,f=void 0!==a&&a,p=e.priority,h=void 0!==p&&p,z=e.loading,k=e.lazyRoot,E=void 0===k?null:k,_=e.lazyBoundary,I=e.className,R=e.quality,L=e.width,P=e.height,q=e.style,C=e.objectFit,N=e.objectPosition,M=e.onLoadingComplete,W=e.placeholder,B=void 0===W?"empty":W,D=e.blurDataURL,U=m(e,["src","sizes","unoptimized","priority","loading","lazyRoot","lazyBoundary","className","quality","width","height","style","objectFit","objectPosition","onLoadingComplete","placeholder","blurDataURL"]),F=l.useContext(d.ImageConfigContext),H=l.useMemo((function(){var e=b||F||s.imageConfigDefault,t=o(e.deviceSizes).concat(o(e.imageSizes)).sort((function(e,t){return e-t})),i=e.deviceSizes.sort((function(e,t){return e-t}));return g({},e,{allSizes:t,deviceSizes:i})}),[F]),V=U,T=i?"responsive":"intrinsic";"layout"in V&&(V.layout&&(T=V.layout),delete V.layout);var G=j;if("loader"in V){if(V.loader){var J=V.loader;G=function(e){e.config;var t=m(e,["config"]);return J(t)}}delete V.loader}var Z="";if(function(e){return"object"===typeof e&&(S(e)||function(e){return void 0!==e.src}(e))}(t)){var Q=S(t)?t.default:t;if(!Q.src)throw new Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ".concat(JSON.stringify(Q)));if(D=D||Q.blurDataURL,Z=Q.src,(!T||"fill"!==T)&&(P=P||Q.height,L=L||Q.width,!Q.height||!Q.width))throw new Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ".concat(JSON.stringify(Q)))}t="string"===typeof t?t:Z;var K=x(L),X=x(P),Y=x(R),$=!h&&("lazy"===z||"undefined"===typeof z);(t.startsWith("data:")||t.startsWith("blob:"))&&(f=!0,$=!1);v.has(t)&&($=!1);y&&(f=!0);var ee,te=r(l.useState(!1),2),ie=te[0],ne=te[1],re=r(u.useIntersection({rootRef:E,rootMargin:_||"200px",disabled:!$}),3),oe=re[0],ae=re[1],le=re[2],ce=!$||ae,se={boxSizing:"border-box",display:"block",overflow:"hidden",width:"initial",height:"initial",background:"none",opacity:1,border:0,margin:0,padding:0},ue={boxSizing:"border-box",display:"block",width:"initial",height:"initial",background:"none",opacity:1,border:0,margin:0,padding:0},de=!1,fe={position:"absolute",top:0,left:0,bottom:0,right:0,boxSizing:"border-box",padding:0,border:"none",margin:"auto",display:"block",width:0,height:0,minWidth:"100%",maxWidth:"100%",minHeight:"100%",maxHeight:"100%",objectFit:C,objectPosition:N};0;var ge=Object.assign({},q,fe),pe="blur"!==B||ie?{}:{backgroundSize:C||"cover",backgroundPosition:N||"0% 0%",filter:"blur(20px)",backgroundImage:'url("'.concat(D,'")')};if("fill"===T)se.display="block",se.position="absolute",se.top=0,se.left=0,se.bottom=0,se.right=0;else if("undefined"!==typeof K&&"undefined"!==typeof X){var me=X/K,he=isNaN(me)?"100%":"".concat(100*me,"%");"responsive"===T?(se.display="block",se.position="relative",de=!0,ue.paddingTop=he):"intrinsic"===T?(se.display="inline-block",se.position="relative",se.maxWidth="100%",de=!0,ue.maxWidth="100%",ee="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27".concat(K,"%27%20height=%27").concat(X,"%27/%3e")):"fixed"===T&&(se.display="inline-block",se.position="relative",se.width=K,se.height=X)}else 0;var ye={src:w,srcSet:void 0,sizes:void 0};ce&&(ye=A({config:H,src:t,unoptimized:f,layout:T,width:K,quality:Y,sizes:i,loader:G}));var be=t;0;var ve,we="imagesrcset",ze="imagesizes";we="imageSrcSet",ze="imageSizes";var Se=(n(ve={},we,ye.srcSet),n(ve,ze,ye.sizes),ve),Ae=l.default.useLayoutEffect,xe=l.useRef(M),je=l.useRef(t);l.useEffect((function(){xe.current=M}),[M]),Ae((function(){je.current!==t&&(le(),je.current=t)}),[le,t]);var ke=g({isLazy:$,imgAttributes:ye,heightInt:X,widthInt:K,qualityInt:Y,layout:T,className:I,imgStyle:ge,blurStyle:pe,loading:z,config:H,unoptimized:f,placeholder:B,loader:G,srcString:be,onLoadingCompleteRef:xe,setBlurComplete:ne,setIntersection:oe,isVisible:ce,noscriptSizes:i},V);return l.default.createElement(l.default.Fragment,null,l.default.createElement("span",{style:se},de?l.default.createElement("span",{style:ue},ee?l.default.createElement("img",{style:{display:"block",maxWidth:"100%",width:"initial",height:"initial",background:"none",opacity:1,border:0,margin:0,padding:0},alt:"","aria-hidden":!0,src:ee}):null):null,l.default.createElement(O,Object.assign({},ke))),h?l.default.createElement(c.default,null,l.default.createElement("link",Object.assign({key:"__nimg-"+ye.src+ye.srcSet+ye.sizes,rel:"preload",as:"image",href:ye.srcSet?void 0:ye.src},Se))):null)};var a,l=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=p();if(t&&t.has(e))return t.get(e);var i={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var o=n?Object.getOwnPropertyDescriptor(e,r):null;o&&(o.get||o.set)?Object.defineProperty(i,r,o):i[r]=e[r]}i.default=e,t&&t.set(e,i);return i}(i(7294)),c=(a=i(5443))&&a.__esModule?a:{default:a},s=i(9309),u=i(7190),d=i(9977),f=(i(3794),i(2392));function g(){return g=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e},g.apply(this,arguments)}function p(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return p=function(){return e},e}function m(e,t){if(null==e)return{};var i,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)i=o[n],t.indexOf(i)>=0||(r[i]=e[i]);return r}var h={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",experimentalUnoptimized:!0}||{},y=h.experimentalUnoptimized,b={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",experimentalUnoptimized:!0},v=new Set,w=(new Map,"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");var z=new Map([["default",function(e){var t=e.config,i=e.src,n=e.width,r=e.quality;0;if(i.endsWith(".svg")&&!t.dangerouslyAllowSVG)return i;return"".concat(f.normalizePathTrailingSlash(t.path),"?url=").concat(encodeURIComponent(i),"&w=").concat(n,"&q=").concat(r||75)}],["imgix",function(e){var t=e.config,i=e.src,n=e.width,r=e.quality,o=new URL("".concat(t.path).concat(E(i))),a=o.searchParams;a.set("auto",a.get("auto")||"format"),a.set("fit",a.get("fit")||"max"),a.set("w",a.get("w")||n.toString()),r&&a.set("q",r.toString());return o.href}],["cloudinary",function(e){var t=e.config,i=e.src,n=e.width,r=e.quality,o=["f_auto","c_limit","w_"+n,"q_"+(r||"auto")].join(",")+"/";return"".concat(t.path).concat(o).concat(E(i))}],["akamai",function(e){var t=e.config,i=e.src,n=e.width;return"".concat(t.path).concat(E(i),"?imwidth=").concat(n)}],["custom",function(e){var t=e.src;throw new Error('Image with src "'.concat(t,'" is missing "loader" prop.')+"\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader")}]]);function S(e){return void 0!==e.default}function A(e){var t=e.config,i=e.src,n=e.unoptimized,r=e.layout,a=e.width,l=e.quality,c=e.sizes,s=e.loader;if(n)return{src:i,srcSet:void 0,sizes:void 0};var u=function(e,t,i,n){var r=e.deviceSizes,a=e.allSizes;if(n&&("fill"===i||"responsive"===i)){for(var l,c=/(^|\s)(1?\d?\d)vw/g,s=[];l=c.exec(n);l)s.push(parseInt(l[2]));if(s.length){var u,d=.01*(u=Math).min.apply(u,o(s));return{widths:a.filter((function(e){return e>=r[0]*d})),kind:"w"}}return{widths:a,kind:"w"}}return"number"!==typeof t||"fill"===i||"responsive"===i?{widths:r,kind:"w"}:{widths:o(new Set([t,2*t].map((function(e){return a.find((function(t){return t>=e}))||a[a.length-1]})))),kind:"x"}}(t,a,r,c),d=u.widths,f=u.kind,g=d.length-1;return{sizes:c||"w"!==f?c:"100vw",srcSet:d.map((function(e,n){return"".concat(s({config:t,src:i,quality:l,width:e})," ").concat("w"===f?e:n+1).concat(f)})).join(", "),src:s({config:t,src:i,quality:l,width:d[g]})}}function x(e){return"number"===typeof e?e:"string"===typeof e?parseInt(e,10):void 0}function j(e){var t,i=(null==(t=e.config)?void 0:t.loader)||"default",n=z.get(i);if(n)return n(e);throw new Error('Unknown "loader" found in "next.config.js". Expected: '.concat(s.VALID_LOADERS.join(", "),". Received: ").concat(i))}function k(e,t,i,n,r,o){e&&e.src!==w&&e["data-loaded-src"]!==t&&(e["data-loaded-src"]=t,("decode"in e?e.decode():Promise.resolve()).catch((function(){})).then((function(){if(e.parentNode&&(v.add(t),"blur"===n&&o(!0),null==r?void 0:r.current)){var i=e.naturalWidth,a=e.naturalHeight;r.current({naturalWidth:i,naturalHeight:a})}})))}var O=function(e){var t=e.imgAttributes,i=(e.heightInt,e.widthInt),n=e.qualityInt,r=e.layout,o=e.className,a=e.imgStyle,c=e.blurStyle,s=e.isLazy,u=e.placeholder,d=e.loading,f=e.srcString,p=e.config,h=e.unoptimized,y=e.loader,b=e.onLoadingCompleteRef,v=e.setBlurComplete,w=e.setIntersection,z=e.onLoad,S=e.onError,x=(e.isVisible,e.noscriptSizes),j=m(e,["imgAttributes","heightInt","widthInt","qualityInt","layout","className","imgStyle","blurStyle","isLazy","placeholder","loading","srcString","config","unoptimized","loader","onLoadingCompleteRef","setBlurComplete","setIntersection","onLoad","onError","isVisible","noscriptSizes"]);return d=s?"lazy":d,l.default.createElement(l.default.Fragment,null,l.default.createElement("img",Object.assign({},j,t,{decoding:"async","data-nimg":r,className:o,style:g({},a,c),ref:l.useCallback((function(e){w(e),(null==e?void 0:e.complete)&&k(e,f,0,u,b,v)}),[w,f,r,u,b,v]),onLoad:function(e){k(e.currentTarget,f,0,u,b,v),z&&z(e)},onError:function(e){"blur"===u&&v(!0),S&&S(e)}})),(s||"blur"===u)&&l.default.createElement("noscript",null,l.default.createElement("img",Object.assign({},j,A({config:p,src:f,unoptimized:h,layout:r,width:i,quality:n,sizes:x,loader:y}),{decoding:"async","data-nimg":r,style:a,className:o,loading:d}))))};function E(e){return"/"===e[0]?e.slice(1):e}("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&"undefined"===typeof t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},9008:function(e,t,i){e.exports=i(5443)},5675:function(e,t,i){e.exports=i(8045)}}]);