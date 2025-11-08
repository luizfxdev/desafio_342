// Elementos do DOM
const poemInput = document.getElementById('poem-input');
const revealBtn = document.getElementById('reveal-btn');
const returnBtn = document.getElementById('return-btn');
const resultSection = document.getElementById('result-section');
const resultContent = document.getElementById('result-content');
const bgAudio = document.getElementById('bg-audio');
const playAudioBtn = document.getElementById('play-audio');
const pauseAudioBtn = document.getElementById('pause-audio');

// Controles de Áudio
playAudioBtn.addEventListener('click', () => {
  bgAudio.play();
  playAudioBtn.style.background = 'rgba(74, 144, 226, 0.4)';
  pauseAudioBtn.style.background = 'rgba(15, 30, 60, 0.85)';
});

pauseAudioBtn.addEventListener('click', () => {
  bgAudio.pause();
  pauseAudioBtn.style.background = 'rgba(74, 144, 226, 0.4)';
  playAudioBtn.style.background = 'rgba(15, 30, 60, 0.85)';
});

// Função para processar o poema
function processPoem(poemText) {
  if (!poemText.trim()) {
    return {
      error: true,
      message: 'Por favor, insira um poema para processar.'
    };
  }

  // Passo 1: Extrair palavras (removendo pontuações)
  const wordsWithPunctuation = poemText.split(/\s+/);
  const words = wordsWithPunctuation
    .map(word => word.replace(/[.,;:!?"""''()[\]{}—–-]/g, ''))
    .filter(word => word.length > 0);

  // Passo 2: Contar ocorrências (case-insensitive)
  const wordCount = {};
  words.forEach(word => {
    const lowerWord = word.toLowerCase();
    wordCount[lowerWord] = (wordCount[lowerWord] || 0) + 1;
  });

  // Passo 3: Remover duplicatas mantendo a ordem
  const uniqueWords = [];
  const seenWords = new Set();

  words.forEach(word => {
    const lowerWord = word.toLowerCase();
    if (!seenWords.has(lowerWord)) {
      uniqueWords.push(word);
      seenWords.add(lowerWord);
    }
  });

  // Passo 4: Reconstruir o poema
  let cleanPoem = uniqueWords.join(' ');

  // Adicionar pontuação final se necessário
  if (poemText.trim().endsWith(',') || poemText.trim().endsWith('.')) {
    const lastChar = poemText.trim().slice(-1);
    cleanPoem += lastChar;
  }

  return {
    error: false,
    originalText: poemText,
    words: words,
    wordCount: wordCount,
    uniqueWords: uniqueWords,
    cleanPoem: cleanPoem,
    totalWords: words.length,
    uniqueCount: uniqueWords.length,
    removedCount: words.length - uniqueWords.length
  };
}

// Função para exibir o resultado com animação
function displayResult(result) {
  if (result.error) {
    resultContent.innerHTML = `
            <div class="result-step">
                <h3>⚠️ Atenção</h3>
                <p>${result.message}</p>
            </div>
        `;
    resultSection.classList.add('active');
    return;
  }

  // Ordenar palavras por contagem (decrescente)
  const sortedWords = Object.entries(result.wordCount).sort((a, b) => b[1] - a[1]);

  resultContent.innerHTML = `
        <div class="result-step">
            <h3>📖 Poema Original</h3>
            <p>Texto recebido para processamento:</p>
            <code>${result.originalText}</code>
            <p style="margin-top: 10px; color: #a8c8e8;">
                Total de palavras: <strong>${result.totalWords}</strong>
            </p>
        </div>

        <div class="result-step">
            <h3>🔍 Análise de Palavras</h3>
            <p>Palavras extraídas (sem pontuação):</p>
            <code>${result.words.join(', ')}</code>
        </div>

        <div class="result-step">
            <h3>📊 Contagem de Repetições</h3>
            <p>Cada palavra e quantas vezes apareceu no poema:</p>
            <div class="word-count-list">
                ${sortedWords
                  .map(
                    ([word, count]) => `
                    <div class="word-item">
                        <span class="word">${word}</span>
                        <span class="count">${count}x</span>
                    </div>
                `
                  )
                  .join('')}
            </div>
            <p style="margin-top: 10px; color: #a8c8e8;">
                Palavras únicas: <strong>${result.uniqueCount}</strong> | 
                Repetições removidas: <strong>${result.removedCount}</strong>
            </p>
        </div>

        <div class="result-step">
            <h3>✨ Processo de Purificação</h3>
            <p>Removendo palavras repetidas e mantendo apenas a primeira aparição de cada uma...</p>
            <code>${result.uniqueWords.join(', ')}</code>
        </div>

        <div class="final-result">
            <h3>🌌 Poesia Purificada - Silêncio Azul</h3>
            <p>"${result.cleanPoem}"</p>
        </div>
    `;

  resultSection.classList.add('active');

  // Scroll suave até o resultado
  setTimeout(() => {
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 300);
}

// Event Listeners dos Botões
revealBtn.addEventListener('click', () => {
  const poemText = poemInput.value;
  const result = processPoem(poemText);
  displayResult(result);
});

returnBtn.addEventListener('click', () => {
  // Limpar input e resultado com animação
  resultSection.classList.remove('active');

  setTimeout(() => {
    poemInput.value = '';
    resultContent.innerHTML = '';
    poemInput.focus();
  }, 300);
});

// Permitir Enter para revelar (opcional - apenas se não estiver usando Shift+Enter para nova linha)
poemInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.ctrlKey) {
    e.preventDefault();
    revealBtn.click();
  }
});
