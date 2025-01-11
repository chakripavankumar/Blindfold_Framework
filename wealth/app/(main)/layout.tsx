import React, { ReactNode } from "react";


interface MainLayoutProps {
  children: ReactNode; // Explicitly type the 'children' prop
}
const MainLayout = ({ children } :MainLayoutProps) => {
  return <div className="container mx-auto my-32">{children}</div>;
};

export default MainLayout;