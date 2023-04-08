function upload() {
  // Create a file input element
  var inputElement = document.createElement('input');
  inputElement.type = 'file';
  
  // Add an event listener for when a file is selected
  inputElement.addEventListener('change', function(e) {
    var file = e.target.files[0];
    
    // Create a FormData object and append the selected file to it
    var formData = new FormData();
    formData.append('image', file);
    
    // Send the FormData object to the python script for processing
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'app.py', true);
    xhr.onload = function() {
      if (this.status == 200) {
        // Receive the processed image from the Python script
        var cartoonImage = this.responseText;
        
        // Create an image element and set its source to the processed image
        var imgElement = document.createElement('img');
        imgElement.src = cartoonImage;
        
        // Append the image element to the webpage
        document.body.appendChild(imgElement);
      }
    };
    xhr.send(formData);
  });
  
  // Click the file input element to trigger the file selection dialog
  inputElement.click();
}


  