<template>
  <div class="container mx-auto md:w-3/4 lg:w-1/2">
    <h1 class="mx-auto text-left font-bold text-blue-900 md:w-10/12 lg:w-8/12">
      Place for all dancers
    </h1>
    <p
      class="mx-auto text-left text-base md:text-lg pt-8 md:w-7/12 lg:w-6/12 text-gray-700"
    >
      Join us and find dancing events you like
    </p>
    <p>
      <a
        href="/signup"
        class="w-32 block text-md text-white bg-blue-600 hover:bg-blue-800 mx-auto mt-10 px-5 py-2 rounded-full"
        >Register
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="h-4 w-4 inline-block ml-2"
        >
          <path
            fill-rule="evenodd"
            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
    </p>
  </div>
</template>

<style lang="scss">
h1 {
  line-height: 3rem;
  font-size: 3rem;
  @media (min-width: 768px) {
    font-size: 5rem;
    line-height: 5.9rem;
  }
}
</style>
