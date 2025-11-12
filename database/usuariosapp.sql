CREATE DATABASE usuarios_app;

USE usuarios_app;

CREATE TABLE usuarios (
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(100) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
telefono VARCHAR(20),
fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO usuarios (nombre, email, telefono) VALUES
('Juan Pérez', 'juan.perez@email.com', '3001234567'),
('María García', 'maria.garcia@email.com', '3109876543'),
('Carlos López', 'carlos.lopez@email.com', '3157654321'),
('Ana Martínez', 'ana.martinez@email.com', '3208765432'),
('Luis Rodríguez', 'luis.rodriguez@email.com', '3156789012');

