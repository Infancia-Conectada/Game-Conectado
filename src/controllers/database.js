const mysql = require('mysql2/promise');

const conexao = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "icomon"
});

module.exports = conexao;

/* 
LISTA TOTAL DE CARTAS CADASTADAS (MONSTROS E ITENS)
all_cards (nome, tipo, raridade, elemento, img_url, ico_url)
perdemos os scripts mas eis o prompt:
Claudinho, preciso que voce povoe a tabela all_cards do nosso banco. Gere o script que usarei no workbench. estou usando mysql.
quero que acesse a pasta img/monstros. Faça na ordem alfabetica. todas as imagens ali, sao assim: 3 primeiras letras define o elemento (aga = agua, elt = eletricidade, fgo = fogo, ter = terra), depois vem -x-, onde x é um numero de 1 a 3, essa é a raridade, onde 1 = comum, 2 = incomum e 3 = raro. depois vem o nome da criatura. exemplo, aga-1-aquavor.png, o nome é aquavor e o elemento é agua. a tabela possui as seguintes colunas: id, nome, tipo (todas as cartas da pasta monstro sao do tipo "monstro"), raridade, elemento, img_url (coloque a url da imagem) e ico_url (pasta img/icones). terminando, adicione os itens da pasta (img/itens). O nome você coloca: dano1: "Ico Suplemento XXX", dano2: "Ico Suplemento XXX nível 2", vida1: "Ico-Esfera de Proteção XXX" e vida2: "Ico-Esfera de Proteção XXX nível 2", onde o XXX é o elemento (AGA = Azul, ELT = Amarelo, FGO = Vermelho, TER = Verde). exemplo: aga-dano+2 = Ico Suplemento Azul nível 2. Na pasta icones, os icones D1, D2, V1 e V2 sao respectivamente os itens dano1, dano2, vida1 e vida2

LISTA TOTAL DE CARTAS DE CENARIO
deck_cenario (nome, elemento1, elemento2, img_url)
SCRIPT:
INSERT INTO deck_cenario (nome, elemento1, elemento2, img_url) VALUES
("Ilha", "agua", null, "img/cenarios/1_AGA.png"),
("Deserto Estático", "eletricidade", null, "img/cenarios/1_ELT.png"),
("Vale Vulcânico", "fogo", null, "img/cenarios/1_FGO.png"),
("Floresta", "terra", null, "img/cenarios/1_TER.png"),
("Pântano", "agua", "terra", "img/cenarios/2-AGA+TER.png"),
("Cerrado Vulcânico", "eletricidade", "fogo", "img/cenarios/2-FGO+ELT.png"),
("Neblina", "neutro", null, "img/cenarios/2-NEBLINA.png");

IVNENTARIO DEFAULT
INSERT INTO inventario (id_carta, quantidade) VALUES
(1, 1),
(2, 2),
(6, 2),
(7, 1),
(11, 2),
(12, 1),
(16, 2),
(17, 1),
(21, 1),
(23, 1),
(25, 1),
(27, 1),
(29, 1),
(31, 1),
(33, 1),
(35, 1);


*/