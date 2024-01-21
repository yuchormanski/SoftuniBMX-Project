/* eslint-disable no-undef */
/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  options: {
    doNotFollow: {
      dependencyTypes: [
        "npm",
        "npm-dev",
        "npm-optional",
        "npm-peer",
        "npm-bundled",
        "npm-no-pkg",
        // "react-international-phone",
      ],
    },

    includeOnly: "^src",

    tsPreCompilationDeps: false,

    // tsConfig: {
    //   fileName: "./tsconfig.json",
    // },

    /* How to resolve external modules - use "yarn-pnp" if you're using yarn's Plug'n'Play.
         otherwise leave it out (or set to the default, which is 'node_modules')
      */
    // externalModuleResolutionStrategy: "yarn-pnp",

    progress: { type: "performance-log" },

    reporterOptions: {
      archi: {
        collapsePattern:
          //   "^src/app/[^/]+|^src/pages/[^/]+|^src/features/[^/]+|^src/ui-kit/[^/]+",
          //   '^src/components/core/api/[^/]+|^src/components/features/[^/]+|^src/components/shared/[^/]+|^src/components/utils/[^/]+',

          `^src/bikeServices/[^/]+|
          ^src/components/[^/]+|
          ^src/components/authComponents/[^/]+|
          ^src/components/createComponents/[^/]+|
          ^src/components/dashComponents/[^/]+|
          ^src/components/dashComponents/managerComponents/[^/]+|
          ^src/components/dashComponents/managerActions/[^/]+|
          ^src/components/dashComponents/managerUtil/[^/]+|
          ^src/components/navigationsComponents/[^/]+|
          ^src/components/dashComponents/qControlComponents/[^/]+|
          ^src/components/dashComponents/userComponents/[^/]+|
          ^src/components/dashComponents/userComponents/editComponents/[^/]+|
          ^src/components/dashComponents/workerComponents/[^/]+|
          ^src/components/storage/[^/]+|
          ^src/context/[^/]+|
          ^src/pages/[^/]+|
          ^src/customHooks/[^/]+|
          ^src/environments/[^/]+|
          ^src/userService/[^/]+|
          ^src/util/[^/]+`,
        theme: {
          modules: [
            {
              criteria: { collapsed: true },
              attributes: { shape: "tab" },
            },
            {
              criteria: { source: "^src/app/[^/]+" },
              attributes: { fillcolor: "#ffbdbd" },
            },
            {
              criteria: { source: "^src/pages/[^/]+" },
              attributes: { fillcolor: "#ffd9a3" },
            },
            {
              criteria: { source: "^src/features/[^/]+" },
              attributes: { fillcolor: "#aedaff" },
            },
            {
              criteria: { source: "^src/ui-kit/[^/]+" },
              attributes: { fillcolor: "#efefef" },
            },
          ],
          graph: {
            splines: "ortho",
            rankdir: "TB",
            ranksep: "1",
          },
        },
      },
    },
  },
};
