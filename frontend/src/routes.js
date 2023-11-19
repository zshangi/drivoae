const routes = [
    {
      path: "/",
      exact: true,
      priority: 1,
      changefreq: "daily",
    },
    {
      path: "/about",
      exact: true,
      priority: 0.8,
      changefreq: "monthly",
    },
    {
        path: "/terms",
        exact: true,
        priority: 0.8,
        changefreq: "monthly",
      },
      {
        path: "/faq",
        exact: true,
        priority: 0.8,
        changefreq: "monthly",
      },
    {
      path: "/products",
      exact: true,
      priority: 0.5,
      changefreq: "weekly",
    },
    {
      path: "/product/:id", // Dynamic route with a parameter
      exact: true,
      priority: 0.7,
      changefreq: "monthly",
    },
    // Add more routes as needed
  ];
  
  module.exports = routes;