-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:8889
-- Tiempo de generación: 19-08-2022 a las 17:20:28
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `librapp`
--
CREATE DATABASE IF NOT EXISTS `librapp` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;
USE `librapp`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria_libro`
--

DROP TABLE IF EXISTS `categoria_libro`;
CREATE TABLE IF NOT EXISTS `categoria_libro` (
  `id_categoria_libro` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_categoria_libro` varchar(40) COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id_categoria_libro`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- RELACIONES PARA LA TABLA `categoria_libro`:
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libro`
--

DROP TABLE IF EXISTS `libro`;
CREATE TABLE IF NOT EXISTS `libro` (
  `id_libro` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(40) COLLATE utf8mb4_spanish_ci NOT NULL,
  `autor` varchar(40) COLLATE utf8mb4_spanish_ci NOT NULL,
  `portada` text COLLATE utf8mb4_spanish_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_spanish_ci NOT NULL,
  `isbn` varchar(40) COLLATE utf8mb4_spanish_ci NOT NULL,
  `num_paginas` int(11) NOT NULL,
  `precio` float NOT NULL,
  `peso` float NOT NULL,
  `idioma` varchar(40) COLLATE utf8mb4_spanish_ci NOT NULL,
  `id_categoria_libro` int(11) NOT NULL,
  PRIMARY KEY (`id_libro`),
  KEY `fk_libro_categoria_libro` (`id_categoria_libro`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- RELACIONES PARA LA TABLA `libro`:
--   `id_categoria_libro`
--       `categoria_libro` -> `id_categoria_libro`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

DROP TABLE IF EXISTS `rol`;
CREATE TABLE IF NOT EXISTS `rol` (
  `id_rol` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(40) COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- RELACIONES PARA LA TABLA `rol`:
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) COLLATE utf8mb4_spanish_ci NOT NULL,
  `apellido` varchar(40) COLLATE utf8mb4_spanish_ci NOT NULL,
  `avatar` text COLLATE utf8mb4_spanish_ci NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `telefono` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL,
  `pais` varchar(40) COLLATE utf8mb4_spanish_ci NOT NULL,
  `provincia` varchar(40) COLLATE utf8mb4_spanish_ci NOT NULL,
  `localidad` varchar(40) COLLATE utf8mb4_spanish_ci NOT NULL,
  `direccion` text COLLATE utf8mb4_spanish_ci NOT NULL,
  `piso` int(11) NOT NULL,
  `cod_postal` int(11) NOT NULL,
  `password` int(11) NOT NULL,
  `tyc` tinyint(1) NOT NULL,
  `id_rol` int(11) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  KEY `fk_usuaio_rol` (`id_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- RELACIONES PARA LA TABLA `usuario`:
--   `id_rol`
--       `rol` -> `id_rol`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_libro`
--

DROP TABLE IF EXISTS `usuario_libro`;
CREATE TABLE IF NOT EXISTS `usuario_libro` (
  `id_usuario` int(11) NOT NULL,
  `id_libro` int(11) NOT NULL,
  PRIMARY KEY (`id_usuario`,`id_libro`),
  KEY `fk_usuario_libro_libro` (`id_libro`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- RELACIONES PARA LA TABLA `usuario_libro`:
--   `id_libro`
--       `libro` -> `id_libro`
--   `id_usuario`
--       `usuario` -> `id_usuario`
--

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `libro`
--
ALTER TABLE `libro`
  ADD CONSTRAINT `fk_libro_categoria_libro` FOREIGN KEY (`id_categoria_libro`) REFERENCES `categoria_libro` (`id_categoria_libro`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_usuaio_rol` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario_libro`
--
ALTER TABLE `usuario_libro`
  ADD CONSTRAINT `fk_usuario_libro_libro` FOREIGN KEY (`id_libro`) REFERENCES `libro` (`id_libro`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_usuario_libro_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
