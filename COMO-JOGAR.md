# Como Jogar - Game Conectado

## 🎮 Visão Geral

O jogo é um card game de batalha por turnos onde você enfrenta um oponente usando monstros e itens. O primeiro a fazer 3 pontos vence!

## 📋 Preparação

1. **Acesse o jogo**: Abra o navegador em `http://localhost:3000`
2. **Selecione um deck**: No menu, clique em "Jogar" e escolha um dos 3 decks disponíveis
3. **Confirme**: Clique no botão "Continuar" para iniciar

## 🎯 Regras do Jogo

### Estrutura
- **Deck do Jogador**: 20 cartas (monstros e itens)
- **Deck Central**: 14 cartas de cenário
- **Mão Inicial**: 5 cartas

### Turno
1. **Revelação do Cenário**: Uma carta de cenário é revelada no centro da mesa
2. **Seleção de Cartas**:
   - Selecione **1 monstro** (obrigatório)
   - Selecione **1 item** (opcional)
3. **Confirmação**: Clique em "Confirmar" quando estiver pronto
4. **Batalha**: As cartas são reveladas simultaneamente
5. **Resolução**:
   - Cada monstro recebe o dano do oponente
   - Se apenas 1 monstro sobreviver, seu jogador ganha 1 ponto
   - Se ambos morrem ou ambos sobrevivem: empate (ninguém pontua)
6. **Compra**: Cada jogador compra cartas até ter 5 novamente

## ⚔️ Sistema de Combate

### Atributos dos Monstros
- **Vida**: Pontos de vida do monstro
- **Dano**: Dano causado ao oponente
- **Elemento**: agua, fogo, terra, eletricidade

### Cálculo de Dano
O dano final é calculado assim:
```
Dano Final = Dano Base do Monstro + Bônus do Item + Bônus do Cenário + Vantagem Elemental
```

### Vantagens Elementares
- 💧 **Água** vence 🔥 **Fogo** (+2 de dano)
- 🔥 **Fogo** vence 🌱 **Terra** (+2 de dano)
- 🌱 **Terra** vence ⚡ **Eletricidade** (+2 de dano)
- ⚡ **Eletricidade** vence 💧 **Água** (+2 de dano)

### Cenários
Cada cenário fornece bônus para elementos específicos:
- **Ilha**: +2 Dano e +2 Vida para monstros de Água
- **Deserto Estático**: +2 Dano e +2 Vida para monstros de Eletricidade
- **Vale Vulcânico**: +2 Dano e +2 Vida para monstros de Fogo
- **Floresta**: +2 Dano e +2 Vida para monstros de Terra
- **Pântano**: +1 Dano e +1 Vida para Água e Terra
- **Cerrado Vulcânico**: +1 Dano e +1 Vida para Fogo e Eletricidade
- **Neblina**: Sem bônus

### Itens
- **Suplementos**: Aumentam o dano (+1 ou +2)
- **Esferas de Proteção**: Aumentam a vida (+1 ou +2)

## 🏆 Vitória

O jogo termina quando um jogador alcança **3 pontos**.

### Recompensas
- **Vitória**: 🪙 100 moedas
- **Derrota**: 🪙 50 moedas

## 🎲 Mecânicas Especiais

### Reembaralhar
- Se seu deck acabar, as cartas descartadas são reembaralhadas
- O mesmo vale para o deck de cenários

### Estratégias
1. **Observe o cenário**: Use monstros do mesmo elemento para ganhar bônus
2. **Vantagem elemental**: Escolha monstros com vantagem sobre o oponente
3. **Use itens sabiamente**: Podem fazer a diferença em batalhas equilibradas
4. **Gerencie sua mão**: Nem sempre precisa usar item se já está em vantagem

## 🎨 Interface

### Tela de Jogo
- **Topo**: Deck e descarte do oponente, avatar
- **Centro**: Cenário revelado, deck de cenários, descarte de cenários
- **Base**: Seu deck, seu descarte, sua mão (5 cartas)
- **Placar**: Estrelas indicando pontos (⭐)

### Controles
- **Clique na carta**: Selecionar/desselecionar
- **Botão Confirmar**: Executar jogada (aparece quando monstro selecionado)

## 🐛 Notas Técnicas

- O oponente atualmente usa IA simples (seleção aleatória)
- Todos os dados são carregados do banco de dados MySQL
- As animações são automáticas e indicam o fluxo do jogo

## 🚀 Próximos Passos

Funcionalidades futuras planejadas:
- Modo multiplayer online
- IA mais inteligente
- Mais cartas e cenários
- Sistema de amuletos
- Ranking e conquistas
- Loja de cartas

---

**Divirta-se jogando!** 🎮✨
