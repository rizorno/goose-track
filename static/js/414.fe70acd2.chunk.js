"use strict";(self.webpackChunkgoose_track=self.webpackChunkgoose_track||[]).push([[414],{8414:function(s,t,e){e.r(t),e.d(t,{default:function(){return X}});var a=e(9434),n=e(7262),r=e(8527),i=e(4522);var l=e(5719),d=e(4888),c=e(467),o=function(s){var t=(0,l.default)(new Date(s)),e=(0,d.default)(new Date(s)),a=(0,c.default)(t)-1,n=function(s,t){var e;(0,i.Z)(1,arguments);var a=s||{},n=(0,r.default)(a.start),l=(0,r.default)(a.end).getTime();if(!(n.getTime()<=l))throw new RangeError("Invalid interval");var d=[],c=n;c.setHours(0,0,0,0);var o=Number(null!==(e=null===t||void 0===t?void 0:t.step)&&void 0!==e?e:1);if(o<1||isNaN(o))throw new RangeError("`options.step` must be a number greater than 1");for(;c.getTime()<=l;)d.push((0,r.default)(c)),c.setDate(c.getDate()+o),c.setHours(0,0,0,0);return d}({start:t,end:e});return{startMonth:t,endMonth:e,firstDayOfMonth:a,daysOfMonth:n}},u=e(1710),h=e(4454),x=e(5193),m="monthCalendarHead_monthHeadList__I1dbF",_="monthCalendarHead_monthHeadItem__cZyzh",f=e(184),j=function(){var s=(0,x.Z)("(max-width: 767.9px)");return(0,f.jsx)(f.Fragment,{children:s?(0,f.jsxs)("ul",{className:m,children:[(0,f.jsx)("li",{children:"M"}),(0,f.jsx)("li",{children:"T"}),(0,f.jsx)("li",{children:"W"}),(0,f.jsx)("li",{children:"T"}),(0,f.jsx)("li",{children:"F"}),(0,f.jsx)("li",{className:_,children:"S"}),(0,f.jsx)("li",{className:_,children:"S"})]}):(0,f.jsxs)("ul",{className:m,children:[(0,f.jsx)("li",{children:"Mon"}),(0,f.jsx)("li",{children:"Tue"}),(0,f.jsx)("li",{children:"Wed"}),(0,f.jsx)("li",{children:"Thu"}),(0,f.jsx)("li",{children:"Fri"}),(0,f.jsx)("li",{className:_,children:"Sat"}),(0,f.jsx)("li",{className:_,children:"Sun"})]})})},k=e(7689),v=e(1951),g=e(8897),p=e(9439),y=e(2791),T=e(4690);function N(s){return(0,i.Z)(1,arguments),(0,T.default)(s,Date.now())}var w=e(9831),M=function(s){var t=s.split("-")[2];return t.startsWith("0")?t.slice(1):t},b=e(68),Z=e(6294),L=e(9390),C="tasksList_tasksListStyle__W8q2E",D="tasksList_tasksListItem__x1-jw",W="tasksList_lowColor__0mTTe",E="tasksList_mediumColor__VZVrR",I="tasksList_highColor__30O4C",S="tasksList_iconCheck__c8N7t",F=function(s){var t,e=s.task,a=(0,x.Z)("(max-width: 767.9px)"),n=(0,x.Z)("(max-width: 1439.9px)"),r=(0,x.Z)("(min-width: 1440px)"),i=(0,y.useState)(!1),l=(0,p.Z)(i,2),d=l[0],c=l[1],o=function(){c(!d)};return(0,f.jsxs)("div",{className:C,children:[(0,f.jsx)("div",{className:D,onClick:o,children:(0,f.jsxs)("p",{className:"low"===e.priority&&W||"medium"===e.priority&&E||"high"===e.priority&&I,children:[(t=e.title,a&&t.length>3?t.substring(0,3)+"...":n&&t.length>8?t.substring(0,8)+"...":r&&t.length>16?t.substring(0,16)+"...":t),a?null:"toDo"===e.status&&(0,f.jsx)(b.Z,{title:"To Do",placement:"top",arrow:!0,children:(0,f.jsx)("svg",{className:S,children:(0,f.jsx)("use",{href:L.Z+"#task-todo"})})})||"inProgress"===e.status&&(0,f.jsx)(b.Z,{title:"In progress",placement:"top",arrow:!0,children:(0,f.jsx)("svg",{className:S,children:(0,f.jsx)("use",{href:L.Z+"#task-inprogress"})})})||"done"===e.status&&(0,f.jsx)(b.Z,{title:"Done",placement:"top",arrow:!0,children:(0,f.jsx)("svg",{className:S,children:(0,f.jsx)("use",{href:L.Z+"#task-done"})})})]})},e._id),d&&(0,f.jsx)(Z.Z,{task:e,closeModal:o,overlayClose:function(s){s.target===s.currentTarget&&c(!d)}})]})},H="modalTaskList_overlay__Gn0b1",O="modalTaskList_modalWrapper__3jHuU",A="modalTaskList_modalBox__hAisU",B=function(s){var t=s.taskList,e=s.closeModalList,a=(0,x.Z)("(max-width: 767.9px)");return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("div",{className:H,onClick:e}),(0,f.jsx)("div",{className:O,children:(0,f.jsx)("div",{className:A,children:t.tasks.map((function(s,t){return(0,f.jsx)("div",{children:a?t>0&&(0,f.jsx)(F,{task:s}):t>1&&(0,f.jsx)(F,{task:s})},t)}))})})]})},G="daysWithTasks_styledTd__DGEua",R="daysWithTasks_styledNumberDay__OvvxE",V="daysWithTasks_today__sqVjM",q="daysWithTasks_styledModalTd__ve0BM",J="daysWithTasks_burgerListTasks__AZIKv",P=function(s){var t=s.day,e=s.handleClick,a=(0,x.Z)("(max-width: 767.9px)"),n=(0,y.useState)(!1),r=(0,p.Z)(n,2),i=r[0],l=r[1];(0,y.useEffect)((function(){var s=function(s){"Escape"===s.code&&i&&l(!i)};return window.addEventListener("keydown",s),function(){window.removeEventListener("keydown",s)}}),[i]);var d=function(){l(!i)};return(0,f.jsxs)("td",{className:G,onClick:function(s){return e(s,t.date)},children:[(0,f.jsx)("p",{className:N((0,w.default)(t.date))?V:R,onClick:function(s){return e(s,t.date)},children:M(t.date)}),t.tasks.length>0?(0,f.jsxs)(f.Fragment,{children:[t.tasks.map((function(s,t){return(0,f.jsx)("div",{children:a?0===t&&(0,f.jsx)(F,{task:s}):t<=1&&(0,f.jsx)(F,{task:s})},t)})),a&&t.tasks.length>1?(0,f.jsxs)("p",{className:J,onClick:d,children:["+",t.tasks.length-1," ..."]}):!a&&t.tasks.length>2?(0,f.jsxs)("p",{className:J,onClick:d,children:["+",t.tasks.length-2," tasks"]}):null]}):null,i&&(0,f.jsx)("div",{className:q,children:(0,f.jsx)(B,{closeModalList:function(s){s.target===s.currentTarget&&l(!i)},taskList:t})})]})},U="calendarTable_calendarTableWrapper__idOhD",z="calendarTable_calendarTableStyle__7uTI4",K="calendarTable_claendarTableBody__Jrm6I",Y=function(s){var t=s.tasks,e=s.currentDate,n=(0,a.I0)(),r=(0,k.s0)(),i=o(e),l=i.daysOfMonth,d=i.firstDayOfMonth,c=l.map((function(s){return{date:(0,v.default)(s,"yyyy-MM-dd"),tasks:t.filter((function(t){return t.date.start.slice(0,10)===(0,v.default)(s,"yyyy-MM-dd")}))}})),u=function(s,t){s.currentTarget===s.target&&(n((0,g.G)(t)),r("/calendar/day/".concat(t)))},h=[],x=function(s){return Array.from({length:s},(function(s,t){return(0,f.jsx)("td",{},"empty-".concat(t))}))}(d);return c.forEach((function(s,t){x.push((0,f.jsx)(P,{day:s,handleClick:u},t)),7!==x.length&&t!==c.length-1||(h.push((0,f.jsx)("tr",{children:x},s.date)),x=[])})),(0,f.jsx)("div",{className:U,children:(0,f.jsx)("table",{className:z,children:(0,f.jsx)("tbody",{className:K,children:h})})})},Q="choosedMonth_choosedMonthWrapper__gJPgY",X=function(){var s=(0,a.v9)(u.i),t=(0,a.v9)(h.p),e=o(s),r=e.startMonth,i=e.endMonth,l=t.filter((function(s){var t=new Date(s.date.start);return(0,n.default)(t,{start:r,end:i})}));return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(j,{}),(0,f.jsx)("div",{className:Q,children:(0,f.jsx)(Y,{tasks:l,currentDate:s})})]})}}}]);
//# sourceMappingURL=414.fe70acd2.chunk.js.map