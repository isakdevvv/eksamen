import nextConfig from "eslint-config-next";

const config = [
  ...nextConfig,
  {
    rules: {
      // Keep JSX clean without unnecessary braces.
      "react/jsx-curly-brace-presence": ["warn", { props: "never", children: "never" }],
    },
  },
];

export default config;
