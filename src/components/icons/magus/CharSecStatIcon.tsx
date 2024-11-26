{
  /*<svg style="height: 512px; width: 512px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect fill="#000000" fill-opacity="0.01" stroke="#000000" stroke-opacity="1" stroke-width="4" height="504" width="504" rx="32" ry="32"></rect><g class="" style="" transform="translate(0,0)"><path d="M94.09 57L33 209.7V327h174V217h-87c-23.75 0-41-23-41-49s17.25-49 41-49h50.7l-24.8-62zm272.01 0L305 209.7V489h174V209.7L417.9 57zm25.9 62c23.8 0 41 23 41 49s-17.2 49-41 49-41-23-41-49 17.2-49 41-49zm-272 18c-11.6 0-23 12.8-23 31s11.4 31 23 31h169.9l24.8-62zm272 0c-11.6 0-23 12.8-23 31s11.4 31 23 31 23-12.8 23-31-11.4-31-23-31zM33 345v144h254V345z" fill="#020202" fill-opacity="1"></path></g></svg>*/
}

function CharSecStatIcon(props: { className?: string }) {
  return (
    <svg
      className={`char-sec-stat ${props.className ?? ""}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <g class="" style="" transform="translate(0,0)">
        <path
          d="M94.09 57L33 209.7V327h174V217h-87c-23.75 0-41-23-41-49s17.25-49 41-49h50.7l-24.8-62zm272.01 0L305 209.7V489h174V209.7L417.9 57zm25.9 62c23.8 0 41 23 41 49s-17.2 49-41 49-41-23-41-49 17.2-49 41-49zm-272 18c-11.6 0-23 12.8-23 31s11.4 31 23 31h169.9l24.8-62zm272 0c-11.6 0-23 12.8-23 31s11.4 31 23 31 23-12.8 23-31-11.4-31-23-31zM33 345v144h254V345z"
          fill="#020202"
          fill-opacity="1"
        ></path>
      </g>
    </svg>
  );
}

export default CharSecStatIcon;
