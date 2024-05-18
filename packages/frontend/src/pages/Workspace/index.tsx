import { useState, useEffect } from "react";

import SortArea from "./SortArea";
import DragArea from "./Source/DragArea";
import Setting from "./Setting/main";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { jsx } from "slate-hyperscript";

import { SelectedField } from "./types";
import { StoreCtx } from "./context";
import styled from "styled-components";
import { getUrlParameter } from "utils/Device";
import axios from "utils/Request";
const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const LeftArea = styled.div`
  width: 300px;
  height: 100%;
`;

const CenterArea = styled.div`
  flex: 1;
  height: 100%;
  background-color: #f5f5f5;
  min-width: 700px;
`;

const ResumeArea = styled.div`
  min-width: 600px;
  max-width: 600px;
  margin: 0 auto;
  padding: 10px;
  height: 100%;
  background-color: #fff;
`;
const RightArea = styled.div`
  width: 400px;
  height: 100%;
`;

const deserialize = (el, markAttributes = {}) => {
  if (el.nodeType === Node.TEXT_NODE) {
    return jsx("text", markAttributes, el.textContent);
  } else if (el.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }

  const nodeAttributes = { ...markAttributes };

  // define attributes for text nodes
  switch (el.nodeName) {
    case "STRONG":
      nodeAttributes.bold = true;
      break;
    case "EM":
      nodeAttributes.italic = true;
      break;
    case "U":
      nodeAttributes.underline = true;
      break;
    case "CODE":
      nodeAttributes.code = true;
      break;
  }

  const children = Array.from(el.childNodes)
    .map((node) => deserialize(node, nodeAttributes))
    .flat();

  if (children.length === 0) {
    children.push(jsx("text", nodeAttributes, ""));
  }

  const align = el.style.textAlign;
  switch (el.nodeName) {
    case "BODY":
      return jsx("fragment", {}, children);
    case "BR":
      return "\n";
    case "H1":
      return jsx("element", { type: "heading-one", align }, children);
    case "H2":
      return jsx("element", { type: "heading-two", align }, children);
    case "BLOCKQUOTE":
      return jsx("element", { type: "quote", align }, children);
    case "P":
      return jsx("element", { type: "paragraph", align }, children);
    case "DIV":
      return jsx("element", { type: "paragraph", align }, children);
    case "UL":
      return jsx("element", { type: "bulleted-list", align }, children);
    case "LI":
      return jsx("element", { type: "list-item", align }, children);
    case "OL":
      return jsx("element", { type: "numbered-list", align }, children);
    default:
      return children;
  }
};
const transformHtml = (html: string) => {
  const document = new DOMParser().parseFromString(html, "text/html");
  return deserialize(document.body);
}


const Workspace = () => {
  const [state, setState] = useState({
    sections: [
      {
        id: "1",
        type: "section",
        title: "shrek",
        titleStyle: "shrek",
        height: 100,
        width: 550,
        boxes: [],
      },
      {
        id: "2",
        type: "section",
        title: "fiona",
        titleStyle: "shrek",
        height: 100,
        width: 550,
        boxes: [],
      },
      {
        id: "3",
        type: "section",
        title: "fiona",
        titleStyle: "shrek",
        height: 100,
        width: 550,
        boxes: [],
      },
    ],
    selectField: {},
    selectType: "resume",
  });

  useEffect(() => {
    const draftId = getUrlParameter("id");
    axios.get(`/draft/query?id=${draftId}`).then((data) => {
      const sections = data.sections.map((item: any) => {
        return {
          ...item,
          boxes: item.boxes.map((child: any) => {
            return {
              ...child,
              content: transformHtml(child.content),
            };
          })
        };
      });
      console.log(sections, "sections")
      setState((prev) => {
        return {
          ...prev,
          sections
        };
      });
    });
  }, []);

  const store = {
    state,
    onChangeState: (obj: SelectedField) => {
      setState((preState) => ({
        ...preState,
        ...obj,
      }));
    },
  };

  return (
    <Container>
      <StoreCtx.Provider value={store}>
        <DndProvider backend={HTML5Backend}>
          <LeftArea>
            <DragArea />
          </LeftArea>
          <CenterArea>
            <ResumeArea>
              <SortArea />
            </ResumeArea>
          </CenterArea>
        </DndProvider>
        <RightArea>
          <Setting />
        </RightArea>
      </StoreCtx.Provider>
    </Container>
  );
};

export default Workspace;
