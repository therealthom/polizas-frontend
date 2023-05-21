function obtenerDatos() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://demoasf.uc.r.appspot.com/consultar-tabla', true); // Cambia la URL según tu servicio REST
    xhr.onload = function() {
        if (xhr.status === 200) {
            var datos = JSON.parse(xhr.responseText);
            mostrarDatosEnTabla(datos);
        }
    };
    xhr.send();
}

function mostrarDatosEnTabla(datos) {
    var tabla = document.getElementById('tabla-resultados');
    var tbody = tabla.getElementsByTagName('tbody')[0];

    for (var i = 0; i < datos.length; i++) {
        var fila = document.createElement('tr');

        for (var propiedad in datos[i]) {
            var celda = document.createElement('td');
            celda.textContent = datos[i][propiedad];
            fila.appendChild(celda);
        }

        tbody.appendChild(fila);
    }
}

function generarArchivoXLSX() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://demoasf.uc.r.appspot.com/descargar-datos', true); // Cambia la URL según tu servicio REST
    xhr.responseType = 'blob';

    xhr.onload = function() {
        if (xhr.status === 200) {
            var blob = new Blob([xhr.response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'datos.xlsx';
            a.click();
            window.URL.revokeObjectURL(url);
        }
    };

    xhr.send();
}
