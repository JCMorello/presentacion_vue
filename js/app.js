const { createApp, ref, onMounted, onUnmounted } = Vue;

/* 🖼️ Componente Imagen */
const ImageSlide = {
    template: `
        <div>
            <img src="https://picsum.photos/1200/800" alt="Imagen carrusel">
        </div>
    `
};

/* ⏰ Componente Reloj */
const ClockSlide = {
    template: `
        <div class="clock">
            {{ time }}
        </div>
    `,
    setup() {
        const time = ref('');
        let interval;

        const updateTime = () => {
            time.value = new Date().toLocaleTimeString();
        };

        onMounted(() => {
            updateTime();
            interval = setInterval(updateTime, 1000);
        });

        onUnmounted(() => clearInterval(interval));

        return { time };
    }
};

/* ♟️ Clasificación de Ajedrez */
const ChessRankingSlide = {
    template: `
        <div class="ranking">
            <h1>♟️ Clasificación de Ajedrez</h1>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Jugador</th>
                        <th>Partidas</th>
                        <th>Puntos</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(jugador, index) in jugadores" :key="jugador.nombre">
                        <td>{{ index + 1 }}</td>
                        <td class="player">
                            <img :src="jugador.foto" alt="foto">
                            <span>{{ jugador.nombre }}</span>
                        </td>
                        <td>{{ jugador.partidas }}</td>
                        <td>{{ jugador.puntos }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
    setup() {
        const jugadores = ref([
            {
                nombre: 'Magnus Carlsen',
                partidas: 42,
                puntos: 38,
                foto: 'https://i.pravatar.cc/80?img=1'
            },
            {
                nombre: 'Hikaru Nakamura',
                partidas: 40,
                puntos: 35,
                foto: 'https://i.pravatar.cc/80?img=2'
            },
            {
                nombre: 'Jorge Rodriguez',
                partidas: 41,
                puntos: 34,
                foto: 'https://i.pravatar.cc/80?img=3'
            },
            {
                nombre: 'Ian Nepomniachtchi',
                partidas: 39,
                puntos: 33,
                foto: 'https://i.pravatar.cc/80?img=4'
            }
        ]);

        return { jugadores };
    }
};

/* 🚀 App principal */
createApp({
    components: {
        ImageSlide,
        ClockSlide,
        ChessRankingSlide
    },
    setup() {
        const slides = ['ImageSlide', 'ClockSlide', 'ChessRankingSlide'];
        const currentSlide = ref(0);

        onMounted(() => {
            setInterval(() => {
                currentSlide.value = (currentSlide.value + 1) % slides.length;
            }, 5000); // cambia cada 5s
        });

        return {
            slides,
            currentSlide
        };
    }
}).mount('#app');
