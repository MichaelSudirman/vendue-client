import React, { Fragment } from "react";
import Dropzone from "react-dropzone";

const styles = {
  baseStyle: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  },
};

function MyDropzone(props) {
  const { parentCallback } = props;

  const callParent = (acceptedFiles) => parentCallback(acceptedFiles);
  const style = styles.baseStyle;

  return (
    <Fragment>
      <Dropzone
        accept="image/*"
        maxSize = {10000000}
        onDrop={(acceptedFiles) => {
          console.log(acceptedFiles);
          callParent(acceptedFiles);
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop, or click to select image(s)</p>
          </div>
        )}
      </Dropzone>
    </Fragment>
  );
}

export default MyDropzone;
