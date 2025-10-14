const comprobarDuplicados = (nombre, tipo, cantidad, precio) => {
                if (bebidas.some(b => b.descripcion === nombre)) {
                    const bebidaDuplicada = bebidas.find(b => b.descripcion === nombre)
                    const indice = bebidas.indexOf(bebidaDuplicada)
                    bebidas[indice].cantidad += cantidad
                    
                    console.log("bebida duplicada")
                    duplicado = 1
                }
                else {
                    bebidaActual.push({
                        descripcion: nombre,
                        tipo : tipo,
                        cantidad: cantidad,
                        costoUnit: precio
                    });
                    console.log("sin duplicados")
                    duplicado = 0
                }
            }