const projects = [
  {
    // Project Information
    id: "hex-surface-model",
    title: "Hex Surface Model",
    description: "H3 tessellation-based terrain analysis with hierarchical A* pathfinding and vehicle mobility profiles",
    hero: {
      type: "image",
      src: "assets/projects/Hex Surface Model/hex_surface_model_hero.png",
      caption: "Hex Surface Model — multi-factor terrain analysis using H3 tessellation"
    },
    category: [
      "geo-analysis",
      "programming"
    ],
    tags: [
      "Python",
      "arcpy",
      "H3",
      "Pathfinding"
    ],
    githubLink: "https://github.com/Wendarr/hex-surface-model",
    featured: true,
    year: 2026,

    // Project Page elements
    summary: "A capstone project for the B.A.S. in Geospatial Intelligence & Analysis at Delta State University. The pipeline uses H3 tessellation, multi-factor raster zonal statistics (exactextract), hierarchical A* pathfinding, and vehicle mobility profiles to model terrain traversability. Published on GitHub under an MIT license.",
    time: "One semester",
    role: "Individual — capstone project",
    deliverable: "Python pipeline, APA 7 research paper, GitHub repository",

    objective: "Build an automated geospatial pipeline that tessellates terrain into hexagonal cells, computes multi-factor surface costs from elevation, slope, land cover, and hydrology rasters, and routes optimal paths for different vehicle profiles using hierarchical A* search.",

    links: [
      {
        label: "GitHub Repository",
        url: "https://github.com/Wendarr/hex-surface-model"
      }
    ],

    gallery: [
      {
        type: "image",
        src: "assets/projects/Hex Surface Model/hex_surface_model_hero.png",
        caption: "Hex Surface Model output visualization"
      },
    ],

    method: [
      "Tessellate the area of interest into H3 hexagonal cells at the target resolution",
      "Ingest multi-factor rasters (DEM, slope, land cover, hydrology) and compute zonal statistics per hex cell using exactextract",
      "Derive composite traversability cost per cell based on weighted factor scores and vehicle mobility profile",
      "Build an adjacency graph from the hex grid and run hierarchical A* pathfinding between origin and destination",
      "Export results as vector layers with cost attribution for visualization in ArcGIS Pro"
    ],

    sources: [
      "SRTM DEM | USGS",
      "Land Cover | NLCD",
      "H3 Spatial Index | Uber",
      "exactextract | Daniel Baston"
    ],
  },

  //*******************************************************************************

  {
    // Project Information
    id: "mapping-challenge-2026",
    title: "10-Week Cartographic Challenge",
    description: "One map per week exploring different cartographic themes",
    hero: {
      type: "image",
      src: "assets/projects/10 Week Challenge/week1_points.png",
      caption: "Week 1: Points — Named Peaks of Colorado"
    },
    category: [
      "carto"
    ],
    tags: [
      "ArcGIS Pro",
      "Cartography",
      "arcpy"
    ],
    githubLink: null,
    featured: false,
    year: 2026,

    // Project Page elements
    summary: "A self-directed 10-week cartographic challenge producing one thematic map per week. Each week follows a prescribed theme and pushes different cartographic and data-processing skills.",
    time: "One map per week, 10 weeks",
    role: "Individual",
    deliverable: "Softcopy static maps",

    objective: null,

    links: [],

    gallery: [
      {
        type: "image",
        src: "assets/projects/10 Week Challenge/week1_points.png",
        caption: "Week 1: Points — Named Peaks of Colorado (custom arcpy/SRTM DEM workflow)"
      },
      {
        type: "image",
        src: "assets/projects/10 Week Challenge/week2_lines.png",
        caption: "Week 2: Lines — Transect Elevation Profile of Pikes Peak, Colorado"
      },
    ],

    method: [
      "Select a theme-appropriate dataset and cartographic concept for each week",
      "Process source data using arcpy, QGIS, or manual methods as needed",
      "Design and produce the final map in ArcGIS Pro with attention to visual hierarchy and readability",
    ],

    sources: [
      "SRTM DEM | USGS",
      "Named Peaks | GNIS",
    ],
  },

  //*******************************************************************************

  {
    // Project Information
    id: "runners-dashboard",
    title: "Runner's Dashboard",
    description: "A Flask web app for visualizing running performance from Garmin FIT files",
    hero: {
      type: "image",
      src: "assets/projects/Runners Dashboard/runners_dashboard_hero.png",
      caption: "Runner's Dashboard — dark-themed performance visualization"
    },
    category: [
      "programming",
      "data-science"
    ],
    tags: [
      "Python",
      "Flask",
      "Chart.js"
    ],
    githubLink: "https://github.com/Wendarr/runners-dashboard",
    featured: false,
    year: 2026,

    // Project Page elements
    summary: "A browser-based dashboard built with Flask and Chart.js for analyzing running data from Garmin FIT files. Features a dark UI, imperial/metric toggle, and in-memory-only file handling for privacy. Rebuilt from a 3-script CLI pipeline into a single cohesive web application.",
    time: "Ongoing",
    role: "Individual",
    deliverable: "Flask web application",

    objective: "Create a privacy-first running analytics tool that parses Garmin FIT files locally, displays pace/distance/heart rate trends via interactive charts, and requires no cloud upload or account.",

    links: [
      {
        label: "GitHub Repository",
        url: "https://github.com/Wendarr/runners-dashboard"
      }
    ],

    gallery: [
      {
        type: "image",
        src: "assets/projects/Runners Dashboard/runners_dashboard_hero.png",
        caption: "Runner's Dashboard — main view with Chart.js visualizations"
      },
    ],

    method: [
      "Parse FIT file binary data into structured run records (pace, distance, HR, cadence, elevation)",
      "Build Flask routes to accept file uploads and serve analysis views",
      "Render interactive charts with Chart.js, supporting imperial/metric toggle",
      "Ensure all file processing happens in-memory only — no data persisted to disk"
    ],

    sources: [
      "FIT SDK | Garmin",
    ],
  },

  //*******************************************************************************

/*
  {
    // Project Information — TEMPLATE
    id: "project-id",
    title: "project-title",
    description: "description; shows on project card and project hero",
    hero: {
      type: "image",
      src: "assets/projects/project_folder/project_image.png",
      caption: "project_image caption"
    },
    category: [
      "carto",
      "data-science",
      "geo-analysis",
      "programming",
      "remote",
      "web",
      "school"
    ],
    tags: [
      "technology",
      "tag 1",
      "tag 2",
      "tag 3",
    ],
    githubLink: "https://github.com/Wendarr/",
    featured: false,
    year: 2026,

    // Project Page elements
    summary: "Summary of project",
    time: "Time working on project",
    role: "Role in project",
    deliverable: "Products created",

    objective: "Objective of project",

    links: [
      {
        label: "Link Label",
        url: "https://example.com"
      },
    ],

    gallery: [
      {
        type: "image",
        src: "assets/projects/project_folder/project_image.png",
        caption: "project_image caption"
      },
    ],

    method: [
      "Step 1",
      "Step 2",
    ],

    sources: [
      "Data 1 | Source",
    ],
  },
*/
];
