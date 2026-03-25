const fs = require('fs');
const path = 'c:\\Users\\yuasa\\.gemini\\antigravity\\scratch\\grade-handbook-japanese-v2\\index.html';

let html = fs.readFileSync(path, 'utf8');

function replacePlaceholder(pageId, tabIndex, newBody) {
    const pageIdStr = `id="${pageId}"`;
    const startIdx = html.indexOf(pageIdStr);
    if (startIdx === -1) return false;
    
    // Find the relevant placeholder-msg
    let currentIdx = startIdx;
    for (let i = 0; i <= tabIndex; i++) {
        currentIdx = html.indexOf('<div class="placeholder-msg">', currentIdx);
        if (currentIdx === -1) return false;
        if (i < tabIndex) {
            currentIdx = html.indexOf('</div>', currentIdx) + 6;
        }
    }
    
    const endIdx = html.indexOf('</div>', currentIdx) + 6;
    html = html.substring(0, currentIdx) + newBody + html.substring(endIdx);
    return true;
}

// Chapter 7
const ch7_tab1 = `            <div class="card">
              <h2>Risk of Bias（バイアス・リスク）解説</h2>
              <p>研究のデザイン、実施、あるいはデータの分析段階で生じる「真の効果からの系統的なズレ（誤差）」を評価します。</p>
              <div class="figure"><img src="coreGRADE/images/4-1.jpg" alt="4-1" loading="lazy"></div>
            </div>`;
replacePlaceholder('page-7', 0, ch7_tab1);

// Chapter 8
const ch8_tab1 = `            <div class="card">
              <h2>非一貫性（Inconsistency）の評価</h2>
              <div class="calculator-card" style="background:#f0f7ff; padding:20px; border-radius:12px; border:1px solid #cce3ff; margin-bottom:20px;">
                <h3>🧮 RR 閾値計算ツール</h3>
                <div style="display:flex; gap:10px; margin-bottom:10px;">
                  <input type="number" id="abs-mid" placeholder="絶対MID (%)" style="width:50%; padding:8px;">
                  <input type="number" id="base-risk" placeholder="ベースラインリスク (%)" style="width:50%; padding:8px;">
                </div>
                <button onclick="calculateRR()" style="width:100%; padding:10px; background:#2563eb; color:white; border:none; border-radius:6px; cursor:pointer;">計算</button>
                <div id="calc-result" style="margin-top:10px; display:none; background:white; padding:10px; border-radius:4px;"></div>
              </div>
              <div class="figure"><img src="coreGRADE/images/3-2.jpg" alt="3-2" loading="lazy"></div>
            </div>`;
html = html.replace('<h1>不一致性（Inconsistency）</h1>', '<h1>非一貫性（Inconsistency）</h1>');
replacePlaceholder('page-8', 0, ch8_tab1);

// Placeholder replacements for Ch9-13
const chapters = [
    {id: 'page-9', name: '非直接性'},
    {id: 'page-10', name: '不精確さ'},
    {id: 'page-11', name: '出版バイアス'},
    {id: 'page-12', name: '効果の大きさ'},
    {id: 'page-13', name: '用量反応勾配'}
];

chapters.forEach(ch => {
    const body = `            <div class="card">
              <h2>CoreGrade解説: ${ch.name}</h2>
              <p>このセクションの内容を順次統合しています。</p>
            </div>`;
    replacePlaceholder(ch.id, 0, body);
});

fs.writeFileSync(path, html, 'utf8');
console.log('All chapters processed.');
