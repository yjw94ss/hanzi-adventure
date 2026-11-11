(function(root){
const Core={
 createSession(chars){return {chars:[...chars],index:0,correct:0,independent:0,review:[],resolved:false,assisted:false,done:chars.length===0};},
 hint(s){s.assisted=true;if(!s.review.includes(s.chars[s.index]))s.review.push(s.chars[s.index]);},
 answer(s,value){if(s.done||s.resolved)return {ok:false,ignored:true};const char=s.chars[s.index];if(value!==char){this.hint(s);return {ok:false};}s.resolved=true;s.correct++;if(!s.assisted)s.independent++;return {ok:true,independent:!s.assisted};},
 next(s){if(!s.resolved||s.done)return;s.index++;s.done=s.index>=s.chars.length;s.resolved=false;s.assisted=false;},
 reviewQueue(stats,chars){return chars.filter(c=>stats[c]?.seen||stats[c]?.miss).sort((a,b)=>(stats[b]?.miss||0)-(stats[a]?.miss||0));}
};if(typeof module!=='undefined')module.exports=Core;else root.Core=Core;
})(typeof window!=='undefined'?window:globalThis);
