import React from "react";
import PropTypes from "prop-types";

const Layout = ({ layout: Layout, children }) => {
  return <Layout>{children}</Layout>;
};

Layout.prototype = {
  layout: PropTypes.object.isRequired,
};

export default Layout;
