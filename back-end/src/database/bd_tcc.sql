-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 07-Jun-2019 às 20:42
-- Versão do servidor: 5.7.21
-- PHP Version: 5.6.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bd_tcc`
--
CREATE DATABASE IF NOT EXISTS `bd_tcc` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `bd_tcc`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `categoria`
--

DROP TABLE IF EXISTS `categoria`;
CREATE TABLE IF NOT EXISTS `categoria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `categoria`
--

INSERT INTO `categoria` (`id`, `nome`) VALUES
(1, 'Assistência Técnica'),
(2, 'Aulas'),
(3, 'Autos'),
(4, 'Consultoria'),
(5, 'Design e Tecnologia'),
(6, 'Eventos'),
(7, 'Moda e Beleza'),
(8, 'Reformas'),
(9, 'Saúde'),
(10, 'Serviços Domésticos');

-- --------------------------------------------------------

--
-- Estrutura da tabela `cliente`
--

DROP TABLE IF EXISTS `cliente`;
CREATE TABLE IF NOT EXISTS `cliente` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_login` int(11) NOT NULL,
  `nome` varchar(200) NOT NULL,
  `celular` char(15) NOT NULL,
  `cpf` char(14) NOT NULL,
  `ultima_categoria` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cliente_ibfk_1` (`id_login`),
  KEY `cliente_ibfk_2` (`ultima_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `cliente`
--

INSERT INTO `cliente` (`id`, `id_login`, `nome`, `celular`, `cpf`, `ultima_categoria`) VALUES
(8, 13, 'Cliente', '(11) 94894-8225', '512.607.618-35', NULL),
(9, 14, 'Cliente', '(12) 31231-3213', '123.847.338-50', 5);

-- --------------------------------------------------------

--
-- Estrutura da tabela `contrato`
--

DROP TABLE IF EXISTS `contrato`;
CREATE TABLE IF NOT EXISTS `contrato` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cpf` char(14) NOT NULL,
  `cnpj` char(18) NOT NULL,
  `preco` decimal(13,2) NOT NULL,
  `data` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `contrato`
--

INSERT INTO `contrato` (`id`, `cpf`, `cnpj`, `preco`, `data`) VALUES
(11, '123.847.338-50', '05.695.202/0001-19', '600.00', '2019-06-12'),
(12, '123.847.338-50', '05.695.202/0001-19', '600.00', '2019-06-12'),
(13, '123.847.338-50', '05.695.202/0001-19', '600.00', '2019-06-12');

-- --------------------------------------------------------

--
-- Estrutura da tabela `login`
--

DROP TABLE IF EXISTS `login`;
CREATE TABLE IF NOT EXISTS `login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `senha` char(32) NOT NULL,
  `tipo` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `login`
--

INSERT INTO `login` (`id`, `email`, `senha`, `tipo`) VALUES
(13, 'cliente@email.com', 'f5bb0c8de146c67b44babbf4e6584cc0', 'cliente'),
(14, 'cliente2@email.com', '25f9e794323b453885f5181f1b624d0b', 'cliente'),
(16, 'saraortiz544@gmail.com', '4d30a3be4616534b11114d3ce5cc0fec', 'prestador'),
(17, 'lucas@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(18, 'Adriele@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(19, 'Marcelo@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(20, 'Rodrigoramos@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(21, 'mateus@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(23, 'giuliano@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(25, 'higor@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(26, 'caio@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(27, 'rafael@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(28, 'vinicius@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(29, 'rafaela@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(30, 'antonia@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(31, 'antonia@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(32, 'carolina@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(33, 'pamela@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(34, 'vera@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(35, 'jeane@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(36, 'nico@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(37, 'laura@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(38, 'jeferson@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(39, 'luis@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(40, 'joana@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(41, 'hortencia@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(42, 'alanis@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(43, 'amanda@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(44, 'mariah@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(45, 'ana@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(46, 'gustavo@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(47, 'felipe@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(48, 'bruno@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(49, 'brenda@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(50, 'fernanda@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(51, 'anna@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(52, 'carolinai@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(53, 'aghata@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(54, 'raquel@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(55, 'nilson@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(56, 'pedro@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(57, 'Marceloc@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(58, 'ruth@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(59, 'lopes@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(60, 'sueli@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(61, 'Ruan@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(62, 'sergio@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(63, 'diego@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(64, 'Henry@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(65, 'bianca@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(66, 'agathha@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(67, 'dede@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(68, 'Mauro@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador'),
(69, 'lucasJ@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'prestador');

-- --------------------------------------------------------

--
-- Estrutura da tabela `pedido`
--

DROP TABLE IF EXISTS `pedido`;
CREATE TABLE IF NOT EXISTS `pedido` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_cliente` int(11) NOT NULL,
  `id_servico` int(11) NOT NULL,
  `data` date NOT NULL,
  `status` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pedido_ibfk_1` (`id_cliente`),
  KEY `pedido_ibfk_2` (`id_servico`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `pedido`
--

INSERT INTO `pedido` (`id`, `id_cliente`, `id_servico`, `data`, `status`) VALUES
(14, 9, 17, '2019-07-07', 'concluido');

-- --------------------------------------------------------

--
-- Estrutura da tabela `prestador`
--

DROP TABLE IF EXISTS `prestador`;
CREATE TABLE IF NOT EXISTS `prestador` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_login` int(11) NOT NULL,
  `nome` varchar(200) DEFAULT NULL,
  `celular` char(15) NOT NULL,
  `id_profissao` int(11) NOT NULL,
  `foto` varchar(100) NOT NULL,
  `cnpj` char(18) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `prestador_ibfk_1` (`id_login`),
  KEY `prestador_ibfk_2` (`id_profissao`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `prestador`
--

INSERT INTO `prestador` (`id`, `id_login`, `nome`, `celular`, `id_profissao`, `foto`, `cnpj`) VALUES
(6, 16, 'Sara Ortiz Moura', '(11) 96645-8777', 4, '1559936641273-girl-people-landscape-sun-38554.jpeg', '54.887.796/6445-55'),
(7, 17, 'Lucas Silva', '(11) 96645-8777', 1, '1559936748619-pexels-photo-220453.jpeg', '86.497.455/4456-66'),
(8, 18, 'Adriele Oliveira', '(11) 96645-8777', 1, '1559936827234-pexels-photo-61120.jpeg', '68.745.344/5454-65'),
(9, 19, 'Marcelo Campos', '(11) 96645-8777', 1, '1559936965252-pexels-photo-555790.jpg', '45.456.545/4545-66'),
(10, 20, 'Rodrigo Ramos ', '(11) 96645-8777', 7, '1559937048538-pexels-photo-462680.jpeg', '45.564.546/4564-56'),
(11, 21, 'Mateus Henrique', '(11) 96645-8777', 2, '1559937150484-pexels-photo-769772.jpeg', '24.542.526/8685-23'),
(13, 23, 'Giuliano Jr', '(11) 96645-8777', 2, '1559937205208-pexels-photo-247885.jpeg', '23.121.343/2123-52'),
(15, 25, 'Higor Lopes', '(11) 96645-8777', 2, '1559937342767-pexels-photo-326559.jpeg', '87.979.475/4755-67'),
(16, 26, 'Caio Palandi', '(11) 96645-8777', 3, '1559937487566-pexels-photo-428333.jpeg', '42.544.545/4554-51'),
(17, 27, 'Rafael Barretos', '(11) 96645-8777', 3, '1559937534949-pexels-photo-614810.jpeg', '32.146.586/5858-84'),
(18, 28, 'Vinicius Marques', '(11) 96645-8777', 3, '1559937575125-pexels-photo-936229.jpeg', '45.445.845/8486-56'),
(19, 29, 'Rafaela Silva', '(11) 96645-8777', 4, '1559937630611-pexels-photo-718978.jpeg', '23.323.232/3232-32'),
(20, 30, 'Antonia Fontinelly', '(11) 96645-8777', 4, '1559937673055-pexels-photo-355164.jpeg', '45.454.545/4545-45'),
(21, 31, 'Antonia Fontinelly', '(11) 96645-8777', 4, '1559937798414-pexels-photo-355164.jpeg', '45.454.545/4545-45'),
(22, 32, 'Carolina Ferraz', '(11) 96645-8777', 5, '1559937840423-pexels-photo-999515.jpeg', '12.123.153/4545-41'),
(23, 33, 'Pamela Barbosa', '(11) 96645-8777', 5, '1559937889575-pexels-photo-2055535.jpeg', '78.787.878/7878-78'),
(24, 34, 'Vera Cruz', '(11) 96645-8777', 5, '1559937923762-pexels-photo-432722.jpeg', '12.121.212/4541-21'),
(25, 35, 'Jeane Souza', '(11) 96645-8777', 6, '1559937960687-pexels-photo-227294.jpeg', '12.428.554/6545-63'),
(26, 36, 'Nicole Nilce', '(11) 96645-8777', 6, '1559938000637-pexels-photo-372042.jpeg', '45.454.545/4111-11'),
(27, 37, 'Laura Santos', '(11) 96645-8777', 6, '1559938032885-pexels-photo-371168.jpeg', '44.444.444/4444-23'),
(28, 38, 'Jeferson Ferreira', '(11) 96645-8777', 7, '1559938086765-pexels-photo-555790.jpg', '11.125.121/2111-11'),
(29, 39, 'Luis Henrique', '(11) 96645-8777', 7, '1559938131074-pexels-photo-1080243.jpg', '12.121.214/4444-44'),
(30, 40, 'Joana Anna', '(11) 96645-8777', 8, '1559938201432-pexels-photo-415829.jpeg', '48.887.745/7545-45'),
(31, 41, 'Hortência Sales', '(11) 96645-8777', 8, '1559938261718-pexels-photo-638700.jpeg', '11.544.777/7777-84'),
(32, 42, 'Alanis Mariah', '(11) 96645-8777', 8, '1559938310479-pexels-photo-769024.jpeg', '14.777.777/8854-77'),
(33, 43, 'Amanda Praça', '(11) 96645-8777', 9, '1559938368885-pexels-photo-371160.jpeg', '12.144.445/8788-77'),
(34, 44, 'Mariah Pereira', '(11) 96645-8777', 9, '1559938417701-pexels-photo-324658.jpeg', '11.454.847/7878-88'),
(35, 45, 'Anna Vitória', '(11) 96645-8777', 9, '1559938468924-pexels-photo-774909.jpeg', '44.444.444/4444-44'),
(36, 46, 'Gustavo Ponciano', '(11) 96645-8777', 10, '1559938529538-pexels-photo-1222271.jpeg', '77.777.777/7777-77'),
(37, 47, 'Felipe Dourado', '(11) 96645-8777', 10, '1559938600180-pexels-photo-793253.jpeg', '45.563.333/3333-33'),
(38, 48, 'Bruno Grisalho', '(11) 96645-8777', 10, '1559938703773-pexels-photo-718261.jpeg', '77.777.777/7777-75'),
(39, 49, 'Brenda Simões', '(11) 96645-8777', 11, '1559938770288-pexels-photo-247120.jpeg', '55.555.555/5566-66'),
(40, 50, 'Fernanda Ortiz', '(11) 96645-8777', 11, '1559938827460-pexels-photo-705821.jpeg', '55.555.555/5555-55'),
(41, 51, 'Anna Julia', '(11) 96645-8777', 11, '1559938874008-pexels-photo-157023.jpeg', '55.555.554/4444-44'),
(42, 52, 'Carolina Isabel', '(11) 96645-8777', 12, '1559938932316-pexels-photo-2104252.jpeg', '11.111.552/2444-44'),
(43, 53, 'Aghata Olivia', '(11) 96645-8777', 12, '1559939004303-pexels-photo-1729931.jpeg', '77.446.554/4111-11'),
(44, 54, 'Raquel Juliana', '(11) 96645-8777', 12, '1559939051052-pexels-photo-354951.jpeg', '77.777.773/5211-11'),
(45, 55, 'Nilson Hugo', '(11) 96645-8777', 13, '1559939108335-pexels-photo-1516680.jpeg', '44.444.444/5555-55'),
(46, 56, 'Pedro André', '(11) 96645-8777', 13, '1559939158717-pexels-photo-736716.jpeg', '55.555.555/5555-56'),
(47, 57, 'Marcelo Carlos', '(11) 96645-8777', 13, '1559939221445-pexels-photo-839586.jpeg', '22.222.222/2222-22'),
(48, 58, 'Ruth Seiva', '(11) 11111-1111', 14, '1559939295966-pexels-photo-733872.jpeg', '11.111.111/1111-11'),
(49, 59, 'Georgia Lopes', '(11) 96645-8777', 14, '1559939360273-pexels-photo-814052.jpeg', '11.117.444/4444-44'),
(50, 60, 'Suelli Lays ', '(77) 77777-7777', 14, '1559939445601-pexels-photo-1002841.jpeg', '54.666.666/6666-66'),
(51, 61, 'Pedro Ruan', '(45) 55555-5555', 15, '1559939499068-pexels-photo-428333.jpeg', '12.333.333/3333-33'),
(52, 62, 'Sergio Leonardo', '(11) 14544-4444', 15, '1559939561015-pexels-photo-903661.jpeg', '22.222.222/2255-55'),
(53, 63, 'Diego Severino', '(14) 54444-4444', 15, '1559939626917-pexels-photo-716411.jpeg', '66.666.777/7777-77'),
(54, 64, 'Henry Hugo', '(12) 22222-2222', 16, '1559939715575-pexels-photo-1212984.jpeg', '33.333.333/3333-33'),
(55, 65, 'Bianca Evellyn ', '(15) 55555-5555', 16, '1559939773139-pexels-photo-247322.jpeg', '11.111.122/2222-22'),
(56, 66, 'Agatha Campos', '(14) 44444-4444', 16, '1559939848669-pexels-photo-813940.jpeg', '55.555.555/5555-33'),
(57, 67, 'Debóra Ferreira', '(15) 55555-5555', 17, '1559939926614-woman-confident-happy-confident-woman-157741.jpeg', '44.444.222/2222-22'),
(58, 68, 'Mauro Katakoshi', '(44) 44444-4444', 17, '1559940012095-pexels-photo-937481.jpeg', '66.666.664/4444-44'),
(59, 69, 'Lucas Jesus', '(53) 33333-3332', 17, '1559940093828-pexels-photo-1036627.jpeg', '55.555.555/5544-44');

-- --------------------------------------------------------

--
-- Estrutura da tabela `proposta`
--

DROP TABLE IF EXISTS `proposta`;
CREATE TABLE IF NOT EXISTS `proposta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_prestador` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `preco` decimal(13,2) NOT NULL,
  `data` date NOT NULL,
  `status` varchar(12) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `proposta_ibfk_1` (`id_prestador`),
  KEY `proposta_ibfk_2` (`id_pedido`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `servico`
--

DROP TABLE IF EXISTS `servico`;
CREATE TABLE IF NOT EXISTS `servico` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_categoria` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `foto` varchar(100) NOT NULL,
  `descricao` text NOT NULL,
  `media_preco` decimal(13,2) NOT NULL,
  `pedidos` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_categoria` (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `servico`
--

INSERT INTO `servico` (`id`, `id_categoria`, `nome`, `foto`, `descricao`, `media_preco`, `pedidos`) VALUES
(1, 1, 'Conserto de Eletrodomésticos', 'cons_eletro.jpg', 'Está procurando por reparos em sua geladeira, forno ou em algum outro tipo de aparelho? Encontre os melhores profissionais especializados em conserto de eletrodomésticos de forma rápida e prática.', '119.00', 10),
(2, 1, 'Reparo de Celular', 'reparo_celular.jpg', 'Está procurando por uma manutenção, troca de peças ou conserto em seu smartphone? Encontre os melhores profissionais especializados em reparos de celulares de forma rápida e prática.', '239.00', 9),
(3, 1, 'Manutenção de Computador / Notebook', 'cons_comp.jpg', 'Passando por problemas com seu computador pessoal ou notebook e precisa de uma revisão o quanto antes possível? Ou uma possível troca de peças? Deixe com que os profissionais especializados em manutenção de computadores / notebooks te ajudem.', '349.00', 8),
(4, 2, 'Aulas de Música', 'aula_musica.jpg', 'Querendo aprender a cantar ou a tocar algum instrumento musical para arrebentar nas festas, ou até mesmo ter aulas particulares sobre teoria musical? Encontre os melhores professores de música de forma rápida e prática.', '139.00', 7),
(5, 2, 'Aulas de Dança', 'aula_danca.jpg', 'Buscando aprender um estilo de dança para arrasar na pista ou conquistar ainda mais aquela pessoa querida? Adquira as melhores técnicas de dança com nossos profissionais professores de dança.', '229.00', 6),
(6, 2, 'Aulas de Inglês', 'aula_ingles.jpg', 'Precisa aprender inglês para novas oportunidades de trabalho ou até mesmo para uma viagem para o exterior? Estude e entenda rapidamente a língua inglesa com os professores que possuímos.', '239.00', 5),
(7, 2, 'Aulas de Matemática', 'aula_matematica.jpg', 'Quer aprimorar a sua capacidade de realizar cálculos matemáticos para reforçar os seus estudos ou para exercer um trabalho que envolva cálculos com mais facilidade? Encontre os professores de matemática aqui cadastrados.', '169.00', 4),
(8, 3, 'Táxi', 'taxi.jpg', 'Está procurando locomoção para ir de um ponto ao outro de forma rápida e confortável? Encontre os melhores taxistas da região de segura e prática!', '39.00', 3),
(9, 3, 'Carreto', 'carreto.jpg', 'Precisa mudar o local de sua empresa, casa ou loja e não sabe como? Aqui você encontra os melhores carretos da região!', '349.00', 2),
(10, 3, 'Retirada de Entulho', 'entulho.jpg', 'Acabou de fazer uma obra e encontra-se com problemas de entulhos? Contrate uma retirada de entulho agora mesmo!', '289.00', 1),
(11, 3, 'Locação para Viagem', 'locacao.jpg', 'Quer viajar, mas não tem carro ou o mesmo quebrou? Alugue os melhores veículos de forma eficaz, rápida e prática!', '319.00', 0),
(12, 4, 'Consultoria Empresarial', 'cons_empr.jpg', 'Está com problemas na sua empresa e precisa de ajuda? Encontre os melhores especialistas de consultoria empresarial!', '1699.00', 0),
(13, 4, 'Consultoria de Marketing', 'cons_mark.jpg', 'Está precisando alavancar o marketing da sua empresa? Contrate os melhores consultores de marketing!', '1899.00', 0),
(14, 4, 'Consultoria de Finanças', 'cons_finan.jpg', 'Está com problemas em administrar seus lucros? Contrate os melhores consultores financeiros!', '2099.00', 0),
(15, 4, 'Consultoria de Recursos Humanos', 'cons_rh.jpg', 'Está à procura de um Gestor de Recursos Humanos? Contrate agora de forma rápida e eficaz!', '1799.00', 0),
(16, 5, 'Criar Site', 'criar_site.jpg', 'Precisa de um site para impulsionar os seus negócios? Para suas vendas? Ou simplesmente necessita de uma página personalizada para qualquer ocasião? Temos especialistas em informática que podem fazer um site do seu jeito.', '3000.00', 0),
(17, 5, 'Editar Vídeo', 'editar_video.jpg', 'Porque gravar momentos somente em fotos? Grave-os em vídeos! Casamentos, aniversários, eventos, tenha lembranças de quem ama arrumadas belamente por profissionais da edição.', '599.00', 0),
(18, 5, 'Produzir Música', 'prod_music.jpg', 'Você é um compositor que deseja vender sua arte para que as pessoas a apreciem e não sabe por onde começar? Comece por aqui. Temos produtores musicais que certamente podem atender ás suas necessidades.', '4899.00', 0),
(19, 5, 'Criação de Identidade Visual', 'ident_visual.jpg', 'Customize seus produtos/negócios com trabalhadores que têm o necessário para fazê-lo, logos, cores, tudo que sua empresa precisar para ficar mais atrativa está aqui!', '6399.00', 0),
(20, 5, 'Impressão Gráfica', 'impr_grafica.jpg', 'Imprima belas estampas! Camisetas, almofadas, banners... Procure e encontre o que você precisa aqui.', '89.00', 0),
(21, 6, 'Contratar Cantor', 'cantor.jpg', 'Necessita de música para acalmar ou agitar o ambiente do seu evento? Temos profissionais da música, que certamente preencherão o clima e alegrarão seus convidados.', '499.00', 0),
(22, 6, 'Contratar DJ', 'dj.jpg', 'Que tal dar uma festa para esquecer os problemas por um instante? Agite sua festa com DJs e faça dela melhor!', '599.00', 0),
(23, 6, 'Contratar Buffet', 'buffet.jpg', 'Quem não gosta de boa comida? Leve a experiência de novos sabores para seus convidados.', '799.00', 0),
(24, 7, 'Manicure', 'manicure.jpg', 'Está procurando um(a) manicure de confiança? Encontre os melhores da região de forma rápida e prática!', '49.00', 0),
(25, 7, 'Cabeleireiro(a)', 'cabeleireiro.jpg', 'Está procurando um(a) cabeleireiro? Venha conferir os melhores da região!', '159.00', 0),
(26, 7, 'Pedicure', 'pedicure.jpg', 'Está precisando de um(a) pedicure? Encontre os melhores de forma segura!', '69.00', 0),
(27, 7, 'Maquiador(a)', 'maquiador.jpg', 'Está precisando de um(a) maquiador? Venha conferir os melhores de forma prática e segura!', '99.00', 0),
(28, 8, 'Reforma Residencial', 'refor_resid.jpg', 'Está procurando um especialista em reformas residenciais? Confira algumas opções!', '3199.00', 0),
(29, 8, 'Eletricista', 'eletricista.jpg', 'Está procurando um(a) eletricista? Encontre os melhores de forma eficaz!', '599.00', 0),
(30, 8, 'Jardinagem', 'jardinagem.jpg', 'Está precisando aparar a grama ou podar as árvores de seu jardim? Aqui você encontra os melhores jardineiros da região!', '199.00', 0),
(31, 8, 'Manutenção Hidráulica', 'eletricista.jpg', 'Você também não sabe como quebrou o cano? Então contrate os melhores encanadores da região e descubra!', '899.00', 0),
(32, 9, 'Dentista', 'dentista.jpg', 'O ideal seria visitar um dentista de 6 em 6 meses, há quanto tempo você não entra em um consultório? Marque uma consulta para manter sua higiene bucal impecável.', '199.00', 0),
(33, 9, 'Psicólogo', 'psicologo.jpg', 'Seus problemas começaram a pesar demais? Passe em um psicólogo e ele certamente poderá lhe ajudar.', '199.00', 0),
(34, 9, 'Psiquiatra', 'psiquiatra.jpg', 'Em tempos estressantes cuidar do psicólogico é essencial, procure profissionais destinados a isto.', '199.00', 0),
(35, 9, 'SPA', 'spa.jpg', 'Todo mundo precisa de um tempo para relaxar, talvez seu tempo seja agora. Encontre estabelecimentos para lhe ajudar a aliviar as pressões do dia-a-dia.', '379.00', 0),
(36, 10, 'Limpeza Doméstica', 'limp_domest.jpg', 'Que tal uma mão amiga para ajudar a arrumar seu lar? Temos faxineiras para ajudar você a manter a bagunça em seu devido lugar.', '159.00', 0),
(37, 10, 'Cuidar de Crianças', 'cuid_crian.jpg', 'Precisa de um tempo e não tem ninguém com quem deixar as crianças? Tudo bem!, temos cuidadores e cuidadoras para manter suas crianças seguras pelo tempo que necessitar.', '209.00', 0);

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`id_login`) REFERENCES `login` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cliente_ibfk_2` FOREIGN KEY (`ultima_categoria`) REFERENCES `categoria` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `pedido_ibfk_2` FOREIGN KEY (`id_servico`) REFERENCES `servico` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `prestador`
--
ALTER TABLE `prestador`
  ADD CONSTRAINT `prestador_ibfk_1` FOREIGN KEY (`id_login`) REFERENCES `login` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `prestador_ibfk_2` FOREIGN KEY (`id_profissao`) REFERENCES `servico` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `proposta`
--
ALTER TABLE `proposta`
  ADD CONSTRAINT `proposta_ibfk_1` FOREIGN KEY (`id_prestador`) REFERENCES `prestador` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `proposta_ibfk_2` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `servico`
--
ALTER TABLE `servico`
  ADD CONSTRAINT `servico_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
