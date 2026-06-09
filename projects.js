const projects = [
  {
    // Project Information
    id: "hex-surface-model",
    title: "Hex Surface Model",
    description: "H3 tessellation-based terrain analysis with hierarchical A* pathfinding and vehicle mobility profiles",
    hero: {
      type: "image",
      src: "assets/images/Hex Least Cost Surface.png",
      caption: "Using Hexagonal Least Cost Surface for Terrain Analysis — proof of concept across central Colorado"
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
    githubLink: "https://github.com/TheWendarr/hex-surface-model",
    featured: true,
    year: 2026,

    // Project Page elements
    summary: "A capstone project for the B.A.S. in Geospatial Intelligence & Analysis at Delta State University. The pipeline uses H3 tessellation, multi-factor raster zonal statistics (exactextract), hierarchical A* pathfinding, and vehicle mobility profiles to model terrain traversability. Presented to Marine Corps officers and published on GitHub under an MIT license.",
    time: "One semester",
    role: "Individual — capstone project",
    deliverable: "Python pipeline, APA 7 research paper, GitHub repository",

    objective: "Build an automated geospatial pipeline that tessellates terrain into hexagonal cells, computes multi-factor surface costs from elevation, slope, land cover, and hydrology rasters, and routes optimal paths for different vehicle profiles using hierarchical A* search.",

    links: [
      {
        label: "GitHub Repository",
        url: "https://github.com/TheWendarr/hex-surface-model"
      }
    ],

    gallery: [
      {
        type: "image",
        src: "assets/images/Hex Least Cost Surface.png",
        caption: "Hexagonal Least Cost Surface — elevation and landcover factors with optimal wheeled-vehicle route"
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
    id: "pikes-peak-polar-transects",
    title: "Pikes Peak Elevation Profile in 360°",
    description: "Radial elevation transects from Pikes Peak summit, visualized by compass bearing",
    hero: {
      type: "image",
      src: "assets/images/Pikes Peak Polar Transects.png",
      caption: "360° radial elevation transects from Pikes Peak summit, color-coded by bearing"
    },
    category: [
      "carto",
      "data-science",
      "programming"
    ],
    tags: [
      "ArcGIS Pro",
      "Python",
      "Data Visualization"
    ],
    githubLink: null,
    featured: false,
    year: 2026,

    // Project Page elements
    summary: "A creative cartographic piece that casts radial transect lines from the summit of Pikes Peak at regular angular intervals, samples elevation along each line, and plots the resulting profiles color-coded by compass bearing. The map pairs a dark-themed polar transect view with a multi-line elevation chart below.",
    time: "One week",
    role: "Individual",
    deliverable: "Softcopy static map",

    objective: "Visualize the asymmetry of Pikes Peak's terrain by comparing elevation drop-off in every direction from the summit, combining cartographic design with quantitative profiling.",

    links: [],

    gallery: [
      {
        type: "image",
        src: "assets/images/Pikes Peak Polar Transects.png",
        caption: "Pikes Peak Elevation Profile in 360° — transects radiating from summit with elevation chart"
      },
    ],

    method: [
      "Generate radial transect lines from the Pikes Peak summit at regular angular intervals",
      "Sample elevation values along each transect from a DEM",
      "Plot multi-line elevation profiles color-coded by compass bearing",
      "Compose the final layout with map view and chart in ArcGIS Pro"
    ],

    sources: [
      "Elevation Data | USGS",
      "Basemap | Esri, TomTom, Garmin, FAO, NOAA, OpenStreetMap contributors"
    ],
  },

  //*******************************************************************************

  {
    // Project Information
    id: "colorado-14ers",
    title: "Colorado 14ers",
    description: "Mapping all 58 peaks above 14,000 ft in Colorado",
    hero: {
      type: "image",
      src: "assets/images/Colorado 14ers.png",
      caption: "Colorado 14ers — 58 peaks above 14,000 ft, classified by elevation"
    },
    category: [
      "carto"
    ],
    tags: [
      "ArcGIS Pro",
      "Cartography",
      "Points"
    ],
    githubLink: null,
    featured: false,
    year: 2026,

    // Project Page elements
    summary: "A cartographic product mapping all 58 of Colorado's fourteeners — peaks exceeding 14,000 ft in elevation. Peaks are symbolized by elevation class against a terrain basemap with highways, roads, and major cities for spatial context.",
    time: "One week",
    role: "Individual",
    deliverable: "Softcopy static map",

    objective: "Produce a clear, readable reference map of Colorado's highest peaks with elevation classification and geographic context.",

    links: [],

    gallery: [
      {
        type: "image",
        src: "assets/images/Colorado 14ers.png",
        caption: "Colorado 14ers — full map with elevation-classified peak symbology"
      },
    ],

    method: [
      "Source peak locations and elevations from GNIS and USGS datasets",
      "Classify peaks into elevation bands and assign graduated symbology",
      "Compose layout with terrain basemap, transportation network, and cartographic elements in ArcGIS Pro"
    ],

    sources: [
      "Peak Locations & Elevations | GNIS, USGS",
      "Basemap & Transportation | Esri, US Census Bureau"
    ],
  },

  //*******************************************************************************

  {
    // Project Information
    id: "cheyenne-mountain-complex",
    title: "Cheyenne Mountain Complex",
    description: "Stylized contour terrain visualization of Cheyenne Mountain over Colorado Springs",
    hero: {
      type: "image",
      src: "assets/images/Cheyenne MTN Complex.png",
      caption: "Cheyenne Mountain Complex over Colorado Springs, CO — stylized contour terrain"
    },
    category: [
      "carto"
    ],
    tags: [
      "ArcGIS Pro",
      "Cartography",
      "Terrain"
    ],
    githubLink: null,
    featured: false,
    year: 2026,

    // Project Page elements
    summary: "A stylized terrain visualization of the Cheyenne Mountain Complex area using contour-based rendering with an elevation-driven color ramp. The layered contour effect creates a tactile, almost paper-craft aesthetic over the Front Range transition zone.",
    time: "One week",
    role: "Individual",
    deliverable: "Softcopy static map",

    objective: "Create a visually distinctive terrain map using contour styling to highlight the dramatic elevation change where the Rocky Mountain Front Range meets the Colorado Springs urban area.",

    links: [],

    gallery: [
      {
        type: "image",
        src: "assets/images/Cheyenne MTN Complex.png",
        caption: "Cheyenne Mountain Complex — contour-styled terrain visualization"
      },
    ],

    method: [
      "Derive contour lines from a DEM of the Cheyenne Mountain area",
      "Apply an elevation-driven color ramp with stylized contour rendering",
      "Compose the final layout in ArcGIS Pro"
    ],

    sources: [
      "Elevation Data | USGS"
    ],
  },

  //*******************************************************************************

  {
    // Project Information
    id: "usda-plant-hardiness",
    title: "2023 USDA Plant Hardiness Zones",
    description: "Choropleth map of USDA Plant Hardiness Zones across the United States",
    hero: {
      type: "image",
      src: "assets/images/USDA Plant Hardiness Zones.png",
      caption: "2023 USDA Plant Hardiness Zones — continental US with Alaska and Hawaii insets"
    },
    category: [
      "carto",
      "data-science"
    ],
    tags: [
      "ArcGIS Pro",
      "Choropleth",
      "USDA"
    ],
    githubLink: null,
    featured: false,
    year: 2025,

    // Project Page elements
    summary: "A national-scale choropleth map depicting the 2023 USDA Plant Hardiness Zones across the continental United States, Alaska, and Hawaii. Zones are classified by average annual minimum winter temperature and color-coded across 13 classes.",
    time: "One week",
    role: "Individual",
    deliverable: "Softcopy static map",

    objective: "Produce a clean, reference-quality national map of the updated 2023 USDA Plant Hardiness Zone boundaries.",

    links: [
      {
        label: "USDA Plant Hardiness Zone Map",
        url: "https://planthardiness.ars.usda.gov/"
      }
    ],

    gallery: [
      {
        type: "image",
        src: "assets/images/USDA Plant Hardiness Zones.png",
        caption: "2023 USDA Plant Hardiness Zones"
      },
    ],

    method: [
      "Source the 2023 USDA Plant Hardiness Zone dataset",
      "Symbolize zones using a diverging color ramp across 13 classes",
      "Add Alaska and Hawaii insets and compose the final layout in ArcGIS Pro"
    ],

    sources: [
      "Plant Hardiness Zones | USDA Agricultural Research Service"
    ],
  },

  //*******************************************************************************

  {
    // Project Information
    id: "county-map-colorado",
    title: "County Map of Colorado",
    description: "Reference map of Colorado counties with terrain, hydrology, and satellite imagery",
    hero: {
      type: "image",
      src: "assets/images/County Map of Colorado.png",
      caption: "County Map of Colorado — counties, terrain, and hydrography"
    },
    category: [
      "carto"
    ],
    tags: [
      "ArcGIS Pro",
      "Cartography",
      "Reference Map"
    ],
    githubLink: null,
    featured: false,
    year: 2025,

    // Project Page elements
    summary: "A reference-style map of Colorado's 64 counties overlaid on terrain hillshade and satellite imagery, with hydrography (rivers and streams) for geographic context.",
    time: "One week",
    role: "Individual",
    deliverable: "Softcopy static map",

    objective: "Produce a general-purpose reference map of Colorado combining administrative boundaries with physical geography.",

    links: [],

    gallery: [
      {
        type: "image",
        src: "assets/images/County Map of Colorado.png",
        caption: "County Map of Colorado"
      },
    ],

    method: [
      "Source county boundaries, hydrography, and terrain data",
      "Layer satellite imagery with hillshade and county overlays",
      "Label all 64 counties and compose the layout in ArcGIS Pro"
    ],

    sources: [
      "County Boundaries | US Census Bureau",
      "Hydrography | USGS NHD",
      "Terrain & Imagery | Esri, USGS"
    ],
  },

  //*******************************************************************************

  {
    // Project Information
    id: "mississippi-topo-map",
    title: "Mississippi Topographic Map",
    description: "1:25,000-scale topographic map produced for GIS-391 at Delta State University",
    hero: {
      type: "image",
      src: "assets/images/GIS-391_Final.png",
      caption: "GIS 391: Mississippi Topographic Map — 1:25,000 scale with 20-meter contour interval"
    },
    category: [
      "carto",
      "school"
    ],
    tags: [
      "ArcGIS Pro",
      "Topographic Map",
      "Cartography"
    ],
    githubLink: null,
    featured: false,
    year: 2025,

    // Project Page elements
    summary: "A formal 1:25,000-scale topographic map of a region in Mississippi, produced as the final project for GIS-391 at Delta State University. Includes a full legend, slope guide, declination diagram, elevation note, and standard cartographic marginalia.",
    time: "Multiple weeks",
    role: "Individual — course final project",
    deliverable: "Softcopy topographic map sheet",

    objective: "Demonstrate mastery of topographic map production by creating a standards-compliant map sheet with contours, symbology, and marginalia at a professional level.",

    links: [],

    gallery: [
      {
        type: "image",
        src: "assets/images/GIS-391_Final.png",
        caption: "GIS 391 Final — Mississippi topographic map at 1:25,000"
      },
    ],

    method: [
      "Derive 20-meter contour lines from DEM data",
      "Symbolize features using standard topographic map conventions (roads, water, vegetation, structures)",
      "Construct full marginalia: legend, scale bars, declination diagram, slope guide, elevation note",
      "Compose and export the final map sheet in ArcGIS Pro"
    ],

    sources: [
      "Elevation Data | USGS",
      "Feature Data | OpenStreetMap, USGS"
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
      src: "",
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
    githubLink: "https://github.com/TheWendarr/runners-dashboard",
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
        url: "https://github.com/TheWendarr/runners-dashboard"
      }
    ],

    gallery: [],

    method: [
      "Parse FIT file binary data into structured run records (pace, distance, HR, cadence, elevation)",
      "Build Flask routes to accept file uploads and serve analysis views",
      "Render interactive charts with Chart.js, supporting imperial/metric toggle",
      "Ensure all file processing happens in-memory only — no data persisted to disk"
    ],

    sources: [
      "FIT SDK | Garmin"
    ],
  },

  //*******************************************************************************

  {
    // Project Information
    id: "mc-controller",
    title: "Minecraft Server Controller",
    description: "A Flask-based web interface for managing Minecraft servers via SSH and RCON",
    hero: {
      type: "image",
      src: "",
      caption: "mc-controller — server management dashboard"
    },
    category: [
      "programming"
    ],
    tags: [
      "Python",
      "Flask",
      "Paramiko",
      "mcrcon"
    ],
    githubLink: "https://github.com/TheWendarr/mc-controller",
    featured: false,
    year: 2025,

    // Project Page elements
    summary: "A five-page Flask web app for managing Minecraft Java and Bedrock servers running on Debian VMs. Combines Paramiko SSH tunneling with mcrcon for real-time server control through a browser interface.",
    time: "Ongoing",
    role: "Individual",
    deliverable: "Flask web application",

    objective: "Build a browser-based control panel for Minecraft servers that provides dashboard status, settings management, world selection, gamerule editing, and a live console — all without needing direct SSH access.",

    links: [
      {
        label: "GitHub Repository",
        url: "https://github.com/TheWendarr/mc-controller"
      }
    ],

    gallery: [],

    method: [
      "Establish SSH connections to target Debian VMs using Paramiko",
      "Send RCON commands via mcrcon for real-time server interaction",
      "Build five Flask routes: Dashboard, Settings, Worlds, Gamerules, Console",
      "Serve a responsive web UI for browser-based management"
    ],

    sources: [],
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
      src: "assets/images/your_image.png",
      caption: "image caption"
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
    ],
    githubLink: "https://github.com/TheWendarr/",
    featured: false,
    year: 2026,

    summary: "Summary of project",
    time: "Time working on project",
    role: "Role in project",
    deliverable: "Products created",
    objective: "Objective of project",
    links: [],
    gallery: [],
    method: [],
    sources: [],
  },
*/
];
