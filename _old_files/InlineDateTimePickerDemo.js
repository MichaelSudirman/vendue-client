// import React, { useState } from "react";
// import {
//   MuiPickersUtilsProvider,
//   DateTimePicker,
//   KeyboardDateTimePicker
// } from "@material-ui/pickers";
// import DateFnsUtils from "@date-io/date-fns";

// function InlineDateTimePickerDemo(props) {
//   const [selectedDate, handleDateChange] = useState(
//     new Date()
//   );

//   return (
//     <>
//       <MuiPickersUtilsProvider utils={DateFnsUtils}>
//         <DateTimePicker
//             id="auctionExp"
//           name="auctionExp"
//           variant="inline"
//           label="Basic example"
//           value={selectedDate}
//           onChange={handleDateChange}
//         />

//         <KeyboardDateTimePicker
//           variant="inline"
//           ampm={false}
//           label="With keyboard"
//           value={selectedDate}
//           onChange={handleDateChange}
//           onError={console.log}
//           disablePast
//           format="yyyy/MM/dd HH:mm"
//         />
//       </MuiPickersUtilsProvider>
//     </>
//   );
// }

// export default InlineDateTimePickerDemo;
