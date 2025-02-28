<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require '/home/renofege/public_html/vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/phpmailer/phpmailer/src/Exception.php';
require '../vendor/phpmailer/phpmailer/src/PHPMailer.php';
require '../vendor/phpmailer/phpmailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $message = "Nuevo formulario recibido:\n\n";
    foreach ($data as $item) {
        $message .= $item["question"] . ": " . $item["answer"] . "\n";
    }

    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'server124.web-hosting.com'; // SMTP-сервер
        $mail->SMTPAuth = true;
        $mail->Username = 'info@renovartstudio.eu'; // Ваша пошта
        $mail->Password = 'DZCZ)jM5Lu}9'; // Ваш пароль або App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 465;

        $mail->CharSet = 'UTF-8'; 

        $mail->setFrom('info@renovartstudio.es', 'Formulario');
        $mail->addAddress('info@renovartstudio.eu'); 

        $mail->Subject = 'Respuestas del formulario';
        $mail->Body = $message;

        $mail->send();
        echo "Correo enviado correctamente.";
    } catch (Exception $e) {
        echo "Error al enviar el correo: {$mail->ErrorInfo}";
    }
} else {
    echo "Método no permitido.";
}
?>
