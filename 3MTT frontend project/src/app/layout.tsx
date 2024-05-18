import { ChakraProvider } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";

/**
 * Root layout component for the application.
 * Wraps the main content with a sidebar and a footer.
 * 
 * @param {ReactNode} children - The main content of the application.
 * @returns {JSX.Element} - JSX element representing the root layout.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* ChakraProvider to provide Chakra UI styles */}
        <ChakraProvider>
          {/* Sidebar component */}
          <Sidebar>
            {/* Main content */}
            {children}
          </Sidebar>
        </ChakraProvider>
      </body>
    </html>
  );
}
