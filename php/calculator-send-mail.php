<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';
require __DIR__ . '/PHPMailer/src/Exception.php';
require '/home/renofege/public_html/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = isset($_POST["name"]) ? htmlspecialchars($_POST["name"]) : "No especificado";
    $phone = isset($_POST["phone"]) ? htmlspecialchars($_POST["phone"]) : "No especificado";
    $comment = isset($_POST["comment"]) ? htmlspecialchars($_POST["comment"]) : "No especificado";

    $message = "Nuevo formulario recibido:\n\n";
    $message .= "Nombre: $name\n";
    $message .= "Teléfono: $phone\n";
    $message .= "Comentario: $comment\n";

    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'mail.privateemail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'info@renovartstudio.es';
        $mail->Password = 'm3*KDs90LW,U';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->CharSet = 'UTF-8';

        $mail->setFrom('info@renovartstudio.es', 'Formulario de Calculadora');
        $mail->addAddress('info@renovartstudio.es');

        $mail->Subject = 'Nuevo envío desde la calculadora';
        $mail->Body = $message;

        $mail->send();
    } catch (Exception $e) {
        echo "Error al enviar el correo: {$mail->ErrorInfo}";
    }
} else {
    echo "Método no permitido.";
}
?>