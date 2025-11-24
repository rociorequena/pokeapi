export interface PokemonData {
    numero: number;
    img: string;
    nombre: string;
    experiencia: number;
    hp: number;
    ataque: number;
    defensa: number;
    especial: number;
    tipo: 'pokemon'; 
}


export const fetchPokemonData = async (id: number): Promise<PokemonData> => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) throw new Error(`Fallo al cargar Pokémon con ID ${id}`);
        const data = await res.json();
    
        return {
            numero: data.id,
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
//Estuve investigando a fondo por qué la URL de las imágenes de Pokémon sí que carga, a pesar de que la PokeAPI solo me 
// devuelve los datos y no las imágenes directamente. La clave es que el enlace que pusimos en el código (https://raw.githubusercontent.com/...) 
// no es el endpoint de la API de datos. En realidad, apunta directamente a la fuente de recursos estáticos donde el equipo de la PokeAPI guarda 
// todas sus imágenes: su repositorio público en GitHub. Esto funciona gracias a que la API de datos (que nos proporciona el ID del Pokémon) y ese 
// repositorio de imágenes (que actúa como un servidor de archivos estáticos) están sincronizados. Al usar el template literal de JavaScript e incrustar
// el data.id en esa URL, el navegador va directo a buscar la imagen específica (como 25.png o 1.png) en el servidor de GitHub, sin tener que consultar a 
// la API de datos una segunda vez. Para entender esta arquitectura, revisé la documentación de la API y confirmé la diferencia entre la API de datos y el 
// servidor de archivos. La URL base de los sprites la encontré documentada en la sección de recursos o endpoints de la propia documentación oficial de PokeAPI 
// (en pokeapi.co) y también haciendo referencia a su repositorio de GitHub (github.com/PokeAPI/sprites).

            nombre: data.name,
            experiencia: data.base_experience,
            hp: data.stats[0]?.base_stat || 0,
            ataque: data.stats[1]?.base_stat || 0,
            defensa: data.stats[2]?.base_stat || 0,
            especial: data.stats[3]?.base_stat || 0,
            tipo: 'pokemon',
        };
    } catch (error) {
        console.error("Error en fetchPokemonData:", error);
        throw error;
    }
};

