document.addEventListener("DOMContentLoaded", function() {
    var resultElement = document.getElementById("result");
    var getDataButton = document.getElementById("getDataButton");

    getDataButton.addEventListener("click", function() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://demoasf.uc.r.appspot.com/procesar-archivos", true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                resultElement.textContent = "Archivos procesados.";
                alert("Proceso terminado satisfactoriamente.");
            }
        };
        xhr.send();
    });

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://demoasf.uc.r.appspot.com/listar-archivos", true); // Cambia la URL según tu servicio REST
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            var filesList = document.createElement("ul");
            filesList.classList.add("list-group"); // Agrega la clase "list-group" de Bootstrap

            response.archivos.forEach(function(archivo) {
                var listItem = document.createElement("li");
                listItem.classList.add("list-group-item"); // Agrega la clase "list-group-item" de Bootstrap
                listItem.textContent = archivo;
                filesList.appendChild(listItem);
            });

            resultElement.innerHTML = "";
            resultElement.appendChild(filesList);
        }
    };
    xhr.send();
});
