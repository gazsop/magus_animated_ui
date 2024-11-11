export default function MessageSquare(props: { className?: string }) {
  return (
    <svg
      className={`message-square ${props.className ?? ""}`}
      fill="none"
      height="24"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
  //return (
  //	<svg
  //		className={`alert-octagon ${props.className ?? ""}`}
  //		fill="none"
  //		height="24"
  //		stroke="currentColor"
  //		stroke-linecap="round"
  //		stroke-linejoin="round"
  //		stroke-width="2"
  //		viewBox="0 0 24 24"
  //		width="24"
  //		xmlns="http://www.w3.org/2000/svg"
  //	>
  //		<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
  //		<line x1="12" x2="12" y1="8" y2="12" />
  //		<line x1="12" x2="12.01" y1="16" y2="16" />
  //	</svg>
  //);
  //<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
}
