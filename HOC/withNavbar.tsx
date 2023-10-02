// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React from "react";
import AdminNavbar from "../src/components/NavBar";
import { Box, Portal } from "@chakra-ui/react";

const withNavbar = (WrappedComponent) => {
  return (props) => {
    return (
      <React.Fragment>
        <Box
          float="left"
          minHeight="100vh"
          height="100%"
          overflow="auto"
          position="relative"
          maxHeight="100%"
          w={{ base: "100%", xl: "calc( 100% - 290px )" }}
          maxWidth={{ base: "100%", xl: "calc( 100% - 290px )" }}
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          <Portal>
            <Box>
              <AdminNavbar
                brandText="Naya Game Studio"
                fixed={true}
                logoText="hii"
                secondary={true}
                onOpen={() => {}}
              />
            </Box>
          </Portal>
          <WrappedComponent {...props} />
        </Box>
      </React.Fragment>
    );
  };
};

export default withNavbar;
