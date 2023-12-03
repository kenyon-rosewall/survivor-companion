import React, { ReactNode } from "react";

type SubtitleProps = {
  children: ReactNode
}

const Subtitle: React.FC<SubtitleProps> = ({ children }) => {
  return (
    <div className="subtitle">
      {children}
    </div>
  )
}

export default Subtitle