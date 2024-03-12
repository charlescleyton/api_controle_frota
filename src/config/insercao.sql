INSERT INTO motoristas (motorista_id, nome, cpf) VALUES
(1, 'João Silva', '12345678901'),
(2, 'Maria Santos', '23456789012'),
(3, 'Carlos Pereira', '34567890123'),
(4, 'Ana Costa', '45678901234'),
(5, 'Pedro Oliveira', '56789012345'),
(6, 'Julia Castro', '67890123456');

INSERT INTO automoveis (placa, cor, marca) VALUES
('ABC1234', 'Vermelho', 'Ford'),
('DEF5678', 'Azul', 'Chevrolet'),
('GHI9012', 'Preto', 'Honda'),
('JKL3456', 'Branco', 'Toyota'),
('MNO7890', 'Prata', 'Hyundai'),
('PQR1234', 'Cinza', 'Volkswagen');

INSERT INTO automoveis_utilizados (placa, motorista_id, data_inicio, data_termino, motivo) VALUES
('ABC1234', 3, '2024-01-01 08:00:00', '2024-01-01 17:00:00', 'Transporte para reunião de negócios'),
('DEF5678', 5, '2024-01-02 08:00:00', '2024-01-02 17:00:00', 'Transporte para evento corporativo'),
('GHI9012', 1, '2024-01-03 08:00:00', '2024-01-03 17:00:00', 'Transporte para treinamento'),
('JKL3456', 4, '2024-01-04 08:00:00', null, 'Transporte para visita a cliente');