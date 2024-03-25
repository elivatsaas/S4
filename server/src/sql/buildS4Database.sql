-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema S4
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema S4
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `S4` DEFAULT CHARACTER SET utf8 ;
USE `S4` ;

-- -----------------------------------------------------
-- Table `S4`.`Employee`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `S4`.`Employee` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(30) NULL,
  `lastName` VARCHAR(30) NULL,
  `email` VARCHAR(100) NULL,
  `phoneNumber` VARCHAR(10) NULL,
  `hireDate` DATE NULL,
  `birthDate` DATE NULL,
  `payRate` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `User ID_UNIQUE` (`id` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `S4`.`Store`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `S4`.`Store` (
  `storeName` VARCHAR(30) NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `S4`.`Role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `S4`.`Role` (
  `roleName` VARCHAR(30) NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `S4`.`Schedule`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `S4`.`Schedule` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `startDate` DATE NULL,
  `endDate` DATE NULL,
  `scheduleName` VARCHAR(45) NULL,
  PRIMARY KEY (`id`);


-- -----------------------------------------------------
-- Table `S4`.`Shift`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `S4`.`Shift` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NULL,
  `startTime` TIME NULL,
  `endTime` TIME NULL,
  `Employee_id` INT NULL,
  `Schedule_id` INT NOT NULL,
  `Role_id` INT NOT NULL,
  `Store_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `ShiftID_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_Shift_Employee1_idx` (`Employee_id` ASC) VISIBLE,
  INDEX `fk_Shift_Schedule1_idx` (`Schedule_id` ASC) VISIBLE,
  INDEX `fk_Shift_Role1_idx` (`Role_id` ASC) VISIBLE,
  INDEX `fk_Shift_Store1_idx` (`Store_id` ASC) VISIBLE,
  CONSTRAINT `fk_Shift_Employee1`
    FOREIGN KEY (`Employee_id`)
    REFERENCES `S4`.`Employee` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Shift_Schedule1`
    FOREIGN KEY (`Schedule_id`)
    REFERENCES `S4`.`Schedule` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Shift_Role1`
    FOREIGN KEY (`Role_id`)
    REFERENCES `S4`.`Role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Shift_Store1`
    FOREIGN KEY (`Store_id`)
    REFERENCES `S4`.`Store` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `S4`.`Availability`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `S4`.`Availability` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `startTime` TIME NULL,
  `endTime` TIME NULL,
  `dayOfWeek` INT NULL,
  `Employee_id` INT NOT NULL,
  `Schedule_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Availability_Employee1_idx` (`Employee_id` ASC) VISIBLE,
  INDEX `fk_Availability_Schedule1_idx` (`Schedule_id` ASC) VISIBLE,
  CONSTRAINT `fk_Availability_Employee1`
    FOREIGN KEY (`Employee_id`)
    REFERENCES `S4`.`Employee` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Availability_Schedule1`
    FOREIGN KEY (`Schedule_id`)
    REFERENCES `S4`.`Schedule` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `S4`.`DesiredShiftHours`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `S4`.`DesiredShiftHours` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `desiredShifts` INT NULL,
  `maxShifts` INT NULL,
  `desiredHours` INT NULL,
  `maxHours` INT NULL,
  `Employee_id` INT NOT NULL,
  `Schedule_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_DesiredShiftHours_Employee1_idx` (`Employee_id` ASC) VISIBLE,
  INDEX `fk_DesiredShiftHours_Schedule1_idx` (`Schedule_id` ASC) VISIBLE,
  CONSTRAINT `fk_DesiredShiftHours_Employee1`
    FOREIGN KEY (`Employee_id`)
    REFERENCES `S4`.`Employee` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_DesiredShiftHours_Schedule1`
    FOREIGN KEY (`Schedule_id`)
    REFERENCES `S4`.`Schedule` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `S4`.`EmployeeStores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `S4`.`EmployeeStores` (
  `Employee_id` INT NOT NULL,
  `Store_id` INT NOT NULL,
  PRIMARY KEY (`Employee_id`, `Store_id`),
  INDEX `fk_Employee_has_Store_Store1_idx` (`Store_id` ASC) VISIBLE,
  INDEX `fk_Employee_has_Store_Employee1_idx` (`Employee_id` ASC) VISIBLE,
  CONSTRAINT `fk_Employee_has_Store_Employee1`
    FOREIGN KEY (`Employee_id`)
    REFERENCES `S4`.`Employee` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Employee_has_Store_Store1`
    FOREIGN KEY (`Store_id`)
    REFERENCES `S4`.`Store` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `S4`.`Employee_has_Role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `S4`.`Employee_has_Role` (
  `Employee_id` INT NOT NULL,
  `Role_id` INT NOT NULL,
  PRIMARY KEY (`Employee_id`, `Role_id`),
  INDEX `fk_Employee_has_Role_Role1_idx` (`Role_id` ASC) VISIBLE,
  INDEX `fk_Employee_has_Role_Employee1_idx` (`Employee_id` ASC) VISIBLE,
  CONSTRAINT `fk_Employee_has_Role_Employee1`
    FOREIGN KEY (`Employee_id`)
    REFERENCES `S4`.`Employee` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Employee_has_Role_Role1`
    FOREIGN KEY (`Role_id`)
    REFERENCES `S4`.`Role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `S4`.`EmployeeRoles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `S4`.`EmployeeRoles` (
  `Employee_id` INT NOT NULL,
  `Role_id` INT NOT NULL,
  PRIMARY KEY (`Employee_id`, `Role_id`),
  INDEX `fk_Employee_has_Role1_Role1_idx` (`Role_id` ASC) VISIBLE,
  INDEX `fk_Employee_has_Role1_Employee1_idx` (`Employee_id` ASC) VISIBLE,
  CONSTRAINT `fk_Employee_has_Role1_Employee1`
    FOREIGN KEY (`Employee_id`)
    REFERENCES `S4`.`Employee` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Employee_has_Role1_Role1`
    FOREIGN KEY (`Role_id`)
    REFERENCES `S4`.`Role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
