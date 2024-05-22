import React, { useContext, useRef, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import { StoreCtx } from "../context";
import Card from "./Card";
import "./resize.css";
import { BoxMutateHelper, SectionMutateHelper, ResizeHelper } from "../types";
import axios from "utils/Request";
import { serialize } from "../Setting/components/RichEditor";
import { getUrlParameter } from "utils/Device";
import { exportPDF } from "utils/Export";
import { Button } from "antd";

const BasicFunction = () => {
  const { state, onChangeState } = useContext(StoreCtx);

  const pdfRef = useRef<HTMLDivElement>(null);

  // 增删改某个模块中的box信息，但并非增删改模块
  const handleMutateBoxInSection: BoxMutateHelper = (id, item, op) => {
    let newSections;
    if (op === "add") {
      const boxId = new Date().getTime().toString();
      newSections = state.sections.map((sec) => {
        return sec.id === id
          ? {
              ...sec,
              boxes: [...sec.boxes, { ...item, id: boxId }],
            }
          : sec;
      });
      const params = item.src
        ? { src: item.src, content: null }
        : {
            content: item.content.map((item) => serialize(item)).join(""),
            src: null,
          };
      axios.post("/box/add", {
        ...item,
        ...params,
        id: boxId,
        sectionId: id,
      });
      onChangeState({ sections: newSections });
      return;
    }
    if (op === "delete") {
      newSections = state.sections.map((sec) => {
        return sec.id === id
          ? {
              ...sec,
              boxes: sec.boxes.filter((box) => box.id !== item.id),
            }
          : sec;
      });
      axios.get(`/box/delete?id=${item.id}`);
      onChangeState({ sections: newSections });
      return;
    }
    if (op === "update") {
      newSections = state.sections.map((sec) => {
        return sec?.id === id
          ? {
              ...sec,
              boxes: sec?.boxes?.map((child) => {
                return child?.id === item?.id ? item : child;
              }),
            }
          : sec;
      });
      axios.post("/box/update", {
        id: item.id,
        src: item.src ? item.src : null,
        initInfo: item.lastInfo,
        lastInfo: item.lastInfo,
      });
      onChangeState({ sections: newSections });
      return;
    }
  };

  // 增删改某个模块信息
  const handleMutateSection: SectionMutateHelper = (id, op) => {
    if (op === "add") {
      const secId = new Date().getTime().toString();
      const draftId = getUrlParameter("id");
      const newSec = {
        id: secId,
        draftId,
        type: "section",
        title: "fiona",
        titleStyle: "shrek",
        height: 200,
        width: 550,
        boxes: [],
      };
      const newSections = [...state.sections];
      newSections.splice(
        state.sections.findIndex((sec) => sec.id === id) + 1,
        0
      );
      axios.post("/section/add", {
        ...newSec,
      });
      onChangeState({ sections: newSections });
      return;
    }
    if (op === "delete") {
      const newSections = state.sections.filter((sec) => sec.id !== id);
      onChangeState({ sections: newSections });
      return;
    }
    if (op === "update") {
      return;
    }
  };

  const handleResize: ResizeHelper = (id, size) => {
    const newSections = state.sections.map((sec) =>
      sec.id === id ? { ...sec, height: size.height } : sec
    );
    onChangeState({ sections: newSections });
  };
  return (
    <>
      <Button
        onClick={() => {
          if (pdfRef.current) {
            exportPDF("test", pdfRef.current);
          }
        }}
      >
        pdf
      </Button>
      <div ref={pdfRef}>
        <ReactSortable
          list={state.sections}
          setList={(newList) => onChangeState({ sections: newList })}
          animation={150}
          handle=".handle"
          style={{ margin: "0 auto" }}
        >
          {state.sections.map((item) => (
            <Card
              key={item.id}
              item={item}
              onMutateBox={handleMutateBoxInSection}
              onMutateSection={handleMutateSection}
              onResize={handleResize}
            />
          ))}
        </ReactSortable>
      </div>
    </>
  );
};

export default BasicFunction;
