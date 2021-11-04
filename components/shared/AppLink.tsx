import React from "react";
import Link from "next/link";

interface Props {
   children?: React.ReactNode;
   text?: string;
   href?: string;
   options?: object;
   style?: object;
}

const defStyle = {
   textDecoration: "none",
   color: "black",
}

const AppLink = ({href, text, children, style, options}: Props) => {
   return (
      <Link href={href}>
         <a {...options} style={{...defStyle, ...style}}>{children ?? text}</a>
      </Link>
   )
}

export default  AppLink;