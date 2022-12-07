"use strict";(self.webpackChunkdocs_v_3=self.webpackChunkdocs_v_3||[]).push([[2296],{3905:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>d});var o=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function n(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,o)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?n(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,o,r=function(e,t){if(null==e)return{};var a,o,r={},n=Object.keys(e);for(o=0;o<n.length;o++)a=n[o],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(o=0;o<n.length;o++)a=n[o],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=o.createContext({}),p=function(e){var t=o.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},c=function(e){var t=p(e.components);return o.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},u=o.forwardRef((function(e,t){var a=e.components,r=e.mdxType,n=e.originalType,s=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),u=p(a),d=r,f=u["".concat(s,".").concat(d)]||u[d]||m[d]||n;return a?o.createElement(f,l(l({ref:t},c),{},{components:a})):o.createElement(f,l({ref:t},c))}));function d(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var n=a.length,l=new Array(n);l[0]=u;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:r,l[1]=i;for(var p=2;p<n;p++)l[p]=a[p];return o.createElement.apply(null,l)}return o.createElement.apply(null,a)}u.displayName="MDXCreateElement"},9845:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>m,frontMatter:()=>n,metadata:()=>i,toc:()=>p});var o=a(7462),r=(a(7294),a(3905));const n={id:"api_model_message.PollData",title:"Interface: PollData",sidebar_label:"PollData",custom_edit_url:null},l=void 0,i={unversionedId:"api/interfaces/api_model_message.PollData",id:"api/interfaces/api_model_message.PollData",title:"Interface: PollData",description:"api/model/message.PollData",source:"@site/docs/api/interfaces/api_model_message.PollData.md",sourceDirName:"api/interfaces",slug:"/api/interfaces/api_model_message.PollData",permalink:"/docs/api/interfaces/api_model_message.PollData",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{id:"api_model_message.PollData",title:"Interface: PollData",sidebar_label:"PollData",custom_edit_url:null},sidebar:"tutorialSidebar",previous:{title:"MessageInfoInteraction",permalink:"/docs/api/interfaces/api_model_message.MessageInfoInteraction"},next:{title:"PollOption",permalink:"/docs/api/interfaces/api_model_message.PollOption"}},s={},p=[{value:"Properties",id:"properties",level:2},{value:"pollMessage",id:"pollmessage",level:3},{value:"pollOptions",id:"polloptions",level:3},{value:"totalVotes",id:"totalvotes",level:3},{value:"votes",id:"votes",level:3}],c={toc:p};function m(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,o.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/docs/api/modules/api_model_message"},"api/model/message"),".PollData"),(0,r.kt)("h2",{id:"properties"},"Properties"),(0,r.kt)("h3",{id:"pollmessage"},"pollMessage"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"pollMessage"),": ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/interfaces/api_model_message.Message"},(0,r.kt)("inlineCode",{parentName:"a"},"Message"))),(0,r.kt)("p",null,"The message object of the poll"),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"polloptions"},"pollOptions"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"pollOptions"),": ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/interfaces/api_model_message.PollOption"},(0,r.kt)("inlineCode",{parentName:"a"},"PollOption"))," & { ",(0,r.kt)("inlineCode",{parentName:"p"},"count"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"number"),"  }[]"),(0,r.kt)("p",null,"The poll options and their respective count of votes."),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"totalvotes"},"totalVotes"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"totalVotes"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"number")),(0,r.kt)("p",null,"The total amount of votes recorded so far"),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"votes"},"votes"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"votes"),": ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/interfaces/api_model_message.PollVote"},(0,r.kt)("inlineCode",{parentName:"a"},"PollVote")),"[]"),(0,r.kt)("p",null,"An arrray of vote objects"))}m.isMDXComponent=!0}}]);