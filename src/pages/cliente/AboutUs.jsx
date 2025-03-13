import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaDumbbell, FaHeartbeat } from "react-icons/fa";
import Footer from "../../components/footer2";


function AboutUs() {
  return (
    <div className="bg-[#121212] text-white min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-center px-8 py-16 bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">
            SOBRE <span className="text-red-500">BRAVE GYM</span>
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            En <span className="text-red-400 font-semibold">Brave Gym</span>{" "}
            creemos en romper límites. No solo somos un gimnasio, somos una
            comunidad dedicada a transformar vidas a través de la disciplina, la
            tecnología y la nutrición deportiva de alto nivel.
          </p>
        </div>

        <div className="flex-1 flex justify-center mt-10 md:mt-0">
          <img
            src="https://plus.unsplash.com/premium_photo-1664910003768-ad057fc2ab4b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3ltJTIwZml0bmVzc3xlbnwwfHwwfHx8MA%3D%3D"
            alt="Brave Gym Hero"
            className="rounded-xl shadow-2xl w-80 md:w-[400px] object-cover"
          />
        </div>
      </section>

      {/* Nuestra Historia */}
      <section className="flex flex-col md:flex-row items-center px-8 py-16 max-w-7xl mx-auto gap-8">
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b"
            alt="Historia Brave Gym"
            className="rounded-lg shadow-xl object-cover w-full h-[400px]"
          />
        </div>
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl font-bold text-white">Nuestra Historia</h2>
          <p className="text-gray-400 leading-relaxed">
            Brave Gym nació de la pasión por el fitness y la salud integral. Nos
            propusimos crear un espacio donde el compromiso y el rendimiento se
            unan con los mejores suplementos y productos deportivos premium.
          </p>
          <p className="text-gray-400 leading-relaxed">
            La innovación está en nuestro ADN, ofreciendo no solo entrenamientos
            de élite sino también una línea exclusiva de suplementos Brave,
            formulados para potenciar tu progreso y llevarte más allá.
          </p>
        </div>
      </section>

      {/* Sección de Características */}
      <section className="bg-[#1f1f1f] py-16 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#2a2a2a] rounded-xl p-6 text-center shadow-lg hover:scale-105 transition-transform duration-300">
            <FaCheckCircle className="text-5xl text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-white">
              Nada Que Ocultar
            </h3>
            <p className="text-gray-400 text-sm">
              Fórmulas limpias, sin rellenos ni aditivos. Ingredientes naturales
              aprobados por especialistas para resultados óptimos.
            </p>
          </div>

          <div className="bg-[#2a2a2a] rounded-xl p-6 text-center shadow-lg hover:scale-105 transition-transform duration-300">
            <FaHeartbeat className="text-5xl text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-white">
              Máxima Calidad
            </h3>
            <p className="text-gray-400 text-sm">
              Suplementos con certificaciones de calidad mundial, diseñados para
              la salud y el rendimiento. Garantía de confianza y resultados.
            </p>
          </div>

          <div className="bg-[#2a2a2a] rounded-xl p-6 text-center shadow-lg hover:scale-105 transition-transform duration-300">
            <FaDumbbell className="text-5xl text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-white">
              Innovador y Delicioso
            </h3>
            <p className="text-gray-400 text-sm">
              Sabores irresistibles con fórmulas de vanguardia, creadas por
              expertos en nutrición y atletas profesionales.
            </p>
          </div>
        </div>
      </section>

      {/* Imagen y Llamado a la Acción */}
      <section className="flex flex-col md:flex-row-reverse items-center justify-center px-8 py-16 max-w-7xl mx-auto gap-8">
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1"
            alt="Whey Protein Brave Gym"
            className="rounded-lg shadow-xl w-full h-[400px] object-cover"
          />
        </div>

        <div className="flex-1 space-y-6">
          <h2 className="text-3xl font-bold text-white">
            Innovador y Delicioso
          </h2>
          <p className="text-gray-400 leading-relaxed">
            En Brave Gym® cada producto es sinónimo de calidad y sabor.
            Desarrollamos perfiles deliciosos, aportando beneficios a tu salud y
            maximizando tu rendimiento en cada entrenamiento.
          </p>
          <section className="flex justify-center py-12">
            <Link
              to="/cliente/products"
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg py-4 px-10 rounded-full transition duration-300 shadow-lg animate-bounce"
            >
              EXPLORA NUESTRA TIENDA
            </Link>
          </section>
        </div>
      </section>
      <section>
            <Footer/>
      </section>

    </div>
  );
}

export default AboutUs;
