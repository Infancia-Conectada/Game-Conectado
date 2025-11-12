CREATE SCHEMA icomon;
USE icomon;

-- PERFIL DO USUÁRIO
CREATE TABLE IF NOT EXISTS perfil_usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    apelido VARCHAR(200) NOT NULL default 'Pequeno Gafanhoto',
    moedas INT NOT NULL,
    qtd_batalhas INT NOT NULL,
    qtd_vitorias INT NOT NULL,
    img_avatar VARCHAR(255) NOT NULL
);

-- TODAS AS CARTAS CADASTRADAS
CREATE TABLE IF NOT EXISTS todas_cartas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    tipo ENUM('monstro', 'item') NOT NULL,
    raridade ENUM('comum', 'incomum', 'raro') NOT NULL,
    -- valor (moedas) int
    -- nivel (poder) int
    elemento VARCHAR(50) NOT NULL,
    img_url VARCHAR(255) NOT NULL,
    ico_url VARCHAR(255) NOT NULL
);

-- TODOS OS CENARIOS CADASTRADOS
CREATE TABLE IF NOT EXISTS deck_cenarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    elemento1 VARCHAR(50) NOT NULL,
    elemento2 VARCHAR(50),
    img_url VARCHAR(255) NOT NULL
);

-- INVENTARIO INDIVIDUAL (TOTAL DE 100 CARTAS)
CREATE TABLE IF NOT EXISTS inventarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_carta INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES perfil_usuario(id),
    FOREIGN KEY (id_carta) REFERENCES todas_cartas(id)
);

-- ESCOLHA DO DECK (1 A 3)
CREATE TABLE IF NOT EXISTS decks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_inventario INT NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT false,
    FOREIGN KEY (id_inventario) REFERENCES inventarios(id)
);

-- DECK INDIVIDUAL (20 CARTAS)
CREATE TABLE IF NOT EXISTS decks_individuais (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_carta INT NOT NULL,
    id_deck INT NOT NULL,
    FOREIGN KEY (id_carta) REFERENCES todas_cartas(id),
    FOREIGN KEY (id_deck) REFERENCES decks(id)
);

-- Inserção dos dados na tabela deck_cenario
INSERT INTO deck_cenarios (nome, elemento1, elemento2, img_url) VALUES
("Ilha", "agua", null, "img/cenarios/1_AGA.png"),
("Deserto Estático", "eletricidade", null, "img/cenarios/1_ELT.png"),
("Vale Vulcânico", "fogo", null, "img/cenarios/1_FGO.png"),
("Floresta", "terra", null, "img/cenarios/1_TER.png"),
("Pântano", "agua", "terra", "img/cenarios/2-AGA+TER.png"),
("Cerrado Vulcânico", "eletricidade", "fogo", "img/cenarios/2-FGO+ELT.png"),
("Neblina", "neutro", null, "img/cenarios/2-NEBLINA.png");

-- Inserção dos monstros na tabela todas_cartas
INSERT INTO todas_cartas (nome, tipo, raridade, elemento, valor, nivel, img_url, ico_url) VALUES
-- Monstros de Água


-- valor = todos 0
-- nivel (mnstros) comum = 2, incomum = 4, raro = 6.
-- nivel (item) comum = 1, raro = 3
("Aquavor", "monstro", 'comum', "agua", "img/monstros/aga-1-Aquavor.png", "img/icones/aga-1-Aquavor.png"),
("Tydrill", "monstro", 'comum', "agua", "img/monstros/aga-1-Tydrill.png", "img/icones/aga-1-Tydrill.png"),
("Hidralisk", "monstro", 'incomum', "agua", "img/monstros/aga-2-Hidralisk.png", "img/icones/aga-2-Hidralisk.png"),
("Rainscour", "monstro", 'incomum', "agua", "img/monstros/aga-2-Rainscour.png", "img/icones/aga-2-Rainscour.png"),
("Ocearion", "monstro", 'raro', "agua", "img/monstros/aga-3-Ocearion.png", "img/icones/aga-3-Ocearion.png"),

-- Monstros de Eletricidade
("Thundril", "monstro", 'comum', "eletricidade", "img/monstros/elt-1-Thundril.png", "img/icones/elt-1-Thundril.png"),
("Voltrik", "monstro", 'comum', "eletricidade", "img/monstros/elt-1-Voltrik.png", "img/icones/elt-1-Voltrik.png"),
("Joltriss", "monstro", 'incomum', "eletricidade", "img/monstros/elt-2-Joltriss.png", "img/icones/elt-2-Joltriss.png"),
("Sparkon", "monstro", 'incomum', "eletricidade", "img/monstros/elt-2-Sparkon.png", "img/icones/elt-2-Sparkon.png"),
("Zaptron", "monstro", 'raro', "eletricidade", "img/monstros/elt-3-Zaptron.png", "img/icones/elt-3-Zaptron.png"),

-- Monstros de Fogo
("Ashgrim", "monstro", 'comum', "fogo", "img/monstros/fgo-1-Ashgrim.png", "img/icones/fgo-1-Ashgrim.png"),
("Volkris", "monstro", 'comum', "fogo", "img/monstros/fgo-1-Volkris.png", "img/icones/fgo-1-Volkris.png"),
("Pyrrak", "monstro", 'incomum', "fogo", "img/monstros/fgo-2-Pyrrak.png", "img/icones/fgo-2-Pyrrak.png"),
("Flarehorn", "monstro", 'raro', "fogo", "img/monstros/fgo-2-Flarehorn.png", "img/icones/fgo-2-Flarehorn.png"),
("Scaldrix", "monstro", 'raro', "fogo", "img/monstros/fgo-3-Scaldrix.png", "img/icones/fgo-3-Scaldrix.png"),

-- Monstros de Terra
("Mudrak", "monstro", 'comum', "terra", "img/monstros/ter-1-Mudrak.png", "img/icones/ter-1-Mudrak.png"),
("Oritur", "monstro", 'comum', "terra", "img/monstros/ter-1-Oritur.png", "img/icones/ter-1-Oritur.png"),
("Crustorr", "monstro", 'incomum', "terra", "img/monstros/ter-2-Crustorr.png", "img/icones/ter-2-Crustorr.png"),
("Terradom", "monstro", 'incomum', "terra", "img/monstros/ter-2-Terradom.png", "img/icones/ter-2-Terradom.png"),
("Quakmor", "monstro", 'raro', "terra", "img/monstros/ter-3-Quakmor.png", "img/icones/ter-3-Quakmor.png"),

-- Itens de Dano e Vida - Água
("Ico Suplemento Azul nível 1", "item", 'comum', "agua", "img/itens/aga-dano+1.png", "img/icones/aga-D1.png"),
("Ico Suplemento Azul nível 2", "item", 'raro', "agua", "img/itens/aga-dano+2.png", "img/icones/aga-D2.png"),
("Ico-Esfera de Proteção Azul nível 1", "item", 'comum', "agua", "img/itens/aga-vida+1.png", "img/icones/aga-V1.png"),
("Ico-Esfera de Proteção Azul nível 2", "item", 'raro', "agua", "img/itens/aga-vida+2.png", "img/icones/aga-V2.png"),

-- Itens de Dano e Vida - Eletricidade
("Ico Suplemento Amarelo nível 1", "item", 'comum', "eletricidade", "img/itens/elt-dano+1.png", "img/icones/elt-D1.png"),
("Ico Suplemento Amarelo nível 2", "item", 'raro', "eletricidade", "img/itens/elt-dano+2.png", "img/icones/elt-D2.png"),
("Ico-Esfera de Proteção Amarela  nível 1", "item", 'comum', "eletricidade", "img/itens/elt-vida+1.png", "img/icones/elt-V1.png"),
("Ico-Esfera de Proteção Amarela nível 2", "item", 'raro', "eletricidade", "img/itens/elt-vida+2.png", "img/icones/elt-V2.png"),

-- Itens de Dano e Vida - Fogo
("Ico Suplemento Vermelho nível 1", "item", 'comum', "fogo", "img/itens/fgo-dano+1.png", "img/icones/fgo-D1.png"),
("Ico Suplemento Vermelho nível 2", "item", 'raro', "fogo", "img/itens/fgo-dano+2.png", "img/icones/fgo-D2.png"),
("Ico-Esfera de Proteção Vermelha nível 1", "item", 'comum', "fogo", "img/itens/fgo-vida+1.png", "img/icones/fgo-V1.png"),
("Ico-Esfera de Proteção Vermelha nível 2", "item", 'raro', "fogo", "img/itens/fgo-vida+2.png", "img/icones/fgo-V2.png"),

-- Itens de Dano e Vida - Terra
("Ico Suplemento Verde nível 1", "item", 'comum', "terra", "img/itens/ter-dano+1.png", "img/icones/ter-D1.png"),
("Ico Suplemento Verde nível 2", "item", 'raro', "terra", "img/itens/ter-dano+2.png", "img/icones/ter-D2.png"),
("Ico-Esfera de Proteção Verde nível 1", "item", 'comum', "terra", "img/itens/ter-vida+1.png", "img/icones/ter-V1.png"),
("Ico-Esfera de Proteção Verde nível 2", "item", 'raro', "terra", "img/itens/ter-vida+2.png", "img/icones/ter-V2.png");

-- usuario fake para teste
INSERT INTO perfil_usuario (moedas, qtd_batalhas, qtd_vitorias, img_avatar) VALUES
(0, 0, 0, "img/icones/aga-1-Aquavor.png");

-- Inserção do inventário default
INSERT INTO inventarios (id_usuario, id_carta) VALUES
(1, 1),
(1, 2),
(1, 6),
(1, 7),
(1, 11),
(1, 12),
(1, 16),
(1, 17),
(1, 21),
(1, 23),
(1, 25),
(1, 27),
(1, 29),
(1, 31),
(1, 33),
(1, 35),
(1, 1),
(1, 6),
(1, 11),
(1, 16);

INSERT INTO decks (id_inventario, ativo) VALUES
(1, true);

INSERT INTO decks_individuais (id_carta, id_deck) VALUES
(1, 1),
(2, 1),
(6, 1),
(7, 1),
(11, 1),
(12, 1),
(16, 1),
(17, 1),
(21, 1),
(23, 1),
(25, 1),
(27, 1),
(29, 1),
(31, 1),
(33, 1),
(35, 1),
(1, 1),
(6, 1),
(11, 1),
(16, 1);

INSERT INTO decks (id_inventario, ativo) VALUES
(1, true);

INSERT INTO decks_individuais (id_carta, id_deck) VALUES
(1, 2),
(2, 2),
(6, 2),
(7, 2),
(11, 2),
(12, 2),
(16, 2),
(17, 2),
(21, 2),
(23, 2),
(25, 2),
(27, 2),
(29, 2),
(31, 2),
(33, 2),
(35, 2),
(1, 2),
(6, 2),
(11, 2),
(16, 2);