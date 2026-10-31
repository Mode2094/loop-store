const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const handlers={};const ctx=vm.createContext({document:{addEventListener(type,fn){handlers[type]=fn},getElementById(){return null}},window:{addEventListener(){}},location:{hash:'#home'},closeLayers(){}});
vm.runInContext(fs.readFileSync('dist/walk.js','utf8'),ctx);
for(const [w,h] of [[320,568],[390,844],[430,932],[768,1024],[1440,900],[1920,1080],[844,390]])for(const x of [-2,0,.17,.39,.61,.84,1,3]){
const b=vm.runInContext(`walkBounds(${w},${h},${x})`,ctx);
assert.ok(b.w>=w&&b.h>=h-1e-6);assert.ok(b.left<=1e-6&&b.left+b.w>=w-1e-6,'No blank horizontal edge');assert.ok(b.top<=1e-6&&b.top+b.h>=h-1e-6,'No blank vertical edge');assert.ok(b.x>=0&&b.x<=1);
}
const source=fs.readFileSync('dist/walk.js','utf8');assert.ok(!source.includes('walkZoom'));assert.ok(!source.includes('walk-forward'));assert.ok(!source.includes('walk-back'));assert.ok(source.includes('requestFullscreen'));assert.ok(source.includes("view.onpointercancel"));assert.ok(source.includes("view.onkeydown"));
console.log('Passed: camera bounds cover seven mobile/desktop/landscape viewports at fixed scale and extreme drag positions; fullscreen, keyboard, pointer cancellation paths present.');

vm.runInContext("const DEPARTMENTS=[{id:'men'},{id:'women'},{id:'shoes'},{id:'bags'},{id:'accessories'}]",ctx);
for(const action of ['walk-target','walk-map-target'])for(const id of ['men','women','shoes','bags','accessories']){ctx.location.hash='#home';handlers.click({target:{closest:()=>({dataset:{action,department:id}})}});assert.equal(ctx.location.hash,'#room/'+id,'Immediate entry without animation or timer')}
vm.runInContext("walkActive='women'",ctx);handlers.click({target:{closest:()=>({dataset:{action:'walk-enter'}})}});assert.equal(ctx.location.hash,'#room/women');
ctx.location.hash='#home';vm.runInContext("enterWalkStore('unknown')",ctx);assert.equal(ctx.location.hash,'#home');
console.log('Passed: facade/map/button clicks enter immediately and invalid destinations are rejected.');
