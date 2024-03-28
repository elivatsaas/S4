import React from "react";

const sizes = {
  xs: "text-[25px] font-normal md:text-[23px] sm:text-[21px]",
  lg: "text-[120px] font-normal md:text-5xl",
  s: "text-3xl font-normal md:text-[28px] sm:text-[26px]",
  md: "text-[100px] font-normal md:text-5xl",
};

const Text = ({ children, className = "", as, size = "s", ...restProps }) => {
  const Component = as || "p";

  return (
    <Component className={`text-black-900 font-playfairdisplay ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Text };
