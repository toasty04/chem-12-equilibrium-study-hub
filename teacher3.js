(() => {
  'use strict';
  const levels = ['Foundation', 'Application', 'Challenge'];
  // Each item lists three statements and the one-based numbers of the true ones.
  const bank = [
    ['Foundation','Saturation','A saturated salt solution is in contact with excess solid at constant temperature.', ['Ions continue to leave the solid.', 'Dissolving and crystallizing occur at equal rates.', 'The equilibrium concentrations must be equal for both ions.'], [1,2], 'Dynamic equilibrium requires equal rates. The dissolution coefficients and other dissolved ions determine the concentrations.'],
    ['Foundation','Ionic equations','Na₂SO₄(aq) and BaCl₂(aq) form BaSO₄(s).', ['Na⁺ is a spectator ion.', 'Solid BaSO₄ is split into ions in the complete ionic equation.', 'One sulfate ion reacts with one barium ion.'], [1,3], 'The solid stays intact. Na⁺ and Cl⁻ cancel, leaving Ba²⁺ + SO₄²⁻ → BaSO₄(s).'],
    ['Foundation','Hard water','Consider a water sample containing dissolved Ca²⁺ and Mg²⁺.', ['Both ions contribute to hardness.', 'Adding NaCl necessarily removes both ions.', 'Removing dissolved Ca²⁺ and Mg²⁺ softens the water.'], [1,3], 'Hardness comes mainly from dissolved calcium and magnesium. Their chlorides remain soluble.'],
    ['Foundation','Solubility curves','At 20 °C, salt A dissolves up to 40 g per 100 g water.', ['20 g can dissolve in 50 g water.', 'Adding 50 g to 100 g water leaves 10 g solid at equilibrium.', 'The liquid above this excess solid is unsaturated.'], [1,2], 'Scale the capacity to the mass of water. The liquid reaches saturation when excess solid remains at equilibrium.'],
    ['Foundation','Ksp','For Ag₂CrO₄(s) ⇌ 2Ag⁺ + CrO₄²⁻, consider the equilibrium expression.', ['[Ag⁺] is squared.', 'The mass of solid appears in the denominator.', 'The chromate concentration has exponent 2.'], [1], 'Ksp = [Ag⁺]²[CrO₄²⁻]. The pure solid has constant activity.'],
    ['Foundation','Dilution','A sample of NaCl solution is diluted with pure water.', ['The moles of chloride stay constant.', 'The chloride concentration decreases.', 'The final volume includes the added water.'], [1,2,3], 'With no reaction, C₁V₁ = C₂V₂ because the amount of dissolved solute is conserved.'],
    ['Application','ICE tables','MX₂ has molar solubility s in pure water and dissociates completely.', ['[M²⁺] = s.', '[X⁻] = 2s.', 'Ksp = 2s².'], [1,2], 'Ksp = [M²⁺][X⁻]² = s(2s)² = 4s³.'],
    ['Application','Titration','A 10.00 mL chloride sample requires 8.00 mL of 0.100 M AgNO₃.', ['Ag⁺ reacts with Cl⁻ in a 1 to 1 ratio.', 'The sample contains 8.00 × 10⁻⁴ mol Cl⁻.', 'The sample concentration is 0.00800 M.'], [1,2], 'Divide 0.000800 mol by 0.01000 L to obtain 0.0800 M.'],
    ['Application','Mixing','Mix 20.0 mL of 0.0300 M NaCl with 40.0 mL water.', ['The final volume is 60.0 mL assuming additive volumes.', '[Cl⁻] becomes 0.0100 M.', 'The dissolved moles of NaCl triple.'], [1,2], 'Concentration falls by a factor of three because the same solute occupies three times the volume.'],
    ['Application','Separation','Ag⁺ and Ba²⁺ are present. Add enough chloride to precipitate AgCl selectively.', ['AgCl is in the solid fraction.', 'Filter before testing the remaining solution for barium.', 'All Ba²⁺ is removed with the AgCl.'], [1,2], 'Barium chloride is soluble. After filtration, the filtrate can be tested with sulfate for Ba²⁺.'],
    ['Application','Common ions','NaF is added to saturated CaF₂ solution containing solid, at fixed temperature.', ['Adding F⁻ initially raises Q.', 'Some CaF₂ precipitates as equilibrium is restored.', 'Ksp increases permanently.'], [1,2], 'Q = [Ca²⁺][F⁻]² rises above Ksp. Precipitation consumes both ions until equilibrium returns.'],
    ['Application','Cooling','Salt B has solubilities of 70 and 40 g per 100 g water at 80 and 20 °C respectively. Cool a saturated sample containing 150 g water.', ['The hot solution contains 105 g dissolved B.', '60 g stays dissolved at 20 °C.', '30 g crystallizes.'], [1,2], 'The difference is (70 − 40) × 1.5 = 45 g of crystals.'],
    ['Challenge','First precipitate','Pb²⁺ is added to 0.10 M I⁻ and 0.10 M SO₄²⁻. Use Ksp values of 8.5 × 10⁻⁹ for PbI₂ and 1.8 × 10⁻⁸ for PbSO₄. Ignore dilution.', ['PbI₂ reaches saturation at [Pb²⁺] = 8.5 × 10⁻⁷ M.', 'PbSO₄ reaches saturation at [Pb²⁺] = 1.8 × 10⁻⁷ M.', 'PbI₂ forms first.'], [1,2], 'Divide each Ksp by its anion concentration raised to the correct power. The smaller lead threshold belongs to PbSO₄.'],
    ['Challenge','Precipitation','Mix equal volumes of 2.0 × 10⁻⁵ M AgNO₃ and 4.0 × 10⁻⁵ M NaCl. Ksp(AgCl) = 1.8 × 10⁻¹⁰.', ['Both ion concentrations halve before reaction.', 'Initial Q after mixing is 2.0 × 10⁻¹⁰.', 'AgCl formation is favoured.'], [1,2,3], 'Q = (1.0 × 10⁻⁵)(2.0 × 10⁻⁵) > Ksp. The post-mixing concentrations must be used.'],
    ['Challenge','Solubility ranking','Salt AX has Ksp = 1.0 × 10⁻⁸. Salt BY₂ has Ksp = 4.0 × 10⁻¹². Both dissolve ideally in pure water.', ['AX has s = 1.0 × 10⁻⁴ M.', 'BY₂ has s = 1.0 × 10⁻⁴ M.', 'AX has greater molar solubility.'], [1,2], 'For AX, s = √Ksp. For BY₂, s = ∛(Ksp/4). The two calculations give the same molar solubility.'],
    ['Challenge','Hard water','A reagent provides X²⁻. At the current dissolved concentrations Q(CaX) > Ksp(CaX) and Q(MgX) < Ksp(MgX).', ['CaX can precipitate.', 'MgX is initially unsaturated.', 'Precipitation of CaX alone removes all hardness.'], [1,2], 'Compare each ion product to its own Ksp. Dissolved Mg²⁺ still contributes to hardness.'],
    ['Challenge','Titration error','A 10.0-fold diluted sample is titrated for chloride. The student overshoots the endpoint and uses the recorded volume.', ['The calculated chloride moles are too high.', 'Multiplying by the dilution factor corrects the endpoint error.', 'The reported original chloride concentration is too high.'], [1,3], 'Excess titrant inflates the calculated chloride amount. Multiplying by ten carries the same relative error to the original concentration.'],
    ['Challenge','Common-ion ICE','AgCl is equilibrated in 0.010 M NaCl. Ksp = 1.8 × 10⁻¹⁰. Let s be the AgCl molar solubility.', ['[Cl⁻] at equilibrium is 0.010 + s.', 'Ksp = s² for this mixture.', 'Using 0.010 + s ≈ 0.010 gives s ≈ 1.8 × 10⁻⁸ M.'], [1,3], 'Ksp = s(0.010 + s). The computed s is much smaller than the initial chloride concentration.']
  ];
  const key = 'chem12-unit3-teacher-v1';
  const selector = document.getElementById('teacher-level');
  const card = document.getElementById('teacher-card');
  const fresh = { level:'Mixed', turn:0, queues:{}, current:null, picked:[], checked:false };
  let session = fresh;
  try { session = {...fresh, ...JSON.parse(localStorage.getItem(key))}; } catch {}
  function save() { try { localStorage.setItem(key, JSON.stringify(session)); } catch {} }
  function shuffled(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
  function next() {
    const level = session.level === 'Mixed' ? levels[session.turn++ % levels.length] : session.level;
    let queue = session.queues[level];
    if (!queue?.length) {
      queue = shuffled(bank.map((item,i) => i).filter(i => bank[i][0] === level));
      if (queue.at(-1) === session.current) queue.unshift(queue.pop());
      session.queues[level] = queue;
    }
    session.current = queue.pop();
    session.order = shuffled([1,2,3]);
    session.picked = [];
    session.checked = false;
    save();
    render();
  }
  function render() {
    const [level,topic,prompt,statements,correct,why] = bank[session.current];
    selector.value = session.level;
    const labels = session.order.map((id,i) => `<label class="option"><input type="checkbox" value="${id}" ${session.picked.includes(id)?'checked':''} ${session.checked?'disabled':''}><span><b>${i+1}.</b> ${statements[id-1]}</span></label>`).join('');
    const right = correct.length === session.picked.length && correct.every(id => session.picked.includes(id));
    const numbers = session.order.flatMap((id,i) => correct.includes(id) ? [i+1] : []);
    card.innerHTML = `<p class="question-meta">${level} · ${topic}</p><h2>${prompt}</h2><fieldset style="border:0;padding:0"><legend>Select all true statements.</legend>${labels}</fieldset>
      ${session.checked ? `<p class="feedback ${right?'':'bad'}" role="status"><b>${right?'Correct.':'Review your selection.'}</b> True: ${numbers.join(', ')}. ${why}</p><button class="button button-dark" id="teacher-next">Next question</button>` : '<button class="button button-dark" id="teacher-check">Check answer</button>'}`;
    if (session.checked) document.getElementById('teacher-next').onclick = next;
    else {
      const check = document.getElementById('teacher-check');
      check.disabled = !session.picked.length;
      card.onchange = () => {
        session.picked = Array.from(card.querySelectorAll('input:checked'), input => Number(input.value));
        check.disabled = !session.picked.length;
        save();
      };
      check.onclick = () => { session.checked = true; save(); render(); };
    }
  }
  selector.onchange = () => { session.level = selector.value; session.turn = 0; next(); };
  if (bank[session.current] && Array.isArray(session.order)) render();
  else next();
})();
