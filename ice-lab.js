(() => {
  const STORAGE_KEY = 'chem12-equilibrium-ice-v1';
  const problems = [
    {
      id:'hebden47',short:'01 · Find Kₑq',level:'Textbook #47',title:'A known equilibrium amount',
      prompt:'A 1.0 L vessel starts with 0.750 mol CO and 0.275 mol H₂O. At equilibrium, 0.250 mol CO₂ is present. Find Kₑq.',
      equation:'CO(g) + H₂O(g) ⇌ CO₂(g) + H₂(g)',species:['CO','H₂O','CO₂','H₂'],
      expected:[[.750,.275,0,0],[-.250,-.250,.250,.250],[.500,.025,.250,.250]],
      given:[[true,true,true,true],[false,false,false,false],[false,false,true,false]],
      givenDisplay:[['0.750','0.275','0','0'],[],[null,null,'0.250']],
      finalLabel:'Kₑq',finalValue:5,finalSigFigs:2,
      expressions:['[CO₂][H₂] / ([CO][H₂O])','[CO][H₂O] / ([CO₂][H₂])','[CO₂][H₂] / [CO]'],expressionCorrect:0,
      hint:'The coefficients are all 1. CO₂ starts at zero, so its +0.250 M change sets the size of every other change.',
      solution:'The changes are −0.250, −0.250, +0.250, +0.250 M. Equilibrium concentrations are 0.500, 0.025, 0.250, 0.250 M. Kₑq = (0.250 × 0.250)/(0.500 × 0.025) = 5.0.'
    },
    {
      id:'hebden48',short:'02 · Convert & find Kₑq',level:'Original practice',title:'Moles are not mol/L',
      prompt:'A 5.0 L vessel initially contains 6.0 mol SO₂, 2.5 mol NO₂, 1.0 mol SO₃, and no NO. At equilibrium, it contains 3.0 mol SO₃. Convert to mol/L, complete the ICE table, and find Kₑq.',
      equation:'SO₂(g) + NO₂(g) ⇌ SO₃(g) + NO(g)',species:['SO₂','NO₂','SO₃','NO'],
      expected:[[1.20,.50,.20,0],[-.40,-.40,.40,.40],[.80,.10,.60,.40]],
      given:[[false,false,false,false],[false,false,false,false],[false,false,false,false]],
      finalLabel:'Kₑq',finalValue:3,finalSigFigs:2,
      expressions:['[SO₂][NO₂] / ([SO₃][NO])','[SO₃][NO] / ([SO₂][NO₂])','[SO₃]²[NO] / ([SO₂][NO₂])'],expressionCorrect:1,
      hint:'Divide each amount in mol by 5.0 L before writing the initial row. SO₃ rises from 0.20 M to 0.60 M.',
      solution:'Initial values are 1.20, 0.50, 0.20, 0 M. SO₃ rises by 0.40 M, so the changes are −0.40, −0.40, +0.40, +0.40 M. Equilibrium values are 0.80, 0.10, 0.60, 0.40 M. Kₑq = (0.60 × 0.40)/(0.80 × 0.10) = 3.0.'
    },
    {
      id:'from-keq',short:'03 · Find concentrations',level:'Original practice',title:'Start with Kₑq',
      prompt:'Kₑq = 4.0. Initially [SO₂] = [NO₂] = 0.80 M, with no SO₃ or NO. Complete the ICE table and find equilibrium [SO₃].',
      equation:'SO₂(g) + NO₂(g) ⇌ SO₃(g) + NO(g)',species:['SO₂','NO₂','SO₃','NO'],
      expected:[[.80,.80,0,0],[-.533333,-.533333,.533333,.533333],[.266667,.266667,.533333,.533333]],
      given:[[true,true,true,true],[false,false,false,false],[false,false,false,false]],
      givenDisplay:[['0.80','0.80','0','0']],
      finalLabel:'[SO₃] at equilibrium (M)',finalValue:.533333,finalSigFigs:2,
      expressions:['[SO₃][NO] / ([SO₂][NO₂])','[SO₂][NO₂] / ([SO₃][NO])','[SO₃] / [SO₂]'],expressionCorrect:0,
      hint:'Let the product changes be +x. Then Kₑq = x²/(0.80−x)² = 4.0. Take the positive square root before solving.',
      solution:'2.0 = x/(0.80−x), so x = 0.533 M. Changes are −0.533, −0.533, +0.533, +0.533 M. Equilibrium values are 0.267, 0.267, 0.533, 0.533 M. Therefore [SO₃] = 0.53 M.'
    },
    {
      id:'coefficients',short:'04 · Coefficients & exponents',level:'Original practice',title:'The 2 matters twice',
      prompt:'Kₑq = 4.00. Initially [H₂] = [I₂] = 0.50 M and [HI] = 0. Complete the ICE table and find equilibrium [HI].',
      equation:'H₂(g) + I₂(g) ⇌ 2 HI(g)',species:['H₂','I₂','HI'],
      expected:[[.50,.50,0],[-.25,-.25,.50],[.25,.25,.50]],
      given:[[true,true,true],[false,false,false],[false,false,false]],
      givenDisplay:[['0.50','0.50','0']],
      finalLabel:'[HI] at equilibrium (M)',finalValue:.50,finalSigFigs:2,
      expressions:['[HI] / ([H₂][I₂])','[HI]² / ([H₂][I₂])','[HI]² / ([H₂]²[I₂]²)'],expressionCorrect:1,
      hint:'If H₂ and I₂ each change by −x, HI changes by +2x. The coefficient 2 also becomes the exponent on [HI] in Kₑq.',
      solution:'Kₑq = (2x)²/(0.50−x)² = 4.00. Taking the positive square root gives 2x/(0.50−x) = 2, so x = 0.25 M. Changes are −0.25, −0.25, +0.50 M, and [HI] at equilibrium is 0.50 M.'
    },
    {
      id:'reverse',short:'05 · Reverse direction',level:'Original challenge',title:'Starting from the product side',
      prompt:'Initially [NO₂] = 0 and [N₂O₄] = 0.40 M. At equilibrium [NO₂] = 0.40 M. The reaction must move left first. Complete the ICE table and find Kₑq for the equation as written.',
      equation:'2 NO₂(g) ⇌ N₂O₄(g)',species:['NO₂','N₂O₄'],
      expected:[[0,.40],[.40,-.20],[.40,.20]],
      given:[[true,true],[false,false],[true,false]],
      givenDisplay:[['0','0.40'],[],['0.40']],
      finalLabel:'Kₑq',finalValue:1.25,finalSigFigs:2,
      expressions:['[NO₂]² / [N₂O₄]','[N₂O₄] / [NO₂]','[N₂O₄] / [NO₂]²'],expressionCorrect:2,
      hint:'The reverse reaction produces two NO₂ for every one N₂O₄ it uses. The +0.40 M NO₂ change therefore means −0.20 M N₂O₄.',
      solution:'Changes are +0.40 M NO₂ and −0.20 M N₂O₄. Equilibrium concentrations are 0.40 and 0.20 M. For the equation as written, Kₑq = [N₂O₄]/[NO₂]² = 0.20/(0.40²) = 1.25 before rounding, or 1.3 to 2 significant figures.'
    },
    {
      id:'hebden57',short:'06 · Find Kₑq',level:'Hebden #57',title:'A coefficient changes the ICE row',
      prompt:'A 1.0 L flask initially contains 0.50 mol NOCl. At equilibrium, 0.10 mol Cl₂ is present. Complete the ICE table and find Kₑq.',
      equation:'2 NOCl(g) ⇌ 2 NO(g) + Cl₂(g)',species:['NOCl','NO','Cl₂'],
      expected:[[.50,0,0],[-.20,.20,.10],[.30,.20,.10]],
      given:[[false,false,false],[false,false,false],[false,false,true]],
      givenDisplay:[[],[],[null,null,'0.10']],
      finalLabel:'Kₑq',finalValue:.044444444,finalSigFigs:2,
      expressions:['[NO]²[Cl₂] / [NOCl]²','[NO][Cl₂] / [NOCl]','[NOCl]² / ([NO]²[Cl₂])'],expressionCorrect:0,
      hint:'Cl₂ rises by +0.10 M. The coefficient 2 means NO rises by +0.20 M and NOCl falls by −0.20 M.',
      solution:'At equilibrium [NOCl] = 0.30 M, [NO] = 0.20 M, and [Cl₂] = 0.10 M. Kₑq = (0.20² × 0.10)/(0.30²) = 0.0444 before rounding, or 0.044 to 2 significant figures.'
    },
    {
      id:'hebden60',short:'07 · Solve from Kₑq',level:'Hebden #60',title:'Find all three equilibrium concentrations',
      prompt:'Kₑq = 49.5. A 10.0 L vessel starts with 0.250 mol H₂ and 0.250 mol I₂, and no HI. Convert mol to M, complete the ICE table, and find equilibrium [HI].',
      equation:'H₂(g) + I₂(g) ⇌ 2 HI(g)',species:['H₂','I₂','HI'],
      expected:[[.025,.025,0],[-.01946635,-.01946635,.0389327],[.00553365,.00553365,.0389327]],
      given:[[false,false,false],[false,false,false],[false,false,false]],
      finalLabel:'[HI] at equilibrium (M)',finalValue:.0389327,finalSigFigs:3,
      expressions:['[HI] / ([H₂][I₂])','[HI]² / ([H₂][I₂])','[H₂][I₂] / [HI]²'],expressionCorrect:1,
      hint:'Initial [H₂] and [I₂] are each 0.0250 M. Use −x, −x, +2x, then take the positive square root of Kₑq.',
      solution:'Kₑq = (2x)²/(0.0250−x)² = 49.5. Solving gives x = 0.01947 M. Keep guard digits in the ICE table; the final [HI] is 0.0389 M to 3 significant figures.'
    },
    {
      id:'hebden62',short:'08 · Reverse ICE',level:'Hebden #62',title:'Only products were added',
      prompt:'Kₑq = 1.00. A 1.00 L bulb initially has 0.150 mol N₂O and 0.250 mol H₂O, but no N₂O₂ or H₂. Complete the reverse-direction ICE table and find equilibrium [N₂O₂].',
      equation:'N₂O₂(g) + H₂(g) ⇌ N₂O(g) + H₂O(g)',species:['N₂O₂','H₂','N₂O','H₂O'],
      expected:[[0,0,.150,.250],[.09375,.09375,-.09375,-.09375],[.09375,.09375,.05625,.15625]],
      given:[[false,false,false,false],[false,false,false,false],[false,false,false,false]],
      finalLabel:'[N₂O₂] at equilibrium (M)',finalValue:.09375,finalSigFigs:3,
      expressions:['[N₂O][H₂O] / ([N₂O₂][H₂])','[N₂O₂][H₂] / ([N₂O][H₂O])','[N₂O][H₂O] / [N₂O₂]'],expressionCorrect:0,
      hint:'Both reactants begin at zero, so the system moves left. Let their changes be +x; each product changes by −x.',
      solution:'Kₑq = (0.150−x)(0.250−x)/x² = 1.00. The x² terms cancel, giving 0.0375−0.400x = 0, so x = 0.09375 M before rounding. Report equilibrium [N₂O₂] as 0.0938 M to 3 significant figures.'
    },
    {
      id:'hebden55',short:'09 · After a stress',level:'Hebden #55',title:'Build a second ICE table',
      prompt:'At equilibrium in 2.00 L, the mixture has 2.00 mol CO, 2.00 mol H₂O, 2.00 mol CO₂, and 1.00 mol H₂. Then 1.00 mol H₂ is added. For this new ICE table, use the concentrations just after the addition as Initial. Find the new equilibrium [CO].',
      equation:'CO(g) + H₂O(g) ⇌ CO₂(g) + H₂(g)',species:['CO','H₂O','CO₂','H₂'],
      expected:[[1,1,1,1],[.1715729,.1715729,-.1715729,-.1715729],[1.1715729,1.1715729,.8284271,.8284271]],
      given:[[false,false,false,false],[false,false,false,false],[false,false,false,false]],
      finalLabel:'New [CO] at equilibrium (M)',finalValue:1.1715729,finalSigFigs:3,
      expressions:['[CO₂][H₂] / ([CO][H₂O])','[CO][H₂O] / ([CO₂][H₂])','[CO₂]²[H₂] / ([CO][H₂O])'],expressionCorrect:0,
      hint:'First use the old equilibrium to find Kₑq = 0.50. After adding H₂, all four concentrations are 1.00 M. The net shift is reverse, so CO and H₂O rise by x.',
      solution:'Original Kₑq = (1.00 × 0.500)/(1.00 × 1.00) = 0.500. After adding H₂, use changes +x, +x, −x, −x. Then 0.500 = (1−x)²/(1+x)², giving x = 0.1716 M; report new [CO] = 1.17 M to 3 significant figures.'
    }
  ];

  let progress;
  try { progress = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { progress = {}; }
  if (!progress || typeof progress !== 'object') progress = {};
  progress.answers ||= {};
  progress.expressions ||= {};
  progress.checked ||= {};
  progress.finalChecked ||= {};
  progress.current ||= problems[0].id;
  const saveProgress = () => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch {} };
  const selectedProblem = () => problems.find(p => p.id === progress.current) || problems[0];
  const keyFor = (row, col) => `${row}-${col}`;
  const escapeAttr = value => String(value??'').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
  const matchesCell = (raw, problem, row, col) => window.ICEInput.matchesCell(raw, problem, row, col);
  const finalResult = (raw, problem) => window.ICEInput.finalAnswerStatus(raw, problem.finalValue, problem.finalSigFigs);
  const cellHasEnoughFigures = (raw, problem, row, col) => {
    const parsed = window.ICEInput.parseLinear(String(raw??''));
    return !parsed || parsed.hasX || problem.expected[row][col] === 0 || window.ICEInput.significantFigures(raw) >= problem.finalSigFigs;
  };

  function tableResult(problem) {
    const answers = progress.answers[problem.id] || {};
    let total = 0, correct = 0, blank = 0, invalid = 0, precision = 0;
    problem.expected.forEach((row, r) => row.forEach((expected, c) => {
      if (problem.given[r][c]) return;
      total++;
      const raw = answers[keyFor(r,c)];
      if (raw === undefined || String(raw).trim() === '') blank++;
      else if (matchesCell(raw, problem, r, c)) {
        if (cellHasEnoughFigures(raw, problem, r, c)) correct++;
        else precision++;
      }
      else if (!window.ICEInput.parseLinear(String(raw))) invalid++;
    }));
    return { total, correct, blank, invalid, precision, allCorrect: correct === total };
  }

  function renderSelector() {
    document.getElementById('ice-problems').innerHTML = problems.map((p, i) => {
      const result = tableResult(p);
      const complete = result.allCorrect && finalResult((progress.answers[p.id] || {}).final, p).status === 'correct';
      return `<button class="ice-tab ${p.id === progress.current ? 'active' : ''}" role="tab" aria-selected="${p.id === progress.current}" data-ice-problem="${p.id}"><span>${p.short}</span><small>${complete ? '✓ complete' : p.level}</small></button>`;
    }).join('');
    document.querySelectorAll('[data-ice-problem]').forEach(button => button.addEventListener('click', () => {
      progress.current = button.dataset.iceProblem;
      saveProgress();
      renderInteractiveICE();
    }));
  }

  function renderCell(problem, row, col) {
    const expected = problem.expected[row][col];
    if (problem.given[row][col]) return `<td class="ice-given">${problem.givenDisplay?.[row]?.[col] ?? expected}</td>`;
    const key = keyFor(row,col);
    const raw = (progress.answers[problem.id] || {})[key] ?? '';
    const wasChecked = !!progress.checked[problem.id];
    const status = wasChecked ? (String(raw).trim() === '' ? 'missing' : matchesCell(raw, problem, row, col) ? cellHasEnoughFigures(raw, problem, row, col) ? 'correct' : 'sigfig' : 'wrong') : '';
    const precisionHelp = status === 'sigfig' ? ` title="Numerically correct; use at least ${problem.finalSigFigs} significant figures or a symbolic x expression."` : '';
    return `<td><input class="ice-cell ${status}" data-ice-cell="${key}" type="text" inputmode="text" autocomplete="off" spellcheck="false" value="${escapeAttr(raw)}" placeholder="${row===1?'±x':'?'}" aria-label="${['Initial','Change','Equilibrium'][row]} ${problem.species[col]} in mol per litre; number or expression with x"${precisionHelp}></td>`;
  }

  function renderInteractiveICE() {
    const p = selectedProblem();
    renderSelector();
    const answers = progress.answers[p.id] || {};
    const result = tableResult(p);
    const wasChecked = !!progress.checked[p.id];
    const finalCheck = finalResult(answers.final, p);
    const finalStatus = progress.finalChecked[p.id] && answers.final !== undefined && answers.final !== '' ? finalCheck.status : '';
    const expressionPick = progress.expressions[p.id];
    document.getElementById('ice-content').innerHTML = `
      <div class="ice-grid">
        <div class="panel ice-work">
          <div class="eyebrow">${p.level.toUpperCase()}</div>
          <h2>${p.title}</h2>
          <p class="muted">${p.prompt}</p>
          <div class="ice-equation">${p.equation}</div>
          <div class="ice-table-scroll"><table class="ice-table ice-editable"><thead><tr><th>mol/L</th>${p.species.map(s => `<th>${s}</th>`).join('')}</tr></thead><tbody>${p.expected.map((row, r) => `<tr><th>${['Initial','Change','Equilibrium'][r]}</th>${row.map((_, c) => renderCell(p,r,c)).join('')}</tr>`).join('')}</tbody></table></div>
          <p class="ice-symbolic-help">Enter numbers <em>or</em> expressions with <b>x</b>: <b>−x</b>, <b>+2x</b>, <b>0.80−x</b>. Keep guard digits in calculated ICE values; the checker also flags numeric cells with fewer than <b>${p.finalSigFigs} significant figures</b>. Round the final answer only.</p>
          <div class="ice-table-actions"><button id="ice-check-table" class="button button-dark">Check my table</button><span id="ice-table-feedback" class="ice-table-feedback" role="status">${wasChecked ? result.allCorrect ? `All ${result.total} entries correct, including significant figures.` : `${result.correct} / ${result.total} entries correct${result.blank ? ` · ${result.blank} blank` : ''}${result.invalid ? ` · ${result.invalid} unreadable expression${result.invalid===1?'':'s'}` : ''}${result.precision ? ` · ${result.precision} numerically right but needing significant figures` : ''}. Green is correct; amber needs more significant figures.` : 'Fill the blank cells using numbers or expressions with x.'}</span></div>
          <div class="ice-final"><label for="ice-final-answer">${p.finalLabel} · ${p.finalSigFigs} significant figures</label><div class="ice-answer-row"><input id="ice-final-answer" class="ice-cell ${finalStatus}" type="text" inputmode="decimal" autocomplete="off" spellcheck="false" value="${escapeAttr(answers.final ?? '')}" placeholder="Your answer"><button id="ice-check-final" class="button button-dark">Check final answer</button></div><p id="ice-final-feedback" class="ice-feedback" role="status">${progress.finalChecked[p.id] ? finalCheck.status === 'correct' ? 'Correct value and significant figures.' : finalCheck.status === 'sigfig' ? `Value is right; report ${finalCheck.targetText} to ${p.finalSigFigs} significant figures.` : finalCheck.status === 'invalid' ? 'Enter a number first.' : 'Not yet. Recheck the equilibrium row and Kₑq expression.' : ''}</p></div>
        </div>
        <div class="panel ice-guide">
          <div class="eyebrow">EXPLAIN YOUR SETUP</div><h2>Which Kₑq expression?</h2>
          <p class="muted">Check every coefficient and exponent before you calculate.</p>
          <div class="ice-expression-options">${p.expressions.map((option,i) => `<button data-expression="${i}" class="${expressionPick === i ? 'selected' : ''} ${expressionPick === i && i === p.expressionCorrect ? 'correct' : ''} ${expressionPick === i && i !== p.expressionCorrect ? 'wrong' : ''}">${'ABC'[i]}. Kₑq = ${option}</button>`).join('')}</div>
          <p id="ice-expression-feedback" class="ice-feedback" role="status">${expressionPick === undefined ? '' : expressionPick === p.expressionCorrect ? 'Correct expression.' : 'Check which species are products and whether a coefficient becomes an exponent.'}</p>
          <div class="ice-hint"><b>Hint</b><p>${p.hint}</p></div>
          <button id="ice-show-solution" class="text-button">Show worked solution</button>
          <div id="ice-solution" class="ice-solution hidden">${p.solution}</div>
          <button id="ice-reset-problem" class="text-button ice-reset">Clear this example</button>
        </div>
      </div>`;

    document.querySelectorAll('[data-ice-cell]').forEach(input => input.addEventListener('input', () => {
      progress.answers[p.id] ||= {};
      progress.answers[p.id][input.dataset.iceCell] = input.value;
      progress.checked[p.id] = false;
      document.querySelectorAll('[data-ice-cell]').forEach(cell => cell.classList.remove('correct','wrong','missing'));
      document.getElementById('ice-table-feedback').textContent = 'Edited. Check the table again when you are ready.';
      saveProgress();
    }));
    document.getElementById('ice-final-answer').addEventListener('input', event => {
      progress.answers[p.id] ||= {};
      progress.answers[p.id].final = event.target.value;
      progress.finalChecked[p.id] = false;
      event.target.classList.remove('correct','wrong','sigfig');
      document.getElementById('ice-final-feedback').textContent = '';
      saveProgress();
    });
    document.getElementById('ice-check-table').addEventListener('click', () => {
      progress.checked[p.id] = true;
      saveProgress();
      renderInteractiveICE();
    });
    document.getElementById('ice-check-final').addEventListener('click', () => {
      const raw = (progress.answers[p.id] || {}).final;
      const feedback = document.getElementById('ice-final-feedback');
      const input = document.getElementById('ice-final-answer');
      const check = finalResult(raw,p);
      progress.finalChecked[p.id] = true;
      saveProgress();
      input.classList.toggle('correct',check.status==='correct');
      input.classList.toggle('sigfig',check.status==='sigfig');
      input.classList.toggle('wrong',check.status==='wrong');
      feedback.textContent = check.status === 'correct' ? 'Correct value and significant figures! Now check every ICE cell.' : check.status === 'sigfig' ? `Numerical value is right, but write ${check.targetText} to ${p.finalSigFigs} significant figures.` : check.status === 'invalid' ? 'Enter a number first.' : 'Not yet. Recheck the equilibrium row and the Kₑq expression.';
      feedback.style.color = check.status === 'correct' ? '#2d8668' : check.status === 'sigfig' ? '#94611c' : '#b36952';
      renderSelector();
    });
    document.querySelectorAll('[data-expression]').forEach(button => button.addEventListener('click', () => {
      progress.expressions[p.id] = Number(button.dataset.expression);
      saveProgress();
      document.querySelectorAll('[data-expression]').forEach(option => {
        const selected = option === button;
        option.classList.toggle('selected',selected);
        option.classList.toggle('correct',selected && progress.expressions[p.id] === p.expressionCorrect);
        option.classList.toggle('wrong',selected && progress.expressions[p.id] !== p.expressionCorrect);
      });
      document.getElementById('ice-expression-feedback').textContent = progress.expressions[p.id] === p.expressionCorrect ? 'Correct expression.' : 'Check which species are products and whether a coefficient becomes an exponent.';
    }));
    document.getElementById('ice-show-solution').addEventListener('click', () => {
      const solution = document.getElementById('ice-solution');
      solution.classList.toggle('hidden');
      document.getElementById('ice-show-solution').textContent = solution.classList.contains('hidden') ? 'Show worked solution' : 'Hide worked solution';
    });
    document.getElementById('ice-reset-problem').addEventListener('click', () => {
      if (!confirm('Clear your entries for this ICE example?')) return;
      delete progress.answers[p.id];
      delete progress.expressions[p.id];
      delete progress.checked[p.id];
      delete progress.finalChecked[p.id];
      saveProgress();
      renderInteractiveICE();
    });
  }

  window.renderInteractiveICE = renderInteractiveICE;
  renderInteractiveICE();
})();
