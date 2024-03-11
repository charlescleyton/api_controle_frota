/*
 Navicat Premium Data Transfer

 Source Server         : DB-Local
 Source Server Type    : MySQL
 Source Server Version : 80030 (8.0.30)
 Source Host           : localhost:3306
 Source Schema         : api_controle_frota

 Target Server Type    : MySQL
 Target Server Version : 80030 (8.0.30)
 File Encoding         : 65001

 Date: 10/03/2024 22:12:26
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for motoristas
-- ----------------------------
DROP TABLE IF EXISTS `motoristas`;
CREATE TABLE `motoristas`  (
  `motorista_id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `cpf` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`motorista_id`) USING BTREE,
  UNIQUE INDEX `cpf`(`cpf` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of motoristas
-- ----------------------------
INSERT INTO `motoristas` VALUES (1, 'João Silva', '12345678901');
INSERT INTO `motoristas` VALUES (2, 'Maria Santos', '23456789012');
INSERT INTO `motoristas` VALUES (3, 'Carlos Pereira', '34567890123');
INSERT INTO `motoristas` VALUES (4, 'Ana Costa', '45678901234');
INSERT INTO `motoristas` VALUES (5, 'Pedro Oliveira', '56789012345');
INSERT INTO `motoristas` VALUES (6, 'Julia Castro', '67890123456');

-- ----------------------------
-- Table structure for veiculos
-- ----------------------------
DROP TABLE IF EXISTS `veiculos`;
CREATE TABLE `veiculos`  (
  `placa` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `cor` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `marca` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`placa`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of veiculos
-- ----------------------------
INSERT INTO `veiculos` VALUES ('ABC1234', 'Vermelho', 'Ford');
INSERT INTO `veiculos` VALUES ('DEF5678', 'Azul', 'Chevrolet');
INSERT INTO `veiculos` VALUES ('GHI9012', 'Preto', 'Honda');
INSERT INTO `veiculos` VALUES ('JKL3456', 'Branco', 'Toyota');
INSERT INTO `veiculos` VALUES ('MNO7890', 'Prata', 'Hyundai');
INSERT INTO `veiculos` VALUES ('PQR1234', 'Cinza', 'Volkswagen');

-- ----------------------------
-- Table structure for veiculos_utilizados
-- ----------------------------
DROP TABLE IF EXISTS `veiculos_utilizados`;
CREATE TABLE `veiculos_utilizados`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `data_inicio` datetime NOT NULL,
  `data_termino` datetime NULL DEFAULT NULL,
  `motorista_id` int NOT NULL,
  `placa` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `motivo` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `motorista_id`(`motorista_id` ASC) USING BTREE,
  INDEX `placa`(`placa` ASC) USING BTREE,
  CONSTRAINT `veiculos_utilizados_ibfk_1` FOREIGN KEY (`motorista_id`) REFERENCES `motoristas` (`motorista_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `veiculos_utilizados_ibfk_2` FOREIGN KEY (`placa`) REFERENCES `veiculos` (`placa`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of veiculos_utilizados
-- ----------------------------
INSERT INTO `veiculos_utilizados` VALUES (1, '2024-01-01 08:00:00', '2024-01-01 17:00:00', 3, 'ABC1234', 'Transporte para reunião de negócios');
INSERT INTO `veiculos_utilizados` VALUES (2, '2024-01-02 08:00:00', '2024-01-02 17:00:00', 5, 'DEF5678', 'Transporte para evento corporativo');
INSERT INTO `veiculos_utilizados` VALUES (3, '2024-01-03 08:00:00', '2024-01-03 17:00:00', 1, 'GHI9012', 'Transporte para treinamento');
INSERT INTO `veiculos_utilizados` VALUES (4, '2024-01-04 08:00:00', NULL, 4, 'JKL3456', 'Transporte para visita a cliente');

SET FOREIGN_KEY_CHECKS = 1;
