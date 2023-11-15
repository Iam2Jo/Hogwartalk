"use client"
import { useServerInsertedHTML } from "next/navigation"
import React, { useState } from "react"
import { ServerStyleSheet, StyleSheetManager } from "styled-components"


export const Registry = ({ children }: { children: React.ReactNode }) => {
  const [sheet] = useState(() => new ServerStyleSheet())

  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement() // style 태그를 돔에 생성하기 위한 리엑트 엘리먼트들을 배열형태로 반환합니다.
    sheet.instance.clearTag()
    return <>{styles}</>
  })

  if (typeof document !== "undefined") {
    return <>{children}</>
  }

  return (
    <StyleSheetManager sheet={sheet.instance}>
        {children}
    </StyleSheetManager>
  )
}