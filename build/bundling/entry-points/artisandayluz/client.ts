import client from "@frontity/core/src/client";
import artisandayluz_theme_default from "artisandayluz-theme/src/index";
import frontity__wp_source_default from "@frontity/wp-source/src/index";
import frontity__tiny_router_default from "@frontity/tiny-router/src/index";
import frontity__html2react_default from "@frontity/html2react/src/index";
import aamodtgroup__frontity_contact_form_7_default from "@aamodtgroup/frontity-contact-form-7/src/index";

const packages = {
  artisandayluz_theme_default,
  frontity__wp_source_default,
  frontity__tiny_router_default,
  frontity__html2react_default,
  aamodtgroup__frontity_contact_form_7_default,
};

export default client({ packages });

if (module["hot"]) {
  module["hot"].accept(
    [
      "@frontity/core/src/client",
      "artisandayluz-theme/src/index",
      "@frontity/wp-source/src/index",
      "@frontity/tiny-router/src/index",
      "@frontity/html2react/src/index",
      "@aamodtgroup/frontity-contact-form-7/src/index",
    ],
    () => {
      const client = require("@frontity/core/src/client").default;
      const artisandayluz_theme_default = require("artisandayluz-theme/src/index").default;
      const frontity__wp_source_default = require("@frontity/wp-source/src/index").default;
      const frontity__tiny_router_default = require("@frontity/tiny-router/src/index").default;
      const frontity__html2react_default = require("@frontity/html2react/src/index").default;
      const aamodtgroup__frontity_contact_form_7_default = require("@aamodtgroup/frontity-contact-form-7/src/index").default;
      const packages = {
        artisandayluz_theme_default,
        frontity__wp_source_default,
        frontity__tiny_router_default,
        frontity__html2react_default,
        aamodtgroup__frontity_contact_form_7_default,
      };
      client({ packages });
    }
  );
}