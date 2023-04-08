<?php
// Check if a file was uploaded
if(isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
    // Get the image file details
    $file_name = $_FILES['image']['name'];
    $file_size = $_FILES['image']['size'];
    $file_tmp = $_FILES['image']['tmp_name'];
    $file_type = $_FILES['image']['type'];
    // Move the uploaded file to a temporary directory
    move_uploaded_file($file_tmp, 'uploads/' . $file_name);
    
    // Call the Python script to process the image
    $command = escapeshellcmd('python cartoonizer.py uploads/' . $file_name);
    $output = shell_exec($command);

    // Send the processed image back to the JavaScript file
    echo $output;
}
?>
