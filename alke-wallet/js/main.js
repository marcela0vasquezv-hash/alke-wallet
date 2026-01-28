/*******************************
 * VARIABLES GLOBALES
 *******************************/
let saldo = localStorage.getItem("saldo")
  ? Number(localStorage.getItem("saldo"))
  : 1000;

let movimientos = localStorage.getItem("movimientos")
  ? JSON.parse(localStorage.getItem("movimientos"))
  : [];

/*******************************
 * LOGIN
 *******************************/
$("#loginForm").submit(function (event) {
  event.preventDefault();

  let usuario = $("#user").val();
  let password = $("#pass").val();

  if (usuario === "admin" && password === "1234") {
    window.location.href = "menu.html";
  } else {
    alert("Usuario o contraseña incorrectos");
  }
});

/*******************************
 * MOSTRAR SALDO (si existe)
 *******************************/
if ($("#saldo").length) {
  $("#saldo").text("$" + saldo);
}

/*******************************
 * DEPÓSITO DE DINERO
 *******************************/
$("#btnDepositar").click(function () {
  let monto = Number($("#montoDeposito").val());

  if (monto > 0) {
    saldo += monto;
    localStorage.setItem("saldo", saldo);

    movimientos.push("Depósito: +$" + monto);
    localStorage.setItem("movimientos", JSON.stringify(movimientos));

    $("#saldo").text("$" + saldo);
    alert("Depósito realizado con éxito");
    $("#montoDeposito").val("");
  } else {
    alert("Ingresa un monto válido");
  }
});

/*******************************
 * ENVÍO DE DINERO
 *******************************/
$("#btnEnviar").click(function () {
  let contacto = $("#contacto").val();
  let monto = Number($("#montoEnvio").val());

  if (contacto === "" || monto <= 0) {
    alert("Completa los datos correctamente");
  } else if (monto > saldo) {
    alert("Saldo insuficiente");
  } else {
    saldo -= monto;
    localStorage.setItem("saldo", saldo);

    movimientos.push("Envío a " + contacto + ": -$" + monto);
    localStorage.setItem("movimientos", JSON.stringify(movimientos));

    $("#saldo").text("$" + saldo);
    alert("Transferencia enviada con éxito");
    $("#contacto").val("");
    $("#montoEnvio").val("");
  }
});

/*******************************
 * HISTORIAL DE MOVIMIENTOS
 *******************************/
if ($("#listaMovimientos").length) {
  $("#listaMovimientos").empty();

  if (movimientos.length === 0) {
    $("#listaMovimientos").append(
      "<li class='list-group-item text-center'>No hay movimientos registrados</li>"
    );
  } else {
  movimientos.forEach(function (movimiento) {
  let claseColor = "";

  if (movimiento.includes("Depósito")) {
    claseColor = "text-success"; // verde
  } else if (movimiento.includes("Envío")) {
    claseColor = "text-danger"; // rojo
  }

  $("#listaMovimientos").append(
    "<li class='list-group-item " + claseColor + "'>" +
      movimiento +
    "</li>"
  );
});

  }
}
