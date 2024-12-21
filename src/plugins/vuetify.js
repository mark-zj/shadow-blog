/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
/*



* */
const darkTheme = {
  dark: true,
  colors: {
    background: '#121212',
    surface: '#212121',
    'surface-bright': '#ccbfd6',
    'surface-light': '#424242',
    'surface-variant': '#00adb5',
    'on-surface-variant': '#EEEEEE',
    primary: '#00adb5',
    'on-primary': '#EEEEEE',
    secondary: '#48A9A6',
    'on-secondary': '#EEEEEE',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    error: '#CF6679',
    //
    // primary: '#00adb5',
    // 'on-primary': '#eeeeeeee',
    // secondary: '#48A9A6',
    // 'on-secondary': '#eeeeeeee',
    //
    // // background: '#222831',
    // background: '#393e46',
    // 'on-background': '#eeeeee',
    // // VCard ,VFooter,
    // surface: '#222831',
    // 'on-surface': '#eeeeee',
    //
    // // Tooltip , SnakeBar
    // 'surface-variant': '#11999e',
    // // onTooltip ,
    // 'on-surface-variant': '#eeeeee',
    // // 'surface-bright': '',
    // // 'surface-light': '',
    //
    // info: '#2196F3',
    // 'on-info': '',
    // success: '#4CAF50',
    // 'on-success': '',
    // warning: '#FB8C00',
    // 'on-warning': '',
    // error: '#CF6679',
    // 'on-error': '',
  },
  variables: {
    'border-color': '#00adb5',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 1,
    'medium-emphasis-opacity': 0.70,
    'disabled-opacity': 0.50,
    'idle-opacity': 0.10,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.16,
    'dragged-opacity': 0.08,
    'theme-kbd': '#212529',
    'theme-on-kbd': '#FFFFFF',
    'theme-code': '#343434',
    'theme-on-code': '#000000'
  }
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'darkTheme',
    // defaultTheme: 'light',
    themes:{
      darkTheme
    }
  },
})
