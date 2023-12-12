// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/content'],
  app: {
    head: {
      meta: [
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {content: "Portfolio von Nathanael Kim"},
        {
          hid: "og:url",
          property: "og:url",
          content: "nathanaelkim.github.io",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Portfolio - Nathanael Kim",
        },
      ],
      title: 'Portfolio - Nathanael Kim',
    },
  },
})
