/**
 * Field in the popup
 *
 * @interface BaseField
 * @property {string} id - Field id
 * @property {string} label - Field label
 * @property {boolean} isTranslatable - Field is translatable (translations are defined in `src/messages` folder)
 * @property {boolean} required - Field is required
 */
export interface BaseField {
  id: string;
  label: string;
  isTranslatable: boolean;
  required?: boolean;
}

/**
 * Slider field in the popup
 *
 * @interface FieldSlider
 * @extends BaseField
 * @property {string} type - Field type
 * @property {number} min - Minimum value
 * @property {number} max - Maximum value
 * @property {number} step - Step value
 * @property {number} defaultValue - Default value
 * @property {string[]} stepLabels - Step labels (translatable)
 */
export interface FieldSlider extends BaseField {
  type: "slider";
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  stepLabels?: string[];
}

/**
 * Textarea field in the popup
 *
 * @interface FieldTextarea
 * @extends BaseField
 * @property {string} type - Field type
 * @property {string} placeholder - Field placeholder (translatable)
 * @property {string} defaultValue - Default value
 * @property {string} fieldType - Field type
 */
export interface FieldTextarea extends BaseField {
  type: "textarea";
  placeholder?: string;
  defaultValue?: string;
}

/**
 * Input field in the popup
 *
 * @interface FieldInput
 * @extends BaseField
 * @property {string} type - Field type
 * @property {string} fieldType - Field type
 * @property {string} placeholder - Field placeholder (translatable)
 */
export interface FieldInput extends BaseField {
  type: "input";
  fieldType: "text" | "number" | "email" | "password";
  placeholder?: string;
  defaultValue?: string;
}

/**
 * Select option field in the popup
 *
 * @interface FieldSelectOption
 * @property {string} value - Option value
 * @property {string} label - Option label (translatable)
 * @property {FieldSelectOption[]} children - Children options
 */
export interface FieldSelectOption {
  value: string;
  label: string;
  children?: FieldSelectOption[];
}

/**
 * Select field in the popup
 *
 * @interface FieldSelect
 * @extends BaseField
 * @property {string} type - Field type
 * @property {FieldSelectOption[]} options - Options
 * @property {string} selectLabel - Select label (translatable)
 * @property {string} emptyLabel - Empty label (translatable)
 * @property {string} searchLabel - Search label (translatable)
 * @property {string} defaultValue - Default value
 * @property {boolean} useParentAsGroup - Use parent as group (if false, parent options can be selected)
 */
export interface FieldSelect extends BaseField {
  type: "select";
  options: FieldSelectOption[];
  selectLabel?: string;
  emptyLabel?: string;
  searchLabel?: string;
  defaultValue?: string;
  useParentAsGroup?: boolean;
}

/**
 * Field in the popup
 *
 * @type {Field}
 */
export type Field = FieldSlider | FieldSelect | FieldTextarea | FieldInput;

export interface PopupSettings {
  enabled: boolean;
  fields: Field[];
}

/**
 * Category
 * 
 * @interface Category
 * @property {string} value - Category value
 * @property {string} label - Category label (translatable)
 * @property {string} outerColor - Outer color
 * @property {string} innerColor - Inner color
 */
export interface Category {
  value: string;
  label: string;
  outerColor: string;
  innerColor: string;
}

export interface CategorySettings {
  categories: Category[];
  isTranslatable: boolean;
}

export interface Settings {
  popup: PopupSettings;
  category: CategorySettings;
}

export interface Annotation {
  id: string;
  value: any;
}

export type Annotations = Annotation[];
