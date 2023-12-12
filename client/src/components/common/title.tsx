import React, { ReactNode } from "react";

type TitleProps = {
  children: ReactNode
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <div className="title">
      {children}
    </div>
  )
}

export default Title