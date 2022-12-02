const Loading = () => {
  return (
    <div className="align-middle">
      <div className="d-flex justify-content-center h-10 align-items-center">
        <div className="lds-ellipsis d-flex ">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
export default Loading;
