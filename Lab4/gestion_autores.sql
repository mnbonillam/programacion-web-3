-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-04-2025 a las 00:46:15
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestion_autores`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autores`
--

CREATE TABLE `autores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `nacionalidad` varchar(50) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `biografia` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `autores`
--

INSERT INTO `autores` (`id`, `nombre`, `nacionalidad`, `fecha_nacimiento`, `biografia`) VALUES
(1, 'Gabriel García Márquez', 'Colombiana', '1927-03-06', 'Autor de realismo mágico, famoso por "Cien Años de Soledad".'),
(2, 'Isabel Allende', 'Chilena', '1942-08-02', 'Autora de novelas como "La Casa de los Espíritus".'),
(3, 'Mario Vargas Llosa', 'Peruana', '1936-03-28', 'Premio Nobel de Literatura 2010.'),
(4, 'Julio Cortázar', 'Argentino', '1914-08-26', 'Autor de "Rayuela" y exponente del boom latinoamericano.'),
(5, 'Pablo Neruda', 'Chilena', '1904-07-12', 'Poeta chileno, Premio Nobel de Literatura 1971.'),
(6, 'Jorge Luis Borges', 'Argentino', '1899-08-24', 'Escritor de cuentos, ensayos y poemas, maestro del relato breve.'),
(7, 'Octavio Paz', 'Mexicano', '1914-03-31', 'Poeta y ensayista, Premio Nobel de Literatura 1990.'),
(8, 'Carlos Fuentes', 'Mexicano', '1928-11-11', 'Novelista y ensayista, autor de "La muerte de Artemio Cruz".'),
(9, 'Juan Rulfo', 'Mexicano', '1917-05-16', 'Autor de "Pedro Páramo" y "El llano en llamas".'),
(10, 'Rosario Castellanos', 'Mexicana', '1925-05-25', 'Poetisa y novelista, figura central de la literatura mexicana.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros`
--

CREATE TABLE `libros` (
  `id` int(11) NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `año_publicacion` int(11) NOT NULL,
  `genero` varchar(50) NOT NULL,
  `resumen` text DEFAULT NULL,
  `id_autor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `libros`
--

INSERT INTO `libros` (`id`, `titulo`, `año_publicacion`, `genero`, `resumen`, `id_autor`) VALUES
(1, 'Cien Años de Soledad', 1967, 'Realismo mágico', 'Novela emblemática del realismo mágico y la saga de la familia Buendía.', 1),
(2, 'El Amor en los Tiempos del Cólera', 1985, 'Romance', 'Historia de amor perdurable ambientada en la costa caribeña.', 1),
(3, 'Crónica de una muerte anunciada', 1981, 'Novela', 'Relato de un crimen que todos sabían que iba a ocurrir.', 1),
(4, 'La Casa de los Espíritus', 1982, 'Realismo mágico', 'Saga familiar que mezcla lo sobrenatural con la historia de Chile.', 2),
(5, 'Eva Luna', 1987, 'Realismo mágico', 'Novela centrada en la vida de una cuentista llamada Eva Luna.', 2),
(6, 'Paula', 1994, 'Memorias', 'Conmovedora carta a su hija enferma que se convierte en autobiografía.', 2),
(7, 'La ciudad y los perros', 1963, 'Novela', 'Primera novela de Vargas Llosa sobre estudiantes en un colegio militar.', 3),
(8, 'La Fiesta del Chivo', 2000, 'Novela histórica', 'Retrato del régimen de Rafael Trujillo en República Dominicana.', 3),
(9, 'Conversación en La Catedral', 1969, 'Novela', 'Obra maestra que explora la corrupción política en el Perú.', 3),
(10, 'Rayuela', 1963, 'Novela experimental', 'Obra innovadora que puede leerse en múltiples órdenes.', 4),
(11, 'Bestiario', 1951, 'Cuentos', 'Colección de cuentos con elementos fantásticos y surrealistas.', 4),
(12, 'Veinte poemas de amor y una canción desesperada', 1924, 'Poesía', 'Uno de los libros de poesía más leídos en lengua española.', 5),
(13, 'Canto General', 1950, 'Poesía', 'Obra épica que recorre la historia de América Latina.', 5),
(14, 'Ficciones', 1944, 'Cuentos', 'Colección de relatos que exploran temas filosóficos y metafísicos.', 6),
(15, 'El Aleph', 1949, 'Cuentos', 'Cuentos que exploran el infinito y lo incomprensible.', 6),
(16, 'El laberinto de la soledad', 1950, 'Ensayo', 'Profundo análisis de la identidad mexicana.', 7),
(17, 'Piedra de sol', 1957, 'Poesía', 'Largo poema circular considerado una obra maestra.', 7),
(18, 'La región más transparente', 1958, 'Novela', 'Retrato de la sociedad mexicana de mediados del siglo XX.', 8),
(19, 'Pedro Páramo', 1955, 'Novela', 'Obra maestra que combina realismo y fantasía.', 9),
(20, 'Balún Canán', 1957, 'Novela', 'Exploración de las tensiones raciales y de género en México.', 10);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `autores`
--
ALTER TABLE `autores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `libros`
--
ALTER TABLE `libros`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_autor` (`id_autor`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `autores`
--
ALTER TABLE `autores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `libros`
--
ALTER TABLE `libros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `libros`
--
ALTER TABLE `libros`
  ADD CONSTRAINT `libros_ibfk_1` FOREIGN KEY (`id_autor`) REFERENCES `autores` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;