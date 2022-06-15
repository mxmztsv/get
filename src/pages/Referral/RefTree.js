import { useState } from "react";
import downArrow from "../../assets/img/down-arrow.svg";
import useWindowDimensions from "../../hooks/useWindow";
import { fetchRefs, objToArray } from "./helpers";

export const RefTree = (props) => {
  let { curLvlRefs } = props;
  console.log("CurllvlRefs in tree: ", curLvlRefs);

  return (
    <>
      <table className="ref-tree-body brd-top">
        <thead>
          <tr className="ref-tree-header-container">
            <th className="header-3" style={{ justifySelf: "start" }}>
              Level
            </th>
            <th className="header-3">Name</th>
            <th className="header-3">Network</th>
            <th className="header-3">USD</th>
          </tr>
        </thead>
        <tbody>
          {curLvlRefs ? (
            curLvlRefs.map((elem) => {
              console.log("reftreehead elem:", elem);
              return <RefTreeRow curLvlRef={elem} key={elem.id} lvl={1} />;
            })
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </>
  );
};

const RefTreeRow = (props) => {
  let { curLvlRef, lvl, index } = props;

  const { width } = useWindowDimensions();
  const [showSub, setShowSub] = useState(false);
  const [subLvlRefs, setSubLvlRefs] = useState([]);

  function onRowClick() {
    // getting refs for current
    fetchRefs(curLvlRef.id).then((subLayerRefs) => {
      setSubLvlRefs(objToArray(subLayerRefs));
    });

    setShowSub(true);
  }

  function getPadding(lvl) {
    if (width > 815) {
      return lvl * 9;
    } else {
      return lvl * 5;
    }
  }

  return (
    <>
      <tr
        className={`ref-tree-row-container ${
          curLvlRef.refsNum !== "0" ? "ref-tree-row-h" : ""
        } ${width < 815 ? "brd-btm" : ""}`}
        onClick={() => {
          if (curLvlRef.refsNum !== "0") {
            onRowClick();
            setShowSub(!showSub);
          }
        }}
        style={{ cursor: `${curLvlRef.refsNum === "0" ? "auto" : "pointer"}` }}
      >
        <td
          className="ref-tree-col level-container"
          style={{
            paddingLeft: `${`${getPadding(lvl)}px`}`,
          }}
        >
          {lvl > 1 ? (
            index === 0 ? (
              <img src={downArrow} alt="" />
            ) : (
              <div style={{ height: "1px", width: "10px" }}></div>
            )
          ) : (
            <></>
          )}
          {lvl}
        </td>
        <td className="ref-tree-col grey-text">{curLvlRef.name}</td>
        <td className="ref-tree-col ref-tree-num">{curLvlRef.network}</td>
        <td className="ref-tree-col ref-tree-num yellow-text">
          {curLvlRef.amount}
        </td>
        {curLvlRef.refsNum !== "0" && width > 815 ? (
          <td className="ref-arrow-container">
            <img
              className={`tree-arrow ${showSub ? "reverse-arrow" : ""}`}
              src={require("../../assets/img/tree-arrow.svg").default}
              alt=""
            />
          </td>
        ) : (
          <>
            <td className="ref-arrow-container"></td>
          </>
        )}
      </tr>
      {showSub ? (
        <>
          {subLvlRefs.map((subRef, index) => {
            console.log("subref in map:", subRef);
            return (
              <RefTreeRow
                curLvlRef={subRef}
                key={subRef.id}
                lvl={lvl + 1}
                index={index}
              />
            );
          })}
        </>
      ) : (
        <></>
      )}
    </>
  );
};
