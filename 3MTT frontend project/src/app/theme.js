import { extendTheme } from "@chakra-ui/react";
const theme = extendTheme({
    colors:{
        brand:{
            50:'#f9fafb',
            100:'#f4f6f8',
            200:'#e5eaf0',
            300:'#d0d9e3',
            400:'#afb9c9',
            500:'#8a9bbf',
            600:'#6b7aae',
            700:'#4f5a98',
            800:'#3c4782',
            900:'#273663',
        },
    },
    fonts:{
        body:"Roboto, sans-serif",
        heading:"Montserrat, sans-serif",
    }
});
export default theme;