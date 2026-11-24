// ---------- Données ----------
// meal: pdj (petit-déj) | midi | soir ; tags: vegetarien, vegan, proteine, leger, sans-gluten
const DISHES = [
  {id:1, name:"Pancakes d'avoine", e:"🥞", meal:"pdj", kcal:340, price:6.5, time:10, tags:["vegetarien","leger"], desc:"Flocons d'avoine, banane, fruits frais."},
  {id:2, name:"Omelette française", e:"🍳", meal:"pdj", kcal:360, price:7, time:8, tags:["vegetarien","proteine","sans-gluten"], desc:"Omelette moelleuse aux herbes fraîches."},
  {id:3, name:"Smoothie mangue crémeux", e:"🥭", meal:"pdj", kcal:210, price:5.5, time:3, tags:["vegetarien","leger","sans-gluten"], desc:"Mangue mûre, yaourt, une touche de citron vert."},
  {id:4, name:"Œufs brouillés à la tomate", e:"🍅", meal:"pdj", kcal:300, price:6.5, time:8, tags:["vegetarien","proteine","sans-gluten"], desc:"Œufs, tomates fraîches, ciboule."},
  {id:5, name:"Pancakes à la banane", e:"🍌", meal:"pdj", kcal:400, price:7, time:10, tags:["vegetarien"], desc:"Banane, avoine, œuf, sirop d'érable."},
  {id:6, name:"Houmous maison", e:"🧆", meal:"pdj", kcal:280, price:6, time:5, tags:["vegan","vegetarien","leger","sans-gluten"], desc:"Pois chiches, tahini, citron, huile d'olive."},

  {id:7, name:"Salade saumon & avocat", e:"🥗", meal:"midi", kcal:480, price:13.5, time:8, tags:["proteine","leger","sans-gluten"], desc:"Saumon, avocat, mesclun, vinaigrette citron."},
  {id:8, name:"Poulet quinoa à la grecque", e:"🍗", meal:"midi", kcal:580, price:13.5, time:12, tags:["proteine"], desc:"Blanc de poulet, quinoa, concombre, feta, olives."},
  {id:9, name:"Lentilles au tahini", e:"🥙", meal:"midi", kcal:470, price:11.5, time:10, tags:["vegan","vegetarien","sans-gluten"], desc:"Lentilles, sauce tahini, herbes fraîches."},
  {id:10, name:"Riz aux fruits de mer", e:"🍤", meal:"midi", kcal:620, price:15.5, time:14, tags:["proteine","sans-gluten"], desc:"Riz, crevettes, moules, calamars, poivrons."},
  {id:11, name:"Pita falafel & tahini", e:"🌯", meal:"midi", kcal:550, price:11, time:9, tags:["vegan","vegetarien"], desc:"Pita complet, falafels, crudités, sauce tahini."},
  {id:12, name:"Salade niçoise au thon", e:"🐟", meal:"midi", kcal:450, price:14, time:10, tags:["proteine","leger","sans-gluten"], desc:"Thon, œuf, haricots verts, olives, tomates."},

  {id:13, name:"Soupe de carottes marocaine", e:"🍲", meal:"soir", kcal:230, price:8, time:6, tags:["vegan","vegetarien","leger","sans-gluten"], desc:"Velouté de carottes, cumin et coriandre."},
  {id:14, name:"Dal fry de lentilles", e:"🍛", meal:"soir", kcal:490, price:11.5, time:15, tags:["vegan","vegetarien","sans-gluten"], desc:"Lentilles épicées, tomate, coriandre, riz basmati."},
  {id:15, name:"Poulet miel-balsamique & brocolis", e:"🥘", meal:"soir", kcal:520, price:13, time:15, tags:["proteine","sans-gluten"], desc:"Poulet rôti, brocolis croquants, pommes de terre."},
  {id:16, name:"Omelette asiatique", e:"🍳", meal:"soir", kcal:380, price:9.5, time:8, tags:["vegetarien","proteine","leger"], desc:"Egg foo young : omelette aux légumes croquants."},
  {id:17, name:"Salade de pâtes méditerranéenne", e:"🍝", meal:"soir", kcal:500, price:10.5, time:12, tags:["vegetarien"], desc:"Pâtes, tomates cerises, olives, basilic."},
  {id:18, name:"Poisson escovitch & légumes", e:"🐠", meal:"soir", kcal:390, price:13.5, time:12, tags:["proteine","leger","sans-gluten"], desc:"Poisson poêlé, légumes marinés, épices douces."},
  {id:19, name:"Attiéké poulet grillé", e:"🍗", meal:"midi", kcal:610, price:12.5, time:15, tags:["proteine","sans-gluten"], desc:"Semoule de manioc, poulet grillé, sauce tomate-oignon."},
  {id:20, name:"Attiéké poisson frit", e:"🐟", meal:"soir", kcal:560, price:12, time:15, tags:["proteine","sans-gluten"], desc:"Attiéké, poisson frit, tomates, oignons et piment doux."},
];
const MEAL_LABEL = {pdj:"Petit-déj", midi:"Déjeuner", soir:"Dîner"};
const DAYS = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
const CATS = [["all","Tous"],["pdj","Petit-déj"],["midi","Déjeuner"],["soir","Dîner"],["vegan","Vegan"],["proteine","Protéines"],["leger","Léger"]];

// ---------- Utilitaires ----------
const $ = s => document.querySelector(s);
const eur = n => n.toFixed(2).replace(".", ",") + " €";
const img = d => `<img src="images/${d.id}.jpg" alt="${d.name}" loading="lazy">`;
const byId = id => DISHES.find(d => d.id === id);
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const pick = a => a[Math.floor(Math.random() * a.length)];
let toastT;
function toast(msg){ const t=$("#toast"); t.textContent=msg; t.classList.add("show"); clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove("show"),2200); }

// ---------- Carte ----------
let filter = "all";
function renderFilters(){
  $("#filters").innerHTML = CATS.map(([k,l]) => `<button class="filter ${k===filter?"on":""}" data-f="${k}">${l}</button>`).join("");
}
function renderDishes(){
  const list = DISHES.filter(d => filter==="all" || d.meal===filter || d.tags.includes(filter));
  $("#dishes").innerHTML = list.map(d => `
    <article class="card">
      <div class="pic">${img(d)}</div>
      <h3>${d.name}</h3>
      <p>${d.desc}</p>
      <div class="tags">${d.tags.map(t=>`<span class="tag">${t}</span>`).join("")}</div>
      <div class="meta"><span>🔥 ${d.kcal} kcal</span><span>⏱ ${d.time} min</span></div>
      <div class="row"><span class="price">${eur(d.price)}</span><button class="add" data-add="${d.id}" aria-label="Ajouter ${d.name}">+</button></div>
    </article>`).join("");
}
$("#filters").addEventListener("click", e => {
  const b = e.target.closest("[data-f]"); if(!b) return;
  filter = b.dataset.f; renderFilters(); renderDishes();
});
$("#dishes").addEventListener("click", e => {
  const b = e.target.closest("[data-add]"); if(b) addToCart(+b.dataset.add);
});

// capsules de catégories du héros
const CAPS = [["Petit-déj","pdj",1,"#18a558"],["Déjeuner","midi",19,"#e0409a"],["Dîner","soir",14,"#2d8cf0"],["Vegan","vegan",9,"#ff9f1c"]];
$("#caps").innerHTML = CAPS.map(([l,f,i,c]) => `<button class="cap" style="background:${c}" data-q="${f}"><img src="images/${i}.jpg" alt=""><span>${l}</span><small>★ 4.8</small></button>`).join("");
$("#caps").addEventListener("click", e => {
  const b = e.target.closest("[data-q]"); if(!b) return;
  filter = b.dataset.q; renderFilters(); renderDishes();
  $("#carte").scrollIntoView();
});
$("#capPrev").onclick = () => $("#caps").scrollBy({left:-92});
$("#capNext").onclick = () => $("#caps").scrollBy({left:92});
document.querySelectorAll("[data-soon]").forEach(b => b.onclick = () => toast("Bientôt disponible"));
addEventListener("scroll", () => { document.querySelector(".fab").hidden = scrollY < 500; }, {passive:true});

// ---------- Panier ----------
let cart = load("cart", {});   // {id: qty}
function addToCart(id, n = 1){ cart[id] = (cart[id]||0) + n; save("cart", cart); renderCart(); toast(`${byId(id).name} ajouté`); }
function renderCart(){
  const ids = Object.keys(cart).map(Number);
  const n = ids.reduce((s,i)=>s+cart[i],0);
  document.querySelectorAll(".cart-n").forEach(el => el.textContent = n);
  $("#cartList").innerHTML = ids.length ? ids.map(i => { const d = byId(i); return `
    <li><span class="th">${img(d)}</span><span class="n">${d.name}<br><small>${eur(d.price)}</small></span>
    <span class="qty"><button data-m="${i}">−</button>${cart[i]}<button data-p="${i}">+</button></span></li>`; }).join("")
    : `<li class="empty">Votre panier est vide.</li>`;
  $("#cartTotal").textContent = eur(ids.reduce((s,i)=>s+cart[i]*byId(i).price,0));
}
$("#cartList").addEventListener("click", e => {
  const m = e.target.dataset.m, p = e.target.dataset.p;
  if(p) cart[p]++;
  if(m){ cart[m]--; if(cart[m]<=0) delete cart[m]; }
  if(p||m){ save("cart", cart); renderCart(); }
});
const setDrawer = o => { $("#drawer").classList.toggle("open", o); $("#drawer").setAttribute("aria-hidden", !o); };
document.querySelectorAll("[data-cart]").forEach(b => b.onclick = () => setDrawer(true));
$("#closeCart").onclick = () => setDrawer(false);
$("#clearCart").onclick = () => { cart = {}; save("cart", cart); renderCart(); };
$("#checkout").onclick = () => {
  if(!Object.keys(cart).length) return toast("Panier vide");
  cart = {}; save("cart", cart); renderCart(); setDrawer(false); toast("Commande envoyée ! Merci 🌿");
};

// ---------- Planificateur ----------
let plan = load("plan", null); // {days:[{label, meals:[id,...]}], meals:n, diet, kcal}

function candidates(meal, diet){
  return DISHES.filter(d => d.meal===meal && (diet==="all" || d.tags.includes(diet)));
}
function mealsFor(n){ return n===3 ? ["pdj","midi","soir"] : ["midi","soir"]; }

// Choisit le jour dont le total de calories est le plus proche de la cible
function buildDay(meals, diet, kcal, avoid){
  let best=null, bestGap=Infinity;
  for(let t=0;t<40;t++){
    const ids = meals.map(m => {
      const c = candidates(m, diet);
      const fresh = c.filter(d => !avoid.has(d.id));
      return pick(fresh.length ? fresh : c).id;
    });
    const gap = Math.abs(ids.reduce((s,i)=>s+byId(i).kcal,0) - kcal);
    if(gap<bestGap){ best=ids; bestGap=gap; }
  }
  return best;
}
function generate(){
  const nDays = +$("#period").value, diet = $("#diet").value, kcal = +$("#kcal").value, n = +$("#meals").value;
  const meals = mealsFor(n);
  if(meals.some(m => !candidates(m, diet).length)) return toast("Pas assez de plats pour ce régime");
  const used = new Set(), days = [];
  for(let i=0;i<nDays;i++){
    const ids = buildDay(meals, diet, kcal, used);
    ids.forEach(x => used.add(x));
    if(used.size > 9) used.clear(); // évite la répétition sans bloquer
    days.push({label: nDays===1 ? "Menu du jour" : DAYS[i], meals: ids});
  }
  plan = {days, meals: n, diet, kcal};
  save("plan", plan); renderPlan();
  toast(nDays === 1 ? "Menu du jour prêt !" : "Menu de la semaine prêt !");
}
function renderPlan(){
  if(!plan){ $("#plan").innerHTML = `<p class="empty">Choisissez vos préférences puis cliquez sur « Générer ».</p>`; $("#planActions").hidden = true; return; }
  const types = mealsFor(plan.meals);
  $("#plan").innerHTML = `<div class="days">` + plan.days.map((day, di) => {
    const total = day.meals.reduce((s,i)=>s+byId(i).kcal,0);
    return `<div class="day"><h4>${day.label}<small>${total} kcal</small></h4>` +
      day.meals.map((id, mi) => { const d = byId(id); return `
        <div class="meal"><span class="e">${img(d)}</span>
        <span class="t"><small>${MEAL_LABEL[types[mi]]}</small>${d.name}<small>${d.kcal} kcal · ${eur(d.price)}</small></span>
        <button class="swap" data-d="${di}" data-m="${mi}" title="Changer ce plat" aria-label="Changer ce plat">🔄</button></div>`; }).join("") + `</div>`;
  }).join("") + `</div>`;
  const price = plan.days.flatMap(d=>d.meals).reduce((s,i)=>s+byId(i).price,0);
  const kcalAll = plan.days.flatMap(d=>d.meals).reduce((s,i)=>s+byId(i).kcal,0);
  $("#planTotal").textContent = `Total du menu : ${eur(price)} · moyenne ${Math.round(kcalAll/plan.days.length)} kcal/jour`;
  $("#planActions").hidden = false;
}
$("#planForm").addEventListener("submit", e => { e.preventDefault(); generate(); });
$("#plan").addEventListener("click", e => {
  const b = e.target.closest(".swap"); if(!b) return;
  const di=+b.dataset.d, mi=+b.dataset.m, meal = mealsFor(plan.meals)[mi];
  const cur = plan.days[di].meals[mi];
  const alt = candidates(meal, plan.diet).filter(d => d.id!==cur);
  if(!alt.length) return toast("Pas d'autre option");
  plan.days[di].meals[mi] = pick(alt).id;
  save("plan", plan); renderPlan();
});
$("#orderPlan").onclick = () => {
  plan.days.flatMap(d=>d.meals).forEach(id => cart[id] = (cart[id]||0)+1);
  save("cart", cart); renderCart(); setDrawer(true); toast("Menu ajouté au panier");
};

// ---------- Init ----------
renderFilters(); renderDishes(); renderCart(); renderPlan();
