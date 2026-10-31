const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const context=vm.createContext({URLSearchParams,localStorage:{getItem:()=>null},document:{querySelector:()=>null,getElementById:()=>null,addEventListener:()=>{}},window:{addEventListener:()=>{}},location:{hash:''}});
vm.runInContext(fs.readFileSync('dist/data.js','utf8')+'\n'+fs.readFileSync('dist/walk.js','utf8')+'\n'+fs.readFileSync('dist/mall.js','utf8')+'\n'+fs.readFileSync('dist/app.js','utf8').split("document.addEventListener('click'")[0],context);
const run=s=>vm.runInContext(s,context);
assert.equal(run('DEPARTMENTS.length'),5);
assert.equal(run('new Set(DEPARTMENTS.flatMap(d=>departmentProducts(d.id).map(p=>p.id))).size'),36);
assert.equal(run('departmentProducts("men").every(p=>p.gender.includes("men")&&!p.category.match(/shoes|bags|accessories/))'),true);
assert.equal(run('departmentProducts("women").every(p=>p.gender.includes("women"))'),true);
assert.equal(run('departmentProducts("shoes").length'),8);
assert.equal(run('departmentProducts("bags").length'),4);
assert.equal(run('departmentProducts("accessories").length'),4);
for(const id of ['men','women','shoes','bags','accessories']){const markup=run(`roomPage('${id}')`);assert.match(markup,/immersiveRack/);assert.match(markup,/roomProductStrip/);assert.equal(run('roomIndex'),2);run('roomIndex=roomProducts.length-1;moveRoom(1)');assert.equal(run('roomIndex'),0);run('moveRoom(-1)');assert.equal(run('roomIndex===roomProducts.length-1'),true);}
assert.match(run('home()'),/data-department="men"/);
assert.match(run('roomPage("invalid");currentDepartment.id'),/men/);
for(const f of ['mall.png','room.png','garments.png','catalog.png'])assert.ok(fs.statSync('dist/assets/'+f).size>0);
console.log('Passed: five department routes, complete catalog coverage, gender/category isolation, room rendering, initial selection, carousel wrapping, fallback route and asset presence.');

const homeMarkup=run('home()');for(const id of ['men','women','shoes','bags','accessories'])assert.ok(homeMarkup.includes('data-department="'+id+'"'));
assert.ok(!/ZARA|MANGO|ALDO|CHARLES|المول/.test(homeMarkup));
for(const id of ['shoes','bags','accessories']){run(`roomPage('${id}')`);assert.equal(run('isShelfSection()'),true);assert.equal((run('sectionShelfMarkup()').match(/data-room-index=/g)||[]).length,4);assert.ok(!run('sectionShelfMarkup()').includes('room-piece'));}
run("roomPage('shoes');roomIndex=7");assert.ok(run('sectionShelfMarkup()').includes('data-room-index="7"'));
run("roomPage('men')");assert.equal(run('isShelfSection()'),false);
console.log('Passed: all five single-shop zones selectable, no external brands in home, shelf layouts and second footwear shelf page.');
