const fs = require('fs');
const path = 'c:\\Users\\yuasa\\.gemini\\antigravity\\scratch\\grade-handbook-japanese-v2\\index.html';

let html = fs.readFileSync(path, 'utf8');

function replacePlaceholder(pageId, headerText, newBody) {
    const startIdx = html.indexOf(`id="${pageId}"`);
    if (startIdx === -1) return false;
    
    // Find the next placeholder after this point that contains headerText
    const placeholderStart = html.indexOf('<div class="placeholder-msg">', startIdx);
    if (placeholderStart === -1) return false;
    
    const placeholderEnd = html.indexOf('</div>', placeholderStart) + 6;
    const placeholderContent = html.substring(placeholderStart, placeholderEnd);
    
    if (placeholderContent.includes(headerText)) {
        html = html.substring(0, placeholderStart) + newBody + html.substring(placeholderEnd);
        return true;
    }
    return false;
}

const ch7_body = `            <div class="card">
              <h2>Risk of Bias（バイアス・リスク）とエビデンス全体の評価の徹底解説</h2>
              <p>指定されたBMJ論文および添付された図解（図4-1、図4-2）、そして新しい評価ツールである「ROBUST-RCT」の概念について解説します。</p>
              
              <h3>1. Risk of Bias（バイアス・リスク）の基本と種類</h3>
              <p><strong>バイアス（Bias）</strong>とは、研究のデザイン、実施、あるいはデータの分析段階で生じる「真の効果からの系統的なズレ（誤差）」を指します。偶然による誤差とは異なり、サンプルサイズを増やしても解消されません。</p>
              <div class="table-container">
                <table>
                  <thead><tr><th>バイアスの種類</th><th>説明</th></tr></thead>
                  <tbody>
                    <tr><td><strong>選択バイアス</strong></td><td>割付プロセスに問題がある場合に発生。割付の隠蔽が不十分な場合など。</td></tr>
                    <tr><td><strong>実行バイアス</strong></td><td>参加者や医療従事者が割付を知っている場合に発生。</td></tr>
                    <tr><td><strong>検出バイアス</strong></td><td>アウトカム評価者が割付を知っている場合に発生。主観的なアウトカムで顕著。</td></tr>
                    <tr><td><strong>減少バイアス</strong></td><td>脱落患者やプロトコル逸脱者の除外（ITT解析の原則違反）時に発生。</td></tr>
                    <tr><td><strong>報告バイアス</strong></td><td>有意な差が出た結果だけを選択的に報告する場合に発生。</td></tr>
                  </tbody>
                </table>
              </div>
              <hr class="section-divider">
              <h3>2. メタアナリシスにおけるエビデンス全体の評価</h3>
              <h4>図4-1：バイアス・リスクのスペクトラムと閾値（Threshold）</h4>
              <div class="figure">
                <img src="coreGRADE/images/4-1.jpg" alt="バイアス・リスクのスペクトラム" loading="lazy">
                <p class="caption">図4-1：Minimal（最小限）から Extremely serious（極めて深刻）までのスペクトラム</p>
              </div>
              <hr class="section-divider">
              <h3>3. ROBUST-RCTの詳細解説</h3>
              <p>ROBUST-RCTの最大の特長は、各評価項目について明確な2段階のステップを踏むことです。<b>Step 1 (事実の確認)</b> と <b>Step 2 (リスクの判断)</b> により、より論理的な判断が可能になります。</p>
            </div>`;

const ch8_body = `            <div class="card">
              <h2>非一貫性（Inconsistency）の評価：意思決定の閾値を考慮したアプローチ</h2>
              <p>最新の Core GRADE では、統計的指標（I²）に依存しすぎず、臨床的な「意思決定の閾値（Threshold）」を基準とした判断を重視します。</p>
              
              <div class="calculator-card bg-indigo-50 border border-indigo-200 p-6 rounded-2xl mb-8" style="background: #f0f7ff; border: 1px solid #cce3ff; padding: 20px; border-radius: 15px; margin-bottom: 20px;">
                <h3 style="margin-top: 0;">🧮 相対リスク(RR)の閾値計算ツール</h3>
                <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                  <div style="flex: 1;">
                    <label style="display: block; font-size: 12px;">絶対MID (%)</label>
                    <input type="number" id="abs-mid" style="width: 100%; padding: 5px;" placeholder="1">
                  </div>
                  <div style="flex: 1;">
                    <label style="display: block; font-size: 12px;">ベースラインリスク (%)</label>
                    <input type="number" id="base-risk" style="width: 100%; padding: 5px;" placeholder="7">
                  </div>
                </div>
                <button onclick="calculateRR()" style="width: 100%; padding: 10px; background: #2563eb; color: white; border: none; border-radius: 5px; cursor: pointer;">計算する</button>
                <div id="calc-result" style="margin-top: 15px; padding: 10px; background: white; border: 1px border #eee; border-radius: 5px; display: none;"></div>
              </div>

              <div class="figure">
                <img src="coreGRADE/images/3-2.jpg" alt="非一貫性評価のフローチャート" loading="lazy">
                <p class="caption">図3-2: 非一貫性を評価するためのフローチャート</p>
              </div>
            </div>`;

if (replacePlaceholder('page-7', 'CoreGrade解説', ch7_body)) {
    console.log('Ch7 Tab1 updated');
}
if (replacePlaceholder('page-8', 'CoreGrade解説', ch8_body)) {
    console.log('Ch8 Tab1 updated');
}

// Also rename Ch8 title
html = html.replace('<h1>不一致性（Inconsistency）</h1>', '<h1>非一貫性（Inconsistency）</h1>');

fs.writeFileSync(path, html, 'utf8');
console.log('Done.');
