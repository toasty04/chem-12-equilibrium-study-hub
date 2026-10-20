(() => {
  function parseLinear(raw) {
    if (typeof raw !== 'string' || !raw.trim() || raw.length > 100) return null;
    const source = raw.trim().replace(/[−–—]/g, '-').replace(/[×·]/g, '*').replace(/\s*M\s*$/i, '');
    const tokens = [];
    for (let i = 0; i < source.length;) {
      if (/\s/.test(source[i])) { i++; continue; }
      const number = source.slice(i).match(/^(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?/i);
      if (number) { tokens.push({type:'number', value:Number(number[0])}); i += number[0].length; continue; }
      if (/[xX]/.test(source[i])) { tokens.push({type:'x'}); i++; continue; }
      if ('+-*/()'.includes(source[i])) { tokens.push({type:source[i]}); i++; continue; }
      return null;
    }
    const expanded = [];
    for (const token of tokens) {
      const previous = expanded[expanded.length-1];
      const endsTerm = previous && ['number','x',')'].includes(previous.type);
      const startsTerm = ['x','('].includes(token.type) || token.type === 'number' && previous && ['x',')'].includes(previous.type);
      if (endsTerm && startsTerm) expanded.push({type:'*'});
      expanded.push(token);
    }
    let pos = 0;
    const peek = () => expanded[pos]?.type;
    const add = (u,v,sign=1) => ({a:u.a+sign*v.a,b:u.b+sign*v.b,hasX:u.hasX||v.hasX});
    const multiply = (u,v) => {
      if (Math.abs(u.b)>1e-12 && Math.abs(v.b)>1e-12) throw Error('not linear');
      return {a:u.a*v.a,b:u.a*v.b+u.b*v.a,hasX:u.hasX||v.hasX};
    };
    const divide = (u,v) => {
      if (Math.abs(v.b)>1e-12 || Math.abs(v.a)<1e-12) throw Error('variable denominator');
      return {a:u.a/v.a,b:u.b/v.a,hasX:u.hasX||v.hasX};
    };
    function primary() {
      const token = expanded[pos++];
      if (!token) throw Error('missing term');
      if (token.type === 'number') return {a:token.value,b:0,hasX:false};
      if (token.type === 'x') return {a:0,b:1,hasX:true};
      if (token.type === '(') { const result = expression(); if (peek() !== ')') throw Error('missing parenthesis'); pos++; return result; }
      throw Error('unexpected term');
    }
    function unary() {
      if (peek() === '+') { pos++; return unary(); }
      if (peek() === '-') { pos++; const value=unary(); return {a:-value.a,b:-value.b,hasX:value.hasX}; }
      return primary();
    }
    function term() {
      let value=unary();
      while (peek() === '*' || peek() === '/') {
        const op=expanded[pos++].type, next=unary();
        value=op==='*'?multiply(value,next):divide(value,next);
      }
      return value;
    }
    function expression() {
      let value=term();
      while (peek() === '+' || peek() === '-') {
        const op=expanded[pos++].type;
        value=add(value,term(),op==='+'?1:-1);
      }
      return value;
    }
    try {
      const value=expression();
      return pos===expanded.length && Number.isFinite(value.a) && Number.isFinite(value.b) ? value : null;
    } catch { return null; }
  }

  function matchesCell(raw, problem, row, col) {
    const parsed=parseLinear(String(raw??''));
    if (!parsed) return false;
    const expected=problem.expected[row][col];
    if (!parsed.hasX) return Math.abs(parsed.a-expected)<=Math.max(.0001,Math.abs(expected)*.025);
    const extent=Math.min(...problem.expected[1].map(v=>Math.abs(v)).filter(v=>v>1e-10));
    if (!Number.isFinite(extent)) return false;
    const intercept=row===1?0:problem.expected[0][col];
    const coefficient=row===0?0:problem.expected[1][col]/extent;
    return Math.abs(parsed.a-intercept)<=Math.max(.0001,Math.abs(intercept)*.005)
      && Math.abs(parsed.b-coefficient)<=.001;
  }

  window.ICEInput={parseLinear,matchesCell};
})();
