import { Category, Field, Settings } from "./settings-types";

const fields: Field[] = [
  {
    id: "category",
    type: "select",
    label: "category",
    isTranslatable: true,
    useParentAsGroup: false,
    required: true,
    options: [
      {
        value: "single",
        label: "single",
        children: [
          {
            label: "microparticule",
            value: "microparticule",
          },
          {
            label: "hexagon",
            value: "hexagon",
          },
          {
            label: "fan_like_hexagon",
            value: "fan_like_hexagon",
          },
          {
            label: "dentrite_hexagon",
            value: "dentrite_hexagon",
          },
          {
            label: "fern_like_dentrite_hexagon",
            value: "fern_like_dentrite_hexagon",
          },
          {
            label: "column_square",
            value: "column_square",
          },
          {
            label: "singular_irregular",
            value: "singular_irregular",
            children: [
              {
                label: "simple_plate",
                value: "simple_plate",
              },
              {
                label: "simple_plate_with_branches",
                value: "simple_plate_with_branches",
              },
              {
                label: "deficient_hexagonal",
                value: "deficient_hexagonal",
              },
              {
                label: "deficient_hexagonal_with_branches",
                value: "deficient_hexagonal_with_branches",
              },
              {
                label: "radiated_fern_like_dentrite",
                value: "radiated_fern_like_dentrite",
              },
              {
                label: "with_branches_only",
                value: "with_branches_only",
              },
            ],
          },
          {
            label: "cloud_particle",
            value: "cloud_particle",
          },
        ],
      },
      {
        value: "multiple",
        label: "multiple",
        children: [
          {
            label: "combinations",
            value: "combinations",
          },
          {
            label: "double_plate",
            value: "double_plate",
          },
          {
            label: "multiple_columns_squares",
            value: "multiple_columns_squares",
          },
          {
            label: "multiple_irregulars",
            value: "multiple_irregulars",
            children: [
              {
                label: "multiple_simple_plates",
                value: "multiple_simple_plates",
              },
              {
                label: "multiple_plates_with_branches",
                value: "multiple_plates_with_branches",
              },
              {
                label: "multiple_deficient_hexagonals",
                value: "multiple_deficient_hexagonals",
              },
              {
                label: "multiple_deficient_hexagonals_with_branches",
                value: "multiple_deficient_hexagonals_with_branches",
              },
              {
                label: "multiple_radiated_fern_like_dentrites",
                value: "multiple_radiated_fern_like_dentrites",
              },
              {
                label: "multiple_branches",
                value: "multiple_branches",
              },
              {
                label: "multiple_deficient_with_crystals",
                value: "multiple_deficient_with_crystals",
              },
            ],
          },
        ],
      },
      {
        value: "no_crystal",
        label: "no_crystal",
      },
    ],
  },
  {
    id: "quality",
    type: "slider",
    label: "quality",
    isTranslatable: true,
    min: 0,
    max: 3,
    defaultValue: 2,
    step: 1,
    stepLabels: ["not_good", "soso", "average", "good"],
  },
  {
    id: "confidence",
    type: "slider",
    label: "confidence",
    isTranslatable: true,
    min: 0,
    max: 3,
    defaultValue: 2,
    step: 1,
    stepLabels: [
      "not_at_all_confident",
      "not_too_confident",
      "almost_confident",
      "100_percent_confident",
    ],
  },
];

const categories: Category[] = [
  {
    value: "single",
    label: "Single",
    outerColor: "#1abc9c",
    innerColor: "#1abc9c22",
  },
  {
    label: "microparticule",
    value: "microparticule",
    outerColor: "#3498db",
    innerColor: "#3498db22",
  },
  {
    label: "hexagon",
    value: "hexagon",
    outerColor: "#9b59b6",
    innerColor: "#9b59b622",
  },
  {
    label: "fan_like_hexagon",
    value: "fan_like_hexagon",
    outerColor: "#34495e",
    innerColor: "#34495e22",
  },
  {
    label: "dentrite_hexagon",
    value: "dentrite_hexagon",
    outerColor: "#f1c40f",
    innerColor: "#f1c40f22",
  },
  {
    label: "fern_like_dentrite_hexagon",
    value: "fern_like_dentrite_hexagon",
    outerColor: "#e67e22",
    innerColor: "#e67e2222",
  },
  {
    label: "column_square",
    value: "column_square",
    outerColor: "#e74c3c",
    innerColor: "#e74c3c22",
  },
  {
    label: "singular_irregular",
    value: "singular_irregular",
    outerColor: "#2ecc71",
    innerColor: "#2ecc7122",
  },
  {
    label: "simple_plate",
    value: "simple_plate",
    outerColor: "#2ecc71",
    innerColor: "#2ecc7122",
  },
  {
    label: "simple_plate_with_branches",
    value: "simple_plate_with_branches",
    outerColor: "#2ecc71",
    innerColor: "#2ecc7122",
  },
  {
    label: "deficient_hexagonal",
    value: "deficient_hexagonal",
    outerColor: "#2ecc71",
    innerColor: "#2ecc7122",
  },
  {
    label: "deficient_hexagonal_with_branches",
    value: "deficient_hexagonal_with_branches",
    outerColor: "#2ecc71",
    innerColor: "#2ecc7122",
  },
  {
    label: "radiated_fern_like_dentrite",
    value: "radiated_fern_like_dentrite",
    outerColor: "#2ecc71",
    innerColor: "#2ecc7122",
  },
  {
    label: "with_branches_only",
    value: "with_branches_only",
    outerColor: "#2ecc71",
    innerColor: "#2ecc7122",
  },
  {
    label: "cloud_particle",
    value: "cloud_particle",
    outerColor: "#f39c12",
    innerColor: "#f39c1222",
  },
  {
    value: "multiple",
    label: "multiple",
    outerColor: "#cd84f1",
    innerColor: "#cd84f122",
  },
  {
    label: "combinations",
    value: "combinations",
    outerColor: "#7d5fff",
    innerColor: "#7d5fff22",
  },
  {
    label: "double_plate",
    value: "double_plate",
    outerColor: "#32ff7e",
    innerColor: "#32ff7e22",
  },
  {
    label: "multiple_columns_squares",
    value: "multiple_columns_squares",
    outerColor: "#17c0eb",
    innerColor: "#17c0eb22",
  },
  {
    label: "multiple_irregulars",
    value: "multiple_irregulars",
    outerColor: "#a55eea",
    innerColor: "#a55eea22",
  },
  {
    label: "multiple_simple_plates",
    value: "multiple_simple_plates",
    outerColor: "#26de81",
    innerColor: "#26de8122",
  },
  {
    label: "multiple_plates_with_branches",
    value: "multiple_plates_with_branches",
    outerColor: "#4b7bec",
    innerColor: "#4b7bec22",
  },
  {
    label: "multiple_deficient_hexagonals",
    value: "multiple_deficient_hexagonals",
    outerColor: "#eb3b5a",
    innerColor: "#eb3b5a22",
  },
  {
    value: "multiple_deficient_hexagonals_with_branches",
    label: "multiple_deficient_hexagonals_with_branches",
    outerColor: "#d1d8e0",
    innerColor: "#d1d8e022",
  },
  {
    value: "multiple_radiated_fern_like_dentrites",
    label: "multiple_radiated_fern_like_dentrites",
    outerColor: "#d1d8e0",
    innerColor: "#d1d8e022",
  },
  {
    value: "multiple_branches",
    label: "multiple_branches",
    outerColor: "#d1d8e0",
    innerColor: "#d1d8e022",
  },
  {
    value: "multiple_deficient_with_crystals",
    label: "multiple_deficient_with_crystals",
    outerColor: "#d1d8e0",
    innerColor: "#d1d8e022",
  },
  {
    value: "no_crystal",
    label: "no_crystal",
    outerColor: "#d1d8e0",
    innerColor: "#d1d8e022",
  },
];

export const settings: Settings = {
  popup: {
    enabled: true,
    fields: fields,
  },
  category: {
    categories: categories,
    isTranslatable: true,
  }
};
