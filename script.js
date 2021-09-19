const $fish = document.querySelector("#fish .fishes");
const $fishT = document.querySelector("#fish tr");
const $item = document.querySelector("#item");
const $inventory = document.querySelector("#inventory .fishes");
const $inventoryT = document.querySelector("#inventory tr");
const $total = document.querySelector("#total .fishes");
const $totalT = document.querySelector("#total tr");
const $resetFish = document.querySelector("#reset-fishes");
const $resetItem = document.querySelector("#reset-items");
const $resetInventory = document.querySelector("#reset-inventory");
const $menu = document.querySelector("#menu");
const fishesDefault = [
  {
    id: 1,
    name: "분홍 구피",
    color: null,
    background: null
  },{
    id: 2,
    name: "유리 구피",
    color: null,
    background: null
  },{
    id: 3,
    name: "달콤달콤 구피",
    color: null,
    background: null
  },{
    id: 4,
    name: "파란 구피",
    color: null,
    background: null
  },{
    id: 5,
    name: "노을빛 구피",
    color: null,
    background: null
  },{
    id: 6,
    name: "수정빛 구피",
    color: null,
    background: null
  },{
    id: 11,
    name: "부레 가시고기",
    color: null,
    background: null
  },{
    id: 12,
    name: "전투 가시고기",
    color: null,
    background: null
  },{
    id: 13,
    name: "맹독 가시고기",
    color: null,
    background: null
  },{
    id: 14,
    name: "붉은 마왕 가시고기",
    color: null,
    background: null
  },{
    id: 15,
    name: "흰눈 가시고기",
    color: null,
    background: null
  },{
    id: 21,
    name: "금적빛 용 물고기",
    color: null,
    background: null
  },{
    id: 22,
    name: "녹빛 용 물고기",
    color: null,
    background: null
  },{
    id: 31,
    name: "갈색 나비고기",
    color: null,
    background: null
  },{
    id: 32,
    name: "자색 나비고기",
    color: null,
    background: null
  },{
    id: 33,
    name: "녹색 나비고기",
    color: null,
    background: null
  },{
    id: 34,
    name: "장수 나비고기",
    color: null,
    background: null
  },{
    id: 35,
    name: "전류 나비고기",
    color: null,
    background: null
  },{
    id: 41,
    name: "대포 복어",
    color: null,
    background: null
  },{
    id: 42,
    name: "쓴맛 대포 복어",
    color: null,
    background: null
  }
];
const itemsDefault = [
  {
    id: 1,
    name: "제조법: 적색 다진 미끼",
    fishes: [
      {id: 1, count: 3}
    ],
    count: 1,
    confirm: false
  },{
    id: 2,
    name: "제조법: 가짜 벌레 미끼",
    fishes: [
      {id: 1, count: 3}
    ],
    count: 1,
    confirm: false
  },{
    id: 3,
    name: "제조법: 가짜 날벌레 미끼",
    fishes: [
      {id: 1, count: 3}
    ],
    count: 1,
    confirm: false
  },{
    id: 4,
    name: "휘감는 바람",
    fishes: [
      {id: 1, count: 20},
      {id: 2, count: 20},
      {id: 13, count: 20},
      {id: 33, count: 20}
    ],
    count: 1,
    confirm: false
  },{
    id: 5,
    name: "「신비한 구름 연못」",
    fishes: [
      {id: 1, count: 10}
    ],
    count: 1,
    confirm: false
  },{
    id: 6,
    name: "염원을 품은 자",
    fishes: [
      {id: 1, count: 20},
      {id: 3, count: 20},
      {id: 12, count: 20},
      {id: 31, count: 20}
    ],
    count: 1,
    confirm: false
  },{
    id: 7,
    name: "나루카와 우카이",
    fishes: [
      {id: 1, count: 20},
      {id: 2, count: 20},
      {id: 11, count: 20},
      {id: 32, count: 20}
    ],
    count: 1,
    confirm: false
  },{
    id: 8,
    name: "「어획」",
    fishes: [
      {id: 21, count: 20},
      {id: 22, count: 20},
      {id: 35, count: 6}
    ],
    count: 1,
    confirm: false
  },{
    id: 9,
    name: "아코의 사케마스",
    fishes: [
      {id: 35, count: 3},
      {id: 41, count: 10},
      {id: 42, count: 10}
    ],
    count: 4,
    confirm: false
  }
];
let $fishes = document.querySelectorAll("#fish td");
let $items = document.querySelectorAll("#item>div");
let $inventorys = document.querySelectorAll("#inventory td");
let $inventorysInput = document.querySelectorAll("#inventory input");
let $totals = document.querySelectorAll("#total td");
let fishes = localStorage.getItem("genshin-fish-fishes") !== null ? JSON.parse(localStorage.getItem("genshin-fish-fishes")) : JSON.parse(JSON.stringify(fishesDefault));
let items = localStorage.getItem("genshin-fish-items") !== null ? JSON.parse(localStorage.getItem("genshin-fish-items")) : JSON.parse(JSON.stringify(itemsDefault));
let inventory = localStorage.getItem("genshin-fish-inventory") !== null ? JSON.parse(localStorage.getItem("genshin-fish-inventory")) : [];
let fishesSort;
let itemsSort;

const total = e => {
  $totals.forEach(el => {
    let id = el.dataset.id * 1;
    let result = 0;

    for(let j = 0; j < itemsSort.length; j++) {
      const item = itemsSort[j];
      const iID = item.fishes.findIndex(k => k.id === id);
      if(iID > -1 && !item.confirm) result += item.fishes[iID].count * item.count;
    }

    const iID = inventory.findIndex(i => i.id === id);
    if(iID > -1) result -= inventory[iID].count;

    if(result < 0) result = 0;

    el.innerText = result;
  })
}

const fishesModify = id => {
  let target;
  let data = fishes[fishes.findIndex(i => i.id == id)];
  $fishes.forEach(el => {
    if(el.dataset.id == id) {
      el.innerText = data.name;
      el.title = data.name;
      el.style.width = "";
      target = el;
      el.style.width = `${target.offsetWidth}px`;
      el.style.background = data.background;
      el.style.color = data.color;
    }
  })
  $items.forEach(el => {
    const els = el.querySelectorAll("td");
    els.forEach(el2 => {
      if(el2.dataset.fish_id == id) {
        el2.style.width = `${target.offsetWidth}px`;
        el2.style.background = data.background;
        el2.style.color = data.color;
      }
    })
  })
  $inventorys.forEach(el => {
    if(el.dataset.id == id) {
      el.style.width = `${target.offsetWidth}px`;
      el.style.background = data.background;
      el.style.color = data.color;
    }
  })
  $totals.forEach(el => {
    if(el.dataset.id == id) {
      el.style.width = `${target.offsetWidth}px`;
      el.style.background = data.background;
      el.style.color = data.color;
    }
  })

  localStorage.setItem("genshin-fish-fishes", JSON.stringify(fishesSort));
}

const dataModify = e => {
  const target = e.target;
  let id = target.dataset.id !== undefined ? target.dataset.id : target.dataset.fish_id !== undefined ? {fish: target.dataset.fish_id * 1, item: target.dataset.item_id * 1} : undefined;
  let parent = target;
  let type = target.dataset.type;
  while(id === undefined) {
    parent = parent.parentNode;
    id = parent.dataset.id;
  }

  if(typeof(id) !== "object") id = id * 1;

  const input = document.createElement("input");
  input.value = target.innerText;
  target.innerText = "";
  if(typeof(id) === "object") {
    input.type = "number";
    input.addEventListener("input", e => {  
      if(input.value < 0) input.value = 0;
    })
  }else {
    if(type.includes("Name")) {
      input.type = "text";
    }else if(type.includes("Count")) {
      input.type = "number";
      input.addEventListener("input", e => {
        if(input.value <= 0) input.value = 1;
      })
    }
  }

  input.addEventListener("blur", e => {
    target.innerText = input.value;
    target.title = input.value;
    input.remove();
    if(type === "fishName") {
      fishes[fishes.findIndex(i => i.id === id)].name = input.value;
      fishesModify(id);
    }
    if(type === "itemName") {
      items[items.findIndex(i => i.id === id)].name = input.value;
    }
    if(type === "itemCount") {
      items[items.findIndex(i => i.id === id)].count = input.value * 1;
      total();
    }
    if(typeof(id) === "object") {
      const item = items[items.findIndex(i => i.id === id.item)];
      const fishID = item.fishes.findIndex(i => i.id === id.fish);
      if(fishID > -1) item.fishes[fishID].count = input.value;
      else item.fishes.push({id: id.fish, count: input.value});
      total();
    }
    localStorage.setItem("genshin-fish-items", JSON.stringify(itemsSort));
  })

  target.append(input);
  input.focus();
}

const mousewheelEvent = e => {
  e.preventDefault();
  if(e.wheelDelta < 0) {
    $fish.scrollLeft += 100;
  }else {
    $fish.scrollLeft -= 100;
  }
  
  for(let i = 0; i < $items.length; i++) {
    const item = $items[i].children[1];
    item.scrollLeft = $fish.scrollLeft;
  }

  $inventory.scrollLeft = $fish.scrollLeft;
  $total.scrollLeft = $fish.scrollLeft;
}

const init = e => {

  $fishes.forEach(el => el.remove());
  $items.forEach(el => el.remove());
  $inventorys.forEach(el => el.remove());
  $totals.forEach(el => el.remove());
  
  fishesSort = fishes.sort(function(a,b) {
    return a.id - b.id
  })
  
  for(let i = 0; i < fishesSort.length; i++) {
    const fish = fishesSort[i];

    const td = document.createElement("td");
    td.innerText = fish.name;
    td.title = fish.name;
    td.style.color = fish.color;
    td.style.background = fish.background;
    td.dataset.id = fish.id;
    td.dataset.type = "fishName";
    td.addEventListener("dblclick", dataModify);

    $fishT.append(td);
  }

  $fishes = document.querySelectorAll("#fish td");

  itemsSort = items.sort(function(a,b) {
    return a.id - b.id
  })

  for(let i = 0; i < itemsSort.length; i++) {
    item = itemsSort[i];

    const div = document.createElement("div");
    const data = document.createElement("div");
    const fishes = document.createElement("div");
    const table = document.createElement("table");
    const tr = document.createElement("tr");
    const title = document.createElement("span");
    const count = document.createElement("span");

    table.append(tr);
    
    data.classList.add("data");
    data.dataset.id = item.id;
    data.innerHTML = `<input type="checkbox" id="${item.id}" ${item.confirm === true ? "checked" : ""} class="none"><label class="check" for="${item.id}"></label>`;

    const input = data.querySelector("input");
    input.addEventListener("input", e => {
      itemsSort[i].confirm = input.checked;
      localStorage.setItem("genshin-fish-items", JSON.stringify(itemsSort));
      localStorage.setItem("genshin-fish-inventory", JSON.stringify(inventory));
      total();
    })
    
    title.classList.add("name");
    title.title = item.name;
    title.innerText = item.name;
    title.dataset.type = "itemName";
    count.classList.add("count");
    count.innerText = item.count;
    count.dataset.type = "itemCount";

    title.addEventListener("dblclick", dataModify);
    count.addEventListener("dblclick", dataModify);

    data.append(title);
    data.append(count);

    fishes.classList.add("fishes");

    for(let i = 0; i < fishesSort.length; i++) {
      const fish = fishesSort[i];
      const width = $fishes[i].offsetWidth;
      const td = document.createElement("td");

      td.innerText = "0";

      const id = item.fishes.findIndex(i => i.id === fish.id);
      if(id > -1) td.innerText = item.fishes[id].count;

      td.addEventListener("dblclick", dataModify);

      td.style.color = fish.color;
      td.style.background = fish.background;
      td.dataset.fish_id = fish.id;
      td.dataset.item_id = item.id;
      td.style.width = `${width}px`;
      $fishes[i].style.width = `${width}px`;
  
      tr.append(td);
    }
    
    fishes.append(table);
    div.append(data);
    div.append(fishes);
    $item.append(div);

  }

  $items = document.querySelectorAll("#item>div");

  $items.forEach(el => el.addEventListener("mousewheel", mousewheelEvent));
  $items.forEach(el => el.addEventListener("mousedown", e => {if(e.button == 1) e.preventDefault()}));

  for(let i = 0; i < fishesSort.length; i++) {
    const fish = fishesSort[i];
    const td = document.createElement("td");
    const input = document.createElement("input");
    const width = $fishes[i].offsetWidth;

    input.value = 0;

    const id = inventory.findIndex(i => i.id === fish.id);
    if(id > -1) input.value = inventory[id].count;

    input.min = 0;
    input.type = "number";
    input.addEventListener("input", e => {
      if(input.value < 0) input.value = 0;
      const iID = inventory.findIndex(i => i.id === fish.id);
      if(iID < 0) inventory.push({id: fish.id, count: input.value});
      else inventory[iID].count = input.value;
      total();
      localStorage.setItem("genshin-fish-inventory", JSON.stringify(inventory));
    })

    td.append(input);

    td.style.color = fish.color;
    td.style.background = fish.background;
    td.dataset.id = fish.id;
    td.style.width = `${width}px`;

    $inventoryT.append(td);
  }

  for(let i = 0; i < fishesSort.length; i++) {
    const fish = fishesSort[i];
    const td = document.createElement("td");
    const width = $fishes[i].offsetWidth;

    td.style.color = fish.color;
    td.style.background = fish.background;
    td.dataset.id = fish.id;
    td.style.width = `${width}px`;

    let result = 0;

    for(let j = 0; j < itemsSort.length; j++) {
      const item = itemsSort[j];
      const id = item.fishes.findIndex(k => k.id === fish.id);
      if(id > -1 && !item.confirm) result += item.fishes[id].count * item.count;
    }

    const id = inventory.findIndex(i => i.id === fish.id);
    if(id > -1) result -= inventory[id].count;

    if(result < 0) result = 0;

    td.innerText = result;

    $totalT.append(td);
  }

  $inventorys = document.querySelectorAll("#inventory td");
  $inventorysInput = document.querySelectorAll("#inventory input");
  $totals = document.querySelectorAll("#total td");

  localStorage.setItem("genshin-fish-fishes", JSON.stringify(fishesSort));
  localStorage.setItem("genshin-fish-items", JSON.stringify(itemsSort));
  localStorage.setItem("genshin-fish-inventory", JSON.stringify(inventory));

}

$fish.addEventListener("mousewheel", mousewheelEvent);
$fish.addEventListener("mousedown", e => {if(e.button == 1) e.preventDefault()});
$inventory.addEventListener("mousewheel", mousewheelEvent);
$inventory.addEventListener("mousedown", e => {if(e.button == 1) e.preventDefault()});
$total.addEventListener("mousewheel", mousewheelEvent); 
$total.addEventListener("mousedown", e => {if(e.button == 1) e.preventDefault()});

$resetFish.addEventListener("click", e => {
  fishes = JSON.parse(JSON.stringify(fishesDefault));

  init();
})

$resetItem.addEventListener("click", e => {
  items = JSON.parse(JSON.stringify(itemsDefault));

  init();
})

$resetInventory.addEventListener("click", e => {
  inventory = [];

  $inventorysInput.forEach(el => el.value = 0);

  localStorage.setItem("genshin-fish-inventory", JSON.stringify(inventory));
  total();
})

document.addEventListener("contextmenu", e => {
  e.preventDefault();
  $menu.classList.remove("none");
  $menu.style.left = `${e.offsetX}px`;
  $menu.style.top = `${e.offsetY}px`;
})

init();