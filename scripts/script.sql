--
--   TERMINAR
--     DE POVOAR
--       AS TABELAS



-- Criação das tabelas

-- USUARIO
CREATE TABLE IF NOT EXISTS user_profile (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nickname VARCHAR(200) NOT NULL default 'Pequeno Gafanhoto',
    moedas INT NOT NULL,
    qtd_batalhas INT NOT NULL,
    qtd_vitorias INT NOT NULL,
    img_avatar VARCHAR(255) NOT NULL
);

-- TODAS AS CARTAS CADASTRADAS
CREATE TABLE IF NOT EXISTS all_cards (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    tipo ENUM('monstro', 'item') NOT NULL,
    raridade ENUM('comum', 'incomum', 'raro') NOT NULL,
    elemento VARCHAR(50) NOT NULL,
    img_url VARCHAR(255) NOT NULL,
    ico_url VARCHAR(255) NOT NULL
);

-- TODOS OS CENARIOS CADASTRADOS
CREATE TABLE IF NOT EXISTS deck_cenario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    elemento1 VARCHAR(50) NOT NULL,
    elemento2 VARCHAR(50),
    img_url VARCHAR(255) NOT NULL
);

-- INVENTARIO INDIVIDUAL (TOTAL DE 100 CARTAS)
CREATE TABLE IF NOT EXISTS inventario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT NOT NULL,
    id_carta INT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES user_profile(id),
    FOREIGN KEY (id_carta) REFERENCES all_cards(id)
);

-- ESCOLHA DO DECK (1 A 3)
CREATE TABLE IF NOT EXISTS decks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_inventory INT NOT NULL,
    ativo BOOLEAN NOT NULL,
    FOREIGN KEY (id_inventory) REFERENCES inventario(id)
);

-- DECK INDIVIDUAL (20 CARTAS)
CREATE TABLE IF NOT EXISTS decks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_cartas INT NOT NULL,
    id_deck INT NOT NULL,
    FOREIGN KEY (id_cartas) REFERENCES all_cards(id),
    FOREIGN KEY (id_deck) REFERENCES decks(id)
);

-- Inserção dos dados na tabela deck_cenario
INSERT INTO deck_cenario (nome, elemento1, elemento2, img_url) VALUES
("Ilha", "agua", null, "img/cenarios/1_AGA.png"),
("Deserto Estático", "eletricidade", null, "img/cenarios/1_ELT.png"),
("Vale Vulcânico", "fogo", null, "img/cenarios/1_FGO.png"),
("Floresta", "terra", null, "img/cenarios/1_TER.png"),
("Pântano", "agua", "terra", "img/cenarios/2-AGA+TER.png"),
("Cerrado Vulcânico", "eletricidade", "fogo", "img/cenarios/2-FGO+ELT.png"),
("Neblina", "neutro", null, "img/cenarios/2-NEBLINA.png");

-- Inserção dos monstros na tabela all_cards
INSERT INTO all_cards (nome, tipo, raridade, elemento, img_url, ico_url) VALUES
-- Monstros de Água
("Aquavor", "monstro", 'comum', "agua", "img/monstros/aga-1-aquavor.png", "img/icones/aga-1-aquavor.png"),
("Tydrill", "monstro", 'comum', "agua", "img/monstros/aga-1-aquavor.png", "img/icones/aga-1-aquavor.png"),
("Hidralisk", "monstro", 'incomum', "agua", "img/monstros/aga-2-hidron.png", "img/icones/aga-2-hidron.png"),
("Rainscour", "monstro", 'incomum', "agua", "img/monstros/aga-2-hidron.png", "img/icones/aga-2-hidron.png"),
("Ocearion", "monstro", 'raro', "agua", "img/monstros/aga-3-tsunami.png", "img/icones/aga-3-tsunami.png"),

-- Monstros de Eletricidade
("Chispas", "monstro", 'comum', "eletricidade", "img/monstros/elt-1-chispas.png", "img/icones/elt-1-chispas.png"),
("Raius", "monstro", 'incomum', "eletricidade", "img/monstros/elt-2-raius.png", "img/icones/elt-2-raius.png"),
("Tempestus", "monstro", 'raro', "eletricidade", "img/monstros/elt-3-tempestus.png", "img/icones/elt-3-tempestus.png"),

-- Monstros de Fogo
("Flamix", "monstro", 'comum', "fogo", "img/monstros/fgo-1-flamix.png", "img/icones/fgo-1-flamix.png"),
("Vulcanus", "monstro", 'incomum', "fogo", "img/monstros/fgo-2-vulcanus.png", "img/icones/fgo-2-vulcanus.png"),
("Infernix", "monstro", 'raro', "fogo", "img/monstros/fgo-3-infernix.png", "img/icones/fgo-3-infernix.png"),

-- Monstros de Terra
("Terrus", "monstro", 'comum', "terra", "img/monstros/ter-1-terrus.png", "img/icones/ter-1-terrus.png"),
("Rochix", "monstro", 'incomum', "terra", "img/monstros/ter-2-rochix.png", "img/icones/ter-2-rochix.png"),
("Montanha", "monstro", 'raro', "terra", "img/monstros/ter-3-montanha.png", "img/icones/ter-3-montanha.png"),

-- Itens de Dano e Vida - Água
("Ico Suplemento Azul nível 1", "item", 'comum', "agua", "img/itens/aga-dano1.png", "img/icones/D1.png"),
("Ico Suplemento Azul nível 2", "item", 'raro', "agua", "img/itens/aga-dano2.png", "img/icones/D2.png"),
("Ico-Esfera de Proteção Azul nível 1", "item", 'comum', "agua", "img/itens/aga-vida1.png", "img/icones/V1.png"),
("Ico-Esfera de Proteção Azul nível 2", "item", 'raro', "agua", "img/itens/aga-vida2.png", "img/icones/V2.png"),

-- Itens de Dano e Vida - Eletricidade
("Ico Suplemento Amarelo nível 1", "item", 'comum', "eletricidade", "img/itens/elt-dano1.png", "img/icones/D1.png"),
("Ico Suplemento Amarelo nível 2", "item", 'raro', "eletricidade", "img/itens/elt-dano2.png", "img/icones/D2.png"),
("Ico-Esfera de Proteção Amarela  nível 1", "item", 'comum', "eletricidade", "img/itens/elt-vida1.png", "img/icones/V1.png"),
("Ico-Esfera de Proteção Amarela nível 2", "item", 'raro', "eletricidade", "img/itens/elt-vida2.png", "img/icones/V2.png"),

-- Itens de Dano e Vida - Fogo
("Ico Suplemento Vermelho nível 1", "item", 'comum', "fogo", "img/itens/fgo-dano1.png", "img/icones/D1.png"),
("Ico Suplemento Vermelho nível 2", "item", 'raro', "fogo", "img/itens/fgo-dano2.png", "img/icones/D2.png"),
("Ico-Esfera de Proteção Vermelha nível 1", "item", 'comum', "fogo", "img/itens/fgo-vida1.png", "img/icones/V1.png"),
("Ico-Esfera de Proteção Vermelha nível 2", "item", 'raro', "fogo", "img/itens/fgo-vida2.png", "img/icones/V2.png"),

-- Itens de Dano e Vida - Terra
("Ico Suplemento Verde", "item", 'comum', "terra", "img/itens/ter-dano1.png", "img/icones/D1.png"),
("Ico Suplemento Verde nível 2", "item", 'raro', "terra", "img/itens/ter-dano2.png", "img/icones/D2.png"),
("Ico-Esfera de Proteção Verde", "item", 'comum', "terra", "img/itens/ter-vida1.png", "img/icones/V1.png"),
("Ico-Esfera de Proteção Verde nível 2", "item", 'raro', "terra", "img/itens/ter-vida2.png", "img/icones/V2.png");

-- Inserção do inventário default
INSERT INTO inventario (id_carta) VALUES
(1),  -- Aquavor
(2),  -- Hidron
(2),  -- Hidron
(6),  -- Flamix
(6),  -- Flamix
(7),  -- Vulcanus
(11), -- Terrus
(11), -- Terrus
(12), -- Rochix
(16), -- Ico Suplemento Azul nível 2
(16), -- Ico Suplemento Azul nível 2
(17), -- Ico-Esfera de Proteção Azul
(21), -- Ico Suplemento Amarelo nível 2
(23), -- Ico-Esfera de Proteção Amarelo nível 2
(25), -- Ico Suplemento Vermelho
(27), -- Ico-Esfera de Proteção Vermelho
(29), -- Ico Suplemento Verde
(31), -- Ico-Esfera de Proteção Verde
(33), -- Ico Suplemento Verde nível 2
(35); -- Ico-Esfera de Proteção Verde nível 2