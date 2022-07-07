import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  bugButton,
  bugModal,
  categoryButton,
  closeButton,
  closeButtonBox,
  displayNone,
  reportButton,
  reportButtonDisabled,
  selectedCategoryButton,
  stack,
  stackElement,
} from "./bugButtonCSS";

interface DataPoint {
  key: string;
  value: string;
}

export const BugButton = ({
  condition,
  categories,
  position,
  url,
  authToken,
  data,
}: {
  condition: boolean;
  url: string;
  authToken: string;
  position: "top" | "right" | "left" | "bottom";
  data?: DataPoint[];
  categories?: string[];
}): JSX.Element => {
  //states and params
  if (authToken === "") {
    console.error("no authtoken passed in");
  }
  if (url === "") {
    console.error("no report url passed in");
  }
  const [showModal, setShowModal] = useState<boolean>(false);

  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [reporter, setReporter] = useState<string>("");
  const githubToken = `Bearer ${authToken}`;
  const [category, setCategory] = useState<string | undefined>(
    categories ? categories[0] : undefined
  );

  // link to generated issue
  const [linkToIssue, setLinkToIssue] = useState<
    { url: string; number: number } | undefined
  >(undefined);

  //browser History
  const [history, setHistory] = useState<string[]>([]);
  const currentUrl = window.location.href;
  useEffect(() => {
    const temp = history;

    if (currentUrl !== history[history.length - 1]) {
      temp.push(currentUrl);
    }

    if (history.length > 5) {
      temp.slice(-5);
    }
    setHistory(temp);
  }, [currentUrl]);

  //data to report
  const assembleBody = () => {
    const res = [
      "## REPORTER: " + reporter,
      "## DESCRIPTION: " + description,
      "## HISTORY: \n\n",
    ]
      .concat(history)
      .concat(category ? [`## CATEGORY: ${category}`] : [])

      .concat(
        data
          ? data.map((d) => `## ${d.key.toUpperCase()} :\n\n ${d.value}`)
          : []
      )
      .join("\r\n\n\n");
    return res;
  };
  const handleReportClick = async () => {
    axios({
      method: "post",
      url: url,
      headers: {
        Authorization: githubToken,
      },
      data: {
        title: title,
        body: assembleBody(),
      },
    })
      .then(function (response) {
        setLinkToIssue({
          url: response.data.html_url,
          number: response.data.number,
        });
        setDescription("");
        setTitle("");
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  if (condition === true && authToken !== "" && url !== "") {
    return (
      <>
        {/* button */}
        <button
          style={{
            ...bugButton,
            position: "absolute",
            top: position === "top" ? 0 : undefined,
            right: position === "right" ? 0 : undefined,
            bottom:
              position === "bottom"
                ? 0
                : ["right", "left"].includes(position)
                ? "50%"
                : undefined,
            left:
              position === "left"
                ? 0
                : ["top", "bottom"].includes(position)
                ? "50%"
                : undefined,

            borderTopLeftRadius: ["bottom", "right"].includes(position)
              ? "0.5rem"
              : undefined,
            borderTopRightRadius: ["bottom", "left"].includes(position)
              ? "0.5rem"
              : undefined,
            borderBottomLeftRadius: ["right", "top"].includes(position)
              ? "0.5rem"
              : undefined,
            borderBottomRightRadius: ["left", "top"].includes(position)
              ? "0.5rem"
              : undefined,
          }}
          onClick={() => setShowModal(true)}
        >
          BUG
        </button>
        {/* modal */}
        <div
          style={
            showModal
              ? {
                  ...bugModal,
                  ...stack,
                  position: "absolute",
                  top: position === "top" ? 0 : undefined,
                  right: position === "right" ? 0 : undefined,
                  bottom: position === "bottom" ? 0 : undefined,
                  left:
                    position === "left"
                      ? 0
                      : ["top", "bottom"].includes(position)
                      ? "50%"
                      : undefined,
                }
              : displayNone
          }
        >
          {/* closeButton */}
          <div style={{ ...closeButtonBox, ...stackElement }}>
            <button style={closeButton} onClick={() => setShowModal(false)}>
              X
            </button>
          </div>
          <p>Please describe the Bug</p>
          {/* title */}
          <div style={stackElement}>
            <input
              placeholder="title"
              value={title}
              onChange={(e) => {
                setLinkToIssue(undefined);
                setTitle(e.target.value);
              }}
            />
          </div>
          {/* reporter */}
          <div style={stackElement}>
            <input
              placeholder="reporter"
              value={reporter}
              onChange={(e) => {
                setLinkToIssue(undefined);
                setReporter(e.target.value);
              }}
            />
          </div>
          {/* category choice */}
          {categories && (
            <div style={stackElement}>
              <p>Category:</p>
              <section id="categoryButtonGroup">
                {categories.map((c, i) => (
                  <button
                    key={c}
                    style={
                      category === c
                        ? {
                            ...selectedCategoryButton,
                            borderTopLeftRadius: i === 0 ? "0.5rem" : undefined,
                            borderTopRightRadius:
                              i === categories.length - 1
                                ? "0.5rem"
                                : undefined,
                            borderBottomLeftRadius:
                              i === 0 ? "0.5rem" : undefined,
                            borderBottomRightRadius:
                              i === categories.length - 1
                                ? "0.5rem"
                                : undefined,
                          }
                        : {
                            ...categoryButton,
                            borderTopLeftRadius: i === 0 ? "0.5rem" : undefined,
                            borderTopRightRadius:
                              i === categories.length - 1
                                ? "0.5rem"
                                : undefined,
                            borderBottomLeftRadius:
                              i === 0 ? "0.5rem" : undefined,
                            borderBottomRightRadius:
                              i === categories.length - 1
                                ? "0.5rem"
                                : undefined,
                          }
                    }
                    onClick={() => setCategory(c)}
                  >
                    {c}
                  </button>
                ))}
              </section>
            </div>
          )}
          {/* description */}
          <div style={stackElement}>
            <textarea
              name="description"
              rows={10}
              cols={30}
              placeholder="body"
              value={description}
              onChange={(e) => {
                setLinkToIssue(undefined);
                setDescription(e.target.value);
              }}
            />
          </div>
          {/* link to generated issue */}
          <p style={stackElement}>
            {linkToIssue && (
              <a target="_blank" href={linkToIssue.url}>
                {`Issue ${linkToIssue.number} created successfully`}
              </a>
            )}
          </p>
          {/* submit button */}
          <button
            style={
              description === "" || title === "" || reporter === ""
                ? { ...stackElement, ...reportButtonDisabled }
                : { ...stackElement, ...reportButton }
            }
            disabled={description === "" || title === "" || reporter === ""}
            onClick={handleReportClick}
          >
            Report
          </button>
        </div>
      </>
    );
  } else return <></>;
};
