-- CreateTable
CREATE TABLE `Payment` (
    `id` VARCHAR(191) NOT NULL,
    `merchantRequestID` VARCHAR(191) NOT NULL,
    `checkoutRequestID` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `mpesaReceiptNumber` VARCHAR(191) NULL,
    `accountReference` VARCHAR(191) NULL,
    `transactionDate` DATETIME(3) NULL,
    `status` VARCHAR(191) NOT NULL,
    `resultCode` INTEGER NOT NULL,
    `resultDesc` VARCHAR(191) NOT NULL,
    `errorMessage` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Payment_phoneNumber_idx`(`phoneNumber`),
    INDEX `Payment_status_idx`(`status`),
    INDEX `Payment_merchantRequestID_idx`(`merchantRequestID`),
    INDEX `Payment_checkoutRequestID_idx`(`checkoutRequestID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
