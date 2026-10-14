# Método de cálculo del informe de valoración

Método de comparación con testigos (el de un estudio de mercado o ACM). Los números finales los calcula la plantilla a partir de los testigos y los coeficientes que pongas en el JSON. Así el informe nunca se contradice. Tu trabajo es **elegir bien los testigos y los coeficientes** y saber explicarlos.

> Esto es una estimación orientativa de mercado, no una tasación oficial (ECO/805/2003). Nunca la llames «tasación».

## 1. Testigos: cuántos y cuáles

- **Entre 6 y 10.** Con menos de 4 avisa al agente de que la muestra es débil y dilo en el informe.
- Cerca: idealmente a menos de 500 m. En zonas rurales o de poca oferta, hasta 1-2 km y dilo.
- Parecidos: el mismo tipo (piso con piso, ático con ático), superficie de ±25 %, habitaciones ±1.
- **Mejor vendidos que en venta.** Un vendido es precio real (venta propia, de un colaborador, notaría o registro). Un anuncio es lo que alguien *pide*.
- Recientes: vendidos en los últimos 6-12 meses; anuncios activos.
- Por cada testigo apunta: precio, m² construidos, habitaciones, baños, planta y ascensor, estado, extras (terraza, garaje, trastero), días publicado, bajadas y precio inicial, distancia y dirección aproximada (rumbo en grados: 0 = norte, 90 = este, 180 = sur, 270 = oeste).

**Siempre m² construidos**, que es lo que publican los portales. Si un testigo solo da útiles, multiplica por 1,18 aprox. y dilo en la nota.

### Normalizar lo que pega el agente

El agente pega texto de Idealista, Fotocasa, notas o un CSV. Pásalo a una tabla con las columnas de arriba y **enséñasela** antes de calcular. Columnas del CSV aceptado (en cualquier orden y con nombres parecidos):

```
direccion,fuente,situacion,precio,m2,habitaciones,banos,planta,ascensor,estado,extras,dias,bajadas,precio_inicial,distancia_m,rumbo
```

- `situacion`: `vendido` o `en_venta`.
- Precio en euros sin puntos (`268000`). Si viene «268.000 €», límpialo.
- Si falta algo importante (m² o precio), pregunta. **Nunca inventes un testigo ni un dato.**

## 2. Estadística en bruto

€/m² = precio ÷ m² construidos. La plantilla muestra media, mediana, mínimo y máximo. Sirve para ver la dispersión: si el máximo duplica al mínimo, hay testigos que no se parecen.

## 3. Homogeneización (coeficientes)

Cada testigo se corrige para que se parezca a la vivienda que valoramos:

**€/m² corregido = €/m² del testigo × coef. estado × coef. planta × coef. exterior × coef. terraza × coef. garaje × coef. antigüedad × coef. otros × coef. negociación**

Regla de oro: **si el testigo es MEJOR que nuestra vivienda en algo, su coeficiente es MENOR que 1** (hay que bajarlo). Si es peor, MAYOR que 1. Si es igual, 1.

### Tabla orientativa

| Factor | Situación del testigo frente a nuestra vivienda | Coeficiente |
|---|---|---|
| **Estado** | Reformado integral reciente frente a «buen estado» | 0,90-0,94 |
| | Buen estado frente a «a reformar» | 0,85-0,90 |
| | A reformar frente a «buen estado» | 1,08-1,15 |
| | Para entrar a vivir sin más frente a «a actualizar cocina/baños» | 0,95-0,97 |
| **Planta y ascensor** | Sin ascensor (1.ª-2.ª) frente a con ascensor | 1,04-1,06 |
| | Sin ascensor (3.ª o más) frente a con ascensor | 1,08-1,12 |
| | Bajo frente a planta media | 1,05-1,08 |
| | Planta alta con vistas frente a planta media | 0,97-0,99 |
| | Ático frente a planta normal | 0,92-0,96 |
| **Exterior / luz** | Interior frente a exterior | 1,04-1,08 |
| | Exterior frente a interior | 0,93-0,96 |
| **Terraza** | Terraza pequeña (< 10 m²) que nuestra vivienda no tiene | 0,97-0,98 |
| | Terraza 10-20 m² | 0,95-0,97 |
| | Terraza > 20 m² | 0,85-0,92 |
| **Garaje** | Plaza incluida en el precio y nuestra vivienda sin plaza | precio plaza zona ÷ precio testigo (suele dar 0,92-0,96) |
| **Antigüedad** | Edificio de < 15 años frente a uno de los 70-80 | 0,90-0,95 |
| | Edificio con rehabilitación de fachada/ascensor reciente | 0,97-0,99 |
| **Otros** | Un baño menos que nuestra vivienda | 1,02-1,03 |
| | Una habitación más (mismos m²) | 0,98-0,99 |
| | Ruido, vistas a patio, mala distribución, calle peor | 1,02-1,05 o 0,95-0,98 |

Son rangos de partida: el agente conoce su zona mejor que la tabla. Si dice «aquí el ascensor vale un 15 %», usa su criterio y anótalo.

### Negociación (la pone sola la plantilla)

- Vendido: 1,00 (ya es precio de cierre).
- En venta con menos de 90 días y sin bajadas: **0,95**.
- En venta con 90 días o más, o con bajadas: **0,92** (su precio no lo está validando nadie).

Se cambian en `parametros` (`negociacion_en_venta`, `negociacion_largo`, `dias_largo`). Si en una zona caliente se cierra casi a precio de anuncio, baja la rebaja (0,97) y explícalo.

## 4. Descarte de atípicos

La plantilla aparta automáticamente un testigo (y explica por qué en el informe):

1. Si los coeficientes físicos (sin negociación) lo corrigen **más de un 25 %**: es otro tipo de vivienda (`ajuste_maximo`).
2. Si, ya corregido, se aleja **más de un 15 %** de la mediana del resto (`desviacion_maxima`).
3. A mano: añade `"descartar": "motivo en lenguaje del propietario"` al testigo (p. ej. venta entre familiares, subasta, nuda propiedad).

Nunca descartes un testigo solo porque no te gusta el resultado. Si descartas más de un tercio, la muestra no sirve: busca más testigos.

## 5. Valor de mercado

**Media ponderada** de los testigos válidos: los vendidos cuentan doble (`peso_vendido: 2`), los anuncios una vez.

Valor = €/m² ponderado × m² construidos de la vivienda.

## 6. Los tres precios

| Precio | Cálculo | Para qué |
|---|---|---|
| **Objetivo de cierre** | Valor de mercado redondeado al millar | Lo que se espera firmar en arras |
| **Salida recomendada** | Cierre × (1 + 5 %), ajustado a la cifra «de portal» más cercana acabada en 9.000 (p. ej. 269.000) | Lo que se publica. Deja margen de negociación y entra en los filtros de búsqueda |
| **Mínimo razonable** | Cierre × (1 − 5 %), redondeado | Suelo de negociación. Por debajo, mejor esperar |

Rango recomendado = de mínimo a salida.

- Los márgenes van en `parametros` (`margen_salida`, `margen_minimo`). En mercado muy caliente: 3 %; en mercado lento o vivienda singular: 7-8 %.
- Si el agente quiere fijar un precio a mano: `"precio_salida": 275000` o `"precio_minimo": 240000` en `parametros`.
- **Filtros de portal**: los compradores buscan «hasta 250.000», «hasta 270.000», «hasta 300.000». Un piso a 271.000 € desaparece para quien filtra hasta 270.000. Coméntalo si el precio cae justo encima de un corte.

## 7. Riesgo de sobrevalorar (cómo contarlo)

Al propietario no le convencen las fórmulas, le convencen **los testigos de su calle**. Busca entre los testigos:

- El que salió caro, lleva muchos días y ha bajado (en el ejemplo, T6: 132 días y dos bajadas). Ese es el «dato real» del informe.
- Los días medios de los vendidos (`{dias_vendidos}`).

Los tres escenarios (precio recomendado, +8 %, +15 %) explican qué pasa con las visitas, las bajadas y el plazo. Lenguaje claro: «el piso se quema», «sirve para que los demás parezcan baratos», «quien lo ve tras las bajadas piensa que algo falla». Sin asustar ni prometer plazos exactos: son estimaciones.

## Comprobaciones antes de entregar

- [ ] Ningún testigo inventado; datos de la vivienda confirmados por el agente.
- [ ] Coeficientes coherentes con la regla de oro (mejor → menor que 1).
- [ ] Al menos 4 testigos válidos; si hay menos, avisado.
- [ ] Los tres precios tienen sentido frente a los vendidos (el cierre no está por encima del vendido más caro sin explicación).
- [ ] Aviso legal visible.
