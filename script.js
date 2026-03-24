document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('mainContent');
  const overlay = document.getElementById('overlay');
  const progressFill = document.getElementById('progressFill');
  const scrollTop = document.createElement('button');

  // スクロールトップボタンの設定
  scrollTop.className = 'scroll-top';
  scrollTop.innerHTML = '↑';
  scrollTop.setAttribute('aria-label', 'トップへ戻る');
  document.body.appendChild(scrollTop);

  // モバイルメニュー制御
  const toggleMenu = () => {
    sidebar.classList.toggle('show');
    overlay.classList.toggle('show');
    document.body.style.overflow = sidebar.classList.contains('show') ? 'hidden' : '';
  };

  menuToggle.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);

  // ページ遷移ロジック
  const pages = document.querySelectorAll('.page');
  const tocBtns = document.querySelectorAll('.toc-btn');
  const prevBtns = document.querySelectorAll('.nav-prev');
  const nextBtns = document.querySelectorAll('.nav-next');

  function showPage(index) {
    pages.forEach((p, i) => {
      p.classList.toggle('active', i === index);
      if (tocBtns[i]) tocBtns[i].classList.toggle('active', i === index);
    });

    // プログレスバー更新
    const progress = ((index + 1) / pages.length) * 100;
    progressFill.style.width = `${progress}%`;

    // URLハッシュ更新（オプション）
    // history.replaceState(null, null, `#page-${index + 1}`);

    // スクロールをトップへ
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // モバイルメニューを閉じる
    if (sidebar.classList.contains('show')) toggleMenu();
  }

  // 目次ボタンイベント
  tocBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-idx'));
      showPage(idx);
    });
  });

  // 前へ・次へボタンイベント
  prevBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      const currentIdx = Array.from(pages).findIndex(p => p.classList.contains('active'));
      if (currentIdx > 0) showPage(currentIdx - 1);
    });
  });

  nextBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      const currentIdx = Array.from(pages).findIndex(p => p.classList.contains('active'));
      if (currentIdx < pages.length - 1) showPage(currentIdx + 1);
    });
  });

  // スクロールトップボタン表示制御
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTop.classList.add('show');
    } else {
      scrollTop.classList.remove('show');
    }
  });

  scrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 初期表示
  showPage(0);
});
