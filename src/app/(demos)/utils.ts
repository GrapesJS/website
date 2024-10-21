const isDev = process.env.NODE_ENV !== "production";
export const GRAPESJS_VERSION = "0.22.1";
const gjsTag = isDev ? "rc" : GRAPESJS_VERSION;
export const GRAPESJS_SCRIPT = `https://unpkg.com/grapesjs@${gjsTag}`;
export const GRAPESJS_STYLE = `https://unpkg.com/grapesjs@${gjsTag}/dist/css/grapes.min.css`;

export const pluginDemo = (editor: any) => {
  // Add info command
  const mdlClass = "gjs-mdl-dialog-sm";
  const infoContainer = document.getElementById("info-panel")!;
  const modal = editor.Modal;
  const cmdm = editor.Commands;
  const pn = editor.Panels;

  cmdm.add("open-info", () => {
    const mdlDialog = document.querySelector(".gjs-mdl-dialog")!;
    mdlDialog.className += " " + mdlClass;
    infoContainer.style.display = "block";
    modal.setTitle("About this demo");
    modal.setContent(infoContainer);
    modal.open();
    modal.getModel().once("change:open", function () {
      mdlDialog.className = mdlDialog.className.replace(mdlClass, "");
    });
  });

  // Add info button
  const iconStyle = 'style="display: block; max-width: 22px"';
  pn.addButton("options", [
    {
      id: "view-info",
      label: `<svg ${iconStyle} viewBox="0 0 24 24">
          <path fill="currentColor" d="M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
      </svg>`,
      command: "open-info",
      attributes: {
        title: "About",
        "data-tooltip-pos": "bottom",
      },
    },
  ]);

  // Update canvas-clear command
  cmdm.add("canvas-clear", () => {
    if (confirm("Are you sure to clean the canvas?")) {
      editor.runCommand("core:canvas-clear");
      setTimeout(() => localStorage.clear(), 0);
    }
  });

  // Store and load events
  editor.on("storage:load", (e: any) => console.log("Loaded", e));
  editor.on("storage:store", (e: any) => console.log("Stored", e));

  editor.onReady(() => {
    const grapesjs = editor.config.grapesjs;

    // Show components outline
    pn.getButton("options", "sw-visibility").set({
      command: "core:component-outline",
      active: true,
    });

    // Show logo with the version
    const logoCont = document.querySelector(".gjs-logo-cont")!;
    const logoPanel = document.querySelector(".gjs-pn-commands")!;
    document.querySelector(
      ".gjs-logo-version"
    )!.innerHTML = `v${grapesjs.version}`;
    logoPanel.appendChild(logoCont);
  });
};
