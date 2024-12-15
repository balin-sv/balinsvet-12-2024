<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-yellow-500 text-white"
  >
    <h1
      class="text-yellow-300 font-extrabold drop-shadow-lg mb-6"
      style="
        font-size: 10rem;
        line-height: 1;
        text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
      "
    >
      404
    </h1>

    <p class="text-center text-lg sm:text-xl font-bold text-gray-800 p-6 mt-20">
      No hay Información!
      <router-link
        to="/"
        class="mt-6 px-6 py-2 bg-yellow-500 text-gray-800 font-bold rounded-full hover:bg-yellow-400 transition duration-300 flex items-center space-x-2"
      >
        <i class="fas fa-arrow-left"></i>
        <span>Volver al Inicio</span></router-link
      >
    </p>
  </div>
</template>
