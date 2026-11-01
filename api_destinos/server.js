const express = require("express");
const cors = require("cors");


const app = express();
const PORT = 3000;

app.use(cors());

    
// Permite recibir datos JSON en las solicitudes
app.use(express.json());

// Datos temporales de nuestra API
let destinos = [
  {
    id: 1,
    nombre: "Jardín",
    departamento: "Antioquia"
  },
  {
    id: 2,
    nombre: "Cartagena",
    departamento: "Bolívar"
  },
  {
    id: 3,
    nombre: "Salento",
    departamento: "Quindío"
  }
];

// GET: consultar todos los destinos
app.get("/api/destinos", (req, res) => {
  res.json(destinos);
});

// GET: consultar un destino por su ID
app.get("/api/destinos/:id", (req, res) => {
  const id = Number(req.params.id);

  const destino = destinos.find(d => d.id === id);

  if (!destino) {
    return res.status(404).json({
      mensaje: "Destino no encontrado"
    });
  }

  res.json(destino);
});

// POST: crear un destino
app.post("/api/destinos", (req, res) => {
  const { nombre, departamento } = req.body;

  if(!nombre || !departamento) {
    return res.status(400).json({
      mensaje: "Debes ingresar nombre y departamento"
    });
  }

/*
  if (
    typeof nombre !== "string" ||
    !nombre.trim() ||
    typeof departamento !== "string" ||
    !departamento.trim()
  ) {
    return res.status(400).json({
      mensaje: "Debes enviar nombre y departamento"
    });
  }
*/
  





const nuevoDestino = {
    id: Date .now(),
    nombre: nombre.trim(),
    departamento: departamento.trim()  
  };

  destinos.push(nuevoDestino);

  res.status(201).json(nuevoDestino);
});

// PUT: actualizar un destino completo
app.put("/api/destinos/:id", (req, res) => {
  const id = Number(req.params.id);
  const { nombre, departamento } = req.body;

  const destino = destinos.find(d => d.id === id);

  if (!destino) {
    return res.status(404).json({
      mensaje: "Destino no encontrado"
    });
  }

  if (
    typeof nombre !== "string" ||
    !nombre.trim() ||
    typeof departamento !== "string" ||
    !departamento.trim()
  ) {
    return res.status(400).json({
      mensaje: "Debes enviar nombre y departamento"
    });
  }

  destino.nombre = nombre.trim();
  destino.departamento = departamento.trim();

  res.json(destino);
});

// DELETE: eliminar un destino
app.delete("/api/destinos/:id", (req, res) => {
  const id = Number(req.params.id);

  const existe=destinos.some(destino => destino.id === id);

  if (!existe) {
    return res.status(404).json({
      mensaje: "Destino no encontrado"
    });
  }

  destinos = destinos.filter(destino => destino.id !== id);

  res.json({
    mensaje: "Destino eliminado correctamente"
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`API activa en http:  //localhost:${PORT}`);
});
