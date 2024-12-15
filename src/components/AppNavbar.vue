<template>
  <div
    class="sticky top-0 z-10 bg-black bg-opacity-80 py-4 px-6 flex justify-between items-center shadow-md"
  >
    <h1
      class="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-700 animate-gradient"
    >
      <slot></slot>
    </h1>
    <slot name="button"></slot>
  </div>
</template>
