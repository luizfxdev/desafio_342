# 🌌🌹 Sussurros no Silêncio Azul: O Poema Inesquecível

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/Status-Concluído-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

## 📖 Sobre o Desafio

**Sussurros no Silêncio Azul: O Poema Inesquecível 🌌🌹**

Em um mundo onde o silêncio é preenchido apenas pelo sutil brilho de uma rosa azul, toda poesia tem o poder de ecoar eternamente — desde que cada palavra seja única, leve e verdadeira. No entanto, ecos indesejados podem quebrar a magia de cada verso, tornando o silêncio menos azul e mais barulhento.

### 🎯 Missão

Criar um código em JavaScript que purifique poesias, tornando-as etéreas como a névoa azul:

* **Remover todas as palavras repetidas** de um poema, mantendo apenas a primeira aparição de cada palavra e respeitando a delicada ordem original dos versos;
* **Contar e mostrar** quantas vezes cada palavra exata foi repetida, permitindo que o poeta saiba onde ecoaram demais seus sentimentos.

### ⚠️ Regras Importantes

- Apenas palavras **idênticas** devem ser removidas; não corte palavras similares (ex: "rosa" ≠ "rosada")
- Ignore maiúsculas/minúsculas para contagem
- Permita que o script funcione com poesias longas
- Preserve a sensibilidade e o ritmo do texto

### 📜 Exemplo

**Entrada:**
```
Silêncio azul, silêncio tão profundo, azul eterno, silêncio azul
```

**Saída esperada:**
- **Poesia sem repetições:** "Silêncio azul, tão profundo, eterno,"
- **Palavras repetidas e suas quantidades:**
  - silêncio: 3
  - azul: 3
  - tão: 1
  - profundo: 1
  - eterno: 1

---

## 🚀 Como Usar em Projetos Reais

Este desafio pode ser adaptado para diversos casos de uso práticos:

### 1. **Sistemas de Detecção de Plágio**
Identifique padrões de repetição excessiva em textos acadêmicos ou artigos.

### 2. **Ferramentas de SEO**
Analise densidade de palavras-chave em conteúdos para otimização de busca.

### 3. **Editores de Texto Inteligentes**
Sugira melhorias em textos identificando redundâncias.

### 4. **Análise de Sentimentos**
Conte frequência de palavras específicas para análise emocional de textos.

### 5. **Processamento de Logs**
Remova entradas duplicadas em sistemas de monitoramento.

---

## 🔧 Função Principal

A função do desafio é `processPoem()`, que realiza todo o processamento do texto:

```javascript
function processPoem(poemText) {
    if (!poemText.trim()) {
        return {
            error: true,
            message: 'Por favor, insira um poema para processar.'
        };
    }

    // Passo 1: Extrair palavras (removendo pontuações)
    const wordsWithPunctuation = poemText.split(/\s+/);
    const words = wordsWithPunctuation.map(word => 
        word.replace(/[.,;:!?"""''()[\]{}—–-]/g, '')
    ).filter(word => word.length > 0);

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
```

---

## 🧠 Lógica Técnica da Solução

### **Arquitetura do Algoritmo**

A solução implementa um pipeline de processamento de texto em 4 etapas principais:

#### **1. Tokenização e Limpeza**
```javascript
const wordsWithPunctuation = poemText.split(/\s+/);
const words = wordsWithPunctuation.map(word => 
    word.replace(/[.,;:!?"""''()[\]{}—–-]/g, '')
).filter(word => word.length > 0);
```

- **Split por regex `/\s+/`**: Separa o texto por qualquer quantidade de espaços em branco
- **Remoção de pontuação**: Utiliza regex para eliminar caracteres especiais, mantendo apenas letras
- **Filtragem de vazios**: Remove strings vazias resultantes da limpeza

**Complexidade**: O(n), onde n é o número de caracteres

#### **2. Contagem de Frequência (Hash Table)**
```javascript
const wordCount = {};
words.forEach(word => {
    const lowerWord = word.toLowerCase();
    wordCount[lowerWord] = (wordCount[lowerWord] || 0) + 1;
});
```

- **Estrutura de dados**: Hash table (objeto JavaScript) para armazenamento O(1)
- **Normalização case-insensitive**: `toLowerCase()` garante que "Azul" e "azul" sejam contadas juntas
- **Acumulação**: Operador `||` para inicialização implícita

**Complexidade**: O(n), onde n é o número de palavras

#### **3. Deduplicação com Preservação de Ordem**
```javascript
const uniqueWords = [];
const seenWords = new Set();

words.forEach(word => {
    const lowerWord = word.toLowerCase();
    if (!seenWords.has(lowerWord)) {
        uniqueWords.push(word);
        seenWords.add(lowerWord);
    }
});
```

- **Set para tracking**: Estrutura O(1) para verificação de existência
- **Array para ordem**: Mantém a sequência original de aparição
- **Case preservation**: Armazena a palavra original, mas verifica com lowercase

**Complexidade**: O(n) com espaço adicional O(u), onde u é o número de palavras únicas

#### **4. Reconstrução do Texto**
```javascript
let cleanPoem = uniqueWords.join(' ');
```

- **Join simples**: Concatena palavras únicas com espaço
- **Preservação de capitalização**: Mantém a primeira ocorrência com sua capitalização original

**Complexidade**: O(u), onde u é o número de palavras únicas

### **Análise de Complexidade Total**

- **Tempo**: O(n) - linear em relação ao número de palavras
- **Espaço**: O(n) - no pior caso, todas as palavras são únicas

### **Vantagens da Abordagem**

1. **Eficiência**: Usa Set para busca O(1) em vez de Array.includes() que seria O(n)
2. **Imutabilidade**: Não modifica o array original
3. **Case-insensitive inteligente**: Conta "Azul" e "azul" como mesma palavra, mas preserva a capitalização original
4. **Escalabilidade**: Funciona eficientemente mesmo com textos longos

### **Trade-offs**

- **Memória vs Performance**: Utiliza estruturas adicionais (Set, objetos) para ganho de velocidade
- **Pontuação**: Remove completamente ao invés de tratar separadamente, simplificando a lógica mas perdendo alguma informação estrutural

---

## 🎨 Recursos Visuais

- ✨ Design moderno com tema azul etéreo
- 🎬 Background em vídeo full HD (3840x2160)
- 🎵 Áudio ambiente integrado
- 📱 Totalmente responsivo
- 🎭 Animações suaves e elegantes
- 📊 Visualização detalhada do processo de análise

---

## 📁 Estrutura do Projeto

```
projeto/
├── index.html          # Estrutura HTML
├── styles.css          # Estilos e animações
├── script.js           # Lógica de processamento
└── assets/
    ├── background.mp4  # Vídeo de fundo
    └── theme.mp3       # Áudio ambiente
```

---

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Animações, Grid, Flexbox, Backdrop Filter
- **JavaScript ES6+**: Set, Map, Arrow Functions, Template Literals
- **Regex**: Processamento de texto

---

## 📦 Como Executar

1. Clone o repositório
```bash
git clone https://github.com/luizfxdev/desafio_342.git
```

2. Adicione os arquivos de mídia na pasta `assets/`
   - `background.mp4`
   - `theme.mp3`

3. Abra `index.html` no navegador

---

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

## 👨‍💻 Autor

**Luiz Felipe de Oliveira**

- GitHub: [@luizfxdev](https://github.com/luizfxdev)
- Linkedin: [in/luizfxdev](https://www.linkedin.com/in/luizfxdev)
- Portfólio: [luizfxdev.com.br](https://luizfxdev.com.br)

---

**⭐ Se este projeto foi útil, considere dar uma estrela!**

*Transporte-se para o silêncio azul e torne-se o guardião das palavras que jamais se repetem no infinito.* 🌌🌹
