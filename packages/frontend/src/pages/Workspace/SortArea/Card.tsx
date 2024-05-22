import { useRef, useMemo, useContext, SyntheticEvent } from "react";
import { Space, Image } from "antd";
import { useDrop, XYCoord } from "react-dnd";
import parse from "html-react-parser";

import styled from "styled-components";
import { MenuOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";

import { Rnd } from "react-rnd";
import { Resizable } from "react-resizable";
import "./resize.css";
import { StoreCtx } from "../context";

import { DragItem, Box, SectionProps } from "../types";
import { ItemTypes } from "../Source/ItemTypes";
import RecTitle from "./RecTitle";
import { serialize } from "../Setting/components/RichEditor";
import axios from "utils/Request";
import AvatarUploader from "../../../components/AvatarUploader";
const Wrap = styled.div`
  position: relative;
  margin-bottom: 10px;
  display: block;
`;

const IconWrap = styled(Space)`
  position: absolute;
  right: 5px;
  top: 5px;
  display: flex;
  font-size: 16px;
  z-index: 20;
`;

const CloseIcon = styled(CloseOutlined)`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 20;
`;
const Card = ({
  item,
  onMutateBox,
  onMutateSection,
  onResize,
}: SectionProps) => {
  const { id, width, height, boxes, name, showTitle } = item;
  const { state, onChangeState } = useContext(StoreCtx);
  const minHeight = useMemo(() => {
    const list = boxes.map((child: Box) =>
      child.lastInfo
        ? child.lastInfo.top + child.lastInfo.height
        : child.initInfo.top + child.initInfo.height
    );
    return Math.max(...list);
  }, [boxes]);
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop(
    () => ({
      accept: [ItemTypes.BOX],
      drop(item: DragItem, monitor) {
        const clientOffset = monitor.getSourceClientOffset() as XYCoord;
        const dropOffset = ref.current?.getBoundingClientRect() as DOMRect;
        const left = clientOffset.x - dropOffset.x;
        const top = clientOffset.y - dropOffset.y;

        const width = item?.type === "img" ? 100 : 150;
        const height = item?.type === "img" ? 150 : 30;
        const newItem = {
          ...item,
          initInfo: { left, top, width, height },
        };
        onMutateBox(id, newItem, "add");
      },
    }),
    [state, onChangeState]
  );
  drop(ref);
  return (
    <Resizable
      width={width}
      height={height}
      onResize={(e, { size }) => onResize(id, size)}
      onResizeStop={(e, { size }) => {
        axios.post("/section/update", {
          id,
          height: size.height,
        });
      }}
      handle={<span className="react-resizable-handle" />}
      minConstraints={[100, minHeight]}
    >
      <Wrap
        ref={ref}
        key={id}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          border: `${
            state.selectField?.id === id
              ? "1px solid rgba(2,119,251,1)"
              : "1px solid transparent"
          }`,
          background: `${state.selectField?.id === id ? "#F2F8FE" : ""}`,
          margin: "0 auto"
        }}
        onClick={(e) => {
          console.log(item, "当前点击");
          e.stopPropagation();
          onChangeState({ selectField: item, selectType: "box" });
        }}
      >
        {showTitle === "1" && (
          <RecTitle modTitleSize="16px" colorList={["#f4f7f6", "#4a8bd6"]}>
            {name || "模块名称"}
          </RecTitle>
        )}
        {state.selectField?.id === id && (
          <IconWrap>
            <PlusOutlined
              className="hover:cursor-pointer"
              onClick={() => onMutateSection(id, "add")}
            />
            <MenuOutlined className="handle hover:cursor-move" />
            <CloseOutlined
              className="hover:cursor-pointer"
              onClick={() => onMutateSection(id, "delete")}
            />
          </IconWrap>
        )}
        {boxes?.map((child: Box) => (
          <Rnd
            default={{
              x: child?.initInfo?.left,
              y: child?.initInfo?.top,
              width: child?.initInfo?.width,
              height: child?.initInfo?.height,
            }}
            {...(child.type === "img"
              ? {
                  lockAspectRatio: 2 / 3,
                }
              : {})}
            key={child?.id}
            onDragStop={(e, d) => {
              const rectInfo = (
                e.target as HTMLElement
              ).getBoundingClientRect();

              console.log(rectInfo, "rectInfo");
              console.log(d, "d");
              const lastInfo = {
                height: rectInfo.height - 1,
                width: rectInfo.width,
                left: d.x,
                top: d.y - 1,
              };
              onMutateBox(id, { ...child, lastInfo }, "update");
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              const lastInfo = {
                height: ref.offsetHeight - 1,
                width: ref.offsetWidth,
                left: position.x,
                top: position.y - 1,
              };
              onMutateBox(id, { ...child, lastInfo }, "update");
            }}
            bounds={"parent"}
            style={{
              lineHeight: "30px",
              textAlign: "center",
              cursor: "move",
              border: `${
                state.selectField?.id === child.id ? "1px dashed #ccc" : ""
              }`,
              background: `${
                state.selectField?.id === child.id ? "#fafafa" : ""
              }`,
            }}
            onClick={(e: SyntheticEvent) => {
              e.stopPropagation();
              console.log(child, "当前点击");
              onChangeState({ selectField: child, selectType: "box" });
            }}
          >
            <div>
              {state.selectField?.id === child.id && (
                <CloseIcon onClick={() => onMutateBox(id, child, "delete")} />
              )}
              {child.type === "img" ? (
                // <AvatarUploader
                //   onMutateBox={onMutateBox}
                //   id={id}
                //   child={child}
                // />
                <img
                  src={"https://picsum.photos/200/300"}
                  alt="avatar"
                  style={{
                    width: "100%",
                  }}
                  // preview={false}
                />
              ) : (
                // <Image
                //   src={child.src}
                //   style={{ width: "100%" }}
                //   preview={false}
                //   placeholder={true}
                //   onClick={(e: SyntheticEvent) => {
                //     e.preventDefault();
                //   }}
                // ></Image>
                <div>
                  {parse(child.content.map((item) => serialize(item)).join(""))}
                </div>
              )}
            </div>
            {/* <div
              dangerouslySetInnerHTML={{
                __html: child.content.map((item) => serialize(item)).join(""),
              }}
              className="absolute left-1 top-1 text-sm"
            ></div> */}
          </Rnd>
        ))}
      </Wrap>
    </Resizable>
  );
};

export default Card;
