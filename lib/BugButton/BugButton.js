import { __assign, __awaiter, __generator } from "tslib";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { bugButton, bugModal, categoryButton, closeButton, closeButtonBox, displayNone, reportButton, reportButtonDisabled, selectedCategoryButton, stack, stackElement, } from "./bugButtonCSS";
export var BugButton = function (_a) {
    var condition = _a.condition, categories = _a.categories, position = _a.position, url = _a.url, authToken = _a.authToken, data = _a.data;
    //states and params
    if (authToken === "") {
        console.error("no authtoken passed in");
    }
    if (url === "") {
        console.error("no report url passed in");
    }
    var _b = useState(false), showModal = _b[0], setShowModal = _b[1];
    var _c = useState(""), description = _c[0], setDescription = _c[1];
    var _d = useState(""), title = _d[0], setTitle = _d[1];
    var _e = useState(""), reporter = _e[0], setReporter = _e[1];
    var githubToken = "Bearer ".concat(authToken);
    var _f = useState(categories ? categories[0] : undefined), category = _f[0], setCategory = _f[1];
    // link to generated issue
    var _g = useState(undefined), linkToIssue = _g[0], setLinkToIssue = _g[1];
    //browser History
    var _h = useState([]), history = _h[0], setHistory = _h[1];
    var currentUrl = window.location.href;
    useEffect(function () {
        var temp = history;
        if (currentUrl !== history[history.length - 1]) {
            temp.push(currentUrl);
        }
        if (history.length > 5) {
            temp.slice(-5);
        }
        setHistory(temp);
    }, [currentUrl]);
    //data to report
    var assembleBody = function () {
        var res = [
            "## REPORTER: " + reporter,
            "## DESCRIPTION: " + description,
            "## HISTORY: \n\n",
        ]
            .concat(history)
            .concat(category ? ["## CATEGORY: ".concat(category)] : [])
            .concat(data
            ? data.map(function (d) { return "## ".concat(d.key.toUpperCase(), " :\n\n ").concat(d.value); })
            : [])
            .join("\r\n\n\n");
        return res;
    };
    var handleReportClick = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
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
            return [2 /*return*/];
        });
    }); };
    if (condition === true && authToken !== "" && url !== "") {
        return (React.createElement(React.Fragment, null,
            React.createElement("button", { style: __assign(__assign({}, bugButton), { position: "absolute", top: position === "top" ? 0 : undefined, right: position === "right" ? 0 : undefined, bottom: position === "bottom"
                        ? 0
                        : ["right", "left"].includes(position)
                            ? "50%"
                            : undefined, left: position === "left"
                        ? 0
                        : ["top", "bottom"].includes(position)
                            ? "50%"
                            : undefined, borderTopLeftRadius: ["bottom", "right"].includes(position)
                        ? "0.5rem"
                        : undefined, borderTopRightRadius: ["bottom", "left"].includes(position)
                        ? "0.5rem"
                        : undefined, borderBottomLeftRadius: ["right", "top"].includes(position)
                        ? "0.5rem"
                        : undefined, borderBottomRightRadius: ["left", "top"].includes(position)
                        ? "0.5rem"
                        : undefined }), onClick: function () { return setShowModal(true); } }, "BUG"),
            React.createElement("div", { style: showModal
                    ? __assign(__assign(__assign({}, bugModal), stack), { position: "absolute", top: position === "top" ? 0 : undefined, right: position === "right" ? 0 : undefined, bottom: position === "bottom" ? 0 : undefined, left: position === "left"
                            ? 0
                            : ["top", "bottom"].includes(position)
                                ? "50%"
                                : undefined }) : displayNone },
                React.createElement("div", { style: __assign(__assign({}, closeButtonBox), stackElement) },
                    React.createElement("button", { style: closeButton, onClick: function () { return setShowModal(false); } }, "X")),
                React.createElement("p", null, "Please describe the Bug"),
                React.createElement("div", { style: stackElement },
                    React.createElement("input", { placeholder: "title", value: title, onChange: function (e) {
                            setLinkToIssue(undefined);
                            setTitle(e.target.value);
                        } })),
                React.createElement("div", { style: stackElement },
                    React.createElement("input", { placeholder: "reporter", value: reporter, onChange: function (e) {
                            setLinkToIssue(undefined);
                            setReporter(e.target.value);
                        } })),
                categories && (React.createElement("div", { style: stackElement },
                    React.createElement("p", null, "Category:"),
                    React.createElement("section", { id: "categoryButtonGroup" }, categories.map(function (c, i) { return (React.createElement("button", { key: c, style: category === c
                            ? __assign(__assign({}, selectedCategoryButton), { borderTopLeftRadius: i === 0 ? "0.5rem" : undefined, borderTopRightRadius: i === categories.length - 1
                                    ? "0.5rem"
                                    : undefined, borderBottomLeftRadius: i === 0 ? "0.5rem" : undefined, borderBottomRightRadius: i === categories.length - 1
                                    ? "0.5rem"
                                    : undefined }) : __assign(__assign({}, categoryButton), { borderTopLeftRadius: i === 0 ? "0.5rem" : undefined, borderTopRightRadius: i === categories.length - 1
                                ? "0.5rem"
                                : undefined, borderBottomLeftRadius: i === 0 ? "0.5rem" : undefined, borderBottomRightRadius: i === categories.length - 1
                                ? "0.5rem"
                                : undefined }), onClick: function () { return setCategory(c); } }, c)); })))),
                React.createElement("div", { style: stackElement },
                    React.createElement("textarea", { name: "description", rows: 10, cols: 30, placeholder: "body", value: description, onChange: function (e) {
                            setLinkToIssue(undefined);
                            setDescription(e.target.value);
                        } })),
                React.createElement("p", { style: stackElement }, linkToIssue && (React.createElement("a", { target: "_blank", href: linkToIssue.url }, "Issue ".concat(linkToIssue.number, " created successfully")))),
                React.createElement("button", { style: description === "" || title === "" || reporter === ""
                        ? __assign(__assign({}, stackElement), reportButtonDisabled) : __assign(__assign({}, stackElement), reportButton), disabled: description === "" || title === "" || reporter === "", onClick: handleReportClick }, "Report"))));
    }
    else
        return React.createElement(React.Fragment, null);
};
//# sourceMappingURL=BugButton.js.map