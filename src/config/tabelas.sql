CREATE DATABASE api_controle_frota;

CREATE TABLE api_controle_frota.automoveis (
    placa VARCHAR(7) PRIMARY KEY NOT NULL,
    cor VARCHAR(20) NOT NULL,
    marca VARCHAR(50) NOT NULL
);

CREATE TABLE api_controle_frota.motoristas (
    motorista_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) NOT NULL UNIQUE
);

CREATE TABLE api_controle_frota.automoveis_utilizados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_inicio DATETIME NOT NULL,
    data_termino DATETIME,
    motorista_id INT NOT NULL,
    placa VARCHAR(7),
    motivo TEXT,
    FOREIGN KEY (motorista_id) REFERENCES motoristas(motorista_id),
    FOREIGN KEY (placa) REFERENCES automoveis(placa)
);
