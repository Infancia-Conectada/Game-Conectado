CREATE SCHEMA icomon;
use icomon;
 
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
    dano INT,
    vida INT,
    tipo VARCHAR(100) NOT NULL,
    raridade VARCHAR(100) NOT NULL,
    valor INT DEFAULT 0,
    nivel INT NOT NULL,
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
INSERT INTO todas_cartas (nome, tipo, dano, vida, raridade, elemento, nivel, img_url, ico_url) VALUES
-- Monstros de Água
("Aquavor", "monstro", 2, 2, 'comum', "agua", 2,"img/monstros/AGA-1-Aquavor.png", "img/icones/AGA-1-Aquavor.png"),
("Tydrill", "monstro", 3, 1, 'comum', "agua", 2,"img/monstros/AGA-1-Tydrill.png", "img/icones/AGA-1-Tydrill.png"),
("Hidralisk", "monstro", 4, 2, 'incomum', "agua", 4,"img/monstros/AGA-2-Hidralisk.png", "img/icones/AGA-2-Hidralisk.png"),
("Rainscour", "monstro", 3, 3, 'incomum', "agua", 4,"img/monstros/AGA-2-Rainscour.png", "img/icones/AGA-2-Rainscour.png"),
("Ocearion", "monstro", 4, 4, 'raro', "agua", 6,"img/monstros/AGA-3-Ocearion.png", "img/icones/AGA-3-Ocearion.png"),

-- Monstros de Eletricidade
("Thundril", "monstro", 1, 3, 'comum', "eletricidade", 2, "img/monstros/ELT-1-Thundril.png", "img/icones/ELT-1-Thundril.png"),
("Voltrik", "monstro", 2, 2, 'comum', "eletricidade", 2, "img/monstros/ELT-1-Voltrik.png", "img/icones/ELT-1-Voltrik.png"),
("Joltriss", "monstro", 3, 3, 'incomum', "eletricidade", 4, "img/monstros/ELT-2-Joltriss.png", "img/icones/ELT-2-Joltriss.png"),
("Sparkon", "monstro", 4, 2, 'incomum', "eletricidade", 4, "img/monstros/ELT-2-Sparkon.png", "img/icones/ELT-2-Sparkon.png"),
("Zaptron", "monstro", 5, 3, 'raro', "eletricidade", 6, "img/monstros/ELT-3-Zaptron.png", "img/icones/ELT-3-Zaptron.png"),

-- Monstros de Fogo
("Ashgrim", "monstro", 1, 3, 'comum', "fogo", 2, "img/monstros/FGO-1-Ashgrim.png", "img/icones/FGO-1-Ashgrim.png"),
("Volkris", "monstro", 2, 2, 'comum', "fogo", 2, "img/monstros/FGO-1-Volkris.png", "img/icones/FGO-1-Volkris.png"),
("Pyrrak", "monstro", 3, 3, 'incomum', "fogo", 4, "img/monstros/FGO-2-Pyrrak.png", "img/icones/FGO-2-Pyrrak.png"),
("Flarehorn", "monstro", 4, 4, 'raro', "fogo", 6, "img/monstros/FGO-3-Flarehorn.png", "img/icones/FGO-3-Flarehorn.png"),
("Scaldrix", "monstro", 5, 3, 'raro', "fogo", 6, "img/monstros/FGO-3-Scaldrix.png", "img/icones/FGO-3-Scaldrix.png"),

-- Monstros de Terra
("Mudrak", "monstro", 3, 1, 'comum', "terra", 2, "img/monstros/TER-1-Mudrak.png", "img/icones/TER-1-Mudrak.png"),
("Oritur", "monstro", 2, 2, 'comum', "terra", 2, "img/monstros/TER-1-Oritur.png", "img/icones/TER-1-Oritur.png"),
("Crustorr", "monstro", 3, 3, 'incomum', "terra", 4, "img/monstros/TER-2-Crustorr.png", "img/icones/TER-2-Crustorr.png"),
("Terradom", "monstro", 2, 4, 'incomum', "terra", 4, "img/monstros/TER-2-Terradom.png", "img/icones/TER-2-Terradom.png"),
("Quakmor", "monstro", 3, 5, 'raro', "terra", 6, "img/monstros/TER-3-Quakmor.png", "img/icones/TER-3-Quakmor.png"),

-- Itens de Dano e Vida - Água
("Ico Suplemento Azul nível 1", "item", 1, 0, 'comum', "agua", 1, "img/itens/AGA-dano+1.png", "img/icones/AGA-D1.png"),
("Ico Suplemento Azul nível 2", "item", 2, 0, 'raro', "agua", 3, "img/itens/AGA-dano+2.png", "img/icones/AGA-D2.png"),
("Ico-Esfera de Proteção Azul nível 1", "item", 0, 1, 'comum', "agua", 1, "img/itens/AGA-vida+1.png", "img/icones/AGA-V1.png"),
("Ico-Esfera de Proteção Azul nível 2", "item", 0, 2, 'raro', "agua", 3, "img/itens/AGA-vida+2.png", "img/icones/AGA-V2.png"),

-- Itens de Dano e Vida - Eletricidade
("Ico Suplemento Amarelo nível 1", "item", 1, 0, 'comum', "eletricidade", 1, "img/itens/ELT-dano+1.png", "img/icones/ELT-D1.png"),
("Ico Suplemento Amarelo nível 2", "item", 2, 0, 'raro', "eletricidade", 3, "img/itens/ELT-dano+2.png", "img/icones/ELT-D2.png"),
("Ico-Esfera de Proteção Amarela  nível 1", "item", 0, 1, 'comum', "eletricidade", 1, "img/itens/ELT-vida+1.png", "img/icones/ELT-V1.png"),
("Ico-Esfera de Proteção Amarela nível 2", "item", 0, 2, 'raro', "eletricidade", 3, "img/itens/ELT-vida+2.png", "img/icones/ELT-V2.png"),

-- Itens de Dano e Vida - Fogo
("Ico Suplemento Vermelho nível 1", "item", 1, 0, 'comum', "fogo", 1, "img/itens/FGO-dano+1.png", "img/icones/FGO-D1.png"),
("Ico Suplemento Vermelho nível 2", "item", 2, 0, 'raro', "fogo", 3, "img/itens/FGO-dano+2.png", "img/icones/FGO-D2.png"),
("Ico-Esfera de Proteção Vermelha nível 1", "item", 0, 1, 'comum', "fogo", 1, "img/itens/FGO-vida+1.png", "img/icones/FGO-V1.png"),
("Ico-Esfera de Proteção Vermelha nível 2", "item", 0, 2, 'raro', "fogo", 3, "img/itens/FGO-vida+2.png", "img/icones/FGO-V2.png"),

-- Itens de Dano e Vida - Terra
("Ico Suplemento Verde nível 1", "item", 1, 0, 'comum', "terra", 1, "img/itens/TER-dano+1.png", "img/icones/TER-D1.png"),
("Ico Suplemento Verde nível 2", "item", 2, 0, 'raro', "terra", 3, "img/itens/TER-dano+2.png", "img/icones/TER-D2.png"),
("Ico-Esfera de Proteção Verde nível 1", "item", 0, 1, 'comum', "terra", 1, "img/itens/TER-vida+1.png", "img/icones/TER-V1.png"),
("Ico-Esfera de Proteção Verde nível 2", "item", 0, 2, 'raro', "terra", 3, "img/itens/TER-vida+2.png", "img/icones/TER-V2.png");

-- usuario fake para teste
INSERT INTO perfil_usuario (moedas, qtd_batalhas, qtd_vitorias, img_avatar) VALUES
(0, 0, 0, "img/icones/aga-1-Aquavor.png");

-- Inserção do inventário default
INSERT INTO inventarios (id_usuario, id_carta) VALUES
(1, 1),
(1, 1),
(1, 2),
(1, 3),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 6),
(1, 7),
(1, 8),
(1, 8),
(1, 9),
(1, 10),
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
(1, 11),
(1, 16),
(1, 13),
(1, 14),
(1, 18),
(1, 19),
(1, 13),
(1, 18),
(1, 21),
(1, 23),
(1, 25),
(1, 27),
(1, 29),
(1, 31),
(1, 33),
(1, 35),
(1, 15),
(1, 16),
(1, 20),
(1, 12),
(1, 17),
(1, 12),
(1, 17),
(1, 22),
(1, 24),
(1, 26),
(1, 28),
(1, 30),
(1, 32),
(1, 34),
(1, 36);

INSERT INTO decks (id_inventario, ativo) VALUES
(1, true),
(2, false),
(3, false);

INSERT INTO decks_individuais (id_carta, id_deck) VALUES
-- deck1
(1, 1),
(1, 1),
(2, 1),
(6, 1),
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
(11, 1),
(16, 1),
-- deck2
(3, 2),
(3, 2),
(4, 2),
(8, 2),
(8, 2),
(9, 2),
(13, 2),
(14, 2),
(18, 2),
(19, 2),
(13, 2),
(18, 2),
(21, 2),
(23, 2),
(25, 2),
(27, 2),
(29, 2),
(31, 2),
(33, 2),
(35, 2),
-- deck3
(1, 3),
(2, 3),
(5, 3),
(6, 3),
(7, 3),
(10, 3),
(11, 3),
(15, 3),
(16, 3),
(20, 3),
(12, 3),
(17, 3),
(22, 3),
(24, 3),
(26, 3),
(28, 3),
(30, 3),
(32, 3),
(34, 3),
(36, 3);