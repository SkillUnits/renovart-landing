<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $message = "Nuevo formulario recibido:\n\n";
    foreach ($data as $item) {
        $message .= $item["question"] . ": " . $item["answer"] . "\n";
    }

    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // SMTP-сервер
        $mail->SMTPAuth = true;
        $mail->Username = 'r.gubarev1303@gmail.com'; // Ваша пошта
        $mail->Password = 'aknc fdij ryff pfrj '; // Пароль або App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('noreply@gmail.com', 'Formulario');
        $mail->addAddress('r.gubarev1303@gmail.com'); // Кому надсилати
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
