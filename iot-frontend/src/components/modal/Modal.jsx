import React from "react";
import "./modal.css";
import Bar from "../barchart/BarChart";
export default function Modal({
  setShowModal,
  reading,
  tempReading,
  graphData,
  appsyncProp,
}) {
  return (
    <div
      className='modalMainContainer'
      onClick={() => setShowModal((prev) => !prev)}
    >
      <div className='modalMain'>
        <div className='modal' onClick={() => setShowModal(false)}>
          <Bar
            reading={reading}
            tempReading={tempReading}
            graphData={graphData}
            appsyncProp={appsyncProp}
          />
        </div>
      </div>
    </div>
  );
}
