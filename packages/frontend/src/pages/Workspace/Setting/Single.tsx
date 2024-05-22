import React, { useContext } from "react";
import Text from "./components/Text";
import Section from "./components/Section";
import { StoreCtx } from "../context";
const getComponent = (type: string) => {
    switch (type) {
        case "editor":
            return <Text />;
        case "section":
            return <Section />;
        default:
            return <>default</>;
    }
}
const Single = () => {
    const { state, onChangeState } = useContext(StoreCtx);
    return <div>{getComponent(state.selectField.type)}</div>;
}

export default Single;