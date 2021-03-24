var preguntas_data = [
    {
        id:1,
        size:'normal',
        vimeo:'519127935',
        pregunta:'¿Qué proveedor debe elegir Juan?',
        opcion1:'El proveedor "X" está disponible de inmediato, se compromete a  cumplir con los requisitos HESQ de Yara en los próximos meses y es la oferta más económica.',
        opcion2:'El proveedor "Y" está disponible de inmediato y tiene buenas referencias de mercado en términos de seguridad. Cuenta con personal sin experiencia en trabajo en alturas.',
        opcion3:'El proveedor "Z" tiene disponibilidad luego de una semana, es la oferta más costosa, pero cuenta con estándares de seguridad robustos ajustándose a los requisitos HESQ de YARA.',
        correcto:3,
        video:'1.mp4',
        bien:{
            title:'¡Muy bien! debes seguir:',
            objetivos:[
                'Estableciendo prioridades para reducir los riesgos a niveles aceptables.',
                'Y asignando a la persona adecuada para el puesto idóneo en el momento oportuno'
            ]
        },
        mal:{
            title:'¡Ups!',
            msg:'Debemos mejorar porque es tu responsabilidad promover los recursos necesarios para que se cumplan los lineamientos de HESQ, reglas de oro y/o estándares técnicos (HOPS y TOPS). <span>Así estas decisiones nos tomen más tiempo. !Primero la seguridad de todos!</span>'
        }
    },
    {
        id:2,
        size:'large',
        vimeo:'522315234',
        pregunta:'¿Qué debería hacer Carolina?',
        opcion1:'Parar de inmediato el cargue de camiones y coordinar en conjunto con el supervisor de HESQ la limpieza del área y el retiro de residuos peligrosos al área correspondiente.',
        opcion2:'Escalar por correo electrónico al Site Manager y al Supervisor del Sitio. Esperar que la información sea revisada durante la semana.',
        opcion3:'Realizar personalmente el movimiento de los residuos peligrosos sin contar con el permiso de trabajo',
        correcto:1,
        video:'2.mp4',
        bien:{
            title:'¡Muy bien! debes seguir:',
            objetivos:[
                'Evaluando los resultados de seguridad de una manera sincera y abierta',
                'Además de detener los trabajos cuando el riesgo a la seguridad se considera inaceptable'
            ]
        },
        mal:{
            title:'¡Ups!',
            msg:'<span>Debes mejorar tu enfoque como líder.</span> Puedes detener trabajos cuando el riesgo de seguridad sea inaceptable. Todos hacemos parte de la seguridad y tu rol de liderazgo impacta la efectividad de acciones preventivas y/o correctivas.'
        }
    }
]


var resultados_data = [
    {
        texto:'Sigue así y vamos... enseña a otros.',
        intro:'Felicitaciones. Tus acciones como líder nos permiten concluir que:',
        misiones:[
            'Tomas la responsabilidad, obtienes los hechos y entiendes el impacto de tu propia decisión',
            'Mejoras la forma de trabajo',
            'Desarrollas a tu equipo. ',
            'Eres transparente, entregas mensajes claros y proporcionas comentarios constructivos.',
            'Compartes información y apoyas a tu equipo en el trabajo.',
            'Haces preguntas audaces y escucha activamente.',
            'Exploras nuevas soluciones y formas de trabajar. ',
            'Y demuestras interés en aprender de los demás y de aplicar las mejores prácticas.'
        ]
    },
    {
        texto:'Vamos por buen camino',
        intro:'Debemos seguir fortaleciendo tus habilidades y trabajar en los siguientes puntos para enfocar tus resultados de seguridad:',
        misiones:[
            'Tomando la responsabilidad, obteniendo los hechos y entiendo el impacto de tu propia decisión',
            'Siendo transparente, entregando mensajes claros y proporcionando comentarios constructivos.',
            'Compartiendo información y apoyando a tu equipo en el trabajo.',
            'Haciendo preguntas audaces y escuchando activamente.',
            'Explorando nuevas soluciones y formas de trabajar.',
            'Y demostrando interés en aprender de los demás y de aplicar las mejores prácticas.'
        ]
    },
    {
        texto:'Debemos mejorar y tu equipo de HESQ está alerta para ayudarte.',
        intro:'Te invitamos hacer un alto en el camino y enfocarte en nuestras competencias para:',
        misiones:[
            'Tomar la responsabilidad, obteniendo los hechos y entendiendo el impacto de tu propia decisión',
            'Mejorar la forma de trabajo',
            'Desarrollarte a ti mismo y a los demás',
            'Ser transparente, entregando mensajes claros y proporcionando comentarios constructivos.',
            'Compartir información y apoyar a tu equipo en el trabajo.',
            'Hacer preguntas audaces y escuchar activamente.',
            'Explorar nuevas soluciones y formas de trabajar. ',
            'Y demostrar interés en aprender de los demás y de aplicar las mejores prácticas.'
        ]
    }
]