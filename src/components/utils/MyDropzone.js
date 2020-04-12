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
  const callParent = acceptedFiles => props.parentCallback(acceptedFiles);
  const style = styles.baseStyle;

  return (
    <Fragment>
      <Dropzone
        accept="image/*"
        onDrop={(acceptedFiles) => {
          console.log(acceptedFiles);
          callParent(acceptedFiles);
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop, or click to select file(s)</p>
          </div>
        )}
      </Dropzone>
    </Fragment>
  );
}

export default MyDropzone;
