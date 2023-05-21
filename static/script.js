document.addEventListener('DOMContentLoaded', function() {
    var dropArea = document.getElementById('dropArea');
    var fileInput = document.getElementById('fileInput');
    var submitButton = document.getElementById('submitButton');

    dropArea.addEventListener('dragover', function(event) {
        event.preventDefault();
        dropArea.classList.add('highlight');
    });

    dropArea.addEventListener('dragleave', function(event) {
        event.preventDefault();
        dropArea.classList.remove('highlight');
    });

    dropArea.addEventListener('drop', function(event) {
        event.preventDefault();
        dropArea.classList.remove('highlight');
        fileInput.files = event.dataTransfer.files;
    });

    submitButton.addEventListener('click', function() {
        var files = fileInput.files;
        if (files.length === 0) {
            alert('No se seleccionaron archivos.');
            return;
        }

        var formData = new FormData();
        for (var i = 0; i < files.length; i++) {
            formData.append('archivos', files[i]);
        }

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://demoasf.uc.r.appspot.com/guardar-archivos');
        xhr.onload = function() {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                alert(response.mensaje);
            } else {
                alert('Error al enviar los archivos.');
            }
        };
        xhr.send(formData);
    });
});
