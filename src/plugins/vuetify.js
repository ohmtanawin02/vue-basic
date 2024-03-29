/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */


import { VBtn } from 'vuetify/components/VBtn'
import { VDataTable } from 'vuetify/labs/VDataTable'
import { VDatePicker } from 'vuetify/labs/VDatePicker'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Composables
import { createVuetify } from 'vuetify'

// Css
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

const customColorTheme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#0280D9',
    secondary: '#013458',
    error: '#D94302',
    info: '#0280D9',
    success: '#05B837',
    warning: '#FFAC09',
    gray: '#E3E6E8',
    blue: '#F0F9FF',
    disable: '#668099'
  }
}

const customBtnOutlined = {
  height: '40',
  rounded: 'lg',
  color: 'primary',
  variant: 'outlined',
  class: 'bg-white text-capitalize'
}

const customTextField = {
  rounded: 'lg',
  density: 'compact',
  variant: 'outlined',
  hideDetails: 'auto',
  bgColor: 'white',
  color: 'primary'
}

const customSelect = {
  density: 'compact',
  variant: 'outlined',
  bgColor: 'white',
  color: 'primary',
  height: 40,
  hideDetails: true,
  centerAffix: true
}



// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  aliases: {
    VBtnExport: VBtn,
    VBtnImport: VBtn,
    VBtnPrinter: VBtn,
    VBtnCreate: VBtn,
    VBtnEdit: VBtn,
    VBtnFilter: VBtn,
    VBtnSave: VBtn,
    VBtnCancel: VBtn,
    VTextFieldSearch: components.VTextField,
    VSelectPage: components.VSelect,
    VDatePicker: VDatePicker
  },
  defaults: {
    VCard: {
      rounded: 'lg'
    },
    VBtnExport: {
      ...customBtnOutlined,
      prependIcon: 'mdi-tray-arrow-up',
      text: 'Export'
    },
    VBtnImport: {
      ...customBtnOutlined,
      prependIcon: 'mdi-tray-arrow-down',
      text: 'Import'
    },
    VBtnPrinter: {
      ...customBtnOutlined,
      prependIcon: 'mdi-printer',
      text: 'Print'
    },
    VBtnFilter: {
      ...customBtnOutlined,
      prependIcon: 'mdi-filter-variant'
    },
    VBtnCreate: {
      ...customBtnOutlined,
      variant: 'flat',
      prependIcon: 'mdi-plus'
    },
    VBtnEdit: {
      ...customBtnOutlined,
      color: 'warning',
      text: 'Edit'
    },
    VBtn: {
      ...customBtnOutlined
    },
    VBtnSave: {
      ...customBtnOutlined,
      variant: 'flat',
      width: 120,
      text: 'Save'
    },
    VBtnCancel: {
      ...customBtnOutlined,
      text: 'Cancel'
    },
    VTextFieldSearch: {
      ...customTextField,
      hideDetails: true,
      type: 'text',
      placeholder: 'Search',
      appendInnerIcon: 'mdi-magnify',
      style: [{ width: '320px' }]
    },
    VTextField: {
      ...customTextField,
      hideDetails: 'auto'
    },
    VAutocomplete: {
      rounded: 'lg',
      density: 'compact',
      variant: 'outlined',
      hideDetails: 'auto',
      bgColor: 'white',
      color: 'primary'
    },
    VChip: {
      variant: 'outlined'
    },
    VSelect: {
      ...customSelect,
      rounded: 'lg',
      style: { 'min-width': '140px' }
    },
    VSelectPage: {
      ...customSelect,
      rounded: true,
      style: { 'max-width': '100px' }
    },
    VTextarea: {
      rounded: 'lg',
      density: 'compact',
      variant: 'outlined',
      hideDetails: 'auto',
      bgColor: 'white',
      color: 'primary'
    },
    VCheckbox: {
      color: 'primary',
      density: 'compact',
      hideDetails: true
    },
    VCombobox: {
      density: 'compact',
      variant: 'outlined',
      hideDetails: true
    },
    VMenu: {
      VDivider: {
        color: 'primary'
      }
    },
    VDatePicker: {
      hideHeader: true
    }
  },
  components: {
    ...components,
    VDataTable
  },
  directives,
  theme: {
    defaultTheme: 'customColorTheme',
    themes: {
      customColorTheme
    }
  }
})
