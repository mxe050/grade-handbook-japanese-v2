const fs = require('fs');
const path = 'c:\\Users\\yuasa\\.gemini\\antigravity\\scratch\\grade-handbook-japanese-v2\\index.html';

let content = fs.readFileSync(path, 'utf8');

const tab1_content = `<div class="card">
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

const tab2_content = `<div class="card flow-chart-card">
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
                  <li><strong>バイアスの方向性（Direction of Bias）の推測:</strong> バイアスが結果を過大評価しているか、それとも「保守的（効果を低く見積もる）」方向に働いているか.</li>
                </ol>
                <p>バイアスが保守的な方向に働いている場合、現在の「効果がある」という結論は真実（さらに強い効果）を覆さないため、確実性を下げない（Do not rate down）という論理的な判断が Core GRADE では強調されています。</p>
              </div>
            </div>`;

// Use very loose regex to match only the FIRST occurrence of the specific header
const p1 = /<div class="placeholder-msg">[\s\S]*?CoreGrade解説[\s\S]*?<\/div>/;
const p2 = /<div class="placeholder-msg">[\s\S]*?CoreGRADEフローチャート[\s\S]*?<\/div>/;

if (p1.test(content) && p2.test(content)) {
    content = content.replace(p1, tab1_content);
    content = content.replace(p2, tab2_content);
    fs.writeFileSync(path, content, 'utf8');
    console.log('Successfully updated Chapter 7 placeholders.');
} else {
    console.error('Could not find placeholders in the file.');
}
