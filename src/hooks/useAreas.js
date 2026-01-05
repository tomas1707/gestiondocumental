// Se importan los hooks necesarios; desde React
import { useState, useEffect, useCallback } from "react";

// URL base de la API de Express para el recurso "areas"
// esto desde el puerto 3001
const API_URL = "http://localhost:3001/api/areas";

// Hook personalizado para manejar la lógica de Áreas
export const useAreas = () => {
  // Estado para almacenar en una lista, el contenido de la tabla áreas
  //Por esta razon se declara una lista vacía []
  const [areas, setAreas] = useState([]);

  // Estado para indicar si hay una petición en curso
  const [loading, setLoading] = useState(false);

  // Estado para manejar mensajes de error
  const [error, setError] = useState(null);
  //Para conocer un poco mas del useState deberás observar el
  //siguiente video: https://youtu.be/e4h5KmpH-oU?si=V_GdQbZe7cqHa-0G

  // =====================================================
  // 1. Obtener todas las áreas (GET /api/areas)
  // =====================================================
  // useCallback evita que la función se vuelva a generar en cada render
  const fetchAreas = useCallback(async () => {
    setLoading(true); // Inicia el estado de carga
    setError(null); // Limpia errores anteriores

    try {
      // Realiza la petición GET al backend
      const response = await fetch(API_URL);

      // Si la respuesta no es correcta, se lanza un error
      //este error es resguardado por useState en la línea 18
      if (!response.ok) {
        throw new Error("Error al obtener áreas");
      }

      // Lo que llegue se convierte a formato JSON
      const data = await response.json();

      // Si se logra obtener la lista de áreas se guarda en el estado
      setAreas(data);
    } catch (err) {
      // Guardamos el mensaje de error
      setError(err.message);
    } finally {
      // Finaliza el estado de carga, existe o no un error
      setLoading(false);
    }
  }, []); //Importante comenzar con una lista vacía, sto evitará que en cada render
  //se acumule el listado.

  // =====================================================
  // 2. Cargar las áreas al montar el componente
  // =====================================================
  // useEffect se ejecuta una sola vez gracias a useCallback
  useEffect(() => {
    fetchAreas();
  }, [fetchAreas]);

  // =====================================================
  // 3. Crear una nueva área (POST /api/areas)
  // =====================================================
  const createArea = async (nombre_area) => {
    try {
      // Enviamos la petición POST con el cuerpo en JSON
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre_area }),
      });

      // Validamos respuesta del servidor
      if (!response.ok) {
        throw new Error("Error al crear área");
      }

      // Obtenemos el área creada
      const data = await response.json();

      // Recargamos el listado completo
      await fetchAreas();

      // Retornamos el área creada por si se necesita en el UI
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // =====================================================
  // 4. Actualizar un área (PUT /api/areas/:id)
  // =====================================================
  const updateArea = async (id, nombre_area) => {
    try {
      // Enviamos la petición PUT con el nuevo nombre del área
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre_area }),
      });

      // Si hubo alún error entonces se guardará en useState un error
      if (!response.ok) {
        throw new Error("Error al actualizar área");
      }

      // pero si todo marechó sin problemas, se obtiene la lista de areas
      //y se convierte en formato Json
      const updated = await response.json();

      // Actualización optimista del estado:
      // se reemplaza solo el elemento modificado
      //para comprender el uso de map, será importante ver este video
      //https://youtu.be/w1RdYx57Nb4?si=khU4Np1SSNq4ol3B
      setAreas((prev) => prev.map((area) => (area.id === id ? updated : area)));

      // Se retorna el registro actualizado
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // =====================================================
  // 5. Eliminar un área (DELETE /api/areas/:id)
  // =====================================================
  const deleteArea = async (id) => {
    try {
      // Enviamos la petición DELETE
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      // Validamos la respuesta
      if (!response.ok) {
        throw new Error("No se pudo eliminar");
      }

      // Eliminamos el área del estado local
      setAreas((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // =====================================================
  // 6. Exponemos las funciones y estados del hook
  // =====================================================
  return {
    areas, // Listado de áreas
    loading, // Indicador de carga
    error, // Mensaje de error
    createArea, // Crear área
    updateArea, // Actualizar área
    deleteArea, // Eliminar área
    refresh: fetchAreas, // Recargar áreas manualmente
  };
};
