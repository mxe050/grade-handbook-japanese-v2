const fs = require('fs');
const path = 'c:\\Users\\yuasa\\.gemini\\antigravity\\scratch\\grade-handbook-japanese-v2\\index.html';

let content = fs.readFileSync(path, 'utf8');

/**
 * Replaces the content of a specific tab (tabIndex) inside a specific page (pageId).
 * tabIndex 0: GRADE Book (usually skip)
 * tabIndex 1: CoreGrade解説
 * tabIndex 2: CoreGRADEフローチャート
 */
function replaceTabContent(pageId, tabIndex, newContent) {
    const pageRegex = new RegExp(`(<div class="page" id="${pageId}">[\\s\\S]*?<div class="tab-content">)([\\s\\S]*?)(</div>[\\s\\S]*?<div class="page-nav">)`, 'i');
    const match = content.match(pageRegex);
    
    if (match) {
        let tabContentHtml = match[2];
        // Find all tab-pane divs within this tab-content
        const tabPaneRegex = /<div class="tab-pane[\s\S]*?">([\s\S]*?)<\/div>/gi;
        let tabPanes = [];
        let m;
        while ((m = tabPaneRegex.exec(tabContentHtml)) !== null) {
            tabPanes.push({
                full: m[0],
                inner: m[1],
                index: m.index
            });
        }
        
        if (tabPanes[tabIndex]) {
            const oldTabPane = tabPanes[tabIndex].full;
            // Preserve the class (handle "active" if it exists)
            const isActive = oldTabPane.includes('active') ? ' active' : '';
            const newTabPane = `<div class="tab-pane${isActive}">\n${newContent}\n          </div>`;
            
            const newTabContentHtml = tabContentHtml.substring(0, tabPanes[tabIndex].index) +
                                    newTabPane +
                                    tabContentHtml.substring(tabPanes[tabIndex].index + oldTabPane.length);
                                    
            content = content.replace(match[0], match[1] + newTabContentHtml + match[3]);
            return true;
        }
    }
    return false;
}

// --- Chapter 7 Content ---
const ch7_tab1 = `            <div class="card">
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
              <p>バイアス・リスクは二元論ではなくグラデーションです。図中の閾値（Threshold）を超えた場合に確実性を1段階（Rate down）下げます。</p>

              <hr class="section-divider">

              <h3>3. ROBUST-RCTの詳細解説</h3>
              <p>ROBUST-RCTは、シンプルさと方法論的な厳密さのバランスを目指して開発された新しいツールです。最大の特長は、各評価項目について明確な2段階のステップを踏むことです。</p>
              <ul>
                <li><strong>Step 1 (事実の確認):</strong> 「何が起きたか？」（例：割付順序は適切に生成されたか）</li>
                <li><strong>Step 2 (リスクの判断):</strong> 「それがバイアスを生んでいるか？」（アウトカムの性質上、影響があるか）</li>
              </ul>
              <p>この2ステップにより、例えば実施に不備があったとしても、アウトカムが客観的（全死亡など）であればバイアスには繋がらないという、より柔軟かつ論理的な判断が可能になります。</p>
            </div>`;

const ch7_tab2 = `            <div class="card flow-chart-card">
              <h2>Core GRADE Fig 2: エビデンス全体の確実性ダウングレード決定フロー</h2>
              <p>メタアナリシス（統合されたエビデンス全体）に対して、「バイアスリスクを理由に確実性をダウングレードするかどうか」を決定する決定木です。</p>
              
              <div class="figure">
                <img src="coreGRADE/images/4-2.jpg" alt="レーティングダウンの判断アルゴリズム" loading="lazy">
                <p class="caption">図4-2：確実性ダウングレード判断フローチャート</p>
              </div>

              <div class="card-content">
                <h3>主要な判断プロセス：</h3>
                <ol>
                  <li><strong>支配性（Dominated）の確認:</strong> メタ解析の重みの大部分（>65%等）が高バイアスリスク研究で占められているか。</li>
                  <li><strong>バイアスの方向性（Direction of Bias）の推測:</strong> バイアスが結果を過大評価しているか、それとも「保守的（効果を低く見積もる）」方向に働いているか。</li>
                </ol>
                <p>バイアスが保守的な方向に働いている場合、現在の「効果がある」という結論は真実（さらに強い効果）を覆さないため、確実性を下げない（Do not rate down）という論理的な判断が Core GRADE では強調されています。</p>
              </div>
            </div>`;

// --- Chapter 8 Content ---
const ch8_tab1 = `            <div class="card">
              <h2>非一貫性（Inconsistency）の評価：意思決定の閾値を考慮したアプローチ</h2>
              <p>BMJ 2025;389:e081905 の論文に基づき、研究間の結果のばらつきをどのように評価すべきか解説します。</p>
              
              <div class="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-8">
                <h3 class="text-blue-900 mt-0">非一貫性とは？</h3>
                <p>システマティックレビューにおいて、組み込まれた複数の研究間で「効果の推定値」に説明のつかない大きなばらつきがある状態を指します。GRADEアプローチでは、深刻な非一貫性がある場合、エビデンスの確実性をレートダウンします。</p>
              </div>

              <h3>1. 相対リスクと絶対リスク：ベースラインの影響</h3>
              <div class="figure">
                <img src="coreGRADE/images/3-1.jpg" alt="ベースラインリスクの影響" loading="lazy">
                <p class="caption">図3-1: ベースラインリスクによる絶対的効果の違い</p>
              </div>
              <p>相対リスク（RR）が一定であっても、ベースラインリスクが異なれば、実際に減らせるイベントの割合（絶対リスク差）は全く異なります。意思決定においては「絶対的効果」が重要です。</p>

              <hr class="section-divider">

              <h3>2. 一貫性のある結果 vs 非一貫な結果</h3>
              <div class="figure">
                <img src="coreGRADE/images/3-3.jpg" alt="フォレストプロット比較" loading="lazy">
                <p class="caption">図3-3: 視覚的な非一貫性の評価例（上段：一貫、下段：非一貫）</p>
              </div>
              <p>点推定値（ひし形）が近く、信頼区間（横線）が重なり合っていれば一貫しています。ばらつきが大きく信頼区間の重なりが少ない場合、異質性が高いと判断されます。</p>

              <hr class="section-divider">

              <h3>3. 極度に高い異質性への対応</h3>
              <div class="figure">
                <img src="coreGRADE/images/3-4.jpg" alt="高い異質性の実例" loading="lazy">
                <p class="caption">図3-4: 統計的異質性 (I²) が極めて高い例</p>
              </div>
              <p>I²統計量が非常に高い場合（例：>90%）、そのまま統合するのではなく、なぜこれほど違いが生じたのか（PICOの違い、バイアスリスク等）をサブグループ分析で探求することが不可欠です。</p>
            </div>`;

const ch8_tab2 = `            <div class="card flow-chart-card">
              <h2>Core GRADE 非一貫性評価フローチャート (Fig 2)</h2>
              <p>最新の Core GRADE では、統計的指標（I²）に依存しすぎず、臨床的な「意思決定の閾値（Threshold）」を基準とした判断を重視します。</p>
              
              <div class="figure">
                <img src="coreGRADE/images/3-2.jpg" alt="非一貫性評価のフローチャート" loading="lazy">
                <p class="caption">図3-2: 非一貫性を評価するためのフローチャート</p>
              </div>

              <div class="calculator-card bg-indigo-50 border border-indigo-200 p-6 rounded-2xl mb-8">
                <h3 class="flex items-center gap-2 text-indigo-900 mt-0">
                  <span>🧮</span> 相対リスク(RR)の閾値計算ツール
                </h3>
                <p class="text-sm text-indigo-800/80 mb-6">絶対リスクの「最小重要差（MID）」を相対リスク（RR）の閾値に変換して評価します。</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label class="block text-xs font-bold text-indigo-900 mb-1">絶対MID (%)</label>
                    <input type="number" id="abs-mid" class="w-full border border-indigo-200 rounded-lg px-3 py-2 text-sm" placeholder="例: 1" step="0.1">
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-indigo-900 mb-1">ベースラインリスク (%)</label>
                    <input type="number" id="base-risk" class="w-full border border-indigo-200 rounded-lg px-3 py-2 text-sm" placeholder="例: 7" step="0.1">
                  </div>
                </div>
                <button onclick="calculateRR()" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md">
                  RR閾値を計算する
                </button>
                <div id="calc-result" class="hidden mt-6 bg-white border border-indigo-200 p-4 rounded-xl text-sm leading-relaxed text-indigo-900 shadow-sm animate-in fade-in slide-in-from-top-2">
                </div>
              </div>

              <div class="card-content">
                <h3>評価の主要ステップ：</h3>
                <ol>
                  <li><strong>視覚的確認:</strong> 信頼区間の重なりが十分か？</li>
                  <li><strong>閾値評価:</strong> 各研究の点推定値が、意思決定の境界線（閾値）をまたいでいるか？</li>
                  <li><strong>サブグループ解析:</strong> ばらつきが「信用できるサブグループ」で説明可能か？</li>
                </ol>
              </div>
            </div>`;

// --- Apply Replacements ---

// Chapter 7
replaceTabContent('page-7', 1, ch7_tab1);
replaceTabContent('page-7', 2, ch7_tab2);

// Chapter 8
// Change Chapter 8 Title
content = content.replace(/(<div class="page" id="page-8">[\s\S]*?<h1>)(不一致性（Inconsistency）)(<\/h1>)/i, '$1非一貫性（Inconsistency）$3');
replaceTabContent('page-8', 1, ch8_tab1);
replaceTabContent('page-8', 2, ch8_tab2);

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully integrated content for Chapter 7 and 8.');
