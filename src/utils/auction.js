// import React from "react";

// const displayFiles = (files) =>
//   files.map((file) => (
//     <li key={file.path}>
//       {file.path} - {file.size} bytes
//     </li>
//   ));

// export { displayFiles };
// const auctionInitialState = {
//   open: false,
//   name: "",
//   initialBid: 0,
//   condition: "",
//   description: "",
//   file: [],
// };
// const enhance = compose(
//   withState("open", "setOpen", initialState.open),
//   withState("name", "setName", initialState.name),
//   withState("initialBid", "setInitialBid", initialState.initialBid),
//   withState("condition", "setCondition", initialState.condition),
//   withState("description", "setDescription", initialState.description),
//   withState("file", "setFile", initialState.file),
//   withHandlers({
//     clearField: ({
//       setOpen,
//       setName,
//       setInitialBid,
//       setCondition,
//       setDescription,
//       setFile,
//     }) => () => {
//       setOpen(initialState.open);
//       setName(initialState.name);
//       setInitialBid(initialState.initialBid);
//       setCondition(initialState.condition);
//       setDescription(initialState.description);
//       setFile(initialState.file);
//     },
//   })
// );
