-- Criação das tabelas
CREATE TABLE IF NOT EXISTS all_cards (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    raridade ENUM('comum', 'incomum', 'raro') NOT NULL,
    elemento VARCHAR(50) NOT NULL,
    img_url VARCHAR(255) NOT NULL,
    ico_url VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS deck_cenario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    elemento1 VARCHAR(50) NOT NULL,
    elemento2 VARCHAR(50),
    img_url VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS inventario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_carta INT NOT NULL,
    quantidade INT NOT NULL,
    FOREIGN KEY (id_carta) REFERENCES all_cards(id)
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
("Aquavor", "monstro", 1, "agua", "img/monstros/aga-1-aquavor.png", "img/icones/aga-1-aquavor.png"),
("Hidron", "monstro", 2, "agua", "img/monstros/aga-2-hidron.png", "img/icones/aga-2-hidron.png"),
("Tsunami", "monstro", 3, "agua", "img/monstros/aga-3-tsunami.png", "img/icones/aga-3-tsunami.png"),

-- Monstros de Eletricidade
("Chispas", "monstro", 1, "eletricidade", "img/monstros/elt-1-chispas.png", "img/icones/elt-1-chispas.png"),
("Raius", "monstro", 2, "eletricidade", "img/monstros/elt-2-raius.png", "img/icones/elt-2-raius.png"),
("Tempestus", "monstro", 3, "eletricidade", "img/monstros/elt-3-tempestus.png", "img/icones/elt-3-tempestus.png"),

-- Monstros de Fogo
("Flamix", "monstro", 1, "fogo", "img/monstros/fgo-1-flamix.png", "img/icones/fgo-1-flamix.png"),
("Vulcanus", "monstro", 2, "fogo", "img/monstros/fgo-2-vulcanus.png", "img/icones/fgo-2-vulcanus.png"),
("Infernix", "monstro", 3, "fogo", "img/monstros/fgo-3-infernix.png", "img/icones/fgo-3-infernix.png"),

-- Monstros de Terra
("Terrus", "monstro", 1, "terra", "img/monstros/ter-1-terrus.png", "img/icones/ter-1-terrus.png"),
("Rochix", "monstro", 2, "terra", "img/monstros/ter-2-rochix.png", "img/icones/ter-2-rochix.png"),
("Montanha", "monstro", 3, "terra", "img/monstros/ter-3-montanha.png", "img/icones/ter-3-montanha.png"),

-- Itens de Dano e Vida - Água
("Ico Suplemento Azul", "item", 1, "agua", "img/itens/aga-dano1.png", "img/icones/D1.png"),
("Ico Suplemento Azul nível 2", "item", 2, "agua", "img/itens/aga-dano2.png", "img/icones/D2.png"),
("Ico-Esfera de Proteção Azul", "item", 1, "agua", "img/itens/aga-vida1.png", "img/icones/V1.png"),
("Ico-Esfera de Proteção Azul nível 2", "item", 2, "agua", "img/itens/aga-vida2.png", "img/icones/V2.png"),

-- Itens de Dano e Vida - Eletricidade
("Ico Suplemento Amarelo", "item", 1, "eletricidade", "img/itens/elt-dano1.png", "img/icones/D1.png"),
("Ico Suplemento Amarelo nível 2", "item", 2, "eletricidade", "img/itens/elt-dano2.png", "img/icones/D2.png"),
("Ico-Esfera de Proteção Amarelo", "item", 1, "eletricidade", "img/itens/elt-vida1.png", "img/icones/V1.png"),
("Ico-Esfera de Proteção Amarelo nível 2", "item", 2, "eletricidade", "img/itens/elt-vida2.png", "img/icones/V2.png"),

-- Itens de Dano e Vida - Fogo
("Ico Suplemento Vermelho", "item", 1, "fogo", "img/itens/fgo-dano1.png", "img/icones/D1.png"),
("Ico Suplemento Vermelho nível 2", "item", 2, "fogo", "img/itens/fgo-dano2.png", "img/icones/D2.png"),
("Ico-Esfera de Proteção Vermelho", "item", 1, "fogo", "img/itens/fgo-vida1.png", "img/icones/V1.png"),
("Ico-Esfera de Proteção Vermelho nível 2", "item", 2, "fogo", "img/itens/fgo-vida2.png", "img/icones/V2.png"),

-- Itens de Dano e Vida - Terra
("Ico Suplemento Verde", "item", 1, "terra", "img/itens/ter-dano1.png", "img/icones/D1.png"),
("Ico Suplemento Verde nível 2", "item", 2, "terra", "img/itens/ter-dano2.png", "img/icones/D2.png"),
("Ico-Esfera de Proteção Verde", "item", 1, "terra", "img/itens/ter-vida1.png", "img/icones/V1.png"),
("Ico-Esfera de Proteção Verde nível 2", "item", 2, "terra", "img/itens/ter-vida2.png", "img/icones/V2.png");

-- Inserção do inventário default
INSERT INTO inventario (id_carta, quantidade) VALUES
(1, 1),  -- Aquavor
(2, 2),  -- Hidron
(6, 2),  -- Flamix
(7, 1),  -- Vulcanus
(11, 2), -- Terrus
(12, 1), -- Rochix
(16, 2), -- Ico Suplemento Azul nível 2
(17, 1), -- Ico-Esfera de Proteção Azul
(21, 1), -- Ico Suplemento Amarelo nível 2
(23, 1), -- Ico-Esfera de Proteção Amarelo nível 2
(25, 1), -- Ico Suplemento Vermelho
(27, 1), -- Ico-Esfera de Proteção Vermelho
(29, 1), -- Ico Suplemento Verde
(31, 1), -- Ico-Esfera de Proteção Verde
(33, 1), -- Ico Suplemento Verde nível 2
(35, 1); -- Ico-Esfera de Proteção Verde nível 2