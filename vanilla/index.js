function createSearchForm(containerId) {
  const LARGE_WIDTH = 1024;
  const MEDIUM_WIDTH = 768;
  const SMALL_WIDTH = 440;

  function recalcWidth(node) {
    const nodeWidth = node.clientWidth;

    if (nodeWidth < SMALL_WIDTH) {
      node.classList.remove("small");
      node.classList.remove("medium");

      node.classList.add("extra-small");

      return;
    }

    if (nodeWidth < MEDIUM_WIDTH) {
      node.classList.remove("extra-small");
      node.classList.remove("medium");

      node.classList.add("small");

      return;
    }

    if (nodeWidth < LARGE_WIDTH) {
      node.classList.remove("extra-small");
      node.classList.remove("small");

      node.classList.add("medium");

      return;
    }

    node.classList.remove("extra-small");
    node.classList.remove("small");
    node.classList.remove("medium");
  }

  function createNode(tagName, attributes, children) {
    const node = document.createElement(tagName);

    const attributesKeys = Object.keys(attributes);

    for (let i = 0; i < attributesKeys.length; i++) {
      const attribute = attributesKeys[i];

      node[attribute] = attributes[attribute];
    }

    if (children) {
      for (let i = 0; i < children.length; i++) {
        const child = children[i];

        if (typeof child === "string") {
          const textNode = document.createTextNode(child);
          node.appendChild(textNode);
        }

        if (typeof child === "object") {
          node.appendChild(child);
        }
      }
    }

    return node;
  }

  function createStyle(selector, properties) {
    let propertiesString = "";

    const propertiesKeys = Object.keys(properties);

    for (let j = 0; j < propertiesKeys.length; j++) {
      const property = propertiesKeys[j];

      propertiesString += property + ":" + properties[property] + ";";
    }

    return selector + "{" + propertiesString + "}";
  }

  function createStyleList(complexSelector, properties) {
    const selectors = complexSelector.split(",");

    let styleList = [];

    for (let i = 0; i < selectors.length; i++) {
      styleList.push(createStyle(selectors[i], properties));
    }

    return styleList;
  }

  const visuallyHiddenStyle = createStyleList(".visually-hidden", {
    clip: " rect(0 0 0 0)",
    "clip-path": "inset(50%)",
    height: "1px",
    overflow: "hidden",
    position: "absolute",
    "white-space": "nowrap",
    width: "1px",
  });

  const boxSizingStyle = createStyleList(
    ".search-form,.search-form::after,.search-form::before,.search-form *,.search-form *::after,.search-form *::before",
    { "box-sizing": "border-box" }
  );

  const searchFormStyle = createStyleList(".search-form", {
    display: "flex",
    "flex-wrap": "wrap",
    width: "100%",
    padding: "5px 10px",
    "background-color": "#4a90e2",
    color: "#ffffff",
    "font-family": '"Open Sans", sans-serif',
  });

  const headerStyle = createStyleList(".search-form-header", {
    width: "100%",
    padding: "10px",
    "font-size": "24px",
    "font-style": "normal",
    "font-weight": "600",
    "line-height": "1.2",
    "letter-spacing": "0px",
    "text-align": "left",
  });

  const descriptionStyle = createStyleList(".search-form-description", {
    width: "25%",
    margin: "0",
    padding: "10px",
    "font-size": "10px",
    "font-style": "normal",
    "font-weight": "600",
    "line-height": "1.2",
    "letter-spacing": "0px",
    "text-align": "left",
  });

  const inputContainerStyle = createStyleList(".search-form-input-container", {
    width: "25%",
    padding: "10px",
  });

  const inputStyle = createStyleList(".search-form-input", {
    display: "flex",
    "align-items": "center",
    width: "100%",
    height: "40px",
    padding: "0 10px",
    border: "0",
    "border-radius": "2px",
    "font-size": "14px",
    "font-style": "normal",
    "font-weight": "400",
    "line-height": "1.2",
    "letter-spacing": "0px",
    "text-align": "left",
  });

  const buttonContainerStyle = createStyleList(
    ".search-form-button-container",
    {
      width: "25%",
      padding: "10px",
    }
  );

  const searchButtonStyle = createStyleList(".search-form-button", {
    width: "100%",
    height: "40px",
    border: "0",
    "border-radius": "2px",
    background: "#f5a623",
    "box-shadow": "inset 0px -2px 0px rgba(0, 0, 0, 0.1)",
    color: "#ffffff",
    "font-size": "20px",
    "font-style": "normal",
    "font-weight": "400",
    "line-height": "1",
    "letter-spacing": "1.1px",
    "text-align": "center",
  });

  const controlsMediumStyle = createStyleList(
    ".medium .search-form-input-container,.medium .search-form-button-container",
    {
      width: "calc(100% / 3)",
    }
  );

  const descriptionMediumStyle = createStyleList(
    ".medium .search-form-description",
    {
      width: "100%",
    }
  );

  const headerSmallStyle = createStyleList(".small .search-form-header", {
    "font-size": "18px",
  });

  const inputContainerSmallStyle = createStyleList(
    ".small .search-form-input-container",
    {
      width: "50%",
    }
  );

  const descriptionAndButtonSmallStyle = createStyleList(
    ".small .search-form-description,.small .search-form-button-container",
    {
      width: "100%",
    }
  );

  const headerExtraSmallStyle = createStyleList(
    ".extra-small .search-form-header",
    {
      "font-size": "18px",
    }
  );

  const descriptionAndControlsExtraSmallStyle = createStyleList(
    ".extra-small .search-form-description,.extra-small .search-form-input-container,.extra-small .search-form-button-container",
    {
      width: "100%",
    }
  );

  const descriptionExtraSmallStyle = createStyleList(
    ".extra-small .search-form-description",
    {
      order: "1",
    }
  );

  const allStyles = [
    visuallyHiddenStyle,
    boxSizingStyle,
    searchFormStyle,
    headerStyle,
    descriptionStyle,
    inputContainerStyle,
    inputStyle,
    buttonContainerStyle,
    searchButtonStyle,
    controlsMediumStyle,
    descriptionMediumStyle,
    headerSmallStyle,
    inputContainerSmallStyle,
    descriptionAndButtonSmallStyle,
    headerExtraSmallStyle,
    descriptionAndControlsExtraSmallStyle,
    descriptionExtraSmallStyle,
  ];

  function createSearchFormStyles(namespace) {
    let mergedStyles = "";

    for (let i = 0; i < allStyles.length; i++) {
      for (let j = 0; j < allStyles[i].length; j++) {
        mergedStyles += namespace + " " + allStyles[i][j];
      }
    }

    return mergedStyles;
  }

  function createSearchFormNode() {
    const searchFormHeader = createNode(
      "header",
      { className: "search-form-header" },
      ["Where does it come from? Why do we use it?"]
    );

    const searchFormDescription = createNode(
      "p",
      { className: "search-form-description" },
      [
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      ]
    );

    const departDatelabel = createNode(
      "label",
      {
        for: "departDate",
        className: "visually-hidden",
      },
      ["Depart date"]
    );

    const departDateInput = createNode("input", {
      id: "departDate",
      name: "departDate",
      type: "text",
      className: "search-form-input",
      placeholder: "Depart date",
    });

    const departDateInputContainer = createNode(
      "div",
      { className: "search-form-input-container" },
      [departDatelabel, departDateInput]
    );

    const returnDatelabel = createNode(
      "label",
      {
        for: "returnDate",
        className: "visually-hidden",
      },
      ["Return date"]
    );

    const returnDateInput = createNode("input", {
      id: "returnDate",
      name: "returnDate",
      type: "text",
      className: "search-form-input",
      placeholder: "Return date",
    });

    const returnDateInputContainer = createNode(
      "div",
      { className: "search-form-input-container" },
      [returnDatelabel, returnDateInput]
    );

    const searchFormButton = createNode(
      "button",
      {
        id: "searchButton",
        name: "searchButton",
        type: "submit",
        className: "search-form-button",
      },
      ["SEARCH"]
    );

    const searchFormButtonContainer = createNode(
      "div",
      { className: "search-form-button-container" },
      [searchFormButton]
    );

    return createNode("form", { id: "searchForm", className: "search-form" }, [
      searchFormHeader,
      searchFormDescription,
      departDateInputContainer,
      returnDateInputContainer,
      searchFormButtonContainer,
    ]);
  }

  return function () {
    const style = document.createElement("style");

    style.innerText = createSearchFormStyles("#" + containerId);

    document.head.appendChild(style);

    const searchForm = createSearchFormNode();

    document.getElementById(containerId).appendChild(searchForm);

    recalcWidth(searchForm);

    window.addEventListener("resize", function () {
      recalcWidth(searchForm);
    });
  };
}

function initSearchForm(containerId) {
  return createSearchForm(containerId)();
}
