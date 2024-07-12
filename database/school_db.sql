-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 12, 2024 at 10:02 AM
-- Server version: 5.7.24
-- PHP Version: 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `school_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `age` int(11) NOT NULL,
  `grade` varchar(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `name`, `age`, `grade`, `created_at`) VALUES
(1, 'กัญญารัตน์ สินเจริญ', 20, '3.75', '2024-06-01 02:12:00'),
(2, 'ชนากานต์ อินทรชัย', 22, '3.60', '2024-06-01 02:12:20'),
(3, 'ญาดา นวลพรรณ', 21, '3.80', '2024-06-01 02:12:45'),
(4, 'ธัญญ์นรี บุญประเสริฐ', 23, '3.50', '2024-06-01 02:19:29'),
(5, 'นฤมล สุทธากร', 24, '3.85', '2024-06-01 02:19:41'),
(6, 'ปรียาภรณ์ สุขสวัสดิ์', 22, '3.70', '2024-06-01 02:19:53'),
(7, 'พิมพ์ลภัส เจริญทรัพย์', 21, '3.90', '2024-06-01 02:20:13'),
(8, 'ภัททิรา เรืองไกร', 23, '3.65', '2024-06-01 02:20:27'),
(9, 'รัชนีกร จิระวัฒน์', 24, '3.55', '2024-06-01 02:23:16'),
(10, 'วรัญญา สุขสำราญ', 20, '3.80', '2024-06-01 02:23:31'),
(11, 'ศิรินทร์ วงศ์วรวิทย์', 21, '3.75', '2024-06-01 02:48:03'),
(12, 'สุดารัตน์ บุญมา', 23, '3.70', '2024-06-01 02:48:14'),
(13, 'อนัญญา วิริยะกุล', 22, '3.85', '2024-06-01 02:48:22'),
(14, 'อมรรัตน์ กาญจนสินธุ์', 24, '3.60', '2024-06-01 02:48:35'),
(15, 'อรพรรณ วิทยาศิลป์', 23, '3.90', '2024-06-01 02:48:45'),
(16, 'อรวีร์ จันทร์ประเสริฐ', 21, '3.55', '2024-06-01 02:48:54'),
(17, 'อัมรินทร์ สุวรรณชาติ', 22, '3.80', '2024-06-01 02:49:11'),
(18, 'อินทุอร พรหมรักษา', 20, '3.75', '2024-06-01 02:49:19'),
(19, 'เกษรินทร์ วราพรชัย', 23, '3.67', '2024-06-01 02:49:36'),
(20, 'แพรพลอย เกษมสุข', 21, '4.00', '2024-06-01 02:49:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
